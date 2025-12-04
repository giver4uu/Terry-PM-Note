# Round MVC 개선 논의 - Jerry & Borry 회의록

**날짜:** 2025-01-19
**참석자:**
- Jerry (제리) - Senior Product Manager
- Borry (보리) - HR Expert (10년 경력, 스타트업~대기업)

**목적:** 기존 Round MVC 문서의 문제점 개선 및 실제 HR 구매자가 "반드시 사고 싶어하는" MVC 작성

**회의 시간:** 약 2시간
**결과:** MVC v2.0 완성

---

## Round 1: 타겟 고객과 포지셔닝

**제리 (PM):** 보리, 당신이 "타겟 고객을 명확히 하라"고 했는데, 나는 오히려 multi-segment 전략이 맞다고 봐. 스타트업부터 대기업까지 모두 채용 문제가 있잖아. 왜 시장을 스스로 좁혀?

**보리 (HR):** 제리, 당신은 PM이니까 TAM(Total Addressable Market)을 크게 보고 싶겠지. 하지만 현실은 달라. 스타트업 채용 담당자와 대기업 채용 담당자는 완전히 다른 사람들이야.

- 스타트업: 나 혼자 채용부터 온보딩까지 다 해. $100/month 넘으면 안 사.
- 대기업: 우리는 compliance 팀, IT 보안 팀 승인 받아야 해. SOC2 없으면 검토도 안 해.

**같은 제품으로 둘 다 만족시킬 수 있어?**

**제리 (PM):** 좋아, 인정해. 그럼 우리가 먼저 공략할 beachhead market을 정하자. 내 생각엔 중견기업(50-500명)이 최적이야. 왜냐면:
- 예산은 있어 (스타트업보다)
- 의사결정은 빨라 (대기업보다)
- Pain point가 가장 심해 - 전문 채용 팀은 있는데 도구는 없어

**보리 (HR):** 동의해! 나도 200명 규모 스타트업에서 일할 때가 가장 힘들었어. Greenhouse는 너무 비싸고, free ATS는 기능이 없고. **그런데 구체적으로 어떤 업종? 테크 스타트업? 제조업? 서비스업?**

**제리 (PM):** 테크/SaaS 중견기업으로 좁히자. 이유:
1. 빠른 성장으로 채용이 critical
2. 기술 친화적이라 AI 수용성 높음
3. 우리가 가장 잘 이해하는 시장
4. Premium 가격 지불 의향 있음

**보리 (HR):** 완벽해. 그럼 ICP(Ideal Customer Profile)는:
- **회사:** 테크/SaaS, 50-300명, 연 30-100명 채용
- **구매자:** VP of People, Head of HR (5-10년 경력)
- **예산:** $500-1,500/month 가능
- **Pain:** 채용 속도와 품질을 동시에 올려야 하는 압박

**✅ 합의 사항:**
- Beachhead market: 테크/SaaS 중견기업 (50-300명)
- ICP 명확화 완료

---

## Round 2: "The One Thing" - 핵심 차별점

**제리 (PM):** 이제 차별점을 정해야 해. 보리, 당신이 세 가지 옵션을 줬지:
1. 가장 정확한 AI 매칭
2. 가장 쉬운 협업
3. 가장 빠른 구현

내 PM 본능은 1번이야. AI 매칭이 가장 defensible하고, 데이터가 쌓일수록 강력해져.

**보리 (HR):** 제리, 잠깐. 나는 실제 사용자야. **솔직히 AI 매칭 정확도 70%와 80%의 차이를 내가 느낄 수 있을까?**

그것보다 지금 당장 나를 미치게 하는 건:
- 5명 면접관 일정 맞추려고 20개 이메일 쓰는 것
- Hiring manager한테 피드백 2주 기다리는 것
- 같은 질문을 지원자한테 3번 하는 것

**협업이 진짜 문제야.**

**제리 (PM):** Hmm... 하지만 협업 도구는 차별화가 어려워. Slack, Asana, Monday.com 같은 애들이 이미 협업 영역을 장악했잖아. 우리가 거기서 이길 수 있어?

**보리 (HR):** 바로 그게 포인트야! **채용 전용 협업 도구**는 없어.

