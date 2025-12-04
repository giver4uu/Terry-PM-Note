# COMP-013: End-to-End System Integration

**Competency ID:** COMP-013
**생성일:** 2025-11-26
**최종 수정일:** 2025-11-26
**작성자:** Terry (PM) + Berry (CTO)
**검토자:** Borry (HR, 검토 대기), Berry (CTO, ✅ 승인)
**상태:** Draft

---

## 📋 메타데이터

| 항목 | 내용 |
|------|------|
| **Competency Name** | End-to-End System Integration |
| **Name Ko** | 엔드투엔드 시스템 통합 |
| **Category** | TECHNICAL |
| **적용 Job Function** | Full-stack Engineer (Primary), Backend Engineer (선택), Frontend Engineer (선택) |
| **우선순위** | Critical (Full-stack의 핵심 차별점) |
| **해결하는 문제** | Problem 01 (Full-stack Engineer 역량 표준화) |
| **증거 출처** | Berry CTO 기술 검토, Full-stack 시장 조사 |
| **표준 참조** | REST API, WebSocket, Authentication Patterns |

---

## 🎯 정의 (Definition)

### 한 문장 정의
클라이언트-서버 통신, API 설계 및 연동, 데이터 흐름을 이해하여 **프론트엔드와 백엔드를 통합하는 능력**입니다.

### 상세 설명
End-to-End System Integration은 단순히 Frontend와 Backend를 각각 개발하는 것이 아니라, **전체 시스템이 어떻게 동작하는지 이해하고 연결하는 역량**입니다.

**왜 이 Competency가 Full-stack의 핵심인가?**

Backend만 하는 엔지니어는 "API를 잘 만들지만" Frontend에서 어떻게 사용되는지 모릅니다. Frontend만 하는 엔지니어는 "UI를 잘 만들지만" Backend에서 데이터가 어떻게 처리되는지 모릅니다.

Full-stack Engineer의 진짜 가치는 **이 둘을 연결하는 능력**입니다:
- API Contract를 Frontend와 Backend 양쪽 관점에서 설계
- CORS, Authentication Flow, State Synchronization 같은 통합 이슈를 독립적으로 해결
- Browser → Server → Database의 전체 Request Flow를 이해
- Frontend 변경이 Backend에 미치는 영향(또는 반대)을 예측하고 대응

**Berry CTO의 정의:**
> "Full-stack Engineer는 Backend와 Frontend를 모두 Advanced 수준으로 하는 사람이 아닙니다. 진짜 가치는 End-to-End 시스템을 이해하고 연결하는 능력입니다. 한 사람이 Feature를 끝까지 구현할 수 있다는 것 - 이것이 스타트업에서 Full-stack을 채용하는 이유입니다."

### 동의어 (Synonyms)
- Frontend-Backend Integration
- Full-stack Integration
- Client-Server Integration
- 프론트-백엔드 연동
- 전체 시스템 통합

### 반의어 / 구분 개념 (Distinct Concepts)
- **vs RESTful API Development (COMP-001):** API Development는 Backend에서 API를 "만드는" 능력, Integration은 Frontend에서 API를 "사용하고 연결하는" 능력
- **vs React Development (COMP-003):** React는 Frontend UI를 "만드는" 능력, Integration은 Backend와 "연결하는" 능력
- **vs System Architecture (COMP-007):** Architecture는 전체 시스템 설계, Integration은 Frontend-Backend 연결에 특화

---

## 🔗 관계 (Relationships)

### 관련 Competencies
- **COMP-001 (RESTful API Development):** Integration은 API를 Frontend에서 호출하고 처리하는 능력
- **COMP-003 (React Development):** Integration은 React에서 Backend 데이터를 가져오고 표시하는 능력
- **COMP-010 (Communication):** Integration은 Frontend/Backend 팀 간 협업 필요

### 적용 Job Functions
- **Full-stack Engineer:** Intermediate 이상 필수 (핵심 역량)
- **Backend Engineer (Senior):** Intermediate 권장 (Frontend 관점 이해)
- **Frontend Engineer (Senior):** Intermediate 권장 (Backend 관점 이해)

