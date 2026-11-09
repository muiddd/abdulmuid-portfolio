"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Tracks whether the page is ready to run its entrance animations.
 *
 * The preloader covers the whole viewport on first load, so animating content
 * immediately would waste the animation behind the curtain. Components that
 * reveal themselves wait for `ready` to flip, which happens either right away
 * (returning visitor / no preloader) or when the preloader starts lifting.
 */

const EntranceContext = createContext<{ ready: boolean }>({ ready: false });

export function EntranceProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    // Returning visitors never see the preloader, so reveal immediately.
    if (root.classList.contains("preloader-skip")) {
      setReady(true);
      return;
    }

    const complete = () => setReady(true);
    window.addEventListener("preloader:complete", complete);

    // Safety net: never leave content hidden if the preloader misbehaves.
    const fallback = window.setTimeout(complete, 9000);

    return () => {
      window.removeEventListener("preloader:complete", complete);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <EntranceContext.Provider value={{ ready }}>
      {children}
    </EntranceContext.Provider>
  );
}

export function useEntrance() {
  return useContext(EntranceContext);
}
