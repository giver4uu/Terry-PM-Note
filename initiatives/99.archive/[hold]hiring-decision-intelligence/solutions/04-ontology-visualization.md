# 채용 온톨로지 v0.3 지식 그래프 시각화

**생성일:** 2025-01-20
**원본 문서:** `04-ontology-practical-v0.3.md`

---

## 🕸️ 전체 지식 그래프 (Knowledge Graph)

온톨로지의 모든 엔티티와 관계를 하나의 지식 그래프로 표현합니다.

```mermaid
graph TB
    %% Priority 1: 핵심 의사결정 지원 (빨간색 계열)
    subgraph P1["🔴 Priority 1: 핵심 의사결정 지원"]
        BP[BehavioralPattern<br/>행동 패턴<br/>5개 타입]
        CN[Concern<br/>우려사항<br/>6개 타입]
        HO[HiringOutcome<br/>채용 결과<br/>hired/rejected/withdrawn]
        EM[Employment<br/>재직 정보<br/>조기 퇴사 추적]
    end
    
    %% Priority 2: 후보자 및 포지션 (노란색 계열)
    subgraph P2["🟡 Priority 2: 후보자 및 포지션"]
        CD[Candidate<br/>후보자<br/>채용 프로세스 상태]
        CP[CandidateProfile<br/>후보자 프로필<br/>경력/학력/스킬]
        PS[Position<br/>포지션<br/>채용 공고]
    end
    
    %% Priority 3: 면접 및 평가 (초록색 계열)
    subgraph P3["🟢 Priority 3: 면접 및 평가"]
        IF[InterviewFeedback<br/>면접 평가<br/>점수/노트/결정]
        IT[InterviewTranscript<br/>면접 스크립트<br/>질문-답변 쌍]
        CM[Competency<br/>역량<br/>core/role-specific]
        CE[CompetencyEvaluation<br/>역량 평가<br/>점수/근거]
        SG[Signal<br/>AI 추출 신호<br/>레드 플래그]
    end
    
    %% Priority 4: 유사도 및 기억 (파란색 계열)
    subgraph P4["🔵 Priority 4: 유사도 및 기억"]
        SM[Similarity<br/>유사도<br/>후보자 간 비교]
        MT[MemoryTrigger<br/>기억 트리거<br/>과거 케이스 상기]
    end
    
    %% BehavioralPattern 세부 타입
    subgraph BP_Types["BehavioralPattern Types"]
        BP1[team-credit-confusion<br/>40% prevalence<br/>75% problem rate]
        BP2[cultural-fit-mismatch<br/>25% prevalence<br/>60% problem rate]
        BP3[decision-avoidance<br/>20% prevalence<br/>70% problem rate]
        BP4[communication-dysfunction<br/>15% prevalence<br/>65% problem rate]
        BP5[job-hopping<br/>10% prevalence<br/>55% problem rate]
    end
    
    %% Concern 세부 타입
    subgraph CN_Types["Concern Types"]
        CN1[ownership]
        CN2[communication]
        CN3[learning-agility]
        CN4[cultural-fit]
        CN5[technical-depth]
        CN6[collaboration-style]
    end
    
    %% ========== 핵심 관계 정의 ==========
    
    %% Candidate 중심 관계
    CD -->|hasProfile 1:1| CP
    CD -->|appliesTo N:1| PS
    CD -->|receivedFeedback 1:N| IF
    CD -->|raisedConcerns 1:N| CN
    CD -->|matchesPattern N:N 확률적| BP
    CD -->|similarTo N:N 유사도| CD
    CD -->|hasOutcome 1:0..1| HO
    
    %% InterviewFeedback 관계
    IF -->|linkedTo 1:1| IT
    IF -->|raisedConcern 1:N| CN
    IF -->|evaluatesCompetency 1:N| CE
    IF -->|extractedSignals 1:N| SG
    IF -->|evaluatesCandidate N:1| CD
    
    %% InterviewTranscript 관계
    IT -->|detectedPatterns 1:N| BP
    IT -->|aiExtractedSignals 1:N| SG
    
    %% BehavioralPattern 관계
    BP -->|observedIn 1:N| CD
    BP -->|correlatedWith 1:N 확률분포| HO
    BP --> BP1
    BP --> BP2
    BP --> BP3
    BP --> BP4
    BP --> BP5
    
    %% Concern 관계
    CN -->|raisedFor N:1| CD
    CN -->|extractedFrom N:1| IF
    CN -->|linkedTo N:N 상관관계| BP
    CN -->|validatedBy N:N 통계적| HO
    CN --> CN1
    CN --> CN2
    CN --> CN3
    CN --> CN4
    CN --> CN5
    CN --> CN6
    
    %% HiringOutcome 관계
    HO -->|forCandidate 1:1| CD
    HO -->|basedOn 1:N| IF
    HO -->|leads_to 1:0..1 조건부| EM
    
    %% Employment 관계
    EM -->|follows 1:1| HO
    
    %% Position 관계
    PS -->|requiresCompetency 1:N| CM
    PS -->|receivedApplications 1:N| CD
    
    %% Competency 관계
    CM -->|requiredBy N:1| PS
    CM -->|evaluatedIn 1:N| CE
    CE -->|evaluatesCompetency N:1| CM
    
    %% Similarity 및 MemoryTrigger 관계
    SM -->|compares 1:2| CD
    SM -->|triggersMemory 1:0..1 조건부| MT
    MT -->|forCurrentCandidate 1:1| CD
    MT -->|recallsPastCandidate 1:1| CD
    MT -->|triggeredBy 1:1| SM
    
    %% Signal 관계
    SG -->|extractedFrom N:1| IF
    SG -->|detectedFrom N:1| IT
    SG -->|indicatesPattern N:N| BP
    
    %% CandidateProfile 관계
    CP -->|demonstrates 0:N| CM
    CP -->|hasPattern 0:N| BP
    
    %% 스타일링
    classDef priority1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    classDef priority2 fill:#ffd93d,stroke:#f59f00,stroke-width:2px,color:#000
    classDef priority3 fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px,color:#000
    classDef priority4 fill:#4ecdc4,stroke:#087f5b,stroke-width:2px,color:#000
    classDef pattern fill:#ff8787,stroke:#c92a2a,stroke-width:2px,color:#000
    classDef concern fill:#ffe066,stroke:#f59f00,stroke-width:2px,color:#000
    
    class BP,CN,HO,EM priority1
    class CD,CP,PS priority2
    class IF,IT,CM,CE,SG priority3
    class SM,MT priority4
    class BP1,BP2,BP3,BP4,BP5 pattern
    class CN1,CN2,CN3,CN4,CN5,CN6 concern
```

