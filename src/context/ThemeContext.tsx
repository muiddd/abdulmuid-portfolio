"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeOrigin = { x: number; y: number };

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: ThemeOrigin) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "abdulmuid_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setThemeState(initial);
        applyThemeClass(initial);
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setMounted(true);
    }
  }, []);

  const applyThemeClass = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const commitTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore error
    }
  };

  /**
   * Applies the theme change with a circular reveal that grows from the point
   * the user clicked (View Transitions API). Browsers without support, and
   * users who prefer reduced motion, get a short colour crossfade instead.
   */
  const setThemeWithTransition = (newTheme: Theme, origin?: ThemeOrigin) => {
    if (typeof document === "undefined") {
      commitTheme(newTheme);
      return;
    }

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (callback: () => void) => {
          ready: Promise<void>;
        };
      }
    ).startViewTransition;

    if (prefersReducedMotion) {
      commitTheme(newTheme);
      return;
    }

    if (typeof startViewTransition !== "function") {
      // Fallback: briefly transition colour properties on every element so the
      // switch still feels animated instead of snapping.
      root.classList.add("theme-transitioning");
      commitTheme(newTheme);
      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 450);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    try {
      const transition = startViewTransition(() => {
        // flushSync guarantees the class swap happens inside the transition
        // snapshot, otherwise the new theme would be captured too late.
        flushSync(() => commitTheme(newTheme));
      });

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 620,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          // The transition may be skipped if another one is running.
        });
    } catch {
      commitTheme(newTheme);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeWithTransition(newTheme);
  };

  const toggleTheme = (origin?: ThemeOrigin) => {
    setThemeWithTransition(theme === "light" ? "dark" : "light", origin);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {/* Script in head prevents flash, but mounted check ensures consistent client renders */}
      <div style={{ visibility: mounted ? "visible" : "visible" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
