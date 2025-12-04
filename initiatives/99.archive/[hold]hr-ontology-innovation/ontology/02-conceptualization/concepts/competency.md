# Competency (역량)

**개념 ID:** C-004
**생성일:** 2025-11-26
**최종 수정일:** 2025-11-26
**작성자:** Terry
**검토자:** Borry (검토 대기), Berry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | **Problem 01 (스킬/역량 표준화) - 핵심 개념!** |
| **우선순위** | **Critical** |
| **의존 개념** | Proficiency Level (C-005) |
| **증거 출처** | [opportunity-01](../../../opportunities/01-skill-standardization.md), [snapshot-borry-2025-11-16](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md) |
| **표준 참조** | O*NET Skills, LinkedIn Skills, SFIA Skills |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Competency는 **특정 직무를 수행하기 위해 필요한 표준화된 스킬, 지식, 능력**입니다.

### 상세 설명
Competency는 "RESTful API Development", "Communication", "Data Analysis" 같은 구체적인 역량을 정의합니다. 각 Competency는 명확한 정의와 평가 가능한 행동적 설명을 포함합니다.

**왜 이 개념이 Problem 01을 해결하는가?**

**Before (Competency 정의 없이):**
- 보리: "시니어 백엔드 엔지니어 JD를 작성하려면..."
  1. 백엔드 개발이 뭔지 구글 검색 (30분)
  2. 시니어가 뭔지 팀에 물어보기 (1시간, 팀마다 답 다름)
  3. 기존 JD 복붙 후 수정 (30분, 일관성 없음)
  - **총 2시간, 팀 간 합의 1주일**

**After (Competency 정의 있음):**
- 보리: "시니어 백엔드 엔지니어 JD를 작성하려면..."
  1. Position "Senior Backend Engineer" 조회 (5분)
  2. requiredCompetencies 리스트 확인 (5분)
     - COMP-001: RESTful API Development (Advanced)
     - COMP-002: Database Design (Advanced)
     - COMP-010: Communication (Advanced)
  3. 각 Competency 정의와 행동적 설명 복사 (20분)
  - **총 30분, 팀 간 합의 즉시 (표준 정의 사용)**

**HR 도메인에서의 역할:**
- JD 작성의 핵심 블록 (직무 요구사항 = Competencies 리스트)
- 면접 평가 기준 (이 Competency를 평가하기 위한 질문은?)
- 온보딩 체크리스트 (신입이 이 Competency를 습득했는가?)
- 성과 평가 기준 (연말 리뷰 시 Competency 성장 측정)

### 동의어 (Synonyms)
- 역량
- Skill
- Capability
- Ability
- Competence (단수형, 의미 동일)

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Proficiency Level**: Competency는 "무엇"을 할 수 있는가 (RESTful API), Proficiency Level은 "얼마나 잘"하는가 (Advanced)
- **vs Job Function**: Job Function은 역할 (Backend Engineer), Competency는 그 역할에 필요한 구체적 스킬들
- **vs Responsibility**: Responsibility는 "해야 할 일" (결제 API 개발), Competency는 "그 일을 하기 위한 능력" (RESTful API Development)

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- **Competency Category** (V2 확장)
  - 예: Technical Competencies, Soft Skills, Domain Knowledge

### 하위 개념 (Narrower Concepts)
- 없음 (Competency는 원자적 개념, 더 이상 쪼개지지 않음)

### 관련 개념 (Related Concepts)
- **Proficiency Level** (hasProficiency 관계)
  - 관계 설명: Competency는 여러 Proficiency Levels로 측정됨
  - 예시: "RESTful API Development" → Beginner, Intermediate, Advanced, Expert

- **Position** (requiredBy 관계)
  - 관계 설명: Position은 여러 Competencies를 요구함
  - 예시: "Senior Backend Engineer - Payments" → [RESTful API (Advanced), Database Design (Advanced), ...]

- **Evaluation Rubric** (evaluatedBy 관계)
  - 관계 설명: Competency는 Rubric으로 평가됨
  - 예시: "RESTful API Development (Advanced)" → 5점 척도 Rubric