---

## 🔍 BehavioralPattern 지식 그래프 상세

5개 행동 패턴과 그들의 관계, 통계적 특성을 지식 그래프로 표현합니다.

```mermaid
graph LR
    subgraph Patterns["BehavioralPattern 지식 그래프"]
        BP[BehavioralPattern<br/>핵심 개념]
        
        BP1[team-credit-confusion<br/>팀 성과 착각<br/>prevalence: 40%<br/>problem_rate: 75%]
        BP2[cultural-fit-mismatch<br/>문화 부적응<br/>prevalence: 25%<br/>problem_rate: 60%]
        BP3[decision-avoidance<br/>의사결정 회피<br/>prevalence: 20%<br/>problem_rate: 70%]
        BP4[communication-dysfunction<br/>소통 장애<br/>prevalence: 15%<br/>problem_rate: 65%]
        BP5[job-hopping<br/>이직 빈번<br/>prevalence: 10%<br/>problem_rate: 55%]
        
        BP --> BP1
        BP --> BP2
        BP --> BP3
        BP --> BP4
        BP --> BP5
    end
    
    subgraph Outcomes["Historical Outcomes"]
        HO1[Early Departure 6M<br/>60%]
        HO2[Early Departure 12M<br/>75%]
        HO3[Avg Duration<br/>7.2개월]
        HO4[Early Departure 6M<br/>73%]
        HO5[Avg Duration<br/>4.1개월]
        HO6[Early Departure 6M<br/>67%]
        HO7[Avg Duration<br/>6.8개월]
    end
    
    subgraph Concerns["연결된 Concern"]
        CN1[ownership]
        CN2[cultural-fit]
        CN3[communication]
        CN4[learning-agility]
    end
    
    BP1 -->|correlated| HO1
    BP1 -->|correlated| HO2
    BP1 -->|correlated| HO3
    BP2 -->|correlated| HO4
    BP2 -->|correlated| HO5
    BP3 -->|correlated| HO6
    BP3 -->|correlated| HO7
    
    BP1 -.->|strong link| CN1
    BP2 -.->|strong link| CN2
    BP3 -.->|link| CN1
    BP4 -.->|strong link| CN3
    BP5 -.->|link| CN4
    
    style BP fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    style BP1 fill:#ff8787,stroke:#c92a2a,stroke-width:2px
    style BP2 fill:#ff8787,stroke:#c92a2a,stroke-width:2px
    style BP3 fill:#ff8787,stroke:#c92a2a,stroke-width:2px
    style BP4 fill:#ff8787,stroke:#c92a2a,stroke-width:2px
    style BP5 fill:#ff8787,stroke:#c92a2a,stroke-width:2px
```

