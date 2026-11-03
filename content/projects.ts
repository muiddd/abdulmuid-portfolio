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
    cover: "",
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
          id: "Merancang antarmuka di Figma. Mengimplementasikan halaman Tentang dan Berita dengan HTML/CSS. [PLACEHOLDER: tantangan atau keputusan desain]",
          en: "Designed the interface in Figma. Built the About and News pages with HTML/CSS. [PLACEHOLDER: a design challenge or decision]",
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
          id: "[PLACEHOLDER] Halaman Tentang",
          en: "[PLACEHOLDER] About Page",
        },
        aspectRatio: "video",
      },
      {
        label: {
          id: "[PLACEHOLDER] Halaman Berita",
          en: "[PLACEHOLDER] News Page",
        },
        aspectRatio: "video",
      },
      {
        label: {
          id: "[PLACEHOLDER] Frame Figma 1",
          en: "[PLACEHOLDER] Figma Frame 1",
        },
        aspectRatio: "video",
      },
      {
        label: {
          id: "[PLACEHOLDER] Frame Figma 2",
          en: "[PLACEHOLDER] Figma Frame 2",
        },
        aspectRatio: "video",
      },
      {
        label: {
          id: "[PLACEHOLDER] Frame Figma 3",
          en: "[PLACEHOLDER] Figma Frame 3",
        },
        aspectRatio: "video",
      },
    ],
  },
  {
    slug: "project-two",
    title: {
      id: "[PLACEHOLDER] Desain Sistem & Aplikasi Mobile",
      en: "[PLACEHOLDER] Mobile App & Design System",
    },
    category: {
      id: "Mobile App",
      en: "Mobile App",
    },
    role: "[PLACEHOLDER] UI/UX Designer & Frontend",
    year: "2025",
    stack: ["Figma", "React Native", "TypeScript", "Tailwind CSS"],
    summary: {
      id: "[PLACEHOLDER] Perancangan sistem desain terpadu dan implementasi antarmuka aplikasi intuitif.",
      en: "[PLACEHOLDER] Unified design system architecture and intuitive application interface implementation.",
    },
    cover: "/images/projects/project-2.jpg",
    sections: [
      {
        title: { id: "Masalah", en: "The Problem" },
        content: {
          id: "[PLACEHOLDER] Kendala inkonsistensi antarmuka pengguna pada platform.",
          en: "[PLACEHOLDER] User interface inconsistency challenges on the existing platform.",
        },
      },
      {
        title: { id: "Proses Desain", en: "Design Process" },
        content: {
          id: "[PLACEHOLDER] Alur wireframing, uji prototipe, dan standarisasi token desain.",
          en: "[PLACEHOLDER] Wireframing workflow, user prototype testing, and design token standardization.",
        },
      },
    ],
  },
  {
    slug: "project-three",
    title: {
      id: "[PLACEHOLDER] Dashboard Analitik Real-time",
      en: "[PLACEHOLDER] Real-Time Analytics Dashboard",
    },
    category: {
      id: "Dashboard",
      en: "Dashboard",
    },
    role: "[PLACEHOLDER] Fullstack Developer",
    year: "2024",
    stack: ["React", "Express.js", "PostgreSQL", "Tailwind CSS"],
    summary: {
      id: "[PLACEHOLDER] Platform pemantauan data real-time dengan visualisasi interaktif dan latensi rendah.",
      en: "[PLACEHOLDER] Real-time data monitoring platform with interactive visualizations and low latency.",
    },
    cover: "/images/projects/project-3.jpg",
    sections: [
      {
        title: { id: "Tantangan", en: "Challenges" },
        content: {
          id: "[PLACEHOLDER] Penanganan data volume tinggi dan rendering grafik secara responsif.",
          en: "[PLACEHOLDER] Handling high-volume data streams and responsive chart rendering.",
        },
      },
    ],
  },
  {
    slug: "project-four",
    title: {
      id: "[PLACEHOLDER] Eksplorasi Eksperimental UI",
      en: "[PLACEHOLDER] Experimental UI Exploration",
    },
    category: {
      id: "Web App",
      en: "Web App",
    },
    role: "[PLACEHOLDER] Creative Developer",
    year: "2024",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    summary: {
      id: "[PLACEHOLDER] Eksplorasi interaksi mikro dan transisi kanvas kreatif untuk pengalaman visual imersif.",
      en: "[PLACEHOLDER] Exploration of micro-interactions and creative canvas transitions for immersive visual experiences.",
    },
    cover: "/images/projects/project-4.jpg",
    sections: [
      {
        title: { id: "Eksplorasi", en: "Exploration" },
        content: {
          id: "[PLACEHOLDER] Eksperimen gestur interaktif dan animasi berbasis performa.",
          en: "[PLACEHOLDER] Experimenting with interactive gesture mechanics and performant animations.",
        },
      },
    ],
  },
];
