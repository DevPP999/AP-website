@echo off
cd /d d:\Website\6-12-2568-V2
echo Testing npm ci...
npm ci
if errorlevel 1 (
    echo npm ci failed with error level %errorlevel%
    exit /b 1
) else (
    echo npm ci succeeded
)
echo.
echo Testing npm run build...
npm run build
if errorlevel 1 (
    echo npm run build failed with error level %errorlevel%
    exit /b 1
) else (
    echo npm run build succeeded
)
