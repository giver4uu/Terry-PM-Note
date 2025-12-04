# Borry 검토 세션 안내 (Week 2 완료 리뷰)

**일시:** Week 2 말
**참여자:** Borry (HR 전문가), Terry (PM)
**예상 시간:** 2시간
**목적:** 7개 핵심 온톨로지 개념의 HR 실무 적합성 검증

---

## 🎯 세션 목표

1. **이해도 검증:** 7개 개념이 HR 담당자(비기술자)가 이해 가능한가?
2. **실용성 검증:** 실제 채용 프로세스에서 사용 가능한가?
3. **완전성 검증:** 빠진 중요한 요소가 있는가?
4. **우선순위 조정:** V1에서 어떤 부분에 집중해야 하는가?

---

## 📋 세션 안건 (Agenda)

### Part 1: 개념 구조 이해 (30분)

**온톨로지 전체 구조 설명:**
```
Job Family (직무군)
└── Job Function (직무)
    └── Position (포지션) = Function + Job Level + Team
        └── requires → Competency (역량)
            ├── at Proficiency Level (숙련도)
            └── evaluated by → Evaluation Rubric (평가 기준)
```

**핵심 질문:**
- 이 구조가 실제 채용 흐름과 일치하는가?
- 보리님의 머릿속 모델과 다른 부분이 있는가?

---

### Part 2: 개념별 상세 검토 (60분, 개념당 8-9분)

#### 2.1. Job Family (C-001) - 직무군
**정의:** 유사한 성격의 직무들을 묶은 최상위 분류 (Engineering, Product)

**검토 포인트:**
- [ ] "직무군"이라는 용어가 자연스러운가?
- [ ] V1 범위 (Engineering, Product 2개)로 충분한가?
- [ ] Sales, Marketing은 언제 추가해야 하는가?

---

#### 2.2. Job Function (C-002) - 직무
**정의:** 구체적 역할 (Backend Engineer, Frontend Engineer, Product Manager)

**검토 포인트:**
- [ ] V1 범위 3개 (Backend, Frontend, PM)로 충분한가?
- [ ] Base Competencies 개념이 이해되는가? (모든 Backend가 공통으로 가져야 할 역량)
- [ ] Full-stack Engineer 같은 하이브리드 역할은 어떻게 처리?

---

#### 2.3. Position (C-003) - 포지션
**정의:** 실제 채용 포지션 (Senior Backend Engineer - Payments Team)

**검토 포인트:**
- [ ] Position = Job Function + Job Level + Team Context 공식이 맞는가?
- [ ] 속성(id, name, requiredCompetencies, responsibilities)이 JD 작성에 충분한가?
- [ ] 팀 정보(teamContext)를 별도 Entity로 분리할 필요는?

**실무 시나리오:**
"Senior Backend Engineer - Payments Team" JD를 30분 내 작성할 수 있겠는가?

---

#### 2.4. Competency (C-004) - 역량 ⭐ 핵심!
**정의:** 특정 직무를 수행하기 위해 필요한 표준화된 스킬, 지식, 능력

**3가지 예시 제공:**
1. RESTful API Development (Technical)
2. Communication & Collaboration (Soft Skill)
3. Data-Driven Decision Making (PM)

**검토 포인트:**
- [ ] Competency 정의가 명확한가? (예: RESTful API Development의 behavioralIndicators)
- [ ] Technical과 Soft Skill 구분이 적절한가?
- [ ] V1에서 최소 몇 개 Competency가 필요한가? (현재 예상: 10-15개)
- [ ] 누락된 중요 역량이 있는가?

**실무 질문:**
- 이 Competency 정의만으로 JD의 "필요 역량" 섹션을 채울 수 있는가?
- 기존 JD와 비교했을 때, 더 명확한가 모호한가?

---

#### 2.5. Proficiency Level (C-005) - 숙련도 레벨
**정의:** 특정 Competency를 얼마나 잘 수행할 수 있는지 (4단계)

**4단계:**
1. Beginner (초급) - 지속적 지도 필요
2. Intermediate (중급) - 독립적 수행 가능
3. Advanced (고급) - 복잡한 문제 해결, 멘토링
4. Expert (전문가) - 조직 표준 수립

**검토 포인트:**
- [ ] 4단계로 충분한가? 5단계가 필요한가?
- [ ] 각 레벨의 설명이 명확한가?
- [ ] Beginner와 Intermediate의 경계가 모호하지 않은가?

**실무 시나리오:**
"이 후보자는 RESTful API를 Intermediate 수준으로 한다"고 말했을 때, 구체적으로 무엇을 의미하는지 이해되는가?

---

#### 2.6. Job Level (C-006) - 직급/시니어리티
**정의:** 조직 내 직급 (Junior, Mid, Senior)

**V1 범위: 3단계**
- Junior (0-2년, 지도 필요)
- Mid (2-5년, 독립 수행)
- Senior (5년+, 멘토링, 기술 리딩)

**검토 포인트:**
- [ ] 3단계로 충분한가? Staff, Principal이 V1에 필요한가?
- [ ] 경력 연수 범위가 현실적인가?
- [ ] Job Level vs Proficiency Level 구분이 명확한가?

