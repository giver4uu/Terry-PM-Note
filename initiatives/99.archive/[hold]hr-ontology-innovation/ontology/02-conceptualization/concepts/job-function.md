# Job Function (직무 기능)

**개념 ID:** C-002
**생성일:** 2025-11-25
**최종 수정일:** 2025-11-25
**작성자:** Terry
**검토자:** Borry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | Problem 01 (스킬/역량 표준화), Problem 03 (지식 재사용) |
| **우선순위** | High |
| **의존 개념** | Job Family (C-001) |
| **증거 출처** | [opportunity-01](../../../opportunities/01-skill-standardization.md), [snapshot-borry](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md) |
| **표준 참조** | O*NET Detailed Occupations, LinkedIn Job Titles |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Job Function은 **구체적인 역할 타입**으로, Job Family 내에서 실제로 수행하는 업무의 성격을 정의합니다.

### 상세 설명
Job Function은 "이 사람이 구체적으로 무슨 일을 하는가?"에 답하는 개념입니다. 예를 들어 Engineering Job Family 안에는 "Backend Engineer", "Frontend Engineer", "ML Engineer" 같은 다양한 Job Functions가 있습니다.

**왜 이 개념이 필요한가?**
- **지식 재사용**: 같은 Job Function (예: Backend Engineer)은 회사가 달라도 유사한 스킬 세트를 공유하므로, 기본 Competencies를 재사용 가능
- **표준화**: "백엔드 개발자"가 무엇인지 회사 전체가 동일하게 이해
- **채용 효율**: 이전에 "Backend Engineer"로 채용했던 경험을 다음 채용에 재사용

**HR 도메인에서의 역할:**
- JD 작성 시 두 번째로 선택하는 분류 (Job Family → Job Function)
- 기본 Competencies의 템플릿 역할
- 커리어 패스의 기준 (Backend Engineer → Senior Backend Engineer)

### 동의어 (Synonyms)
- 직무 (Role)
- Job Type
- Position Type (하지만 Position과는 다름 - 아래 참조)

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Job Family**: Job Function은 구체적 역할 (Backend Engineer), Job Family는 넓은 범주 (Engineering)
- **vs Position**: Job Function은 역할 타입 (Backend Engineer), Position은 실제 채용 슬롯 (Senior Backend Engineer - Payments Team)
  - 예: 같은 "Backend Engineer" Job Function이라도, "Senior Backend Engineer - Payments"와 "Junior Backend Engineer - Social"은 다른 Positions

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- **Job Family** (belongsTo 관계)
  - 설명: 모든 Job Function은 하나의 Job Family에 속함
  - 예: Backend Engineer → Engineering Job Family

### 하위 개념 (Narrower Concepts)
- **Position** (hasPosition 관계)
  - 설명: 하나의 Job Function은 여러 Positions를 가질 수 있음
  - 예: Backend Engineer → Senior Backend Engineer, Junior Backend Engineer

### 관련 개념 (Related Concepts)
- **Competency** (requiresBase 관계)
  - 관계 타입: requiresBase (기본 요구사항)
  - 설명: 각 Job Function은 기본 Competencies 세트를 가짐
  - 예시: Backend Engineer → RESTful API Development, Database Design 등

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|------|---------|
| id | String | 필수 | 고유 식별자 | "JFN-BACKEND-ENG" |
| name | String | 필수 | Job Function 이름 | "Backend Engineer" |
| nameKo | String | 필수 | 한국어 이름 | "백엔드 엔지니어" |
| description | String | 필수 | 상세 설명 | "서버 사이드 로직, API, 데이터베이스 개발" |
| jobFamily | JobFamily | 필수 | 소속 Job Family | "Engineering" |
| onetCode | String | 선택 | O*NET Detailed Occupation 코드 | "15-1252.00" |
| baseCompetencies | Array<Competency> | 선택 | 기본 Competencies | [RESTful API, PostgreSQL, ...] |
| synonyms | Array<String> | 선택 | 동의어/유사 명칭 | ["Backend Developer", "Server Engineer"] |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: Backend Engineer
**맥락:** V1 범위 내 가장 일반적인 Job Function