- **Job Function** (inheritedFrom 관계, V2 확장)
  - 관계 설명: Job Function은 Base Competencies를 정의
  - 예시: Backend Engineer → [Version Control (Intermediate), Problem Solving (Intermediate)]

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|---------|---------|
| id | String | 필수 | 고유 식별자 | "COMP-001" |
| name | String | 필수 | Competency 이름 (영어) | "RESTful API Development" |
| nameKo | String | 필수 | 한국어 이름 | "RESTful API 개발" |
| definition | String | 필수 | 명확한 정의 | "HTTP 프로토콜 기반의 RESTful API를 설계, 개발, 문서화하는 능력" |
| category | Enum | 필수 | 역량 카테고리 | "TECHNICAL", "SOFT_SKILL", "DOMAIN_KNOWLEDGE" |
| behavioralIndicators | Array<String> | 필수 | 관찰 가능한 행동적 설명 | ["명확한 엔드포인트 네이밍", "적절한 HTTP 메서드 사용", ...] |
| proficiencyLevels | Array<ProficiencyLevel> | 필수 | 측정 가능한 숙련도 레벨 | [Beginner, Intermediate, Advanced, Expert] |
| linkedInSkillName | String | 선택 | LinkedIn 스킬 이름 (매칭) | "RESTful APIs" |
| onetSkillId | String | 선택 | O*NET 스킬 ID | "2.B.5.a" (Technology Design) |
| relatedCompetencies | Array<String> | 선택 | 관련 Competencies | ["API Documentation", "HTTP Protocol"] |
| assessmentMethods | Array<String> | 선택 | 평가 방법 제안 | ["코딩 테스트", "시스템 디자인 인터뷰", "포트폴리오 리뷰"] |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: RESTful API Development (Technical Competency)
**맥락:** V1 파일럿의 핵심 Technical Competency, Backend Engineer의 필수 역량

**구체적 예시:**
```json
{
  "id": "COMP-001",
  "name": "RESTful API Development",
  "nameKo": "RESTful API 개발",
  "definition": "HTTP 프로토콜 기반의 RESTful API를 설계, 개발, 문서화하고 유지보수하는 능력",
  "category": "TECHNICAL",
  "behavioralIndicators": [
    "리소스 중심의 명확한 엔드포인트 네이밍 (예: /users/{id}/orders)",
    "적절한 HTTP 메서드 사용 (GET, POST, PUT, DELETE, PATCH)",
    "상태 코드의 정확한 사용 (200, 201, 400, 404, 500 등)",
    "요청/응답의 일관된 JSON 스키마 설계",
    "API 버저닝 전략 적용 (예: /v1/users)",
    "Swagger/OpenAPI를 사용한 API 문서 자동화",
    "Rate limiting, Pagination 구현",
    "에러 응답의 표준화 및 명확한 에러 메시지"
  ],
  "proficiencyLevels": [
    {
      "level": "Beginner",
      "description": "기본적인 CRUD API를 구현할 수 있음. 튜토리얼을 참고하여 단순한 엔드포인트 작성 가능.",
      "behavioralExample": "GET /users 엔드포인트를 만들어 사용자 리스트를 JSON으로 반환할 수 있음"
    },
    {
      "level": "Intermediate",
      "description": "RESTful 원칙을 이해하고 일관된 API를 독립적으로 설계할 수 있음. 에러 핸들링과 문서화 가능.",
      "behavioralExample": "인증이 필요한 CRUD API를 설계하고, Swagger 문서를 작성하며, 적절한 HTTP 상태 코드를 사용함"
    },
    {
      "level": "Advanced",
      "description": "복잡한 비즈니스 로직을 RESTful 구조로 설계하고, 성능과 보안을 고려한 API를 개발할 수 있음. API 디자인 가이드라인을 제시 가능.",
      "behavioralExample": "결제 API에 idempotency key를 도입하고, rate limiting을 구현하며, HATEOAS를 적용한 self-descriptive API 설계"
    },
    {
      "level": "Expert",
      "description": "API 아키텍처를 주도하고, 팀의 API 표준을 수립함. GraphQL, gRPC 등 대안 기술과 비교 평가 가능.",
      "behavioralExample": "회사 전체 API 디자인 가이드를 작성하고, API Gateway 아키텍처를 설계하며, 마이크로서비스 간 API 통신 전략 수립"
    }
  ],
  "linkedInSkillName": "RESTful APIs",
  "onetSkillId": "2.B.5.a",
  "relatedCompetencies": ["COMP-015: API Documentation", "COMP-016: HTTP Protocol", "COMP-020: API Security"],
  "assessmentMethods": [
    "라이브 코딩: 간단한 RESTful API 구현 (30분)",
    "시스템 디자인: 복잡한 도메인의 API 설계 설명",
    "코드 리뷰: 기존 API 코드의 개선점 찾기",
    "포트폴리오: 설계한 API의 Swagger 문서 리뷰"
  ]
}
```

