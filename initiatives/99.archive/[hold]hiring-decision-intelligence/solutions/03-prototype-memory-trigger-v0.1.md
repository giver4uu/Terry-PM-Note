# 프로토타입: 기억 트리거 시스템 v0.1

**버전:** v0.1 (Mock Data Prototype)
**작성일:** 2025-12-01
**목적:** James-Daniel 시나리오로 "유사 후보자 + 기억 트리거" UX 검증

---

## 🎯 검증 목표

### 핵심 가정 3가지
1. **Borry가 과거 케이스를 기억할 수 있는가?**
   - 시스템이 "Daniel"만 보여줘도 "6개월 PIP, Self-direction 문제" 떠올리는가?

2. **재직 기간 프록시가 충분한가?**
   - "9개월 조기 퇴사" 정보만으로 "문제 있었음" 충분히 시사하는가?

3. **이 접근법이 의사결정을 가속화하는가?**
   - 2주 지연 → 즉시 결정으로 전환되는가?

---

## 📊 Mock 데이터: James vs Daniel

### Current Candidate: James

```json
{
  "candidateId": "CAND-2025-042",
  "name": "James Kim",
  "position": "Senior Full-stack Engineer",
  "appliedDate": "2025-11-15",
  "currentStage": "Debrief Meeting",

  "profile": {
    "yearsOfExperience": 7,
    "previousCompanies": [
      {
        "name": "TechCorp",
        "duration": "2.5년",
        "role": "Senior Engineer"
      },
      {
        "name": "StartupX",
        "duration": "3년",
        "role": "Full-stack Developer"
      }
    ],
    "education": "서울대 컴퓨터공학"
  },

  "interviewFeedback": [
    {
      "interviewer": "Sarah (CTO)",
      "date": "2025-11-22",
      "overallScore": 4.2,
      "competencyScores": {
        "systemThinking": 4.5,
        "communicationSkills": 4.0,
        "ownership": 3.5
      },
      "notes": "기술적으로 뛰어남. 하지만 프로젝트 설명 시 '팀이 했다', '우리가 결정했다'는 표현 반복. 본인의 주도적 역할이 불분명.",
      "concernsRaised": [
        {
          "type": "ownership",
          "severity": "medium",
          "evidence": "'제가 주도한 것'보다 '팀이 함께' 표현 7회 사용"
        }
      ]
    },
    {
      "interviewer": "Michael (Hiring Manager)",
      "date": "2025-11-23",
      "overallScore": 4.5,
      "notes": "시스템 설계 탁월. 약간 수동적이지만 우리 팀에서 성장 가능. 기술 스택 완벽.",
      "recommendation": "Strong Hire"
    },
    {
      "interviewer": "Lisa (Senior Engineer)",
      "date": "2025-11-23",
      "overallScore": 4.0,
      "notes": "코딩 테스트 우수. 페어 프로그래밍 시 가이드 필요. 독립적 의사결정 관찰 안 됨.",
      "concernsRaised": [
        {
          "type": "self-direction",
          "severity": "low",
          "evidence": "방향 제시 후 잘 따름. 스스로 방향 제안은 2회"
        }
      ]
    }
  ],

  "interviewTranscripts": [
    {
      "interviewer": "Sarah",
      "question": "가장 자랑스러운 프로젝트를 설명해주세요. 당신의 역할은?",
      "answer": "저희 팀이 마이크로서비스 아키텍처 전환을 했어요. 우리가 함께 설계하고, 제가 일부 서비스를 구현했습니다. 팀원들과 긴밀히 협업해서...",
      "extractedSignals": [
        {
          "signal": "ambiguous-ownership",
          "evidence": "'저희 팀이', '우리가', '팀원들과' - 본인 역할 불명확",
          "severity": "medium"
        }
      ]
    },
    {
      "interviewer": "Sarah",
      "question": "가장 어려운 기술적 결정을 혼자 내린 경험은?",
      "answer": "음... 데이터베이스 선택할 때요. 그때 팀이 PostgreSQL vs MongoDB 고민했고, 제가 벤치마크 데이터 준비했어요. 최종 결정은 팀 회의에서...",
      "extractedSignals": [
        {
          "signal": "decision-avoidance",
          "evidence": "'팀이 고민', '최종 결정은 팀 회의' - 본인 결정 회피",
          "severity": "high"
        }
      ]
    }
  ],

  "debriefMeetingContext": {
    "date": "2025-11-25",
    "attendees": ["Borry", "Sarah", "Michael", "Lisa"],
    "currentStatus": "Sarah가 Ownership 우려 제기, Michael 강력 옹호 중",
    "timeElapsed": "이미 10일 경과, 리드타임 압박"
  }
}
```

