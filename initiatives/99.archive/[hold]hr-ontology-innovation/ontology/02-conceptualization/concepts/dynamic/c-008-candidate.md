# C-008: Candidate (지원자)

**작성일:** 2025-11-27
**우선순위:** P0
**카테고리:** 동적 개념 (Dynamic Concept)
**관련 DCQ:** DCQ-01, DCQ-05, DCQ-06, DCQ-07, DCQ-08

---

## 📋 정의 (Definition)

채용 프로세스에 참여하는 지원자의 기본 정보와 현재 상태를 나타내는 개념입니다. 지원자는 한 명의 실제 사람을 의미하며, 여러 포지션에 지원할 수 있습니다.

**핵심 가치:**
- 지원자 프로필 중앙 관리
- 채용 여정(Candidate Journey) 추적
- 과거 지원 이력 분석 기반

---

## 🏗️ 속성 (Properties)

### 필수 속성 (Required)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **candidateID** | string | 지원자 고유 식별자 | `CAND-2024-123` |
| **name** | string | 지원자 이름 (익명화 가능) | `김철수` 또는 `Candidate_A` |
| **email** | email | 연락처 이메일 | `cheolsu.kim@email.com` |
| **appliedDate** | datetime | 최초 지원일 | `2024-11-15T10:30:00Z` |
| **currentStage** | enum | 현재 전형 단계 | `Screening`, `Interview_1st`, `Interview_Final`, `Offer`, `Hired`, `Rejected`, `Withdrawn` |

### 선택 속성 (Optional)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| **phone** | string | 전화번호 | `+82-10-1234-5678` |
| **source** | enum | 지원 경로 | `Recruiter`, `Self-Applied`, `Referral`, `Headhunter`, `LinkedIn` |
| **referrer** | string | 추천인 (source=Referral인 경우) | `james@company.com` |
| **resume** | url/file | 이력서 파일 링크 | `https://storage/resumes/cand-123.pdf` |
| **portfolio** | url | 포트폴리오 URL | `https://github.com/cheolsu` |
| **yearsOfExperience** | integer | 총 경력 연수 | `7` |
| **currentCompany** | string | 현재 회사 | `TechCorp Inc.` |
| **currentPosition** | string | 현재 직위 | `Senior Backend Engineer` |
| **education** | string | 최종 학력 | `Computer Science, Seoul National Univ. (Bachelor)` |
| **expectedSalary** | integer | 희망 연봉 (선택) | `80000000` (KRW) |
| **availableDate** | date | 입사 가능일 | `2025-01-02` |
| **notes** | text | 추가 메모 | `Strong PostgreSQL experience` |
| **tags** | array[string] | 스킬/특성 태그 | `["PostgreSQL", "React", "Docker", "Team Leadership"]` |

---

## 🔗 관계 (Relationships)

### 1:N 관계 (Candidate → 다른 개념들)

```
Candidate (1) ─── appliesFor ──→ (N) Position
  설명: 한 지원자는 여러 포지션에 지원할 수 있음
  예: 김철수가 "Backend Senior"와 "Backend Lead" 모두 지원

Candidate (1) ─── hasApplication ──→ (N) Application
  설명: 각 포지션 지원마다 별도의 Application 객체 생성
  예: 김철수가 2개 포지션 → 2개 Application

Candidate (1) ─── participatesIn ──→ (N) Interview
  설명: 한 지원자는 여러 면접(1차, 2차, 최종)에 참여
  예: 김철수가 1차 면접, 2차 면접, 최종 면접 총 3회 참여

Candidate (1) ─── receivesEvaluation ──→ (N) Evaluation Record
  설명: 각 면접마다 면접관들로부터 여러 평가를 받음
  예: 1차 면접에서 제임스, 사라로부터 2개 평가

Candidate (1) ─── getsDecision ──→ (N) Hiring Decision
  설명: 각 포지션별로 최종 채용 결정 (합격/불합격)
  예: "Backend Senior"에 합격, "Backend Lead"에 불합격
```

### 관계 다이어그램

```
┌─────────────┐
│  Candidate  │
└──────┬──────┘
       │
       ├──────→ Position (appliesFor)
       ├──────→ Application (hasApplication)
       ├──────→ Interview (participatesIn)
       ├──────→ Evaluation Record (receivesEvaluation)
       └──────→ Hiring Decision (getsDecision)
```

---

## 💡 예시 (Examples)

### 예시 1: Backend Senior 지원자 (합격 케이스)

```json
{
  "candidateID": "CAND-2024-123",
  "name": "김철수",
  "email": "cheolsu.kim@email.com",
  "phone": "+82-10-1234-5678",
  "appliedDate": "2024-11-01T10:30:00Z",
  "currentStage": "Hired",
  "source": "Self-Applied",
  "resume": "https://storage/resumes/cand-123.pdf",
  "portfolio": "https://github.com/cheolsu",
  "yearsOfExperience": 7,
  "currentCompany": "TechCorp Inc.",
  "currentPosition": "Senior Backend Engineer",
  "education": "Computer Science, Seoul National Univ. (Bachelor)",
  "expectedSalary": 80000000,
  "availableDate": "2025-01-02",
  "notes": "Strong PostgreSQL and microservices experience. Led a team of 3 developers.",
  "tags": ["PostgreSQL", "Python", "Docker", "Kubernetes", "Team Leadership", "Communication"]
}
```

