# C-011: Lead Time (채용 단계별 소요 시간)

**작성일:** 2025-11-27
**우선순위:** P0 (Critical)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-01, DCQ-02

---

## 📋 정의 (Definition)

채용 프로세스의 각 단계(Interview Stage) 간 소요 시간을 측정하고 추적하는 개념입니다. 병목 구간을 발견하여 프로세스 개선의 기반을 제공합니다.

**핵심 가치:**
- 채용 프로세스 병목 단계 자동 발견
- 후보자 이탈 위험 구간 식별
- 리크루터/면접관 일정 조율 개선점 파악
- 포지션별/팀별 채용 속도 벤치마킹

**V1.5의 차별화 포인트:**
- Greenhouse는 전체 리드타임만 표시
- 우리 시스템은 **단계별 세부 소요 시간 + 병목 자동 감지**

**실무 임팩트 (보리 인터뷰 기반):**
- 현재 문제: "어디서 느린지 모르겠어요"
- V1.5 해결: "1차→2차 면접 사이 평균 14일 병목 → 면접관 일정 조율 개선 필요"

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **leadTimeID** | string | 리드타임 측정 고유 식별자 | `LT-2024-001` |
| **candidateID** | string | 측정 대상 후보자 | `CAND-2024-123` |
| **positionID** | string | 채용 포지션 | `POS-BE-SR-001` |
| **fromStage** | enum | 시작 단계 | `Applied`, `Screening`, `Interview_1st`, `Interview_2nd`, `Interview_Final`, `Offer` |
| **toStage** | enum | 종료 단계 | 위와 동일 |
| **startDate** | datetime | 시작 단계 진입 시각 | `2024-11-01T10:00:00Z` |
| **endDate** | datetime | 종료 단계 진입 시각 | `2024-11-08T14:30:00Z` |
| **durationDays** | float | 소요 일수 (자동 계산) | `7.2` |
| **durationHours** | float | 소요 시간 (자동 계산) | `172.5` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **isBottleneck** | boolean | 병목 여부 (평균 대비 1.5배 이상) | `true` |
| **bottleneckReason** | text | 병목 원인 | `Interviewer availability conflict` |
| **expectedDuration** | float | 예상 소요 일수 | `3.0` |
| **delayDays** | float | 지연 일수 (actual - expected) | `4.2` |
| **responsibleParty** | enum | 지연 책임 주체 | `Recruiter`, `Interviewer`, `Candidate`, `HR`, `System` |
| **notes** | text | 추가 메모 | `Candidate requested date change` |

---

## 🔗 관계 (Relationships)

### N:1 관계

```
Lead Time (N) ─── measures ──→ (1) Candidate
  설명: 한 후보자의 채용 여정은 여러 단계로 구성
  예: 김철수 → Applied→Screening (3일), Screening→1차면접 (5일), 1차→2차 (14일)...

Lead Time (N) ─── forPosition ──→ (1) Position
  설명: 각 포지션별로 리드타임 패턴이 다름
  예: Backend Senior는 평균 28일, Junior는 14일

Lead Time (N) ─── involvesStage ──→ (2) Interview Stage
  설명: 두 단계 간의 소요 시간 측정
  예: fromStage=Interview_1st, toStage=Interview_2nd
```

### 관계 다이어그램

```
┌─────────────┐
│  Candidate  │
└──────┬──────┘
       │
       │ measures
       ↓
┌──────────────────┐
│   Lead Time      │
│  (단계별 소요)    │
└──────┬───────────┘
       │
       ├──→ Interview Stage (fromStage)
       ├──→ Interview Stage (toStage)
       └──→ Position
```

---

## 💡 예시 (Examples)

### 예시 1: 정상 속도 (Backend Senior)

