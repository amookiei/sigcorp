# Vercel 배포 단계별 가이드

## ✅ 1단계: Git 푸시 완료
변경사항이 GitHub에 푸시되었습니다.

---

## 🚀 2단계: Vercel 배포

### 방법 1: Vercel 웹 대시보드 사용 (추천)

1. **Vercel 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택: `amookiei/sigcorp`
   - 프로젝트 설정:
     - **Framework Preset**: Other
     - **Root Directory**: `./` (기본값)
     - **Build Command**: (비워두기)
     - **Output Directory**: `./` (기본값)
     - **Install Command**: (비워두기)

3. **환경 변수 설정** ⚠️ 중요!
   - "Environment Variables" 섹션 클릭
   - 다음 변수 추가:
     ```
     Name: SUPABASE_URL
     Value: https://xxxxx.supabase.co
     (Supabase 대시보드 → Settings → API → Project URL)
     
     Name: SUPABASE_ANON_KEY
     Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     (Supabase 대시보드 → Settings → API → anon public key)
     ```
   - Environment: **Production, Preview, Development** 모두 선택

4. **배포**
   - "Deploy" 버튼 클릭
   - 배포 완료 대기 (약 1-2분)

5. **배포 완료**
   - 배포된 URL 확인: `https://sigcorp.vercel.app` (또는 자동 생성된 URL)
   - 사이트 접속하여 테스트

### 방법 2: Vercel CLI 사용

터미널에서 다음 명령어 실행:

```bash
# 1. 로그인 (처음만)
vercel login

# 2. 환경 변수 설정
vercel env add SUPABASE_URL production
# 프롬프트에 Supabase Project URL 입력

vercel env add SUPABASE_ANON_KEY production
# 프롬프트에 Supabase Anon Key 입력

# 3. 배포
vercel --prod
```

---

## ✅ 3단계: 배포 후 확인

### 1. 사이트 접속
- 배포된 URL로 접속
- 모든 페이지가 정상적으로 로드되는지 확인

### 2. API 엔드포인트 확인
브라우저에서 다음 URL 접속:
```
https://your-project.vercel.app/api/supabase-config
```

다음과 같은 JSON 응답이 나와야 합니다:
```json
{
  "url": "https://xxxxx.supabase.co",
  "anonKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

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
- `vercel.json` 파일 확인
- `cleanUrls: true` 설정 확인

---

## 📝 참고사항

- **환경 변수**: 프로덕션, 프리뷰, 개발 환경 모두에 적용
- **도메인**: Vercel은 자동으로 `*.vercel.app` 도메인 제공
- **커스텀 도메인**: Settings → Domains에서 추가 가능