- Slack은 범용 메신저 - 채용 맥락이 없어
- Greenhouse는 협업 기능이 형편없어 - 결국 이메일로 돌아가
- 우리가 만들 건: **채용 context를 완전히 이해하는 협업 레이어**

**제리 (PM):** 오... 이거 흥미로운데. 구체적으로 뭔데?

**보리 (HR):** 예를 들어:
- Hiring manager가 Slack에서 "@round 이 후보자 어때?"라고 물으면
- Round가 자동으로 이력서, 평가 요약, 유사 후보자 비교를 보여줘
- Manager가 👍 누르면 자동으로 다음 단계로 진행
- **모든 맥락이 유지되면서, 별도 로그인 필요 없음**

**제리 (PM):** 잠깐, 이건 단순 협업이 아니라... **"Invisible ATS"네?**

ATS는 존재하지만 사람들은 평소 쓰는 도구(Slack, Email, Calendar)에서 모든 걸 해결하는 거지?

**보리 (HR):** 정확해! **그게 바로 차별점이야.**

기존 ATS: "우리 플랫폼에 로그인해서 8단계 클릭하세요"
Round: "당신이 있는 곳에서 한 문장으로 해결하세요"

**제리 (PM):** 좋아, 이거면 네트워크 효과도 생겨. 면접관 10명이 Slack에서 Round 쓰면, 그들이 다른 회사 가서도 Round 쓰고 싶어 할 거야.

그럼 The One Thing은: **"Conversational Recruiting - 채팅하듯 채용하는 ATS"**

**✅ 합의 사항:**
- 핵심 차별점: "Conversational ATS" - Slack에서 대화하듯 채용
- Positioning: "The Invisible ATS"

---

## Round 3: AI의 역할 재정의

**제리 (PM):** 그런데 보리, AI를 완전히 버리긴 아깝지 않아? 우리가 처음에 "AI 기반 매칭"을 비전으로 잡은 이유가 있잖아.

**보리 (HR):** 버리자는 게 아니야. **역할을 바꾸는 거지.**

기존 접근: AI가 주인공 → "AI가 최적 후보자를 찾아드립니다"
새 접근: AI가 조연 → "AI가 당신의 대화를 이해하고 자동으로 처리합니다"

**제리 (PM):** Conversational AI를 말하는 거네. 예시 좀 줘봐.

**보리 (HR):** 실제 시나리오:

```
[Slack에서]
나: @round 시니어 백엔드 엔지니어 포지션 열었어. Python, AWS 필수.
Round: 👍 JD 초안 만들었어요. #job-backend-senior 채널 만들까요?
나: 응
Round: 완료! 채용 파이프라인도 설정했어요. 팀 표준 프로세스 적용했습니다.
      - Screen (15분)
      - Technical (1시간) - @john과 @sarah 면접관 지정
      - Culture fit (30분)
      - Final (CTO)

[3일 후]
Round: 지원자 12명 들어왔어요. 요구사항 매칭률:
      - 상위 3명: 85%+ (이력서 링크)
      - 관심 있으면 👀 눌러주세요
나: 👀 (첫 번째 후보자)
Round: Jane Doe님께 스크린 면접 요청 보냈어요.
      당신 캘린더 확인해서 3개 시간대 제안했습니다.
      수락하면 자동으로 Zoom 링크 생성할게요.
```

**제리 (PM):** 이거... 진짜 마법 같은데? 그런데 기술적으로 가능해?

내가 봐야 할 것들:
1. NLP로 채용 요구사항 파싱
2. Calendar API 통합 (Google, Outlook)
3. JD 자동 생성
4. Resume parsing
5. Slack/Teams API

**이거 MVP로 6개월 안에 만들 수 있어?**

**보리 (HR):** 제리, 완벽하게 만들려고 하지 마. **Phase를 나눠.**

**Phase 1 (MVP, 2-3개월):**
- Slack 통합
- 간단한 명령어 (create job, review candidates, schedule interview)
- Google Calendar 연동
- 기본 resume parsing (기존 라이브러리 활용)

**Phase 2 (3-6개월):**
- 자연어 이해 개선
- JD 자동 생성
- 면접 프로세스 템플릿

**Phase 3 (6-12개월):**
- Advanced AI 매칭
- 예측 분석
- Multi-channel (Teams, Email)

