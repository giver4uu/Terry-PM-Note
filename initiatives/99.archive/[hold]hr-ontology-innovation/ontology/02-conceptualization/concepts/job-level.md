# Job Level (직급/시니어리티 레벨)

**개념 ID:** C-006
**생성일:** 2025-11-26
**최종 수정일:** 2025-11-26
**작성자:** Terry
**검토자:** Borry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | Problem 01 (스킬/역량 표준화) - "시니어"가 무엇인지 명확화 |
| **우선순위** | High |
| **의존 개념** | Position (C-003) |
| **증거 출처** | [opportunity-01](../../../opportunities/01-skill-standardization.md) |
| **표준 참조** | Industry standard career ladders (Engineering, PM) |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Job Level은 **조직 내에서의 직급 또는 시니어리티 단계**입니다.

### 상세 설명
Job Level은 "Junior", "Mid", "Senior", "Staff", "Principal" 같은 조직 내 경력 단계를 의미합니다. Position은 Job Function + Job Level의 조합입니다 (예: "Senior Backend Engineer" = "Backend Engineer" Function + "Senior" Level).

**왜 이 개념이 필요한가?**

**Job Level vs Proficiency Level 구분:**
- **Job Level (이 개념):** 조직 내 직급 (Junior, Mid, Senior)
  - 조직 구조와 연결됨 (보상, 승진 경로)
  - 포지션 명칭의 일부 ("Senior Backend Engineer")
  - 여러 Competencies의 평균적 기대치

- **Proficiency Level:** 특정 스킬의 숙련도 (Beginner, Advanced)
  - 스킬별로 다름 (같은 사람이 API는 Advanced, DB는 Intermediate 가능)
  - 학습 발달 단계

**예시로 이해하기:**
- "Senior Backend Engineer"의 "Senior" = Job Level
- 이 사람의 "RESTful API Development (Advanced)" = Proficiency Level
- **즉, Senior(Job Level)라고 모든 스킬이 Advanced(Proficiency)는 아님**

**HR 도메인에서의 역할:**
- JD 제목 작성 ("Senior Backend Engineer" 채용 공고)
- 보상 체계 결정 (Senior는 연봉 범위 X-Y)
- 승진 경로 (Mid → Senior 승진 조건은?)
- 조직도 작성 (이 팀에 Senior 3명, Mid 5명)

### 동의어 (Synonyms)
- 직급
- Seniority Level
- Career Level
- Grade
- Rank (일부 조직)

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Proficiency Level**: Job Level은 조직 직급, Proficiency는 스킬 숙련도
- **vs Job Function**: Job Function은 역할 (Backend Engineer), Job Level은 시니어리티 (Senior)
- **vs Job Title**: Job Title은 명함 직함 (다양할 수 있음), Job Level은 표준화된 직급 체계

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- **Career Ladder** (V2 확장)
  - 예: Engineering Career Ladder → Junior, Mid, Senior, Staff, Principal, Fellow

### 하위 개념 (Narrower Concepts)
- 없음 (Job Level은 원자적 개념)

### 관련 개념 (Related Concepts)
- **Position** (usedBy 관계)
  - 관계 설명: Position은 하나의 Job Level을 가짐
  - 예시: "Senior Backend Engineer - Payments" → Senior Level

- **Competency** (implies 관계)
  - 관계 설명: Job Level은 특정 Competencies의 평균적 기대치를 암시
  - 예시: Senior Level → 대부분 Competencies에서 Advanced 기대

- **Compensation Range** (determines 관계, V2 확장)
  - 관계 설명: Job Level은 보상 범위를 결정
  - 예시: Senior Level → 연봉 $120k-$180k

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|---------|---------|
| id | String | 필수 | 고유 식별자 | "LVL-SENIOR" |
| name | String | 필수 | Job Level 이름 (영어) | "Senior" |
| nameKo | String | 필수 | 한국어 이름 | "시니어" |
| order | Integer | 필수 | 시니어리티 순서 (낮을수록 주니어) | 3 (1=Junior, 2=Mid, 3=Senior, ...) |
| description | String | 필수 | 일반적 설명 | "독립적으로 복잡한 프로젝트를 주도하고, 주니어를 멘토링할 수 있는 수준" |
| yearsExperienceMin | Integer | 선택 | 최소 경력 연수 (가이드라인) | 5 |
| yearsExperienceMax | Integer | 선택 | 최대 경력 연수 (가이드라인) | 8 |
| typicalCompetencyProfile | String | 선택 | 일반적 Competency 기대치 | "핵심 Competencies Advanced, 보조 Competencies Intermediate" |
| responsibilities | Array<String> | 선택 | 이 레벨의 일반적 책임 | ["복잡한 프로젝트 독립 수행", "주니어 멘토링", "기술 의사결정 참여"] |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: V1의 3단계 Job Levels (Junior, Mid, Senior)
**맥락:** V1 파일럿에서 사용할 기본 3단계

