"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImagePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImagePopupModal: React.FC<ImagePopupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Intentionally do NOT lock body scrolling so the user can scroll
    // the page while the popup/modal is open. This keeps the background
    // interactive and satisfies the UX requirement to allow scrolling.
    return () => {
      // no-op cleanup
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 pt-20">
      <div className="relative w-full max-w-[1200px] mx-auto">
        {/* Image container - aspect ratio 1200:800 = 3:2 */}
        <div className="relative w-full aspect-[3/2] max-h-[85vh]">
          <Image
            src="/images/popup/Queen.webp"
            alt="Queen Popup Image"
            fill
            style={{ objectFit: "contain" }}
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        {/* Close button - อยู่ข้างล่าง modal */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-100 transition-colors font-medium"
            aria-label="Close popup"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopupModal;
