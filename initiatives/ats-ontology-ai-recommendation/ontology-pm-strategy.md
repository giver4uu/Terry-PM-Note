# ATS 온톨로지 기반 AI 추천 시스템: PM 실행 전략

**문서 버전:** v3.0
**작성일:** 2025-12-03
**최종 수정:** 2026-01-07
**담당 PM:** Terry
**온톨로지 아키텍트:** Forry (포리)
**주요 변경:** 온톨로지 적용 범위 명확화, Use Case 4 추가, MVP Objects 9개로 확장

---

## Executive Summary

**비전:** 정적 매칭(학력/경력/연봉)을 넘어, 채용 프로세스의 동적 데이터(리드타임, 평가, 커뮤니케이션)를 온톨로지로 구조화하여 맥락 기반 AI 의사결정 지원을 실현합니다.

**핵심 가치 제안:**
- 채용 담당자: 후보자 적합도를 맥락과 함께 이해
- 채용 관리자: 프로세스 병목 자동 감지 및 개선 제안
- 경영진: 채용 품질과 효율성의 데이터 기반 최적화

**PM의 역할:**
- 온톨로지 설계를 비즈니스 가치로 번역
- 고객 문제 중심의 우선순위 설정
- 비개발자도 이해 가능한 구조 유지

---

## 0. AI 철학 적용 (AI Philosophy Application)

### 0.1 핵심 원칙: AI는 의사결정 지원, 자동화 아님

**라운드의 AI 철학:**
> "AI는 채용 담당자를 대체하지 않고, 더 똑똑하게 만든다"

이 온톨로지 설계의 모든 Use Case는 다음 3가지 원칙을 준수합니다:

#### **원칙 1: 투명성 (Transparency)**
- AI가 "왜" 이런 분석을 제공하는지 근거를 명시
- 온톨로지 기반 추론 경로를 자연어로 설명
- 예: "이 후보자와 유사한 프로필 3명이 레퍼런스 체크에서 탈락했습니다" (구체적 근거)

#### **원칙 2: 오버라이드 (Override)**
- 모든 AI 분석 결과에 "무시하기" 또는 "피드백 남기기" 옵션 제공
- 사용자가 AI 제안을 거부해도 워크플로우는 정상 진행
- 오버라이드 이유를 수집하여 AI 개선에 활용

#### **원칙 3: 학습 루프 (Learning Loop)**
- 사용자의 Accept/Reject 행동을 AI_Recommendation Object로 기록
- 오버라이드 패턴을 분석하여 모델 정확도 개선
- 주기적으로 "AI 정확도 리포트" 제공 (예: "이번 달 위험 시그널 정확도 78%")

---

### 0.2 온톨로지에서 AI 철학 구현 방법

#### **객체 설계 시:**
| 원칙 | 구현 방법 | 온톨로지 요소 |
|------|----------|-------------|
| 투명성 | 추론 경로 추적 | Link의 timestamp, reason 속성 필수 포함 |
| 오버라이드 | 사용자 결정 기록 | AI_Recommendation Object에 user_action 필드 |
| 학습 루프 | 피드백 집계 | AI_Recommendation → Evaluation Link로 정확도 계산 |

#### **Use Case 설계 시:**
- ❌ **나쁜 예:** "AI가 자동으로 후보자를 탈락시킵니다"
- ✅ **좋은 예:** "AI가 위험 시그널을 감지하여 알려드립니다. 최종 결정은 채용 담당자가 합니다"

#### **UI/UX 설계 시:**
- AI 분석 결과는 항상 "제안(Suggestion)" 형태로 표시
- 버튼 텍스트: "적용하기" / "무시하기" (명확한 선택권)
- 무시 이유 수집: 드롭다운 + 선택적 텍스트 입력

---

### 0.3 AI Philosophy 체크리스트 (모든 Use Case 필수)

각 Use Case는 다음을 만족해야 합니다:

- [ ] **투명성**: AI 분석 근거를 3줄 이내로 설명 가능한가?
- [ ] **오버라이드**: 사용자가 클릭 한 번으로 AI 제안을 무시할 수 있는가?
- [ ] **학습 루프**: 사용자 행동(수락/거부)이 온톨로지에 기록되는가?
- [ ] **명명**: "자동", "추천" 대신 "분석 제공", "알림" 등의 용어 사용
- [ ] **최종 결정권**: 사용자가 AI 없이도 워크플로우를 완료할 수 있는가?

---

### 0.6 온톨로지 적용 범위 및 경계

#### 0.6.1 온톨로지 vs 일반 시스템 구분

**온톨로지가 필요한 영역 (이 문서의 범위):**
- 복잡한 관계 추론 (3-hop 이상 조인)
- 맥락 기반 AI 분석
- 유사도 계산 및 패턴 추론
- AI 의사결정 지원

**일반 시스템으로 충분한 영역 (이 문서 범위 밖):**
- 단순 조회/집계 (SELECT, COUNT, SUM)
- 반복 쿼리 (Query Template)
- 대화형 수정 (Conversation Context)
- 권한 제어 (RBAC)

#### 0.6.2 고객 질문 92개 분석 결과

실제 고객 질문 분석 결과:
- **온톨로지 필요**: 15-20% (diagnosis, recommendation, 복잡한 analysis)
- **일반 DB 충분**: 80-85% (lookup, monitor, identification, 단순 comparison)

**전략적 방향:**
- 온톨로지는 **"AI 의사결정 지원"에만 집중**
- 단순 조회/모니터링은 별도 시스템으로 처리
- 온톨로지의 진짜 가치를 증명하는 Use Case 우선

#### 0.6.3 시스템 아키텍처 레이어

```
┌─────────────────────────────────────┐
│   프론트엔드 (공통 UI)              │
└─────────────┬───────────────────────┘
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
┌─────────────┐ ┌──────────────────┐
│ 일반 시스템  │ │ 온톨로지 시스템   │
│ (80-85%)    │ │ (15-20%)         │
├─────────────┤ ├──────────────────┤
│ Query       │ │ Candidate        │
│ Template    │ │ Application      │
│ Privacy     │ │ StageTransition  │
│ RBAC        │ │ AI_Recommend     │
│ Conversation│ │ Skill (유사도)   │
└─────────────┘ └──────────────────┘
       │             │
       └──────┬──────┘
              ▼
       ┌─────────────┐
       │ 데이터 레이어│
       │ (PostgreSQL)│
       └─────────────┘
```

**핵심 원칙:**
- 온톨로지는 **복잡도가 정당화되는 Use Case만**
- 나머지는 일반 시스템으로 빠르게 구현
- MVP는 온톨로지 가치를 증명하는 데 집중

---

## 1. 온톨로지 설계 접근법

### 1.1 핵심 Objects (엔티티) 식별

Palantir 스타일 온톨로지는 "현실 세계의 것(things)"을 객체로 모델링합니다. ATS 도메인의 핵심 객체는 다음과 같습니다:

#### **Tier 1: 핵심 업무 객체 (Core Domain Objects)**
가장 먼저 정의해야 하며, 모든 워크플로우의 중심이 되는 객체들입니다.

| Object Type | 정의 | 핵심 속성 예시 | 비즈니스 가치 |
|-------------|------|---------------|--------------|
| **Candidate** | 채용 지원자 개인 | candidate_id, name, email, phone, applied_date, current_status | 모든 채용 활동의 중심 엔티티 |
| **Job Posting** | 채용 공고 | job_id, title, department, employment_type, salary_range, posted_date, closing_date, status | 지원자 매칭의 기준점 |
| **Application** | 특정 공고에 대한 지원 | application_id, applied_date, source_channel, resume_url, cover_letter, current_stage | 후보자-공고 연결의 실체 |
| **Interview** | 면접 이벤트 | interview_id, scheduled_date, actual_date, type (phone/video/onsite), duration, location | 평가 프로세스의 핵심 단위 |
| **Evaluation** | 평가 기록 | evaluation_id, score, rubric_used, feedback_text, strengths, concerns, recommendation | 의사결정의 근거 |

#### **Tier 2: 프로세스 관리 객체 (Process Management Objects)**
워크플로우와 시간적 변화를 추적하는 객체들입니다.

