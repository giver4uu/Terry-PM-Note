# C-010: Interview Stage (전형 단계)

**작성일:** 2025-11-27
**우선순위:** P0 (Critical)
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-01, DCQ-02

---

## 📋 정의 (Definition)

채용 프로세스의 각 단계를 정의하는 개념입니다. 각 포지션마다 커스텀 단계를 설정할 수 있으며, Lead Time 측정 및 병목 분석의 기준이 됩니다.

**핵심 가치:**
- 포지션별 채용 프로세스 표준화
- 단계별 리드타임 측정 기준 제공
- 단계별 통과율 자동 계산
- 프로세스 최적화 인사이트 도출

**V1.5의 차별화:**
- Greenhouse는 고정 단계 (Applied → Screening → Interview → Offer)
- 우리 시스템: **포지션별 커스텀 단계 + 단계별 통과율/소요 시간 자동 분석**

**실무 임팩트 (보리 인터뷰 기반):**
- 현재 문제: "1차 면접과 2차 면접 사이가 왜 이렇게 느린지 몰랐어요"
- V1.5 해결: "1차→2차 단계가 평균 11.2일 소요, 병목률 35% → 면접관 일정 조율 개선 필요"

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **stageID** | string | 단계 고유 식별자 | `STAGE-001` |
| **positionID** | string | 소속 포지션 | `POS-BE-SR-001` |
| **stageName** | string | 단계 이름 | `1차 기술 면접`, `2차 컬처핏 면접` |
| **stageOrder** | integer | 단계 순서 (1부터 시작) | `1`, `2`, `3` |
| **stageType** | enum | 단계 유형 | `Screening`, `Phone_Screen`, `Technical_Interview`, `Behavioral_Interview`, `Assignment`, `Final_Interview`, `Offer` |
| **isActive** | boolean | 현재 사용 중 여부 | `true` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **description** | text | 단계 설명 | `후보자의 기술 역량을 평가하는 1차 면접` |
| **expectedDuration** | integer | 예상 소요 시간 (분) | `60` (면접 자체 시간) |
| **expectedLeadTime** | float | 예상 리드타임 (일) | `7.0` (이전 단계→이 단계) |
| **requiredInterviewers** | integer | 필요 면접관 수 | `2` |
| **evaluationFocus** | array[string] | 평가 중점 역량 | `["PostgreSQL", "System Design", "Communication"]` |
| **format** | enum | 진행 방식 | `In-Person`, `Video`, `Phone`, `Asynchronous` (과제) |
| **isMandatory** | boolean | 필수 단계 여부 | `true` |
| **canSkip** | boolean | 건너뛰기 가능 여부 | `false` |
| **notes** | text | 추가 메모 | `Backend 팀 리드가 반드시 참여해야 함` |

---

## 🔗 관계 (Relationships)

### N:1 관계

```
Interview Stage (N) ─── belongsTo ──→ (1) Position
  설명: 각 포지션마다 고유한 채용 프로세스 단계 정의
  예: Backend Senior는 4단계, Junior는 3단계

Interview Stage (N) ─── precedes ──→ (1) Interview Stage
  설명: 단계 간 순서 관계 (다음 단계 참조)
  예: "1차 면접" precedes "2차 면접"
```

### 1:N 관계

```
Interview Stage (1) ─── hosts ──→ (N) Interview
  설명: 각 단계에서 여러 면접 이벤트 발생
  예: "1차 기술 면접" 단계에서 10명의 후보자가 각각 면접

Interview Stage (1) ─── measuredBy ──→ (N) Lead Time
  설명: Lead Time에서 fromStage/toStage로 참조
  예: Lead Time "1차→2차" 측정
```

### 관계 다이어그램

```
┌──────────────┐
│   Position   │
└──────┬───────┘
       │ belongsTo
       ↓
┌───────────────────┐
│ Interview Stage   │
│  (stageOrder별)   │
└───────┬───────────┘
        │
        ├─→ precedes (다음 단계)
        ├─→ hosts (Interview)
        └─→ measuredBy (Lead Time)

단계 순서 예시:
Stage 1: Screening
   ↓ precedes
Stage 2: 1차 Technical Interview
   ↓ precedes
Stage 3: 2차 Behavioral Interview
   ↓ precedes
Stage 4: Final Interview
   ↓ precedes
Stage 5: Offer
```

---

## 💡 예시 (Examples)

### 예시 1: Backend Senior Engineer 채용 프로세스 (4단계)

