# Competency Questions (역량 질문)

**버전:** v0.2.0
**작성일:** 2025-11-25
**최종 업데이트:** 2025-11-27
**작성자:** Terry

---

## 📋 개요

**Competency Questions (CQs)**는 온톨로지가 반드시 답할 수 있어야 하는 질문들을 정의하여 **온톨로지 설계를 검증**하는 핵심 도구입니다.

**목적:**
- 온톨로지의 범위와 목적 명확화
- 설계 완료 후 검증 기준 제공
- 개념 우선순위 결정의 근거
- 비즈니스 가치와 기술 솔루션 연결

**작성 원칙:**
1. **사용자 관점**: HR 담당자가 실제로 묻는 질문 (기술 용어 최소화)
2. **측정 가능**: 온톨로지로 답변 가능 여부를 명확히 검증 가능
3. **우선순위화**: High/Medium/Low로 중요도 표시
4. **증거 기반**: 인터뷰에서 실제로 나온 질문 우선

---

## 🎯 CQ 분류 체계

### 5가지 CQ 타입

1. **Scoping CQs (범위 정의)**: 온톨로지가 다루는 범위 명확화
2. **Foundational CQs (기초 개념)**: 핵심 개념과 정의
3. **Relationship CQs (관계 질문)**: 개념 간 관계
4. **Validating CQs (검증 질문)**: 비즈니스 가치 검증
5. **Metaproperty CQs (메타 속성)**: 개념의 속성과 제약사항

### 우선순위 기준

| 우선순위 | 기준 | V1 포함 여부 |
|---------|------|-------------|
| **High** | - 4개 핵심 문제 직접 해결<br>- 파일럿 테스트 필수<br>- 인터뷰 증거 명확 | ✅ V1에 포함 (15개) |
| **Medium** | - 2차 효과<br>- 개선 사항<br>- 부분적 증거 | 🔄 V2 이후 (8개) |
| **Low** | - Nice-to-have<br>- 향후 확장 | ⏳ V3 이후 (3개) |

---

## 🎯 Problem 01: 스킬/역량 표준화

**고객 문제:**
- 팀마다 "시니어 개발자", "스킬" 정의가 달라 JD 작성과 팀 간 합의에 시간 낭비
- JD 작성 시간: 2시간 → 30분 목표 (75% 단축)

**출처:** `opportunities/01-skill-standardization.md`, `snapshot-borry-2025-11-16.md`

---

### Scoping CQs (범위 정의)

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| SCQ-01-001 | "우리 회사의 '시니어 백엔드 엔지니어'는 어떤 competencies를 가져야 하는가?" | High | snapshot-borry-2025-11-16 | ⏳ Pending | ✅ |
| SCQ-01-002 | "백엔드 팀 A와 B가 정의한 '시니어'의 차이는 무엇인가?" | High | snapshot-borry-2025-11-16 | ⏳ Pending | ✅ |
| SCQ-01-003 | "Frontend Engineer와 Backend Engineer의 공통 competencies는 무엇인가?" | Medium | - | ⏳ Pending | ❌ V2 |

**예상 답변 (SCQ-01-001):**
```
Position: Senior Backend Engineer
Required Competencies:
  1. RESTful API Development (Proficiency: Advanced)
  2. PostgreSQL Database Design (Proficiency: Advanced)
  3. Microservices Architecture (Proficiency: Intermediate)
  4. Communication (Proficiency: Intermediate)
  5. Problem Solving (Proficiency: Advanced)
```

---

### Foundational CQs (기초 개념)

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| FCQ-01-001 | "Competency와 Skill의 차이는 무엇인가?" | High | Borry 조언 | ⏳ Pending | ✅ |
| FCQ-01-002 | "Proficiency Level과 Job Level의 차이는 무엇인가?" | High | Borry 조언 | ⏳ Pending | ✅ |
| FCQ-01-003 | "Technical Competency와 Behavioral Competency는 어떻게 구분하는가?" | High | opportunity-01 | ⏳ Pending | ✅ |
| FCQ-01-004 | "Job Function과 Position의 차이는 무엇인가?" | Medium | Borry 조언 | ⏳ Pending | ❌ V2 |

