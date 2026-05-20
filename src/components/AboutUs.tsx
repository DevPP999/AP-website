"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AnimatedSection from "@/components/AnimatedSection";

type AboutDictionary = {
  title: string;
  subtitle: string;
  storyTitle: string;
  storyDesc: string;
  storyDesc2?: string;
  visionTitle: string;
  visionName: string;
  vision: string;
  missionName: string;
  mission: string;
  partnerTitle: string;
  partnerDesc: string;
  comprehensive: string;
  modernName: string;
  modern: string;
  reliableName: string;
  reliable: string;
  valueName: string;
  value: string;
  friendlyName: string;
  friendly: string;
  trustTitle: string;
  isoNote: string;
  factoryTitle: string;
  factoryDesc: string;
};

type AboutUsProps = {
  dictionary: AboutDictionary;
};

const images = {
  companyLogo: "/images/data/999.webp",
  certifications: {
    iso: "/images/data/iso.png",
    mit: "/images/data/mit.webp",
    egat: "/images/data/egat.webp",
    mea: "/images/data/mea.webp",
    pea: "/images/data/pea.webp",
  },
  factory: [
    "/images/data/a1.webp",
    "/images/data/a2.webp",
    "/images/data/a3.webp",
    "/images/data/a4.webp",
    "/images/data/a5.webp",
    "/images/data/a6.webp",
  ],
};

