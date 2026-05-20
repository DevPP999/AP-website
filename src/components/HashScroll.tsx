"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash?.replace("#", "");
    const section = url.searchParams.get("s") || hash;

    if (!section) return;

    const el = document.getElementById(section);
    if (el) {
      const navEl = document.querySelector("nav");
      const navHeight = navEl
        ? (navEl as HTMLElement).getBoundingClientRect().height
        : 0;
      const offset = Math.max(60, Math.round(navHeight + 8));
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      // ลบ query/hash ออกจาก URL หลังเลื่อนเสร็จ
      const cleanedUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanedUrl);
    }
  }, []);

  return null;
}
