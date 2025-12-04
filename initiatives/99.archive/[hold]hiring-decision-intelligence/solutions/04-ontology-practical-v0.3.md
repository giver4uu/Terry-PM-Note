# 채용 온톨로지 v0.3 - 실용적 의사결정 지원 시스템

**버전:** v0.3 (제리 PM + 보리 HR 실무자 피드백 통합)
**작성일:** 2025-12-02
**핵심 전략:** 완벽한 온톨로지 < 작동하는 MVP

---

## 🎯 설계 철학

### 원칙
1. **기억 트리거가 Primary다** (Fallback이 아님)
   - 보리: "18개월 전 케이스 기억 안 남 (1년 150-200명 평가)"
   - 80% 케이스에서 완전한 데이터 없음 → 인간 암묵지 활성화

2. **재직 기간은 단독 사용 불가**
   - 신뢰도 30% 미만 (조기 퇴사 중 성과 문제 30-40%만)
   - 추가 신호 필수: Manager 평가, 퇴사 사유, 레퍼런스, LinkedIn

3. **확률적 관계를 명시한다**
   - "75% 확률로 조기 퇴사" → 온톨로지 속성으로 표현
   - 신뢰도 구간 명시 (데이터 품질 기반)

4. **선택적 속성을 허용한다**
   - 회사마다 다른 필드 (PIP, Performance Rating)
   - 온톨로지 스키마는 Optional로 표현

5. **작동하는 최소 구조 우선**
   - Must Have (Phase 1): BehavioralPattern, Concern, HiringOutcome
   - Should Have: Similarity 명시화, Peer Comparison
   - Won't Have (Phase 2): 자동 진화, AI 신뢰도 상세 모델링

---

## Part 1: 온톨로지 v0.3 스키마

### 핵심 개념 (12개, 우선순위 표시)

```yaml
# Priority 1: BehavioralPattern 온톨로지 (연 4억 절감 핵심)
BehavioralPattern:
  필수속성:
    - patternId: string
    - patternType: enum [team-credit-confusion, cultural-fit-mismatch, decision-avoidance, communication-dysfunction, job-hopping]
    - displayName: string
    - description: string
  선택속성:
    - detectionRules: Rule[] (면접 신호 감지 규칙)
    - redFlagSignals: Signal[] (레드 플래그 신호 목록)
    - historicalOutcome: OutcomeDistribution (과거 결과 통계)
    - confidence: float [0.0-1.0] (패턴 감지 신뢰도)
    - prevalence: float (전체 후보자 대비 비율)
  관계:
    - observedIn → Candidate [0..N] (확률적 관계)
    - predictedFrom → InterviewTranscript [1..N]
    - correlatedWith → HiringOutcome [0..N] (확률 분포 포함)

# Priority 1: Concern 온톨로지 (의사결정 확신 제공)
Concern:
  필수속성:
    - concernId: string
    - concernType: enum [ownership, communication, learning-agility, cultural-fit, technical-depth, collaboration-style]
    - severity: enum [low, medium, high, critical]
    - raisedBy: Interviewer
    - raisedDate: datetime
  선택속성:
    - evidenceSnippets: string[] (구체적 증거 발췌)
    - interviewerNote: string (면접관 원본 노트)
    - validationHistory: ValidationRecord[] (과거 Concern → Outcome 상관관계)
    - mitigationSuggestion: string (우려 완화 방안)
  관계:
    - raisedFor → Candidate [1]
    - extractedFrom → InterviewFeedback [1..N]
    - linkedTo → BehavioralPattern [0..N]
    - validatedBy → HiringOutcome [0..N]

# Priority 1: HiringOutcome + Employment 분리
HiringOutcome:
  필수속성:
    - outcomeId: string
    - decision: enum [hired, rejected, withdrawn, offer-declined]
    - decisionDate: datetime
  선택속성:
    - decisionRationale: string (결정 이유)
    - championed_by: Interviewer (강력 옹호자)
    - concerns_overridden: Concern[] (무시된 우려사항)
  관계:
    - forCandidate → Candidate [1]
    - basedOn → InterviewFeedback [1..N]
    - leads_to → Employment [0..1] (hired인 경우에만)

Employment:
  필수속성:
    - employmentId: string
    - startDate: date
  선택속성:
    - endDate: date | null (재직 중이면 null)
    - duration_months: float (계산 필드)
    - earlyDeparture: boolean (12개월 미만 퇴사)
    - departureReason: enum [performance, better-offer, personal, company, mutual] | null
    - departureNote: string (ATS 기록)
    # 회사마다 다른 선택적 필드
    - performanceRating: float | null (있으면 사용)
    - pipStatus: boolean | null (있으면 사용)
    - managerFeedback: string | null (3/6개월 후 피드백)
    - promotionHistory: Promotion[] | null
  관계:
    - employeeOf → Company [1]
    - follows → HiringOutcome [1]
    - hasAdditionalSignals → SignalSource [0..N]

# Priority 2: Candidate (후보자)
Candidate:
  필수속성:
    - candidateId: string
    - name: string
    - appliedDate: datetime
    - currentStage: enum [screening, interviewing, debrief, offer, hired, rejected]
  선택속성:
    - email: string
    - phone: string
  관계:
    - appliesTo → Position [1]
    - hasProfile → CandidateProfile [1]
    - receivedFeedback → InterviewFeedback [0..N]
    - raisedConcerns → Concern [0..N]
    - matchesPattern → BehavioralPattern [0..N] (확률 포함)
    - similarTo → Candidate [0..N] (유사도 점수 포함)
    - hasOutcome → HiringOutcome [0..1]

# Priority 2: CandidateProfile (후보자 프로필)
CandidateProfile:
  필수속성:
    - profileId: string
    - yearsOfExperience: float
  선택속성:
    - previousCompanies: Company[]
    - jobTenures: Tenure[] (각 직장 재직 기간)
    - educationBackground: Education[]
    - linkedinUrl: string
  관계:
    - demonstrates → Competency [0..N] (추정)
    - hasPattern → BehavioralPattern [0..N]
    - extractedFrom → Resume [0..1]

# Priority 3: InterviewFeedback (면접 평가)
InterviewFeedback:
  필수속성:
    - feedbackId: string
    - interviewDate: datetime
    - interviewer: Interviewer
    - overallScore: float [1.0-5.0]
  선택속성:
    - decision: enum [strong-hire, hire, maybe, no-hire, strong-no-hire]
    - notes: string (자유 형식 노트)
    - transcriptId: string (면접 스크립트 ID)
  관계:
    - evaluatesCandidate → Candidate [1]
    - evaluatesCompetency → CompetencyEvaluation [0..N]
    - raisedConcern → Concern [0..N]
    - extractedSignals → Signal [0..N] (AI 추출 신호)
    - givenBy → Interviewer [1]

# Priority 3: InterviewTranscript (면접 스크립트)
InterviewTranscript:
  필수속성:
    - transcriptId: string
    - interviewDate: datetime
    - duration_minutes: int
  선택속성:
    - questionAnswerPairs: QA[] (질문-답변 쌍)
    - rawTranscript: string (전체 텍스트)
    - aiExtractedSignals: Signal[] (AI가 추출한 신호)
  관계:
    - linkedTo → InterviewFeedback [1]
    - detectedPatterns → BehavioralPattern [0..N]

# Priority 3: Competency (역량)
Competency:
  필수속성:
    - competencyId: string
    - name: string
    - category: enum [core, role-specific]
  선택속성:
    - definition: string
    - proficiencyLevels: ProficiencyLevel[] (레벨 1-5)
    - evaluationCriteria: Criterion[]
    - interviewQuestions: Question[]
  관계:
    - requiredBy → Position [0..N]
    - evaluatedIn → CompetencyEvaluation [0..N]

# Priority 2: Position (포지션)
Position:
  필수속성:
    - positionId: string
    - title: string
    - team: string
    - status: enum [open, on-hold, filled, closed]
  선택속성:
    - description: string
    - requiredYearsOfExperience: float
  관계:
    - requiresCompetency → Competency [1..N]
    - hasHistory → HiringHistory [0..N]
    - receivedApplications → Candidate [0..N]

# Priority 4: Similarity (유사도)
Similarity:
  필수속성:
    - similarityId: string
    - candidate1: Candidate
    - candidate2: Candidate
    - overallScore: float [0.0-1.0]
    - calculatedDate: datetime
  선택속성:
    - reasons: SimilarityReason[] (유사도 근거)
    - competencyScoreSimilarity: float
    - concernOverlap: Concern[]
    - profileSimilarity: float
    # 블랙박스 허용 (Phase 1)
    - embeddingDistance: float (설명 가능성은 Phase 2)
  관계:
    - compares → Candidate [2]
    - triggersMemory → MemoryTrigger [0..1]

# Priority 4: MemoryTrigger (기억 트리거)
MemoryTrigger:
  필수속성:
    - triggerId: string
    - currentCandidate: Candidate
    - pastCandidate: Candidate
    - triggerDate: datetime
    - similarityScore: float
  선택속성:
    - displayContext: string (보리에게 보여줄 맥락)
    - keyReminders: string[] (기억 촉진 힌트)
    # 필요한 힌트: "이름 + 퇴사 사유 + PIP + 면접 평가"
    - pastOutcome: HiringOutcome
    - pastEmployment: Employment | null
    - concernOverlap: Concern[]
  관계:
    - triggeredBy → Similarity [1]
    - forCurrentCandidate → Candidate [1]
    - recallsPastCandidate → Candidate [1]
```