---

## 📊 Behavioral Indicators (행동적 지표)

### 핵심 행동 지표 (7개)
1. **API Contract 양방향 설계:** Frontend와 Backend 관점에서 모두 API Contract (Request/Response 구조)를 설계하고 협상 가능
2. **통합 이슈 독립 해결:** CORS, Proxy 설정, Authentication Flow, State Synchronization 같은 통합 이슈를 독립적으로 해결
3. **전체 Request Flow 이해:** Browser → Server → Database → Server → Browser의 전체 데이터 흐름을 설명 가능
4. **상호 영향 예측:** Frontend 변경(예: 새 필드 추가)이 Backend에 미치는 영향, 또는 Backend 변경(예: API 구조 변경)이 Frontend에 미치는 영향을 예측하고 대응
5. **Error Handling 전략:** API 호출 실패, Network Error, Timeout 같은 상황에서 Frontend에서 적절한 Fallback, Retry, Loading State 구현
6. **실시간 통신 패턴:** WebSocket, Server-Sent Events 같은 실시간 통신 패턴을 이해하고 구현
7. **End-to-End Testing:** Integration Test, E2E Test, API Mocking 전략을 수립하고 구현

---

## 🎓 Proficiency Levels (숙련도 레벨)

### Proficiency Level: Beginner (초급)
**정의:** 기본적인 API 호출을 Frontend에서 구현할 수 있으며, Backend에서 제공한 API 문서를 보고 데이터를 연동할 수 있습니다.

**Behavioral Examples:**
- `fetch()` 또는 `axios`를 사용하여 GET 요청으로 데이터 가져오기
- Backend에서 제공한 Swagger/Postman 문서를 보고 API 호출
- 간단한 CRUD 기능의 Frontend-Backend 연결 이해 (예: 사용자 리스트 조회)
- API 응답 JSON을 React State에 저장하고 화면에 표시

**실무 시나리오:**
- Backend 팀이 `/api/users` 엔드포인트를 만들어주면, Frontend에서 `fetch('/api/users')`로 데이터를 가져와 리스트를 렌더링합니다.
- Swagger 문서를 보고 Request Body 구조를 맞춰서 POST 요청을 보냅니다.

---

### Proficiency Level: Intermediate (중급)
**정의:** API Contract를 설계하고 Frontend/Backend 양쪽에서 구현할 수 있으며, Authentication Flow, Error Handling, Loading State 같은 통합 패턴을 적용할 수 있습니다.

**Behavioral Examples:**
- API Contract (Request/Response 스키마)를 Frontend와 Backend 관점에서 모두 설계
- JWT Authentication Flow 전체 구현 (Login → Token 저장 → Protected Routes → Token Refresh)
- Error Handling: API 실패 시 Toast 알림, Retry Logic, Fallback UI 구현
- Loading State 관리: 데이터 로딩 중 Skeleton UI 표시, 중복 요청 방지
- CORS 이슈 해결: Proxy 설정 또는 Backend CORS 헤더 설정
- Form Validation: Frontend 검증 + Backend 검증 이중화

**실무 시나리오:**
- Login 기능을 처음부터 끝까지 구현합니다: Frontend에서 이메일/비밀번호 입력 → Backend로 POST `/auth/login` → JWT Token 받아서 localStorage 저장 → Protected Routes에서 Token 검증 → Token 만료 시 Refresh Token으로 갱신
- API 호출 실패 시 "네트워크 오류. 다시 시도해주세요" 메시지 표시하고, 3초 후 자동 Retry 구현

---

### Proficiency Level: Advanced (고급)
**정의:** 복잡한 비즈니스 로직의 Frontend-Backend 역할 분담을 설계하고, 실시간 통신 패턴, API Versioning, End-to-End 테스트 전략을 수립할 수 있습니다.

