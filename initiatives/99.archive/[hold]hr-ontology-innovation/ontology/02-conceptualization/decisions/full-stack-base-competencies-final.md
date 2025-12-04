# Full-stack Engineer Base Competencies 최종 결정

**결정일:** 2025-11-26
**의사결정자:** Terry (PM) + Berry (CTO)
**검토자:** Borry (HR)
**상태:** ✅ 승인 - COMP-013 추가, V1에 포함

---

## 🎯 결정 요약

**결정:** Full-stack Engineer를 V1에 포함하며, COMP-013 (End-to-End System Integration) Competency를 추가한다.

**접근 방법:** Hybrid Approach (Option B + Option C 조합)
- Base Competencies는 Full-stack의 "최소 공통 기대치" 정의
- Backend/Frontend 각 Beginner 수준 + End-to-End Integration Intermediate
- Position별로 Backend/Frontend 비중 조정 가능

**추가 작업:**
- COMP-013 정의 및 Rubric 작성 (5-7시간, Week 3 Day 1-2)
- V1 Top 12 → 13 Competencies로 확장

---

## 📊 Berry의 Option 평가 요약

| Option | 현실성 | 구현 가능성 | 확장성 | Berry 추천 |
|--------|--------|-------------|--------|------------|
| A: Backend + Frontend 조합 | 2/5 | 5/5 | 3/5 | ❌ 너무 이상적 |
| B: Full-stack 전용 + 낮은 숙련도 | 4/5 | 3/5 | 5/5 | ✅ 가장 정확 |
| C: 유연한 조합 | 5/5 | 4/5 | 5/5 | ✅ 가장 실무적 |
| **Hybrid (B+C)** | **5/5** | **4/5** | **5/5** | **✅ 최종 추천** |

---

## ✅ Full-stack Engineer 정의 (최종)

### 기본 정보
```json
{
  "jobFunctionId": "JFN-FULLSTACK-ENG",
  "name": "Full-stack Engineer",
  "nameKo": "풀스택 엔지니어",
  "description": "프론트엔드와 백엔드를 모두 개발하며, 전체 시스템의 End-to-End 흐름을 이해하고 통합하는 엔지니어",
  "jobFamily": "Engineering",
  "onetCode": "15-1252.00"
}
```

### Base Competencies (7개)

```json
{
  "baseCompetencies": [
    {
      "competencyId": "COMP-001",
      "name": "RESTful API Development",
      "minProficiency": "Beginner",
      "justification": "Backend 기본 역량. Full-stack은 API 설계 및 구현의 기본 이해 필요 (Advanced 불요)"
    },
    {
      "competencyId": "COMP-002",
      "name": "Database Design",
      "minProficiency": "Beginner",
      "justification": "Backend 기본 역량. 데이터 모델 이해 필요하지만 최적화는 Position Level 요구사항"
    },
    {
      "competencyId": "COMP-003",
      "name": "React Development",
      "minProficiency": "Beginner",
      "justification": "Frontend 기본 역량. 컴포넌트 구현 가능해야 하지만 고급 패턴은 Position Level"
    },
    {
      "competencyId": "COMP-004",
      "name": "State Management",
      "minProficiency": "Beginner",
      "justification": "Frontend 기본 역량. Redux/Context 기본 사용법 이해"
    },
    {
      "competencyId": "COMP-013",
      "name": "End-to-End System Integration",
      "minProficiency": "Intermediate",
      "justification": "Full-stack의 핵심 차별점. Frontend-Backend 연동, API Contract 설계, 전체 Request Flow 이해가 Full-stack의 진짜 가치"
    },
    {
      "competencyId": "COMP-006",
      "name": "Git & Version Control",
      "minProficiency": "Intermediate",
      "justification": "모든 엔지니어 공통 역량"
    },
    {
      "competencyId": "COMP-010",
      "name": "Communication",
      "minProficiency": "Intermediate",
      "justification": "Full-stack은 PM, Designer, Backend, Frontend와 모두 소통하므로 소통 역량 더 중요"
    }
  ]
}
```

### 동의어
- Full-stack Developer
- Fullstack Engineer
- 풀스택 개발자
- 전체 스택 엔지니어

---

## 🆕 COMP-013: End-to-End System Integration

### 정의
**한 문장:** 클라이언트-서버 통신, API 설계 및 연동, 데이터 흐름을 이해하여 프론트엔드와 백엔드를 통합하는 능력

**상세 설명:**
단순히 Frontend와 Backend를 각각 개발하는 것이 아니라, 전체 시스템이 어떻게 동작하는지 이해하고 연결하는 역량입니다. API Contract를 양쪽 관점에서 설계하고, Browser → Server → Database의 전체 Request Flow를 이해하며, CORS, Authentication, State Synchronization 같은 통합 이슈를 독립적으로 해결할 수 있습니다.

