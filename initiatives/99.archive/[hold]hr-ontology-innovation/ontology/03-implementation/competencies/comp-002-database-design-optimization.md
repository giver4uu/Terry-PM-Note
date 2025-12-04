# COMP-002: Database Design & Optimization

**작성일:** 2025-11-26
**작성자:** Terry (PM)
**검토자:** Berry (CTO), Borry (HR)
**상태:** Draft
**카테고리:** TECHNICAL
**우선순위:** Priority 2 (V1 핵심)

---

## 📋 기본 정보

### Competency ID
`COMP-002`

### Competency Name
**영어:** Database Design & Optimization
**한국어:** 데이터베이스 설계 및 최적화

### 한 문장 정의
비즈니스 요구사항을 효율적인 데이터 모델로 변환하고, 쿼리 성능을 최적화하여 확장 가능한 데이터베이스를 설계 및 관리하는 능력

### 상세 설명
단순히 테이블을 만들고 데이터를 저장하는 것이 아니라, 데이터 간의 관계를 이해하고 정규화/비정규화를 적절히 적용하여 데이터 무결성과 성능을 동시에 확보하는 역량입니다. 인덱스 설계, 쿼리 최적화, 트랜잭션 관리, N+1 Query 문제 해결, 데이터베이스 마이그레이션까지 End-to-End로 수행할 수 있습니다. Advanced 단계에서는 Sharding, Replication 같은 분산 데이터베이스 아키텍처를 설계합니다.

---

## 🎯 Behavioral Indicators (행동적 지표)

이 역량을 가진 사람은 다음과 같은 행동을 보입니다:

1. **적절한 정규화:** 제3정규형(3NF)까지 정규화하여 데이터 중복을 제거하고, 읽기 성능이 중요한 경우 의도적으로 비정규화 적용
2. **효과적인 인덱스 설계:** WHERE, JOIN, ORDER BY 절에서 자주 사용되는 컬럼에 인덱스 생성, Covering Index로 쿼리 성능 향상
3. **데이터 타입 최적화:** 적절한 데이터 타입 선택 (INT vs BIGINT, VARCHAR(255) vs TEXT, TIMESTAMP vs DATETIME)
4. **제약 조건 활용:** Primary Key, Foreign Key, UNIQUE, NOT NULL, CHECK로 데이터 무결성 확보
5. **쿼리 성능 분석:** EXPLAIN, EXPLAIN ANALYZE로 실행 계획 분석, Slow Query Log 모니터링
6. **N+1 Query 문제 해결:** ORM의 Lazy Loading 문제 인지, JOIN 또는 Eager Loading으로 해결
7. **트랜잭션 관리:** ACID 속성 이해, Isolation Level 선택 (READ COMMITTED, REPEATABLE READ)
8. **마이그레이션 전략:** Schema 변경 시 Blue-Green Deployment, Zero-Downtime Migration 적용

---

## 📊 Proficiency Levels (숙련도 레벨)

### Beginner (초급) ⭐ Backend/Full-stack Base Competency

**행동적 설명:**
기본적인 관계형 데이터베이스 개념(테이블, 컬럼, Primary Key, Foreign Key)을 이해하고, 간단한 CRUD 쿼리를 작성할 수 있습니다. 기존 스키마를 참고하여 새 테이블을 추가하거나, ORM을 사용하여 데이터를 조회/저장할 수 있습니다. 다만, 인덱스 설계, 쿼리 최적화, 정규화 같은 개념은 시니어의 가이드가 필요합니다.

**구체적 예시:**
- 간단한 테이블 생성 (users, posts)
- Primary Key, Foreign Key 이해
- SELECT, INSERT, UPDATE, DELETE 기본 쿼리
- ORM (Sequelize, Prisma, TypeORM) 사용하여 CRUD
- JOIN은 가능하지만 복잡한 서브쿼리는 어려움

