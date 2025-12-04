# Evaluation Rubric (평가 루브릭)

**개념 ID:** C-007
**생성일:** 2025-11-26
**최종 수정일:** 2025-11-26
**작성자:** Terry
**검토자:** Borry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | **Problem 02 (평가 기준 일관성) - 핵심 개념!** |
| **우선순위** | **Critical** |
| **의존 개념** | Competency (C-004), Proficiency Level (C-005) |
| **증거 출처** | [opportunity-02](../../../opportunities/02-evaluation-consistency.md), [snapshot-borry-2025-11-16](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md) |
| **표준 참조** | Behavioral Interviewing, STAR Method |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Evaluation Rubric은 **면접에서 Competency를 일관되게 평가하기 위한 5점 척도 기준표**입니다.

### 상세 설명
Evaluation Rubric은 각 Competency를 5점 척도(1-5점)로 평가하는 명확한 기준을 제공합니다. 각 점수는 구체적인 행동적 설명(behavioral anchors)과 연결되어, 서로 다른 면접관이 같은 기준으로 평가할 수 있도록 합니다.

**왜 이 개념이 Problem 02를 해결하는가?**

**Before (Rubric 없이):**
- 면접 후 조율 회의:
  - 면접관 A: "이 후보자는 RESTful API를 '잘' 안다고 봅니다. 채용!"
  - 면접관 B: "저는 '보통'이라고 봤는데요. 불채용."
  - **→ 1시간 동안 "잘"과 "보통"의 차이를 논의**
- 결과: 평가 기준 불일치, 주관적 판단, 긴 조율 시간

**After (Rubric 있음):**
- 면접 전: 모든 면접관이 Rubric 공유
  - 5점 = "idempotency key, rate limiting 구현 가능" (Advanced)
  - 3점 = "독립적으로 CRUD API 설계 가능" (Intermediate)
  - 1점 = "튜토리얼 참고하여 단순 엔드포인트 작성" (Beginner)
- 면접 후:
  - 면접관 A: "RESTful API - 3점 (CRUD API는 설명했으나 rate limiting은 모름)"
  - 면접관 B: "RESTful API - 3점 (동일 판단)"
  - **→ 15분 내 빠른 합의 (75% 시간 단축)**

**HR 도메인에서의 역할:**
- 면접 평가 시트 작성의 기초
- 면접관 트레이닝 자료 (어떻게 평가할 것인가)
- 조율(calibration) 회의의 공통 언어
- 채용 결정의 객관성 확보 (법적 방어)

### 동의어 (Synonyms)
- 평가 루브릭
- Scoring Rubric
- Assessment Criteria
- Evaluation Criteria
- Grading Rubric

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Proficiency Level**: Proficiency는 스킬 숙련도 (Beginner, Advanced), Rubric은 숙련도를 측정하는 점수 기준 (1-5점)
- **vs Interview Question**: 질문은 "무엇을 물을 것인가", Rubric은 "어떻게 평가할 것인가"

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- **Evaluation Framework** (V2 확장)
  - 예: 전체 면접 프로세스 (스크리닝 → 기술 면접 → 문화 면접)

### 하위 개념 (Narrower Concepts)
- 없음 (Rubric은 원자적 평가 도구)

### 관련 개념 (Related Concepts)
- **Competency** (evaluates 관계)
  - 관계 설명: Rubric은 특정 Competency를 평가함
  - 예시: "RESTful API Development Rubric" → COMP-001 평가

- **Proficiency Level** (measures 관계)
  - 관계 설명: Rubric의 점수는 Proficiency Level과 매핑됨
  - 예시: 5점 = Advanced, 3점 = Intermediate, 1점 = Beginner