| Object Type | 정의 | 핵심 속성 예시 | 비즈니스 가치 |
|-------------|------|---------------|--------------|
| **Recruitment Stage** | 채용 단계 정의 | stage_id, stage_name, sequence_order, average_duration, pass_rate | 프로세스 표준화 및 벤치마킹 |
| **Stage Transition** | 단계 이동 이벤트 | transition_id, from_stage, to_stage, timestamp, triggered_by, reason | 병목 지점 분석 가능 |
| **Task** | 채용 관련 할 일 | task_id, type, assignee, due_date, status, priority | 실행력 추적 |
| **Communication** | 커뮤니케이션 기록 | comm_id, channel (email/call/message), timestamp, sender, recipient, subject, content_summary | 관계 품질 측정 |

#### **Tier 3: 사람 및 조직 객체 (People & Organization Objects)**
의사결정 주체와 조직 맥락을 표현합니다.

| Object Type | 정의 | 핵심 속성 예시 | 비즈니스 가치 |
|-------------|------|---------------|--------------|
| **Hiring Manager** | 채용 책임자 | manager_id, name, department, hiring_velocity, approval_rate | 의사결정자 패턴 분석 |
| **Interviewer** | 면접관 | interviewer_id, name, role, specialization, interview_count, average_score_given | 평가자 캘리브레이션 |
| **Recruiter** | 리크루터 | recruiter_id, name, assigned_positions, placement_rate, average_time_to_fill | 성과 측정 |
| **Department** | 부서 | dept_id, name, headcount, hiring_budget, average_tenure | 조직 맥락 제공 |

#### **Tier 4: 참조 데이터 객체 (Reference Data Objects)**
표준화된 기준과 템플릿을 관리합니다.

| Object Type | 정의 | 핵심 속성 예시 | 비즈니스 가치 |
|-------------|------|---------------|--------------|
| **Evaluation Rubric** | 평가 기준표 | rubric_id, name, criteria_list, scoring_scale, version | 평가 일관성 확보 |
| **Skill** | 스킬/역량 | skill_id, name, category, proficiency_levels | 역량 기반 매칭 |
| **Assessment Template** | 평가 템플릿 | template_id, name, question_set, time_limit, passing_score | 평가 프로세스 표준화 |

---

### 1.2 핵심 Links (관계) 정의

온톨로지의 진정한 힘은 관계에서 나옵니다. 관계는 양방향성과 의미를 명확히 정의해야 합니다.

#### **정적 관계 (Static Relationships)**
시간이 지나도 변하지 않는 구조적 관계입니다.

| Link Type | From → To | 역관계 | 카디널리티 | 비즈니스 의미 | 활용 예시 |
|-----------|-----------|--------|-----------|-------------|----------|
| **APPLIES_TO** | Candidate → Job Posting | HAS_APPLICANT | N:M | 후보자가 공고에 지원함 | "이 후보자가 지원한 모든 포지션 조회" |
| **CREATES** | Application → Candidate | CREATED_BY | 1:1 | 지원서가 특정 지원 행위를 나타냄 | "각 지원의 주체 식별" |
| **FOR_POSITION** | Application → Job Posting | HAS_APPLICATION | N:1 | 지원서가 특정 공고를 대상으로 함 | "특정 포지션의 모든 지원자 조회" |
| **SCHEDULES** | Interview → Application | HAS_INTERVIEW | N:1 | 면접이 특정 지원 건에 속함 | "후보자의 면접 히스토리 추적" |
| **BELONGS_TO** | Job Posting → Department | OWNS_POSITION | N:1 | 공고가 특정 부서 소속 | "부서별 채용 현황 집계" |

#### **동적 관계 (Dynamic Relationships)**
시간에 따라 생성/변경되며, 프로세스 진행을 나타냅니다.

| Link Type | From → To | 역관계 | 속성 | 비즈니스 의미 | AI 추천 활용 |
|-----------|-----------|--------|-----|-------------|-------------|
| **EVALUATES** | Interviewer → Candidate | EVALUATED_BY | timestamp, score, confidence_level | 면접관이 후보자를 평가함 | "평가자별 점수 패턴 분석" |
| **RECOMMENDS** | Hiring Manager → Candidate | RECOMMENDED_BY | recommendation_level, timestamp, conditions | 채용 관리자가 후보자 추천 | "최종 의사결정 영향도 추적" |
| **COMMUNICATES_WITH** | Recruiter → Candidate | COMMUNICATES_WITH | channel, timestamp, sentiment, response_time | 소통 이력 | "커뮤니케이션 품질 점수 산출" |
| **PROGRESSES_TO** | Stage Transition → Recruitment Stage | RECEIVES_FROM | timestamp, duration_in_prev_stage, pass_rate | 단계 진행 | "병목 단계 자동 감지" |
| **ASSIGNS** | Recruiter → Application | ASSIGNED_TO | timestamp, workload_at_time | 담당자 배정 | "업무 분배 최적화" |

#### **파생 관계 (Derived Relationships)**
기존 관계들로부터 추론 가능한 간접 관계입니다. 쿼리 성능과 가독성을 위해 명시합니다.

| Link Type | 추론 경로 | 비즈니스 가치 | 갱신 방식 |
|-----------|----------|--------------|----------|
| **INTERVIEWED_BY** | Application → Interview → Interviewer | 후보자와 면접관의 직접 연결 | 면접 종료 시 자동 생성 |
| **COMPETES_WITH** | Candidate ← Application → Job Posting ← Application → Candidate | 동일 포지션 경쟁 후보자 | 지원 시 계산 |
| **PREVIOUSLY_APPLIED** | Candidate → Application (historical) | 재지원자 식별 | 과거 지원 이력 조회 |

---

### 1.3 정적 vs 동적 데이터 구조화 전략

#### **정적 데이터 (Static Properties)**
변하지 않거나 매우 드물게 변하는 속성입니다.

**저장 방식:**
- Object의 직접 속성으로 저장
- 인덱싱하여 빠른 필터링 지원
- 예: candidate.education_level, job.required_experience_years

**활용:**
- 초기 스크리닝 및 필터링
- 기본 매칭 알고리즘
- 보고서 그룹핑 기준

#### **동적 데이터 (Dynamic Properties)**
시간에 따라 변하는 상태와 측정값입니다.

**저장 방식:**
- 별도 Object로 모델링 (Event Sourcing 패턴)
- 시계열 속성으로 timestamp 필수 포함
- 예: StageTransition, Evaluation, Communication

**구조 예시:**
```
StageTransition {
  transition_id: "st_001"
  application_id: "app_123"
  from_stage: "phone_screen"
  to_stage: "technical_interview"
  timestamp: "2025-12-01T10:30:00Z"
  duration_in_prev_stage_hours: 48
  triggered_by: "recruiter_456"
  notes: "Strong cultural fit, moving to tech round"
}
```

**활용:**
- 프로세스 속도 분석 (리드타임)
- 이탈 지점 감지
- 평가 점수 추이 추적
- AI가 "언제", "왜" 변화가 일어났는지 학습

---

### 1.4 시간적 변화 표현 방법

채용 프로세스는 본질적으로 **상태 기계(State Machine)**입니다. 온톨로지에서 시간적 변화를 표현하는 세 가지 레이어:

#### **Layer 1: 현재 상태 (Current State)**
가장 자주 조회되는 정보로, 빠른 접근이 필요합니다.

```
Application {
  application_id: "app_123"
  current_stage: "technical_interview"  // ← 현재 상태
  current_stage_entered_at: "2025-12-01T10:30:00Z"
  overall_status: "active"
}
```

**PM 고려사항:**
- 대부분의 UI 화면은 현재 상태만 표시
- 인덱싱 최적화 필수
- 단순 필터링으로 빠른 응답

#### **Layer 2: 변화 이력 (Change History)**
디버깅과 감사를 위한 완전한 로그입니다.

```
StageTransition Object들의 시계열 체인:
app_123 → screen → interview → offer
  |         |           |          |
  Day 0   Day 2       Day 7     Day 14
```

**PM 고려사항:**
- 프로세스 복기 및 분석용
- "왜 이 후보자가 떨어졌나?" 질문에 답변
- 규정 준수 (GDPR, 채용 공정성)

#### **Layer 3: 집계 메트릭 (Aggregated Metrics)**
분석과 AI 학습을 위한 사전 계산된 지표입니다.

```
ApplicationMetrics {
  application_id: "app_123"
  total_stages_passed: 3
  total_duration_days: 14
  average_evaluation_score: 4.2
  communication_responsiveness: 0.95  // 0-1 scale
  time_in_each_stage: {
    "screening": 2,
    "phone_interview": 5,
    "technical_interview": 7
  }
}
```

**PM 고려사항:**
- AI 모델의 피처로 직접 사용
- 대시보드 성능 최적화
- 야간 배치로 계산 가능

---

