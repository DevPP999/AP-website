# 🚀 Next.js Web Application - Complete Guide

## 📋 **Overview**

เว็บแอปพลิเคชัน Next.js สำหรับบริษัท AP ที่มีฟีเจอร์ครบครัน พร้อมสำหรับ Production

## 🎯 **Features**

### **Core Features**

- ✅ **Multi-language Support** (TH/EN)
- ✅ **Product Catalog** with categories
- ✅ **Career Application** with file upload
- ✅ **Contact Form** with validation
- ✅ **Articles System**
- ✅ **Projects Showcase**
- ✅ **Privacy Policy** page

### **Technical Features**

- ✅ **Google Analytics 4** integration
- ✅ **Framer Motion** animations
- ✅ **Anti-spam Protection** (Rate limiting, Honeypot, Cloudflare Turnstile)
- ✅ **Performance Monitoring** (Web Vitals)
- ✅ **Security Headers**
- ✅ **Responsive Design**

## 🚀 **Quick Start**

### **1. Installation**

```bash
npm install
```

### **2. Environment Setup**

Copy `.env.local` from `env.production.example` and configure:

```env
# Basic Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Sheets Integration
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# Google Apps Script URLs
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_APPLICATION_SCRIPT_ID/exec
GOOGLE_APPS_SCRIPT_CONTACT_URL=https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec
```

### **3. Development**

```bash
npm run dev
```

### **4. Production Build**

```bash
npm run build
npm start
```

## 🌐 **Deployment to Plesk**

### **Step 1: Prepare Files**

1. Run `npm run build`
2. Upload all files to Plesk File Manager
3. Set environment variables in Plesk

### **Step 2: Plesk Configuration**

1. **Application Type**: Node.js
2. **Application Startup File**: `layout.tsx`
3. **Node.js Version**: 18.x or higher
4. **Environment Variables**: Copy from `.env.local`

### **Step 3: Plesk Settings**

- **Document Root**: `/httpdocs`
- **Application Root**: `/httpdocs`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### **Step 4: Domain Configuration**

- Point your domain to the Plesk server
- Enable SSL certificate
- Configure redirects if needed

## 📊 **API Endpoints**

### **Form Submissions**

- **POST** `/api/submit-contact` - Contact form
- **POST** `/api/submit-application` - Career application

### **SEO**

- **GET** `/robots.txt` - Robots file
- **GET** `/sitemap.xml` - Sitemap

## 🔧 **Configuration Files**

### **Important Files**

- `next.config.ts` - Next.js configuration with security headers
- `middleware.ts` - Internationalization middleware
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

### **Environment Files**

- `.env.local` - Local development (not in git)
- `env.production.example` - Production template

## 📱 **Monitoring & Analytics**

### **Google Analytics 4**

- Tracks page views, events, and conversions
- Configured for both localhost and production
- Web Vitals tracking included

### **Google Apps Script (GAS) Integration**

#### **1. Contact Form Handler**

- **URL**: `GOOGLE_APPS_SCRIPT_CONTACT_URL`
- **Function**: `doPost()` for contact form submissions
- **Data Storage**: Google Sheets (Contact Messages sheet)
- **Features**:
  - Automatic sheet creation with headers
  - Thai timezone formatting
  - Error handling and logging
  - JSON response format

#### **2. Job Application Handler**

- **URL**: `GOOGLE_APPS_SCRIPT_URL`
- **Function**: `doPost()` for job applications
- **Data Storage**: Google Sheets (Job Applications sheet)
- **Features**:
  - Resume file upload to Google Drive
  - Automatic sheet creation with headers
  - File management and organization
  - Drive URL generation

### **Performance Monitoring**

- Core Web Vitals (LCP, CLS, FCP, TTFB, INP)
- Long Tasks detection
- Layout Shift monitoring

## 🛡️ **Security Features**

### **Anti-Spam Protection**

- Rate limiting (5 requests/minute per IP)
- Honeypot fields
- Cloudflare Turnstile integration
- Form validation

### **Security Headers**

- X-DNS-Prefetch-Control
- X-XSS-Protection
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## 🎨 **UI/UX Features**

### **Animations**

- Framer Motion integration
- Scroll-triggered animations
- Hover effects
- Staggered animations

### **Responsive Design**

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # React components
├── data/                  # Static data files
├── lib/                   # Utility functions
├── messages/              # i18n translations
├── types/                 # TypeScript types
└── utils/                 # Helper functions
```

## 🔍 **Troubleshooting**

### **Common Issues**

#### **Build Errors**

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

#### **Environment Variables**

- Check `.env.local` exists
- Verify all required variables are set
- Restart dev server after changes

#### **API Errors**

- Check server logs
- Verify environment variables
- Test with curl commands

### **Debug Commands**

```bash
# Check build
npm run build

# Test forms
curl -X POST http://localhost:3000/api/submit-contact
```

## 📈 **Performance Optimization**

### **Image Optimization**

- Next.js Image component
- WebP/AVIF formats
- Responsive images
- Lazy loading

### **Code Splitting**

- Automatic code splitting
- Dynamic imports
- Route-based splitting

### **Caching**

- Static generation where possible
- ISR for dynamic content
- CDN optimization

## 🚀 **Production Checklist**

### **Before Deployment**

- [ ] Environment variables configured
- [ ] Build successful (`npm run build`)
- [ ] All tests passing
- [ ] Security headers enabled
- [ ] Analytics configured
- [ ] Forms working correctly

### **After Deployment**

- [ ] Website loads correctly
- [ ] Forms submit successfully
- [ ] Analytics tracking
- [ ] Google Apps Script working
- [ ] SSL certificate active
- [ ] Performance monitoring

## 📞 **Support**

### **Documentation**

- `README.md` - Basic setup
- `README_COMPLETE.md` - Complete documentation
- `GAS_SETUP_GUIDE.md` - Google Apps Script setup guide

### **Environment Setup**

- `env.production.example` - Environment configuration template

## 🎯 **Quick Commands**

```bash
# Development
npm run dev

# Production build
npm run build

# Start production
npm start

# Test forms
curl -X POST http://localhost:3000/api/submit-contact
```

---

**🚀 Ready for Production!**

**URL**: `https://yourdomain.com`
**Documentation**: `README_COMPLETE.md`
