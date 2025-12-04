# V1.5 Scope: 동적 개념 추가

**작성일:** 2025-11-27
**작성자:** Terry
**우선순위:** High
**상태:** Planning

---

## 📋 개요

### V1.5의 전략적 의의

**"게임체인저 Phase"**

V1만으로는 궁극적 목표의 30%만 달성하지만, V1.5는 **ATS만이 가진 동적 채용 데이터**를 온톨로지와 결합하여 **70% 목표 달성** 및 **경쟁사 대비 결정적 차별화**를 구현합니다.

### V1 vs V1.5 비교

| 항목 | V1 (정적 온톨로지) | V1.5 (정적 + 동적) |
|------|------------------|------------------|
| **개념 수** | 7개 | **16개 (+9개)** |
| **CQ 수** | 16개 (정적) | **24개 (+8개 동적 DCQ)** |
| **목표 달성** | 30% | **70%** |
| **차별화** | Low (경쟁사도 가능) | **High (ATS만 가능)** |
| **AI 필요성** | 필수 | 선택 (동적 데이터로 인사이트 도출) |
| **핵심 가치** | 표준화, 객관적 평가 | **프로액티브 인사이트, 숨은 맥락 발견** |

---

## 🎯 V1.5 목표

### 비즈니스 목표

1. **프로액티브 인사이트 제공** (부분 달성)
   - "지난 6개월 Backend Senior 합격자 PostgreSQL 평균 4.2/5" 자동 표시
   - "PostgreSQL 4점 미만은 모두 탈락" 패턴 발견

2. **객관적 검증 강화** (V1에서 계속)
   - Evaluation Rubric (V1)
   - + 면접관별 평가 패턴 분석 (V1.5)
   - + Pass/Fail 기준점 데이터 기반 설정 (V1.5)

3. **숨은 맥락 이해** (부분 달성)
   - "기술은 우수하나 Communication 2점으로 탈락" 케이스 발견
   - 채용 과정 병목 단계 자동 파악

### 기술 목표

1. **동적 개념 9개 정의 및 구현**
2. **동적 CQ 8개 답변 가능**
3. **Borry 샘플 데이터 5-10건 입력 및 쿼리 테스트 성공**
4. **V2 AI 학습 기반 마련** (데이터 구조 및 축적)

---

## 📊 V1.5 추가 개념 (9개)

### Candidate Journey (4개)

| 개념 ID | 개념 이름 | 우선순위 | 차별화 임팩트 | 구현 난이도 |
|---------|----------|---------|-------------|----------|
| C-008 | **Candidate** (지원자) | P0 | High | Low |
| C-009 | Application (지원) | P1 | Medium | Low |
| C-010 | Interview Stage (전형 단계) | P0 | High | Medium |
| C-011 | **Lead Time** (단계별 소요 시간) | P0 | **Critical** | Low |

**핵심 개념:**
- **Candidate**: 지원자 기본 정보 (이력서, 경력, 스킬 태그)
- **Lead Time**: 채용 과정 병목 발견의 핵심

### Evaluation (4개)

| 개념 ID | 개념 이름 | 우선순위 | 차별화 임팩트 | 구현 난이도 |
|---------|----------|---------|-------------|----------|
| C-012 | Interview (면접 이벤트) | P0 | High | Medium |
| C-013 | **Evaluation Record** (평가 기록) | P0 | **Critical** | Medium |
| C-014 | **Competency Assessment** | P0 | **Critical** | Medium |
| C-015 | Interviewer (면접관) | P1 | High | Low |

**핵심 개념:**
- **Evaluation Record**: 면접관별 평가 데이터의 핵심
- **Competency Assessment**: 역량별 점수 기록 (DCQ-04~06 답변 가능)

### Outcome (1개)

| 개념 ID | 개념 이름 | 우선순위 | 차별화 임팩트 | 구현 난이도 |
|---------|----------|---------|-------------|----------|
| C-016 | **Hiring Decision** (채용 결정) | P0 | **Critical** | Low |

**핵심 개념:**
- **Hiring Decision**: 합격/불합격 + 사유 (DCQ-07~08 답변 가능)

### 총 개념 수

- **V1**: 7개 (정적)
- **V1.5**: +9개 (동적)
- **총**: 16개

---

## 🎓 V1.5 추가 Competency Questions (8개)

### Process Insights (3개)