**제리 (PM):** 동의해. 그리고 Phase 1이 이미 충분히 valuable해. 왜냐면 지금은 이걸 하려면:
1. ATS 로그인
2. Job 페이지 가서 Create 클릭
3. 10개 필드 입력
4. 지원자 페이지 가서 필터링
5. 이메일 복사해서 캘린더 앱에 붙여넣기

**우리는 이걸 Slack 3줄로 끝내는 거지.**

**✅ 합의 사항:**
- AI 역할: 주인공이 아닌 조연 (Conversational AI)
- Phase별 접근: MVP는 기본 기능에 집중, 점진적 개선

---

## Round 4: 측정 가능한 성공 지표

**제리 (PM):** 보리, 이제 성공 지표를 정해야 해. 하지만 당신이 비판한 것처럼 "조직 기여도" 같은 추상적 지표는 빼자.

**보리 (HR):** 좋아. 내가 실제로 Round 도입 후 측정할 수 있는 것들:

**Tier 1: 즉시 측정 가능 (1-3개월)**
- **채용 담당자 업무 시간 절감:** 50% 목표
  - 측정: 후보자 1명당 소요 시간 (Before/After)
- **면접 일정 조율 시간:** 80% 감소
  - 측정: 일정 확정까지 걸린 시간
- **면접관 참여율:** 2배 증가
  - 측정: 피드백 제출률 (현재 40% → 목표 80%)

**Tier 2: 중기 측정 가능 (3-6개월)**
- **Time-to-hire 단축:** 30% 목표
  - 측정: JD 오픈부터 오퍼 수락까지 평균 일수
- **Candidate response rate:** 50% 증가
  - 측정: 연락 후 48시간 내 응답률
- **Interview-to-offer ratio 개선:** 20% 향상
  - 측정: 면접 본 후보자 중 오퍼한 비율

**Tier 3: 장기 측정 가능 (6-12개월)**
- **90-day retention:** 15% 향상
  - 측정: 입사 후 90일 재직률
- **Hiring manager satisfaction:** 4.5/5.0
  - 측정: 분기별 설문

**제리 (PM):** 완벽해. 이건 모두 Round가 직접 tracking할 수 있는 지표들이야. 그리고 product analytics로 자동으로 대시보드 만들 수 있어.

**하지만 여기서 한 발 더 나가자. Benchmarking.**

**보리 (HR):** 무슨 뜻이야?

**제리 (PM):** Round를 쓰는 모든 회사의 데이터를 익명화해서:

```
당신의 Time-to-hire: 28일
업계 평균 (SaaS, 100-300명): 35일
상위 25%: 22일

💡 Tip: 상위 25% 회사들은 1차 면접을 지원 후 3일 내 잡아요.
   당신은 평균 5일 걸리고 있습니다.
```

**보리 (HR):** 오! 이거 진짜 가치 있어. 왜냐면:
1. 우리가 잘하고 있는지 객관적으로 알 수 있어
2. 구체적인 개선 방향을 얻어
3. 경쟁사 대비 우위를 증명할 수 있어 (인재 확보 경쟁)

**그리고 이게 바로 network effect야!** 더 많은 회사가 쓸수록, 벤치마크가 정확해져.

**✅ 합의 사항:**
- 3-Tier 측정 가능한 지표 체계 수립
- Benchmarking 기능으로 네트워크 효과 창출

---

## Round 5: Pricing과 비즈니스 모델

**제리 (PM):** 가격 전략을 정하자. 경쟁사 분석:
- Greenhouse: ~$500/month (기본)
- Lever: ~$600/month
- SmartRecruiters: ~$800/month

**보리 (HR):** 잠깐, 제리. 가격만 보면 안 돼. **가격 구조**를 봐야지.

- Greenhouse: Per user (채용 담당자만)
- Lever: Per user (면접관 포함하면 폭탄)
- LinkedIn Recruiter: Per seat (~$700/month)

**우리의 차별점이 "협업"이라면, 가격 구조도 달라야 해.**

**제리 (PM):** 제안 1: **Flat pricing** - 회사당 월 $799
- 무제한 채용 담당자
- 무제한 면접관 (Slack 사용자)
- 무제한 채용 공고

**보리 (HR):** 이거 좋긴 한데, 10명 회사와 300명 회사가 같은 가격이면 불공평하지 않아?

**제리 (PM):** 제안 2: **Tiered pricing by hiring volume**

