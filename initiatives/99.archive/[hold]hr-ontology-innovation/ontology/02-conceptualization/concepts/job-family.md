# Job Family (직무군)

**개념 ID:** C-001
**생성일:** 2025-11-25
**최종 수정일:** 2025-11-25
**작성자:** Terry
**검토자:** Borry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | Problem 01 (스킬/역량 표준화) - 최상위 분류 제공 |
| **우선순위** | High |
| **의존 개념** | 없음 (최상위 개념) |
| **증거 출처** | [opportunity-01](../../../opportunities/01-skill-standardization.md) |
| **표준 참조** | O*NET SOC Major Groups |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Job Family는 유사한 성격의 직무들을 묶은 **최상위 직무 분류**입니다.

### 상세 설명
Job Family는 조직의 모든 직무를 큰 범주로 나누는 최상위 분류 체계입니다. 예를 들어 "Engineering", "Product", "Sales", "Marketing" 같은 넓은 범주를 의미합니다.

**왜 이 개념이 필요한가?**
- 채용 시 "어떤 영역의 직무인가?"를 빠르게 파악
- Job Function과 Position의 상위 분류로 온톨로지 계층 구조의 기초 제공
- 팀 간 소통 시 공통 언어 제공 ("이건 Engineering 쪽 채용이야")

**HR 도메인에서의 역할:**
- JD 작성 시 가장 먼저 선택하는 분류
- 조직 구조와 연결 (Engineering 조직, Product 조직)
- 보상 체계, 커리어 패스의 기준

### 동의어 (Synonyms)
- 직무군
- Job Category
- Functional Area
- Department Category

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Job Function**: Job Family는 넓은 범주 (Engineering), Job Function은 구체적 역할 (Backend Engineer)
- **vs Position**: Job Family는 분류, Position은 실제 채용 포지션 (Senior Backend Engineer - Payments Team)

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- 없음 (최상위 개념)

### 하위 개념 (Narrower Concepts)
- **Job Function** (hasFunction 관계)
  - 예: Engineering Job Family → Backend Engineer Job Function

### 관련 개념 (Related Concepts)
- **Job Function** (contains 관계)
  - 관계 설명: 하나의 Job Family는 여러 Job Functions를 포함
  - 예시: Engineering → Backend Engineer, Frontend Engineer, ML Engineer

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|------|---------|
| id | String | 필수 | 고유 식별자 | "JF-ENG" |
| name | String | 필수 | Job Family 이름 | "Engineering" |
| nameKo | String | 필수 | 한국어 이름 | "엔지니어링" |
| description | String | 필수 | 상세 설명 | "소프트웨어 개발 및 기술 관련 직무" |
| onetCode | String | 선택 | O*NET SOC Major Group 코드 | "15-0000" (Computer and Mathematical) |
| functions | Array<JobFunction> | 선택 | 포함하는 Job Functions | [Backend Engineer, Frontend Engineer] |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: Engineering Job Family
**맥락:** 가장 일반적인 Job Family, 소프트웨어 개발 관련 모든 직무 포함

**구체적 예시:**
```json
{
  "id": "JF-ENG",
  "name": "Engineering",
  "nameKo": "엔지니어링",
  "description": "소프트웨어 개발, 인프라, 데이터 엔지니어링 등 기술 관련 직무",
  "onetCode": "15-0000",
  "functions": [
    "Backend Engineer",
    "Frontend Engineer",
    "ML Engineer",
    "DevOps Engineer",
    "Data Engineer"
  ]
}
```

**관찰:** Engineering은 가장 세분화가 많이 필요한 Job Family입니다. Backend, Frontend, ML 등 기술 스택과 도메인에 따라 다양한 Job Functions로 나뉩니다.

### 예시 2: Product Job Family
**맥락:** 제품 기획 및 디자인 관련 직무

**구체적 예시:**
```json
{
  "id": "JF-PROD",
  "name": "Product",
  "nameKo": "프로덕트",
  "description": "제품 기획, UX/UI 디자인, 프로덕트 매니지먼트",
  "onetCode": "11-2020",
  "functions": [
    "Product Manager",
    "Product Designer",
    "UX Researcher"
  ]
}
```

**관찰:** Product Job Family는 Engineering보다 Job Function 수가 적지만, 각 Function의 역할이 명확히 구분됩니다.

### 예시 3: V1 범위 (3개 직무군 관련)
**맥락:** V1에서 다루는 Job Families

**구체적 예시:**
```json
{
  "v1Scope": [
    {
      "id": "JF-ENG",
      "name": "Engineering",
      "v1Functions": ["Backend Engineer", "Frontend Engineer"]
    },
    {
      "id": "JF-PROD",
      "name": "Product",
      "v1Functions": ["Product Manager"]
    }
  ]
}
```

**관찰:** V1에서는 2개 Job Families, 3개 Job Functions에 집중합니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **FCQ-01-004** "Job Function과 Position의 차이는 무엇인가?"
   - **예상 답변:** "Job Family는 최상위 분류 (Engineering, Product), Job Function은 구체적 역할 (Backend Engineer), Position은 실제 채용 포지션 (Senior Backend Engineer - Payments Team). 계층 구조: Job Family → Job Function → Position"
   - **출처:** `../../01-specification/competency-questions.md`

2. **SCQ-01-003** "Frontend Engineer와 Backend Engineer의 공통 competencies는 무엇인가?"
   - **예상 답변:** "둘 다 Engineering Job Family에 속하므로, Engineering 공통 competencies를 상속받습니다. 예: Problem Solving, Communication, Version Control (Git)"
   - **출처:** `../../01-specification/competency-questions.md` (Medium priority, V2)

