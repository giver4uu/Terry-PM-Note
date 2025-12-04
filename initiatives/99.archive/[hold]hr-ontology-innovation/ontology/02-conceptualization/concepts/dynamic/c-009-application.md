# C-009: Application (지원)

**작성일:** 2025-11-28
**우선순위:** P1 (High)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-01

---

## 📋 정의 (Definition)

특정 포지션(Position)에 대한 후보자(Candidate)의 지원 행위를 나타내는 개념입니다. 지원 시점부터 최종 결정까지의 채용 여정(Candidate Journey)의 **시작점**이며, Lead Time 측정의 기준이 됩니다.

**핵심 가치:**
- 채용 퍼널의 시작점 정의
- Lead Time 측정 기준 (DCQ-01)
- 지원 경로(Source) 추적 및 ROI 분석
- 지원 현황 트래킹 (Applied → Screening → Interview → Offer)

**V1.5의 역할:**
- DCQ-01 "Senior Backend Engineer 채용의 평균 리드타임은?" 답변을 위한 **시작 시점 기록**
- 지원일(`appliedDate`)을 기준으로 각 단계별 소요 시간 계산

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **applicationID** | string | 지원 고유 식별자 | `APP-2024-001` |
| **candidateID** | string | 지원자 | `CAND-2024-123` |
| **positionID** | string | 지원한 포지션 | `POS-BE-SR-001` |
| **appliedDate** | datetime | 지원일 | `2024-11-01T09:00:00Z` |
| **status** | enum | 현재 상태 | `Applied`, `Screening`, `Interview`, `Offer`, `Rejected`, `Withdrawn` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **source** | string | 지원 경로 | `LinkedIn`, `Referral`, `Company Website`, `Job Board` |
| **referrerID** | string | 추천인 (Referral 경우) | `EMP-2024-456` |
| **coverLetterUrl** | string | 자기소개서 URL | `https://...` |
| **currentStage** | string | 현재 전형 단계 | `1차 기술 면접`, `최종 면접` |
| **lastUpdated** | datetime | 상태 마지막 업데이트 | `2024-11-15T14:30:00Z` |

---

## 🔗 관계 (Relationships)

### N:1 관계

```
Application (N) ─── submittedBy ──→ (1) Candidate
  설명: 한 후보자는 여러 포지션에 지원 가능
  예: 김철수 → Backend Senior (지원 1), Frontend Mid (지원 2)

Application (N) ─── appliesFor ──→ (1) Position
  설명: 여러 후보자가 동일 포지션에 지원
  예: Backend Senior ← 100명 지원
```

### 1:N 관계

```
Application (1) ─── leadsTo ──→ (N) Interview Stage
  설명: 지원 후 여러 전형 단계 진행
  예: 지원 → 서류 전형 → 1차 면접 → 2차 면접 → 최종

Application (1) ─── generates ──→ (N) Lead Time
  설명: 각 단계 전환마다 Lead Time 생성
  예: 지원 → 서류(7일) → 1차 면접(14일) → 2차 면접(7일)
```

### 관계 다이어그램

```
┌─────────────┐
│  Candidate  │
└──────┬──────┘
       │ submittedBy
       ↓
┌─────────────┐        ┌──────────────┐
│ Application │───────→│   Position   │
└──────┬──────┘appliesFor└──────────────┘
       │
       │ leadsTo
       ↓
┌──────────────────┐
│ Interview Stage  │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│   Lead Time      │
└──────────────────┘
```

---

## 💡 예시 (Examples)

### 예시 1: LinkedIn 지원 (진행 중)

```json
{
  "applicationID": "APP-2024-001",
  "candidateID": "CAND-2024-123",
  "positionID": "POS-BE-SR-001",
  "appliedDate": "2024-11-01T09:00:00Z",
  "status": "Interview",
  "source": "LinkedIn",
  "currentStage": "1차 기술 면접",
  "lastUpdated": "2024-11-10T16:30:00Z"
}
```

**Lead Time 계산 (DCQ-01):**
```
지원일 (2024-11-01) → 현재 (2024-11-10) = 9일 경과
  └─ 서류 → 1차 면접: 7일 소요
  └─ 1차 면접 진행 중
```

---

### 예시 2: 내부 추천 (Referral) - 빠른 진행

