export interface ProjectSection {
  title: { id: string; en: string };
  content: { id: string; en: string };
}

export interface ProjectGalleryItem {
  label: { id: string; en: string };
  aspectRatio?: "video" | "square" | "portrait";
  src?: string;
}

export interface ProjectLinks {
  github?: string;
  figma?: string;
  demo?: string;
}

export interface Project {
  slug: string;
  title: { id: string; en: string };
  category: { id: string; en: string };
  role: string;
  year: string;
  context?: { id: string; en: string };
  period?: { id: string; en: string };
  team?: { id: string; en: string };
  stack: string[];
  summary: { id: string; en: string };
  cover: string;
  sections: ProjectSection[];
  gallery?: ProjectGalleryItem[];
  links?: ProjectLinks;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "sipanda-pbl-semester-4",
    title: {
      id: "siPanda — Platform Belajar Digital Berbasis AI",
      en: "siPanda — AI-Powered Digital Learning Platform",
    },
    category: {
      id: "Aplikasi Web",
      en: "Web App",
    },
    role: "Project Manager & Developer",
    year: "2026",
    context: {
      id: "Project Based Learning (PBL) semester 4, Politeknik Negeri Malang",
      en: "Semester 4 Project Based Learning (PBL), Politeknik Negeri Malang",
    },
    period: {
      id: "Februari - Juni 2026",
      en: "February - June 2026",
    },
    team: {
      id: "5 orang",
      en: "5 people",
    },
    stack: ["Laravel 12", "Filament 4", "Tailwind CSS", "SQLite", "Gemini API"],
    links: {
      github: "https://github.com/muiddd/sipanda",
    },
    summary: {
      id: "siPanda (Si Paham Inti & Atur Jeda) adalah platform belajar digital yang meringkas materi panjang dengan AI, menyusun latihan soal otomatis, dan mencatat sesi belajar. Saya memimpin tim 5 orang sebagai Project Manager sekaligus mengerjakan backend dan panel admin.",
      en: "siPanda (Si Paham Inti & Atur Jeda) is a digital learning platform that summarizes long reading materials with AI, generates practice questions, and tracks study sessions. I led a team of 5 as Project Manager while also building the backend and admin panel.",
    },
    cover: "/images/projects/sipanda/beranda.png",
    sections: [
      {
        title: { id: "Masalah", en: "The Problem" },
        content: {
          id: "Mahasiswa sering harus menelan materi berupa teks yang sangat panjang, sehingga mudah kehilangan fokus dan sulit menilai seberapa jauh pemahaman mereka. Belum ada satu tempat yang menyatukan ringkasan materi, latihan soal, pencatatan waktu belajar, dan catatan pribadi.",
          en: "Students are often handed very long reading materials, which makes it easy to lose focus and hard to tell how much they actually understood. There was no single place that brought together summaries, practice questions, study-time tracking, and personal notes.",
        },
      },
      {
        title: { id: "Peran", en: "My Role" },
        content: {
          id: "Project Manager sekaligus developer. Sebagai PM saya menetapkan ruang lingkup MVP, menyusun backlog fitur, membagi pekerjaan untuk 5 anggota tim, menjaga timeline milestone, dan melakukan review sebelum demo. Sebagai developer saya membangun modul student di Laravel, panel admin dengan Filament, serta integrasi Gemini API untuk ringkasan dan generator soal.",
          en: "Project Manager and developer. As PM I defined the MVP scope, structured the feature backlog, split work across 5 team members, kept the milestone timeline on track, and reviewed everything before each demo. As a developer I built the student modules in Laravel, the admin panel with Filament, and the Gemini API integration for summaries and question generation.",
        },
      },
      {
        title: { id: "Proses Desain & Pengembangan", en: "Design & Development Process" },
        content: {
          id: "Dimulai dari perumusan masalah dan wireframe alur belajar, lalu arsitektur Laravel 12 dengan Filament untuk panel admin. Fitur dibangun bertahap: autentikasi email OTP dan Google, ruang baca dengan ringkasan AI, latihan soal yang digenerate AI per materi, buku catatan digital, gamifikasi dan streak, pomodoro, hingga pencatatan sesi belajar otomatis dari browser. Setiap tahap ditutup dengan uji alur dan perbaikan sebelum lanjut.",
          en: "It started with problem framing and wireframes of the study flow, then a Laravel 12 architecture with Filament for the admin panel. Features were built in stages: OTP email and Google authentication, a reading room with AI summaries, AI-generated practice questions per material, a digital notebook, gamification and streaks, a Pomodoro timer, and automatic study-session logging from the browser. Each stage closed with flow testing and fixes before moving on.",
        },
      },
      {
        title: { id: "Hasil & Dampak", en: "Results & Impact" },
        content: {
          id: "MVP berjalan dengan 8 modul untuk siswa (dashboard, materi, latihan soal, buku catatan, riwayat skor, gamifikasi, target belajar, log aktivitas) plus panel admin untuk mengelola pengguna, materi, kategori, serta memantau aktivitas dan pemakaian AI. Materi panjang kini bisa diringkas dalam hitungan detik dan langsung disimpan sebagai catatan.",
          en: "The MVP ships with 8 student modules (dashboard, materials, practice questions, notebook, score history, gamification, study targets, activity log) plus an admin panel to manage users, materials, and categories while monitoring activity and AI usage. Long materials can now be summarized in seconds and saved straight into notes.",
        },
      },
    ],
    gallery: [
      {
        label: { id: "Halaman Landing", en: "Landing Page" },
        aspectRatio: "video",
        src: "/images/projects/sipanda/beranda.png",
      },
      {
        label: { id: "Dashboard Siswa", en: "Student Dashboard" },
        aspectRatio: "video",
        src: "/images/projects/sipanda/dashboard.png",
      },
      {
        label: { id: "Ruang Baca & Ringkasan AI", en: "Reading Room & AI Summary" },
        aspectRatio: "video",
        src: "/images/projects/sipanda/ruang-baca.png",
      },
      {
        label: { id: "Latihan Soal dari AI", en: "AI-Generated Practice Quiz" },
        aspectRatio: "video",
        src: "/images/projects/sipanda/latihan-soal.png",
      },
      {
        label: { id: "Buku Catatan Digital", en: "Digital Notebook" },
        aspectRatio: "video",
        src: "/images/projects/sipanda/buku-catatan.png",
      },
      {
        label: { id: "Panel Admin Filament", en: "Filament Admin Panel" },
        aspectRatio: "video",
        src: "/images/projects/sipanda/admin-panel.png",
      },
    ],
  },
  {
    slug: "web-lab-multimedia-mobile-tech",
    title: {
      id: "Web Laboratorium Multimedia dan Mobile Technology",
      en: "Multimedia and Mobile Technology Laboratory Website",
    },
    category: {
      id: "Website",
      en: "Website",
    },
    role: "UI/UX Designer, Frontend Developer",
    year: "2025",
    context: {
      id: "Project Based Learning (PBL) semester 3, Politeknik Negeri Malang",
      en: "Semester 3 Project Based Learning (PBL), Politeknik Negeri Malang",
    },
    period: {
      id: "Oktober - Desember 2025",
      en: "October - December 2025",
    },
    team: {
      id: "6 orang",
      en: "6 people",
    },
    stack: ["PHP", "PostgreSQL", "HTML/CSS", "Figma"],
    links: {
      github: "[PLACEHOLDER_URL]",
      figma: "[PLACEHOLDER_URL]",
      // demo tidak tersedia (disembunyikan)
    },
    summary: {
      id: "Website profil untuk Laboratorium Multimedia dan Mobile Technology, Politeknik Negeri Malang, dikerjakan tim 6 orang pada Project Based Learning semester 3. Saya merancang UI/UX-nya di Figma dan membangun frontend halaman Tentang dan Berita.",
      en: "A profile website for the Multimedia and Mobile Technology Laboratory at Politeknik Negeri Malang, built by a team of 6 in the semester 3 Project Based Learning course. I designed the UI/UX in Figma and built the frontend for the About and News pages.",
    },
    cover: "/images/projects/mmt/Beranda.png",
    sections: [
      {
        title: { id: "Masalah", en: "The Problem" },
        content: {
          id: "Laboratorium memiliki banyak konten untuk dipublikasikan, seperti profil, katalog proyek, galeri, berita, dan karya mahasiswa, tetapi belum punya satu tempat untuk menampilkannya. Setiap perubahan harus lewat kode.",
          en: "The lab had plenty of content to publish, such as its profile, project catalog, gallery, news, and student work, but no single place to show it, and every update had to go through code.",
        },
      },
      {
        title: { id: "Peran", en: "My Role" },
        content: {
          id: "UI/UX Designer dan Frontend Developer. Saya merancang tampilan website di Figma, lalu membangun halaman Tentang dan Berita.",
          en: "UI/UX Designer and Frontend Developer. I designed the website in Figma, then built the About and News pages.",
        },
      },
      {
        title: { id: "Proses Desain & Pengembangan", en: "Design & Development Process" },
        content: {
          id: "Merancang antarmuka di Figma dan mengimplementasikan halaman Tentang serta Berita dengan struktur HTML/CSS yang semantik, responsif, dan mudah dikelola.",
          en: "Designed the interface in Figma and implemented the About and News pages with semantic, responsive, and maintainable HTML/CSS.",
        },
      },
      {
        title: { id: "Hasil & Dampak", en: "Results & Impact" },
        content: {
          id: "Tim menyelesaikan website yang memungkinkan pengelola lab memperbarui galeri, berita, dan katalog lewat panel admin tanpa menyentuh kode.",
          en: "The team delivered a website where lab managers can update the gallery, news, and catalog through an admin panel without touching code.",
        },
      },
    ],
    gallery: [
      {
        label: {
          id: "Halaman Tentang",
          en: "About Page",
        },
        aspectRatio: "video",
        src: "/images/projects/mmt/Tentang.png",
      },
      {
        label: {
          id: "Halaman Berita",
          en: "News Page",
        },
        aspectRatio: "video",
        src: "/images/projects/mmt/Berita.png",
      },
      {
        label: {
          id: "Halaman Galeri Kegiatan",
          en: "Lab Gallery Page",
        },
        aspectRatio: "video",
        src: "/images/projects/mmt/Galeri.png",
      },
      {
        label: {
          id: "Halaman Katalog Karya Mahasiswa",
          en: "Student Work Catalog Page",
        },
        aspectRatio: "video",
        src: "/images/projects/mmt/Karya.png",
      },
      {
        label: {
          id: "Panel Dashboard Admin",
          en: "Admin Dashboard Panel",
        },
        aspectRatio: "video",
        src: "/images/projects/mmt/Dashboard Admin.png",
      },
      {
        label: {
          id: "Halaman Login Admin",
          en: "Admin Login Page",
        },
        aspectRatio: "video",
        src: "/images/projects/mmt/Login Admin.png",
      },
    ],
  },
];
