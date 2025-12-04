# COMP-010: Communication & Collaboration

**작성일:** 2025-11-26
**작성자:** Terry (PM)
**검토자:** Borry (HR), Berry (CTO)
**상태:** Draft
**카테고리:** SOFT_SKILL
**우선순위:** Priority 4 (V1 핵심)

---

## 📋 기본 정보

### Competency ID
`COMP-010`

### Competency Name
**영어:** Communication & Collaboration
**한국어:** 커뮤니케이션 및 협업

### 한 문장 정의
기술적 개념을 명확하게 전달하고, 다양한 직무(PM, 디자이너, QA)와 효과적으로 협업하며, 건설적인 피드백을 주고받는 능력

### 상세 설명
단순히 말을 잘하는 것이 아니라, 청중(기술팀 vs 비기술팀)에 맞게 메시지를 조정하고, 문서화를 통해 지식을 공유하며, 비동기 커뮤니케이션(Slack, 이메일, PR 코멘트)을 효과적으로 사용하는 역량입니다. 갈등 상황에서 건설적인 해결책을 찾고, 회의를 효율적으로 진행하며, 원격 근무 환경에서도 팀과 긴밀히 협력할 수 있습니다. Advanced 단계에서는 조직 간 커뮤니케이션, 기술 발표, 멘토링을 주도합니다.

---

## 🎯 Behavioral Indicators (행동적 지표)

이 역량을 가진 사람은 다음과 같은 행동을 보입니다:

1. **명확한 문서화:** 기술 문서, README, PR 설명을 다른 사람이 이해하기 쉽게 작성
2. **청중 맞춤 설명:** PM에게는 비즈니스 영향, 개발자에게는 기술적 디테일로 설명
3. **적극적 경청:** 상대방의 말을 끊지 않고 듣고, 이해했는지 확인 (paraphrasing)
4. **건설적 피드백:** 코드 리뷰에서 "왜 이렇게 했나요?"로 시작, 대안 제시
5. **비동기 커뮤니케이션:** Slack 메시지에 맥락 포함 (스레드 사용, 스크린샷 첨부)
6. **회의 효율성:** 회의 목표와 안건을 미리 공유, 시간 엄수
7. **갈등 해결:** 의견 차이 시 데이터로 판단, 타협점 찾기
8. **투명한 진행 상황 공유:** 블로커 발생 시 즉시 알림, 도움 요청

---

## 📊 Proficiency Levels (숙련도 레벨)

### Beginner (초급)

**행동적 설명:**
기본적인 업무 커뮤니케이션(Slack, 이메일)을 수행하고, 회의에서 자신의 의견을 표현할 수 있습니다. 질문을 받으면 답변하지만, 능동적으로 정보를 공유하거나 갈등을 해결하는 데는 시니어의 가이드가 필요합니다.

**구체적 예시:**
- Slack에서 간단한 질문/답변 (1-2문장)
- 데일리 스탠드업에서 진행 상황 공유
- PR 생성 시 제목만 작성 (설명 부족)
- 회의 중 질문 받으면 답변 (능동적 발언은 적음)
- 이메일 답장 (간단한 확인 메시지)

**예시 상황:**

**Slack 메시지 (Beginner):**
```
"API 버그 고쳤습니다"
```
→ 문제: 어떤 API인지, 어떤 버그인지, 어떻게 고쳤는지 불명확

**PR 설명 (Beginner):**
```
Title: Fix bug
Description: (비어 있음)
```
→ 문제: 리뷰어가 코드를 읽어야만 변경 이유를 알 수 있음

**한계:**
- 맥락 없는 짧은 메시지 (상대방이 추가 질문 필요)
- 문서화 부족 (코드만 작성, README 업데이트 안 함)
- 수동적 태도 (질문 받을 때만 답변)
- 비동기 커뮤니케이션 미숙 (Slack에서 스레드 대신 채널에 직접 답장)

---

### Intermediate (중급) ⭐ All Engineers Base Competency

**행동적 설명:**
기술적 내용을 명확하게 문서화하고, PM/디자이너/QA와 효과적으로 협업하며, 코드 리뷰에서 건설적인 피드백을 주고받을 수 있습니다. 회의에서 능동적으로 발언하고, 블로커 발생 시 즉시 공유하며, 원격 근무 환경에서도 팀과 긴밀히 소통합니다.

