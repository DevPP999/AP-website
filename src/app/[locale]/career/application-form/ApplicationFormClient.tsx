"use client";

import { useEffect, useState } from "react";
import Turnstile from "@/components/Turnstile";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { careersTH } from "@/data/mainData/careers-th";
import { careersEN } from "@/data/mainData/careers-en";

interface ApplicationFormClientProps {
  localeSafe: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  skills: string;
  message: string;
  resume: File | null;
  privacyAccepted: boolean;
}

export default function ApplicationFormClient({
  localeSafe,
}: ApplicationFormClientProps) {
  const searchParams = useSearchParams();
  const positionParam = searchParams.get("position");

  const careers = localeSafe === "th" ? careersTH : careersEN;

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    position: positionParam || "",
    experience: "",
    education: "",
    skills: "",
    message: "",
    resume: null,
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formStart, setFormStart] = useState<number>(() => Date.now());
  useEffect(() => {
    setFormStart(Date.now());
  }, []);

  const [captchaToken, setCaptchaToken] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(
          localeSafe === "th"
            ? "ไฟล์มีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ขนาดไม่เกิน 5MB"
            : "File is too large. Please select a file smaller than 5MB"
        );
        e.target.value = "";
        return;
      }

      // ตรวจสอบประเภทไฟล์
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          localeSafe === "th"
            ? "กรุณาเลือกไฟล์ PDF หรือ Word เท่านั้น"
            : "Please select PDF or Word files only"
        );
        e.target.value = "";
        return;
      }
    }

    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setUploadProgress(0);

    try {
      // ตรวจสอบข้อมูลที่จำเป็น
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.position ||
        !formData.resume
      ) {
        throw new Error(
          localeSafe === "th"
            ? "กรุณากรอกข้อมูลให้ครบถ้วน"
            : "Please fill in all required fields"
        );
      }

      // ตรวจสอบการยอมรับนโยบายความเป็นส่วนตัว
      if (!formData.privacyAccepted) {
        throw new Error(
          localeSafe === "th"
            ? "กรุณายอมรับนโยบายความเป็นส่วนตัว"
            : "Please accept the privacy policy"
        );
      }

      // ตรวจสอบรูปแบบอีเมล
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error(
          localeSafe === "th"
            ? "กรุณากรอกอีเมลให้ถูกต้อง"
            : "Please enter a valid email address"
        );
      }

      const formDataToSend = new FormData();

      // เพิ่มข้อมูลฟอร์ม
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "resume" && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (key !== "resume") {
          formDataToSend.append(key, String(value));
        }
      });

      // เพิ่ม locale
      formDataToSend.append("locale", localeSafe);
      // Anti-spam
      formDataToSend.append("form_started_at", String(formStart || Date.now()));
      formDataToSend.append("hp_field", "");
      if (captchaToken) formDataToSend.append("turnstile_token", captchaToken);

      setUploadProgress(25);

      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formDataToSend,
      });

      setUploadProgress(75);

      if (response.ok) {
        setUploadProgress(100);
        setSubmitStatus("success");

        // รีเซ็ตฟอร์มหลังจาก delay เล็กน้อย
        setTimeout(() => {
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            position: positionParam || "",
            experience: "",
            education: "",
            skills: "",
            message: "",
            resume: null,
            privacyAccepted: false,
          });

          // รีเซ็ต file input
          const fileInput = document.getElementById(
            "resume"
          ) as HTMLInputElement;
          if (fileInput) fileInput.value = "";

          setUploadProgress(0);
        }, 2000);
      } else {
        const errorData = await response.json();

        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = errorData.retryAfter || 60;
          throw new Error(
            localeSafe === "th"
              ? `ส่งใบสมัครบ่อยเกินไป กรุณารอ ${retryAfter} วินาที ก่อนส่งใหม่`
              : `Too many submissions. Please wait ${retryAfter} seconds before trying again.`
          );
        } else {
          throw new Error(errorData.message || "Failed to submit application");
        }
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
      setUploadProgress(0);

      // แสดงข้อความ error ที่เฉพาะเจาะจง
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          localeSafe === "th"
            ? "เกิดข้อผิดพลาดในการส่งใบสมัคร กรุณาลองใหม่อีกครั้ง"
            : "Error submitting application. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href={`/${localeSafe}#career`}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          {localeSafe === "th" ? "← กลับ" : "← Back"}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {localeSafe === "th" ? "แบบฟอร์มการสมัครงาน" : "Job Application Form"}
      </h1>

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {localeSafe === "th"
            ? "เกิดข้อผิดพลาดในการส่งใบสมัคร กรุณาลองใหม่อีกครั้ง"
            : "Error submitting application. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
        {/* ข้อมูลส่วนตัว */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            {localeSafe === "th" ? "ข้อมูลส่วนตัว" : "Personal Information"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {localeSafe === "th" ? "ชื่อ-นามสกุล" : "Full Name"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {localeSafe === "th" ? "เบอร์โทรศัพท์" : "Phone Number"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {localeSafe === "th"
                  ? "ตำแหน่งที่สมัคร"
                  : "Position Applied For"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">
                  {localeSafe === "th" ? "เลือกตำแหน่ง" : "Select Position"}
                </option>
                {careers.map((career) => (
                  <option key={career.id} value={career.title}>
                    {career.title} - {career.department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ข้อมูลการศึกษาและประสบการณ์ */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            {localeSafe === "th"
              ? "การศึกษาและประสบการณ์"
              : "Education & Experience"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {localeSafe === "th" ? "ประสบการณ์การทำงาน" : "Work Experience"}
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={3}
                placeholder={
                  localeSafe === "th"
                    ? "ระบุประสบการณ์การทำงานของคุณ"
                    : "Describe your work experience"
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {localeSafe === "th" ? "วุฒิการศึกษา" : "Education"}
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder={
                  localeSafe === "th"
                    ? "เช่น ปริญญาตรี วิศวกรรมไฟฟ้า จุฬาลงกรณ์มหาวิทยาลัย"
                    : "e.g. Bachelor's Degree in Electrical Engineering, MIT"
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {localeSafe === "th"
                  ? "ทักษะและความสามารถพิเศษ"
                  : "Skills & Special Abilities"}
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={3}
                placeholder={
                  localeSafe === "th"
                    ? "เช่น AutoCAD, PLC Programming, ภาษาอังกฤษ"
                    : "e.g. AutoCAD, PLC Programming, English"
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* เรซูเม่ */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            {localeSafe === "th"
              ? "เอกสารประกอบการสมัคร"
              : "Supporting Documents"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {localeSafe === "th" ? "เรซูเม่ / CV" : "Resume / CV"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {localeSafe === "th"
                ? "รองรับไฟล์ PDF, DOC, DOCX (ขนาดไม่เกิน 5MB)"
                : "Supported formats: PDF, DOC, DOCX (max 5MB)"}
            </p>
          </div>
        </div>

        {/* ข้อความเพิ่มเติม */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {localeSafe === "th" ? "ข้อความเพิ่มเติม" : "Additional Message"}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            placeholder={
              localeSafe === "th"
                ? "เล่าให้เราฟังว่าทำไมคุณถึงสนใจมาทำงานกับ AP..."
                : "Tell us why you're interested in working with AP..."
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              {localeSafe === "th" ? (
                <>
                  ฉันยอมรับ{" "}
                  <Link
                    href={`/${localeSafe}/privacy-policy`}
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
                    href={`/${localeSafe}/privacy-policy`}
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

        {/* Progress Bar */}
        {isSubmitting && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* ปุ่มส่ง */}
        <button
          type="submit"
          disabled={isSubmitting || !captchaToken || !formData.privacyAccepted}
          className={`w-full px-8 py-3 rounded-lg font-semibold transition duration-200 shadow-lg ${
            isSubmitting || !captchaToken || !formData.privacyAccepted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 transform hover:scale-105"
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
              {localeSafe === "th" ? "กำลังส่ง..." : "Sending..."}
            </span>
          ) : localeSafe === "th" ? (
            "ส่งใบสมัคร"
          ) : (
            "Submit Application"
          )}
        </button>
      </form>

      {/* Success Message - ด้านล่าง */}
      {submitStatus === "success" && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 text-green-800 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              {localeSafe === "th"
                ? "ส่งใบสมัครเรียบร้อยแล้ว!"
                : "Application Submitted Successfully!"}
            </h3>
          </div>
          <p className="text-green-700 mb-4">
            {localeSafe === "th"
              ? "เราจะติดต่อกลับภายใน 3-5 วันทำการ"
              : "We will contact you within 3-5 business days."}
          </p>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">
              {localeSafe === "th" ? "ขั้นตอนต่อไป:" : "Next Steps:"}
            </h4>
            <ul className="text-green-700 space-y-1">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                {localeSafe === "th"
                  ? "ทีม HR จะตรวจสอบใบสมัครของคุณ"
                  : "Our HR team will review your application"}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                {localeSafe === "th"
                  ? "ติดต่อกลับผ่านอีเมลหรือโทรศัพท์"
                  : "We will contact you via email or phone"}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                {localeSafe === "th"
                  ? "นัดหมายการสัมภาษณ์ (ถ้าผ่านการคัดเลือก)"
                  : "Schedule an interview (if selected)"}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