**예상 답변 (FCQ-01-001):**
```
Competency: 평가 가능한 능력의 넓은 범주
  - 예: "Backend Development", "Communication"
  - 여러 skills를 포함하는 상위 개념

Skill: 구체적이고 측정 가능한 기술
  - 예: "PostgreSQL", "React", "Git"
  - Competency의 하위 개념, 더 세분화됨

관계: Competency hasSkill Skill
```

**예상 답변 (FCQ-01-002):**
```
Proficiency Level: 특정 스킬의 숙련도 (Beginner, Intermediate, Advanced, Expert)
  - 예: "PostgreSQL at Advanced level"
  - 스킬별로 다를 수 있음

Job Level: 조직 계층 및 경력 단계 (Junior, Mid, Senior, Staff)
  - 예: "Senior Engineer" (5+ years)
  - Position의 전반적인 시니어리티

핵심 차이: Senior Engineer도 특정 스킬은 Intermediate일 수 있음!
```

---

### Relationship CQs (관계 질문)

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| RCQ-01-001 | "'RESTful API 개발'과 '마이크로서비스 아키텍처'는 어떤 관계인가?" | High | opportunity-01 | ⏳ Pending | ✅ |
| RCQ-01-002 | "Position은 어떤 Competencies를 요구하는가?" | High | - | ⏳ Pending | ✅ |
| RCQ-01-003 | "'커뮤니케이션'의 하위 스킬들은 무엇인가?" | High | opportunity-02 | ⏳ Pending | ✅ |
| RCQ-01-004 | "Job Function은 어떤 기본 Competencies를 상속하는가?" | Medium | Borry 조언 | ⏳ Pending | ❌ V2 |

**예상 답변 (RCQ-01-001):**
```
관계 타입: relatedTo (연관 관계)

RESTful API Development:
  - 정의: HTTP 프로토콜 기반 API 설계 및 구현
  - 관련 스킬: HTTP Methods, JSON, Status Codes

Microservices Architecture:
  - 정의: 분산 시스템 아키텍처 설계 및 구현
  - 관련 스킬: Service Communication, Load Balancing

연관 이유:
  - 마이크로서비스는 주로 RESTful API로 통신
  - RESTful API 개발 능력이 마이크로서비스의 선행 요구사항
  - 하지만 독립적 개념 (RESTful API는 모놀리식에서도 사용)
```

**예상 답변 (RCQ-01-002):**
```
관계: Position requires Competency at Proficiency Level

예시:
Position: Senior Backend Engineer - Payments Team
  requires:
    - RESTful API Development at Advanced
    - PostgreSQL Database Design at Advanced
    - PCI Compliance at Intermediate
    - Communication at Intermediate
```

---

### Validating CQs (검증 질문)

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| VCQ-01-001 | "이 온톨로지로 JD 작성 시간을 2시간에서 30분으로 단축할 수 있는가?" | High | opportunity-01 | ⏳ Pending | ✅ |
| VCQ-01-002 | "팀 간 합의 시간을 1주일에서 1일로 단축할 수 있는가?" | High | opportunity-01 | ⏳ Pending | ✅ |

**검증 방법 (VCQ-01-001):**
```
파일럿 테스트:
1. Borry에게 "Senior Frontend Engineer JD 작성" 요청
2. 온톨로지 사용하여 작성 시간 측정
3. 목표: 30분 이내 완료
4. 품질 검증: 기존 JD 대비 동등 이상
```

---

## 🎯 Problem 02: 평가 기준 일관성

**고객 문제:**
- 면접관마다 같은 평가 항목(예: "Communication")을 다르게 해석하여 점수 불일치
- 평가 조율 회의 시간: 1시간 → 15분 목표 (75% 단축)