**구체적 예시:**
```json
{
  "jobLevels": [
    {
      "id": "LVL-JUNIOR",
      "name": "Junior",
      "nameKo": "주니어",
      "order": 1,
      "description": "지도 하에 기본적인 작업을 수행하고, 학습과 성장에 집중하는 단계. 팀의 지원을 받아 프로젝트에 기여.",
      "yearsExperienceMin": 0,
      "yearsExperienceMax": 2,
      "typicalCompetencyProfile": "핵심 Competencies Beginner-Intermediate, 학습 의지 중요",
      "responsibilities": [
        "명확한 지시에 따라 작업 수행",
        "코드 리뷰를 통해 학습",
        "단순한 기능 구현",
        "버그 수정"
      ]
    },
    {
      "id": "LVL-MID",
      "name": "Mid",
      "nameKo": "미드",
      "order": 2,
      "description": "일반적인 작업을 독립적으로 수행하고, 팀의 핵심 기여자로 활동. 가끔 주니어를 도와줄 수 있음.",
      "yearsExperienceMin": 2,
      "yearsExperienceMax": 5,
      "typicalCompetencyProfile": "핵심 Competencies Intermediate-Advanced",
      "responsibilities": [
        "독립적으로 기능 구현",
        "기술 설계 문서 작성",
        "코드 리뷰 참여",
        "주니어 멘토링 (가끔)"
      ]
    },
    {
      "id": "LVL-SENIOR",
      "name": "Senior",
      "nameKo": "시니어",
      "order": 3,
      "description": "복잡한 프로젝트를 독립적으로 주도하고, 팀의 기술 의사결정에 참여하며, 주니어와 미드를 멘토링.",
      "yearsExperienceMin": 5,
      "yearsExperienceMax": null,
      "typicalCompetencyProfile": "핵심 Competencies Advanced, 보조 Competencies Intermediate",
      "responsibilities": [
        "복잡한 시스템 설계 및 구현",
        "기술 아키텍처 의사결정",
        "주니어/미드 멘토링",
        "프로젝트 기술 리딩",
        "베스트 프랙티스 전파"
      ]
    }
  ]
}
```

**관찰:** V1에서는 Junior, Mid, Senior 3단계로 충분합니다. V2에서 Staff, Principal 등 확장 가능합니다.

### 예시 2: Position에서 Job Level 사용
**맥락:** Job Level이 Position 이름과 요구사항을 어떻게 결정하는가

