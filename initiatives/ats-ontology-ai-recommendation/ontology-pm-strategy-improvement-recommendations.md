# ontology-pm-strategy.md 개선 권장사항 (최종)

**작성일**: 2026-01-07
**분석 기반**: Intent/Cognitive 프레임워크 개선 제안서 (고객 질문 92개 분석)
**전문가 검증**: 제리(PM 전략) + 포리(온톨로지 아키텍트)
**전략적 방향**: "정적+동적 데이터를 활용한 AI 채용 의사결정 도구" (유지)

---

## Executive Summary

### 핵심 원칙 (사용자 피드백 반영)

1. **제품 지향성 유지**: "정적+동적 데이터를 활용한 AI 채용 의사결정 도구"
   - 현재 고객 니즈와 거리가 있어도 **미래 방향성**으로 정의
   - 지금부터 준비와 시도 필요

2. **온톨로지 적용 범위 명확화**:
   - ✅ 온톨로지 적용: 복잡한 관계 추론, 맥락 기반 AI 분석
   - ❌ 일반 DB로 충분: 단순 조회, 집계, 반복 쿼리

3. **개선 방향**:
   - Product Positioning → **유지** (기존대로)
   - Use Case → **온톨로지 필요성 기준으로 재평가**
   - MVP Objects → **온톨로지 진짜 필요한 것만**

---

## 1. 고객 질문 92개 재분류: 온톨로지 vs 일반 DB

### 1.1 온톨로지 적용 기준

**온톨로지가 필요한 질문 (3가지 조건 중 1개 이상):**

1. **복잡한 관계 추론**
   - 예: "유사한 프로필 3명이 레퍼런스 체크에서 탈락"
   - 온톨로지: Candidate → Skill → HAS_SKILL → Similar Candidates → StageTransition → 패턴 분석
   - 일반 DB: 불가능 (3-hop 이상 조인, 유사도 계산)

2. **맥락 기반 분석**
   - 예: "66일이나 걸린 케이스는 어떤 상황인지"
   - 온톨로지: Application → StageTransition (시계열) → Interview → Evaluation → Communication → 맥락 종합
   - 일반 DB: 가능하나 복잡도 높음

3. **AI 추론 필요**
   - 예: "이 후보자가 오퍼를 받아들일 확률은?"
   - 온톨로지: Historical Pattern → Similar Profiles → Communication Quality → AI_Recommendation
   - 일반 DB: Feature Engineering 어려움

**일반 DB로 충분한 질문:**

1. **단순 조회/집계**
   - 예: "이번 주 1차 인터뷰 몇 명?"
   - SQL: `SELECT COUNT(*) FROM interviews WHERE stage = '1st' AND week = current_week`

2. **반복 패턴 쿼리**
   - 예: "주간 채용 현황 (공고별)"
   - 해결: Query Template (일반 DB 저장) + Scheduled Query

3. **특정인 조회**
   - 예: "서류 합격자 누구?"
   - SQL: `SELECT name FROM candidates WHERE stage = 'document_passed'`

---

### 1.2 92개 질문 재분류 결과

| 질문 유형 | 빈도 | 온톨로지 필요 여부 | 처리 방식 |
|----------|------|------------------|----------|
| **lookup** (단순 조회) | 43% | ❌ 불필요 | 일반 SQL 쿼리 |
| **monitor** (주간 현황) | 34% | ❌ 불필요 | Query Template (일반 DB) |
| **analysis** (패턴 분석) | 27% | ⚠️ 일부 필요 | 단순 집계는 SQL, 복잡한 패턴은 온톨로지 |
| **identification** (특정인) | 15% | ❌ 불필요 | 일반 SQL + Privacy Layer |
| **correction** (대화형 수정) | 16% | ❌ 불필요 | Conversation State (일반 DB) |
| **comparison** (비교) | 13% | ⚠️ 일부 필요 | 단순 비교는 SQL, 벤치마킹은 온톨로지 |
| **diagnosis** (원인 분석) | 8% | ✅ **필요** | 온톨로지 (복잡한 관계 추론) |
| **recommendation** (개선 방안) | 1% | ✅ **필요** | 온톨로지 + AI |

**핵심 발견:**
- **온톨로지 진짜 필요**: diagnosis 8% + recommendation 1% + analysis 일부 = **약 15-20%**
- **일반 DB 충분**: lookup 43% + monitor 34% + identification 15% = **약 80-85%**

---

## 2. ontology-pm-strategy.md 개선 권장사항 (재조정)

