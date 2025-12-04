# COMP-001: RESTful API Development

**작성일:** 2025-11-26
**작성자:** Terry (PM)
**검토자:** Berry (CTO), Borry (HR)
**상태:** Draft
**카테고리:** TECHNICAL
**우선순위:** Priority 1 (V1 핵심)

---

## 📋 기본 정보

### Competency ID
`COMP-001`

### Competency Name
**영어:** RESTful API Development
**한국어:** RESTful API 개발

### 한 문장 정의
HTTP 프로토콜과 REST 아키텍처 스타일을 기반으로 확장 가능하고 유지보수 가능한 웹 API를 설계하고 구현하는 능력

### 상세 설명
단순히 HTTP 엔드포인트를 만드는 것이 아니라, REST 제약 조건(stateless, resource-based, uniform interface)을 이해하고 적용하여 직관적이고 일관성 있는 API를 설계하는 역량입니다. 적절한 HTTP 메서드와 상태 코드를 사용하고, 리소스 모델링, 인증/인가, 에러 처리, 버전 관리, API 문서화까지 End-to-End로 수행할 수 있습니다.

---

## 🎯 Behavioral Indicators (행동적 지표)

이 역량을 가진 사람은 다음과 같은 행동을 보입니다:

1. **명확한 리소스 모델링:** URL을 명사 중심으로 설계하고, 계층 구조를 직관적으로 표현 (예: `/users/{userId}/orders/{orderId}`)
2. **적절한 HTTP 메서드 사용:** CRUD 작업에 GET, POST, PUT, PATCH, DELETE를 정확히 매핑
3. **정확한 상태 코드 반환:** 성공(2xx), 클라이언트 에러(4xx), 서버 에러(5xx)를 상황에 맞게 사용
4. **일관된 에러 응답 포맷:** 에러 발생 시 구조화된 에러 메시지(errorCode, message, details) 제공
5. **API 문서 작성:** Swagger/OpenAPI 같은 표준 도구로 API 스펙 문서화
6. **인증/인가 구현:** JWT, OAuth 같은 인증 메커니즘을 API에 통합
7. **페이지네이션/필터링 설계:** 대량 데이터 조회 시 offset/limit, cursor-based pagination 구현
8. **버전 관리 전략:** URL 버전(`/v1/users`) 또는 헤더 버전으로 API 하위 호환성 유지

---

## 📊 Proficiency Levels (숙련도 레벨)

### Beginner (초급)

**행동적 설명:**
간단한 CRUD API를 튜토리얼이나 팀의 기존 코드 패턴을 참고하여 구현할 수 있습니다. RESTful 원칙의 기본 개념(리소스, HTTP 메서드)을 이해하지만, 복잡한 비즈니스 로직이나 보안, 성능 최적화는 시니어의 가이드가 필요합니다.

**구체적 예시:**
- 기존 코드 패턴을 따라 `/users` GET, POST 엔드포인트 추가
- 데이터베이스에서 조회한 결과를 JSON으로 반환
- 간단한 validation (필수 필드 체크)

**코드 예시 (Node.js + Express):**
```javascript
// Beginner: 기본적인 CRUD 구현
app.get('/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  res.status(201).json(newUser);
});
```

**한계:**
- 에러 처리가 일관되지 않음 (어떤 곳은 문자열, 어떤 곳은 객체)
- 페이지네이션 없이 전체 데이터 조회 (성능 문제)
- 인증/인가 없음
- API 문서 없음

---

### Intermediate (중급) ⭐ Backend Engineer Base Competency

**행동적 설명:**
RESTful API의 모범 사례를 이해하고, 독립적으로 비즈니스 로직을 포함한 API를 설계 및 구현할 수 있습니다. 인증/인가, 에러 처리, 페이지네이션 같은 실무 패턴을 적용하고, Swagger로 API 문서를 작성할 수 있습니다. 다만, 복잡한 아키텍처(마이크로서비스 간 통신, API Gateway) 설계는 시니어의 검토가 필요합니다.

**구체적 예시:**
- JWT 기반 인증 미들웨어 구현
- 일관된 에러 응답 포맷 (errorCode, message, details)
- offset/limit 페이지네이션 구현
- Swagger 문서 자동 생성
- HTTP 상태 코드 정확히 사용 (200, 201, 400, 401, 403, 404, 500)

