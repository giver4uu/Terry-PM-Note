# C-012: Interview (면접 이벤트)

**작성일:** 2025-11-27
**우선순위:** P0 (Critical)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-02, DCQ-04

---

## 📋 정의 (Definition)

특정 날짜와 시간에 후보자와 면접관(들) 간에 발생한 면접 이벤트를 나타내는 개념입니다. 하나의 면접에서 여러 명의 면접관이 참여할 수 있으며, 각 면접관은 독립적인 Evaluation Record를 생성합니다.

**핵심 가치:**
- 면접 일정 및 진행 기록 관리
- 면접관별 평가 데이터 수집의 기준점
- 온라인/오프라인 면접 효과 분석
- 면접 소요 시간 최적화 인사이트

**V1.5의 차별화:**
- Greenhouse는 면접 일정만 기록
- 우리 시스템: **면접 이벤트 + 소요 시간 + 형식(온라인/오프라인) + 면접관 패턴 연결**

**실무 임팩트:**
- 현재 문제: "어떤 면접이 오래 걸리는지, 온라인이 나은지 오프라인이 나은지 몰라요"
- V1.5 해결: "System Design 평가가 포함된 면접은 평균 75분 소요, 온라인 면접이 10분 더 짧음"

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **interviewID** | string | 면접 이벤트 고유 식별자 | `INT-2024-001` |
| **candidateID** | string | 면접 대상 후보자 | `CAND-2024-123` |
| **stageID** | string | 소속 전형 단계 | `STAGE-BE-SR-002` (1차 기술 면접) |
| **interviewDate** | datetime | 면접 시작 시각 | `2024-11-10T14:00:00Z` |
| **scheduledDuration** | integer | 예정 면접 시간 (분) | `60` |
| **format** | enum | 면접 형식 | `In-Person`, `Video`, `Phone` |
| **status** | enum | 면접 상태 | `Scheduled`, `Completed`, `Cancelled`, `No-Show` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **actualDuration** | integer | 실제 소요 시간 (분) | `68` (예정 60분보다 8분 초과) |
| **endTime** | datetime | 면접 종료 시각 | `2024-11-10T15:08:00Z` |
| **location** | string | 면접 장소/링크 | `Zoom: https://zoom.us/j/123456` 또는 `본사 3층 회의실 A` |
| **interviewers** | array[string] | 참여 면접관 목록 | `["james@company.com", "sarah@company.com"]` |
| **interviewerCount** | integer | 면접관 수 (자동 계산) | `2` |
| **platform** | string | 화상 면접 플랫폼 | `Zoom`, `Google Meet`, `Microsoft Teams` |
| **recordingUrl** | url | 면접 녹화 링크 (선택) | `https://storage/interviews/int-001.mp4` |
| **attendanceStatus** | object | 참석 현황 | `{"candidate": "attended", "interviewers": ["attended", "attended"]}` |
| **technicalIssues** | boolean | 기술적 문제 발생 여부 | `false` |
| **notes** | text | 추가 메모 | `Candidate was 5 minutes late due to traffic` |

---

## 🔗 관계 (Relationships)

### N:1 관계

```
Interview (N) ─── involves ──→ (1) Candidate
  설명: 한 후보자는 여러 면접에 참여 (1차, 2차, 최종)
  예: 김철수가 1차 면접, 2차 면접, 최종 면접 총 3회

Interview (N) ─── belongsToStage ──→ (1) Interview Stage
  설명: 각 면접은 특정 전형 단계에 속함
  예: INT-001은 "1차 기술 면접" Stage에 속함

Interview (N) ─── forPosition ──→ (1) Position
  설명: 면접은 특정 포지션에 대한 것
  예: Backend Senior 포지션 면접
```

### 1:N 관계

```
Interview (1) ─── produces ──→ (N) Evaluation Record
  설명: 하나의 면접에서 면접관 수만큼 평가 기록 생성
  예: 면접관 2명 참여 → 2개 Evaluation Record

Interview (1) ─── conductedBy ──→ (N) Interviewer
  설명: 여러 명의 면접관이 참여 가능
  예: 제임스, 사라가 공동 면접
```

