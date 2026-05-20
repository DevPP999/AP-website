"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PrivacyPolicy() {
  const params = useParams();
  const locale = params?.locale === "th" ? "th" : "en";
  const isTH = locale === "th";

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const privacyContent = {
    th: [
      {
        title: "ข้อมูลที่เรารวบรวม",
        content: (
          <>
            <p className="mb-3">
              เมื่อคุณใช้แบบฟอร์ม &quot;ติดต่อเรา&quot; หรือบริการของบริษัท
              เอี่ยมพงศ์พัฒนา จำกัด เรารวบรวมข้อมูลต่อไปนี้:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>ชื่อ-นามสกุล</li>
              <li>อีเมล</li>
              <li>หมายเลขโทรศัพท์</li>
              <li>หัวข้อการติดต่อ</li>
              <li>รายละเอียดข้อความ</li>
              <li>เอกสารที่แนบมา (ถ้ามี)</li>
            </ul>
          </>
        ),
      },
      {
        title: "วัตถุประสงค์ในการใช้ข้อมูล",
        content: (
          <>
            <p className="mb-2">บริษัทใช้ข้อมูลของท่านเพื่อ:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>ติดต่อกลับเพื่อตอบข้อซักถามและให้ข้อมูล</li>
              <li>ให้บริการลูกค้าและติดตามผลการดำเนินงาน</li>
              <li>วิเคราะห์และปรับปรุงคุณภาพของบริการ</li>
              <li>ส่งข้อมูลข่าวสารและประชาสัมพันธ์ (หากได้รับความยินยอม)</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3 italic">
              * ข้อมูลจะถูกเก็บอย่างปลอดภัย และไม่เกินความจำเป็นตามวัตถุประสงค์
              *
            </p>
          </>
        ),
      },
      {
        title: "การเปิดเผยข้อมูล",
        content: (
          <>
            <p className="mb-2">
              บริษัทไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม เว้นแต่:
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>ได้รับความยินยอมจากคุณเป็นลายลักษณ์อักษร</li>
              <li>เป็นการปฏิบัติตามกฎหมายหรือคำสั่งศาล</li>
              <li>จำเป็นเพื่อป้องกันอันตรายต่อชีวิต ร่างกาย หรือทรัพย์สิน</li>
            </ol>
          </>
        ),
      },
      {
        title: "สิทธิของเจ้าของข้อมูล",
        content: (
          <>
            <p className="mb-2">
              คุณมีสิทธิ์ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
              ในการ:
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-3">
              <li>ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่าน</li>
              <li>ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์</li>
              <li>ขอลบหรือทำลายข้อมูลส่วนบุคคล</li>
              <li>ขอระงับการใช้ข้อมูลส่วนบุคคล</li>
              <li>ถอนความยินยอม (อาจมีผลต่อบริการบางอย่าง)</li>
              <li>คัดค้านการประมวลผลข้อมูล</li>
            </ul>
            <div className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-semibold mb-2">
                📧 ติดต่อเรื่องข้อมูลส่วนบุคคล:
              </p>
              <p>
                อีเมล:{" "}
                <Link
                  href="mailto:hr01@iampong.com"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  hr01@iampong.com
                </Link>{" "}
              </p>
              <p>
                หรือ:{" "}
                <Link
                  href="mailto:hr02@iampong.com"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  hr02@iampong.com
                </Link>{" "}
              </p>
            </div>
          </>
        ),
      },
      {
        title: "การรักษาความปลอดภัยของข้อมูล",
        content: (
          <>
            <p className="mb-2">
              บริษัทมีมาตรการรักษาความปลอดภัยที่เหมาะสม ได้แก่:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>การควบคุมการเข้าถึงข้อมูลเฉพาะผู้ที่มีหน้าที่เกี่ยวข้อง</li>
              <li>การเข้ารหัสข้อมูลระหว่างการส่งผ่านเครือข่าย</li>
              <li>การสำรองข้อมูลเป็นประจำ</li>
              <li>การตรวจสอบและปรับปรุงระบบรักษาความปลอดภัยอย่างสม่ำเสมอ</li>
            </ul>
          </>
        ),
      },
      {
        title: "การปรับปรุงนโยบาย",
        content: (
          <p>
            บริษัท เอี่ยมพงศ์พัฒนา จำกัด ขอสงวนสิทธิ์ในการปรับปรุง แก้ไข
            หรือเปลี่ยนแปลงนโยบายนี้เป็นครั้งคราว
            เพื่อให้สอดคล้องกับกฎหมายที่เกี่ยวข้องหรือแนวทางการดำเนินงาน
            โดยจะประกาศแจ้งให้ทราบผ่านเว็บไซต์ของบริษัทล่วงหน้า
          </p>
        ),
      },
    ],
    en: [
      {
        title: "Information We Collect",
        content: (
          <>
            <p className="mb-3">
              When you use the &quot;Contact Us&quot; form or services of
              Iampong Pattana Co., Ltd., we collect:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>First name and Last name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Contact Subject</li>
              <li>Message Details</li>
              <li>Attached documents (if any)</li>
            </ul>
          </>
        ),
      },
      {
        title: "Purpose of Data Usage",
        content: (
          <>
            <p className="mb-2">The company uses your information to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Respond to inquiries and provide information</li>
              <li>Provide customer service and follow-up</li>
              <li>Analyze and improve service quality</li>
              <li>Send news and promotional information (with consent)</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3 italic">
              * Data will be stored securely and not longer than necessary for
              the purpose *
            </p>
          </>
        ),
      },
      {
        title: "Data Disclosure",
        content: (
          <>
            <p className="mb-2">
              The company does not disclose your personal information to third
              parties except when:
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>We have your written consent</li>
              <li>Required by law or court order</li>
              <li>Necessary to prevent harm to life, body, or property</li>
            </ol>
          </>
        ),
      },
      {
        title: "Data Subject Rights",
        content: (
          <>
            <p className="mb-2">
              You have rights under the Personal Data Protection Act B.E. 2562
              (2019) to:
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-3">
              <li>Access and obtain a copy of your personal data</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion or destruction of personal data</li>
              <li>Request suspension of data use</li>
              <li>Withdraw consent (may affect some services)</li>
              <li>Object to data processing</li>
            </ul>
            <div className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-semibold mb-2">
                📧 Contact for Personal Data Matters:
              </p>
              <p>
                Email:{" "}
                <Link
                  href="mailto:hr01@iampong.com"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  hr01@iampong.com
                </Link>{" "}
                (Ms. Sunisa)
              </p>
              <p>
                Or:{" "}
                <Link
                  href="mailto:hr02@iampong.com"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  hr02@iampong.com
                </Link>{" "}
                (Ms. Jirapha)
              </p>
            </div>
          </>
        ),
      },
      {
        title: "Data Security Measures",
        content: (
          <>
            <p className="mb-2">
              The company has appropriate security measures including:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Access control limited to authorized personnel only</li>
              <li>Data encryption during network transmission</li>
              <li>Regular data backups</li>
              <li>Regular security system monitoring and updates</li>
            </ul>
          </>
        ),
      },
      {
        title: "Policy Updates",
        content: (
          <p>
            Iampong Pattana Co., Ltd. reserves the right to update, modify, or
            change this policy periodically to comply with relevant laws or
            operational guidelines. Changes will be announced on the company
            website in advance.
          </p>
        ),
      },
    ],
  };

  const cookieContent = {
    th: [
      {
        title: "คุกกี้คืออะไร",
        content: (
          <p>
            คุกกี้ (Cookies)
            คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์เก็บไว้ในอุปกรณ์ของคุณ (คอมพิวเตอร์
            โทรศัพท์มือถือ หรือแท็บเล็ต) เพื่อช่วยให้เว็บไซต์จดจำการตั้งค่า
            ความชอบ และปรับปรุงประสบการณ์การใช้งานของคุณให้ดียิ่งขึ้น
          </p>
        ),
      },
      {
        title: "วัตถุประสงค์ในการใช้คุกกี้",
        content: (
          <>
            <p className="mb-3">บริษัท เอี่ยมพงศ์พัฒนา จำกัด ใช้คุกกี้เพื่อ:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                ทำความเข้าใจพฤติกรรมการใช้งานเว็บไซต์
                และปรับปรุงประสบการณ์ให้ดียิ่งขึ้น
              </li>
              <li>
                วิเคราะห์แนวโน้มและพฤติกรรม เพื่อพัฒนาเนื้อหา ผลิตภัณฑ์
                และบริการ
              </li>
              <li>แสดงข้อมูล โฆษณา หรือข่าวสารที่สอดคล้องกับความสนใจ</li>
              <li>วัดผลและประเมินประสิทธิภาพการสื่อสารทางการตลาด</li>
            </ul>
          </>
        ),
      },
      {
        title: "ประเภทของคุกกี้ที่เราใช้",
        content: (
          <>
            <ul className="space-y-3">
              <li>
                <strong className="text-gray-800">
                  1. คุกกี้ที่จำเป็น (Strictly Necessary Cookies)
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  จำเป็นอย่างยิ่งต่อการทำงานของเว็บไซต์ เช่น
                  การเข้าสู่ระบบอย่างปลอดภัย การบันทึกการตั้งค่า
                  เว็บไซต์จะไม่สามารถทำงานได้อย่างถูกต้องหากไม่มีคุกกี้ประเภทนี้
                </p>
                <p className="text-sm text-gray-500 mt-2 ml-4 italic">
                  ตัวอย่าง: wpl_user_preference, wordpress_test_cookie,
                  pll_language
                </p>
              </li>
              <li>
                <strong className="text-gray-800">
                  2. คุกกี้เพื่อการวิเคราะห์ (Analytical Cookies)
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  ช่วยให้เราเข้าใจพฤติกรรมการใช้งาน เช่น จำนวนผู้เข้าชม
                  หน้าเว็บที่ได้รับความนิยม
                  เพื่อปรับปรุงโครงสร้างและเนื้อหาเว็บไซต์
                </p>
                <p className="text-sm text-gray-500 mt-2 ml-4 italic">
                  ตัวอย่าง: Google Analytics (_ga, _gid, _gat, _utmz, _utma)
                </p>
              </li>
              <li>
                <strong className="text-gray-800">
                  3. คุกกี้เพื่อการทำงาน (Functionality Cookies)
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  จดจำการตั้งค่าและความชอบของคุณ เช่น ภาษา หรือภูมิภาค
                  เพื่อมอบประสบการณ์ที่เหมาะสมและเป็นส่วนตัว
                </p>
              </li>
              <li>
                <strong className="text-gray-800">
                  4. คุกกี้เพื่อการโฆษณา (Advertising Cookies)
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  ใช้เพื่อแสดงโฆษณาหรือเนื้อหาที่ตรงกับความสนใจ
                  และวัดผลประสิทธิภาพของการโฆษณา
                </p>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "ระยะเวลาการเก็บคุกกี้",
        content: (
          <>
            <ul className="space-y-3">
              <li>
                <strong className="text-gray-800">
                  คุกกี้แบบชั่วคราว (Session Cookies):
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  จะถูกลบออกโดยอัตโนมัติเมื่อคุณปิดเบราว์เซอร์
                </p>
              </li>
              <li>
                <strong className="text-gray-800">
                  คุกกี้แบบถาวร (Persistent Cookies):
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  จะถูกเก็บไว้ในอุปกรณ์ตามระยะเวลาที่กำหนด
                  หรือจนกว่าจะถูกลบด้วยตนเอง
                </p>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "วิธีจัดการคุกกี้",
        content: (
          <>
            <p className="mb-3">
              คุณสามารถเลือกที่จะปฏิเสธหรือลบคุกกี้ได้ตามต้องการผ่านการตั้งค่าเบราว์เซอร์:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Google Chrome:</strong> Settings → Privacy and security
                → Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy
              </li>
              <li>
                <strong>Firefox:</strong> Options → Privacy & Security
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Settings → Privacy, search, and
                services
              </li>
            </ul>
            <div className="text-sm text-amber-700 mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <p className="font-semibold">⚠️ หมายเหตุสำคัญ:</p>
              <p className="mt-1">
                การปิดการใช้งานคุกกี้บางประเภทอาจส่งผลต่อการทำงานของเว็บไซต์
                หรือไม่สามารถเข้าถึงบางฟังก์ชันได้ หากท่านใช้อุปกรณ์หลายเครื่อง
                ท่านต้องตั้งค่าคุกกี้ในแต่ละอุปกรณ์และเบราว์เซอร์แยกกัน
              </p>
            </div>
          </>
        ),
      },
    ],
    en: [
      {
        title: "What Are Cookies",
        content: (
          <p>
            Cookies are small text files that a website stores on your device
            (computer, mobile phone, or tablet) to help the website remember
            your settings, preferences, and improve your browsing experience.
          </p>
        ),
      },
      {
        title: "Purpose of Using Cookies",
        content: (
          <>
            <p className="mb-3">Iampong Pattana Co., Ltd. uses cookies to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Understand website usage behavior and improve user experience
              </li>
              <li>
                Analyze trends and behavior to develop content, products, and
                services
              </li>
              <li>
                Display information, advertisements, or news relevant to your
                interests
              </li>
              <li>
                Measure and evaluate marketing communication effectiveness
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "Types of Cookies We Use",
        content: (
          <>
            <ul className="space-y-3">
              <li>
                <strong className="text-gray-800">
                  1. Strictly Necessary Cookies
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  Essential for the website to function, such as secure login
                  and saving basic settings. The website cannot function
                  properly without these cookies.
                </p>
                <p className="text-sm text-gray-500 mt-2 ml-4 italic">
                  Examples: wpl_user_preference, wordpress_test_cookie,
                  pll_language
                </p>
              </li>
              <li>
                <strong className="text-gray-800">2. Analytical Cookies</strong>
                <p className="text-gray-600 mt-1 ml-4">
                  Help us understand usage behavior, such as visitor numbers and
                  popular pages, to improve website structure and content.
                </p>
                <p className="text-sm text-gray-500 mt-2 ml-4 italic">
                  Examples: Google Analytics (_ga, _gid, _gat, _utmz, _utma)
                </p>
              </li>
              <li>
                <strong className="text-gray-800">
                  3. Functionality Cookies
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  Remember your settings and preferences, such as language or
                  region, to provide a personalized experience.
                </p>
              </li>
              <li>
                <strong className="text-gray-800">
                  4. Advertising Cookies
                </strong>
                <p className="text-gray-600 mt-1 ml-4">
                  Used to display advertisements or content relevant to your
                  interests and measure advertising effectiveness.
                </p>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "Cookie Retention Period",
        content: (
          <>
            <ul className="space-y-3">
              <li>
                <strong className="text-gray-800">Session Cookies:</strong>
                <p className="text-gray-600 mt-1 ml-4">
                  Automatically deleted when you close your browser
                </p>
              </li>
              <li>
                <strong className="text-gray-800">Persistent Cookies:</strong>
                <p className="text-gray-600 mt-1 ml-4">
                  Stored on your device for a specified period or until manually
                  deleted
                </p>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "How to Manage Cookies",
        content: (
          <>
            <p className="mb-3">
              You can choose to refuse or delete cookies through your browser
              settings:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Google Chrome:</strong> Settings → Privacy and security
                → Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy
              </li>
              <li>
                <strong>Firefox:</strong> Options → Privacy & Security
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Settings → Privacy, search, and
                services
              </li>
            </ul>
            <div className="text-sm text-amber-700 mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <p className="font-semibold">⚠️ Important Note:</p>
              <p className="mt-1">
                Disabling certain cookies may affect website functionality or
                prevent access to some features. If you use multiple devices,
                you must set cookie preferences separately on each device and
                browser.
              </p>
            </div>
          </>
        ),
      },
    ],
  };

  const content = isTH
    ? { privacy: privacyContent.th, cookie: cookieContent.th }
    : { privacy: privacyContent.en, cookie: cookieContent.en };

  return (
    <section className="py-24 container mx-auto px-4 font-[Kanit]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            {isTH
              ? "นโยบายความเป็นส่วนตัวและคุกกี้"
              : "Privacy & Cookie Policy"}
          </h1>
          <p className="text-gray-600">
            {isTH
              ? "บริษัท เอี่ยมพงศ์พัฒนา จำกัด"
              : "Iampong Pattana Co., Ltd."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {isTH
              ? "อัปเดตล่าสุด: พฤศจิกายน 2025"
              : "Last Updated: November 2025"}
          </p>
        </div>

        {/* Privacy Policy Section */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 rounded-t-xl shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {isTH ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy"}
            </h2>
            <p className="text-sm mt-1 text-blue-100">
              {isTH
                ? "การคุ้มครองข้อมูลส่วนบุคคลของคุณ"
                : "Protecting Your Personal Information"}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-b-xl overflow-hidden border border-gray-200">
            {content.privacy.map((item, index) => (
              <div
                key={`privacy-${index}`}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => toggleSection(`privacy-${index}`)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                >
                  <span className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${
                      openSection === `privacy-${index}` ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === `privacy-${index}` && (
                  <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t animate-fadeIn">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Policy Section */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-5 rounded-t-xl shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {isTH ? "นโยบายคุกกี้" : "Cookie Policy"}
            </h2>
            <p className="text-sm mt-1 text-purple-100">
              {isTH
                ? "การใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ"
                : "Using Cookies to Enhance Your Experience"}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-b-xl overflow-hidden border border-gray-200">
            {content.cookie.map((item, index) => (
              <div
                key={`cookie-${index}`}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => toggleSection(`cookie-${index}`)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                >
                  <span className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${
                      openSection === `cookie-${index}` ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === `cookie-${index}` && (
                  <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t animate-fadeIn">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information Footer */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            {isTH ? "ติดต่อเรา" : "Contact Us"}
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>{isTH ? "บริษัท:" : "Company:"}</strong>{" "}
              {isTH
                ? "บริษัท เอี่ยมพงศ์พัฒนา จำกัด"
                : "Iampong Pattana Co., Ltd."}
            </p>
            <p>
              <strong>{isTH ? "อีเมล:" : "Email:"}</strong>{" "}
              <Link
                href="mailto:hr01@iampong.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                hr01@iampong.com
              </Link>{" "}
              |{" "}
              <Link
                href="mailto:hr02@iampong.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                hr02@iampong.com
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-3 italic">
              {isTH
                ? "หากท่านมีข้อสงสัยหรือต้องการใช้สิทธิเกี่ยวกับข้อมูลส่วนบุคคล กรุณาติดต่อเราผ่านช่องทางด้านบน"
                : "If you have any questions or wish to exercise your data rights, please contact us through the channels above"}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
