import React from "react";

interface CatalogueViewerProps {
  url?: string;
}

const CatalogueViewer: React.FC<CatalogueViewerProps> = ({
  url = "https://online.fliphtml5.com/fjitz/Catalog-new/",
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          border: "none",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
        }}
        src={url}
        // --- ส่วนที่แก้ไข ---
        allowFullScreen={true} // อันนี้ React ชอบ camelCase และเป็น Boolean ถูกแล้ว
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        {...({ allowtransparency: "true" } as Record<string, string>)}
      />
    </div>
  );
};

export default CatalogueViewer;