**출처:** `opportunities/02-evaluation-consistency.md`, `snapshot-borry-2025-11-16.md`

---

### Scoping CQs

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| SCQ-02-001 | "'커뮤니케이션' 5점은 구체적으로 무엇을 의미하는가?" | High | snapshot-borry-2025-11-16 | ⏳ Pending | ✅ |
| SCQ-02-002 | "시니어 백엔드 개발자의 '커뮤니케이션' 필수 수준은?" | High | opportunity-02 | ⏳ Pending | ✅ |

**예상 답변 (SCQ-02-001):**
```
Competency: Communication
Evaluation Rubric (5점 척도):

5점 (Exceptional):
  - 행동 지표: 복잡한 기술 개념을 비기술자에게 명확히 설명 가능
  - 구체적 예시: "API 설계를 PM에게 비유를 들어 설명하고 즉시 이해시킴"
  - 관찰 가능: 면접 중 질문 의도 파악하여 적절한 수준으로 답변

4점 (Strong):
  - 행동 지표: 기술 개념을 개발자에게 명확히 설명 가능
  - 구체적 예시: "코드 리뷰 시 의견 차이를 논리적으로 설명하고 합의 도출"

3점 (Adequate):
  - 행동 지표: 자신의 업무를 팀원에게 설명 가능
  - 구체적 예시: "데일리 스탠드업에서 진행사항 명확히 공유"

2점 (Developing):
  - 행동 지표: 질문에 답변 가능하지만 명확성 부족

1점 (Insufficient):
  - 행동 지표: 의사소통에 어려움 있음
```

---

### Foundational CQs

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| FCQ-02-001 | "Evaluation Rubric은 무엇이고 왜 필요한가?" | High | opportunity-02 | ⏳ Pending | ✅ |
| FCQ-02-002 | "행동적 앵커(Behavioral Anchor)란 무엇인가?" | Medium | Borry 조언 | ⏳ Pending | ❌ V2 |

**예상 답변 (FCQ-02-001):**
```
Evaluation Rubric:
  - 정의: Competency를 평가하기 위한 구조화된 기준
  - 구성요소:
    1. 평가 척도 (예: 1-5점)
    2. 각 점수별 명확한 정의
    3. 행동적 앵커 (관찰 가능한 행동 예시)

필요성 (Problem 02 해결):
  - 면접관마다 다른 해석 방지
  - 평가 일관성 확보 (Inter-rater reliability 향상)
  - 의사결정 명확화 (3점과 4점의 차이 명확)
```

---

### Relationship CQs

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| RCQ-02-001 | "Competency는 어떤 Evaluation Rubric으로 평가되는가?" | High | - | ⏳ Pending | ✅ |
| RCQ-02-002 | "'기술적 설명 능력'과 '비기술자 대상 소통'은 어떻게 연결되는가?" | Medium | opportunity-02 | ⏳ Pending | ❌ V2 |

**예상 답변 (RCQ-02-001):**
```
관계: Competency assessedBy Evaluation Rubric

예시:
Competency: Communication
  assessedBy:
    Rubric: Communication Rubric (5-point scale)
      - 5점: 비기술자에게 명확히 설명
      - 4점: 개발자에게 명확히 설명
      - 3점: 팀원에게 업무 공유
      - 2점: 질문 답변 가능하지만 불명확
      - 1점: 의사소통 어려움

Competency: PostgreSQL Database Design
  assessedBy:
    Rubric: PostgreSQL Rubric (4-level proficiency)
      - Expert: 페타바이트 스케일 처리
      - Advanced: 쿼리 성능 최적화
      - Intermediate: 정규화된 스키마 설계
      - Beginner: SELECT 쿼리 작성
```

---

### Validating CQs

