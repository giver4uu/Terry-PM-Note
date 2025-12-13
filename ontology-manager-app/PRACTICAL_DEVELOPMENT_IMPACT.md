# 온톨로지 표준 미준수의 실제 개발 영향도 분석
**실무 개발자 관점에서 본 Ontology Manager의 문제들**

**작성일:** 2025-12-13
**관점:** 실용주의 (Pragmatic)
**대상:** PM, 개발팀 리드

---

## TL;DR (Executive Summary)

**결론부터:** 프로퍼티 재사용 불가는 **소규모 ATS에선 큰 문제 아님**, **대규모에선 심각한 문제**.

| 이슈 | 이론적 심각도 | 실무적 심각도 | 실제 개발 영향 |
|------|---------------|---------------|----------------|
| **프로퍼티 재사용 불가** | 🔴 High | 🟡 Medium | 중복 코드 증가, 유지보수 비용 ↑ |
| **Object Property 미지원** | 🔴 High | 🔴 High | 관계 표현 불가, 쿼리 복잡도 ↑ |
| **타입 안전성 부족** | 🟡 Medium | 🔴 High | 런타임 에러, 디버깅 시간 ↑ |
| **계층 구조 없음** | 🟡 Medium | 🟢 Low | 약간의 중복, 대부분 괜찮음 |

---

## 1. 프로퍼티 재사용 불가 - 실무 영향도

### 1.1 현재 상황 (Ontology Manager)

```typescript
// 온톨로지 매니저 export 결과
{
  "Candidate": {
    "properties": [
      { "id": "c1", "name": "name", "type": "text" },
      { "id": "c2", "email": "email", "type": "text" },
      { "id": "c3", "name": "phone", "type": "text" }
    ]
  },
  "Recruiter": {
    "properties": [
      { "id": "r1", "name": "name", "type": "text" },
      { "id": "r2", "name": "email", "type": "text" },
      { "id": "r3", "name": "phone", "type": "text" }
    ]
  },
  "Interviewer": {
    "properties": [
      { "id": "i1", "name": "name", "type": "text" },
      { "id": "i2", "name": "email", "type": "text" }
    ]
  }
}
```

### 1.2 개발팀이 구현하는 코드

**시나리오 1: 소규모 프로젝트 (TypeORM)**

```typescript
// src/entities/Candidate.ts
@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;
}

// src/entities/Recruiter.ts
@Entity()
export class Recruiter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;  // ⚠️ 중복 정의

  @Column({ type: 'varchar', length: 255 })
  email: string;  // ⚠️ 중복 정의

  @Column({ type: 'varchar', length: 20 })
  phone: string;  // ⚠️ 중복 정의
}

// src/entities/Interviewer.ts
@Entity()
export class Interviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;  // ⚠️ 중복 정의

  @Column({ type: 'varchar', length: 255 })
  email: string;  // ⚠️ 중복 정의
}
```

**문제점:**
1. `name`, `email`, `phone` 정의가 3번 중복
2. 검증 로직도 3번 중복 필요
3. 한 곳에서 변경 시 3곳 모두 수정

**실무적 영향:**
```
✅ 작동은 함 (DB 스키마상 문제 없음)
⚠️ DRY 원칙 위반 (Don't Repeat Yourself)
🔴 유지보수 비용 증가 (변경 시 여러 곳 수정)
```

### 1.3 실제 발생하는 시나리오

**Case 1: 이메일 검증 로직 변경**

```typescript
// Before: 각 엔티티마다 다른 검증 로직 (일관성 없음)
// Candidate.ts
@Column({ type: 'varchar', length: 255 })
@IsEmail()  // class-validator
email: string;

// Recruiter.ts
@Column({ type: 'varchar', length: 255 })
// ❌ 검증 없음 (누락)
email: string;

// Interviewer.ts
@Column({ type: 'varchar', length: 255 })
@Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)  // 다른 검증
email: string;
```

