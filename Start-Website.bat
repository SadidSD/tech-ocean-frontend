@echo off
title Tech X Ocean - Starting Website
color 0A
echo.
echo  =====================================================
echo   Tech X Ocean - E-Commerce Website
echo  =====================================================
echo.

cd /d "C:\Users\Admin\Desktop\website"

if not exist "node_modules" (
    echo  Installing dependencies, please wait...
    echo  This only happens once.
    echo.
    call npm install
    echo.
)

echo  Starting development server...
echo  Website will open at: http://localhost:3000
echo.
call npm run dev
pause
