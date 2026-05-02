# 📂 세금탈출 (Tax Escape) - 프로젝트 운영 가이드

AI 없이 작동하는 '결정 트리 기반 맞춤형 세무 체크리스트' 서비스입니다. 운영비 0원을 목표로 설계되었습니다.

## 🚀 빠른 시작 (Local Testing)

1. 이 폴더에서 로컬 서버를 실행합니다:
   ```bash
   npx serve .
   ```
2. 브라우저에서 `http://localhost:3000` 접속 후 MBTI 진단 및 검색 기능을 테스트합니다.

## ☁️ 배포 가이드 (Deployment)

### 1. Frontend (Cloudflare Pages)
- **방법**: GitHub 저장소에 푸시 후 Cloudflare Pages에서 해당 저장소를 연결합니다.
- **빌드 설정**: Framework preset은 `None`으로 설정하고, root directory를 그대로 사용합니다.

### 2. API Backend (Cloudflare Workers)
- **명령어**:
  ```bash
  npx wrangler deploy
  ```
- 배포 후 생성된 URL을 `openapi.json`의 `servers.url` 항목에 업데이트하세요.

## 💰 수익화 (RapidAPI 등록)

1. [RapidAPI Provider Dashbaord](https://rapidapi.com/provider)에 접속합니다.
2. `Add New API`를 클릭하고 `openapi.json` 파일을 업로드합니다.
3. 배포된 Cloudflare Worker URL을 Base URL로 설정합니다.
4. 유료 플랜(Tier)을 설정하여 데이터 판매를 시작합니다.

## 🛠️ 데이터 업데이트 방법

사용자가 가장 궁금해하는 데이터를 추가하려면 `data.js` 파일만 수정하면 됩니다.

### 데이터 추출 팁 (Hometax -> JSON)
국세청 블로그나 FAQ의 텍스트를 복사한 뒤, AI에게 다음과 같이 요청하세요:
> "아래 텍스트를 `Tax Escape`용 JSON 형식(`TAX_DATA_CONTENT`)으로 변환해줘. 핵심 내용 3줄 요약과 관련 태그 3개를 포함해줘."

## 📄 라이선스
MIT License. 데이터 출처 명시 필수 (국세청 홈택스).