**결과:**
- Candidate는 이메일 형식 검증 O
- Recruiter는 검증 없음 → 잘못된 이메일 저장 가능
- Interviewer는 정규식 검증 (다른 방식)

→ **일관성 없는 데이터 품질**

**Case 2: 이메일 길이 제한 변경**

```typescript
// 요구사항: 이메일 최대 길이 255 → 320으로 변경 (RFC 5321 표준)

// 수정 필요한 곳:
1. Candidate.ts:     @Column({ length: 255 }) → 320
2. Recruiter.ts:     @Column({ length: 255 }) → 320
3. Interviewer.ts:   @Column({ length: 255 }) → 320
4. DB migration 3개  (각 테이블마다 ALTER TABLE)
5. Validation 3곳   (DTO, Entity, Service)

// 누락 위험:
→ Interviewer는 수정했는데 Candidate는 깜빡함
→ 특정 사용자만 긴 이메일 입력 가능 (버그)
```

### 1.4 이상적 구조 (프로퍼티 재사용)

**전역 프로퍼티 풀 방식:**

```typescript
// src/common/properties/PersonProperties.ts
export abstract class PersonProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @Column({ type: 'varchar', length: 320 })  // RFC 5321 표준
  @IsEmail()
  @Index()  // 검색 최적화
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Matches(/^\+?[1-9]\d{1,14}$/)  // E.164 국제 전화번호 표준
  phone?: string;
}

// 각 엔티티에서 재사용
@Entity()
export class Candidate extends PersonProperties {
  // Candidate 고유 프로퍼티만 추가
  @Column({ type: 'date' })
  applied_date: Date;
}

@Entity()
export class Recruiter extends PersonProperties {
  // Recruiter 고유 프로퍼티만 추가
  @Column({ type: 'varchar', length: 100 })
  department: string;
}

@Entity()
export class Interviewer extends PersonProperties {
  // Interviewer 고유 프로퍼티만 추가
  @Column({ type: 'varchar', length: 100 })
  expertise_area: string;
}
```

**장점:**
1. 변경 시 1곳만 수정 (PersonProperties)
2. 검증 로직 일관성 보장
3. 버그 발생 확률 감소

**이메일 길이 변경 시:**
```typescript
// Before: 3곳 수정 필요
// After: 1곳만 수정
export abstract class PersonProperties {
  @Column({ type: 'varchar', length: 320 })  // 여기만 수정
  email: string;
}
// 끝! Candidate, Recruiter, Interviewer 모두 자동 적용
```

### 1.5 실무 판단: 언제 문제가 되는가?

**🟢 문제 안 되는 경우 (프로퍼티 재사용 없이 진행 가능):**

- [ ] 클래스 수 < 5개
- [ ] 공통 프로퍼티 < 3개
- [ ] 변경 빈도 낮음 (분기 1회 이하)
- [ ] 팀 규모 작음 (개발자 1-2명)
- [ ] MVP 단계 (빠른 출시 우선)

**예시:** 초기 스타트업 ATS
```
- Candidate (name, email, phone)
- JobPosting (title, description)
- Application (status, applied_date)

→ 공통 프로퍼티 적음, 빠르게 만드는 게 우선
→ 프로퍼티 재사용 없이 진행 OK
```

**🔴 문제 되는 경우 (프로퍼티 재사용 필수):**

- [ ] 클래스 수 > 10개
- [ ] 공통 프로퍼티 > 5개 (name, email, phone, created_at, updated_at, created_by 등)
- [ ] 변경 빈도 높음 (월 1회 이상)
- [ ] 팀 규모 큼 (개발자 5명 이상)
- [ ] 장기 운영 제품

**예시:** 엔터프라이즈 ATS
```
- Candidate, Recruiter, Interviewer, HiringManager, Employee, Admin, Vendor, Agency...
- 공통: name, email, phone, address, created_at, updated_at, created_by, updated_by

→ 10개 클래스 × 8개 공통 프로퍼티 = 80개 중복 정의
→ 유지보수 악몽
→ 프로퍼티 재사용 필수!
```