### Behavioral Indicators (5-8개)
1. API Contract를 Frontend와 Backend 관점에서 모두 설계 가능
2. CORS, Authentication Flow, State Synchronization 같은 통합 이슈를 독립적으로 해결
3. Browser → Server → Database의 전체 Request Flow를 설명 가능
4. Frontend 변경이 Backend에 미치는 영향(또는 반대)을 예측하고 대응
5. RESTful API 호출 시 HTTP Status Code, Error Handling, Loading State를 Frontend에서 적절히 처리
6. WebSocket, Server-Sent Events 같은 실시간 통신 패턴 이해 및 구현
7. API Mocking, Integration Testing 같은 End-to-End 테스트 전략 수립

### Category
TECHNICAL

### Proficiency Levels

**Beginner:**
- 기본적인 API 호출 (fetch, axios)을 Frontend에서 구현 가능
- Backend에서 제공한 API 문서를 보고 데이터 연동 가능
- 간단한 CRUD 기능의 Frontend-Backend 연결 이해

**Intermediate:**
- API Contract를 설계하고, Frontend/Backend 양쪽에서 구현 가능
- Authentication Flow (Login → Token → Protected Routes) 전체 흐름 구현
- Error Handling, Loading State, Retry Logic 같은 통합 패턴 적용
- CORS, Proxy 설정 같은 기본 통합 이슈 해결

**Advanced:**
- 복잡한 비즈니스 로직의 Frontend-Backend 역할 분담 설계
- WebSocket, SSE 같은 실시간 통신 패턴 구현
- API Versioning, Backward Compatibility 고려
- End-to-End 테스트 전략 수립 (Mocking, Integration Test)

**Expert:**
- Micro Frontend + Microservices 아키텍처에서 API Gateway, BFF 패턴 설계
- GraphQL, gRPC 같은 대안 통신 프로토콜 평가 및 도입
- 전사 API 설계 가이드라인 수립
- Frontend-Backend 성능 최적화 (N+1 Query, Caching, CDN)

---

## 📊 Backend vs Frontend vs Full-stack 비교

### Backend Engineer Base Competencies
- COMP-001: RESTful API (Intermediate)
- COMP-002: Database Design (Beginner)
- COMP-006: Git (Intermediate)
- COMP-010: Communication (Intermediate)
- **Total: 4개**

### Frontend Engineer Base Competencies
- COMP-003: React (Intermediate)
- COMP-004: State Management (Beginner)
- COMP-006: Git (Intermediate)
- COMP-010: Communication (Intermediate)
- **Total: 4개**

### Full-stack Engineer Base Competencies
- COMP-001: RESTful API (**Beginner** ← Backend보다 낮음)
- COMP-002: Database Design (Beginner)
- COMP-003: React (**Beginner** ← Frontend보다 낮음)
- COMP-004: State Management (Beginner)
- **COMP-013: End-to-End Integration (Intermediate)** ← Full-stack 고유
- COMP-006: Git (Intermediate)
- COMP-010: Communication (Intermediate)
- **Total: 7개**

**핵심 차이:**
- Full-stack은 Backend/Frontend 각각 Beginner 수준 (전문가보다 낮음)
- 대신 End-to-End Integration Intermediate 필수 (고유 역량)
- Backend/Frontend 전문가는 각 4개, Full-stack은 7개 (범위는 넓지만 깊이는 낮음)

---

## 🚀 Junior, Mid, Senior Full-stack 확장 예시

### Junior Full-stack Engineer
```json
{
  "positionId": "POS-JUNIOR-FS-PRODUCT",
  "requiredCompetencies": [
    {"competencyId": "COMP-001", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-002", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-003", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-004", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-013", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-006", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-010", "requiredProficiency": "Intermediate"}
  ]
}
```
- 특징: 모든 기술 역량 Beginner, 지도 하에 간단한 CRUD Feature 구현

---

### Mid Full-stack Engineer (Backend-heavy)
```json
{
  "positionId": "POS-MID-FS-PAYMENTS",
  "requiredCompetencies": [
    {"competencyId": "COMP-001", "requiredProficiency": "Intermediate"},  // Backend 강화
    {"competencyId": "COMP-002", "requiredProficiency": "Intermediate"},  // Backend 강화
    {"competencyId": "COMP-003", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-004", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-013", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-006", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-010", "requiredProficiency": "Intermediate"}
  ]
}
```
- 특징: Backend Intermediate (결제 시스템 특성), Frontend Beginner, Integration Intermediate

