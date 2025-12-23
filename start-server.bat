@echo off
echo ========================================
echo SIG Corporation - 로컬 서버 시작
echo ========================================
echo.

REM Python이 설치되어 있는지 확인
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [방법 1] Python 서버를 시작합니다...
    echo 브라우저에서 http://localhost:8000 접속하세요
    echo.
    echo 서버를 중지하려면 Ctrl+C를 누르세요
    echo.
    python -m http.server 8000
    goto :end
)

REM Node.js가 설치되어 있는지 확인
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [방법 2] Node.js 서버를 시작합니다...
    echo 브라우저에서 http://localhost:8000 접속하세요
    echo.
    echo 서버를 중지하려면 Ctrl+C를 누르세요
    echo.
    npx http-server -p 8000
    goto :end
)

echo [오류] Python 또는 Node.js가 설치되어 있지 않습니다.
echo.
echo 설치 방법:
echo 1. Python: https://www.python.org/downloads/
echo 2. Node.js: https://nodejs.org/
echo.
echo 또는 VS Code에서 "Live Server" 확장을 설치하세요.
echo.
pause

:end

