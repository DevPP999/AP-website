"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import type { Locale } from "@/types";

// Custom ChevronDown icon component
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

interface LocaleDropdownProps {
  currentLocale: Locale;
}

interface LocaleOption {
  code: Locale;
  name: string;
  flag: string;
  nativeName: string;
}

const locales: LocaleOption[] = [
  {
    code: "th",
    name: "Thai",
    flag: "/images/flags/TH.svg",
    nativeName: "ไทย",
  },
  {
    code: "en",
    name: "English",
    flag: "/images/flags/EN.webp",
    nativeName: "English",
  },
];

export default function LocaleDropdown({ currentLocale }: LocaleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocaleData = locales.find(
    (locale) => locale.code === currentLocale
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath, { scroll: false });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[120px] w-full lg:w-auto justify-between"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        suppressHydrationWarning
      >
        <div className="flex items-center space-x-2">
          {hasMounted && currentLocaleData ? (
            <Image
              src={currentLocaleData.flag}
              alt={`${currentLocaleData.name} flag`}
              width={24}
              height={20}
              className="rounded-sm w-6 h-5"
            />
          ) : (
            <div className="w-6 h-5 bg-gray-200 rounded-sm" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {currentLocaleData?.nativeName}
          </span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 lg:right-0 lg:left-auto mb-2 lg:mt-2 lg:mb-0 bottom-full lg:bottom-auto w-full lg:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="py-1" role="listbox">
            {locales.map((locale) => (
              <li
                key={locale.code}
                role="option"
                aria-selected={locale.code === currentLocale}
              >
                <button
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    locale.code === currentLocale
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  <Image
                    src={locale.flag}
                    alt={`${locale.name} flag`}
                    width={24}
                    height={20}
                    className="rounded-sm w-6 h-5"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {locale.nativeName}
                    </span>
                    <span className="text-xs text-gray-500">{locale.name}</span>
                  </div>
                  {locale.code === currentLocale && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
