# Position (포지션)

**개념 ID:** C-003
**생성일:** 2025-11-26
**최종 수정일:** 2025-11-26
**작성자:** Terry
**검토자:** Borry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | Problem 01 (스킬/역량 표준화), Problem 02 (평가 기준 일관성) |
| **우선순위** | High |
| **의존 개념** | Job Function (C-002), Job Level (C-006) |
| **증거 출처** | [opportunity-01](../../../opportunities/01-skill-standardization.md) |
| **표준 참조** | O*NET Occupation Codes |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Position은 조직에서 **실제로 채용하는 구체적인 직무 포지션**입니다.

### 상세 설명
Position은 Job Function + Job Level + Team Context를 결합한 실제 채용 단위입니다. 예를 들어 "Senior Backend Engineer - Payments Team"은 하나의 Position입니다.

**왜 이 개념이 필요한가?**
- 채용 공고 작성 시 정확한 직무 명세 제공
- JD 템플릿의 기초 데이터
- 평가 기준의 기준점 (이 Position에 필요한 Competencies는?)
- 팀 간 동일 직무 비교 가능 (Payments 팀 시니어 vs Social 팀 시니어)

**HR 도메인에서의 역할:**
- 채용 공고의 직무명
- 면접 평가 시 "어떤 Position에 대한 평가인가?"의 기준
- 온보딩 체크리스트 생성의 기반
- 내부 이동(transfer) 시 직무 비교

### 동의어 (Synonyms)
- 포지션
- Role
- 채용 포지션
- Hiring Position
- Job Opening

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Job Function**: Job Function은 역할 유형 (Backend Engineer), Position은 실제 채용 슬롯 (Senior Backend Engineer - Payments)
- **vs Job Title**: Job Title은 사람의 명함 직함, Position은 조직의 채용 단위 (한 명이 여러 직함 가질 수 있음)
- **vs Job Level**: Job Level은 시니어리티 (Senior, Mid), Position은 Function + Level + Context 조합

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- **Job Function** (instanceOf 관계)
  - 예: Senior Backend Engineer - Payments는 Backend Engineer의 인스턴스

### 하위 개념 (Narrower Concepts)
- 없음 (Position은 최하위 개념, 실제 채용 단위)

### 관련 개념 (Related Concepts)
- **Job Level** (hasLevel 관계)
  - 관계 설명: Position은 하나의 Job Level을 가짐
  - 예시: Senior Backend Engineer - Payments → Senior Level

- **Competency** (requires 관계)
  - 관계 설명: Position은 여러 Required Competencies를 가짐
  - 예시: Senior Backend Engineer - Payments → [RESTful API (Advanced), Database Design (Advanced), ...]

- **Team** (belongsTo 관계, V2 확장)
  - 관계 설명: Position은 특정 팀에 속함
  - 예시: Senior Backend Engineer - Payments → Payments Team

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|---------|---------|
| id | String | 필수 | 고유 식별자 | "POS-SENIOR-BE-PAYMENTS" |
| name | String | 필수 | Position 전체 이름 | "Senior Backend Engineer - Payments Team" |
| nameKo | String | 필수 | 한국어 이름 | "시니어 백엔드 엔지니어 - 결제팀" |
| jobFunctionId | String | 필수 | 소속 Job Function | "JFN-BACKEND-ENG" |
| jobLevelId | String | 필수 | 시니어리티 레벨 | "LVL-SENIOR" |
| teamContext | String | 선택 | 팀 정보 (V1에서는 name에 포함) | "Payments Team" |
| requiredCompetencies | Array<CompetencyRequirement> | 필수 | 필요한 역량 + 숙련도 | [{competencyId, proficiencyLevel}] |
| description | String | 필수 | 직무 상세 설명 | "결제 시스템 백엔드 개발 및 운영" |
| responsibilities | Array<String> | 필수 | 주요 책임 | ["결제 API 개발", "트랜잭션 안정성 보장"] |
| onetCode | String | 선택 | O*NET 직업 코드 | "15-1252.00" (Software Developers) |
| status | Enum | 필수 | 채용 상태 | "OPEN", "CLOSED", "ON_HOLD" |
| openedDate | Date | 선택 | 채용 공고 오픈일 | "2025-11-26" |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: Senior Backend Engineer - Payments Team
**맥락:** V1 파일럿 테스트용 메인 예시 (보리가 가장 자주 채용하는 포지션)