**구체적 예시:**
```json
{
  "id": "JFN-BACKEND-ENG",
  "name": "Backend Engineer",
  "nameKo": "백엔드 엔지니어",
  "description": "서버 사이드 애플리케이션 로직, RESTful API, 데이터베이스 설계 및 구현을 담당하는 개발자",
  "jobFamily": "Engineering",
  "onetCode": "15-1252.00",
  "baseCompetencies": [
    {
      "competencyId": "COMP-001",
      "competencyName": "RESTful API Development",
      "justification": "Backend의 핵심 역할"
    },
    {
      "competencyId": "COMP-002",
      "competencyName": "Database Design",
      "justification": "데이터 저장 및 조회"
    },
    {
      "competencyId": "COMP-010",
      "competencyName": "Problem Solving",
      "category": "Behavioral",
      "justification": "모든 엔지니어 필수"
    }
  ],
  "synonyms": [
    "Backend Developer",
    "Server-side Engineer",
    "백엔드 개발자",
    "서버 개발자"
  ]
}
```

**관찰:** Backend Engineer는 보리 인터뷰에서 가장 자주 언급된 Job Function입니다. 팀마다 "시니어 백엔드"의 정의가 달랐던 문제가 이 개념으로 해결됩니다.

### 예시 2: Frontend Engineer
**맥락:** V1 범위 내, UI/UX 구현 담당

**구체적 예시:**
```json
{
  "id": "JFN-FRONTEND-ENG",
  "name": "Frontend Engineer",
  "nameKo": "프론트엔드 엔지니어",
  "description": "사용자 인터페이스, 웹/모바일 애플리케이션의 클라이언트 사이드 개발을 담당하는 개발자",
  "jobFamily": "Engineering",
  "onetCode": "15-1252.00",
  "baseCompetencies": [
    {
      "competencyId": "COMP-020",
      "competencyName": "React Development",
      "justification": "주요 프론트엔드 프레임워크"
    },
    {
      "competencyId": "COMP-021",
      "competencyName": "HTML/CSS",
      "justification": "기본 마크업 및 스타일링"
    },
    {
      "competencyId": "COMP-022",
      "competencyName": "JavaScript/TypeScript",
      "justification": "핵심 언어"
    },
    {
      "competencyId": "COMP-010",
      "competencyName": "Problem Solving",
      "category": "Behavioral"
    }
  ],
  "synonyms": [
    "Frontend Developer",
    "FE Engineer",
    "프론트엔드 개발자",
    "웹 개발자"
  ]
}
```

**관찰:** Frontend와 Backend는 Engineering Job Family를 공유하지만, baseCompetencies는 완전히 다릅니다.

### 예시 3: Product Manager
**맥락:** V1 범위 내, Product Job Family의 대표 Function

**구체적 예시:**
```json
{
  "id": "JFN-PRODUCT-MGR",
  "name": "Product Manager",
  "nameKo": "프로덕트 매니저",
  "description": "제품 기획, 우선순위 결정, 크로스펑셔널 팀 리드를 담당하는 PM",
  "jobFamily": "Product",
  "onetCode": "11-2021.00",
  "baseCompetencies": [
    {
      "competencyId": "COMP-100",
      "competencyName": "Product Strategy",
      "category": "Business",
      "justification": "제품 방향 설정"
    },
    {
      "competencyId": "COMP-101",
      "competencyName": "User Research",
      "justification": "고객 니즈 파악"
    },
    {
      "competencyId": "COMP-102",
      "competencyName": "Stakeholder Management",
      "category": "Behavioral",
      "justification": "팀 간 조율"
    },
    {
      "competencyId": "COMP-103",
      "competencyName": "Data Analysis",
      "justification": "의사결정 근거"
    }
  ],
  "synonyms": [
    "PM",
    "Product Owner",
    "PO",
    "제품 기획자"
  ]
}
```

**관찰:** Product Manager는 Engineering과 다르게 Business Competencies가 더 많습니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **FCQ-01-004** "Job Function과 Position의 차이는 무엇인가?"
   - **예상 답변:** "Job Function은 역할 타입 (Backend Engineer), Position은 실제 채용 슬롯 (Senior Backend Engineer - Payments Team). Position은 Job Function + Job Level + Team으로 구성됩니다."
   - **출처:** `../../01-specification/competency-questions.md`

2. **SCQ-01-003** "Frontend Engineer와 Backend Engineer의 공통 competencies는 무엇인가?"
   - **예상 답변:** "둘 다 Engineering Job Family에 속하므로, Problem Solving, Communication, Version Control (Git) 같은 Engineering 공통 competencies를 상속받습니다. 하지만 기술 스택 (React vs. PostgreSQL)은 다릅니다."
   - **출처:** `../../01-specification/competency-questions.md` (Medium priority)

