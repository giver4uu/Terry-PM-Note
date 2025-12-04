# 동적 데이터 기반 온톨로지 전략

**작성일:** 2025-11-27
**작성자:** Terry (PM) + Jerry (Product Advisor)
**버전:** v1.0.0
**상태:** Active Strategy

---

## 📋 Executive Summary

### 핵심 인사이트

**"ATS의 진짜 차별화는 채용 과정 중 발생하는 동적 데이터"**

기존 HR 온톨로지는 **정적 지식**(Competency 정의, Position 요구사항)만 다루지만, 우리는 ATS이기 때문에 **동적 채용 데이터**(면접 평가, 리드타임, 합격/탈락 패턴)를 보유합니다. 이 데이터를 온톨로지와 결합하면 **AI 없이도 강력한 인사이트** 도출이 가능하며, 이후 AI 학습의 기반이 됩니다.

### 전략적 방향

| 구분 | 기존 접근 (일반 HR 온톨로지) | 우리 접근 (ATS 기반 온톨로지) |
|------|------------------------|------------------------|
| **데이터 타입** | 정적 (Competency 정의, Position 템플릿) | **정적 + 동적** (평가 기록, 리드타임, 패턴) |
| **인사이트 도출** | 사전적 정의 제공 | **데이터 기반 학습 패턴 발견** |
| **차별화** | 낮음 (경쟁사도 가능) | **높음 (ATS만 가능)** |
| **AI 역할** | 필수 (추론 엔진 없이는 가치 제한) | 선택 (동적 데이터 쿼리만으로도 가치 창출) |

---

## 🎯 궁극적 목표 vs 단계별 달성

### 궁극적 목표 (3대 핵심 요구사항)

1. **프로액티브한 정보 제공**: AI가 먼저 관련 정보를 능동적으로 제시
2. **객관적 검증**: 주관성 제거, 일관된 평가 기준
3. **숨은 맥락 이해**: 표면적 이력서가 아닌 깊은 역량 파악

### 단계별 목표 달성 로드맵

| Phase | 기간 | 핵심 개념 | 목표 달성도 | 차별화 임팩트 |
|-------|-----|----------|-----------|------------|
| **V1: 정적 온톨로지** | Week 1-4<br>(현재) | Competency (12개)<br>Position (3개)<br>Proficiency Level<br>Job Level<br>Evaluation Rubric | **30%**<br>✅ 객관적 평가<br>❌ 프로액티브<br>❌ 숨은 맥락 | Low<br>(경쟁사도 가능) |
| **V1.5: 동적 개념 추가**<br>**← 게임체인저** | Week 5-7<br>(신규) | **Candidate**<br>**Interview**<br>**Evaluation Record**<br>**Hiring Decision**<br>**Lead Time** | **70%**<br>✅ 객관적 평가<br>✅ 데이터 기반 인사이트<br>⚠️ 프로액티브 (부분) | **High**<br>**(ATS만 가능)** |
| **V2: AI 학습** | Month 3-4<br>(데이터 축적 후) | Interviewer Pattern<br>Position Success Profile<br>AI Inference Engine | **100%**<br>✅ 모든 목표 달성 | Critical<br>(시장 리더) |

**핵심 메시지:**
- V1만으로는 궁극적 목표의 30%만 달성 (경쟁 차별화 부족)
- **V1.5가 게임체인저**: 동적 데이터로 70% 달성, 강력한 차별화
- V2 AI는 충분한 데이터 축적 후 (V1.5의 자연스러운 확장)

---

## 💡 ATS 동적 데이터의 전략적 가치

### "살아있는 온톨로지" vs "정적 사전"

#### 기존 HR 온톨로지 (정적)

```
"Senior Backend Engineer는 PostgreSQL Advanced가 필요하다"
→ 사전적 정의만 제공
→ HR 담당자가 추측으로 결정
```

#### ATS 기반 온톨로지 (정적 + 동적)