**구체적 예시:**
- Slack 메시지에 맥락 포함 (문제 + 시도한 해결책 + 질문)
- PR 설명에 What/Why/How 포함, 스크린샷 첨부
- 코드 리뷰에서 "이렇게 하면 어떨까요?" 제안
- README, API 문서 작성 및 업데이트
- 회의에서 능동적으로 의견 제시, 질문
- PM에게 기술적 트레이드오프 설명 (비즈니스 용어 사용)
- 데일리 스탠드업에서 블로커 공유, 도움 요청

**예시 상황 1: Slack 메시지 (Intermediate)**
```
📌 **결제 API 타임아웃 이슈 해결**

**문제:**
- `/api/payments` 엔드포인트가 5초 이상 걸려서 타임아웃 발생
- 고객 10명이 결제 실패 신고

**원인:**
- DB 쿼리에 인덱스가 없어서 Full Table Scan 발생

**해결:**
- `orders` 테이블에 `user_id` 인덱스 추가
- 응답 시간: 5초 → 0.3초로 개선

**PR:** #1234
**테스트 완료:** Staging에서 100건 결제 테스트 성공
```
→ 장점: 맥락, 원인, 해결책이 명확. 다른 팀원이 즉시 이해 가능

**예시 상황 2: PR 설명 (Intermediate)**
```
## What (무엇을 변경했나?)
- 사용자 프로필 페이지에 "프로필 사진 업로드" 기능 추가

## Why (왜 변경했나?)
- 고객 인터뷰에서 프로필 사진 업로드 요청이 가장 많았음 (15명 중 12명)
- 경쟁사 대비 누락된 기능

## How (어떻게 구현했나?)
- AWS S3에 이미지 업로드
- Presigned URL로 클라이언트에서 직접 업로드 (서버 부하 감소)
- 이미지 리사이즈: 원본 + 썸네일 (200x200) 자동 생성

## Screenshots
[Before] [After]

## Testing
- ✅ Unit test 작성 (coverage 85%)
- ✅ Integration test: 1MB 이미지 업로드 성공
- ✅ Edge case: 10MB 이미지는 에러 메시지 표시

## Checklist
- [x] README 업데이트
- [x] API 문서 업데이트
- [x] PM 리뷰 완료 (@jane)
```
→ 장점: 리뷰어가 5분 안에 맥락 파악 가능, 테스트 완료 확인

**예시 상황 3: 코드 리뷰 (Intermediate)**
```
// 기존 코드 (리뷰 대상)
function calculateDiscount(price) {
  if (price > 100000) return price * 0.9;
  if (price > 50000) return price * 0.95;
  return price;
}

// 코멘트 (Intermediate)
"좋은 구현입니다! 한 가지 제안드리면, 할인율을 상수로 분리하면 나중에 마케팅 팀이
할인율 변경 요청 시 더 쉽게 수정할 수 있을 것 같습니다.

예시:
const DISCOUNT_TIERS = [
  { threshold: 100000, rate: 0.1 },
  { threshold: 50000, rate: 0.05 }
];

function calculateDiscount(price) {
  const tier = DISCOUNT_TIERS.find(t => price >= t.threshold);
  return tier ? price * (1 - tier.rate) : price;
}

어떻게 생각하시나요?"
```
→ 장점: 건설적, 대안 제시, 질문으로 마무리 (강요하지 않음)

**예시 상황 4: PM과의 협업 (Intermediate)**
```
[PM이 요청] "사용자 목록 페이지를 더 빠르게 만들어주세요"

[Intermediate Engineer 답변]
"현재 사용자 목록 페이지가 2초 걸리는데, 목표가 어느 정도인가요?

몇 가지 옵션이 있습니다:

1. **페이지네이션 추가** (2일 작업)
   - 효과: 2초 → 0.5초
   - 트레이드오프: 사용자가 전체 목록을 한 번에 볼 수 없음

2. **캐싱 추가** (3일 작업)
   - 효과: 2초 → 0.3초
   - 트레이드오프: 데이터가 최대 5분 지연될 수 있음

3. **DB 인덱스 추가** (1일 작업)
   - 효과: 2초 → 1초 (개선 폭 작음)
   - 트레이드오프: 없음

어떤 옵션이 비즈니스에 가장 적합할까요?"
```
→ 장점: 비기술 용어 사용, 트레이드오프 명확, PM이 결정할 수 있게 옵션 제시

