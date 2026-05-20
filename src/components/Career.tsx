"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { careersTH } from "@/data/mainData/careers-th";
import { careersEN } from "@/data/mainData/careers-en";
import { benefitsTH } from "@/data/mainData/careers-benefits-th";
import { benefitsEN } from "@/data/mainData/careers-benefits-en";
import Image from "next/image";

const Career: React.FC = () => {
  const params = useParams();
  const locale = params?.locale === "th" ? "th" : "en";
  const router = useRouter();

  const careers = locale === "th" ? careersTH : careersEN;
  const benefits = locale === "th" ? benefitsTH : benefitsEN;

  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50" id="career">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 min-h-screen">
          {/* Left Content */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="max-w-lg">
              <motion.h1
                className="text-2xl lg:text-3xl font-bold text-professional-grey mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
              >
                {locale === "th" ? <>ร่วมงานกับเรา</> : <>Join Our Team</>}
              </motion.h1>

              <motion.h2
                className="text-xl lg:text-2xl font-semibold text-professional-grey mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {locale === "th"
                  ? "มาเป็นส่วนหนึ่งของทีม AP พาร์ทเนอร์ที่คุณพึ่งพาได้"
                  : "Become a part of the AP team, The Reliable Partner."}
              </motion.h2>

              <motion.p
                className="text-professional-grey text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {locale === "th"
                  ? "เรากำลังมองหาทีมงานที่พร้อมจะเติบโตไปกับเราในฐานะผู้นำโซลูชันไฟฟ้าครบวงจร หากคุณคือคนที่รักและพร้อมที่จะเรียนรู้อยู่เสมอ เราอยากรู้จักคุณ"
                  : "We are looking for talented individuals who are ready to grow with us as a leader in comprehensive electrical solutions. If you have a passion for learning and a drive to develop, we want to get to know you."}
              </motion.p>

              <div className="mb-8" id="positions-list">
                <h3 className="text-xl font-semibold text-professional-grey mb-4">
                  {locale === "th" ? "ตำแหน่งงานว่าง" : "Open Positions"}
                </h3>

                <div className="space-y-3">
                  {careers.map((position) => (
                    <div key={position.id} className="flex items-center">
                      <div className="w-4 h-4 bg-ap-red mr-4 flex-shrink-0"></div>
                      <button
                        onClick={() =>
                          setSelectedPosition(
                            selectedPosition === position.id
                              ? null
                              : position.id
                          )
                        }
                        className="text-left text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
                      >
                        {position.title}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Form Button */}
              <div className="space-y-4">
                <button
                  className="w-full border-2 border-ap-red text-ap-red hover:bg-red-50 py-4 px-6 rounded-lg font-semibold transition-colors duration-200"
                  onClick={() => {
                    const query = selectedPosition
                      ? `?position=${encodeURIComponent(
                          String(selectedPosition)
                        )}`
                      : "";
                    router.push(`/${locale}/career/application-form${query}`);
                  }}
                >
                  {locale === "th" ? "ส่งใบสมัครงาน" : "Apply Now"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/Career/Career.webp"
              alt={locale === "th" ? "Career Image" : "Career Image"}
              width={1200}
              height={800}
              className="w-full h-auto max-w-lg rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>

        {/* Position Details Modal/Section */}
        {selectedPosition && (
          <motion.div
            className="mt-4 md:bg-white p-8 mx-8 mb-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              {careers
                .filter((pos) => pos.id === selectedPosition)
                .map((position) => (
                  <div key={position.id}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-professional-grey mb-2">
                          {position.title}
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>
                            {locale === "th" ? "แผนก: " : "Department: "}
                            {position.department}
                          </span>
                          <span>
                            {locale === "th" ? "ประเภท: " : "Type: "}
                            {position.type}
                          </span>
                          <span>
                            {locale === "th" ? "ประสบการณ์: " : "Experience: "}
                            {position.experience}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPosition(null)}
                        className="text-professional-grey hover:text-gray-600 text-2xl"
                        aria-label={locale === "th" ? "ปิด" : "Close"}
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-professional-grey mb-3">
                          {locale === "th" ? "คำอธิบายงาน" : "Job Description"}
                        </h4>
                        <p className="text-professional-grey mb-4">
                          {position.description}
                        </p>

                        <h4 className="font-semibold text-professional-grey mb-3">
                          {locale === "th"
                            ? "คุณสมบัติที่ต้องการ"
                            : "Qualifications"}
                        </h4>
                        <ul className="text-professional-grey space-y-1">
                          <li>
                            •{" "}
                            {locale === "th"
                              ? "วุฒิการศึกษาระดับปริญญาตรีขึ้นไป"
                              : "Bachelor's degree or higher"}
                          </li>
                          <li>
                            •{" "}
                            {locale === "th"
                              ? "มีประสบการณ์ในสายงานที่เกี่ยวข้อง"
                              : "Relevant work experience"}
                          </li>
                          <li>
                            •{" "}
                            {locale === "th"
                              ? "มีทักษะการสื่อสารที่ดี"
                              : "Good communication skills"}
                          </li>
                          <li>
                            •{" "}
                            {locale === "th"
                              ? "สามารถทำงานเป็นทีมได้"
                              : "Team player"}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-professional-grey mb-3">
                          {locale === "th" ? "สิทธิประโยชน์" : "Benefits"}
                        </h4>
                        <ul className="text-professional-grey space-y-1">
                          {benefits.map((benefit, idx) => (
                            <li key={idx}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Why Join Us Section */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-8">
            <motion.h2
              className="text-3xl font-bold text-professional-grey mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {locale === "th" ? "ทำไมต้องร่วมงานกับเรา" : "Why Join Us"}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-professional-grey mb-3">
                  {locale === "th" ? "เติบโตไปด้วยกัน" : "Grow With Us"}
                </h3>
                <p className="text-professional-grey">
                  {locale === "th"
                    ? "โอกาสในการพัฒนาทักษะและความเชี่ยวชาญ เพื่อเติบโตสู่การเป็นมืออาชีพในสายงานไฟฟ้าและเทคโนโลยี"
                    : "We provide clear opportunities to develop your skills and expertise, empowering you to become a true professional in the electrical and technology industry."}
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-professional-grey mb-3">
                  {locale === "th"
                    ? "วัฒนธรรมองค์กรที่ยอดเยี่ยม"
                    : "A Great Culture"}
                </h3>
                <p className="text-professional-grey">
                  {locale === "th"
                    ? "เราสร้างวัฒนธรรมการทำงานที่เปิดกว้าง เป็นมิตร และสนับสนุนการเรียนรู้ซึ่งกันและกัน เพื่อให้ทุกคนได้แสดงศักยภาพสูงสุด"
                    : "We foster an open, friendly, and collaborative culture that supports continuous learning, enabling every team member to achieve their full potential."}
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-professional-grey mb-3">
                  {locale === "th"
                    ? "ผลตอบแทนและสวัสดิการ"
                    : "Competitive Benefits"}
                </h3>
                <p className="text-professional-grey">
                  {locale === "th"
                    ? "เรามอบผลตอบแทนที่คุ้มค่าและสวัสดิการที่ครอบคลุม ซึ่งสะท้อนถึงคุณค่าและความสามารถของคุณอย่างแท้จริง"
                    : "We offer competitive remuneration and comprehensive benefits that truly reflect your skills, contributions, and value to our team."}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Career;
