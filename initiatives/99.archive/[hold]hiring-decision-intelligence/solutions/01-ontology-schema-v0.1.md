# 채용 온톨로지 스키마 v0.1 + AI 활용 시나리오

**버전:** v0.1
**작성일:** 2025-12-01
**목적:** Phase 1 MVP - 의사결정 지능화 (유사 후보자 성과, 레드 플래그 감지, 평가 불일치)

---

## 설계 원칙

### 핵심 전제
**문제:** 데이터는 있지만 활용을 못 한다
**해결:** 온톨로지의 의미론적 연결 + AI의 패턴 인식

### 평가 기준 (모든 솔루션)
1. **온톨로지 + AI로 해결 가능한가?**
2. **얼마나 임팩트가 있는가?**
3. **얼마나 해자(moat)가 될 수 있는가?**

---

## Phase 1 MVP 온톨로지 스키마

### 핵심 개념 (Core Concepts)

```
1. Candidate (후보자)
   - 속성: candidateId, name, appliedDate, currentStage
   - 연결: appliesTo Position, hasProfile CandidateProfile

2. CandidateProfile (후보자 프로필)
   - 속성: yearsOfExperience, previousCompanies[], educationBackground
   - 연결: demonstrates Competency[], hasPattern BehavioralPattern[]

3. Position (포지션)
   - 속성: positionId, title, team, status
   - 연결: requiresCompetency Competency[], belongsTo Team

4. Competency (역량)
   - 속성: competencyId, name, definition, proficiencyLevel
   - 연결: evaluatedBy InterviewFeedback, definedFor JobFamily

5. InterviewFeedback (면접 피드백)
   - 속성: feedbackId, interviewDate, overallScore, notes
   - 연결: evaluates Competency, identifiesConcern Concern, givenBy Interviewer

6. Concern (우려 사항)
   - 속성: concernType (ownership, cultural-fit, technical, turnover-risk)
   - 연결: observedIn Candidate, linkedTo BehavioralPattern

7. BehavioralPattern (행동 패턴)
   - 속성: patternType, frequency, severity
   - 예시: "frequent-job-hopping", "team-credit-confusion", "tech-overestimation"
   - 연결: observedIn Candidate[], correlatesWith PerformanceOutcome

8. HiringDecision (채용 결정)
   - 속성: decisionDate, outcome (hired, rejected, withdrawn)
   - 연결: decidesFor Candidate, basedOn InterviewFeedback[]

9. Employee (입사자)
   - 속성: employeeId, hireDate, currentStatus
   - 연결: wasCandidate Candidate, hasPerformance PerformanceReview[]

10. PerformanceReview (성과 평가)
    - 속성: reviewDate, overallRating, specificRatings{}
    - 연결: evaluates Employee, validatesCompetency Competency[]
```

---

## 핵심 관계 (Key Relationships)

### 1. Candidate → Employee 연결 (온톨로지의 핵심 가치)
```
Candidate --[hired]--> Employee --[hasPerformance]--> PerformanceReview
```
**의미:** 채용 시 평가(InterviewFeedback)와 온보딩 후 성과(PerformanceReview)를 연결

**해결하는 문제:** James 사례 - "18개월 전 Daniel(Ownership 우려 → PIP)과 지금 James를 연결 못 함"

**AI 활용:**
- 유사도 계산: James의 InterviewFeedback ↔ Daniel의 InterviewFeedback
- 성과 예측: Daniel의 PerformanceReview → James의 예상 성과
- 확신 제공: "유사 후보자 Daniel, 6개월 후 PIP" 자동 표시

---

### 2. BehavioralPattern 감지 (패턴 학습)
```
Candidate --[hasPattern]--> BehavioralPattern --[correlatesWith]--> PerformanceOutcome
```
**의미:** 특정 행동 패턴(잦은 이직, 팀 성과 착각)과 온보딩 후 결과 상관관계

**해결하는 문제:** Ryan 사례 - "잦은 이직 패턴 2년 3회 → 3개월 후 퇴사"