### 관계 다이어그램

```
┌──────────────┐
│  Candidate   │
└──────┬───────┘
       │ involves
       ↓
┌──────────────────┐
│    Interview     │
│  (면접 이벤트)    │
└──────┬───────────┘
       │
       ├─→ belongsToStage (Interview Stage)
       ├─→ forPosition (Position)
       ├─→ produces (N개 Evaluation Record)
       └─→ conductedBy (N명 Interviewer)

예시:
Interview INT-001
  ├─ Candidate: CAND-123 (김철수)
  ├─ Stage: 1차 기술 면접
  ├─ Interviewers: [제임스, 사라]
  └─ Produces:
       ├─ Evaluation Record ER-001 (by 제임스)
       └─ Evaluation Record ER-002 (by 사라)
```

---

## 💡 예시 (Examples)

### 예시 1: 1차 기술 면접 (비디오, 2명 면접관)

```json
{
  "interviewID": "INT-2024-001",
  "candidateID": "CAND-2024-123",
  "stageID": "STAGE-BE-SR-002",
  "interviewDate": "2024-11-10T14:00:00Z",
  "scheduledDuration": 60,
  "actualDuration": 68,
  "endTime": "2024-11-10T15:08:00Z",
  "format": "Video",
  "platform": "Zoom",
  "location": "https://zoom.us/j/123456789",
  "status": "Completed",
  "interviewers": ["james@company.com", "sarah@company.com"],
  "interviewerCount": 2,
  "attendanceStatus": {
    "candidate": "attended",
    "interviewers": ["attended", "attended"]
  },
  "technicalIssues": false,
  "recordingUrl": "https://storage/interviews/int-2024-001.mp4",
  "notes": "Smooth interview, candidate was well-prepared"
}
```

**생성되는 Evaluation Records:**
- ER-2024-001: 제임스의 평가 (PostgreSQL 4.5, Python 4.0, Communication 4.2)
- ER-2024-002: 사라의 평가 (PostgreSQL 4.0, Python 3.8, Communication 3.5)

**인사이트:**
- 예정 60분 → 실제 68분 (8분 초과)
- 이유: System Design 질문이 예상보다 깊게 진행됨

---

### 예시 2: 2차 컬처핏 면접 (대면, 2명 면접관)

```json
{
  "interviewID": "INT-2024-002",
  "candidateID": "CAND-2024-123",
  "stageID": "STAGE-BE-SR-003",
  "interviewDate": "2024-11-17T10:00:00Z",
  "scheduledDuration": 45,
  "actualDuration": 50,
  "endTime": "2024-11-17T10:50:00Z",
  "format": "In-Person",
  "location": "본사 3층 회의실 A",
  "status": "Completed",
  "interviewers": ["hr.lead@company.com", "product.manager@company.com"],
  "interviewerCount": 2,
  "attendanceStatus": {
    "candidate": "attended",
    "interviewers": ["attended", "attended"]
  },
  "technicalIssues": false,
  "notes": "Candidate showed strong cultural fit, asked insightful questions about team dynamics"
}
```

**생성되는 Evaluation Records:**
- ER-2024-010: HR Lead 평가 (Communication 4.5, Team Collaboration 4.2)
- ER-2024-011: PM 평가 (Communication 4.0, Team Collaboration 4.5)

---

### 예시 3: 전화 스크리닝 (1명 면접관, 짧은 면접)

```json
{
  "interviewID": "INT-2024-050",
  "candidateID": "CAND-2024-456",
  "stageID": "STAGE-PM-002",
  "interviewDate": "2024-10-15T16:00:00Z",
  "scheduledDuration": 30,
  "actualDuration": 25,
  "endTime": "2024-10-15T16:25:00Z",
  "format": "Phone",
  "status": "Completed",
  "interviewers": ["recruiter@company.com"],
  "interviewerCount": 1,
  "attendanceStatus": {
    "candidate": "attended",
    "interviewers": ["attended"]
  },
  "notes": "Quick screening, candidate has relevant PM experience"
}
```

