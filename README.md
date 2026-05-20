# 🚀 Next.js Web Application

## 📋 **Complete Documentation**

**👉 [README_COMPLETE.md](./README_COMPLETE.md) - เอกสารครบถ้วนทุกอย่าง**

---

## โปรเจกต์

แอป Next.js 15 ที่ใช้การเรนเดอร์แบบไฮบริด (SSR + Client Components)

## เริ่มพัฒนา

```bash
npm ci
npm run dev
```

เปิด http://localhost:3000

## 🚀 การ Deploy บน Plesk (Node.js)

### 📋 ข้อกำหนดเบื้องต้น

1. **ติดตั้ง Plesk Node.js Extension**

   - ไปที่ Plesk Panel → Extensions → Install Extensions
   - ค้นหา "Node.js" และติดตั้ง
   - เปิดใช้งาน Node.js Extension

2. **สร้าง Node.js Application**
   - ไปที่ Websites & Domains → เลือกโดเมนของคุณ
   - คลิก "Node.js" → "Add Node.js App"
   - ตั้งค่า:
     - **App name**: `next-app-web` (หรือชื่อที่ต้องการ)
     - **Node.js version**: `18.x` หรือ `20.x` (แนะนำ 18+)
     - **Application mode**: `production`
     - **Application root**: `/httpdocs/next-app-web` (หรือ path ที่ต้องการ)

### 🔧 การตั้งค่า Environment Variables

ไปที่ **Plesk Panel → Websites & Domains → [Domain] → Node.js → [App Name] → Environment Variables**

เพิ่มตัวแปรต่อไปนี้:

```bash
# ข้อมูลเว็บไซต์
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production

# Google Integration
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id
GOOGLE_SHEET_ID=your_google_sheet_id

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL

# Turnstile (Cloudflare)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Google Apps Script (ถ้าใช้)
GOOGLE_APPS_SCRIPT_CONTACT_URL=your_google_apps_script_url
GOOGLE_APPS_SCRIPT_URL=your_google_apps_script_url

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 📦 การอัปโหลดและติดตั้ง

1. **อัปโหลดไฟล์**

   - อัปโหลดไฟล์โปรเจคทั้งหมดไปยัง Application Root
   - หรือใช้ Git: `git clone https://github.com/your-repo.git`

2. **ตั้งค่า Commands**

   - **Install command**: `npm ci --production`
   - **Build command**: `npm run build`
   - **Start command**: `npm start`

3. **Application Startup File**
   - เลือก: `src/app/layout.tsx` (สำหรับ App Router)
   - หรือ: `next.config.ts` (สำหรับ configuration)

### ⚙️ การตั้งค่าเพิ่มเติม

#### **Option 1: Standard Mode (แนะนำ)**

```bash
# Start command
npm start
```

#### **Option 2: Standalone Mode (สำหรับ Performance สูง)**

```bash
# Start command
node .next/standalone/server.js
```

**การตั้งค่า Static Files (สำหรับ Standalone):**

- แมป `/_next/static` → `.next/static`
- เสิร์ฟโฟลเดอร์ `public/` สำหรับรูปภาพและไฟล์สแตติก

### 🔍 การตรวจสอบหลัง Deploy

1. **ทดสอบหน้าเว็บ**

   - เปิด `https://your-domain.com`
   - ตรวจสอบ `/th` และ `/en`
   - ทดสอบ Responsive Design บนมือถือ

2. **ทดสอบฟังก์ชัน**

   - ฟอร์ม Contact Us
   - ฟอร์ม Career Application
   - ตรวจสอบการส่งข้อมูลไปยัง Discord/Google Sheets

3. **ตรวจสอบ Performance**
   - ใช้ Google PageSpeed Insights
   - ตรวจสอบ Console สำหรับ Error

### 🛠️ การแก้ไขปัญหา

#### **Error: Module not found**

```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm ci --production
```

#### **Error: Port already in use**

- ตรวจสอบว่าไม่มี Process อื่นใช้ Port เดียวกัน
- Restart Node.js Application ใน Plesk

#### **Error: Environment variables not loaded**

- ตรวจสอบการตั้งค่า Environment Variables ใน Plesk
- Restart Application หลังจากเปลี่ยน Environment Variables

### 📊 การ Monitor และ Maintenance

1. **Logs**

   - ดู Logs ที่: Plesk Panel → Node.js → [App] → Logs
   - ตรวจสอบ Error Logs เป็นประจำ

2. **Performance**

   - ใช้ Plesk Resource Usage Monitor
   - ตั้งค่า Auto-restart เมื่อ Memory เกินกำหนด

3. **Backup**
   - ตั้งค่า Automatic Backup ใน Plesk
   - Backup Environment Variables และ Database (ถ้ามี)

### 🔄 การอัปเดต

1. **อัปเดตโค้ด**

   ```bash
   git pull origin main
   npm ci --production
   npm run build
   # Restart Application ใน Plesk
   ```

2. **อัปเดต Dependencies**
   ```bash
   npm update
   npm run build
   # Restart Application ใน Plesk
   ```

## สคริปต์

- `dev`: เริ่มเซิร์ฟเวอร์พัฒนา
- `build`: บิลด์โปรดักชัน
- `start`: รันโปรดักชัน
- `lint`: ตรวจโค้ด

## 📊 Google Analytics

### การตั้งค่า

1. ไปที่ [Google Analytics](https://analytics.google.com/)
2. สร้าง Property ใหม่
3. คัดลอก Measurement ID (รูปแบบ: G-XXXXXXXXXX)
4. เพิ่มใน Environment Variables:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### การใช้งาน

- Google Analytics จะโหลดอัตโนมัติเมื่อมี `NEXT_PUBLIC_GA_ID`
- ใช้ Google Analytics 4 (GA4)
- รองรับการติดตาม Page Views และ Events

### การทดสอบใน Localhost

1. **สร้าง GA4 Property**:

   - ไปที่ [Google Analytics](https://analytics.google.com/)
   - สร้าง Property ใหม่
   - ตั้งค่า Data Streams → Web → Website URL: `http://localhost:3000`

2. **ตั้งค่า Environment Variables**:

   ```bash
   # .env.local
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **ตรวจสอบใน Browser**:

   - เปิด Developer Tools → Network
   - ดูการโหลด `gtag/js` และ `collect` requests
   - ใช้ Google Analytics Debugger extension

4. **Real-time Reports**:
   - ไปที่ GA4 → Reports → Realtime
   - ดูการติดตามใน localhost

## หมายเหตุ

- API routes จะล็อกเฉพาะโหมดพัฒนา; บนโปรดักชันจะไม่พิมพ์ log เว้นแต่ `NODE_ENV !== 'production'`
- Google Analytics จะทำงานเฉพาะเมื่อมี `NEXT_PUBLIC_GA_ID` ใน Environment Variables