**코드 예시 (PostgreSQL):**
```sql
-- Beginner: 기본적인 테이블 설계

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 기본 쿼리
SELECT * FROM users WHERE email = 'test@example.com';

SELECT posts.*, users.name
FROM posts
JOIN users ON posts.user_id = users.id
WHERE users.id = 1;

INSERT INTO posts (user_id, title, content)
VALUES (1, 'My First Post', 'Hello World');
```

**ORM 예시 (Prisma):**
```javascript
// Beginner: ORM 사용
const user = await prisma.user.findUnique({
  where: { email: 'test@example.com' },
  include: { posts: true }  // N+1 문제 인지 못함
});

const newPost = await prisma.post.create({
  data: {
    title: 'My First Post',
    content: 'Hello World',
    userId: user.id
  }
});
```

**한계:**
- 인덱스가 없어서 WHERE 절이 Full Table Scan
- N+1 Query 문제 발생 (include 사용 시)
- 데이터 타입 선택이 비효율 (모든 VARCHAR가 255)
- 정규화 개념 부족 (중복 데이터 허용)

---

### Intermediate (중급)

**행동적 설명:**
정규화 원칙을 이해하고, 비즈니스 요구사항을 효율적인 데이터 모델로 변환할 수 있습니다. 인덱스를 적절히 설계하고, EXPLAIN으로 쿼리 성능을 분석하며, N+1 Query 문제를 독립적으로 해결할 수 있습니다. 트랜잭션과 Isolation Level을 이해하고, 동시성 문제를 고려한 쿼리를 작성합니다.

**구체적 예시:**
- 제3정규형(3NF) 적용, 필요시 의도적 비정규화
- Composite Index, Covering Index 설계
- EXPLAIN ANALYZE로 쿼리 실행 계획 분석
- N+1 Query를 JOIN 또는 IN 절로 해결
- Optimistic Locking, Pessimistic Locking 구현
- 데이터베이스 마이그레이션 스크립트 작성

**코드 예시 (E-commerce 주문 시스템):**
```sql
-- Intermediate: 정규화된 스키마 설계

-- 사용자 테이블
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 주문 테이블
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 주문 상품 테이블 (Many-to-Many)
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 인덱스 설계
CREATE INDEX idx_users_email ON users(email);  -- 로그인 쿼리 최적화
CREATE INDEX idx_orders_user_id ON orders(user_id);  -- "내 주문 목록" 쿼리 최적화
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);  -- "미처리 주문" 쿼리 최적화 (Composite Index)
CREATE INDEX idx_order_items_order_id ON order_items(order_id);  -- JOIN 최적화

-- N+1 Query 해결 예시
-- Bad (N+1): 각 주문마다 상품 조회
SELECT * FROM orders WHERE user_id = 1;  -- 1개 쿼리
SELECT * FROM order_items WHERE order_id = 101;  -- N개 쿼리
SELECT * FROM order_items WHERE order_id = 102;
-- ...

-- Good: JOIN으로 한 번에 조회
SELECT
  orders.id,
  orders.status,
  orders.total_amount,
  order_items.product_id,
  order_items.quantity,
  order_items.price
FROM orders
LEFT JOIN order_items ON orders.id = order_items.order_id
WHERE orders.user_id = 1
ORDER BY orders.created_at DESC;

-- EXPLAIN ANALYZE로 성능 분석
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 20;

-- 결과:
-- Index Scan using idx_orders_status_created on orders (cost=0.29..8.31 rows=1 width=123) (actual time=0.012..0.015 rows=5 loops=1)
-- Planning Time: 0.093 ms
-- Execution Time: 0.032 ms
```

