# Phase 4: Validation (검증)

**목적:** 온톨로지가 실제로 문제를 해결하는지 검증

이 폴더는 **검증 프레임워크, 파일럿 테스트 결과, 사용성 테스트**를 포함합니다.

## 📁 포함 문서

- **`README.md`**: 검증 프레임워크 (이 문서)
- **`cq-validation.md`**: Competency Questions 검증 결과
- **`usability-testing.md`**: 사용성 테스트 계획
- **`pilot-results/`**: 파일럿 테스트 결과 폴더

## 🎯 검증 레이어

### Layer 1: 개념 수준 검증
- 완전성, 일관성, 명확성, 증거 연결 체크리스트
- Borry와 Berry 검토

### Layer 2: 관계 수준 검증
- 그래프 시각화, CQ 쿼리, Edge Case 테스트

### Layer 3: 워크플로우 검증
**Scenario 1: JD 작성 (Problem 01)**
- 목표: 2시간 → 30분
- 보리 실제 작성 시간 측정

**Scenario 2: 면접 평가 (Problem 02)**
- 목표: 평가 조율 1시간 → 15분
- Rubric 사용 전/후 비교

### Layer 4: 사용성 검증 (V1 핵심!)
**측정 지표:**
- 이해도 (Comprehensibility): ≥ 4/5
- 유용성 (Usefulness): ≥ 4/5
- 사용 의향 (Adoption Intent): Yes

## 📊 파일럿 테스트 계획

**참여자:** 보리 (HR 전문가)
**기간:** Week 6 (2시간 세션)
**시나리오:** Senior Frontend Engineer JD 작성
**방법:** Think-aloud + 사후 인터뷰

**성공 기준:**
- [ ] 작성 시간 ≤ 30분
- [ ] 이해도 ≥ 4/5
- [ ] 유용성 ≥ 4/5
- [ ] 사용 의향 = Yes
- [ ] 개선 제안 ≥ 5개 수집

## ✅ 완료 기준

- [ ] 파일럿 테스트 완료
- [ ] 모든 High priority CQ 검증 완료
- [ ] 사용성 지표 목표 달성
- [ ] 개선 액션 아이템 리스트 작성

**이전 단계:** `03-implementation/` (구현)
**다음 단계:** `05-evolution/` (진화 및 개선)