**생성되는 Evaluation Records:**
- ER-2024-050: Recruiter 평가 (Product Sense 3.5, Communication 4.0)

**인사이트:**
- 전화 스크리닝은 예정보다 5분 짧게 진행 (효율적)

---

### 예시 4: 면접 취소 (No-Show)

```json
{
  "interviewID": "INT-2024-099",
  "candidateID": "CAND-2024-789",
  "stageID": "STAGE-BE-SR-002",
  "interviewDate": "2024-11-05T14:00:00Z",
  "scheduledDuration": 60,
  "format": "Video",
  "platform": "Zoom",
  "location": "https://zoom.us/j/987654321",
  "status": "No-Show",
  "interviewers": ["james@company.com", "sarah@company.com"],
  "interviewerCount": 2,
  "attendanceStatus": {
    "candidate": "no-show",
    "interviewers": ["attended", "attended"]
  },
  "notes": "Candidate did not attend, did not respond to reminder emails"
}
```

**결과:**
- Evaluation Record 생성 안 됨 (면접 진행 안 됨)
- Hiring Decision: "Withdrawn" (후보자 이탈)

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-02: Competency 평가 소요 시간
> "어떤 Competency 평가가 가장 오래 걸리는가?"

**필요한 데이터:**
- `Interview.actualDuration` (실제 면접 시간)
- `Interview Stage.evaluationFocus` (단계별 평가 중점 역량)
- `Evaluation Record` (평가 기록)

**쿼리 로직:**
```sql
SELECT
  ist.stageName,
  ist.evaluationFocus,
  AVG(i.actualDuration) AS avg_duration,
  AVG(i.scheduledDuration) AS expected_duration,
  AVG(i.actualDuration - i.scheduledDuration) AS avg_overrun,
  COUNT(*) AS interview_count
FROM Interview i
JOIN Interview_Stage ist ON i.stageID = ist.stageID
WHERE i.status = 'Completed'
  AND i.format IN ('Video', 'In-Person')
  AND ist.positionID = 'POS-BE-SR-001'
GROUP BY ist.stageID, ist.stageName, ist.evaluationFocus
ORDER BY avg_duration DESC;
```

**결과 예시:**
```
1차 기술 면접 (PostgreSQL, Python, System Design):
  - 평균 실제: 68분
  - 예정: 60분
  - 초과: +8분
  - 샘플: 15건

2차 컬처핏 (Communication, Team Collaboration):
  - 평균 실제: 48분
  - 예정: 45분
  - 초과: +3분
  - 샘플: 12건

→ 인사이트: "System Design 평가가 시간 초과의 주 원인"
```

**세부 분석:**
```sql
-- 어떤 Competency 때문에 시간 초과?
SELECT
  ca.competencyID,
  c.name AS competency_name,
  AVG(i.actualDuration - i.scheduledDuration) AS avg_overrun
FROM Interview i
JOIN Evaluation_Record er ON i.interviewID = er.interviewID
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
JOIN Competency c ON ca.competencyID = c.competencyID
WHERE i.actualDuration > i.scheduledDuration
GROUP BY ca.competencyID, c.name
ORDER BY avg_overrun DESC;
```

**결과:**
```
System Design:    평균 +12분 초과
PostgreSQL:       평균 +5분 초과
Communication:    평균 +2분 초과

→ 액션: System Design 평가 시간을 60분 → 75분으로 조정
```

---

### DCQ-04: 면접관 패턴 분석 (보조)
> "면접관 제임스는 Communication 평가 시 얼마나 엄격한가?"

**필요한 데이터:**
- `Interview.interviewers` (면접관 목록)
- `Evaluation Record` (면접관별 평가)