**트랜잭션 예시 (재고 차감):**
```sql
-- Intermediate: Pessimistic Locking으로 동시성 문제 해결

BEGIN;

-- FOR UPDATE로 해당 행을 잠금 (Pessimistic Lock)
SELECT stock FROM products WHERE id = 123 FOR UPDATE;

-- 재고 확인
IF stock >= 5 THEN
  -- 재고 차감
  UPDATE products SET stock = stock - 5 WHERE id = 123;

  -- 주문 생성
  INSERT INTO order_items (order_id, product_id, quantity, price)
  VALUES (456, 123, 5, 10000);

  COMMIT;
ELSE
  ROLLBACK;
  RAISE EXCEPTION '재고 부족';
END IF;
```

**ORM 예시 (N+1 해결):**
```javascript
// Intermediate: N+1 Query 해결

// Bad (N+1)
const orders = await prisma.order.findMany({
  where: { userId: 1 }
});
for (const order of orders) {
  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id }
  });
}

// Good (Eager Loading)
const orders = await prisma.order.findMany({
  where: { userId: 1 },
  include: {
    orderItems: {
      include: { product: true }
    }
  }
});
```

---

### Advanced (고급)

**행동적 설명:**
복잡한 비즈니스 도메인을 확장 가능한 데이터 아키텍처로 설계하고, 대규모 트래픽을 고려한 성능 최적화를 수행할 수 있습니다. Sharding, Replication, Partitioning 같은 분산 데이터베이스 기법을 적용하고, Zero-Downtime Migration을 수행하며, 주니어 개발자를 멘토링할 수 있습니다.

**구체적 예시:**
- Read Replica로 읽기 부하 분산
- Table Partitioning으로 대용량 테이블 관리
- Materialized View로 복잡한 집계 쿼리 성능 개선
- Database Sharding 전략 수립 (User ID 기반)
- Zero-Downtime Migration (ALTER TABLE 대신 새 테이블 생성 후 교체)
- Query Cache, Connection Pool 최적화

**코드 예시 (Read Replica):**
```javascript
// Advanced: Read Replica로 읽기 부하 분산

const { PrismaClient } = require('@prisma/client');

const prismaWrite = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL_PRIMARY }
  }
});

const prismaRead = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL_REPLICA }
  }
});

// 쓰기는 Primary로
async function createOrder(userId, items) {
  return await prismaWrite.order.create({
    data: { userId, items }
  });
}

// 읽기는 Replica로
async function getUserOrders(userId) {
  return await prismaRead.order.findMany({
    where: { userId },
    include: { orderItems: true }
  });
}
```

**Table Partitioning 예시 (시간 기반):**
```sql
-- Advanced: 로그 테이블을 월별로 파티셔닝

CREATE TABLE logs (
  id BIGSERIAL,
  user_id INTEGER,
  action VARCHAR(50),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- 파티션 생성 (월별)
CREATE TABLE logs_2025_01 PARTITION OF logs
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE logs_2025_02 PARTITION OF logs
FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

-- 쿼리 시 자동으로 적절한 파티션만 스캔
SELECT * FROM logs WHERE created_at >= '2025-01-15' AND created_at < '2025-01-20';
-- → logs_2025_01 파티션만 스캔 (성능 향상)
```

**Zero-Downtime Migration 예시:**
```sql
-- Advanced: NOT NULL 제약 조건 추가 (무중단)

-- 1단계: NULL 허용하는 새 컬럼 추가
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 2단계: 기존 데이터 마이그레이션 (배치)
UPDATE users SET phone = '000-0000-0000' WHERE phone IS NULL;

-- 3단계: NULL 확인
SELECT COUNT(*) FROM users WHERE phone IS NULL;  -- 0이어야 함

-- 4단계: NOT NULL 제약 조건 추가
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;

-- 기존 방식 (위험):
-- ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;
-- → 기존 행이 있으면 실패! 서비스 다운타임 발생
```