### 핵심 관계 (15개, Cardinality 포함)

```yaml
1. Candidate --[appliesTo]--> Position
   - Cardinality: N:1 (한 후보자는 1개 포지션에만 지원)
   - 시간성: 지원 시점 고정

2. Candidate --[hasProfile]--> CandidateProfile
   - Cardinality: 1:1 (1명당 1개 프로필)

3. Candidate --[receivedFeedback]--> InterviewFeedback
   - Cardinality: 1:N (후보자당 여러 면접 평가)
   - 시간성: 면접 진행 순서 존재

4. Candidate --[raisedConcerns]--> Concern
   - Cardinality: 1:N (후보자당 여러 우려사항 가능)
   - 선택적: 0개일 수도 있음 (0..N)

5. Candidate --[matchesPattern]--> BehavioralPattern
   - Cardinality: N:N (후보자는 여러 패턴 매칭 가능)
   - 확률적 관계: confidence score 포함
   - 선택적: 0..N

6. Candidate --[similarTo]--> Candidate
   - Cardinality: N:N (후보자 간 유사도 그래프)
   - 속성: similarityScore [0.0-1.0]
   - 선택적: 0..N (유사 케이스 없을 수도)

7. Candidate --[hasOutcome]--> HiringOutcome
   - Cardinality: 1:0..1 (아직 결정 안 됐을 수도)
   - 시간성: 채용 프로세스 종료 시점

8. HiringOutcome --[leads_to]--> Employment
   - Cardinality: 1:0..1 (hired인 경우에만)
   - 조건부 관계: decision == 'hired'

9. InterviewFeedback --[raisedConcern]--> Concern
   - Cardinality: 1:N (면접 평가당 여러 우려사항)
   - 선택적: 0..N

10. InterviewFeedback --[extractedSignals]--> Signal
    - Cardinality: 1:N (AI가 여러 신호 추출)
    - 자동 생성 관계

11. Concern --[linkedTo]--> BehavioralPattern
    - Cardinality: N:N (우려사항과 패턴 매핑)
    - 확률적: correlation coefficient 포함

12. Concern --[validatedBy]--> HiringOutcome
    - Cardinality: N:N (과거 우려사항 → 실제 결과)
    - 통계적 관계: 검증 데이터

13. BehavioralPattern --[observedIn]--> Candidate
    - Cardinality: 1:N (패턴은 여러 후보자에서 관찰)
    - 역관계: Candidate --[matchesPattern]--> BehavioralPattern

14. BehavioralPattern --[correlatedWith]--> HiringOutcome
    - Cardinality: 1:N (패턴 → 과거 결과 분포)
    - 확률 분포: OutcomeDistribution 속성

15. Similarity --[triggersMemory]--> MemoryTrigger
    - Cardinality: 1:0..1 (유사도 높으면 트리거)
    - 조건부: similarityScore > threshold (예: 0.75)
```

### 시간성 표현

```yaml
# 채용 프로세스 상태 전이
CandidateJourney:
  states:
    - screening (서류 검토)
    - interviewing (면접 진행)
    - debrief (평가 회의)
    - offer (오퍼 제안)
    - hired/rejected/withdrawn (최종 결정)

  transitions:
    - screening → interviewing (조건: resume passed)
    - interviewing → debrief (조건: all interviews done)
    - debrief → offer (조건: decision == hire)
    - debrief → rejected (조건: decision == reject)
    - offer → hired (조건: candidate accepted)
    - offer → withdrawn (조건: candidate declined)

  timestamps:
    - 각 상태 전이 시점 기록 (stateChangedAt)
    - 리드타임 계산: hired_at - applied_at

# Employment 시간성
EmploymentTimeline:
  periods:
    - onboarding: [startDate, startDate + 3개월]
    - probation: [startDate, startDate + 6개월]
    - earlyDeparture: [startDate, startDate + 12개월]
    - stable: [startDate + 12개월, ...]

  signals:
    - manager_feedback_3m: startDate + 3개월 (선택적)
    - manager_feedback_6m: startDate + 6개월 (선택적)
    - performance_review: 연 1-2회 (선택적)
```

---

## Part 2: BehavioralPattern 상세 설계

### Taxonomy (5개 패턴, 보리 경험 150+ 케이스 기반)

```yaml
1. team-credit-confusion (팀 성과 착각)
   priority: ⭐⭐⭐⭐⭐
   prevalence: 40% (보리 150건 중 60건)
   problem_rate: 75% (문제로 이어질 확률)

   description: |
     "We/Our team" 과도 사용, "I/My" 부족.
     개인 기여와 팀 성과를 구분 못 함.
     실제 ownership 부족 신호.

   detection_rules:
     - rule_1: "we/our team" 언급 > 10회 AND "I/my" < 3회
     - rule_2: "구체적 의사결정" 질문에 "팀과 논의" 반복
     - rule_3: "당신의 역할은?" 질문에 모호한 답변
     - rule_4: 성과 지표 질문에 팀 전체 수치만 언급

   red_flag_signals:
     - "우리 팀이 했습니다" (반복 5회+)
     - "팀과 함께 결정했습니다"
     - "시니어가 시켜서 했습니다"
     - "제가 주도한 것은..." (말 끝 흐림)

   interview_questions:
     - "가장 자랑스러운 프로젝트에서 당신의 구체적 역할은?"
     - "팀과 의견 충돌 시 어떻게 해결했나?"
     - "혼자 의사결정한 경험은?"

   historical_outcome:
     total_cases: 60
     hired: 35
     rejected: 25
     hired_outcomes:
       early_departure_6m: 60% (21/35)
       early_departure_12m: 75% (26/35)
       avg_duration_months: 7.2
       departure_reasons:
         performance: 70% (주로 ownership 부족)
         better_offer: 20%
         personal: 10%

   confidence_model:
     high_confidence: >= 3개 red flags
     medium_confidence: 2개 red flags
     low_confidence: 1개 red flag

2. cultural-fit-mismatch (문화 부적응)
   priority: ⭐⭐⭐⭐⭐
   prevalence: 25% (보리 150건 중 38건)
   problem_rate: 60%

   description: |
     일하는 속도/방식이 회사 문화와 극명하게 다름.
     대기업 → 스타트업, 또는 그 반대.
     "적응하겠지" 낙관이 가장 위험.

   detection_rules:
     - rule_1: 프로덕트 출시 기간 > 우리 평균 × 5배
     - rule_2: 의사결정 프로세스 언급이 과도하게 체계적/관료적
     - rule_3: "빠른 실험" 질문에 "충분한 검증" 강조
     - rule_4: 이전 회사 비판 (특히 "체계 없다", "전략 없다")

   red_flag_signals:
     - "9개월 걸렸습니다" (우리 2-3주 사이클)
     - "A/B 테스트 6주 돌리고..."
     - "100페이지 시장 조사 보고서"
     - "이전 회사는 전략이 없었어요" (우리도 비슷할 수 있음)
     - "원칙주의자" 과도 강조 (우리는 실용주의)

   interview_questions:
     - "가장 빨리 런칭한 프로덕트는? 기간은?"
     - "불완전한 데이터로 의사결정한 경험은?"
     - "이전 회사 문화에서 불편했던 점은?"

   historical_outcome:
     total_cases: 38
     hired: 22
     rejected: 16
     hired_outcomes:
       early_departure_3m: 55% (12/22)
       early_departure_6m: 73% (16/22)
       avg_duration_months: 4.1
       departure_reasons:
         company: 60% ("전략 없다", "체계 없다" 불만)
         cultural_fit: 30%
         performance: 10%

3. decision-avoidance (의사결정 회피)
   priority: ⭐⭐⭐⭐
   prevalence: 20% (보리 150건 중 30건)
   problem_rate: 70%

   description: |
     명확한 trade-off에서 선택 회피.
     실패 책임 회피, "팀 합의" 뒤에 숨기.
     IC 경력만 5년+ (리더십 경험 없음).

   detection_rules:
     - rule_1: "어려운 의사결정" 질문에 구체적 선택 언급 없음
     - rule_2: 실패 경험에서 "팀이", "상황이" 책임 전가
     - rule_3: Trade-off 질문에 "둘 다 중요" 답변
     - rule_4: IC 경력 5년+ AND 리더십 경험 0

   red_flag_signals:
     - "팀과 충분히 논의했습니다"
     - "실패는... 상황이 어려웠어요"
     - "둘 다 중요해서 균형을..."
     - "명확한 방향이 없어서 못 했어요"

   interview_questions:
     - "A와 B 중 선택해야 했던 경험은? 왜 그 선택을?"
     - "당신의 결정으로 실패한 경험은? 배운 점은?"
     - "팀 반대에도 밀어붙인 경험은?"

   historical_outcome:
     total_cases: 30
     hired: 18
     rejected: 12
     hired_outcomes:
       early_departure_6m: 67% (12/18)
       avg_duration_months: 6.8
       departure_reasons:
         performance: 75% (주로 self-direction 부족)
         mutual: 25%

4. communication-dysfunction (소통 장애)
   priority: ⭐⭐⭐⭐ (보리 추가 제안)
   prevalence: 15% (보리 150건 중 23건)
   problem_rate: 65%

   description: |
     비효율 동료 언급, 타인 비판 과다.
     협업 질문에 "제가 다 했어요" 또는 "동료가 문제".
     팀 환경에서 갈등 발생 가능성 높음.

   detection_rules:
     - rule_1: 이전 동료 비판 3회+
     - rule_2: "협업 경험" 질문에 부정적 프레임
     - rule_3: "제가 다 했습니다" 과도 강조
     - rule_4: 갈등 해결 질문에 "제가 맞았어요" 답변

   red_flag_signals:
     - "비효율적인 동료 때문에..."
     - "제가 다 했어요, 팀은 도움 안 됐고"
     - "제 의견이 맞았는데 안 들어줬어요"
     - "커뮤니케이션 비용이 너무 커서..."

   interview_questions:
     - "팀원과 의견 충돌 경험은? 어떻게 해결?"
     - "비효율적인 동료와 일한 경험은?"
     - "당신이 틀렸다고 인정한 경험은?"

5. job-hopping (잦은 이직)
   priority: ⭐⭐⭐
   prevalence: 10% (명백한 케이스만)
   problem_rate: 85%

   description: |
     2년간 3회 이상 이직 (평균 재직 < 12개월).
     장기 몰입 어려움, 조기 퇴사 가능성 매우 높음.

   detection_rules:
     - rule_1: 최근 2년간 회사 3개 이상
     - rule_2: 평균 재직 기간 < 12개월
     - rule_3: 이직 사유가 모두 "더 좋은 기회"

   red_flag_signals:
     - 이력서에 명백히 드러남
     - 정당한 사유 없음 (학업, 이주 등)

   historical_outcome:
     total_cases: 12
     hired: 8
     rejected: 4
     hired_outcomes:
       early_departure_6m: 62.5% (5/8)
       early_departure_12m: 87.5% (7/8)
       avg_duration_months: 5.8
       still_employed: 12.5% (1/8, 18개월 재직)
       departure_reasons:
         better_offer: 58%
         cultural_fit: 25%
         workload: 17%
```

