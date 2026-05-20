"use client";

import { useEffect, useState } from "react";
import ImagePopupModal from "./ImagePopupModal";

const PopupWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <ImagePopupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default PopupWrapper;
