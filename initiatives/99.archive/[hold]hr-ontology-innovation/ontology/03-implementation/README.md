# Phase 3: Implementation (구현)

**목적:** 온톨로지를 실제 데이터와 표준으로 구현

이 폴더는 **산업 표준 매핑, 스키마, 실제 예시**를 포함합니다.

## 📁 하위 폴더

### `standards/`
산업 표준 참조 및 매핑

**포함 문서:**
- `onet-mapping.md`: O*NET 직업 코드 매핑 (법적 방어력)
- `sfia-levels.md`: SFIA 레벨 체계 적용 (프로피션시 레벨)
- `linkedin-skills.md`: LinkedIn 스킬 네이밍 검증 (시장 용어)

### `schemas/`
기술적 스키마 정의 (JSON, OWL 등)

**V1 목표:**
- `competency-schema.json`
- `position-schema.json`

### `examples/`
실제 사용 가능한 예시 (3개 직무군)

**V1 목표:**
- `backend-engineer-senior.md`: Senior Backend Engineer Position 정의
- `frontend-engineer-mid.md`: Mid Frontend Engineer Position 정의
- `product-manager-senior.md`: Senior Product Manager Position 정의

## 🎯 핵심 목표

**실제 사용 가능성 검증:**
- 보리가 이 예시로 즉시 JD 작성 가능
- 30분 이내 JD 초안 완성

## ✅ 완료 기준

- [ ] 3개 산업 표준 매핑 완료
- [ ] 3개 직무군 예시 완성 (각 10개 Competencies)
- [ ] 보리가 예시로 실제 JD 작성 성공

**이전 단계:** `02-conceptualization/` (개념화)
**다음 단계:** `04-validation/` (검증)