### 패턴 감지 알고리즘 (구체적)

```python
# 1. team-credit-confusion 감지
def detect_team_credit_confusion(transcript: InterviewTranscript) -> Detection:
    """
    면접 스크립트에서 team-credit-confusion 패턴 감지
    """
    # Step 1: 키워드 카운트
    we_count = count_keywords(transcript, ["we", "our team", "우리 팀"])
    i_count = count_keywords(transcript, ["I", "my", "제가", "내가"])

    # Step 2: 의사결정 질문 답변 분석
    decision_questions = filter_questions(transcript, type="decision_making")
    team_discussion_mentions = count_pattern(
        decision_questions,
        pattern=["팀과 논의", "together decided", "team decided"]
    )

    # Step 3: 역할 모호성 체크
    role_questions = filter_questions(transcript, type="your_role")
    vague_answers = count_vague_answers(role_questions)

    # Step 4: 점수 계산
    score = 0
    red_flags = []

    if we_count > 10 and i_count < 3:
        score += 3
        red_flags.append({
            "signal": "we_over_i",
            "evidence": f"'we/our' {we_count}회, 'I/my' {i_count}회"
        })

    if team_discussion_mentions >= 3:
        score += 2
        red_flags.append({
            "signal": "team_decision_repeated",
            "evidence": f"'팀과 논의' {team_discussion_mentions}회 반복"
        })

    if vague_answers >= 2:
        score += 2
        red_flags.append({
            "signal": "vague_role_description",
            "evidence": f"{vague_answers}개 질문에 모호한 답변"
        })

    # Step 5: 신뢰도 계산
    confidence = calculate_confidence(score, red_flags)

    return Detection(
        pattern_type="team-credit-confusion",
        detected=score >= 3,
        confidence=confidence,
        red_flags=red_flags,
        recommendation=generate_recommendation(score, confidence)
    )

# 2. cultural-fit-mismatch 감지
def detect_cultural_fit_mismatch(
    transcript: InterviewTranscript,
    company_context: CompanyContext
) -> Detection:
    """
    회사 문화 맥락 고려한 문화 부적응 패턴 감지
    """
    # Step 1: 일하는 속도 신호
    speed_questions = filter_questions(transcript, type="speed_of_work")
    candidate_timelines = extract_timelines(speed_questions)

    speed_mismatch = False
    for timeline in candidate_timelines:
        if timeline.duration > company_context.avg_cycle_time * 5:
            speed_mismatch = True
            red_flags.append({
                "signal": "work_pace_mismatch",
                "evidence": f"{timeline.duration} vs 우리 {company_context.avg_cycle_time}"
            })

    # Step 2: 의사결정 스타일
    decision_style = analyze_decision_style(transcript)
    if decision_style == "highly_structured" and company_context.culture == "fast_iterative":
        red_flags.append({
            "signal": "decision_style_mismatch",
            "evidence": "체계적 프로세스 강조 vs 우리 빠른 실험 문화"
        })

    # Step 3: 이전 회사 비판 패턴
    criticism_count = count_company_criticism(transcript)
    if criticism_count >= 2:
        red_flags.append({
            "signal": "company_criticism",
            "evidence": f"이전 회사 비판 {criticism_count}회"
        })

    # Step 4: 과거 데이터 조회
    similar_cases = query_historical_cases(
        pattern_type="cultural-fit-mismatch",
        signals=red_flags
    )

    return Detection(
        pattern_type="cultural-fit-mismatch",
        detected=len(red_flags) >= 2,
        confidence=calculate_confidence_with_history(red_flags, similar_cases),
        red_flags=red_flags,
        historical_data=similar_cases.outcome_distribution
    )

# 3. 확률적 HiringOutcome 예측
def predict_hiring_outcome(
    candidate: Candidate,
    detected_patterns: List[BehavioralPattern]
) -> OutcomePrediction:
    """
    감지된 패턴 기반 HiringOutcome 확률 예측
    """
    predictions = []

    for pattern in detected_patterns:
        # 과거 동일 패턴 케이스 조회
        historical_cases = pattern.historicalOutcome

        # 조기 퇴사 확률 계산
        early_departure_prob = (
            historical_cases.early_departure_6m_count /
            historical_cases.total_hired
        )

        predictions.append({
            "pattern": pattern.patternType,
            "early_departure_probability": early_departure_prob,
            "confidence": pattern.confidence,
            "sample_size": historical_cases.total_hired,
            "evidence": {
                "avg_duration": historical_cases.avg_duration_months,
                "departure_reasons": historical_cases.departure_reasons
            }
        })

    # 여러 패턴 조합 시 확률 결합
    combined_probability = combine_probabilities(predictions)

    return OutcomePrediction(
        candidate=candidate,
        early_departure_risk=combined_probability,
        risk_level=categorize_risk(combined_probability),
        contributing_patterns=predictions,
        recommendation=generate_hiring_recommendation(combined_probability)
    )
```

### 레드 플래그 신호 온톨로지 표현

```yaml
Signal:
  필수속성:
    - signalId: string
    - signalType: enum [keyword-pattern, timeline-mismatch, criticism, vague-answer]
    - severity: enum [low, medium, high]
    - extractedFrom: InterviewTranscript | Resume
  선택속성:
    - evidence: string (구체적 증거)
    - context: string (맥락)
    - snippet: string (원문 발췌)
    - aiConfidence: float [0.0-1.0]
  관계:
    - detects → BehavioralPattern [0..N]
    - supports → Concern [0..N]

# 예시: team-credit-confusion 신호
Signal_001:
  signalId: "sig_001"
  signalType: "keyword-pattern"
  severity: "high"
  extractedFrom: transcript_james_001
  evidence: "'우리 팀' 12회, '제가' 2회"
  context: "ownership 질문 답변"
  snippet: "우리 팀이 결정했고, 우리가 함께 진행했습니다..."
  aiConfidence: 0.92
  detects: [BehavioralPattern.team-credit-confusion]
  supports: [Concern.ownership]
```

