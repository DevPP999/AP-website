"use client";
import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  quality?: number;
  onError?: () => void;
  onClick?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className = "",
  placeholder = "empty",
  blurDataURL,
  quality = 85,
  onError,
  onClick,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL =
    blurDataURL ||
    (width && height ? generateBlurDataURL(width, height) : undefined);

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-gray-500 text-sm" role="img" aria-label={alt}>
          {alt}
        </span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: `${className} ${
      isLoading ? "opacity-0" : "opacity-100"
    } transition-opacity duration-300`,
    onError: handleError,
    onLoad: handleLoad,
    priority,
    quality,
    sizes,
    ...(placeholder === "blur" &&
      defaultBlurDataURL && {
        placeholder: "blur" as const,
        blurDataURL: defaultBlurDataURL,
      }),
    ...(onClick && { onClick }),
  };

  if (fill) {
    return <Image {...imageProps} fill alt={alt} />;
  }

  return <Image {...imageProps} width={width!} height={height!} alt={alt} />;
}
