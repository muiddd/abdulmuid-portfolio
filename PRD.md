# PRD: Portofolio Website (Magang Fullstack Developer & UI/UX)
 
> Dokumen ini adalah **sumber kebenaran tunggal**. Agent AI wajib membaca file ini sebelum mengerjakan apa pun dan tidak boleh menyimpang darinya tanpa persetujuan eksplisit dari pemilik project.
 
## 1. Ringkasan
 
| Item | Isi |
|---|---|
| Tujuan | Portofolio pribadi sebagai kelengkapan syarat magang |
| Target posisi | Fullstack Developer Intern, UI/UX Intern |
| Audiens | Recruiter / hiring manager / tim teknis perusahaan |
| Bahasa | Indonesia (ID) dan Inggris (EN), dengan toggle |
| Deadline | **Besok**: fokus MVP, bukan fitur tambahan |
| Konten awal | Placeholder (diganti pemilik nanti) |
 
**Kriteria sukses:** dalam 30 detik, recruiter paham (1) siapa pemiliknya, (2) posisi yang dituju, (3) minimal 2 project yang bisa dibuka dan dibaca, (4) cara menghubungi.
 
## 2. Referensi Desain
 
| Bagian | Referensi | Yang diambil |
|---|---|---|
| Hero | https://ilse-moreno.framer.website/ | Hero minimalis: potret/visual, nama besar, satu kalimat posisi, 2 CTA |
| Selected Work | https://ilse-moreno.framer.website/ | **Kanvas drag**: frame proyek bisa digeser, klik untuk membuka, ada zoom dan "View as list" |
| Semua section lain | https://sevora.framer.website/ | Hierarki section, tipografi, spacing, kartu, accordion, footer |
 
**Jangan** menyalin teks, gambar, atau aset dari kedua referensi. Keduanya hanya inspirasi struktur dan gaya. Semua konten harus original atau placeholder.
 
## 3. Ruang Lingkup
 
### MVP (wajib selesai besok)
1. Navbar (Home, About, Projects, Experience, Contact) + toggle bahasa ID/EN + toggle tema
2. Hero (gaya Ilse)
3. Projects berupa kanvas drag (gaya Ilse) dengan 4 project placeholder + tombol "View as list"
4. Skills / Services (gaya Sevora)
5. Process: cara kerja saya (gaya Sevora): Discovery, Strategy, Direction, Design, Development, Delivery
6. **Experience**: timeline pengalaman organisasi dan Google Student Ambassador
7. **Certificates**: grid sertifikat dengan preview
8. About singkat
9. FAQ accordion (gaya Sevora), isi relevan untuk magang
10. Contact (email, link sosial, form sederhana)
11. Halaman detail project `/projects/[slug]` (studi kasus: masalah, peran, proses, hasil, tech stack)
12. Halaman `/experience` (versi lengkap Experience + Certificates)
13. Footer
14. Responsif (mobile, tablet, desktop)
### Di luar scope (jangan dikerjakan)
- Pricing, statistik "ribuan client", testimoni klien, refund policy (tidak relevan untuk magang)
- Blog/Articles, CMS, login, dashboard admin
- Fitur apa pun yang tidak ada di daftar MVP
## 4. Struktur Halaman
 
```
/                    Home: Hero > About > Projects > Process > Experience > Certificates > FAQ > Contact
/projects            Daftar semua project (grid)
/projects/[slug]     Detail studi kasus
/experience          Experience lengkap + semua sertifikat
/about               About lengkap + skill + pendidikan + CV
/contact             Form + info kontak
```
 
## 5. Spesifikasi Komponen Kunci
 