**구체적 예시:**
```json
{
  "id": "POS-SENIOR-BE-PAYMENTS",
  "name": "Senior Backend Engineer - Payments Team",
  "nameKo": "시니어 백엔드 엔지니어 - 결제팀",
  "jobFunctionId": "JFN-BACKEND-ENG",
  "jobLevelId": "LVL-SENIOR",
  "teamContext": "Payments Team",
  "requiredCompetencies": [
    {
      "competencyId": "COMP-001",
      "competencyName": "RESTful API Development",
      "proficiencyLevel": "Advanced",
      "justification": "결제 API는 회사의 핵심 매출 경로"
    },
    {
      "competencyId": "COMP-002",
      "competencyName": "Database Design & Optimization",
      "proficiencyLevel": "Advanced",
      "justification": "결제 트랜잭션은 데이터 정합성이 생명"
    },
    {
      "competencyId": "COMP-003",
      "competencyName": "System Architecture",
      "proficiencyLevel": "Intermediate",
      "justification": "시니어는 아키텍처 의사결정에 참여"
    },
    {
      "competencyId": "COMP-010",
      "competencyName": "Communication & Collaboration",
      "proficiencyLevel": "Advanced",
      "justification": "결제팀은 모든 팀과 협업 필요"
    }
  ],
  "description": "결제 시스템의 백엔드 API 개발 및 운영을 담당합니다. 안정적이고 확장 가능한 결제 인프라를 구축하고 유지보수합니다.",
  "responsibilities": [
    "결제 API 설계 및 개발 (RESTful)",
    "결제 트랜잭션 안정성 및 정합성 보장",
    "외부 PG사 연동 및 유지보수",
    "결제 시스템 성능 모니터링 및 최적화",
    "시니어로서 주니어 엔지니어 멘토링"
  ],
  "onetCode": "15-1252.00",
  "status": "OPEN",
  "openedDate": "2025-11-26"
}
```

**관찰:** 이 Position은 Job Function (Backend Engineer)의 Base Competencies를 상속받고, 추가로 Payments 팀 특화 요구사항을 더합니다. 보리가 JD 작성 시 이 JSON을 기반으로 30분 내 작성 가능해야 합니다.

### 예시 2: Mid Frontend Engineer - Social Team
**맥락:** V1 범위, 미드 레벨 엔지니어 예시

**구체적 예시:**
```json
{
  "id": "POS-MID-FE-SOCIAL",
  "name": "Mid Frontend Engineer - Social Team",
  "nameKo": "미드 프론트엔드 엔지니어 - 소셜팀",
  "jobFunctionId": "JFN-FRONTEND-ENG",
  "jobLevelId": "LVL-MID",
  "teamContext": "Social Team",
  "requiredCompetencies": [
    {
      "competencyId": "COMP-020",
      "competencyName": "React Development",
      "proficiencyLevel": "Intermediate",
      "justification": "소셜 기능의 복잡한 UI 구현"
    },
    {
      "competencyId": "COMP-021",
      "competencyName": "State Management (Redux/Context)",
      "proficiencyLevel": "Intermediate",
      "justification": "실시간 피드 상태 관리"
    },
    {
      "competencyId": "COMP-022",
      "competencyName": "Responsive Design",
      "proficiencyLevel": "Intermediate",
      "justification": "모바일 웹 지원 필수"
    },
    {
      "competencyId": "COMP-010",
      "competencyName": "Communication & Collaboration",
      "proficiencyLevel": "Intermediate",
      "justification": "디자이너 및 백엔드와 협업"
    }
  ],
  "description": "소셜 기능의 프론트엔드를 개발하고 사용자 경험을 개선합니다.",
  "responsibilities": [
    "소셜 피드 UI 컴포넌트 개발",
    "실시간 알림 기능 구현",
    "프론트엔드 성능 최적화",
    "디자인 시스템 적용 및 개선"
  ],
  "onetCode": "15-1254.00",
  "status": "OPEN",
  "openedDate": "2025-11-20"
}
```

