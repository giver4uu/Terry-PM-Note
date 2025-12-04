# 🚀 Cursor for Product Managers 🤖

**Cursor for Product Managers**에 오신 것을 환영합니다! 이 레포지토리는 Cursor를 AI 네이티브 PM 코파일럿으로 활용하여 프로덕트 매니지먼트 워크플로우를 강화하는 종합 툴킷과 프레임워크를 제공합니다. [AI 네이티브 PM을 위한 Maven 강의](https://maven.com/p/0a96cb/cursor-isn-t-just-for-coding-how-ai-native-p-ms-work), [AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks/tree/main)의 구조화된 워크플로우 접근법, 그리고 [Lee Robinson의 YouTube 영상](https://www.youtube.com/watch?v=8QN23ZThdRY)에서 영감을 받아, 이 툴킷은 Cursor를 단순한 코딩 도구에서 강력한 제품 사고, 전략적 의사결정, 문서 작성 플랫폼으로 변화시킵니다.

분산된 프로덕트 매니지먼트 도구들과 씨름하는 것을 멈추고, 대화를 거듭할수록 더 똑똑해지는 통합 AI 기반 PM 워크스페이스를 구축하세요!

## ✨ 핵심 아이디어

프로덕트 매니지먼트는 리서치, 발견, 그리고 실행에 걸친 복잡한 워크플로우를 포함합니다. 이 툴킷은 다음을 통해 프로세스에 구조, 명확성, AI 네이티브 효율성을 제공하는 것을 목표로 합니다:

1. **통합 컨텍스트 관리**: 모든 PM 지식, 프레임워크, 인사이트를 하나의 AI 접근 가능한 워크스페이스에 중앙화
2. **구조화된 발견**: Continuous Discovery Habits 같은 검증된 프레임워크를 활용한 체계적인 사용자 리서치
3. **AI 네이티브 워크플로우**: 문서 중심 작업, 선택적 컨텍스트, 시각적 diff를 위한 Cursor의 기능 활용
4. **반복적 개선**: AI 상호작용을 거듭할수록 더 똑똑해지는 문서 구축

이 접근법은 AI 코파일럿이 궤도를 유지하도록 돕고, 복잡한 제품 이니셔티브를 관리하기 쉽게 만들며, AI가 생성한 전략적 콘텐츠에 대한 신뢰를 제공합니다.

## 🗂️ 레포지토리 구조

### Company Level Context (`company-level-context/`)
- **Product Vision & Strategy** (`product-vision-and-strategy/`):
  - `product-strategy-review.mdc`: 자동 증거 준비도 게이트가 있는 PRISM 정렬 전략 리뷰 프레임워크
  - `product-vision-review.mdc`: 4가지 기준 스코어링 시스템을 갖춘 비전 평가 프레임워크
- **OKRs** (`okrs/`):
  - `okr-sparring-partner.mdc`: 컨텍스트 인식 OKR 코칭 및 스파링 파트너
- **Team Structure** (`team-structure/`):
  - `README.md`: 팀 조직 모델, 설계 원칙, 조직 개편 고려사항

### Copilots (`copilots/`)
- **PM Strategic Copilot** (`pm-strategic-copilot.mdc`): 전략적 지원을 위한 사전 구성된 프롬프트 및 워크플로우

### Frameworks (`frameworks/`)
- **Continuous Discovery Habits** (`continuous-discovery-habits/`):
  - `create-interview-snapshots.mdc`
  - `create-opportunities.mdc`
  - `generate-solutions.mdc`
  - `indentify-and-test-assumptions.mdc`
  - `synthesize-interview-snapshots.mdc`
- **Evidence-Guided** (`evidence-guided/`):
  - `calculate-ice-score.mdc`
- **Strategic Review** (`company-level-context/product-vision-and-strategy/` 내):
  - **PRISM Product Strategy Review**: 5차원 프레임워크 (Problem, Reframe, Intentional Bets, Systemized Execution, Momentum)와 자동 증거 준비도 체크
  - **Product Vision Review**: 4가지 기준 평가 (Lofty & Inspiring, Realistic & Attainable, Constraint-Free, Grounded in User Problem)

### Guides (`guides/`)
- **Meetings** (`meetings/`): `1-1s.mdc`
- **Product** (`product/`): `create-prd.mdc`, `generate-tasks.mdc`, `process-task-list.mdc`
- **Writing** (`writing/`): `writing.mdc`

### Initiatives (`initiatives/`)
- **Templates** (`_templates/`):
  - `setup-new-initiative.mdc`
  - `initiative-template/` 하위 폴더: `assumptions/`, `opportunities/`, `prd/`, `product-analytics/`, `solutions/`, `tasks/`, `user-interviews/`
- **Archive** (`archive/`): 아카이브된 이니셔티브 (`README.md`)

### Meeting Notes (`meeting-notes/`)
- `1-1 notes/`, `leadership/`, `product-trio/`, `board-n-investor/`

> 팁: Cursor에서 파일을 참조할 때는 위의 정확한 경로명을 사용하세요.

## 🧭 빠른 시작

1. 이 레포지토리를 로컬 워크스페이스에 클론하세요
2. Cursor에서 `@`를 사용하여 파일을 멘션하세요 (예: `@company-level-context/product-vision-and-strategy/product-strategy-review.mdc`)
3. 전략 리뷰 프레임워크로 시작하세요:
   - **전략 리뷰**: `@company-level-context/product-vision-and-strategy/product-strategy-review.mdc`
   - **비전 평가**: `@company-level-context/product-vision-and-strategy/product-vision-review.mdc`
   - **OKR 코칭**: `@company-level-context/okrs/okr-sparring-partner.mdc`
4. 또는 제품 개발로 시작하세요: `guides/product/create-prd.mdc` 또는 `initiatives/_templates/setup-new-initiative.mdc`

## 🚀 사용 방법

### 1️⃣ AI 네이티브 PM 워크스페이스 설정

먼저 Cursor가 설치되어 있고 프레임워크 파일에 접근 가능한지 확인하세요:

1. 이 레포지토리를 로컬 워크스페이스에 클론하거나 다운로드하세요
2. Cursor의 Agent 채팅에서 `@`로 파일을 참조하세요 (예: `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`)
3. 다양한 PM 활동을 위한 구조화된 워크플로우를 따르세요

### 2️⃣ AI Dev Tasks 프레임워크 활용

이 툴킷은 복잡한 제품 이니셔티브를 위해 [AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks/tree/main) 구조화된 워크플로우와 통합됩니다:

1. **PRD 작성**: AI를 사용하여 종합적인 제품 요구사항 문서 생성
2. **태스크 분해**: PRD를 실행 가능한 세부 태스크 목록으로 분해
3. **반복적 구현**: 검증 체크포인트와 함께 한 번에 하나의 태스크로 AI 가이드
4. **진행 상황 추적**: 완료된 태스크와 다음 단계의 시각적 표현

### 3️⃣ 문서 중심 워크플로우

채팅 기반 상호작용 대신, 더 똑똑해지는 문서에서 직접 작업하세요:

- **선택적 컨텍스트**: 집중된 지원을 위해 AI에 필요한 정보만 제공
- **시각적 Diff**: AI가 생성한 콘텐츠 변경 및 수정 사항을 명확하게 확인
- **지속적 학습**: AI 상호작용과 반복을 거듭할수록 향상되는 문서

## 🔄 주요 워크플로우

- **PRD 작성**: `guides/product/create-prd.mdc`로 시작
- **태스크 생성 및 처리**: `guides/product/generate-tasks.mdc`와 `guides/product/process-task-list.mdc` 사용
- **Continuous Discovery 실행**: `frameworks/continuous-discovery-habits/*` 따라하기
- **아이디어 스코어링 (ICE)**: `frameworks/evidence-guided/calculate-ice-score.mdc` 사용
- **제품 전략 리뷰**: PRISM 프레임워크와 함께 `company-level-context/product-vision-and-strategy/product-strategy-review.mdc` 사용
- **제품 비전 평가**: 4가지 기준 스코어링과 함께 `company-level-context/product-vision-and-strategy/product-vision-review.mdc` 사용
- **OKR 코칭**: 컨텍스트 인식 OKR 개발을 위해 `company-level-context/okrs/okr-sparring-partner.mdc` 사용
- **팀 구조 설계**: 조직 모델을 위해 `company-level-context/team-structure/README.md` 참조
- **새 이니셔티브 시작**: `initiatives/_templates/setup-new-initiative.mdc`와 `initiative-template/` 구조 사용

## 🌟 주요 이점

* **구조화된 PM 워크플로우**: 리서치부터 실행까지 명확한 프로세스 강제
* **AI 네이티브 효율성**: PM 특화 태스크를 위한 Cursor의 기능 활용
* **컨텍스트 보존**: 모든 AI 상호작용에서 제품 컨텍스트 유지
* **프레임워크 통합**: 검증된 PM 방법론과 프레임워크 내장
* **전략 리뷰 시스템**: 자동 증거 준비도 게이트가 있는 PRISM 정렬 전략 평가
* **비전 및 OKR 코칭**: 비전 명확성과 목표 설정을 위한 체계적 평가 및 코칭
* **조직 인텔리전스**: 더 나은 정렬을 위한 팀 구조 모델 및 설계 원칙
* **반복적 개선**: 사용과 함께 진화하는 문서와 프레임워크
* **통합 지식 베이스**: 모든 PM 활동을 위한 단일 정보원

## 🛠️ 프레임워크 통합

### Continuous Discovery Habits
- **Interview Snapshots**: 사용자 리서치 문서화를 위한 구조화된 템플릿
- **Opportunity Mapping**: 제품 기회를 식별하는 체계적 접근법
- **Solution Generation**: AI 지원 아이디어 발굴 및 솔루션 개발
- **Synthesis**: 리서치 인사이트 통합 및 패턴 인식

### Evidence-Guided Decision Making
- 전략적 의사결정을 위한 데이터 기반 프레임워크
- A/B 테스트 템플릿 및 분석 도구
- 사용자 행동 분석 프레임워크
- ROI 계산 및 측정 도구

### Strategic Review & Evaluation
- **PRISM Product Strategy Review**: 자동 증거 준비도 체크가 포함된 포괄적 5차원 평가 프레임워크 (Problem Diagnosis, Reframe Opportunity, Intentional Bets, Systemized Execution, Momentum & Meta-Reflection)
- **Product Vision Review**: 0-5 스코어링이 있는 4가지 기준 비전 평가 시스템 (Lofty & Inspiring, Realistic & Attainable, Constraint-Free, Grounded in User Problem)
- **OKR Sparring Partner**: 현실적이고 실행 가능한 목표 설정을 위해 조직 규모, 산업, 성숙도 수준을 고려하는 컨텍스트 인식 OKR 코칭
- **Team Structure Design**: 설계 원칙 및 조직 개편 고려사항이 포함된 조직 모델 (Functional, Matrix, Value Stream, Divisional)


## 🔧 Cursor 특화 기능

- **문서 중심 작업**: 더 나은 컨텍스트 유지를 위해 채팅이 아닌 문서에서 작업
- **선택적 컨텍스트**: 집중된 지원을 위해 AI와 공유할 정보 선택
- **시각적 Diff**: AI가 생성한 변경 및 수정 사항을 명확하게 확인
- **지시사항에서 이니셔티브로**: 완전한 제품 이니셔티브를 단계별로 구축


## 🙏 감사의 말

- **[Cursor isn't just for coding: how AI-native PMs work](https://maven.com/p/0a96cb/cursor-isn-t-just-for-coding-how-ai-native-p-ms-work)** - Cursor를 PM AI 코파일럿으로 변환하는 Tal Raviv와 Hilary Gridley의 강의
- **[AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks/tree/main)** - PM 워크플로우 접근법에 영감을 준 AI 지원 개발을 위한 구조화된 워크플로우 프레임워크
- **[Cursor AI Agents Work Like 10 Developers (Cursor VP Live Demo)](https://www.youtube.com/watch?v=8QN23ZThdRY)** - Lee Robinson이 Cursor AI 에이전트가 개발자 작업을 자동화하는 방법을 시연

- **[Continuous Discovery Habits](https://www.youtube.com/watch?v=9RFaz9ZBXpk)** - 지속적 발견에 대한 Teresa Torres의 프레임워크
- **[Evidence-Guided](https://www.youtube.com/watch?v=aJWSn-tz3jQ)** - 증거 기반 제품 개발에 대한 Itamar Gilad의 프레임워크

