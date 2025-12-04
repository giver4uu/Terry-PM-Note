# Team Context 관리 방법 결정

**결정일:** 2025-11-26
**의사결정자:** Terry (PM)
**검토자:** Borry (HR)
**상태:** ✅ 승인 - V1에서는 Position.name에 포함

---

## 🎯 결정 요약

**결정:** V1에서는 Position.name에 팀 정보를 포함하고, V2에서 Team Entity 분리를 검토한다.

**이유:**
1. **구현 단순성:** V1 파일럿은 빠른 검증이 목표
2. **보리 권장:** "V1에서는 name에 포함, V2에서 Team Entity 분리"
3. **변경 빈도 검증:** 파일럿 테스트에서 팀 구조 변경 빈도를 실제로 측정

---

## 📊 배경

### 문제 정의
Position 정의 시 팀 정보를 어떻게 관리할 것인가?
- 예: "Senior Backend Engineer - **Payments Team**"에서 "Payments Team" 부분

### 보리 피드백
> "팀 구조는 자주 바뀝니다 (3-6개월마다). Payments 팀이 Commerce 팀으로 이름 바뀌면, 모든 Position을 다 수정해야 하나요?
>
> **제 권장:**
> - V1에서는 name에 포함하되, V2에서 Team Entity 분리 준비를 해두세요.
> - 이유: V1은 빠른 검증이 목표. 복잡도를 높이면 채택률이 떨어집니다."

---

## 🤔 검토한 옵션

### Option A: Position.name에 포함 (✅ 선택)

**구조:**
```json
{
  "id": "POS-SENIOR-BE-PAYMENTS",
  "name": "Senior Backend Engineer - Payments Team",
  "nameKo": "시니어 백엔드 엔지니어 - 결제팀",
  "jobFunctionId": "JFN-BACKEND-ENG",
  "jobLevelId": "LVL-SENIOR",
  "teamContext": null  // V1에서는 사용 안 함
}
```

**장점:**
- ✅ 구현 매우 단순
- ✅ 이해하기 쉬움 (HR 담당자가 Position.name만 보면 됨)
- ✅ 기존 채용 공고 형식과 일치
- ✅ V1 파일럿 빠른 검증 가능

**단점:**
- ❌ 팀명 변경 시 모든 Position.name 수정 필요
- ❌ 팀 정보로 Position 검색/필터링 어려움
- ❌ 팀 구조 변경 시 데이터 정합성 유지 어려움

**완화 방안:**
- V1 파일럿에서 "팀 구조 변경 빈도"를 실제로 측정
- 3개월 내 팀명 변경이 2회 이상 발생하면 V2에서 Team Entity 분리
- V1에서는 Position 개수가 적어서 (파일럿 3-5개) 수동 수정 가능

---

### Option B: Position.teamContext 별도 속성 (❌ V2로 연기)

**구조:**
```json
{
  "id": "POS-SENIOR-BE-PAYMENTS",
  "name": "Senior Backend Engineer",  // 팀 정보 제외
  "nameKo": "시니어 백엔드 엔지니어",
  "jobFunctionId": "JFN-BACKEND-ENG",
  "jobLevelId": "LVL-SENIOR",
  "teamContext": "Payments Team"  // 별도 속성
}
```

**장점:**
- ✅ 팀명 변경 시 teamContext 속성만 수정
- ✅ 팀 정보로 Position 검색/필터링 용이
- ✅ 확장성 좋음 (V2에서 Team Entity로 쉽게 전환)

**단점:**
- ❌ 구현 복잡도 증가
- ❌ Position.name과 teamContext 동기화 문제
- ❌ HR 담당자가 두 필드를 모두 관리해야 함
- ❌ V1 파일럿 검증 속도 저하

**V2 채택 조건:**
- 파일럿 테스트에서 "팀 구조 변경이 빈번하다" 피드백 3회 이상
- Position 개수가 50개 이상으로 증가 (수동 수정 부담)

---

### Option C: Team Entity 분리 (❌ V2로 연기)

**구조:**
```json
{
  "team": {
    "id": "TEAM-PAYMENTS",
    "name": "Payments Team",
    "nameKo": "결제팀",
    "department": "Engineering"
  },
  "position": {
    "id": "POS-SENIOR-BE-PAYMENTS",
    "name": "Senior Backend Engineer",
    "jobFunctionId": "JFN-BACKEND-ENG",
    "jobLevelId": "LVL-SENIOR",
    "teamId": "TEAM-PAYMENTS"  // 외래 키
  }
}
```

**장점:**
- ✅ 팀 정보 중앙 관리 (단일 진실 공급원)
- ✅ 팀명 변경 시 Team Entity만 수정
- ✅ 팀별 통계, 팀 구조도 작성 용이
- ✅ 확장성 최고 (팀 속성 추가 가능: manager, members 등)

**단점:**
- ❌ 구현 복잡도 매우 높음
- ❌ V1 범위 초과 (7개 핵심 개념에 Team 추가 = 8개)
- ❌ HR 담당자 학습 곡선 증가
- ❌ 파일럿 검증 범위 확대 (리스크)

**V2 채택 조건:**
- V1 파일럿에서 "팀 정보 관리가 핵심 문제"라는 피드백
- Position 개수 100개 이상
- 팀 구조가 복잡 (다수의 하위 팀, 매트릭스 조직 등)

---

## ✅ 최종 결정

### V1: Option A 채택 (Position.name에 포함)

