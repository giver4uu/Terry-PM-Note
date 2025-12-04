# Phase 2: Conceptualization (개념화)

**목적:** 온톨로지의 개념과 관계를 설계

이 폴더는 HR 도메인의 **핵심 개념과 그들 간의 관계**를 정의합니다.

## 📁 하위 폴더

### `concepts/`
개별 개념 정의 문서들

**V1 목표 (7개 개념):**
- Job Family (C-001)
- Job Function (C-002)
- Position (C-003)
- Competency (C-004)
- Proficiency Level (C-005)
- Job Level (C-006)
- Evaluation Rubric (C-007)

**템플릿:** `_template.md` (15개 섹션)

### `relationships/`
개념 간 관계 정의

**V1 목표 (2개 관계):**
- Position requires Competency at Proficiency Level (R-001)
- Competency assessedBy Evaluation Rubric (R-002)

### `design-patterns/`
온톨로지 디자인 패턴 적용

**적용할 패턴:**
- Hierarchy Pattern (스킬 계층 구조)
- Part-Whole Pattern (역량-스킬 관계)
- Descriptive Pattern (루브릭 정의)

## 🎯 핵심 원칙

**Core 표준 + Shell 유연:**
- **Core (표준화)**: Competency 정의, Proficiency Level 정의, Rubric 구조
- **Shell (유연성)**: Position별 Competency 선택, 레벨 요구사항

## ✅ 완료 기준

- [ ] 7개 핵심 개념 정의 완료 (Validated 상태)
- [ ] 각 개념이 최소 2개 실제 사례, 3개 CQ 포함
- [ ] Borry가 모든 개념 이해 가능 (이해도 ≥ 4/5)

**이전 단계:** `01-specification/` (명세)
**다음 단계:** `03-implementation/` (구현)