**채용 여정:**
1. 2024-11-01: 지원 (Self-Applied)
2. 2024-11-05: 서류 통과 → 1차 면접 스케줄
3. 2024-11-10: 1차 기술 면접 (평가: PostgreSQL 4.5/5, Python 4.0/5)
4. 2024-11-17: 2차 문화 적합성 면접 (평가: Communication 4.2/5, Team Fit 4.5/5)
5. 2024-11-20: 최종 합격 결정 (finalScore: 4.3/5)

---

### 예시 2: Product Manager 지원자 (탈락 케이스)

```json
{
  "candidateID": "CAND-2024-456",
  "name": "Candidate_B",
  "email": "candidateb@email.com",
  "appliedDate": "2024-10-15T14:20:00Z",
  "currentStage": "Rejected",
  "source": "Recruiter",
  "resume": "https://storage/resumes/cand-456.pdf",
  "yearsOfExperience": 3,
  "currentCompany": "Startup XYZ",
  "currentPosition": "Associate PM",
  "education": "Business Administration, Yonsei Univ. (Master)",
  "notes": "Good analytical skills, but lacks B2B SaaS experience",
  "tags": ["Product Strategy", "Data Analysis", "User Research"]
}
```

**채용 여정:**
1. 2024-10-15: 리크루터 소싱
2. 2024-10-20: 서류 통과 → 1차 면접 스케줄
3. 2024-10-25: 1차 Case Study 면접 (평가: Product Sense 3.5/5, Strategy 3.0/5)
4. 2024-10-27: 탈락 결정 (사유: "B2B SaaS 경험 부족, Strategy 역량 미달")

---

## 🎯 DCQ 연결 (Competency Questions Mapping)

이 개념은 다음 DCQ 답변에 필요합니다:

### DCQ-01: 리드타임 분석
> "Senior Backend Engineer 채용의 평균 리드타임은?"

**필요한 데이터:**
- `appliedDate` (지원일)
- `currentStage` 변경 이력 (각 단계별 진입/탈퇴 날짜)
- `Hiring Decision.decisionDate` (최종 결정일)

**쿼리 로직:**
```sql
SELECT
  AVG(DATEDIFF(hd.decisionDate, c.appliedDate)) AS avg_lead_time_days
FROM Candidate c
JOIN Hiring_Decision hd ON c.candidateID = hd.candidateID
WHERE hd.positionID = 'POS-BE-SR-001'
  AND hd.decision = 'Hired'
  AND c.appliedDate >= '2024-05-01';
```

---

### DCQ-05: 합격자 벤치마크
> "지난 6개월 Backend Senior 합격자의 평균 Competency 점수는?"

**필요한 데이터:**
- `candidateID` (합격자 식별)
- `Hiring Decision.decision = "Hired"` (합격자 필터링)
- `Evaluation Record → Competency Assessment` (역량별 점수)

**쿼리 로직:**
```sql
SELECT
  ca.competencyID,
  AVG(ca.score) AS avg_score
FROM Candidate c
JOIN Hiring_Decision hd ON c.candidateID = hd.candidateID
JOIN Evaluation_Record er ON c.candidateID = er.candidateID
JOIN Competency_Assessment ca ON er.recordID = ca.recordID
WHERE hd.decision = 'Hired'
  AND hd.positionID = 'POS-BE-SR-001'
  AND c.appliedDate >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY ca.competencyID;
```

**결과 예시:**
```
PostgreSQL: 4.2/5
Python: 4.0/5
Communication: 4.1/5
```

---

### DCQ-06: Pass/Fail 기준점
> "Communication 3점 받은 후보자의 최종 합격률은?"

**필요한 데이터:**
- `candidateID`
- `Competency Assessment.score` (Communication 점수)
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
  COUNT(*) AS total_candidates,
  SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) AS hired_count,
  ROUND(SUM(CASE WHEN hd.decision = 'Hired' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS hire_rate
FROM Candidate c
JOIN Competency_Assessment ca ON c.candidateID = ca.candidateID
JOIN Hiring_Decision hd ON c.candidateID = hd.candidateID
WHERE ca.competencyID = 'COMP-010' -- Communication
  AND hd.positionID = 'POS-BE-SR-001'
GROUP BY score_range;
```

**결과 예시:**
```
Below 3.0:  5건 → 0% 합격 (Pass/Fail 기준점 발견!)
3.0-3.5:   10건 → 20% 합격
3.5-4.0:   15건 → 60% 합격
4.0+:      20건 → 90% 합격
```

---

### DCQ-07: 탈락 패턴 분석
> "Backend Senior 탈락 사유 Top 3는?"

**필요한 데이터:**
- `candidateID`
- `Hiring Decision.decision = "Rejected"`
- `Hiring Decision.decisionReason`

**쿼리 로직:**
```sql
SELECT
  hd.decisionReason,
  COUNT(*) AS rejection_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Hiring_Decision WHERE decision='Rejected'), 1) AS percentage