## 2. 고객 가치 중심 우선순위

### 2.1 임팩트가 큰 Use Cases (우선순위 순)

#### **Use Case 1: 지원자 리드타임 분석 및 병목 알림**

**고객 문제:**
"이 후보자 언제쯤 최종 결정 나올까요?" - 채용 담당자가 가장 많이 받는 질문

**온톨로지 활용:**
```
Query Pattern:
Application → StageTransition (history) → Recruitment Stage
  └─ 유사한 과거 케이스 (같은 포지션 타입, 비슷한 평가 점수)의
     평균 duration 계산
  └─ 현재 단계에서 평균보다 오래 머물면 AI_Recommendation 생성
```

**AI 철학 체크리스트:**
- ✅ **투명성**: "유사 프로필 12건의 평균 진행 기간 7일 대비 현재 14일 경과" (구체적 근거 제시)
- ✅ **오버라이드**: "이 알림 무시하기" 버튼 제공, 무시해도 워크플로우 정상 진행
- ✅ **학습 루프**: 사용자가 알림 후 실제 조치했는지 AI_Recommendation.user_action에 기록
- ✅ **명명**: "자동 예측" 대신 "예상 소요 시간 분석" 사용
- ✅ **최종 결정권**: 알림은 정보 제공만, 다음 단계 진행은 사용자가 결정

**UI 예시:**
```
⚠️ 병목 감지
현재 단계: Technical Interview (14일 경과)
예상 소요 기간: 7일 (유사 프로필 12건 평균)

[근거 보기] [담당자에게 알림] [무시하기]
```

**비즈니스 임팩트:**
- 후보자 경험 개선 (불확실성 감소)
- 채용 담당자의 사후 질문 80% 감소
- 프로세스 병목 가시화

**MVP 범위:**
- Object: Application, StageTransition, Recruitment Stage, AI_Recommendation
- Link: PROGRESSES_TO, RECOMMENDS_FOR
- 단순 규칙 기반 분석 (ML 없이도 가능)

**측정 지표:**
- 분석 정확도 (±3일 이내)
- 알림 후 실제 조치 비율
- 평균 단계 체류 시간 감소율
- AI 제안 수락률 (목표: 60% 이상)

---

#### **Use Case 2: 유사 후보자 분석 제공 (면접관 준비 지원)**

**고객 문제:**
"이번 후보자, 이전에 비슷한 케이스 있었나요?" - 면접관이 맥락을 빠르게 파악하고 싶어함

**온톨로지 활용:**
```
Query Pattern:
Candidate A → Application → Job Posting → Skill (required)
  └─ 같은 Skill을 가진 Candidate B 검색
  └─ B의 Interview → Evaluation 결과 참조
  └─ AI_Recommendation 생성: "유사 프로필 3명의 면접 패턴 분석"
```

**AI 철학 체크리스트:**
- ✅ **투명성**: "같은 Backend 포지션 지원자 중 Python/Django 경력 3-5년 범위에서 3명 비교" (매칭 기준 명시)
- ✅ **오버라이드**: "이 비교 무시하고 면접 진행" 옵션 제공
- ✅ **학습 루프**: 면접관이 "유용했음" / "관련 없음" 피드백 제공 → 유사도 알고리즘 개선
- ✅ **명명**: "자동 추천" 대신 "유사 프로필 분석 제공" 사용
- ✅ **최종 결정권**: 분석은 참고용, 면접 질문과 평가는 면접관이 독립적으로 수행

**UI 예시:**
```
📊 유사 후보자 분석
이 후보자와 비슷한 프로필 3명의 면접 결과:

후보자 A (2024-08-15): 기술 역량 ★★★★☆, 문제 해결 약함
후보자 B (2024-09-20): 의사소통 ★★★★★, 코딩 테스트 통과
후보자 C (2024-10-10): 경력 과장 의심, 최종 면접 중단

💡 면접 포인트: Python 실무 경험 깊이 검증 권장

[상세 보기] [이 분석이 도움되었나요? 👍 👎] [무시하기]
```

**비즈니스 임팩트:**
- 면접 품질 향상 (구조화된 질문)
- 신입 면접관 온보딩 속도 향상
- 평가 일관성 개선

**MVP 범위:**
- Object: Candidate, Skill, Evaluation, AI_Recommendation
- Link: HAS_SKILL, EVALUATES, RECOMMENDS_FOR
- 속성 기반 유사도 매칭 (벡터 검색은 v2)

**측정 지표:**
- 면접관의 분석 활용률
- 분석 후 평가 점수의 일관성 증가
- 면접 준비 시간 단축
- 면접관 피드백 긍정률 (목표: 70% 이상)

---

#### **Use Case 3: 커뮤니케이션 품질 분석 및 알림**

**고객 문제:**
"이 후보자와 연락이 잘 안 되는데, 관심 없는 건가 아니면 우리가 놓친 건가?" - 리크루터의 고민

**온톨로지 활용:**
```
Query Pattern:
Recruiter → COMMUNICATES_WITH → Candidate
  └─ Communication.timestamp, response_time 분석
  └─ 반응 속도, 응답률, 질문 대응 품질 점수화
  └─ 낮은 점수 시 AI_Recommendation 생성: "Follow-up 권장"
```

**AI 철학 체크리스트:**
- ✅ **투명성**: "지난 7일간 3회 연락, 평균 응답 시간 48시간 (동일 포지션 평균 12시간)" (구체적 데이터 제시)
- ✅ **오버라이드**: "이 후보자는 관심 있음으로 표시" 또는 "알림 무시" 선택 가능
- ✅ **학습 루프**: 리크루터가 알림 후 실제 follow-up 했는지, 결과는 어땠는지 기록
- ✅ **명명**: "자동 스코어링" 대신 "소통 패턴 분석" 사용
- ✅ **최종 결정권**: 알림은 참고만, follow-up 시점과 방법은 리크루터가 결정

**UI 예시:**
```
💬 소통 패턴 분석
후보자: 김OO (Backend Developer)
상태: 응답 지연 감지

최근 소통 현황:
- 12/1: 이메일 발송 → 응답 없음
- 12/3: 리마인더 발송 → 48시간 후 응답
- 평균 응답 시간: 48시간 (통상 12시간)

💡 제안: 전화 또는 카카오톡으로 소통 채널 변경 권장

[전화 걸기] [다음 주 리마인더] [이 후보자는 관심 있음] [무시하기]
```

**비즈니스 임팩트:**
- 우수 후보자 이탈 방지
- 리크루터 업무 효율 향상
- 후보자 경험 개인화

**MVP 범위:**
- Object: Communication, Recruiter, Candidate, AI_Recommendation
- Link: COMMUNICATES_WITH, RECOMMENDS_FOR
- 단순 메트릭 (응답 시간, 빈도)

**측정 지표:**
- Offer acceptance rate 증가
- 후보자 NPS 개선
- 이탈률 감소 (특히 최종 단계)
- 알림 후 실제 follow-up 비율

---

#### **Use Case 4: 위험 시그널 조기 감지 (신규)**

**고객 문제:**
"이 후보자, 과거 비슷한 케이스에서 최종 단계 탈락 패턴 있는데 괜찮을까?" - diagnosis intent

**온톨로지 필요성:**
- 복잡한 관계 추론: Candidate → Similar Profiles → Past Evaluations → Pattern
- 유사도 계산 (3-hop 이상 조인)
- AI 추론 필요

**온톨로지 활용:**
```
Query Pattern:
Candidate A → Skill Profile
  → SIMILAR_TO → Candidate B, C, D (유사 프로필)
    → Application → StageTransition → "offer" stage dropout
      → Evaluation → feedback_text (탈락 이유 분석)
        → AI_Recommendation 생성: "위험 시그널 감지"
```

**AI 철학 체크리스트:**
- ✅ **투명성**: "유사 프로필 3명이 레퍼런스 체크에서 탈락" (구체적 근거 제시)
- ✅ **오버라이드**: "이 경고 무시하기" 버튼 제공
- ✅ **학습 루프**: user_action 기록 → AI_Recommendation.user_action에 저장 → 정확도 개선
- ✅ **명명**: "위험 시그널 감지" 사용 (자동 거부가 아님)
- ✅ **최종 결정권**: 알림만 제공, 실제 진행 여부는 사용자가 결정

