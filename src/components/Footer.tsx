"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { footerTH } from "@/data/mainData/footer-th";
import { footerEN } from "@/data/mainData/footer-en";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLine,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const images = {
  logo: "/images/logoap/APLOGO01.webp",
  certifications: {
    iso: "/images/data/iso.png",
    egat: "/images/data/egat.webp",
    mea: "/images/data/mea.webp",
    pea: "/images/data/pea.webp",
  },
};

const Footer: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params?.locale === "th" ? "th" : "en";
  const t = locale === "th" ? footerTH : footerEN;

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  // Logic การคลิกที่แก้ไขแล้ว
  const handleNavClick = (id: string) => {
    const onHome = pathname === `/${locale}`;

    if (!onHome) {
      router.push(`/${locale}?s=${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const CATEGORY_ALIAS_TO_SLUG: Record<string, string> = {
    ground: "Ground-System",
    hardware: "Low-High-Voltage-Hardware",
    lorfah: "Lightning-Protection-System",
    fire: "Street-Lighting",
    tor: "Conduit-Fittings",
    call: "Telecom-Hardware",
    lighting: "Electrical-Connectors",
    underground: "Underground-Electrical-Equipment",
    Underground: "Underground-Electrical-Equipment",
  };

  const handleProductClick = (category: string) => {
    const mapped = CATEGORY_ALIAS_TO_SLUG[category] || category;
    const slug = encodeURIComponent(mapped.toLowerCase());
    router.push(`/${locale}/product/category/${slug}`);
  };

  const renderImage = (
    src: string,
    alt: string,
    width: number,
    height: number,
    className?: string
  ) => {
    return !failedImages.has(src) ? (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} object-contain`}
        onError={() => handleImageError(src)}
      />
    ) : (
      <div
        className={`bg-gray-200 rounded flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-xs text-professional-grey">{alt}</span>
      </div>
    );
  };

  return (
    <footer className="pt-8 pb-12 bg-modern-white">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="w-48 h-16 mb-4 relative">
            {!failedImages.has(images.logo) ? (
              <Image
                src={images.logo}
                alt="AP Logo"
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-contain"
                onError={() => handleImageError(images.logo)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">AP Logo</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation Section */}
          <div>
            <h5 className="text-lg font-semibold text-professional-grey mb-4">
              {t.navigationTitle}
            </h5>
            <ul className="space-y-2">
              {t.navigationItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(item.target)}
                    className="text-professional-grey hover:text-ap-red transition-colors duration-200 text-left"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories Section */}
          <div>
            <h5 className="text-lg font-semibold text-professional-grey mb-4">
              {t.productCategoriesTitle}
            </h5>
            <div className="space-y-2">
              {t.productCategories.map((item, index) => (
                <div key={index} className="flex">
                  <button
                    onClick={() => handleProductClick(item.category)}
                    className="text-professional-grey hover:text-red-500 transition-colors duration-200 text-left text-sm"
                  >
                    {item.text}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h5 className="text-lg font-semibold text-professional-grey mb-4">
              {t.contactInfoTitle}
            </h5>
            <div className="space-y-3 text-sm text-professional-grey">
              <p className="font-medium">{t.companyName}</p>
              <p>{t.address.line1}</p>
              <p>{t.address.line2}</p>
              <p>
                <strong>{t.mobile.split("|")[0]}</strong> |{" "}
                {t.mobile.split("|")[1]}
              </p>
              <p>
                <strong>{t.fax.split("|")[0]}</strong> | {t.fax.split("|")[1]}
              </p>
              <div className="flex items-center gap-3">
                <span>{t.followUs}</span>
                {t.socialMedia && (
                  <div className="flex gap-3">
                    {/* Facebook Icon */}
                    {t.socialMedia.facebook && (
                      <a
                        href={t.socialMedia.facebook.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-professional-grey hover:text-ap-red transition-colors duration-200"
                        aria-label={t.socialMedia.facebook.name}
                      >
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                      </a>
                    )}

                    {/* LINE Icon */}
                    {t.socialMedia.line && (
                      <a
                        href={t.socialMedia.line.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-professional-grey hover:text-ap-red transition-colors duration-200"
                        aria-label={t.socialMedia.line.name}
                      >
                        <FontAwesomeIcon icon={faLine} size="lg" />
                      </a>
                    )}

                    {/* Tiktok Icon */}
                    {t.socialMedia.tiktok && (
                      <a
                        href={t.socialMedia.tiktok.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-professional-grey hover:text-ap-red transition-colors duration-200"
                        aria-label={t.socialMedia.tiktok.name}
                      >
                        <FontAwesomeIcon icon={faTiktok} size="lg" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h5 className="text-lg font-semibold text-professional-grey mb-4">
              {t.certificationsTitle}
            </h5>
            <div className="grid grid-cols-2 gap-1 max-w-[180px] mb-4">
              <div className="col-span-2 flex justify-center items-center h-10">
                {renderImage(
                  images.certifications.iso,
                  "ISO",
                  96,
                  64,
                  "max-w-20 max-h-10"
                )}
              </div>
              <div className="col-span-2 flex justify-center items-center h-10">
                {renderImage(
                  images.certifications.egat,
                  "EGAT",
                  96,
                  64,
                  "max-w-20 max-h-10"
                )}
              </div>
              <div className="flex justify-center items-center h-8">
                {renderImage(
                  images.certifications.mea,
                  "MEA",
                  80,
                  48,
                  "max-w-16 max-h-8"
                )}
              </div>
              <div className="flex justify-center items-center h-8">
                {renderImage(
                  images.certifications.pea,
                  "PEA",
                  80,
                  48,
                  "max-w-16 max-h-8"
                )}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-xs text-professional-grey leading-relaxed">
              <p>{t.copyright}</p>
              <p>{t.privacyPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