**Behavioral Examples:**
- **역할 분담 설계:** "검색 필터링을 Frontend에서 할지, Backend에서 할지" 같은 의사결정을 성능/UX 관점에서 판단
- **실시간 통신:** WebSocket으로 실시간 알림 구현 (예: 새 메시지 도착 시 즉시 UI 업데이트)
- **API Versioning:** `/api/v1/users`와 `/api/v2/users`를 동시 지원하며, Frontend에서 점진적 마이그레이션
- **Optimistic UI Update:** API 응답 전에 UI를 먼저 업데이트하고, 실패 시 Rollback (예: 좋아요 버튼)
- **End-to-End Testing:** Cypress/Playwright로 Login → 데이터 조회 → CRUD 전체 Flow 테스트
- **API Mocking:** MSW (Mock Service Worker)로 Frontend 개발 중 Backend API Mocking

**실무 시나리오:**
- 실시간 채팅 기능을 구현합니다: WebSocket으로 서버와 연결 → 새 메시지 수신 시 React State 업데이트 → 재연결 로직 (네트워크 끊김 시) → 읽지 않은 메시지 개수 배지 표시
- Optimistic UI: 사용자가 "좋아요" 버튼 클릭 → 즉시 UI에 반영 (하트 아이콘 빨강게) → Backend POST 요청 → 실패 시 UI 원상복구 + "좋아요 실패" 메시지

---

### Proficiency Level: Expert (전문가)
**정의:** Micro Frontend + Microservices 아키텍처에서 API Gateway, BFF (Backend for Frontend) 패턴을 설계하고, 전사 API 표준을 수립하며, Frontend-Backend 성능 최적화를 주도할 수 있습니다.

**Behavioral Examples:**
- **API Gateway/BFF 패턴:** 여러 Microservices를 Frontend에 맞게 조합하는 BFF 레이어 설계
- **GraphQL/gRPC 평가:** REST 대비 GraphQL, gRPC의 장단점을 평가하고 도입 결정
- **전사 API 표준:** 회사 전체의 API 네이밍, Error Code, Pagination 표준 수립
- **성능 최적화:** N+1 Query 문제 해결, CDN 활용, API Response Caching 전략
- **분산 추적:** Frontend → API Gateway → Microservices → Database 전체 Request 추적 (Distributed Tracing)
- **Micro Frontend 통합:** 여러 팀의 Frontend를 하나의 앱으로 통합하는 아키텍처 설계

**실무 시나리오:**
- Micro Frontend 아키텍처에서 각 팀의 Frontend를 통합합니다: Module Federation으로 런타임 통합 → 공통 Authentication State 공유 → API Gateway로 모든 Backend 요청 라우팅 → Distributed Tracing으로 전체 Request Flow 추적
- GraphQL 도입: REST의 Over-fetching/Under-fetching 문제를 GraphQL로 해결 → Frontend에서 필요한 데이터만 선언적으로 요청 → Backend에 N+1 Query 문제 해결을 위한 DataLoader 도입

---

## 💼 실제 사례 (Real-world Examples)

### 예시 1: Login Authentication Flow (Intermediate 수준)
**맥락:** 가장 일반적인 Integration 사례, 거의 모든 앱에 필요

**구체적 시나리오:**
사용자가 로그인 폼에서 이메일/비밀번호를 입력합니다.

**End-to-End Flow:**
1. **Frontend (React):**
   ```jsx
   const handleLogin = async (email, password) => {
     try {
       const response = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({email, password})
       });

       if (!response.ok) throw new Error('Login failed');

       const {token, user} = await response.json();
       localStorage.setItem('authToken', token);
       setUser(user);
       navigate('/dashboard');
     } catch (error) {
       setError('이메일 또는 비밀번호가 잘못되었습니다');
     }
   };
   ```

2. **Backend (Node.js/Express):**
   ```javascript
   app.post('/api/auth/login', async (req, res) => {
     const {email, password} = req.body;
     const user = await User.findOne({email});

     if (!user || !await user.comparePassword(password)) {
       return res.status(401).json({error: 'Invalid credentials'});
     }

     const token = jwt.sign({userId: user.id}, SECRET);
     res.json({token, user: {id: user.id, name: user.name}});
   });
   ```

3. **통합 이슈 해결:**
   - CORS: Backend에서 `app.use(cors({origin: 'http://localhost:3000'}))`
   - Error Handling: Frontend에서 401 응답 시 명확한 에러 메시지
   - Loading State: API 호출 중 "로그인 중..." 표시, 버튼 비활성화