**UI 예시:**
```
⚠️ 위험 시그널 감지

후보자: 김OO (Backend Developer)
패턴 발견: 유사 프로필 3명이 최종 단계에서 탈락

상세 근거:
- 후보자 A (2024-08): Python/Django 3년 경력, 레퍼런스 체크 탈락
- 후보자 B (2024-09): 동일 스킬셋, 문화 적합성 이슈
- 후보자 C (2024-11): 실무 경험 과장 의심

💡 제안: 레퍼런스 체크 강화 및 실무 경험 깊이 검증 권장

[근거 보기] [제안 적용] [무시하기] [피드백 남기기]
```

**비즈니스 임팩트:**
- 최종 단계 탈락률 15% 감소 (목표)
- 채용 ROI 향상
- **온톨로지의 진짜 가치 증명** (일반 DB로는 불가능)

**MVP 범위:**
- Object: Candidate, Skill, Evaluation, AI_Recommendation
- Link: HAS_SKILL, SIMILAR_TO (파생), EVALUATES, RECOMMENDS_FOR
- 유사도 계산: Phase 1은 단순 규칙 (skill 매칭), Phase 2는 ML 기반

**측정 지표:**
- 위험 시그널 정확도 (실제 탈락 예측 정확도 70%+)
- 알림 후 실제 조치 비율 (60%+)
- 최종 단계 탈락률 감소 (15% 목표)
- AI 제안 수락률 (60% 이상)

---

### 2.2 MVP 최소 온톨로지 범위

**Phase 1 (MVP): 프로세스 가시화 및 AI 의사결정 지원**

최소한의 객체와 관계로 즉시 가치를 제공합니다.

**포함 Objects (9개):**
1. Candidate
2. Job Posting
3. Application
4. Recruitment Stage
5. Stage Transition (+ temporal_reference 속성 추가)
6. Interview (+ temporal_reference 속성 추가)
7. Evaluation
8. **AI_Recommendation** ← AI 철학 구현을 위한 핵심 객체
9. **Skill** ← Phase 3에서 MVP로 승격 (Use Case 4 필수)

**AI_Recommendation Object 상세:**
```
AI_Recommendation {
  recommendation_id: "rec_001"
  type: "risk_signal" | "bottleneck_alert" | "similar_candidate"
  target_entity_type: "Candidate" | "Application" | "Job Posting"
  target_entity_id: "app_123"
  confidence_score: 0.85  // 0-1 scale
  reasoning: "이 후보자와 유사한 프로필 3명이 레퍼런스 체크에서 탈락"
  suggested_action: "레퍼런스 체크 강화 권장"
  created_at: "2025-12-03T10:30:00Z"
  user_action: "accepted" | "rejected" | "ignored" | null
  user_action_timestamp: "2025-12-03T11:15:00Z"
  rejection_reason: "이번 케이스는 다른 맥락이 있음"
  feedback_text: "해당 후보자는 내부 추천"
}
```

**Skill Object 상세:**
```
Skill {
  skill_id: "skill_001"
  name: "Python"  // 또는 "Django", "Backend Architecture" 등
  category: "technical" | "soft" | "domain"
  proficiency_levels: ["beginner", "intermediate", "advanced", "expert"]
  related_skills: ["skill_002", "skill_003"]  // 연관 스킬 (예: Python과 Django)
  description: "프로그래밍 언어 Python"
}
```

**temporal_reference 속성 추가 (Interview, StageTransition):**

데이터 정확성을 위해 "계획된 시점" vs "실제 시점"을 구분합니다.

```
Interview {
  interview_id: "int_001"
  scheduled_date: "2025-12-05T14:00:00Z"  // 일정 잡힌 시간
  actual_date: "2025-12-05T14:15:00Z"     // 실제 진행 시간
  completion_status: "completed" | "scheduled" | "cancelled"
  type: "phone" | "video" | "onsite"
  duration_minutes: 60
}

StageTransition {
  transition_id: "st_001"
  application_id: "app_123"
  from_stage: "phone_screen"
  to_stage: "technical_interview"
  scheduled_timestamp: "2025-12-01T10:00:00Z"  // 계획된 전환 시점
  actual_timestamp: "2025-12-01T10:30:00Z"     // 실제 전환 시점
  duration_in_prev_stage_hours: 48
  triggered_by: "recruiter_456"
  completion_status: "completed" | "scheduled" | "cancelled"
}
```

**temporal_reference 활용 예시:**
- Use Case 1 (리드타임 분석): "계획 대비 실제 지연 시간" 측정
- Use Case 4 (위험 시그널): "일정 지연이 탈락과 상관관계" 패턴 분석

**포함 Links (9개):**
1. APPLIES_TO (Candidate → Job Posting)
2. CREATES (Application → Candidate)
3. PROGRESSES_TO (Stage Transition → Recruitment Stage)
4. SCHEDULES (Interview → Application)
5. EVALUATES (Interviewer → Candidate)
6. **RECOMMENDS_FOR** (AI_Recommendation → Target Entity) ← 학습 루프 구현
7. **HAS_SKILL** (Candidate → Skill) ← Use Case 4 필수
8. **REQUIRES_SKILL** (Job Posting → Skill) ← Use Case 4 필수
9. **SIMILAR_TO** (Candidate → Candidate, 파생) ← Use Case 2, 4 필수

**새로운 Links 상세:**

```
HAS_SKILL (Candidate → Skill)
  Properties:
    - proficiency_level: "beginner" | "intermediate" | "advanced" | "expert"
    - years_of_experience: number
    - verified: boolean  // 실제 검증 여부
    - source: "resume" | "interview" | "test"

REQUIRES_SKILL (Job Posting → Skill)
  Properties:
    - required_level: "beginner" | "intermediate" | "advanced" | "expert"
    - is_mandatory: boolean  // 필수 vs 우대
    - priority: number  // 우선순위 (1-10)

SIMILAR_TO (Candidate → Candidate, 파생 Link)
  Properties:
    - similarity_score: 0.0 - 1.0  // 유사도 점수
    - matching_skills: [Skill.skill_id]  // 매칭된 스킬 목록
    - calculation_method: "skill_overlap" | "ml_embedding"
  Note: 자동 계산되는 파생 Link
```

**이 범위로 가능한 것:**
- Use Case 1: 리드타임 예측 ✅
- Use Case 2: 유사 후보자 분석 ✅ (Skill 기반 유사도)
- Use Case 3: 커뮤니케이션 품질 ❌ (Phase 2)
- Use Case 4: 위험 시그널 조기 감지 ✅ (신규)

**MVP 성공 기준 (온톨로지 가치 증명):**

**목표:** "온톨로지가 왜 필요한지" 명확히 증명

**성공 지표:**
1. **배포 타임라인**
   - 3개월 내 배포

2. **온톨로지 필요 Use Case 검증**
   - Use Case 1, 2, 4 중 **최소 2개의 측정 가능한 개선**
   - Use Case 1: 병목 알림 정확도 ±3일 이내
   - Use Case 2 or 4: AI 추천 수락률 60% 이상

3. **온톨로지 vs 일반 DB 비교 증명**
   - 복잡한 관계 쿼리 (3-hop 이상): 일반 DB 대비 **2배 이상 빠름**
   - 유사도 계산 정확도: 사용자 검증 **70% 이상**
   - 맥락 기반 분석: 일반 SQL로는 구현 **불가능** 증명

4. **PM 자율성**
   - PM이 스키마 변경 없이 새 쿼리 생성 가능

**비교 대상 (일반 시스템):**
- Query Template 시스템 (PostgreSQL jsonb)
- 단순 조회/모니터링 (일반 SQL)
- 반복 쿼리 자동화

→ MVP는 **"온톨로지가 왜 필요한지"를 데이터로 증명**

---

### 2.3 단계적 확장 전략

#### **Phase 2: 사람 및 평가 심화 (MVP + 3개월)**

**추가 Objects:**
- Hiring Manager
- Interviewer
- Recruiter
- Communication
- Evaluation Rubric

**추가 Links:**
- RECOMMENDS (Hiring Manager → Candidate)
- COMMUNICATES_WITH (Recruiter ↔ Candidate)
- USES_RUBRIC (Evaluation → Evaluation Rubric)

**새로운 Use Cases:**
- Use Case 3: 커뮤니케이션 품질 스코어링 활성화
- Use Case 4: 평가자 캘리브레이션 (평가 일관성 분석)
- Use Case 5: 채용 관리자 의사결정 패턴 분석

---

#### **Phase 3: 지식 그래프 및 AI 통합 (MVP + 6개월)**

**추가 Objects:**
- Assessment Template
- Task
- Department
- Historical Performance (과거 채용 성공 사례 패턴)