**구체적 예시:**
```json
{
  "positions": [
    {
      "id": "POS-JUNIOR-BE-SOCIAL",
      "name": "Junior Backend Engineer - Social Team",
      "jobFunctionId": "JFN-BACKEND-ENG",
      "jobLevelId": "LVL-JUNIOR",
      "requiredCompetencies": [
        {
          "competencyId": "COMP-001",
          "competencyName": "RESTful API Development",
          "requiredProficiency": "PROF-BEGINNER",
          "note": "Junior는 Beginner-Intermediate 수준"
        },
        {
          "competencyId": "COMP-010",
          "competencyName": "Communication",
          "requiredProficiency": "PROF-INTERMEDIATE",
          "note": "팀 내 소통은 필수"
        }
      ]
    },
    {
      "id": "POS-MID-BE-SOCIAL",
      "name": "Mid Backend Engineer - Social Team",
      "jobFunctionId": "JFN-BACKEND-ENG",
      "jobLevelId": "LVL-MID",
      "requiredCompetencies": [
        {
          "competencyId": "COMP-001",
          "competencyName": "RESTful API Development",
          "requiredProficiency": "PROF-INTERMEDIATE",
          "note": "Mid는 독립적 수행"
        },
        {
          "competencyId": "COMP-002",
          "competencyName": "Database Design",
          "requiredProficiency": "PROF-INTERMEDIATE"
        },
        {
          "competencyId": "COMP-010",
          "competencyName": "Communication",
          "requiredProficiency": "PROF-INTERMEDIATE"
        }
      ]
    },
    {
      "id": "POS-SENIOR-BE-PAYMENTS",
      "name": "Senior Backend Engineer - Payments Team",
      "jobFunctionId": "JFN-BACKEND-ENG",
      "jobLevelId": "LVL-SENIOR",
      "requiredCompetencies": [
        {
          "competencyId": "COMP-001",
          "competencyName": "RESTful API Development",
          "requiredProficiency": "PROF-ADVANCED",
          "note": "Senior는 복잡한 설계"
        },
        {
          "competencyId": "COMP-002",
          "competencyName": "Database Design",
          "requiredProficiency": "PROF-ADVANCED"
        },
        {
          "competencyId": "COMP-010",
          "competencyName": "Communication",
          "requiredProficiency": "PROF-ADVANCED",
          "note": "멘토링 및 경영진 소통"
        }
      ]
    }
  ]
}
```

**관찰:** 같은 Job Function (Backend Engineer)이지만, Job Level이 다르면 요구되는 Proficiency Level도 달라집니다. Junior는 Beginner-Intermediate, Senior는 Advanced 중심입니다.

### 예시 3: V2 확장 - Engineering Career Ladder (6단계)
**맥락:** V2에서 Staff, Principal 등 추가 가능

**구체적 예시:**
```json
{
  "v2EngineeringLadder": [
    {"id": "LVL-JUNIOR", "name": "Junior", "order": 1},
    {"id": "LVL-MID", "name": "Mid", "order": 2},
    {"id": "LVL-SENIOR", "name": "Senior", "order": 3},
    {
      "id": "LVL-STAFF",
      "name": "Staff",
      "nameKo": "스태프",
      "order": 4,
      "description": "다수의 팀에 영향을 미치는 기술 전략을 수립하고, 복잡한 크로스팀 프로젝트를 주도. IC(Individual Contributor) 최상위.",
      "yearsExperienceMin": 8,
      "typicalCompetencyProfile": "핵심 Competencies Expert, 광범위한 영향력",
      "responsibilities": [
        "회사 전체 기술 표준 수립",
        "크로스팀 아키텍처 설계",
        "시니어 엔지니어 멘토링",
        "채용 및 조직 문화 개선"
      ]
    },
    {
      "id": "LVL-PRINCIPAL",
      "name": "Principal",
      "nameKo": "프린시펄",
      "order": 5,
      "description": "조직 전체의 기술 방향을 결정하고, 산업 전반에 영향을 미치는 기술 리더. CTO와 협업.",
      "yearsExperienceMin": 12,
      "typicalCompetencyProfile": "대부분 Competencies Expert, 비전 제시",
      "responsibilities": [
        "기술 비전 수립",
        "외부 컨퍼런스 발표",
        "기술 파트너십 주도",
        "조직 전체 기술 전략"
      ]
    },
    {
      "id": "LVL-FELLOW",
      "name": "Fellow",
      "nameKo": "펠로우",
      "order": 6,
      "description": "업계 최고 수준의 기술 권위자. 회사와 산업 전반에 영향.",
      "yearsExperienceMin": 15,
      "typicalCompetencyProfile": "Expert, 산업 표준 제정 수준",
      "responsibilities": [
        "산업 표준 제정 참여",
        "오픈소스 주요 기여",
        "학계 협업",
        "차세대 기술 연구"
      ]
    }
  ]
}
```

**관찰:** V2에서는 Staff, Principal, Fellow 등을 추가하여 IC(Individual Contributor) 트랙을 완성할 수 있습니다. 하지만 V1에서는 Junior, Mid, Senior 3단계로 충분합니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **FCQ-01-006** "Job Level과 Proficiency Level의 차이는 무엇인가?"
   - **예상 답변:** "Job Level은 조직 내 직급 (Junior, Senior), Proficiency Level은 특정 스킬의 숙련도 (Beginner, Advanced). Senior(Job Level)라고 모든 스킬이 Advanced(Proficiency)는 아님. 예: Senior Backend Engineer의 RESTful API는 Advanced, Testing은 Intermediate 가능"
   - **출처:** `../../01-specification/competency-questions.md`