**관찰:** 이 Competency 정의만으로도 보리는 "백엔드 엔지니어가 뭘 할 수 있어야 하는지" 명확히 알 수 있습니다. behavioralIndicators는 면접 질문 작성에 직접 활용 가능합니다.

### 예시 2: Communication & Collaboration (Soft Skill)
**맥락:** 모든 Position에 공통적으로 필요한 Soft Skill

**구체적 예시:**
```json
{
  "id": "COMP-010",
  "name": "Communication & Collaboration",
  "nameKo": "커뮤니케이션 및 협업",
  "definition": "다양한 이해관계자(팀원, 타 부서, 경영진)와 효과적으로 소통하고 협업하여 목표를 달성하는 능력",
  "category": "SOFT_SKILL",
  "behavioralIndicators": [
    "기술 개념을 비기술자에게 쉽게 설명",
    "회의에서 명확하고 간결한 의견 제시",
    "문서(PRD, RFC)를 논리적으로 작성",
    "갈등 상황에서 건설적인 해결책 제시",
    "비동기 커뮤니케이션(Slack, 이메일)을 효과적으로 사용",
    "피드백을 수용적으로 받아들이고 개선에 반영",
    "팀원의 의견을 경청하고 존중하는 태도"
  ],
  "proficiencyLevels": [
    {
      "level": "Beginner",
      "description": "팀 내부에서 기본적인 의사소통이 가능함. 업무 현황을 보고할 수 있음.",
      "behavioralExample": "데일리 스탠드업에서 어제 한 일, 오늘 할 일, 블로커를 명확히 공유함"
    },
    {
      "level": "Intermediate",
      "description": "타 부서와 원활히 소통하고, 문서로 복잡한 내용을 전달할 수 있음. 갈등을 건설적으로 해결.",
      "behavioralExample": "디자이너와 기술적 제약을 설명하며 대안을 제시하고, RFC 문서를 작성하여 팀의 합의를 이끌어냄"
    },
    {
      "level": "Advanced",
      "description": "경영진에게 기술 전략을 설득력 있게 설명하고, 크로스펑셔널 프로젝트를 주도할 수 있음.",
      "behavioralExample": "CEO에게 기술 부채 해소 계획을 비즈니스 가치와 연결하여 발표하고 예산 승인을 받음"
    },
    {
      "level": "Expert",
      "description": "조직 문화와 소통 방식을 개선하고, 멘토링을 통해 팀원의 소통 능력을 향상시킴.",
      "behavioralExample": "팀의 RFC 프로세스를 도입하고, 주니어 엔지니어에게 기술 글쓰기를 코칭함"
    }
  ],
  "linkedInSkillName": "Communication",
  "onetSkillId": "2.A.1.a",
  "relatedCompetencies": ["COMP-011: Presentation Skills", "COMP-012: Technical Writing"],
  "assessmentMethods": [
    "행동 면접: 과거 협업 경험 중 갈등 해결 사례",
    "프레젠테이션: 기술 주제를 비기술자에게 5분 설명",
    "문서 리뷰: 작성한 기술 문서의 명확성 평가"
  ]
}
```

**관찰:** Soft Skill도 구체적인 behavioralIndicators로 정의되면 평가 가능해집니다. "커뮤니케이션 좋은 사람"이라는 모호한 표현 대신, "RFC 문서를 작성하여 팀 합의를 이끌어낼 수 있는 사람"으로 명확히 정의됩니다.

