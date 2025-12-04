# C-013: Evaluation Record (평가 기록)

**작성일:** 2025-11-27
**우선순위:** P0 (Critical)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-04, DCQ-05, DCQ-06, DCQ-08

---

## 📋 정의 (Definition)

면접관이 특정 면접에서 후보자를 평가한 기록을 나타내는 개념입니다. 각 면접(Interview)마다 여러 명의 면접관이 참여할 수 있으며, 각 면접관은 독립적인 Evaluation Record를 생성합니다.

**핵심 가치:**
- 면접관별 평가 패턴 분석 (DCQ-04)
- 합격자 벤치마크 산출 (DCQ-05)
- Pass/Fail 기준점 발견 (DCQ-06)
- 평가 일관성 및 캘리브레이션 기반

**V1.5의 게임체인저:**
- 이 개념이 있어야 "면접관 제임스는 Communication 평가 시 0.4점 더 엄격" 같은 인사이트 도출 가능
- 과거 합격자들의 평가 점수를 분석하여 "PostgreSQL 4점 미만은 모두 탈락" 패턴 발견

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **recordID** | string | 평가 기록 고유 식별자 | `ER-2024-001` |
| **candidateID** | string | 평가 대상 후보자 | `CAND-2024-123` |
| **interviewID** | string | 어떤 면접에서 평가했는지 | `INT-2024-456` |
| **interviewerID** | string | 평가한 면접관 | `james@company.com` 또는 `Interviewer_A` |
| **evaluationDate** | datetime | 평가 작성일 | `2024-11-10T16:30:00Z` |
| **overallScore** | float | 종합 평가 점수 (1-5) | `4.2` |
| **recommendation** | enum | 최종 추천 의견 | `Strong Hire`, `Hire`, `Maybe`, `No Hire`, `Strong No Hire` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **interviewDuration** | integer | 면접 소요 시간 (분) | `60` |
| **strengths** | text | 강점 요약 | `Strong PostgreSQL knowledge, clear communication` |
| **weaknesses** | text | 약점 요약 | `Limited React experience` |
| **detailedFeedback** | text | 상세 피드백 | `Candidate demonstrated excellent...` |
| **confidenceLevel** | enum | 평가 확신도 | `Very Confident`, `Confident`, `Somewhat Confident`, `Not Confident` |
| **culturalFit** | float | 문화 적합성 (1-5) | `4.5` |
| **notes** | text | 추가 메모 | `Would be a great addition to the team` |

---

## 🔗 관계 (Relationships)

### N:1 관계 (Many Evaluation Records → One 개념)

```
Evaluation Record (N) ─── evaluates ──→ (1) Candidate
  설명: 한 후보자는 여러 면접관으로부터 여러 평가를 받음
  예: 김철수가 1차 면접에서 제임스, 사라로부터 2개 평가

Evaluation Record (N) ─── fromInterview ──→ (1) Interview
  설명: 각 면접마다 참여한 면접관 수만큼 평가 기록 생성
  예: 1차 면접(3명 면접관) → 3개 Evaluation Record

Evaluation Record (N) ─── givenBy ──→ (1) Interviewer
  설명: 각 평가는 특정 면접관이 작성
  예: 제임스가 10개의 Evaluation Record 작성 (10명의 후보자 평가)

Evaluation Record (N) ─── forPosition ──→ (1) Position
  설명: 평가는 특정 포지션에 대한 것
  예: "Backend Senior" 포지션에 대한 평가
```

### 1:N 관계 (One Evaluation Record → Many 개념)

```
Evaluation Record (1) ─── contains ──→ (N) Competency Assessment
  설명: 하나의 평가 기록은 여러 역량(Competency)별 세부 점수 포함
  예: 제임스의 평가 기록 → PostgreSQL 4.5점, Python 4.0점, Communication 4.2점
```

### 관계 다이어그램

```
                    ┌─────────────┐
                    │  Candidate  │
                    └──────┬──────┘
                           ↑
                           │ evaluates
                           │
┌──────────┐        ┌──────┴──────────┐        ┌──────────────┐
│Interview │←───────│  Evaluation     │───────→│ Interviewer  │
│          │from    │    Record       │givenBy │              │
└──────────┘        └──────┬──────────┘        └──────────────┘
                           │
                           │ contains
                           ↓
                    ┌──────────────────┐
                    │   Competency     │
                    │   Assessment     │
                    └──────────────────┘
```

