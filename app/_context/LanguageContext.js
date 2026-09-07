"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  isRtl: false,
});

export const LanguageProvider = ({ children, initialLanguage = "en" }) => {
  const [language, setLanguageState] = useState(initialLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang && (urlLang === "en" || urlLang === "ar")) {
        setLanguageState(urlLang);
        return;
      }

      const savedLang = localStorage.getItem("techsolutionor_lang");
      if (savedLang && (savedLang === "en" || savedLang === "ar")) {
        setLanguageState(savedLang);
        return;
      }

      const docLang = document.documentElement.lang;
      if (docLang && (docLang === "en" || docLang === "ar")) {
        setLanguageState(docLang);
      }
    }
  }, []);

  const setLanguage = (newLang) => {
    if (newLang !== "en" && newLang !== "ar") return;
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("techsolutionor_lang", newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    }
  };

  const isRtl = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