---

## 🔗 Concern ↔ BehavioralPattern 연결 지식 그래프

우려사항과 행동 패턴 간의 상관관계를 표현합니다.

```mermaid
graph TB
    subgraph CoreConcerns["Core Concerns"]
        CN1[ownership<br/>소유권/책임감]
        CN2[communication<br/>소통 능력]
        CN3[learning-agility<br/>학습 민첩성]
        CN4[cultural-fit<br/>문화 적합성]
        CN5[technical-depth<br/>기술 깊이]
        CN6[collaboration-style<br/>협업 스타일]
    end
    
    subgraph Patterns["BehavioralPattern"]
        BP1[team-credit-confusion<br/>75% problem rate]
        BP2[cultural-fit-mismatch<br/>60% problem rate]
        BP3[decision-avoidance<br/>70% problem rate]
        BP4[communication-dysfunction<br/>65% problem rate]
        BP5[job-hopping<br/>55% problem rate]
    end
    
    subgraph Candidates["Candidate"]
        CD[Candidate<br/>후보자]
    end
    
    %% 강한 상관관계 (strong correlation)
    CN1 ==>|강한 상관 0.8+| BP1
    CN1 -->|상관 0.6| BP3
    CN2 ==>|강한 상관 0.85+| BP4
    CN4 ==>|강한 상관 0.9+| BP2
    CN6 -->|상관 0.65| BP4
    CN3 -->|상관 0.6| BP5
    
    %% Concern이 Candidate에서 발생
    CD -->|raisedConcerns| CN1
    CD -->|raisedConcerns| CN2
    CD -->|raisedConcerns| CN3
    CD -->|raisedConcerns| CN4
    CD -->|raisedConcerns| CN5
    CD -->|raisedConcerns| CN6
    
    %% Pattern이 Candidate에서 감지
    CD -->|matchesPattern 확률적| BP1
    CD -->|matchesPattern 확률적| BP2
    CD -->|matchesPattern 확률적| BP3
    CD -->|matchesPattern 확률적| BP4
    CD -->|matchesPattern 확률적| BP5
    
    style CN1 fill:#ffd93d,stroke:#f59f00,stroke-width:2px
    style CN2 fill:#ffd93d,stroke:#f59f00,stroke-width:2px
    style CN4 fill:#ffd93d,stroke:#f59f00,stroke-width:2px
    style BP1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style BP2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style BP4 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style CD fill:#4ecdc4,stroke:#087f5b,stroke-width:3px
```

---

## 🔄 채용 프로세스 상태 전이 지식 그래프

Candidate의 상태 전이와 각 단계에서 생성되는 온톨로지 엔티티를 표현합니다.