**추가 Links:**
- ASSIGNS (Recruiter → Application)
- BELONGS_TO (Job Posting → Department)
- USES_TEMPLATE (Interview → Assessment Template)

**새로운 Use Cases:**
- Use Case 6: 부서별 채용 효율성 벤치마킹
- Use Case 7: 자동 작업 우선순위 제안
- Use Case 8: 평가 템플릿 최적화 추천

**AI 통합 고도화:**
- LLM이 면접 스크립트에서 Skill 자동 추출
- 평가 피드백에서 감정 분석
- 지식 그래프 임베딩으로 의미론적 검색
- ML 기반 유사도 계산 (MVP는 규칙 기반)

---

#### **Phase 4: 예측 및 최적화 (MVP + 12개월)**

**고도화 영역:**
- Historical Performance Object (과거 채용 성공 사례 패턴)
- External Data Integration (LinkedIn, 업계 벤치마크)
- Predictive Models (채용 성공 확률, 퇴사 리스크)

**새로운 Use Cases:**
- Use Case 9: 채용 ROI 예측
- Use Case 10: 최적 면접 패널 구성 추천
- Use Case 11: 시장 경쟁력 분석 (유사 포지션 비교)

---

## 3. 유지보수 용이성

### 3.1 PM의 온톨로지 관리 방법 (비개발자 관점)

PM이 온톨로지를 관리하려면 **비주얼 도구**와 **명확한 규칙**이 필요합니다.

#### **도구 1: 온톨로지 맵 (Visual Schema Editor)**

**필요 기능:**
- Drag & Drop으로 Object 추가
- Click으로 Link 연결
- 속성 정의 시 데이터 타입 선택 (텍스트, 숫자, 날짜, 참조)
- 변경 사항을 자연어로 설명 입력 (버전 이력)

**PM 워크플로우:**
```
1. 고객 인터뷰에서 새로운 니즈 발견
   → "후보자의 선호 근무 위치를 추적하고 싶다"

2. 온톨로지 맵에서 Candidate Object 선택
   → "preferred_work_location" 속성 추가
   → 데이터 타입: 다중 선택 (Remote, Hybrid, Onsite)

3. 변경 설명 입력: "원격 근무 선호도 매칭을 위해 추가"

4. "저장 및 배포" 버튼 → 개발팀 자동 알림
```

**실제 도구 예시:**
- Palantir Ontology Manager (참고용)
- Notion-style 인터페이스로 스키마 편집
- GitHub 연동하여 변경 이력 자동 커밋

---

#### **도구 2: 쿼리 빌더 (No-Code Query Builder)**

PM이 SQL이나 GraphQL 없이 데이터를 조회할 수 있어야 합니다.

**필요 기능:**
- "다음과 같은 후보자 찾기" 인터페이스
- 필터 조건을 자연어 + 폼으로 입력
- 결과를 테이블/차트로 즉시 확인

**PM 워크플로우:**
```
질문: "최근 30일간 Technical Interview 단계에서
       평균 7일 이상 머문 후보자는?"

쿼리 빌더 입력:
  Object: Application
  Filter 1: current_stage = "technical_interview"
  Filter 2: current_stage_entered_at > (today - 30일)
  Filter 3: (today - current_stage_entered_at) > 7일

  → 실행 → 결과 23명
  → "알림 규칙으로 저장" 클릭
```

**실제 도구 예시:**
- Airtable-style 인터페이스
- Retool / Appsmith 같은 Low-Code 플랫폼
- 자체 Admin 페이지에 내장

---

#### **도구 3: 온톨로지 품질 대시보드**

PM이 온톨로지 건강도를 모니터링합니다.

**모니터링 지표:**
- **데이터 완성도**: 필수 속성 채워진 비율
  - 예: Candidate.email 99%, Candidate.phone 78% ← 개선 필요
- **관계 연결도**: 고아 객체(orphan) 비율
  - 예: Interview와 연결 안 된 Evaluation 5건 발견
- **스키마 활용도**: 정의했지만 사용 안 되는 Object/Link
  - 예: AssessmentTemplate 정의했지만 데이터 0건 → 삭제 고려
- **쿼리 성능**: 자주 쓰는 쿼리의 응답 시간
  - 예: "후보자 목록 조회" 3초 → 인덱스 추가 필요

**PM 액션:**
- 주간 리뷰로 품질 하락 조기 감지
- 개발팀에게 구체적인 개선 요청
- 사용 안 되는 스키마 정리

---

### 3.2 스키마 변경이 용이한 구조

온톨로지는 비즈니스 요구사항에 따라 진화해야 합니다. 변경에 유연한 설계 원칙:

#### **원칙 1: 속성 추가는 자유롭게, 삭제는 신중하게**

**좋은 예:**
```
Candidate Object v1.0:
  - name
  - email
  - phone

Candidate Object v1.1 (새 속성 추가):
  - name
  - email
  - phone
  - linkedin_url  ← 신규 추가
  - preferred_salary_range  ← 신규 추가
```
→ 기존 데이터 영향 없음, 새 데이터부터 수집

**나쁜 예:**
```
Candidate Object v2.0 (속성 삭제):
  - name
  - email
  - [phone 삭제]  ← 기존 쿼리 및 UI 깨짐
```
→ 삭제 대신 "deprecated" 태그 후 단계적 마이그레이션

**PM 규칙:**
- 새 속성 추가는 즉시 가능 (선택적 속성으로)
- 기존 속성 삭제는 6개월 deprecation period 필수
- 속성명 변경은 alias 사용 (old_name → new_name 동시 지원)

---

#### **원칙 2: Link Type은 명시적으로, 방향성 명확히**

**좋은 예:**
```
Link: EVALUATES
  From: Interviewer
  To: Candidate
  Properties:
    - timestamp (required)
    - score (required)
    - feedback_text (optional)
```
→ 방향이 명확: "누가 누구를 평가했나"
→ 역관계도 정의: EVALUATED_BY (자동 생성 가능)

**나쁜 예:**
```
Link: EVALUATION_RELATION
  From: Interviewer
  To: Candidate
  (방향성 모호, "누가 주체인지" 불분명)
```

**PM 규칙:**
- 모든 Link는 자연어 문장으로 설명 가능해야 함
  - "Interviewer EVALUATES Candidate" ✅
  - "Candidate EVALUATION_RELATION Interviewer" ❌
- 양방향 관계도 두 개의 명시적 Link로 정의
  - MANAGES / MANAGED_BY (상하 관계)
  - COLLABORATES_WITH (대등 관계)

---

#### **원칙 3: 버전 관리는 Object 단위로**

**스키마 버전 추적:**
```
Candidate Object:
  schema_version: "1.2"
  created_at: "2024-01-15"
  last_modified: "2025-12-01"
  change_log:
    - v1.0: Initial definition
    - v1.1: Added linkedin_url, preferred_salary_range
    - v1.2: Added diversity_self_identification (optional)
```

**PM 워크플로우:**
- 매 분기 스키마 리뷰 미팅
- 변경 사항을 릴리즈 노트로 문서화
- Major 변경은 버전 번호 증가 (1.x → 2.0)

---

### 3.3 데이터 품질 관리 포인트

온톨로지는 데이터 품질이 생명입니다. PM이 관리해야 할 세 가지 레벨:

#### **Level 1: 입력 시점 검증 (Real-time Validation)**

**검증 규칙 예시:**
- **필수 속성 검사**: Candidate.email 없으면 저장 불가
- **형식 검증**: email은 @포함, phone은 숫자만
- **범위 검증**: Evaluation.score는 1-5 사이
- **관계 무결성**: Interview는 반드시 Application과 연결

**PM 설정 방법:**
- Object 정의 시 "required" 체크박스
- 속성 타입 선택 시 validation rule 템플릿 제공
- 에러 메시지 직접 작성 (사용자 친화적)

---

#### **Level 2: 주기적 품질 감사 (Periodic Audit)**

**감사 체크리스트:**
- **중복 데이터**: 같은 이메일의 Candidate 2개 이상?
- **고아 객체**: Interview와 연결 안 된 Evaluation?
- **시간적 모순**: Interview.scheduled_date > Evaluation.timestamp?
- **이상치 탐지**: Stage 체류 시간이 평균의 3배 이상?

**PM 워크플로우:**
- 매주 월요일 자동 리포트 수신
- 이슈 발견 시 담당자에게 할당
- 해결 후 규칙 업데이트 (재발 방지)

---

#### **Level 3: 의미적 일관성 검증 (Semantic Consistency)**