```json
[
  {
    "leadTimeID": "LT-2024-001-1",
    "candidateID": "CAND-2024-123",
    "positionID": "POS-BE-SR-001",
    "fromStage": "Applied",
    "toStage": "Screening",
    "startDate": "2024-11-01T10:00:00Z",
    "endDate": "2024-11-04T15:00:00Z",
    "durationDays": 3.2,
    "durationHours": 77,
    "isBottleneck": false,
    "expectedDuration": 3.0,
    "delayDays": 0.2,
    "responsibleParty": "Recruiter",
    "notes": "Resume reviewed promptly"
  },
  {
    "leadTimeID": "LT-2024-001-2",
    "candidateID": "CAND-2024-123",
    "positionID": "POS-BE-SR-001",
    "fromStage": "Screening",
    "toStage": "Interview_1st",
    "startDate": "2024-11-04T15:00:00Z",
    "endDate": "2024-11-10T10:00:00Z",
    "durationDays": 5.8,
    "durationHours": 139,
    "isBottleneck": false,
    "expectedDuration": 5.0,
    "delayDays": 0.8,
    "responsibleParty": "Interviewer",
    "notes": "Scheduled quickly"
  },
  {
    "leadTimeID": "LT-2024-001-3",
    "candidateID": "CAND-2024-123",
    "positionID": "POS-BE-SR-001",
    "fromStage": "Interview_1st",
    "toStage": "Interview_2nd",
    "startDate": "2024-11-10T10:00:00Z",
    "endDate": "2024-11-17T14:00:00Z",
    "durationDays": 7.2,
    "durationHours": 172,
    "isBottleneck": false,
    "expectedDuration": 7.0,
    "delayDays": 0.2,
    "responsibleParty": "Interviewer",
    "notes": "Standard turnaround"
  },
  {
    "leadTimeID": "LT-2024-001-4",
    "candidateID": "CAND-2024-123",
    "positionID": "POS-BE-SR-001",
    "fromStage": "Interview_2nd",
    "toStage": "Offer",
    "startDate": "2024-11-17T14:00:00Z",
    "endDate": "2024-11-20T10:00:00Z",
    "durationDays": 2.8,
    "durationHours": 68,
    "isBottleneck": false,
    "expectedDuration": 3.0,
    "delayDays": -0.2,
    "responsibleParty": "HR",
    "notes": "Quick decision"
  }
]
```

**총 리드타임:** 19일 (Applied → Offer)
**병목 없음**

---

### 예시 2: 병목 발생 (1차→2차 면접)

```json
{
  "leadTimeID": "LT-2024-015-3",
  "candidateID": "CAND-2024-456",
  "positionID": "POS-BE-SR-001",
  "fromStage": "Interview_1st",
  "toStage": "Interview_2nd",
  "startDate": "2024-10-10T10:00:00Z",
  "endDate": "2024-10-28T14:00:00Z",
  "durationDays": 18.2,
  "durationHours": 436,
  "isBottleneck": true,
  "expectedDuration": 7.0,
  "delayDays": 11.2,
  "bottleneckReason": "Interviewer James unavailable for 2 weeks (vacation)",
  "responsibleParty": "Interviewer",
  "notes": "Candidate expressed frustration with long wait"
}
```

**병목 감지:**
- 평균 7일 → 실제 18.2일 (2.6배 지연)
- 원인: 면접관 제임스 휴가 → 대체 면접관 부재
- 후보자 이탈 위험 ⚠️

---

### 예시 3: 전체 채용 여정 시각화

```
Candidate: CAND-2024-123 (김철수 - Backend Senior)

Applied ─[3.2일]→ Screening ─[5.8일]→ Interview_1st ─[7.2일]→ Interview_2nd ─[2.8일]→ Offer
  ✅ 정상          ✅ 정상           ✅ 정상              ✅ 정상

총 리드타임: 19일 (목표: 21일 이내) ✅


Candidate: CAND-2024-456 (Candidate_B - Backend Senior)

Applied ─[2.5일]→ Screening ─[6일]→ Interview_1st ─[18.2일]→ Interview_2nd ─[withdrawn]
  ✅ 정상          ✅ 정상         🚨 병목 (2.6배 지연)     ❌ 후보자 이탈

총 리드타임: 26.7일 (후보자 중도 포기) ❌
병목 원인: 면접관 일정 조율 실패
```

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-01: 리드타임 분석
> "Senior Backend Engineer 채용의 평균 리드타임은? 어느 단계가 병목인가?"

