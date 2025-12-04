# Change Log

**온톨로지 버전 관리 문서**
**최종 업데이트:** 2025-11-25

---

## 버전 체계 (Versioning Scheme)

이 온톨로지는 **Semantic Versioning (SemVer)** 을 따릅니다: `MAJOR.MINOR.PATCH`

- **MAJOR** (X.0.0): 기존 개념 삭제, 호환성 깨지는 변경
  - 예: Competency 개념 삭제, 관계 구조 근본적 변경
  - 영향: 기존 데이터 마이그레이션 필수

- **MINOR** (0.X.0): 새 개념/관계 추가, 기존 구조 유지
  - 예: Interview Question 개념 추가, 새로운 관계 타입 도입
  - 영향: 기존 데이터 그대로 유지, 새 기능 추가

- **PATCH** (0.0.X): 정의 명확화, 예시 추가, 오타 수정
  - 예: 개념 설명 개선, 실제 사례 추가
  - 영향: 문서 품질 향상, 기능 변경 없음

---

## [v0.1.0] - 2025-11-25

### 🎉 초기 릴리즈

**릴리즈 목표:** 온톨로지 기초 구조 수립 및 Week 1 산출물 완성

**상태:** Development (개발 중)
**작성자:** Terry
**검토자:** 대기 중 (Borry 검토 예정)

---

### ✨ Added (추가)

#### 폴더 구조
- ✅ `01-specification/` - 명세 단계 폴더 생성
- ✅ `02-conceptualization/` - 개념화 단계 폴더 생성
  - `concepts/` - 개별 개념 정의 폴더
  - `relationships/` - 관계 정의 폴더
  - `design-patterns/` - 디자인 패턴 폴더
- ✅ `03-implementation/` - 구현 단계 폴더 생성
  - `standards/` - 산업 표준 매핑 폴더
  - `schemas/` - JSON 스키마 폴더
  - `examples/` - 실제 예시 폴더
- ✅ `04-validation/` - 검증 단계 폴더 생성
  - `pilot-results/` - 파일럿 테스트 결과 폴더
- ✅ `05-evolution/` - 진화 단계 폴더 생성
- ✅ `mapping/` - 문제-개념 매핑 폴더 생성

#### 핵심 문서 (Critical Files)
- ✅ `README.md` - 온톨로지 전체 개요, Quick Start, 협업 가이드
- ✅ `01-specification/competency-questions.md` - 16개 Competency Questions (Problem 01-02)
  - High priority CQs: 15개 (V1 범위)
  - Medium priority CQs: 1개 (V2 이후)
- ✅ `02-conceptualization/concepts/_template.md` - 15개 섹션 개념 문서 템플릿
- ✅ `mapping/problem-01-skill-standardization.md` - Problem 01 매핑 문서
- ✅ `05-evolution/change-log.md` - 이 문서

#### 설계 원칙 확립
- ✅ **증거 기반 (Evidence-Based)**: 모든 개념은 인터뷰에서 발견된 문제 기반
- ✅ **문제 중심 (Problem-Driven)**: 기술보다 고객 문제 해결에 집중
- ✅ **Core 표준 + Shell 유연**: Competency 정의는 표준화, Position별 선택은 유연하게
- ✅ **점진적 진화 (Iterative Evolution)**: v0.1 → v0.2 → v1.0 단계적 발전

#### V1 범위 결정
- ✅ **직무군**: Backend Engineer, Frontend Engineer, Product Manager (3개)
- ✅ **핵심 개념**: 7개 (Job Family, Job Function, Position, Competency, Proficiency Level, Job Level, Evaluation Rubric)
- ✅ **해결 문제**: Problem 01 (스킬 표준화), Problem 02 (평가 일관성)
- ✅ **산업 표준 참조**: O*NET, SFIA, LinkedIn Skills

---

### 📝 Documentation (문서화)

- ✅ README.md에 Quick Start 가이드 추가
  - 5분 안에 시작하기 (Borry용, 기여자용)
  - 폴더 구조 설명
  - 협업 가이드 (Borry, Berry, Jerry 역할 명시)

- ✅ Competency Questions 문서 상세화
  - 5가지 CQ 타입 정의 (Scoping, Foundational, Relationship, Validating, Metaproperty)
  - Problem 01: 10개 CQs
  - Problem 02: 6개 CQs
  - 우선순위 매트릭스 (High 15개, Medium 8개, Low 3개)

- ✅ 개념 템플릿 15개 섹션 완성
  - 메타데이터, 정의, 관계, 속성, 실제 사례, CQs, 검증 기준, 디자인 패턴, 산업 표준 매핑, 변경 이력, 미해결 질문, 참고 자료, 검토 의견, 다음 단계, 작성 가이드

- ✅ Problem 01 매핑 문서 완성
  - Before/After 작업 흐름 비교
  - 기술 구현 예시 (JSON 구조)
  - 성공 지표 매핑
  - 파일럿 테스트 시나리오
  - 우선순위 로드맵 (Phase 1-4)

---

### 🎯 Goals (목표)

**v0.1.0 목표:**
- [x] 온톨로지 폴더 구조 수립
- [x] 핵심 문서 5개 작성 (README, CQ, Template, Problem 01 Mapping, Change Log)
- [ ] Borry와 킥오프 미팅 (온톨로지 소개) - Week 1 예정
- [ ] 설계 원칙 검증 (Borry 피드백) - Week 1 예정