- **Position** (usedBy 관계)
  - 관계 설명: Position별 필수 Competencies의 Rubric 사용
  - 예시: Senior Backend Engineer 면접 → RESTful API Rubric, DB Rubric, Communication Rubric 사용

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|---------|---------|
| id | String | 필수 | 고유 식별자 | "RUB-COMP-001" |
| competencyId | String | 필수 | 평가 대상 Competency | "COMP-001" |
| competencyName | String | 필수 | Competency 이름 | "RESTful API Development" |
| scaleMin | Integer | 필수 | 최소 점수 | 1 |
| scaleMax | Integer | 필수 | 최대 점수 | 5 |
| scaleAnchors | Array<ScoreAnchor> | 필수 | 각 점수의 행동적 설명 | [{score, description, behavioralExample}] |
| passingScore | Integer | 선택 | 합격 기준 점수 (Position별로 다름) | 3 |
| evaluationMethod | String | 필수 | 평가 방법 (면접, 코딩 테스트, 포트폴리오) | "BEHAVIORAL_INTERVIEW" |
| sampleQuestions | Array<String> | 선택 | 이 Competency 평가를 위한 질문 예시 | ["RESTful API를 설계한 경험은?", "..."] |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: RESTful API Development Rubric (Technical Competency)
**맥락:** V1 파일럿의 핵심 Rubric, Backend Engineer 면접에서 사용

**구체적 예시:**
```json
{
  "id": "RUB-COMP-001",
  "competencyId": "COMP-001",
  "competencyName": "RESTful API Development",
  "scaleMin": 1,
  "scaleMax": 5,
  "scaleAnchors": [
    {
      "score": 1,
      "proficiencyMapping": "PROF-BEGINNER (하위)",
      "description": "RESTful API의 기본 개념을 이해하지 못하거나, 튜토리얼 없이는 구현 불가능",
      "behavioralExample": "GET과 POST의 차이를 설명하지 못함. API 설계 경험 전무.",
      "interviewObservation": "질문에 대한 답변이 매우 모호하거나, 기본 용어를 이해하지 못함"
    },
    {
      "score": 2,
      "proficiencyMapping": "PROF-BEGINNER (상위)",
      "description": "튜토리얼이나 가이드를 참고하여 매우 단순한 CRUD API를 구현할 수 있음",
      "behavioralExample": "GET /users를 만들어 사용자 리스트 JSON 반환 가능. HTTP 메서드 기본 이해.",
      "interviewObservation": "단순한 질문에는 답변하나, '왜'에 대한 이해 부족. 실무 경험 거의 없음."
    },
    {
      "score": 3,
      "proficiencyMapping": "PROF-INTERMEDIATE",
      "description": "RESTful 원칙을 이해하고, 일반적인 CRUD API를 독립적으로 설계 및 구현 가능",
      "behavioralExample": "인증 필요한 API 설계, 적절한 HTTP 상태 코드 사용, Swagger 문서 작성 가능.",
      "interviewObservation": "실무 프로젝트 경험 설명 가능. 리소스 중심 설계 이해. 에러 핸들링 설명 가능."
    },
    {
      "score": 4,
      "proficiencyMapping": "PROF-ADVANCED (하위)",
      "description": "복잡한 비즈니스 로직을 RESTful 구조로 설계하고, 성능과 보안 고려 가능",
      "behavioralExample": "Rate limiting, Pagination, API 버저닝 구현 경험. 복잡한 관계 데이터의 API 설계.",
      "interviewObservation": "트레이드오프를 설명 가능 (REST vs GraphQL). 실제 프로덕션 API 운영 경험."
    },
    {
      "score": 5,
      "proficiencyMapping": "PROF-ADVANCED (상위) ~ PROF-EXPERT",
      "description": "API 아키텍처를 주도하고, 팀의 API 표준을 수립. 복잡한 시스템의 API 전략 설계",
      "behavioralExample": "Idempotency key 도입, HATEOAS 적용, API Gateway 설계, 회사 API 가이드 작성.",
      "interviewObservation": "전략적 의사결정 경험 설명. 다양한 패러다임 비교 평가 가능. 멘토링 경험."
    }
  ],
  "passingScore": null,
  "note": "Position별로 다름. Senior Backend는 4점 이상 기대, Mid는 3점 이상",
  "evaluationMethod": "BEHAVIORAL_INTERVIEW",
  "sampleQuestions": [
    "가장 복잡했던 API 설계 경험을 설명해 주세요. 어떤 도전이 있었고, 어떻게 해결했나요?",
    "RESTful API 설계 시 가장 중요하게 생각하는 원칙은 무엇인가요? 실제 사례로 설명해 주세요.",
    "API 버저닝 전략을 어떻게 가져가셨나요? 왜 그 방법을 선택했나요?",
    "Rate limiting을 구현한 경험이 있나요? 어떤 방식으로 구현했나요?"
  ]
}
```