**필요한 데이터:**
- `Lead Time` 전체 레코드 (Applied → Offer)
- `durationDays` (단계별 소요 일수)
- `isBottleneck` (병목 플래그)

**쿼리 로직 1: 전체 평균 리드타임**
```sql
SELECT
  AVG(total_duration) AS avg_total_lead_time,
  MIN(total_duration) AS fastest,
  MAX(total_duration) AS slowest
FROM (
  SELECT
    candidateID,
    SUM(durationDays) AS total_duration
  FROM Lead_Time
  WHERE positionID = 'POS-BE-SR-001'
    AND fromStage = 'Applied'
    AND toStage = 'Offer'
  GROUP BY candidateID
) AS candidate_lead_times;
```

**결과 예시:**
```
평균 리드타임: 22.5일
최단: 15일
최장: 35일
```

**쿼리 로직 2: 단계별 평균 소요 시간**
```sql
SELECT
  CONCAT(fromStage, ' → ', toStage) AS stage_transition,
  AVG(durationDays) AS avg_duration,
  COUNT(*) AS sample_size,
  SUM(CASE WHEN isBottleneck THEN 1 ELSE 0 END) AS bottleneck_count,
  ROUND(SUM(CASE WHEN isBottleneck THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS bottleneck_rate
FROM Lead_Time
WHERE positionID = 'POS-BE-SR-001'
GROUP BY fromStage, toStage
ORDER BY avg_duration DESC;
```

**결과 예시 (병목 단계 발견):**
```
Interview_1st → Interview_2nd:  평균 11.2일 (병목률 35%) 🚨
Screening → Interview_1st:      평균 6.5일  (병목률 15%)
Interview_2nd → Offer:          평균 3.2일  (병목률 5%)
Applied → Screening:            평균 2.8일  (병목률 8%)

→ 프로액티브 제안: "1차→2차 면접 단계가 병목입니다. 면접관 일정 조율 개선 필요"
```

**쿼리 로직 3: 병목 원인 분석**
```sql
SELECT
  bottleneckReason,
  COUNT(*) AS occurrence,
  AVG(durationDays) AS avg_duration,
  AVG(delayDays) AS avg_delay
FROM Lead_Time
WHERE isBottleneck = true
  AND positionID = 'POS-BE-SR-001'
  AND fromStage = 'Interview_1st'
  AND toStage = 'Interview_2nd'
GROUP BY bottleneckReason
ORDER BY occurrence DESC;
```

**결과 예시:**
```
병목 원인 Top 3:
1. Interviewer unavailable (8건, 평균 지연 12일)
2. Candidate schedule conflict (5건, 평균 지연 8일)
3. Holiday period (3건, 평균 지연 10일)

→ 액션: 면접관 풀 확대, 대체 면접관 지정, 후보자 일정 사전 확인
```

---

### DCQ-02: Competency 평가 소요 시간
> "어떤 Competency 평가가 가장 오래 걸리는가?"

**필요한 데이터:**
- `Lead Time` (면접 단계별)
- `Evaluation Record` (면접 소요 시간)
- `Competency Assessment` (평가 항목)

**쿼리 로직:**
```sql
SELECT
  ca.competencyID,
  c.name AS competency_name,
  AVG(er.interviewDuration) AS avg_interview_duration,
  AVG(lt.durationDays) AS avg_stage_duration
FROM Lead_Time lt
JOIN Interview i ON lt.candidateID = i.candidateID
  AND i.stage = lt.toStage
JOIN Evaluation_Record er ON i.interviewID = er.interviewID
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
JOIN Competency c ON ca.competencyID = c.competencyID
WHERE lt.positionID = 'POS-BE-SR-001'
GROUP BY ca.competencyID, c.name
ORDER BY avg_interview_duration DESC;
```