**코드 예시 (Node.js + Express):**
```javascript
// Intermediate: 인증, 에러 핸들링, 페이지네이션 포함

// 인증 미들웨어
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      errorCode: 'UNAUTHORIZED',
      message: '인증 토큰이 필요합니다',
      details: null
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      errorCode: 'INVALID_TOKEN',
      message: '유효하지 않은 토큰입니다',
      details: null
    });
  }
};

// 페이지네이션 포함 사용자 목록 조회
app.get('/users', authenticate, async (req, res) => {
  try {
    const { offset = 0, limit = 20 } = req.query;
    const users = await db.query(
      'SELECT * FROM users LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );
    const total = await db.query('SELECT COUNT(*) as count FROM users');

    res.json({
      data: users,
      pagination: {
        offset: parseInt(offset),
        limit: parseInt(limit),
        total: total[0].count
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      errorCode: 'INTERNAL_ERROR',
      message: '사용자 목록을 조회하는 중 오류가 발생했습니다',
      details: null
    });
  }
});

// 사용자 생성 (validation + 중복 체크)
app.post('/users', authenticate, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        errorCode: 'VALIDATION_ERROR',
        message: '필수 필드가 누락되었습니다',
        details: { missing: ['name', 'email'].filter(f => !req.body[f]) }
      });
    }

    // 이메일 중복 체크
    const existing = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({
        errorCode: 'DUPLICATE_EMAIL',
        message: '이미 존재하는 이메일입니다',
        details: { email }
      });
    }

    const newUser = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      errorCode: 'INTERNAL_ERROR',
      message: '사용자 생성 중 오류가 발생했습니다',
      details: null
    });
  }
});
```

**Swagger 문서 예시:**
```yaml
/users:
  get:
    summary: 사용자 목록 조회
    security:
      - bearerAuth: []
    parameters:
      - name: offset
        in: query
        schema:
          type: integer
          default: 0
      - name: limit
        in: query
        schema:
          type: integer
          default: 20
    responses:
      200:
        description: 성공
        content:
          application/json:
            schema:
              type: object
              properties:
                data:
                  type: array
                  items:
                    $ref: '#/components/schemas/User'
                pagination:
                  type: object
                  properties:
                    offset: { type: integer }
                    limit: { type: integer }
                    total: { type: integer }
      401:
        description: 인증 실패
```

---

### Advanced (고급)

**행동적 설명:**
복잡한 비즈니스 요구사항을 RESTful 설계로 구현하고, API의 성능, 보안, 확장성을 고려한 아키텍처 결정을 내릴 수 있습니다. API 버전 관리, idempotency, rate limiting, HATEOAS 같은 고급 패턴을 적용하고, 주니어 개발자를 멘토링할 수 있습니다.

**구체적 예시:**
- Idempotency Key를 이용한 중복 요청 방지 (결제 API)
- Rate Limiting으로 API 남용 방지
- HATEOAS로 API 탐색 가능성 제공
- API Versioning 전략 수립 (/v1, /v2)
- GraphQL vs REST 트레이드오프 평가
- API Gateway 설계 (마이크로서비스 환경)

**코드 예시 (결제 API with Idempotency):**
```javascript
// Advanced: Idempotency Key를 이용한 중복 결제 방지

const idempotencyCache = new Map(); // 실제론 Redis 사용

app.post('/payments', authenticate, async (req, res) => {
  try {
    const idempotencyKey = req.headers['idempotency-key'];
    if (!idempotencyKey) {
      return res.status(400).json({
        errorCode: 'MISSING_IDEMPOTENCY_KEY',
        message: '결제 요청에는 Idempotency-Key 헤더가 필요합니다',
        details: null
      });
    }

    // 중복 요청 체크 (네트워크 재시도 대응)
    const cachedResponse = idempotencyCache.get(idempotencyKey);
    if (cachedResponse) {
      console.log('Duplicate payment request detected, returning cached response');
      return res.status(cachedResponse.status).json(cachedResponse.data);
    }

    const { amount, currency, paymentMethodId } = req.body;

    // 실제 결제 처리
    const payment = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true
    });

    const response = {
      status: 201,
      data: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        createdAt: new Date().toISOString()
      }
    };

    // 응답 캐싱 (24시간)
    idempotencyCache.set(idempotencyKey, response);
    setTimeout(() => idempotencyCache.delete(idempotencyKey), 24 * 60 * 60 * 1000);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({
      errorCode: 'PAYMENT_FAILED',
      message: '결제 처리 중 오류가 발생했습니다',
      details: { reason: error.message }
    });
  }
});
```