```json
[
  {
    "stageID": "STAGE-BE-SR-001",
    "positionID": "POS-BE-SR-001",
    "stageName": "서류 심사",
    "stageOrder": 1,
    "stageType": "Screening",
    "isActive": true,
    "description": "이력서 및 포트폴리오 검토",
    "expectedDuration": 0,
    "expectedLeadTime": 3.0,
    "requiredInterviewers": 1,
    "evaluationFocus": [],
    "format": "Asynchronous",
    "isMandatory": true,
    "canSkip": false,
    "notes": "리크루터가 1차 검토 후 엔지니어링 매니저 확인"
  },
  {
    "stageID": "STAGE-BE-SR-002",
    "positionID": "POS-BE-SR-001",
    "stageName": "1차 기술 면접",
    "stageOrder": 2,
    "stageType": "Technical_Interview",
    "isActive": true,
    "description": "PostgreSQL, Python 등 기술 역량 평가",
    "expectedDuration": 60,
    "expectedLeadTime": 7.0,
    "requiredInterviewers": 2,
    "evaluationFocus": ["PostgreSQL", "Python", "RESTful API", "System Design"],
    "format": "Video",
    "isMandatory": true,
    "canSkip": false,
    "notes": "Backend 팀 리드 또는 시니어 엔지니어 2명 참여"
  },
  {
    "stageID": "STAGE-BE-SR-003",
    "positionID": "POS-BE-SR-001",
    "stageName": "2차 컬처핏 면접",
    "stageOrder": 3,
    "stageType": "Behavioral_Interview",
    "isActive": true,
    "description": "Communication, Team Collaboration, Cultural Fit 평가",
    "expectedDuration": 45,
    "expectedLeadTime": 7.0,
    "requiredInterviewers": 2,
    "evaluationFocus": ["Communication", "Team Collaboration", "Problem Solving"],
    "format": "Video",
    "isMandatory": true,
    "canSkip": false,
    "notes": "HR + 타팀 매니저 (크로스 체크)"
  },
  {
    "stageID": "STAGE-BE-SR-004",
    "positionID": "POS-BE-SR-001",
    "stageName": "최종 오퍼",
    "stageOrder": 4,
    "stageType": "Offer",
    "isActive": true,
    "description": "연봉 협상 및 오퍼 제시",
    "expectedDuration": 0,
    "expectedLeadTime": 3.0,
    "requiredInterviewers": 0,
    "evaluationFocus": [],
    "format": "Asynchronous",
    "isMandatory": true,
    "canSkip": false,
    "notes": "HR이 오퍼 레터 발송"
  }
]
```

**프로세스 흐름:**
```
서류 심사 (3일)
   ↓
1차 기술 면접 (7일, 60분)
   ↓
2차 컬처핏 면접 (7일, 45분)
   ↓
최종 오퍼 (3일)

총 예상 리드타임: 20일
```

---

### 예시 2: Product Manager 채용 프로세스 (5단계, 과제 포함)

```json
[
  {
    "stageID": "STAGE-PM-001",
    "positionID": "POS-PM-001",
    "stageName": "서류 심사",
    "stageOrder": 1,
    "stageType": "Screening",
    "isActive": true,
    "expectedLeadTime": 2.0,
    "isMandatory": true
  },
  {
    "stageID": "STAGE-PM-002",
    "positionID": "POS-PM-001",
    "stageName": "전화 스크리닝",
    "stageOrder": 2,
    "stageType": "Phone_Screen",
    "isActive": true,
    "description": "PM 경험 및 동기 확인 (30분)",
    "expectedDuration": 30,
    "expectedLeadTime": 5.0,
    "requiredInterviewers": 1,
    "evaluationFocus": ["Product Sense", "Communication"],
    "format": "Phone",
    "isMandatory": true
  },
  {
    "stageID": "STAGE-PM-003",
    "positionID": "POS-PM-001",
    "stageName": "Product Case Study (과제)",
    "stageOrder": 3,
    "stageType": "Assignment",
    "isActive": true,
    "description": "신규 기능 PRD 작성 과제 (48시간)",
    "expectedDuration": 0,
    "expectedLeadTime": 7.0,
    "requiredInterviewers": 0,
    "evaluationFocus": ["Product Strategy", "User Research", "Documentation"],
    "format": "Asynchronous",
    "isMandatory": true,
    "notes": "제출 후 2일 내 검토"
  },
  {
    "stageID": "STAGE-PM-004",
    "positionID": "POS-PM-001",
    "stageName": "Case Study 발표 및 토론",
    "stageOrder": 4,
    "stageType": "Technical_Interview",
    "isActive": true,
    "description": "과제 발표 + 질의응답 (90분)",
    "expectedDuration": 90,
    "expectedLeadTime": 5.0,
    "requiredInterviewers": 3,
    "evaluationFocus": ["Product Strategy", "Communication", "Critical Thinking"],
    "format": "Video",
    "isMandatory": true,
    "notes": "CEO, CTO, Design Lead 참여"
  },
  {
    "stageID": "STAGE-PM-005",
    "positionID": "POS-PM-001",
    "stageName": "최종 오퍼",
    "stageOrder": 5,
    "stageType": "Offer",
    "isActive": true,
    "expectedLeadTime": 3.0,
    "isMandatory": true
  }
]
```