**AI 활용:**
- 패턴 자동 감지: "2년 3회 이직" → BehavioralPattern: "frequent-job-hopping"
- 정량적 근거: "동일 패턴 12명, 평균 재직 5.8개월, 1년 이상 재직 8%"
- 레드 플래그: 🚩 "이 패턴은 조기 퇴사와 90% 상관관계"

---

### 3. Concern 추적 및 검증
```
InterviewFeedback --[identifiesConcern]--> Concern --[validatedBy]--> PerformanceReview
```
**의미:** 면접 중 우려 사항(Ownership, Cultural Fit)이 실제로 문제가 됐는지 추적

**해결하는 문제:** Emma 사례 - "면접 신호('9개월 런칭') 있었지만 무시 → 2개월 퇴사"

**AI 활용:**
- 신호 감지: "가장 빨리 런칭? 9개월" → Concern: cultural-fit (우리는 2-3주 사이클)
- 과거 검증: "대기업 출신 PM 4명 중 3명, cultural-fit 우려 → 3개월 내 퇴사"
- 경고: ⚠️ "유사 우려사항이 과거 75% 확률로 조기 퇴사로 이어짐"

---

### 4. Competency 평가 일관성
```
Interviewer --[evaluates]--> Competency --[withCriteria]--> EvaluationCriteria
```
**의미:** 같은 역량(System Thinking)을 면접관마다 다른 기준으로 평가하는 문제 해결

**해결하는 문제:** "Sarah 3점, Michael 5점, Lisa 4점 → 같은 역량인데 평가 불일치"

**AI 활용:**
- 불일치 감지: "System Thinking 평가 편차 > 1.5점" → ⚠️ 하이라이트
- 기준 제안: "이 포지션에서 System Thinking 우선순위는?"
- 표준화 지원: 온톨로지 기반 평가 루브릭 제공

---

## Phase 1 MVP 온톨로지의 해자 (Moat)

### 1. 네트워크 효과 (가장 강력한 해자)
**메커니즘:**
- 채용 데이터 축적 → 패턴 학습 정확도 ↑
- 온보딩 후 성과 연결 → 예측력 ↑
- 사용할수록 똑똑해지는 시스템

**구체적 예:**
- 100명 채용 데이터: "잦은 이직 패턴" 정확도 60%
- 1,000명 채용 데이터: 정확도 85%
- 10,000명 채용 데이터: 정확도 95%

**경쟁사 진입 장벽:**
- 경쟁사는 데이터 없이 시작 → 초기 가치 제공 어려움
- 우리는 고객사마다 데이터 축적 → 이탈 불가능

---

### 2. 온톨로지 기반 의미론적 연결 (기술적 해자)
**차별화:**
- 기존 ATS: 단순 데이터 저장 및 검색
- 우리: 의미론적 관계 정의 → AI가 "왜" 유사한지 설명 가능

**구체적 예:**
```
단순 매칭 (기존 ATS):
- James와 Daniel이 유사: 둘 다 "Backend Engineer" 키워드

의미론적 매칭 (우리):
- James와 Daniel이 유사:
  1. 같은 Competency 평가 (System Thinking 4.2점 vs 4.3점)
  2. 같은 Concern (Ownership 부족)
  3. 같은 면접관 우려 ("팀이 했다" vs "우리가 결정")
  4. Daniel의 PerformanceReview: 3개월 후 Self-direction 부족 → PIP
```

**경쟁사 복제 어려움:**
- 온톨로지 설계 노하우 필요 (2-3년 축적)
- 도메인 전문성 필요 (HR + AI)

---

### 3. 폐쇄 루프 학습 (Closed-loop Learning)
**메커니즘:**
```
InterviewFeedback → HiringDecision → Employee → PerformanceReview
         ↑                                              ↓
         └──────────────── 학습 피드백 ─────────────────┘
```

**차별화:**
- 기존 ATS: 채용 프로세스만 추적 (Performance Review 연결 없음)
- 우리: 채용 → 성과 → 학습 → 개선