### 예시 3: Data-Driven Decision Making (PM Competency)
**맥락:** Product Manager의 핵심 역량

**구체적 예시:**
```json
{
  "id": "COMP-031",
  "name": "Data-Driven Decision Making",
  "nameKo": "데이터 기반 의사결정",
  "definition": "정량적/정성적 데이터를 수집, 분석하여 제품 의사결정에 활용하고, 가설을 검증하는 능력",
  "category": "DOMAIN_KNOWLEDGE",
  "behavioralIndicators": [
    "핵심 지표(OMTM)를 정의하고 추적",
    "A/B 테스트를 설계하고 결과를 해석",
    "SQL로 데이터를 추출하고 분석",
    "데이터 시각화(대시보드)를 만들어 인사이트 전달",
    "정성적 데이터(인터뷰)와 정량적 데이터를 결합",
    "가설 기반 실험 문화를 조성",
    "통계적 유의성을 이해하고 오판 방지"
  ],
  "proficiencyLevels": [
    {
      "level": "Beginner",
      "description": "기본적인 지표를 이해하고, 대시보드를 읽을 수 있음. SQL 쿼리를 작성할 수 있음.",
      "behavioralExample": "Google Analytics에서 MAU, DAU를 확인하고, 간단한 SQL로 사용자 수를 조회함"
    },
    {
      "level": "Intermediate",
      "description": "A/B 테스트를 독립적으로 설계하고 실행할 수 있음. 데이터를 기반으로 제품 개선 제안 가능.",
      "behavioralExample": "버튼 색상 A/B 테스트를 설계하고, p-value를 계산하여 유의미한 결과를 도출함"
    },
    {
      "level": "Advanced",
      "description": "복잡한 실험을 설계하고, 여러 지표를 종합하여 전략적 의사결정을 내림. 팀에 데이터 문화 전파.",
      "behavioralExample": "퍼널 분석으로 이탈 구간을 찾고, 다변량 테스트를 설계하여 전환율 20% 개선. 팀에 실험 프레임워크 도입"
    },
    {
      "level": "Expert",
      "description": "데이터 전략을 수립하고, 조직의 측정 시스템을 설계함. 머신러닝 모델 도입 등 고급 분석 주도.",
      "behavioralExample": "회사의 North Star Metric을 정의하고, 데이터 웨어하우스 구축을 주도하며, 예측 모델을 제품에 통합"
    }
  ],
  "linkedInSkillName": "Data Analysis",
  "onetSkillId": "2.A.2.a",
  "relatedCompetencies": ["COMP-032: SQL", "COMP-033: A/B Testing", "COMP-034: Statistical Analysis"],
  "assessmentMethods": [
    "케이스 스터디: 주어진 데이터로 제품 개선 제안",
    "SQL 테스트: 복잡한 쿼리 작성 (30분)",
    "과거 경험: A/B 테스트 설계 및 결과 해석 사례 발표"
  ]
}
```

**관찰:** PM Competency는 Engineering과 다른 측정 기준을 가집니다. "데이터 기반 의사결정"이라는 추상적 개념을 "A/B 테스트 설계 및 p-value 계산"으로 구체화합니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **SCQ-01-001** "우리 회사의 '시니어 백엔드 엔지니어'는 어떤 competencies를 가져야 하는가?"
   - **예상 답변:** "Position 'Senior Backend Engineer - Payments'를 조회하면, requiredCompetencies 리스트가 나옵니다: COMP-001 (RESTful API Development - Advanced), COMP-002 (Database Design - Advanced), COMP-010 (Communication - Advanced) 등"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

2. **SCQ-01-002** "Payments 팀과 Social 팀의 시니어 백엔드 엔지니어는 요구사항이 어떻게 다른가?"
   - **예상 답변:** "두 Position의 requiredCompetencies를 비교하면, Payments는 'Transaction Management (Advanced)' 필수, Social은 'Real-time Systems (Advanced)' 필수 등 차이 확인 가능"
   - **출처:** `../../01-specification/competency-questions.md` (Medium priority, V2)

