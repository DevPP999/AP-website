import { NextRequest, NextResponse } from "next/server";
import { antiSpamCheck } from "@/lib/antispam";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
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
    devLog("📨 Contact form submission received");

    const formData = await request.formData();
    // Anti-spam: rate limit + honeypot + timing + Turnstile
    const spamResponse = await antiSpamCheck(request, formData);
    if (spamResponse) return spamResponse;

    // Parse form data
    const data: ContactFormData = {
      name: formData.get("name")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      topic: formData.get("topic")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      privacyAccepted: formData.get("privacyAccepted")?.toString() || "",
      locale: formData.get("locale")?.toString() || "th",
    };

    devLog("📝 Contact data received:", data);

    // Validation
    const missingFields = [];
    if (!data.name || data.name.trim() === "") missingFields.push("ชื่อ");
    if (!data.email || data.email.trim() === "") missingFields.push("อีเมล");
    if (!data.phone || data.phone.trim() === "")
      missingFields.push("เบอร์โทรศัพท์");
    if (!data.topic || data.topic.trim() === "") missingFields.push("หัวข้อ");
    if (!data.message || data.message.trim() === "")
      missingFields.push("ข้อความ");
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
      devLog("📢 Sending contact form to Discord...");
      try {
        const timestamp = new Date().toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
        });

        const topicIcon =
          {
            sales: "💰",
            support: "🛠️",
            others: "💬",
            ผ่ายขาย: "💰",
            สนับสนุน: "🛠️",
            อื่นๆ: "💬",
          }[data.topic.toLowerCase()] || "💬";

        const discordMessage = {
          embeds: [
            {
              title: "📞 มีข้อความติดต่อใหม่!",
              description: `
**👤 ชื่อ:** ${data.name}

**🏢 บริษัท:** ${data.company || "ไม่ระบุ"}

**📧 อีเมล:** ${data.email}

**📱 เบอร์โทร:** ${data.phone}

**${topicIcon} หัวข้อ:** ${data.topic}

**💬 ข้อความ:**
${data.message}

**⏰ เวลาส่ง:** ${timestamp}
              `.trim(),
              color: 0x0099ff, // สีฟ้า
              footer: {
                text: "AP Contact Portal - ระบบติดต่ออัตโนมัติ",
                icon_url:
                  "https://cdn-icons-png.flaticon.com/512/561/561127.png",
              },
              timestamp: new Date().toISOString(),
              thumbnail: {
                url: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
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

    // บันทึกข้อมูลลง Google Sheets (ผ่าน Google Apps Script)
    let sheetsSuccess = false;
    try {
      const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL;

      if (googleAppsScriptUrl) {
        devLog("📊 Sending contact data to Google Apps Script...");

        const sheetsData = {
          timestamp: new Date().toLocaleString("th-TH", {
            timeZone: "Asia/Bangkok",
          }),
          name: data.name,
          company: data.company || "-",
          email: data.email,
          phone: data.phone,
          topic: data.topic,
          message: data.message,
          locale: data.locale,
        };

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
        } else {
          const errorText = await scriptResponse.text();
          devError(
            "❌ Google Apps Script failed:",
            scriptResponse.status,
            errorText
          );
        }
      } else {
        devLog("⚠️ No Google Apps Script URL configured for contact form");
        sheetsSuccess = true; // Mock mode
      }
    } catch (sheetsError) {
      devError("❌ Error saving contact to Google Sheets:", sheetsError);
    }

    // Return success
    return NextResponse.json({
      message:
        data.locale === "th"
          ? "ข้อความของคุณได้ถูกส่งเรียบร้อยแล้ว! เราจะติดต่อกลับภายใน 24 ชั่วโมง"
          : "Your message has been sent successfully! We will contact you within 24 hours",
      success: true,
      discordSent: true,
      sheetsSaved: sheetsSuccess,
      data: {
        name: data.name,
        email: data.email,
        topic: data.topic,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    devError("❌ Contact form error:", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง",
        success: false,
      },
      { status: 500 }
    );
  }
}
