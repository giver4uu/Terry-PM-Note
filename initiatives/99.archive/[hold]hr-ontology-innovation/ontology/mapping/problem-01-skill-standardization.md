# Problem-Concept Mapping: 스킬/역량 표준화

**문제 ID:** Problem 01
**출처:** [01-skill-standardization.md](../../opportunities/01-skill-standardization.md)
**우선순위:** High
**작성일:** 2025-11-25
**최종 업데이트:** 2025-11-25

---

## 📋 문제 요약

### 고객 Pain Points

**보리 인터뷰 (2025-11-16)에서 발견된 구체적 문제:**

1. **팀마다 같은 직급/스킬을 다르게 정의**
   - Backend 팀 A: "시니어 = 5년 이상 경력"
   - Backend 팀 B: "시니어 = 리더십 경험 있음"
   - 결과: 매 채용마다 "우리 팀의 시니어는 무엇인가?" 논쟁 발생

2. **같은 스킬을 팀마다 다르게 부름**
   - 팀 A: "RESTful API 설계"
   - 팀 B: "마이크로서비스 아키텍처"
   - 실제로는 비슷한 역량이지만 용어 불일치로 혼란

3. **매 채용마다 JD를 처음부터 작성**
   - 이전 JD 재사용 불가 (맥락 다름, 정의 다름)
   - 시간: 2시간 소요
   - 목표: 30분으로 단축 (75% 감소)

4. **팀 간 합의에 일주일 소요**
   - "Backend A팀과 B팀의 시니어 정의 통일"을 위한 회의
   - 시간: 1주일 (여러 차례 미팅)
   - 목표: 1일로 단축 (85% 감소)

### 근본 원인

- **지식의 파편화**: 각 팀이 독립적으로 정의 생성
- **표준의 부재**: 회사 차원의 공통 정의 없음
- **템플릿 실패**: 경직된 템플릿은 무시됨 (유연성 부족)

### 비즈니스 임팩트

| 지표 | 현재 | 목표 | 개선율 |
|------|------|------|--------|
| JD 작성 시간 | 2시간 | 30분 | 75% ↓ |
| 팀 간 합의 시간 | 1주일 | 1일 | 85% ↓ |
| 채용 사이클 | 기준선 | -7일 | 단축 |
| 지식 재사용률 | 0% | 70% | 70% ↑ |

---

## 🔗 해결하는 온톨로지 개념들

### 핵심 개념 (Core Concepts) - V1 범위

| 개념 ID | 개념 이름 | 해결하는 Pain Point | 우선순위 | 상태 |
|---------|----------|-------------------|---------|------|
| C-001 | Job Family | 최상위 분류 제공 (Engineering, Product 등) | High | ⏳ Pending |
| C-002 | Job Function | 구체적 역할 타입 정의 (Backend Engineer, Frontend Engineer, PM) | High | ⏳ Pending |
| C-003 | Position | "시니어 백엔드 엔지니어"의 정확한 정의 | High | ⏳ Pending |
| C-004 | Competency | 스킬/역량 표준 정의 ("RESTful API 개발"이 무엇인지) | High | ⏳ Pending |
| C-005 | Proficiency Level | "Advanced"가 무엇인지 명확한 기준 | High | ⏳ Pending |
| C-006 | Job Level | "시니어"가 무엇인지 조직 계층 정의 | High | ⏳ Pending |

**총 개념 수:** 6개 (V1에서 정의)

### 관계 (Relationships)

| 관계 ID | 관계 정의 | 해결하는 Pain Point | 상태 |
|---------|----------|-------------------|------|
| R-001 | Position requires Competency at Proficiency Level | "시니어가 어떤 스킬을 어느 수준으로 필요한지" 명확화 | ⏳ Pending |
| R-002 | Job Function hasBase Competency | 직무군별 기본 역량 정의 (재사용 가능) | ⏳ Pending |
| R-003 | Competency hasSynonym Term | "RESTful API 설계" = "마이크로서비스 API 개발" 매핑 | ⏳ Pending |

---

## 💡 작동 방식 (How It Works)

### Before (현재 - 문제 상황)

**보리의 작업 흐름:**