**Materialized View 예시 (복잡한 집계):**
```sql
-- Advanced: 일별 매출 집계 (Materialized View)

CREATE MATERIALIZED VIEW daily_sales AS
SELECT
  DATE(created_at) as sale_date,
  COUNT(*) as order_count,
  SUM(total_amount) as total_sales,
  AVG(total_amount) as avg_order_value
FROM orders
WHERE status = 'paid'
GROUP BY DATE(created_at);

CREATE INDEX idx_daily_sales_date ON daily_sales(sale_date);

-- 매일 새벽 2시 refresh (cron job)
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;

-- 쿼리 (기존 집계 쿼리보다 100배 빠름)
SELECT * FROM daily_sales WHERE sale_date >= '2025-01-01' ORDER BY sale_date DESC;
```

---

### Expert (전문가)

**행동적 설명:**
조직 전체의 데이터 아키텍처 전략을 수립하고, Multi-Region 분산 데이터베이스, CQRS(Command Query Responsibility Segregation), Event Sourcing 같은 고급 패턴을 설계합니다. Database Migration 거버넌스 프로세스를 구축하고, 대규모 데이터 마이그레이션(수억 건)을 무중단으로 수행하며, 데이터베이스 장애 대응 및 복구를 주도합니다.

**구체적 예시:**
- CQRS 패턴으로 읽기/쓰기 데이터베이스 분리
- Event Sourcing으로 모든 변경 이력 저장
- Multi-Region Active-Active 데이터베이스 구성
- Database Sharding 자동화 (Consistent Hashing)
- 수억 건 데이터 마이그레이션 무중단 수행
- 전사 Database Schema 변경 거버넌스 수립

**아키텍처 예시 (CQRS + Event Sourcing):**
```
┌─────────────┐
│ Write API   │───▶ Command DB (PostgreSQL)
└─────────────┘         │
                        │ Event Stream
                        ▼
                  ┌──────────────┐
                  │ Event Store  │──┐
                  │ (Kafka)      │  │
                  └──────────────┘  │
                        │            │
                        ▼            │
┌─────────────┐   ┌──────────────┐  │
│ Read API    │◀──│ Read DB      │◀─┘
└─────────────┘   │ (Elasticsearch)
                  └──────────────┘
```

**Event Sourcing 예시:**
```sql
-- Expert: Event Sourcing (모든 변경 이력 저장)

CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  aggregate_id UUID NOT NULL,
  aggregate_type VARCHAR(50) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB NOT NULL,
  version INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (aggregate_id, version)
);

CREATE INDEX idx_events_aggregate ON events(aggregate_id, version);

-- 주문 생성 이벤트
INSERT INTO events (aggregate_id, aggregate_type, event_type, event_data, version)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'Order',
  'OrderCreated',
  '{"userId": 1, "items": [{"productId": 123, "quantity": 2}], "totalAmount": 20000}',
  1
);

-- 주문 결제 이벤트
INSERT INTO events (aggregate_id, aggregate_type, event_type, event_data, version)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'Order',
  'OrderPaid',
  '{"paymentId": "pay_xyz", "paidAt": "2025-11-26T10:00:00Z"}',
  2
);

-- 현재 상태 복원 (Event Replay)
SELECT event_type, event_data, version
FROM events
WHERE aggregate_id = '123e4567-e89b-12d3-a456-426614174000'
ORDER BY version ASC;

-- 장점: 언제든 과거 시점으로 돌아갈 수 있음, 감사(audit) 용이
```

**Multi-Region Sharding 예시:**
```javascript
// Expert: Consistent Hashing으로 Shard 선택

const crypto = require('crypto');

class ShardRouter {
  constructor(shards) {
    this.shards = shards;  // ['shard-us', 'shard-eu', 'shard-asia']
  }

  // User ID를 기반으로 Shard 선택
  getShardForUser(userId) {
    const hash = crypto.createHash('md5').update(userId.toString()).digest('hex');
    const hashInt = parseInt(hash.substring(0, 8), 16);
    const shardIndex = hashInt % this.shards.length;
    return this.shards[shardIndex];
  }

  async getUserOrders(userId) {
    const shard = this.getShardForUser(userId);
    const db = this.getConnection(shard);
    return await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
  }
}

const router = new ShardRouter(['shard-us', 'shard-eu', 'shard-asia']);
router.getUserOrders(12345);  // → shard-asia
router.getUserOrders(67890);  // → shard-us
```

