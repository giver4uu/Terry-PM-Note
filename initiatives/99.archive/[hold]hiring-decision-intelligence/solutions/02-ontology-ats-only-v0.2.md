# 채용 온톨로지 v0.2 - ATS 데이터만으로 가능한 솔루션

**버전:** v0.2 (HRIS 연동 불가 제약 반영)
**작성일:** 2025-12-01
**핵심 변화:** Performance Review 없이 ATS 내 데이터만 활용

---

## 🚨 핵심 제약 및 재설계 전략

### 제약 조건
- ❌ **HRIS (Workday) Performance Review 연동 불가능**
- ❌ 온보딩 후 성과 데이터 직접 접근 불가
- ❌ PIP, 성과 평가 점수 등 외부 데이터 없음

### 사용 가능한 ATS 데이터
- ✅ **서류 평가**: 이력서, 지원서, 스크리닝 노트
- ✅ **면접 평가**: 면접관 점수, 피드백, 우려 사항
- ✅ **면접 스크립트**: 질문, 답변, 관찰 노트
- ✅ **평가표**: Competency별 점수, 평가 기준
- ✅ **채용 결정**: Hired/Rejected/Withdrawn, 결정 이유
- ✅ **재직 정보**: 입사일, 퇴사일 (있는 경우), 재직 기간

### 핵심 인사이트: "기억 트리거"
**발견:**
- Borry: "인터뷰 중에야 '아, Daniel이랑 똑같았구나' 깨달았어요"
- 문제는 Performance Review 부재가 아니라 **과거 케이스를 떠올리지 못한 것**

**솔루션 재정의:**
- 시스템이 모든 것을 알 필요 없다
- **과거 유사 케이스를 보여주는 것만으로도 Borry의 기억 트리거**
- Borry는 "아, 그때 Daniel 6개월 후 문제였지!" 스스로 떠올림

---

## 재정의된 가치 제안

### Before (v0.1 - HRIS 연동 가정)
"유사 후보자 Daniel, 6개월 후 PIP, Self-direction 부족" → **시스템이 모든 것을 알려줌**

### After (v0.2 - ATS만)
"유사 후보자 Daniel (2024-03), Ownership 우려, Michael이 강하게 밀어서 Hired" → **Borry 기억 트리거**

**추가 프록시 데이터:**
- "Daniel, 입사 후 9개월 만에 퇴사" (조기 퇴사 = 문제 신호)
- "유사 Ownership 우려 10명 중 3명이 6개월 내 퇴사" (패턴)

---

## 수정된 온톨로지 스키마 (ATS 중심)

### 핵심 개념 (10개 → 8개로 축소)

```
1. Candidate (후보자)
   - 속성: candidateId, name, appliedDate, currentStage
   - 연결: appliesTo Position, hasProfile CandidateProfile

2. CandidateProfile (후보자 프로필)
   - 속성: yearsOfExperience, previousCompanies[], jobTenures[]
   - 연결: demonstrates Competency[], hasPattern BehavioralPattern[]

3. Position (포지션)
   - 속성: positionId, title, team, status
   - 연결: requiresCompetency Competency[], hasHistory HiringHistory[]

4. Competency (역량)
   - 속성: competencyId, name, definition, proficiencyLevel
   - 연결: evaluatedBy InterviewFeedback

5. InterviewFeedback (면접 평가)
   - 속성: feedbackId, interviewDate, overallScore, notes, transcript
   - 연결: evaluates Competency, raisedConcern Concern, givenBy Interviewer
   - **신규**: extractedSignals[] (면접 스크립트에서 추출한 신호)

6. Concern (우려 사항)
   - 속성: concernType, severity, raisedBy, evidence[]
   - 예시: "ownership", "cultural-fit", "turnover-risk"
   - 연결: observedIn Candidate, linkedTo BehavioralPattern

7. BehavioralPattern (행동 패턴)
   - 속성: patternType, frequency, historicalOutcome{}
   - 예시: "frequent-job-hopping", "team-credit-confusion"
   - 연결: observedIn Candidate[], hasOutcome HiringOutcome[]

8. HiringOutcome (채용 결과)
   - 속성: decision (hired, rejected, withdrawn), decisionDate, reasonCode
   - **신규**: employmentDuration (재직 기간, 있는 경우)
   - **신규**: earlyDeparture (6개월 내 퇴사 여부)
   - 연결: forCandidate Candidate, basedOn InterviewFeedback[]
```

