# Supabase 상세 가이드

## 📚 Supabase란?

Supabase는 Firebase의 오픈소스 대안으로, PostgreSQL 데이터베이스를 기반으로 한 Backend-as-a-Service(BaaS)입니다.

### 주요 기능
- **PostgreSQL 데이터베이스**: 강력한 관계형 데이터베이스
- **실시간 구독**: 데이터 변경 시 실시간 업데이트
- **인증 시스템**: 사용자 인증 및 권한 관리
- **Storage**: 파일 저장소
- **Edge Functions**: 서버리스 함수

---

## 🚀 1단계: Supabase 프로젝트 생성

### 1.1 계정 생성 및 프로젝트 생성

1. **Supabase 접속**
   - https://supabase.com 접속
   - "Start your project" 클릭
   - GitHub 계정으로 로그인 (또는 이메일 가입)

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - 프로젝트 정보 입력:
     - **Name**: `sig-corporation` (원하는 이름)
     - **Database Password**: 강력한 비밀번호 설정 (잃어버리면 복구 불가!)
     - **Region**: `Northeast Asia (Seoul)` 선택 (한국 서버)
     - **Pricing Plan**: Free tier 선택

3. **프로젝트 생성 대기**
   - 약 2-3분 소요
   - "Project is ready" 메시지 확인

---

## 🔑 2단계: API 키 확인

### 2.1 프로젝트 설정에서 키 확인

1. **Settings 메뉴 접속**
   - 왼쪽 사이드바에서 ⚙️ **Settings** 클릭
   - **API** 메뉴 선택

2. **필요한 정보 확인**
   - **Project URL**: `https://xxxxx.supabase.co`
     - 예: `https://abcdefghijklmnop.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     - 이 키는 공개되어도 안전합니다 (RLS로 보호됨)
   - **service_role key**: (관리자용, 절대 공개하지 마세요!)

3. **이 정보를 메모해두세요!**
   - 나중에 Vercel 환경 변수에 입력합니다

---

## 🗄️ 3단계: 테이블 생성

### 3.1 Table Editor에서 생성 (GUI 방법)

1. **Table Editor 접속**
   - 왼쪽 사이드바에서 📊 **Table Editor** 클릭

2. **새 테이블 생성**
   - "New table" 버튼 클릭
   - 테이블 이름: `contact_inquiries`

3. **컬럼 추가**
   다음 컬럼들을 하나씩 추가하세요:

   | 컬럼명 | 타입 | 기본값 | Null 허용 | 설명 |
   |--------|------|--------|----------|------|
   | `id` | `uuid` | `gen_random_uuid()` | ❌ | Primary Key |
   | `name` | `text` | - | ❌ | 이름 |
   | `phone` | `text` | - | ❌ | 전화번호 |
   | `email` | `text` | - | ❌ | 이메일 |
   | `company` | `text` | - | ✅ | 회사명 (선택) |
   | `inquiry_type` | `text` | - | ❌ | 문의 유형 |
   | `budget` | `text` | - | ✅ | 예산 범위 (선택) |
   | `message` | `text` | - | ❌ | 상세 내용 |
   | `status` | `text` | `'new'` | ❌ | 상태 (new/contacted/completed) |
   | `created_at` | `timestamptz` | `now()` | ❌ | 생성일시 |
   | `updated_at` | `timestamptz` | `now()` | ❌ | 수정일시 |

4. **Primary Key 설정**
   - `id` 컬럼을 Primary Key로 설정
   - "Is Primary Key" 체크박스 선택

5. **저장**
   - "Save" 버튼 클릭

### 3.2 SQL Editor에서 생성 (SQL 방법 - 추천)

더 빠르고 정확한 방법입니다!

1. **SQL Editor 접속**
   - 왼쪽 사이드바에서 📝 **SQL Editor** 클릭
   - "New query" 클릭

2. **SQL 실행**
   아래 SQL을 복사해서 붙여넣고 "Run" 버튼 클릭:

```sql
-- 1. 테이블 생성
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

-- 2. 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at 
  ON contact_inquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status 
  ON contact_inquiries(status);

-- 3. updated_at 자동 업데이트 함수 (선택사항)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. 트리거 생성 (updated_at 자동 업데이트)
CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