**관찰:** 각 점수마다 구체적인 행동 예시가 있어, 면접관이 후보자의 답변을 듣고 "이건 3점", "이건 4점"으로 즉시 매핑 가능합니다.

### 예시 2: Communication & Collaboration Rubric (Soft Skill)
**맥락:** 모든 Position에 공통적으로 사용되는 Soft Skill Rubric

**구체적 예시:**
```json
{
  "id": "RUB-COMP-010",
  "competencyId": "COMP-010",
  "competencyName": "Communication & Collaboration",
  "scaleMin": 1,
  "scaleMax": 5,
  "scaleAnchors": [
    {
      "score": 1,
      "proficiencyMapping": "PROF-BEGINNER (하위)",
      "description": "팀 내 기본적인 소통도 어려움. 의견 전달이 불명확하거나, 협업 경험 부족",
      "behavioralExample": "회의에서 자신의 의견을 명확히 설명하지 못함. 갈등 상황 경험 없음.",
      "interviewObservation": "면접 중 질문 의도를 자주 이해하지 못함. 모호한 답변."
    },
    {
      "score": 2,
      "proficiencyMapping": "PROF-BEGINNER (상위)",
      "description": "팀 내부에서 기본적인 의사소통 가능. 업무 현황 보고 가능",
      "behavioralExample": "데일리 스탠드업 참여. 블로커를 공유할 수 있음.",
      "interviewObservation": "간단한 협업 경험 설명 가능. 수동적 태도."
    },
    {
      "score": 3,
      "proficiencyMapping": "PROF-INTERMEDIATE",
      "description": "타 부서와 원활히 소통하고, 문서로 복잡한 내용 전달 가능. 갈등을 건설적으로 해결",
      "behavioralExample": "디자이너와 기술 제약 설명하며 대안 제시. RFC 문서 작성하여 팀 합의 도출.",
      "interviewObservation": "구체적인 협업 사례 설명. 갈등 해결 경험 있음. 능동적 소통."
    },
    {
      "score": 4,
      "proficiencyMapping": "PROF-ADVANCED (하위)",
      "description": "경영진에게 기술 전략을 설득력 있게 설명하고, 크로스펑셔널 프로젝트 주도",
      "behavioralExample": "CEO에게 기술 부채 해소 계획 발표하여 예산 승인. 3개 팀 협업 프로젝트 리딩.",
      "interviewObservation": "전략적 소통 경험. 다양한 이해관계자 설득 사례. 리더십."
    },
    {
      "score": 5,
      "proficiencyMapping": "PROF-ADVANCED (상위) ~ PROF-EXPERT",
      "description": "조직 문화와 소통 방식을 개선하고, 멘토링을 통해 팀원의 소통 능력 향상",
      "behavioralExample": "팀의 RFC 프로세스 도입. 주니어 엔지니어 기술 글쓰기 코칭. 전사 프레젠테이션.",
      "interviewObservation": "조직 전반에 영향을 미친 경험. 문화 개선 사례. 탁월한 설명 능력."
    }
  ],
  "passingScore": null,
  "note": "Senior Position은 4점 이상 기대, Mid는 3점 이상",
  "evaluationMethod": "BEHAVIORAL_INTERVIEW",
  "sampleQuestions": [
    "타 부서와 협업하면서 발생한 갈등을 어떻게 해결했나요? (STAR 방식으로 설명)",
    "기술적인 내용을 비기술자에게 설명해야 했던 경험이 있나요? 어떻게 설명했나요?",
    "팀 내에서 의견 차이가 있을 때, 어떻게 합의를 이끌어내나요? 실제 사례를 들어 주세요."
  ]
}
```

**관찰:** Soft Skill도 행동적 앵커로 구체화하면 평가 가능해집니다. "커뮤니케이션 좋음" 대신 "갈등 해결 경험 있음 = 3점"으로 명확히 평가합니다.