---

## Part 3: Concern 온톨로지

### Core Concerns (4개)

```yaml
1. ownership (주도성/책임감)
   priority: ⭐⭐⭐⭐⭐
   definition: |
     개인이 프로젝트를 주도하고 결과에 책임지는 능력.
     "시켜서 했다"가 아닌 "스스로 추진한" 경험.

   evaluation_criteria:
     - 개인 의사결정 사례 구체성
     - 실패 책임 수용 여부
     - "I/my" vs "we/team" 비율

   linked_patterns:
     - team-credit-confusion (강한 상관)
     - decision-avoidance (중간 상관)

   validation_history:
     total_concerns_raised: 45
     hired_despite_concern: 28
     outcomes:
       early_departure_6m: 64% (18/28)
       performance_issues: 75% (주로 self-direction 부족)

   mitigation_suggestion: |
     - 추가 질문: "혼자 결정하고 밀어붙인 경험은?"
     - 레퍼런스 체크: "이 사람이 주도한 프로젝트는?"
     - 평가 강화: Manager 평가에서 ownership 집중 확인

2. cultural-fit (문화 적합도)
   priority: ⭐⭐⭐⭐⭐
   definition: |
     일하는 속도, 의사결정 스타일, 가치관이 회사와 맞는지.
     "적응할 거야" 낙관은 위험.

   evaluation_criteria:
     - 프로덕트 출시 기간 vs 우리 평균
     - 의사결정 프로세스 선호도
     - 이전 회사 비판 패턴

   sub_types:
     - work-pace (일하는 속도)
     - decision-style (의사결정 스타일)
     - communication-style (소통 방식)

   linked_patterns:
     - cultural-fit-mismatch (직접 매핑)

   validation_history:
     total_concerns_raised: 32
     hired_despite_concern: 18
     outcomes:
       early_departure_3m: 61% (11/18)
       departure_reason: "전략 없다", "체계 없다" 불만 60%

3. communication (소통 능력)
   priority: ⭐⭐⭐⭐⭐ (보리 제안)
   definition: |
     팀 환경에서 효과적 협업, 갈등 해결 능력.
     비판적 태도, "제가 다 했어요" 과도 강조 주의.

   evaluation_criteria:
     - 이전 동료 언급 톤 (긍정/부정)
     - 협업 경험 프레임 (we-focused vs I-only)
     - 갈등 해결 방식

   linked_patterns:
     - communication-dysfunction (직접 매핑)

   validation_history:
     total_concerns_raised: 28
     hired_despite_concern: 15
     outcomes:
       team_conflict: 67% (10/15, 온보딩 3개월 내 갈등)
       early_departure_6m: 53% (8/15)

4. technical-depth (기술 깊이)
   priority: ⭐⭐⭐⭐
   definition: |
     직무 요구 기술 수준 충족 여부.
     이력서 "Expert" vs 면접 "사용해봄" 괴리 주의.

   evaluation_criteria:
     - Competency 평가 점수 (3.0 미만)
     - 기술 질문 답변 깊이
     - 실무 경험 vs 학습 경험 비율

   linked_patterns:
     - (독립적 Concern, 패턴 없음)
```

### Role-specific Concerns (3개)

```yaml
5. learning-agility (학습 민첩성)
   priority: ⭐⭐⭐⭐ (보리 제안)
   definition: |
     새로운 기술/영역을 빠르게 습득하는 능력.
     특히 스타트업 환경에서 중요.

   evaluation_criteria:
     - 최근 2년 새로 배운 기술
     - 도메인 전환 경험
     - "모른다"를 편하게 인정하는지

   applicable_roles:
     - Junior/Mid-level (성장 가능성)
     - 신규 팀 (새로운 스택)

6. collaboration-style (협업 스타일)
   priority: ⭐⭐⭐
   definition: |
     타인과 함께 일하는 방식.
     Communication보다 구체적 (코드 리뷰, 페어 프로그래밍 등).

   evaluation_criteria:
     - 코드 리뷰 경험 및 태도
     - 페어 프로그래밍 선호도
     - 피드백 수용 능력

   applicable_roles:
     - Engineering (특히 Senior+)

7. self-direction (자기 주도성)
   priority: ⭐⭐⭐
   definition: |
     명확한 지시 없이 스스로 방향 찾는 능력.
     Ownership과 유사하나 더 실무적.

   evaluation_criteria:
     - 모호한 문제 해결 경험
     - "해야 할 일" 스스로 정의한 사례
     - IC 경력 vs 리더십 경험

   applicable_roles:
     - Senior+ (독립적 업무)

   note: |
     보리 질문: Ownership과 통합 고려?
     → Phase 1에서는 분리, 사용 패턴 보고 Phase 2에서 결정
```

### Evidence 연결 구조

```yaml
# Concern이 어디서 왔는가?
Concern --[extractedFrom]--> EvidenceSource

EvidenceSource (Union Type):
  - InterviewFeedback (면접관 직접 제기)
  - InterviewTranscript (AI가 추출)
  - Resume (이력서 패턴)
  - ReferenceCheck (레퍼런스 체크)

# 예시: ownership Concern
Concern_James_ownership:
  concernId: "concern_001"
  concernType: "ownership"
  severity: "high"
  raisedBy: Sarah_CTO
  raisedDate: 2024-11-10
  evidenceSnippets:
    - "'팀이 했다', '우리가 결정했다' 반복"
    - "구체적 의사결정 질문에 모호한 답변"
    - "실패 책임을 '상황' 탓으로 돌림"
  interviewerNote: |
    "James는 기술적으로 우수하지만 ownership이 약해 보입니다.
     '시니어가 시켜서', '팀과 논의해서'만 이야기합니다."

  # 과거 검증 데이터
  validationHistory:
    similar_concerns_count: 45
    hired_despite_concern: 28
    early_departure_rate: 0.64
    primary_issue: "self-direction 부족"

  # 연결
  extractedFrom:
    - InterviewFeedback_Sarah_001
    - InterviewTranscript_James_001 (AI 추출)
  linkedTo:
    - BehavioralPattern.team-credit-confusion (confidence: 0.87)
```

### Validation 로직

```python
def validate_concern_with_history(concern: Concern) -> ValidationResult:
    """
    과거 동일 Concern → HiringOutcome 상관관계 분석
    """
    # Step 1: 유사 Concern 찾기
    similar_concerns = query_concerns(
        concern_type=concern.concernType,
        severity=concern.severity,
        time_range="past_3_years"
    )

    # Step 2: HiringOutcome 분석
    hired_cases = [c for c in similar_concerns if c.outcome.decision == "hired"]
    rejected_cases = [c for c in similar_concerns if c.outcome.decision == "rejected"]

    # Step 3: Employment 결과 조회
    employment_outcomes = []
    for case in hired_cases:
        if case.outcome.employment:
            employment_outcomes.append(case.outcome.employment)

    # Step 4: 통계 계산
    early_departure_count = sum(1 for e in employment_outcomes if e.earlyDeparture)
    early_departure_rate = early_departure_count / len(employment_outcomes)

    avg_duration = mean([e.duration_months for e in employment_outcomes])

    departure_reasons = Counter([e.departureReason for e in employment_outcomes if e.endDate])

    # Step 5: 검증 결과
    return ValidationResult(
        concern=concern,
        total_similar_concerns=len(similar_concerns),
        hired_despite_concern=len(hired_cases),
        rejected_proactively=len(rejected_cases),
        early_departure_rate=early_departure_rate,
        avg_duration_months=avg_duration,
        departure_reasons=dict(departure_reasons),
        recommendation=generate_validation_recommendation(early_departure_rate)
    )

# 예시 출력
ValidationResult_ownership:
  concern: ownership
  total_similar_concerns: 45
  hired_despite_concern: 28
  rejected_proactively: 17
  early_departure_rate: 0.64
  avg_duration_months: 7.2
  departure_reasons:
    performance: 75% (주로 self-direction 부족)
    mutual: 15%
    better_offer: 10%
  recommendation: |
    ⚠️ Ownership 우려는 64% 확률로 조기 퇴사로 이어짐.
    과거 28건 중 18건이 6개월 내 퇴사.
    권장: Reject 또는 강화된 레퍼런스 체크.
```

---

## Part 4: HiringOutcome + Employment

### Employment 개념 분리

**설계 결정:**
- HiringOutcome: 채용 프로세스 결과 (hired, rejected, ...)
- Employment: 온보딩 후 재직 상태 (입사일, 퇴사일, 성과)
- **왜 분리?** 온톨로지 의미론적 명확성 + 다른 시간축