```
📝 Step 1: 빈 JD 템플릿 열기
⏱️ 시간: 5분

❓ Step 2: "시니어 백엔드 개발자가 뭐지?" 고민
⏱️ 시간: 30분
💭 생각: "A팀은 5년 경력이라 했는데, B팀은 리더십이라 했는데..."

📧 Step 3: A팀에게 이메일로 물어보기
⏱️ 시간: 1일 대기 (왕복 이메일)
💬 A팀 답변: "우리는 PostgreSQL Advanced 필수, Redis는 옵션"

📧 Step 4: B팀에게도 물어보기
⏱️ 시간: 2일 대기
💬 B팀 답변: "우리는 Redis 필수, PostgreSQL은 Intermediate도 OK"

🤝 Step 5: A팀과 B팀 합의 회의 (3회)
⏱️ 시간: 1주일
💬 회의 내용:
   - 1차: "시니어 정의가 다르다" 확인
   - 2차: "필수 스킬 리스트 초안" 작성
   - 3차: "합의된 정의" 최종 확정

✍️ Step 6: 최종 JD 작성
⏱️ 시간: 1시간

---
📊 총 소요 시간: 실작업 2시간 + 대기 1주일
😓 보리의 감정: "왜 매번 처음부터 해야 하지? 지난번 JD는 왜 못 쓰지?"
```

### After (온톨로지 사용 - 해결 상황)

**보리의 작업 흐름:**

```
🔍 Step 1: 온톨로지에서 "Senior Backend Engineer" 조회
⏱️ 시간: 2분
📋 자동으로 표시되는 내용:
   - Position: Senior Backend Engineer
   - Job Level: Senior (5+ years OR leadership experience)
   - Required Competencies:
     ✅ RESTful API Development (Proficiency: Advanced)
     ✅ PostgreSQL Database Design (Proficiency: Advanced)
     ✅ Microservices Architecture (Proficiency: Intermediate)
     ✅ Communication (Proficiency: Intermediate)

🎨 Step 2: 회사/팀 특성에 맞게 미세 조정
⏱️ 시간: 10분
✏️ 조정 내용:
   - "PCI Compliance" 추가 (Payments팀 특수 요구사항)
   - "PostgreSQL" 레벨을 Advanced → Expert로 상향 (금융 데이터 중요)

🚀 Step 3: JD 생성 버튼 클릭
⏱️ 시간: 3분
📄 자동 생성된 JD:
   - 직무 요약
   - Required Skills (온톨로지 기반)
   - Preferred Skills
   - 평가 기준 (Evaluation Rubric 연결)

✅ Step 4: 최종 검토 및 발행
⏱️ 시간: 15분

---
📊 총 소요 시간: 30분
😊 보리의 감정: "이전 JD를 재사용할 수 있어서 편하다!
                팀 간 합의도 온톨로지 기준으로 빠르게 끝났다."
```

### 기술 구현 예시

**온톨로지 데이터 구조:**

```json
{
  "position": {
    "id": "POS-SENIOR-BE-PAYMENTS",
    "name": "Senior Backend Engineer - Payments Team",
    "jobLevel": {
      "id": "JL-SENIOR",
      "name": "Senior",
      "definition": "5+ years experience OR demonstrated leadership capability",
      "yearsExperience": "5+"
    },
    "jobFunction": {
      "id": "JF-BACKEND-ENG",
      "name": "Backend Engineer",
      "jobFamily": "Engineering"
    },
    "requiredCompetencies": [
      {
        "competencyId": "COMP-001",
        "competencyName": "RESTful API Development",
        "proficiencyLevel": "Advanced",
        "description": "HTTP 기반 API 설계 및 구현 능력",
        "yearsRequired": 3,
        "essential": true
      },
      {
        "competencyId": "COMP-002",
        "competencyName": "PostgreSQL Database Design",
        "proficiencyLevel": "Expert",
        "description": "관계형 DB 스키마 설계 및 최적화",
        "essential": true,
        "teamSpecific": "Payments팀은 금융 데이터 처리로 Expert 필수"
      },
      {
        "competencyId": "COMP-015",
        "competencyName": "Microservices Architecture",
        "proficiencyLevel": "Intermediate",
        "essential": false
      },
      {
        "competencyId": "COMP-020",
        "competencyName": "Communication",
        "proficiencyLevel": "Intermediate",
        "category": "Behavioral",
        "essential": true
      }
    ],
    "preferredCompetencies": [
      {
        "competencyId": "COMP-050",
        "competencyName": "PCI Compliance",
        "proficiencyLevel": "Intermediate",
        "teamSpecific": "Payments팀 특수 요구사항"
      }
    ],
    "synonyms": ["시니어 백엔드 엔지니어", "Senior BE Developer", "Sr. Backend Eng"]
  }
}
```

**쿼리 예시 (Competency Question 답변):**