3. **신규 CQ** "우리 회사는 어떤 Job Families가 있는가?"
   - **예상 답변:** "Engineering, Product, Sales, Marketing 등. V1에서는 Engineering과 Product 2개에 집중"
   - **출처:** 온톨로지 기본 쿼리

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, name, nameKo, description)
- [x] 최소 2개 실제 사례 제공 (Engineering, Product)
- [x] 최소 3개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [x] 상위/하위 개념 관계가 논리적 (최상위 개념이므로 상위 없음)
- [x] 동의어가 실제로 같은 의미
- [x] 예시가 정의와 일치

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [x] 개발자가 구현 가능 (속성 명확, JSON 스키마 제공)
- [x] 모호한 표현 없음

### 증거 기반 (Evidence-grounded)
- [x] Opportunity 문서 링크됨 (Problem 01)
- [x] 실제 문제 해결에 기여 (최상위 분류로 구조화)
- [x] 예시가 실제 데이터 기반 (Engineering, Product)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴:** Hierarchy Pattern

**적용 이유:**
- Job Family는 온톨로지의 최상위 계층
- 명확한 분류 체계 필요
- 확장 가능성 (새 Job Family 추가 가능)

**구현 방법:**
```
조직 전체
└── Job Family (최상위)
    └── Job Function (중간 계층)
        └── Position (최하위, 실제 채용)

예시:
회사
├── Engineering (Job Family)
│   ├── Backend Engineer (Job Function)
│   │   └── Senior Backend Engineer - Payments (Position)
│   └── Frontend Engineer (Job Function)
│       └── Mid Frontend Engineer - Social (Position)
└── Product (Job Family)
    └── Product Manager (Job Function)
        └── Senior Product Manager - Growth (Position)
```

**참고 문서:** `../design-patterns/hierarchy-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### O*NET 매핑
- **O*NET 코드:** 15-0000 (Computer and Mathematical Occupations) - Engineering 해당
- **O*NET 코드:** 11-2020 (Marketing and Sales Managers) - Product 일부 해당
- **매핑 근거:** O*NET SOC Major Groups를 Job Family로 매핑하여 법적 방어력 확보
- **참고:** [O*NET SOC Structure](https://www.onetonline.org/find/descriptor/browse/SOC/)

### SFIA 레벨 참조
- 해당 없음 (SFIA는 스킬 레벨이지 직무 분류가 아님)

### LinkedIn 스킬 네이밍
- **LinkedIn 검증 결과:** "Engineering", "Product Management" 등은 LinkedIn에서 일반적으로 사용하는 부서/팀 카테고리
- **시장 용어:**
  - Engineering = 개발, 엔지니어링, Software Development
  - Product = 프로덕트, PM, Product Management
- **동의어 매핑:** nameKo 필드로 한국어 용어 지원

**참고 문서:**
- `../../03-implementation/standards/onet-mapping.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-25 | 초안 생성 | Terry | Week 2 첫 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **Sales와 Marketing을 하나의 Job Family로 할지 분리할지?**
   - **질문:** Sales & Marketing vs. Sales, Marketing 분리
   - **우선순위:** Medium (V2에서 결정)
   - **해결 방법:** V2 확장 시 HR 담당자(Borry)와 논의
   - **예상 답변:** 조직 구조에 따라 결정. 대부분 회사는 분리하지만, 스타트업은 통합하기도 함

2. **Job Family가 조직 구조와 1:1 매핑되어야 하는가?**
   - **질문:** Engineering 조직 = Engineering Job Family?
   - **우선순위:** Low
   - **해결 방법:** 파일럿 테스트에서 Borry 피드백
   - **예상 답변:** 대부분 일치하지만, 항상 그런 것은 아님 (예: Data 조직이 Engineering에 포함되기도)

### 가정 (검증 필요)
1. **가정: 모든 직무는 반드시 하나의 Job Family에만 속한다**
   - **가정 내용:** 다중 소속 불가 (예: PM이 Engineering과 Product 양쪽에 속할 수 없음)
   - **리스크:** 실제로는 경계가 모호한 역할 존재 (Technical PM 등)
   - **검증 계획:** V1 파일럿에서 "Product Manager"가 Engineering에 속하는지 Product에 속하는지 Borry와 논의
   - **검증 기한:** Week 6 (파일럿 테스트)

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **관련 개념:** job-function.md (작성 예정), position.md (작성 예정)

### 외부 표준
- **O*NET:** [SOC Major Groups](https://www.onetonline.org/find/descriptor/browse/SOC/)
- **O*NET:** [15-0000 Computer and Mathematical](https://www.onetonline.org/find/family?f=15)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

### Berry (CTO) - [검토 불필요]
> Job Family는 비즈니스 분류이므로 기술 검토 불필요

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- Draft 상태, Borry 1차 검토 대기 중

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영
- [ ] Job Function 개념 정의 완료 (하위 개념)
- [ ] Position 개념 정의 완료 (하위 개념)
- [ ] 3개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] Job Function (C-002) 개념 작성 (의존성: 이 개념 필요)
- [ ] Hierarchy Pattern 문서 작성 (`../design-patterns/hierarchy-pattern.md`)
- [ ] O*NET 매핑 문서 작성 (`../../03-implementation/standards/onet-mapping.md`)

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (Engineering, Product)
- [x] 증거 기반 (Opportunity 01 링크)
- [x] 검증 체크리스트 작성

---

*이 문서는 증거 기반으로 진화합니다. Borry의 피드백을 기다리고 있습니다.*