**결과 예시:**
```
System Design:      평균 75분/면접
PostgreSQL:         평균 60분/면접
Communication:      평균 45분/면접
React:              평균 50분/면접

→ 인사이트: "System Design 평가가 가장 오래 걸림. 1차 면접에서 PostgreSQL과 함께 묶으면 2시간 초과 → 후보자 피로도 증가"
```

---

## 📊 병목 감지 알고리즘

### 자동 병목 플래그 설정

```python
def detect_bottleneck(duration_days, position_id, from_stage, to_stage):
    """
    병목 여부 자동 판단

    조건:
    1. 평균 대비 1.5배 이상 소요
    2. 또는 예상 소요 시간 대비 2배 이상
    3. 또는 절대 기준 (1차→2차 면접이 14일 이상)
    """
    # 1. 평균 대비
    avg_duration = get_average_duration(position_id, from_stage, to_stage)
    if duration_days >= avg_duration * 1.5:
        return True, f"평균({avg_duration}일) 대비 {duration_days/avg_duration:.1f}배 지연"

    # 2. 예상 대비
    expected = get_expected_duration(from_stage, to_stage)
    if duration_days >= expected * 2:
        return True, f"예상({expected}일) 대비 {duration_days/expected:.1f}배 지연"

    # 3. 절대 기준
    if from_stage == "Interview_1st" and to_stage == "Interview_2nd":
        if duration_days >= 14:
            return True, f"면접 간 간격이 {duration_days}일 (기준: 14일 초과)"

    return False, None


# 예시 실행
detect_bottleneck(
    duration_days=18.2,
    position_id="POS-BE-SR-001",
    from_stage="Interview_1st",
    to_stage="Interview_2nd"
)
# 결과: (True, "평균(7일) 대비 2.6배 지연")
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **날짜 정확성:**
- `startDate`, `endDate`는 ATS 자동 기록 (수동 입력 금지)
- Greenhouse API: `GET /applications/{id}/activity_feed` → 단계 변경 타임스탬프

✅ **단계 전환 완전성:**
- 모든 Candidate는 Applied → Final Stage까지 Lead Time 기록 완전
- 중간 단계 누락 시 경고 (예: Applied → Interview_1st 사이 Screening 누락)

✅ **durationDays 계산 정확성:**
- 자동 계산: `(endDate - startDate) / 86400` (초 → 일)
- 음수 불가 (startDate > endDate는 데이터 오류)

### High (중요)

⚠️ **병목 원인 기록:**
- `isBottleneck=true`인 경우 `bottleneckReason` 필수 입력
- 구조화된 사유 코드 사용:
  - `INTERVIEWER_UNAVAILABLE`
  - `CANDIDATE_SCHEDULE_CONFLICT`
  - `HOLIDAY_PERIOD`
  - `INTERNAL_APPROVAL_DELAY`

⚠️ **책임 주체 명확화:**
- `responsibleParty` 정확성 (지연 책임 소재 파악)

### Medium (선택적)

💡 **예상 소요 시간 기준:**
- 포지션별/단계별 `expectedDuration` 벤치마크 설정
- 3개월마다 업데이트 (과거 평균 기반)

---

## 📊 V1.5 구현 시 고려사항

### 1. Greenhouse API 연동

**필요한 데이터 소스:**
```
GET /applications/{id}/activity_feed
→ 단계 변경 이벤트 추출