| ID | 질문 | 우선순위 | 출처 | 검증 상태 | V1 포함 |
|----|------|---------|------|----------|---------|
| VCQ-02-001 | "이 Rubric으로 평가 조율 시간을 1시간에서 15분으로 단축할 수 있는가?" | High | opportunity-02 | ⏳ Pending | ✅ |
| VCQ-02-002 | "면접관 간 평가 점수 편차가 감소하는가?" | High | opportunity-02 | ⏳ Pending | ✅ |

**검증 방법 (VCQ-02-001):**
```
파일럿 테스트:
1. 3명의 면접관에게 동일 후보자 영상 시청
2. Rubric 있음 vs 없음 조건 비교
3. 평가 조율 회의 시간 측정
4. 목표: 15분 이내 합의 도출
```

---

## 📊 CQ 우선순위 요약

### High Priority (V1 포함 - 15개)

| Problem | Scoping | Foundational | Relationship | Validating | 합계 |
|---------|---------|--------------|--------------|------------|------|
| Problem 01 | 2 | 3 | 3 | 2 | 10 |
| Problem 02 | 2 | 1 | 1 | 2 | 6 |
| **Total** | **4** | **4** | **4** | **4** | **16** |

### Medium Priority (V2 이후 - 8개)

| Problem | CQ 개수 |
|---------|---------|
| Problem 01 확장 | 3 |
| Problem 02 확장 | 2 |
| Problem 03 (지식 재사용) | 2 |
| Problem 04 (팀 간 공유) | 1 |
| **Total** | **8** |

### Low Priority (V3 이후 - 3개)

- 고급 검색 기능
- 자동 추천 엔진
- 다국어 지원

---

## ✅ 검증 프로세스

### Phase 1: 개념 설계 시

각 개념 정의 완료 후:
- [ ] 최소 3개 CQ에 답변 가능한가?
- [ ] High priority CQ 모두 커버하는가?
- [ ] 답변이 명확하고 모호하지 않은가?

### Phase 2: 구현 후

실제 데이터로 테스트:
- [ ] 예시 데이터로 CQ 쿼리 가능한가?
- [ ] 답변 생성 시간이 목표(30분) 달성하는가?
- [ ] 답변 품질이 사용 가능한 수준인가?

### Phase 3: 파일럿 테스트 (Week 6)

Borry와 실제 사용:
- [ ] Borry가 CQ를 이해하고 실제 업무에서 활용 가능한가?
- [ ] CQ 답변이 실제로 문제 해결에 도움이 되는가?
- [ ] 새로운 CQ가 발견되었는가? → 백로그에 추가

---

## 🔄 CQs 진화 전략

### 신규 CQ 추가 프로세스

1. **발견**: 인터뷰/파일럿에서 새 질문 발견
2. **평가**: 우선순위 평가 (High/Medium/Low)
3. **중복 확인**: 기존 CQ와 중복 여부 검증
4. **추가**: 이 문서에 추가 및 온톨로지 업데이트 필요 여부 판단
5. **검증**: 새 CQ 답변 가능한지 확인

### 버전 관리

- 각 CQ는 고유 ID 유지 (절대 재사용하지 않음)
- Deprecated CQ는 삭제하지 않고 상태만 변경
- Change Log에 모든 변경 기록

### CQ 상태 관리

- ⏳ **Pending**: 아직 답변 불가 (개념 미정의)
- 🔄 **In Progress**: 개념 정의 중
- ✅ **Validated**: 답변 가능하고 검증 완료
- 🚫 **Deprecated**: 더 이상 사용하지 않음 (삭제 안 함)

---

## 🔄 V1.5: 동적 Competency Questions (DCQ)

**추가일:** 2025-11-27
**목적:** ATS 채용 과정 동적 데이터 활용 질문

### 📊 동적 CQ의 차별화

**기존 정적 CQ:**
- "Senior Backend Engineer는 어떤 Competencies가 필요한가?" (정의 조회)

**동적 CQ (DCQ):**
- "Senior Backend Engineer 채용의 평균 리드타임은?" (데이터 분석)
- "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?" (패턴 발견)