**차이점 (Backend vs PM):**
- PM은 5단계 (Backend 4단계)
- PM은 과제 단계 포함 (Backend는 없음)
- PM 최종 면접은 90분 (Backend 45분)

---

### 예시 3: Junior Developer 채용 프로세스 (간소화 3단계)

```json
[
  {
    "stageID": "STAGE-JR-001",
    "positionID": "POS-JR-DEV-001",
    "stageName": "서류 심사",
    "stageOrder": 1,
    "stageType": "Screening",
    "expectedLeadTime": 2.0
  },
  {
    "stageID": "STAGE-JR-002",
    "positionID": "POS-JR-DEV-001",
    "stageName": "1차 기술 + 컬처핏 통합 면접",
    "stageOrder": 2,
    "stageType": "Technical_Interview",
    "isActive": true,
    "description": "기술 + 성장 가능성 종합 평가 (60분)",
    "expectedDuration": 60,
    "expectedLeadTime": 5.0,
    "requiredInterviewers": 2,
    "evaluationFocus": ["PostgreSQL", "Communication", "Learning Ability"],
    "format": "Video",
    "isMandatory": true,
    "canSkip": false,
    "notes": "Junior는 2차 면접 생략, 1차에서 통합 평가"
  },
  {
    "stageID": "STAGE-JR-003",
    "positionID": "POS-JR-DEV-001",
    "stageName": "최종 오퍼",
    "stageOrder": 3,
    "stageType": "Offer",
    "expectedLeadTime": 2.0
  }
]
```

**인사이트:**
- Junior는 3단계 (Senior 4단계, PM 5단계)
- 총 예상 리드타임: 9일 (Senior 20일, PM 22일)
- 단계 간소화로 빠른 채용 가능

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

### DCQ-01: 리드타임 분석 (단계별 분해)
> "Senior Backend Engineer 채용의 평균 리드타임은? 어느 단계가 병목인가?"

**필요한 데이터:**
- `Interview Stage` (단계 정의)
- `Lead Time` (단계별 소요 시간)

**쿼리 로직:**
```sql
SELECT
  CONCAT(lt.fromStage, ' → ', lt.toStage) AS stage_transition,
  ist_from.stageName AS from_stage_name,
  ist_to.stageName AS to_stage_name,
  AVG(lt.durationDays) AS avg_duration,
  COUNT(*) AS sample_size,
  SUM(CASE WHEN lt.isBottleneck THEN 1 ELSE 0 END) AS bottleneck_count
FROM Lead_Time lt
JOIN Interview_Stage ist_from ON lt.fromStage = ist_from.stageID
JOIN Interview_Stage ist_to ON lt.toStage = ist_to.stageID
WHERE lt.positionID = 'POS-BE-SR-001'
GROUP BY lt.fromStage, lt.toStage, ist_from.stageName, ist_to.stageName
ORDER BY ist_from.stageOrder;
```

**결과 예시:**
```
서류 심사 → 1차 기술 면접:     평균 5.8일 (병목 10%)
1차 기술 면접 → 2차 컬처핏:    평균 11.2일 (병목 35%) 🚨
2차 컬처핏 → 최종 오퍼:        평균 3.2일 (병목 5%)

→ "1차→2차" 단계가 병목입니다 (expectedLeadTime 7일 vs 실제 11.2일)
```

---

### DCQ-02: Competency 평가 소요 시간
> "어떤 Competency 평가가 가장 오래 걸리는가?"

**필요한 데이터:**
- `Interview Stage.evaluationFocus` (단계별 평가 중점 역량)
- `Interview.duration` (실제 면접 시간)
- `Competency Assessment` (역량별 평가)

