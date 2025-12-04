# C-014: Competency Assessment (역량 종합 평가)

**작성일:** 2025-11-28
**우선순위:** P0 (Critical)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-05, DCQ-06, DCQ-07

---

## 📋 정의 (Definition)

특정 후보자(Candidate)의 특정 역량(Competency)에 대한 **종합 평가 결과**를 나타내는 개념입니다. 여러 면접관의 개별 평가(Individual Assessment)를 집계하여 후보자의 역량별 종합 점수, 평가 일관성, 면접관 간 편차 등을 산출합니다.

**핵심 가치:**
- 합격자 벤치마크 산출 (DCQ-05)
- Pass/Fail 기준점 발견 (DCQ-06)
- 탈락 사유 패턴 분석 (DCQ-07)
- 면접관 간 평가 불일치 발견 및 캘리브레이션

**V1.5의 게임체인저:**
- "지난 6개월 Backend Senior 합격자의 PostgreSQL 평균 4.2점" 같은 벤치마크 제공
- "Communication 3.5점 미만은 67% 탈락" 같은 Pass/Fail 기준점 발견
- "PostgreSQL 4.5점인데 Communication 2.8점으로 탈락" 같은 예외 케이스 분석

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **assessmentID** | string | 역량 평가 고유 식별자 | `CA-2024-001` |
| **candidateID** | string | 평가 대상 후보자 | `CAND-2024-123` |
| **competencyID** | string | 평가 대상 역량 | `COMP-002` (PostgreSQL) |
| **averageScore** | float | 모든 면접관 평가 평균 (1-5) | `4.2` |
| **evaluationCount** | integer | 평가 횟수 (면접관 수) | `3` |
| **createdDate** | datetime | 평가 생성일 | `2024-11-10T17:00:00Z` |

### 자동 계산 속성 (Computed)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **scoreVariance** | float | 면접관 간 점수 편차 (표준편차) | `0.5` |
| **minScore** | float | 최저 점수 | `3.5` |
| **maxScore** | float | 최고 점수 | `4.8` |
| **scoreRange** | float | 점수 범위 (max - min) | `1.3` |
| **confidenceLevel** | enum | 평가 신뢰도 | `High`, `Medium`, `Low` |

**신뢰도 계산 로직:**
- `High`: evaluationCount ≥ 3 AND scoreVariance < 0.5
- `Medium`: evaluationCount ≥ 2 AND scoreVariance < 1.0
- `Low`: evaluationCount = 1 OR scoreVariance ≥ 1.0

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **assessmentNotes** | text | 종합 평가 메모 | `Strong PostgreSQL skills, all interviewers agreed` |
| **redFlags** | array<string> | 주의 사항 (편차 큼, 점수 낮음) | `["High variance", "Below threshold"]` |
| **passingThreshold** | float | 해당 포지션의 합격 기준점 (동적) | `4.0` |
| **isPassing** | boolean | 기준점 통과 여부 | `true` |

---

## 🔗 관계 (Relationships)

### N:1 관계 (Many Competency Assessments → One 개념)

```
Competency Assessment (N) ─── assessesCandidate ──→ (1) Candidate
  설명: 한 후보자는 여러 역량에 대한 평가를 받음
  예: 김철수 → PostgreSQL 평가, React 평가, Communication 평가

Competency Assessment (N) ─── evaluatesCompetency ──→ (1) Competency (V1 정적)
  설명: 여러 후보자가 동일한 역량(예: PostgreSQL)에 대해 평가받음
  예: PostgreSQL → 후보자 A 평가, 후보자 B 평가

Competency Assessment (N) ─── forPosition ──→ (1) Position
  설명: 특정 포지션에 대한 평가
  예: "Backend Senior - Payments" 포지션 지원자들의 PostgreSQL 평가
```

### 1:N 관계 (One Competency Assessment → Many 개념)

```
Competency Assessment (1) ─── aggregatesFrom ──→ (N) Individual Assessment
  설명: 여러 면접관의 개별 평가를 집계
  예: PostgreSQL 종합 평가 ← 제임스 4.5점 + 사라 4.0점 + 데이빗 4.1점

Individual Assessment 구조:
  - recordID: ER-2024-001 (Evaluation Record)
  - interviewerID: james@company.com
  - score: 4.5
  - evidence: "Explained query optimization clearly"
```

### M:N 관계