---

## 💡 예시 (Examples)

### 예시 1: 제임스의 평가 기록 (긍정적 평가)

```json
{
  "recordID": "ER-2024-001",
  "candidateID": "CAND-2024-123",
  "interviewID": "INT-2024-456",
  "interviewerID": "james@company.com",
  "evaluationDate": "2024-11-10T16:30:00Z",
  "overallScore": 4.5,
  "recommendation": "Strong Hire",
  "interviewDuration": 60,
  "strengths": "Exceptional PostgreSQL knowledge, clear explanation of complex technical concepts, strong problem-solving skills",
  "weaknesses": "Limited React experience (3/5), could improve on system design patterns",
  "detailedFeedback": "Candidate demonstrated excellent understanding of database optimization...",
  "confidenceLevel": "Very Confident",
  "culturalFit": 4.5,
  "notes": "Would be a great addition to the backend team. Recommend immediate offer."
}
```

**Competency Assessments (세부 평가):**
```json
[
  {
    "assessmentID": "CA-001",
    "recordID": "ER-2024-001",
    "competencyID": "COMP-002",
    "competencyName": "PostgreSQL",
    "score": 4.5,
    "evidence": "Explained query optimization, indexing strategies, and connection pooling in detail"
  },
  {
    "assessmentID": "CA-002",
    "recordID": "ER-2024-001",
    "competencyID": "COMP-003",
    "competencyName": "React",
    "score": 3.0,
    "evidence": "Basic understanding, but lacks experience with hooks and context API"
  },
  {
    "assessmentID": "CA-003",
    "recordID": "ER-2024-001",
    "competencyID": "COMP-010",
    "competencyName": "Communication",
    "score": 4.2,
    "evidence": "Clear and concise explanations, good at breaking down complex topics"
  }
]
```

---

### 예시 2: 사라의 평가 기록 (같은 후보자, 다른 관점)

```json
{
  "recordID": "ER-2024-002",
  "candidateID": "CAND-2024-123",
  "interviewID": "INT-2024-456",
  "interviewerID": "sarah@company.com",
  "evaluationDate": "2024-11-10T16:45:00Z",
  "overallScore": 4.0,
  "recommendation": "Hire",
  "interviewDuration": 60,
  "strengths": "Strong technical foundation, good team collaboration mindset",
  "weaknesses": "Could improve on explaining technical concepts to non-technical stakeholders",
  "detailedFeedback": "Solid technical skills, but communication with non-engineers needs work...",
  "confidenceLevel": "Confident",
  "culturalFit": 4.0,
  "notes": "Good fit for the team, but may need mentoring on cross-functional communication"
}
```

**Competency Assessments:**
```json
[
  {
    "assessmentID": "CA-004",
    "recordID": "ER-2024-002",
    "competencyID": "COMP-002",
    "competencyName": "PostgreSQL",
    "score": 4.0,
    "evidence": "Good understanding of database design, but didn't discuss advanced optimization"
  },
  {
    "assessmentID": "CA-005",
    "recordID": "ER-2024-002",
    "competencyID": "COMP-010",
    "competencyName": "Communication",
    "score": 3.5,
    "evidence": "Clear with technical peers, but struggled to simplify concepts for non-engineers"
  }
]
```

**인사이트:**
- 같은 후보자(CAND-2024-123)에 대한 두 면접관의 평가:
  - 제임스: PostgreSQL 4.5점, Communication 4.2점
  - 사라: PostgreSQL 4.0점, Communication 3.5점
- **면접관 패턴 (DCQ-04)**: 제임스가 평균 0.4점 더 관대하게 평가하는 경향

---

### 예시 3: 부정적 평가 (탈락 케이스)