**Rate Limiting 예시:**
```javascript
// Advanced: Rate Limiting (IP당 분당 100회)
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1분
  max: 100, // IP당 최대 100회
  standardHeaders: true, // RateLimit-* 헤더 반환
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      errorCode: 'RATE_LIMIT_EXCEEDED',
      message: '요청 한도를 초과했습니다. 1분 후 다시 시도해주세요',
      details: null
    });
  }
});

app.use('/api/', apiLimiter);
```

---

### Expert (전문가)

**행동적 설명:**
조직 전체의 API 설계 가이드라인을 수립하고, API-first 개발 문화를 정착시킬 수 있습니다. REST 외에 GraphQL, gRPC 같은 대안 프로토콜을 평가하고 도입하며, API Gateway, BFF(Backend for Frontend) 패턴 같은 엔터프라이즈 아키텍처를 설계합니다. 외부 파트너에게 제공하는 Public API의 보안, 계약, SLA를 관리합니다.

**구체적 예시:**
- 전사 API Design Guidelines 작성 및 리뷰 프로세스 구축
- GraphQL Federation으로 마이크로서비스 통합
- API Gateway에서 인증, 로깅, 모니터링 중앙화
- Public API Partner Program 운영 (API Key, Rate Limit Tier)
- API Breaking Change 관리 (Deprecation Policy, Sunset 헤더)
- API 성능 모니터링 대시보드 (P95 latency, error rate)

**아키텍처 예시 (API Gateway + BFF):**
```
┌─────────────┐
│ Mobile App  │──┐
└─────────────┘  │
                 │    ┌──────────────┐      ┌─────────────────┐
┌─────────────┐  ├───▶│ API Gateway  │─────▶│ Auth Service    │
│ Web App     │──┤    │ (Kong/Nginx) │      └─────────────────┘
└─────────────┘  │    └──────────────┘
                 │           │
┌─────────────┐  │           ├──────────────▶┌─────────────────┐
│ Partner API │──┘           │               │ User Service    │
└─────────────┘              │               └─────────────────┘
                             │
                             ├──────────────▶┌─────────────────┐
                             │               │ Payment Service │
                             │               └─────────────────┘
                             │
                             └──────────────▶┌─────────────────┐
                                             │ Order Service   │
                                             └─────────────────┘
```

**API Design Guidelines 예시:**
```markdown
# API Design Guidelines v1.0

## 1. 리소스 네이밍
- 복수형 명사 사용: `/users` (O), `/user` (X)
- 계층 구조: `/users/{userId}/orders/{orderId}`
- kebab-case: `/user-profiles` (O), `/userProfiles` (X)

## 2. HTTP 메서드
- GET: 조회 (idempotent)
- POST: 생성 (non-idempotent)
- PUT: 전체 수정 (idempotent)
- PATCH: 부분 수정 (idempotent)
- DELETE: 삭제 (idempotent)

## 3. 상태 코드
- 200: 성공 (GET, PUT, PATCH, DELETE)
- 201: 생성 성공 (POST)
- 204: 성공 (응답 바디 없음)
- 400: 클라이언트 에러 (validation)
- 401: 인증 실패
- 403: 권한 부족
- 404: 리소스 없음
- 409: 충돌 (중복 생성)
- 429: Rate Limit 초과
- 500: 서버 에러

## 4. 에러 응답 포맷
{
  "errorCode": "VALIDATION_ERROR",
  "message": "사용자 친화적 메시지",
  "details": { "field": "email", "reason": "invalid format" }
}

## 5. 페이지네이션
- offset/limit: `/users?offset=0&limit=20`
- cursor-based: `/users?cursor=abc123&limit=20`

## 6. 버전 관리
- URL 버전: `/v1/users`, `/v2/users`
- Breaking Change 시에만 메이저 버전 증가
```

---

## 🎯 Real-World Examples (실무 예시)

### Example 1: E-commerce 주문 API (Intermediate)