```
"Senior Backend Engineer는 PostgreSQL Advanced가 필요하다"

  📊 동적 데이터 인사이트:
  └─ 지난 6개월 합격자 평균 PostgreSQL 점수: 4.2/5
  └─ PostgreSQL 4점 이상 받은 후보자의 합격률: 75%
  └─ PostgreSQL 3점 이하는 모두 탈락 (15명)
  └─ 면접관 제임스는 PostgreSQL 평가 시 평균 0.5점 엄격함

  💡 프로액티브 제안:
  → "PostgreSQL 4점을 합격 기준점으로 권장"
  → "제임스 평가는 +0.5점 보정 필요"

→ 데이터 기반 의사결정 가능
→ AI 없이도 "숨은 맥락" 발견
```

**차이점:**
- **정적 온톨로지**: "무엇이 필요한가" (What)
- **동적 데이터**: "과거 성공/실패 패턴" (How, Why)
- **결합 효과**: "왜 이 기준이 중요하고, 어떻게 판단해야 하는가"

---

## 📊 동적 개념 우선순위 매트릭스

### V1.5에서 추가할 동적 개념

| 개념 카테고리 | 핵심 개념 | V1.5 포함 | 차별화 임팩트 | 구현 난이도 | 우선순위 |
|------------|---------|----------|-----------|----------|---------|
| **Candidate Journey** | Candidate (지원자) | ✅ | High | Low | P0 |
| | Application (지원) | ✅ | Medium | Low | P1 |
| | Interview Stage (전형 단계) | ✅ | High | Medium | P0 |
| | Lead Time (단계별 소요 시간) | ✅ | **Critical** | Low | **P0** |
| **Evaluation** | Interview (면접 이벤트) | ✅ | High | Medium | P0 |
| | Evaluation Record (평가 기록) | ✅ | **Critical** | Medium | **P0** |
| | Competency Assessment | ✅ | **Critical** | Medium | **P0** |
| | Interviewer (면접관) | ✅ | High | Low | P1 |
| **Outcome** | Hiring Decision (채용 결정) | ✅ | **Critical** | Low | **P0** |
| | Rejection Reason (탈락 사유) | ✅ | High | Medium | P1 |
| | Offer Acceptance (오퍼 수락) | ⏳ V2 | Medium | Low | P2 |
| **Post-Hire** | Onboarding Performance | ⏳ V2 | High | High | P2 |
| | 6-month Review | ⏳ V2 | High | High | P2 |
| | Retention (재직 기간) | ⏳ V2 | High | Low | P2 |
| **Patterns** | Interviewer Pattern | ⏳ V2 | **Critical** | High | P1 |
| | Position Success Profile | ⏳ V2 | **Critical** | High | P1 |

**V1.5 우선순위 (P0 - Critical):**
1. **Lead Time** - 채용 과정 병목 발견
2. **Evaluation Record** - 면접관별 평가 데이터
3. **Competency Assessment** - 역량별 점수 기록
4. **Hiring Decision** - 합격/불합격 + 사유
5. **Candidate** - 지원자 기본 정보
6. **Interview Stage** - 전형 단계 정의

**총 V1.5 개념:** 9개 (정적 7개 + 동적 9개 = 총 16개)

---

## 🎓 동적 Competency Questions (DCQ)

### DCQ의 차별화 포인트

**기존 CQ (정적):**
- "Senior Backend Engineer는 어떤 Competencies가 필요한가?"
- → 정의 조회

**DCQ (동적):**
- "Senior Backend Engineer 채용의 평균 리드타임은?"
- "PostgreSQL Advanced 요구하는 Position의 합격률은?"
- "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?"
- → **데이터 분석 및 패턴 발견**

### V1.5 추가 DCQ (8개)

#### **Process Insights (프로세스 인사이트)**

| ID | 질문 | 온톨로지 답변 예시 | 비즈니스 가치 |
|----|------|----------------|------------|
| **DCQ-01** | "Senior Backend Engineer 채용의 평균 리드타임은?" | "평균 28일 (지원 → 오퍼)<br>- 서류 → 1차 면접: 7일<br>- 1차 → 2차: 14일 ← **병목**<br>- 2차 → 오퍼: 7일" | 병목 단계 발견 → 프로세스 개선 |
| **DCQ-02** | "어떤 Competency 평가가 가장 오래 걸리는가?" | "System Architecture 평가 평균 2.5시간<br>(화이트보드 세션 포함)<br>vs Communication 평균 30분" | 면접 시간 최적화 |
| **DCQ-03** | "PostgreSQL Advanced 요구하는 Position의 평균 합격률은?" | "15% (지원자 100명 중 15명 합격)<br>vs React Intermediate 요구: 28%" | JD 난이도 조정 |