### 2.1 Product Positioning: **유지** (변경 없음)

**현재 (유지):**
> **비전:** 정적 매칭(학력/경력/연봉)을 넘어, 채용 프로세스의 동적 데이터(리드타임, 평가, 커뮤니케이션)를 온톨로지로 구조화하여 맥락 기반 AI 의사결정 지원을 실현합니다.

**이유:**
- 미래 방향성으로 정의됨
- 현재 고객 니즈(80%가 단순 조회)와 거리가 있어도 장기 전략

**추가 명확화 필요:**
온톨로지는 **"AI 의사결정 지원"에만 집중**, 단순 조회/모니터링은 일반 시스템으로 처리

---

### 2.2 Use Case 재평가: 온톨로지 필요성 기준

#### **현재 Use Case 1-3 평가**

| Use Case | 온톨로지 필요성 | 재평가 결과 |
|----------|----------------|-----------|
| Use Case 1: 리드타임 분석 및 병목 알림 | ✅ **필요** (복잡한 관계) | **유지** (온톨로지 핵심) |
| Use Case 2: 유사 후보자 분석 | ✅ **필요** (유사도 추론) | **유지** (온톨로지 핵심) |
| Use Case 3: 커뮤니케이션 품질 | ⚠️ 일부 필요 | **Phase 2로 이동** (Communication Object 필요) |

#### **제리/포리 제안 Use Case 재평가**

| 제안 Use Case | 온톨로지 필요성 | 재평가 결과 |
|-------------|----------------|-----------|
| Use Case 0: 주간 현황 모니터링 | ❌ **불필요** (단순 집계) | **제외** (일반 Query Template) |
| Use Case 1.5: 특정인 조회 | ❌ **불필요** (단순 조회) | **제외** (일반 SQL + Privacy) |

**결론:**
- 제리/포리 제안 Use Case 0, 1.5는 **온톨로지가 아닌 일반 시스템으로 해결**
- ontology-pm-strategy.md는 **온톨로지 필요한 Use Case만 포함**

---

#### **추가 권장 Use Case (온톨로지 진짜 필요)**

**Use Case 4: 위험 시그널 조기 감지 (신규 추가 권장)**

**고객 문제:**
"이 후보자, 과거 비슷한 케이스에서 최종 단계 탈락 패턴 있는데 괜찮을까?" - diagnosis intent

**온톨로지 필요성:**
```
복잡한 관계 추론:
Candidate A → Skill/Experience Profile
  → Similar Candidates (유사도 계산)
    → Past Applications → StageTransition (탈락 패턴)
      → Evaluation (탈락 이유 분석)
        → AI_Recommendation (위험 시그널 생성)

일반 DB로는 불가능:
- 유사도 계산 (벡터 검색)
- 3-hop 이상 조인
- 패턴 추론
```

**AI 철학 체크:**
- ✅ 투명성: "유사 프로필 3명이 레퍼런스 체크에서 탈락" (구체적 근거)
- ✅ 오버라이드: "이 경고 무시하기" 버튼
- ✅ 학습 루프: 사용자 Accept/Reject → AI_Recommendation.user_action

**비즈니스 임팩트:**
- 최종 단계 탈락률 감소
- 채용 ROI 향상
- 온톨로지의 진짜 가치 증명

**MVP 범위:**
- Object: Candidate, Skill, Evaluation, AI_Recommendation
- Link: HAS_SKILL, SIMILAR_TO (파생), EVALUATES
- AI: 유사도 계산 알고리즘 (Phase 1은 단순 규칙, Phase 2는 ML)

---

### 2.3 MVP Objects 재조정: 온톨로지 vs 일반 DB 분리

#### **온톨로지 Objects (MVP 유지/추가)**

| Object | 현재 MVP | 재평가 | 이유 |
|--------|---------|--------|------|
| **Candidate** | ✅ | ✅ 유지 | 온톨로지 핵심 |
| **Job Posting** | ✅ | ✅ 유지 | 온톨로지 핵심 |
| **Application** | ✅ | ✅ 유지 | 온톨로지 핵심 |
| **Recruitment Stage** | ✅ | ✅ 유지 | 프로세스 표현 |
| **Stage Transition** | ✅ | ✅ 유지 | 시계열 동적 데이터 |
| **Interview** | ✅ | ✅ 유지 | 평가 프로세스 |
| **Evaluation** | ✅ | ✅ 유지 | AI 추론 근거 |
| **AI_Recommendation** | ✅ | ✅ 유지 | AI 철학 구현 |
| **Skill** | ❌ Phase 3 | ✅ **MVP로 승격** | 유사도 계산 필수 (Use Case 4) |