```json
{
  "recordID": "ER-2024-015",
  "candidateID": "CAND-2024-456",
  "interviewID": "INT-2024-789",
  "interviewerID": "james@company.com",
  "evaluationDate": "2024-10-25T14:30:00Z",
  "overallScore": 2.8,
  "recommendation": "No Hire",
  "interviewDuration": 45,
  "strengths": "Enthusiastic, eager to learn",
  "weaknesses": "Lacks PostgreSQL experience, unable to answer basic SQL optimization questions",
  "detailedFeedback": "Candidate showed good attitude but lacks the technical depth required for this senior role...",
  "confidenceLevel": "Very Confident",
  "culturalFit": 3.5,
  "notes": "Not ready for senior level. Consider for mid-level position in the future."
}
```

**Competency Assessments:**
```json
[
  {
    "assessmentID": "CA-030",
    "recordID": "ER-2024-015",
    "competencyID": "COMP-002",
    "competencyName": "PostgreSQL",
    "score": 2.0,
    "evidence": "Could not explain indexing strategies or query optimization"
  },
  {
    "assessmentID": "CA-031",
    "recordID": "ER-2024-015",
    "competencyID": "COMP-010",
    "competencyName": "Communication",
    "score": 3.5,
    "evidence": "Clear communicator, but lacks technical depth to discuss complex topics"
  }
]
```

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-04: 면접관 평가 패턴 분석
> "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?"

**필요한 데이터:**
- `interviewerID` (제임스 식별)
- `Competency Assessment.competencyID = "COMP-010"` (Communication)
- `Competency Assessment.score` (점수)

**쿼리 로직:**
```sql
-- 제임스의 Communication 평균 점수
SELECT
  AVG(ca.score) AS james_avg_communication
FROM Evaluation_Record er
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
WHERE er.interviewerID = 'james@company.com'
  AND ca.competencyID = 'COMP-010';

-- 전체 면접관의 Communication 평균 점수
SELECT
  AVG(ca.score) AS overall_avg_communication
FROM Evaluation_Record er
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
WHERE ca.competencyID = 'COMP-010';

-- 차이 계산
-- 제임스: 4.0점
-- 전체 평균: 3.6점
-- 결과: 제임스는 Communication에서 +0.4점 더 관대
```

**인사이트 예시:**
```
면접관 패턴 분석 (Communication):
- 제임스: 평균 4.0점 (+0.4점 관대)
- 사라: 평균 3.4점 (-0.2점 엄격)
- 데이빗: 평균 3.6점 (전체 평균과 동일)

→ 캘리브레이션 필요: 제임스와 사라의 평가 기준 차이 논의
```

---

### DCQ-05: 합격자 벤치마크
> "지난 6개월 Backend Senior 합격자의 평균 Competency 점수는?"

**필요한 데이터:**
- `Evaluation Record` (합격자의 평가 기록)
- `Competency Assessment` (역량별 점수)
- `Hiring Decision.decision = "Hired"` (합격자 필터)

**쿼리 로직:**
```sql
SELECT
  ca.competencyID,
  c.name AS competency_name,
  AVG(ca.score) AS avg_score,
  MIN(ca.score) AS min_score,
  MAX(ca.score) AS max_score,
  COUNT(*) AS sample_size
FROM Evaluation_Record er
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
JOIN Hiring_Decision hd ON er.candidateID = hd.candidateID
JOIN Competency c ON ca.competencyID = c.competencyID
WHERE hd.decision = 'Hired'
  AND hd.positionID = 'POS-BE-SR-001'
  AND er.evaluationDate >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY ca.competencyID, c.name
ORDER BY avg_score DESC;
```

**결과 예시:**
```
PostgreSQL:      평균 4.2/5 (범위: 3.8-4.8, 샘플: 15건)
Communication:   평균 4.0/5 (범위: 3.5-4.5, 샘플: 15건)
Python:          평균 3.9/5 (범위: 3.2-4.5, 샘플: 15건)
React:           평균 3.5/5 (범위: 2.8-4.2, 샘플: 15건)

→ 프로액티브 제안: "PostgreSQL 3.8점, Communication 3.5점을 합격 기준으로 권장합니다"
```

---

### DCQ-06: Pass/Fail 기준점 발견
> "Communication 3점 받은 후보자의 최종 합격률은?"

**필요한 데이터:**
- `Competency Assessment.score` (Communication 점수 분포)
- `Hiring Decision.decision` (합격/불합격)