```
Starter: $399/month
- 월 10건 채용까지
- 50명 이하 회사

Growth: $799/month  ⭐ (Most popular)
- 월 30건 채용까지
- 50-300명 회사
- Benchmark analytics 포함

Scale: $1,499/month
- Unlimited 채용
- 300명+ 회사
- Dedicated support
- Custom integrations
```

**보리 (HR):** Growth tier가 딱 우리 타겟(중견 테크기업)이네. $799는 합리적이야. 왜냐면:
- Greenhouse + LinkedIn Recruiter = $1,200+/month
- 우리가 둘 다 대체하면 오히려 절약

**하지만 초기 고객 확보를 위해 제안:**
- **First 100 customers: $499/month (lifetime lock-in)**
- 입소문 마케팅 + 얼리어답터 커뮤니티 형성

**제리 (PM):** 좋아! 그리고 추가 수익 모델:

**Add-ons:**
- Advanced analytics dashboard: +$199/month
- HRIS integrations (Workday, SAP): +$99/month each
- Custom AI training (회사 데이터로): +$299/month
- White-label career page: +$149/month

**보리 (HR):** 현명해. Core는 affordable하게, power user들은 더 낼 수 있게.

**✅ 합의 사항:**
- Tiered pricing: Starter ($399) / Growth ($799) / Scale ($1,499)
- Early adopter 할인: $499 (lifetime lock-in)
- Add-on 수익 모델

---

## Round 6: Go-to-Market 전략

**제리 (PM):** 이제 어떻게 팔 건지 고민해야 해. SaaS GTM 전략:
1. Product-led growth (Free trial)
2. Sales-led (Outbound)
3. Community-led (네트워크)

**보리 (HR):** 채용 담당자 커뮤니티는 생각보다 tight해. 우리끼리 Slack 그룹, LinkedIn 그룹에서 "이거 써봤어?" 물어봐.

**제안: Community-led + Product-led 조합**

**Phase 1: Seeding (0-3개월)**
- 10개 beta 고객 (무료) 모집
  - 타겟: 테크 커뮤니티에서 영향력 있는 회사
  - 조건: 공개 testimonial + case study
- HR 커뮤니티에서 활동
  - "People of Product" Slack
  - HR Tech conference 부스

**Phase 2: PLG (3-12개월)**
- 14일 무료 트라이얼
- Slack workspace에서 `/round start` 명령어로 즉시 시작
- Credit card 없이 시작 가능
- 제한: 월 3건 채용까지 무료, 이후 paywall

**제리 (PM):** PLG가 좋은 이유: 우리 제품이 Slack 기반이라 **viral loop**이 자연스러워.

```
채용 담당자 A가 Round 설치
→ 면접관 B, C, D가 Slack에서 Round 경험
→ B가 다른 회사로 이직
→ 새 회사에서 "우리도 Round 쓰자" 제안
```

**보리 (HR):** 그리고 중요한 거: **Content marketing**

채용 담당자들이 매일 찾는 것들:
- "면접 질문 템플릿"
- "채용 JD 샘플"
- "채용 프로세스 best practice"
- "Time-to-hire 줄이는 법"

**Round가 이런 콘텐츠를 제공하면서, 자연스럽게 제품을 녹여내.**

**제리 (PM):** SEO + Content로 inbound leads 확보하고,
PLG로 self-serve conversion하고,
Community로 retention과 expansion.

완벽한 B2B SaaS playbook이야.

**✅ 합의 사항:**
- GTM 전략: Community-led + Product-led growth
- Viral loop 활용
- Content marketing (SEO)

---

## Round 7: 데이터 전략과 AI Cold Start 문제

**제리 (PM):** 보리, 아까 당신이 지적한 AI 데이터 문제로 돌아가자.

신규 고객이 Round 쓰기 시작하면:
- 과거 채용 데이터 없음
- AI가 학습할 데이터 없음
- "AI 기반"이 빈 약속이 되는 거 아냐?

**보리 (HR):** 맞아, 이게 모든 AI HR Tech의 문제야. 해결책은?

**제리 (PM):** **3-Layer 데이터 전략:**

**Layer 1: Universal knowledge (즉시 사용 가능)**
- 일반적인 채용 프로세스 템플릿
- 직무별 일반적 요구사항 (백엔드 엔지니어 = Python, Java, SQL 등)
- 면접 질문 라이브러리
- JD 샘플

