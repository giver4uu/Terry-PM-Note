# Magic Link 아키텍처 제안 및 핵심 질문

**날짜**: 2025-10-20
**작성자**: 제리 (Senior PM)
**목적**: Magic Link 기반 지원서 임시저장 기능의 아키텍처 설계를 위한 핵심 결정사항 정리

---

## 현재 상태

- ✅ **최종 결정**: Magic Link (이메일 인증 링크) 방식 채택
- ✅ **보리의 검증**: 실무 관점에서 Magic Link가 최적
- ✅ **링크 유효기간**: 14일
- ⏳ **다음 단계**: 상세 아키텍처 설계 및 유저 스토리 작성

---

## 유저 스토리 작성 전 결정해야 할 4가지 핵심 사항

### 1. 인증 토큰 저장 방식

**질문**: Magic Link 클릭 후 "인증된 세션"을 어떻게 관리할 것인가?

#### 옵션 A: 쿠키 기반 (14일 유효)
- 장점: 브라우저 닫아도 유지, 다른 디바이스에서 재접속 시 자동 인증
- 단점: 쿠키 삭제 시 재인증 필요

#### 옵션 B: localStorage에 토큰 저장
- 장점: 브라우저 저장소 활용, 구현 간단
- 단점: 도메인별로 격리, 다른 디바이스 간 동기화 불가

#### 옵션 C: 세션 기반 (브라우저 닫으면 만료)
- 장점: 보안성 높음
- 단점: 브라우저 닫으면 재인증 필요 (지원자 불편)

**영향**: Case 2(회사 PC → 집 PC), Case 3(모바일 ↔ PC)에서 "다른 디바이스에서 이어서 작성" 가능 여부 결정

---

### 2. "로컬 저장"의 정확한 의미

**질문**: 보리가 말한 "브라우저 로컬 자동 저장"의 정확한 동작 방식은?

#### 옵션 A: Magic Link 없이도 localStorage에 임시 저장 → 나중에 Magic Link로 "서버 동기화"
- 장점: 지원자가 아무것도 안 해도 데이터 보존
- 단점: localStorage와 서버 간 sync 로직 복잡

#### 옵션 B: 무조건 Magic Link 인증 후에만 서버 저장 가능
- 장점: 서버 데이터 일관성 유지, 구현 단순
- 단점: Magic Link 없이 나갔다가 돌아오면 데이터 없음

#### 옵션 C: 로그인 전에는 localStorage만, 로그인 후에는 자동으로 서버 동기화
- 장점: 둘 다의 장점 활용
- 단점: 동기화 충돌 시나리오 처리 필요

**영향**: Case 1에서 "저장하지 않고 그냥 나갔다가 돌아온 경우" 데이터 보존 여부 결정

---

### 3. Magic Link 생성 시점

**질문**: Magic Link가 생성되는 시점이 언제인가?

#### 옵션 A: "지원서 작성 시작" 버튼 누르는 순간 → 이메일 입력 → Magic Link 발송
- 장점: 즉시 서버에 지원서 생성, 추적 가능
- 단점: 이메일 입력이 진입 장벽이 될 수 있음

#### 옵션 B: 어느 정도 작성 후 "저장하기" 버튼 클릭 → 이메일 입력 → Magic Link 발송
- 장점: 지원자가 작성 시작은 자유롭게, 필요할 때만 이메일 입력
- 단점: "저장하기" 버튼 클릭 전까지는 서버에 데이터 없음

#### 옵션 C: 제출 시에만 이메일 입력 (그 전까지는 로컬만)
- 장점: 진입 장벽 최소화
- 단점: 임시 저장 기능의 의미가 없어짐

**영향**: Case 4(여러 포지션 동시 지원)에서 "같은 이메일로 여러 지원서를 구분"하는 방법 결정

---

### 4. 링크 만료 후 동작

**질문**: "14일 유효"가 정확히 의미하는 것은?

#### 옵션 A: 링크 자체가 14일 후 만료 → 재발송 필요
- 장점: 보안성 높음, 구현 단순
- 단점: 링크 만료 후 재접속하려면 이메일 재발송 필요

#### 옵션 B: 링크는 만료되지만 세션은 14일간 유지 (브라우저 쿠키)
- 장점: 한 번 접속 후에는 링크 없이도 접속 가능
- 단점: 쿠키 삭제 시 재인증 필요

#### 옵션 C: 지원서 수정 가능 기간이 14일 (제출 전까지)
- 장점: 지원자 입장에서 명확
- 단점: 미제출 지원서가 DB에 오래 남음

