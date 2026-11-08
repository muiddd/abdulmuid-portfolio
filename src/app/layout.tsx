import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/common/CustomCursor";
import { InteractiveBackground } from "@/components/common/InteractiveBackground";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://abdulmuid.dev"),
  title: {
    default: "Abdul Muid — Fullstack Developer & UI/UX Intern",
    template: "%s | Abdul Muid",
  },
  description: "Portofolio pribadi Abdul Muid untuk posisi Fullstack Developer Intern dan UI/UX Intern. Mahasiswa Teknik Informatika di Politeknik Negeri Malang.",
  openGraph: {
    title: "Abdul Muid — Fullstack Developer & UI/UX Intern",
    description: "Portofolio pribadi Abdul Muid untuk posisi Fullstack Developer Intern dan UI/UX Intern.",
    url: "https://abdulmuid.dev",
    siteName: "Abdul Muid Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Muid — Fullstack Developer & UI/UX Intern",
    description: "Portofolio pribadi Abdul Muid untuk posisi Fullstack Developer Intern dan UI/UX Intern.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('abdulmuid_theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-text selection:text-bg bg-bg text-text">
        <InteractiveBackground />
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <div className="flex-1 w-full">
              {children}
            </div>
            <Footer />
            <CustomCursor />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
