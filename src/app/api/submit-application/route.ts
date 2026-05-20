import { NextRequest, NextResponse } from "next/server";
import { antiSpamCheck } from "@/lib/antispam";

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  education?: string;
  skills?: string;
  message?: string;
  privacyAccepted: string;
  locale: string;
}

const isDev = process.env.NODE_ENV !== "production";
const devLog = (...args: unknown[]) => {
  if (isDev) console.log(...args);
};
const devError = (...args: unknown[]) => {
  if (isDev) console.error(...args);
};

export async function POST(request: NextRequest) {
  try {
    devLog("🔥 API called: /api/submit-application");

    const formData = await request.formData();
    // Anti-spam: rate limit + honeypot + timing + Turnstile
    const spamResponse = await antiSpamCheck(request, formData);
    if (spamResponse) return spamResponse;
    const resumeFile = formData.get("resume") as File | null;

    // Parse form data
    const data: ApplicationFormData = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      position: formData.get("position")?.toString() || "",
      experience: formData.get("experience")?.toString() || "",
      education: formData.get("education")?.toString() || "",
      skills: formData.get("skills")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      privacyAccepted: formData.get("privacyAccepted")?.toString() || "",
      locale: formData.get("locale")?.toString() || "th",
    };

    devLog("📝 Parsed data:", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      position: data.position,
    });

    devLog("- resume:", resumeFile ? "✅ File attached" : "⚠️ No file");

    // Validation
    const missingFields = [];
    if (!data.fullName || data.fullName.trim() === "")
      missingFields.push("ชื่อ");
    if (!data.email || data.email.trim() === "") missingFields.push("อีเมล");
    if (!data.phone || data.phone.trim() === "")
      missingFields.push("เบอร์โทรศัพท์");
    if (!data.position || data.position.trim() === "")
      missingFields.push("ตำแหน่งที่สมัคร");
    if (!data.privacyAccepted || data.privacyAccepted !== "true")
      missingFields.push("การยอมรับนโยบายความเป็นส่วนตัว");

    if (missingFields.length > 0) {
      devLog("❌ Missing required fields:", missingFields);
      return NextResponse.json(
        {
          error: `กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(", ")}`,
          success: false,
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        {
          error: "รูปแบบอีเมลไม่ถูกต้อง",
          success: false,
        },
        { status: 400 }
      );
    }

    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    // ส่งข้อมูลไป Discord
    if (DISCORD_WEBHOOK_URL) {
      devLog("📢 Sending Discord notification...");
      try {
        const timestamp = new Date().toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
        });

        const discordMessage = {
          embeds: [
            {
              title: "🎯 มีใบสมัครงานใหม่!",
              description: `
**👤 ชื่อ-นามสกุล:** ${data.fullName}

**📧 อีเมล:** ${data.email}

**📱 เบอร์โทร:** ${data.phone}

**💼 ตำแหน่งที่สมัคร:** ${data.position}

**🎓 การศึกษา:** ${data.education || "ไม่ระบุ"}

**💼 ประสบการณ์:** ${data.experience || "ไม่ระบุ"}

**🛠️ ทักษะ:** ${data.skills || "ไม่ระบุ"}

**💬 ข้อความเพิ่มเติม:** ${data.message || "ไม่มี"}

**📄 ไฟล์แนบ:** ${
                resumeFile
                  ? `${resumeFile.name} (${Math.round(
                      resumeFile.size / 1024
                    )}KB)`
                  : "ไม่มีไฟล์"
              }

**⏰ เวลาสมัคร:** ${timestamp}
              `.trim(),
              color: 0x00ff00, // สีเขียวสวย
              footer: {
                text: "AP Career Portal - ระบบสมัครงานอัตโนมัติ",
                icon_url:
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              },
              timestamp: new Date().toISOString(),
              thumbnail: {
                url: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
              },
            },
          ],
        };

        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discordMessage),
        });

        if (discordResponse.ok) {
          devLog("✅ Discord notification sent successfully");
        } else {
          devError("❌ Discord webhook failed:", discordResponse.status);
        }
      } catch (discordError) {
        devError("❌ Discord error:", discordError);
      }
    }

    // เพิ่มการบันทึกข้อมูลลง Google Sheets ผ่าน Google Apps Script
    let sheetsSuccess = false;
    try {
      devLog("📊 Attempting to save to Google Sheets...");

      const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

      // เตรียมข้อมูลสำหรับส่งไป Google Apps Script
      const sheetsData: Record<string, string | number> = {
        timestamp: new Date().toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
        }),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        experience: data.experience || "-",
        education: data.education || "-",
        skills: data.skills || "-",
        message: data.message || "-",
        resumeFileName: resumeFile ? resumeFile.name : "-",
      };

      // เพิ่มไฟล์ (ถ้ามี) ในรูปแบบ Base64
      if (resumeFile) {
        devLog("📁 Converting file to Base64...");
        const arrayBuffer = await resumeFile.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        sheetsData.resumeFileData = base64;
        sheetsData.resumeFileName = `${data.fullName}_${
          data.position
        }_${Date.now()}.${resumeFile.name.split(".").pop()}`;

        devLog("✅ File converted, size:", base64.length, "chars");
      }

      // บันทึกข้อมูลลง Google Sheets ผ่าน Google Apps Script
      if (googleAppsScriptUrl) {
        devLog("📝 Sending data to Google Apps Script...");

        const scriptResponse = await fetch(googleAppsScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetsData),
        });

        if (scriptResponse.ok) {
          const scriptResult = await scriptResponse.json();
          devLog("✅ Google Apps Script response:", scriptResult);
          sheetsSuccess = scriptResult.success;

          if (scriptResult.success) {
            devLog("📊 Data saved to Google Sheets");
            if (resumeFile && scriptResult.driveFileUrl) {
              devLog(
                "📁 File uploaded to Google Drive:",
                scriptResult.driveFileUrl
              );
            }
          }
        } else {
          const errorText = await scriptResponse.text();
          devError(
            "❌ Google Apps Script failed:",
            scriptResponse.status,
            errorText
          );
        }
      } else {
        devLog("📝 Data to save:", JSON.stringify(sheetsData, null, 2));
        devLog("⚠️ No Google Apps Script URL configured - using mock mode");
        sheetsSuccess = true; // Mock mode
      }
    } catch (sheetsError) {
      devError("❌ Error saving to Google Sheets:", sheetsError);
    }

    // เพิ่มการจัดเก็บไฟล์ (ถ้ามี)
    let fileInfo = null;
    if (resumeFile) {
      try {
        devLog("📁 Processing resume file...");

        // สำหรับตอนนี้ ให้เก็บข้อมูลไฟล์เพื่อส่งใน response
        fileInfo = {
          name: resumeFile.name,
          size: resumeFile.size,
          type: resumeFile.type,
          // ในอนาคตจะอัปโหลดไป Google Drive หรือจัดเก็บในรูปแบบอื่น
        };

        devLog("✅ File info captured:", fileInfo);
      } catch (fileError) {
        devError("❌ Error processing file:", fileError);
      }
    }

    // Return success พร้อมข้อมูลการบันทึก
    return NextResponse.json({
      message:
        "ใบสมัครถูกส่งเรียบร้อยแล้ว! เราได้รับข้อมูลแล้วและจะติดต่อกลับภายใน 3-5 วันทำการ",
      success: true,
      discordSent: true,
      sheetsSaved: sheetsSuccess,
      fileProcessed: !!fileInfo,
      data: {
        fullName: data.fullName,
        email: data.email,
        position: data.position,
        timestamp: new Date().toISOString(),
        fileInfo: fileInfo,
      },
    });
  } catch (error) {
    devError("❌ Application submission error:", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการส่งใบสมัคร กรุณาลองใหม่อีกครั้ง",
        success: false,
      },
      { status: 500 }
    );
  }
}