**영향**: Case 5(링크 만료)와 Case 6(브라우저 동시 사용)의 시나리오 결정

---

## 제리의 추천 아키텍처 (B2B SaaS 실무 기준)

### 전체 플로우

```
[지원자 행동 플로우]

1. 지원서 작성 페이지 접속 (position_id 포함 URL)
   ↓
2. localStorage에 자동 저장 (1분마다 또는 입력 시마다)
   ↓
3. "저장하고 나중에 계속하기" 버튼 클릭 (또는 일정 시간 경과 시 프롬프트)
   ↓
4. 이메일 입력 모달 표시 → 이메일 입력 → Magic Link 발송
   ↓
5. Magic Link 클릭 → 서버에 지원서 저장 + 세션 생성 (쿠키, 14일 유효)
   ↓
6. 이후 방문 시: 쿠키로 자동 인증 → 서버에서 지원서 불러오기
   ↓
7. "제출" 버튼 클릭 → 최종 제출 (이후 수정 불가)
```

### 핵심 원칙

1. **제출 전**: localStorage + 서버 동기화 병행
2. **제출 후**: 서버만 (수정 불가)
3. **세션**: 쿠키 기반, 14일 유효
4. **지원서 ID**: `position_id + email + created_at`으로 고유 식별

---

## 추천 사항에 대한 상세 설명

### 1. 인증 토큰: 쿠키 기반 (14일 유효) ✅

**선택 이유:**
- 다른 디바이스에서도 Magic Link 클릭으로 세션 생성 가능
- 브라우저 닫아도 세션 유지
- 보안: HttpOnly, Secure, SameSite 플래그 사용

**구현:**
```
쿠키 이름: application_session
유효기간: 14일
속성: HttpOnly, Secure, SameSite=Lax
내용: 암호화된 토큰 (application_id + user_email + timestamp)
```

---

### 2. 로컬 저장: Hybrid (localStorage + 서버 동기화) ✅

**선택 이유:**
- 지원자가 이메일 입력 전에도 데이터 보존 (UX 최고)
- Magic Link 인증 후 서버 동기화 (데이터 안전성)

**구현 시나리오:**

**시나리오 A: 이메일 입력 없이 나갔다가 돌아옴**
- localStorage에서 데이터 복원
- "이메일로 저장하시겠어요?" 프롬프트

**시나리오 B: Magic Link로 돌아옴**
- 서버에서 데이터 불러옴
- localStorage와 서버 데이터 비교:
  - 서버 데이터가 더 최신: 서버 데이터 사용
  - localStorage가 더 최신: "저장되지 않은 변경사항이 있습니다. 복원할까요?"

---

### 3. Magic Link 생성: "저장하기" 버튼 클릭 시 ✅

**선택 이유:**
- 진입 장벽 최소화 (이메일 입력 강제 안 함)
- 지원자가 원할 때 서버 저장 (명시적 의도)

**UX 플로우:**

1. 지원서 작성 페이지 접속 → localStorage 자동 저장 시작
2. 상단에 "💾 자동 저장 중" 표시
3. 일정 시간(예: 5분) 후 또는 페이지 나가려 할 때:
   ```
   📧 다른 기기에서도 계속 작성하시겠어요?

   이메일을 입력하시면 PC, 모바일 어디서든 이어서 작성할 수 있어요.

   [이메일 입력하고 저장하기] [나중에]
   ```

4. "이메일 입력하고 저장하기" 클릭 → 이메일 입력 → Magic Link 발송

---

### 4. 링크 만료: Hybrid (링크 14일 + 쿠키 세션 14일) ✅

**선택 이유:**
- Magic Link는 14일 후 만료 (보안)
- 하지만 한 번 접속하면 쿠키로 14일간 자동 인증 (편의성)

**시나리오:**

**케이스 1: Magic Link로 접속 (첫 접속)**
- Magic Link 클릭 → 토큰 검증 (14일 이내?) → 세션 생성 (쿠키)

**케이스 2: 쿠키로 재접속 (이미 접속한 적 있음)**
- URL 직접 접속 → 쿠키 확인 → 자동 인증

**케이스 3: 링크 만료 후**
- Magic Link 클릭 → "링크가 만료되었습니다. 새 링크를 받으시겠어요?" → 이메일 재발송

**케이스 4: 쿠키 만료 후**
- URL 접속 → 쿠키 없음 → "이메일을 입력하시면 지원서를 불러올 수 있어요"

---

## 데이터 모델

### Application (지원서)

