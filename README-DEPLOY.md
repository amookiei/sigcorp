# Vercel 배포 가이드

이 프로젝트를 Vercel에 배포하는 방법입니다.

## 📋 사전 준비사항

1. **Vercel 계정**: https://vercel.com 에서 계정 생성
2. **GitHub/GitLab/Bitbucket 저장소**: 코드를 저장할 Git 저장소
3. **Supabase 프로젝트**: https://supabase.com 에서 프로젝트 생성

---

## 🗄️ Supabase 테이블 설정

### 1. Supabase 프로젝트 생성

1. https://supabase.com 접속
2. 새 프로젝트 생성
3. 프로젝트 URL과 Anon Key 확인 (Settings > API)

### 2. `contact_inquiries` 테이블 생성

Supabase 대시보드의 SQL Editor에서 다음 SQL 실행:

```sql
-- 상담 신청 테이블 생성
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  inquiry_type TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);

-- RLS (Row Level Security) 설정
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 INSERT 가능하도록 정책 설정
CREATE POLICY "Allow public insert" ON contact_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 관리자만 SELECT 가능하도록 정책 설정 (선택사항)
-- 실제 관리자 이메일로 변경하세요
CREATE POLICY "Allow admin select" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- 또는 모든 사용자가 자신의 데이터만 조회 가능하도록 설정하려면:
-- CREATE POLICY "Allow users to view own data" ON contact_inquiries
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid()::text = user_id);
```

### 3. 환경 변수 확인

Supabase 대시보드에서 다음 정보 확인:
- **Project URL**: `https://xxxxx.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🚀 Vercel 배포

### 방법 1: Vercel CLI 사용 (추천)

1. **Vercel CLI 설치**
```bash
npm install -g vercel
```

2. **프로젝트 디렉토리에서 로그인**
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
vercel
# 또는 프로덕션 배포
vercel --prod
```

### 방법 2: Vercel 웹 대시보드 사용

1. **GitHub에 코드 푸시**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Vercel 대시보드에서 프로젝트 Import**
   - https://vercel.com/dashboard 접속
   - "Add New..." > "Project" 클릭
   - Git 저장소 선택
   - 프로젝트 설정:
     - **Framework Preset**: Other
     - **Root Directory**: `./` (기본값)
     - **Build Command**: (비워두기)
     - **Output Directory**: `./` (기본값)

3. **환경 변수 설정**
   - 프로젝트 설정 > Environment Variables
   - 다음 변수 추가:
     ```
     SUPABASE_URL = https://xxxxx.supabase.co
     SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

4. **배포**
   - "Deploy" 버튼 클릭
   - 배포 완료 후 URL 확인

---

## ✅ 배포 확인

### 1. 상담 신청 폼 테스트

1. 배포된 사이트 접속: `https://your-project.vercel.app`
2. `/contact.html` 페이지로 이동
3. 상담 신청 폼 작성 및 제출
4. Supabase 대시보드에서 데이터 확인:
   - Table Editor > `contact_inquiries` 테이블 확인

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

---

## 🔧 문제 해결

### 환경 변수가 적용되지 않는 경우

1. Vercel 대시보드에서 환경 변수 확인
2. 배포 후 재배포 (Redeploy)
3. 브라우저 캐시 삭제 후 재시도

### CORS 오류가 발생하는 경우

Supabase 대시보드에서:
1. Settings > API
2. "Allowed Origins"에 Vercel 도메인 추가:
   - `https://your-project.vercel.app`
   - `https://*.vercel.app` (와일드카드 사용 가능)

### Supabase 연결 실패

1. 브라우저 콘솔에서 오류 메시지 확인
2. Supabase 프로젝트 URL과 Anon Key 확인
3. 네트워크 탭에서 API 요청 상태 확인

---

## 📝 추가 설정 (선택사항)

### 커스텀 도메인 설정

1. Vercel 대시보드 > 프로젝트 > Settings > Domains
2. 도메인 추가 및 DNS 설정
3. SSL 인증서 자동 발급 (약 1-2분 소요)

### 이메일 알림 설정

Supabase Functions 또는 Vercel Serverless Functions를 사용하여 상담 신청 시 이메일 알림을 받을 수 있습니다.

---

## 🔐 보안 참고사항

- ✅ `SUPABASE_ANON_KEY`는 공개되어도 안전합니다 (RLS로 보호)
- ✅ 민감한 데이터는 Supabase RLS 정책으로 보호
- ✅ 프로덕션 환경에서는 관리자 전용 조회 정책 설정 권장

---

## 📞 지원

문제가 발생하면:
1. 브라우저 콘솔 오류 확인
2. Vercel 배포 로그 확인
3. Supabase 로그 확인