```
Competency Assessment (N) ─── influencesDecision ──→ (1) Hiring Decision
  설명: 여러 역량 평가가 최종 채용 결정에 영향
  예: PostgreSQL 4.2 + Communication 4.0 + Problem Solving 3.8 → Hired
```

### 관계 다이어그램

```
                    ┌─────────────┐
                    │  Candidate  │
                    └──────┬──────┘
                           ↑
                           │ assesses
                           │
┌──────────┐        ┌──────┴──────────────┐        ┌──────────────┐
│Competency│←───────│   Competency        │───────→│   Position   │
│  (V1)    │        │   Assessment (C-014)│   for  │              │
└──────────┘        └──────┬──────────────┘        └──────────────┘
                           │
                           │ aggregatesFrom
                           ↓
                    ┌──────────────────────┐
                    │ Individual Assessment│
                    │ (Evaluation Record의 │
                    │  세부 항목)          │
                    └──────┬───────────────┘
                           │
                           ↓
                    ┌──────────────────┐
                    │ Hiring Decision  │
                    │     (C-016)      │
                    └──────────────────┘
```

---

## 💡 예시 (Examples)

### 예시 1: 긍정적 평가 (합격 케이스)

**시나리오:** 후보자 김철수가 Backend Senior 포지션에 지원, 3명의 면접관이 PostgreSQL 평가

```json
{
  "assessmentID": "CA-2024-001",
  "candidateID": "CAND-2024-123",
  "competencyID": "COMP-002",
  "competencyName": "PostgreSQL Database Design & Optimization",
  "averageScore": 4.2,
  "evaluationCount": 3,
  "scoreVariance": 0.25,
  "minScore": 4.0,
  "maxScore": 4.5,
  "scoreRange": 0.5,
  "confidenceLevel": "High",
  "createdDate": "2024-11-10T17:00:00Z",
  "assessmentNotes": "Strong PostgreSQL skills across all interviews. Consistent high scores.",
  "redFlags": [],
  "passingThreshold": 3.8,
  "isPassing": true
}
```

**Individual Assessments (집계 원본 데이터):**
```json
[
  {
    "recordID": "ER-2024-001",
    "interviewerID": "james@company.com",
    "interviewerName": "James (Backend Tech Lead)",
    "score": 4.5,
    "evidence": "Explained query optimization, indexing strategies in detail. Solved N+1 problem efficiently."
  },
  {
    "recordID": "ER-2024-002",
    "interviewerID": "sarah@company.com",
    "interviewerName": "Sarah (DBA)",
    "score": 4.0,
    "evidence": "Good understanding of database design, but didn't discuss advanced partitioning."
  },
  {
    "recordID": "ER-2024-003",
    "interviewerID": "david@company.com",
    "interviewerName": "David (Senior Engineer)",
    "score": 4.1,
    "evidence": "Solid grasp of PostgreSQL fundamentals and optimization techniques."
  }
]
```

**인사이트:**
- 평균 4.2점, 편차 0.25 → **일관된 고평가**
- 모든 면접관이 4.0점 이상 → **합격 기준(3.8점) 통과**
- 신뢰도 High → **확신 있는 Hire 결정 가능**

---

### 예시 2: 면접관 간 불일치 (편차 큼)

**시나리오:** 후보자 박영희의 Communication 평가, 면접관 의견 불일치

```json
{
  "assessmentID": "CA-2024-050",
  "candidateID": "CAND-2024-456",
  "competencyID": "COMP-010",
  "competencyName": "Communication & Collaboration",
  "averageScore": 3.7,
  "evaluationCount": 3,
  "scoreVariance": 1.2,
  "minScore": 2.5,
  "maxScore": 4.5,
  "scoreRange": 2.0,
  "confidenceLevel": "Low",
  "createdDate": "2024-10-15T14:30:00Z",
  "assessmentNotes": "High variance detected. Interviewers had different perspectives.",
  "redFlags": ["High variance (>1.0)", "Score range >1.5"],
  "passingThreshold": 3.5,
  "isPassing": true
}
```

**Individual Assessments:**
```json
[
  {
    "recordID": "ER-2024-078",
    "interviewerID": "james@company.com",
    "interviewerName": "James (Engineer)",
    "score": 4.5,
    "evidence": "Excellent technical communication. Explained complex concepts clearly to engineers."
  },
  {
    "recordID": "ER-2024-079",
    "interviewerID": "marketing_lead@company.com",
    "interviewerName": "Lisa (Marketing Lead)",
    "score": 2.5,
    "evidence": "Struggled to explain technical concepts in non-technical terms. Used too much jargon."
  },
  {
    "recordID": "ER-2024-080",
    "interviewerID": "pm_lead@company.com",
    "interviewerName": "Mike (PM Lead)",
    "score": 4.0,
    "evidence": "Good at cross-functional communication with product team."
  }
]
```