```yaml
HiringOutcome:
  의미: "채용 의사결정의 결과"
  시점: 채용 프로세스 종료
  속성: decision, decisionDate, rationale
  관계: Candidate → HiringOutcome (1:0..1)

Employment:
  의미: "실제 고용 관계"
  시점: 입사 ~ 퇴사 (또는 현재)
  속성: startDate, endDate, duration, performance
  관계: HiringOutcome → Employment (1:0..1, hired인 경우만)
```

### 선택적 속성 표현 (회사마다 다름)

**문제:**
- PIP는 모든 회사에 없음 (스타트업 대부분 없음)
- Performance Rating도 회사마다 척도 다름 (1-3, 1-5, A-D)
- 어떻게 온톨로지로 표현?

**해법: Optional 속성 + Context-aware 해석**

```yaml
Employment:
  필수속성:
    - employmentId: string
    - startDate: date
    - companyId: string

  선택속성 (회사마다 다름):
    - endDate: date | null
    - duration_months: float | null
    - earlyDeparture: boolean | null
    - departureReason: enum | null

    # 회사 시스템에 따라 있을 수도
    - performanceRating: PerformanceRating | null
    - pipStatus: boolean | null
    - managerFeedback: ManagerFeedback | null
    - promotionHistory: Promotion[] | null

  # 메타데이터: 어떤 필드가 유효한가?
  dataAvailability:
    - hasPerformanceRating: boolean
    - hasPIPData: boolean
    - hasManagerFeedback: boolean
    - feedbackSource: enum [hris, ats, manual]

# 회사 A (HRIS 연동, 모든 데이터)
Employment_CompanyA:
  employmentId: "emp_001"
  startDate: "2024-03-20"
  endDate: "2024-12-15"
  duration_months: 9
  earlyDeparture: true
  departureReason: "performance"
  performanceRating: 2.1 (1-5 scale)
  pipStatus: true
  managerFeedback: "Self-direction 부족, PIP 진입"
  dataAvailability:
    hasPerformanceRating: true
    hasPIPData: true
    hasManagerFeedback: true
    feedbackSource: "hris"

# 회사 B (ATS만, 제한된 데이터)
Employment_CompanyB:
  employmentId: "emp_002"
  startDate: "2024-06-01"
  endDate: "2024-08-15"
  duration_months: 2.5
  earlyDeparture: true
  departureReason: "mutual"
  departureNote: "문화 부적응"
  performanceRating: null
  pipStatus: null
  managerFeedback: null
  dataAvailability:
    hasPerformanceRating: false
    hasPIPData: false
    hasManagerFeedback: false
    feedbackSource: "ats"
```

**활용 전략:**

```python
def analyze_employment_outcome(employment: Employment) -> OutcomeAnalysis:
    """
    데이터 가용성에 따라 다른 분석 로직 적용
    """
    # Primary Signal: 재직 기간 (항상 있음)
    if employment.duration_months is not None:
        if employment.duration_months < 6:
            risk_indicator = "high" (조기 퇴사)
        elif employment.duration_months < 12:
            risk_indicator = "medium"
        else:
            risk_indicator = "low"

    # Secondary Signal: Performance Rating (있으면 사용)
    if employment.dataAvailability.hasPerformanceRating:
        if employment.performanceRating < 3.0:
            performance_issue = "confirmed"
    else:
        # Fallback: 재직 기간으로 추정
        if employment.earlyDeparture and employment.departureReason == "performance":
            performance_issue = "inferred" (신뢰도 낮음)

    # Tertiary Signal: Manager Feedback (가장 신뢰할 만함)
    if employment.dataAvailability.hasManagerFeedback:
        feedback_analysis = analyze_manager_feedback(employment.managerFeedback)
        # 이게 있으면 가장 우선순위 높음

    return OutcomeAnalysis(
        risk_indicator=risk_indicator,
        performance_issue=performance_issue,
        confidence=calculate_confidence(employment.dataAvailability),
        evidence=compile_evidence(employment)
    )
```

### 퇴사 사유 체계화

```yaml
DepartureReason (Enum):
  - performance: 성과 문제 (PIP, Low rating)
  - better-offer: 더 좋은 기회 (연봉, 타이틀)
  - personal: 개인 사정 (이사, 학업, 건강)
  - company: 회사 문제 (문화, 전략, 불만)
  - mutual: 상호 합의 (애매한 케이스)

# 보리 인사이트: 조기 퇴사 사유 분포
EarlyDeparture_6m_Reasons:
  performance: 30-40%
  better-offer: 25%
  company (문화 부적응): 20%
  personal: 10%
  mutual (실제로는 performance 많음): 10%

# 퇴사 사유 신뢰도
DepartureReasonReliability:
  performance: 90% (명확함)
  better-offer: 85% (검증 가능)
  company: 70% (주관적)
  personal: 80% (검증 가능)
  mutual: 30% (실제 이유 숨김 많음)
```

### 추가 신호 통합

**보리 피드백: 재직 기간만으로는 30% 신뢰도**

```yaml
AdditionalSignalSources:
  1. Manager 평가 (3/6개월 후)
     신뢰도: 95%
     확보 가능성: 30% (회사 시스템 의존)
     구조:
       - managerFeedbackId: string
       - feedbackDate: date (입사 후 3m/6m)
       - overallRating: float [1.0-5.0]
       - strengthsNoted: string[]
       - concernsNoted: string[]
       - wouldHireAgain: boolean

  2. 퇴사 사유 HR 기록
     신뢰도: 80% (mutual 제외)
     확보 가능성: 60%
     구조:
       - exitInterviewSummary: string
       - reasonCategory: DepartureReason
       - voluntaryOrInvoluntary: enum

  3. 레퍼런스 체크 (채용 후)
     신뢰도: 85%
     확보 가능성: 40% (전 직장에 연락)
     구조:
       - referenceCheckId: string
       - checkedDate: date
       - referenceContact: Contact
       - performanceRating: float
       - wouldRehire: boolean
       - comments: string

  4. LinkedIn 이력서 패턴
     신뢰도: 60%
     확보 가능성: 100% (공개 정보)
     구조:
       - linkedinProfile: URL
       - employmentDurationMatch: boolean (이력서와 일치?)
       - nextJobTimeline: int (다음 직장까지 갭)
       - titleProgression: enum [promoted, lateral, downgrade]

SignalSource:
  필수속성:
    - sourceId: string
    - sourceType: enum [manager-feedback, exit-interview, reference-check, linkedin]
    - reliability: float [0.0-1.0]
    - capturedDate: date
  선택속성:
    - content: object (타입별 다름)
  관계:
    - enriches → Employment [1]
```

**신호 결합 전략:**

```python
def assess_employment_outcome_with_signals(employment: Employment) -> Assessment:
    """
    여러 신호 소스 결합하여 종합 평가
    """
    signals = employment.additionalSignals

    # 신뢰도 기반 가중치
    weights = {
        "manager-feedback": 0.95,
        "exit-interview": 0.80,
        "reference-check": 0.85,
        "linkedin": 0.60,
        "duration-proxy": 0.30  # 재직 기간 단독
    }

    assessments = []

    # Manager 평가 (최우선)
    manager_signal = get_signal(signals, "manager-feedback")
    if manager_signal:
        if manager_signal.overallRating < 3.0:
            assessments.append({
                "indicator": "poor_performance",
                "confidence": weights["manager-feedback"],
                "evidence": manager_signal.concernsNoted
            })

    # 퇴사 사유 (두 번째)
    exit_signal = get_signal(signals, "exit-interview")
    if exit_signal:
        if exit_signal.reasonCategory == "performance":
            assessments.append({
                "indicator": "performance_issue",
                "confidence": weights["exit-interview"],
                "evidence": exit_signal.summary
            })

    # 재직 기간 (Fallback)
    if not manager_signal and not exit_signal:
        # 신호 없으면 재직 기간으로 추정
        if employment.duration_months < 6:
            assessments.append({
                "indicator": "likely_issue",
                "confidence": weights["duration-proxy"],
                "evidence": f"{employment.duration_months}개월 조기 퇴사"
            })

    # LinkedIn 패턴 (보조)
    linkedin_signal = get_signal(signals, "linkedin")
    if linkedin_signal:
        if not linkedin_signal.employmentDurationMatch:
            assessments.append({
                "indicator": "duration_discrepancy",
                "confidence": weights["linkedin"],
                "evidence": "이력서와 LinkedIn 기간 불일치"
            })

    # 종합 평가
    overall_confidence = weighted_average([a["confidence"] for a in assessments])

    return Assessment(
        employment=employment,
        issue_detected=len(assessments) > 0,
        overall_confidence=overall_confidence,
        signals_used=[a["indicator"] for a in assessments],
        evidence=assessments
    )
```

