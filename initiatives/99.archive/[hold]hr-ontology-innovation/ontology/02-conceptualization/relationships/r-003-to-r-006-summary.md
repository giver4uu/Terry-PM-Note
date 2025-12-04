# R-003 ~ R-006: V1.5 핵심 관계 정의

**작성일:** 2025-11-28
**작성자:** Terry
**버전:** v1.0.0
**상태:** 완료

---

## 📋 개요

V1.5 동적 개념 간 핵심 관계 4가지(R-003~R-006)를 정의합니다. 이 관계들은 채용 프로세스 데이터 흐름의 중추이며, 모든 DCQ 쿼리의 기반이 됩니다.

**전체 흐름:**
```
Candidate → Interview → Evaluation Record → Competency Assessment → Hiring Decision
   (R-003)    (R-003)        (R-004)              (R-005)              (R-006)
```

---

## R-003: Candidate participatesIn Interview → produces Evaluation Record

### 정의

후보자가 면접에 참여하고, 각 면접마다 여러 면접관이 독립적인 평가 기록을 생성하는 관계

### 관계 유형

- **Candidate → Interview:** 1:N (한 후보자가 여러 면접 참여)
- **Interview → Evaluation Record:** 1:N (한 면접당 여러 면접관 평가)

### 카디널리티

```
Candidate (1)
  └─ Interview (N: 평균 3회 - 1차, 2차, 최종)
       └─ Evaluation Record (N: 면접당 평균 3명 면접관)

예: 후보자 1명 × 면접 3회 × 면접관 3명 = 총 9개 Evaluation Record
```

### 속성 제약

| 제약 | 설명 | 검증 방법 |
|------|------|----------|
| **필수 참여** | 모든 Candidate는 최소 1개 Interview 보유 | `COUNT(Interview) >= 1` |
| **시간 순서** | Interview.date는 Application.appliedDate 이후 | `Interview.date > Application.appliedDate` |
| **평가 시점** | Evaluation Record는 면접 당일 또는 익일 작성 | `DATEDIFF(evaluationDate, interviewDate) <= 2` |

### DCQ 연결

- **DCQ-01:** Lead Time 계산 (면접 횟수 및 간격)
- **DCQ-04:** 면접관 패턴 분석 (면접관별 평가 기록)

### 구현 예시

```sql
-- 후보자의 모든 면접 및 평가 조회
SELECT
  c.name AS candidate_name,
  i.interviewDate,
  i.format,
  COUNT(er.recordID) AS evaluation_count
FROM Candidate c
JOIN Interview i ON c.candidateID = i.candidateID
LEFT JOIN Evaluation_Record er ON i.interviewID = er.interviewID
GROUP BY c.candidateID, i.interviewID
ORDER BY i.interviewDate;
```

---

## R-004: Evaluation Record aggregatesFrom → Competency Assessment

### 정의

여러 면접관의 개별 평가(Individual Assessment)를 집계하여 후보자의 역량별 종합 평가를 생성하는 관계

### 관계 유형

- **Evaluation Record → Competency Assessment:** N:1 (여러 개별 평가 → 하나의 종합 평가)

### 카디널리티

```
Evaluation Records (N: 면접관 수만큼)
  └─ PostgreSQL 4.5 (제임스)
  └─ PostgreSQL 4.0 (사라)
  └─ PostgreSQL 4.1 (데이빗)
       ↓ aggregatesFrom
Competency Assessment (1)
  └─ PostgreSQL 평균 4.2, 편차 0.25
```

### 집계 로직

```python
def create_competency_assessment(candidateID, competencyID):
    # Individual Assessments 조회
    records = get_evaluation_records(candidateID, competencyID)

    # 집계 계산
    scores = [r.score for r in records]
    return {
        "candidateID": candidateID,
        "competencyID": competencyID,
        "averageScore": mean(scores),
        "minScore": min(scores),
        "maxScore": max(scores),
        "scoreVariance": stddev(scores),
        "evaluationCount": len(scores),
        "confidenceLevel": calculate_confidence(len(scores), stddev(scores))
    }
```

### 속성 제약