### 예시 3: Rubric 사용 - Senior Backend Engineer 면접 시트
**맥락:** Position별로 여러 Rubrics를 조합하여 면접 평가 시트 구성

**구체적 예시:**
```json
{
  "positionId": "POS-SENIOR-BE-PAYMENTS",
  "positionName": "Senior Backend Engineer - Payments Team",
  "interviewEvaluationSheet": {
    "competencies": [
      {
        "competencyId": "COMP-001",
        "competencyName": "RESTful API Development",
        "rubricId": "RUB-COMP-001",
        "requiredProficiency": "PROF-ADVANCED",
        "minimumScore": 4,
        "weight": 30,
        "interviewerScore": null,
        "interviewerNote": ""
      },
      {
        "competencyId": "COMP-002",
        "competencyName": "Database Design & Optimization",
        "rubricId": "RUB-COMP-002",
        "requiredProficiency": "PROF-ADVANCED",
        "minimumScore": 4,
        "weight": 25,
        "interviewerScore": null,
        "interviewerNote": ""
      },
      {
        "competencyId": "COMP-010",
        "competencyName": "Communication & Collaboration",
        "rubricId": "RUB-COMP-010",
        "requiredProficiency": "PROF-ADVANCED",
        "minimumScore": 4,
        "weight": 20,
        "interviewerScore": null,
        "interviewerNote": ""
      },
      {
        "competencyId": "COMP-050",
        "competencyName": "Testing & Quality Assurance",
        "rubricId": "RUB-COMP-050",
        "requiredProficiency": "PROF-INTERMEDIATE",
        "minimumScore": 3,
        "weight": 15,
        "interviewerScore": null,
        "interviewerNote": ""
      },
      {
        "competencyId": "COMP-051",
        "competencyName": "Problem Solving",
        "rubricId": "RUB-COMP-051",
        "requiredProficiency": "PROF-ADVANCED",
        "minimumScore": 4,
        "weight": 10,
        "interviewerScore": null,
        "interviewerNote": ""
      }
    ],
    "totalScore": null,
    "overallRecommendation": null,
    "hiringDecision": null
  }
}
```

**관찰:** Position별로 평가할 Competencies, 각 Competency의 최소 점수, 가중치를 미리 정의하여 일관성 있는 평가를 보장합니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **VCQ-02-001** "면접관 A와 B가 '고급 수준'을 다르게 이해하는 것을 어떻게 방지하는가?"
   - **예상 답변:** "Evaluation Rubric 'RUB-COMP-001'의 scaleAnchors를 면접 전에 공유합니다. 5점 = 'idempotency key 구현', 4점 = 'rate limiting 구현', 3점 = 'CRUD API 독립 설계' 등 구체적 행동으로 정의되어, 모든 면접관이 같은 기준 사용"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

2. **VCQ-02-002** "'Communication' 역량을 면접에서 어떻게 평가하는가?"
   - **예상 답변:** "Rubric 'RUB-COMP-010'을 사용합니다. sampleQuestions ('갈등 해결 경험은?')로 질문하고, 답변을 scaleAnchors와 비교하여 1-5점 부여. 예: '디자이너와 대안 제시 경험' = 3점 (Intermediate)"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

3. **VCQ-02-003** "면접 조율(calibration) 회의에서 무엇을 논의하는가?"
   - **예상 답변:** "각 면접관이 동일 Rubric으로 평가한 점수를 공유하고, 점수 차이가 2점 이상이면 interviewerNote를 기반으로 논의. Rubric의 behavioralExample과 비교하여 합의. 15분 내 완료 가능"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