**쿼리 로직:**
```sql
-- 면접관별 평균 면접 시간
SELECT
  interviewer,
  COUNT(*) AS total_interviews,
  AVG(actualDuration) AS avg_duration,
  SUM(CASE WHEN actualDuration > scheduledDuration THEN 1 ELSE 0 END) AS overrun_count
FROM Interview i,
     UNNEST(i.interviewers) AS interviewer
WHERE i.status = 'Completed'
GROUP BY interviewer
ORDER BY avg_duration DESC;
```

**결과 예시:**
```
제임스 (james@company.com):
  - 총 면접: 20건
  - 평균 시간: 72분
  - 시간 초과: 15건 (75%)

사라 (sarah@company.com):
  - 총 면접: 18건
  - 평균 시간: 58분
  - 시간 초과: 5건 (28%)

→ 인사이트: "제임스는 면접을 더 깊게 진행하는 경향 (평균 +14분)"
```

---

## 📊 면접 형식별 분석

### 온라인 vs 오프라인 비교

**쿼리:**
```sql
SELECT
  format,
  COUNT(*) AS interview_count,
  AVG(actualDuration) AS avg_duration,
  AVG(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completion_rate,
  AVG(CASE WHEN technicalIssues THEN 1 ELSE 0 END) AS tech_issue_rate
FROM Interview
WHERE status IN ('Completed', 'Cancelled')
GROUP BY format;
```

**결과 예시:**
```
Video (온라인):
  - 면접 수: 45건
  - 평균 시간: 62분
  - 완료율: 95%
  - 기술 문제: 8%

In-Person (대면):
  - 면접 수: 30건
  - 평균 시간: 72분
  - 완료율: 98%
  - 기술 문제: 0%

Phone (전화):
  - 면접 수: 20건
  - 평균 시간: 28분
  - 완료율: 92%
  - 기술 문제: 2%

→ 인사이트:
  - 온라인 면접이 대면보다 10분 짧음 (효율적)
  - 기술 문제는 8%로 낮은 편 (Zoom 안정적)
  - 전화 스크리닝은 빠르고 효율적 (28분)
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **interviewDate 정확성:**
- 면접 시작 시각은 과거여야 함 (미래 날짜 불가)
- ATS 자동 기록 또는 수동 입력 검증

✅ **Evaluation Record 생성 완전성:**
- status='Completed'인 면접은 최소 1개 이상의 Evaluation Record 보유
- interviewers 수 = Evaluation Record 수 (면접관 전원 평가 작성)

✅ **actualDuration 합리성:**
- actualDuration > 0 (음수 불가)
- actualDuration ≤ scheduledDuration * 2 (2배 초과 시 경고)

### High (중요)

⚠️ **면접관 목록 정확성:**
- interviewers 배열의 모든 이메일은 실제 Interviewer 테이블에 존재
- interviewerCount = interviewers.length (자동 계산 일치)

⚠️ **형식별 적절성:**
- format='Video'인 경우 platform 필수
- format='In-Person'인 경우 location (회의실) 필수

⚠️ **No-Show 처리:**
- status='No-Show'인 경우 Evaluation Record 생성 금지
- attendanceStatus.candidate='no-show' 명시

### Medium (선택적)

💡 **녹화 파일 보관:**
- recordingUrl 유효성 (링크 접근 가능)
- 법적 요구사항 준수 (후보자 동의)

---

## 📊 V1.5 구현 시 고려사항

### 1. Greenhouse API 연동

**면접 일정 가져오기:**
```javascript
// Greenhouse API
GET /interviews/{id}

// 응답 예시
{
  "id": 123456,
  "application_id": 789012,
  "scheduled_at": "2024-11-10T14:00:00Z",
  "ends_at": "2024-11-10T15:00:00Z",
  "interview_kit": {
    "name": "1차 기술 면접"
  },
  "interviewers": [
    {"name": "James Kim", "email": "james@company.com"},
    {"name": "Sarah Lee", "email": "sarah@company.com"}
  ]
}

