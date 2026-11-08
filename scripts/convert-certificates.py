#!/usr/bin/env python3
"""
Certificate PDF to WebP Converter Script
Converts every first page of the certificate PDFs in public/certificates/source/
into optimized WebP images (1600px width, quality 82) in public/certificates/.

Existing .webp outputs are left untouched, so re-running the script only
converts newly added PDFs. Pass --force to rebuild everything.

Each page is rendered at 300 DPI, the surrounding empty white margin is
trimmed automatically (works for vector certificates and for scanned ones
that carry extra whitespace or a scanner watermark strip), and the result is
resized to 1600px wide.

Dependencies (either backend works):
    pip install pymupdf pillow
    pip install pypdfium2 pillow

Usage:
    python scripts/convert-certificates.py
    python scripts/convert-certificates.py --force
"""

import argparse
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
SOURCE_DIR = BASE_DIR / "public" / "certificates" / "source"
OUTPUT_DIR = BASE_DIR / "public" / "certificates"
PDF_DEST_DIR = BASE_DIR / "public" / "certificates" / "pdf"

TARGET_WIDTH = 1600
RENDER_DPI = 300
QUALITY = 82
QUALITY_FLOOR = 80
MAX_BYTES = 400 * 1024

# A pixel counts as "ink" when it is darker than this on any channel.
INK_THRESHOLD = 246
# Rows/columns are considered empty when less than this share of them is ink.
MIN_DENSITY = 0.001
# Bands separated by less than this share of the page are treated as one block.
GAP_RATIO = 0.008
# Keep bands holding at least this share of the heaviest band's ink.
KEEP_RATIO = 0.10
# Breathing room kept around the trimmed content, as a share of the page.
PAD_RATIO = 0.004


def render_page(pdf_path: Path) -> Image.Image:
    """Render the first page of a PDF to an RGB PIL image at RENDER_DPI."""
    scale = RENDER_DPI / 72

    try:  # Preferred backend.
        import pymupdf as fitz
    except ImportError:
        try:
            import fitz
        except ImportError:
            fitz = None

    if fitz is not None:
        with fitz.open(pdf_path) as doc:
            page = doc[0]
            pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
            return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

    try:
        import pypdfium2 as pdfium
    except ImportError:
        sys.exit(
            "No PDF backend found. Install one of:\n"
            "    pip install pymupdf pillow\n"
            "    pip install pypdfium2 pillow"
        )

    doc = pdfium.PdfDocument(str(pdf_path))
    try:
        return doc[0].render(scale=scale).to_pil().convert("RGB")
    finally:
        doc.close()


def _bands(profile: np.ndarray, total: int) -> list[tuple[int, int]]:
    """Group consecutive indexes whose density exceeds MIN_DENSITY."""
    threshold = max(2.0, MIN_DENSITY * total)
    bands: list[tuple[int, int]] = []
    start = None

    for index, value in enumerate(profile):
        if value >= threshold:
            if start is None:
                start = index
        elif start is not None:
            bands.append((start, index - 1))
            start = None

    if start is not None:
        bands.append((start, len(profile) - 1))

    return bands


def _merge(bands: list[tuple[int, int]], gap: int) -> list[tuple[int, int]]:
    """Join bands separated by fewer than `gap` pixels."""
    if not bands:
        return []

    merged = [list(bands[0])]
    for start, end in bands[1:]:
        if start - merged[-1][1] - 1 < gap:
            merged[-1][1] = end
        else:
            merged.append([start, end])

    return [(start, end) for start, end in merged]


def _content_span(
    ink: np.ndarray, profile: np.ndarray, total: int, gap: int
) -> tuple[int, int]:
    """Pick the span from the first to the last band that carries real ink.

    Small isolated specks (scan dust, a detached scanner watermark) form bands
    with almost no ink and are dropped, so they do not stretch the crop.
    """
    groups = _merge(_bands(profile, total), gap)
    if not groups:
        return 0, total - 1

    weights = [float(profile[start : end + 1].sum()) for start, end in groups]
    heaviest = max(weights)
    kept = [
        group
        for group, weight in zip(groups, weights)
        if weight >= heaviest * KEEP_RATIO
    ]

    return min(group[0] for group in kept), max(group[1] for group in kept)