**Intermediate 수준의 증거:**
- API Contract를 양쪽에서 이해 (Request: `{email, password}`, Response: `{token, user}`)
- Authentication Flow 전체 구현 (Login → Token 저장 → Protected Routes)
- Error Handling, Loading State 적용

---

### 예시 2: 실시간 알림 (Advanced 수준)
**맥락:** 실시간 통신 패턴, WebSocket 활용

**구체적 시나리오:**
사용자가 새 메시지를 받으면 실시간으로 알림을 표시합니다.

**End-to-End Flow:**
1. **Frontend (React + WebSocket):**
   ```jsx
   useEffect(() => {
     const ws = new WebSocket('ws://localhost:8080');

     ws.onopen = () => {
       ws.send(JSON.stringify({type: 'auth', token: authToken}));
     };

     ws.onmessage = (event) => {
       const message = JSON.parse(event.data);
       if (message.type === 'new_message') {
         setNotifications(prev => [...prev, message.content]);
         showToast(`새 메시지: ${message.content}`);
       }
     };

     ws.onerror = () => {
       console.error('WebSocket error, attempting reconnect...');
       setTimeout(() => connectWebSocket(), 3000);  // Reconnect
     };

     return () => ws.close();
   }, []);
   ```

2. **Backend (Node.js + ws):**
   ```javascript
   wss.on('connection', (ws, req) => {
     ws.on('message', (data) => {
       const msg = JSON.parse(data);

       if (msg.type === 'auth') {
         const userId = verifyToken(msg.token);
         ws.userId = userId;
         clients.set(userId, ws);
       }
     });
   });

   // 새 메시지 발생 시
   function notifyUser(userId, message) {
     const ws = clients.get(userId);
     if (ws) {
       ws.send(JSON.stringify({type: 'new_message', content: message}));
     }
   }
   ```

3. **통합 이슈 해결:**
   - **재연결 로직:** WebSocket 끊김 시 자동 재연결
   - **Authentication:** WebSocket 연결 시 Token 전송 및 검증
   - **State Synchronization:** WebSocket 메시지를 React State와 동기화

**Advanced 수준의 증거:**
- 실시간 통신 패턴 (WebSocket) 이해 및 구현
- 재연결, Authentication, State Sync 같은 복잡한 통합 이슈 해결
- Frontend-Backend 역할 분담 설계 (어떤 로직을 어디에 둘지)

---

### 예시 3: Micro Frontend + API Gateway (Expert 수준)
**맥락:** 대규모 조직, 여러 팀의 Frontend를 하나로 통합

**구체적 시나리오:**
Payments 팀, Social 팀, Product 팀이 각각 Frontend를 개발하고, 이를 하나의 앱으로 통합합니다.

**End-to-End Architecture:**
```
                    API Gateway
                         |
     +-------------------+-------------------+
     |                   |                   |
Payments Service   Social Service    Product Service
     |                   |                   |
Payments MFE       Social MFE        Product MFE
     |                   |                   |
     +-------------------+-------------------+
                  Main Shell App
```

**통합 전략:**
1. **Module Federation:** 각 팀의 MFE를 런타임에 동적 로딩
2. **API Gateway:** 모든 API 요청을 Gateway로 라우팅 (`/api/payments/*` → Payments Service)
3. **공유 State:** Authentication, User Info 같은 공통 State는 Shell에서 관리
4. **Distributed Tracing:** 전체 Request Flow 추적 (Frontend → Gateway → Service → DB)

**Expert 수준의 증거:**
- Micro Frontend + Microservices 아키텍처 설계
- API Gateway, BFF 패턴 적용
- 전사 API 표준 수립 (모든 팀이 따를 규칙)
- 성능 최적화 (Caching, CDN, N+1 Query 해결)

---

## 📝 Assessment Methods (평가 방법)

### 1. 라이브 코딩 (Intermediate 이상)
**과제:** "Login API를 호출하여 사용자 인증을 구현하세요"
- Frontend에서 POST 요청
- Token 저장 (localStorage)
- Error Handling
- Loading State
- **평가 포인트:** API 호출 구조, Error Handling, State 관리