**일관성 규칙 예시:**
- "Offer Accepted" 상태인데 StageTransition 없음 → 데이터 누락
- 평가 점수는 높은데 탈락 → 리뷰 필요
- 커뮤니케이션 0건인데 Interview 진행 → 프로세스 이상

**PM 액션:**
- 월간 "데이터 이상 리뷰" 미팅
- 패턴 발견 시 프로세스 개선
- AI 모델이 이상 패턴 자동 탐지하도록 학습

---

## 4. 실행 플랜

### 4.1 온톨로지 설계 프로세스 (8주 Sprint)

#### **Week 1-2: Discovery & Domain Modeling**

**PM 주도 활동:**
1. **고객 인터뷰 (5-7명)**
   - 채용 담당자, 면접관, 채용 관리자 각 2명씩
   - 질문: "채용 의사결정 시 가장 중요한 정보는?"
   - 질문: "지금 ATS에서 부족한 정보는?"
   - 질문: "후보자 비교 시 어떤 기준을 사용하나?"

2. **현재 데이터 인벤토리 작성**
   - 기존 DB 테이블 목록
   - 각 테이블의 핵심 컬럼 및 관계
   - 데이터 품질 현황 (NULL 비율, 중복 등)

3. **워크플로우 맵핑**
   - 지원 접수부터 입사까지 단계별 프로세스
   - 각 단계의 입력/출력 데이터
   - 의사결정 포인트 식별

**Deliverable:**
- Domain Model v0.1 (핵심 Objects 10-15개)
- Use Case 리스트 (우선순위 포함)

---

#### **Week 3-4: Ontology Schema Design**

**온톨로지 아키텍트 주도 (Forry):**
1. **Object Type 정의**
   - 각 Object의 속성 목록
   - 필수/선택 구분
   - 데이터 타입 및 제약조건

2. **Link Type 정의**
   - 관계의 방향성 및 카디널리티
   - 관계 속성 (timestamp, metadata)
   - 역관계 명명

3. **시간성 모델링**
   - 현재 상태 vs 이력 분리 전략
   - Event Sourcing 적용 범위
   - 집계 메트릭 설계

**PM 리뷰 포인트:**
- "이 구조로 우리 Use Case가 해결되나?"
- "PM이 이해할 수 있는 명명인가?"
- "향후 확장 시 스키마 변경 범위는?"

**Deliverable:**
- Ontology Schema v1.0 (문서)
- 관계 다이어그램 (시각화)
- 샘플 데이터 예시

---

#### **Week 5-6: Prototype & Validation**

**개발팀 협업:**
1. **MVP 구현**
   - 핵심 3-5개 Object만 우선 구현
   - 단순 CRUD API 제공
   - 샘플 데이터 100건 입력

2. **쿼리 테스트**
   - Use Case 1-2개를 실제 쿼리로 구현
   - 성능 측정 (응답 시간, 메모리)
   - 결과의 정확성 검증

3. **PM 접근성 테스트**
   - PM이 직접 쿼리 빌더 사용
   - 스키마 변경 시뮬레이션
   - 피드백 수집

**Validation 체크리스트:**
- [ ] Use Case 쿼리가 5초 내 응답
- [ ] PM이 30분 교육으로 쿼리 작성 가능
- [ ] 스키마 변경이 기존 데이터 깨트리지 않음

**Deliverable:**
- Working Prototype (데모 가능)
- 성능 테스트 리포트
- PM 피드백 반영 사항

---

#### **Week 7-8: Refinement & Documentation**

**최종 다듬기:**
1. **스키마 최적화**
   - 불필요한 Object/Link 제거
   - 속성명 일관성 확보
   - 인덱스 전략 수립

2. **문서화**
   - Ontology Handbook (PM용)
   - 각 Object/Link의 비즈니스 의미 설명
   - Use Case별 쿼리 예제
   - 데이터 품질 가이드

3. **교육 자료 제작**
   - PM/리크루터용 튜토리얼 영상
   - 개발팀용 기술 문서
   - FAQ 및 트러블슈팅 가이드

**Deliverable:**
- Ontology Schema v1.0 Final
- Documentation Package
- Rollout Plan

---

### 4.2 PM vs 개발팀 역할 분담

#### **PM이 주도하는 작업**

| 작업 | 설명 | 도구 | 소요 시간 |
|------|------|------|----------|
| Use Case 정의 | 고객 가치 및 우선순위 결정 | 인터뷰, 기회 맵 | 2주 |
| Object 명명 | 비즈니스 용어로 엔티티 이름 짓기 | 워크숍 | 1주 |
| 속성 식별 | 각 Object가 가져야 할 정보 리스트 | 스프레드시트 | 1주 |
| 검증 규칙 정의 | 필수 항목, 형식, 범위 설정 | 체크리스트 | 3일 |
| 문서화 | 비개발자가 이해 가능한 설명 작성 | Markdown | 1주 |
| 품질 모니터링 | 주기적 데이터 품질 리뷰 | 대시보드 | 지속적 |

**PM 성공 기준:**
- 개발팀에게 "왜 이 구조가 필요한지" 명확히 설명 가능
- 고객 문제를 온톨로지 쿼리로 번역 가능
- 스키마 변경의 비즈니스 임팩트 평가 가능

---

#### **개발팀이 주도하는 작업**

| 작업 | 설명 | 기술 스택 | 소요 시간 |
|------|------|----------|----------|
| 물리적 스키마 설계 | DB 테이블, 인덱스, 파티셔닝 | PostgreSQL, Neo4j | 2주 |
| API 구현 | CRUD, 쿼리 엔드포인트 개발 | GraphQL, REST | 3주 |
| 성능 최적화 | 쿼리 튜닝, 캐싱 전략 | Redis, indexing | 1주 |
| 데이터 마이그레이션 | 기존 데이터를 새 스키마로 변환 | ETL scripts | 2주 |
| 보안 및 권한 | 누가 어떤 데이터를 볼 수 있는가 | RBAC, encryption | 1주 |
| 모니터링 구축 | 로그, 메트릭, 알림 | Prometheus, Grafana | 1주 |

**개발팀 성공 기준:**
- PM이 정의한 Use Case를 코드로 구현
- 성능 SLA 충족 (95 percentile < 2초)
- 스키마 변경 시 무중단 배포 가능

---

#### **협업이 필요한 작업**

| 작업 | PM 역할 | 개발팀 역할 | 협업 방식 |
|------|----------|------------|----------|
| Link Type 정의 | 비즈니스 관계 정의 | 카디널리티 및 제약조건 설정 | 페어 디자인 세션 |
| 샘플 데이터 생성 | 실제 시나리오 제공 | 데이터 형식 맞춤 | 함께 입력 |
| 쿼리 최적화 | "느린 쿼리" 리포트 | 인덱스/리팩토링 | 주간 리뷰 |
| 에러 처리 | 사용자 메시지 작성 | 예외 처리 로직 | PR 코멘트 |
| 릴리즈 계획 | 기능 우선순위 결정 | 기술적 의존성 식별 | Sprint Planning |

---

### 4.3 검증 방법 (온톨로지 품질 체크리스트)

#### **Level 1: 구조적 완성도 (Structural Completeness)**

온톨로지 자체가 논리적으로 일관된가?

**체크리스트:**
- [ ] 모든 Object에 명확한 정의가 있는가?
- [ ] 모든 Link에 방향성과 역관계가 정의되었는가?
- [ ] 고아 Object가 없는가? (아무 Link도 없는 Object)
- [ ] 순환 참조가 의도된 것인가? (A → B → C → A)
- [ ] 필수 속성이 비즈니스 규칙과 일치하는가?

**검증 방법:**
- 온톨로지 다이어그램을 프린트하여 벽에 붙임
- 팀 전체가 30분간 "이상한 점" 찾기
- 각 Object/Link를 자연어 문장으로 설명해보기

---

#### **Level 2: Use Case 커버리지 (Use Case Coverage)**

우선순위 Use Case가 실제로 해결되는가?

**체크리스트:**
- [ ] 각 Use Case를 쿼리로 표현 가능한가?
- [ ] 쿼리 실행 시 예상 결과가 나오는가?
- [ ] 엣지 케이스도 처리 가능한가? (데이터 없음, 복수 결과 등)
- [ ] 성능이 사용자 기대치를 충족하는가? (< 3초)
- [ ] 결과를 UI에 표시할 수 있는가?

**검증 방법:**
- Use Case마다 "성공 시나리오" 작성
- 실제 데이터 100건으로 E2E 테스트
- PM이 직접 쿼리 빌더로 실행해보기

