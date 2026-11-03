import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,json}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        surface2: "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "12": ["12px", { lineHeight: "16px" }],
        "14": ["14px", { lineHeight: "20px" }],
        "16": ["16px", { lineHeight: "24px" }],
        "20": ["20px", { lineHeight: "28px" }],
        "28": ["28px", { lineHeight: "36px" }],
        "40": ["40px", { lineHeight: "44px" }],
        "64": ["64px", { lineHeight: "68px" }],
        "112": ["clamp(48px, 8.5vw, 112px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        "12": "12px",
        "24": "24px",
        "48": "48px",
        "999": "9999px",
        "8": "8px",
        "16": "16px",
      },
      spacing: {
        "space-4": "4px",
        "space-8": "8px",
        "space-12": "12px",
        "space-16": "16px",
        "space-24": "24px",
        "space-32": "32px",
        "space-48": "48px",
        "space-64": "64px",
        "space-96": "96px",
        "space-128": "128px",
      },
      transitionDuration: {
        fast: "200ms",
        normal: "300ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