```mermaid
graph LR
    subgraph States["Candidate 상태"]
        S1[screening<br/>서류 검토]
        S2[interviewing<br/>면접 진행]
        S3[debrief<br/>평가 회의]
        S4[offer<br/>오퍼 제안]
        S5[hired<br/>채용 완료]
        S6[rejected<br/>불합격]
        S7[withdrawn<br/>철회]
    end
    
    subgraph Entities["생성되는 엔티티"]
        IF[InterviewFeedback<br/>면접 평가]
        CN[Concern<br/>우려사항]
        BP[BehavioralPattern<br/>행동 패턴]
        SM[Similarity<br/>유사도]
        MT[MemoryTrigger<br/>기억 트리거]
        HO[HiringOutcome<br/>채용 결과]
        EM[Employment<br/>재직 정보]
    end
    
    S1 -->|서류 통과| S2
    S2 -->|모든 면접 완료| S3
    S3 -->|합격 결정| S4
    S3 -->|불합격 결정| S6
    S4 -->|오퍼 수락| S5
    S4 -->|오퍼 거절| S7
    
    S2 -.->|생성| IF
    S2 -.->|추출| CN
    S2 -.->|감지| BP
    S3 -.->|계산| SM
    S3 -.->|생성| MT
    S3 -.->|결정| HO
    S5 -.->|생성| EM
    
    style S1 fill:#e9ecef,stroke:#495057,stroke-width:2px
    style S2 fill:#fff3bf,stroke:#f59f00,stroke-width:2px
    style S3 fill:#d0bfff,stroke:#5f3dc4,stroke-width:3px
    style S5 fill:#b2f2bb,stroke:#2b8a3e,stroke-width:2px
    style S6 fill:#ffc9c9,stroke:#c92a2a,stroke-width:2px
    style IF fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px
    style CN fill:#ffd93d,stroke:#f59f00,stroke-width:2px
    style BP fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style HO fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px
```

---

## 📈 Employment 타임라인 지식 그래프

재직 기간과 조기 퇴사 위험 신호를 지식 그래프로 표현합니다.

```mermaid
graph TB
    subgraph Timeline["Employment 타임라인"]
        EM[Employment<br/>재직 정보<br/>startDate: 2025-01-01]
        
        T1[Onboarding<br/>0-3개월<br/>위험도: 중간]
        T2[Probation<br/>0-6개월<br/>위험도: 높음]
        T3[Early Departure<br/>0-12개월<br/>위험도: 매우 높음]
        T4[Stable Period<br/>12개월+<br/>위험도: 낮음]
    end
    
    subgraph Signals["신호 소스"]
        MF3[Manager Feedback<br/>3개월 후<br/>선택적]
        MF6[Manager Feedback<br/>6개월 후<br/>선택적]
        PR[Performance Rating<br/>성과 평가<br/>선택적]
        PIP[PIP Status<br/>성과 개선 계획<br/>선택적]
        PH[Promotion History<br/>승진 이력<br/>선택적]
        LI[LinkedIn Activity<br/>LinkedIn 활동<br/>선택적]
    end
    
    subgraph Outcomes["결과"]
        ED[Early Departure<br/>조기 퇴사<br/>12개월 미만]
        SE[Stable Employment<br/>안정적 재직<br/>12개월+]
        DR[departureReason<br/>퇴사 사유<br/>performance/better-offer/personal]
    end
    
    EM -->|타임라인| T1
    T1 -->|타임라인| T2
    T2 -->|타임라인| T3
    T3 -->|타임라인| T4
    
    EM -->|hasAdditionalSignals| MF3
    EM -->|hasAdditionalSignals| MF6
    EM -->|hasAdditionalSignals| PR
    EM -->|hasAdditionalSignals| PIP
    EM -->|hasAdditionalSignals| PH
    EM -->|hasAdditionalSignals| LI
    
    T3 -->|조기 퇴사 위험| ED
    T4 -->|안정적 재직| SE
    ED -->|departureReason| DR
    
    MF3 -.->|신호| ED
    MF6 -.->|신호| ED
    PR -.->|신호| ED
    PIP -.->|강한 신호| ED
    
    style EM fill:#6bcf7f,stroke:#2b8a3e,stroke-width:3px
    style T3 fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style ED fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style SE fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px
    style PIP fill:#ff8787,stroke:#c92a2a,stroke-width:2px
```

---

## 🔗 Concern → BehavioralPattern 연결

```mermaid
graph TB
    subgraph "Concern Types"
        C1[ownership]
        C2[communication]
        C3[learning-agility]
        C4[cultural-fit]
        C5[technical-depth]
        C6[collaboration-style]
    end
    
    subgraph "BehavioralPattern"
        P1[team-credit-confusion]
        P2[cultural-fit-mismatch]
        P3[decision-avoidance]
        P4[communication-dysfunction]
        P5[job-hopping]
    end
    
    C1 -->|강한 상관| P1
    C1 -->|상관| P3
    C2 -->|강한 상관| P4
    C4 -->|강한 상관| P2
    C6 -->|상관| P4
    C3 -->|상관| P5
    
    style C1 fill:#ffd93d
    style C2 fill:#ffd93d
    style C4 fill:#ffd93d
    style P1 fill:#ff6b6b
    style P2 fill:#ff6b6b
    style P4 fill:#ff6b6b
```