#### **Evaluation Insights (면접관 패턴)**

| ID | 질문 | 온톨로지 답변 예시 | 비즈니스 가치 |
|----|------|----------------|------------|
| **DCQ-04** | "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?" | "제임스 평균: 3.8/5<br>전체 면접관 평균: 4.2/5<br>**→ 0.4점 더 엄격함**" | 평가 calibration (조율 필요) |
| **DCQ-05** | "지난 6개월 Backend Senior 합격자의 평균 Competency 점수는?" | "RESTful API: 4.5/5<br>PostgreSQL: 4.2/5<br>Communication: 4.0/5<br>System Architecture: 3.8/5" | 합격 벤치마크 설정 |
| **DCQ-06** | "Communication 3점 받은 후보자의 최종 합격률은?" | "12% (25명 중 3명 합격)<br>vs Communication 4점: 65%" | Pass/Fail 기준점 발견 |

#### **Outcome Insights (탈락 패턴)**

| ID | 질문 | 온톨로지 답변 예시 | 비즈니스 가치 |
|----|------|----------------|------------|
| **DCQ-07** | "Backend Senior 탈락 사유 Top 3는?" | "1. PostgreSQL 역량 부족 (40%)<br>2. System Architecture 경험 부족 (30%)<br>3. Communication 3점 이하 (20%)" | JD 요구사항 정확성 검증 |
| **DCQ-08** | "PostgreSQL 4점 이상인데 탈락한 케이스는 왜?" | "15명 중 3명 탈락<br>공통점: Communication 2점 이하<br>→ **기술만으론 부족** 인사이트" | Hiring criteria 정교화 |

**V2 예정 (Predictive Insights):**
- DCQ-09: "이 후보자의 합격 가능성은?" (AI 추론)
- DCQ-10: "이 후보자의 6개월 성과 예측은?" (Post-hire 데이터 필요)

**총 Competency Questions:**
- V1: 16개 (정적 CQ)
- V1.5: **24개 (정적 16개 + 동적 8개)**
- V2: 26개 (+ 예측 2개)

---

## 🚀 차별화 시나리오: Greenhouse vs 우리

### 시나리오: Borry가 "Senior Backend Engineer - Payments" JD 작성

#### **Greenhouse (일반 ATS)**

```
Step 1: JD 템플릿 선택
  → "Backend Engineer" 템플릿 열기

Step 2: 요구 스킬 수동 입력
  → "PostgreSQL" 태그 추가
  → "RESTful API" 태그 추가
  → 숙련도는? 🤷‍♀️ (데이터 없음, 보리가 추측)

Step 3: 평가 기준 작성
  → 루브릭 없음, 면접관마다 다르게 해석
  → "Communication 5점"이 뭔지 모호

Step 4: 과거 채용 참고
  → 노션에서 검색 (2시간 소요)
  → 맥락 없는 면접 질문 30개 발견, 사용 불가

⏱️ 총 소요 시간: 2시간
😓 보리의 불만: "매번 처음부터 작성... 지난번 JD는 왜 못 쓰지?"
```

#### **우리 시스템 (온톨로지 + 동적 데이터)**

```
Step 1: Position 템플릿 선택
  → "Senior Backend Engineer" 선택
  → 온톨로지가 자동 제안:
     ✅ Required: PostgreSQL (Advanced)
     ✅ Required: RESTful API (Advanced)
     ✅ Required: Communication (Intermediate)

Step 2: 📊 과거 데이터 기반 조정 (프로액티브 제안)

  💡 시스템 알림:
     "지난 6개월 Payments팀 Backend Senior 합격자 분석:
      - PostgreSQL 평균 4.5/5 (Advanced 이상)
      - Communication 평균 4.0/5

      ⚠️ 주의: PostgreSQL 4점 미만은 모두 탈락 (15명)
      💡 제안: PostgreSQL을 'Expert' 레벨로 상향 추천"

  → Borry: "오, 데이터가 증거네. Expert로 변경!"

Step 3: 평가 기준 자동 연결
  → Competency별 Rubric 자동 첨부
  → 면접관들이 동일한 5점 척도 사용
  → 예: "Communication 4점 = 기술 개념을 PM에게 설명 가능"

Step 4: 📊 추천 면접 질문 (동적 데이터 기반)

  💡 시스템 추천:
     "PostgreSQL Expert 평가용 질문 Top 3:
      1. 'N+1 쿼리 문제 해결 경험'
         (효과성 4.5/5, 사용 12회)
      2. '대용량 트랜잭션 설계 사례'
         (효과성 4.2/5, 합격자 80% 고득점)
      3. '인덱스 최적화 경험'
         (효과성 3.8/5)"

⏱️ 총 소요 시간: 30분 (75% 단축)
😊 보리의 반응: "시스템이 알아서 제안해주니 확신 있게 결정 가능!"
```