**해자:**
- "어떤 면접 평가가 실제 성과를 예측하는가?" 지속 학습
- 시간이 지날수록 예측 정확도 향상
- 경쟁사는 Performance Review 데이터 접근 어려움

---

## AI 활용 시나리오

### 시나리오 1: 유사 후보자 성과 데이터 제공

**사용자:** Borry (Senior Recruiter)
**상황:** James (Senior Backend Engineer) 데브리프 회의, Ownership 우려

**Before (현재):**
1. Sarah: "Ownership 약함" 3.5점
2. Michael: "키우면 됨" 4.5점
3. 1시간 30분 논의 → 결론 없음
4. 1주일 추가 고민 → 결국 오퍼 → 2주 후 거절

**After (온톨로지 + AI):**

**1단계: 실시간 유사 후보자 검색 (데브리프 중)**
```
[시스템 알림]
🔍 유사 후보자 발견: Daniel (2024-03)

유사도 분석:
- 기술 평가: 4.3점 (James 4.2점)
- Ownership 우려: ✓ (Sarah 동일 우려 제기)
- 면접 패턴: "팀이 했다" 반복 언급
- 신뢰도: 87%

Daniel 온보딩 후 성과:
- 3개월 후 Performance Review: 3.2/5
- 피드백: "Self-direction 부족, 항상 지시 대기"
- 6개월 후: PIP (Performance Improvement Plan)
- 9개월 후: 상호 합의 퇴사

💡 인사이트:
"Ownership 부족" 우려는 87% 확률로 실제 문제가 됨
유사 후보자 5명 중 4명이 6개월 내 성과 이슈
```

**2단계: 즉각적 의사결정**
- Borry: "Daniel 케이스와 똑같네요. Reject 합니다"
- 회의 시간: 1시간 30분 → 20분
- 리드타임: 2주 지연 → 즉시 결정

**온톨로지 역할:**
- `James.InterviewFeedback` ↔ `Daniel.InterviewFeedback` 의미론적 유사도 계산
- `Concern(ownership)` 연결 및 추적
- `Daniel.PerformanceReview` 자동 참조

**AI 역할:**
- 유사도 계산 (임베딩 기반)
- 패턴 인식 ("팀이 했다" 언급 빈도)
- 확률 예측 (87% 신뢰도)

**해자 요소:**
- ✅ 네트워크 효과: 데이터 축적 시 정확도 향상
- ✅ 폐쇄 루프: Daniel의 PIP 경험 → James 결정 개선
- ✅ 경쟁사 복제 어려움: Performance Review 연결 필요

**임팩트:**
- 리드타임: 2주 → 즉시 (-14일)
- 오퍼 거절 방지: 연 4-6건 → 2-3건
- 월 2-3명 추가 채용 성공

---

### 시나리오 2: 레드 플래그 자동 감지

**사용자:** John (신입 리크루터, 6개월 경력)
**상황:** Ryan (Senior Frontend Engineer) 이력서 스크리닝

**Before (현재):**
1. 이력서: 2020-2021 (14개월), 2021-2022 (11개월), 2022-2023 (9개월)
2. John: "요즘 개발자들 다 이렇게 옮기지 않나?" → Pass
3. 채용 후 3개월: 더 높은 연봉 제안 받고 퇴사
4. 온보딩 투자 완전 손실

**After (온톨로지 + AI):**

**1단계: 자동 패턴 감지 (이력서 업로드 즉시)**
```
[시스템 알림]
🚩 레드 플래그 감지: 잦은 이직 패턴

패턴 분석:
- 2년간 3회 이직 (평균 재직 11.3개월)
- BehavioralPattern: "frequent-job-hopping"

과거 데이터 (동일 패턴 12명):
- 1년 이상 재직: 1명 (8%)
- 평균 재직 기간: 5.8개월
- 조기 퇴사 사유:
  1. 더 높은 연봉 제안 (58%)
  2. 문화 부적응 (25%)
  3. 업무 난이도 불만 (17%)

⚠️ 권장 사항:
면접 시 필수 질문:
1. "각 이직 전 상황 개선 시도는?"
2. "1년 미만 재직 세 번, 어떤 패턴?"
3. "우리 회사에서는 이런 상황 어떻게 다르게 다룰 건가요?"
```

