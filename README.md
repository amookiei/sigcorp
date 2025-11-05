# 포트폴리오 웹사이트 - 시그코퍼레이션

## 📁 파일 구조

```
portfolio-site/
├── portfolio.html          # 메인 HTML 파일
├── css/
│   └── style.css          # 모든 스타일시트
├── js/
│   └── portfolio.js       # 모든 JavaScript 기능
├── images/                # 이미지 파일 폴더
│   └── favicon.ico        # (추가 예정)
└── README.md              # 이 파일
```

## 🚀 주요 기능

### 1. 포트폴리오 디스플레이
- 2열 그리드 레이아웃 (1:1 비율 정사각형)
- 모서리가 둥근 카드 디자인
- 각 프로젝트별 고유 그라데이션 배경
- 호버 효과 및 애니메이션

### 2. 필터링 시스템
- 전체 / 와디즈 / 커머스 / 브랜딩 / 마케팅
- 카테고리별 실시간 필터링
- 활성 상태 표시

### 3. 프로젝트 상세 모달
- 클릭 시 팝업 형태로 상세 정보 표시
- 프로젝트 설명, 통계, 특징 포함
- 애니메이션 효과
- 외부 클릭 또는 X 버튼으로 닫기

### 4. 관리자 모드 ⚙️
- **비밀번호**: `sig0802`
- 왼쪽 하단 설정 아이콘 클릭으로 접근
- 프로젝트 추가/수정/삭제 기능
- localStorage에 데이터 저장

## 🔧 설치 및 사용법

### 기본 사용

1. **파일 다운로드**
   - `portfolio.html`, `css/style.css`, `js/portfolio.js` 파일을 동일한 구조로 저장

2. **브라우저에서 열기**
   - `portfolio.html` 파일을 더블클릭하거나 브라우저로 드래그

3. **서버에 업로드** (권장)
   - FTP 또는 호스팅 서비스로 전체 폴더 업로드
   - 웹 서버 환경에서 실행

### 관리자 모드 사용법

1. **접근하기**
   - 왼쪽 하단의 설정 아이콘(⚙️) 클릭
   - 비밀번호 입력: `sig0802`

2. **프로젝트 수정**
   - 각 프로젝트의 "수정" 버튼 클릭
   - 폼이 펼쳐지면 내용 변경
   - "💾 저장하기" 버튼 클릭

3. **새 프로젝트 추가**
   - 하단의 "➕ 새 프로젝트 추가" 버튼 클릭
   - 자동으로 기본 템플릿 생성
   - 내용 수정 후 저장

4. **프로젝트 삭제**
   - "삭제" 버튼 클릭
   - 확인 메시지에서 확인

## 📝 프로젝트 데이터 구조

각 프로젝트는 다음 정보를 포함합니다:

```javascript
{
    title: "프로젝트 제목",
    category: "카테고리명",
    categoryTag: "wadiz|commerce|branding|marketing",
    icon: "🚀",  // 이모지
    tag: "태그명",
    date: "작업 기간",
    description: "상세 설명",
    gradient: "linear-gradient(...)",  // CSS 그라데이션
    stats: [
        { value: "2,500%", label: "펀딩 달성률" },
        { value: "5,200만원", label: "총 펀딩액" },
        { value: "1,240명", label: "서포터 수" }
    ],
    features: [
        "특징 1",
        "특징 2",
        "특징 3"
    ]
}
```

## 🎨 커스터마이징

### 색상 변경
`css/style.css` 파일의 상단 `:root` 섹션에서 변경:

```css
:root {
    --primary-black: #000000;
    --secondary-gray: #f5f5f5;
    --accent-color: #00d4aa;    /* 메인 강조색 */
    --text-dark: #1a1a1a;
    --text-gray: #666666;
    --border-color: #e0e0e0;
}
```

### 비밀번호 변경
`js/portfolio.js` 파일에서 `showAdminLogin()` 함수 찾기:

```javascript
function showAdminLogin() {
    const password = prompt('관리자 비밀번호를 입력하세요:');
    if (password === 'sig0802') {  // 여기를 변경
        // ...
    }
}
```

### 그라데이션 변경
관리자 모드에서 직접 변경하거나, `js/portfolio.js`의 프로젝트 데이터에서 `gradient` 값 수정

**그라데이션 예시:**
```css
linear-gradient(135deg, #00d4aa 0%, #008f77 100%)
linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)
linear-gradient(135deg, #a8e6cf 0%, #56ab91 100%)
```

## 💾 데이터 백업

### 데이터 내보내기
브라우저 콘솔(F12)에서 실행:

```javascript
// localStorage에서 데이터 가져오기
const backup = localStorage.getItem('sigProjects');
console.log(backup);
// 출력된 내용을 복사하여 저장
```

### 데이터 복원
브라우저 콘솔에서 실행:

```javascript
// 백업한 데이터를 복원
const backupData = '여기에 백업 데이터 붙여넣기';
localStorage.setItem('sigProjects', backupData);
location.reload();  // 페이지 새로고침
```

## 🌐 브라우저 호환성

- Chrome (권장)
- Firefox
- Safari
- Edge
- 모바일 브라우저 지원

## 📱 반응형 디자인

- 데스크톱: 2열 그리드
- 태블릿: 2열 그리드
- 모바일: 1열 그리드
- 모든 화면 크기에서 최적화된 레이아웃

## ⚠️ 주의사항

1. **localStorage 사용**
   - 브라우저의 localStorage에 데이터 저장
   - 브라우저 데이터 삭제 시 프로젝트 데이터도 삭제됨
   - 정기적인 백업 권장

2. **이미지 추가**
   - 현재는 이모지 아이콘 사용
   - 실제 이미지 사용 시 `images/` 폴더에 추가 필요

3. **보안**
   - 관리자 모드는 클라이언트 사이드 보호만 제공
   - 실제 운영 환경에서는 서버 사이드 인증 구현 권장

## 🔄 업데이트 내역

### v1.0.0 (2024-11-05)
- 초기 버전 출시
- 포트폴리오 디스플레이 기능
- 관리자 모드 구현
- 반응형 디자인 적용

## 📞 문의

기술 지원이나 문의사항이 있으시면 연락주세요.

---

**© 2024 SIG CORPORATION. All rights reserved.**