---

### Advanced (고급)

**행동적 설명:**
조직 간 커뮤니케이션을 주도하고, 기술 발표로 복잡한 개념을 쉽게 전달하며, 주니어 개발자를 효과적으로 멘토링할 수 있습니다. 갈등 상황에서 중재자 역할을 하고, 글로벌 팀과 타임존을 고려한 비동기 협업을 설계하며, 회의를 효율적으로 퍼실리테이션합니다.

**구체적 예시:**
- 기술 발표 (사내 Tech Talk, 컨퍼런스)
- RFC (Request for Comments) 작성 (아키텍처 결정 문서화)
- 타팀 엔지니어와 API 설계 협의
- 주니어 멘토링 (1-on-1, 코드 리뷰 가이드)
- 회의 퍼실리테이션 (안건 관리, 시간 조정, 결론 도출)
- 갈등 해결 (팀 간 의견 차이 조정)
- 글로벌 협업 (타임존 고려한 비동기 문서화)

**예시 상황 1: RFC 작성 (Advanced)**
```
# RFC-001: 결제 시스템 아키텍처 개선

## 요약
현재 결제 시스템의 단일 장애점(SPOF)을 제거하고, 트래픽 급증 시
자동 스케일링을 지원하는 마이크로서비스 아키텍처로 전환 제안

## 배경
- 블랙프라이데이 세일 때 결제 서버 다운 (매출 손실 $50k)
- 현재 아키텍처: Monolithic, 단일 DB
- 트래픽: 평소 100 req/s, 세일 기간 5000 req/s

## 제안 아키텍처
[다이어그램]
- Payment Gateway (API Gateway)
- Payment Service (마이크로서비스, Auto-scaling)
- Database Replication (Primary-Replica)
- Message Queue (Kafka) - 비동기 처리

## 트레이드오프

| 항목 | 현재 (Monolith) | 제안 (Microservices) |
|------|----------------|---------------------|
| 개발 속도 | 빠름 | 느림 (초기 설정 필요) |
| 운영 복잡도 | 낮음 | 높음 (모니터링, 배포) |
| 확장성 | 낮음 | 높음 (Auto-scaling) |
| 가용성 | 낮음 (SPOF) | 높음 (장애 격리) |

## 마이그레이션 계획
- Week 1-2: Payment Service 분리 (기존 코드와 병행)
- Week 3-4: Database Replication 구성
- Week 5: Traffic 10% 전환 (Canary)
- Week 6: Traffic 100% 전환

## 피드백 요청
- @backend-team: 아키텍처 설계 리뷰
- @devops-team: 인프라 비용 추정
- @pm: 비즈니스 우선순위 확인

**Deadline:** 2025-12-01
```
→ 장점: 의사결정에 필요한 모든 정보 포함, 여러 팀의 피드백 수렴

**예시 상황 2: 기술 발표 (Advanced)**
```
[사내 Tech Talk 주제]
"우리가 N+1 Query 문제를 해결한 방법"

**발표 구조:**
1. 문제 정의 (비기술 용어)
   - "사용자 목록 페이지가 10초 걸려서 고객 이탈률 15% 증가"
   - 스크린샷, 실제 고객 불만 트윗

2. 원인 분석 (기술 용어)
   - N+1 Query란?
   - SQL 실행 계획 (EXPLAIN) 보여주기

3. 해결 방법 (단계별)
   - Eager Loading으로 개선
   - Before/After 코드 비교
   - 성능 그래프 (10초 → 0.5초)

4. 교훈
   - ORM 사용 시 주의사항
   - Performance Monitoring 도구 소개
   - 팀 내 Best Practice 공유

5. Q&A
```
→ 장점: 비기술팀도 이해 가능한 스토리텔링, 실무 적용 가능한 교훈