**핵심 차이:**
- 정적 CQ = "무엇이 필요한가" (What)
- 동적 CQ = "과거 데이터가 말하는 것" (How, Why)

---

### DCQ-01~03: Process Insights (프로세스 인사이트)

#### DCQ-01: 채용 리드타임 분석

**질문:** "Senior Backend Engineer 채용의 평균 리드타임은?"

**우선순위:** High (V1.5)
**출처:** 동적 데이터 전략
**검증 상태:** ⏳ Pending (V1.5 구현 후)

**예상 답변:**
```
Position: Senior Backend Engineer - Payments Team
평균 리드타임: 28일 (지원 → 오퍼)

단계별 분석:
  - 서류 심사 → 1차 면접: 7일 (정상)
  - 1차 면접 → 2차 면접: 14일 ← 병목 발견
  - 2차 면접 → 최종 오퍼: 7일 (정상)

비교:
  - Frontend Engineer 평균: 21일 (7일 더 빠름)
  - Product Manager 평균: 35일 (7일 더 느림)
```

**비즈니스 가치:**
- 병목 단계 발견 → 프로세스 개선
- 팀별 비교로 베스트 프랙티스 학습

---

#### DCQ-02: Competency 평가 시간 분석

**질문:** "어떤 Competency 평가가 가장 오래 걸리는가?"

**우선순위:** Medium (V1.5)
**출처:** 동적 데이터 전략
**검증 상태:** ⏳ Pending

**예상 답변:**
```
Competency별 평균 평가 시간:

Technical Competencies:
  1. System Architecture: 2.5시간 (화이트보드 세션 포함)
  2. RESTful API Development: 1.5시간 (코딩 테스트)
  3. PostgreSQL Database Design: 1.2시간

Soft Skills:
  1. Communication: 30분 (대화 관찰)
  2. Problem Solving: 45분 (시나리오 질문)
  3. Time Management: 20분 (경험 질문)
```

**비즈니스 가치:**
- 면접 시간 최적화
- 면접 일정 현실적 계획

---

#### DCQ-03: JD 난이도 vs 합격률

**질문:** "PostgreSQL Advanced 요구하는 Position의 평균 합격률은?"

**우선순위:** High (V1.5)
**출처:** 동적 데이터 전략
**검증 상태:** ⏳ Pending

**예상 답변:**
```
Competency 요구사항별 합격률 분석:

PostgreSQL Advanced 요구:
  - 지원자: 100명
  - 합격자: 15명
  - 합격률: 15%

React Intermediate 요구:
  - 지원자: 80명
  - 합격자: 22명
  - 합격률: 28%

Communication Advanced 요구:
  - 지원자: 50명
  - 합격자: 8명
  - 합격률: 16%

인사이트:
  → PostgreSQL Advanced는 매우 높은 기준 (15% 합격률)
  → JD 요구사항을 Intermediate로 낮추면 풀 확대 가능
```

**비즈니스 가치:**
- JD 난이도 조정 (지원자 풀 확대 vs 품질 유지)
- 현실적인 요구사항 설정

---

### DCQ-04~06: Evaluation Insights (면접관 패턴)

#### DCQ-04: 면접관 평가 패턴 분석

**질문:** "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?"

**우선순위:** High (V1.5)
**출처:** 동적 데이터 전략, Opportunity 02
**검증 상태:** ⏳ Pending

**예상 답변:**
```
Interviewer: 제임스 (Backend Tech Lead)
Competency: Communication

제임스 평가 평균: 3.8/5
전체 면접관 평균: 4.2/5
차이: -0.4점 (더 엄격함)

상세 분석:
  - 5점 부여율: 10% (전체 평균: 25%)
  - 3점 이하 부여율: 40% (전체 평균: 20%)
  - 평가 일관성: 0.85 (높은 일관성)

다른 Competency 비교:
  - PostgreSQL: 4.5/5 (전체 평균: 4.3/5, +0.2)
  - Problem Solving: 3.9/5 (전체 평균: 4.0/5, -0.1)

인사이트:
  → 제임스는 Communication에서 유독 엄격
  → PostgreSQL 평가는 다른 면접관보다 관대
  → Calibration 필요 (Communication 점수 +0.4 보정)
```