---

### Mid Full-stack Engineer (Frontend-heavy)
```json
{
  "positionId": "POS-MID-FS-SOCIAL",
  "requiredCompetencies": [
    {"competencyId": "COMP-001", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-002", "requiredProficiency": "Beginner"},
    {"competencyId": "COMP-003", "requiredProficiency": "Intermediate"},  // Frontend 강화
    {"competencyId": "COMP-004", "requiredProficiency": "Intermediate"},  // Frontend 강화
    {"competencyId": "COMP-013", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-006", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-010", "requiredProficiency": "Intermediate"}
  ]
}
```
- 특징: Frontend Intermediate (소셜 UI 복잡), Backend Beginner, Integration Intermediate

---

### Senior Full-stack Engineer
```json
{
  "positionId": "POS-SENIOR-FS-PRODUCT",
  "requiredCompetencies": [
    {"competencyId": "COMP-001", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-002", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-003", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-004", "requiredProficiency": "Intermediate"},
    {"competencyId": "COMP-013", "requiredProficiency": "Advanced"},      // Integration 강화
    {"competencyId": "COMP-007", "requiredProficiency": "Intermediate"},  // System Architecture 추가
    {"competencyId": "COMP-006", "requiredProficiency": "Advanced"},
    {"competencyId": "COMP-010", "requiredProficiency": "Advanced"},
    {"competencyId": "COMP-011", "requiredProficiency": "Advanced"}       // Problem Solving 추가
  ]
}
```
- 특징: Backend/Frontend 모두 Intermediate, Integration Advanced, 아키텍처 참여

---

## 📋 V1 Competencies 업데이트

### Before (V1 Top 12)
Technical 7개, Soft Skill 3개, PM 2개 = **12개**

### After (V1 Top 13)
Technical 8개 (COMP-013 추가), Soft Skill 3개, PM 2개 = **13개**

**추가된 Competency:**
- COMP-013: End-to-End System Integration (Full-stack 전용)

**Week 3 작업 순서 조정:**
- Week 3 Day 1-2: COMP-013 정의 + Rubric 작성 (5-7시간)
- Week 3 Day 3-5: Priority 1-6 Competencies (기존 계획 유지)

---

## 🎯 Berry의 핵심 인사이트

### Full-stack의 진짜 가치
> "Full-stack Engineer는 Backend와 Frontend를 모두 Advanced 수준으로 하는 사람이 아닙니다. 진짜 가치는 **End-to-End 시스템을 이해하고 연결하는 능력**입니다. 한 사람이 Feature를 끝까지 구현할 수 있다는 것 - 이것이 스타트업에서 Full-stack을 채용하는 이유입니다."

### T-shaped 인재 모델
- Horizontal (폭): Backend Beginner + Frontend Beginner (넓지만 얕음)
- Vertical (깊이): End-to-End Integration Intermediate (한 가지는 깊게)
- Position Level에서 T의 Vertical을 조정 (Backend-heavy, Frontend-heavy)

### 스타트업 vs 대기업
- **Base Competencies는 공통**
- **Position에서 차별화:**
  - 스타트업: Integration Advanced, DevOps 추가 (혼자 배포까지)
  - 대기업: Integration Intermediate, DevOps 불요 (팀 분업)

---

## ✅ 승인 및 다음 단계

### 승인 상태
- **Terry (PM):** ✅ 승인 (2025-11-26)
- **Berry (CTO):** ✅ 승인 (기술 검토 완료)
- **Borry (HR):** ⏳ 통보 예정

### 즉시 실행 (Week 3 Day 1-2)
- [ ] COMP-013 정의 작성 (3시간)
- [ ] COMP-013 Rubric 작성 (2-3시간)
- [ ] Full-stack Job Function 문서 업데이트 (1시간)
- [ ] V1 Competencies 리스트 업데이트 (12 → 13)

### Week 3 Day 3-5
- [ ] 기존 계획대로 Priority 1-6 Competencies 작성
- [ ] COMP-013은 Week 4로 이동 (또는 간소화된 버전으로 Week 3 포함)

---

## 📎 관련 문서

- **Berry 기술 검토:** (에이전트 출력)
- **Full-stack 추가 결정:** [full-stack-engineer-decision.md](full-stack-engineer-decision.md)
- **V1 Competencies:** [v1-competencies-list.md](../../03-implementation/v1-competencies-list.md)
- **Job Function 개념:** [job-function.md](../concepts/job-function.md)

---

*이 결정은 Full-stack Engineer를 채용 시장 현실에 맞게 정의하고, V1 파일럿의 완전성을 확보합니다.*