#### **일반 DB로 충분한 Objects (온톨로지 제외)**

| Object | 제리/포리 제안 | 재평가 | 처리 방식 |
|--------|--------------|--------|----------|
| **QueryTemplate** | MVP 추가 | ❌ **제외** | 일반 DB 테이블 (RDB) |
| **ConversationContext** | MVP 추가 | ❌ **제외** | 일반 DB 또는 세션 스토어 |
| **Privacy_Level** | MVP 추가 | ❌ **제외** | RBAC (Role-Based Access Control) |
| **Time_Period** | 선택적 | ❌ **제외** | 쿼리 레벨 계산 |

**이유:**
- QueryTemplate: 반복 쿼리 저장은 일반 RDB로 충분 (PostgreSQL jsonb)
- ConversationContext: 대화 상태는 Redis 또는 세션 DB
- Privacy_Level: 권한 제어는 RBAC (Keycloak, Auth0 등)
- 온톨로지는 **복잡한 관계 추론**에만 집중

---

#### **MVP Objects 최종안 (9개)**

| Object | 변경사항 | 온톨로지 필요성 |
|--------|---------|---------------|
| Candidate | 유지 | ✅ 관계 중심 |
| Job Posting | 유지 | ✅ 관계 중심 |
| Application | 유지 | ✅ 관계 중심 |
| Recruitment Stage | 유지 | ✅ 프로세스 모델링 |
| Stage Transition | 유지 | ✅ 동적 데이터 |
| Interview | 유지 | ✅ 평가 프로세스 |
| Evaluation | 유지 | ✅ AI 추론 근거 |
| AI_Recommendation | 유지 | ✅ AI 철학 |
| **Skill** | **Phase 3 → MVP 승격** | ✅ 유사도 계산 필수 |

---

### 2.4 temporal_reference: 온톨로지 속성 vs 쿼리 파라미터

**포리 제안:**
```
Interview {
  scheduled_date
  actual_date  // 신규 속성
  completion_status
}
```

**재평가:**
- ✅ **유지**: temporal_reference는 **데이터 정확성**을 위해 필요
- 온톨로지 Object 속성으로 저장 (단순 쿼리 파라미터가 아님)
- "일정 잡힌" vs "실제 진행" 구분은 맥락 기반 분석에 필수

**추가 명확화:**
```
StageTransition {
  scheduled_timestamp  // 계획된 시점
  actual_timestamp     // 실제 전환 시점
  completion_status
}
```

**이유:**
- Use Case 1 (리드타임 분석)에서 "계획 vs 실제" 지연 시간 측정 필요
- 병목 감지 시 "왜 늦어졌나" 맥락 분석에 필수

---

## 3. ontology-pm-strategy.md 수정 사항 (최종)

### 3.1 수정 **불필요** (유지)

- [ ] **Executive Summary 비전** → 유지 (변경 없음)
- [ ] **핵심 가치 제안** → 유지
- [ ] **AI 철학 (섹션 0)** → 유지

### 3.2 **추가** 권장 (새 섹션)

#### **섹션 0.6: 온톨로지 적용 범위 (신규 추가)**

**추가 위치:** 섹션 1 "온톨로지 설계 접근법" 앞

**내용:**
```markdown
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
```

---

### 3.3 **수정** 권장

#### **섹션 2.1: Use Case 추가**

**추가 위치:** Use Case 3 다음

**추가 내용:**
```markdown
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
- ✅ 투명성: "유사 프로필 3명이 레퍼런스 체크에서 탈락" (구체적 근거)
- ✅ 오버라이드: "이 경고 무시하기" 버튼
- ✅ 학습 루프: user_action 기록 → 정확도 개선
- ✅ 명명: "위험 시그널 감지" (자동 거부 아님)
- ✅ 최종 결정권: 알림만, 실제 진행은 사용자 결정

**비즈니스 임팩트:**
- 최종 단계 탈락률 15% 감소 (목표)
- 채용 ROI 향상
- **온톨로지의 진짜 가치 증명**

**MVP 범위:**
- Object: Candidate, Skill, Evaluation, AI_Recommendation
- Link: HAS_SKILL, SIMILAR_TO (파생), EVALUATES
- 유사도 계산: Phase 1은 단순 규칙 (skill 매칭), Phase 2는 ML

**측정 지표:**
- 위험 시그널 정확도 (탈락 예측 정확도)
- 알림 후 실제 조치 비율
- 최종 단계 탈락률 감소
```