**인사이트:**
- 평균 3.7점으로 기준(3.5점) 통과했지만, **신뢰도 Low**
- 편차 1.2 → **면접관 간 캘리브레이션 필요**
- 패턴 발견: 엔지니어는 호평(4.0+), 비개발자는 저평가(2.5)
- **액션 아이템:** 캘리브레이션 세션, Communication Rubric 재검토

---

### 예시 3: 탈락 케이스 (기준점 미달)

**시나리오:** 후보자 최민수의 PostgreSQL 평가, 기준점 미달로 탈락

```json
{
  "assessmentID": "CA-2024-089",
  "candidateID": "CAND-2024-789",
  "competencyID": "COMP-002",
  "competencyName": "PostgreSQL Database Design & Optimization",
  "averageScore": 2.8,
  "evaluationCount": 2,
  "scoreVariance": 0.3,
  "minScore": 2.5,
  "maxScore": 3.0,
  "scoreRange": 0.5,
  "confidenceLevel": "Medium",
  "createdDate": "2024-09-20T11:00:00Z",
  "assessmentNotes": "Insufficient PostgreSQL knowledge for Senior level. Both interviewers agreed.",
  "redFlags": ["Below threshold (3.8)"],
  "passingThreshold": 3.8,
  "isPassing": false
}
```

**Individual Assessments:**
```json
[
  {
    "recordID": "ER-2024-112",
    "interviewerID": "james@company.com",
    "score": 3.0,
    "evidence": "Basic SQL knowledge, but couldn't explain indexing strategies or query optimization."
  },
  {
    "recordID": "ER-2024-113",
    "interviewerID": "sarah@company.com",
    "score": 2.5,
    "evidence": "Unable to design normalized schema. Struggled with JOIN queries."
  }
]
```

**연결된 Hiring Decision:**
```json
{
  "decisionID": "HD-2024-089",
  "candidateID": "CAND-2024-789",
  "decision": "Rejected",
  "primaryReason": "PostgreSQL competency below Senior level requirement (2.8/5, threshold 3.8/5)",
  "detailedNotes": "Strong Communication (4.0) and enthusiasm, but lacks technical depth for Senior role. Consider for Mid-level."
}
```

**인사이트:**
- PostgreSQL 2.8점 < 기준 3.8점 → **자동 탈락**
- 두 면접관 모두 낮은 점수, 편차 작음 → **일관된 평가**
- **패턴:** PostgreSQL 3.8점 미만은 Backend Senior에서 100% 탈락

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-05: 합격자 벤치마크
> "지난 6개월 Backend Senior 합격자의 평균 Competency 점수는?"

**필요한 데이터:**
- `Competency Assessment.averageScore` (역량별 종합 점수)
- `Hiring Decision.decision = "Hired"` (합격자 필터)
- `Position.positionID = "POS-BE-SR-001"` (Backend Senior)

**쿼리 로직:**
```sql
SELECT
  ca.competencyID,
  c.name AS competency_name,
  AVG(ca.averageScore) AS avg_score,
  MIN(ca.averageScore) AS min_score,
  MAX(ca.averageScore) AS max_score,
  STDDEV(ca.averageScore) AS score_stddev,
  COUNT(*) AS sample_size
FROM Competency_Assessment ca
JOIN Hiring_Decision hd ON ca.candidateID = hd.candidateID
JOIN Competency c ON ca.competencyID = c.competencyID
WHERE hd.decision = 'Hired'
  AND hd.positionID = 'POS-BE-SR-001'
  AND ca.createdDate >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY ca.competencyID, c.name
ORDER BY avg_score DESC;
```

**결과 예시:**
```
PostgreSQL:      평균 4.2/5 (범위: 3.8-4.8, 표준편차: 0.3, 샘플: 15건)
Communication:   평균 4.0/5 (범위: 3.5-4.5, 표준편차: 0.4, 샘플: 15건)
Python:          평균 3.9/5 (범위: 3.2-4.5, 표준편차: 0.5, 샘플: 15건)
React:           평균 3.5/5 (범위: 2.8-4.2, 표준편차: 0.6, 샘플: 15건)

→ 프로액티브 제안:
  "Backend Senior 합격자 벤치마크:
   - PostgreSQL: 최소 3.8점 권장 (평균 4.2점)
   - Communication: 최소 3.5점 권장 (평균 4.0점)
   - React: 상대적으로 낮은 가중치 (평균 3.5점)"
```

