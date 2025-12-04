# C-015: Interviewer (면접관)

**작성일:** 2025-11-28
**우선순위:** P1 (High)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-04

---

## 📋 정의 (Definition)

면접을 진행하고 후보자를 평가하는 내부 직원을 나타내는 개념입니다. 면접관별 평가 패턴, 전문 영역, 평가 통계를 추적하여 **평가 일관성 향상** 및 **캘리브레이션 기반**을 제공합니다.

**핵심 가치:**
- 면접관별 평가 패턴 분석 (DCQ-04)
- 평가 캘리브레이션 (면접관 간 기준 통일)
- 전문 영역 기반 면접관 배정 최적화
- 면접 품질 관리 (평가 횟수, 신뢰도 등)

**V1.5의 역할:**
- DCQ-04 "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?" 답변
- 면접관별 평가 평균, 편차, 엄격도(leniency) 분석
- 신규 면접관 트레이닝 필요성 판단

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **interviewerID** | string | 면접관 고유 식별자 | `james@company.com` 또는 `INT-001` |
| **name** | string | 이름 (익명화 가능) | `James Lee` 또는 `Interviewer_A` |
| **department** | string | 소속 부서 | `Engineering`, `Product`, `HR` |
| **role** | string | 직무/직급 | `Backend Tech Lead`, `Senior Engineer`, `HR Manager` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **expertiseAreas** | array<string> | 전문 영역 (평가 가능 역량) | `["PostgreSQL", "System Architecture", "Python"]` |
| **interviewExperienceYears** | integer | 면접 경력 (년) | `5` |
| **totalInterviewsCount** | integer | 총 면접 진행 횟수 | `87` |
| **activeStatus** | boolean | 활성 면접관 여부 | `true` |
| **preferredInterviewType** | enum | 선호 면접 유형 | `Technical`, `Behavioral`, `Culture Fit` |

### 자동 계산 속성 (Computed)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **avgEvaluationScore** | float | 전체 평가 평균 점수 | `3.8` |
| **leniencyScore** | float | 관대함 지수 (전체 평균 대비) | `+0.4` (관대) / `-0.2` (엄격) |
| **evaluationConsistency** | float | 평가 일관성 (표준편차의 역수) | `0.8` (일관적) / `0.3` (불일치 많음) |
| **hireRate** | float | 추천 합격률 (Hire 추천 / 전체 평가) | `0.35` (35%) |

---

## 🔗 관계 (Relationships)

### 1:N 관계

```
Interviewer (1) ─── conducts ──→ (N) Interview
  설명: 한 면접관이 여러 면접 진행
  예: 제임스 → 87건의 면접 진행

Interviewer (1) ─── provides ──→ (N) Evaluation Record
  설명: 한 면접관이 여러 평가 기록 작성
  예: 제임스 → 87개의 Evaluation Record
```

### M:N 관계

```
Interviewer (N) ─── evaluatesCompetency ──→ (N) Competency
  설명: 면접관은 여러 역량을 평가 가능, 한 역량은 여러 면접관이 평가
  예: 제임스 → PostgreSQL, Python, System Architecture 평가 가능
```

### 관계 다이어그램

```
┌──────────────┐
│ Interviewer  │
└──────┬───────┘
       │
       │ conducts
       ↓
┌──────────────┐        ┌─────────────────┐
│  Interview   │───────→│   Candidate     │
└──────┬───────┘        └─────────────────┘
       │
       │ produces
       ↓
┌─────────────────────┐
│ Evaluation Record   │
└──────┬──────────────┘
       │
       │ evaluates
       ↓
┌─────────────────────┐
│   Competency        │
│ Assessment (C-014)  │
└─────────────────────┘
```

---

## 💡 예시 (Examples)

### 예시 1: Backend Tech Lead (활발한 면접관)