---

#### **섹션 2.2: MVP Objects 수정**

**변경 전:**
```
포함 Objects (8개):
1. Candidate
2. Job Posting
3. Application
4. Recruitment Stage
5. Stage Transition
6. Interview
7. Evaluation
8. AI_Recommendation
```

**변경 후:**
```
포함 Objects (9개):
1. Candidate
2. Job Posting
3. Application
4. Recruitment Stage
5. Stage Transition (+ temporal_reference 속성 추가)
6. Interview (+ temporal_reference 속성 추가)
7. Evaluation
8. AI_Recommendation
9. **Skill (Phase 3에서 MVP로 승격)** ← Use Case 4 필수

**Skill Object 상세:**
```
Skill {
  skill_id: string (PK)
  name: string (예: "Python", "Django", "Backend Architecture")
  category: enum (technical, soft, domain)
  proficiency_levels: ["beginner", "intermediate", "advanced", "expert"]
  related_skills: [Skill.skill_id]  // 연관 스킬
}
```

**새 Links:**
- **HAS_SKILL**: Candidate → Skill (N:M)
  - Properties: proficiency_level, years_of_experience, verified (boolean)
- **REQUIRES_SKILL**: Job Posting → Skill (N:M)
  - Properties: required_level, is_mandatory (boolean)
- **SIMILAR_TO**: Candidate → Candidate (파생 Link)
  - Properties: similarity_score (0-1), matching_skills: [Skill.skill_id]
  - 계산 방식: skill 매칭률 기반 (Phase 1), ML 임베딩 (Phase 2)

**온톨로지 적용 범위 명확화:**
- ✅ 온톨로지 Objects: 위 9개 (복잡한 관계 표현)
- ❌ 일반 DB로 충분: QueryTemplate, ConversationContext, Privacy_Level
  - QueryTemplate: PostgreSQL jsonb 컬럼
  - ConversationContext: Redis 또는 세션 DB
  - Privacy_Level: RBAC (Keycloak/Auth0)
```

---

#### **섹션 2.2: MVP 성공 기준 수정**

**변경 전:**
```
**MVP 성공 기준:**
- 3개월 내 배포
- 최소 1개 Use Case의 측정 가능한 개선
- PM이 스키마 변경 없이 새 쿼리 생성 가능
```

**변경 후:**
```
**MVP 성공 기준 (온톨로지 가치 증명):**
- 3개월 내 배포
- **온톨로지 필요 Use Case (1, 2, 4) 중 최소 2개의 측정 가능한 개선**
  - Use Case 1: 병목 알림 정확도 ±3일 이내
  - Use Case 2 or 4: AI 추천 수락률 60% 이상
- **온톨로지 vs 일반 DB 비교 증명**
  - 복잡한 관계 쿼리 속도: 일반 DB 대비 2배 빠름
  - 유사도 계산 정확도: 사용자 검증 70% 이상
- PM이 스키마 변경 없이 새 쿼리 생성 가능

**비교 대상 (일반 시스템):**
- Query Template 시스템 (일반 DB)
- 단순 조회/모니터링 (일반 SQL)
→ MVP는 **"온톨로지가 왜 필요한지"를 증명**
```

---

### 3.4 **삭제** 권장 (제거하지 말고 명확화)

#### **섹션 5.1: 리스크 "AI 철학 무시" 보강**

**추가 내용:**
```markdown
#### **실수 6: 온톨로지를 모든 문제에 적용 (Over-Engineering)**

**증상:**
- 단순 조회도 온톨로지 쿼리로 구현
- QueryTemplate, Privacy 같은 일반 기능까지 온톨로지 Objects로 설계
- 복잡도만 증가, 성능 저하

**실제 사례 (타 프로젝트):**
- "이번 주 몇 명?" 같은 단순 COUNT 쿼리에 Graph DB 사용
- 결과: 쿼리 응답 시간 0.5초 → 3초 (6배 느림)
- 개발 공수: 일반 SQL 1일 vs 온톨로지 설계 1주

**올바른 접근:**
1. **온톨로지 적용 기준 명확화**
   - 복잡한 관계 추론 (3-hop 이상)
   - 맥락 기반 AI 분석
   - 유사도 계산

2. **일반 DB로 충분한 것은 일반 DB 사용**
   - 단순 조회/집계
   - 반복 쿼리 템플릿
   - 권한 제어

3. **MVP는 온톨로지 가치 증명에 집중**
   - Use Case 1, 2, 4 (온톨로지 필요)
   - 나머지는 별도 시스템

**PM 가이드:**
- 새 Use Case 추가 시 질문: "일반 SQL로 안 되나?"
- 온톨로지 필요성 3가지 조건 중 1개 이상 충족 시에만 추가
```