```javascript
// CQ: "우리 회사의 '시니어 백엔드 엔지니어'는 어떤 competencies를 가져야 하는가?"

function getPositionRequirements(positionId) {
  const position = ontology.getPosition(positionId);

  return {
    position: position.name,
    jobLevel: position.jobLevel.name,
    required: position.requiredCompetencies.map(c => ({
      name: c.competencyName,
      level: c.proficiencyLevel,
      essential: c.essential
    })),
    preferred: position.preferredCompetencies
  };
}

// 결과:
{
  "position": "Senior Backend Engineer - Payments Team",
  "jobLevel": "Senior (5+ years)",
  "required": [
    { "name": "RESTful API Development", "level": "Advanced", "essential": true },
    { "name": "PostgreSQL Database Design", "level": "Expert", "essential": true },
    { "name": "Communication", "level": "Intermediate", "essential": true }
  ],
  "preferred": [
    { "name": "PCI Compliance", "level": "Intermediate" }
  ]
}
```

---

## ✅ 성공 지표 매핑

### 정량적 지표

| 목표 지표 | 온톨로지 기여 | 측정 방법 | 목표값 |
|----------|-------------|----------|--------|
| **JD 작성 시간 75% 감소** | - 표준 Competency 정의 제공<br>- Position별 Required Competencies 템플릿<br>- Synonym 자동 매핑으로 검색 시간 단축 | 파일럿 테스트에서 보리가 JD 작성하는 시간 측정 | 2시간 → 30분 |
| **팀 간 합의 85% 단축** | - 공통 언어 제공 ("시니어"의 회사 표준 정의)<br>- Competency 정의가 명확하여 논쟁 감소 | 합의 회의 시간 측정 (A팀 vs B팀) | 1주일 → 1일 |
| **채용 사이클 7일 단축** | - JD 작성 단계 가속화<br>- 면접 계획 시 Competency 기반 질문 자동 추천 | 전체 채용 기간 측정 (JD 작성 → Offer) | -7일 |
| **지식 재사용률 70% 달성** | - 이전 Position 정의 재사용 가능<br>- Competency 라이브러리에서 검색/선택 | 새 JD 작성 시 재사용한 Competency 비율 | 0% → 70% |

### 정성적 지표

| 지표 | 측정 방법 | 목표 |
|------|----------|------|
| **보리 만족도** | 파일럿 테스트 후 5점 척도 설문 | ≥ 4/5 |
| **팀 간 합의 품질** | "합의 결과에 만족하는가?" 설문 | ≥ 80% 만족 |
| **채용 품질** | 신규 입사자의 실제 역량이 JD와 일치하는가? | 6개월 후 평가 |

---

## 🧪 검증 계획

### Competency Questions 검증

**V1에서 답변해야 할 CQs (Problem 01 관련):**

1. **SCQ-01-001**: "우리 회사의 '시니어 백엔드 엔지니어'는 어떤 competencies를 가져야 하는가?"
   - **답변 방법:** `Position.requiredCompetencies` 쿼리
   - **예상 답변:** [RESTful API Development (Advanced), PostgreSQL (Expert), ...]
   - **검증:** ✅ 위 JSON 구조로 답변 가능

2. **SCQ-01-002**: "백엔드 팀 A와 B가 정의한 '시니어'의 차이는 무엇인가?"
   - **답변 방법:** 두 팀의 `Position` 정의 비교 쿼리
   - **예상 답변:** "A팀: PostgreSQL Expert 필수, B팀: Intermediate 허용. 온톨로지는 Advanced를 기본 제안"
   - **검증:** 🔄 팀별 커스터마이징 지원 필요 (Shell 유연성)

3. **FCQ-01-001**: "Competency와 Skill의 차이는 무엇인가?"
   - **답변 방법:** 개념 정의 조회
   - **예상 답변:** "Competency는 넓은 범주 (Backend Development), Skill은 구체적 기술 (PostgreSQL)"
   - **검증:** ✅ 개념 문서로 명확히 정의

4. **FCQ-01-002**: "Proficiency Level과 Job Level의 차이는 무엇인가?"
   - **답변 방법:** 개념 정의 조회
   - **예상 답변:** "Proficiency Level은 스킬 숙련도, Job Level은 조직 계층. Senior Engineer도 특정 스킬은 Intermediate일 수 있음"
   - **검증:** ✅ 핵심 구분 명확

