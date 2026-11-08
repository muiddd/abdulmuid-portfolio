export type ExperienceCategory = "ambassador" | "organisasi" | "volunteer";

export interface ExperienceItem {
  id: string;
  type: ExperienceCategory;
  role: { id: string; en: string };
  org: string;
  badge?: { id: string; en: string };
  start: { id: string; en: string } | string;
  end: { id: string; en: string } | string;
  bullets: {
    id: string[];
    en: string[];
  };
  logo?: string;
}

export const experiences: ExperienceItem[] = [
  // 1. Ambassador - Ongoing
  {
    id: "google-student-ambassador-batch-2",
    type: "ambassador",
    role: {
      id: "Google Student Ambassador",
      en: "Google Student Ambassador",
    },
    org: "Google Student Ambassador Program (Batch 2)",
    badge: {
      id: "Malang, Jawa Timur, Indonesia",
      en: "Malang, East Java, Indonesia",
    },
    start: { id: "Okt 2026", en: "Oct 2026" },
    end: { id: "Sekarang", en: "Present" },
    bullets: {
      id: [
        "Terpilih sebagai Google Student Ambassador (GSA) Batch 2 yang mewakili Politeknik Negeri Malang, dengan peran pemimpin teknologi dan penghubung kampus.",
        "Mendorong literasi digital dan adopsi kecerdasan buatan di lingkungan kampus.",
        "Terpilih 2.000 dari 85.000 pendaftar.",
      ],
      en: [
        "Selected as a Google Student Ambassador (GSA) Batch 2 representing Politeknik Negeri Malang, serving as a campus technology leader and liaison.",
        "Driving digital literacy and artificial intelligence adoption on campus.",
        "Selected among 2,000 of 85,000 applicants.",
      ],
    },
  },

  // 2. Organisasi - Ongoing (Satu-satunya entri UKM Olah Raga)
  {
    id: "ukm-olahraga-polinema-ketua-subdivisi",
    type: "organisasi",
    role: {
      id: "Ketua Sub-Divisi Bridge",
      en: "Head of Bridge Sub-Division",
    },
    org: "UKM Olah Raga Politeknik Negeri Malang",
    badge: {
      id: "On-site",
      en: "On-site",
    },
    start: { id: "Feb 2026", en: "Feb 2026" },
    end: { id: "Sekarang", en: "Present" },
    bullets: {
      id: [
        "Ditunjuk sebagai Steering Committee (SC) pada divisi pengembangan sumber daya manusia (PSDM).",
        "Memimpin Sub-Divisi Bridge, mengelola keberlanjutan organisasi dan kegiatan bridge Polinema.",
      ],
      en: [
        "Appointed as Steering Committee (SC) within the human resources development (HRD/PSDM) division.",
        "Leading the Bridge Sub-Division, governing organizational sustainability and Polinema's bridge activities.",
      ],
    },
  },

  // 3. Organisasi - Ongoing (Satu-satunya entri Polinema Bridge Community)
  {
    id: "polinema-bridge-community-wakil-ketua",
    type: "organisasi",
    role: {
      id: "Wakil Ketua",
      en: "Vice Chairman",
    },
    org: "Polinema Bridge Community",
    start: { id: "Sep 2025", en: "Sep 2025" },
    end: { id: "Sekarang", en: "Present" },
    bullets: {
      id: [
        "Dipercaya membantu Ketua mengawasi stabilitas organisasi dan perencanaan strategis.",
        "Berkoordinasi dengan para kepala divisi agar program kerja selaras dengan visi komunitas.",
      ],
      en: [
        "Trusted to assist the Chairman in overseeing organizational stability and strategic planning.",
        "Coordinated with division heads to ensure work programs aligned with the community's vision.",
      ],
    },
  },

  // 4. Volunteer - Finished
  {
    id: "jti-play-it-2026-pdd",
    type: "volunteer",
    role: {
      id: "Staf Desain, Publikasi, dan Dokumentasi (PDD)",
      en: "Design, Publication, and Documentation (PDD) Staff",
    },
    org: "JTI Play IT 2026",
    start: { id: "Apr 2026", en: "Apr 2026" },
    end: { id: "Jun 2026", en: "Jun 2026" },
    bullets: {
      id: [
        "Berkontribusi di divisi Desain, Publikasi, dan Dokumentasi untuk PLAY IT!, kompetisi dan inisiatif hackathon IT yang diselenggarakan Jurusan Teknologi Informasi.",
      ],
      en: [
        "Contributed to the Design, Publication, and Documentation division for PLAY IT!, an IT competition and hackathon initiative organized by the Information Technology Department.",
      ],
    },
  },

  // 5. Volunteer - Finished (Single year 2026, no bullets)
  {
    id: "campus-fair-smanggi-2026-mc",
    type: "volunteer",
    role: {
      id: "Master of Ceremony & Relawan",
      en: "Master of Ceremony & Volunteer",
    },
    org: "Campus Fair SMANGGI 2026 (Alumni SMAN 1 Singgahan)",
    start: { id: "2026", en: "2026" },
    end: { id: "2026", en: "2026" },
    bullets: {
      id: [],
      en: [],
    },
  },

  // 6. Volunteer - Finished (No bullets)
  {
    id: "campus-fair-smanggi-2025-sosialisasi",
    type: "volunteer",
    role: {
      id: "Relawan Sosialisasi Sekolah & Acara",
      en: "School Outreach & Event Volunteer",
    },
    org: "Campus Fair SMANGGI 2025 (Alumni SMAN 1 Singgahan)",
    start: { id: "Des 2024", en: "Dec 2024" },
    end: { id: "Jan 2025", en: "Jan 2025" },
    bullets: {
      id: [],
      en: [],
    },
  },
];