// 우리 시스템으로 변환
{
  "interviewID": "INT-GH-123456",
  "candidateID": getCandidateByApplicationID(789012),
  "stageID": mapStageByKitName("1차 기술 면접"),
  "interviewDate": "2024-11-10T14:00:00Z",
  "scheduledDuration": 60,
  "format": "Video", // 수동 설정 또는 기본값
  "interviewers": ["james@company.com", "sarah@company.com"],
  "status": "Scheduled"
}
```

**문제점:**
- Greenhouse는 actualDuration을 자동 기록하지 않음 → 수동 입력 필요
- format (Video/In-Person) 정보 없음 → 수동 설정

---

### 2. 면접 시간 초과 알림

**실시간 알림:**
```javascript
// 면접 종료 후 자동 체크
if (interview.actualDuration > interview.scheduledDuration * 1.2) {
  // 20% 이상 초과 시 알림
  sendSlackNotification({
    channel: "#recruiting",
    message: `⚠️ Interview ${interview.interviewID} 시간 초과: ${interview.actualDuration}분 (예정: ${interview.scheduledDuration}분)`
  });
}
```

---

### 3. 면접 형식 최적화 인사이트

**대시보드 예시:**
```
Backend Senior 면접 형식 비교 (최근 6개월)

Video (온라인):
  - 평균 시간: 62분 ✅
  - 완료율: 95%
  - 후보자 만족도: 4.2/5

In-Person (대면):
  - 평균 시간: 72분
  - 완료율: 98%
  - 후보자 만족도: 4.5/5

💡 제안:
  - 1차 기술 면접은 온라인 추천 (시간 효율)
  - 최종 면접은 대면 추천 (만족도 높음)
```

---

### 4. 샘플 데이터 수집 (Week 6)

**최소 샘플 사이즈:**
- 포지션당 최소 **20개 Interview 이벤트**
- 각 형식별 최소 5건 (Video, In-Person, Phone)

**데이터 소스:**
- Greenhouse Interviews API
- 수동 보완: actualDuration, format, platform

---

## 🚨 Week 5 검증 체크리스트

### 보리와의 검토 (Day 5)

- [ ] **면접 형식 분류**
  - Video, In-Person, Phone 구분이 명확한가?
  - 다른 형식 추가 필요? (예: Hybrid)

- [ ] **actualDuration 수집 방법**
  - Greenhouse에서 자동으로 가져올 수 있나?
  - 수동 입력이 필요하면 누가 담당?

- [ ] **면접관 목록 정확성**
  - Greenhouse interviewers 데이터 신뢰도는?
  - 면접관 변경 시 업데이트 프로세스는?

- [ ] **No-Show 처리 방식**
  - 후보자 이탈 케이스 얼마나 많은가?
  - status='No-Show' 외 다른 상태 필요?

---

## 🔗 관련 개념

- [C-008 Candidate](./c-008-candidate.md) - 면접 대상
- [C-010 Interview Stage](./c-010-interview-stage.md) - 면접이 속한 단계
- [C-013 Evaluation Record](./c-013-evaluation-record.md) - 면접에서 생성되는 평가
- [C-015 Interviewer](./c-015-interviewer.md) - 면접 진행자

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-02: Competency 평가 시간](../../01-specification/competency-questions.md#dcq-02)
- [DCQ-04: 면접관 패턴](../../01-specification/competency-questions.md#dcq-04)

---

**다음 개념:** [C-014 Competency Assessment](./c-014-competency-assessment.md)
**이전 개념:** [C-010 Interview Stage](./c-010-interview-stage.md)

---

## 📝 Week 5 Day 3 체크

- [x] C-012 Interview 개념 정의 완료
- [x] 필수/선택 속성 리스트 작성
- [x] 관계 다이어그램 작성
- [x] 예시 4건 (Video, In-Person, Phone, No-Show) 작성
- [x] DCQ 2개 (DCQ-02, DCQ-04) 쿼리 로직 작성
- [x] 온라인/오프라인 면접 비교 분석
- [ ] 보리 검토 요청 (Day 3 종료 후)

---

**Week 5 Day 3 완료!** ✅

다음 작업: Week 5 Day 4 (C-014, C-009, C-015)