**관찰:** Mid Level은 Senior보다 Advanced 숙련도 요구사항이 적습니다. Intermediate 중심으로 구성됩니다.

### 예시 3: Senior Product Manager - Growth Team
**맥락:** V1 범위, PM 직군 예시

**구체적 예시:**
```json
{
  "id": "POS-SENIOR-PM-GROWTH",
  "name": "Senior Product Manager - Growth Team",
  "nameKo": "시니어 프로덕트 매니저 - 그로스팀",
  "jobFunctionId": "JFN-PRODUCT-MANAGER",
  "jobLevelId": "LVL-SENIOR",
  "teamContext": "Growth Team",
  "requiredCompetencies": [
    {
      "competencyId": "COMP-030",
      "competencyName": "Product Strategy & Vision",
      "proficiencyLevel": "Advanced",
      "justification": "그로스 전략 수립 필요"
    },
    {
      "competencyId": "COMP-031",
      "competencyName": "Data-Driven Decision Making",
      "proficiencyLevel": "Advanced",
      "justification": "그로스는 실험과 데이터 기반"
    },
    {
      "competencyId": "COMP-032",
      "competencyName": "User Research & Insights",
      "proficiencyLevel": "Intermediate",
      "justification": "사용자 이해 필요"
    },
    {
      "competencyId": "COMP-033",
      "competencyName": "Stakeholder Management",
      "proficiencyLevel": "Advanced",
      "justification": "시니어는 경영진과 소통"
    },
    {
      "competencyId": "COMP-010",
      "competencyName": "Communication & Collaboration",
      "proficiencyLevel": "Advanced",
      "justification": "모든 팀과 협업"
    }
  ],
  "description": "사용자 성장(acquisition, activation, retention)을 책임지는 PM입니다.",
  "responsibilities": [
    "그로스 전략 및 로드맵 수립",
    "A/B 테스트 설계 및 분석",
    "핵심 지표(AARRR) 개선",
    "크로스펑셔널 팀 리딩"
  ],
  "onetCode": "11-2021.00",
  "status": "OPEN",
  "openedDate": "2025-11-15"
}
```

**관찰:** PM은 Engineering과 다른 Competency 세트를 가집니다. Data-Driven Decision Making, Stakeholder Management 등이 핵심입니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **FCQ-01-004** "Job Function과 Position의 차이는 무엇인가?"
   - **예상 답변:** "Job Function은 역할 유형 (Backend Engineer), Position은 실제 채용 슬롯 (Senior Backend Engineer - Payments Team). Position = Job Function + Job Level + Team Context"
   - **출처:** `../../01-specification/competency-questions.md`

2. **SCQ-01-001** "우리 회사의 '시니어 백엔드 엔지니어'는 어떤 competencies를 가져야 하는가?"
   - **예상 답변:** "Position 'POS-SENIOR-BE-PAYMENTS'의 requiredCompetencies를 조회하면, RESTful API (Advanced), Database Design (Advanced), System Architecture (Intermediate), Communication (Advanced) 등을 확인할 수 있습니다."
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

3. **SCQ-01-002** "Payments 팀과 Social 팀의 시니어 백엔드 엔지니어는 요구사항이 어떻게 다른가?"
   - **예상 답변:** "두 Position을 비교하면, Payments는 'Database Optimization (Advanced)' 필수, Social은 'Real-time Systems (Advanced)' 필수 등 팀별 특화 요구사항 차이를 확인 가능"
   - **출처:** `../../01-specification/competency-questions.md` (Medium priority, V2)

4. **RCQ-01-001** "Backend Engineer와 Frontend Engineer의 공통 competencies는 무엇인가?"
   - **예상 답변:** "두 Position의 requiredCompetencies를 교집합하면, Communication (Advanced), Problem Solving (Intermediate), Git (Intermediate) 등 Engineering 공통 역량 도출 가능"
   - **출처:** `../../01-specification/competency-questions.md` (Medium priority, V2)

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, name, nameKo, jobFunctionId, jobLevelId, requiredCompetencies, description, responsibilities)
- [x] 최소 3개 실제 사례 제공 (Senior Backend, Mid Frontend, Senior PM)
- [x] 최소 4개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [x] 상위/하위 개념 관계가 논리적 (Job Function의 인스턴스)
- [x] 동의어가 실제로 같은 의미
- [x] 예시가 정의와 일치
- [x] Job Level과의 관계 명확 (hasLevel)

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [x] 개발자가 구현 가능 (속성 명확, JSON 스키마 제공)
- [x] 모호한 표현 없음