**적용 예시:**
```json
{
  "id": "POS-SENIOR-BE-PAYMENTS",
  "name": "Senior Backend Engineer - Payments Team",
  "nameKo": "시니어 백엔드 엔지니어 - 결제팀",
  "jobFunctionId": "JFN-BACKEND-ENG",
  "jobLevelId": "LVL-SENIOR",
  "requiredCompetencies": [...]
}
```

**Position 네이밍 규칙:**
- 영어: `{Job Level} {Job Function} - {Team Name}`
- 한국어: `{직급} {직무} - {팀명}`

**예시:**
- "Senior Backend Engineer - Payments Team" / "시니어 백엔드 엔지니어 - 결제팀"
- "Mid Frontend Engineer - Social Team" / "미드 프론트엔드 엔지니어 - 소셜팀"
- "Senior Product Manager - Growth Team" / "시니어 프로덕트 매니저 - 그로스팀"

---

## 🚀 실행 계획

### V1 파일럿 (Week 3-6)
1. **Position 예시 3개 작성** (Week 3-4)
   - name 필드에 팀 정보 포함
   - teamContext 속성은 null 또는 생략

2. **파일럿 테스트에서 측정** (Week 6)
   - 팀 구조 변경 빈도 실제로 측정
   - "팀 정보 관리가 불편하다" 피드백 수집
   - Position.name 수정이 실제로 부담인지 확인

3. **V2 결정 기준**
   - 팀명 변경 3회 이상 → Option B (teamContext 속성)
   - Position 50개 이상 → Option B
   - 팀 구조 복잡 → Option C (Team Entity)

### V2 확장 시나리오

**Scenario 1: Option B 채택 (팀명 변경 빈번)**
```json
{
  "name": "Senior Backend Engineer",
  "teamContext": "Payments Team"  // 별도 속성
}
```
- Migration: Position.name에서 팀 정보 추출 → teamContext로 이동
- 하위 호환성: name 필드는 유지 (표시용)

**Scenario 2: Option C 채택 (팀 구조 복잡)**
```json
{
  "team": {"id": "TEAM-PAYMENTS", "name": "Payments Team"},
  "position": {"teamId": "TEAM-PAYMENTS"}
}
```
- Migration: 모든 팀 정보 → Team Entity 생성
- Major Version (v2.0.0): 호환성 깨짐, Migration Guide 제공

---

## 📊 리스크 평가

### High Risk (완화 필요)
**리스크:** 팀명 변경 시 모든 Position 수정 필요
**발생 확률:** Medium (보리: "3-6개월마다 팀 구조 변경")
**영향도:** Medium (V1 파일럿은 3-5개 Position, 수동 수정 가능)
**완화 방안:**
- ✅ V1 파일럿에서 실제 빈도 측정
- ✅ Position 개수 제한 (최대 10개)
- ✅ V2 전환 기준 명확화

### Medium Risk
**리스크:** 팀 정보로 Position 검색 어려움
**발생 확률:** Low (V1에서는 검색 기능 미구현)
**영향도:** Low (파일럿은 수동 확인 가능)
**완화 방안:**
- V2에서 검색 기능 구현 시 teamContext 또는 Team Entity 도입

### Low Risk
**리스크:** V2 전환 시 Migration 비용
**발생 확률:** Medium (V2에서 Option B 또는 C 채택 가능성)
**영향도:** Low (명확한 Migration 규칙으로 자동화 가능)
**완화 방안:**
- V1에서 Position.name 네이밍 규칙 표준화
- 파싱 규칙: `{Level} {Function} - {Team}` → team 추출 가능

---

## 📝 Position.name 네이밍 가이드

### 필수 형식
```
{Job Level} {Job Function} - {Team Name}
```

### 예시
| Position ID | name | nameKo |
|-------------|------|--------|
| POS-SENIOR-BE-PAYMENTS | Senior Backend Engineer - Payments Team | 시니어 백엔드 엔지니어 - 결제팀 |
| POS-MID-FE-SOCIAL | Mid Frontend Engineer - Social Team | 미드 프론트엔드 엔지니어 - 소셜팀 |
| POS-SENIOR-PM-GROWTH | Senior Product Manager - Growth Team | 시니어 프로덕트 매니저 - 그로스팀 |
| POS-MID-FS-PRODUCT | Mid Full-stack Engineer - Product Team | 미드 풀스택 엔지니어 - 프로덕트팀 |

### 파싱 규칙 (V2 Migration 용)
```javascript
// V1 Position.name → V2 teamContext 추출
function parseTeamFromName(positionName) {
  // "Senior Backend Engineer - Payments Team" → "Payments Team"
  const parts = positionName.split(' - ');
  return parts.length > 1 ? parts[1] : null;
}
```

---

## 📎 관련 문서

- **보리 피드백:** [borry-review-feedback.md](../borry-review-feedback.md)
- **Position 개념:** [position.md](../concepts/position.md)
- **V1 완료 요약:** [week2-completion-summary.md](../../week2-completion-summary.md)

---

## 👥 승인 상태

- **Terry (PM):** ✅ 승인 (2025-11-26)
- **Borry (HR):** ✅ 승인 (검토 세션에서 권장)

---

## 🎯 다음 단계

### 즉시 실행
- [x] Position 예시 작성 시 name 필드에 팀 정보 포함
- [ ] Position.name 네이밍 규칙을 개념 문서에 반영

### Week 6 파일럿
- [ ] 팀 구조 변경 빈도 측정
- [ ] "팀 정보 관리 불편" 피드백 수집
- [ ] V2 전환 여부 결정

---

*이 결정은 V1 파일럿의 단순성과 빠른 검증을 우선시하며, V2 확장 경로를 명확히 합니다.*
