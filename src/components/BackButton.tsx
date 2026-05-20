"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  locale: "th" | "en";
  className?: string;
}

export default function BackButton({ locale, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={className}>
      {locale === "th" ? "ย้อนกลับ" : "Go Back"}
    </button>
  );
}