### 1.6 실제 개발 시나리오: DB Migration

**프로퍼티 재사용 없을 때:**

```sql
-- Migration 1: email 길이 변경
ALTER TABLE candidates ALTER COLUMN email TYPE VARCHAR(320);
ALTER TABLE recruiters ALTER COLUMN email TYPE VARCHAR(320);
ALTER TABLE interviewers ALTER COLUMN email TYPE VARCHAR(320);

-- Migration 2: email에 unique 제약 추가
ALTER TABLE candidates ADD CONSTRAINT unique_candidate_email UNIQUE (email);
ALTER TABLE recruiters ADD CONSTRAINT unique_recruiter_email UNIQUE (email);
ALTER TABLE interviewers ADD CONSTRAINT unique_interviewer_email UNIQUE (email);

-- Migration 3: email에 인덱스 추가
CREATE INDEX idx_candidate_email ON candidates(email);
CREATE INDEX idx_recruiter_email ON recruiters(email);
CREATE INDEX idx_interviewer_email ON interviewers(email);
```

**문제점:**
1. 3개 테이블 × 3개 작업 = 9개 SQL 문
2. 1개 테이블 누락 가능성
3. 롤백 시 9개 모두 되돌려야 함

**프로퍼티 재사용 (상속) 시:**

```sql
-- Person 테이블 (공통 속성)
ALTER TABLE persons ALTER COLUMN email TYPE VARCHAR(320);
ALTER TABLE persons ADD CONSTRAINT unique_person_email UNIQUE (email);
CREATE INDEX idx_person_email ON persons(email);

-- Candidate, Recruiter, Interviewer는 persons를 참조
-- (Single Table Inheritance 또는 Class Table Inheritance 패턴)
```

**장점:**
1. 1개 테이블만 수정
2. 일관성 보장
3. 롤백 간단

---

## 2. Object Property 미지원 - 실무 영향도 (심각함!)

### 2.1 현재 문제

**온톨로지 매니저 현재:**
```json
{
  "Application": {
    "properties": [
      { "name": "assigned_recruiter_id", "type": "text" }  // ❌ 문자열
    ]
  }
}
```

**개발팀이 보는 관점:**
```typescript
@Entity()
export class Application {
  @Column({ type: 'uuid' })
  assigned_recruiter_id: string;  // ❌ 타입 정보 손실

  // 실제로는 Recruiter를 참조하는데 온톨로지엔 표현 안 됨
}
```

### 2.2 실제 발생하는 문제

**문제 1: 타입 검증 불가**

```typescript
// 잘못된 코드 (컴파일은 됨, 런타임 에러)
const app = new Application();
app.assigned_recruiter_id = 'abc123';  // ❌ 실제로는 Candidate ID를 넣음

// DB에 저장은 됨 (UUID 형식이니까)
// 하지만 조회 시 에러 발생
const recruiter = await recruiterRepo.findOne(app.assigned_recruiter_id);
// null 반환 (해당 ID의 Recruiter 없음)
```

**문제 2: 쿼리 복잡도 증가**

```typescript
// Object Property 없을 때 (수동 조인)
const applications = await appRepo.find();
const recruiterIds = applications.map(a => a.assigned_recruiter_id);
const recruiters = await recruiterRepo.findByIds(recruiterIds);

// 수동 매핑 필요
const result = applications.map(app => ({
  ...app,
  recruiter: recruiters.find(r => r.id === app.assigned_recruiter_id)
}));
```

```typescript
// Object Property 있을 때 (TypeORM relation)
@Entity()
export class Application {
  @ManyToOne(() => Recruiter, { eager: true })
  @JoinColumn({ name: 'assigned_recruiter_id' })
  assignedRecruiter: Recruiter;  // ✅ 타입 안전
}

// 간단한 쿼리
const applications = await appRepo.find({ relations: ['assignedRecruiter'] });
// 끝! recruiter 자동으로 포함됨
```

**문제 3: 온톨로지-코드 불일치**

