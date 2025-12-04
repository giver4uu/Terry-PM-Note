# 지원자 Magic Link 인증 기능

**Initiative 시작일**: 2025-10-20
**현재 상태**: 아키텍처 설계 단계
**목표**: 지원자가 지원서 작성 중 저장하고 제출 전 수정할 수 있는 기능 구현

---

## 📋 Overview

### 문제 정의

현재 채용 시스템에서 지원자들이 겪는 주요 문제:
- 지원서 작성 중 브라우저 종료 시 데이터 소실
- 제출 후 수정 불가
- 모바일 ↔ PC 간 전환 불가
- "제출하면 끝"이라는 압박감으로 지원 시작 지연

### 목표

지원자가:
- ✅ 지원서 작성 중 언제든 저장 가능
- ✅ 제출 전까지 언제든 수정 가능
- ✅ 여러 디바이스에서 작성 가능
- ✅ 간편한 인증으로 재접속 가능

### 성공 지표

- 지원서 작성 완료율: 현재 → +5-10%p 증가 목표
- 지원자 support 문의: 인증 관련 문의 월 5-10건 이하
- 프리미엄 지원자 이탈률 감소

---

## 🎯 최종 결정: Magic Link 방식

### 선택 이유

1. **업계 Best Practice**: Typeform, Notion, Slack, Medium 사용
2. **실무 검증**: Support 문의 1/10 수준 (보리 인터뷰)
3. **법적 안전성**: 공정채용법 문제 없음 (이메일만 수집)
4. **UX 우수**: 모든 지원자 세그먼트에서 효과적
5. **비용 효율**: SMS 비용 제로, 구현 간단

### 거부된 대안

- ❌ **소셜 로그인** (Google, LinkedIn, Kakao)
  - 공정채용법 위반 가능성 (프로필 사진 수집)
  - 재직자 이직 노출 위험
  - 플랫폼 의존성, 중복 계정 관리 복잡

- ❌ **이메일 코드 (6자리)**
  - 코드 만료 문제
  - 스팸함 문제 심각
  - Support 문의 폭증 (월 50-100건)

- ❌ **SMS 인증**
  - 개인정보보호법 리스크
  - 외국인 지원자 배제
  - 비용 부담 (연간 90만~500만원)

---

## 📁 문서 구조

```
initiatives/candidate-magiclink/
├── README.md (이 파일)
├── user-interviews/
│   ├── 01-borry-initial-interview.md (보리 초기 인터뷰)
│   └── 02-borry-authentication-comparison.md (인증 방식 비교)
├── assumptions/
│   └── 01-jerry-critical-analysis.md (제리의 소셜 로그인 비판적 분석)
├── solutions/
│   └── 01-architecture-proposal.md (Magic Link 아키텍처 제안)
├── prd/ (예정)
├── product-analytics/ (예정)
├── opportunities/ (예정)
└── tasks/ (예정)
```

---

## 🏗️ 아키텍처 개요

### 핵심 플로우

```
1. 지원서 작성 페이지 접속
   ↓
2. localStorage에 자동 저장 (1분마다)
   ↓
3. "저장하고 나중에 계속하기" 클릭
   ↓
4. 이메일 입력 → Magic Link 발송
   ↓
5. Magic Link 클릭 → 서버 저장 + 세션 생성 (쿠키, 14일)
   ↓
6. 이후 방문: 쿠키로 자동 인증 → 서버에서 불러오기
   ↓
7. "제출" 버튼 → 최종 제출 (수정 불가)
```

### 핵심 원칙

- **제출 전**: localStorage + 서버 동기화 병행
- **제출 후**: 서버만, 수정 불가
- **세션**: 쿠키 기반, 14일 유효
- **지원서 ID**: `position_id + email + created_at`

### 기술 스펙

- **인증**: Magic Link (이메일 토큰)
- **토큰 유효기간**: 1시간 (1회 사용 후 무효화)
- **세션 관리**: HttpOnly 쿠키, 14일
- **로컬 저장**: localStorage 자동 저장
- **보안**: HMAC-SHA256 토큰, 1회용 토큰, Rate Limiting
- **제출 확인**: Magic Link 방식 (아키텍처 일관성)

자세한 내용: [solutions/01-architecture-proposal.md](solutions/01-architecture-proposal.md)

---

## 💡 핵심 인사이트

### 보리 인터뷰 (HR 실무 전문가)

**문제의 심각성:**
> "작년에 개발자 채용할 때 정말 우수한 분이 지원을 3번이나 시도하다가 포기한 적이 있어요. 매번 작성하다가 회의 들어가서 날아갔다고 하시더라고요. 그 분 결국 경쟁사로 가셨어요."

**Magic Link 평가:**
> "제리님 제안, 실무자 입장에서 평가하면 이게 제일 현실적이에요. Typeform 사용 시 Support 문의가 6자리 코드 방식 대비 1/10 수준이었어요."

**지원 완료율 데이터:**
- 지원서 양식 간소화: 35% → 58% (+23%p)
- 임시 저장 기능 추가: 58% → 62% (+4%p)

자세한 내용:
- [user-interviews/01-borry-initial-interview.md](user-interviews/01-borry-initial-interview.md)
- [user-interviews/02-borry-authentication-comparison.md](user-interviews/02-borry-authentication-comparison.md)

### 제리 분석 (Senior PM)