3. **SCQ-01-003** "Frontend Engineer와 Backend Engineer의 공통 competencies는 무엇인가?"
   - **예상 답변:** "두 Job Function의 Base Competencies를 교집합하면, COMP-010 (Communication), COMP-050 (Problem Solving), COMP-051 (Git) 등이 공통 역량으로 도출됨"
   - **출처:** `../../01-specification/competency-questions.md` (Medium priority, V2)

4. **SCQ-01-005** "'Advanced' 수준의 RESTful API Development이란 무엇인가?"
   - **예상 답변:** "Competency 'COMP-001'의 proficiencyLevels 중 'Advanced'를 조회하면, '복잡한 비즈니스 로직을 RESTful 구조로 설계하고, 성능과 보안을 고려한 API 개발 가능. 예: idempotency key 도입, rate limiting 구현' 등 구체적 행동 설명 확인 가능"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

5. **VCQ-02-002** "'Communication' 역량을 면접에서 어떻게 평가하는가?"
   - **예상 답변:** "Competency 'COMP-010'의 assessmentMethods를 조회하면, '행동 면접: 과거 협업 경험 중 갈등 해결 사례', '프레젠테이션: 기술 주제를 비기술자에게 5분 설명' 등 구체적 평가 방법 제공"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, name, nameKo, definition, category, behavioralIndicators, proficiencyLevels)
- [x] 최소 3개 실제 사례 제공 (Technical, Soft Skill, Domain Knowledge)
- [x] 각 Competency마다 4개 Proficiency Levels 정의
- [x] 최소 5개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [x] 상위/하위 개념 관계가 논리적 (Proficiency Level과 연결)
- [x] 동의어가 실제로 같은 의미
- [x] 예시가 정의와 일치
- [x] behavioralIndicators가 관찰 가능하고 구체적

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [ ] Berry (CTO)가 기술 Competency 정의에 동의 - **검토 대기**
- [x] 개발자가 구현 가능 (속성 명확, JSON 스키마 제공)
- [x] 모호한 표현 없음 (추상적 개념을 행동적으로 정의)

### 증거 기반 (Evidence-grounded)
- [x] Opportunity 문서 링크됨 (Problem 01 핵심 해결책)
- [x] 실제 문제 해결에 기여 (보리의 JD 작성 시간 2시간 → 30분)
- [x] 예시가 실제 데이터 기반 (보리 인터뷰에서 언급한 역량들)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴 1: Descriptive Pattern (설명적 패턴)**

**적용 이유:**
- Competency는 다른 개념(Position, Job Function)을 설명하는 속성
- "이 Position은 어떤 역량이 필요한가?"를 표현

**구현 방법:**
```
Position (주체)
└── requiredCompetencies (관계)
    └── Competency (설명)

예시:
Senior Backend Engineer - Payments
└── requires
    ├── RESTful API Development (Advanced)
    ├── Database Design (Advanced)
    └── Communication (Advanced)
```

**적용된 패턴 2: Atomic Concept Pattern (원자적 개념)**

**적용 이유:**
- Competency는 더 이상 쪼개지지 않는 최소 단위
- 재사용성과 조합 가능성 최대화

**구현 방법:**
```
Competency는 독립적으로 정의되고, Position에서 조합

예시:
COMP-001 (RESTful API) + COMP-002 (DB Design) + COMP-010 (Communication)
= Senior Backend Engineer

COMP-020 (React) + COMP-021 (State Management) + COMP-010 (Communication)
= Mid Frontend Engineer

→ COMP-010 (Communication)은 재사용됨
```

