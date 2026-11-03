export type ExperienceCategory = "ambassador" | "organisasi" | "kompetisi" | "proyek";

export interface ExperienceItem {
  id: string;
  type: ExperienceCategory;
  role: { id: string; en: string };
  org: string;
  badge?: { id: string; en: string };
  start: string;
  end: string;
  bullets: {
    id: string[];
    en: string[];
  };
  logo?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "google-student-ambassador",
    type: "ambassador",
    role: {
      id: "Google Student Ambassador",
      en: "Google Student Ambassador",
    },
    org: "Google Student Ambassador Program",
    badge: {
      id: "Terpilih 2.000 dari 85.000 pendaftar",
      en: "Selected 2,000 of 85,000 applicants",
    },
    start: "[PLACEHOLDER] 2024",
    end: "[PLACEHOLDER] Sekarang",
    bullets: {
      id: [
        "[PLACEHOLDER] Terpilih dari 85.000 pendaftar untuk menginisiasi dan menyelenggarakan workshop teknologi di lingkungan kampus.",
        "[PLACEHOLDER] Membangun jejaring komunitas mahasiswa pengembang dan memfasilitasi adopsi alat produktivitas digital.",
        "[PLACEHOLDER] Mengoordinasikan event kolaboratif lintas universitas yang mengedepankan inovasi dan literasi digital.",
      ],
      en: [
        "[PLACEHOLDER] Selected among 85,000 applicants to initiate and conduct tech workshops across campus.",
        "[PLACEHOLDER] Built a student developer network fostering practical digital tool adoption.",
        "[PLACEHOLDER] Coordinated collaborative cross-university tech events focusing on digital innovation.",
      ],
    },
  },
  {
    id: "ketua-pelaksana-bridge",
    type: "organisasi",
    role: {
      id: "Ketua Pelaksana Event Bridge Tingkat Nasional",
      en: "Organizing Committee Lead — National Bridge Event",
    },
    org: "Politeknik Negeri Malang",
    badge: {
      id: "Event Nasional Kampus",
      en: "Campus National Event",
    },
    start: "[PLACEHOLDER] 2024",
    end: "[PLACEHOLDER] 2024",
    bullets: {
      id: [
        "[PLACEHOLDER] Memimpin kepanitiaan dalam menyelenggarakan kejuaraan bridge tingkat nasional di lingkungan kampus.",
        "[PLACEHOLDER] Mengoordinasikan divisi operasional, teknis pertandingan, dan komunikasi kemitraan eksternal.",
        "[PLACEHOLDER] Mengelola alokasi anggaran dan memastikan kelancaran alur kompetisi dengan peserta dari berbagai daerah.",
      ],
      en: [
        "[PLACEHOLDER] Led the student committee in organizing the campus-hosted national-scale bridge tournament.",
        "[PLACEHOLDER] Coordinated tournament operations, match adjudication logistics, and external communications.",
        "[PLACEHOLDER] Managed budget allocation and maintained tournament flow for nationwide student delegations.",
      ],
    },
  },
  {
    id: "juara-kompetisi-bridge",
    type: "kompetisi",
    role: {
      id: "Juara Kompetisi Bridge Nasional",
      en: "National Bridge Competition Winner",
    },
    org: "Perwakilan Kontingen Kampus",
    badge: {
      id: "Peringkat: [PLACEHOLDER]",
      en: "Rank: [PLACEHOLDER]",
    },
    start: "[PLACEHOLDER] 2024",
    end: "[PLACEHOLDER] 2024",
    bullets: {
      id: [
        "[PLACEHOLDER] Mewakili kampus dalam kejuaraan bridge tingkat nasional dengan hasil pencapaian juara kompetitif.",
        "[PLACEHOLDER] Mengembangkan pemikiran strategis, ketahanan analitis, dan koordinasi taktis tingkat tinggi.",
        "[PLACEHOLDER] Berkontribusi pada reputasi prestasi mahasiswa kampus di ajang kompetisi olahraga otak nasional.",
      ],
      en: [
        "[PLACEHOLDER] Represented the polytechnic delegation in national-level competitive bridge tournaments.",
        "[PLACEHOLDER] Developed advanced analytical reasoning, strategic decision-making, and high-stakes partnership coordination.",
        "[PLACEHOLDER] Contributed to institutional academic and mind-sport accolades at the national level.",
      ],
    },
  },
  {
    id: "pm-pbl-sem-4",
    type: "proyek",
    role: {
      id: "Project Manager, Project Based Learning (PBL) semester 4",
      en: "Project Manager, Project Based Learning (PBL) semester 4",
    },
    org: "Project Based Learning (PBL) Semester 4, Politeknik Negeri Malang",
    badge: {
      id: "Semester 4",
      en: "Semester 4",
    },
    start: "Semester 4",
    end: "2024",
    bullets: {
      id: [
        "[PLACEHOLDER] Memimpin tim lintas fungsi (desain dan engineering) dalam membangun aplikasi pembelajaran digital kolaboratif.",
        "[PLACEHOLDER] Menyusun backlog fitur, sprint berkala, serta melakukan penjaminan kualitas kode dan antarmuka.",
        "[PLACEHOLDER] Menghasilkan produk MVP yang berjalan lancar dan siap dipresentasikan di hadapan dosen penguji.",
      ],
      en: [
        "[PLACEHOLDER] Led a cross-functional student team (UI/UX & engineering) building a collaborative digital learning app.",
        "[PLACEHOLDER] Structured product backlog, milestone sprint plans, and verified UI quality assurance.",
        "[PLACEHOLDER] Delivered a fully working MVP web app presented successfully for course evaluation.",
      ],
    },
  },
];