---

## 🔄 실제 사용 사례: 면접 → 의사결정 지식 그래프

실제 채용 프로세스에서 온톨로지가 어떻게 작동하는지 보여줍니다.

```mermaid
graph TD
    Start[면접 시작] --> IT[InterviewTranscript<br/>면접 스크립트]
    
    IT -->|AI 분석| SG[Signal 추출<br/>레드 플래그 신호]
    IT -->|연결| IF[InterviewFeedback<br/>면접 평가 작성]
    
    SG -->|패턴 감지| BP[BehavioralPattern<br/>행동 패턴 감지<br/>confidence: 0.75]
    IF -->|우려사항 추출| CN[Concern<br/>우려사항<br/>severity: high]
    
    BP -->|확률적 매칭| CD1[Current Candidate<br/>현재 후보자]
    CN -->|raisedFor| CD1
    
    CD1 -->|similarity 계산| SM[Similarity<br/>유사도 계산<br/>score: 0.82]
    SM -->|과거 케이스 검색| CD2[Past Candidate<br/>과거 후보자<br/>18개월 전]
    
    SM -->|score > 0.75| MT[MemoryTrigger<br/>기억 트리거 생성]
    MT -->|과거 정보 조회| HO_Past[HiringOutcome<br/>과거: hired]
    MT -->|과거 정보 조회| EM_Past[Employment<br/>과거: 조기 퇴사<br/>6개월]
    
    IF -->|Debrief 회의| Debrief[Debrief<br/>평가 회의]
    BP -->|Debrief 회의| Debrief
    CN -->|Debrief 회의| Debrief
    MT -->|기억 트리거 표시| Debrief
    
    Debrief -->|의사결정| HO_Current[HiringOutcome<br/>현재: rejected<br/>decisionRationale]
    
    HO_Current -->|hired인 경우| EM_Current[Employment<br/>재직 정보]
    EM_Current -->|조기 퇴사 추적| OD[OutcomeDistribution<br/>결과 분포 업데이트]
    OD -->|검증 데이터| BP
    
    style IT fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px
    style SG fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px
    style BP fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    style CN fill:#ffd93d,stroke:#f59f00,stroke-width:2px
    style SM fill:#4ecdc4,stroke:#087f5b,stroke-width:2px
    style MT fill:#4ecdc4,stroke:#087f5b,stroke-width:3px
    style HO_Current fill:#6bcf7f,stroke:#2b8a3e,stroke-width:2px
    style Debrief fill:#9775fa,stroke:#5f3dc4,stroke-width:3px,color:#fff
```

---

## 🧠 Similarity & MemoryTrigger 지식 그래프

유사도 계산과 기억 트리거 메커니즘을 지식 그래프로 표현합니다.

