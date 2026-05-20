@echo off
REM Production Deployment Script for Windows
REM Run this script to deploy to production

echo 🚀 Starting Production Deployment...

REM Check if .env.production exists
if not exist ".env.production" (
    echo ❌ Error: .env.production file not found!
    echo Please copy env.production.example to .env.production and fill in your values.
    pause
    exit /b 1
)

echo 🔍 Checking environment variables...

REM Check for required environment variables
set "missing_vars="
if not exist ".env.production" (
    set "missing_vars=1"
) else (
    findstr /C:"NEXT_PUBLIC_SITE_URL=https://" .env.production >nul || set "missing_vars=1"
    findstr /C:"GOOGLE_CLIENT_EMAIL=" .env.production >nul || set "missing_vars=1"
    findstr /C:"GOOGLE_PRIVATE_KEY=" .env.production >nul || set "missing_vars=1"
    findstr /C:"GOOGLE_SHEET_ID=" .env.production >nul || set "missing_vars=1"
    findstr /C:"DISCORD_WEBHOOK_URL=" .env.production >nul || set "missing_vars=1"
    findstr /C:"NEXT_PUBLIC_GA_ID=" .env.production >nul || set "missing_vars=1"
)

if defined missing_vars (
    echo ❌ Error: Missing or incomplete environment variables!
    echo Please update .env.production with your actual values.
    pause
    exit /b 1
)

echo ✅ Environment variables check passed!

REM Install dependencies
echo 📦 Installing dependencies...
call npm ci --production=false
if errorlevel 1 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)

REM Run linting
echo 🔍 Running linting...
call npm run lint
if errorlevel 1 (
    echo ❌ Linting failed! Please fix the errors before deploying.
    pause
    exit /b 1
)

REM Build the application
echo 🏗️ Building application...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed! Please fix the errors before deploying.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Create production build info
echo 📝 Creating production build info...
echo { > build-info.json
echo   "buildTime": "%date% %time%", >> build-info.json
echo   "version": "1.0.0", >> build-info.json
echo   "nodeVersion": "node --version", >> build-info.json
echo   "npmVersion": "npm --version", >> build-info.json
echo   "gitCommit": "unknown", >> build-info.json
echo   "gitBranch": "unknown" >> build-info.json
echo } >> build-info.json

echo ✅ Production build ready!
echo.
echo 📋 Next steps:
echo 1. Upload the .next folder and other files to your server
echo 2. Set up your web server (Nginx/Apache) to serve the application
echo 3. Configure your domain and SSL certificate
echo 4. Set up monitoring and logging
echo 5. Test the application thoroughly
echo.
echo 🔗 Useful URLs:
echo - Health Check: https://yourdomain.com/api/health
echo - Sitemap: https://yourdomain.com/sitemap.xml
echo - Robots: https://yourdomain.com/robots.txt
echo.
echo 🎉 Deployment preparation complete!
pause