### Past Similar Candidate: Daniel Lee

```json
{
  "candidateId": "CAND-2024-018",
  "name": "Daniel Lee",
  "position": "Senior Full-stack Engineer",
  "appliedDate": "2024-02-28",
  "hiredDate": "2024-03-20",
  "departureDate": "2024-12-15",

  "profile": {
    "yearsOfExperience": 6,
    "previousCompanies": [
      {
        "name": "FinTech Inc",
        "duration": "2년",
        "role": "Senior Developer"
      },
      {
        "name": "E-commerce Co",
        "duration": "3년",
        "role": "Backend Engineer"
      }
    ],
    "education": "연세대 컴퓨터공학"
  },

  "interviewFeedback": [
    {
      "interviewer": "Sarah (CTO)",
      "date": "2024-03-08",
      "overallScore": 4.3,
      "competencyScores": {
        "systemThinking": 4.5,
        "communicationSkills": 4.2,
        "ownership": 3.8
      },
      "notes": "기술 역량 탁월. 프로젝트 설명 시 '팀이 했다' 반복. 본인 기여도 불분명.",
      "concernsRaised": [
        {
          "type": "ownership",
          "severity": "medium",
          "evidence": "프로젝트 성과를 팀 크레딧으로 돌림. '제가 주도'는 2회만"
        }
      ]
    },
    {
      "interviewer": "Michael (Hiring Manager)",
      "date": "2024-03-09",
      "overallScore": 4.5,
      "notes": "시스템 설계 뛰어남. 조금 수동적이지만 우리 팀에서 키우면 된다. 기술적으로 완벽.",
      "recommendation": "Strong Hire"
    },
    {
      "interviewer": "Jason (Senior Engineer, 당시)",
      "date": "2024-03-09",
      "overallScore": 4.0,
      "notes": "코딩 실력 우수. 독립적 작업보다 가이드 받는 걸 선호하는 듯.",
      "concernsRaised": [
        {
          "type": "self-direction",
          "severity": "low",
          "evidence": "명확한 지시 후 잘 수행. 스스로 제안은 적음"
        }
      ]
    }
  ],

  "interviewTranscripts": [
    {
      "interviewer": "Sarah",
      "question": "가장 영향력 있던 프로젝트에서 당신의 역할은?",
      "answer": "저희가 결제 시스템 리팩토링을 했어요. 팀이 함께 설계하고, 제가 일부를 구현했습니다. 다들 열심히 해서...",
      "extractedSignals": [
        {
          "signal": "ambiguous-ownership",
          "evidence": "'저희가', '팀이', '다들' - 개인 기여 불명확",
          "severity": "medium"
        }
      ]
    }
  ],

  "hiringOutcome": {
    "decision": "hired",
    "decisionDate": "2024-03-15",
    "decisionContext": {
      "sarahConcern": "Ownership 우려 제기",
      "michaelAdvocacy": "강력 옹호 - '기술 좋으면 소프트 스킬 성장 가능'",
      "finalDecision": "Michael 의견 따름, Sarah 우려 기록"
    },
    "offerAccepted": "2024-03-18",
    "startDate": "2024-03-20"
  },

  "employmentOutcome": {
    "employmentDuration": "9개월 (274일)",
    "departureDate": "2024-12-15",
    "earlyDeparture": true,
    "departureType": "Mutual Agreement",
    "atsNotes": "Michael과 상호 합의 퇴사. 'Better fit 찾기로'"
  },

  "similarityToJames": {
    "overallSimilarity": 0.87,
    "reasons": [
      {
        "dimension": "Competency Scores",
        "similarity": 0.95,
        "detail": "System Thinking 4.5 vs 4.5, Overall 4.3 vs 4.2"
      },
      {
        "dimension": "Concerns Raised",
        "similarity": 0.92,
        "detail": "동일 우려: Ownership (Sarah), Self-direction (팀원)"
      },
      {
        "dimension": "Interview Patterns",
        "similarity": 0.85,
        "detail": "'팀이 했다' 반복, '제가 주도'는 드물게 사용"
      },
      {
        "dimension": "Manager Advocacy",
        "similarity": 0.78,
        "detail": "Michael 강력 옹호, '기술 좋으면 성장 가능' 동일 논리"
      }
    ]
  }
}
```