---

## Part 5: 보리 질문 답변

### 질문 1: "선택적 속성" 표현

**질문:**
> HiringOutcome에 PIP, performanceRating 등 회사마다 다른 필드를 어떻게 온톨로지로 표현?

**답변:**

**방법 1: Optional 속성 + dataAvailability 메타데이터 (권장)**

```yaml
Employment:
  # 모든 회사에 공통 (필수)
  employmentId: string
  startDate: date

  # 회사마다 다름 (선택)
  performanceRating: float | null
  pipStatus: boolean | null
  managerFeedback: string | null

  # 어떤 필드가 유효한가? (메타)
  dataAvailability:
    hasPerformanceRating: boolean
    hasPIPData: boolean
    hasManagerFeedback: boolean
```

**장점:**
- 스키마 단순함
- 새 회사 추가 시 기존 스키마 변경 불필요
- 데이터 품질 명시적 (null ≠ 알 수 없음)

**단점:**
- 각 쿼리에서 dataAvailability 체크 필요
- null 처리 로직 필요

**방법 2: 상속 구조 (Alternative)**

```yaml
Employment (Abstract):
  employmentId: string
  startDate: date
  # 공통 속성만

Employment_Basic (ATS만):
  extends: Employment
  duration_months: float
  departureNote: string

Employment_HRIS (HRIS 연동):
  extends: Employment
  duration_months: float
  performanceRating: float
  pipStatus: boolean
  managerFeedback: string
```

**장점:**
- 타입 안전성 높음
- 쿼리 시 타입별 분기 명확

**단점:**
- 스키마 복잡도 증가
- 회사마다 다른 타입 관리 부담
- 새 필드 추가 시 새 타입 생성?

**방법 3: Dynamic Schema (JSON-LD 스타일)**

```yaml
Employment:
  employmentId: string
  startDate: date
  additionalData: {
    # 회사마다 자유롭게 추가
    "performanceRating": 2.1,
    "pipStatus": true,
    "custom_field_X": "value"
  }
  schema_version: "v1_companyA"
```

**장점:**
- 최대 유연성
- 새 필드 즉시 추가 가능

**단점:**
- 타입 안전성 없음
- 쿼리 복잡 (additionalData 내부 탐색)
- 데이터 품질 관리 어려움

**포리 권장: 방법 1 (Optional + dataAvailability)**

**이유:**
1. Phase 1 MVP에서 간단하게 시작
2. 대부분 회사가 공통 필드 많음 (duration, departureReason)
3. 확장성 충분 (새 필드 추가 = 새 선택 속성)
4. Palantir Foundry 스타일 (불완전 데이터 허용)

**구현 예시:**

```python
class Employment:
    # 필수
    employment_id: str
    start_date: date
    company_id: str

    # 선택
    end_date: Optional[date] = None
    duration_months: Optional[float] = None
    performance_rating: Optional[float] = None
    pip_status: Optional[bool] = None
    manager_feedback: Optional[str] = None

    # 메타
    data_availability: DataAvailability

    def has_performance_data(self) -> bool:
        return self.data_availability.has_performance_rating

    def get_reliable_signals(self) -> List[Signal]:
        """데이터 가용성 기반 신뢰 가능한 신호만 반환"""
        signals = []

        # 항상 있음
        if self.duration_months is not None:
            signals.append(Signal(
                type="duration",
                value=self.duration_months,
                reliability=0.30
            ))

        # 있으면 사용
        if self.has_performance_data():
            signals.append(Signal(
                type="performance_rating",
                value=self.performance_rating,
                reliability=0.90
            ))

        return signals
```

---

### 질문 2: "확률적 추론" 표현

**질문:**
> "team-credit-confusion 패턴 → 75% 확률로 조기 퇴사"를 온톨로지로 어떻게 모델링?

**답변:**

**방법 1: OutcomeDistribution 속성 (권장)**

```yaml
BehavioralPattern:
  patternId: string
  patternType: enum

  # 확률 분포를 속성으로
  historicalOutcome: OutcomeDistribution

OutcomeDistribution:
  total_cases: int (샘플 크기)
  hired_count: int
  rejected_count: int

  # Hired 케이스의 결과 분포
  hired_outcomes:
    early_departure_6m_count: int
    early_departure_6m_rate: float (확률)
    early_departure_12m_count: int
    early_departure_12m_rate: float
    avg_duration_months: float

  # 퇴사 사유 분포
  departure_reasons:
    performance: float (비율)
    better_offer: float
    company: float
    personal: float

  # 신뢰도
  confidence_interval: [float, float] (95% CI)
  last_updated: datetime

# 예시: team-credit-confusion
BehavioralPattern_TeamCredit:
  patternId: "pattern_001"
  patternType: "team-credit-confusion"

  historicalOutcome:
    total_cases: 60
    hired_count: 35
    rejected_count: 25

    hired_outcomes:
      early_departure_6m_count: 21
      early_departure_6m_rate: 0.60  # 60%
      early_departure_12m_count: 26
      early_departure_12m_rate: 0.74  # 74% (≈75%)
      avg_duration_months: 7.2

    departure_reasons:
      performance: 0.70  # 70%
      better_offer: 0.20
      personal: 0.10

    confidence_interval: [0.58, 0.86]  # 95% CI for 12m rate
    last_updated: "2025-12-01"
```

**활용:**

```python
def predict_outcome(candidate: Candidate, pattern: BehavioralPattern) -> Prediction:
    """
    패턴의 historicalOutcome 기반 확률 예측
    """
    outcome_dist = pattern.historicalOutcome

    return Prediction(
        candidate=candidate,
        pattern=pattern.patternType,

        # 확률 직접 사용
        early_departure_probability=outcome_dist.hired_outcomes.early_departure_12m_rate,

        # 신뢰 구간
        confidence_range=outcome_dist.confidence_interval,

        # 샘플 크기 (신뢰도에 영향)
        sample_size=outcome_dist.hired_count,

        # 근거
        evidence=f"{outcome_dist.hired_outcomes.early_departure_12m_count}/{outcome_dist.hired_count} 케이스가 12개월 내 퇴사"
    )
```

**방법 2: 확률적 관계 (Alternative)**

```yaml
# 관계에 확률 속성 추가
BehavioralPattern --[predicts]--> HiringOutcome
  relationship_properties:
    probability: float [0.0-1.0]
    confidence: float [0.0-1.0]
    sample_size: int
    evidence: string[]

# 예시
Pattern_TeamCredit --[predicts]--> Outcome_EarlyDeparture
  probability: 0.74
  confidence: 0.85
  sample_size: 35
  evidence: ["26/35 케이스가 12개월 내 퇴사"]
```

**장점:**
- 관계 자체가 확률적임을 명시
- 그래프 쿼리 시 확률 필터링 가능

**단점:**
- 관계 개수 폭발 (패턴마다 여러 결과)
- 복잡도 증가

**포리 권장: 방법 1 (OutcomeDistribution 속성)**

**이유:**
1. 온톨로지 구조 단순 (관계 증가 안 함)
2. 확률 분포 전체를 한 곳에 관리
3. 업데이트 용이 (새 케이스 추가 시 분포만 갱신)
4. Phase 1에서 구현 쉬움

---

### 질문 3: "선택적/확률적 관계" 표현

**질문:**
> "Candidate --evaluated-by--> Interviewer (0..5명)", "BehavioralPattern --predicts--> HiringOutcome (확률 분포)"를 어떻게?

**답변:**

**Part A: 선택적 관계 (0..N Cardinality)**

```yaml
# 관계 정의
Candidate --[evaluated-by]--> Interviewer
  cardinality: 0..N
  optional: true (0개일 수도)
  ordered: true (면접 순서 있음)

# 스키마 표현
Candidate:
  evaluations: List[Evaluation] = []  # 빈 리스트 가능

Evaluation:
  evaluationId: string
  interviewer: Interviewer
  sequence: int (1st, 2nd, 3rd...)
  interviewDate: datetime

# 쿼리 시 체크
def get_evaluations(candidate: Candidate) -> List[Evaluation]:
    if not candidate.evaluations:
        # 0개 케이스 처리
        return []

    return sorted(candidate.evaluations, key=lambda e: e.sequence)
```

**Part B: 확률적 관계**

**옵션 1: 관계 속성으로 확률 표현 (명시적)**

```yaml
BehavioralPattern --[predicts]--> HiringOutcome
  relationship_type: "probabilistic"
  properties:
    probability: float
    confidence: float
    sample_size: int

# 그래프 표현
(Pattern:team-credit-confusion)
  -[:PREDICTS {prob: 0.74, confidence: 0.85, n: 35}]->
  (Outcome:early_departure_12m)
```

**옵션 2: OutcomeDistribution 중간 노드 (구조적)**

