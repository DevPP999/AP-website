"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Turnstile from "@/components/Turnstile";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { contactTH } from "@/data/mainData/contact-th";
import { contactEN } from "@/data/mainData/contact-en";

// Icon Components (SVG) แทรกในนี้เลย
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ContactUs = () => {
  const params = useParams();
  const locale = params?.locale === "th" ? "th" : "en";
  const t = locale === "th" ? contactTH : contactEN;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStart, setFormStart] = useState<number>(() => Date.now());
  useEffect(() => {
    setFormStart(Date.now());
  }, []);
  const [captchaToken, setCaptchaToken] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // ตรวจสอบการยอมรับนโยบายความเป็นส่วนตัว
      if (!formData.privacyAccepted) {
        setSubmitStatus({
          type: "error",
          message:
            locale === "th"
              ? "กรุณายอมรับนโยบายความเป็นส่วนตัว"
              : "Please accept the privacy policy",
        });
        return;
      }

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("company", formData.company);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("topic", formData.topic);
      submitData.append("message", formData.message);
      submitData.append("privacyAccepted", String(formData.privacyAccepted));
      submitData.append("locale", locale);
      // Anti-spam fields
      submitData.append("form_started_at", String(formStart || Date.now()));
      submitData.append("hp_field", "");
      if (captchaToken) submitData.append("turnstile_token", captchaToken);

      const response = await fetch("/api/submit-contact", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });

        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
          privacyAccepted: false,
        });
      } else {
        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = result.retryAfter || 60;
          setSubmitStatus({
            type: "error",
            message: `ส่งข้อความบ่อยเกินไป กรุณารอ ${retryAfter} วินาที ก่อนส่งใหม่`,
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: result.error || "เกิดข้อผิดพลาดในการส่งข้อความ",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus({
        type: "error",
        message: "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12" id="contactUs">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl font-bold text-professional-grey mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.headerTitle}
          </motion.h1>
          <motion.p
            className="text-xl text-professional-grey"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.headerSubtitle}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            {/* Phone Inquiry */}
            <div className="flex items-start mb-8">
              <div className="bg-ap-red p-4 rounded-2xl mr-6">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-professional-grey mb-2">
                  {t.phoneInquiry.title}
                </h3>
                <p className="text-professional-grey mb-1">
                  {t.phoneInquiry.phone}
                </p>
                <p className="text-professional-grey">
                  {t.phoneInquiry.mobile}
                </p>
                <p className="text-professional-grey">{t.phoneInquiry.fax}</p>
                <p className="text-professional-grey">{t.phoneInquiry.email}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start mb-8">
              <div className="bg-ap-red p-4 rounded-2xl mr-6">
                <MapPinIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-professional-grey mb-2">
                  {t.location.title}
                </h3>
                <p className="text-professional-grey">
                  {t.location.address.normal}
                </p>
                <p className="text-professional-grey">
                  {t.location.address.province}
                </p>
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <h3 className="text-xl font-semibold text-professional-grey mb-4">
                {locale === "th" ? "แผนที่และตำแหน่งที่ตั้ง" : "Map & Location"}
              </h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.644407535978!2d100.30701807589372!3d13.618516700363818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bf454ae00001%3A0x6c68650515514c8!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4reC4teC5iOC4ouC4oeC4nuC4h-C4qOC5jOC4nuC4seC4guC4meC4siDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1757150247179!5m2!1sth!2sth"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={
                    locale === "th"
                      ? "แผนที่ที่ตั้งบริษัท"
                      : "Company Location Map"
                  }
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 space-y-6"
            noValidate
          >
            {/* Honeypot fields (hidden) */}
            <input
              type="text"
              name="hp_field"
              defaultValue=""
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
            />
            <input
              type="text"
              name="website"
              defaultValue=""
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
            />
            <input
              type="text"
              name="url"
              defaultValue=""
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-professional-grey mb-2">
              {t.formLabels.submitButton} |
            </h2>

            <div>
              <label className="block text-professional-grey font-medium mb-2">
                {t.formLabels.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-professional-grey font-medium mb-2">
                {t.formLabels.company}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-professional-grey font-medium mb-2">
                {t.formLabels.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-professional-grey font-medium mb-2">
                {t.formLabels.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-professional-grey font-medium mb-2">
                {t.formLabels.topic}
              </label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t.formLabels.selectTopic}</option>
                <option value={t.formLabels.topics.sales}>
                  {t.formLabels.topics.sales}
                </option>
                <option value={t.formLabels.topics.support}>
                  {t.formLabels.topics.support}
                </option>
                <option value={t.formLabels.topics.others}>
                  {t.formLabels.topics.others}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-professional-grey font-medium mb-2">
                {t.formLabels.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  required
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">
                  {locale === "th" ? (
                    <>
                      ฉันยอมรับ{" "}
                      <Link
                        href={`/${locale}/policy`}
                        target="_blank"
                        className="text-red-600 hover:text-red-800 underline"
                      >
                        นโยบายความเป็นส่วนตัว
                      </Link>{" "}
                      <span className="text-red-500">*</span>
                    </>
                  ) : (
                    <>
                      I accept the{" "}
                      <Link
                        href={`/${locale}/policy`}
                        target="_blank"
                        className="text-red-600 hover:text-red-800 underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      <span className="text-red-500">*</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* 
             Turnstile CAPTCHA (always visible; verification starts on interaction)
            <div>
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onToken={setCaptchaToken}
              />
            </div>
            */}

            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    {submitStatus.type === "success" ? "✅" : "❌"}
                  </span>
                  <span>{submitStatus.message}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting || !captchaToken || !formData.privacyAccepted
              }
              className={`w-full px-8 py-3 rounded-lg font-semibold transition duration-200 shadow-lg ${
                isSubmitting || !captchaToken || !formData.privacyAccepted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 transform hover:scale-105"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {locale === "th" ? "ส่ง..." : "Sending..."}
                </span>
              ) : (
                t.formLabels.submitButton
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
