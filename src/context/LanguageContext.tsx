"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import idDict from "../../content/id.json";
import enDict from "../../content/en.json";

export type Language = "id" | "en";
export type Dictionary = typeof idDict;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (keyPath: string, fallback?: string) => string;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = "abdulmuid_lang";

const dictionaries: Record<Language, Dictionary> = {
  id: idDict,
  en: enDict,
};

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("id");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
      if (savedLang === "id" || savedLang === "en") {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore error
    }
  };

  const toggleLang = () => {
    const nextLang = lang === "id" ? "en" : "id";
    setLang(nextLang);
  };

  const currentDict = dictionaries[lang];

  const t = (keyPath: string, fallback = ""): string => {
    const val = getNestedValue(currentDict as unknown as Record<string, unknown>, keyPath);
    if (val !== undefined) return val;
    // Fallback to idDict if missing
    const fallbackVal = getNestedValue(idDict as unknown as Record<string, unknown>, keyPath);
    return fallbackVal !== undefined ? fallbackVal : fallback || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dict: currentDict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