**쿼리 로직:**
```sql
SELECT
  ist.stageName,
  ist.evaluationFocus,
  AVG(i.duration) AS avg_interview_duration,
  COUNT(DISTINCT i.interviewID) AS interview_count
FROM Interview_Stage ist
JOIN Interview i ON i.stageID = ist.stageID
WHERE ist.positionID = 'POS-BE-SR-001'
GROUP BY ist.stageID, ist.stageName, ist.evaluationFocus
ORDER BY avg_interview_duration DESC;
```

**결과 예시:**
```
1차 기술 면접 (PostgreSQL, Python, System Design):  평균 68분
2차 컬처핏 (Communication, Team Collaboration):     평균 48분

→ 인사이트: "System Design 평가가 예상(60분)보다 8분 더 소요"
```

---

## 📊 포지션별 Stage 커스터마이징

### Backend Developer (레벨별)

| 레벨 | 단계 수 | 특징 | 총 예상 리드타임 |
|------|--------|------|----------------|
| Junior | 3단계 | 통합 면접 (기술+컬처핏) | 9일 |
| Mid | 4단계 | 기술 면접 강화 | 18일 |
| Senior | 4단계 | 컬처핏 면접 추가 | 20일 |
| Lead | 5단계 | 최종 CEO 면접 추가 | 25일 |

**차별화 포인트:**
- 레벨이 높을수록 단계 증가 → 신중한 평가
- 각 레벨별 최적화된 프로세스

---

### 직군별 Stage 차이

| 직군 | 고유 단계 | 특징 |
|------|----------|------|
| Backend Engineer | 1차 기술 면접 | PostgreSQL, System Design 중점 |
| Frontend Engineer | 1차 기술 면접 + 과제 | React 과제 제출 |
| Product Manager | Case Study 과제 + 발표 | PRD 작성 능력 평가 |
| Designer | 포트폴리오 리뷰 + 과제 | 디자인 과제 48시간 |

**인사이트:**
- 직군마다 평가 방식이 다름 → 커스텀 Stage 필수
- 과제 단계 포함 여부가 리드타임에 큰 영향 (+7일)

---

## 🔍 데이터 품질 요구사항

### Critical (필수)

✅ **stageOrder 일관성:**
- 같은 Position 내에서 stageOrder 중복 불가
- 순서는 1부터 연속적으로 증가 (1, 2, 3, ...)
- 누락된 순서 없어야 함 (1, 2, 4 ❌ → 1, 2, 3 ✅)

✅ **precedes 관계 정확성:**
- Stage N의 다음 단계는 항상 Stage N+1
- 순환 참조 불가 (Stage A → B → C → A ❌)

✅ **Position별 고유성:**
- 같은 Position 내에서 stageName 중복 불가
- stageID는 전역 고유

### High (중요)

⚠️ **expectedLeadTime 현실성:**
- 실제 평균 리드타임과 ±30% 이내
- 3개월마다 실제 데이터 기반 업데이트

⚠️ **evaluationFocus 정확성:**
- V1 Competency 리스트에 존재하는 역량만 포함
- 각 Stage는 최소 1개 이상의 evaluationFocus 보유 권장

### Medium (선택적)

💡 **Stage 활성화 상태:**
- 사용하지 않는 Stage는 `isActive=false`로 설정 (삭제 대신)
- 과거 채용 데이터 보존 목적

---

## 📊 V1.5 구현 시 고려사항

### 1. Greenhouse API 연동

**Stage 매핑:**
```javascript
// Greenhouse 기본 Stage
const greenhouseStages = [
  "Application Review",
  "Phone Screen",
  "Onsite Interview",
  "Offer"
];

// 우리 시스템으로 매핑
const mappedStages = [
  { stageID: "STAGE-001", stageName: "서류 심사", greenhouseStage: "Application Review" },
  { stageID: "STAGE-002", stageName: "전화 스크리닝", greenhouseStage: "Phone Screen" },
  { stageID: "STAGE-003", stageName: "1차 기술 면접", greenhouseStage: "Onsite Interview" },
  { stageID: "STAGE-004", stageName: "2차 컬처핏", greenhouseStage: "Onsite Interview" },
  { stageID: "STAGE-005", stageName: "최종 오퍼", greenhouseStage: "Offer" }
];
```

**문제점:**
- Greenhouse의 "Onsite Interview"가 우리 시스템의 2개 단계로 분리
- API 자동 동기화 시 수동 매핑 필요