**상황:**
온라인 쇼핑몰에서 사용자가 주문을 생성하고 조회하는 API를 구현해야 합니다.

**요구사항:**
- 인증된 사용자만 주문 가능
- 재고 확인 및 차감
- 주문 생성 후 결제 서비스 호출
- 주문 내역 조회 (페이지네이션)

**API 설계:**
```
POST   /v1/orders          # 주문 생성
GET    /v1/orders          # 내 주문 목록 (페이지네이션)
GET    /v1/orders/{id}     # 주문 상세 조회
PATCH  /v1/orders/{id}     # 주문 상태 변경 (배송지 수정 등)
DELETE /v1/orders/{id}     # 주문 취소
```

**구현 예시 (Intermediate):**
```javascript
app.post('/v1/orders', authenticate, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        errorCode: 'EMPTY_CART',
        message: '주문할 상품이 없습니다',
        details: null
      });
    }

    // 재고 확인
    for (const item of items) {
      const stock = await db.query('SELECT stock FROM products WHERE id = ?', [item.productId]);
      if (stock[0].stock < item.quantity) {
        return res.status(409).json({
          errorCode: 'INSUFFICIENT_STOCK',
          message: '재고가 부족합니다',
          details: { productId: item.productId, available: stock[0].stock }
        });
      }
    }

    // 주문 생성 (트랜잭션)
    const orderId = await db.transaction(async (trx) => {
      const order = await trx.query('INSERT INTO orders (user_id, status, total_amount) VALUES (?, ?, ?)',
        [req.user.id, 'pending', calculateTotal(items)]);

      for (const item of items) {
        await trx.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [order.id, item.productId, item.quantity, item.price]);
        await trx.query('UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.productId]);
      }

      return order.id;
    });

    // 비동기 결제 처리 (메시지 큐)
    await messageQueue.publish('payment.process', { orderId, userId: req.user.id });

    res.status(201).json({
      data: {
        orderId,
        status: 'pending',
        message: '주문이 생성되었습니다. 결제를 진행해주세요'
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      errorCode: 'ORDER_CREATION_FAILED',
      message: '주문 생성 중 오류가 발생했습니다',
      details: null
    });
  }
});
```

---

### Example 2: 외부 파트너 Public API (Advanced)

**상황:**
배송 추적 서비스를 외부 물류 파트너에게 Public API로 제공해야 합니다.

**요구사항:**
- API Key 인증
- Rate Limiting (파트너별 Tier: Free 100회/분, Pro 1000회/분)
- Webhook으로 배송 상태 변경 알림
- API 사용량 모니터링 및 과금

**API 설계 (Advanced):**
```
POST   /v1/shipments           # 배송 생성
GET    /v1/shipments/{id}      # 배송 추적
PATCH  /v1/shipments/{id}      # 배송 상태 업데이트
POST   /v1/webhooks            # Webhook 등록
GET    /v1/usage               # API 사용량 조회
```

