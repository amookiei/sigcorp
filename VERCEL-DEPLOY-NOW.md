# Vercel 배포 - 바로 시작하기

## 🚀 빠른 배포 가이드

### 1단계: 변경사항 커밋 및 푸시

터미널에서 다음 명령어 실행:

```bash
# 모든 변경사항 추가
git add .

# 커밋
git commit -m "Add Supabase integration for contact form and prepare for Vercel deployment"

# 푸시
git push origin master
```

---

### 2단계: Vercel 배포

#### 방법 1: Vercel 웹 대시보드 사용 (추천)

1. **Vercel 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - **Framework Preset**: Other
     - **Root Directory**: `./` (기본값)
     - **Build Command**: (비워두기)
     - **Output Directory**: `./` (기본값)
     - **Install Command**: (비워두기)

3. **환경 변수 설정** (중요!)
   - "Environment Variables" 섹션 클릭
   - 다음 변수 추가:
     ```
     SUPABASE_URL = https://xxxxx.supabase.co
     SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
   - Supabase 대시보드 → Settings → API에서 확인

4. **배포**
   - "Deploy" 버튼 클릭
   - 배포 완료 대기 (약 1-2분)

5. **배포 완료**
   - 배포된 URL 확인: `https://your-project.vercel.app`
   - 사이트 접속하여 테스트

#### 방법 2: Vercel CLI 사용

1. **Vercel CLI 설치**
```bash
npm install -g vercel
```

2. **로그인**
```bash
vercel login
```

3. **환경 변수 설정**
```bash
vercel env add SUPABASE_URL
# 프롬프트에 Supabase Project URL 입력

vercel env add SUPABASE_ANON_KEY
# 프롬프트에 Supabase Anon Key 입력
```

4. **배포**
```bash
vercel --prod
```

---

## ✅ 배포 후 확인사항

### 1. 사이트 접속 확인
- 배포된 URL로 접속: `https://your-project.vercel.app`
- 모든 페이지가 정상적으로 로드되는지 확인

### 2. Supabase 연동 확인
- 브라우저 콘솔(F12)에서 오류 확인
- `/api/supabase-config` 엔드포인트 확인:
  ```
  https://your-project.vercel.app/api/supabase-config
  ```
  - JSON 응답이 나와야 함

### 3. 기능 테스트
- **블로그**: 글 작성/수정/삭제 테스트
- **포트폴리오**: 프로젝트 추가/수정/삭제 테스트
- **상담 신청**: 폼 제출 후 Supabase에서 데이터 확인

---

## 🔧 문제 해결

### 환경 변수가 적용되지 않아요
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables 확인
2. "Redeploy" 클릭하여 재배포

### CORS 오류가 발생해요
Supabase 대시보드에서:
1. Settings → API → Allowed Origins
2. Vercel 도메인 추가:
   - `https://your-project.vercel.app`
   - `https://*.vercel.app` (와일드카드)

### 404 오류가 발생해요
- `vercel.json` 파일이 올바른지 확인
- `cleanUrls: true` 설정 확인

---

## 📝 참고사항

- **환경 변수**: 프로덕션 환경에만 적용하려면 "Production" 선택
- **도메인**: Vercel은 자동으로 `*.vercel.app` 도메인 제공
- **커스텀 도메인**: Settings → Domains에서 추가 가능