**Database Migration 거버넌스:**
```markdown
# Database Schema 변경 프로세스 (Expert 수준)

## 1. RFC (Request for Comments) 작성
- 변경 이유, 영향 범위, Rollback 계획 명시
- DBA, 백엔드 리드, DevOps 팀 검토

## 2. Impact Analysis
- 테이블 크기 확인 (1억 건 이상은 Partitioning 고려)
- Lock 시간 예측 (ALTER TABLE은 Table Lock 발생)
- Read Replica lag 시간 고려

## 3. Migration 전략 선택
- **Small Table (<1M rows):** 직접 ALTER TABLE
- **Large Table (>1M rows):** Ghost, pt-online-schema-change 사용
- **Very Large Table (>100M rows):** Blue-Green Deployment

## 4. 테스트 환경 검증
- Staging 환경에서 프로덕션 데이터 복사본으로 실행
- 실행 시간 측정, Lock 시간 확인

## 5. Rollback 계획
- 모든 Migration은 Rollback 스크립트 필수
- Feature Flag로 코드 배포와 Schema 변경 분리

## 6. Production 배포
- 점진적 배포 (Canary: 1% → 10% → 100%)
- 모니터링: Slow Query, CPU, Disk I/O

## 7. Post-Deployment
- 변경 후 7일간 성능 모니터링
- 회고 (문제 발생 시)
```

---

## 🎯 Real-World Examples (실무 예시)

### Example 1: E-commerce 재고 동시성 문제 (Intermediate)

**상황:**
블랙프라이데이 세일 기간 동안 인기 상품의 재고가 마이너스로 떨어지는 버그 발생. 100개 재고에 120개 주문이 들어옴.

**원인:**
```javascript
// Bad: Race Condition
const product = await db.query('SELECT stock FROM products WHERE id = 123');
if (product.stock >= quantity) {
  await db.query('UPDATE products SET stock = stock - ? WHERE id = 123', [quantity]);
  await createOrder(userId, productId, quantity);
}

// 문제: SELECT와 UPDATE 사이에 다른 요청이 끼어들 수 있음
// Time 1: User A가 stock = 100 확인
// Time 2: User B가 stock = 100 확인 (아직 User A가 UPDATE 안 함)
// Time 3: User A가 stock = 95로 UPDATE
// Time 4: User B가 stock = 95로 UPDATE (원래 90이어야 함!)
```

**해결책 (Intermediate):**
```sql
-- Good: Pessimistic Locking

BEGIN;

SELECT stock FROM products WHERE id = 123 FOR UPDATE;  -- 행 잠금

UPDATE products SET stock = stock - 5 WHERE id = 123 AND stock >= 5;

IF ROW_COUNT() = 0 THEN
  ROLLBACK;
  RAISE EXCEPTION '재고 부족';
ELSE
  INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 123, 5);
  COMMIT;
END IF;
```

**Alternative: Optimistic Locking**
```sql
-- version 컬럼 사용
UPDATE products
SET stock = stock - 5, version = version + 1
WHERE id = 123 AND stock >= 5 AND version = 12;

-- version이 바뀌었으면 (다른 요청이 끼어들었으면) UPDATE 실패
-- 클라이언트에서 재시도
```

---

### Example 2: 느린 쿼리 최적화 (Intermediate → Advanced)

**상황:**
"최근 30일간 구매한 사용자 목록" 쿼리가 15초 걸려서 타임아웃 발생.

**원래 쿼리:**
```sql
SELECT DISTINCT users.*
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.created_at >= NOW() - INTERVAL '30 days';

-- EXPLAIN ANALYZE:
-- Seq Scan on orders (cost=0.00..5000000.00 rows=500000 width=123)
-- → Full Table Scan! 인덱스 없음
```