| ID | 질문 | 비즈니스 가치 |
|----|------|------------|
| DCQ-01 | "Senior Backend Engineer 채용의 평균 리드타임은?" | 병목 단계 발견 → 프로세스 개선 |
| DCQ-02 | "어떤 Competency 평가가 가장 오래 걸리는가?" | 면접 시간 최적화 |
| DCQ-03 | "PostgreSQL Advanced 요구하는 Position의 평균 합격률은?" | JD 난이도 조정 |

### Evaluation Insights (3개)

| ID | 질문 | 비즈니스 가치 |
|----|------|------------|
| DCQ-04 | "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?" | 평가 calibration (조율 필요) |
| DCQ-05 | "지난 6개월 Backend Senior 합격자의 평균 Competency 점수는?" | 합격 벤치마크 설정 |
| DCQ-06 | "Communication 3점 받은 후보자의 최종 합격률은?" | Pass/Fail 기준점 발견 |

### Outcome Insights (2개)

| ID | 질문 | 비즈니스 가치 |
|----|------|------------|
| DCQ-07 | "Backend Senior 탈락 사유 Top 3는?" | JD 요구사항 정확성 검증 |
| DCQ-08 | "PostgreSQL 4점 이상인데 탈락한 케이스는 왜?" | Hiring criteria 정교화 |

**총 CQ:**
- V1: 16개
- V1.5: +8개
- **총**: 24개

---

## 📅 V1.5 개발 로드맵

### Week 5: 동적 개념 정의 (5일)

**목표:** 9개 동적 개념 문서 작성

**Day 1-2 (P0 개념 4개):**
- [ ] Candidate (C-008)
- [ ] Lead Time (C-011)
- [ ] Evaluation Record (C-013)
- [ ] Hiring Decision (C-016)

**Day 3-4 (P0 개념 2개 + P1 개념 2개):**
- [ ] Interview Stage (C-010)
- [ ] Competency Assessment (C-014)
- [ ] Application (C-009)
- [ ] Interviewer (C-015)

**Day 5 (관계 정의 + 검토):**
- [ ] 동적 개념 간 관계 정의 (R-003~R-006)
- [ ] Borry 검토 세션 (2시간)

**산출물:**
- `02-conceptualization/concepts/dynamic/` 폴더 생성
- 9개 동적 개념 문서
- `02-conceptualization/relationships/dynamic-relationships.md`

---

### Week 6: 샘플 데이터 준비 및 쿼리 테스트 (5일)

**목표:** 실제 채용 데이터로 DCQ 검증

**Day 1-2 (샘플 데이터 수집):**
- [ ] Borry와 조율: 익명화 프로세스 정의
- [ ] 샘플 채용 데이터 5-10건 수집
  - Backend Senior: 3건
  - Frontend Mid: 2건
  - Product Manager: 2건
  - 각 건당: 지원자 정보, 면접 기록, 평가 점수, 최종 결정

**Day 3-4 (데이터 입력 및 쿼리 구현):**
- [ ] 샘플 데이터 입력 (JSON 또는 DB)
- [ ] DCQ-01~08 쿼리 구현
  - 쿼리 언어: SQL / SPARQL / 그래프 쿼리 (기술 스택 결정)
  - 각 DCQ별 쿼리 작성 및 테스트

**Day 5 (검증 세션):**
- [ ] Borry와 DCQ 쿼리 결과 검증
  - DCQ-04: "제임스는 0.4점 더 엄격함" 확인
  - DCQ-05: "Backend Senior 합격자 PostgreSQL 평균 4.2/5" 확인
  - DCQ-07: "탈락 사유 Top 3" 확인
- [ ] 피드백 수집 및 개선 아이템 정리

**산출물:**
- `03-implementation/examples/sample-data/` 폴더 생성
- 샘플 채용 데이터 5-10건 (JSON/CSV)
- `04-validation/dcq-queries/` 폴더 생성
- 8개 DCQ 쿼리 스크립트

---

### Week 7: 차별화 검증 및 문서화 (5일)

**목표:** V1.5 차별화 포인트 검증 및 V2 준비

**Day 1-2 (Greenhouse 비교 시나리오):**
- [ ] "JD 작성" 시나리오 실행
  - Greenhouse 방식 (수동)
  - 우리 시스템 (프로액티브 제안)
- [ ] 시간 측정 및 만족도 조사

**Day 3-4 (V2 준비):**
- [ ] Post-hire 데이터 수집 계획 수립
  - 6-month Review, Retention 데이터
- [ ] AI 추론 엔진 요구사항 초안
  - DCQ-09, DCQ-10 구현 방안