5. **RCQ-01-002**: "Position은 어떤 Competencies를 요구하는가?"
   - **답변 방법:** `Position.requiredCompetencies` 관계 탐색
   - **예상 답변:** Position → requires → Competency (with Proficiency Level)
   - **검증:** ✅ 관계 정의로 명확

6. **VCQ-01-001**: "이 온톨로지로 JD 작성 시간을 2시간에서 30분으로 단축할 수 있는가?"
   - **검증 방법:** 파일럿 테스트 (아래 참조)

### 파일럿 테스트 시나리오

**시나리오 1: JD 작성 (Problem 01 핵심 검증)**

**참여자:** 보리 (HR 전문가)
**태스크:** "Senior Frontend Engineer JD 작성"
**시간:** 2시간 (목표: 30분 이내)

**프로세스:**
1. 보리가 `ontology/README.md` 읽기 (10분)
2. Frontend Engineer Job Function 찾기 (`02-conceptualization/concepts/job-function.md`)
3. Senior level 요구사항 확인 (`job-level.md`)
4. Required Competencies 선택 (온톨로지 라이브러리에서)
5. 회사 특성에 맞게 조정 (예: "React 18" 추가, "Vue" 제거)
6. JD 초안 완성

**관찰 포인트:**
- ✅ 막히는 지점이 있었는가?
- ✅ 어떤 섹션이 가장 유용했는가?
- ✅ 어떤 Competency를 추가/제거했는가?
- ✅ 온톨로지 용어가 이해하기 어려웠는가?

**성공 기준:**
- [ ] 작성 시간 ≤ 30분
- [ ] 보리 만족도 ≥ 4/5
- [ ] JD 품질이 기존 대비 동등 이상
- [ ] 보리가 "다음에도 사용하고 싶다" (사용 의향 = Yes)

**피드백 수집:**
- Think-aloud 방식 (화면 공유하며 생각 말하기)
- 사후 인터뷰 (30분): "어떤 점이 좋았고 어떤 점이 불편했나?"

---

## 🚧 리스크 및 가정

### 리스크

| 리스크 | 확률 | 영향 | 완화 전략 |
|--------|------|------|----------|
| **스킬 정의가 너무 일반적** | Medium | High | 회사별 커스터마이징 기능 제공 (Shell 유연성) |
| **팀이 표준을 거부** | Low | High | 파일럿으로 가치 증명, 강제하지 않고 추천 방식 |
| **온톨로지 복잡도 과다** | Medium | Medium | UI로 복잡도 숨김, 예시 중심 문서화 |
| **Backend/Frontend만으로 부족** | Low | Low | V2에서 Designer, Data Analyst 추가 |

### 가정 (검증 필요)

1. **가정: HR 담당자가 온톨로지 기반 시스템을 1주일 내 학습 가능**
   - **리스크:** 학습 곡선이 너무 가파르면 채택 실패
   - **검증 방법:** 파일럿 테스트에서 보리의 학습 시간 측정
   - **검증 기한:** Week 6 (파일럿 테스트)
   - **관련 문서:** `../assumptions/assumption-ontology-usability.md` (생성 예정)

2. **가정: Core 표준 + Shell 유연 모델이 채택 저항을 줄임**
   - **리스크:** 너무 유연하면 표준화 효과 없음, 너무 경직되면 거부됨
   - **검증 방법:** A팀과 B팀이 각각 커스터마이징한 결과 비교
   - **검증 기한:** Week 7-8

3. **가정: Competency 이름을 LinkedIn Skills 기준으로 하면 후보자가 이해 쉬움**
   - **리스크:** 한국 시장에서는 다른 용어가 더 일반적일 수 있음
   - **검증 방법:** 실제 후보자 10명에게 JD 보여주고 이해도 확인
   - **검증 기한:** Week 8 이후

---

## 🎯 우선순위 로드맵

### Phase 1: MVP (Week 1-2)

**목표:** Problem 01 해결을 위한 최소 개념 세트

- [ ] **C-002 Job Function** 개념 완성 (Backend Engineer, Frontend Engineer, Product Manager)
- [ ] **C-004 Competency** 개념 완성 (Technical, Behavioral, Business 분류)
- [ ] **C-005 Proficiency Level** 개념 완성 (4단계: Beginner → Expert)
- [ ] **C-006 Job Level** 개념 완성 (Junior, Mid, Senior, Staff)
- [ ] **R-001 관계** 정의: Position requires Competency at Proficiency Level

**검증:**
- [ ] FCQ-01-001, FCQ-01-002 답변 가능 (Competency vs Skill, Proficiency vs Job Level 구분)
- [ ] 보리가 각 개념 이해 가능 (1-on-1 검토)

