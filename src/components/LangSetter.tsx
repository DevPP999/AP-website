"use client";

import { useEffect } from "react";

export default function LangSetter({ lang }: { lang: "en" | "th" }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  return null;
}
