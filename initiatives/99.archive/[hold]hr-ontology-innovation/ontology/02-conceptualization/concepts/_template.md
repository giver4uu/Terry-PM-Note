# [개념 이름] (Concept Name)

**개념 ID:** [고유 식별자, 예: C-001]
**생성일:** [YYYY-MM-DD]
**최종 수정일:** [YYYY-MM-DD]
**작성자:** [이름]
**검토자:** [Borry, Berry 등]
**상태:** [Draft / Under Review / Validated / Deprecated]

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **해결하는 문제** | [Problem 01, 02, 03, 04 중 연결] |
| **우선순위** | [High / Medium / Low] |
| **의존 개념** | [이 개념이 의존하는 다른 개념들] |
| **증거 출처** | [인터뷰 스냅샷, Opportunity 문서 링크] |
| **표준 참조** | [O*NET, SFIA, LinkedIn 등] |

---

## 🎯 개념 정의 (Definition)

### 한 문장 정의
[명확하고 간결한 한 문장 정의 - 비기술자(Borry)도 이해 가능하게 작성]

### 상세 설명
[이 개념이 무엇인지, 왜 필요한지, HR 도메인에서 어떤 역할을 하는지 설명]

**왜 이 개념이 필요한가?**
- [비즈니스 가치 1]
- [비즈니스 가치 2]

**HR 도메인에서의 역할:**
- [역할 설명]

### 동의어 (Synonyms)
- [동의어 1]
- [동의어 2]

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs [다른 개념 이름]**: [차이점 명확히 설명]
  - 예시: "Proficiency Level vs. Job Level - 전자는 특정 스킬의 숙련도, 후자는 조직 계층"

---

## 🔗 관계 (Relationships)

### 상위 개념 (Broader Concepts)
- **[상위 개념 이름]** (isA 관계)
  - 설명: [이 개념이 상위 개념의 한 종류임을 설명]

### 하위 개념 (Narrower Concepts)
- **[하위 개념 1]** (hasSubtype 관계)
- **[하위 개념 2]** (hasSubtype 관계)

### 관련 개념 (Related Concepts)
- **[관련 개념 1]** (관계 타입: requires / partOf / evaluatedBy / relatedTo)
  - 관계 설명: [왜 이 관계가 중요한가]
  - 예시: [구체적 예시]

---

## 📊 속성 (Attributes)

| 속성 이름 | 데이터 타입 | 필수/선택 | 설명 | 예시 값 |
|----------|------------|----------|------|---------|
| name | String | 필수 | 개념의 이름 | "RESTful API 개발" |
| description | String | 필수 | 상세 설명 | "RESTful 아키텍처 원칙에 따라..." |
| id | String | 필수 | 고유 식별자 | "COMP-001" |
| category | Enum | 선택 | 분류 | Technical / Behavioral / Business |
| level | Enum | 선택 | 난이도/레벨 | Beginner / Intermediate / Advanced / Expert |

---

## 💡 실제 사례 (Real-world Examples)

### 예시 1: [구체적 시나리오 제목]
**맥락:** [어떤 상황에서 사용되는가]

**구체적 예시:**
```
[실제 데이터 또는 시나리오를 구체적으로 작성]
예: Position "Senior Backend Engineer"는
    Competency "PostgreSQL Database Design" at Proficiency Level "Advanced"를 요구
```

**관찰:** [이 예시가 보여주는 핵심 포인트, 왜 중요한가]

### 예시 2: [또 다른 시나리오 제목]
**맥락:** [다른 사용 상황]

**구체적 예시:**
```
[또 다른 실제 데이터]
```

**관찰:** [핵심 포인트]

**(최소 2개 예시 필수 - 검증 기준)**

---

## 🎓 Competency Questions (CQs)

이 개념이 답해야 하는 질문들:

1. **[CQ-ID]** [질문 내용]
   - **예상 답변:** [이 개념으로 어떻게 답할 수 있는가]
   - **출처:** [관련 CQ 문서 링크]

2. **[CQ-ID]** [질문 내용]
   - **예상 답변:** [답변]
   - **출처:** [링크]

3. **[CQ-ID]** [질문 내용]
   - **예상 답변:** [답변]
   - **출처:** [링크]

