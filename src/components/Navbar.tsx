"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import en from "@/messages/en.json";
import th from "@/messages/th.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLine,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import LocaleDropdown from "./LocaleDropdown";
import type { Locale, Navbar as NavbarType } from "@/types";

interface NavbarProps {
  locale: Locale;
  dictionary: NavbarType;
}

const images = {
  logo: "/images/logoap/APLOGO01.webp",
};

const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  // messages JSON files have a larger shape; we only need `navbar` here.
  type Translations = { navbar: Record<string, string> };
  const dict =
    locale === "th"
      ? (th as unknown as Translations)
      : (en as unknown as Translations);
  const t = {
    menuItems: [
      { target: "about-us", text: dict.navbar.about },
      { target: "whyap", text: dict.navbar.whyap },
      { target: "main-product", text: dict.navbar.products },
      { target: "articles", text: dict.navbar.articles },
      { target: "contactUs", text: dict.navbar.contact },
    ],
  };

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  const goToHomeWithSection = (id: string) => {
    router.push(`/${locale}?s=${id}`);
    setIsMenuOpen(false);
  };

  const getScrollOffset = (): number => {
    const navEl = document.querySelector("nav");
    const navHeight = navEl
      ? (navEl as HTMLElement).getBoundingClientRect().height
      : 0;
    // Add a small breathing room below the sticky navbar
    return Math.max(60, Math.round(navHeight + 8));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = getScrollOffset();
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleSmoothScroll = (id: string) => {
    const onHome = pathname === `/${locale}`;
    if (!onHome) return goToHomeWithSection(id);

    // Close mobile menu first so the sticky navbar height collapses
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => scrollToSection(id), 250);
      return;
    }

    scrollToSection(id);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Compute a dynamic probe line based on navbar height
      const probe = (() => {
        const navEl = document.querySelector("nav");
        const navHeight = navEl
          ? (navEl as HTMLElement).getBoundingClientRect().height
          : 0;
        return Math.max(80, Math.round(navHeight + 20));
      })();

      for (const item of t.menuItems) {
        const el = document.getElementById(item.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probe && rect.bottom >= probe) {
            setActiveSection(item.target);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t.menuItems]);

  const toggleHamburger = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoClick = () => handleSmoothScroll("hero");

  return (
    <nav
      className={`sticky top-0 z-50 bg-light-grey transition-all duration-300 px-4 pt-4 pb-4 ${
        hasMounted && isScrolled ? "shadow-md" : ""
      }`}
      suppressHydrationWarning
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-8 relative">
          {/* Logo */}
          <div className="logo w-36 h-12">
            <button onClick={handleLogoClick} className="block w-full h-full">
              {!failedImages.has(images.logo) ? (
                <Image
                  src={images.logo}
                  alt="AP Logo"
                  width={144} // 36 * 4 = 144px
                  height={48} // 12 * 4 = 48px
                  className="object-contain w-full h-full"
                  onError={() => handleImageError(images.logo)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">AP Logo</span>
                </div>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex list-none items-center text-md space-x-6">
            {t.menuItems.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => handleSmoothScroll(item.target)}
                  className={`text-gray-800 no-underline border-b-2 border-transparent transition-all duration-300 inline-block hover:text-red-500 ${
                    activeSection === item.target
                      ? "font-bold text-red-500 border-red-500"
                      : ""
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>

          {/* Social & Locale (Desktop) */}
          <ul className="hidden lg:flex list-none items-center space-x-4">
            <li>
              <a
                href="https://www.facebook.com/iampongdevelopment"
                className="text-gray-800 hover:text-ap-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
            </li>
            <li>
              <a
                href="https://page.line.me/iampong"
                className="text-gray-800 hover:text-ap-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLine} size="lg" />
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@iampong.ap"
                className="text-gray-800 hover:text-ap-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </a>
            </li>
            <li>
              <LocaleDropdown currentLocale={locale} />
            </li>
          </ul>

          {/* Hamburger (Mobile) */}
          <div
            className="lg:hidden inline-block cursor-pointer absolute right-4 "
            onClick={toggleHamburger}
          >
            <div
              className={`w-9 h-1 bg-gray-800 my-1.5 transition-all duration-400 ${
                isMenuOpen ? "transform translate-y-2.5 rotate-45" : ""
              }`}
            ></div>
            <div
              className={`w-9 h-1 bg-gray-800 my-1.5 transition-all duration-400 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-9 h-1 bg-gray-800 my-1.5 transition-all duration-400 ${
                isMenuOpen ? "transform -translate-y-2.5 -rotate-45" : ""
              }`}
            ></div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col space-y-4 py-4 border-t border-gray-200">
            {t.menuItems.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => handleSmoothScroll(item.target)}
                  className={`text-gray-800 text-md w-full text-left py-2 px-4 rounded transition-all duration-200 hover:bg-gray-100 hover:text-red-500 ${
                    activeSection === item.target
                      ? "font-bold text-red-500 bg-gray-50"
                      : ""
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}

            {/* Locale & Social (Mobile) */}
            <li className="pt-2 flex justify-between items-center">
              <a
                href="https://www.facebook.com/iampongdevelopment"
                className="text-gray-500 hover:text-ap-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="https://page.line.me/iampong"
                className="text-gray-500 hover:text-ap-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLine} size="lg" />
              </a>
              <a
                href="https://www.tiktok.com/@iampong.ap"
                className="text-gray-500 hover:text-ap-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </a>
              <LocaleDropdown currentLocale={locale} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