### 2. 시스템 디자인 (Advanced 이상)
**과제:** "실시간 채팅 앱의 Frontend-Backend 통신 구조를 설계하세요"
- WebSocket vs HTTP Polling 선택 근거
- 재연결 로직
- Message Queue 처리
- **평가 포인트:** 실시간 통신 패턴 이해, 트레이드오프 판단

### 3. 통합 이슈 해결 (All Levels)
**과제:** "CORS 에러가 발생했습니다. 어떻게 해결하시겠습니까?"
- Beginner: "Backend에서 CORS 헤더 추가"
- Intermediate: "Proxy 설정 또는 CORS 헤더, 환경별 차이 이해"
- Advanced: "Preflight Request 이해, Credentials 포함 시 주의사항"
- **평가 포인트:** 통합 이슈 경험, 문제 해결 능력

### 4. 코드 리뷰 (Advanced 이상)
**과제:** "이 Frontend-Backend 연동 코드의 개선점을 찾으세요"
```jsx
// Bad Example
const data = await fetch('/api/users').then(r => r.json());
setUsers(data);
```
- **개선점:** Error Handling 없음, Loading State 없음, Type 안전성 없음
- **평가 포인트:** Best Practice 이해, 경험 기반 개선 제안

---

## 📊 Evaluation Rubric (5점 척도)

### 1점: 미흡
**Description:** End-to-End 통합을 이해하지 못하거나, 기본적인 API 호출도 어려움

**Behavioral Anchor:**
- `fetch()` 사용법을 모름
- API 문서를 보고도 Request Body 구조를 맞추지 못함
- CORS 에러가 무엇인지 모름

**Interview Observation:**
- "API를 어떻게 호출하나요?" 질문에 답변 못 함
- Frontend-Backend 연동 경험 전무

---

### 2점: Beginner (하위)
**Description:** 튜토리얼을 참고하여 매우 단순한 API 호출 가능, 통합 이슈 해결 어려움

**Behavioral Anchor:**
- 튜토리얼을 보고 GET 요청으로 데이터 가져오기
- Swagger 문서를 보고 POST 요청 보내기
- Error Handling 없이 Happy Path만 구현

**Interview Observation:**
- "간단한 사용자 리스트 조회는 해봤습니다"
- CORS, Authentication 같은 통합 이슈는 해결 못 함

---

### 3점: Intermediate
**Description:** API Contract를 이해하고 양쪽에서 구현 가능, 기본적인 통합 이슈 해결

**Behavioral Anchor:**
- Login Flow 전체 구현 (Token 저장, Protected Routes)
- Error Handling, Loading State 적용
- CORS 이슈를 Proxy 또는 헤더 설정으로 해결
- Form Validation을 Frontend + Backend 이중화

**Interview Observation:**
- "Login 기능을 처음부터 끝까지 만들어봤습니다"
- API 실패 시 Retry 로직 구현 경험
- "CORS는 Backend에서 헤더 추가하거나 Proxy 설정으로 해결했습니다"

---

### 4점: Advanced (하위)
**Description:** 복잡한 비즈니스 로직의 Frontend-Backend 역할 분담 설계, 실시간 통신 구현

**Behavioral Anchor:**
- WebSocket으로 실시간 알림 구현 (재연결 로직 포함)
- Optimistic UI Update (API 응답 전 UI 업데이트 → 실패 시 Rollback)
- API Versioning 전략 (v1, v2 동시 지원)
- End-to-End 테스트 작성 (Cypress/Playwright)

**Interview Observation:**
- "실시간 채팅을 WebSocket으로 만들어봤습니다"
- "검색 필터링을 Frontend vs Backend 어디서 할지 성능 기준으로 판단했습니다"
- API Mocking (MSW) 경험

---

### 5점: Expert
**Description:** Micro Frontend + Microservices 아키텍처 설계, 전사 API 표준 수립, 성능 최적화 주도

