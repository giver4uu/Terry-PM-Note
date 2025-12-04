# Proficiency Level (숙련도 레벨)

**개념 ID:** C-005
**생성일:** 2025-11-26
**최종 수정일:** 2025-11-26
**작성자:** Terry
**검토자:** Borry (검토 대기), Berry (검토 대기)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | Problem 01 (스킬/역량 표준화) - "Advanced"가 무엇인지 명확화 |
| **우선순위** | High |
| **의존 개념** | Competency (C-004) |
| **증거 출처** | [opportunity-01](../../../opportunities/01-skill-standardization.md) |
| **표준 참조** | SFIA Levels, Dreyfus Model of Skill Acquisition |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
Proficiency Level은 **특정 Competency를 얼마나 잘 수행할 수 있는지**를 나타내는 숙련도 단계입니다.

### 상세 설명
Proficiency Level은 "Advanced RESTful API Development", "Intermediate Communication" 같은 표현에서 "Advanced", "Intermediate" 부분을 의미합니다. 각 레벨은 구체적인 행동적 설명(behavioral anchors)으로 정의됩니다.

**왜 이 개념이 Problem 01을 해결하는가?**

**Before (Proficiency Level 정의 없이):**
- JD: "Senior Backend Engineer는 RESTful API에 능숙해야 함"
- 면접관 A: "능숙하다 = API 만들 줄 알면 됨"
- 면접관 B: "능숙하다 = 복잡한 아키텍처 설계 가능해야 함"
- **→ 평가 기준 불일치, 1시간 조율 필요**

**After (Proficiency Level 정의 있음):**
- JD: "RESTful API Development - Advanced 레벨 필요"
- Advanced 정의: "복잡한 비즈니스 로직을 RESTful 구조로 설계하고, idempotency key, rate limiting 구현 가능"
- 모든 면접관이 동일한 기준 사용
- **→ 조율 시간 15분으로 단축 (75% 개선)**

**HR 도메인에서의 역할:**
- JD에서 "시니어", "주니어" 같은 모호한 표현을 구체적 행동으로 대체
- 면접 평가 시 "이 후보자는 Advanced 레벨인가?" 판단 기준 제공
- 경력 개발 계획 (Individual Development Plan)에서 "다음 레벨에 도달하려면 무엇을 배워야 하는가?" 가이드

### 동의어 (Synonyms)
- 숙련도 레벨
- Skill Level
- Competency Level
- Mastery Level
- Capability Level

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs Job Level**: Job Level은 조직 내 직급 (Senior, Mid), Proficiency Level은 특정 스킬의 숙련도 (Advanced, Intermediate)
- **vs Seniority**: Seniority는 경력 연차 또는 직급, Proficiency는 스킬 숙련도 (5년차도 특정 스킬에서는 Beginner일 수 있음)

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- 없음 (Proficiency Level은 독립적 개념)

### 하위 개념 (Narrower Concepts)
- 없음 (각 레벨은 동등한 단계)

### 관련 개념 (Related Concepts)
- **Competency** (appliedTo 관계)
  - 관계 설명: Proficiency Level은 Competency에 적용됨
  - 예시: "RESTful API Development" Competency → Beginner, Intermediate, Advanced, Expert Levels

- **Evaluation Rubric** (measuredBy 관계)
  - 관계 설명: Proficiency Level은 Rubric으로 측정됨
  - 예시: "Advanced" 레벨 판정 → 5점 척도 Rubric (4-5점 = Advanced)

- **Position** (requiredBy 관계)
  - 관계 설명: Position은 특정 Competency의 특정 Proficiency Level을 요구
  - 예시: Senior Backend Engineer → RESTful API (Advanced), Communication (Advanced)

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|---------|---------|
| id | String | 필수 | 고유 식별자 | "PROF-ADVANCED" |
| name | String | 필수 | 레벨 이름 (영어) | "Advanced" |
| nameKo | String | 필수 | 한국어 이름 | "고급" |
| order | Integer | 필수 | 숙련도 순서 (낮을수록 초보) | 3 (1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert) |
| description | String | 필수 | 일반적 설명 | "복잡한 상황을 독립적으로 해결하고, 다른 사람을 가이드할 수 있음" |
| sfiaMapping | String | 선택 | SFIA 레벨 매핑 | "Level 4-5" |
| dreyfusStage | String | 선택 | Dreyfus 모델 단계 | "Proficient" |