```json
{
  "interviewerID": "james@company.com",
  "name": "James Lee",
  "department": "Engineering",
  "role": "Backend Tech Lead",
  "expertiseAreas": ["PostgreSQL", "Python", "System Architecture", "RESTful API"],
  "interviewExperienceYears": 5,
  "totalInterviewsCount": 87,
  "activeStatus": true,
  "preferredInterviewType": "Technical",

  "avgEvaluationScore": 4.0,
  "leniencyScore": +0.4,
  "evaluationConsistency": 0.85,
  "hireRate": 0.40
}
```

**인사이트 (DCQ-04):**
```
제임스의 평가 패턴:
- 전체 평균 점수: 4.0/5 (전체 면접관 평균: 3.6)
- 관대함 지수: +0.4 (전체 평균보다 0.4점 높게 평가)
- 일관성: 0.85 (높음 - 평가 기준이 일관적)
- Hire 추천률: 40% (전체 평균: 35%)

→ 제임스는 약간 관대한 편이지만 일관성 높음
→ 캘리브레이션 시 "기준 0.4점 하향 조정" 고려
```

---

### 예시 2: HR Manager (행동 면접 전문)

```json
{
  "interviewerID": "lisa@company.com",
  "name": "Lisa Chen",
  "department": "HR",
  "role": "HR Manager",
  "expertiseAreas": ["Communication", "Culture Fit", "Time Management"],
  "interviewExperienceYears": 8,
  "totalInterviewsCount": 150,
  "activeStatus": true,
  "preferredInterviewType": "Behavioral",

  "avgEvaluationScore": 3.4,
  "leniencyScore": -0.2,
  "evaluationConsistency": 0.90,
  "hireRate": 0.25
}
```

**인사이트:**
```
리사의 평가 패턴:
- 전체 평균 점수: 3.4/5 (전체 평균보다 -0.2점 엄격)
- 일관성: 0.90 (매우 높음)
- Hire 추천률: 25% (선별적)

→ 리사는 엄격하지만 일관적
→ Culture Fit 평가의 게이트키퍼 역할
```

---

### 예시 3: 신규 면접관 (트레이닝 필요)

```json
{
  "interviewerID": "newbie@company.com",
  "name": "Alex Kim",
  "department": "Engineering",
  "role": "Senior Engineer",
  "expertiseAreas": ["React", "Frontend"],
  "interviewExperienceYears": 0.5,
  "totalInterviewsCount": 8,
  "activeStatus": true,
  "preferredInterviewType": "Technical",

  "avgEvaluationScore": 3.2,
  "leniencyScore": -0.4,
  "evaluationConsistency": 0.45,
  "hireRate": 0.12
}
```

**경고 신호:**
```
알렉스의 평가 패턴 (문제 감지):
- 일관성: 0.45 (낮음 - 평가 기준 불명확)
- Hire 추천률: 12% (매우 낮음 - 과도하게 엄격)
- 면접 경력: 8건 (데이터 부족)

→ 🚨 액션 아이템:
   - 캘리브레이션 세션 참여 필수
   - Evaluation Rubric 재교육
   - 경험 많은 면접관과 공동 면접 권장 (10건)
```

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-04: 면접관 평가 패턴 분석
> "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?"

**필요한 데이터:**
- `Interviewer.interviewerID` (제임스 식별)
- `Evaluation Record` (제임스의 모든 평가)
- `Competency Assessment` (Communication 역량 점수)

**쿼리 로직:**
```sql
-- 제임스의 Communication 평균 점수
SELECT
  AVG(ca.score) AS james_avg_communication
FROM Evaluation_Record er
JOIN Competency_Assessment_Item ca ON er.recordID = ca.recordID
WHERE er.interviewerID = 'james@company.com'
  AND ca.competencyID = 'COMP-010'; -- Communication

-- 전체 면접관의 Communication 평균 점수
SELECT
  AVG(ca.score) AS overall_avg_communication
FROM Evaluation_Record er
JOIN Competency_Assessment_Item ca ON er.recordID = ca.recordID
WHERE ca.competencyID = 'COMP-010';

-- 결과 비교
-- 제임스: 4.2점
-- 전체 평균: 3.8점
-- Leniency: +0.4 (관대)
```