---

## 🎨 UX 프로토타입: 시스템 출력

### 화면 1: Debrief 회의 중 실시간 알림

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 유사 후보자 발견

James Kim과 87% 유사한 과거 케이스를 발견했습니다.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Daniel Lee (CAND-2024-018)
   ├─ Position: Senior Full-stack Engineer
   ├─ Hired: 2024-03-20
   └─ Status: 퇴사 (2024-12-15, 9개월 재직)

[상세 보기 →]
```

### 화면 2: 유사도 분석 상세

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Daniel Lee - 유사도 분석 (87%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 평가 점수 유사도: 95%
   ┌─────────────────┬────────┬────────┐
   │ Competency      │ James  │ Daniel │
   ├─────────────────┼────────┼────────┤
   │ System Thinking │  4.5   │  4.5   │
   │ Communication   │  4.0   │  4.2   │
   │ Overall         │  4.2   │  4.3   │
   └─────────────────┴────────┴────────┘

⚠️  동일 우려 사항: 92% 일치
   ┌──────────────────────────────────────────┐
   │ Ownership 부족                            │
   │ ├─ Sarah (CTO) 두 케이스 모두 제기       │
   │ ├─ James: "팀이 했다" 반복 (7회)         │
   │ └─ Daniel: "팀이 했다" 반복 (5회)        │
   │                                           │
   │ Self-direction 약함                       │
   │ ├─ 두 케이스 모두 팀원이 관찰             │
   │ ├─ James: "가이드 필요"                  │
   │ └─ Daniel: "지시 받는 것 선호"           │
   └──────────────────────────────────────────┘

🗣️  면접 패턴 유사도: 85%
   ┌──────────────────────────────────────────┐
   │ James: "우리가 함께 설계하고..."          │
   │ Daniel: "저희가 함께 설계하고..."         │
   │                                           │
   │ 공통 패턴:                                │
   │ ✓ 개인 기여도 불명확                      │
   │ ✓ 팀 크레딧으로 성과 돌림                 │
   │ ✓ "제가 주도" 표현 드묾                   │
   └──────────────────────────────────────────┘

👥 의사결정 패턴 유사도: 78%
   ┌──────────────────────────────────────────┐
   │ Michael (Manager) 강력 옹호               │
   │                                           │
   │ James (현재):                             │
   │ "약간 수동적이지만 우리 팀에서 성장 가능" │
   │                                           │
   │ Daniel (2024-03):                         │
   │ "조금 수동적이지만 우리 팀에서 키우면 됨" │
   │                                           │
   │ → 동일한 옹호 논리 사용                   │
   └──────────────────────────────────────────┘
```

### 화면 3: 채용 결정 & 결과

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Daniel Lee - 채용 결정 & 이후
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 당시 채용 결정 (2024-03-15)
   ┌──────────────────────────────────────────┐
   │ ✅ Hired                                  │
   │                                           │
   │ Sarah (CTO):                              │
   │ └─ Ownership 우려 제기                    │
   │                                           │
   │ Michael (Manager):                        │
   │ └─ "기술 좋으면 소프트 스킬 성장 가능"    │
   │ └─ Strong Hire 강력 옹호                  │
   │                                           │
   │ 최종 결정:                                │
   │ └─ Michael 의견 따름                      │
   │ └─ Sarah 우려는 기록으로만 남김           │
   └──────────────────────────────────────────┘

⏰ 채용 후 Timeline
   2024-03-20 ──┬── 입사
                │
   2024-09 ─────┼── (6개월 시점)
                │
   2024-12-15 ──┴── 퇴사 (9개월 재직)

⚠️  조기 퇴사 플래그
   ┌──────────────────────────────────────────┐
   │ 재직 기간: 9개월 (274일)                  │
   │ 회사 평균: 24개월                         │
   │ 조기 퇴사: ⚠️  Yes (1년 미만)            │
   │                                           │
   │ 퇴사 유형: Mutual Agreement               │
   │ ATS 노트: "Better fit 찾기로"             │
   │ 작성자: Michael (Manager)                 │
   └──────────────────────────────────────────┘
