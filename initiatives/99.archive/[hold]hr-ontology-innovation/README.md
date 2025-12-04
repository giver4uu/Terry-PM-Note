# HR 온톨로지 기반 AI 혁신

**상태:** Discovery
**타임라인:** 2025-11-16 - TBD
**Owner:** Terry
**Stakeholders:** 채용 담당자, HR 전문가, 제품팀

## 🎯 Initiative 목표
HR 온톨로지를 활용한 채용 솔루션의 AI 혁신을 만들어냅니다.
기술 중심 접근이 아닌, 고객 중심 접근으로 시작합니다:
1. 현재 채용 담당자(고객)가 겪고 있는 실제 문제 발견
2. 그들이 문제 해결을 위해 하고 있는 노력 이해
3. HR 온톨로지가 해당 문제를 혁신적으로 해결할 수 있는지 검증

## 📊 현재 상태
- [x] User Research 완료 (보리님 인터뷰 2025-11-16)
- [x] Opportunities 식별됨 (4개 핵심 기회 문서화)
- [ ] PRD 작성됨
- [ ] Tasks 생성됨
- [ ] 개발 시작됨
- [ ] Analytics 설정 완료

## 🗂️ 폴더 구조
- **[user-interviews/](./user-interviews/)** - HR 전문가 심층 인터뷰 및 research
  - `snapshots/` - `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`를 사용한 개별 인터뷰 인사이트
  - `synthesis/` - 인터뷰 간 분석 및 패턴
  - `transcripts/` - 원본 인터뷰 녹음 및 노트
- **[opportunities/](./opportunities/)** - 온톨로지로 해결 가능한 opportunities 및 pain points
- **[assumptions/](./assumptions/)** - `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc`의 assumption logs 및 test cards
- **[solutions/](./solutions/)** - `@frameworks/continuous-discovery-habits/generate-solutions.mdc`의 solution 탐색
- **[product-analytics/](./product-analytics/)** - 데이터 분석 및 metrics
- **[prd/](./prd/)** - `@guides/product/create-prd.mdc`를 사용한 Product Requirements Document
- **[tasks/](./tasks/)** - `@guides/product/generate-tasks.mdc`를 사용한 구현 tasks

## 🔗 빠른 링크
- [PRD](./prd/)
- [User Research 요약](./user-interviews/synthesis/)
- [우선순위 Opportunities](./opportunities/)
- [Assumptions & Tests](./assumptions/)
- [Solution 탐색](./solutions/)
- [구현 Tasks](./tasks/)

## 📝 핵심 발견사항 (Key Findings)

### 고객 검증 완료
**인터뷰 대상:** 보리 (중견기업 SaaS 스타트업 HR 리드)
**날짜:** 2025-11-16
**결과:** HR 온톨로지가 해결할 수 있는 **명확한 고객 문제 4가지 발견**

### 4가지 핵심 Opportunities

#### 1. 스킬/역량 표준화 체계 (Priority: High)
**문제:** 팀마다 같은 직급과 스킬을 다르게 정의하여 매 채용마다 JD를 처음부터 작성하고 팀 간 합의에 일주일 소비
- A팀: "경력 5년 = 시니어" vs B팀: "리딩 경험 = 시니어"
- 같은 스킬을 "백엔드 API 설계", "마이크로서비스 아키텍처"로 각각 표현
- **임팩트:** JD 작성 시간 75% 감소 (2시간 → 30분), 팀 간 합의 85% 단축 (1주 → 1일)

#### 2. 평가 기준 일관성 (Priority: High)
**문제:** 같은 평가 항목을 면접관마다 다르게 해석하여 최종 의사결정에 확신 없음
- "커뮤니케이션" 평가 시 3명이 5점, 3점, 4점으로 상이
- 루브릭에 점수만 있고 각 점수의 구체적 기준 부재
- **임팩트:** 평가 조율 시간 75% 감소 (1시간 → 15분), 의사결정 확신도 향상, 법적 리스크 50% 감소

#### 3. 채용 지식 재사용 (Priority: High)
**문제:** 노션에 면접 질문 30개 축적되어 있으나 맥락 부재로 재사용 불가, 매번 처음부터 작성
- 질문의 "누가, 언제, 왜, 어떤 포지션용" 정보 없음
- 과거 합격자 데이터 찾기 어려움 (노션 100+ 페이지)
- **임팩트:** 면접 준비 시간 87.5% 감소 (2시간 → 15분), 채용 품질 30% 향상, 지식 재사용률 0% → 70%

#### 4. 팀 간 노하우 공유 (Priority: Medium-High)
**문제:** 전문가(제임스)의 우수 노하우가 문서화되지 않고, 팀 간 채용 방식 공유 안 됨
- 제임스 불참 시 면접 퀄리티 급락
- 백엔드 A팀과 B팀이 독립적으로 채용, 베스트 프랙티스 공유 부재
- **임팩트:** 팀 간 중복 작업 30% 감소, 채용 품질 편차 40% 감소, 전문가 의존도 감소

### 핵심 인사이트
- **근본 원인:** "지식의 파편화"와 "표준의 부재"
- **기존 솔루션 실패 이유:** 템플릿은 경직되고, ATS는 표준화 없이는 무용지물
- **고객 니즈:** 유연하면서도 일관성 있는 "적응형 표준" + "맥락 있는 지식 체계"
- **온톨로지 적합성:** 4가지 문제 모두 온톨로지(개념 간 관계 정의)로 해결 가능한 영역
- **예상 가치:** 시간 절약 50% + 채용 퀄리티 향상 + 확신 있는 의사결정

### 다음 단계
- [ ] 제임스 인터뷰로 전문가 노하우 분석
- [ ] 추가 HR 담당자 2-3명 인터뷰로 문제 일반화 검증
- [ ] 프로토타입 HR 온톨로지 스키마 설계
- [ ] 우선순위 Opportunity 선정 및 Solution 탐색

---
*Created using initiatives template. Use `@initiatives/_templates/setup-new-initiative.mdc` for new initiatives.*