**최적화 1단계 (Intermediate):**
```sql
-- 인덱스 추가
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- EXPLAIN ANALYZE:
-- Index Scan using idx_orders_created_at (cost=0.29..8000.00 rows=5000 width=123)
-- 성능: 15초 → 2초
```

**최적화 2단계 (Advanced):**
```sql
-- Covering Index로 더 빠르게
CREATE INDEX idx_orders_created_user ON orders(created_at, user_id);

SELECT DISTINCT user_id FROM orders
WHERE created_at >= NOW() - INTERVAL '30 days';

-- → Index Only Scan (테이블 접근 불필요, 인덱스만 읽음)
-- 성능: 2초 → 0.3초
```

**최적화 3단계 (Advanced - Materialized View):**
```sql
-- 매일 새벽 갱신되는 Materialized View
CREATE MATERIALIZED VIEW recent_active_users AS
SELECT DISTINCT user_id, MAX(created_at) as last_order_at
FROM orders
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY user_id;

CREATE INDEX idx_recent_active_users ON recent_active_users(user_id);

-- Refresh (cron job: 매일 00:00)
REFRESH MATERIALIZED VIEW CONCURRENTLY recent_active_users;

-- 쿼리
SELECT users.* FROM users
JOIN recent_active_users ON users.id = recent_active_users.user_id;

-- 성능: 0.3초 → 0.05초
```

---

### Example 3: 대규모 데이터 마이그레이션 (Expert)

**상황:**
`users` 테이블(2억 건)에 `phone` 컬럼을 추가해야 함. ALTER TABLE은 수 시간 걸리고, 서비스 다운타임 발생.

**Expert의 전략: Ghost (온라인 스키마 변경 도구)**
```bash
# gh-ost 사용 (GitHub가 개발한 Zero-Downtime Migration 도구)

gh-ost \
  --host=prod-db.example.com \
  --database=myapp \
  --table=users \
  --alter="ADD COLUMN phone VARCHAR(20)" \
  --allow-on-master \
  --execute

# 동작 방식:
# 1. 새 테이블 _users_gho 생성 (phone 컬럼 포함)
# 2. 기존 데이터를 배치로 복사 (5분마다 1만 건)
# 3. Binlog 읽어서 실시간 변경사항 반영
# 4. 복사 완료 후 RENAME TABLE (atomic, 0.1초)
#    RENAME TABLE users TO users_old, _users_gho TO users;
# 5. users_old 삭제
```

**타임라인:**
```
00:00 - gh-ost 시작, _users_gho 생성
00:00~04:00 - 2억 건 복사 (4시간, 백그라운드)
04:00 - RENAME TABLE (0.1초 다운타임)
04:01 - 완료, users_old 삭제
```

**Before/After:**
- **Before:** ALTER TABLE → 6시간 다운타임
- **After:** gh-ost → 0.1초 다운타임 ⭐

---

## 📏 Evaluation Rubric (평가 루브릭)

### 5점 척도