### 증거 기반 (Evidence-grounded)
- [x] Opportunity 문서 링크됨 (Problem 01)
- [x] 실제 문제 해결에 기여 (JD 작성 시간 단축)
- [x] 예시가 실제 데이터 기반 (보리가 자주 채용하는 포지션)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴 1: Instance Pattern**

**적용 이유:**
- Position은 Job Function의 구체적인 인스턴스
- 같은 Job Function이라도 Level, Team에 따라 다른 Position 생성

**구현 방법:**
```
Job Function (클래스)
└── Position (인스턴스)

예시:
Backend Engineer (Job Function)
├── Senior Backend Engineer - Payments (Position 인스턴스)
├── Senior Backend Engineer - Social (Position 인스턴스)
└── Mid Backend Engineer - Infrastructure (Position 인스턴스)
```

**적용된 패턴 2: Composite Pattern (합성)**

**적용 이유:**
- Position은 여러 개념의 조합 (Function + Level + Team + Competencies)
- 각 요소는 독립적으로 변경 가능

**구현 방법:**
```
Position = Job Function + Job Level + Team Context + Required Competencies

예시:
"Senior Backend Engineer - Payments"
= Backend Engineer (Function)
+ Senior (Level)
+ Payments Team (Context)
+ [API Development (Advanced), DB Design (Advanced), ...] (Competencies)
```

**참고 문서:** `../design-patterns/instance-pattern.md`, `../design-patterns/composite-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### O*NET 매핑
- **Backend Engineer Position → O*NET 15-1252.00** (Software Developers)
- **Frontend Engineer Position → O*NET 15-1254.00** (Web Developers)
- **Product Manager Position → O*NET 11-2021.00** (Marketing Managers)
- **매핑 근거:** Position은 실제 채용 직무이므로 O*NET의 Detailed Occupation 코드와 1:1 매핑 가능
- **법적 방어력:** O*NET 코드 포함 시 직무 설명의 객관성 확보

### LinkedIn Job Titles
- **LinkedIn 검증 결과:** "Senior Backend Engineer", "Frontend Engineer (Mid-Level)", "Senior Product Manager" 등은 LinkedIn에서 검색량이 높은 직무명
- **시장 용어:**
  - Backend → "Backend Developer", "Server-side Engineer"
  - Frontend → "Frontend Developer", "UI Engineer"
  - Product Manager → "PM", "Product Lead"
- **동의어 매핑:** name 필드를 LinkedIn 표준에 맞추고, nameKo로 한국어 지원

### SFIA 레벨 참조 (V2 확장)
- V2에서 SFIA 레벨을 Job Level과 매핑 예정
- 예: Senior Backend Engineer → SFIA Level 4-5

**참고 문서:**
- `../../03-implementation/standards/onet-mapping.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-26 | 초안 생성 | Terry | Week 2 세 번째 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **Position의 teamContext를 별도 Entity로 분리할지?**
   - **질문:** V1에서는 name에 팀 정보 포함, V2에서 Team Entity 분리?
   - **우선순위:** Medium (V2에서 결정)
   - **해결 방법:** 파일럿 테스트에서 보리에게 "팀 정보가 별도로 필요한지" 확인
   - **예상 답변:** 팀 구조 변경이 잦으면 분리 필요, 안정적이면 통합 유지

2. **하나의 Position이 여러 팀에서 동시에 채용 가능한가?**
   - **질문:** "Senior Backend Engineer"를 Payments, Social 두 팀에서 동시 채용 시 Position을 2개 만들어야 하는가, 아니면 1개로 공유?
   - **우선순위:** High (V1 파일럿 전 결정 필요)
   - **해결 방법:** 보리에게 실제 채용 프로세스 확인
   - **예상 답변:** 대부분 회사는 팀별로 별도 Position 생성 (팀마다 요구사항 미세하게 다름)