**구현 예시 (Advanced):**
```javascript
// API Key 인증 미들웨어
const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({
      errorCode: 'MISSING_API_KEY',
      message: 'X-API-Key 헤더가 필요합니다',
      details: null
    });
  }

  const partner = await db.query('SELECT * FROM partners WHERE api_key = ?', [apiKey]);
  if (!partner.length) {
    return res.status(401).json({
      errorCode: 'INVALID_API_KEY',
      message: '유효하지 않은 API Key입니다',
      details: null
    });
  }

  req.partner = partner[0];
  next();
};

// 파트너별 Rate Limiting
const partnerRateLimiter = async (req, res, next) => {
  const limit = req.partner.tier === 'pro' ? 1000 : 100;
  const key = `ratelimit:${req.partner.id}:${Math.floor(Date.now() / 60000)}`;

  const current = await redis.incr(key);
  await redis.expire(key, 60);

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - current));

  if (current > limit) {
    return res.status(429).json({
      errorCode: 'RATE_LIMIT_EXCEEDED',
      message: `Rate limit exceeded. Your tier allows ${limit} requests per minute`,
      details: { tier: req.partner.tier, limit }
    });
  }

  next();
};

// 배송 추적 API
app.get('/v1/shipments/:id', authenticateApiKey, partnerRateLimiter, async (req, res) => {
  try {
    const shipment = await db.query('SELECT * FROM shipments WHERE id = ? AND partner_id = ?',
      [req.params.id, req.partner.id]);

    if (!shipment.length) {
      return res.status(404).json({
        errorCode: 'SHIPMENT_NOT_FOUND',
        message: '배송 정보를 찾을 수 없습니다',
        details: null
      });
    }

    // API 사용량 로깅 (과금용)
    await db.query('INSERT INTO api_usage_logs (partner_id, endpoint, timestamp) VALUES (?, ?, ?)',
      [req.partner.id, req.path, new Date()]);

    res.json({
      data: {
        id: shipment[0].id,
        status: shipment[0].status,
        trackingNumber: shipment[0].tracking_number,
        estimatedDelivery: shipment[0].estimated_delivery,
        currentLocation: shipment[0].current_location
      }
    });
  } catch (error) {
    console.error('Shipment tracking error:', error);
    res.status(500).json({
      errorCode: 'TRACKING_ERROR',
      message: '배송 추적 중 오류가 발생했습니다',
      details: null
    });
  }
});

// Webhook 발송 (배송 상태 변경 시)
async function notifyWebhook(partnerId, shipmentId, event) {
  const webhooks = await db.query('SELECT * FROM webhooks WHERE partner_id = ? AND event = ?',
    [partnerId, event]);

  for (const webhook of webhooks) {
    try {
      await axios.post(webhook.url, {
        event,
        shipmentId,
        timestamp: new Date().toISOString()
      }, {
        headers: { 'X-Webhook-Signature': generateHmacSignature(webhook.secret, { event, shipmentId }) }
      });
    } catch (error) {
      console.error('Webhook delivery failed:', webhook.url, error);
      // Retry 로직 (exponential backoff)
    }
  }
}
```

---

### Example 3: GraphQL로 전환 고려 (Expert)

**상황:**
모바일 앱에서 홈 화면 로딩 시 너무 많은 REST API 호출이 발생하여 성능 문제가 발생합니다.

**문제점:**
```
GET /v1/users/me             # 사용자 정보
GET /v1/users/me/orders      # 주문 목록
GET /v1/recommendations      # 추천 상품
GET /v1/banners              # 배너
```
→ 4개 API 호출 = 4 RTT (Round Trip Time), 모바일 네트워크에서 느림

**Expert의 판단:**
GraphQL로 전환하여 1개 요청으로 필요한 데이터만 가져오도록 개선

**GraphQL 스키마:**
```graphql
type Query {
  me: User
  recommendations: [Product]
  banners: [Banner]
}

type User {
  id: ID!
  name: String!
  email: String!
  recentOrders(limit: Int = 5): [Order]
}

type Order {
  id: ID!
  status: String!
  totalAmount: Float!
  items: [OrderItem]
}
```

**클라이언트 요청 (1 RTT):**
```graphql
query HomeScreen {
  me {
    id
    name
    recentOrders(limit: 3) {
      id
      status
      totalAmount
    }
  }
  recommendations {
    id
    name
    price
    imageUrl
  }
  banners {
    id
    imageUrl
    linkUrl
  }
}
```

**Expert의 트레이드오프 평가:**
| 기준 | REST | GraphQL |
|------|------|---------|
| 학습 곡선 | 낮음 | 높음 (팀 교육 필요) |
| 캐싱 | 쉬움 (HTTP 캐시) | 복잡 (query hash 필요) |
| 성능 (모바일) | 4 RTT | 1 RTT ⭐ |
| Over-fetching | 많음 | 없음 ⭐ |
| 도구 성숙도 | 매우 높음 | 높음 |
| 팀 숙련도 | 높음 | 낮음 (학습 필요) |

**결정:** 모바일 앱용 BFF(Backend for Frontend)에만 GraphQL 도입, 나머지는 REST 유지

---

## 📏 Evaluation Rubric (평가 루브릭)

### 5점 척도

