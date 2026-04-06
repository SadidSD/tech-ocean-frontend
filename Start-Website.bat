@echo off
echo Starting the Tech Ocean Website Development Server...
echo.
cd /d "%~dp0tech-ocean-frontend"

:: Open the browser asynchronously
start http://localhost:3000

:: Start the Next.js dev server
npm run dev

pause