**예시 상황 3: 주니어 멘토링 (Advanced)**
```
[주니어가 질문] "React에서 useEffect가 계속 실행돼요"

[Advanced Engineer 답변]
"좋은 질문이에요! useEffect의 dependency array 때문인 것 같은데,
코드를 같이 봐도 될까요?

[코드 확인 후]

아, 문제를 찾았어요. `fetchData` 함수가 매번 새로 생성되고 있어서
useEffect가 계속 실행되는 거예요.

두 가지 해결 방법이 있는데:

1. useCallback으로 함수 메모이제이션
2. fetchData를 useEffect 안에 선언

각 방법의 장단점을 설명해드릴게요...

[설명 후]

이제 이해가 되시나요? 비슷한 문제가 생기면 React DevTools Profiler로
무엇이 리렌더링되는지 확인해보세요. 다음 주에 같이 살펴볼까요?"
```
→ 장점: 비판 없이 설명, 여러 해결책 제시, 추가 학습 자료 제공, 후속 조치

---

### Expert (전문가)

**행동적 설명:**
조직의 커뮤니케이션 문화를 개선하고, 대외적으로 회사를 대표하는 기술 발표를 수행하며, 팀 간 갈등 해결과 협업 프로세스를 설계합니다. 글로벌 조직에서 문화적 차이를 고려한 커뮤니케이션을 주도하고, 엔지니어링 블로그, 기술 문서화 표준을 수립합니다.

**구체적 예시:**
- 컨퍼런스 발표 (외부 대상, 회사 홍보)
- 엔지니어링 블로그 작성 및 운영
- 전사 문서화 표준 수립 (ADR, RFC 템플릿)
- 팀 간 협업 프로세스 설계 (API Contract 협의 프로세스)
- 글로벌 팀 리딩 (타임존, 문화 차이 고려)
- 주니어 개발자 채용 면접 (커뮤니케이션 평가)

**예시 상황 1: 컨퍼런스 발표 (Expert)**
```
[발표 제목]
"100만 동시 사용자를 지원하는 실시간 채팅 시스템 설계"

**청중:** 외부 개발자 200명 (다양한 회사)

**발표 구조:**
1. 회사 소개 및 문제 정의
2. 초기 아키텍처 (실패 사례 포함)
3. 개선 과정 (A/B 테스트, 성능 측정)
4. 최종 아키텍처 (WebSocket, Redis, Kafka)
5. 오픈소스 기여 (우리가 만든 라이브러리 공개)
6. 채용 홍보 ("We're hiring!")

**효과:**
- 회사 기술력 홍보
- 채용 지원자 증가 (발표 후 1주일 내 50건)
- 커뮤니티 네트워킹
```

**예시 상황 2: 문서화 표준 수립 (Expert)**
```
# Engineering Documentation Standards v1.0

## 1. Architecture Decision Records (ADR)

**언제 작성하나?**
- 중요한 아키텍처 결정 시 (DB 선택, 프레임워크 변경 등)

**템플릿:**
- Title: 간결한 제목
- Status: Proposed / Accepted / Deprecated
- Context: 배경 및 문제
- Decision: 결정 내용
- Consequences: 장단점

**예시:** [ADR-001: PostgreSQL to DynamoDB Migration]

## 2. Request for Comments (RFC)

**언제 작성하나?**
- 다수의 팀이 영향받는 변경 시

**템플릿:**
- Summary
- Background
- Proposal
- Trade-offs
- Migration Plan
- Feedback Request

**예시:** [RFC-001: Payment System Architecture]

## 3. Pull Request Guidelines

**필수 항목:**
- What / Why / How
- Screenshots (UI 변경 시)
- Testing (Unit/Integration)
- Checklist (README, Docs, Migration)

**코드 리뷰 문화:**
- 24시간 내 리뷰
- Approve / Request Changes / Comment 명확히 구분
- Nitpick은 "nit:" 접두사 사용

## 4. Runbook (장애 대응 문서)

**각 서비스마다 작성:**
- Service Overview
- Common Issues & Solutions
- Rollback Procedure
- Escalation Contact

**효과:**
- 온보딩 시간 50% 단축 (신입이 문서 읽고 독립적으로 작업)
- 장애 복구 시간 30% 단축 (Runbook 참고)
```