| 점수 | Proficiency 매핑 | 평가 기준 | 행동적 앵커 |
|------|------------------|----------|-------------|
| **1점** | N/A | RESTful API 개념을 이해하지 못함 | - HTTP 메서드(GET, POST)를 구분하지 못함<br>- URL을 동사로 설계 (예: `/getUser`, `/createOrder`)<br>- 모든 응답이 200 OK (에러도 200 반환)<br>- JSON 구조가 일관되지 않음 |
| **2점** | Beginner | 튜토리얼 참고하여 간단한 CRUD API 작성 가능 | - 기존 코드 패턴을 복사하여 새 엔드포인트 추가<br>- GET, POST는 사용하지만 PUT, PATCH, DELETE는 생소<br>- 에러 처리가 일관되지 않음 (때로 문자열, 때로 객체)<br>- 인증/페이지네이션 없이 전체 데이터 조회 |
| **3점** | **Intermediate** | 비즈니스 로직 포함 API를 독립적으로 설계 및 구현 | - JWT 인증 미들웨어 구현<br>- 일관된 에러 응답 포맷 (errorCode, message, details)<br>- offset/limit 페이지네이션 구현<br>- HTTP 상태 코드 정확히 사용 (200, 201, 400, 401, 404, 500)<br>- Swagger 문서 작성 |
| **4점** | Advanced | 복잡한 요구사항을 RESTful하게 설계, 성능/보안 고려 | - Idempotency Key로 중복 요청 방지 (결제 API)<br>- Rate Limiting 구현<br>- API Versioning 전략 수립 (/v1, /v2)<br>- HATEOAS 또는 Cursor-based Pagination 적용<br>- 주니어 개발자 코드 리뷰 및 멘토링 |
| **5점** | Expert | 조직의 API 표준 수립, GraphQL/gRPC 같은 대안 평가 | - 전사 API Design Guidelines 작성<br>- API Gateway + BFF 아키텍처 설계<br>- Public API Partner Program 운영 (API Key, Tier, SLA)<br>- GraphQL vs REST 트레이드오프 평가 및 도입 결정<br>- API Breaking Change 관리 (Deprecation, Sunset) |

---

## 🧪 Assessment Methods (평가 방법)

### 1. Live Coding (60분)
**과제:**
간단한 Todo API를 구현하세요.

**요구사항:**
- `GET /todos` - 전체 할 일 목록 (페이지네이션)
- `POST /todos` - 새 할 일 생성
- `PATCH /todos/{id}` - 할 일 상태 변경 (완료/미완료)
- `DELETE /todos/{id}` - 할 일 삭제
- JWT 인증 필수
- 일관된 에러 처리

**평가 기준:**
- **2점:** GET, POST만 구현, 인증/에러 처리 없음
- **3점:** 모든 엔드포인트 구현, JWT 인증, 일관된 에러 응답, 페이지네이션
- **4점:** 위 + Swagger 문서, Rate Limiting, Idempotency

---

### 2. System Design (45분)
**과제:**
대규모 이커머스 플랫폼의 주문 API를 설계하세요. 하루 100만 주문을 처리해야 합니다.

**요구사항:**
- API 엔드포인트 설계
- 인증/인가 전략
- Rate Limiting
- 결제 서비스 연동 (외부 API)
- 재고 동시성 문제 해결

**평가 기준:**
- **3점:** 기본적인 RESTful 엔드포인트 설계, 인증 방법 설명
- **4점:** Idempotency, 트랜잭션 처리, 재고 lock 메커니즘, API Versioning
- **5점:** API Gateway, 마이크로서비스 분리, 이벤트 기반 아키텍처, SLA 정의

---

### 3. Code Review (30분)
**과제:**
주니어 개발자가 작성한 아래 코드를 리뷰하세요.

```javascript
app.get('/getUsers', (req, res) => {
  db.query('SELECT * FROM users', (err, users) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(users);
    }
  });
});

app.post('/createUser', (req, res) => {
  const name = req.body.name;
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
    if (err) {
      res.send('Error');
    } else {
      res.send('Success');
    }
  });
});
```

**평가 기준:**
- **2점:** "동작하는데 문제 없어 보입니다" (문제를 발견하지 못함)
- **3점:** 5개 이상 문제 지적 (URL 네이밍, 상태 코드, 에러 응답, 페이지네이션, validation)
- **4점:** 위 + 개선 코드 작성, Best Practice 설명
- **5점:** 위 + API 설계 원칙 교육, 팀 표준 문서 공유