**다음 마일스톤 (v0.2.0):**
- [ ] 7개 핵심 개념 정의 완료 (Validated 상태)
- [ ] 3개 직무군 실제 예시 완성
- [ ] 파일럿 테스트 완료 (Borry 사용성 검증)
- [ ] 파일럿 피드백 반영

---

### 📊 Statistics (통계)

**문서 수:**
- Total: 5개 핵심 문서
- Specification: 1개 (competency-questions.md)
- Conceptualization: 1개 (_template.md)
- Mapping: 1개 (problem-01-skill-standardization.md)
- Evolution: 1개 (change-log.md)
- Root: 1개 (README.md)

**Competency Questions:**
- Total: 16개
- High Priority (V1): 15개
- Medium Priority (V2): 1개
- Problem 01: 10개
- Problem 02: 6개

**개념 정의:**
- 계획됨: 7개 (v0.2.0에서 작성 예정)
- 완성됨: 0개

**검증 상태:**
- Validated: 0개
- Under Review: 0개
- Draft: 5개 (핵심 문서)
- Pending: 7개 (개념)

---

### 🔜 Next Steps (다음 단계)

**즉시 (Week 1 남은 작업):**
- [ ] 각 폴더 README.md 작성 (역할 설명)
  - `01-specification/README.md`
  - `02-conceptualization/README.md`
  - `03-implementation/README.md`
  - `04-validation/README.md`
  - `05-evolution/README.md`
  - `mapping/README.md`
- [ ] Borry와 킥오프 미팅 일정 잡기
- [ ] Competency Questions 15개 Borry와 검토

**Week 2-3 (개념 정의):**
- [ ] Job Function 개념 작성 (Backend, Frontend, PM)
- [ ] Competency 개념 작성 (Technical, Behavioral, Business)
- [ ] Proficiency Level 개념 작성 (4단계)
- [ ] Job Level 개념 작성 (Junior, Mid, Senior, Staff)
- [ ] Position 개념 작성
- [ ] Evaluation Rubric 개념 작성

---

## 버전 히스토리 (Version History)

| 버전 | 날짜 | 주요 변경사항 | 작성자 | 상태 |
|------|------|-------------|--------|------|
| **v0.1.0** | 2025-11-25 | 초기 릴리즈, 폴더 구조 및 5개 핵심 문서 | Terry | Development |
| v0.2.0 | 2025-12-09 (예정) | 7개 핵심 개념 + 파일럿 피드백 반영 | Terry | Planned |
| v0.3.0 | 2025-12-23 (예정) | Problem 03, 04 개념 추가 | Terry | Planned |
| v1.0.0 | 2026-02-25 (예정) | Production-ready, 3개 팀 사용 | Terry | Planned |

---

## 변경 승인 프로세스 (Change Approval Process)

### MAJOR 버전 변경 (1.0.0 → 2.0.0)
**필수 승인자:**
- ✅ Borry (HR 전문가) - 비즈니스 영향 검토
- ✅ Berry (CTO) - 기술적 타당성 검토
- ✅ Jerry (PM) - 전략적 방향 검토

**프로세스:**
1. RFC (Request for Comments) 문서 작성
2. 모든 Stakeholder에게 공유 (최소 2주 검토 기간)
3. Migration Guide 작성
4. Deprecated 버전 6개월 병행 유지

### MINOR 버전 변경 (1.0.0 → 1.1.0)
**필수 승인자:**
- ✅ Borry (HR 전문가) - 새 개념이 HR 현실과 일치하는지 검토

**프로세스:**
1. 새 개념/관계 문서 작성 (Draft 상태)
2. Borry 검토 및 피드백 반영
3. Validated 상태로 변경 후 Change Log 업데이트

### PATCH 버전 변경 (1.0.0 → 1.0.1)
**필수 승인자:**
- Terry (자체 검토)

**프로세스:**
1. 간단한 수정 사항 반영
2. Change Log에 기록
3. 즉시 릴리즈

---

## 하위 호환성 정책 (Backward Compatibility Policy)

### 원칙
- **MINOR, PATCH 버전은 반드시 하위 호환**
- **MAJOR 버전은 Migration Guide 필수 제공**

### 호환성 체크리스트

**MINOR 버전 릴리즈 전:**
- [ ] 기존 CQ가 여전히 답변 가능한가?
- [ ] 기존 Position 데이터가 새 스키마에서 작동하는가?
- [ ] Borry의 기존 워크플로우가 깨지지 않는가?

**MAJOR 버전 릴리즈 전:**
- [ ] Migration Guide 작성 완료
- [ ] 기존 데이터 마이그레이션 스크립트 준비
- [ ] Deprecated 버전 병행 운영 계획 (최소 6개월)
- [ ] 모든 Stakeholder 승인 완료

---

## 참고 자료 (References)

### 내부 문서
- [Ontology README](../README.md)
- [Versioning Strategy](./versioning.md)
- [Improvement Backlog](./improvement-backlog.md)

### 외부 표준
- [Semantic Versioning 2.0.0](https://semver.org/)

---

*이 Change Log는 온톨로지의 모든 변경사항을 추적합니다.
모든 개념 문서의 "변경 이력" 섹션은 이 문서의 요약본이어야 합니다.*