| 점수 | Proficiency 매핑 | 평가 기준 | 행동적 앵커 |
|------|------------------|----------|-------------|
| **1점** | N/A | 데이터베이스 기본 개념을 이해하지 못함 | - Primary Key, Foreign Key를 구분 못함<br>- SELECT 쿼리만 작성 가능, JOIN은 어려움<br>- 데이터 타입을 무분별하게 선택 (모든 컬럼이 VARCHAR(255))<br>- 인덱스 개념을 모름 |
| **2점** | **Beginner** | 간단한 테이블 설계 및 CRUD 쿼리 작성 가능 | - 기존 스키마를 참고하여 새 테이블 추가<br>- SELECT, INSERT, UPDATE, DELETE 작성<br>- ORM 사용하여 데이터 조회/저장<br>- JOIN은 가능하지만, 인덱스 설계는 못함 |
| **3점** | **Intermediate** | 정규화 적용, 인덱스 설계, N+1 Query 해결 | - 제3정규형(3NF) 적용, 필요시 비정규화<br>- WHERE, JOIN 절에 적절한 인덱스 생성<br>- EXPLAIN으로 쿼리 실행 계획 분석<br>- N+1 Query를 JOIN/Eager Loading으로 해결<br>- 트랜잭션과 Isolation Level 이해 |
| **4점** | Advanced | 분산 DB 기법 적용, Zero-Downtime Migration | - Read Replica로 읽기 부하 분산<br>- Table Partitioning으로 대용량 테이블 관리<br>- Materialized View로 집계 쿼리 최적화<br>- Zero-Downtime Migration 수행<br>- Database Sharding 전략 수립 |
| **5점** | Expert | 전사 데이터 아키텍처 수립, CQRS/Event Sourcing | - CQRS 패턴으로 읽기/쓰기 DB 분리<br>- Event Sourcing으로 변경 이력 관리<br>- Multi-Region Active-Active DB 구성<br>- 수억 건 데이터 마이그레이션 무중단 수행<br>- Database Migration 거버넌스 수립 |

---

## 🧪 Assessment Methods (평가 방법)

### 1. Schema Design (45분)
**과제:**
소셜 미디어 플랫폼의 데이터베이스를 설계하세요.

**요구사항:**
- 사용자 (users)
- 게시물 (posts)
- 댓글 (comments)
- 좋아요 (likes)
- 팔로우 (follows)

**추가 요구:**
- 사용자는 여러 게시물 작성
- 게시물은 여러 댓글, 좋아요 가능
- 사용자 간 팔로우 (Many-to-Many)

**평가 기준:**
- **2점:** 테이블은 만들지만 Foreign Key 없음, 정규화 안 됨
- **3점:** 정규화 적용, FK 제약 조건, 적절한 인덱스 설계
- **4점:** 비정규화 적용 (예: posts.likes_count 캐시), Partitioning 고려

---

### 2. Query Optimization (30분)
**과제:**
아래 느린 쿼리를 최적화하세요.

```sql
-- 쿼리: "최근 7일간 가장 많이 주문한 상품 Top 10"
SELECT p.id, p.name, COUNT(*) as order_count
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= NOW() - INTERVAL '7 days'
GROUP BY p.id, p.name
ORDER BY order_count DESC
LIMIT 10;

-- 실행 시간: 12초
-- EXPLAIN: Seq Scan on orders (5M rows)
```

**평가 기준:**
- **3점:** 인덱스 추가 제안 (`idx_orders_created_at`)
- **4점:** Covering Index 제안 (`idx_orders_created_order_id`), Materialized View
- **5점:** CQRS 패턴 제안 (별도 Read DB에 집계 데이터 미리 계산)

---

### 3. Concurrency Problem (20분)
**과제:**
아래 코드의 동시성 문제를 찾고 해결하세요.

```javascript
app.post('/transfer', async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;

  const fromUser = await db.query('SELECT balance FROM users WHERE id = ?', [fromUserId]);
  if (fromUser.balance < amount) {
    return res.status(400).json({ error: '잔액 부족' });
  }

  await db.query('UPDATE users SET balance = balance - ? WHERE id = ?', [amount, fromUserId]);
  await db.query('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, toUserId]);

  res.json({ success: true });
});
```

**평가 기준:**
- **2점:** "문제 없어 보입니다" (동시성 문제 발견 못함)
- **3점:** Race Condition 지적, Transaction 추가, FOR UPDATE 사용
- **4점:** Optimistic Locking 또는 Pessimistic Locking 비교, Isolation Level 설명
- **5점:** Saga Pattern 제안 (분산 트랜잭션), Event Sourcing으로 감사 추적

---

## 🔗 Related Competencies (관련 역량)