**비즈니스 가치:**
- JD 작성 시 "PostgreSQL Advanced 필요"를 **데이터로 검증**
- 신규 후보자 평가 시 "PostgreSQL 3.5점은 합격자 평균보다 0.7점 낮음" 경고
- 채용 기준 정교화: "Communication 3.5점 이상은 필수"

---

### DCQ-06: Pass/Fail 기준점 발견
> "Communication 3점 받은 후보자의 최종 합격률은?"

**필요한 데이터:**
- `Competency Assessment.averageScore` (Communication 점수 분포)
- `Hiring Decision.decision` (합격/불합격)

**쿼리 로직:**
```sql
SELECT
  CASE
    WHEN ca.averageScore < 3.0 THEN 'Below 3.0'
    WHEN ca.averageScore < 3.5 THEN '3.0-3.5'
    WHEN ca.averageScore < 4.0 THEN '3.5-4.0'
    ELSE '4.0+'
  END AS score_range,
  COUNT(DISTINCT ca.candidateID) AS total_candidates,
  SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) AS hired_count,
  ROUND(SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) * 100.0 / COUNT(DISTINCT ca.candidateID), 1) AS hire_rate_pct
FROM Competency_Assessment ca
JOIN Hiring_Decision hd ON ca.candidateID = hd.candidateID
WHERE ca.competencyID = 'COMP-010' -- Communication
  AND hd.positionID = 'POS-BE-SR-001'
GROUP BY score_range
ORDER BY score_range;
```

**결과 예시:**
```
Below 3.0:    8건 →  0% 합격 (절대 탈락 구간!)
3.0-3.5:     12건 → 25% 합격 (낮은 합격률)
3.5-4.0:     18건 → 67% 합격 (Pass/Fail 경계선)
4.0+:        22건 → 91% 합격 (높은 확률)

→ 인사이트:
  "Communication 3.5점이 실질적인 Pass/Fail 기준점"
  "3.0점 이하는 다른 역량이 우수해도 탈락"
```

**시각화 (프로액티브 UI):**
```
┌─────────────────────────────────────────────┐
│ Communication 점수별 합격률                  │
├─────────────────────────────────────────────┤
│ < 3.0   ▓▓░░░░░░░░░░░░░░░░░░   0%          │
│ 3.0-3.5 ▓▓▓▓▓░░░░░░░░░░░░░░  25%          │
│ 3.5-4.0 ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░  67% ← 기준점  │
│ 4.0+    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  91%          │
└─────────────────────────────────────────────┘

💡 제안: Communication 3.5점을 합격 기준으로 설정
```

---

### DCQ-07: 탈락 사유 Top 3
> "Backend Senior 탈락 사유 Top 3는?"

**필요한 데이터:**
- `Competency Assessment.averageScore` (역량별 점수)
- `Competency Assessment.isPassing = false` (기준 미달)
- `Hiring Decision.decision = "Rejected"`

**쿼리 로직:**
```sql
SELECT
  ca.competencyID,
  c.name AS competency_name,
  COUNT(DISTINCT ca.candidateID) AS rejected_count,
  AVG(ca.averageScore) AS avg_score_of_rejected,
  ca_threshold.passingThreshold,
  ROUND(COUNT(DISTINCT ca.candidateID) * 100.0 / (
    SELECT COUNT(DISTINCT candidateID)
    FROM Hiring_Decision
    WHERE decision = 'Rejected' AND positionID = 'POS-BE-SR-001'
  ), 1) AS rejection_rate_pct
FROM Competency_Assessment ca
JOIN Hiring_Decision hd ON ca.candidateID = hd.candidateID
JOIN Competency c ON ca.competencyID = c.competencyID
LEFT JOIN (
  SELECT competencyID, AVG(passingThreshold) AS passingThreshold
  FROM Competency_Assessment
  GROUP BY competencyID
) ca_threshold ON ca.competencyID = ca_threshold.competencyID
WHERE hd.decision = 'Rejected'
  AND hd.positionID = 'POS-BE-SR-001'
  AND ca.isPassing = false
GROUP BY ca.competencyID, c.name, ca_threshold.passingThreshold
ORDER BY rejected_count DESC
LIMIT 3;
```

