# 전체 Supabase 테이블 설정 가이드

이 프로젝트는 **3개의 Supabase 테이블**을 사용합니다.

## 📊 사용 중인 테이블 목록

1. **`blog_posts`** - 블로그 포스트 저장
2. **`portfolio_projects`** - 포트폴리오 프로젝트 저장
3. **`contact_inquiries`** - 상담 신청 저장 ✅ (설정 완료)

---

## ✅ 1. 블로그 테이블 (`blog_posts`)

### 확인 방법
Supabase 대시보드 → Table Editor → `blog_posts` 테이블 확인

### 없으면 생성하기
**SQL Editor**에서 다음 SQL 실행:

```sql
-- 블로그 포스트 테이블 생성
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  category TEXT,
  tags TEXT[],
  summary TEXT,
  content TEXT,
  cover_gradient TEXT,
  featured BOOLEAN DEFAULT false,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- RLS 활성화
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 조회 가능 (SELECT)
CREATE POLICY "Allow public select" ON blog_posts
  FOR SELECT
  TO public
  USING (true);

-- 인증된 사용자만 작성/수정/삭제 가능 (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated insert" ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);
```

---

## ✅ 2. 포트폴리오 테이블 (`portfolio_projects`)

### 확인 방법
Supabase 대시보드 → Table Editor → `portfolio_projects` 테이블 확인

### 없으면 생성하기
**SQL Editor**에서 다음 SQL 실행:

```sql
-- 포트폴리오 프로젝트 테이블 생성
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  category_tag TEXT,
  icon TEXT,
  tag TEXT,
  date TEXT,
  description TEXT,
  gradient TEXT,
  images TEXT[],
  stats JSONB,
  features JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_display_order ON portfolio_projects(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category_tag);

-- RLS 활성화
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 조회 가능 (SELECT)
CREATE POLICY "Allow public select" ON portfolio_projects
  FOR SELECT
  TO public
  USING (true);

-- 인증된 사용자만 작성/수정/삭제 가능 (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated insert" ON portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON portfolio_projects
  FOR DELETE
  TO authenticated
  USING (true);
```

---

## ✅ 3. 상담 신청 테이블 (`contact_inquiries`)

### 확인 방법
Supabase 대시보드 → Table Editor → `contact_inquiries` 테이블 확인

### 이미 설정 완료 ✅
- 테이블 생성됨
- RLS 활성화됨
- INSERT 정책 설정됨

### 추가 설정 (선택사항)
관리자가 조회하려면 SELECT 정책 추가:

```sql
-- 관리자만 조회 가능 (SELECT)
CREATE POLICY "Allow admin select" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
```

---

## 🎯 전체 테이블 한 번에 생성하기

**SQL Editor**에서 다음 SQL을 모두 실행하면 3개 테이블이 한 번에 생성됩니다:

```sql
-- ============================================
-- 1. 블로그 포스트 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  category TEXT,
  tags TEXT[],
  summary TEXT,
  content TEXT,
  cover_gradient TEXT,
  featured BOOLEAN DEFAULT false,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select" ON blog_posts FOR SELECT TO public USING (true);
CREATE POLICY "Allow authenticated insert" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON blog_posts FOR DELETE TO authenticated USING (true);

-- ============================================
-- 2. 포트폴리오 프로젝트 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  category_tag TEXT,
  icon TEXT,
  tag TEXT,
  date TEXT,
  description TEXT,
  gradient TEXT,
  images TEXT[],
  stats JSONB,
  features JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_display_order ON portfolio_projects(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category_tag);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select" ON portfolio_projects FOR SELECT TO public USING (true);
CREATE POLICY "Allow authenticated insert" ON portfolio_projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON portfolio_projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON portfolio_projects FOR DELETE TO authenticated USING (true);

-- ============================================
-- 3. 상담 신청 테이블 (이미 생성되어 있을 수 있음)
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON contact_inquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin select" ON contact_inquiries FOR SELECT TO authenticated USING (true);
```

---

## ✅ 최종 체크리스트

Supabase 대시보드 → Table Editor에서 다음 테이블들이 모두 있는지 확인:

- [ ] `blog_posts` - 블로그 포스트
- [ ] `portfolio_projects` - 포트폴리오 프로젝트
- [ ] `contact_inquiries` - 상담 신청 ✅ (완료)

---

## 🔍 테이블 확인 방법

### 방법 1: Table Editor에서 확인
1. Supabase 대시보드 → Table Editor
2. 왼쪽 사이드바에서 테이블 목록 확인
3. 각 테이블 클릭하여 구조 확인

### 방법 2: SQL로 확인
**SQL Editor**에서 다음 실행:

```sql
-- 모든 테이블 목록 확인
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 각 테이블의 컬럼 확인
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'portfolio_projects';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'contact_inquiries';
```

---

## 📝 참고

- **블로그**: 관리자만 작성/수정 가능, 모든 사용자 조회 가능
- **포트폴리오**: 관리자만 작성/수정 가능, 모든 사용자 조회 가능
- **상담 신청**: 모든 사용자 등록 가능, 관리자만 조회 가능