**참고:** Proficiency Level의 구체적 행동적 설명(behavioral anchors)은 각 Competency 정의 내부에 포함됩니다. 이 개념은 레벨의 이름과 순서만 정의합니다.

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: V1의 4단계 Proficiency Levels
**맥락:** V1 파일럿에서 사용할 표준 4단계 레벨

**구체적 예시:**
```json
{
  "proficiencyLevels": [
    {
      "id": "PROF-BEGINNER",
      "name": "Beginner",
      "nameKo": "초급",
      "order": 1,
      "description": "기본 개념을 이해하고, 튜토리얼이나 가이드를 참고하여 단순한 작업을 수행할 수 있음. 지속적인 지도가 필요함.",
      "sfiaMapping": "Level 1-2",
      "dreyfusStage": "Novice"
    },
    {
      "id": "PROF-INTERMEDIATE",
      "name": "Intermediate",
      "nameKo": "중급",
      "order": 2,
      "description": "핵심 원칙을 이해하고, 일반적인 작업을 독립적으로 수행할 수 있음. 복잡한 상황에서는 가끔 도움이 필요함.",
      "sfiaMapping": "Level 3",
      "dreyfusStage": "Advanced Beginner / Competent"
    },
    {
      "id": "PROF-ADVANCED",
      "name": "Advanced",
      "nameKo": "고급",
      "order": 3,
      "description": "복잡한 상황을 독립적으로 해결하고, 베스트 프랙티스를 적용하며, 주니어를 가이드할 수 있음. 깊은 이해를 바탕으로 트레이드오프 판단 가능.",
      "sfiaMapping": "Level 4-5",
      "dreyfusStage": "Proficient"
    },
    {
      "id": "PROF-EXPERT",
      "name": "Expert",
      "nameKo": "전문가",
      "order": 4,
      "description": "해당 분야의 권위자로, 새로운 접근법을 개발하고, 조직의 표준을 수립하며, 복잡한 전략적 결정을 주도함. 타 조직에도 영향을 미침.",
      "sfiaMapping": "Level 6-7",
      "dreyfusStage": "Expert"
    }
  ]
}
```

**관찰:** 4단계는 SFIA의 7단계보다 단순하지만, 대부분의 채용 상황에서 충분합니다. V1 파일럿에서 검증 후 필요 시 5단계로 확장 가능합니다.

### 예시 2: Competency별 Behavioral Anchors (RESTful API Development)
**맥락:** 각 Competency는 자신만의 Proficiency Level 설명을 가짐

**구체적 예시 (Competency COMP-001 내부):**
```json
{
  "competencyId": "COMP-001",
  "competencyName": "RESTful API Development",
  "proficiencyLevels": [
    {
      "level": "PROF-BEGINNER",
      "behavioralAnchor": "기본적인 CRUD API를 구현할 수 있음. 튜토리얼을 참고하여 단순한 엔드포인트 작성 가능.",
      "example": "GET /users 엔드포인트를 만들어 사용자 리스트를 JSON으로 반환할 수 있음"
    },
    {
      "level": "PROF-INTERMEDIATE",
      "behavioralAnchor": "RESTful 원칙을 이해하고 일관된 API를 독립적으로 설계할 수 있음. 에러 핸들링과 문서화 가능.",
      "example": "인증이 필요한 CRUD API를 설계하고, Swagger 문서를 작성하며, 적절한 HTTP 상태 코드를 사용함"
    },
    {
      "level": "PROF-ADVANCED",
      "behavioralAnchor": "복잡한 비즈니스 로직을 RESTful 구조로 설계하고, 성능과 보안을 고려한 API를 개발할 수 있음. API 디자인 가이드라인을 제시 가능.",
      "example": "결제 API에 idempotency key를 도입하고, rate limiting을 구현하며, HATEOAS를 적용한 self-descriptive API 설계"
    },
    {
      "level": "PROF-EXPERT",
      "behavioralAnchor": "API 아키텍처를 주도하고, 팀의 API 표준을 수립함. GraphQL, gRPC 등 대안 기술과 비교 평가 가능.",
      "example": "회사 전체 API 디자인 가이드를 작성하고, API Gateway 아키텍처를 설계하며, 마이크로서비스 간 API 통신 전략 수립"
    }
  ]
}
```

**관찰:** 같은 "Advanced" 레벨이지만, Competency마다 구체적 의미가 다릅니다. RESTful API의 Advanced는 "idempotency key 구현", Communication의 Advanced는 "경영진 설득" 등으로 맥락화됩니다.