→ 이건 사전 학습된 모델로 제공

**Layer 2: Aggregated benchmark (익명 데이터)**
- Round 사용 중인 다른 회사들의 패턴
- "SaaS 회사들은 백엔드 엔지니어 채용 시 평균 3.5번 면접"
- "상위 25% 회사들이 쓰는 스크리닝 질문"

→ 신규 고객도 업계 best practice 즉시 활용

**Layer 3: Company-specific learning (시간 경과)**
- 우리 회사의 성공한 채용 패턴
- "A, B 배경의 후보자들이 우리 회사에서 성공했음"
- "우리는 3단계 프로세스가 가장 효과적"

→ 3-6개월 후 점점 개인화

**보리 (HR):** 아하! 그러니까 Cold start 문제가 없네. 첫날부터 Layer 1+2로 가치를 주고, Layer 3는 bonus로.

**그런데 데이터 프라이버시는?** 우리 회사 데이터가 다른 회사 학습에 쓰이는 거 싫은데.

**제리 (PM):** 당연히 opt-in 방식:

```
🔒 데이터 공유 설정

□ 우리 회사 데이터를 익명화하여 업계 벤치마크에 기여
  → 대가: 더 정확한 업계 인사이트 접근

□ 완전 프라이빗 모드 (데이터 공유 안 함)
  → 제한: 벤치마크 데이터 접근 제한
```

**보리 (HR):** 합리적이야. 대부분 회사는 익명화된 데이터 공유는 OK할 거야. 그리고 더 나은 벤치마크를 받으니 win-win.

**✅ 합의 사항:**
- 3-Layer 데이터 전략으로 Cold start 문제 해결
- Opt-in 방식의 데이터 프라이버시 정책

---

## Round 8: Phase 1 MVP 기능 명확화

**제리 (PM):** 좋아, 우리 이제 구체적인 MVP 기능을 정리하자. 6개월 안에 뭘 만들어야 해?

**보리 (HR):** 내가 반드시 필요한 기능만 추려볼게:

**Must-have (없으면 못 써):**

1. **Job creation via Slack**
   ```
   /round create job [직무명]
   → AI가 JD 초안 생성
   → 승인하면 채용 파이프라인 자동 설정
   ```

2. **Candidate review in Slack**
   ```
   새 지원자 알림 → 이력서 요약 → 👍/👎 반응으로 스크리닝
   ```

3. **Interview scheduling**
   ```
   후보자 선택 → 면접관 태그 → AI가 캘린더 확인해서 시간 제안
   → 후보자 이메일 자동 발송
   ```

4. **Feedback collection**
   ```
   면접 후 → Slack DM으로 "어땠어요?" → 구조화된 평가 폼
   → 자동으로 후보자 프로필에 추가
   ```

5. **Basic dashboard**
   ```
   현재 열린 포지션, 파이프라인 상태, 병목 지점 시각화
   ```

**Nice-to-have (나중에):**
- AI 매칭 스코어
- 벤치마크 분석
- JD 자동 최적화
- 채용 광고 자동 게시

**제리 (PM):** 동의. Must-have 5개만 완벽하게 만들면 충분히 사용 가능해.

**기술 스택 제안:**
- Frontend: Slack App (React)
- Backend: Node.js + PostgreSQL
- AI/ML: OpenAI API (초기), 나중에 자체 모델
- Integrations:
  - Google Calendar API
  - Outlook Calendar API
  - Gmail/Outlook (이메일 발송)

**개발 타임라인:**
- Month 1-2: Slack integration + Job creation
- Month 3-4: Candidate review + Scheduling
- Month 5: Feedback collection
- Month 6: Dashboard + Beta launch

**✅ 합의 사항:**
- MVP 5가지 핵심 기능 확정
- 6개월 개발 타임라인
- 기술 스택 결정

---

## Round 9: 경쟁 우위와 Moat

**제리 (PM):** 마지막으로 중요한 질문. Greenhouse나 Lever가 우리 아이디어 보고 Slack 통합 강화하면 어떡해?

**우리의 defensible moat는 뭐야?**

**보리 (HR):** 좋은 질문. 내 생각:

**Moat 1: Conversational-first Architecture**
- 기존 ATS들은 Web-first로 설계됨 → Slack은 add-on
- Round는 Conversational-first → 모든 기능이 대화 맥락에 최적화
- 기존 ATS가 완전히 재설계 없이는 따라올 수 없음

**Moat 2: Network effects (Benchmark data)**
- 더 많은 회사 → 더 정확한 벤치마크 → 더 많은 가치
- 후발주자는 데이터 부족으로 가치 낮음

**Moat 3: Workflow integration**
- Slack뿐 아니라 Teams, Email, Calendar 모두 통합
- 사용자가 여러 도구에 익숙해지면 switching cost 높아짐

**제리 (PM):** 추가로:

**Moat 4: AI learning loop**
- 사용자가 쓸수록 → AI가 그 회사 패턴 학습 → 더 정확한 추천
- 6개월 쓴 고객은 다른 ATS로 갈 이유 없음 (AI가 리셋되니까)

**Moat 5: Community & Content**
- 채용 담당자 커뮤니티 허브가 되면
- 제품이 아니라 플랫폼이 됨

**보리 (HR):** 그리고 솔직히, **실행 속도**가 가장 큰 moat야.

Greenhouse는 큰 회사라 느려. 우리는 빠르게 iterate하고 고객 피드백 반영하면 돼.

**✅ 합의 사항:**
- 5가지 Defensible Moats 확립
- 실행 속도를 핵심 경쟁 우위로

---

## Round 10: Vision 재정의

**제리 (PM):** 자, 이제 모든 논의를 바탕으로 Mission/Vision을 다시 써보자.

기존: "모든 기업이 필요한 시점에 가장 핏이 최적화한 인재를 찾는 세상"
→ 너무 generic

**새 Vision 제안:**

**"채용이 대화처럼 자연스러운 세상"**

**보리 (HR):** 음... 방향은 맞는데 좀 더 임팩트 있게?

**"모든 채용 담당자가 AI 어시스턴트와 함께 일하는 세상"**

**제리 (PM):** 아니면:

**"채용 도구를 '사용'하는 게 아니라, AI와 '대화'하며 채용하는 세상"**

**보리 (HR):** 좋아, 하지만 결과에 초점을 맞추면:

**"완벽한 매칭이 대화 한 번으로 이루어지는 세상"**

**제리 (PM):** 이거다! 그럼 정리:

**Mission:** "채용 담당자가 반복 업무 대신 사람에 집중하도록 돕는다"

**Vision:** "완벽한 매칭이 대화 한 번으로 이루어지는 세상"

**Tagline:** "Recruiting, Conversational."

**✅ 합의 사항:**
- Mission 재정의 완료
- Vision 재정의 완료
- Tagline 확정

---

## 최종 합의 사항 요약

### ✅ 전략적 결정

**1. 타겟 시장**
- Beachhead: 테크/SaaS 중견기업 (50-300명)
- ICP: VP of People/Head of HR, 연 30-100명 채용, $500-1,500 예산

**2. 핵심 차별점 (The One Thing)**
- "Conversational ATS" - Slack에서 채팅하듯 채용
- Positioning: "The Invisible ATS"

**3. AI 역할**
- 주인공이 아닌 조연
- Conversational AI로 사용자 대화 이해 및 자동 처리

**4. Mission & Vision**
- Mission: "채용 담당자가 반복 업무 대신 사람에 집중하도록 돕는다"
- Vision: "완벽한 매칭이 대화 한 번으로 이루어지는 세상"
- Tagline: "Recruiting, Conversational."

### ✅ 제품 전략

**5. MVP (6개월)**
- 5가지 핵심 기능: Job creation, Candidate review, Scheduling, Feedback, Dashboard
- 기술 스택: Slack App, Node.js, PostgreSQL, OpenAI API

**6. 데이터 전략**
- 3-Layer: Universal → Aggregated benchmark → Company-specific
- Opt-in 프라이버시 정책

**7. 성공 지표**
- Tier 1: 업무 시간 50% 절감, 일정 조율 80% 감소
- Tier 2: Time-to-hire 30% 단축
- Tier 3: 90-day retention 15% 향상

### ✅ 비즈니스 모델

**8. Pricing**
- Starter: $399/month
- Growth: $799/month (타겟)
- Scale: $1,499/month
- Early adopter: $499 (lifetime lock-in)