**2단계: 신입 리크루터 의사결정**
- John: "아, 이건 정말 위험하구나. 면접 안 보고 Reject"
- 또는: 면접 보되 질문 강화 → 명확한 답변 없으면 Reject

**온톨로지 역할:**
- `Ryan.CandidateProfile` → `BehavioralPattern(frequent-job-hopping)` 자동 분류
- `BehavioralPattern` ↔ `PerformanceOutcome` 상관관계 추적
- 과거 12명 `Employee` 데이터 집계

**AI 역할:**
- 패턴 자동 감지 (재직 기간 분석)
- 상관관계 학습 (패턴 → 조기 퇴사 확률)
- 맥락 제공 (퇴사 사유 분석)

**해자 요소:**
- ✅ 네트워크 효과: 패턴 12명 → 120명 → 1,200명 (정확도 향상)
- ✅ 도메인 지식: "2년 3회"가 레드 플래그라는 HR 전문성
- ✅ 신입 교육 자동화: Borry의 10년 경험 → 시스템에 내장

**임팩트:**
- 연간 mis-hire: 3-4건 → 1-2건 (-50%)
- 연 4억원 절감
- 신입 온보딩: 6개월 → 3개월

---

### 시나리오 3: 평가 불일치 하이라이트

**사용자:** Borry + 면접관 3명 (Sarah, Sophie, Michael)
**상황:** Tom (Product Designer) 데브리프 회의

**Before (현재):**
1. Sarah: 5/5 - "디자인 센스 최고"
2. Sophie: 2/5 - "비즈니스 이해 제로"
3. Michael: 4/5 - "좋긴 한데..."
4. 2시간 회의 → 결론 없음 → 1주일 후 추가 미팅 → 2주 지연

**After (온톨로지 + AI):**

**1단계: 평가 불일치 자동 감지 (회의 시작 전)**
```
[시스템 알림]
⚠️ 평가 불일치 감지

불일치 분석:
- Sarah: Visual Design 5/5
- Sophie: Business Understanding 2/5
- Michael: Overall 4/5

불일치 원인:
- Sarah와 Sophie가 서로 다른 Competency 평가
- 이 포지션에서 우선순위가 불명확

🎯 구조화된 질문:
1. "이 포지션에서 Visual Design vs Business Understanding 우선순위는?"
2. "우리 팀 Product Designer에게 가장 중요한 역량은?"
3. "과거 성공한 Tom과 유사한 프로필은?"

과거 유사 케이스:
- Visual Design 5점, Business Understanding 2점 → 입사 후 6개월:
  - 디자인 Product: 성공 (4/5)
  - B2B SaaS: 실패 (2/5, 비즈니스 이해 부족)
```

**2단계: 빠른 합의**
- CEO: "우리는 B2B SaaS니까 Business Understanding이 더 중요"
- 즉시 결정: Tom Reject
- 회의 시간: 2시간 → 30분

**온톨로지 역할:**
- `InterviewFeedback` → `Competency` 매핑 및 점수 분석
- `Competency` 우선순위 불명확 → 질문 생성
- 과거 유사 프로필 `Employee` 성과 참조

**AI 역할:**
- 평가 편차 계산 (표준편차 > 1.5 → 불일치)
- 불일치 원인 분석 (서로 다른 Competency)
- 구조화된 질문 생성

**해자 요소:**
- ✅ 온톨로지: Competency 표준 정의 (경쟁사는 태그만)
- ✅ 과거 학습: Visual vs Business 우선순위별 성과 차이
- ✅ 회의 효율: 2시간 → 30분 (75% 단축)

**임팩트:**
- 데브리프 회의: 2시간 → 40분
- 합의 실패 지연: 1주 → 2일
- 월 5-6건(30%) 영향

---

## Phase 1 MVP 기술 아키텍처