### 5.1 Hero (referensi Ilse)
- Kiri/atas: label peran kecil → nama (heading besar) → 1-2 kalimat posisi → status ("Terbuka untuk magang")
- 2 CTA: **"Lihat Karya"** (scroll ke Selected Work) dan **"Hubungi Saya"**
- Visual: foto/ilustrasi placeholder (rasio potret)
- **Komposisi (ikuti Ilse):** foto potret besar di kiri; **nama sangat besar** (Inter Tight) menimpa tepi foto; paragraf posisi dan status berada di kanan-bawah; label mono kecil di atas foto; status memakai titik `--accent` + teks "Terbuka untuk magang"; dua tombol (primer hitam, sekunder terang). Mobile: foto di atas, teks di bawahnya.
- **Jangan** memakai hero card besar bergaya Sevora, statistik (30+ projects, dst.), atau kartu "Select project" di hero.
### 5.2 Projects: Canvas Drag (referensi Ilse)
- Area kanvas berisi frame project yang tersebar; pengguna dapat **menggeser (drag)** kanvas untuk melihat semuanya
- Klik frame membuka `/projects/[slug]`
- Kontrol: zoom (− 100% +) dan tombol **"View as list"** yang mengganti ke tampilan grid
- **Mobile:** fallback ke carousel swipe atau list (jangan paksa drag 2D)
- Implementasi: Framer Motion (`drag`, `dragConstraints`), tanpa library kanvas berat
- Aksesibilitas: setiap frame bisa difokus dengan keyboard dan Enter untuk membuka
### 5.2a Experience (organisasi & Google Student Ambassador)
- Tampilan: **timeline vertikal**, item terbaru di atas
- Tiap item: logo/ikon placeholder, jabatan/peran, nama organisasi/program, periode (mis. `2024 – Sekarang`), 2-3 poin kontribusi, badge kategori
- Kategori (badge/filter): `Ambassador`, `Organisasi`
- Item awal (placeholder):
  1. **Google Student Ambassador**: `[PLACEHOLDER]` periode, `[PLACEHOLDER]` kegiatan (event, workshop, komunitas, dll.)
  2. **Organisasi**: `[PLACEHOLDER]` nama organisasi, jabatan, periode, kontribusi
- Di Home: tampilkan 3 item teratas + tombol "Lihat semua" ke `/experience`
- Fokuskan deskripsi pada hal yang relevan untuk magang: leadership, kerja tim, komunikasi, inisiatif, dampak yang terukur (hanya jika angkanya diberikan pemilik)
### 5.2b Certificates
- Tampilan: grid kartu (3 kolom desktop, 2 tablet, 1 mobile)
- Tiap kartu: gambar/thumbnail sertifikat, judul, penerbit, tanggal terbit, tombol "Lihat kredensial" (link verifikasi bila ada)
- Klik kartu membuka **lightbox/modal** berisi gambar sertifikat besar (bisa ditutup dengan Esc)
- Filter kategori sederhana: `Semua`, `Development`, `Design`, `Lainnya`
- Di Home: tampilkan 4-6 sertifikat pilihan + tombol "Lihat semua" ke `/experience`
- Data sertifikat berasal dari `/content/certificates.ts` (bukan hardcode di komponen)
### 5.3 Section lain (referensi Sevora)
- Skills/Services: 3 kartu (Fullstack Development, UI/UX Design, Graphic Design)
- Process: 6 langkah bernomor
- FAQ: accordion, 5-6 pertanyaan (misal: "Stack apa yang kamu pakai?", "Kapan bisa mulai magang?", "Apakah bisa remote?")
## 6. Design System (DIKUNCI: jangan diubah tanpa izin)
 
> Nilai di bawah **dibekukan** di `src/styles/tokens.css` dan hanya boleh diubah atas permintaan eksplisit pemilik. Nilai warna adalah estimasi dari screenshot referensi; boleh disetel halus oleh pemilik, tetapi agent tidak boleh mengubahnya sendiri.
 
**Arah visual:** terang, bersih, monokrom (hitam-putih-abu) dengan **satu** aksen kecil. Hero mengikuti Ilse; semua section lain mengikuti Sevora. Tema terang adalah default; tema gelap adalah turunan (invert palet yang sama), bukan palet biru-gelap terpisah.
 
