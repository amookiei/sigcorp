# 🚀 Vercel 빠른 배포 가이드

## ✅ 준비 완료
- ✅ Git 저장소 초기화 완료
- ✅ 모든 파일 커밋 완료
- ✅ Vercel CLI 설치 완료
- ✅ vercel.json 설정 완료

## 📝 배포 단계

### 1단계: Vercel 로그인
터미널에서 실행:
```bash
vercel login
```
브라우저가 열리면 Vercel 계정으로 로그인하세요.

### 2단계: 배포 실행
터미널에서 실행:
```bash
vercel
```

질문이 나오면:
- **Set up and deploy?** → `Y` 입력
- **Which scope?** → 본인 계정 선택
- **Link to existing project?** → `N` 입력 (첫 배포)
- **Project name?** → 원하는 이름 입력 (또는 Enter로 기본값 사용)
- **Directory?** → `.` 입력 (현재 디렉토리)

### 3단계: 프로덕션 배포
배포가 완료되면:
```bash
vercel --prod
```

## 🎉 완료!

배포가 완료되면:
- **Preview URL**: 테스트용 URL 제공
- **Production URL**: 실제 배포 URL 제공 (예: `your-project.vercel.app`)

## 📌 빠른 명령어 요약

```bash
# 1. 로그인 (처음 한 번만)
vercel login

# 2. 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

## 🔄 업데이트 배포

코드 수정 후:
```bash
git add .
git commit -m "Update description"
vercel --prod
```

## 🌐 도메인 연결

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings > Domains
3. 원하는 도메인 추가

