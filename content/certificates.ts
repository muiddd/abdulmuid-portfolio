export type CertificateCategory =
  | "Kompetisi"
  | "Kepanitiaan"
  | "Development"
  | "Design"
  | "Lainnya";

export interface CertificateItem {
  id: string;
  title: {
    id: string;
    en: string;
  };
  category: CertificateCategory;
  image: string;
  pdf?: string;
  award?: {
    id: string;
    en: string;
  };
  role?: {
    id: string;
    en: string;
  };
  issuer?: string;
  date?: string;
  eventDate?: {
    id: string;
    en: string;
  };
  description?: {
    id: string;
    en: string;
  };
  credentialUrl?: string;
}

export const certificates: CertificateItem[] = [
  // 1. Juara 2 (Beregu Putra) lebih dulu
  {
    id: "porseni-xv-bridge-beregu-putra",
    title: {
      id: "Pekan Olahraga dan Seni (PORSENI) XV Politeknik Se-Indonesia – Cabang Olahraga Bridge Beregu Putra",
      en: "Polytechnic Sports and Arts Week (PORSENI) XV Indonesia – Bridge Men's Team",
    },
    award: {
      id: "Juara 2",
      en: "2nd Place",
    },
    category: "Kompetisi",
    image: "/certificates/porseni-xv-bridge-beregu-putra.webp",
    pdf: "/certificates/pdf/porseni-xv-bridge-beregu-putra.pdf",
  },

  // 2. Juara 3 (Beregu Campuran)
  {
    id: "porseni-xv-bridge-beregu-campuran",
    title: {
      id: "Pekan Olahraga dan Seni (PORSENI) XV Politeknik Se-Indonesia – Cabang Olahraga Bridge Beregu Campuran",
      en: "Polytechnic Sports and Arts Week (PORSENI) XV Indonesia – Bridge Mixed Team",
    },
    award: {
      id: "Juara 3",
      en: "3rd Place",
    },
    category: "Kompetisi",
    image: "/certificates/porseni-xv-bridge-beregu-campuran.webp",
    pdf: "/certificates/pdf/porseni-xv-bridge-beregu-campuran.pdf",
  },

  // A. Ketua Pelaksana Polinema Bridge Tournament II 2026
  {
    id: "polinema-bridge-tournament-ii-2026-ketua-pelaksana",
    title: {
      id: "Ketua Pelaksana, Polinema Bridge Tournament II 2026",
      en: "Chair of the Organizing Committee, Polinema Bridge Tournament II 2026",
    },
    role: {
      id: "Ketua Pelaksana",
      en: "Chair of the Organizing Committee",
    },
    category: "Kepanitiaan",
    issuer: "UKM Olah Raga Politeknik Negeri Malang",
    eventDate: {
      id: "13 September 2026",
      en: "13 September 2026",
    },
    description: {
      id: "Memimpin kepanitiaan Polinema Bridge Tournament II 2026 yang digelar di Aula Mesin Lantai 4, Politeknik Negeri Malang.",
      en: "Led the organizing committee of Polinema Bridge Tournament II 2026, held at the Mechanical Engineering Hall, 4th floor, Politeknik Negeri Malang.",
    },
    image:
      "/certificates/polinema-bridge-tournament-ii-2026-ketua-pelaksana.webp",
    pdf: "/certificates/pdf/polinema-bridge-tournament-ii-2026-ketua-pelaksana.pdf",
  },

  // B. Panitia Play IT 2026
  {
    id: "play-it-2026-panitia",
    title: {
      id: "Panitia Play IT 2026",
      en: "Committee Member, Play IT 2026",
    },
    role: {
      id: "Panitia",
      en: "Committee Member",
    },
    category: "Kepanitiaan",
    issuer: "Jurusan Teknologi Informasi, Politeknik Negeri Malang",
    eventDate: {
      id: "22–23 Juni 2026",
      en: "22–23 June 2026",
    },
    description: {
      id: "Terlibat dalam kepanitiaan kompetisi nasional Play IT (comPetition for Learning and Advancing Youth in Information Technology) yang diselenggarakan Jurusan Teknologi Informasi Politeknik Negeri Malang.",
      en: "Part of the organizing committee of Play IT, a national competition (comPetition for Learning and Advancing Youth in Information Technology) organized by the Information Technology Department at Politeknik Negeri Malang.",
    },
    image: "/certificates/play-it-2026-panitia.webp",
    pdf: "/certificates/pdf/play-it-2026-panitia.pdf",
  },

  // C. Panitia Kejuaraan Nasional Catur Polinema Cup 2026
  {
    id: "kejurnas-catur-polinema-cup-2026-panitia",
    title: {
      id: "Panitia Kejuaraan Nasional Catur Polinema Cup 2026",
      en: "Committee Member, Polinema Cup 2026 National Chess Championship",
    },
    role: {
      id: "Panitia",
      en: "Committee Member",
    },
    category: "Kepanitiaan",
    issuer: "UKM Olah Raga Politeknik Negeri Malang",
    eventDate: {
      id: "18 April 2026",
      en: "18 April 2026",
    },
    description: {
      id: "Bagian dari kepanitiaan Kejuaraan Nasional Catur Polinema Cup 2026 untuk tingkat SMA/SMK/MAN dan mahasiswa di Politeknik Negeri Malang.",
      en: "Part of the organizing committee of the Polinema Cup 2026 National Chess Championship for senior high school, vocational school, Islamic senior high school, and university students at Politeknik Negeri Malang.",
    },
    image: "/certificates/kejurnas-catur-polinema-cup-2026-panitia.webp",
    pdf: "/certificates/pdf/kejurnas-catur-polinema-cup-2026-panitia.pdf",
  },

  // D. Panitia Campus Fair SMANGGI 2026
  {
    id: "campus-fair-smanggi-2026-panitia",
    title: {
      id: "Panitia Campus Fair SMANGGI 2026",
      en: "Committee Member, Campus Fair SMANGGI 2026",
    },
    role: {
      id: "Panitia",
      en: "Committee Member",
    },
    category: "Kepanitiaan",
    issuer: "Ikatan Alumni SMA Negeri 1 Singgahan",
    eventDate: {
      id: "9 Januari 2026",
      en: "9 January 2026",
    },
    description: {
      id: "Terlibat dalam kepanitiaan Campus Fair SMANGGI 2026 bertema “Merajut Mimpi, Meraih Prestasi, Dalam Harmoni Excellent Moralitas”, acara yang diselenggarakan Ikatan Alumni SMA Negeri 1 Singgahan.",
      en: "Part of the organizing committee of Campus Fair SMANGGI 2026, themed “Merajut Mimpi, Meraih Prestasi, Dalam Harmoni Excellent Moralitas”, organized by the SMA Negeri 1 Singgahan Alumni Association.",
    },
    image: "/certificates/campus-fair-smanggi-2026-panitia.webp",
    pdf: "/certificates/pdf/campus-fair-smanggi-2026-panitia.pdf",
  },

  // E. Panitia Sportifor Interschool Cup 2025
  {
    id: "sportifor-interschool-cup-2025-panitia",
    title: {
      id: "Panitia Sportifor Interschool Cup 2025",
      en: "Committee Member, Sportifor Interschool Cup 2025",
    },
    role: {
      id: "Panitia",
      en: "Committee Member",
    },
    category: "Kepanitiaan",
    issuer: "UKM Olah Raga Politeknik Negeri Malang",
    eventDate: {
      id: "6–7 Desember 2025",
      en: "6–7 December 2025",
    },
    description: {
      id: "Bagian dari kepanitiaan Sportifor Interschool Cup 2025 yang diselenggarakan UKM Olah Raga Politeknik Negeri Malang.",
      en: "Part of the organizing committee of Sportifor Interschool Cup 2025, organized by the Sports Student Activity Unit (UKM Olah Raga) of Politeknik Negeri Malang.",
    },
    image: "/certificates/sportifor-interschool-cup-2025-panitia.webp",
    pdf: "/certificates/pdf/sportifor-interschool-cup-2025-panitia.pdf",
  },

  // F. Panitia Polinema Bridge Tournament 2025
  {
    id: "polinema-bridge-tournament-2025-panitia",
    title: {
      id: "Panitia Polinema Bridge Tournament 2025",
      en: "Committee Member, Polinema Bridge Tournament 2025",
    },
    role: {
      id: "Panitia",
      en: "Committee Member",
    },
    category: "Kepanitiaan",
    issuer: "UKM Olah Raga Politeknik Negeri Malang",
    eventDate: {
      id: "19 Oktober 2025",
      en: "19 October 2025",
    },
    description: {
      id: "Terlibat dalam kepanitiaan Polinema Bridge Tournament 2025 di Aula Mesin Politeknik Negeri Malang.",
      en: "Part of the organizing committee of Polinema Bridge Tournament 2025, held at the Mechanical Engineering Hall, Politeknik Negeri Malang.",
    },
    image: "/certificates/polinema-bridge-tournament-2025-panitia.webp",
    pdf: "/certificates/pdf/polinema-bridge-tournament-2025-panitia.pdf",
  },
];