### Warna (light, default)
| Token | Nilai | Pemakaian |
|---|---|---|
| `--bg` | `#F2F2F0` | Latar halaman (abu-putih hangat) |
| `--surface` | `#EDEDF0` | Kartu besar / hero card (gaya Sevora) |
| `--surface-2` | `#FFFFFF` | Kartu kecil, input, tombol sekunder |
| `--text` | `#111111` | Teks utama, tombol primer |
| `--muted` | `#6B6B70` | Teks sekunder, kata yang diredam di heading |
| `--border` | `#E2E2E5` | Garis tipis 1px |
| `--accent` | `#5B3DF5` | **Hanya** titik status "Terbuka untuk magang" dan fokus/hover kecil |
 
Aturan: tombol primer = **hitam** (`--text`) dengan teks putih, bukan biru. Jangan memakai aksen sebagai warna tombol atau heading.
 
### Tipografi
- **Sans (UI + judul):** Inter Tight (alternatif: Inter). Heading besar dengan `letter-spacing` rapat (≈ -0.03em) dan `line-height` ≈ 1.0 (gaya nama "Ilse Moreno").
- **Serif (aksen heading):** Instrument Serif. Dipakai untuk judul section dan hero statement ala Sevora; kata terakhir/kata penekanan boleh berwarna `--muted` (seperti "faster").
- **Mono (label kecil):** JetBrains Mono, hanya untuk label seperti "Portrait · Lisbon studio".
- Skala: 12 / 14 / 16 / 20 / 28 / 40 / 64 / 112 (nama di hero, responsif dengan `clamp`).
### Bentuk & komponen
- **Radius:** 12 (tombol, input), 24 (kartu), 48 (hero card besar), 999 (pill/badge).
- **Tombol primer:** latar `--text`, teks putih, radius 12, tinggi ≈ 56, padding horizontal luas. **Sekunder:** latar `--surface-2`, border 1px `--border`, teks `--text`.
- **Navbar:** teks tanpa garis bawah, CTA kanan berupa tombol hitam; penanda halaman aktif cukup dengan warna teks/underline halus (bukan pill biru).
- **Tekstur latar:** pola titik halus (gaya Ilse) atau garis diagonal sangat tipis (gaya Sevora), opasitas ≤ 6%. Pilih satu: **titik halus**.
- **Foto:** hitam-putih atau desaturasi ringan agar seragam dengan palet.
- **Bayangan:** hampir tidak ada; hierarki dibuat dengan warna surface dan border.
### Lainnya
- **Spacing:** kelipatan 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
- **Motion:** durasi 200-400ms, easing konsisten, hormati `prefers-reduced-motion`
- **Breakpoint:** 640 / 1024 / 1280
## 7. Tech Stack (DIKUNCI)
 
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- i18n: kamus JSON sederhana (`/content/id.json`, `/content/en.json`), tanpa library tambahan kecuali benar-benar perlu
- Form kontak: Formspree/Resend atau `mailto:` fallback
- Deploy: Vercel
**Dilarang** menambah dependency baru tanpa menjelaskan alasannya dan mendapat persetujuan.
 
## 8. Struktur Konten (Single Source of Truth)
 
Semua teks ada di `/content`, **tidak ada teks hardcode di komponen**.
 
```
/content
  id.json
  en.json
  projects.ts   // data project: slug, title{id,en}, role, year, stack[], summary{id,en}, cover, sections
  experience.ts // id, type ('ambassador'|'organisasi'), role{id,en}, org, start, end, bullets{id,en}[], logo
  certificates.ts // id, title, issuer, date, category, image, credentialUrl?
```
 
Aturan placeholder:
- Semua teks placeholder diawali `[PLACEHOLDER]` agar mudah dicari dan diganti
- Gambar placeholder memakai satu komponen `<PlaceholderImage />` (bukan gambar acak dari internet)
- **Dilarang mengarang fakta**: nama perusahaan, angka, testimoni, atau pencapaian yang tidak diberikan pemilik
- Khusus Experience dan Certificates: **jangan mengarang** nama organisasi, jabatan, tanggal, penerbit, atau nomor kredensial. Semua wajib `[PLACEHOLDER]` sampai pemilik mengisi data asli.
## 9. Aturan Kerja untuk Agent AI (anti-halusinasi & anti-berantakan)
 
