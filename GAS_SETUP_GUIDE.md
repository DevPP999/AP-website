# 🔧 Google Apps Script (GAS) Setup Guide

## 📋 **Overview**

ระบบใช้ Google Apps Script 2 ส่วนสำหรับจัดการข้อมูลจากฟอร์ม:

1. **Contact Form Handler** - จัดการข้อมูลจากฟอร์มติดต่อ
2. **Job Application Handler** - จัดการข้อมูลจากฟอร์มสมัครงาน

## 🚀 **Setup Instructions**

### **Step 1: Create Google Apps Script Projects**

#### **1.1 Contact Form Handler**

1. ไปที่ [Google Apps Script](https://script.google.com/)
2. คลิก "New Project"
3. ตั้งชื่อ: `AP Contact Form Handler`
4. คัดลอกโค้ดจากส่วนที่ 1 ด้านล่าง
5. บันทึก (Ctrl+S)

#### **1.2 Job Application Handler**

1. สร้าง New Project อีกตัว
2. ตั้งชื่อ: `AP Job Application Handler`
3. คัดลอกโค้ดจากส่วนที่ 2 ด้านล่าง
4. บันทึก (Ctrl+S)

### **Step 2: Deploy Scripts**

#### **2.1 Deploy Contact Handler**

1. ใน Contact Form Handler project
2. คลิก "Deploy" → "New deployment"
3. เลือก Type: "Web app"
4. ตั้งค่า:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. คลิก "Deploy"
6. คัดลอก Web App URL

#### **2.2 Deploy Application Handler**

1. ใน Job Application Handler project
2. ทำเหมือนกับ Contact Handler
3. คัดลอก Web App URL

### **Step 3: Configure Environment Variables**

เพิ่ม URLs ใน `.env.local`:

```env
# Google Apps Script URLs
GOOGLE_APPS_SCRIPT_CONTACT_URL=https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_APPLICATION_SCRIPT_ID/exec
```

## 📝 **Script 1: Contact Form Handler**

```javascript
function doPost(e) {
  try {
    console.log("📞 Contact form submission received");

    // รับข้อมูลจาก POST request
    var data = JSON.parse(e.postData.contents);
    console.log("📝 Contact data received:", data);

    // เปิด Google Sheet (ใช้ Sheet ID เดียวกันกับ Job Applications)
    var sheetId = "1gWnJ9-dB4GkMkFYyrYLEFB66FixUQ8xEJaz73nx6_5A";
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    var sheet = spreadsheet.getSheetByName("Contact Messages");

    // ถ้าไม่มี sheet ให้สร้างใหม่
    if (!sheet) {
      console.log("📊 Creating new sheet: Contact Messages");
      sheet = spreadsheet.insertSheet("Contact Messages");

      // สร้าง header
      var headers = [
        "วันที่ติดต่อ",
        "ชื่อ",
        "บริษัท",
        "อีเมล",
        "เบอร์โทรศัพท์",
        "หัวข้อ",
        "ข้อความ",
        "ภาษา",
      ];

      // ตั้งค่า header พร้อมสไตล์
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers]);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0099ff"); // สีฟ้า
      headerRange.setFontColor("white");
    }

    // เพิ่มข้อมูลใหม่
    var newRow = [
      data.timestamp ||
        new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
      data.name || "",
      data.company || "",
      data.email || "",
      data.phone || "",
      data.topic || "",
      data.message || "",
      data.locale || "th",
    ];

    console.log("➕ Adding contact message:", newRow);
    sheet.appendRow(newRow);

    // ส่ง response กลับ
    console.log("✅ Contact data saved successfully");
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Contact message saved successfully",
        timestamp: new Date().toISOString(),
        rowAdded: true,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("❌ Error in contact doPost:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "running",
      message: "AP Contact Form Handler is running",
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ฟังก์ชันทดสอบ
function testContactScript() {
  console.log("🧪 Testing contact script...");

  var testData = {
    timestamp: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
    name: "Test User",
    company: "Test Company",
    email: "test@example.com",
    phone: "0123456789",
    topic: "sales",
    message: "This is a test contact message",
    locale: "th",
  };

  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  var result = doPost(mockEvent);
  console.log("🧪 Contact test result:", result.getContent());
}
```

## 📝 **Script 2: Job Application Handler**

```javascript
function doPost(e) {
  try {
    console.log("📨 Received POST request");

    // รับข้อมูลจาก POST request
    var data = JSON.parse(e.postData.contents);
    console.log("📝 Parsed data:", data);

    // เปิด Google Sheet (ใช้ Sheet ID จาก environment)
    var sheetId = "1gWnJ9-dB4GkMkFYyrYLEFB66FixUQ8xEJaz73nx6_5A";
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    var sheet = spreadsheet.getSheetByName("Job Applications");

    // ถ้าไม่มี sheet ให้สร้างใหม่
    if (!sheet) {
      console.log("📊 Creating new sheet: Job Applications");
      sheet = spreadsheet.insertSheet("Job Applications");

      // สร้าง header (เพิ่มคอลัมน์ลิงก์ไฟล์)
      var headers = [
        "วันที่สมัคร",
        "ชื่อ-นามสกุล",
        "อีเมล",
        "เบอร์โทรศัพท์",
        "ตำแหน่งที่สมัคร",
        "ประสบการณ์ทำงาน",
        "วุฒิการศึกษา",
        "ทักษะและความสามารถ",
        "ข้อความเพิ่มเติม",
        "ชื่อไฟล์เรซูเม่",
        "ลิงก์ไฟล์ Drive",
      ];

      // ตั้งค่า header พร้อมสไตล์
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers]);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#4CAF50");
      headerRange.setFontColor("white");
    }

    // จัดการไฟล์ (ถ้ามี)
    var driveFileUrl = "";
    if (data.resumeFileData && data.resumeFileName) {
      console.log("📁 Processing resume file...");

      // อัปโหลดไฟล์ไป Google Drive
      var driveResult = uploadFileToDrive(
        data.resumeFileData,
        data.resumeFileName,
        "1KzxB40eKZlQBqSHu7oqXIDBjVRrqM1-Y" // Drive Folder ID
      );

      if (driveResult.success) {
        driveFileUrl = driveResult.fileUrl;
        console.log("✅ File uploaded to Drive:", driveFileUrl);
      } else {
        console.error("❌ Drive upload failed:", driveResult.error);
      }
    }

    // เพิ่มข้อมูลใหม่ (รวมลิงก์ไฟล์ Drive)
    var newRow = [
      data.timestamp ||
        new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.position || "",
      data.experience || "",
      data.education || "",
      data.skills || "",
      data.message || "",
      data.resumeFileName || "",
      driveFileUrl || "", // เพิ่มคอลัมน์ลิงก์ไฟล์
    ];

    console.log("➕ Adding new row:", newRow);
    sheet.appendRow(newRow);

    // ส่ง response กลับ
    console.log("✅ Data saved successfully");
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully to Google Sheets",
        timestamp: new Date().toISOString(),
        rowAdded: true,
        driveFileUrl: driveFileUrl || null,
        fileUploaded: !!driveFileUrl,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("❌ Error in doPost:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "running",
      message: "AP Job Application Handler is running",
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ฟังก์ชันสำหรับอัปโหลดไฟล์ไป Google Drive
function uploadFileToDrive(fileData, fileName, folderId) {
  try {
    console.log("📁 Uploading file to Drive:", fileName);

    // แปลง Base64 เป็น Blob
    var decodedData = Utilities.base64Decode(fileData);
    var blob = Utilities.newBlob(decodedData, "application/pdf", fileName);

    // อัปโหลดไป Google Drive
    var file = DriveApp.createFile(blob);

    // ย้ายไฟล์ไปยังโฟลเดอร์ที่กำหนด
    if (folderId) {
      var folder = DriveApp.getFolderById(folderId);
      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
    }

    console.log("✅ File uploaded successfully:", file.getId());
    return {
      success: true,
      fileId: file.getId(),
      fileUrl: file.getUrl(),
      fileName: fileName,
    };
  } catch (error) {
    console.error("❌ Error uploading file:", error);
    return {
      success: false,
      error: error.toString(),
    };
  }
}

// ฟังก์ชันทดสอบ
function testScript() {
  console.log("🧪 Testing script...");

  var testData = {
    timestamp: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
    fullName: "Test User",
    email: "test@example.com",
    phone: "0123456789",
    position: "Test Position",
    experience: "Test Experience",
    education: "Test Education",
    skills: "Test Skills",
    message: "Test Message",
    resumeFileName: "test-resume.pdf",
  };

  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  var result = doPost(mockEvent);
  console.log("🧪 Test result:", result.getContent());
}
```

## 🔧 **Configuration**

### **Google Sheet ID**

- ใช้ Sheet ID เดียวกัน: `1gWnJ9-dB4GkMkFYyrYLEFB66FixUQ8xEJaz73nx6_5A`
- สร้าง 2 sheets: `Contact Messages` และ `Job Applications`

### **Google Drive Folder ID**

- ใช้ Folder ID: `1KzxB40eKZlQBqSHu7oqXIDBjVRrqM1-Y`
- สำหรับเก็บไฟล์ Resume

## 🧪 **Testing**

### **Test Contact Handler**

1. เปิด Contact Handler project
2. คลิก "Run" → `testContactScript`
3. ตรวจสอบ Google Sheet

### **Test Application Handler**

1. เปิด Application Handler project
2. คลิก "Run" → `testScript`
3. ตรวจสอบ Google Sheet และ Drive

## 📊 **Data Structure**

### **Contact Messages Sheet**

| วันที่ติดต่อ | ชื่อ | บริษัท | อีเมล | เบอร์โทรศัพท์ | หัวข้อ | ข้อความ | ภาษา |
| ------------ | ---- | ------ | ----- | ------------- | ------ | ------- | ---- |

### **Job Applications Sheet**

| วันที่สมัคร | ชื่อ-นามสกุล | อีเมล | เบอร์โทรศัพท์ | ตำแหน่งที่สมัคร | ประสบการณ์ทำงาน | วุฒิการศึกษา | ทักษะและความสามารถ | ข้อความเพิ่มเติม | ชื่อไฟล์เรซูเม่ | ลิงก์ไฟล์ Drive |
| ----------- | ------------ | ----- | ------------- | --------------- | --------------- | ------------ | ------------------ | ---------------- | --------------- | --------------- |

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Permission Denied**

- ตรวจสอบว่า Script มีสิทธิ์เข้าถึง Google Sheets และ Drive
- เปิดใช้งาน Google Sheets API และ Drive API

#### **2. Sheet Not Found**

- ตรวจสอบ Sheet ID ถูกต้อง
- Script จะสร้าง sheet ใหม่อัตโนมัติ

#### **3. File Upload Failed**

- ตรวจสอบ Drive Folder ID
- ตรวจสอบสิทธิ์การเข้าถึง Drive

### **Debug Steps**

1. เปิด Apps Script Editor
2. ดู Logs ใน "Executions"
3. ใช้ `console.log()` เพื่อ debug
4. ทดสอบด้วย `testScript()` functions

---

**🔧 GAS Setup เสร็จสมบูรณ์!**

**Contact Handler**: `GOOGLE_APPS_SCRIPT_CONTACT_URL`
**Application Handler**: `GOOGLE_APPS_SCRIPT_URL`