### 제거된 개념 (v0.1 대비)
- ❌ Employee (HRIS 데이터)
- ❌ PerformanceReview (HRIS 데이터)

---

## 핵심 관계 (ATS 중심)

### 1. 과거 유사 케이스 + 기억 트리거
```
CurrentCandidate --[similarTo]--> PastCandidate --[hasOutcome]--> HiringOutcome
                                                                         ↓
                                               [employmentDuration / earlyDeparture]
```

**예시 (James → Daniel):**
```json
{
  "currentCandidate": "James",
  "similarPastCandidate": {
    "name": "Daniel",
    "date": "2024-03",
    "similarity": 0.87,
    "reasons": [
      "Competency scores: 4.2 vs 4.3 (System Thinking)",
      "Same Concern: Ownership (raised by Sarah)",
      "Interview pattern: '팀이 했다' repeated mentions"
    ]
  },
  "hiringOutcome": {
    "decision": "hired",
    "decisionContext": "Michael strongly advocated despite concerns",
    "employmentDuration": "9 months",
    "earlyDeparture": true,
    "departureNote": "Mutual agreement" // ATS에서 추출 가능
  },
  "triggerMemory": "Borry, 이 케이스 기억나시나요? Daniel 이후 어떻게 됐는지..."
}
```

**Borry 반응:**
- "아, 맞다! Daniel 그 후 6개월에 PIP 들어갔어. Self-direction 문제였지."
- **시스템이 기억을 트리거 → Borry가 맥락 보완**

---

### 2. BehavioralPattern → HiringOutcome 상관관계
```
BehavioralPattern --[observedIn]--> Candidate[] --[hasOutcome]--> HiringOutcome[]
                                                                          ↓
                                                    [employmentDuration stats]
```

**예시 (잦은 이직 패턴):**
```json
{
  "pattern": "frequent-job-hopping",
  "definition": "2년간 3회 이상 이직",
  "historicalData": {
    "totalCandidates": 12,
    "hired": 8,
    "rejected": 4,
    "hiredOutcomes": {
      "avgEmploymentDuration": "5.8 months",
      "earlyDeparture_6m": "62.5% (5/8)",
      "earlyDeparture_12m": "87.5% (7/8)",
      "stillEmployed": "12.5% (1/8)"
    },
    "departureReasons": {
      "higherOffer": "58%",
      "culturalMismatch": "25%",
      "workloadComplaint": "17%"
    }
  }
}
```

**AI 활용:**
- 재직 기간을 프록시로 "성과" 추정
- 6개월 내 퇴사 = 높은 확률로 문제 있었음
- 12개월 이상 재직 = 성공 신호

---

### 3. Concern → 실제 문제 검증
```
InterviewFeedback --[raisedConcern]--> Concern --[validatedBy]--> HiringOutcome
```

**예시 (Cultural Fit 우려):**
```json
{
  "concern": "cultural-fit",
  "raisedIn": [
    "Emma interview: 'Fastest product launch? 9 months' (우리는 2-3주)",
    "Michael note: 'A/B testing 6주 돌리고... 우리는 시간 없는데'"
  ],
  "historicalValidation": {
    "similarConcerns": 8,
    "hired": 4,
    "outcomes": {
      "earlyDeparture_3m": "75% (3/4)",
      "avgDuration": "2.1 months",
      "departureReason": "전략 없다, 체계 없다 불만"
    }
  },
  "recommendation": "⚠️ Cultural-fit 우려는 75% 확률로 조기 퇴사로 이어짐"
}
```

---

## 수정된 AI 활용 시나리오

### 시나리오 1: 유사 후보자 + 기억 트리거 (재설계)

**사용자:** Borry
**상황:** James 데브리프 회의, Ownership 우려