**쿼리 로직:**
```sql
SELECT
  CASE
    WHEN ca.score < 3.0 THEN 'Below 3.0'
    WHEN ca.score < 3.5 THEN '3.0-3.5'
    WHEN ca.score < 4.0 THEN '3.5-4.0'
    ELSE '4.0+'
  END AS score_range,
  COUNT(DISTINCT er.candidateID) AS total_candidates,
  SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) AS hired_count,
  ROUND(SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) * 100.0 / COUNT(DISTINCT er.candidateID), 1) AS hire_rate
FROM Evaluation_Record er
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
JOIN Hiring_Decision hd ON er.candidateID = hd.candidateID
WHERE ca.competencyID = 'COMP-010' -- Communication
  AND hd.positionID = 'POS-BE-SR-001'
GROUP BY score_range
ORDER BY score_range;
```

**결과 예시:**
```
Below 3.0:   8건 →  0% 합격 (Pass/Fail 기준점!)
3.0-3.5:    12건 → 25% 합격
3.5-4.0:    18건 → 67% 합격
4.0+:       22건 → 91% 합격

→ 인사이트: "Communication 3.5점이 실질적인 Pass/Fail 기준점"
```

---

### DCQ-08: 예외 케이스 분석
> "PostgreSQL 4점 이상인데 탈락한 케이스는 왜?"

**필요한 데이터:**
- `Competency Assessment.score` (PostgreSQL 4점 이상)
- `Hiring Decision.decision = "Rejected"`
- `Hiring Decision.decisionReason` + 다른 Competency 점수

**쿼리 로직:**
```sql
SELECT
  er.candidateID,
  ca_pg.score AS postgresql_score,
  ca_comm.score AS communication_score,
  hd.decisionReason,
  er.weaknesses
FROM Evaluation_Record er
JOIN Competency_Assessment ca_pg ON er.recordID = ca_pg.recordID
LEFT JOIN Competency_Assessment ca_comm ON er.recordID = ca_comm.recordID AND ca_comm.competencyID = 'COMP-010'
JOIN Hiring_Decision hd ON er.candidateID = hd.candidateID
WHERE ca_pg.competencyID = 'COMP-002' -- PostgreSQL
  AND ca_pg.score >= 4.0
  AND hd.decision = 'Rejected'
  AND hd.positionID = 'POS-BE-SR-001';
```