4. **신규 CQ** "Senior Backend Engineer에 필요한 최소 점수는?"
   - **예상 답변:** "Position 'POS-SENIOR-BE-PAYMENTS'의 interviewEvaluationSheet를 조회하면, 각 Competency별 minimumScore 확인 가능. 예: RESTful API ≥ 4점, Testing ≥ 3점"
   - **출처:** Position-Rubric 통합

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, competencyId, scaleMin, scaleMax, scaleAnchors, evaluationMethod)
- [x] 최소 2개 실제 사례 제공 (Technical Rubric, Soft Skill Rubric)
- [x] 각 Rubric마다 5개 점수별 행동적 설명 포함
- [x] 최소 4개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [x] 점수 범위가 일관적 (1-5점)
- [x] 각 점수의 설명이 순차적으로 발전 (1점 < 2점 < 3점 < 4점 < 5점)
- [x] Proficiency Level 매핑이 논리적
- [x] behavioralExample이 구체적이고 관찰 가능

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [x] 면접관이 실제 사용 가능 (행동적 앵커 명확)
- [x] 모호한 표현 없음 (모든 점수가 구체적 행동으로 정의)

### 증거 기반 (Evidence-grounded)
- [x] Opportunity 문서 링크됨 (Problem 02 핵심 해결책)
- [x] 실제 문제 해결에 기여 (조율 시간 1시간 → 15분)
- [x] 예시가 실제 데이터 기반 (보리의 면접 조율 문제)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴: Measurement Pattern (측정 패턴)**

**적용 이유:**
- Rubric은 Competency를 정량적으로 측정하는 도구
- 주관적 평가를 객관화

**구현 방법:**
```
Competency (추상적 개념)
└── Evaluation Rubric (측정 도구)
    └── 1-5점 척도 + 행동적 앵커

예시:
"Communication" (추상적)
→ RUB-COMP-010 (측정 도구)
  → 3점 = "갈등을 건설적으로 해결" (구체적 행동)
```

**참고 문서:** `../design-patterns/measurement-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### Behavioral Interviewing Framework
- **STAR Method:** Situation, Task, Action, Result
- **V1 적용:** sampleQuestions에 STAR 방식 질문 포함
- **예:** "갈등 상황(S)에서 어떤 역할(T)로 어떻게 행동(A)했고, 결과(R)는?"
- **참고:** [Behavioral Interviewing Guide (SHRM)](https://www.shrm.org/topics-tools/tools/toolkits/behavioral-interviewing)

### Rubric Design Best Practices
- **5점 척도:** 교육학 연구에서 가장 신뢰도 높은 척도 (3점은 너무 단순, 7점은 복잡)
- **Behavioral Anchors:** 각 점수마다 관찰 가능한 행동 설명 필수
- **참고:** [Designing Scoring Rubrics (AAC&U)](https://www.aacu.org/trending-topics/value-rubrics)

**참고 문서:**
- `../../03-implementation/standards/rubric-design-guide.md` (작성 예정)
- `../../03-implementation/standards/behavioral-interviewing.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-26 | 초안 생성 | Terry | Week 2 마지막 핵심 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **5점 척도로 충분한가, 7점이 필요한가?**
   - **질문:** 1-5점 vs. 1-7점?
   - **우선순위:** Medium (V1 파일럿 후 결정)
   - **해결 방법:** Week 6 파일럿에서 면접관들에게 "5점으로 구분이 충분한지" 질문
   - **예상 답변:** 5점 충분. 7점은 오히려 애매함 증가 (4점과 5점의 차이도 헷갈리는데, 6점 7점 추가 시 더 복잡)

2. **passingScore를 Rubric에 포함할지, Position에 포함할지?**
   - **질문:** "합격 기준 3점"이 Rubric의 속성인가, Position의 속성인가?
   - **우선순위:** High (V1 구현 전 결정)
   - **해결 방법:** Position별로 다를 수 있으므로, Position.requiredCompetencies[].minimumScore로 정의 (현재 예시 3)
   - **예상 답변:** Position 속성이 맞음. Senior는 4점 이상, Mid는 3점 이상 등 Position별 차등 가능

3. **Rubric에 가중치(weight)를 포함할지?**
   - **질문:** Competency별 중요도가 다를 때, 가중치를 어떻게 처리?
   - **우선순위:** Low (V2 확장)
   - **해결 방법:** V1에서는 Position.interviewEvaluationSheet.weight로 정의 (예시 3), V2에서 자동 계산 기능 추가
   - **예상 답변:** 가중치 필요. RESTful API (30%), Communication (20%) 등

