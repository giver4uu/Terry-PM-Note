# Product Requirements Document (PRD)

이 폴더는 이 initiative에 대한 제품 요구사항 및 명세를 포함합니다.

## 📝 생성할 파일

### [initiative-name]-prd.md
메인 제품 요구사항 문서

**사용법:** 구조화된 PRD를 생성하기 위해 `@guides/product/create-prd.mdc` 사용

**주요 섹션:**
- Problem Statement
- Solution Overview
- User Stories & Acceptance Criteria
- Technical Requirements
- Success Metrics
- Timeline & Milestones

### requirements-changelog.md
시간 경과에 따른 요구사항 변경 추적

**형식:**
```markdown
# Requirements Changelog

## [Date] - v1.2
### 추가됨
- [새로운 요구사항]

### 변경됨
- [수정된 요구사항]

### 제거됨
- [폐기된 요구사항]
```

### technical-specs/
상세한 기술 명세 및 아키텍처 결정

**포함:**
- API 명세
- Database schema 변경
- 통합 요구사항
- 성능 요구사항
- 보안 고려사항

## 🔄 PRD 생명주기

### 1. Draft 단계
- 요구사항을 알리기 위해 user research 사용
- 타당성에 대해 engineering과 협업
- Success metrics 명확하게 정의

### 2. Review 단계
- Stakeholder 검토 및 승인
- Engineering과 기술 검토
- 필요시 법무/컴플라이언스 검토

### 3. Approved 단계
- 개발을 위한 요구사항 확정
- 변경 관리 프로세스 수립
- 정기 검토 체크포인트 예약

### 4. Evolution 단계
- 요구사항 변경 추적
- 학습사항 문서화
- 사용자 피드백 기반 업데이트

## 🎯 PRD 모범 사례

- 솔루션이 아닌 사용자 문제로 시작
- 구체적인 success metrics 포함
- Engineering과 조기 협업
- 요구사항을 테스트 가능하고 측정 가능하게 유지
- 학습사항 기반 정기 검토 및 업데이트

---
*Base all requirements on validated user research and business objectives.*