```
id: UUID (Primary Key)
position_id: 포지션 ID (Foreign Key)
email: 지원자 이메일
status: enum ['draft', 'submitted']
form_data: JSON (지원서 내용)
created_at: 생성 일시
updated_at: 수정 일시
submitted_at: 제출 일시 (nullable)
magic_link_token: 암호화된 토큰 (nullable)
magic_link_expires_at: 링크 만료 일시 (nullable)
```

### MagicLinkToken (토큰 관리)

```
token: 암호화된 토큰 (Primary Key)
application_id: UUID (Foreign Key)
email: 지원자 이메일
created_at: 생성 일시
expires_at: 만료 일시 (created_at + 14일)
used_at: 사용 일시 (nullable)
```

---

## API 엔드포인트

### 1. 지원서 생성/업데이트 (임시 저장)

```
POST /api/applications/save
Request:
{
  "position_id": "uuid",
  "email": "user@example.com" (optional, 첫 저장 시 필수),
  "form_data": { ... }
}

Response:
{
  "application_id": "uuid",
  "magic_link": "https://example.com/applications/resume?token=...",
  "expires_at": "2025-11-03T12:00:00Z"
}
```

### 2. Magic Link 재발송

```
POST /api/applications/resend-magic-link
Request:
{
  "application_id": "uuid",
  "email": "user@example.com"
}

Response:
{
  "magic_link": "https://example.com/applications/resume?token=...",
  "expires_at": "2025-11-03T12:00:00Z"
}
```

### 3. Magic Link로 지원서 불러오기

```
GET /api/applications/resume?token=xxx
Response:
{
  "application_id": "uuid",
  "position_id": "uuid",
  "form_data": { ... },
  "session_token": "xxx" (쿠키로도 설정됨)
}
```

### 4. 지원서 제출

```
POST /api/applications/{id}/submit
Request:
{
  "form_data": { ... }
}

Response:
{
  "status": "submitted",
  "submitted_at": "2025-10-20T12:00:00Z"
}
```

---

## 보안 고려사항

### 1. Magic Link 토큰 생성

```
토큰 = HMAC-SHA256(application_id + email + secret_key + timestamp)
```

- 추측 불가능한 토큰
- 타임스탬프로 만료 검증

### 2. 쿠키 보안

```
HttpOnly: JavaScript에서 접근 불가 (XSS 방지)
Secure: HTTPS에서만 전송
SameSite=Lax: CSRF 방지
```

### 3. Rate Limiting

- Magic Link 재발송: 동일 이메일 기준 5분당 3회 제한
- API 호출: IP 기준 분당 60회 제한

---

## Edge Cases 처리

### 1. 같은 이메일로 같은 포지션에 여러 지원서

**문제**: 지원자가 실수로 또는 의도적으로 같은 포지션에 여러 번 지원 시도

**해결**:
```
같은 email + position_id 조합으로 draft 상태 지원서가 이미 있으면:
- 기존 지원서 업데이트
- 새 Magic Link 발송
```

### 2. localStorage와 서버 데이터 충돌

**문제**: localStorage에 최신 데이터가 있는데 서버에서 이전 데이터 불러옴

**해결**:
```
서버 데이터와 localStorage 데이터의 updated_at 비교:
- 서버가 최신: 서버 데이터 사용
- localStorage가 최신:
  "로컬에 저장되지 않은 변경사항이 있습니다.
   [로컬 데이터 사용] [서버 데이터 사용]"
```

### 3. 제출 후 Magic Link로 재접속

**문제**: 지원자가 제출 후 Magic Link로 다시 접속

**해결**:
```
status === 'submitted' 확인:
- 읽기 전용 모드로 표시
- "이미 제출된 지원서입니다. 수정이 필요하시면 채용 담당자에게 연락해주세요."
```

---

## 다음 단계

이 아키텍처를 기반으로 다음 작업 진행:

1. **유저 스토리 작성**: 6가지 케이스별 상세 시나리오
2. **프로토타입 설계**: Figma 또는 와이어프레임
3. **기술 스펙 문서**: 개발팀 전달용 상세 스펙
4. **테스트 계획**: Beta 테스트 시나리오 및 성공 지표

---

## 질문 및 확인 사항

**이 아키텍처 제안에 동의하시나요?**

- 동의하면: 바로 유저 스토리 작성 시작
- 수정 필요하면: 어떤 부분을 다르게 할지 논의

**특히 확인하고 싶은 부분:**
- localStorage + 서버 동기화 방식이 너무 복잡한가?
- "저장하기" 버튼 클릭 시 Magic Link 발송이 적절한가?
- 쿠키 14일 유효기간이 적절한가?