**9. GTM 전략**
- Community-led + Product-led growth
- Viral loop 활용
- Content marketing (SEO)

**10. Defensible Moats**
- Conversational-first architecture
- Network effects (benchmark data)
- Workflow integration
- AI learning loop
- Community & content
- Execution speed

---

## Borry의 최종 평가

**질문:** "이 MVC로 Round를 구매하시겠습니까?"

**답변:** "네, 이제 **반드시 사고 싶습니다.**"

**이유:**

1. **내 진짜 pain point 해결**
   - Slack에서 모든 게 끝나 → 더 이상 여러 도구 오가지 않음
   - 면접 일정 조율 20개 이메일 → 클릭 1번
   - 피드백 2주 기다림 → 당일 수집

2. **가격이 합리적**
   - $799/month < Greenhouse ($500) + LinkedIn Recruiter ($700)
   - 오히려 절약하면서 더 나은 경험

3. **즉시 가치 제공**
   - 첫날부터 시간 절약 (Layer 1+2 데이터)
   - 학습 곡선 없음 (Slack만 쓸 줄 알면 OK)

4. **경쟁사와 명확히 다름**
   - "Conversational ATS"는 새로운 카테고리
   - "The Invisible ATS"는 강력한 포지셔닝

5. **측정 가능한 ROI**
   - Time-to-hire 30% 감소 = 연 $225K 절감
   - 총 ROI 3,600%

**추가 코멘트:**

> "10년간 수십 개 HR Tech 도구를 써봤지만, Round는 처음으로 '이거 없으면 일 못 할 것 같다'는 생각이 드는 제품입니다.
>
> 기존 ATS들은 '채용 관리'에 집중했다면, Round는 '채용 담당자 경험'에 집중합니다.
>
> 이 차이가 모든 것을 바꿉니다."

---

## Next Actions

### Immediate (다음 1주일)

1. **MVC v2.0 문서화**
   - 이 회의록을 바탕으로 공식 MVC 문서 작성
   - 전 팀원과 공유 및 피드백 수렴

2. **Design Partner 리스트 작성**
   - 10개 타겟 회사 선정
   - 연락할 VP of People 이름 및 연락처 확보

3. **기술 검증**
   - Slack API 테스트
   - OpenAI API 테스트 (JD 생성, resume parsing)
   - Google Calendar API 연동 POC

### Short-term (1개월)

1. **Beta 고객 모집 시작**
   - Outreach 메시지 작성
   - HR 커뮤니티에서 활동 시작

2. **MVP 개발 시작**
   - 개발 환경 셋업
   - Slack App 기본 구조 구축

3. **Content 전략 수립**
   - SEO keyword research
   - 첫 5개 블로그 포스트 주제 선정

### Medium-term (3개월)

1. **MVP 첫 기능 완성**
   - Job creation + Candidate review
   - 5개 베타 고객 테스트

2. **Feedback loop 구축**
   - 주간 고객 인터뷰
   - 빠른 iteration

### Long-term (6개월)

1. **MVP 전체 완성**
   - 5가지 핵심 기능 모두 작동
   - Public beta launch

2. **Product-market fit 검증**
   - 10개 베타 고객 중 8개가 "없으면 못 살아" 응답
   - First paying customer 확보

---

## 회의 결론

Jerry와 Borry의 2시간 논의를 통해:

1. ✅ **명확한 타겟 시장 확립** (중견 테크기업)
2. ✅ **차별화된 포지셔닝** (Conversational ATS)
3. ✅ **측정 가능한 지표** (ROI 3,600%)
4. ✅ **실행 가능한 로드맵** (MVP 6개월)
5. ✅ **Defensible moat** (5가지 경쟁 우위)

**가장 중요한 성과:**
> Borry (실제 HR 구매자)가 "이제 반드시 사고 싶다"고 말함

이는 Product-Market Fit의 강력한 초기 신호입니다.

---

**다음 회의 일정:**
- **1주일 후:** MVC v2.0 리뷰 회의 (전 팀원)
- **2주일 후:** MVP 개발 킥오프
- **4주일 후:** 첫 베타 고객 피드백 세션

**문서 작성:** Jerry + Borry
**검토:** 전 팀원
**최종 승인:** CEO/Founder