```
온톨로지: "assigned_recruiter_id는 text 타입"
실제 코드: "assigned_recruiter_id는 Recruiter 엔티티 참조"

→ PM과 개발자의 이해 불일치
→ PRD 작성 시 혼란
→ 버그 발생 가능성 ↑
```

### 2.3 실무 판단: Object Property 미지원의 심각도

**🔴 치명적 (반드시 개선 필요):**

- [ ] 관계가 복잡함 (5개 이상의 참조 관계)
- [ ] 다대다 관계 존재 (Interviewer ↔ Interview)
- [ ] 조인 쿼리 빈번 (API의 80% 이상)
- [ ] TypeORM/Prisma 같은 ORM 사용

**예시:** 일반적인 ATS
```
Application → Candidate  (N:1)
Application → JobPosting (N:1)
Application → Recruiter  (N:1)
Interview → Application  (N:1)
Interview ↔ Interviewer  (N:M)

→ Object Property 없으면 개발 불가능 수준
```

**🟡 중간 (회피 가능하지만 불편):**

- [ ] 관계가 단순 (1-2개)
- [ ] 조인 없는 단순 CRUD 위주
- [ ] Raw SQL 사용 (ORM 안 씀)

---

## 3. 타입 안전성 부족 - 실무 영향도 (개발자 생산성)

### 3.1 현재 문제 (ONTOLOGY_REVIEW.md Issue #1)

```typescript
// src/types/ontology.ts (현재)
export interface OntologyNodeData {
  label: string;
  type?: 'class' | 'property';  // ❌ optional
  properties: PropertyDefinition[];  // ❌ 프로퍼티 노드도 이 배열 가짐
  rules: LogicRule[];
}
```

**실제 코드에서 발생하는 문제:**

```typescript
function renderNode(node: OntologyNodeData) {
  // ❌ type이 undefined일 수 있음 → 방어 코드 필요
  if (node.type === 'class') {
    // ClassNode 렌더링
    return <div>{node.properties.map(...)}</div>;  // ✅ OK
  } else if (node.type === 'property') {
    // PropertyNode 렌더링
    return <div>{node.properties.map(...)}</div>;  // ❌ 의미 없음 (프로퍼티의 프로퍼티?)
  } else {
    // ❌ undefined 케이스 처리 필요
    return <div>Unknown node</div>;
  }
}
```

### 3.2 개발팀 관점: 런타임 에러 위험

```typescript
// 실제 발생 가능한 버그
const classNode = nodes.find(n => n.type === 'class');
if (classNode) {
  // ❌ TypeScript는 여전히 OntologyNodeData로 인식
  // classNode.properties가 실제로 존재하는지 보장 안 됨
  classNode.properties.forEach(prop => {
    console.log(prop.name);  // 런타임 에러 가능
  });
}
```

**개선 후 (Union Type):**

```typescript
// src/types/ontology.ts (개선)
interface ClassNodeData {
  kind: 'class';  // required
  properties: PropertyDefinition[];
}

interface PropertyNodeData {
  kind: 'property';
  dataType: PropertyType;
  // properties 배열 없음 → 구조적으로 불가능
}

type OntologyNodeData = ClassNodeData | PropertyNodeData;

function renderNode(node: OntologyNodeData) {
  if (node.kind === 'class') {
    // ✅ TypeScript가 자동으로 ClassNodeData로 인식
    return <div>{node.properties.map(...)}</div>;  // ✅ 안전
  } else {
    // ✅ TypeScript가 자동으로 PropertyNodeData로 인식
    return <div>{node.dataType}</div>;  // ✅ 안전
    // node.properties  // ❌ 컴파일 에러 (존재하지 않음)
  }
}
```

### 3.3 실무 판단: 타입 안전성의 중요도

**🔴 치명적 (TypeScript 프로젝트에서):**

- [ ] TypeScript 사용
- [ ] 팀 규모 > 3명
- [ ] 장기 운영 제품
- [ ] 복잡한 비즈니스 로직