**Behavioral Anchor:**
- API Gateway, BFF (Backend for Frontend) 패턴 설계 및 구현
- GraphQL, gRPC 같은 대안 기술 평가 및 도입 결정
- 회사 전체 API 네이밍, Error Code, Pagination 표준 수립
- Frontend-Backend 성능 최적화 (N+1 Query, Caching, CDN)
- Distributed Tracing으로 전체 Request Flow 추적

**Interview Observation:**
- "Micro Frontend 아키텍처를 설계하고 3개 팀 통합했습니다"
- "REST 대비 GraphQL의 장단점을 분석하고 도입 결정을 주도했습니다"
- "전사 API 디자인 가이드라인을 작성하고 모든 팀에 적용했습니다"

---

## 🔗 Related Competencies (관련 역량)

### 선행 Competencies (Prerequisites)
이 Competency를 학습하기 전에 필요한 역량:
- **COMP-001 (RESTful API Development):** Backend에서 API를 만드는 기본 이해
- **COMP-003 (React Development):** Frontend에서 UI를 만드는 기본 이해

### 후속 Competencies (Follow-up)
이 Competency를 마스터한 후 학습할 역량:
- **COMP-007 (System Architecture):** 전체 시스템 아키텍처 설계로 확장
- **DevOps (V2 추가 예정):** CI/CD, Docker, Deployment까지 확장

---

## 📚 참고 자료 (References)

### 내부 문서
- **Berry 기술 검토:** Full-stack Base Competencies 최종 결정
- **Full-stack 결정:** [full-stack-base-competencies-final.md](../../02-conceptualization/decisions/full-stack-base-competencies-final.md)
- **Competency 개념:** [competency.md](../../02-conceptualization/concepts/competency.md)

### 외부 표준
- **MDN Web Docs:** [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **CORS:** [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- **JWT:** [JSON Web Tokens](https://jwt.io/)
- **WebSocket:** [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## 👥 검토 의견 (Review Comments)

### Berry (CTO) - ✅ 승인 (2025-11-26)
> "이 정의가 Full-stack의 핵심을 정확히 짚었습니다. End-to-End 통합 능력이 없으면 그냥 'Backend도 하고 Frontend도 하는 사람'일 뿐, 진짜 Full-stack이 아닙니다."

**Action Items:**
- [x] Competency 정의 작성 (Berry 협업)
- [x] Proficiency Levels 4단계 작성
- [x] Evaluation Rubric 5점 척도 작성

---

### Borry (HR) - [검토 대기]
> [Borry 피드백 예정]

**중점 검토 항목:**
- [ ] 비기술자(HR)가 이해 가능한가?
- [ ] 면접에서 실제로 평가 가능한가?
- [ ] JD에 "End-to-End 통합 능력 필요" 문구가 명확한가?

---

## 🎯 다음 단계 (Next Steps)

### 현재 단계
- Draft 상태, Borry 검토 대기 중
- Berry CTO 승인 완료 ✅

### 완료를 위한 필요 작업
- [ ] Borry 검토 및 피드백 반영
- [ ] Full-stack Job Function 문서에 COMP-013 추가
- [ ] V1 Competencies 리스트 업데이트 (12 → 13)
- [ ] 상태를 "Validated"로 변경

### 관련 작업
- [ ] COMP-001, COMP-003과의 구분 명확화 (예시 추가)
- [ ] Full-stack Position 예시에 COMP-013 적용
- [ ] Week 3 Day 3-5: COMP-001, COMP-002, COMP-003 작성 시 Integration과의 차이 명시

---

## 📌 작성 가이드 준수 체크

- [x] 모든 [괄호] 내용 실제 값으로 교체
- [x] 비기술자(Borry) 이해 가능한 언어 사용 (Login, 실시간 알림 예시)
- [x] 구체적 예시 제공 (3개: Login, 실시간 알림, Micro Frontend)
- [x] 4개 Proficiency Levels 포함 (Beginner → Expert)
- [x] 5점 척도 Rubric 포함
- [x] Berry CTO 검토 완료

---

*이 Competency는 Full-stack Engineer의 핵심 차별점을 정의하며, V1 Top 13 Competencies의 13번째 역량입니다.*