```

### 화면 4: 기억 트리거 ⭐

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💭 Borry님, 기억 트리거
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Daniel Lee (2024-03-20 입사, 2024-12-15 퇴사)

이 케이스 기억나시나요?

당시 상황:
├─ Sarah가 Ownership 우려 제기
├─ Michael이 "팀에서 키우면 된다" 강력 옹호
├─ 최종 Hired 결정
└─ 9개월 후 조기 퇴사

Daniel 이후 어떤 일이 있었는지 기억나시나요?
무엇이 문제였고, 어떻게 마무리됐나요?

[메모 추가하기]
```

---

## 🎭 시뮬레이션: Borry 반응 시나리오

### 시나리오 A: 기억 트리거 성공 ✅

**시스템:** "Daniel Lee, 2024-03-20 입사, 9개월 재직 후 퇴사. 기억나시나요?"

**Borry 반응:**
```
"아! Daniel! 기억나죠!"

[메모 추가]
- 입사 후 3개월: 괜찮아 보였음
- 6개월 시점: PIP 들어감
- 문제: Self-direction 심각하게 부족
  → 가이드 없으면 아무것도 못함
  → 의사결정 회피
  → 팀원들 불만 누적
- 9개월: Michael과 상호 합의 퇴사
- 교훈: "기술 좋아도 Ownership 없으면 안 됨"

→ 즉시 결정: James Reject
```

**결과:**
- ✅ 기억 트리거 성공
- ✅ Borry가 맥락 보완 (PIP, Self-direction)
- ✅ 즉시 결정 (2주 지연 방지)
- 💰 비용: 2.5억 절감 (James 채용 실패 방지)

### 시나리오 B: 부분 기억 🤔

**시스템:** "Daniel Lee, 2024-03-20 입사, 9개월 재직 후 퇴사. 기억나시나요?"

**Borry 반응:**
```
"Daniel... 이름은 아는데 정확히 기억이..."

[시스템 추가 힌트 제공]
- Sarah가 Ownership 우려 제기
- Michael이 "팀에서 키우면 된다" 옹호
- 시스템 설계 탁월했던 후보

"아! 그 케이스! 맞아요!"
- 초반엔 괜찮았는데
- 점점 독립적 작업 어려워함
- Michael이 많이 아쉬워했던...

→ 결정 보류: Sarah와 추가 논의 필요
```

**결과:**
- ⚠️  부분 성공
- ⚠️  추가 힌트 필요
- ⏱️  결정 시간 단축 (2주 → 3일)
- 💰 비용: 여전히 가치 있음

### 시나리오 C: 기억 실패 ❌

**시스템:** "Daniel Lee, 2024-03-20 입사, 9개월 재직 후 퇴사. 기억나시나요?"

**Borry 반응:**
```
"Daniel... 기억이 잘 안 나네요."
"9개월 재직했다는 건 조기 퇴사네요."
"Ownership 우려가 동일하니 리스크는 있어 보여요."

→ 결정: "보수적으로 Reject 경향"
   (확신은 없지만 조기 퇴사 데이터 영향)
```

**결과:**
- ❌ 기억 트리거 실패
- ⚠️  재직 기간 프록시만 작동
- ⏱️  결정 시간 약간 단축 (2주 → 1주)
- 💰 비용: 제한적 가치

---

## 📋 Borry 검증 세션 가이드

### 사전 준비

```markdown
**준비물:**
1. James 프로필 (위 Mock 데이터)
2. 시스템 출력 화면 4개 (인쇄 또는 화면)
3. 빈 노트 (Borry 메모용)
4. 녹음 장비 (허가 받고)

**시간:** 30-45분
**장소:** 조용한 회의실
**참석:** Borry, Terry (진행자)
```

### Phase 1: 컨텍스트 세팅 (5분)

```
"Borry님, 오늘은 새로운 채용 도구 프로토타입을 테스트하려고 해요.

상황:
- James라는 후보자가 있어요 (Senior Full-stack Engineer)
- 지금 Debrief 회의 중이에요
- Sarah가 Ownership 우려를 제기했고
- Michael은 '기술 좋으니 키우면 된다'고 옹호하고 있어요

바로 지금, 시스템이 이런 알림을 보냈어요."

[화면 1 보여주기: "유사 후보자 발견"]
```

### Phase 2: 유사도 분석 반응 (10분)

```
[화면 2 보여주기: 유사도 분석 87%]

"87% 유사하다는데, 어떻게 생각하세요?"

관찰 포인트:
□ Borry가 숫자에 공감하는가?
□ "87%"가 신뢰감을 주는가?
□ 어떤 유사도 항목을 가장 중요하게 보는가?
  (점수? 우려? 면접 패턴? 의사결정?)

질문:
1. "이 정도 유사도면 '참고할 만하다'고 느껴지나요?"
2. "어떤 유사도 항목이 가장 도움되나요?"
3. "혹시 '별로 안 비슷한데?'라고 느껴지는 부분 있나요?"
```