**소셜 로그인의 치명적 문제:**
1. **공정채용법 위반 가능성** - 프로필 사진 자동 수집
2. **재직자 이직 노출** - LinkedIn "프로필 조회 알림"
3. **플랫폼 의존성** - API 정책 변경 리스크
4. **중복 계정 관리** - 같은 사람 여러 계정으로 지원

**Magic Link 장점:**
- ✅ 개인정보 최소 수집 (이메일만)
- ✅ 법적 컴플라이언스 쉬움
- ✅ 비용 제로
- ✅ Support 부담 최소
- ✅ 업계 표준 (Typeform, Notion, Slack)

자세한 내용: [assumptions/01-jerry-critical-analysis.md](assumptions/01-jerry-critical-analysis.md)

### 베리 분석 (CTO)

**기술 검토 결과 및 개선사항:**

1. **토큰 보안 강화**
   - ❌ 기존: 14일 재사용 가능 → 링크 공유 시 보안 취약
   - ✅ 개선: 1시간 유효, 1회 사용 후 무효화

2. **아키텍처 일관성 개선**
   - ❌ 기존: 저장은 Magic Link, 제출은 6자리 코드
   - ✅ 개선: 모든 인증을 Magic Link로 통일

3. **기술 부채 최소화**
   - 1회용 토큰으로 재사용 추적 로직 불필요
   - 이메일 발송 시스템 단순화 (Magic Link 하나로 통일)
   - 제출 시 모달 UI 제거 (UX 단순화)

**예상 개발 공수:** 2-3개월 (복잡도 고려)

자세한 내용: 베리 기술 검토 (2025-10-22)

---

## 📊 시나리오별 평가

| 시나리오 | 최적 방식 | 이유 |
|---------|----------|------|
| **직장인 이직 준비자** | Magic Link | 회사-집 전환 시 스트레스 없음 |
| **신입 (대학생)** | Magic Link | Notion/Slack 경험으로 익숙 |
| **외국인 지원자** | Magic Link | SMS 불가, 링크는 언어 무관 |
| **시니어 (40-50대)** | Magic Link | Zoom 링크와 동일한 패턴 |

---

## ✅ 구현 체크리스트

### Phase 1: MVP

- [ ] 아키텍처 설계 완료
- [ ] 유저 스토리 작성 (6개 케이스)
- [ ] API 스펙 문서
- [ ] 프로토타입 디자인
- [ ] 이메일 템플릿 작성
- [ ] SPF, DKIM, DMARC 설정
- [ ] Rate Limiting 구현
- [ ] localStorage 자동 저장
- [ ] Magic Link 생성/검증
- [ ] 쿠키 세션 관리
- [ ] "저장하기" 버튼 UX
- [ ] 링크 만료 처리
- [ ] 서버-로컬 동기화 로직

### Phase 2: Beta 테스트

- [ ] 10-20명 실제 지원자 테스트
- [ ] "이메일 안 왔어요" 문의율 측정 (목표: 5% 이하)
- [ ] 지원 완료율 측정
- [ ] Support 문의 모니터링
- [ ] 사용자 피드백 수집

### Phase 3: 정식 출시

- [ ] 전체 포지션 적용
- [ ] 모니터링 대시보드
- [ ] 성공 지표 측정
- [ ] 개선 사항 백로그

---

## 🚀 다음 단계

### 즉시 진행
1. **유저 스토리 작성** (제리)
   - Case 1: Happy Path
   - Case 2: 직장인 이직 준비자
   - Case 3: 모바일 ↔ PC 전환
   - Case 4: 여러 포지션 동시 지원
   - Case 5: Error Cases
   - Case 6: Edge Cases

2. **경쟁사 벤치마크**
   - Greenhouse, Lever, Workable
   - 사람인, 잡코리아, 원티드
   - Typeform "Save & Continue Later" 기능 분석

### 이후 진행
3. **법무 자문** (공정채용법, 개인정보보호법)
4. **프로토타입 디자인** (Figma)
5. **기술 스펙 문서** (개발팀 전달)
6. **테스트 계획** (Beta 테스트 시나리오)

---

## 📞 연락처

- **PM**: 제리 (전략/아키텍처)
- **HR Advisor**: 보리 (실무 검증)
- **Initiative Owner**: Terry

---

## 📝 변경 이력

| 날짜 | 내용 | 작성자 |
|-----|------|--------|
| 2025-10-20 | Initiative 시작, 초기 리서치 | Terry |
| 2025-10-20 | 보리 인터뷰 (소셜 로그인 제안) | 보리 |
| 2025-10-20 | 제리 분석 (소셜 로그인 문제점) | 제리 |
| 2025-10-20 | 보리 재인터뷰 (Magic Link 검증) | 보리 |
| 2025-10-20 | Magic Link 방식 최종 결정 | Terry |
| 2025-10-20 | 아키텍처 제안 작성 | 제리 |
| 2025-10-22 | 베리 기술 검토 및 보안 정책 수정 | 베리 |
| 2025-10-22 | 토큰 정책 변경 (14일 재사용 → 1시간 1회용) | Terry |
| 2025-10-22 | 제출 방식 통일 (6자리 코드 → Magic Link) | Terry |

---

## 🔗 관련 문서

- [아키텍처 제안서](solutions/01-architecture-proposal.md)
- [보리 초기 인터뷰](user-interviews/01-borry-initial-interview.md)
- [인증 방식 비교](user-interviews/02-borry-authentication-comparison.md)
- [제리 비판적 분석](assumptions/01-jerry-critical-analysis.md)
