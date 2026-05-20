"use client";

// Custom SVG Icons - no longer using lucide-react
import React from "react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

type WhyAPProps = {
  dictionary: {
    title: string;
    whyChooseTitle: string;
    whyChooseAp: {
      icon: string;
      title: string;
      description: string;
    }[];
    certifications?: {
      titleImage: string;
      title: string;
      description: string | string[];
    }[];
    partnerships?: {
      titleImage: string;
      title: string;
      description: string | string[];
    }[];
  };
};

// Prevent specific phrases from breaking across lines
function renderNoWrap(text: string): React.ReactNode {
  if (!text) return text;
  const phrases = ["MADE IN THAILAND"]; // add more phrases if needed
  let nodes: Array<string | React.ReactNode> = [text];
  phrases.forEach((phrase) => {
    const next: Array<string | React.ReactNode> = [];
    const regex = new RegExp(`(${phrase})`, "gi");
    nodes.forEach((node) => {
      if (typeof node !== "string") {
        next.push(node);
        return;
      }
      const parts = node.split(regex);
      parts.forEach((part) => {
        if (!part) return;
        if (regex.test(part)) {
          // reset lastIndex due to global regex statefulness
          regex.lastIndex = 0;
          const noBreak = part.replace(/\s+/g, "\u00A0");
          next.push(
            <span
              key={`${part}-${next.length}`}
              className="whitespace-nowrap inline-block"
            >
              {noBreak}
            </span>
          );
        } else {
          next.push(part);
        }
      });
    });
    nodes = next;
  });
  return <>{nodes}</>;
}

// Custom SVG Icons
const SolutionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M320 0c-17.7 0-32 14.3-32 32V56c0 17.7 14.3 32 32 32h16c8.8 0 16 7.2 16 16s-7.2 16-16 16H320c-17.7 0-32 14.3-32 32v24c0 17.7 14.3 32 32 32h32c0 26.5 21.5 48 48 48s48-21.5 48-48h32c17.7 0 32-14.3 32-32V64c0-35.3-28.7-64-64-64H320zm0 32H448c17.7 0 32 14.3 32 32V176H432c-8.8 0-16 7.2-16 16v16c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8-7.2-16-16-16H320V152h16c26.5 0 48-21.5 48-48s-21.5-48-48-48H320V32zM64 64C28.7 64 0 92.7 0 128V288 448c0 35.3 28.7 64 64 64H224 384c35.3 0 64-28.7 64-64V304c0-17.7-14.3-32-32-32H368c-17.7 0-32 14.3-32 32v16c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-17.7-14.3-32-32-32H240V96c0-17.7-14.3-32-32-32H64zM208 96V272H176V256c0-26.5-21.5-48-48-48s-48 21.5-48 48v16H32V128c0-17.7 14.3-32 32-32H208zM80 304c17.7 0 32-14.3 32-32V256c0-8.8 7.2-16 16-16s16 7.2 16 16v16c0 17.7 14.3 32 32 32h32v32H192c-26.5 0-48 21.5-48 48s21.5 48 48 48h16v48H64c-17.7 0-32-14.3-32-32V304H80zM240 432c0-17.7-14.3-32-32-32H192c-8.8 0-16-7.2-16-16s7.2-16 16-16h16c17.7 0 32-14.3 32-32V304h32v16c0 26.5 21.5 48 48 48s48-21.5 48-48V304h48V448c0 17.7-14.3 32-32 32H240V432z" />
  </svg>
);

const QualityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M170.7 108.3c7.5-4.3 12.9-11.5 15-19.8l12.3-48.6 35 36c6 6.2 14.3 9.7 22.9 9.7s16.9-3.5 22.9-9.7l35-36 12.3 48.6c2.1 8.4 7.5 15.5 15 19.8s16.4 5.4 24.7 3.1l48.3-13.6L400.6 146c-2.3 8.3-1.2 17.2 3.1 24.7s11.5 12.9 19.8 15l48.6 12.3-36 35c-6.2 6-9.7 14.3-9.7 22.9s3.5 16.9 9.7 22.9l36 35-48.6 12.3c-8.4 2.1-15.5 7.5-19.8 15s-5.4 16.4-3.1 24.7l13.6 48.3L366 400.6c-8.3-2.3-17.2-1.2-24.7 3.1s-12.9 11.5-15 19.8l-12.3 48.6-35-36c-6-6.2-14.3-9.7-22.9-9.7s-16.9 3.5-22.9 9.7l-35 36-12.3-48.6c-2.1-8.4-7.5-15.5-15-19.8s-16.4-5.4-24.7-3.1L97.8 414.2 111.4 366c2.3-8.3 1.2-17.2-3.1-24.7s-11.5-12.9-19.8-15L39.8 313.9l36-35c6.2-6 9.7-14.3 9.7-22.9s-3.5-16.9-9.7-22.9l-36-35 48.6-12.3c8.4-2.1 15.5-7.5 19.8-15s5.4-16.4 3.1-24.7L97.8 97.8 146 111.4c8.3 2.3 17.2 1.2 24.7-3.1zM49.6 162.6l-31.5 8c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l23.3 22.6L53.5 256 30.5 278.3 7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l31.5 8 31 7.9-8.7 30.8-8.8 31.2c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l31.2-8.8 30.8-8.7 7.9 31 8 31.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l22.6-23.3L256 458.5l22.3 22.9L301 504.7c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l8-31.5 7.9-31 30.8 8.7 31.2 8.8c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-8.8-31.2-8.7-30.8 31-7.9 31.5-8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-23.3-22.6L458.5 256l22.9-22.3L504.7 211c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-31.5-8-31-7.9 8.7-30.8 8.8-31.2c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-31.2 8.8-30.8 8.7-7.9-31-8-31.5c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L278.3 30.5 256 53.5 233.7 30.5 211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3l-8 31.5-7.9 31-30.8-8.7L92.7 63.1c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l8.8 31.2 8.7 30.8-31 7.9z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="15 0 480 512"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M480 192c0-17.7-14.3-32-32-32L64 160c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32l0-256zm-32-64c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192c0-35.3 28.7-64 64-64l384 0zm0-64c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 96c-8.8 0-16-7.2-16-16s7.2-16 16-16l384 0zM400 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L112 32c-8.8 0-16-7.2-16-16s7.2-16 16-16L400 0z" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  solution: SolutionIcon,
  quality: QualityIcon,
  experience: ExperienceIcon,
  "🔄": SolutionIcon,
  "✅": QualityIcon,
  "⭐": ExperienceIcon,
};