### 차별화 포인트 검증

| 궁극적 목표 | Greenhouse | 우리 시스템 | 차별화 달성 |
|-----------|-----------|----------|-----------|
| 1. 프로액티브 정보 제공 | ❌ 수동 검색 | ✅ **시스템이 먼저 과거 데이터 제시** | ✅ |
| 2. 객관적 검증 | △ 템플릿만 | ✅ **Rubric 기반 일관된 평가** | ✅ |
| 3. 숨은 맥락 이해 | ❌ 없음 | ✅ **"PostgreSQL 4점 미만 모두 탈락" 패턴 발견** | ✅ |

**V1.5 달성:** 3가지 목표 중 2.5개 달성 (프로액티브는 부분 달성, 완전 자동화는 V2 AI)

---

## 📅 수정된 개발 로드맵

### Phase 1: V1 - 정적 온톨로지 (Week 1-4, 현재 진행 중)

**목표:** 표준화된 Competency 정의 및 Evaluation Rubric

**개념 (7개):**
- Job Family, Job Function, Position
- Competency (12개), Proficiency Level, Job Level
- Evaluation Rubric

**Competency Questions:** 16개 (정적 CQ)

**완료 기준:**
- [ ] 12개 Competency 정의 완료
- [ ] 3개 Position 예시 완료 (Senior BE, Mid FE, Senior PM)
- [ ] Borry 파일럿: JD 작성 30분 이내

**산출물:**
- `02-conceptualization/concepts/` 7개 개념 문서
- `03-implementation/competencies/` 12개 Competency 문서
- `03-implementation/examples/` 3개 Position 예시

---

### Phase 2: V1.5 - 동적 개념 추가 (Week 5-7, 신규)

**목표:** ATS 채용 데이터를 온톨로지와 연결

**추가 개념 (9개):**
- **Candidate Journey:** Candidate, Application, Interview Stage, Lead Time
- **Evaluation:** Interview, Evaluation Record, Competency Assessment, Interviewer
- **Outcome:** Hiring Decision

**Competency Questions:** +8개 (동적 DCQ)

**완료 기준:**
- [ ] 9개 동적 개념 정의 완료
- [ ] Borry 샘플 데이터 5-10건 입력
- [ ] DCQ-01~08 쿼리 테스트 성공
- [ ] Borry 데모: "과거 데이터 기반 인사이트" 시연

**산출물:**
- `02-conceptualization/concepts/dynamic/` 9개 동적 개념 문서
- `03-implementation/examples/sample-data/` 샘플 채용 데이터 5-10건
- `04-validation/dcq-validation/` DCQ 쿼리 결과

**핵심 차별화 검증:**
- [ ] DCQ-04 답변: "면접관 제임스는 0.4점 더 엄격함"
- [ ] DCQ-05 답변: "Backend Senior 합격자 PostgreSQL 평균 4.2/5"
- [ ] DCQ-07 답변: "탈락 사유 Top 3"

---

### Phase 3: V2 - AI 학습 (Month 3-4, 데이터 축적 후)

**전제 조건:** 최소 50건 이상 채용 데이터 축적 (V1.5 운영 중 수집)

**목표:** AI 추론 엔진 추가, 예측 기능

**추가 개념 (5개):**
- Interviewer Pattern, Position Success Profile
- Onboarding Performance, 6-month Review, Retention

**Competency Questions:** +2개 (예측 DCQ)