const AboutUs: React.FC<AboutUsProps> = ({ dictionary }) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const [certIndex, setCertIndex] = useState(-1);
  const [factoryIndex, setFactoryIndex] = useState(-1);

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  // 💡 ฟังก์ชัน renderImageOrPlaceholder ที่มี onClick
  const renderImageOrPlaceholder = (
    src: string,
    alt: string,
    className: string,
    fill?: boolean,
    onClick?: () => void
  ) => {
    if (failedImages.has(src)) {
      return (
        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-500">{alt}</span>
        </div>
      );
    }

    const imageElement = fill ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={className}
        onError={() => handleImageError(src)}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className={className}
        onError={() => handleImageError(src)}
      />
    );

    if (onClick) {
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          className="w-full h-full p-0 border-none bg-transparent cursor-pointer relative flex items-center justify-center"
          aria-label={`View ${alt} in gallery`}
        >
          {imageElement}
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        {imageElement}
      </div>
    );
  };

  const allCertImages = [
    images.certifications.iso,
    images.certifications.egat,
    images.certifications.mea,
    images.certifications.pea,
    images.certifications.mit,
  ];

  return (
    <section
      id="about-us"
      className="py-16 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 240, 240, 0.85), rgba(240, 240, 240, 0.85)), url('/background/5.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(240,240,240,0.85)] -z-10" />
      <div className="container max-w-5xl mx-auto px-4">
        <AnimatedSection type="fade" priority="important" delay={0.1}>
          <div className="mb-4">
            <h2 className="text-4xl font-bold text-professional-grey mb-2">
              {dictionary.title}
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto space-y-12">
          <AnimatedSection type="slide-up" priority="optional" delay={0.2}>
            <div>
              <h4 className="text-xl font-bold text-professional-grey mb-4">
                {dictionary.storyTitle}
              </h4>
              <p className="font-medium text-professional-grey leading-relaxed whitespace-pre-line">
                {dictionary.storyDesc}
              </p>
              {dictionary.storyDesc2 && (
                <p className="font-medium text-professional-grey leading-relaxed whitespace-pre-line mt-4">
                  {dictionary.storyDesc2}
                </p>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection type="fade" priority="optional" delay={0.3}>
            <hr className="border-t-2 border-medium-grey my-8" />
          </AnimatedSection>

          <AnimatedSection type="slide-up" priority="optional" delay={0.4}>
            <div>
              <h4 className="text-2xl font-bold text-professional-grey mb-6">
                {dictionary.visionTitle}
              </h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 text-red-500 text-2xl font-bold">
                    •
                  </div>
                  <h5 className="text-xl font-bold text-professional-grey mb-2">
                    {dictionary.visionName}
                  </h5>
                  <p className="font-medium text-professional-grey">
                    {dictionary.vision}
                  </p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 text-red-500 text-2xl font-bold">
                    •
                  </div>
                  <h5 className="text-xl font-bold text-professional-grey mb-2">
                    {dictionary.missionName}
                  </h5>
                  <p className="font-medium  text-professional-grey">
                    {dictionary.mission}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection type="fade" priority="optional" delay={0.5}>
            <hr className="border-t-2 border-medium-grey my-8" />
          </AnimatedSection>

          <AnimatedSection type="slide-up" priority="optional" delay={0.6}>
            <div>
              <h4 className="text-2xl font-bold text-professional-grey mb-6">
                {dictionary.partnerTitle}
              </h4>

              {/* Desktop partner */}
              <div className="hidden lg:grid grid-cols-3 gap-2 items-start">
                <div className="space-y-6 mt-5">
                  <div>
                    <h5 className="text-xl font-bold text-right text-professional-grey mb-2">
                      {dictionary.partnerDesc}
                    </h5>
                    <p className="font-medium text-md text-right text-professional-grey mb-24">
                      {dictionary.comprehensive}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-right text-professional-grey mb-2">
                      {dictionary.modernName}
                    </h5>
                    <p className="font-medium text-md text-right text-professional-grey">
                      {dictionary.modern}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-70 h-70 relative mt-10">
                    {/* วงกลมแดงหนา */}
                    <div className="absolute inset-0 border-10 border-ap-red rounded-full"></div>

                    {/* จุดแดงบนวงกลม - เรียงตามรูปอ้างอิง */}
                    {/* บน - Reliable */}
                    <div
                      className="absolute w-10 h-10 bg-ap-red rounded-full flex items-center justify-center z-10"
                      style={{
                        left: "70%",
                        top: "15px",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M268.5 37.3c-8-3.4-17-3.4-25 0l-176.7 75C55.5 117 47.9 127.7 48 139.8c.5 94 39.3 259.8 195.4 334.5c7.9 3.8 17.2 3.8 25.1 0c156.1-74.7 195-240.4 195.5-334.5c.1-12.1-7.5-22.8-18.8-27.6l-176.7-75zM231 7.8c16-6.8 34-6.8 50 0l176.7 75c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L231 7.8z"
                        ></path>
                      </svg>
                    </div>

                    {/* บนขวา - Value */}
                    <div
                      className="absolute w-10 h-10 bg-ap-red rounded-full flex items-center justify-center z-10"
                      style={{
                        right: "5px",
                        top: "50%",
                        transform: "translate(50%, -50%)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="-30 0 640 512"
                      >
                        <path
                          d="M480 96c0 35.3 28.7 64 64 64V128c0-17.7-14.3-32-32-32H480zm-32 0H128c0 
                          53-43 96-96 96V320c53 0 96 43 96 96H448c0-53 43-96 
                          96-96V192c-53 0-96-43-96-96zM32 384c0 17.7 14.3 32 
                          32 32H96c0-35.3-28.7-64-64-64v32zm512-32c-35.3 0-64 
                          28.7-64 64h32c17.7 0 32-14.3 32-32V352zM64 96c-17.7 
                          0-32 14.3-32 32v32c35.3 0 64-28.7 64-64H64zM0 
                          128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 
                          64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM352 
                          256a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-160 0a96 
                          96 0 1 1 192 0 96 96 0 1 1 -192 0z"
                        />
                      </svg>
                    </div>

                    {/* ขวาล่าง - Friendly */}
                    <div
                      className="absolute w-10 h-10 bg-ap-red rounded-full flex items-center justify-center z-10"
                      style={{
                        right: "28%",
                        bottom: "7%",
                        transform: "translate(50%, 50%)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path
                          d="M263.9 64c-33.9 0-66.7 12-92.6 33.7L144 
                          120.7v39.1c2.7-.5 5.3-1.7 7.4-3.5l40.5-34c13.3-11.2 
                          28.9-19 45.5-23.1L272.6 64h-8.7zM112 352.3c8.9 1 
                          17.2 5 23.6 11.4l28.6 28.6 15.4 15.4 .1 .1 24.3 
                          24.3c25.1 25.1 65.4 26.2 91.8 2.6c.8-.7 1.6-1.4 
                          2.3-2.2c26.3 21.3 65.3 18.6 88.4-7.3c6-6.7 
                          10.3-14.4 13-22.5c19.2 4 40-.8 55.7-14.8c11.3-10.1 
                          18.2-23.2 20.6-37H528V368c0 26.5 21.5 48 
                          48 48h16c26.5 0 48-21.5 48-48V160c0-17.7-14.3-32-32-32H560 
                          528v32V318.8H473.1c-3.1-8.7-8.1-17-15.1-24l-85.6-85.6 
                          8.1-7.5c6.5-6 6.9-16.1 .9-22.6s-16.1-6.9-22.6-.9l-76.1 
                          70.2c-13.2 12.2-33.6 12.4-47 .4c-15.4-13.7-15.7-37.5-.8-51.6l79.4-75C332.2 
                          105.4 355.8 96 380.4 96c22.7 0 44.6 8 61.9 
                          22.6l44.8 37.7c2.5 2.1 5.6 3.4 8.8 
                          3.7V121.8L462.9 94.1C439.8 74.6 410.6 64 380.4 
                          64c-32.8 0-64.3 12.5-88.1 35l-79.4 75c-28.6 
                          27-27.9 72.7 1.5 98.8c25.8 22.9 64.7 22.5 
                          90-.8l44.5-41 86.5 86.5c13 13 12.4 34.3-1.4 
                          46.5c-10.9 9.7-26.7 10.6-38.6 3c-5-3.3-11.4-3.4-16.6-.5s-8.3 
                          8.6-8 14.6c.4 8.1-2.3 16.3-8.1 
                          22.9c-12.3 13.9-33.8 14.5-46.9 
                          1.4l-8.1-8.1c-3.6-3.6-8.7-5.3-13.7-4.5s-9.4 
                          3.9-11.8 8.4c-1.9 3.6-4.4 6.9-7.6 
                          9.8c-13.8 12.3-34.8 11.7-47.8-1.3l-39.9-39.8-28.6-28.6c-12.4-12.4-28.9-19.8-46.3-20.9V160 
                          128H80 32c-17.7 0-32 14.3-32 
                          32V368c0 26.5 21.5 48 48 48H64c26.5 0 
                          48-21.5 48-48V352.3zM80 160V368c0 8.8-7.2 16-16 
                          16H48c-8.8 0-16-7.2-16-16V160H80zm528 
                          0V368c0 8.8-7.2 16-16 16H576c-8.8 0-16-7.2-16-16V160h48z"
                        />
                      </svg>
                    </div>

                    {/* ซ้ายล่าง - Modern */}
                    <div
                      className="absolute w-10 h-10 bg-ap-red rounded-full flex items-center justify-center z-10"
                      style={{
                        left: "13%",
                        bottom: "20%",
                        transform: "translate(-50%, 50%)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="-80 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M336 176c0 13.7-1.9 27-5.5 39.5c3.3 1 6.5 2.3 9.5 4v-.9c0-17.8 10.2-35.6 28-43.3C367.6 78.4 289 0 192 0C94.8 0 16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0 0 0 0 0c12.3 16.8 24.6 33.7 34.5 51.8c5.9 10.8 9.6 22.5 11.8 34.5h32.4c-2.5-16.6-7.3-33.7-16.2-49.9c-10.9-20-25.3-39.7-38-57.1l0 0c-4.9-6.7-9.5-13-13.6-19C57.5 234.8 48 206.6 48 176C48 96.5 112.5 32 192 32s144 64.5 144 144zM258.5 443c-5.1-8.8-9.3-17.8-12.8-27h-123c-5.9 0-10.7 4.8-10.7 10.7V432c0 44.2 35.8 80 80 80c35.2 0 65.1-22.8 75.8-54.4c-3.3-4.7-6.4-9.5-9.4-14.6zM192 96c8.8 0 16-7.2 16-16s-7.2-16-16-16C130.1 64 80 114.1 80 176c0 8.8 7.2 16 16 16s16-7.2 16-16c0-44.2 35.8-80 80-80zM146.7 448h90.5c-6.6 18.6-24.4 32-45.3 32s-38.7-13.4-45.3-32zM399.3 239.8H433c3 16.6 13.9 29.5 26.5 36.7c12.9 7.4 30 9.9 45.9 3.6l17.2 30.5c-12.8 11.4-18.5 27.7-18.5 42.4s5.7 31 18.5 42.4L505.3 426c-15.9-6.3-32.9-3.7-45.9 3.6c-12.6 7.2-23.5 20.2-26.5 36.7H399.3c-3.1-16.6-14-29.5-26.6-36.7c-13-7.4-30-9.9-46-3.7l-17.2-30.5c12.8-11.4 18.5-27.7 18.5-42.4s-5.7-31-18.5-42.4l17.2-30.5c15.9 6.3 33 3.7 46-3.7c12.6-7.2 23.6-20.1 26.6-36.7zm43.5-32H389.4c-11.7 0-21.3 9.5-21.3 21.3v1.4c0 7.6-4.6 14.4-11.3 18.2c-6.6 3.7-14.7 4.2-21.2 .3l-1.6-1c-10.7-6.3-24.4-2.6-30.5 8.2L277 303.1c-5.7 10.2-2.3 23.1 7.8 29c7.3 4.3 11.2 12.6 11.2 21s-3.9 16.7-11.2 21c-10 5.9-13.5 18.8-7.8 29L303.5 450c6.1 10.8 19.9 14.5 30.5 8.2l1.6-1c6.5-3.9 14.6-3.4 21.2 .3c6.6 3.8 11.3 10.6 11.3 18.2v1.4c0 11.7 9.5 21.3 21.3 21.3h53.4c11.8 0 21.4-9.6 21.4-21.4v-1.6c0-7.5 4.6-14.2 11.1-18c6.5-3.7 14.5-4.2 21-.3l1.8 1c10.7 6.3 24.4 2.6 30.5-8.2L555 403.1c5.7-10.2 2.3-23-7.8-29c-7.3-4.3-11.2-12.6-11.2-21s3.9-16.7 11.2-21c10-5.9 13.5-18.8 7.8-29l-26.4-46.9c-6.1-10.8-19.9-14.5-30.5-8.2l-1.8 1c-6.5 3.8-14.5 3.4-21-.3c-6.5-3.7-11.1-10.4-11.1-18v-1.6c0-11.8-9.6-21.4-21.4-21.4zM416.1 409.1a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm-24-56a24 24 0 1 1 48.1 0 24 24 0 1 1 -48.1 0z"
                        />
                      </svg>
                    </div>

                    {/* บนซ้าย - Comprehensive */}
                    <div
                      className="absolute w-10 h-10 bg-ap-red rounded-full flex items-center justify-center z-10"
                      style={{
                        left: "35px",
                        top: "20%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="50 100 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M144 480c-8.8 0-16 7.2-16 16s-7.2 16-16 16s-16-7.2-16-16c0-26.5 21.5-48 48-48H368c26.5 0 48 21.5 48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16s-7.2-16-16-16H144z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.reliableName}
                    </h5>
                    <p className="text-md font-medium text-professional-grey">
                      {dictionary.reliable}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-professional-grey mb-2 ml-4">
                      {dictionary.valueName}
                    </h5>
                    <p className="text-md font-medium text-professional-grey ml-4">
                      {dictionary.value}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.friendlyName}
                    </h5>
                    <p className="text-md font-medium text-professional-grey">
                      {dictionary.friendly}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile partner - Clean Vertical Layout */}
              <div className="lg:hidden space-y-6">
                {/* Comprehensive */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-ap-red rounded flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="50 100 448 512"
                    >
                      <path d="M144 480c-8.8 0-16 7.2-16 16s-7.2 16-16 16s-16-7.2-16-16c0-26.5 21.5-48 48-48H368c26.5 0 48 21.5 48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16s-7.2-16-16-16H144z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.partnerDesc}
                    </h5>
                    <p className="text-md text-professional-grey">
                      {dictionary.comprehensive}
                    </p>
                  </div>
                </div>

                {/* Reliable */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-ap-red rounded flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M268.5 37.3c-8-3.4-17-3.4-25 0l-176.7 75C55.5 117 47.9 127.7 48 139.8c.5 94 39.3 259.8 195.4 334.5c7.9 3.8 17.2 3.8 25.1 0c156.1-74.7 195-240.4 195.5-334.5c.1-12.1-7.5-22.8-18.8-27.6l-176.7-75zM231 7.8c16-6.8 34-6.8 50 0l176.7 75c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L231 7.8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.reliableName}
                    </h5>
                    <p className="text-md text-professional-grey">
                      {dictionary.reliable}
                    </p>
                  </div>
                </div>

                {/* Value */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-ap-red rounded flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="-30 0 640 512"
                    >
                      <path d="M480 96c0 35.3 28.7 64 64 64V128c0-17.7-14.3-32-32-32H480zm-32 0H128c0 53-43 96-96 96V320c53 0 96 43 96 96H448c0-53 43-96 96-96V192c-53 0-96-43-96-96zM32 384c0 17.7 14.3 32 32 32H96c0-35.3-28.7-64-64-64v32zm512-32c-35.3 0-64 28.7-64 64h32c17.7 0 32-14.3 32-32V352zM64 96c-17.7 0-32 14.3-32 32v32c35.3 0 64-28.7 64-64H64zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM352 256a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-160 0a96 96 0 1 1 192 0 96 96 0 1 1 -192 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.valueName}
                    </h5>
                    <p className="text-md text-professional-grey">
                      {dictionary.value}
                    </p>
                  </div>
                </div>

                {/* Friendly */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-ap-red rounded flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M263.9 64c-33.9 0-66.7 12-92.6 33.7L144 120.7v39.1c2.7-.5 5.3-1.7 7.4-3.5l40.5-34c13.3-11.2 28.9-19 45.5-23.1L272.6 64h-8.7zM112 352.3c8.9 1 17.2 5 23.6 11.4l28.6 28.6 15.4 15.4 .1 .1 24.3 24.3c25.1 25.1 65.4 26.2 91.8 2.6c.8-.7 1.6-1.4 2.3-2.2c26.3 21.3 65.3 18.6 88.4-7.3c6-6.7 10.3-14.4 13-22.5c19.2 4 40-.8 55.7-14.8c11.3-10.1 18.2-23.2 20.6-37H528V368c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V160c0-17.7-14.3-32-32-32H560 528v32V318.8H473.1c-3.1-8.7-8.1-17-15.1-24l-85.6-85.6 8.1-7.5c6.5-6 6.9-16.1 .9-22.6s-16.1-6.9-22.6-.9l-76.1 70.2c-13.2 12.2-33.6 12.4-47 .4c-15.4-13.7-15.7-37.5-.8-51.6l79.4-75C332.2 105.4 355.8 96 380.4 96c22.7 0 44.6 8 61.9 22.6l44.8 37.7c2.5 2.1 5.6 3.4 8.8 3.7V121.8L462.9 94.1C439.8 74.6 410.6 64 380.4 64c-32.8 0-64.3 12.5-88.1 35l-79.4 75c-28.6 27-27.9 72.7 1.5 98.8c25.8 22.9 64.7 22.5 90-.8l44.5-41 86.5 86.5c13 13 12.4 34.3-1.4 46.5c-10.9 9.7-26.7 10.6-38.6 3c-5-3.3-11.4-3.4-16.6-.5s-8.3 8.6-8 14.6c.4 8.1-2.3 16.3-8.1 22.9c-12.3 13.9-33.8 14.5-46.9 1.4l-8.1-8.1c-3.6-3.6-8.7-5.3-13.7-4.5s-9.4 3.9-11.8 8.4c-1.9 3.6-4.4 6.9-7.6 9.8c-13.8 12.3-34.8 11.7-47.8-1.3l-39.9-39.8-28.6-28.6c-12.4-12.4-28.9-19.8-46.3-20.9V160 128H80 32c-17.7 0-32 14.3-32 32V368c0 26.5 21.5 48 48 48H64c26.5 0 48-21.5 48-48V352.3zM80 160V368c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V160H80zm528 0V368c0 8.8-7.2 16-16 16H576c-8.8 0-16-7.2-16-16V160h48z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.friendlyName}
                    </h5>
                    <p className="text-md text-professional-grey">
                      {dictionary.friendly}
                    </p>
                  </div>
                </div>

                {/* Modern */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-ap-red rounded flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="-80 0 640 512"
                    >
                      <path d="M336 176c0 13.7-1.9 27-5.5 39.5c3.3 1 6.5 2.3 9.5 4v-.9c0-17.8 10.2-35.6 28-43.3C367.6 78.4 289 0 192 0C94.8 0 16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0 0 0 0 0c12.3 16.8 24.6 33.7 34.5 51.8c5.9 10.8 9.6 22.5 11.8 34.5h32.4c-2.5-16.6-7.3-33.7-16.2-49.9c-10.9-20-25.3-39.7-38-57.1l0 0c-4.9-6.7-9.5-13-13.6-19C57.5 234.8 48 206.6 48 176C48 96.5 112.5 32 192 32s144 64.5 144 144zM258.5 443c-5.1-8.8-9.3-17.8-12.8-27h-123c-5.9 0-10.7 4.8-10.7 10.7V432c0 44.2 35.8 80 80 80c35.2 0 65.1-22.8 75.8-54.4c-3.3-4.7-6.4-9.5-9.4-14.6zM192 96c8.8 0 16-7.2 16-16s-7.2-16-16-16C130.1 64 80 114.1 80 176c0 8.8 7.2 16 16 16s16-7.2 16-16c0-44.2 35.8-80 80-80zM146.7 448h90.5c-6.6 18.6-24.4 32-45.3 32s-38.7-13.4-45.3-32zM399.3 239.8H433c3 16.6 13.9 29.5 26.5 36.7c12.9 7.4 30 9.9 45.9 3.6l17.2 30.5c-12.8 11.4-18.5 27.7-18.5 42.4s5.7 31 18.5 42.4L505.3 426c-15.9-6.3-32.9-3.7-45.9 3.6c-12.6 7.2-23.5 20.2-26.5 36.7H399.3c-3.1-16.6-14-29.5-26.6-36.7c-13-7.4-30-9.9-46-3.7l-17.2-30.5c12.8-11.4 18.5-27.7 18.5-42.4s-5.7-31-18.5-42.4l17.2-30.5c15.9 6.3 33 3.7 46-3.7c12.6-7.2 23.6-20.1 26.6-36.7zm43.5-32H389.4c-11.7 0-21.3 9.5-21.3 21.3v1.4c0 7.6-4.6 14.4-11.3 18.2c-6.6 3.7-14.7 4.2-21.2 .3l-1.6-1c-10.7-6.3-24.4-2.6-30.5 8.2L277 303.1c-5.7 10.2-2.3 23.1 7.8 29c7.3 4.3 11.2 12.6 11.2 21s-3.9 16.7-11.2 21c-10 5.9-13.5 18.8-7.8 29L303.5 450c6.1 10.8 19.9 14.5 30.5 8.2l1.6-1c6.5-3.9 14.6-3.4 21.2 .3c6.6 3.8 11.3 10.6 11.3 18.2v1.4c0 11.7 9.5 21.3 21.3 21.3h53.4c11.8 0 21.4-9.6 21.4-21.4v-1.6c0-7.5 4.6-14.2 11.1-18c6.5-3.7 14.5-4.2 21-.3l1.8 1c10.7 6.3 24.4 2.6 30.5-8.2L555 403.1c5.7-10.2 2.3-23-7.8-29c-7.3-4.3-11.2-12.6-11.2-21s3.9-16.7 11.2-21c10-5.9 13.5-18.8 7.8-29l-26.4-46.9c-6.1-10.8-19.9-14.5-30.5-8.2l-1.8 1c-6.5 3.8-14.5 3.4-21-.3c-6.5-3.7-11.1-10.4-11.1-18v-1.6c0-11.8-9.6-21.4-21.4-21.4zM416.1 409.1a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm-24-56a24 24 0 1 1 48.1 0 24 24 0 1 1 -48.1 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-professional-grey mb-2">
                      {dictionary.modernName}
                    </h5>
                    <p className="text-md text-professional-grey">
                      {dictionary.modern}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t-2 border-medium-grey my-8" />

            {/* Trust Wall */}
            <div>
              <h3 className="text-2xl font-semibold text-professional-grey">
                {dictionary.trustTitle}
              </h3>

              <div className="w-full mb-4">
                {/* Beautiful responsive layout */}
                <div className="w-full max-w-6xl mx-auto px-4">
                  {/* Responsive Grid: Mobile 1x5, Desktop 5x1 - สมดุล */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 justify-items-center items-center">
                    {allCertImages.map((src, idx) => {
                      return (
                        <div
                          key={`${idx}-${src}`}
                          className="aspect-[4/3] w-[60px] sm:w-[80px] md:w-[120px] lg:w-[140px] flex items-center justify-center"
                        >
                          {renderImageOrPlaceholder(
                            src,
                            "Certification",
                            "h-full w-full object-contain rounded-lg transition-all duration-300 hover:scale-105",
                            false,
                            () => setCertIndex(idx)
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t-2 border-medium-grey my-8" />

            {/* Factory & Team */}
            <div>
              <h3 className="text-2xl font-semibold text-professional-grey mb-6">
                {dictionary.factoryTitle}
              </h3>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="grid grid-cols-3 gap-2">
                  {images.factory.map((src, index) => (
                    <div
                      key={src}
                      className="aspect-[6/5] rounded overflow-hidden relative"
                    >
                      {renderImageOrPlaceholder(
                        src,
                        "Factory Image",
                        "object-cover",
                        true,
                        () => setFactoryIndex(index)
                      )}
                    </div>
                  ))}
                </div>
                <div className="lg:pl-8">
                  <div className="bg-ap-red text-white p-4 rounded inline-block">
                    <div className="flex items-start gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="text-light-grey opacity-35 flex-shrink-0 mt-0.5"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z" />
                      </svg>
                      <span className="text-sm whitespace-pre-line">
                        {dictionary.factoryDesc}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Lightbox 1: Certifications */}
      <Lightbox
        open={certIndex > -1}
        close={() => setCertIndex(-1)}
        index={certIndex}
        slides={allCertImages.map((src) => ({ src }))}
        plugins={[]}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullUp: true,
          closeOnPullDown: true,
        }}
        render={{
          slide: ({ slide }) => {
            const src = (slide as { src?: string }).src;
            return (
              <div className="flex items-center justify-center h-full w-full relative">
                {src && (
                  <Image
                    src={src}
                    alt="Certification"
                    fill
                    sizes="80vw"
                    className="object-contain"
                  />
                )}
              </div>
            );
          },
        }}
      />

      {/* Lightbox 2: Factory (เพิ่มส่วนนี้) */}
      <Lightbox
        open={factoryIndex > -1}
        close={() => setFactoryIndex(-1)}
        index={factoryIndex}
        slides={images.factory.map((src) => ({ src }))}
        plugins={[]}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullUp: true,
          closeOnPullDown: true,
        }}
        render={{
          slide: ({ slide }) => {
            const src = (slide as { src?: string }).src;
            return (
              <div className="flex items-center justify-center h-full w-full relative">
                {src && (
                  <Image
                    src={src}
                    alt="Factory"
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
              </div>
            );
          },
        }}
      />
    </section>
  );
};

export default AboutUs;