**(최소 3개 CQ 필수 - 검증 기준)**

**관련 CQ 문서:** `../../01-specification/competency-questions.md`

---

## ✅ 검증 기준 (Validation Criteria)

### 완전성 (Completeness)
- [ ] 모든 필수 속성 정의됨 (name, description, id 등)
- [ ] 최소 2개 실제 사례 제공
- [ ] 최소 3개 CQ 작성 및 답변 가능

### 일관성 (Consistency)
- [ ] 상위/하위 개념 관계가 논리적
- [ ] 동의어가 실제로 같은 의미
- [ ] 예시가 정의와 일치
- [ ] 다른 개념 문서와 충돌 없음

### 명확성 (Clarity)
- [ ] Borry (HR 전문가)가 이해 가능
- [ ] 개발자가 구현 가능 (속성 명확)
- [ ] 모호한 표현 없음
- [ ] 전문 용어 사용 시 설명 포함

### 증거 기반 (Evidence-grounded)
- [ ] 인터뷰 스냅샷 또는 Opportunity 문서 링크됨
- [ ] 실제 문제 해결에 기여함을 설명
- [ ] 예시가 실제 데이터 기반

---

## 📝 디자인 패턴 적용 (Applied Design Patterns)

**적용된 패턴:** [예: Hierarchy Pattern / Part-Whole Pattern / Descriptive Pattern]

**적용 이유:** [왜 이 패턴을 선택했는가]
- [이유 1]
- [이유 2]

**구현 방법:** [어떻게 이 패턴을 구현하는가]
```
[패턴 구현 예시 또는 다이어그램]
```

**참고 문서:** `../design-patterns/[pattern-name].md`

---

## 🏭 산업 표준 매핑 (Industry Standard Mapping)

### O*NET 매핑
- **O*NET 코드:** [예: 15-1252.00 - Software Developers]
- **O*NET 개념:** [O*NET에서의 대응 개념]
- **매핑 근거:** [왜 이 코드/개념과 연결했는가]
- **참고:** [O*NET URL]

### SFIA 레벨 참조
- **SFIA 스킬 코드:** [예: PROG - Programming/Software Development]
- **SFIA 레벨:** [Level 1-7 중 어느 레벨 참조]
- **차용한 부분:** [SFIA에서 무엇을 참조했는가 - 레벨 정의, 설명 등]
- **커스터마이징:** [SFIA와 다르게 조정한 부분]

### LinkedIn 스킬 네이밍
- **LinkedIn 검증 결과:** [LinkedIn Skills에서 검색한 결과]
- **시장 용어:** [실제로 많이 사용되는 스킬 이름]
- **동의어 매핑:** [LinkedIn에서 사용하는 다른 표현들]

**참고 문서:**
- `../../03-implementation/standards/onet-mapping.md`
- `../../03-implementation/standards/sfia-levels.md`
- `../../03-implementation/standards/linkedin-skills.md`

---

## 🔄 변경 이력 (Change Log)

| 날짜 | 변경 내용 | 변경자 | 이유 | 버전 |
|------|----------|--------|------|------|
| [YYYY-MM-DD] | 초안 생성 | [이름] | 초기 개념화 | v0.1.0 |
| [YYYY-MM-DD] | "동의어" 섹션 추가 | [이름] | Borry 피드백 반영 | v0.1.1 |

**중요:** 모든 변경 사항은 반드시 이 섹션에 기록하고, `../../05-evolution/change-log.md`에도 요약 기록

---

## 🚧 미해결 질문 / 가정 (Open Questions / Assumptions)

### 미해결 질문
1. **[질문 제목]**
   - **질문:** [구체적 질문 내용]
   - **우선순위:** [High / Medium / Low]
   - **해결 방법:** [누구에게 물어볼 것인가, 어떻게 검증할 것인가]
   - **예상 답변:** [가능한 답변 옵션들]

### 가정 (검증 필요)
1. **[가정 제목]**
   - **가정 내용:** [우리가 무엇을 가정하고 있는가]
   - **리스크:** [이 가정이 틀리면 어떤 문제가 발생하는가]
   - **검증 계획:** [어떻게 검증할 것인가 - 파일럿 테스트, 인터뷰 등]
   - **검증 기한:** [언제까지 검증할 것인가]