### 예시 3: Position에서 Proficiency Level 요구사항
**맥락:** Senior Backend Engineer Position의 요구사항

**구체적 예시:**
```json
{
  "positionId": "POS-SENIOR-BE-PAYMENTS",
  "positionName": "Senior Backend Engineer - Payments Team",
  "requiredCompetencies": [
    {
      "competencyId": "COMP-001",
      "competencyName": "RESTful API Development",
      "requiredProficiency": "PROF-ADVANCED",
      "justification": "결제 API는 복잡한 비즈니스 로직과 높은 안정성 요구"
    },
    {
      "competencyId": "COMP-002",
      "competencyName": "Database Design & Optimization",
      "requiredProficiency": "PROF-ADVANCED",
      "justification": "결제 트랜잭션은 데이터 정합성이 생명"
    },
    {
      "competencyId": "COMP-010",
      "competencyName": "Communication & Collaboration",
      "requiredProficiency": "PROF-ADVANCED",
      "justification": "시니어는 경영진과 소통하고 주니어를 멘토링해야 함"
    },
    {
      "competencyId": "COMP-050",
      "competencyName": "Testing & Quality Assurance",
      "requiredProficiency": "PROF-INTERMEDIATE",
      "justification": "기본적인 테스트 작성은 필수이지만, QA 전문가 수준은 아님"
    }
  ]
}
```

**관찰:** 하나의 Position 내에서도 Competency마다 요구되는 Proficiency Level이 다릅니다. 모든 것을 Advanced로 요구하지 않고, 우선순위에 따라 차등 적용합니다.

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **SCQ-01-005** "'Advanced' 수준의 RESTful API Development이란 무엇인가?"
   - **예상 답변:** "Competency 'COMP-001'의 proficiencyLevels에서 'PROF-ADVANCED'를 조회하면, '복잡한 비즈니스 로직을 RESTful 구조로 설계하고, idempotency key, rate limiting 구현 가능' 등 구체적 행동 설명 확인 가능"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

2. **VCQ-02-001** "면접관 A와 B가 '고급 수준'을 다르게 이해하는 것을 어떻게 방지하는가?"
   - **예상 답변:** "각 Proficiency Level의 behavioralAnchor를 면접 전에 공유하고, Evaluation Rubric으로 5점 척도 평가 기준을 제공하여 일관성 확보"
   - **출처:** `../../01-specification/competency-questions.md` (High priority, V1)

3. **신규 CQ** "Beginner와 Intermediate의 차이는 무엇인가?"
   - **예상 답변:** "Beginner는 '지속적인 지도 필요', Intermediate는 '일반적 작업 독립 수행 가능'. 구체적으로는 각 Competency의 behavioralAnchor에서 확인 (예: RESTful API - Beginner는 튜토리얼 참고 필요, Intermediate는 독립 설계 가능)"
   - **출처:** 온톨로지 기본 이해

4. **신규 CQ** "시니어 포지션은 모든 Competency에서 Advanced 이상이어야 하는가?"
   - **예상 답변:** "아니오. Position마다 핵심 Competencies는 Advanced, 보조 Competencies는 Intermediate 요구 가능. 예: Senior Backend Engineer는 RESTful API (Advanced) 필수이지만, Testing (Intermediate)도 허용"
   - **출처:** Position-Competency 관계 이해

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [x] 모든 필수 속성 정의됨 (id, name, nameKo, order, description)
- [x] 4개 표준 레벨 정의 (Beginner, Intermediate, Advanced, Expert)
- [x] 최소 3개 실제 사례 제공
- [x] 최소 4개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [x] Proficiency Level 순서가 논리적 (order 1 < 2 < 3 < 4)
- [x] 각 레벨의 description이 순차적으로 발전 (Beginner → Expert)
- [x] 동의어가 실제로 같은 의미
- [x] SFIA 매핑이 일관적

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능 - **검토 대기**
- [ ] Berry (CTO)가 레벨 구분에 동의 - **검토 대기**
- [x] 개발자가 구현 가능 (속성 명확, JSON 스키마 제공)
- [x] 레벨 간 경계가 명확

### 증거 기반 (Evidence-grounded)
- [x] Opportunity 문서 링크됨 (Problem 01 해결)
- [x] 실제 문제 해결에 기여 (면접관 평가 기준 일관성)
- [x] 예시가 실제 데이터 기반 (보리가 겪는 "Advanced" 해석 차이)

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴: Enumeration Pattern (열거형 패턴)**