**🟢 덜 중요 (JavaScript 프로젝트에서):**

- [ ] Plain JavaScript 사용
- [ ] 소규모 MVP
- [ ] 1-2명 개발자

---

## 4. 계층 구조 없음 - 실무 영향도 (낮음)

### 4.1 현재 상황

```
Ontology Manager: Candidate, Recruiter, Interviewer (각각 독립적)

이상적:
Person (상위 클래스)
├── Candidate
├── Recruiter
└── Interviewer
```

### 4.2 실무 영향

**🟢 대부분의 경우 문제 없음:**

```typescript
// 계층 없어도 상속으로 구현 가능
abstract class Person {
  name: string;
  email: string;
}

class Candidate extends Person { ... }
class Recruiter extends Person { ... }
```

**개발자가 직접 상속 구조 만들면 됨.**

**🟡 약간 불편한 경우:**

- Ontology Manager에서 "Person"을 명시적으로 보여주지 않음
- PM-개발자 커뮤니케이션 시 "공통 속성"을 별도 설명 필요

---

## 5. 우선순위 결론 (개발자 관점)

### 5.1 반드시 고쳐야 할 것 (High Priority)

**1. Object Property 지원 (ONTOLOGY_REVIEW.md Phase 3)**

**이유:**
- 실무에서 관계 표현 필수
- 회피 불가능
- TypeORM/Prisma 등 ORM 사용 시 필수

**작업량:** 5-7일
**영향도:** 🔴 매우 높음

**2. 타입 안전성 강화 (Phase 1)**

**이유:**
- TypeScript 프로젝트에서 생산성 직결
- 버그 조기 발견
- 리팩토링 안정성

**작업량:** 2-3일
**영향도:** 🔴 높음 (TypeScript 사용 시)

### 5.2 고치면 좋은 것 (Medium Priority)

**3. 프로퍼티 재사용 (Phase 2)**

**이유:**
- 소규모에선 괜찮음
- 대규모에선 필수
- 유지보수성 향상

**작업량:** 10-12일
**영향도:** 🟡 규모에 따라 다름

### 5.3 나중에 고쳐도 되는 것 (Low Priority)

**4. 계층 구조**

**이유:**
- 개발자가 직접 구현 가능
- 회피 방법 존재

**작업량:** 5-7일
**영향도:** 🟢 낮음

---

## 6. 실무 가이드: 언제 개선이 필요한가?

### 현재 Ontology Manager 그대로 사용 가능한 경우:

```
✅ 팀 규모: PM 1명, 개발자 1-2명
✅ 프로젝트: MVP 단계
✅ 클래스: < 5개
✅ 관계: 단순 (1:N 위주)
✅ 공통 프로퍼티: < 3개
✅ 개발 기간: < 3개월

→ 프로퍼티 재사용 없어도 OK
→ Object Property는 개발자가 이해해서 구현
→ 타입 안전성은 개발자가 직접 관리
```

### 개선 버전 필요한 경우:

```
🔴 팀 규모: 개발자 3명 이상
🔴 프로젝트: 장기 운영 제품
🔴 클래스: > 10개
🔴 관계: 복잡 (N:M 포함)
🔴 공통 프로퍼티: > 5개
🔴 개발 기간: > 6개월

→ Phase 1 (타입 안전성) 필수
→ Phase 3 (Object Property) 필수
→ Phase 2 (프로퍼티 재사용) 권장
```

---

## 7. 현실적인 대응 전략

### 전략 A: 현재 버전 사용 + 개발자가 보완

**적용 대상:** MVP, 소규모 프로젝트

```
1. PM: Ontology Manager로 설계
2. Markdown export
3. 개발자: Markdown 보고 TypeORM entities 작성 시
   - Object Property는 @ManyToOne, @OneToMany로 표현
   - 공통 프로퍼티는 abstract class로 추출
   - 타입 안전성은 TypeScript로 보장
4. 구현 후 PM에게 피드백
5. PM: Ontology Manager에 반영
```

