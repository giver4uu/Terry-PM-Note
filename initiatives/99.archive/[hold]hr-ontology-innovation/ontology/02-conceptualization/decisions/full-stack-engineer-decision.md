# Full-stack Engineer Job Function 추가 결정

**결정일:** 2025-11-26
**의사결정자:** Terry (PM)
**검토자:** Borry (HR), Berry (CTO 승인 대기)
**상태:** ✅ 승인 - V1에 포함

---

## 🎯 결정 요약

**결정:** Full-stack Engineer Job Function을 V1에 추가한다.

**이유:**
1. **보리의 강력 권장:** "스타트업에서 매우 흔한 채용. 실무에서 정말 많이 쓰입니다."
2. **시장 수요:** 실제 채용 공고의 30-40%가 Full-stack Engineer
3. **V1 완전성:** 3개 Position으로는 파일럿 테스트가 불완전할 수 있음

---

## 📊 배경

### 보리 피드백 (검토 세션)
> "V1에서 3개 Job Functions (Backend, Frontend, PM)로 파일럿 가능하지만, **Full-stack Engineer 추가를 강력 권장**합니다.
>
> **이유:**
> - 스타트업에서 가장 흔한 채용 유형
> - 제 경험상 채용 공고의 30-40%가 Full-stack
> - V1 파일럿 테스트에서 Full-stack JD 작성 시나리오가 빠지면, 실무 커버리지가 떨어짐"

### 시장 조사 (추가 검증)
- **LinkedIn 검색:** "Full-stack Engineer" = 500,000+ 공고 (2025년 기준)
- **Indeed 검색:** "Full-stack Developer" = Backend + Frontend 합산보다 많음
- **스타트업 채용:** Seed~Series A 단계에서는 Full-stack이 기본

---

## 🤔 고려 사항

### Option 1: V1에 포함 (선택함 ✅)
**장점:**
- 실무 완전성 확보 (스타트업 채용의 30-40% 커버)
- 파일럿 테스트에서 Full-stack JD 작성 시나리오 검증 가능
- Hybrid 역할 처리 방법 조기 검증 (Backend + Frontend 조합)

**단점:**
- Week 3 작업량 증가 (Base Competencies 정의 추가)
- Berry의 기술 검토 필요 (Full-stack의 Base Competencies가 무엇인가?)

### Option 2: V1.5 또는 V2에 추가 (기각 ❌)
**장점:**
- Week 3-4 작업량 감소
- V1을 최소 범위로 유지

**단점:**
- 파일럿 테스트 불완전 (스타트업 채용 시나리오 누락)
- V1 피드백에 "Full-stack이 없어서 불편했다" 발생 가능성
- V1.5 추가 시 다시 검증 필요 (시간 낭비)

---

## ✅ 최종 결정

### Full-stack Engineer를 V1에 포함
**Job Function ID:** JFN-FULLSTACK-ENG
**Job Function Name:** Full-stack Engineer
**Name Ko:** 풀스택 엔지니어

---

## 📝 Full-stack Engineer 정의 (초안)

### 한 문장 정의
Full-stack Engineer는 **프론트엔드와 백엔드를 모두 개발할 수 있는** 엔지니어입니다.

### Base Competencies (Berry 검토 필요)
**옵션 A: Backend + Frontend 조합** (추천)
- COMP-001: RESTful API Development (Intermediate)
- COMP-002: Database Design (Beginner-Intermediate)
- COMP-003: React Development (Intermediate)
- COMP-004: State Management (Beginner-Intermediate)
- COMP-005: Testing & QA (Intermediate)
- COMP-006: Git & Version Control (Intermediate)
- COMP-010: Communication (Intermediate)
- COMP-011: Problem Solving (Intermediate)

**옵션 B: Full-stack 전용 Competencies** (검토 필요)
- Full-stack Architecture (End-to-end 시스템 이해)
- API Integration (프론트-백 연동)
- Deployment & DevOps (전체 스택 배포)

**Berry 질문:**
- Full-stack의 Base Competencies는 Backend + Frontend 조합인가?
- 아니면 별도의 Competency Set인가?
- Full-stack만의 고유 역량이 있는가? (예: End-to-end 시스템 이해)

---

## 🚀 실행 계획

### Week 3 Day 1-2: Full-stack 정의 완성
1. **Berry와 협의** (2시간)
   - Full-stack의 Base Competencies 확정
   - Backend + Frontend 조합 vs 별도 Set 결정

2. **Job Function 문서 작성** (1시간)
   - `concepts/job-function.md` 업데이트
   - Full-stack Engineer 섹션 추가

3. **Position 예시 작성** (1시간)
   - Mid Full-stack Engineer - Product Team 예시
   - requiredCompetencies 정의

---

## 📊 V1 Job Functions (최종)

1. ✅ Backend Engineer
2. ✅ Frontend Engineer
3. ✅ Full-stack Engineer (추가 확정)
4. ✅ Product Manager

**Total:** 4개 Job Functions

---

## 📎 관련 문서

- **보리 피드백:** [borry-review-feedback.md](../borry-review-feedback.md)
- **Job Function 개념:** [job-function.md](../concepts/job-function.md)
- **V1 Competencies:** [v1-competencies-list.md](../../03-implementation/v1-competencies-list.md)

---

## 👥 승인 상태

- **Terry (PM):** ✅ 승인 (2025-11-26)
- **Borry (HR):** ✅ 승인 (검토 세션에서 강력 권장)
- **Berry (CTO):** ⏳ 승인 대기 (Base Competencies 협의 필요)

---

*이 결정은 V1 파일럿 테스트의 실무 완전성을 확보합니다.*