### 데이터 소스
```
1. ATS (Greenhouse) - 기존 데이터
   - Candidate, Position, InterviewFeedback, HiringDecision

2. HRIS (Workday) - 연결 필요 ⭐
   - Employee, PerformanceReview
   - 이것이 핵심 차별화!

3. 파싱/추출
   - 이력서 → CandidateProfile
   - 면접 노트 → Concern, BehavioralPattern
```

### 온톨로지 엔진
```
역할:
- 개념 간 관계 정의 및 추론
- 의미론적 쿼리 지원
- 스키마 진화 관리

기술 스택 옵션:
- Neo4j (Graph DB) - 관계 중심 쿼리
- Apache Jena (RDF/OWL) - 표준 온톨로지
- Custom Graph + Embeddings - 유연성
```

### AI/ML 레이어
```
1. 유사도 계산
   - 임베딩 기반 (Sentence Transformers)
   - InterviewFeedback 텍스트 → 벡터
   - 코사인 유사도 계산

2. 패턴 인식
   - 규칙 기반 + ML
   - BehavioralPattern 자동 분류
   - 상관관계 학습

3. 예측 모델
   - Concern → PerformanceOutcome 확률
   - 로지스틱 회귀 or XGBoost
```

### API 레이어
```
주요 엔드포인트:
1. GET /candidates/{id}/similar-past-employees
   → 유사 후보자 + 성과 데이터

2. POST /candidates/{id}/detect-red-flags
   → 레드 플래그 자동 감지

3. GET /debrief-meetings/{id}/evaluation-conflicts
   → 평가 불일치 하이라이트
```

---

## Phase 1 MVP vs. 장기 비전

### Phase 1 MVP (Week 5-8)
**범위:**
- 핵심 10개 개념
- 3개 AI 시나리오
- 단일 고객사 POC

**제외:**
- 표준화된 역량 정의 (Phase 2)
- 팀 적합도 추천 (Phase 3)
- 크로스 고객사 학습 (Phase 4)

### Phase 2-3 확장
**추가 개념:**
- JobFamily, EvaluationRubric, Team
- 온톨로지 기반 Competency 표준화

**추가 AI:**
- 팀-후보자 매칭
- 문화 핏 예측
- 리스크 정량화

### Phase 4 네트워크 효과
**크로스 고객사:**
- 익명화된 패턴 공유
- 산업별 벤치마크
- "전체 시장에서 이 후보자는..."

---

## 핵심 질문 및 가정

### 1. Performance Review 데이터 접근
**질문:** HRIS (Workday) 연동 가능한가?
**가정:** API 또는 수동 업로드 가능
**검증 방법:** Borry에게 Workday 접근 권한 확인
**리스크:** 높음 - 이것이 핵심 차별화

### 2. 유사도 계산 정확도
**질문:** 어떤 기준이 "유사"한가?
**가정:** Competency 점수 + Concern 유형 + 텍스트 유사도
**검증 방법:** Borry에게 James-Daniel 유사도 평가 요청
**리스크:** 중간 - 프로토타입으로 테스트 가능

### 3. 레드 플래그 기준
**질문:** "2년 3회 이직"이 보편적 레드 플래그인가?
**가정:** 산업/직군별 차이 있을 수 있음
**검증 방법:** 다수 고객사 HR 데이터 분석
**리스크:** 낮음 - Borry 10년 경험 기반

---

## 다음 단계

- [ ] **온톨로지 스키마 검증:** Borry + 기술팀 리뷰
- [ ] **HRIS 연동 가능성 조사:** Workday API 문서 확인
- [ ] **프로토타입 범위 결정:** 3개 시나리오 중 1개 먼저?
- [ ] **Assumption Mapping:** 리스키한 가정 테스트 계획

**우선순위 질문:**
1. Performance Review 연동이 가장 리스키 - 먼저 검증?
2. 시나리오 1(유사 후보자)이 가장 임팩트 - 먼저 프로토타입?
3. Borry에게 검증 세션 언제 잡을까?

---

*Created for hiring-decision-intelligence initiative, Phase 1 MVP*
