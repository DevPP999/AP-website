"use client";

import React from "react";
import AnimatedSection from "@/components/AnimatedSection";

interface HeroProps {
  dictionary: {
    title: string;
    highlight: string;
    desc1: string;
    desc2: string;
    btnExplore: string;
    btnProjects: string;
  };
}

const Hero: React.FC<HeroProps> = ({ dictionary }) => {
  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    // Use same offset strategy as navbar to avoid hydration/behavior mismatch
    const navEl = document.querySelector("nav");
    const navHeight = navEl
      ? (navEl as HTMLElement).getBoundingClientRect().height
      : 0;
    const offset = Math.max(60, Math.round(navHeight + 8));
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };
  return (
    <section
      id="hero"
      className="relative flex pt-20 pb-16"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 240, 240, 0.85), rgba(240, 240, 240, 0.85 )), url('/background/1.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="container mx-auto max-w-5xl px-4 space-y-6">
        <AnimatedSection type="fade" priority="critical" delay={0.1}>
          <h1 className="text-3xl leading-normal md:text-4xl font-bold text-professional-grey md:leading-tight">
            {dictionary.title}
          </h1>
        </AnimatedSection>

        <AnimatedSection type="slide-up" priority="critical" delay={0.2}>
          <div className="space-y-4 text-md md:text-md text-gray-600 mx-auto">
            <p className="font-light">
              <strong className="font-bold text-professional-grey">
                {dictionary.highlight}
              </strong>{" "}
              – {""}
              {dictionary.desc1}
            </p>
            <p className="font-light">{dictionary.desc2}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fade" priority="critical" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <button
              onClick={() => scrollTo("main-product")}
              className="px-4 py-2 bg-ap-red text-white  rounded-lg border border-red-600 hover:bg-red-400 transition-colors duration-300 font-medium"
            >
              {dictionary.btnExplore}
            </button>
            <button
              onClick={() => scrollTo("project")}
              className="px-4 py-2 bg-modern-white text-red-600 rounded-lg border border-red-600 hover:bg-red-50 transition-colors duration-300 font-medium"
            >
              {dictionary.btnProjects}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