```yaml
BehavioralPattern --[has]--> OutcomeDistribution --[includes]--> HiringOutcome

# 그래프
(Pattern:team-credit-confusion)
  -[:HAS]->
  (Distribution {total: 60, hired: 35})
    -[:INCLUDES {rate: 0.74}]->
    (Outcome:early_departure_12m)
```

**옵션 3: 속성으로 분포 저장 (간단, 권장)**

```yaml
BehavioralPattern:
  patternId: string
  historicalOutcome: OutcomeDistribution (JSON/Object)

# 관계는 단순하게
BehavioralPattern --[observed-in]--> Candidate (1:N)
BehavioralPattern --[validated-by]--> HiringOutcome[] (통계 데이터)
```

**포리 권장: 옵션 3 (속성 저장)**

**이유:**
1. **Phase 1 MVP에 충분**: 확률은 조회만 하면 됨 (복잡한 그래프 쿼리 불필요)
2. **업데이트 간단**: 새 케이스 추가 시 분포만 재계산
3. **관계 폭발 방지**: Pattern마다 수십 개 Outcome 관계 안 생김
4. **쿼리 성능**: 관계 탐색보다 속성 조회가 빠름

**구현 예시:**

```python
class BehavioralPattern:
    pattern_id: str
    pattern_type: str

    # 확률 분포 (속성)
    historical_outcome: OutcomeDistribution

    def predict_for_candidate(self, candidate: Candidate) -> Prediction:
        """
        이 패턴이 감지된 후보자의 결과 예측
        """
        # 확률은 historicalOutcome에서 바로 조회
        prob = self.historical_outcome.hired_outcomes.early_departure_12m_rate

        return Prediction(
            candidate=candidate,
            pattern=self.pattern_type,
            probability=prob,
            confidence=self.calculate_confidence(),
            evidence=self.historical_outcome.to_evidence_string()
        )

    def calculate_confidence(self) -> float:
        """
        샘플 크기 기반 신뢰도 계산
        """
        n = self.historical_outcome.hired_count

        if n < 10:
            return 0.5  # 낮은 신뢰도
        elif n < 30:
            return 0.7  # 중간
        else:
            return 0.9  # 높음
```

**선택적 관계 예시:**

```python
class Candidate:
    candidate_id: str
    evaluations: List[Evaluation] = field(default_factory=list)

    @property
    def interviewer_count(self) -> int:
        """0..N 관계"""
        return len(self.evaluations)

    def was_evaluated_by(self, interviewer: Interviewer) -> bool:
        """선택적 관계 체크"""
        return any(e.interviewer == interviewer for e in self.evaluations)
```

---

## Part 6: Phase 1 MVP 최종 스코프

### Must Have (Phase 1) ✅

```yaml
1. BehavioralPattern 온톨로지
   complexity: HIGH
   priority: ⭐⭐⭐⭐⭐
   tasks:
     - [ ] 5개 패턴 정의 (team-credit, cultural-fit, decision-avoidance, communication, job-hopping)
     - [ ] 각 패턴의 detection rules 구현
     - [ ] Red flag signals 온톨로지 표현
     - [ ] OutcomeDistribution 속성 설계
     - [ ] 보리 제공 통계 데이터 입력
   risk:
     - AI 신호 추출 정확도 (완화: 수동 검증 Phase 1)
   output:
     - BehavioralPattern 스키마
     - 5개 패턴 데이터 (보리 경험 기반)

2. Concern 온톨로지
   complexity: MEDIUM
   priority: ⭐⭐⭐⭐⭐
   tasks:
     - [ ] Core Concerns 4개 정의 (ownership, cultural-fit, communication, technical-depth)
     - [ ] Role-specific Concerns 3개 정의
     - [ ] Evidence 연결 구조
     - [ ] Validation 로직 (Concern → Outcome 상관관계)
   risk:
     - 낮음 (명확한 도메인 지식)
   output:
     - Concern Taxonomy
     - ValidationResult 쿼리

3. HiringOutcome + Employment 분리
   complexity: MEDIUM
   priority: ⭐⭐⭐⭐⭐
   tasks:
     - [ ] HiringOutcome 스키마 (decision, rationale, concerns_overridden)
     - [ ] Employment 스키마 (선택적 속성 포함)
     - [ ] dataAvailability 메타데이터
     - [ ] DepartureReason enum 체계화
     - [ ] AdditionalSignalSources 정의
   risk:
     - 중간 (회사마다 데이터 다름)
     - 완화: Optional 속성으로 유연성 확보
   output:
     - HiringOutcome + Employment 스키마
     - 신호 결합 로직

4. Fallback 1: 재직 기간 + Pattern 조합
   complexity: LOW
   priority: ⭐⭐⭐⭐⭐
   tasks:
     - [ ] Employment duration 계산 로직
     - [ ] Pattern + duration 조합 평가
     - [ ] 신뢰도 모델링 (데이터 가용성 기반)
   risk:
     - 낮음 (단순 로직)
   output:
     - assess_employment_outcome_with_signals() 함수

5. MemoryTrigger 시스템
   complexity: MEDIUM
   priority: ⭐⭐⭐⭐
   tasks:
     - [ ] MemoryTrigger 온톨로지
     - [ ] Similarity → Trigger 조건 (threshold)
     - [ ] displayContext 생성 로직 (보리에게 보여줄 맥락)
     - [ ] keyReminders 정의 (이름 + 퇴사 사유 + PIP + 면접 평가)
   risk:
     - 중간 (보리가 실제로 기억할지 검증 필요)
     - 완화: 프로토타입으로 검증
   output:
     - MemoryTrigger 스키마
     - 기억 트리거 UX 프로토타입
```

### Should Have (여유 있으면) 🔄

```yaml
6. Similarity 명시화
   complexity: HIGH
   priority: ⭐⭐⭐
   tasks:
     - [ ] Similarity 온톨로지
     - [ ] SimilarityReason 구조 (유사도 근거)
     - [ ] 블랙박스 허용 (설명 가능성은 Phase 2)
   risk:
     - 높음 (AI 임베딩 기반)
   note:
     - Phase 1에서는 유사도 점수만, 설명은 Phase 2

7. Peer Comparison (동료 비교)
   complexity: MEDIUM
   priority: ⭐⭐⭐
   tasks:
     - [ ] PeerComparison 온톨로지
     - [ ] 비교 차원 정의 (Competency, Concern, Pattern)
     - [ ] 상대 평가 로직
   note:
     - 보리 선호하는 방식
     - MVP에 필수는 아님

8. Cardinality 전체 정의
   complexity: LOW
   priority: ⭐⭐
   tasks:
     - [ ] 15개 관계 Cardinality 명시
     - [ ] 순환 참조 체크
     - [ ] 시간성 표현 완성
   risk:
     - 낮음
   note:
     - 문서화 차원 (구현에 즉시 영향 없음)
```

### Won't Have (Phase 2로 연기) ❌

```yaml
9. 데이터 품질 모델링
   - DataQuality 온톨로지
   - Completeness, Accuracy, Timeliness 메트릭

10. BehavioralPattern 자동 진화
    - 새 케이스 추가 시 패턴 자동 업데이트
    - 패턴 변화 탐지

11. AI 신뢰도 상세 모델링
    - 면접 신호 추출 정확도 트래킹
    - False positive/negative 분석

12. 온톨로지 버전 관리
    - 스키마 변경 이력
    - 마이그레이션 로직
```

### 구현 복잡도 예상

```yaml
HIGH Complexity (2-3주):
  - BehavioralPattern 온톨로지 (detection rules + AI 통합)
  - Similarity 명시화 (AI 임베딩)

MEDIUM Complexity (1-2주):
  - Concern 온톨로지
  - HiringOutcome + Employment
  - MemoryTrigger
  - Peer Comparison

LOW Complexity (1-5일):
  - Fallback 1 로직
  - Cardinality 정의
  - 문서화

Total Estimate (Phase 1 Must Have만):
  - 개발: 4-6주
  - 검증: 1-2주 (보리 프로토타입 테스트)
  - Total: 6-8주
```

### 리스크 & 완화 방안

