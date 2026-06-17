"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionary, type Dictionary, type Lang } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  // Restore preference; otherwise infer from the browser.
  useEffect(() => {
    const stored = window.localStorage.getItem("lee-lang") as Lang | null;
    if (stored === "es" || stored === "en") {
      setLang(stored);
    } else if (navigator.language.toLowerCase().startsWith("en")) {
      setLang("en");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lee-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((prev) => (prev === "es" ? "en" : "es")),
      t: dictionary[lang],
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