---

## 4. 시스템 아키텍처 제안 (2-Layer)

### 4.1 전체 구조

```
┌───────────────────────────────────────────────────────┐
│              프론트엔드 (공통 UI)                      │
│  - 채용 담당자 대시보드                                │
│  - 면접관 평가 인터페이스                              │
│  - 경영진 리포트                                       │
└───────────────────────┬───────────────────────────────┘
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ▼                                ▼
┌──────────────────┐          ┌─────────────────────────┐
│  일반 시스템      │          │  온톨로지 시스템         │
│  (80-85% 질문)   │          │  (15-20% 질문)          │
├──────────────────┤          ├─────────────────────────┤
│ Query Template   │          │ Knowledge Graph         │
│ (반복 쿼리 자동) │          │ - Candidate             │
│                  │          │ - Application           │
│ Privacy/RBAC     │          │ - StageTransition       │
│ (권한 제어)      │          │ - Skill (유사도)        │
│                  │          │ - AI_Recommendation     │
│ Conversation     │          │                         │
│ (대화 상태)      │          │ AI Engine               │
│                  │          │ - 유사도 계산           │
│ PostgreSQL       │          │ - 패턴 추론             │
│ + Redis          │          │ - 병목 감지             │
└──────────────────┘          └─────────────────────────┘
        │                                │
        └────────────┬───────────────────┘
                     ▼
        ┌─────────────────────────┐
        │   데이터 레이어 (공통)   │
        │   - PostgreSQL (RDB)    │
        │   - Redis (Cache)       │
        │   - Neo4j (Graph - 선택)│
        └─────────────────────────┘
```

### 4.2 구현 우선순위

#### **Phase 1 (MVP - 3개월):**

**일반 시스템 (빠른 구현):**
- [ ] Query Template 저장 (PostgreSQL jsonb)
- [ ] RBAC (Keycloak 또는 자체 구현)
- [ ] 단순 조회/집계 API (REST)

**온톨로지 시스템 (가치 증명):**
- [ ] Core Objects 9개 (PostgreSQL 또는 Neo4j)
- [ ] Use Case 1: 리드타임 분석
- [ ] Use Case 2: 유사 후보자 (단순 규칙 기반)
- [ ] Use Case 4: 위험 시그널 (Skill 매칭)

**목표:** "온톨로지가 왜 필요한지" 증명

---

#### **Phase 2 (MVP + 3개월):**

**일반 시스템:**
- [ ] Conversation Context (Redis)
- [ ] 대화형 수정 패턴

**온톨로지 시스템:**
- [ ] Use Case 2, 4 고도화 (ML 기반 유사도)
- [ ] Communication Object 추가
- [ ] Use Case 3: 커뮤니케이션 품질

---

#### **Phase 3 (MVP + 6개월):**

**통합:**
- [ ] 일반 시스템 + 온톨로지 시스템 Seamless 통합
- [ ] 단일 쿼리 인터페이스 (자동 라우팅)
- [ ] 성능 최적화

---

## 5. 최종 수정 체크리스트 (우선순위별)

### P0 (즉시 - 이번 주)

- [ ] **섹션 0.6 추가**: 온톨로지 적용 범위 및 경계 (신규 섹션)
- [ ] **섹션 2.1 추가**: Use Case 4 위험 시그널 조기 감지
- [ ] **섹션 2.2 수정**: MVP Objects 9개로 확장 (Skill 추가)
  - temporal_reference 속성 추가 (Interview, StageTransition)
  - Skill Object 상세 스펙
  - HAS_SKILL, REQUIRES_SKILL, SIMILAR_TO Links
- [ ] **섹션 2.2 수정**: MVP 성공 기준 재정의
  - 온톨로지 가치 증명 강조
  - 일반 DB 대비 성능/정확도 비교

### P1 (단기 - 2주 내)

- [ ] **섹션 5.1 추가**: 리스크 "온톨로지 Over-Engineering" 경고
- [ ] **섹션 2.3 명확화**: Phase별 일반 시스템 vs 온톨로지 구분
- [ ] **부록 추가**: 시스템 아키텍처 다이어그램 (2-Layer)