**예시 상황 3: 팀 간 협업 프로세스 (Expert)**
```
# Frontend-Backend API Contract 협의 프로세스

**문제:**
- Frontend가 Backend API 완성될 때까지 대기 → 병렬 작업 불가
- API 스펙 변경 시 Frontend 코드 수정 반복

**해결책: API Contract First 프로세스**

1. **Design Phase (Week 1)**
   - PM이 기능 요구사항 작성
   - Backend, Frontend가 함께 API Contract 설계 (OpenAPI Spec)
   - Mock Server 생성 (Prism, MSW)

2. **Development Phase (Week 2-3, 병렬)**
   - Backend: 실제 API 구현
   - Frontend: Mock Server로 UI 개발

3. **Integration Phase (Week 4)**
   - Mock → Real API 교체
   - Integration Test

4. **Review & Iteration**
   - API 변경 필요 시 Contract 먼저 수정 → 양쪽 반영

**효과:**
- 개발 기간: 6주 → 4주 (33% 단축)
- API 스펙 변경으로 인한 반복 작업 80% 감소
```

---

## 📏 Evaluation Rubric (평가 루브릭)

### 5점 척도

| 점수 | Proficiency 매핑 | 평가 기준 | 행동적 앵커 |
|------|------------------|----------|-------------|
| **1점** | N/A | 기본적인 업무 커뮤니케이션 어려움 | - Slack 메시지 답장 안 함 (24시간 이상)<br>- 회의에서 전혀 발언하지 않음<br>- PR 설명 없음 (제목만)<br>- 질문 받아도 "모르겠습니다"만 반복 |
| **2점** | **Beginner** | 수동적 커뮤니케이션, 맥락 부족 | - Slack 메시지 짧고 맥락 없음 ("고쳤습니다")<br>- 회의에서 질문 받을 때만 답변<br>- PR 설명 최소한 (1-2문장)<br>- 문서화하지 않음 (코드만 작성) |
| **3점** | **Intermediate** | 명확한 문서화, 능동적 협업, 건설적 피드백 | - Slack 메시지에 맥락 포함 (문제+해결책)<br>- PR 설명에 What/Why/How<br>- 코드 리뷰에서 대안 제시<br>- PM과 기술 트레이드오프 논의<br>- 회의에서 능동적 발언 |
| **4점** | Advanced | 조직 간 커뮤니케이션, 기술 발표, 멘토링 | - RFC 작성 (아키텍처 결정 문서화)<br>- 사내 Tech Talk 발표<br>- 주니어 멘토링 (정기 1-on-1)<br>- 회의 퍼실리테이션<br>- 갈등 해결 중재 |
| **5점** | Expert | 조직 문화 개선, 대외 발표, 표준 수립 | - 컨퍼런스 발표 (외부 대상)<br>- 엔지니어링 블로그 운영<br>- 전사 문서화 표준 수립<br>- 팀 간 협업 프로세스 설계<br>- 글로벌 팀 리딩 |

---

## 🧪 Assessment Methods (평가 방법)

### 1. 행동 면접 (Behavioral Interview, 30분)
**질문 예시:**

**질문 1:** "최근에 팀원과 의견 충돌이 있었던 경험을 말씀해주세요. 어떻게 해결했나요?"

**평가 기준:**
- **2점:** "그냥 시키는 대로 했습니다" (갈등 회피)
- **3점:** "데이터로 판단했습니다. A/B 테스트 결과를 보여주고 설득했습니다"
- **4점:** "양쪽 의견의 장단점을 정리한 문서를 만들어 팀 회의에서 투표로 결정했습니다"

**질문 2:** "기술적으로 복잡한 내용을 비기술 팀원(PM, 디자이너)에게 설명했던 경험을 말씀해주세요."

**평가 기준:**
- **2점:** "기술 용어 그대로 설명했는데 이해 못 하더라고요"
- **3점:** "비유를 사용했습니다. 'API는 레스토랑 메뉴판 같은 거예요'라고 설명했습니다"
- **4점:** "시각 자료(다이어그램)를 준비하고, 비즈니스 영향을 먼저 설명했습니다"

---

### 2. 문서 작성 과제 (30분)
**과제:**
아래 상황에 대한 Slack 메시지와 PR 설명을 작성하세요.

**상황:**
- 로그인 API가 평균 3초 걸려서 사용자 이탈률 증가
- 원인: DB 쿼리에 인덱스 없음
- 해결: `users` 테이블에 `email` 인덱스 추가
- 결과: 3초 → 0.2초

**평가 기준:**
- **2점:** "로그인 빨라졌습니다" (맥락 없음)
- **3점:** 문제/원인/해결/결과를 모두 포함, 스크린샷 첨부
- **4점:** 위 + 성능 그래프, Rollback 계획, 관련 Jira 티켓 링크

