export type CertificateCategory = "Development" | "Design" | "Lainnya";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  image: string;
  credentialUrl?: string;
}

export const certificates: CertificateItem[] = [
  {
    id: "cert-dev-1",
    title: "[PLACEHOLDER] Sertifikasi Pengembang Web Fullstack Modern",
    issuer: "[PLACEHOLDER] Platform Pendidikan / Lembaga Terakreditasi",
    date: "[PLACEHOLDER] 2024",
    category: "Development",
    image: "/images/certificates/cert-1.jpg",
    credentialUrl: "https://example.com/credential/placeholder-1",
  },
  {
    id: "cert-design-1",
    title: "[PLACEHOLDER] Sertifikasi Desain Sistem & UI/UX Profesional",
    issuer: "[PLACEHOLDER] Lembaga Desain / Kursus Terakreditasi",
    date: "[PLACEHOLDER] 2024",
    category: "Design",
    image: "/images/certificates/cert-2.jpg",
    credentialUrl: "https://example.com/credential/placeholder-2",
  },
  {
    id: "cert-dev-2",
    title: "[PLACEHOLDER] Sertifikasi Frontend React & TypeScript",
    issuer: "[PLACEHOLDER] Platform Sertifikasi Pengembang Global",
    date: "[PLACEHOLDER] 2023",
    category: "Development",
    image: "/images/certificates/cert-3.jpg",
    credentialUrl: "https://example.com/credential/placeholder-3",
  },
  {
    id: "cert-design-2",
    title: "[PLACEHOLDER] Sertifikasi Riset Pengguna & Prototipe Interaktif",
    issuer: "[PLACEHOLDER] Akademi Desain Produk Digital",
    date: "[PLACEHOLDER] 2023",
    category: "Design",
    image: "/images/certificates/cert-4.jpg",
    credentialUrl: "https://example.com/credential/placeholder-4",
  },
  {
    id: "cert-other-1",
    title: "[PLACEHOLDER] Program Pelatihan Kepemimpinan & Komunitas",
    issuer: "[PLACEHOLDER] Google Student Ambassador / Program Mitra",
    date: "[PLACEHOLDER] 2024",
    category: "Lainnya",
    image: "/images/certificates/cert-5.jpg",
    credentialUrl: "https://example.com/credential/placeholder-5",
  },
  {
    id: "cert-other-2",
    title: "[PLACEHOLDER] Penghargaan Kompetisi Bridge Tingkat Nasional",
    issuer: "[PLACEHOLDER] Federasi / Penyelenggara Kejuaraan Nasional",
    date: "[PLACEHOLDER] 2024",
    category: "Lainnya",
    image: "/images/certificates/cert-6.jpg",
    credentialUrl: "https://example.com/credential/placeholder-6",
  },
];