**시스템 출력 (v0.2):**
```
🔍 유사 후보자 발견: Daniel (2024-03-15)

유사도 분석 (87% 신뢰도):
├─ Competency 평가 유사
│  └─ System Thinking: 4.3점 (James 4.2점)
├─ 동일 Concern: Ownership 부족
│  └─ Sarah (CTO): "팀이 했다" 반복 언급
└─ 면접 패턴 유사
   └─ "우리가 결정했다" vs "제가 주도한 것"

Daniel 채용 결정 (2024-03-15):
✅ Hired
├─ Michael (Manager): "조금 수동적이지만 우리 팀에서 키우면 된다" (강력 옹호)
├─ Sarah (CTO): 우려 제기했으나 Michael 의견 따름
└─ 최종: 4.3/5 → Offer Accepted

Daniel 이후 (ATS 데이터):
├─ 입사: 2024-03-20
├─ 퇴사: 2024-12-15 (9개월 재직)
├─ 조기 퇴사: ⚠️ Yes (1년 미만)
└─ 퇴사 사유: "Mutual agreement" (ATS 노트)

💡 Borry, 이 케이스 기억나시나요?
   Daniel 이후 상황이 어땠는지 떠올려보시겠어요?
```

**Borry 반응:**
- "아! 맞아, Daniel! 6개월에 PIP 들어갔어요."
- "Self-direction 부족으로 Performance Review에서 지적받았죠."
- "9개월 만에 상호 합의로 떠났고..."
- **→ 즉시 결정: "James Reject. Daniel과 똑같은 패턴입니다."**

**핵심:**
- 시스템은 ATS 데이터만 제공 (9개월 재직, 조기 퇴사)
- **Borry가 맥락 보완** (PIP, Self-direction 문제)
- 결과: 2주 지연 → 즉시 결정

---

### 시나리오 2: 레드 플래그 + 정량적 근거 (동일)

**사용자:** John (신입 리크루터)
**상황:** Ryan 이력서 스크리닝

**시스템 출력 (v0.2 - 변경 없음):**
```
🚩 레드 플래그 감지: 잦은 이직 패턴

패턴 분석:
├─ 2년간 3회 이직 (평균 11.3개월 재직)
└─ BehavioralPattern: "frequent-job-hopping"

과거 동일 패턴 (12명):
├─ Hired: 8명
│  ├─ 6개월 내 퇴사: 62.5% (5/8)
│  ├─ 12개월 내 퇴사: 87.5% (7/8)
│  ├─ 평균 재직 기간: 5.8개월
│  └─ 현재 재직: 12.5% (1/8, 18개월)
└─ Rejected: 4명

퇴사 사유 (ATS 추출):
├─ 더 높은 연봉 제안: 58%
├─ 문화 부적응: 25%
└─ 업무 난이도 불만: 17%

⚠️ 권장: Reject 또는 면접 시 강화 질문
```

**임팩트:**
- 동일 (연 4억 절감)
- ATS 데이터만으로 충분히 작동

---

### 시나리오 3: 면접 신호 자동 추출 (신규 강화)

**사용자:** Borry
**상황:** Emma (대기업 PM) 면접 검토

**시스템 출력 (v0.2 - 강화):**
```
⚠️ Cultural-Fit 신호 감지

면접 스크립트 분석:
├─ Lisa 질문: "가장 빨리 런칭한 프로덕트는?"
│  └─ Emma 답변: "9개월"
│     └─ 🚨 신호: 우리 평균 2-3주 사이클과 큰 차이
│
├─ Michael 질문: "데이터 기반 의사결정 경험은?"
│  └─ Emma 답변: "A/B 테스트 6주 돌리고, 통계적 유의성 확보하고..."
│     └─ 🚨 신호: 우리는 빠른 실험 문화 (1-2주)
│
└─ CEO 질문: "가장 자랑스러운 성과는?"
   └─ Emma 답변: "100페이지 시장 조사 보고서"
      └─ 🚨 신호: 우리는 실행 중심 (prototype first)

유사 Cultural-Fit 우려 (8건):
├─ Hired: 4명
│  ├─ 3개월 내 퇴사: 75% (3/4)
│  ├─ 평균 재직: 2.1개월
│  └─ 퇴사 사유: "전략 없다", "체계 없다" 불만
└─ Rejected: 4명 (모두 cultural-fit 사전 차단)

💡 Emma의 일하는 속도/방식이 우리 문화와 매우 다릅니다.
   신호를 무시한 과거 4건 중 3건이 조기 퇴사했습니다.
```