| 제약 | 설명 | 검증 방법 |
|------|------|----------|
| **최소 평가 수** | evaluationCount ≥ 2 권장 (1개는 신뢰도 Low) | `evaluationCount >= 2` |
| **점수 범위** | averageScore는 1~5 범위 | `1.0 <= averageScore <= 5.0` |
| **편차 한계** | scoreVariance > 1.0이면 경고 (면접관 불일치) | Alert if `scoreVariance > 1.0` |

### DCQ 연결

- **DCQ-05:** 합격자 벤치마크 (역량별 평균 점수)
- **DCQ-06:** Pass/Fail 기준점 (점수 분포별 합격률)
- **DCQ-07:** 탈락 사유 분석 (기준 미달 역량)

### 구현 예시

```sql
-- Competency Assessment 자동 생성 (집계)
INSERT INTO Competency_Assessment (
  candidateID, competencyID, averageScore, evaluationCount, scoreVariance
)
SELECT
  er.candidateID,
  ca_item.competencyID,
  AVG(ca_item.score) AS averageScore,
  COUNT(*) AS evaluationCount,
  STDDEV(ca_item.score) AS scoreVariance
FROM Evaluation_Record er
JOIN Competency_Assessment_Item ca_item ON er.recordID = ca_item.recordID
WHERE er.candidateID = ?
GROUP BY er.candidateID, ca_item.competencyID;
```

---

## R-005: Competency Assessment evaluatesCompetency → Competency (V1)

### 정의

V1.5 동적 평가 데이터가 V1 정적 역량 정의를 참조하는 관계

### 관계 유형

- **Competency Assessment (V1.5) → Competency (V1):** N:1 (여러 평가 → 하나의 정의)

### 의미

- **V1 Competency:** "PostgreSQL이란 무엇인가" (정의, 루브릭, Proficiency Level)
- **V1.5 Competency Assessment:** "김철수의 PostgreSQL 점수는 4.2점" (실제 평가 데이터)

### 데이터 흐름

```
V1 (정적)
  ┌─────────────────────────────────────┐
  │ Competency: PostgreSQL              │
  │ - proficiencyLevels: [...]          │
  │ - evaluationRubric: {1점: ..., 5점:...}│
  └─────────────────┬───────────────────┘
                    │ 참조 (evaluates)
                    ↓
V1.5 (동적)
  ┌─────────────────────────────────────┐
  │ Competency Assessment               │
  │ - candidateID: CAND-123             │
  │ - competencyID: COMP-002 (참조)     │
  │ - averageScore: 4.2                 │
  └─────────────────────────────────────┘
```

### 속성 제약

| 제약 | 설명 | 검증 방법 |
|------|------|----------|
| **참조 무결성** | competencyID는 V1 Competency에 존재 필수 | Foreign Key 제약 |
| **루브릭 준수** | 평가 점수는 Rubric 기준 일치 | 면접관 교육, 캘리브레이션 |

### DCQ 연결

- **DCQ-05, 06, 07:** 모든 역량 관련 쿼리가 V1 정의와 V1.5 데이터를 조인

### 구현 예시

```sql
-- V1 정의 + V1.5 평가 데이터 조인
SELECT
  c.name AS competency_name,
  c.proficiencyLevels,
  AVG(ca.averageScore) AS avg_candidate_score
FROM Competency c (V1)
JOIN Competency_Assessment ca (V1.5) ON c.competencyID = ca.competencyID
JOIN Hiring_Decision hd ON ca.candidateID = hd.candidateID
WHERE hd.decision = 'Hired'
GROUP BY c.competencyID;
```

---

## R-006: Competency Assessment influencesDecision → Hiring Decision

### 정의

여러 역량 평가 결과가 최종 채용 결정에 영향을 미치는 관계

### 관계 유형

- **Competency Assessment → Hiring Decision:** N:1 (여러 역량 평가 → 하나의 결정)

### 의사결정 로직

```
Competency Assessments (필수 역량 모두 평가)
  ├─ PostgreSQL: 4.2 ✅ (기준 3.8)
  ├─ Communication: 4.0 ✅ (기준 3.5)
  ├─ Python: 3.9 ✅ (기준 3.5)
  └─ React: 3.5 ✅ (기준 3.0)
       ↓
       모든 필수 역량 통과 → Hired
       하나라도 미달 → Rejected (대부분)
```