**비즈니스 가치:**
- 면접관 간 평가 조율 (Calibration)
- 공정한 평가 기준 유지

---

#### DCQ-05: 합격자 벤치마크

**질문:** "지난 6개월 Backend Senior 합격자의 평균 Competency 점수는?"

**우선순위:** High (V1.5)
**출처:** 동적 데이터 전략
**검증 상태:** ⏳ Pending

**예상 답변:**
```
Position: Senior Backend Engineer
기간: 2024-05-01 ~ 2024-11-01
합격자 수: 8명

평균 Competency 점수:
  1. RESTful API Development: 4.5/5 ⭐ (필수 역량)
  2. PostgreSQL Database Design: 4.2/5 ⭐ (필수 역량)
  3. Communication: 4.0/5 ⭐ (필수 역량)
  4. System Architecture: 3.8/5
  5. Problem Solving: 4.3/5
  6. Time Management: 3.5/5

점수 분포:
  - 4.0점 이상: 모든 필수 역량
  - 3.5~3.9점: 선호 역량
  - 3.0점 미만: 없음 (필터링 기준)

인사이트:
  → 합격 기준: 필수 역량 모두 4.0/5 이상
  → System Architecture는 3.8점도 허용 (선호 역량)
```

**비즈니스 가치:**
- 합격 벤치마크 설정
- 신규 후보자 평가 시 기준점 제공

---

#### DCQ-06: Pass/Fail 기준점 발견

**질문:** "Communication 3점 받은 후보자의 최종 합격률은?"

**우선순위:** High (V1.5)
**출처:** 동적 데이터 전략, Opportunity 02
**검증 상태:** ⏳ Pending

**예상 답변:**
```
Competency: Communication
점수별 합격률 분석:

5점: 90% (10명 중 9명 합격)
4점: 65% (20명 중 13명 합격)
3점: 12% (25명 중 3명 합격) ← 기준점
2점: 0% (8명 중 0명 합격)
1점: 0% (2명 중 0명 합격)

3점 받고 합격한 3명의 공통점:
  - 모두 Technical Competency 4.5점 이상 (기술 우수)
  - 다른 Soft Skill (Problem Solving) 4.0점 이상
  - 특수 도메인 경험 (Payments 2명, Fintech 1명)

인사이트:
  → Communication 3점은 사실상 탈락 (12% 합격률)
  → Communication 4점이 실질적 Pass 기준
  → 기술이 아무리 우수해도 Communication 2점 이하는 100% 탈락
```

**비즈니스 가치:**
- 명확한 Pass/Fail 기준점 설정
- JD 작성 시 "Communication Intermediate (4.0/5) 이상" 명시

---

### DCQ-07~08: Outcome Insights (탈락 패턴)

#### DCQ-07: 탈락 사유 분석

**질문:** "Backend Senior 탈락 사유 Top 3는?"

**우선순위:** High (V1.5)
**출처:** 동적 데이터 전략
**검증 상태:** ⏳ Pending

**예상 답변:**
```
Position: Senior Backend Engineer
기간: 2024-05-01 ~ 2024-11-01
탈락자 수: 42명

탈락 사유 분석:
  1. PostgreSQL 역량 부족 (17명, 40%)
     - 평균 점수: 2.5/5
     - 기준: 4.0/5 이상 필요

  2. System Architecture 경험 부족 (13명, 30%)
     - 평균 점수: 2.8/5
     - 기준: 3.5/5 이상 필요

  3. Communication 3점 이하 (8명, 20%)
     - 기술은 우수하나 Soft Skill 미달

  4. 기타 (4명, 10%)
     - Culture fit, 연봉 협상 결렬 등

인사이트:
  → PostgreSQL이 가장 큰 필터 (40%)
  → JD에서 PostgreSQL Advanced 명확히 강조 필요
  → System Architecture는 "경험" 증빙 요청 (면접 질문 개선)
```

