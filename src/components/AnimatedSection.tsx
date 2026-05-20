"use client";
import { motion } from "framer-motion";
import React from "react";
import {
  ANIMATION_CONFIG,
  ANIMATION_VARIANTS,
  TRANSITIONS,
} from "@/lib/animation-config";

type AnimationType =
  | "fade"
  | "zoom"
  | "slide-up"
  | "slide-left"
  | "slide-right";

type Priority = "critical" | "important" | "optional";

type AnimatedSectionProps = {
  children: React.ReactNode;
  type?: AnimationType;
  priority?: Priority;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  useCSS?: boolean; // New option to use CSS instead of Framer Motion
  contentClassName?: string; // Optional class for the inner animated wrapper
};

export default function AnimatedSection({
  children,
  type = "fade",
  priority = "important",
  delay,
  duration,
  stagger,
  className = "",
  useCSS = false,
  contentClassName = "",
}: AnimatedSectionProps) {
  // Use config values if not provided
  const config = ANIMATION_CONFIG[priority];
  const finalDelay = delay !== undefined ? delay : config.delay;
  const finalStagger =
    stagger !== undefined ? stagger : ANIMATION_CONFIG.stagger.normal;

  // Use CSS animations for better performance when appropriate
  if (useCSS) {
    const cssClass = type === "zoom" ? "scale-in" : type.replace("-", "-");
    return (
      <div
        className={`${cssClass} ${className}`}
        style={{ animationDelay: `${finalDelay}s` }}
      >
        {children}
      </div>
    );
  }

  // Framer Motion animations for complex interactions
  const variantsMap = {
    fade: ANIMATION_VARIANTS.fade,
    zoom: ANIMATION_VARIANTS.scale,
    "slide-up": ANIMATION_VARIANTS.slideUp,
    "slide-left": ANIMATION_VARIANTS.slideLeft,
    "slide-right": ANIMATION_VARIANTS.slideRight,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={ANIMATION_CONFIG.viewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: finalStagger,
            delayChildren: finalDelay,
          },
        },
      }}
      className={`w-full ${className}`}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={variantsMap[type]}
          transition={TRANSITIONS.normal}
          className={contentClassName}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
