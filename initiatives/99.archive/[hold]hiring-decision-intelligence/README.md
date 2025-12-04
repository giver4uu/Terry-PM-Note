# Hiring Decision Intelligence

**상태:** Discovery
**타임라인:** 2025-12-01 - 2026-01-26 (Week 1-8)
**Owner:** Terry
**Stakeholders:** Borry (HR 전문가 에이전트), 기술팀, 채용 실무자

## 🎯 Initiative 목표

채용 온톨로지와 LLM을 결합하여 **채용 의사결정을 지능화하는 ATS**를 구축합니다.

### 핵심 전략
솔루션(온톨로지)이 아닌 **문제(채용 의사결정 과정의 정보 단절, 맥락 손실, 인지 부하)**를 먼저 발견하고 검증한 후, 온톨로지 스키마를 설계하는 **단계적 접근**을 취합니다.

### 예상 가치
- 정적 데이터(Job Family, Competency, Evaluation Rubric)와 동적 데이터(리드타임, 평가 내역, 인터뷰 기록)를 결합
- 채용 담당자의 암묵지와 맥락을 AI에게 제공하여 판단 지원
- 단순 판단 지원을 넘어 프로액티브하게 제안하는 채용 AI 구현

## 📊 현재 상태
- [ ] User Research 완료 (Borry 포함 3-5개 인터뷰)
- [ ] Opportunities 식별됨 (최소 3개 반복 패턴)
- [ ] Solutions 탐색 완료 (온톨로지 스키마 v0.1)
- [ ] PRD 작성됨
- [ ] Tasks 생성됨
- [ ] 개발 시작됨
- [ ] Analytics 설정 완료

## 🗂️ 폴더 구조
- **[user-interviews/](./user-interviews/)** - Customer discovery 및 research
  - `snapshots/` - `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`를 사용한 개별 인터뷰 인사이트
  - `synthesis/` - 인터뷰 간 분석 및 패턴
  - `transcripts/` - 원본 인터뷰 녹음 및 노트
- **[opportunities/](./opportunities/)** - 식별된 opportunities 및 pain points
- **[assumptions/](./assumptions/)** - `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc`의 assumption logs 및 test cards
- **[solutions/](./solutions/)** - `@frameworks/continuous-discovery-habits/generate-solutions.mdc`의 solution 탐색 (온톨로지 스키마 v0.1 포함)
- **[product-analytics/](./product-analytics/)** - 데이터 분석 및 metrics
- **[prd/](./prd/)** - `@guides/product/create-prd.mdc`를 사용한 Product Requirements Document
- **[tasks/](./tasks/)** - `@guides/product/generate-tasks.mdc`를 사용한 구현 tasks

## 🔗 빠른 링크
- [실행 계획](/Users/terry/.claude/plans/cosmic-dreaming-wand.md)
- [User Research 요약](./user-interviews/synthesis/)
- [우선순위 Opportunities](./opportunities/)
- [Assumptions & Tests](./assumptions/)
- [Solution 탐색](./solutions/)
- [PRD](./prd/)
- [구현 Tasks](./tasks/)

## 📝 핵심 원칙

### 1. 솔루션 앵커링 회피
- **온톨로지는 수단이지 목적이 아니다**
- 문제가 명확하지 않으면 절대 솔루션 설계로 넘어가지 않는다
- 인터뷰에서 "온톨로지가 필요하다"는 증거를 찾으려 하지 말 것

### 2. 단계별 Gate 시스템
- **Week 1-2:** 100% 문제 공간 탐색 (온톨로지 언급 금지)
- **Week 3-4:** 70% 문제 검증, 30% 솔루션 탐색
- **Week 5-8:** 30% 솔루션 검증, 70% 스펙 구체화

### 3. 인터뷰 금지 용어
Borry 인터뷰 시 사용 금지: "온톨로지", "LLM", "AI", "스키마"
대신 사용: "채용 의사결정", "정보 탐색", "판단 기준", "필요한 맥락"

## 🎯 단계별 성공 기준

### Phase 1: 문제 정의 (Week 1-2)
- [ ] 최소 5개의 "정보 단절/맥락 손실" 구체적 사례
- [ ] 정량적 임팩트 추정 ("주당 5시간", "결정 3일 지연")
- [ ] 최소 3개 Opportunity Statement (측정 가능한 개선 목표)
- [ ] Borry 피드백: "이 문제들이 실제 핵심 pain point 맞다"

### Phase 2: 솔루션 탐색 (Week 3-4)
- [ ] 온톨로지 스키마 v0.1 (핵심 개념 10-15개)
- [ ] AI 활용 시나리오 3-5개
- [ ] 리스키한 가정 3개 검증 완료

### Phase 3: 솔루션 검증 (Week 5-6)
- [ ] PRD가 엔지니어링 팀 리뷰 통과
- [ ] 프로토타입 테스트: 5명 중 4명 "현재보다 낫다"
- [ ] Go/No-Go 비즈니스 케이스 완성

## 📋 다음 단계
1. **즉시:** Borry 인터뷰 가이드 작성 (4가지 핵심 질문 영역)
2. **Week 1:** 첫 Borry 인터뷰 진행 → 스냅샷 생성
3. **Week 2:** 2-4회 추가 인터뷰 (Borry + 다른 페르소나)
4. **Week 3:** 크로스 인터뷰 종합 → Opportunity 도출
5. **Week 4:** 솔루션 탐색 → 온톨로지 스키마 v0.1

---
*Created using initiatives template. 전체 실행 계획은 `/Users/terry/.claude/plans/cosmic-dreaming-wand.md` 참고.*