**비즈니스 가치:**
- JD 요구사항 정확성 검증
- 면접 질문 개선 (약점 파악용)

---

#### DCQ-08: 역설 케이스 분석

**질문:** "PostgreSQL 4점 이상인데 탈락한 케이스는 왜?"

**우선순위:** Medium (V1.5)
**출처:** 동적 데이터 전략
**검증 상태:** ⏳ Pending

**예상 답변:**
```
PostgreSQL 4점 이상 후보자:
  - 지원자: 15명
  - 합격: 12명 (80%)
  - 탈락: 3명 (20%)

탈락 3명 분석:

Case 1: 후보자 A
  - PostgreSQL: 4.5/5 ⭐
  - RESTful API: 4.0/5
  - Communication: 2.0/5 ← 탈락 사유
  - 인사이트: 기술 우수하나 팀 협업 불가

Case 2: 후보자 B
  - PostgreSQL: 4.0/5
  - System Architecture: 2.5/5 ← 탈락 사유
  - Communication: 3.5/5
  - 인사이트: Senior 기대치 미달 (아키텍처 필수)

Case 3: 후보자 C
  - PostgreSQL: 4.5/5
  - 모든 Technical Competency: 4.0+ 이상
  - Culture Fit 문제 ← 탈락 사유
  - 인사이트: 기술 외 요소 (정량화 어려움)

공통 인사이트:
  → 기술만으론 부족: Soft Skill 필수
  → Senior는 System Architecture 3.5/5 이상 필수
  → Communication 2점 이하는 "절대 탈락"
```

**비즈니스 가치:**
- Hiring criteria 정교화
- "기술만 보면 안 된다" 증거 기반 설득

---

### 📊 V1.5 CQ 요약

**정적 CQ (V1):** 16개
- Problem 01: 10개
- Problem 02: 6개

**동적 CQ (V1.5):** +8개 ← 신규
- Process Insights: 3개 (DCQ-01~03)
- Evaluation Insights: 3개 (DCQ-04~06)
- Outcome Insights: 2개 (DCQ-07~08)

**총 CQ:** 24개 (정적 16개 + 동적 8개)

**V2 예정 (Predictive):** +2개
- DCQ-09: "이 후보자의 합격 가능성은?" (AI 추론)
- DCQ-10: "이 후보자의 6개월 성과 예측은?" (Post-hire 데이터)

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 변경자 | 이유 |
|------|----------|--------|------|
| 2025-11-25 | 초안 생성, Problem 01-02 CQs 작성 (16개) | Terry | 초기 명세, V1 범위 정의 |
| 2025-11-27 | V1.5 동적 CQ 8개 추가 (DCQ-01~08) | Terry | ATS 동적 데이터 활용 전략 반영 |

---

## 📚 참고 자료

### 내부 문서
- [Opportunity 01: Skill Standardization](../../opportunities/01-skill-standardization.md)
- [Opportunity 02: Evaluation Consistency](../../opportunities/02-evaluation-consistency.md)
- [Interview Snapshot: Borry 2025-11-16](../../user-interviews/snapshots/snapshot-borry-2025-11-16.md)

### 방법론
- [Ontology competency questions](https://tishchungoora.medium.com/ontology-competency-questions-3d213eb08d33)
- [METHONTOLOGY CQ Framework](https://oa.upm.es/5484/1/METHONTOLOGY_.pdf)

---

*이 Competency Questions 문서는 온톨로지 설계의 북극성입니다. 모든 개념과 관계는 이 CQs에 답하기 위해 존재합니다.*