### Phase 3: 채용 결과 확인 (5분)

```
[화면 3 보여주기: Daniel 채용 결정 & 9개월 조기 퇴사]

"Daniel은 Hired 됐는데, 9개월 만에 퇴사했네요."

관찰 포인트:
□ "9개월 조기 퇴사"가 경고 신호로 느껴지는가?
□ "Mutual Agreement" 표현에 반응하는가?
□ Michael 옹호 → 조기 퇴사 연결고리를 파악하는가?

질문:
1. "9개월 재직 정보만으로 '문제 있었구나' 느껴지나요?"
2. "'Mutual Agreement' 보면 보통 어떤 상황일 거라 추측하시나요?"
3. "이 정보가 James 결정에 도움이 될까요?"
```

### Phase 4: 기억 트리거 ⭐ (15분)

```
[화면 4 보여주기: 기억 트리거 질문]

"Borry님, Daniel Lee 케이스 기억나시나요?
Daniel 이후 어떤 일이 있었는지 떠올려보시겠어요?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 핵심 검증 순간
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

관찰 포인트 (중요도 순):

1. 기억 여부
   □ 즉시 기억 (5초 이내)
   □ 힌트 후 기억 (15초 이내)
   □ 기억 안 남

2. 기억 내용 (만약 기억난다면)
   □ PIP 언급 여부
   □ Self-direction 문제 언급 여부
   □ 구체적 에피소드 (예: "가이드 없으면 못 움직였다")
   □ 팀 불만 언급
   □ 퇴사 경위 설명

3. 확신 수준
   □ "확실히 기억나요" (높은 확신)
   □ "아마 그랬을 거예요" (중간 확신)
   □ "정확히는 모르겠어요" (낮은 확신)

4. 의사결정 영향
   □ 즉시 결정 변경 ("James Reject")
   □ 경계심 증가 ("추가 검증 필요")
   □ 별 영향 없음 ("그냥 참고만")
```

**추가 질문:**
```
1. "이 정보 없이 결정했다면 어떻게 됐을 것 같아요?"
   → 리드타임 영향 측정

2. "9개월 재직만 보여주는 것 vs 전체 맥락(PIP 등)을 보여주는 것,
    어느 쪽이 더 도움될까요?"
   → 재직 기간 프록시 충분성 검증

3. "Daniel 케이스를 Michael에게 어떻게 설명하시겠어요?"
   → 설득 시나리오 파악
```

### Phase 5: UX 피드백 (10분)

```
전체 플로우 리뷰:
화면 1 (알림) → 화면 2 (유사도) → 화면 3 (결과) → 화면 4 (트리거)

질문:
1. "어느 화면이 가장 유용했나요?"
2. "어느 화면은 불필요하다고 느꼈나요?"
3. "정보 순서가 적절한가요? 바꾸고 싶은 순서 있나요?"
4. "너무 많은 정보인가요? 아니면 더 필요한 정보 있나요?"
5. "Debrief 회의 중 이 알림이 뜨면 방해될까요?"
   (타이밍 이슈)
6. "모바일에서도 봐야 할까요? 아니면 데스크톱만?"
```

---

## 📊 검증 결과 측정 기준

### 성공 기준 (3가지 모두 충족)

| 가정 | 검증 질문 | 성공 기준 |
|------|----------|----------|
| **1. 기억 트리거** | Borry가 Daniel 케이스 기억하는가? | ✅ 즉시 or 힌트 후 기억<br>✅ PIP/Self-direction 언급<br>✅ 구체적 에피소드 제공 |
| **2. 재직 프록시** | "9개월 재직"만으로 문제 인지하는가? | ✅ "문제 있었을 것" 추측 가능<br>✅ 경고 신호로 인식<br>⚠️  완벽하지 않아도 OK |
| **3. 의사결정 가속** | 이 정보가 결정 속도에 영향 주는가? | ✅ 2주 지연 → 즉시 or 3일 내 결정<br>✅ Michael 설득 근거 제공<br>✅ 확신 증가 |

### 실패 기준 (하나라도 해당)