**참고 문서:** `../design-patterns/descriptive-pattern.md`, `../design-patterns/atomic-concept-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### O*NET Skills 매핑
- **O*NET Structure:** Abilities, Skills, Knowledge 3개 카테고리
  - **Abilities:** 2.A.1.a (Oral Comprehension) → COMP-010 (Communication)
  - **Skills:** 2.B.5.a (Technology Design) → COMP-001 (RESTful API)
  - **Knowledge:** 2.C.3.a (Computers and Electronics) → COMP-002 (Database)
- **매핑 근거:** O*NET의 Skills를 Competency로 1:1 매핑하여 법적 방어력 확보
- **참고:** [O*NET Skills Search](https://www.onetonline.org/find/descriptor/browse/Skills/)

### LinkedIn Skills 매핑
- **LinkedIn Skill Graph:** LinkedIn은 32,000+ 표준화된 스킬 보유
- **V1 매핑 전략:**
  - 각 Competency의 `linkedInSkillName` 필드에 LinkedIn 스킬 이름 매핑
  - 예: COMP-001 → "RESTful APIs" (LinkedIn에서 200만+ 프로필이 사용)
- **혜택:** JD 작성 시 LinkedIn 검색 최적화, 후보자 프로필 자동 매칭 (V2)
- **참고:** [LinkedIn Skills](https://www.linkedin.com/help/linkedin/answer/a549047)

### SFIA Skills 참조
- **SFIA Framework:** IT 도메인 스킬 102개 정의 + 7단계 레벨
- **V1 참조 방법:**
  - SFIA Skills를 Competency 정의 시 참고 (definition, behavioralIndicators 작성)
  - 예: SFIA "Application Support" → COMP-005 (Production Support)
- **V2 확장:** SFIA 레벨을 Proficiency Level과 매핑 (SFIA Level 4 = Advanced)
- **참고:** [SFIA 8 Skills](https://sfia-online.org/en/sfia-8/skills)

**참고 문서:**
- `../../03-implementation/standards/onet-mapping.md` (작성 예정)
- `../../03-implementation/standards/linkedin-skills-mapping.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-26 | 초안 생성 | Terry | Week 2 핵심 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **Competency를 몇 개까지 정의할 것인가?**
   - **질문:** V1에서 몇 개의 Competencies를 정의해야 파일럿 테스트 가능한가?
   - **우선순위:** High (Week 3 전 결정 필요)
   - **해결 방법:** 보리에게 "Senior Backend Engineer JD 작성에 필요한 최소 Competencies 수" 질문
   - **예상 답변:** 약 10-15개 (Technical 7-10개, Soft Skill 3-5개)

2. **Soft Skill과 Technical Competency의 비율은?**
   - **질문:** Position에서 Soft Skill이 차지하는 비중은?
   - **우선순위:** Medium
   - **해결 방법:** 기존 JD 분석 (보리 제공) → 평균 Soft Skill 비율 계산
   - **예상 답변:** 대부분 Position에서 70% Technical, 30% Soft Skill

3. **Competency의 정의는 누가 작성하는가?**
   - **질문:** V1 이후 신규 Competency 추가 시, 정의 작성 책임은?
   - **우선순위:** Low (V2 거버넌스 이슈)
   - **해결 방법:** V2에서 Competency Governance 프로세스 수립
   - **예상 답변:** HR + 해당 도메인 전문가(CTO, CPO) 협업

### 가정 (검증 필요)
1. **가정: 하나의 Competency는 모든 Position에서 동일한 정의를 가진다**
   - **가정 내용:** "Communication"은 Backend, Frontend, PM에서 같은 정의 사용
   - **리스크:** 실제로는 직군별로 Communication 의미가 다를 수 있음 (개발자의 소통 vs PM의 소통)
   - **검증 계획:** V1 파일럿에서 보리와 베리에게 "COMP-010 (Communication) 정의가 모든 직군에 적용 가능한지" 확인
   - **검증 기한:** Week 6 (파일럿 테스트)

2. **가정: Proficiency Level은 4단계면 충분하다 (Beginner, Intermediate, Advanced, Expert)**
   - **가정 내용:** SFIA의 7단계보다 단순한 4단계로 시작
   - **리스크:** 너무 단순해서 세밀한 평가 불가능
   - **검증 계획:** 파일럿에서 보리에게 "4단계로 충분한지, 5단계가 필요한지" 질문
   - **검증 기한:** Week 6
   - **대안:** V2에서 5단계로 확장 (Beginner, Intermediate, Advanced, Expert, Master)