**장점:**
- 즉시 시작 가능
- 개선 버전 대기 불필요

**단점:**
- PM-개발자 간 커뮤니케이션 오버헤드
- 온톨로지-코드 불일치 가능성

### 전략 B: 개선 버전 대기 (Phase 1, 3 완료 후)

**적용 대상:** 장기 운영 제품, 복잡한 도메인

```
1. Phase 1 (타입 안전성) 완료 대기 (2-3주)
2. Phase 3 (Object Property) 완료 대기 (추가 1-2주)
3. 개선된 Ontology Manager 사용
   - Edge로 Object Property 표현
   - 타입 가드로 안전성 확보
4. JSON export → 자동 코드 생성 가능
```

**장점:**
- 온톨로지-코드 완벽 일치
- 자동화 가능
- 장기적으로 효율적

**단점:**
- 시작이 늦어짐 (4-5주 대기)

### 전략 C: 하이브리드 (지금 시작 + 점진적 개선)

**추천 전략**

```
Week 1-2:
  - 현재 Ontology Manager로 초기 설계
  - Markdown으로 개발팀과 논의

Week 3-4:
  - Phase 1 (타입 안전성) 완료 → 적용
  - 기존 설계 유지, 안정성만 개선

Week 5-6:
  - Phase 3 (Object Property) 완료 → Edge 추가
  - 개발팀: TypeORM relations로 구현

Week 8-12 (여유 있을 때):
  - Phase 2 (프로퍼티 재사용) 적용
  - 리팩토링
```

**장점:**
- 빠른 시작
- 점진적 개선
- 실무 피드백 반영

---

## 8. 개발자에게 전달할 메시지

**PM → 개발자:**

> "Ontology Manager로 설계한 스키마는 '의도(intent)'를 전달하는 것입니다.
>
> - `assigned_recruiter_id` (text): 실제로는 Recruiter 참조 → TypeORM `@ManyToOne`으로 구현하세요
> - 공통 프로퍼티 (name, email, phone): abstract class로 추출 권장
> - 검증 로직은 class-validator로 일관성 있게 적용하세요
>
> Ontology Manager는 완벽한 스펙이 아니라 '대화의 시작점'입니다."

**개발자 → PM:**

> "온톨로지 설계 감사합니다. 몇 가지 피드백:
>
> 1. Application → Recruiter 관계가 1:N인가요, N:1인가요?
> 2. email은 unique 제약이 필요한가요?
> 3. Interview ↔ Interviewer는 다대다인데, 중간 테이블이 필요합니다.
>
> 이런 정보를 온톨로지에 표현해주시면 더 정확히 구현할 수 있습니다."

→ **이런 피드백이 Phase 3 (Object Property)의 필요성을 증명**

---

## 최종 답변

### Q: 프로퍼티 재사용 불가는 실제 개발에 문제가 될까?

**A: 프로젝트 규모에 따라 다릅니다.**

| 프로젝트 규모 | 프로퍼티 재사용 불가 | 실무 영향 |
|---------------|----------------------|----------|
| **소규모 MVP** (클래스 < 5개) | 🟢 문제 안 됨 | 약간의 중복, 감내 가능 |
| **중규모 제품** (클래스 5-10개) | 🟡 불편함 | 유지보수 비용 증가, 개선 권장 |
| **대규모 플랫폼** (클래스 > 10개) | 🔴 심각함 | 반드시 개선 필요 |

### Q: 그럼 뭘 먼저 고쳐야 하나?

**A: Object Property > 타입 안전성 > 프로퍼티 재사용 순서**

1. **Object Property (Phase 3)**: 실무에서 관계 표현 필수 → 최우선
2. **타입 안전성 (Phase 1)**: TypeScript 사용 시 생산성 직결 → 2순위
3. **프로퍼티 재사용 (Phase 2)**: 규모 커지면 필요 → 3순위

---

**문서 버전:** 1.0
**다음 리뷰:** 개선 Phase 1, 3 완료 후