FROM Candidate c
JOIN Hiring_Decision hd ON c.candidateID = hd.candidateID
WHERE hd.decision = 'Rejected'
  AND hd.positionID = 'POS-BE-SR-001'
GROUP BY hd.decisionReason
ORDER BY rejection_count DESC
LIMIT 3;
```

**결과 예시:**
```
1. PostgreSQL 역량 부족 (40%)
2. Communication 3점 이하 (25%)
3. Team Leadership 경험 없음 (20%)
```

---

### DCQ-08: 예외 케이스 분석
> "PostgreSQL 4점 이상인데 탈락한 케이스는 왜?"

**필요한 데이터:**
- `candidateID`
- `Competency Assessment.score` (PostgreSQL 4점 이상)
- `Hiring Decision.decision = "Rejected"`
- `Hiring Decision.decisionReason` (탈락 사유 분석)

**쿼리 로직:**
```sql
SELECT
  c.candidateID,
  c.name,
  ca.score AS postgresql_score,
  hd.decisionReason
FROM Candidate c
JOIN Competency_Assessment ca ON c.candidateID = ca.candidateID
JOIN Hiring_Decision hd ON c.candidateID = hd.candidateID
WHERE ca.competencyID = 'COMP-002' -- PostgreSQL
  AND ca.score >= 4.0
  AND hd.decision = 'Rejected'
  AND hd.positionID = 'POS-BE-SR-001';
```

**인사이트 예시:**
```
"PostgreSQL 4.5점인데 탈락한 3건 분석:
  → 모두 Communication 3점 이하 (Communication이 더 중요한 Pass/Fail 기준)"
```

---

## 🔍 데이터 품질 요구사항

### Critical (필수)
- ✅ `candidateID` 고유성 보장 (중복 없음)
- ✅ `appliedDate` 정확성 (ATS 자동 기록 또는 수동 입력 검증)
- ✅ `currentStage` 실시간 업데이트 (단계 변경 시 즉시 반영)

### High (중요)
- ⚠️ `source` 정확한 태깅 (리크루터 vs 자발 지원 구분)
- ⚠️ `yearsOfExperience` 신뢰성 (이력서 기반 검증)
- ⚠️ `tags` 일관된 스킬 태깅 (V1 Competency 리스트 기준)

### Medium (선택적)
- 💡 `resume`, `portfolio` 링크 유효성
- 💡 `notes` 구조화된 작성 (자유 텍스트 대신 템플릿 권장)

---

## 📊 V1.5 구현 시 고려사항

### 1. 익명화 (Privacy)
- **법적 요구사항 준수**: GDPR, 개인정보보호법
- **익명화 방식**:
  - `name` → `Candidate_A`, `Candidate_B`
  - `email` → `candidate_a@anonymized.com`
  - `phone` → `+82-10-XXXX-XXXX`
- **익명화 불필요 데이터**: `candidateID`, `yearsOfExperience`, `tags`

### 2. 샘플 데이터 수집 (Week 6)
- **최소 샘플 사이즈**: 포지션당 5건 (DCQ 통계적 유의성 확보)
- **다양성 확보**:
  - 합격/불합격 비율: 50:50
  - 경력 범위: Junior(1-3년), Mid(3-5년), Senior(5년+)
  - 지원 경로: Self-Applied, Recruiter, Referral 골고루

### 3. ATS 연동
- Greenhouse API 활용:
  - `GET /candidates/{id}` → Candidate 기본 정보
  - `GET /candidates/{id}/applications` → Application 리스트
  - `GET /applications/{id}/scorecards` → Evaluation Record
- 자동 동기화 vs 수동 입력 선택

---

## 🚀 Week 5 Day 1 체크리스트

- [x] C-008 Candidate 개념 정의 완료
- [x] 필수/선택 속성 리스트 작성
- [x] 관계 다이어그램 작성
- [x] 예시 2건 (합격/불합격) 작성
- [x] DCQ 5개 (DCQ-01, 05, 06, 07, 08) 쿼리 로직 작성
- [ ] 보리 검토 요청 (Day 1 종료 후)

---

## 📚 참고 문서

- [V1.5 Scope](../../01-specification/v1-5-scope.md)
- [Competency Questions](../../01-specification/competency-questions.md) - DCQ-01~08 상세
- [C-016 Hiring Decision](./c-016-hiring-decision.md) - 관련 개념
- [V1 Competency List](../../03-implementation/v1-competencies-list.md) - 스킬 태깅 기준

---

**다음 개념:** [C-013 Evaluation Record](./c-013-evaluation-record.md)