### 가정 (검증 필요)
1. **가정: 모든 Competency는 동일한 5점 척도를 사용한다**
   - **가정 내용:** Technical과 Soft Skill 모두 1-5점
   - **리스크:** 일부 Competency는 다른 척도가 더 적합할 수 있음 (예: Yes/No)
   - **검증 계획:** V1 파일럿에서 보리에게 "모든 역량을 5점 척도로 평가 가능한지" 질문
   - **검증 기한:** Week 6

2. **가정: behavioralExample은 각 Competency Rubric마다 다르다 (재사용 불가)**
   - **가정 내용:** "RESTful API 3점"과 "Communication 3점"의 behavioralExample은 완전히 다름
   - **리스크:** 중복 작성 부담 (각 Competency마다 5개 점수 × 행동 설명)
   - **검증 계획:** Week 3-4 Rubric 작성 시 패턴 검증
   - **검증 기한:** Week 4

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [02-evaluation-consistency.md](../../../opportunities/02-evaluation-consistency.md)
- **Interview Snapshot:** [snapshot-borry-2025-11-16.md](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md)
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **관련 개념:**
  - [competency.md](competency.md) (Rubric이 평가하는 대상)
  - [proficiency-level.md](proficiency-level.md) (Rubric 점수와 매핑)
  - [position.md](position.md) (Rubric을 사용하는 맥락)
- **Problem Mapping:** [problem-02-evaluation-consistency.md](../../mapping/problem-02-evaluation-consistency.md) (작성 예정)

### 외부 표준
- **SHRM:** [Behavioral Interviewing Guide](https://www.shrm.org/topics-tools/tools/toolkits/behavioral-interviewing)
- **AAC&U:** [VALUE Rubrics](https://www.aacu.org/trending-topics/value-rubrics)
- **Academic:** [Designing Effective Rubrics (Carnegie Mellon)](https://www.cmu.edu/teaching/designteach/design/assessmentgrades/rubrics/)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]

**중점 검토 항목:**
- [ ] 5점 척도가 실제 면접에서 사용하기 적합한가?
- [ ] behavioralExample이 충분히 구체적인가?
- [ ] sampleQuestions가 실제 면접에서 유용한가?
- [ ] Rubric 사용이 조율 시간을 실제로 15분으로 단축시킬 수 있는가?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- Draft 상태, Borry 검토 대기 중
- **Week 2 핵심 개념 7개 모두 완료!**

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영 (7개 개념 전체)
- [ ] 4개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] **주요:** Borry와 개념 검토 세션 (Week 2 말)
- [ ] Week 3-4: 10-15개 Competency에 각각 Rubric 작성
- [ ] Measurement Pattern 문서 작성 (`../design-patterns/measurement-pattern.md`)
- [ ] Rubric Design Guide 작성 (`../../03-implementation/standards/rubric-design-guide.md`)
- [ ] Behavioral Interviewing Guide 작성 (`../../03-implementation/standards/behavioral-interviewing.md`)
- [ ] Problem 02 매핑 문서 작성 (`../../mapping/problem-02-evaluation-consistency.md`)

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (Technical Rubric, Soft Skill Rubric, 면접 시트)
- [x] 각 예시마다 5개 점수별 행동적 설명 포함
- [x] 증거 기반 (Opportunity 02, 보리 인터뷰 링크)
- [x] 검증 체크리스트 작성

---

*이 문서는 온톨로지의 핵심입니다. Evaluation Rubric의 품질이 면접 일관성을 결정합니다. 보리의 파일럿 피드백이 특히 중요합니다.*

---

## 🎉 Week 2 완료!

**완성된 7개 핵심 개념:**
1. ✅ Job Family (C-001)
2. ✅ Job Function (C-002)
3. ✅ Position (C-003)
4. ✅ Competency (C-004) - 핵심!
5. ✅ Proficiency Level (C-005)
6. ✅ Job Level (C-006)
7. ✅ Evaluation Rubric (C-007) - 핵심!

**다음 단계:** Week 2 말 Borry 검토 세션 → Week 3-4 구체적 예시 작성