**적용 이유:**
- Proficiency Level은 미리 정의된 고정 값 세트 (Beginner, Intermediate, Advanced, Expert)
- 새 레벨을 임의로 추가하지 않음 (표준화 유지)

**구현 방법:**
```
Proficiency Levels (Enumeration)
├── Beginner (order: 1)
├── Intermediate (order: 2)
├── Advanced (order: 3)
└── Expert (order: 4)

사용 예시:
Position.requiredCompetencies[].requiredProficiency
→ 반드시 위 4개 중 하나의 값만 가능
```

**확장 전략 (V2):**
- V1 파일럿 후 필요 시 "Master" 레벨 추가 (order: 5)
- 하지만 기본 4단계는 유지 (안정성)

**참고 문서:** `../design-patterns/enumeration-pattern.md` (작성 예정)

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### SFIA (Skills Framework for the Information Age) 매핑
- **SFIA Levels:** 7단계 (Level 1 = Follow, Level 7 = Set strategy)
- **V1 매핑:**
  - Beginner → SFIA Level 1-2 (Follow, Assist)
  - Intermediate → SFIA Level 3 (Apply)
  - Advanced → SFIA Level 4-5 (Enable, Ensure/Advise)
  - Expert → SFIA Level 6-7 (Initiate, Set strategy)