---

### 2. Stage 템플릿 라이브러리

**포지션별 Stage 템플릿 제공:**
```
templates/
├── backend-engineer-junior.json
├── backend-engineer-senior.json
├── product-manager.json
├── designer.json
└── ...
```

**보리의 사용 예:**
1. 새 포지션 "Backend Senior" 생성
2. 템플릿 "backend-engineer-senior.json" 선택
3. 자동으로 4단계 Stage 생성
4. 필요시 커스터마이징 (expectedLeadTime 조정 등)

---

### 3. 단계별 통과율 자동 계산

**대시보드 예시:**
```
Backend Senior Engineer 채용 프로세스 (최근 6개월)

Stage 1: 서류 심사
  - 지원자: 150명
  - 통과자: 30명 (20%)
  - 평균 리드타임: 2.8일

Stage 2: 1차 기술 면접
  - 지원자: 30명
  - 통과자: 15명 (50%)
  - 평균 리드타임: 5.8일

Stage 3: 2차 컬처핏 면접
  - 지원자: 15명
  - 통과자: 8명 (53%)
  - 평균 리드타임: 11.2일 🚨 (병목!)

Stage 4: 최종 오퍼
  - 지원자: 8명
  - 합격자: 6명 (75%)
  - 평균 리드타임: 3.2일

전체 합격률: 6/150 = 4%
```

**인사이트:**
- "서류 심사" 통과율이 20%로 낮음 → JD 요구사항이 너무 높은가?
- "2차 컬처핏" 병목 → 면접관 일정 조율 개선 필요

---

### 4. 샘플 데이터 수집 (Week 6)

**최소 샘플 사이즈:**
- 포지션당 최소 **20명의 후보자 여정** (각 Stage별 통과/탈락 데이터)
- Lead Time 계산을 위해 각 Stage 진입/탈퇴 날짜 필요

**데이터 소스:**
- Greenhouse Activity Feed: `GET /applications/{id}/activity_feed`
- Stage 변경 이벤트 추출: `{"type": "stage_change", "from": "Stage1", "to": "Stage2", "timestamp": "..."}`

---

## 🚨 Week 5 검증 체크리스트

### 보리와의 검토 (Day 5)

- [ ] **포지션별 Stage 정의 확인**
  - Backend Senior 4단계가 적절한가?
  - PM 5단계 (과제 포함)가 현실적인가?

- [ ] **Stage 간 Lead Time 기대치**
  - expectedLeadTime 값이 실제와 비슷한가?
  - 병목 기준 (평균 대비 1.5배) 적절한가?

- [ ] **evaluationFocus 정확성**
  - 각 Stage에서 평가하는 Competency 리스트 확인
  - V1 Competency와 일치하는가?

- [ ] **Greenhouse 매핑 가능성**
  - Greenhouse Stage → 우리 Stage 매핑이 명확한가?
  - 수동 매핑이 필요한 경우 어떻게 처리할지

---

## 🔗 관련 개념

- [C-011 Lead Time](./c-011-lead-time.md) - Stage 간 소요 시간 측정
- [C-012 Interview](./c-012-interview.md) - 각 Stage에서 발생하는 면접 이벤트
- [C-009 Application](./c-009-application.md) - Stage 진행 상태 추적
- [C-008 Candidate](./c-008-candidate.md) - currentStage 속성으로 현재 위치 표시

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [DCQ-01: 리드타임 분석](../../01-specification/competency-questions.md#dcq-01)
- [DCQ-02: Competency 평가 시간](../../01-specification/competency-questions.md#dcq-02)
- [Position (V1 개념)](../position.md) - Interview Stage의 소속 포지션

---

**다음 개념:** [C-012 Interview](./c-012-interview.md)
**이전 개념:** [C-011 Lead Time](./c-011-lead-time.md)

---

## 📝 Week 5 Day 3 체크

- [x] C-010 Interview Stage 개념 정의 완료
- [x] 필수/선택 속성 리스트 작성
- [x] 관계 다이어그램 작성
- [x] 예시 3건 (Backend, PM, Junior) 작성
- [x] DCQ 2개 (DCQ-01, DCQ-02) 쿼리 로직 작성
- [x] 포지션별/레벨별 Stage 커스터마이징 방안
- [ ] 보리 검토 요청 (Day 3 종료 후)

---

**Week 5 Day 3 오전 완료!** ✅

다음 작업: C-012 Interview (오후)
