# Portofolio Website — Abdul Muid

Portofolio pribadi modern untuk posisi **Fullstack Developer Intern** dan **UI/UX Intern**. Dibangun dengan Next.js 14 App Router, TypeScript, Tailwind CSS, dan Framer Motion, mengadopsi estetika minimalis gabungan Ilse Moreno (Hero & Canvas Drag) dan Sevora (Hierarki, Desain Sistem & Kartu).

---

## 1. Cara Menjalankan Proyek Secara Lokal

```bash
# 1. Pastikan dependensi terpasang
npm install

# 2. Jalankan development server
npm run dev
# Buka http://localhost:3000 pada peramban Anda

# 3. Pengujian linting
npm run lint

# 4. Pengujian build produksi
npm run build
```

---

## 2. Struktur Konten (`/content`) — Single Source of Truth

Semua teks antarmuka dan data disimpan di direktori `/content` tanpa hardcode di komponen:

```
/content
├── id.json            # Kamus terjemahan Bahasa Indonesia (teks antarmuka, hero, bio, FAQ, kontak)
├── en.json            # Kamus terjemahan Bahasa Inggris
├── skills.ts          # Daftar keahlian teknis (ikon Simple Icons & Lucide untuk marquee)
├── projects.ts        # Data proyek dan studi kasus lengkap (slug, deskripsi, masalah, proses, hasil)
├── experience.ts      # Rekam jejak pengalaman (Google Student Ambassador, kepanitiaan, kompetisi)
└── certificates.ts    # Data sertifikasi & kredensial untuk galeri lightbox
```

---

## 3. Cara Mengganti Placeholder Konten Asli

Seluruh konten yang belum diisi oleh pemilik ditandai dengan awalan `[PLACEHOLDER]`:

1. **Foto Profil:**
   - Letakkan file foto Anda di `public/images/profile.png` atau `public/images/profile.jpg`. Komponen `<PlaceholderImage />` akan langsung memuat foto asli Anda secara otomatis dengan filter desaturasi/hitam-putih yang rapi.
2. **Kamus Teks (`/content/id.json` & `/content/en.json`):**
   - Cari kata kunci `[PLACEHOLDER]` di kedua file tersebut dan ganti dengan kalimat asli Anda.
3. **Data Proyek (`/content/projects.ts`):**
   - Edit proyek "Best Learning" dan tiga proyek lainnya sesuai proyek nyata yang pernah Anda kerjakan. Anda bisa menambahkan screenshot proyek di folder `public/images/projects/`.
4. **Pengalaman & Sertifikat (`/content/experience.ts` & `/content/certificates.ts`):**
   - Perbarui poin kontribusi pengalaman dan tautan verifikasi kredensial sertifikat.

---

## 4. Integrasi Formulir Kontak (`/api/contact`)

Formulir kontak di `/contact` mengirimkan payload data ke API Route Next.js (`src/app/api/contact/route.ts`):
- Dilengkapi **honeypot** anti-spam bawaan.
- Dalam mode pengembangan default, API mengembalikan respons sukses mock.
- Untuk mengaktifkan pengiriman email otomatis ke inbox Anda via **Resend**:
  1. Daftar di [resend.com](https://resend.com) dan buat API Key.
  2. Tambahkan `RESEND_API_KEY=re_xxxxxxxx` pada file `.env.local` atau Environment Variables di Vercel.

---

## 5. Cara Deploy ke Vercel

1. Push repositori ini ke akun GitHub Anda.
2. Buka dashboard [Vercel](https://vercel.com) dan pilih **Add New Project**.
3. Import repositori `abdulmuid-portfolio`.
4. Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
5. Klik **Deploy**. Selesai dalam waktu kurang dari 2 menit.