---

### 3. 코드 리뷰 시뮬레이션 (20분)
**과제:**
주니어 개발자가 작성한 아래 코드를 리뷰하세요.

```javascript
function getUserOrders(userId) {
  const user = db.query('SELECT * FROM users WHERE id = ?', [userId]);
  const orders = [];
  for (const orderId of user.orderIds) {
    const order = db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    orders.push(order);
  }
  return orders;
}
```

**평가 기준:**
- **2점:** "N+1 Query 문제 있습니다" (지적만 하고 대안 없음)
- **3점:** "JOIN으로 개선하면 좋을 것 같습니다" + 개선 코드 제시
- **4점:** "좋은 시도입니다! N+1 Query 패턴을 배울 수 있는 좋은 기회네요" + 설명 + 대안 + 추가 학습 자료

---

## 🔗 Related Competencies (관련 역량)

### Prerequisites (선행 역량)
- **기본적인 직장 예절:** 이메일, Slack 사용법
- **영어 읽기:** 기술 문서, Stack Overflow 읽기

### Related Competencies (연관 역량)
- **COMP-011: Problem Solving** - 문제 해결 과정을 명확히 설명하는 능력
- **COMP-020: Product Strategy** (PM) - 제품 전략을 팀에 전달하는 능력

### Next Level (다음 단계)
- **Tech Writing:** 기술 블로그, 튜토리얼 작성
- **Public Speaking:** 컨퍼런스 발표, 패널 토론
- **Leadership:** 팀 리딩, 조직 문화 개선

---

## 📚 Learning Resources (학습 자료)

### Beginner → Intermediate
- **책:** "Radical Candor" (Kim Scott) - 건설적 피드백
- **책:** "The Culture Map" (Erin Meyer) - 글로벌 커뮤니케이션
- **강의:** "Communication Skills for Engineers" (Udemy)
- **도구:** Grammarly (영어 글쓰기), Hemingway Editor (간결한 문장)

### Intermediate → Advanced
- **책:** "Crucial Conversations" (Kerry Patterson) - 어려운 대화 주도
- **책:** "The Staff Engineer's Path" (Tanya Reilly) - 시니어 커뮤니케이션
- **강의:** "Public Speaking for Engineers" (Coursera)
- **도구:** Miro (협업 다이어그램), Notion (문서화)

### Advanced → Expert
- **책:** "An Elegant Puzzle" (Will Larson) - 엔지니어링 조직 관리
- **컨퍼런스:** LeadDev, QCon (엔지니어링 리더십)
- **커뮤니티:** Tech Speakers Meetup, Toastmasters

---

## 📊 Industry Benchmarks (산업 표준)

### O*NET Mapping
- **15-1252.00 Software Developers:** Communication Skills (Important)
- **Oral Comprehension, Written Expression**

### SFIA Mapping
- **SFIA Level 3 (Apply):** Intermediate - 팀 내 협업
- **SFIA Level 4 (Enable):** Advanced - 팀 간 협업, 멘토링
- **SFIA Level 5 (Ensure):** Expert - 조직 간 협업, 표준 수립

### Market Data
- **LinkedIn Top Skills 2024:** Communication (Soft Skill 1위)
- **Stack Overflow Survey:** "Poor communication"이 팀 문제 1위
- **Salary Impact:** 커뮤니케이션 역량은 Senior+ 승진에 결정적 영향

---

## 🎯 Competency Questions (CQ) 매핑

이 Competency는 다음 CQs에 답합니다:

- **CQ-7:** "모든 엔지니어에게 필요한 공통 Soft Skills는?" → Communication (Intermediate 필수)
- **CQ-14:** "PM과 효과적으로 협업하는 엔지니어의 특징은?" → 기술 트레이드오프를 비즈니스 용어로 설명

---

## 📝 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-26 | Terry | Initial draft - Priority 4 competency for V1 |

---

## 👥 Approval Status

- **Terry (PM):** ✅ Draft 작성 완료
- **Borry (HR):** ⏳ 실무 검토 대기 (HR 전문가 피드백 필요)
- **Berry (CTO):** ⏳ 기술 검토 대기

---

**다음 작업:** COMP-011 Problem Solving 작성 (Soft Skill)