**관련 문서:** `../../assumptions/[assumption-name].md` (필요 시 생성)

---

## 📚 참고 자료 (References)

### 내부 문서
- **인터뷰:** [snapshot-borry-2025-11-16.md](../../../user-interviews/snapshots/snapshot-borry-2025-11-16.md)
- **Opportunity:** [01-skill-standardization.md](../../../opportunities/01-skill-standardization.md)
- **관련 개념:** [concept-name.md](./concept-name.md)

### 외부 표준
- **O*NET:** [URL]
- **SFIA:** [URL]
- **LinkedIn:** [URL]

### 학술 자료
- [논문 제목] - [저자], [연도]
- [관련 연구] - [링크]

---

## 👥 검토 의견 (Review Comments)

### Borry (HR Expert) - [날짜]
> [피드백 내용을 직접 인용]
> 예: "이 개념의 정의는 명확하지만, 실제 사례가 너무 추상적입니다.
> 보리가 실제로 겪은 '백엔드 팀 A vs B 시니어 정의 불일치' 사례를 추가해주세요."

**Action Items:**
- [ ] [구체적 액션 아이템 1]
- [ ] [구체적 액션 아이템 2]

**반영 여부:** [반영 완료 / 진행 중 / 보류]

---

### Berry (CTO) - [날짜]
> [기술적 피드백]
> 예: "이 개념을 JSON 스키마로 구현할 때 'category' 속성의 Enum 값을
> 어떻게 확장 가능하게 설계할 것인지 고민이 필요합니다."

**Action Items:**
- [ ] [기술적 액션 아이템 1]
- [ ] [기술적 액션 아이템 2]

**반영 여부:** [반영 완료 / 진행 중 / 보류]

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- [이 개념의 현재 상태 설명]
- 예: "Draft 상태, Borry 1차 검토 대기 중"

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영
- [ ] Berry 기술 검토 (필요 시)
- [ ] 최소 2개 실제 사례 추가
- [ ] 3개 CQ 검증 완료
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] 관련 개념 [개념명] 정의 (의존성)
- [ ] Relationship 문서 작성 (이 개념이 포함된 관계)
- [ ] 예시 문서에 이 개념 활용 (03-implementation/examples/)

---

## 📌 작성 가이드 (Writing Guidelines)

**이 템플릿 사용 시 주의사항:**

1. **[ ] 괄호 내용 모두 교체**: 모든 [괄호] 내용을 실제 값으로 교체하세요
2. **비기술자 친화적**: Borry가 이해할 수 있게 전문 용어 최소화
3. **구체적 예시**: "일반적으로" 같은 추상적 표현 대신 실제 사례 사용
4. **증거 기반**: 모든 주장은 인터뷰 또는 Opportunity 문서에 근거
5. **검증 체크리스트**: "검증 기준" 섹션의 모든 항목 체크 후 Validated 상태로 변경

**좋은 예시:**
```markdown
## 🎯 개념 정의

### 한 문장 정의
Competency는 특정 직무를 수행하는 데 필요한 평가 가능한 능력입니다.

### 상세 설명
Competency는 HR 도메인에서 채용과 평가의 기준이 되는 핵심 개념입니다.
"이 사람이 이 일을 잘할 수 있는가?"를 판단하기 위해, 우리는 여러 Competencies를
평가합니다. 예를 들어, Backend Engineer를 채용할 때 "RESTful API Development",
"PostgreSQL Database Design" 같은 Technical Competencies와 "Communication",
"Problem Solving" 같은 Behavioral Competencies를 평가합니다.
```

**나쁜 예시:**
```markdown
## 🎯 개념 정의

### 한 문장 정의
Competency는 능력입니다. (❌ 너무 모호)

### 상세 설명
일반적으로 Competency는 중요합니다. (❌ 추상적, 증거 없음)
```

---

*이 템플릿은 모든 개념 문서가 따라야 할 표준입니다.
일관성 있는 구조로 유지보수성과 협업 효율성을 극대화합니다.*
