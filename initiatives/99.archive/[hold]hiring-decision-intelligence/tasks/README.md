# Implementation Tasks

이 폴더는 이 initiative를 구현하기 위한 상세한 task 분류를 포함합니다.

## 📝 생성할 파일

### [initiative-name]-tasks.md
메인 구현 task 목록

**사용법:** PRD에서 tasks를 생성하기 위해 `@guides/product/generate-tasks.mdc` 사용

**처리:** 체계적으로 tasks를 진행하기 위해 `@guides/product/process-task-list.mdc` 사용

### task-progress.md
전체 진행 상황 및 완료된 tasks 추적

**구조:**
```markdown
# Task Progress

## Sprint/Week [X]
**완료됨:**
- [✅ Task 1.1]: [간단한 설명]
- [✅ Task 1.2]: [간단한 설명]

**진행 중:**
- [🔄 Task 2.1]: [현재 상태]

**차단됨:**
- [🚫 Task 3.1]: [차단 요소 설명]

**다음 주:**
- [📅 Task 4.1]: [계획됨]
```

### retrospectives/
Sprint retrospectives 및 학습사항

**형식:**
```markdown
# Sprint [X] Retrospective

## 잘된 것
- [성과 1]

## 개선할 수 있는 것
- [개선사항 1]

## Action Items
- [Action 1]: [Owner] by [Date]
```

## 🔄 Task 관리 프로세스

### 1. Task 생성
- `@guides/product/generate-tasks.mdc`의 입력으로 PRD 사용
- 작고 관리 가능한 tasks로 분해
- 노력과 의존성 추정

### 2. Task 처리
- 체계적인 실행을 위해 `@guides/product/process-task-list.mdc` 사용
- 한 번에 하나의 task 작업
- 다음으로 넘어가기 전에 검토 및 승인

### 3. 진행 상황 추적
- 정기적으로 task 상태 업데이트
- 블로커와 솔루션 문서화
- Stakeholders에게 진행 상황 전달

### 4. Retrospectives
- 정기적인 retrospectives 수행
- 학습사항 포착
- 향후 initiatives를 위한 프로세스 개선

## 📋 Task 카테고리

### Development Tasks
- 기능 구현
- 버그 수정
- 코드 리뷰
- 테스팅

### Design Tasks
- UI/UX 디자인
- 프로토타이핑
- 사용자 테스팅
- Design system 업데이트

### Product Tasks
- 요구사항 정제
- Stakeholder 커뮤니케이션
- User research
- Metrics 분석

---
*Use the systematic task processing approach for reliable execution.*