### 예외 케이스

**케이스 1: PostgreSQL 4.5점인데 탈락**
```
PostgreSQL: 4.5 ✅
Communication: 2.8 ❌ (기준 3.5)
→ Decision: Rejected
→ Reason: "Communication 역량 부족, 팀 협업 우려"
```

**케이스 2: 모든 역량 통과했지만 탈락**
```
PostgreSQL: 4.0 ✅
Communication: 3.8 ✅
Culture Fit: 2.5 ❌
→ Decision: Rejected
→ Reason: "팀 문화 적합성 낮음"
```

### 속성 제약

| 제약 | 설명 | 검증 방법 |
|------|------|----------|
| **완전성** | 모든 필수 Competency 평가 완료 후 결정 | Position.requiredCompetencies 체크 |
| **일관성** | isPassing = false인데 decision = "Hired"이면 경고 | Alert 발생 |

### DCQ 연결

- **DCQ-06:** "Communication 3.5점 미만 합격률?" (역량-결정 상관관계)
- **DCQ-07:** "탈락 사유 Top 3?" (기준 미달 역량 통계)
- **DCQ-08:** "PostgreSQL 4.5점인데 탈락?" (예외 케이스 분석)

### 구현 예시

```sql
-- 역량 평가와 최종 결정 상관관계
SELECT
  ca.competencyID,
  c.name,
  CASE
    WHEN ca.averageScore >= 4.0 THEN '4.0+'
    WHEN ca.averageScore >= 3.5 THEN '3.5-4.0'
    WHEN ca.averageScore >= 3.0 THEN '3.0-3.5'
    ELSE '< 3.0'
  END AS score_range,
  COUNT(*) AS total,
  SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) AS hired_count,
  ROUND(100.0 * SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) / COUNT(*), 1) AS hire_rate
FROM Competency_Assessment ca
JOIN Hiring_Decision hd ON ca.candidateID = hd.candidateID
JOIN Competency c ON ca.competencyID = c.competencyID
WHERE ca.competencyID = 'COMP-010' -- Communication
GROUP BY ca.competencyID, score_range;
```

---

## 📊 관계 우선순위

### Critical (P0)

1. **R-004:** Evaluation Record → Competency Assessment
   - DCQ-05, 06, 07의 핵심
   - 집계 로직 정확성이 인사이트 품질 결정

2. **R-006:** Competency Assessment → Hiring Decision
   - 합격/탈락 패턴 분석의 기반
   - 프로액티브 제안의 근거

### High (P1)

3. **R-003:** Candidate → Interview → Evaluation Record
   - 데이터 수집의 시작점
   - 면접관 패턴 분석 (DCQ-04)

4. **R-005:** Competency Assessment → Competency (V1)
   - V1-V1.5 연결의 핵심
   - 정적 정의 + 동적 데이터 결합

---

## 🚨 Week 5 Day 5 검증 포인트

### 보리와 확인할 사항

1. **R-004 집계 로직 이해**
   - Individual Assessment vs Aggregated Assessment 차이 명확한가?
   - scoreVariance > 1.0일 때 경고의 의미 이해?

2. **R-006 의사결정 흐름**
   - "모든 필수 역량 통과 → Hired" 규칙 동의?
   - 예외 케이스 (Culture Fit 등) 처리 방안?

3. **R-005 V1-V1.5 연결**
   - Competency (V1) 정의를 실무에서 어떻게 활용?
   - Competency Assessment (V1.5) 데이터로 루브릭 개선 가능?

---

## 🔗 관련 문서

- [통합 관계 다이어그램](./dynamic-relationships.md) - 전체 흐름 시각화
- [동적 개념 리스트](../concepts/dynamic-concepts-list.md) - 9개 개념 정의
- [V1.5 Scope](../../01-specification/v1-5-scope.md) - 전략적 가치

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 변경자 | 이유 |
|------|----------|--------|------|
| 2025-11-28 | R-003~R-006 관계 정의 초안 작성 | Terry | Week 5 Day 5 완료, 핵심 관계 4가지 상세 정의 |

---

*이 4가지 관계는 V1.5 동적 개념의 중추이며, Week 6 샘플 데이터 수집 및 DCQ 검증의 기반입니다.*