- **매핑 근거:** SFIA는 IT 산업 표준이므로, 기술 Competencies에 SFIA 레벨 참조하여 법적 방어력 확보
- **참고:** [SFIA 8 Levels of Responsibility](https://sfia-online.org/en/sfia-8/responsibilities/levels-of-responsibility)

### Dreyfus Model of Skill Acquisition
- **Dreyfus Stages:** 5단계 (Novice, Advanced Beginner, Competent, Proficient, Expert)
- **V1 매핑:**
  - Beginner → Novice
  - Intermediate → Advanced Beginner / Competent (상황에 따라)
  - Advanced → Proficient
  - Expert → Expert
- **매핑 근거:** Dreyfus 모델은 스킬 습득의 인지과학적 기반 제공, 행동적 설명 작성 시 참고
- **참고:** [Dreyfus Model](https://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition)

### LinkedIn Skill Endorsement Levels (참고)
- **LinkedIn:** "Add skill" 시 레벨 구분 없음 (단순 Yes/No)
- **V1 전략:** LinkedIn과 1:1 매핑 불가, 하지만 LinkedIn 스킬 이름은 Competency.linkedInSkillName에 매핑
- **V2 확장:** LinkedIn Learning의 "Beginner", "Intermediate", "Advanced" 코스 레벨과 연계 가능성 탐색

**참고 문서:**
- `../../03-implementation/standards/sfia-mapping.md` (작성 예정)
- `../../03-implementation/standards/proficiency-level-guide.md` (작성 예정)

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| 2025-11-26 | 초안 생성 | Terry | Week 2 다섯 번째 개념 정의 | v0.1.0 |

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **4단계로 충분한가, 5단계가 필요한가?**
   - **질문:** V1에서 Beginner, Intermediate, Advanced, Expert 4단계 vs. V2에서 Master 추가 5단계?
   - **우선순위:** High (파일럿 전 결정)
   - **해결 방법:** Week 6 파일럿에서 보리에게 "4단계로 충분히 구분 가능한지" 질문
   - **예상 답변:** 대부분 채용에서는 4단계 충분, 하지만 CTO급 채용 시 Expert와 Master 구분 필요할 수 있음

2. **Soft Skill과 Technical Competency에 같은 Proficiency Levels를 사용하는가?**
   - **질문:** "Advanced Communication"과 "Advanced RESTful API"가 같은 "Advanced" 정의를 공유?
   - **우선순위:** Medium
   - **해결 방법:** V1에서는 공유하되, behavioralAnchor로 Competency별 차별화. V2에서 필요 시 별도 레벨 체계 검토
   - **예상 답변:** 공유 가능. "Advanced" = "복잡한 상황 독립 해결 + 타인 가이드"는 모든 Competency에 적용 가능한 일반 원칙

3. **Proficiency Level과 Job Level(시니어리티)의 관계는?**
   - **질문:** "Senior 엔지니어는 모든 Competency가 Advanced 이상이어야 하는가?"
   - **우선순위:** High (V1 파일럿 전)
   - **해결 방법:** Position 예시 작성 시 Senior Backend Engineer의 실제 Proficiency 요구사항 정의하며 패턴 파악
   - **예상 답변:** 아니오. 핵심 Competencies는 Advanced, 보조 Competencies는 Intermediate 허용

### 가정 (검증 필요)
1. **가정: Proficiency Level은 전역 표준이다 (회사별 커스터마이징 불가)**
   - **가정 내용:** Beginner, Intermediate, Advanced, Expert는 Core 표준이고, Shell에서도 변경 불가
   - **리스크:** 일부 회사는 다른 레벨 체계 선호 (예: Level 1-5 숫자 표기)
   - **검증 계획:** V1 파일럿에서 보리에게 "4단계 영문 명칭이 적절한지, 숫자 표기를 선호하는지" 질문
   - **검증 기한:** Week 6

2. **가정: 각 Competency의 behavioralAnchor는 Competency 정의 내부에 포함된다**
   - **가정 내용:** Proficiency Level은 일반 개념만 정의, 구체적 행동은 Competency에 위임
   - **리스크:** 중복 데이터 (각 Competency마다 4개 레벨 설명 필요)
   - **검증 계획:** Week 3-4 Competency 작성 시 구조 검증
   - **검증 기한:** Week 4

---

## 📚 참고 자료 (References)

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **Competency Questions:** [competency-questions.md](../../01-specification/competency-questions.md)
- **관련 개념:**
  - [competency.md](competency.md) (Proficiency Level을 사용하는 개념)
  - [position.md](position.md) (Proficiency 요구사항 정의)
  - evaluation-rubric.md (Proficiency 측정 방법, 작성 예정)
- **Problem Mapping:** [problem-01-skill-standardization.md](../../mapping/problem-01-skill-standardization.md)

### 외부 표준
- **SFIA:** [SFIA 8 Levels of Responsibility](https://sfia-online.org/en/sfia-8/responsibilities/levels-of-responsibility)
- **Dreyfus Model:** [Wikipedia Article](https://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition)
- **Academic:** [Competency Proficiency Scales (SHRM)](https://www.shrm.org/topics-tools/tools/toolkits/developing-competency-model)

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [검토 대기]
> [Borry 피드백 예정]

**중점 검토 항목:**
- [ ] 4단계 레벨이 실제 채용에서 충분히 구분 가능한가?
- [ ] 각 레벨의 description이 이해하기 쉬운가?
- [ ] Beginner와 Intermediate의 경계가 명확한가?
- [ ] "Advanced" 레벨이 실제 시니어 채용 기준과 일치하는가?

**Action Items:**
- [ ] 대기 중

**반영 여부:** 대기 중

---

### Berry (CTO) - [검토 대기]
> [Berry 피드백 예정]

**중점 검토 항목:**
- [ ] 기술 Competency의 Proficiency Level 구분이 현실적인가?
- [ ] Advanced와 Expert의 차이가 명확한가? (실무에서 구분 가능한가?)
- [ ] SFIA 매핑이 적절한가?

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
- [ ] 4개 CQ 검증 완료
- [ ] Week 3-4: 실제 Competency 정의 작성 시 behavioralAnchor 패턴 검증
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] Job Level (C-006) 개념 작성 (다음 작업)
- [ ] Evaluation Rubric (C-007) 개념 작성 (Proficiency 측정 방법)
- [ ] Week 3-4: 10-15개 Competency에 각각 4개 레벨의 behavioralAnchor 작성
- [ ] Enumeration Pattern 문서 작성 (`../design-patterns/enumeration-pattern.md`)
- [ ] SFIA 매핑 가이드 작성 (`../../03-implementation/standards/sfia-mapping.md`)
- [ ] Proficiency Level 사용 가이드 작성 (`../../03-implementation/standards/proficiency-level-guide.md`)

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용
- [x] 구체적 예시 제공 (4단계 정의, Competency별 적용, Position 요구사항)
- [x] 증거 기반 (Opportunity 01 링크, 보리의 "Advanced" 해석 차이 문제)
- [x] 검증 체크리스트 작성
- [x] SFIA, Dreyfus 표준 참조

---

*이 문서는 증거 기반으로 진화합니다. Proficiency Level의 4단계 구분이 실제 채용에서 유용한지, 보리와 베리의 파일럿 피드백이 중요합니다.*