3. **신규 CQ** "Backend Engineer는 기본적으로 어떤 competencies가 필요한가?"
   - **예상 답변:** "baseCompetencies 조회: RESTful API Development, Database Design, Problem Solving 등"
   - **출처:** 온톨로지 기본 쿼리

4. **신규 CQ** "같은 Backend Engineer라도 팀마다 요구사항이 다를 수 있는가?"
   - **예상 답변:** "Yes. Job Function은 기본 템플릿이고, Position level에서 팀 특수 요구사항을 추가합니다. 예: Payments팀은 PCI Compliance 추가"
   - **출처:** Core + Shell 모델

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, name, nameKo, description, jobFamily)
- [x] 최소 2개 실제 사례 제공 (3개: Backend, Frontend, PM)
- [x] 최소 3개 CQ 작성 및 답변 가능 (4개)

### 일관성 (Consistency)
- [x] 상위/하위 개념 관계가 논리적 (Job Family → Job Function → Position 계층)
- [x] 동의어가 실제로 같은 의미
- [x] 예시가 정의와 일치

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [x] 개발자가 구현 가능 (JSON 스키마 명확)
- [x] 모호한 표현 없음

### 증거 기반 (Evidence-grounded)
- [x] 인터뷰 스냅샷 링크 (Borry 인터뷰에서 Backend Engineer 언급)
- [x] Opportunity 문서 링크 (Problem 01 해결)
- [x] 실제 문제 해결에 기여 (기본 Competencies 재사용으로 JD 작성 시간 단축)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴:** Hierarchy Pattern + Part-Whole Pattern

**적용 이유:**
- **Hierarchy Pattern**: Job Family → Job Function → Position 계층 구조
- **Part-Whole Pattern**: Job Function이 baseCompetencies를 "포함"하는 관계

**구현 방법:**
```
Hierarchy (계층):
Job Family
└── Job Function (isA 관계)
    └── Position

Part-Whole (구성):
Job Function
├── hasBase Competency 1
├── hasBase Competency 2
└── hasBase Competency 3

예시:
Backend Engineer (Job Function)
├── baseCompetencies:
│   ├── RESTful API Development
│   ├── Database Design
│   └── Problem Solving
└── Positions:
    ├── Senior Backend Engineer - Payments
    └── Junior Backend Engineer - Social
```

**참고 문서:** `../design-patterns/hierarchy-pattern.md`, `../design-patterns/part-whole-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### O*NET 매핑
- **Backend/Frontend Engineer:**
  - **O*NET 코드:** 15-1252.00 - Software Developers
  - **매핑 근거:** 두 Role 모두 소프트웨어 개발이므로 동일 O*NET 코드
  - **참고:** [15-1252.00 상세](https://www.onetonline.org/link/summary/15-1252.00)

- **Product Manager:**
  - **O*NET 코드:** 11-2021.00 - Marketing Managers (가장 유사)
  - **매핑 근거:** 제품 기획 및 전략은 O*NET의 Marketing Managers와 유사
  - **주의:** 완전히 일치하지는 않음 (PM은 기술 제품 전문)
  - **참고:** [11-2021.00 상세](https://www.onetonline.org/link/summary/11-2021.00)

### SFIA 레벨 참조
- **SFIA 스킬 코드:**
  - Backend/Frontend: **PROG** (Programming/Software Development)
  - PM: **PROD** (Product Management)
- **차용한 부분:** 스킬 코드 매핑 참조, 레벨 정의는 Proficiency Level 개념에서 활용
- **커스터마이징:** V1에서는 O*NET 중심, SFIA는 보조

### LinkedIn 스킬 네이밍
- **Backend Engineer:**
  - LinkedIn 검증: "Backend Development", "Node.js", "Python", "Java" 등이 일반적
  - 시장 용어: "Backend Developer" = "Backend Engineer" (동의어)

- **Frontend Engineer:**
  - LinkedIn 검증: "React", "JavaScript", "Frontend Development" 일반적
  - 시장 용어: "Frontend Developer" = "FE Engineer"

- **Product Manager:**
  - LinkedIn 검증: "Product Management", "Roadmap", "Agile" 일반적
  - 시장 용어: "PM" = "Product Manager" = "Product Owner" (약간 다르지만 유사)

**참고 문서:**
- `../../03-implementation/standards/onet-mapping.md` (작성 예정)
- `../../03-implementation/standards/linkedin-skills.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-25 | 초안 생성, 3개 Job Functions 정의 (Backend, Frontend, PM) | Terry | Week 2 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **Full-stack Engineer는 별도 Job Function인가 아니면 Backend + Frontend 조합인가?**
   - **질문:** Full-stack을 어떻게 모델링할 것인가?
   - **우선순위:** Medium (V2 확장 시 고려)
   - **해결 방법:** 파일럿에서 Full-stack 채용 필요 시 Borry와 논의
   - **예상 답변:** 별도 Job Function으로 정의하되, baseCompetencies는 Backend + Frontend 일부 조합