def trim_margins(img: Image.Image) -> tuple[Image.Image, tuple[int, int, int, int]]:
    """Trim empty white margins, keeping a small uniform padding."""
    pixels = np.asarray(img)
    ink = np.any(pixels < INK_THRESHOLD, axis=2)
    height, width = ink.shape
    gap = max(3, int(round(height * GAP_RATIO)))

    top, bottom = _content_span(ink, ink.sum(axis=1), width, gap)

    horizontal = ink[top : bottom + 1]
    left, right = _content_span(horizontal, horizontal.sum(axis=0), horizontal.shape[0], gap)

    pad_x = int(round(width * PAD_RATIO))
    pad_y = int(round(height * PAD_RATIO))

    box = (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(width, right + 1 + pad_x),
        min(height, bottom + 1 + pad_y),
    )

    if box == (0, 0, width, height):
        return img, box

    return img.crop(box), box


def save_webp(img: Image.Image, webp_path: Path) -> tuple[int, int, int]:
    """Resize to TARGET_WIDTH and save as WebP, staying under MAX_BYTES."""
    if img.width != TARGET_WIDTH:
        target_height = int(round(TARGET_WIDTH * img.height / img.width))
        img = img.resize((TARGET_WIDTH, target_height), Image.Resampling.LANCZOS)

    quality = QUALITY
    while True:
        img.save(webp_path, "WEBP", quality=quality, method=6)
        size = webp_path.stat().st_size
        if size <= MAX_BYTES or quality <= QUALITY_FLOOR:
            break
        quality -= 1

    return img.width, img.height, quality


def convert_certificates(force: bool = False) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PDF_DEST_DIR.mkdir(parents=True, exist_ok=True)

    pdf_paths = sorted(SOURCE_DIR.glob("*.pdf"))
    if not pdf_paths:
        sys.exit(f"No PDF files found in {SOURCE_DIR}")

    print("=== Converting Certificate PDFs to WebP ===")

    converted = 0
    skipped = 0
    failed: list[str] = []

    for pdf_path in pdf_paths:
        name = pdf_path.stem
        webp_path = OUTPUT_DIR / f"{name}.webp"
        pdf_copy_path = PDF_DEST_DIR / f"{name}.pdf"

        # 1. Keep a copy of the original PDF for the download button.
        if not pdf_copy_path.exists() or pdf_path.stat().st_size != pdf_copy_path.stat().st_size:
            shutil.copy2(pdf_path, pdf_copy_path)
            print(f"Copied {name}.pdf to public/certificates/pdf/")

        # 2. Never overwrite an existing image unless explicitly asked to.
        if webp_path.exists() and not force:
            print(f"Skipped {webp_path.name} (already exists)")
            skipped += 1
            continue

        try:
            # 3. Render the first page at 300 DPI.
            page = render_page(pdf_path)

            # 4. Trim empty white margins without touching the artwork.
            trimmed, box = trim_margins(page)

            # 5. Resize to 1600px wide and encode as WebP.
            width, height, quality = save_webp(trimmed, webp_path)
        except Exception as error:  # noqa: BLE001 - report and continue
            print(f"Error: failed to convert {name}.pdf -> {error}")
            failed.append(name)
            continue

        size_kb = webp_path.stat().st_size / 1024
        print(f"Generated: {webp_path.name}")
        print(f"  Dimensions: {width}x{height} px")
        print(f"  Crop: {box[2] - box[0]}x{box[3] - box[1]} px at 300 DPI")
        print(f"  Quality: {quality} · Size: {size_kb:.1f} KB")
        converted += 1

    print(
        f"\nDone. {converted} converted, {skipped} skipped, {len(failed)} failed."
    )
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Rebuild images that already exist in public/certificates/.",
    )
    convert_certificates(force=parser.parse_args().force)