| 실패 신호 | 의미 | 대응 |
|----------|------|------|
| ❌ Daniel 전혀 기억 안 남 | 기억 트리거 작동 안 함 | → Assumption 2 재검토<br>→ 더 많은 힌트 필요 |
| ❌ "9개월 재직"이 의미 없음 | 재직 프록시 불충분 | → HRIS 대안 필요<br>→ 다른 프록시 탐색 |
| ❌ 정보 있어도 결정 안 바뀜 | 가치 없음 | → 솔루션 재설계<br>→ 근본 문제 재정의 |

---

## 🔄 다음 단계 (검증 후)

### 시나리오 A: 3가지 모두 성공 ✅

**의미:**
- 기억 트리거 작동 확인
- 재직 기간 프록시 충분
- ATS 데이터만으로 가치 제공 가능

**다음 액션:**
1. **추가 시나리오 검증** (Emma, Ryan 케이스)
2. **면접 신호 추출 프로토타입** (LLM 기반)
3. **정량적 임팩트 재측정** (리드타임, 절감액)
4. **Assumption Mapping 작성** (리스크 관리)
5. **MVP 스펙 작성 시작**

### 시나리오 B: 일부 성공 ⚠️

**의미:**
- 기억 트리거 불안정
- 재직 프록시 약함
- 추가 보완 필요

**다음 액션:**
1. **대안 데이터 소스 탐색**
   - Manager 간단 피드백 (3개월/6개월 후)
   - "Quick Survey" 기능 ATS 내 추가
   - 승진/프로젝트 참여 프록시
2. **UX 개선**
   - 더 많은 힌트 제공 (면접 노트 발췌)
   - 타임라인 시각화 강화
3. **Borry 외 다른 리크루터 검증**
   - 기억력 개인차 확인

### 시나리오 C: 실패 ❌

**의미:**
- 기본 가정 틀림
- ATS만으로 불충분
- 솔루션 재설계 필요

**다음 액션:**
1. **근본 문제 재정의**
   - 실제 병목은 무엇인가?
   - 데이터가 아니라 프로세스 문제?
2. **HRIS 대안 적극 탐색**
   - Workday 말고 다른 HRIS?
   - 직접 수집 가능한가?
3. **온톨로지 v0.1 재검토**
   - PerformanceReview 없이는 불가능?
   - 다른 아키텍처 필요?

---

## 💡 예상 인사이트

### Borry가 이렇게 반응하면...

**"Daniel! 기억나죠! 6개월에 PIP 들어갔어요!"**
→ ✅ **기억 트리거 강력, MVP 진행**

**"Daniel... 조기 퇴사한 건 기억나는데 정확한 이유는..."**
→ ⚠️  **부분 성공, 힌트 강화 필요**

**"Daniel이 누구였죠? 기억이 잘..."**
→ ❌ **접근법 재검토, 데이터 소스 확대**

**"9개월이면 뭔가 문제 있었을 거예요. 보통 그래요."**
→ ✅ **재직 프록시 작동 (완벽하진 않지만 실용적)**

**"9개월 재직이 뭐 어때서요? 사람마다 다르죠."**
→ ❌ **재직 프록시 약함, 다른 신호 필요**

---

## 📎 체크리스트

### 검증 세션 전

- [ ] Mock 데이터 화면 4개 준비 (인쇄 or 디지털)
- [ ] 녹음 장비 테스트
- [ ] Borry 일정 확인 (30-45분 확보)
- [ ] 조용한 회의실 예약
- [ ] 관찰 노트 템플릿 준비

### 검증 세션 중

- [ ] Borry 허가 받고 녹음 시작
- [ ] Phase 1-5 순서대로 진행
- [ ] 핵심 질문 3개 놓치지 않기
  1. Daniel 기억나는가?
  2. 9개월 재직이 의미 있는가?
  3. 결정이 달라지는가?
- [ ] Borry 자유 발언 시간 충분히 주기
- [ ] "왜?"를 3번 이상 물어보기

### 검증 세션 후

- [ ] 녹음 전사 (24시간 내)
- [ ] 인사이트 정리 (키워드 태깅)
- [ ] 성공/실패 기준 판정
- [ ] 다음 단계 결정 (A/B/C)
- [ ] 스냅샷 작성 (Continuous Discovery 방식)
- [ ] Terry에게 보고 및 논의

---

**다음 파일:** `04-borry-validation-snapshot.md` (검증 후 작성)

*ATS 데이터만으로 충분한가? Borry 검증으로 확인한다.*