3. **실행 결과 확인**
   - "Success. No rows returned" 메시지 확인
   - Table Editor에서 `contact_inquiries` 테이블 확인

---

## 🔒 4단계: 보안 설정 (RLS)

Row Level Security (RLS)는 데이터 접근 권한을 제어합니다.

### 4.1 RLS 활성화

1. **Table Editor에서 테이블 선택**
   - `contact_inquiries` 테이블 클릭
   - 상단 "..." 메뉴 > "Enable RLS" 클릭

2. **또는 SQL로 활성화**
```sql
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
```

### 4.2 정책(Policy) 생성

**모든 사용자가 상담 신청을 등록할 수 있도록 설정:**

1. **SQL Editor에서 실행**
```sql
-- 모든 사용자가 INSERT 가능
CREATE POLICY "Allow public insert" ON contact_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);
```

2. **관리자만 조회 가능하도록 설정 (선택사항)**
```sql
-- 인증된 사용자(관리자)만 SELECT 가능
CREATE POLICY "Allow admin select" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
```

**또는 더 안전하게, 특정 이메일만 조회 가능:**
```sql
-- 특정 이메일만 조회 가능 (예: admin@sigcorp.co.kr)
CREATE POLICY "Allow admin email select" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'admin@sigcorp.co.kr'
  );
```

---

## ✅ 5단계: 테스트

### 5.1 Table Editor에서 직접 테스트

1. **Table Editor > contact_inquiries 테이블**
2. **"Insert row" 클릭**
3. **데이터 입력:**
   - name: `테스트 사용자`
   - phone: `010-1234-5678`
   - email: `test@example.com`
   - inquiry_type: `wadiz`
   - message: `테스트 메시지입니다`
4. **"Save" 클릭**
5. **데이터가 저장되었는지 확인**

### 5.2 웹사이트에서 테스트

1. **로컬 서버 실행**
   ```bash
   python server.py
   # 또는
   npm start
   ```

2. **브라우저에서 접속**
   - http://localhost:8000/contact.html

3. **상담 신청 폼 작성 및 제출**

4. **Supabase에서 확인**
   - Table Editor > contact_inquiries
   - 새로 추가된 데이터 확인

---

## 🔍 6단계: 데이터 확인 및 관리

### 6.1 Table Editor에서 확인

- **조회**: 테이블 클릭하여 모든 데이터 확인
- **필터링**: 컬럼 헤더 클릭하여 정렬/필터
- **수정**: 행 더블클릭하여 수정
- **삭제**: 행 선택 후 Delete 키

### 6.2 SQL로 조회

```sql
-- 최신 상담 신청 10개 조회
SELECT * FROM contact_inquiries 
ORDER BY created_at DESC 
LIMIT 10;

-- 상태별 조회
SELECT * FROM contact_inquiries 
WHERE status = 'new';

-- 특정 기간 조회
SELECT * FROM contact_inquiries 
WHERE created_at >= '2025-01-01'
ORDER BY created_at DESC;
```

---

## 🎯 요약: 테이블 생성 체크리스트

- [ ] Supabase 프로젝트 생성 완료
- [ ] Project URL과 Anon Key 확인
- [ ] `contact_inquiries` 테이블 생성
- [ ] RLS 활성화
- [ ] INSERT 정책 생성 (모든 사용자)
- [ ] SELECT 정책 생성 (관리자만, 선택사항)
- [ ] 테스트 데이터 입력 및 확인
- [ ] 웹사이트에서 실제 폼 제출 테스트

---

## 🆘 문제 해결

### 테이블이 보이지 않아요
- Table Editor 새로고침 (F5)
- SQL Editor에서 `SELECT * FROM contact_inquiries;` 실행하여 확인

### 데이터가 저장되지 않아요
- 브라우저 콘솔(F12)에서 오류 확인
- RLS 정책이 올바르게 설정되었는지 확인
- Supabase 로그 확인 (Logs > API Logs)

### 권한 오류가 발생해요
- RLS 정책 확인
- Anon Key가 올바른지 확인
- CORS 설정 확인 (Settings > API > Allowed Origins)

---

## 📚 추가 리소스

- **Supabase 공식 문서**: https://supabase.com/docs
- **PostgreSQL 문서**: https://www.postgresql.org/docs/
- **RLS 가이드**: https://supabase.com/docs/guides/auth/row-level-security