**Borry 반응:**
- "신호가 있었는데 '이력서가 완벽해서' 무시했구나"
- **→ 결정: "Emma Reject. 2.5억 손실 방지"**

**핵심 가치:**
- **면접 스크립트 AI 분석** (ATS에 있는 데이터)
- 과거 패턴 학습 (재직 기간 = 프록시)
- 신호 무시 방지

---

## ATS만으로 가능한 해자 (Moat)

### 1. 네트워크 효과 (여전히 강력)
**메커니즘:**
- 데이터 축적 → 패턴 정확도 ↑
- 재직 기간 = 프록시 성과 지표
- 사용할수록 예측력 향상

**예시:**
- 100명: "잦은 이직 → 6개월 내 퇴사 60%"
- 1,000명: "잦은 이직 → 6개월 내 퇴사 85%"
- 10,000명: "산업별, 직군별 세분화 정확도 95%"

### 2. 면접 스크립트 AI 분석 (신규 강화)
**차별화:**
- 기존 ATS: 면접 노트 단순 저장
- 우리: **AI가 면접 스크립트에서 신호 자동 추출**

**구체적:**
- "가장 빨리 런칭? 9개월" → Cultural-fit 신호
- "A/B 테스트 6주" → 일하는 속도 신호
- "팀이 했다" 반복 → Ownership 신호

**해자:**
- NLP/LLM 전문성 필요
- 도메인 지식 (어떤 답변이 레드 플래그인가)
- 2-3년 학습 데이터 축적

### 3. 기억 트리거 시스템 (신규)
**차별화:**
- 시스템이 모든 것을 알 필요 없음
- **Borry의 암묵지(tacit knowledge) 활성화**

**메커니즘:**
```
시스템: "Daniel 케이스 기억나시나요?"
Borry: "아, 그때 6개월 PIP!"
→ 시스템 지식(ATS) + 인간 지식(경험) 결합
```

**해자:**
- 경쟁사: 완벽한 데이터 필요
- 우리: 불완전한 데이터 + 인간 보완

### 4. 조기 퇴사 프록시 학습 (실용적 해자)
**인사이트:**
- 6개월 내 퇴사 = 높은 확률로 performance 문제
- 12개월 이상 재직 = 성공 신호
- Perfect 데이터 없어도 **실용적 가치 제공**

**경쟁사 진입 장벽:**
- "재직 기간"은 단순하지만 **의미론적 해석**이 핵심
- 온톨로지: Concern(ownership) → EarlyDeparture 상관관계 학습

---

## 수정된 기술 아키텍처

### 데이터 소스 (ATS만)
```
1. Candidate & Application
   - 이력서, 지원서, 스크리닝 노트

2. Interview Process
   - 면접 평가, 점수, 피드백
   - 면접 스크립트 (질문-답변)
   - 평가표 (Competency별)

3. Hiring Decision
   - Hired/Rejected/Withdrawn
   - 결정 이유, 노트

4. Employment Record (ATS 내)
   - 입사일, 퇴사일 (있는 경우)
   - 재직 기간 계산
```

### AI/ML 레이어 (강화)

**1. 면접 스크립트 분석 (신규 강화)**
```python
# LLM 기반 신호 추출
prompt = f"""
면접 질문: "가장 빨리 런칭한 프로덕트는?"
후보자 답변: "9개월 걸렸습니다."

우리 회사 맥락:
- 평균 제품 출시 사이클: 2-3주
- 문화: 빠른 실험, MVP 우선

이 답변에서 추출할 수 있는 신호는?
"""

output = {
  "signal": "work-pace-mismatch",
  "severity": "high",
  "evidence": "9개월 vs 우리 2-3주 (300% 차이)",
  "concernType": "cultural-fit"
}
```

**2. 유사도 계산 (유지)**
- InterviewFeedback 임베딩
- Concern 패턴 매칭
- Competency 점수 유사도

