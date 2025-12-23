# 로컬 서버 실행 가이드

이 프로젝트는 로컬 서버에서 실행해야 CORS 오류 없이 모든 기능을 사용할 수 있습니다.

## 🚀 빠른 시작

### Windows 사용자
**`start-server.bat` 파일을 더블클릭하세요!**

### Mac/Linux 사용자
터미널에서 다음 명령어 실행:
```bash
chmod +x start-server.sh
./start-server.sh
```

또는:
```bash
chmod +x server.py
python3 server.py
```

---

## 📋 상세 방법

### 방법 1: 배치 파일 사용 (Windows - 가장 간단)

1. `start-server.bat` 파일을 더블클릭
2. 자동으로 브라우저가 열립니다
3. `http://localhost:8000`에서 사이트 확인

### 방법 2: Python 서버

**Python이 설치되어 있어야 합니다.**

```bash
# 방법 2-1: 간단한 명령어
python -m http.server 8000

# 방법 2-2: 개선된 서버 스크립트 (자동 브라우저 열기)
python server.py
```

브라우저에서 `http://localhost:8000` 접속

### 방법 3: Node.js 서버

**Node.js가 설치되어 있어야 합니다.**

```bash
# 방법 3-1: npx 사용 (설치 불필요)
npx http-server -p 8000

# 방법 3-2: npm 사용 (package.json 필요)
npm install
npm start
```

브라우저에서 `http://localhost:8000` 접속

### 방법 4: VS Code Live Server (추천)

1. VS Code에서 "Live Server" 확장 설치
2. `index.html` 파일 우클릭
3. "Open with Live Server" 선택
4. 자동으로 `http://localhost:5500`에서 열림

---

## ✅ 확인사항

서버가 정상적으로 실행되면:

- ✅ URL이 `http://localhost:xxxx`로 시작
- ✅ CORS 오류가 없음
- ✅ 관리자 로그인 작동 (admin@sigcorp.com / sig0802!)
- ✅ 블로그 글쓰기 버튼 표시
- ✅ 포트폴리오 편집 버튼 표시

---

## 🔧 문제 해결

### 포트가 이미 사용중인 경우

다른 포트를 사용하세요:

```bash
# Python
python -m http.server 8080

# Node.js
npx http-server -p 8080
```

### Python/Node.js가 설치되지 않은 경우

- **Python**: https://www.python.org/downloads/
- **Node.js**: https://nodejs.org/

또는 VS Code Live Server 확장을 사용하세요.

---

## 📝 참고

- 서버를 중지하려면 터미널에서 `Ctrl+C` 누르기
- `start-server.html` 파일을 브라우저에서 열어 가이드를 확인할 수 있습니다