```mermaid
graph TB
    subgraph Current["현재 채용 프로세스"]
        CD1[Current Candidate<br/>현재 후보자<br/>김철수]
        CP1[CandidateProfile<br/>경력 5년<br/>Backend Engineer]
        IF1[InterviewFeedback<br/>평가 점수: 3.5/5.0]
        CN1[Concern<br/>ownership: high]
        BP1[BehavioralPattern<br/>team-credit-confusion<br/>confidence: 0.8]
    end
    
    subgraph Similarity["Similarity 계산"]
        SM[Similarity<br/>overallScore: 0.82<br/>calculatedDate: 2025-01-20]
        SM_Reasons[Similarity Reasons<br/>competencyScore: 0.85<br/>concernOverlap: 0.9<br/>profileSimilarity: 0.75]
    end
    
    subgraph Past["과거 케이스 (18개월 전)"]
        CD2[Past Candidate<br/>과거 후보자<br/>이영희]
        CP2[CandidateProfile<br/>경력 5년<br/>Backend Engineer]
        IF2[InterviewFeedback<br/>평가 점수: 3.6/5.0]
        CN2[Concern<br/>ownership: high]
        BP2[BehavioralPattern<br/>team-credit-confusion<br/>confidence: 0.75]
        HO2[HiringOutcome<br/>decision: hired<br/>decisionDate: 2023-07-15]
        EM2[Employment<br/>startDate: 2023-07-20<br/>endDate: 2024-01-15<br/>earlyDeparture: true<br/>departureReason: performance]
    end
    
    subgraph Memory["MemoryTrigger 생성"]
        MT[MemoryTrigger<br/>triggerDate: 2025-01-20<br/>similarityScore: 0.82]
        MT_Context[displayContext<br/>"18개월 전 유사 케이스 상기"]
        MT_Reminders[keyReminders<br/>이름: 이영희<br/>퇴사 사유: performance<br/>재직 기간: 6개월<br/>면접 평가: 3.6/5.0]
    end
    
    subgraph User["보리 (HR 담당자)"]
        BORI[보리<br/>의사결정 지원]
    end
    
    %% 현재 후보자 연결
    CD1 -->|hasProfile| CP1
    CD1 -->|receivedFeedback| IF1
    CD1 -->|raisedConcerns| CN1
    CD1 -->|matchesPattern| BP1
    
    %% Similarity 계산
    CD1 -->|비교 대상| SM
    CD2 -->|비교 대상| SM
    SM -->|reasons| SM_Reasons
    
    %% Similarity → MemoryTrigger
    SM -->|triggersMemory<br/>score > 0.75| MT
    MT -->|forCurrentCandidate| CD1
    MT -->|recallsPastCandidate| CD2
    
    %% 과거 케이스 연결
    CD2 -->|hasProfile| CP2
    CD2 -->|receivedFeedback| IF2
    CD2 -->|raisedConcerns| CN2
    CD2 -->|matchesPattern| BP2
    CD2 -->|hasOutcome| HO2
    HO2 -->|leads_to| EM2
    
    %% MemoryTrigger 정보 수집
    MT -->|pastOutcome| HO2
    MT -->|pastEmployment| EM2
    MT -->|concernOverlap| CN2
    
    %% MemoryTrigger 생성
    MT -->|생성| MT_Context
    MT -->|생성| MT_Reminders
    
    %% 사용자에게 표시
    MT -->|기억 트리거 표시| BORI
    MT_Context -->|표시| BORI
    MT_Reminders -->|표시| BORI
    
    style CD1 fill:#4ecdc4,stroke:#087f5b,stroke-width:3px
    style CD2 fill:#868e96,stroke:#495057,stroke-width:2px
    style SM fill:#4ecdc4,stroke:#087f5b,stroke-width:3px
    style MT fill:#4ecdc4,stroke:#087f5b,stroke-width:3px,color:#fff
    style BORI fill:#9775fa,stroke:#5f3dc4,stroke-width:3px,color:#fff
    style EM2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
```

---

## 📊 온톨로지 엔티티 요약

### Priority 1: 핵심 의사결정 지원 (🔴 빨간색)
| 엔티티 | 설명 | 핵심 속성 |
|--------|------|----------|
| **BehavioralPattern** | 행동 패턴 (5개 타입) | patternType, confidence, prevalence, historicalOutcome |
| **Concern** | 우려사항 (6개 타입) | concernType, severity, evidenceSnippets, validationHistory |
| **HiringOutcome** | 채용 결과 | decision, decisionDate, decisionRationale, concerns_overridden |
| **Employment** | 재직 정보 | startDate, endDate, earlyDeparture, departureReason, performanceRating |

### Priority 2: 후보자 및 포지션 (🟡 노란색)
| 엔티티 | 설명 | 핵심 속성 |
|--------|------|----------|
| **Candidate** | 후보자 | name, appliedDate, currentStage |
| **CandidateProfile** | 후보자 프로필 | yearsOfExperience, previousCompanies, jobTenures |
| **Position** | 포지션 | title, team, status, requiredYearsOfExperience |

### Priority 3: 면접 및 평가 (🟢 초록색)
| 엔티티 | 설명 | 핵심 속성 |
|--------|------|----------|
| **InterviewFeedback** | 면접 평가 | interviewDate, overallScore, decision, notes |
| **InterviewTranscript** | 면접 스크립트 | interviewDate, duration_minutes, questionAnswerPairs |
| **Competency** | 역량 | name, category, proficiencyLevels, evaluationCriteria |
| **Signal** | AI 추출 신호 | signalType, confidence, extractedFrom |