**결과 예시:**
```
1. PostgreSQL:       40건 (40%) - 평균 2.8점 (기준 3.8점)
   → "데이터베이스 역량 부족이 가장 큰 탈락 사유"

2. System Architecture: 30건 (30%) - 평균 3.0점 (기준 3.5점)
   → "설계 경험 부족"

3. Communication:    20건 (20%) - 평균 2.9점 (기준 3.5점)
   → "기술은 우수하나 협업 우려로 탈락"

→ 액션 아이템:
  - JD에 "PostgreSQL Advanced 필수" 명시 강화
  - 지원자 사전 스크리닝 강화 (PostgreSQL 경험 확인)
  - System Architecture 평가 루브릭 명확화
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **집계 정확성:**
- `averageScore` = SUM(individual scores) / `evaluationCount`
- `scoreVariance` 계산 정확성 (표준편차)
- 모든 Individual Assessment가 동일한 1-5 척도 사용

✅ **최소 평가 횟수:**
- `evaluationCount ≥ 2` 권장 (1명 평가는 신뢰도 Low)
- Senior 이상 포지션: `evaluationCount ≥ 3` 필수

✅ **기준점 설정 근거:**
- `passingThreshold`는 과거 합격자 데이터 기반 (DCQ-05)
- 포지션별로 다른 기준점 적용 (Senior vs Mid)

### High (중요)

⚠️ **편차 모니터링:**
- `scoreVariance > 1.0` → 캘리브레이션 경고
- `scoreRange > 2.0` → 면접관 간 극심한 불일치

⚠️ **신뢰도 검증:**
- `confidenceLevel = Low`인 평가는 추가 면접 권장
- 예: 평가 1건만 있거나 편차가 큰 경우

⚠️ **예외 케이스 추적:**
- `isPassing = true`인데 최종 탈락 → 사유 분석 (DCQ-08)
- `isPassing = false`인데 최종 합격 → 특별 사유 기록

### Medium (선택적)

💡 **트렌드 분석:**
- 시간에 따른 평균 점수 변화 (평가 기준 변경 감지)
- 포지션별 점수 분포 비교

---

## 📊 V1.5 구현 시 고려사항

### 1. Individual Assessment vs Aggregated Assessment 명확화

**혼동 방지:**

| 구분 | Individual Assessment | Aggregated Competency Assessment (C-014) |
|------|---------------------|------------------------------|
| **정의** | 한 면접관의 한 역량 평가 | 여러 면접관 평가의 집계 |
| **데이터 위치** | Evaluation Record (C-013) 내부 | 별도 테이블/개념 |
| **예시** | 제임스가 PostgreSQL 4.5점 평가 | PostgreSQL 종합: 평균 4.2점 (제임스 4.5 + 사라 4.0 + 데이빗 4.1) |
| **주 사용처** | 면접관 패턴 분석 (DCQ-04) | 합격 벤치마크 (DCQ-05, 06, 07) |

**데이터 구조 예시:**
```json
// Individual Assessment (Evaluation Record 내부)
{
  "recordID": "ER-2024-001",
  "interviewerID": "james@company.com",
  "competencyScores": [
    {"competencyID": "COMP-002", "score": 4.5, "evidence": "..."}
  ]
}

// Aggregated Competency Assessment (C-014)
{
  "assessmentID": "CA-2024-001",
  "candidateID": "CAND-2024-123",
  "competencyID": "COMP-002",
  "averageScore": 4.2,
  "individualScores": [4.5, 4.0, 4.1]
}
```

---

### 2. 실시간 vs 배치 집계

**옵션 A: 실시간 집계 (권장)**
- 면접관이 Evaluation Record 제출 시 자동 집계
- Competency Assessment 자동 생성/업데이트
- 장점: 실시간 벤치마크 비교 가능
- 단점: 계산 부하

**옵션 B: 배치 집계**
- 일 1회 또는 주 1회 집계
- 장점: 서버 부하 분산
- 단점: 실시간 인사이트 제한

**V1.5 권장: 실시간 집계** (ATS는 채용 건수가 상대적으로 적음)

---

### 3. 기준점(Passing Threshold) 자동 계산

**동적 기준점 설정:**
```python
def calculate_passing_threshold(competencyID, positionID):
    # 지난 6개월 합격자의 해당 역량 평균 점수
    hired_avg = get_hired_avg_score(competencyID, positionID, months=6)

    # 하위 25% 백분위수 (최소 합격 수준)
    hired_25th = get_percentile(competencyID, positionID, percentile=25)

    # 둘 중 더 보수적인(낮은) 값 선택
    threshold = min(hired_avg - 0.5, hired_25th)

    return round(threshold, 1)