**체크리스트:**
- [ ] URL이 동사 (`/getUsers` → `/users`)
- [ ] HTTP 메서드 미사용 (GET, POST만 사용, 실제론 URL에 동사)
- [ ] 상태 코드 없음 (200이 기본)
- [ ] 에러 응답이 문자열 ("Error")
- [ ] 성공 응답이 문자열 ("Success")
- [ ] 페이지네이션 없음 (SELECT *)
- [ ] Validation 없음 (name이 null이면?)
- [ ] SQL Injection 취약 (지금은 괜찮지만, 복잡한 쿼리에서 위험)
- [ ] 인증/인가 없음

---

## 🔗 Related Competencies (관련 역량)

### Prerequisites (선행 역량)
- **HTTP 프로토콜 기본 이해:** Request/Response, Headers, Methods, Status Codes
- **JSON 데이터 포맷:** Serialization/Deserialization
- **데이터베이스 기본:** SQL CRUD 작업

### Related Competencies (연관 역량)
- **COMP-002: Database Design & Optimization** - API는 DB와 밀접하게 연결됨
- **COMP-007: System Architecture** - 마이크로서비스에서 API Gateway, Service Mesh
- **COMP-013: End-to-End System Integration** - Frontend-Backend API 연동
- **COMP-005: Testing & QA** - API Integration Testing, Contract Testing

### Next Level (다음 단계)
- **GraphQL Development** - REST의 Over-fetching 문제 해결
- **gRPC & Protocol Buffers** - 고성능 서비스 간 통신
- **Event-Driven Architecture** - API 외에 메시지 기반 통신

---

## 📚 Learning Resources (학습 자료)

### Beginner → Intermediate
- **책:** "RESTful Web API Design with Node.js" (Fernando Doglio)
- **강의:** "REST API Design, Development & Management" (Udemy)
- **문서:** [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- **도구:** Postman, Swagger Editor

### Intermediate → Advanced
- **책:** "API Design Patterns" (JJ Geewax, Google)
- **문서:** [Stripe API Design Best Practices](https://stripe.com/docs/api)
- **문서:** [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- **도구:** Kong API Gateway, AWS API Gateway

### Advanced → Expert
- **책:** "Building Microservices" (Sam Newman) - API Gateway, Service Mesh
- **논문:** "Roy Fielding's Dissertation on REST" (원본 REST 정의)
- **컨퍼런스:** API World, Nordic APIs Summit
- **도구:** GraphQL Federation, Postman Governance

---

## 📊 Industry Benchmarks (산업 표준)

### O*NET Mapping
- **15-1252.00 Software Developers:** Web Services (REST API는 핵심 스킬)
- **Related Skills:** API Design, HTTP, JSON, Authentication

### SFIA Mapping
- **SFIA Level 3 (Apply):** Intermediate - 독립적으로 API 설계 및 구현
- **SFIA Level 4 (Enable):** Advanced - 복잡한 API 아키텍처 설계
- **SFIA Level 5 (Ensure/Advise):** Expert - 조직 API 표준 수립

### Market Data
- **LinkedIn Skills:** "REST API" - 2M+ 프로필
- **Stack Overflow Survey 2024:** 85%의 백엔드 개발자가 RESTful API 사용
- **Salary Impact:** API 설계 역량은 Senior Backend 연봉에 15-20% 영향

---

## 🎯 Competency Questions (CQ) 매핑

이 Competency는 다음 CQs에 답합니다:

- **CQ-1:** "Backend Engineer에게 필요한 핵심 기술 역량은?" → RESTful API Development (Base Competency)
- **CQ-4:** "Senior Backend Engineer는 Mid와 어떤 차이가 있는가?" → API는 Intermediate, Advanced로 구분
- **CQ-6:** "Full-stack Engineer의 Base Competencies는?" → RESTful API Beginner (Backend/Frontend 모두 낮음)
- **CQ-10:** "특정 Competency를 평가하는 면접 질문은?" → Rubric의 Assessment Methods
- **CQ-13:** "Backend와 Full-stack의 역량 차이는?" → Backend는 Intermediate, Full-stack은 Beginner

---

## 📝 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-26 | Terry | Initial draft - Priority 1 competency for V1 |

---

## 👥 Approval Status

- **Terry (PM):** ✅ Draft 작성 완료
- **Berry (CTO):** ⏳ 기술 검토 대기
- **Borry (HR):** ⏳ 실무 검토 대기

---

**다음 작업:** COMP-002 Database Design & Optimization 작성
