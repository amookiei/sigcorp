# Supabase 설정 체크리스트

상담 신청 폼이 제대로 작동하는지 확인하세요.

## ✅ 1단계: 테이블 생성 확인

### 확인 방법
1. Supabase 대시보드 접속
2. 왼쪽 사이드바 → **Table Editor** 클릭
3. `contact_inquiries` 테이블이 있는지 확인

### 없으면 생성하기
**SQL Editor**에서 다음 SQL 실행:

```sql
-- 테이블 생성
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

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at 
  ON contact_inquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status 
  ON contact_inquiries(status);
```

---

## ✅ 2단계: RLS (Row Level Security) 설정 확인

### 확인 방법
1. **Table Editor** → `contact_inquiries` 테이블 선택
2. 상단 **"..."** 메뉴 클릭
3. **"Enable RLS"**가 체크되어 있는지 확인

### RLS 정책 확인
1. 왼쪽 사이드바 → **Authentication** → **Policies** 클릭
2. `contact_inquiries` 테이블의 정책 확인

### 정책이 없으면 생성하기
**SQL Editor**에서 다음 SQL 실행:

```sql
-- RLS 활성화
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 상담 신청 등록 가능 (INSERT)
CREATE POLICY "Allow public insert" ON contact_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 관리자만 조회 가능 (SELECT) - 선택사항
-- 인증된 사용자만 조회 가능하도록 설정
CREATE POLICY "Allow admin select" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
```

**또는 더 안전하게, 특정 이메일만 조회 가능:**
```sql
-- 특정 이메일(관리자)만 조회 가능
CREATE POLICY "Allow admin email select" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'admin@sigcorp.co.kr'
  );
```

---

## ✅ 3단계: 테이블 구조 확인

### 확인 방법
1. **Table Editor** → `contact_inquiries` 테이블 선택
2. 컬럼이 다음처럼 구성되어 있는지 확인:

| 컬럼명 | 타입 | Null 허용 | 기본값 |
|--------|------|----------|-------|
| id | uuid | ❌ | gen_random_uuid() |
| name | text | ❌ | - |
| phone | text | ❌ | - |
| email | text | ❌ | - |
| company | text | ✅ | - |
| inquiry_type | text | ❌ | - |
| budget | text | ✅ | - |
| message | text | ❌ | - |
| status | text | ❌ | 'new' |
| created_at | timestamptz | ❌ | now() |
| updated_at | timestamptz | ❌ | now() |

### 구조가 다르면?
- **Table Editor**에서 직접 수정하거나
- **SQL Editor**에서 `ALTER TABLE` 명령어 사용

---

## ✅ 4단계: 테스트 데이터 확인

### 수동으로 테스트 데이터 추가
1. **Table Editor** → `contact_inquiries` 테이블 선택
2. **"Insert row"** 버튼 클릭
3. 데이터 입력:
   - name: `테스트`
   - phone: `010-1234-5678`
   - email: `test@example.com`
   - inquiry_type: `wadiz`
   - message: `테스트 메시지`
4. **"Save"** 클릭
5. 데이터가 저장되는지 확인

### 웹사이트에서 테스트
1. 로컬 서버 실행: `http://127.0.0.1:8000/contact.html`
2. 상담 신청 폼 작성 및 제출
3. **Table Editor**에서 새 데이터 확인

---

## ✅ 5단계: API 키 확인

### 확인 방법
1. 왼쪽 사이드바 → **Settings** → **API** 클릭
2. 다음 정보 확인:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 로컬 개발 환경에 설정
1. `http://127.0.0.1:8000/setup-supabase.html` 접속
2. 위 정보 입력 후 저장

---

## ✅ 6단계: CORS 설정 (선택사항)

### 확인 방법
1. **Settings** → **API** → **Allowed Origins** 확인
2. 로컬 개발용으로 다음 추가:
   - `http://localhost:8000`
   - `http://127.0.0.1:8000`

### Vercel 배포 후
- `https://your-project.vercel.app` 추가
- 또는 `https://*.vercel.app` (와일드카드)

---

## ✅ 7단계: 로그 확인

### API 로그 확인
1. 왼쪽 사이드바 → **Logs** → **API Logs** 클릭
2. 최근 요청 확인
3. 오류가 있으면 확인

### 일반 로그 확인
1. **Logs** → **Postgres Logs** 클릭
2. 데이터베이스 쿼리 확인

---

## 🎯 최종 체크리스트

- [ ] `contact_inquiries` 테이블 생성됨
- [ ] 테이블 구조가 올바름 (11개 컬럼)
- [ ] RLS 활성화됨
- [ ] INSERT 정책 생성됨 (모든 사용자)
- [ ] SELECT 정책 생성됨 (관리자만, 선택사항)
- [ ] 테스트 데이터 입력 성공
- [ ] 웹사이트에서 폼 제출 성공
- [ ] Supabase에서 데이터 확인 가능
- [ ] API 키 확인 완료
- [ ] 로컬 환경에 API 키 설정 완료

---

## 🆘 문제 해결

### 데이터가 저장되지 않아요
1. **RLS 정책 확인**: INSERT 정책이 있는지 확인
2. **테이블 구조 확인**: 필수 컬럼이 모두 있는지 확인
3. **브라우저 콘솔 확인**: 오류 메시지 확인
4. **API 로그 확인**: Supabase 로그에서 오류 확인

### 권한 오류가 발생해요
1. **RLS 정책 확인**: 정책이 올바르게 설정되었는지 확인
2. **API 키 확인**: anon key가 올바른지 확인
3. **CORS 설정 확인**: Allowed Origins에 도메인 추가

### 테이블이 보이지 않아요
1. **프로젝트 선택 확인**: 올바른 프로젝트를 선택했는지 확인
2. **새로고침**: Table Editor 새로고침 (F5)
3. **SQL로 확인**: `SELECT * FROM contact_inquiries;` 실행

---

## 📝 참고

- **RLS 정책**: 데이터 보안을 위한 필수 설정
- **인덱스**: 조회 성능 향상 (선택사항이지만 권장)
- **타임스탬프**: `created_at`, `updated_at`은 자동으로 설정됨