2. **신규 CQ** "시니어 백엔드 엔지니어는 어떤 책임을 가지는가?"
   - **예상 답변:** "Job Level 'LVL-SENIOR'의 responsibilities를 조회하면, '복잡한 시스템 설계 및 구현', '기술 아키텍처 의사결정', '주니어/미드 멘토링', '프로젝트 기술 리딩' 등 확인 가능"
   - **출처:** Job Level 정의

3. **신규 CQ** "미드 레벨은 평균 몇 년차인가?"
   - **예상 답변:** "Job Level 'LVL-MID'의 yearsExperienceMin-Max를 조회하면 2-5년. 다만 이것은 가이드라인이며, 실제로는 Competency Proficiency로 판단"
   - **출처:** Job Level 정의

4. **신규 CQ** "우리 회사의 Career Ladder는 무엇인가?"
   - **예상 답변:** "V1에서는 Junior, Mid, Senior 3단계. V2에서 Staff, Principal 등 확장 가능"
   - **출처:** Job Level 정의 및 로드맵

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, name, nameKo, order, description)
- [x] V1 범위 3개 레벨 정의 (Junior, Mid, Senior)
- [x] V2 확장 예시 제공 (Staff, Principal, Fellow)
- [x] 최소 4개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [x] Job Level 순서가 논리적 (order 1 < 2 < 3 < ...)
- [x] 각 레벨의 description이 순차적으로 발전
- [x] 경력 연수 범위가 겹치지 않음 (Junior 0-2, Mid 2-5, Senior 5+)
- [x] Job Level과 Proficiency Level의 구분이 명확

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [x] 개발자가 구현 가능 (속성 명확, JSON 스키마 제공)
- [x] 레벨 간 경계가 명확
- [x] Job Level vs Proficiency Level 차이 설명 충분

### 증거 기반 (Evidence-grounded)
- [x] Opportunity 문서 링크됨 (Problem 01 해결)
- [x] 실제 문제 해결에 기여 ("시니어" 정의 명확화)
- [x] 예시가 실제 데이터 기반 (보리가 자주 채용하는 Junior, Mid, Senior)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴: Enumeration Pattern (열거형 패턴)**

**적용 이유:**
- Job Level은 미리 정의된 고정 값 세트 (Junior, Mid, Senior, ...)
- 조직의 Career Ladder는 안정적 (자주 변경 안 됨)

**구현 방법:**
```
Job Levels (Enumeration)
├── Junior (order: 1)
├── Mid (order: 2)
├── Senior (order: 3)
└── [V2] Staff, Principal, Fellow (order: 4, 5, 6)

사용 예시:
Position.jobLevelId
→ 반드시 위 값 중 하나만 가능
```

**확장 전략:**
- V1: 3단계 (Junior, Mid, Senior)
- V2: Engineering 6단계, PM 4단계 등 Job Function별 Career Ladder 분리 가능

**참고 문서:** `../design-patterns/enumeration-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### 업계 일반적 Career Ladder 참조
- **Tech Industry Standard (Engineering):**
  - Junior (0-2년) → Mid (2-5년) → Senior (5-8년) → Staff (8-12년) → Principal (12-15년) → Fellow (15년+)
  - 출처: [levels.fyi](https://www.levels.fyi/), [Holloway Guide to Technical Recruiting](https://www.holloway.com/g/technical-recruiting-hiring/sections/engineering-levels)

- **PM Career Ladder:**
  - Associate PM → PM → Senior PM → Group PM → Director of Product
  - 출처: [Lenny's Newsletter - PM Career Ladder](https://www.lennysnewsletter.com/)

- **V1 전략:** 업계 표준 3단계 (Junior, Mid, Senior) 채택하여 외부 호환성 확보

### O*NET 매핑 (간접)
- O*NET은 Job Level을 직접 정의하지 않음
- 하지만 Occupation별 "Entry Level", "Experienced" 구분 존재
- V1에서는 O*NET 매핑 생략, V2에서 검토

**참고 문서:**
- `../../03-implementation/standards/career-ladder-guide.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-26 | 초안 생성 | Terry | Week 2 여섯 번째 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **V1에서 3단계로 충분한가?**
   - **질문:** Junior, Mid, Senior vs. Junior, Mid, Senior, Staff?
   - **우선순위:** Medium (V1 파일럿 후 결정)
   - **해결 방법:** 보리에게 "실제 채용에서 Staff 레벨 채용이 있는지" 질문
   - **예상 답변:** 대부분 스타트업/중소기업은 Senior까지만 있음. Staff는 대기업/성숙한 조직

