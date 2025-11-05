# Vercel 배포 가이드

## 🚀 배포 방법

### 방법 1: Vercel CLI 사용 (권장)

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **Git 설정** (처음 한 번만)
   ```bash
   git config --global user.email "your-email@example.com"
   git config --global user.name "Your Name"
   ```

3. **Git 커밋**
   ```bash
   git commit -m "Initial commit - SIG Corporation portfolio site"
   ```

4. **Vercel 로그인 및 배포**
   ```bash
   vercel login
   vercel
   ```

5. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

### 방법 2: GitHub 연동 (권장)

1. **GitHub 저장소 생성**
   - https://github.com/new 에서 새 저장소 생성
   - 저장소 이름 입력 (예: `sig-portfolio`)

2. **Git 설정 및 푸시**
   ```bash
   git config --global user.email "your-email@example.com"
   git config --global user.name "Your Name"
   git remote add origin https://github.com/your-username/sig-portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Vercel 웹에서 배포**
   - https://vercel.com 에서 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - "Deploy" 클릭

### 방법 3: Vercel 웹에서 직접 업로드

1. **Vercel 로그인**
   - https://vercel.com 접속 및 로그인

2. **프로젝트 추가**
   - "Add New Project" 클릭
   - "Upload" 탭 선택
   - 프로젝트 폴더를 드래그 앤 드롭

3. **배포 완료**
   - 자동으로 배포 URL 생성

## 📝 배포 후 확인사항

1. **URL 확인**
   - Vercel 대시보드에서 배포 URL 확인
   - 예: `your-project.vercel.app`

2. **기능 테스트**
   - 모든 페이지가 정상 작동하는지 확인
   - 이미지 로딩 확인
   - 반응형 디자인 확인
   - 관리자 모드 작동 확인

3. **도메인 연결** (선택사항)
   - Vercel 대시보드에서 "Settings" > "Domains"
   - 원하는 도메인 추가

## ⚙️ 환경 변수 설정 (필요시)

Vercel 대시보드에서:
- Settings > Environment Variables
- 필요한 환경 변수 추가

## 🔄 업데이트 배포

### CLI 사용 시
```bash
git add .
git commit -m "Update description"
git push
vercel --prod
```

### GitHub 연동 시
```bash
git add .
git commit -m "Update description"
git push
# Vercel이 자동으로 재배포
```

## 📦 프로젝트 구조

```
portfolio-site-complete/
├── index.html
├── portfolio.html
├── services.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── portfolio.js
│   ├── services.js
│   ├── fullpage.js
│   ├── rolling-balls.js
│   └── interactive.js
├── images/
│   ├── siglogo.svg
│   ├── hero-bg.gif
│   └── stats-bg.gif
├── vercel.json
└── README.md
```

## 🎯 참고사항

- **정적 사이트**: Vercel은 정적 HTML/CSS/JS 파일을 자동으로 감지
- **빌드 설정**: 필요 없음 (정적 파일만 있음)
- **출력 디렉토리**: 루트 디렉토리 (`/`)
- **라우팅**: `vercel.json`에서 설정됨

## 🐛 문제 해결

### 배포 실패 시
1. Vercel 대시보드에서 로그 확인
2. 모든 파일이 올바른 경로에 있는지 확인
3. `vercel.json` 설정 확인

### 이미지가 로드되지 않을 때
- 이미지 경로가 상대 경로로 되어 있는지 확인
- `images/` 폴더가 포함되어 있는지 확인

### 스타일이 적용되지 않을 때
- CSS 파일 경로 확인
- 브라우저 캐시 삭제 후 재확인