**산출물:**
- 4개 개념 문서 (Validated 상태)
- 1개 관계 문서

### Phase 2: 실제 예시 (Week 3-4)

**목표:** 3개 직무군 Position 예시 완성

- [ ] **Senior Backend Engineer** 예시 작성 (Required Competencies 10개)
- [ ] **Mid Frontend Engineer** 예시 작성 (Required Competencies 8개)
- [ ] **Senior Product Manager** 예시 작성 (Required Competencies 7개)

**검증:**
- [ ] SCQ-01-001 답변 가능 ("시니어 백엔드 엔지니어는 어떤 competencies 필요?")
- [ ] 보리가 이 예시로 실제 JD 작성 가능

**산출물:**
- `03-implementation/examples/` 폴더 3개 문서

### Phase 3: 파일럿 테스트 (Week 5-6)

**목표:** 사용성 검증 및 피드백 수집

- [ ] 보리와 파일럿 세션 (2시간)
  - Scenario: Senior Frontend Engineer JD 작성
- [ ] 시간 측정: ≤ 30분 목표
- [ ] 만족도 측정: ≥ 4/5 목표
- [ ] 개선 아이템 수집: 최소 5개

**산출물:**
- `04-validation/pilot-results/pilot-01-jd-creation.md`
- 개선 액션 아이템 리스트

### Phase 4: 피드백 반영 (Week 7)

**목표:** v0.2.0 릴리즈

- [ ] High priority 개선 아이템 반영
- [ ] 보리 2차 검토 통과
- [ ] Change Log 업데이트
- [ ] v0.2.0 버전 태그

---

## 🔄 다른 문제와의 연계

### Problem 02 (평가 기준 일관성)와 시너지

**공유 개념:**
- **Competency**: Problem 01에서 정의한 Competency를 Problem 02의 Evaluation Rubric으로 평가
- **Proficiency Level**: JD 요구사항(Problem 01)과 면접 평가 기준(Problem 02)이 일치

**시너지 효과:**
```
Problem 01: "Senior Backend Engineer는 PostgreSQL Advanced 필요"
              ↓ (같은 Competency 정의 공유)
Problem 02: "PostgreSQL Advanced는 '쿼리 성능 최적화 가능'을 의미"
              ↓ (Evaluation Rubric)
면접관: "이 후보자는 PostgreSQL Advanced인가?" → Rubric 보고 명확히 판단
```

### Problem 03 (지식 재사용)와 연계

**확장 계획 (V2):**
- **Interview Question** 개념 추가
- `Interview Question assessCompetency Competency` 관계 정의
- 예: "시스템 설계 질문" → "Microservices Architecture" Competency 평가

**예상 워크플로우:**
```
1. JD에서 "Microservices Architecture Advanced" 요구사항 확인 (Problem 01)
2. 온톨로지에서 이 Competency를 평가하는 면접 질문 자동 추천 (Problem 03)
3. 면접관이 Rubric을 보고 Advanced 수준 판단 (Problem 02)
```

### Problem 04 (팀 간 공유)와 연계

**확장 계획 (V2):**
- **Best Practice** 개념 추가: "제임스의 시니어 정의 노하우"
- `Best Practice appliesTo Position` 관계
- 팀 간 표준 정의 공유로 중복 작업 30% 감소

---

## 📚 참고 자료

### 내부 문서
- **Opportunity:** [01-skill-standardization.md](../../opportunities/01-skill-standardization.md)
- **Interview Snapshot:** [snapshot-borry-2025-11-16.md](../../user-interviews/snapshots/snapshot-borry-2025-11-16.md)
- **Competency Questions:** [competency-questions.md](../01-specification/competency-questions.md)

### 외부 표준
- **O*NET:** Backend Engineer → [15-1252.00](https://www.onetonline.org/link/summary/15-1252.00)
- **SFIA:** Proficiency Level 참조 → [SFIA Framework](https://sfia-online.org/en)
- **LinkedIn:** Competency 네이밍 → [LinkedIn Skills](https://www.linkedin.com/skills/)

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 변경자 | 이유 |
|------|----------|--------|------|
| 2025-11-25 | 초안 생성 | Terry | Problem 01과 온톨로지 개념 매핑 |

---

*이 매핑 문서는 온톨로지 개발의 북극성입니다. 개념 설계 시 항상 "이것이 Problem 01을 어떻게 해결하는가?"를 자문하세요.*