2. **Job Function별로 다른 Career Ladder를 가질 수 있는가?**
   - **질문:** Engineering은 6단계, PM은 4단계 가능한가?
   - **우선순위:** Low (V2 확장)
   - **해결 방법:** V2에서 "Career Ladder" Entity 도입 검토
   - **예상 답변:** 가능. 실제로 많은 회사가 IC(Engineering) 트랙과 Management 트랙 분리

3. **경력 연수(yearsExperience)를 필수로 할지 선택으로 할지?**
   - **질문:** 경력 연수가 Job Level의 절대 기준인가, 참고 사항인가?
   - **우선순위:** High (V1 파일럿 전)
   - **해결 방법:** 보리에게 "경력 5년차인데 Junior 가능한가?" 질문
   - **예상 답변:** 경력 연수는 가이드라인, 실제로는 Competency Proficiency로 판단 (선택 필드 유지)

### 가정 (검증 필요)
1. **가정: Job Level은 전역 표준이다 (Job Function에 무관)**
   - **가정 내용:** Senior Backend Engineer와 Senior Product Manager의 "Senior"는 같은 정의
   - **리스크:** 실제로는 Engineering Senior와 PM Senior의 책임이 다를 수 있음
   - **검증 계획:** V1 파일럿에서 Backend Engineer Senior, PM Senior 비교하며 검증
   - **검증 기한:** Week 6

2. **가정: Job Level의 order는 선형적이다**
   - **가정 내용:** Junior(1) < Mid(2) < Senior(3) < Staff(4) 명확한 위계
   - **리스크:** 일부 조직은 병렬 트랙 존재 (IC vs Management)
   - **검증 계획:** V2에서 병렬 트랙 지원 검토
   - **검증 기한:** V2

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **관련 개념:**
  - [position.md](position.md) (Job Level을 사용하는 개념)
  - [proficiency-level.md](proficiency-level.md) (Job Level과 구분되는 개념)
- **Problem Mapping:** [problem-01-skill-standardization.md](../../mapping/problem-01-skill-standardization.md)

### 외부 참고자료
- **levels.fyi:** [Engineering Levels](https://www.levels.fyi/)
- **Holloway Guide:** [Engineering Levels](https://www.holloway.com/g/technical-recruiting-hiring/sections/engineering-levels)
- **Lenny's Newsletter:** [PM Career Ladder](https://www.lennysnewsletter.com/)
- **Progression.fyi:** [Career Ladders Collection](https://www.progression.fyi/)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]

**중점 검토 항목:**
- [ ] 3단계 (Junior, Mid, Senior)로 충분한가?
- [ ] 경력 연수 범위가 현실적인가?
- [ ] 각 레벨의 responsibilities가 실제 채용과 일치하는가?
- [ ] Job Level vs Proficiency Level 구분이 명확한가?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- Draft 상태, Borry 검토 대기 중

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영
- [ ] 4개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] **NEXT:** Evaluation Rubric (C-007) 개념 작성 (마지막 핵심 개념)
- [ ] Week 3-4: Position 예시 작성 시 Job Level별 차이 검증
- [ ] Enumeration Pattern 문서 작성 (`../design-patterns/enumeration-pattern.md`)
- [ ] Career Ladder 가이드 작성 (`../../03-implementation/standards/career-ladder-guide.md`)

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (3단계 정의, Position 연결, V2 확장)
- [x] Job Level vs Proficiency Level 명확히 구분
- [x] 증거 기반 (Opportunity 01 링크)
- [x] 검증 체크리스트 작성

---

*이 문서는 증거 기반으로 진화합니다. Job Level의 3단계 구분이 실제 채용에서 충분한지, 보리의 파일럿 피드백이 중요합니다.*