### P2 (중기 - 1개월 내)

- [ ] **섹션 4.1 보강**: 고객 인터뷰 시 "온톨로지 필요성 검증" 질문 추가
- [ ] **섹션 6 보강**: 다음 단계에 "일반 시스템 병행 구현" 명시

---

## 6. 제리와 포리에게 전달할 피드백

### 6.1 제리 (PM 전략)에게

**잘한 점:**
- Product-Market Fit 갭 분석 (77%가 단순 조회)
- Use Case 우선순위 데이터 기반 재조정

**조정 필요:**
- Use Case 0 (주간 현황), 1.5 (특정인 조회)는 **온톨로지가 아닌 일반 시스템**으로 해결
- 제품 지향성 유지: "AI 의사결정 도구"는 미래 방향성
- Query Template, Conversation Context는 온톨로지 Objects가 아님

**추가 제안:**
- Use Case 4 (위험 시그널) 추가 → 온톨로지 진짜 가치 증명

---

### 6.2 포리 (온톨로지 아키텍트)에게

**잘한 점:**
- temporal_reference 설계 (scheduled vs actual)
- Privacy Level 상세 설계
- 마이그레이션 전략

**조정 필요:**
- QueryTemplate, ConversationContext, Privacy_Level은 **온톨로지 Objects가 아님**
  - QueryTemplate → PostgreSQL jsonb
  - ConversationContext → Redis
  - Privacy_Level → RBAC
- 온톨로지는 **복잡한 관계 추론**에만 집중

**추가 제안:**
- Skill Object MVP 승격
- SIMILAR_TO Link 설계 (유사도 계산)
- 일반 DB vs 온톨로지 성능 비교 테스트

---

## 7. 다음 액션 아이템

### 즉시 (이번 주)

1. **ontology-pm-strategy.md v3.0 작성**
   - 위 체크리스트 P0 항목 반영
   - 섹션 0.6 "온톨로지 적용 범위" 추가
   - Use Case 4 추가
   - MVP Objects 9개로 조정

2. **제리/포리와 정렬**
   - 위 피드백 공유
   - 일반 시스템 vs 온톨로지 구분 명확화

3. **개발팀 킥오프 준비**
   - 2-Layer 아키텍처 설명 자료
   - 온톨로지 가치 증명 지표

### 단기 (2주 내)

4. **일반 시스템 설계**
   - Query Template 스키마 (PostgreSQL)
   - RBAC 권한 모델
   - Conversation State (Redis)

5. **온톨로지 MVP PoC**
   - Use Case 1 프로토타입
   - Skill Object + SIMILAR_TO Link 테스트
   - 성능 비교 (일반 DB vs Graph DB)

### 중기 (1개월 내)

6. **고객 검증**
   - Use Case 1, 4 데모
   - 온톨로지 vs 일반 시스템 가치 증명
   - "왜 온톨로지가 필요한가" 스토리

7. **Phase 2 스코핑**
   - Use Case 3 상세 설계
   - ML 기반 유사도 계산 연구

---

## 관련 파일

**분석 기반:**
- `/initiatives/ats-ontology-ai-recommendation/user-interviews/intent-cognitive-framework-improvement-proposal.md`
- `/initiatives/ats-ontology-ai-recommendation/ontology-pm-strategy.md` (수정 대상)

**다음 생성 권장:**
- `/initiatives/ats-ontology-ai-recommendation/ontology-pm-strategy-v3.0.md` (이번 주)
- `/initiatives/ats-ontology-ai-recommendation/general-system-design.md` (일반 시스템 설계)
- `/initiatives/ats-ontology-ai-recommendation/system-architecture-comparison.md` (온톨로지 vs 일반 DB 비교)

---

**최종 메시지:**

제품 지향성("AI 채용 의사결정 도구")을 유지하면서, 온톨로지를 **진짜 필요한 곳에만** 선택적으로 적용하는 전략으로 조정했습니다.

**핵심 변경:**
1. 온톨로지 적용 범위 명확화 (15-20% 질문만)
2. Use Case 4 추가 (위험 시그널 - 온톨로지 가치 증명)
3. QueryTemplate, Conversation 등은 일반 시스템으로
4. MVP는 온톨로지 필요성 증명에 집중

**다음 단계:** ontology-pm-strategy.md v3.0 작성 시작할까요?