2. **Product Designer는 Product Job Family인가 Design Job Family인가?**
   - **질문:** Designer의 소속 Job Family
   - **우선순위:** Low (V2 이후)
   - **해결 방법:** V2 확장 시 조직 구조 참고
   - **예상 답변:** 회사마다 다름. 대부분은 Product 또는 Design Job Family

### 가정 (검증 필요)
1. **가정: baseCompetencies는 모든 Position이 공통으로 요구한다**
   - **가정 내용:** Backend Engineer의 모든 Position (Junior든 Senior든)은 RESTful API Development를 필요로 함
   - **리스크:** 실제로는 Junior는 RESTful API를 몰라도 될 수 있음
   - **검증 계획:** 파일럿에서 "Junior Backend Engineer"의 실제 요구사항 확인
   - **검증 기한:** Week 5 (실제 예시 작성 시)

2. **가정: Job Function은 팀과 무관하게 동일한 baseCompetencies를 가진다**
   - **가정 내용:** Payments팀 Backend Engineer나 Social팀 Backend Engineer나 동일한 baseCompetencies
   - **리스크:** 팀 도메인에 따라 요구 기술이 다를 수 있음 (예: Payments는 트랜잭션, Social은 실시간 처리)
   - **검증 계획:** Position 개념에서 팀별 추가 Competencies를 허용 (Shell 유연성)
   - **검증 기한:** Week 3 (Position 개념 작성 시)

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **Interview Snapshot:** [snapshot-borry-2025-11-16.md](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md) - "백엔드 팀 A vs B 시니어 정의 불일치" 사례
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **상위 개념:** [job-family.md](./job-family.md)
- **하위 개념:** position.md (작성 예정)

### 외부 표준
- **O*NET:** [15-1252.00 Software Developers](https://www.onetonline.org/link/summary/15-1252.00)
- **O*NET:** [11-2021.00 Marketing Managers](https://www.onetonline.org/link/summary/11-2021.00)
- **LinkedIn:** [Backend Development Skills](https://www.linkedin.com/skills/)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]
>
> **검토 포인트:**
> - Backend, Frontend, PM의 정의가 실제 채용과 일치하는가?
> - baseCompetencies가 현실적인가? (너무 많거나 적지 않은가?)
> - Synonyms가 실제로 사용하는 용어를 포함하는가?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

### Berry (CTO) - [검토 예정]
> [Berry 기술 검토 예정]
>
> **검토 포인트:**
> - baseCompetencies가 기술적으로 타당한가?
> - Backend vs Frontend 구분이 명확한가?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- Draft 상태, Borry와 Berry 검토 대기 중

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영
- [ ] Berry 기술 검토 (baseCompetencies 타당성)
- [ ] Position 개념 정의 완료 (하위 개념)
- [ ] Competency 개념 정의 완료 (관련 개념)
- [ ] 4개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] Position (C-003) 개념 작성 (의존성: 이 개념 필요)
- [ ] Competency (C-004) 개념 작성 (baseCompetencies 정의 필요)
- [ ] Part-Whole Pattern 문서 작성 (`../design-patterns/part-whole-pattern.md`)
- [ ] 3개 직무군 실제 예시 작성 (`../../03-implementation/examples/`)
  - `backend-engineer-senior.md`
  - `frontend-engineer-mid.md`
  - `product-manager-senior.md`

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (Backend, Frontend, PM 3개)
- [x] 증거 기반 (Borry 인터뷰, Opportunity 01 링크)
- [x] 검증 체크리스트 작성

---

*이 문서는 증거 기반으로 진화합니다. V1에서는 3개 Job Functions (Backend, Frontend, PM)에 집중하며, V2에서 추가 Functions를 확장할 예정입니다.*