---

#### **Level 3: 확장성 (Scalability)**

미래 요구사항에 대응 가능한가?

**체크리스트:**
- [ ] 새 Object 추가 시 기존 쿼리가 깨지지 않는가?
- [ ] 새 Link 추가 시 순환 참조가 생기지 않는가?
- [ ] 속성 추가 시 NULL 처리가 명확한가?
- [ ] 데이터가 10배 증가해도 쿼리 성능이 유지되는가?
- [ ] 새 Use Case 요청 시 스키마 변경 없이 대응 가능한가?

**검증 방법:**
- "만약 이런 기능이 추가된다면?" 시나리오 10개 작성
- 각 시나리오가 현재 스키마로 가능한지 평가
- 불가능한 경우 필요한 변경 범위 추정

---

#### **Level 4: 유지보수성 (Maintainability)**

PM과 개발팀이 지속적으로 관리 가능한가?

**체크리스트:**
- [ ] PM이 30분 내에 새 쿼리를 작성할 수 있는가?
- [ ] 개발자가 스키마를 보고 즉시 이해 가능한가?
- [ ] 변경 이력이 명확히 기록되는가?
- [ ] 데이터 품질 이슈를 1시간 내에 발견 가능한가?
- [ ] 장애 발생 시 원인을 빠르게 추적 가능한가?

**검증 방법:**
- 신규 팀원에게 온톨로지 설명 (30분)
- 그 자리에서 간단한 쿼리 작성 요청
- 이해하지 못한 부분 기록 → 문서 개선

---

#### **Level 5: 비즈니스 임팩트 (Business Impact)**

실제로 고객 문제가 해결되었는가?

**측정 지표:**
- **정성적:**
  - 채용 담당자 만족도 (NPS)
  - "이전보다 의사결정이 빨라졌다" 동의 비율
  - 면접관 피드백: "후보자 맥락 파악이 쉬워졌다"

- **정량적:**
  - 평균 채용 소요 시간 감소 (%)
  - 후보자 이탈률 감소 (%)
  - 오퍼 수락률 증가 (%)
  - 리크루터의 후속 질문 빈도 감소 (%)

**검증 방법:**
- 배포 전 3개월 vs 배포 후 3개월 비교
- A/B 테스트 (일부 팀만 먼저 사용)
- 월간 회고에서 개선 사례 수집

---

#### **Level 6: AI 철학 준수 (AI Philosophy Compliance)**

AI 기능이 라운드의 AI 철학을 준수하는가?

**체크리스트:**
- [ ] **투명성 검증**
  - AI 분석 결과에 "근거 보기" 기능이 있는가?
  - 근거 설명이 3줄 이내로 명확한가?
  - 온톨로지 추론 경로가 자연어로 표현되는가?
  - 사용된 데이터 개수(N)가 명시되는가?

- [ ] **오버라이드 검증**
  - 모든 AI 제안에 "무시하기" 버튼이 있는가?
  - 오버라이드 시 워크플로우가 정상 진행되는가?
  - 거부 이유를 선택/입력할 수 있는가?
  - 오버라이드 데이터가 AI_Recommendation Object에 기록되는가?

- [ ] **학습 루프 검증**
  - 사용자 행동(수락/거부)이 온톨로지에 저장되는가?
  - 주기적으로 AI 정확도를 계산하는 프로세스가 있는가?
  - 정확도 개선 현황을 사용자에게 공유하는가?
  - 오버라이드 패턴 분석이 모델 개선에 활용되는가?

- [ ] **명명 및 메시징 검증**
  - "자동", "추천" 같은 자동화 암시 용어를 피했는가?
  - "분석 제공", "알림", "제안" 등 지원 중심 용어를 사용하는가?
  - UI 텍스트가 "AI가 대신 결정"이 아닌 "AI가 도움"을 강조하는가?

- [ ] **최종 결정권 검증**
  - 사용자가 AI 없이도 모든 업무를 수행 가능한가?
  - AI 제안을 무시해도 데이터 손실이 없는가?
  - "AI 의존도"가 아닌 "AI 활용도"를 KPI로 측정하는가?

**검증 방법:**
- 각 Use Case별로 위 체크리스트 전체 통과 확인
- 사용자 테스트에서 "AI가 의사결정을 대신한다고 느꼈나?" 질문
- 월간 오버라이드 비율 모니터링 (30-50%가 건강한 범위)
- AI_Recommendation Object의 user_action 분포 분석

**목표 지표:**
- AI 제안 오버라이드율: 30-50% (너무 낮으면 사용자가 맹신, 너무 높으면 AI 무용)
- "AI가 의사결정을 도와줬다" 긍정 응답: 80% 이상
- "AI에게 의존하게 됐다" 우려 응답: 20% 미만

---

## 5. 리스크와 함정

### 5.1 온톨로지 설계 시 흔한 실수

#### **실수 1: 과도한 추상화 (Over-Abstraction)**

**증상:**
```
Object: Entity
Properties:
  - entity_id
  - entity_type
  - entity_data (JSON blob)
```
→ 모든 것을 하나의 범용 Object에 우겨넣음

**문제점:**
- 타입 안정성 상실
- 쿼리 복잡도 폭증
- PM이 이해 불가

**올바른 접근:**
- 구체적인 도메인 Object 정의 (Candidate, Job, Interview)
- 공통 속성은 상속이 아닌 Link로 표현

---

#### **실수 2: 정규화 과도 vs 부족**

**과도한 정규화:**
```
Candidate → Phone (separate table)
  → Email (separate table)
  → Address (separate table)
```
→ 쿼리마다 5개 조인 필요

**부족한 정규화:**
```
Candidate:
  - phone1, phone2, phone3
  - email1, email2, email3
```
→ 확장 불가, 검색 어려움

**올바른 접근:**
- 1:N 관계는 별도 Object (Candidate → ContactInfo)
- 1:1 관계는 내장 속성 (Candidate.primary_email)

---

#### **실수 3: 시간성 무시 (Ignoring Temporality)**

**잘못된 모델:**
```
Candidate:
  - status: "interviewed"  // 언제? 누가 바꿨나?
```

**올바른 모델:**
```
Candidate:
  - current_status: "interviewed"

StatusChange (separate Object):
  - candidate_id
  - from_status: "phone_screen"
  - to_status: "interviewed"
  - timestamp: "2025-12-01T10:30:00Z"
  - changed_by: "recruiter_456"
```

---

#### **실수 4: Link 속성을 Object 속성으로 저장**

**잘못된 위치:**
```
Evaluation:
  - candidate_id
  - score: 4.5
  - interviewer_name: "John Doe"  ← Link 정보를 중복 저장
```

**올바른 구조:**
```
Evaluation:
  - score: 4.5

Link: EVALUATES
  From: Interviewer (id: john_doe)
  To: Candidate
  Via: Evaluation
```

---

#### **실수 5: AI 철학 무시 (Ignoring AI Philosophy)**

**증상:**
```
UI 텍스트: "AI가 자동으로 부적합 후보자를 걸러냈습니다"
버튼: [다음 후보자 보기] (오버라이드 옵션 없음)
근거: 표시 안 됨
```
→ 사용자가 AI를 신뢰하지 않거나 반대로 맹신하게 됨

**문제점:**
- 투명성 부족 → "왜 이 결정을 내렸지?" 불신 발생
- 오버라이드 불가 → "AI가 틀렸는데 바로잡을 수 없어" 좌절
- 학습 루프 없음 → AI 정확도가 개선되지 않음
- 자동화 메시징 → "내 일자리를 빼앗는 건가?" 저항

**올바른 접근:**
```
✅ UI 설계:
⚠️ 위험 시그널 감지

후보자: 김OO (Backend Developer)
근거: 유사 프로필 3명이 레퍼런스 체크에서 탈락 (상세 보기)
제안: 레퍼런스 체크 강화 권장

[제안 적용] [무시하기] [피드백 남기기]

✅ 온톨로지 구조:
- AI_Recommendation Object로 모든 AI 제안 기록
- user_action 필드로 수락/거부 추적
- rejection_reason으로 학습 데이터 수집

✅ KPI 설정:
- ❌ "AI 자동화율" (자동화를 목표로 하면 안 됨)
- ✅ "AI 제안 활용도" (사용자가 도움 받는 정도)
- ✅ "AI 제안 정확도" (오버라이드 패턴 기반)
```