**핵심 구분:**
- Job Level = 조직 직급 (Senior)
- Proficiency Level = 스킬 숙련도 (Advanced)
- Senior(Job Level)라고 모든 스킬이 Advanced(Proficiency)는 아님!

---

#### 2.7. Evaluation Rubric (C-007) - 평가 루브릭 ⭐ 핵심!
**정의:** 면접에서 Competency를 일관되게 평가하기 위한 5점 척도 기준표

**구조:**
- 1-5점 척도
- 각 점수마다 구체적 행동 설명 (behavioral anchor)
- 면접 질문 예시 포함

**검토 포인트:**
- [ ] 5점 척도가 적절한가? 3점 또는 7점이 낫지 않은가?
- [ ] behavioralExample이 실제 면접에서 사용 가능한가?
- [ ] 이 Rubric이 조율 시간을 1시간 → 15분으로 단축시킬 수 있는가?

**실무 시나리오:**
면접 후 조율 회의에서 이 Rubric을 사용했을 때:
- 면접관 A: "RESTful API - 3점 (CRUD API 설명 가능, rate limiting은 모름)"
- 면접관 B: "RESTful API - 3점 (동일 판단)"
→ 15분 내 합의 가능한가?

---

### Part 3: V1 범위 및 우선순위 논의 (20분)

**현재 V1 계획:**
- 2개 Job Families (Engineering, Product)
- 3개 Job Functions (Backend, Frontend, PM)
- 10-15개 Competencies
- 각 Competency마다 Rubric

**질문:**
1. 이 범위로 파일럿 테스트 가능한가?
2. 우선 작성해야 할 Competency Top 5는?
3. V1에서 꼭 검증해야 할 핵심 가설은?

---

### Part 4: 미해결 질문 및 가정 검증 (20분)

#### 미해결 질문 리스트

**1. Competency 개수**
- V1에서 최소 몇 개 필요? (현재 예상: 10-15개)
- Technical vs Soft Skill 비율은? (예상: 70% vs 30%)

**2. Proficiency Level**
- 4단계로 충분? 5단계 필요?
- Soft Skill도 같은 4단계 사용 가능?

**3. Job Level**
- 3단계(Junior, Mid, Senior)로 충분? Staff 필요?
- 경력 연수를 필수 기준으로 할지, 참고 사항으로 할지?

**4. Evaluation Rubric**
- 5점 척도로 충분? 7점 필요?
- passingScore를 Rubric에 포함할지, Position에 포함할지?

**5. 팀 정보 (Team Context)**
- V1에서 "Payments Team", "Social Team"을 어떻게 관리?
- V2에서 별도 Team Entity 필요?

---

### Part 5: Action Items 및 다음 단계 (10분)

**검토 결과 기록:**
- 각 개념별 피드백 요약
- 수정/보완 필요 사항
- V1 범위 최종 확정

**다음 단계 (Week 3-4):**
1. 보리 피드백 반영하여 개념 정의 수정
2. 10-15개 Competency 상세 정의 작성
3. 각 Competency에 Rubric 작성
4. 3개 Position 예시 작성 (Senior BE, Mid FE, Senior PM)

---

## 📊 검토 체크리스트

### 이해도 (Comprehensibility)
- [ ] 7개 개념을 HR 담당자가 이해할 수 있는가? (목표: 4/5 이상)
- [ ] 기술 용어가 과도하지 않은가?
- [ ] 예시가 충분히 구체적인가?

### 실용성 (Usefulness)
- [ ] 실제 JD 작성에 사용 가능한가? (목표: 2시간 → 30분)
- [ ] 면접 평가에 사용 가능한가? (목표: 조율 1시간 → 15분)
- [ ] 기존 프로세스 대비 개선되는가?

### 완전성 (Completeness)
- [ ] 빠진 중요 개념이 있는가?
- [ ] 추가 속성이 필요한가?
- [ ] V1 범위가 적절한가?

### 채택 의향 (Adoption Intent)
- [ ] 이 온톨로지를 실제로 사용하고 싶은가? (Yes/No)
- [ ] 다른 HR 담당자에게 추천하겠는가?

---

## 📝 피드백 기록 양식

각 개념별로 다음 형식으로 피드백 기록:

```
## [개념 이름]

### 👍 좋은 점
-

### 🤔 개선 필요
-

### ❓ 질문
-

### 💡 제안
-

### ⭐ 평가 (1-5)
- 이해도: _/5
- 실용성: _/5
```

---

## 🎯 세션 성공 기준

- [ ] 7개 개념 모두 리뷰 완료
- [ ] 각 개념별 평가 점수 (이해도, 실용성) 수집
- [ ] 개선 사항 리스트 작성 (최소 5개)
- [ ] V1 범위 최종 확정
- [ ] 채택 의향 확인 (Yes/No)

---

*이 세션을 통해 온톨로지가 실제 HR 실무에 부합하는지 검증하고, Week 3-4 작업 방향을 명확히 합니다.*
