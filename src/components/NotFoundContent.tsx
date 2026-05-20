"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackButton from "./BackButton";
import type { Locale } from "@/types";

interface NotFoundContentProps {
  locale: Locale;
  content: {
    title: string;
    description: string;
    suggestion: string;
    button: string;
    errorCode: string;
  };
}

export default function NotFoundContent({
  locale,
  content,
}: NotFoundContentProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-grey via-white to-light-grey px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-ap-red via-ap-red/80 to-ap-red/60 leading-none">
            {content.errorCode}
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-professional-grey mb-4"
        >
          {content.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-medium-grey mb-2 max-w-2xl mx-auto"
        >
          {content.description}
        </motion.p>

        {/* Suggestion */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base text-medium-grey mb-12 max-w-xl mx-auto"
        >
          {content.suggestion}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={`/${locale}`}
            className="group relative px-8 py-4 bg-ap-red text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-ap-red/30 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.button}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ap-red/90 to-ap-red"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <BackButton
            locale={locale}
            className="px-8 py-4 bg-white text-professional-grey border-2 border-professional-grey rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-professional-grey hover:text-white hover:shadow-lg hover:-translate-y-1"
          />
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex justify-center gap-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-ap-red/60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
}