### Priority 4: 유사도 및 기억 (🔵 파란색)
| 엔티티 | 설명 | 핵심 속성 |
|--------|------|----------|
| **Similarity** | 유사도 | overallScore, competencyScoreSimilarity, concernOverlap |
| **MemoryTrigger** | 기억 트리거 | similarityScore, displayContext, keyReminders, pastOutcome |

---

## 🔗 핵심 관계 요약

### 확률적 관계 (Probabilistic)
- `Candidate --[matchesPattern]--> BehavioralPattern`: confidence score 포함
- `BehavioralPattern --[correlatedWith]--> HiringOutcome`: 확률 분포 포함
- `Concern --[linkedTo]--> BehavioralPattern`: correlation coefficient 포함

### 선택적 관계 (Optional)
- `Candidate --[raisedConcerns]--> Concern`: 0..N (우려사항 없을 수도)
- `InterviewFeedback --[raisedConcern]--> Concern`: 0..N
- `HiringOutcome --[leads_to]--> Employment`: 0..1 (hired인 경우에만)

### 조건부 관계 (Conditional)
- `Similarity --[triggersMemory]--> MemoryTrigger`: similarityScore > 0.75
- `HiringOutcome --[leads_to]--> Employment`: decision == 'hired'

### 통계적 관계 (Statistical)
- `Concern --[validatedBy]--> HiringOutcome`: 과거 우려사항 → 실제 결과 검증
- `BehavioralPattern --[correlatedWith]--> HiringOutcome`: 패턴 → 결과 분포

---

## 🎯 지식 그래프 활용 시나리오

### 시나리오 1: 면접 중 실시간 패턴 감지
```
InterviewTranscript → Signal 추출 → BehavioralPattern 감지 → Concern 생성
→ 보리에게 실시간 알림
```

### 시나리오 2: Debrief 회의 전 유사 케이스 상기
```
Current Candidate → Similarity 계산 → Past Candidate 발견 
→ MemoryTrigger 생성 → 보리에게 "18개월 전 유사 케이스" 표시
```

### 시나리오 3: 채용 후 조기 퇴사 위험 추적
```
Employment 생성 → 타임라인 추적 → 신호 수집 (Manager Feedback, PIP 등)
→ Early Departure 위험도 계산 → OutcomeDistribution 업데이트
```

### 시나리오 4: Concern 검증 및 학습
```
Concern 생성 → HiringOutcome 결정 → Employment 결과
→ Concern --[validatedBy]--> HiringOutcome 통계 업데이트
→ 향후 Concern 신뢰도 향상
```

---

## 🔍 핵심 인사이트

1. **BehavioralPattern이 핵심**: 5개 패턴이 조기 퇴사 예측의 핵심 (연 4억 절감)
   - team-credit-confusion: 40% prevalence, 75% problem rate
   - cultural-fit-mismatch: 25% prevalence, 60% problem rate
   - decision-avoidance: 20% prevalence, 70% problem rate

2. **확률적 관계**: 모든 패턴 매칭은 confidence score 포함
   - 높은 신뢰도: >= 3개 red flags
   - 중간 신뢰도: 2개 red flags
   - 낮은 신뢰도: 1개 red flag

3. **시간성 중요**: Employment 타임라인과 신호 포인트 추적
   - Onboarding (0-3개월): 위험도 중간
   - Probation (0-6개월): 위험도 높음
   - Early Departure (0-12개월): 위험도 매우 높음

4. **MemoryTrigger**: 18개월 전 케이스 기억 활성화
   - similarityScore > 0.75 시 트리거
   - keyReminders: 이름 + 퇴사 사유 + PIP + 면접 평가

5. **선택적 속성**: 회사마다 다른 필드 허용
   - Performance Rating (있으면 사용)
   - PIP Status (있으면 사용)
   - Manager Feedback (3/6개월 후, 선택적)

---

## 📚 참고

- **원본 문서**: `04-ontology-practical-v0.3.md`
- **버전**: v0.3 (제리 PM + 보리 HR 실무자 피드백 통합)
- **작성일**: 2025-12-02
- **핵심 전략**: 완벽한 온톨로지 < 작동하는 MVP

---

*이 지식 그래프 시각화는 `04-ontology-practical-v0.3.md` 문서를 기반으로 생성되었습니다.*