**AI 기능:**
- 지원자 합격 가능성 예측 (DCQ-09)
- 6개월 성과 예측 (DCQ-10)
- 자동 Competency 매핑 (이력서 → Competency)

**완료 기준:**
- [ ] AI 추론 엔진 통합 (LLM + RAG 또는 규칙 기반)
- [ ] 예측 정확도 70% 이상
- [ ] Borry 만족도 4.5/5 이상

---

## ✅ 성공 지표

### V1 성공 지표 (정적 온톨로지)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| JD 작성 시간 단축 | 75% (2시간 → 30분) | Borry 파일럿 측정 |
| 팀 간 합의 시간 단축 | 85% (1주 → 1일) | A팀/B팀 합의 회의 시간 |
| Borry 만족도 | ≥ 4/5 | 파일럿 후 설문 |
| Competency 이해도 | ≥ 4/5 | Borry 검토 세션 |

### V1.5 성공 지표 (동적 개념 추가)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| DCQ 답변 정확도 | 100% (8개 모두 답변 가능) | 쿼리 테스트 |
| 데이터 기반 인사이트 도출 | 최소 5개 | Borry와 데모 세션 |
| 프로액티브 제안 유용성 | ≥ 4/5 | Borry 피드백 |
| 경쟁 차별화 인지 | "Greenhouse와 다르다" | Borry 인터뷰 |

### V2 성공 지표 (AI 학습)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 합격 예측 정확도 | ≥ 70% | 실제 채용 결과 비교 |
| 성과 예측 정확도 | ≥ 60% | 6개월 후 성과 비교 |
| AI 추천 채택률 | ≥ 50% | Borry 사용 로그 |

---

## 🚧 리스크 및 완화 전략

### V1 리스크

| 리스크 | 확률 | 영향 | 완화 전략 |
|--------|-----|------|----------|
| Competency 정의가 너무 일반적 | Medium | High | Core + Shell 모델, 팀별 커스터마이징 허용 |
| Borry 파일럿 실패 (30분 초과) | Low | Medium | 사전 리허설, UI 개선 |

### V1.5 리스크 (신규)

| 리스크 | 확률 | 영향 | 완화 전략 |
|--------|-----|------|----------|
| 샘플 데이터 부족 (5건 미만) | Medium | High | Borry와 사전 조율, 익명화 프로세스 간소화 |
| DCQ 쿼리 성능 이슈 | Low | Medium | 인덱싱, 쿼리 최적화 |
| 동적 데이터 해석 어려움 | Medium | Medium | 시각화 추가, 설명 텍스트 보강 |

### V2 리스크

| 리스크 | 확률 | 영향 | 완화 전략 |
|--------|-----|------|----------|
| 데이터 축적 부족 (50건 미만) | Medium | Critical | V1.5 조기 런칭, 데이터 수집 가속화 |
| AI 예측 정확도 낮음 (<50%) | Medium | High | 규칙 기반 + AI 하이브리드 접근 |

---

## 📚 관련 문서

### 전략 문서
- [README.md](../README.md) - HR 온톨로지 이니셔티브 개요
- [Opportunity 01: Skill Standardization](../opportunities/01-skill-standardization.md)
- [Opportunity 03: Knowledge Reuse](../opportunities/03-knowledge-reuse.md)

### 명세 문서
- [Competency Questions](./01-specification/competency-questions.md) - 16개 정적 CQ + 8개 동적 DCQ
- [V1.5 Scope](./01-specification/v1-5-scope.md) - V1.5 범위 정의
- [Dynamic Concepts List](./02-conceptualization/concepts/dynamic-concepts-list.md)

### 구현 문서
- [V1 Competencies List](./03-implementation/v1-competencies-list.md)
- [Sample Data](./03-implementation/examples/sample-data/) - V1.5 샘플 채용 데이터

---

## 🔄 변경 이력

| 날짜 | 변경 내용 | 변경자 | 이유 |
|------|----------|--------|------|
| 2025-11-27 | 초안 작성, 동적 데이터 전략 수립 | Terry + Jerry | 전략 재정렬, ATS 차별화 포인트 명확화 |

---

*이 전략 문서는 온톨로지 개발의 북극성입니다. V1 (정적) → V1.5 (동적) → V2 (AI) 순서로 진행하며, 각 단계마다 명확한 가치를 창출합니다.*