**3. 조기 퇴사 예측 (신규)**
```python
# 재직 기간 기반 성과 프록시
def predict_risk(candidate):
    similar_cases = find_similar(candidate)

    early_departure_rate = sum(
        1 for c in similar_cases
        if c.employment_duration < 6  # 6개월 미만
    ) / len(similar_cases)

    return {
        "risk_level": "high" if early_departure_rate > 0.6 else "medium",
        "confidence": len(similar_cases) / 10,  # 최소 10건 필요
        "evidence": similar_cases
    }
```

---

## 임팩트 재평가 (ATS만)

### Before (v0.1 - HRIS 연동)
- 리드타임 5일 단축
- 오퍼 수락률 +15%p
- 연 4억 절감

### After (v0.2 - ATS만)
**긍정적 유지:**
- ✅ 레드 플래그 감지: 동일 (연 4억 절감)
- ✅ 평가 불일치: 동일 (회의 75% 단축)
- ✅ 기억 트리거: **새로운 가치** (Borry 경험 활용)

**약화 요소:**
- ⚠️ 확신 근거 약화: "6개월 PIP" → "9개월 조기 퇴사"
- ⚠️ 정확도 하락: Perfect 데이터 → 프록시 (재직 기간)

**새로운 강화:**
- 🆕 면접 신호 자동 추출: Emma 케이스 방지 (2.5억)
- 🆕 Borry 암묵지 활용: 시스템 + 인간 결합

**총 임팩트 (재평가):**
- 리드타임: 14일 → 10일 (-29%, 약간 약화)
- 오퍼 수락률: 60% → 70% (+10%p, 약간 약화)
- 연간 절감: 3-4억 (여전히 강력)

**결론:**
- Performance Review 없어도 **70-80% 가치 제공 가능**
- 면접 신호 추출 + 기억 트리거로 **일부 보완**
- 실용적이고 구현 가능한 솔루션

---

## 다음 단계 제안

### Option A: 프로토타입 + Borry 검증 (권장)
**목표:** ATS만으로 가능한 가치 검증

**Step 1: Mock 데이터 프로토타입**
- James-Daniel 시나리오 구현
- "유사 후보자 + 기억 트리거" UX
- Borry 반응 테스트

**Step 2: Borry 검증 세션**
- 질문 1: "Daniel 케이스만 보여줘도 나머지 기억나시나요?"
- 질문 2: "9개월 조기 퇴사 정보만으로 충분한가요?"
- 질문 3: "면접 신호 자동 추출이 도움될까요?"

**Step 3: 피드백 반영**
- 기억 트리거가 작동하는가?
- 재직 기간 프록시가 충분한가?
- UX 개선점?

### Option B: Assumption Mapping
**핵심 가정:**
1. **Borry가 과거 케이스를 기억할 수 있는가?**
   - 리스크: 높음
   - 테스트: 프로토타입으로 검증

2. **재직 기간이 성과의 충분한 프록시인가?**
   - 리스크: 중간
   - 테스트: 과거 데이터 분석 (재직 기간 vs 실제 성과)

3. **면접 스크립트에서 신호 추출 가능한가?**
   - 리스크: 중간
   - 테스트: LLM으로 Emma 케이스 재현

### Option C: 대안 데이터 소스 탐색
**가능성:**
- Manager 간단 피드백 (채용 3개월/6개월 후)
- ATS 내 "Quick Survey" 기능
- 프록시 개선 (승진, 프로젝트 참여 등)

---

## 핵심 질문

**당신에게 묻고 싶습니다:**

1. **기억 트리거 접근이 충분한가?**
   - Borry에게 "Daniel 케이스"만 보여줘도 나머지를 떠올릴 수 있을까?
   - 아니면 더 많은 데이터가 필요한가?

2. **재직 기간 프록시가 실용적인가?**
   - "9개월 조기 퇴사"만으로 "문제 있었음" 충분히 시사하는가?
   - 아니면 다른 프록시 지표 필요?

3. **다음 액션은?**
   - A: 프로토타입 + Borry 검증 (빠른 학습)
   - B: Assumption Mapping (체계적 리스크 관리)
   - C: 대안 데이터 소스 탐색 (더 나은 프록시)

어떤 방향으로 가시겠습니까?

---

*ATS 데이터만으로 70-80% 가치 제공 가능. 실용적이고 구현 가능한 솔루션.*