**결과 예시:**
```
CAND-2024-789: PostgreSQL 4.2, Communication 2.8
  → 사유: "Communication 역량 부족, 팀 협업 우려"

CAND-2024-790: PostgreSQL 4.5, Communication 3.0
  → 사유: "Cultural Fit 낮음 (2.5/5), 팀 분위기와 맞지 않음"

CAND-2024-791: PostgreSQL 4.0, Communication 3.2
  → 사유: "과도한 연봉 요구 (예산 초과)"

→ 인사이트: "PostgreSQL 우수해도 Communication 3.5 미만이면 80% 탈락"
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **평가 점수 일관성:**
- 모든 면접관이 동일한 1-5 척도 사용
- 루브릭(Evaluation Rubric) 기준 준수
- 점수와 recommendation 일치성 (예: overallScore 4.5면 Strong Hire/Hire)

✅ **Competency Assessment 완전성:**
- 각 Evaluation Record는 최소 3개 이상의 Competency Assessment 포함
- Position에서 요구하는 필수 Competency는 반드시 평가

✅ **평가 시점 정확성:**
- `evaluationDate`는 면접 당일 또는 익일 이내
- 시간이 오래 지난 후 작성된 평가는 신뢰도 낮음

### High (중요)

⚠️ **면접관 식별 명확성:**
- `interviewerID` 정확성 (이메일 또는 고유 ID)
- 익명화 시에도 일관된 ID 유지 (예: Interviewer_A는 항상 같은 사람)

⚠️ **피드백 품질:**
- `strengths`, `weaknesses`는 구체적 증거 기반
- "좋았다" 대신 "PostgreSQL 쿼리 최적화를 명확하게 설명했다"

⚠️ **Recommendation 일관성:**
- 같은 후보자에 대한 여러 면접관의 recommendation 차이가 2단계 이상이면 경고
  - 예: Strong Hire vs No Hire → 평가 기준 불일치 의심

### Medium (선택적)

💡 **추가 맥락 정보:**
- `detailedFeedback` 구조화 (자유 텍스트 대신 템플릿)
- `confidenceLevel` 정확성 (면접관 자기 평가)

---

## 📊 V1.5 구현 시 고려사항

### 1. 면접관 익명화 (Privacy & Culture)

**문제:**
- "제임스는 Communication에서 0.4점 더 관대" 정보가 공개되면 팀 갈등 가능

**해결 방안:**
- **익명화 레벨 1 (HR만 열람):**
  - 실제 이름 유지 (`james@company.com`)
  - 면접관 패턴 분석 결과는 HR만 확인
  - 면접관에게는 비공개

- **익명화 레벨 2 (전체 공개):**
  - 면접관 이름 → `Interviewer_A`, `Interviewer_B`
  - 패턴 분석 시 "일부 면접관은 평균보다 0.4점 엄격" 형태로 표현
  - 개인 타깃팅 방지

### 2. 평가 루브릭 표준화 (V1과 연계)

**현재 문제 (보리 인터뷰):**
- 면접관마다 "Communication 5점"의 기준이 다름
- 제임스: "기술 설명 명확함" = 5점
- 마케팅 팀장: "비개발자 대상 설명" = 3점

**V1.5 해결책:**
- V1에서 정의한 Evaluation Rubric 강제 적용
- Competency Assessment 작성 시 루브릭 기준 자동 표시
- 평가 전 면접관 캘리브레이션 세션 (Evaluation Record 분석 기반)

### 3. 샘플 데이터 수집 (Week 6)

**최소 샘플 사이즈:**
- 포지션당 최소 **10개 Evaluation Record** (5명 후보자 × 2명 면접관)
- DCQ-04 (면접관 패턴)는 면접관당 최소 5개 평가 필요

**다양성 확보:**
- 합격/불합격 비율: 50:50
- 면접관: 최소 3명 (엔지니어, HR, 타팀 매니저)
- Competency 점수 분포: 2점대~5점대 골고루

### 4. ATS 연동

**Greenhouse API:**
- `GET /scorecards` → Evaluation Record 기본 정보
- `GET /scorecards/{id}` → Competency Assessment 상세
- 자동 동기화: 면접 후 24시간 이내 평가 입력 시 자동 반영

---

## 🚨 Week 5 검증 체크리스트

### 보리와의 검토 (Day 5)

- [ ] **면접관 익명화 방식 합의**
  - 레벨 1 (HR만) vs 레벨 2 (전체) 선택
  - 제임스 등 면접관의 사전 동의 필요 여부

- [ ] **평가 루브릭 준수 확인**
  - 현재 Greenhouse에서 루브릭 기준 제시 여부
  - V1 Evaluation Rubric을 V1.5에서 강제할지

- [ ] **샘플 데이터 수집 가능성**
  - 과거 Evaluation Record 접근 가능 여부 (Greenhouse API)
  - 최소 10개 평가 기록 확보 가능 포지션 확인

- [ ] **DCQ-04 (면접관 패턴) 범위**
  - V1.5 Phase 1에 포함 vs V2로 이월
  - 보리의 문화적 우려 해소 방안

---

## 🔗 관련 개념

- [C-008 Candidate](./c-008-candidate.md) - 평가 대상
- [C-012 Interview](./c-012-interview.md) - 평가가 발생한 면접
- [C-014 Competency Assessment](./c-014-competency-assessment.md) - 세부 역량 평가
- [C-015 Interviewer](./c-015-interviewer.md) - 평가자
- [V1 Evaluation Rubric](../../03-implementation/evaluation-rubric.md) - 평가 기준

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-04: 면접관 패턴 분석](../../01-specification/competency-questions.md#dcq-04)
- [DCQ-05: 합격자 벤치마크](../../01-specification/competency-questions.md#dcq-05)
- [DCQ-06: Pass/Fail 기준점](../../01-specification/competency-questions.md#dcq-06)

---

**다음 개념:** [C-011 Lead Time](./c-011-lead-time.md)
**이전 개념:** [C-008 Candidate](./c-008-candidate.md)