```json
{
  "applicationID": "APP-2024-050",
  "candidateID": "CAND-2024-456",
  "positionID": "POS-FE-MID-002",
  "appliedDate": "2024-10-20T10:00:00Z",
  "status": "Offer",
  "source": "Referral",
  "referrerID": "EMP-2024-789",
  "currentStage": "오퍼 발송",
  "lastUpdated": "2024-11-05T09:00:00Z"
}
```

**Lead Time 계산:**
```
지원일 (2024-10-20) → 오퍼 (2024-11-05) = 16일 (빠름!)
  └─ 서류 → 1차 면접: 3일 (추천으로 빠른 스크리닝)
  └─ 1차 → 2차: 7일
  └─ 2차 → 오퍼: 6일
```

**인사이트:**
- Referral 지원자는 평균 리드타임 28일 → 16일 (43% 단축)
- 지원 경로별 ROI 분석 가능

---

### 예시 3: 탈락 케이스

```json
{
  "applicationID": "APP-2024-089",
  "candidateID": "CAND-2024-789",
  "positionID": "POS-BE-SR-001",
  "appliedDate": "2024-09-15T14:00:00Z",
  "status": "Rejected",
  "source": "Company Website",
  "currentStage": "서류 전형",
  "lastUpdated": "2024-09-18T11:00:00Z"
}
```

**Lead Time:**
```
지원일 (2024-09-15) → 탈락 (2024-09-18) = 3일
  └─ 서류 전형에서 탈락
```

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-01: 평균 리드타임 계산
> "Senior Backend Engineer 채용의 평균 리드타임은?"

**필요한 데이터:**
- `Application.appliedDate` (시작점)
- `Hiring Decision.decisionDate` (종료점)
- `Lead Time` (단계별 소요 시간)

**쿼리 로직:**
```sql
SELECT
  AVG(DATEDIFF(hd.decisionDate, app.appliedDate)) AS avg_total_lead_time_days,
  MIN(DATEDIFF(hd.decisionDate, app.appliedDate)) AS min_lead_time,
  MAX(DATEDIFF(hd.decisionDate, app.appliedDate)) AS max_lead_time
FROM Application app
JOIN Hiring_Decision hd ON app.candidateID = hd.candidateID
WHERE app.positionID = 'POS-BE-SR-001'
  AND hd.decision = 'Hired'
  AND app.appliedDate >= DATE_SUB(NOW(), INTERVAL 6 MONTH);
```

**결과 예시:**
```
평균 리드타임: 28일 (범위: 16-42일)
  → 인사이트: "Backend Senior 채용은 평균 4주 소요"
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **지원일 정확성:**
- `appliedDate`는 후보자가 실제 지원한 시점
- ATS 시스템 기록과 일치

✅ **상태 업데이트:**
- `status` 변경 시 `lastUpdated` 자동 갱신
- 상태 전환 이력 추적 (Status History)

### High (중요)

⚠️ **지원 경로 추적:**
- `source` 정확성 (ROI 분석 목적)
- Referral 경우 `referrerID` 필수

---

## 📊 V1.5 구현 시 고려사항

### 1. Status 전환 흐름

**정상 흐름:**
```
Applied → Screening → Interview → Offer → Hired
                                        ↘ Offer Declined
                ↘ Rejected
                ↘ Withdrawn (후보자 철회)
```

### 2. ATS 연동

**Greenhouse API:**
```javascript
GET /applications
{
  "candidate_id": 123,
  "job_id": 456,
  "applied_at": "2024-11-01T09:00:00Z",
  "status": "active",
  "source": {
    "name": "LinkedIn"
  }
}
```

---

## 🔗 관련 개념

- [C-008 Candidate](./c-008-candidate.md) - 지원자
- [C-010 Interview Stage](./c-010-interview-stage.md) - 전형 단계
- [C-011 Lead Time](./c-011-lead-time.md) - 소요 시간 측정
- [V1 Position](../position.md) - 지원 대상 포지션

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-01: 리드타임 분석](../../01-specification/competency-questions.md#dcq-01)

---

**다음 개념:** [C-010 Interview Stage](./c-010-interview-stage.md)
**이전 개념:** [C-008 Candidate](./c-008-candidate.md)