const WhyAP: React.FC<WhyAPProps> = ({ dictionary }) => {
  if (!dictionary) return null;

  const { title, whyChooseTitle, whyChooseAp, certifications, partnerships } =
    dictionary;

  return (
    <section
      id="whyap"
      className="py-8 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 240, 240, 0.85), rgba(240, 240, 240, 0.85)), url('/background/2.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="container mx-auto pb-12 px-4 max-w-5xl">
        <AnimatedSection type="fade" priority="important" delay={0.1}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-professional-grey mt-12 leading-relaxed md:text-5xl">
              {title}
            </h2>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-2 items-center justify-center">
          {partnerships && partnerships.length > 0 && (
            <div className="w-full">
              {/* ใช้ข้อมูลจาก certifications แทน hardcode */}
              {certifications && certifications.length > 0 && (
                <AnimatedSection
                  type="slide-up"
                  delay={0.3}
                  stagger={0.4}
                  duration={0.8}
                >
                  <div className="grid grid-cols-1 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                    {certifications.map((cert, idx) => (
                      <div
                        key={`cert-detail-${idx}`}
                        className="flex flex-col md:flex-row items-center pb-12"
                      >
                        <Image
                          src={`/images/data/${cert.titleImage.replace(
                            ".jpg",
                            "-nobg.png"
                          )}`}
                          alt={cert.title}
                          width={120}
                          height={12}
                          className={
                            cert.title.includes("ISO")
                              ? "w-42 h-28 object-contain"
                              : "w-26 h-26 object-contain"
                          }
                          unoptimized
                        />
                        <div className="text-center md:text-left">
                          <h5 className="text-xl font-bold text-professional-grey text-center break-keep">
                            {renderNoWrap(cert.title)}
                          </h5>
                          <p className="text-professional-grey text-md leading-relaxed text-center break-keep">
                            {renderNoWrap(Array.isArray(cert.description) ? cert.description.join(' ') : cert.description)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* ใช้ข้อมูลจาก partnerships แทน hardcode */}
              <AnimatedSection
                type="fade"
                delay={0.5}
                stagger={0.3}
                duration={0.8}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 pb-8 gap-8 max-w-5xl mx-auto">
                  {partnerships.map((partner, idx) => (
                    <div key={`partner-detail-${idx}`}>
                      <Image
                        src={`/images/data/${partner.titleImage}`}
                        alt={partner.title}
                        width={160}
                        height={80}
                        className="w-40 h-20 object-contain mx-auto"
                        unoptimized
                      />
                      <h6 className="text-xl font-bold text-professional-grey text-center break-keep">
                        {renderNoWrap(partner.title)}
                      </h6>
                      <p className="text-professional-grey text-md leading-relaxed text-center">
                        {renderNoWrap(Array.isArray(partner.description) ? partner.description.join(' ') : partner.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          )}

          {whyChooseTitle && whyChooseAp.length > 0 && (
            <div className="space-y-8 w-full mt-10 md:mt-2">
              <AnimatedSection type="slide-up" delay={0.7} duration={0.8}>
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-professional-grey break-keep">
                    {renderNoWrap(whyChooseTitle)}
                  </h3>
                </div>
              </AnimatedSection>
              <div className="flex justify-center w-full">
                <div className="grid md:grid-cols-3 gap-4 items-stretch">
                  {whyChooseAp.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                      <AnimatedSection
                        key={index}
                        type="fade"
                        delay={0.9 + index * 0.2}
                        duration={0.6}
                        className="h-full"
                        contentClassName="h-full"
                      >
                        <div className="border-2 border-red-600 bg-white flex flex-col h-full">
                          <div className="bg-ap-red w-full flex justify-center py-2">
                            {IconComponent ? (
                              <div className="text-white">
                                <IconComponent />
                              </div>
                            ) : (
                              <span className="text-xl text-white">❓</span>
                            )}
                          </div>
                          <div className="flex flex-col flex-1 px-5 pt-4 pb-4 bg-light-grey text-left">
                            <h5
                              className="text-xl font-bold text-professional-grey pb-4 overflow-hidden"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {item.title}
                            </h5>
                            <p
                              className="text-professional-grey text-md font-medium leading-relaxed overflow-hidden"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 7,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyAP;