3. **계약직, 인턴 등 고용 형태를 Position에 포함할지?**
   - **질문:** "Senior Backend Engineer - Contract"와 "Senior Backend Engineer - Full-time"을 별도 Position으로?
   - **우선순위:** Low (V2 확장)
   - **해결 방법:** V2에서 employmentType 속성 추가 검토
   - **예상 답변:** 속성으로 추가하는 것이 확장성 좋음

### 가정 (검증 필요)
1. **가정: Position은 항상 하나의 Job Function과 하나의 Job Level을 가진다**
   - **가정 내용:** 다중 소속 불가 (예: Backend/Frontend 겸임 Position 없음)
   - **리스크:** 실제로는 Full-stack Engineer 같은 하이브리드 역할 존재
   - **검증 계획:** V1 파일럿에서 "Full-stack Engineer Position을 어떻게 모델링할지" 보리와 논의
   - **검증 기한:** Week 6 (파일럿 테스트)

2. **가정: requiredCompetencies는 Job Function의 Base Competencies를 상속받는다**
   - **가정 내용:** Position은 Job Function의 Base + Position 특화 Competencies
   - **리스크:** 구현 복잡도 증가 (상속 로직 필요)
   - **검증 계획:** Week 3-4 예시 작성 시 실제 상속 구조 검증
   - **검증 기한:** Week 4

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **관련 개념:**
  - [job-family.md](job-family.md) (상위 개념의 상위)
  - [job-function.md](job-function.md) (상위 개념)
  - competency.md (관련 개념, 작성 예정)
  - job-level.md (관련 개념, 작성 예정)
- **Problem Mapping:** [problem-01-skill-standardization.md](../../mapping/problem-01-skill-standardization.md)

### 외부 표준
- **O*NET:** [15-1252.00 Software Developers](https://www.onetonline.org/link/summary/15-1252.00)
- **O*NET:** [15-1254.00 Web Developers](https://www.onetonline.org/link/summary/15-1254.00)
- **O*NET:** [11-2021.00 Marketing Managers](https://www.onetonline.org/link/summary/11-2021.00)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]

**중점 검토 항목:**
- [ ] Position의 속성이 JD 작성에 충분한가?
- [ ] requiredCompetencies 구조가 실제 채용 프로세스와 맞는가?
- [ ] responsibilities 리스트가 명확한가?
- [ ] 팀 정보(teamContext)가 필요한지, 어떻게 관리되는지?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

### Berry (CTO) - [검토 필요]
> Position 구조가 실제 엔지니어링 조직과 맞는지 검토 필요

**중점 검토 항목:**
- [ ] requiredCompetencies가 실제 기술 스택과 일치하는가?
- [ ] Senior vs Mid의 Competency 구분이 현실적인가?
- [ ] Full-stack Engineer 같은 하이브리드 역할은 어떻게 모델링?

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
- [ ] Job Level (C-006) 개념 정의 완료 (의존성 해소)
- [ ] Competency (C-004) 개념 정의 완료 (관계 명확화)
- [ ] 4개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] Job Level (C-006) 개념 작성 (의존성: 이 개념 필요)
- [ ] Competency (C-004) 개념 작성 (관계: 이 개념 필요)
- [ ] Instance Pattern 문서 작성 (`../design-patterns/instance-pattern.md`)
- [ ] Composite Pattern 문서 작성 (`../design-patterns/composite-pattern.md`)
- [ ] Week 3-4: Position 예시 3개 작성 (backend-engineer-senior.md, frontend-engineer-mid.md, product-manager-senior.md)

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (3개: Senior Backend, Mid Frontend, Senior PM)
- [x] 증거 기반 (Opportunity 01 링크)
- [x] 검증 체크리스트 작성
- [x] 의존성 명시 (Job Function, Job Level)

---

*이 문서는 증거 기반으로 진화합니다. Position은 온톨로지의 실제 사용 단위이므로, 보리와 베리의 피드백이 특히 중요합니다.*
