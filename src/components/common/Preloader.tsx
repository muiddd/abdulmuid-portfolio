"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "abdulmuid_preloader_seen";
const MIN_DURATION = 1600;
const MAX_WAIT = 6000;
const EXIT_DURATION = 640;
const REDUCED_MIN_DURATION = 400;
const REDUCED_EXIT_DURATION = 250;

type Phase = "loading" | "exiting" | "done";

/**
 * First-visit preloader.
 *
 * A full-screen curtain that counts up to 100% and lifts away to reveal the
 * page. It only runs once per browser session: the inline script in the root
 * layout marks returning visitors with `preloader-skip` before first paint, so
 * they never see a flash of the overlay.
 *
 * Progress is written straight to the DOM inside a rAF loop, so the counter
 * never triggers a React re-render. `prefers-reduced-motion` gets a much
 * shorter run, and the CSS in globals.css strips the decorative animation.
 */
export function Preloader() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("loading");
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    // Already seen this session — the head script has hidden the overlay
    // before paint, so just drop it from the tree.
    if (root.classList.contains("preloader-skip")) {
      setPhase("done");
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const minDuration = reduced ? REDUCED_MIN_DURATION : MIN_DURATION;
    const exitDuration = reduced ? REDUCED_EXIT_DURATION : EXIT_DURATION;

    document.body.classList.add("preloader-active");

    let frame = 0;
    let exitTimer = 0;
    let revealTimer = 0;
    let maxWaitTimer = 0;
    let loaded = document.readyState === "complete";
    let displayed = 0;
    let finished = false;
    const start = performance.now();

    const markLoaded = () => {
      loaded = true;
    };

    if (!loaded) {
      window.addEventListener("load", markLoaded, { once: true });
      // Never hold the page hostage if a resource hangs.
      maxWaitTimer = window.setTimeout(markLoaded, MAX_WAIT);
    }

    const paint = (value: number) => {
      const rounded = Math.round(value);
      if (percentRef.current) {
        percentRef.current.textContent = String(rounded).padStart(3, "0");
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${value / 100})`;
      }
    };

    const finish = () => {
      if (finished) return;
      finished = true;

      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage errors (private mode, etc.)
      }

      setPhase("exiting");
      // Let the page start its entrance animations once the curtain is already
      // lifting, so the reveal is actually visible instead of hidden behind it.
      revealTimer = window.setTimeout(() => {
        window.dispatchEvent(new Event("preloader:complete"));
      }, reduced ? 60 : 160);
      exitTimer = window.setTimeout(() => {
        document.body.classList.remove("preloader-active");
        setPhase("done");
      }, exitDuration);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeProgress = Math.min(elapsed / minDuration, 1);
      const eased = 1 - Math.pow(1 - timeProgress, 3);
      const ready = loaded && elapsed >= minDuration;

      // Ease towards 90% while loading, then close the gap once the page is
      // ready so a slow image never makes the bar jump straight to 100.
      const target = ready ? 100 : Math.min(eased * 100, 90);
      displayed += (target - displayed) * (ready ? 0.12 : 0.2);
      if (displayed >= 99.4) displayed = 100;

      paint(displayed);

      if (displayed >= 100) {
        finish();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    paint(0);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("load", markLoaded);
      window.clearTimeout(maxWaitTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(revealTimer);
      if (frame) cancelAnimationFrame(frame);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader${phase === "exiting" ? " preloader--exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={t("preloader.label", "Memuat portofolio")}
    >
      <div className="preloader__inner" aria-hidden="true">
        <div className="preloader__brand">
          <span className="preloader__tag">{t("preloader.tag", "Portofolio")}</span>
          <div className="preloader__frame">
            <span className="preloader__handle preloader__handle--tl" />
            <span className="preloader__handle preloader__handle--tr" />
            <span className="preloader__handle preloader__handle--bl" />
            <span className="preloader__handle preloader__handle--br" />
            <span className="preloader__name">Abdul Muid</span>
          </div>
        </div>

        <div className="preloader__footer">
          <div className="preloader__meta">
            <span className="preloader__status">
              {t("preloader.loading", "Memuat")}
              <span className="preloader__dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </span>
            <span className="preloader__percent">
              <span ref={percentRef}>000</span>
              <span className="preloader__percent-sign">%</span>
            </span>
          </div>
          <div className="preloader__track">
            <span ref={barRef} className="preloader__bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