1. Baca `PRD.md` di awal setiap sesi; ikuti urutan fase di bawah.
2. **Satu fase = satu task.** Selesaikan, jalankan build, lalu berhenti dan lapor sebelum lanjut.
3. Jangan mengubah design tokens, stack, atau struktur folder tanpa diminta.
4. Jangan menulis ulang komponen yang sudah disetujui; ubah seperlunya saja (edit kecil, bukan rewrite).
5. Jika ada yang tidak jelas, **tanya**; jangan menebak.
6. Jangan mengarang API, package, atau fitur framework. Jika ragu, cek dokumentasi resmi.
7. Setelah tiap fase: `npm run build` dan `npm run lint` harus lulus.
8. Commit git per fase dengan pesan jelas (`feat: hero section`) agar mudah rollback.
## 10. Rencana Fase (urutan eksekusi)
 
| Fase | Pekerjaan | Selesai jika |
|---|---|---|
| 0 | Setup Next.js + TS + Tailwind + Framer Motion, tokens, font, struktur folder, i18n dasar | `npm run dev` jalan, tema + toggle bahasa berfungsi |
| 1 | Layout global: Navbar, Footer, toggle tema/bahasa | Tampil benar di mobile & desktop |
| 2 | Hero | Sesuai 5.1 |
| 3 | Selected Work (canvas drag + list view + fallback mobile) | Sesuai 5.2 |
| 4 | Skills, Process, About ringkas, FAQ | Sesuai 5.3 |
| 4b | Experience (timeline) + Certificates (grid + lightbox + filter) | Sesuai 5.2a dan 5.2b |
| 5 | Halaman `/projects`, `/projects/[slug]`, `/experience`, `/about`, `/contact` | Semua rute terbuka tanpa error |
| 6 | Polish: responsif, aksesibilitas, SEO meta, favicon, OG image | Lighthouse ≥ 90 (Perf/A11y/SEO) |
| 7 | Deploy ke Vercel + isi konten asli | URL publik aktif |
 
## 11. Kriteria Penerimaan (Definition of Done)
 
- [ ] Semua halaman MVP ada dan tidak error
- [ ] Toggle ID/EN mengubah **seluruh** teks
- [ ] Canvas drag berfungsi di desktop; fallback rapi di mobile
- [ ] Timeline Experience dan grid Certificates tampil; lightbox sertifikat bisa dibuka dan ditutup (klik luar / Esc)
- [ ] Tidak ada teks/gambar dari referensi yang disalin
- [ ] Tidak ada fakta karangan; semua placeholder berlabel
- [ ] Build & lint lulus, tidak ada error di console
- [ ] Tampilan nyaman di 375px, 768px, 1280px
- [ ] Sudah ter-deploy dan bisa dibuka lewat link publik
## 12. Data yang Perlu Diisi Pemilik
 
- Nama lengkap, foto, email, link LinkedIn/GitHub/Instagram/Dribbble
- Kalimat posisi (ID & EN)
- Minimal 2 project asli: judul, peran, masalah, proses, hasil, stack, screenshot
- CV (PDF)
- Experience: tiap organisasi (nama, jabatan, periode, 2-3 kontribusi) dan detail Google Student Ambassador (periode, kegiatan yang dijalankan, hasil/dampak)
- Sertifikat: gambar/PDF, judul, penerbit, tanggal, link kredensial (jika ada)
- Domain (opsional)
---
 
## Lampiran: Prompt Pembuka untuk Antigravity
 
```
Baca PRD.md di root project dan ikuti semua aturan di dalamnya, terutama
bagian 6 (design system dikunci), 7 (stack dikunci), dan 9 (aturan kerja).
Kerjakan HANYA Fase 0. Jangan lanjut ke fase berikutnya.
Setelah selesai, jalankan build dan lint, ringkas apa yang dibuat, lalu berhenti
dan tunggu persetujuan saya.
```
 