**Day 5 (V1.5 완료 검토):**
- [ ] V1.5 성공 지표 측정
- [ ] Borry 최종 피드백
- [ ] V2 로드맵 확정

**산출물:**
- `04-validation/v1-5-results.md`
- `05-v2-planning/ai-requirements.md`

---

## ✅ V1.5 성공 지표

### 기술 지표

| 지표 | 목표 | 측정 방법 | 상태 |
|------|------|----------|------|
| 동적 개념 정의 완료 | 9개 모두 | 개념 문서 작성 | ⏳ Week 5 |
| DCQ 답변 정확도 | 100% (8개 모두) | 쿼리 테스트 | ⏳ Week 6 |
| 샘플 데이터 수집 | 5-10건 | Borry 제공 | ⏳ Week 6 |
| Borry 이해도 | ≥ 4/5 | 검토 세션 설문 | ⏳ Week 5 |

### 비즈니스 지표

| 지표 | 목표 | 측정 방법 | 상태 |
|------|------|----------|------|
| 프로액티브 제안 유용성 | ≥ 4/5 | Borry 피드백 | ⏳ Week 7 |
| 데이터 기반 인사이트 도출 | 최소 5개 | Borry 데모 세션 | ⏳ Week 6 |
| 경쟁 차별화 인지 | "Greenhouse와 다르다" 인정 | Borry 인터뷰 | ⏳ Week 7 |
| V2 진행 의지 | Borry 동의 | V2 로드맵 검토 | ⏳ Week 7 |

---

## 🚧 V1.5 리스크 및 완화

### Critical 리스크

| 리스크 | 확률 | 영향 | 완화 전략 | 담당 |
|--------|-----|------|----------|------|
| 샘플 데이터 부족 (5건 미만) | Medium | High | Borry와 사전 조율, 익명화 프로세스 간소화 | Terry |
| DCQ 쿼리 복잡도 과다 | Medium | Medium | 쿼리 최적화, 인덱싱 | Berry |

### High 리스크

| 리스크 | 확률 | 영향 | 완화 전략 | 담당 |
|--------|-----|------|----------|------|
| 동적 데이터 해석 어려움 | Medium | Medium | 시각화 추가, 설명 텍스트 보강 | Terry + Merry |
| Borry 기대치 불일치 | Low | High | Week 5 조기 검토, 피드백 반영 | Terry |

---

## 🔗 V1.5 → V2 연결

### V1.5에서 준비하는 V2 요소

1. **데이터 축적**
   - V1.5 운영 중 실제 채용 데이터 수집 (목표: 50건)
   - Post-hire 데이터 수집 시작 (6-month Review 연결)

2. **AI 학습 기반**
   - Candidate → Competency 매핑 데이터
   - Interview Question → 효과성 데이터
   - Hiring Decision → Success 패턴 데이터

3. **V2 AI 기능 설계**
   - DCQ-09: 합격 가능성 예측 (유사 프로필 패턴 기반)
   - DCQ-10: 6개월 성과 예측 (Post-hire 데이터 필요)

### V1.5 없이는 V2 불가능

**V1.5가 V2의 필수 전제:**
- V1.5 없이 AI만 추가하면 "학습할 데이터 구조 없음"
- 동적 개념 (Evaluation Record, Hiring Decision 등)이 AI 학습의 입력 데이터

**순서:**
1. V1: 정적 온톨로지 (사전 정의)
2. **V1.5: 동적 데이터 구조** ← AI 학습의 토대
3. V2: AI 추론 (V1.5 데이터로 학습)

---

## 📚 관련 문서

### 전략 문서
- [동적 데이터 전략](../dynamic-data-strategy.md)
- [README](../../README.md)

### 명세 문서
- [Competency Questions](./competency-questions.md) - DCQ-01~08 상세
- [Problem-Concept Mapping](../mapping/problem-01-skill-standardization.md)

### 개념 문서 (V1.5 작성 예정)
- [Dynamic Concepts List](../02-conceptualization/concepts/dynamic-concepts-list.md)
- `02-conceptualization/concepts/dynamic/*.md` (9개 개념)

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 변경자 | 이유 |
|------|----------|--------|------|
| 2025-11-27 | V1.5 범위 문서 초안 작성 | Terry | 동적 데이터 전략 반영, V1.5 Phase 계획 수립 |

---

*V1.5는 "게임체인저 Phase"입니다. ATS만이 가진 동적 채용 데이터를 온톨로지와 결합하여 경쟁사가 따라올 수 없는 차별화를 구현합니다.*
