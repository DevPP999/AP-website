"use client"; // จำเป็นต้องใส่เพราะมีการใช้ State และ onClick

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogueViewer from "@/components/CatalogueViewer"; // อย่าลืม Import ไฟล์ที่สร้างตะกี้

type ContactSaleProps = {
  dictionary: {
    heading: string;
    contactButton: string;
    downloadButton: string;
  };
};

const ContactSale: React.FC<ContactSaleProps> = ({ dictionary }) => {
  // สร้าง State ควบคุมการเปิด/ปิด E-book
  const [showEbook, setShowEbook] = useState(false);

  return (
    <>
      <section
        id="contact-sale"
        className="py-28 md:py-36 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(240, 240, 240, 0.85), rgba(240, 240, 240, 0.85)), url('/background/4.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col space-y-6">
            <AnimatedSection type="slide-up" priority="important" delay={0.1}>
              <h3 className="text-2xl md:text-2xl font-semibold text-professional-grey">
                {dictionary.heading}
              </h3>
            </AnimatedSection>

            <AnimatedSection
              type="fade"
              priority="optional"
              stagger={0.1}
              useCSS={true}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* ปุ่มติดต่อ LINE (คงเดิมไว้) */}
                <a
                  href="https://page.line.me/iampong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-ap-red text-white rounded-md border border-ap-red hover:bg-red-700 transition-colors duration-300 font-medium text-center"
                >
                  {dictionary.contactButton}
                </a>

                {/* ปุ่มเปิด E-book (แก้ไขใหม่) */}
                <button
                  onClick={() => setShowEbook(true)}
                  className="px-6 py-3 bg-white text-ap-red rounded-md border border-red-600 hover:bg-red-50 transition-colors duration-300 font-bold"
                >
                  {dictionary.downloadButton}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* --- ส่วนของ Modal Popup แสดง E-book --- */}
      {showEbook && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          {/* กล่องสีขาวใส่ E-book */}
          <div className="relative w-full max-w-6xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header ของ Modal (ปุ่มปิด) */}
            <div className="flex justify-end p-2 bg-gray-100 border-b">
              <button
                onClick={() => setShowEbook(false)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full transition-all"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* พื้นที่แสดงผล CatalogueViewer */}
            <div className="flex-1 w-full bg-gray-50">
              <CatalogueViewer />
            </div>
          </div>

          {/* คลิกพื้นหลังสีดำเพื่อปิด */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setShowEbook(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default ContactSale;