```yaml
Risk 1: "기억 트리거가 실제로 작동하는가?"
  severity: HIGH
  probability: MEDIUM
  impact: Phase 1 핵심 가치 제안
  mitigation:
    - 프로토타입으로 보리 검증 (Week 2)
    - 기억 힌트 최적화 (이름 + 퇴사 사유 + PIP + 평가)
    - Fallback 강화 (재직 기간 + Pattern)

Risk 2: "재직 기간 프록시 신뢰도 30%"
  severity: MEDIUM
  probability: HIGH (보리 확인)
  impact: 추가 신호 없으면 가치 저하
  mitigation:
    - AdditionalSignalSources 적극 활용
    - Manager 평가 확보 방안 (3/6개월 후 간단 설문)
    - 퇴사 사유 HR 기록 활용

Risk 3: "AI 신호 추출 정확도"
  severity: MEDIUM
  probability: MEDIUM
  impact: BehavioralPattern 감지 실패
  mitigation:
    - Phase 1에서는 수동 검증 병행
    - 명확한 키워드 패턴부터 시작 (we/I 비율)
    - Phase 2에서 LLM 정확도 향상

Risk 4: "회사마다 데이터 다름"
  severity: LOW
  probability: HIGH (확정)
  impact: 선택적 속성으로 해결됨
  mitigation:
    - Optional 속성 + dataAvailability
    - 최소 데이터만으로도 작동 (재직 기간)
    - Phase 2에서 데이터 품질 개선

Risk 5: "온보딩 초기 데이터 부족"
  severity: LOW
  probability: HIGH
  impact: 패턴 학습 느림
  mitigation:
    - 보리 경험 데이터로 시작 (150+ 케이스)
    - 10-20 케이스만 있어도 초기 인사이트 제공
    - 점진적 개선 (데이터 쌓이면서)
```

---

## Part 7: 제리와 보리에게 피드백 요청

### 온톨로지 설계 검증 필요 부분

**제리 (PM)에게:**

1. **BehavioralPattern 우선순위가 맞는가?**
   - 5개 패턴 (team-credit, cultural-fit, decision-avoidance, communication, job-hopping) 충분한가?
   - 추가/제거할 패턴은?
   - 연 4억 절감 임팩트 검증 필요?

2. **Phase 1 스코프가 적절한가?**
   - Must Have (5개 항목) 6-8주에 완료 가능?
   - Should Have 중 Must Have로 올릴 것?
   - Won't Have 중 Phase 1에 꼭 필요한 것?

3. **기억 트리거 리스크 관리**
   - 프로토타입 검증 시기: Week 2? Week 4?
   - Fallback 1 (재직 기간 + Pattern)이 충분한 백업인가?
   - 보리가 80% 기억 못 하면 어떻게 할 것인가?

4. **MVP 출시 기준**
   - 어느 정도 정확도면 출시 가능? (70%? 80%?)
   - 초기 고객: 보리 같은 시니어? 신입?
   - Go/No-Go 판단 기준?

**보리 (HR 실무자)에게:**

5. **BehavioralPattern 감지 규칙이 현실적인가?**
   - team-credit-confusion: "we/our > 10회 AND I/my < 3회" 기준 맞나?
   - cultural-fit-mismatch: "출시 기간 > 평균 × 5배" 신호 유효?
   - decision-avoidance: "IC 경력 5년+ AND 리더십 0" 레드 플래그 맞나?

6. **Concern Taxonomy가 완전한가?**
   - Core 4개 (ownership, cultural-fit, communication, technical-depth) 충분?
   - Role-specific 3개 (learning-agility, collaboration-style, self-direction) 필요?
   - 누락된 중요 Concern은?
   - Ownership vs Self-direction 통합해야 하나?

7. **기억 트리거 힌트가 충분한가?**
   - "이름 + 퇴사 사유 + PIP + 면접 평가" 조합이면 기억 가능?
   - 더 필요한 힌트는? (프로젝트명? 특정 면접 질문?)
   - 18개월 전까지 기억 가능? 그 이상은?

8. **재직 기간 프록시 신뢰도 30% 개선 방법**
   - Manager 평가 (3/6개월 후) 확보 가능성?
   - 퇴사 사유 HR 기록 품질은?
   - LinkedIn 패턴 신뢰도 60%가 맞나?

9. **추가 신호 소스 제안**
   - Manager 평가 외에 확보 가능한 신호는?
   - ATS에서 추출 가능한 숨겨진 신호는?
   - 면접 스크립트 AI 분석 외에?

10. **Peer Comparison 활용 방식**
    - "유사 후보자 3명과 비교" UX가 도움될까?
    - 어떤 차원으로 비교? (Competency? Concern? Pattern?)
    - 즉시 행동 가능한 인사이트를 주는가?

### 추가 필요한 정보

**데이터 검증:**

11. **보리 제공 통계 검증**
    - team-credit-confusion: 40% 빈도, 75% 문제 확률 → 실제 데이터?
    - cultural-fit-mismatch: 3개월 내 퇴사 55% → 샘플 크기?
    - job-hopping: 평균 5.8개월 재직 → 12명 케이스 충분?

12. **Concern → Outcome 상관관계**
    - ownership 우려 → 64% 조기 퇴사 (28건 중 18건)?
    - cultural-fit 우려 → 61% 조기 퇴사 (18건 중 11건)?
    - 과거 데이터로 검증 가능?

13. **회사 맥락 데이터**
    - 평균 제품 출시 사이클: 2-3주?
    - 문화: "빠른 실험, MVP 우선"?
    - 평가 기준: 명문화 여부?

**프로토타입 테스트 계획:**

14. **보리 검증 세션 설계**
    - 언제? (Week 2? Week 4?)
    - 무엇을 테스트? (기억 트리거? Fallback? 둘 다?)
    - 성공 기준? ("5개 케이스 중 4개 기억" 충분?)

15. **제리 검증 세션**
    - Go/No-Go 판단 시점?
    - 비즈니스 케이스 최종 검증?
    - 초기 고객 타겟 확정?

### 다음 단계 제안

**즉시 (이번 주):**

1. **보리에게 통계 검증 요청**
   - 150+ 케이스 데이터 상세 확인
   - Pattern별 빈도/문제 확률 재확인
   - Concern별 검증 데이터 확보

2. **제리와 스코프 최종 합의**
   - Phase 1 Must Have 5개 항목 확정
   - 6-8주 타임라인 현실적인지
   - Go/No-Go 기준 합의

**Week 2:**

3. **프로토타입 1: 기억 트리거**
   - James-Daniel 시나리오 Mock UI
   - 보리 검증 세션 (1시간)
   - 성공 기준: 5개 케이스 중 4개 기억

4. **프로토타입 2: BehavioralPattern 감지**
   - 면접 스크립트 AI 분석 데모
   - team-credit-confusion 감지 정확도 테스트

**Week 3-4:**

5. **온톨로지 스키마 구현**
   - Python/TypeScript 클래스 정의
   - 데이터베이스 스키마 (GraphDB or Relational)
   - 보리 데이터 150+ 케이스 입력

6. **핵심 쿼리 구현**
   - find_similar_candidates()
   - validate_concern_with_history()
   - assess_employment_outcome_with_signals()

**Week 5-6:**

7. **통합 테스트**
   - 전체 시나리오 (James → Daniel 기억 트리거)
   - 보리 실제 사용 테스트
   - 정확도/유용성 측정

8. **Go/No-Go 결정**
   - 제리와 비즈니스 케이스 최종 검토
   - 초기 고객 타겟 확정
   - Phase 2 스코프 논의

---

## 핵심 요약

### v0.3 주요 변화

**v0.2 → v0.3:**

1. **BehavioralPattern 온톨로지 추가** (연 4억 절감 핵심)
   - 5개 패턴 정의 (보리 경험 150+ 케이스)
   - 감지 규칙, 레드 플래그, 확률 분포

2. **Concern 온톨로지 체계화**
   - Core 4개 + Role-specific 3개
   - Evidence 연결 + Validation 로직

3. **HiringOutcome 시간성 강화**
   - Employment 분리
   - 선택적 속성 (Optional + dataAvailability)
   - 추가 신호 통합 (Manager, Exit, Reference, LinkedIn)

4. **기억 트리거를 Primary로**
   - MemoryTrigger 온톨로지
   - Fallback이 아닌 핵심 전략
   - 80% 케이스 대응

5. **확률적 관계 명시**
   - OutcomeDistribution 속성
   - 신뢰도 구간 포함
   - 샘플 크기 기반 confidence

6. **Cardinality + 시간성**
   - 15개 관계 명확화
   - 선택적 관계 (0..N) 표현
   - 채용 프로세스 상태 전이

### 설계 철학 재확인

1. **실용성 > 완벽성**
   - 재직 기간 30% 신뢰도 → 추가 신호로 보완
   - AI 정확도 불확실 → 수동 검증 병행

2. **Human-in-the-Loop**
   - 시스템이 모든 것을 알 필요 없음
   - 보리 암묵지 활성화 (기억 트리거)

3. **불완전성 허용**
   - Optional 속성 (회사마다 다름)
   - dataAvailability 명시
   - 확률 분포 (확정 아님)

4. **점진적 개선**
   - Phase 1: 작동하는 MVP
   - Phase 2: 자동화, 설명 가능성
   - 데이터 쌓이면서 정확도 향상

---

**다음 액션:**

제리와 보리에게 이 문서 공유 → 피드백 수렴 → Phase 1 구현 시작