**PM 체크리스트:**
- [ ] 모든 Use Case에 AI 철학 체크리스트 적용했나?
- [ ] UI mockup에 "무시하기" 버튼이 명확히 보이는가?
- [ ] AI_Recommendation Object가 MVP 스키마에 포함되었나?
- [ ] 개발팀에게 "AI는 지원, 자동화 아님" 철학을 공유했나?
- [ ] 마케팅 메시지에 "자동", "추천" 대신 "분석", "알림" 사용하는가?

---

#### **실수 6: 온톨로지를 모든 문제에 적용 (Over-Engineering)**

**증상:**
- 단순 조회도 온톨로지 쿼리로 구현
- QueryTemplate, Privacy 같은 일반 기능까지 온톨로지 Objects로 설계
- 복잡도만 증가, 성능 저하, 개발 속도 감소

**실제 사례 (타 프로젝트):**
```
잘못된 접근:
"이번 주 몇 명?" 같은 단순 COUNT 쿼리에 Graph DB 사용

결과:
- 쿼리 응답 시간: 0.5초 → 3초 (6배 느림)
- 개발 공수: 일반 SQL 1일 vs 온톨로지 설계 1주
- 유지보수: 온톨로지 전문가만 수정 가능
```

**올바른 접근:**

**1. 온톨로지 적용 기준 명확화**
   - 복잡한 관계 추론 (3-hop 이상 조인)
   - 맥락 기반 AI 분석
   - 유사도 계산 및 패턴 추론

**2. 일반 DB로 충분한 것은 일반 DB 사용**
   - 단순 조회/집계 (SELECT, COUNT, SUM)
   - 반복 쿼리 템플릿 (PostgreSQL jsonb)
   - 권한 제어 (RBAC - Keycloak/Auth0)
   - 대화 상태 관리 (Redis)

**3. MVP는 온톨로지 가치 증명에 집중**
   - Use Case 1, 2, 4 (온톨로지 필요)
   - 나머지 80-85%는 일반 시스템

**PM 가이드 (새 Use Case 추가 시):**
```
질문 체크리스트:
1. "일반 SQL로 안 되나?" → Yes면 일반 DB
2. "3-hop 이상 조인 필요한가?" → No면 일반 DB
3. "유사도/패턴 추론 필요한가?" → No면 일반 DB
4. "AI 맥락 분석 필요한가?" → No면 일반 DB

→ 온톨로지 필요성 3가지 조건 중 1개 이상 충족 시에만 추가
```

**경고 신호 (Over-Engineering 징후):**
- [ ] 온톨로지 Objects가 20개 이상 (MVP 단계)
- [ ] 단순 조회 쿼리가 3초 이상 걸림
- [ ] PM이 새 쿼리 작성 못함 (너무 복잡)
- [ ] 개발팀이 "이거 왜 온톨로지로 하나요?" 질문 반복

**해결책:**
- 분기마다 "온톨로지 범위 리뷰" 미팅
- 성능 벤치마크: 온톨로지 vs 일반 DB 비교
- 사용 빈도 낮은 Objects 삭제 또는 일반 DB 이동

---

### 5.2 PM이 주의해야 할 점

#### **주의 1: 기술 용어에 속지 말기**

**위험한 대화:**
- 개발자: "정규화된 3NF 스키마로 설계했습니다"
- PM: "음... 좋네요?" (이해 못함)

**올바른 질문:**
- PM: "이 구조로 '유사 후보자 찾기'를 어떻게 쿼리하나요?"
- PM: "새 속성 추가 시 며칠 걸리나요?"
- PM: "이 관계를 자연어로 설명하면?"

→ **비즈니스 언어로 검증하기**

---

#### **주의 2: "완벽한 스키마" 추구의 함정**

**위험한 사고:**
- "모든 미래 Use Case를 지금 다 고려해야 해"
- "스키마가 완벽해질 때까지 개발 시작 못해"

**올바른 접근:**
- MVP 스키마로 빠르게 출시
- 실제 사용 데이터로 문제점 발견
- 분기마다 스키마 리팩토링 계획

→ **진화하는 온톨로지 수용하기**

---

#### **주의 3: 데이터 품질 과소평가**

**위험한 가정:**
- "스키마만 잘 만들면 데이터는 알아서 채워질 거야"

**현실:**
- 필수 속성 50% NULL
- 중복 데이터 10%
- 오래된 데이터 정리 안 됨

**올바른 계획:**
- 데이터 품질 = 온톨로지 설계만큼 중요
- 입력 검증 + 주기적 감사 + 자동 정제
- PM이 품질 지표를 KPI로 추적

---

#### **주의 4: PM 전용 도구 없이 시작**

**위험한 상황:**
- PM이 개발자에게 쿼리 요청 → 2일 대기
- 스키마 변경 시 개발자 회의 소집 → 1주 소요

**올바른 준비:**
- Day 1부터 PM용 쿼리 빌더 구축
- 온톨로지 시각화 도구 필수
- 셀프서비스 분석 환경 제공

→ **PM의 자율성 = 실행 속도**

---

#### **주의 5: 고객 검증 생략**

**위험한 프로세스:**
1. PM이 온톨로지 설계
2. 개발팀 구현
3. 배포
4. 고객: "이거 우리가 원한 게 아닌데요?"

**올바른 프로세스:**
1. PM이 온톨로지 설계
2. **고객에게 프로토타입 보여주기** ← 필수
3. 피드백 반영
4. 개발팀 구현
5. 배포

→ **Prototype으로 조기 검증**

---

## 6. 다음 단계 (Immediate Actions)

### 6.1 이번 주에 할 일 (Week 1)

**PM (Terry):**
- [ ] 채용 담당자 3명 인터뷰 일정 잡기
- [ ] 현재 ATS DB 스키마 확보 (개발팀 요청)
- [ ] Use Case 초안 5개 작성 (이 문서 섹션 2.1 참고)
- [ ] 온톨로지 프로젝트 킥오프 미팅 예약 (개발팀 + Forry)

**온톨로지 아키텍트 (Forry):**
- [ ] Domain Model v0.1 스케치 (핵심 Objects 10개)
- [ ] 참고 자료 준비 (Palantir 온톨로지 사례)
- [ ] PM용 온톨로지 튜토리얼 자료 작성

---

### 6.2 4주 후 마일스톤

- [ ] Ontology Schema v1.0 완성
- [ ] MVP Prototype 동작 (3개 Use Case)
- [ ] PM이 직접 쿼리 작성 성공
- [ ] 고객 검증 세션 완료

---

### 6.3 12주 후 목표

- [ ] Production 배포 (Phase 1)
- [ ] 측정 지표 수집 시작
- [ ] Phase 2 스코핑 완료
- [ ] PM 온톨로지 관리 프로세스 확립

---

## 7. 참고 자료

### 7.1 추천 학습 자료

1. **Palantir Ontology 101** (사내 교육용이지만 공개 자료 찾기)
2. **Knowledge Graphs: Fundamentals and Applications** (논문)
3. **Domain-Driven Design** (Eric Evans) - 도메인 모델링 기초
4. **Thinking in Systems** (Donella Meadows) - 관계적 사고

### 7.2 도구 추천

- **시각화**: Draw.io, Mermaid, Lucidchart
- **쿼리 빌더**: Retool, Appsmith, 자체 Admin
- **그래프 DB**: Neo4j, AWS Neptune (Phase 3 고려)
- **문서화**: Notion, Confluence

---

## 부록: 용어 사전

| 용어 | 정의 | 예시 |
|------|------|------|
| **Ontology** | 도메인의 개념과 관계를 형식화한 구조 | ATS 온톨로지 = 채용 도메인 모델 |
| **Object Type** | 현실 세계의 "것"을 나타내는 엔티티 | Candidate, Job Posting |
| **Link Type** | Object 간의 관계 | APPLIES_TO, EVALUATES |
| **Property** | Object의 속성 | Candidate.email, Job.salary_range |
| **Cardinality** | 관계의 수량 (1:1, 1:N, N:M) | 1 Candidate : N Applications |
| **Directionality** | 관계의 방향 (단방향, 양방향) | Interviewer → Candidate (단방향) |
| **Derived Relationship** | 다른 관계로부터 추론 가능한 관계 | INTERVIEWED_BY (from SCHEDULES + CONDUCTS) |
| **Temporal Property** | 시간에 따라 변하는 속성 | current_status, stage_entered_at |
| **Event Sourcing** | 변경을 이벤트로 기록하는 패턴 | StatusChange Object |

---

**문서 끝**

다음 작업: PM과 함께 Use Case 우선순위 확정 및 첫 인터뷰 진행