예시 응답:
{
  "events": [
    {"type": "stage_change", "from": "Applied", "to": "Screening", "timestamp": "2024-11-01T10:00:00Z"},
    {"type": "stage_change", "from": "Screening", "to": "Interview_1st", "timestamp": "2024-11-04T15:00:00Z"},
    ...
  ]
}
```

**자동 동기화:**
- 매일 새벽 2시 배치 작업으로 전날 단계 변경 이벤트 수집
- Lead Time 레코드 자동 생성 및 병목 플래그 설정

### 2. 병목 알림 시스템

**실시간 알림:**
- 1차→2차 면접 간격이 10일 초과 시 리크루터에게 Slack 알림
  - "CAND-2024-456의 1차 면접 후 10일 경과. 2차 면접 일정 조율 필요"

**주간 리포트:**
- 매주 월요일 HR 팀에게 지난주 병목 요약 이메일
  - "지난주 3건의 병목 발생 (모두 1차→2차 단계, 평균 지연 12일)"

### 3. 샘플 데이터 수집 (Week 6)

**최소 샘플 사이즈:**
- 포지션당 최소 10명의 후보자 채용 여정
- 각 후보자당 4-6개 Lead Time 레코드

**데이터 소스:**
- Greenhouse Activity Feed
- 수동 보완: 중간 단계 누락 시 리크루터에게 확인

### 4. 시각화 (V1.5 UI)

**대시보드 예시:**
```
Backend Senior Engineer 채용 리드타임 분석 (최근 6개월)

전체 평균: 22.5일 (목표: 21일) ⚠️

단계별 소요:
├─ Applied → Screening:        2.8일 ✅
├─ Screening → Interview_1st:   6.5일 ✅
├─ Interview_1st → Interview_2nd: 11.2일 🚨 (병목!)
└─ Interview_2nd → Offer:       3.2일 ✅

병목 원인:
1. Interviewer unavailable (35%)
2. Candidate schedule conflict (25%)
3. Holiday period (15%)

💡 제안: 면접관 풀 확대, 대체 면접관 2명 지정
```

---

## 🚨 Week 5 검증 체크리스트

### 보리와의 검토 (Day 5)

- [ ] **병목 감지 기준 합의**
  - 평균 대비 1.5배 vs 2배?
  - 절대 기준 (예: 1차→2차 14일) 적절한가?

- [ ] **Greenhouse 데이터 접근성**
  - Activity Feed API 사용 가능 여부
  - 과거 6개월 데이터 품질 확인 (날짜 누락률)

- [ ] **병목 원인 분류 체계**
  - 보리가 사용하기 편한 사유 코드 정의
  - Interviewer/Candidate/Holiday/Internal 외 추가 필요?

- [ ] **알림 설정**
  - 실시간 Slack 알림 필요 여부
  - 누구에게? (리크루터 vs HR 팀 vs 면접관)

---

## 🔗 관련 개념

- [C-008 Candidate](./c-008-candidate.md) - 리드타임 측정 대상
- [C-010 Interview Stage](./c-010-interview-stage.md) - 단계 정의
- [C-012 Interview](./c-012-interview.md) - 면접 이벤트
- [C-009 Application](./c-009-application.md) - 지원 시작점

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-01: 리드타임 분석](../../01-specification/competency-questions.md#dcq-01)
- [DCQ-02: Competency 평가 시간](../../01-specification/competency-questions.md#dcq-02)

---

**다음 개념:** [C-010 Interview Stage](./c-010-interview-stage.md)
**이전 개념:** [C-013 Evaluation Record](./c-013-evaluation-record.md)

---

## 📝 Week 5 Day 1-2 완료 체크

- [x] C-011 Lead Time 개념 정의 완료
- [x] 필수/선택 속성 리스트 작성
- [x] 관계 다이어그램 작성
- [x] 예시 3건 (정상/병목/이탈) 작성
- [x] DCQ 2개 (DCQ-01, DCQ-02) 쿼리 로직 작성
- [x] 병목 감지 알고리즘 설계
- [ ] 보리 검토 요청 (Day 2 종료 후)

---

**Week 5 Day 1-2 (P0 개념 4개) 완료!** ✅

다음 작업: Week 5 Day 3-4 (P0 개념 2개 + P1 개념 2개)