# 예: PostgreSQL
# - 합격자 평균: 4.2점
# - 합격자 평균 - 0.5 = 3.7점
# - 합격자 25th percentile: 3.8점
# → 기준점: 3.7점 (더 보수적)
```

**프로액티브 UI:**
```
┌──────────────────────────────────────────┐
│ 후보자: 김철수                            │
│ PostgreSQL 평가 결과                      │
├──────────────────────────────────────────┤
│ 종합 점수: 4.2/5 ✅                      │
│ 합격 기준: 3.8/5                         │
│ 합격자 평균: 4.2/5 (동일)                │
│                                          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░                   │
│         ↑         ↑                      │
│       기준(3.8) 평균(4.2)                │
│                                          │
│ 💡 인사이트: 합격자 평균과 동일, 높은 확률로 적합  │
└──────────────────────────────────────────┘
```

---

### 4. 샘플 데이터 수집 (Week 6)

**최소 요구사항:**
- 포지션당 최소 **10명 후보자**
- 후보자당 최소 **3개 역량 평가** (PostgreSQL, Communication 등)
- 역량당 최소 **2명 면접관 평가** (집계 가능하도록)

**데이터 다양성:**
- 합격/불합격 비율: 50:50
- 점수 분포: 2점대~5점대 골고루
- 면접관: 최소 3명 (엔지니어, HR, 타팀)

**예상 샘플 사이즈:**
```
10명 후보자 × 3개 역량 × 2명 면접관 = 60개 Individual Assessment
→ 30개 Competency Assessment (10명 × 3개 역량)
```

---

### 5. ATS 연동 (Greenhouse)

**데이터 흐름:**
```
Greenhouse Scorecard API
  ↓
Individual Assessment 추출
  ↓
Competency Assessment 자동 집계
  ↓
DCQ 쿼리 실행 (벤치마크, 기준점)
  ↓
프로액티브 UI에 인사이트 표시
```

**API 매핑:**
```javascript
// Greenhouse Scorecard → Individual Assessment
GET /scorecards/{id}
{
  "attributes": [
    {
      "name": "PostgreSQL",
      "rating": "yes",  // 5점
      "note": "Strong database skills"
    }
  ]
}

// 변환
{
  "competencyID": "COMP-002",
  "score": 5.0,  // "yes" → 5점 매핑
  "evidence": "Strong database skills"
}
```

---

## 🚨 Week 5 검증 체크리스트

### 보리와의 검토 (Day 5)

- [ ] **기준점(Passing Threshold) 자동 vs 수동**
  - 자동 계산 (과거 데이터 기반) vs HR이 수동 설정
  - 보리의 선호도 확인

- [ ] **면접관 최소 인원 합의**
  - Senior 포지션: 최소 3명 면접관 필요?
  - Mid 이하: 2명 가능?

- [ ] **편차 경고 기준**
  - scoreVariance > 1.0이 적절한가?
  - 너무 민감하거나 둔감하지 않은지

- [ ] **샘플 데이터 수집 범위**
  - 과거 몇 개월치 데이터 접근 가능?
  - Greenhouse API 권한 확인

---

## 🔗 관련 개념

- [C-008 Candidate](./c-008-candidate.md) - 평가 대상
- [C-013 Evaluation Record](./c-013-evaluation-record.md) - Individual Assessment 원본
- [C-016 Hiring Decision](./c-016-hiring-decision.md) - 평가 결과 활용
- [V1 Competency](../competency.md) - 평가 대상 역량 정의
- [V1 Evaluation Rubric](../evaluation-rubric.md) - 평가 기준

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-05: 합격자 벤치마크](../../01-specification/competency-questions.md#dcq-05)
- [DCQ-06: Pass/Fail 기준점](../../01-specification/competency-questions.md#dcq-06)
- [DCQ-07: 탈락 사유 분석](../../01-specification/competency-questions.md#dcq-07)

---

**다음 개념:** [C-015 Interviewer](./c-015-interviewer.md)
**이전 개념:** [C-013 Evaluation Record](./c-013-evaluation-record.md)