**시각화 (프로액티브 UI):**
```
┌───────────────────────────────────────────────────┐
│ 면접관별 Communication 평가 패턴                   │
├───────────────────────────────────────────────────┤
│ 제임스 (Tech Lead)  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░  4.2점 (+0.4) │
│ 전체 평균          ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░  3.8점       │
│ 리사 (HR)          ▓▓▓▓▓▓▓▓▓▓▓░░░░░░  3.4점 (-0.4) │
└───────────────────────────────────────────────────┘

💡 인사이트:
  - 제임스는 전체 평균보다 0.4점 관대
  - 리사는 0.4점 엄격
  - 캘리브레이션 권장: Communication Rubric 재검토
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **면접관 식별 일관성:**
- `interviewerID`가 변경되지 않도록 (이메일 변경 시 매핑 유지)
- 익명화 시에도 동일 ID 유지 (Interviewer_A는 항상 같은 사람)

✅ **전문 영역 정확성:**
- `expertiseAreas`는 실제 평가 가능 역량만 포함
- Competency (V1 정적) 목록과 일치

### High (중요)

⚠️ **평가 통계 업데이트:**
- 면접 후 자동 계산 (avgEvaluationScore, leniencyScore 등)
- 최소 5건 평가 이후부터 통계 신뢰성 확보

---

## 📊 V1.5 구현 시 고려사항

### 1. 익명화 (Privacy)

**문제:**
- "제임스는 Communication에서 0.4점 더 관대" 정보 공개 시 팀 갈등 가능

**해결 방안:**

**레벨 1: HR만 열람 (권장)**
```json
{
  "interviewerID": "james@company.com",
  "name": "James Lee",
  "leniencyScore": +0.4
}
// → HR만 접근, 면접관에게는 비공개
```

**레벨 2: 전체 공개 (익명화)**
```json
{
  "interviewerID": "INT-A",
  "name": "Interviewer_A",
  "leniencyScore": +0.4
}
// → 누가 엄격/관대한지 알 수 없도록
```

---

### 2. 캘리브레이션 세션 지원

**활용 예:**
```
캘리브레이션 미팅 안건 (자동 생성):

1. Communication 평가 편차 분석
   - 제임스: 4.2점 (전체 평균 +0.4)
   - 리사: 3.4점 (전체 평균 -0.4)
   - 편차: 0.8점

2. Rubric 재검토
   - Communication 3점 vs 4점 차이 불명확
   - 행동적 앵커 추가 필요

3. 예시 케이스 리뷰
   - 후보자 A: 제임스 4점, 리사 3점
   - 실제 녹음 리뷰 → 누가 맞는가?
```

---

### 3. ATS 연동

**Greenhouse API:**
```javascript
GET /users
{
  "id": 12345,
  "name": "James Lee",
  "email": "james@company.com",
  "department": "Engineering",
  "job_title": "Backend Tech Lead"
}
```

---

## 🚨 Week 5 검증 체크리스트

### 보리와의 검토 (Day 5)

- [ ] **익명화 레벨 선택**
  - HR만 열람 vs 전체 공개 (익명)
  - 면접관 사전 동의 필요 여부

- [ ] **leniencyScore 공개 범위**
  - 면접관에게 자신의 패턴 공개?
  - 캘리브레이션 세션에서만 사용?

- [ ] **최소 평가 횟수**
  - 몇 건 이상부터 통계 신뢰?
  - V1.5: 최소 5건 권장

---

## 🔗 관련 개념

- [C-012 Interview](./c-012-interview.md) - 면접 이벤트
- [C-013 Evaluation Record](./c-013-evaluation-record.md) - 면접관이 작성한 평가
- [C-014 Competency Assessment](./c-014-competency-assessment.md) - 역량별 평가 집계
- [V1 Evaluation Rubric](../evaluation-rubric.md) - 평가 기준

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-04: 면접관 패턴 분석](../../01-specification/competency-questions.md#dcq-04)

---

**다음 개념:** [C-016 Hiring Decision](./c-016-hiring-decision.md)
**이전 개념:** [C-014 Competency Assessment](./c-014-competency-assessment.md)