3. **가정: behavioralIndicators는 5-8개면 충분하다**
   - **가정 내용:** 각 Competency마다 5-8개 행동 지표 제공
   - **리스크:** 너무 많으면 관리 부담, 너무 적으면 모호함
   - **검증 계획:** Week 3-4 Competency 작성 후 보리 피드백
   - **검증 기한:** Week 4

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **Interview Snapshot:** [snapshot-borry-2025-11-16.md](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md)
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **관련 개념:**
  - [position.md](position.md) (Competency를 요구하는 개념)
  - [job-function.md](job-function.md) (Base Competencies 정의)
  - proficiency-level.md (Competency의 숙련도, 다음 작성 예정)
  - evaluation-rubric.md (Competency 평가 방법, 작성 예정)
- **Problem Mapping:** [problem-01-skill-standardization.md](../../mapping/problem-01-skill-standardization.md)

### 외부 표준
- **O*NET:** [Skills Search](https://www.onetonline.org/find/descriptor/browse/Skills/)
- **SFIA:** [SFIA 8 Skills Reference](https://sfia-online.org/en/sfia-8/skills)
- **LinkedIn:** [Skills Help Article](https://www.linkedin.com/help/linkedin/answer/a549047)
- **Academic:** [Competency Modeling Best Practices (SHRM)](https://www.shrm.org/topics-tools/tools/toolkits/developing-competency-model)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]

**중점 검토 항목:**
- [ ] Competency 정의가 실제 JD 작성에 충분히 명확한가?
- [ ] behavioralIndicators가 면접 질문 작성에 도움이 되는가?
- [ ] Proficiency Levels의 구분이 실무에서 유용한가?
- [ ] Soft Skill Competencies (Communication 등)의 정의가 적절한가?
- [ ] V1에서 필요한 최소 Competency 개수는?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

### Berry (CTO) - [검토 대기]
> [Berry 피드백 예정]

**중점 검토 항목:**
- [ ] Technical Competencies (RESTful API, Database Design 등)의 정의가 기술적으로 정확한가?
- [ ] Proficiency Levels의 행동적 설명이 현실적인가? (예: Advanced 레벨의 "idempotency key 도입")
- [ ] 누락된 중요 Technical Competency가 있는가?
- [ ] assessmentMethods가 실제 기술 면접에서 활용 가능한가?

**Action Items:**
- [ ] Berry 검토 요청 (Week 2 말)

**반영 여부:** 대기 중

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- Draft 상태, Borry와 Berry 검토 대기 중

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영
- [ ] Berry 검토 및 피드백 반영
- [ ] Proficiency Level (C-005) 개념 정의 완료 (의존성 해소)
- [ ] V1 필요 최소 Competency 리스트 확정 (Week 3)
- [ ] 5개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] **CRITICAL:** Proficiency Level (C-005) 개념 작성 (의존성: Competency가 이것 필요)
- [ ] Week 3-4: 10-15개 V1 Competencies 정의 작성
  - Technical: RESTful API, Database Design, System Architecture, Testing, Git, ...
  - Soft Skills: Communication, Problem Solving, Time Management, ...
  - PM: Product Strategy, Data Analysis, User Research, ...
- [ ] Descriptive Pattern 문서 작성 (`../design-patterns/descriptive-pattern.md`)
- [ ] Atomic Concept Pattern 문서 작성 (`../design-patterns/atomic-concept-pattern.md`)
- [ ] O*NET Skills 매핑 문서 작성 (`../../03-implementation/standards/onet-mapping.md`)
- [ ] LinkedIn Skills 매핑 전략 문서 (`../../03-implementation/standards/linkedin-skills-mapping.md`)

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (3개: Technical, Soft Skill, PM)
- [x] 각 예시마다 4개 Proficiency Levels 포함
- [x] 증거 기반 (Opportunity 01, 보리 인터뷰 링크)
- [x] 검증 체크리스트 작성
- [x] behavioralIndicators를 모두 관찰 가능하고 구체적으로 작성

---

*이 문서는 온톨로지의 핵심입니다. Competency 정의의 품질이 전체 프로젝트의 성공을 결정합니다. 보리와 베리의 세심한 검토가 필수적입니다.*