### Prerequisites (선행 역량)
- **SQL 기본 문법:** SELECT, INSERT, UPDATE, DELETE, JOIN
- **관계형 데이터베이스 개념:** 테이블, 행, 열, Primary Key, Foreign Key
- **데이터 모델링 기초:** Entity-Relationship Diagram (ERD)

### Related Competencies (연관 역량)
- **COMP-001: RESTful API Development** - API는 데이터베이스와 밀접
- **COMP-007: System Architecture** - 데이터 아키텍처는 시스템 설계의 핵심
- **COMP-005: Testing & QA** - Database Migration Testing, Data Integrity Testing

### Next Level (다음 단계)
- **NoSQL Database Design** - MongoDB, Cassandra, DynamoDB
- **Data Warehouse Design** - Snowflake Schema, Star Schema, OLAP
- **Streaming Data Architecture** - Kafka, Flink, Real-time Analytics

---

## 📚 Learning Resources (학습 자료)

### Beginner → Intermediate
- **책:** "SQL 첫걸음" (아사이 아츠시)
- **책:** "Real MySQL 8.0" (백은빈, 이성욱)
- **강의:** "The Complete SQL Bootcamp" (Udemy)
- **도구:** PostgreSQL, MySQL Workbench, DBeaver

### Intermediate → Advanced
- **책:** "고성능 MySQL" (Baron Schwartz)
- **책:** "Database Internals" (Alex Petrov)
- **문서:** [Use The Index, Luke](https://use-the-index-luke.com/)
- **도구:** EXPLAIN, pg_stat_statements, Percona Toolkit

### Advanced → Expert
- **책:** "Designing Data-Intensive Applications" (Martin Kleppmann)
- **논문:** "Google Spanner: Globally Distributed Database"
- **컨퍼런스:** PGConf, Percona Live
- **도구:** Vitess (Sharding), gh-ost (Migration), Patroni (HA)

---

## 📊 Industry Benchmarks (산업 표준)

### O*NET Mapping
- **15-1252.00 Software Developers:** Database Design (핵심 스킬)
- **15-1241.00 Computer Network Architects:** 분산 데이터베이스 아키텍처

### SFIA Mapping
- **SFIA Level 3 (Apply):** Intermediate - 독립적으로 스키마 설계
- **SFIA Level 4 (Enable):** Advanced - 분산 DB 아키텍처
- **SFIA Level 5 (Ensure):** Expert - 전사 데이터 아키텍처 수립

### Market Data
- **LinkedIn Skills:** "Database Design" - 1.5M+ 프로필
- **Stack Overflow Survey 2024:** 72%의 백엔드 개발자가 관계형 DB 사용
- **Salary Impact:** Database 최적화 역량은 Senior Backend 연봉에 10-15% 영향

---

## 🎯 Competency Questions (CQ) 매핑

이 Competency는 다음 CQs에 답합니다:

- **CQ-1:** "Backend Engineer에게 필요한 핵심 기술 역량은?" → Database Design (Base Competency)
- **CQ-4:** "Senior Backend Engineer는 Mid와 어떤 차이가 있는가?" → DB는 Beginner/Intermediate/Advanced로 구분
- **CQ-6:** "Full-stack Engineer의 Base Competencies는?" → Database Design Beginner
- **CQ-10:** "특정 Competency를 평가하는 면접 질문은?" → Rubric의 Assessment Methods
- **CQ-13:** "Backend와 Full-stack의 역량 차이는?" → Backend는 Intermediate, Full-stack은 Beginner

---

## 📝 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-26 | Terry | Initial draft - Priority 2 competency for V1 |

---

## 👥 Approval Status

- **Terry (PM):** ✅ Draft 작성 완료
- **Berry (CTO):** ⏳ 기술 검토 대기
- **Borry (HR):** ⏳ 실무 검토 대기

---

**다음 작업:** COMP-003 React Development 작성
