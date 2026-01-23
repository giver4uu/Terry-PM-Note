# 서류 검토 단계 개선 (Document Review Improvement)

**상태:** Discovery
**타임라인:** 2026.01.20 - TBD
**Owner:** Terry
**Stakeholders:** TBD

## 🎯 Initiative 목표
서류 검토 단계의 사용자 경험과 효율성을 개선하여, 채용 담당자와 면접관이 더 빠르고 정확하게 지원자를 평가할 수 있도록 합니다.

### 예상 개선 영역
- 서류 검토 UI/UX 개선
- AI 기반 이력서 분석 및 추천 고도화
- 서류 검토 워크플로우 최적화
- 평가 기준 및 피드백 시스템 강화

## 📊 현재 상태
- [ ] User Research 완료
- [ ] Opportunities 식별됨
- [ ] PRD 작성됨
- [ ] Tasks 생성됨
- [ ] 개발 시작됨
- [ ] Analytics 설정 완료

## 🗂️ 폴더 구조
- **[user-interviews/](./user-interviews/)** - Customer discovery 및 research
  - `snapshots/` - `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`를 사용한 개별 인터뷰 인사이트
  - `synthesis/` - 인터뷰 간 분석 및 패턴
  - `transcripts/` - 원본 인터뷰 녹음 및 노트
- **[opportunities/](./opportunities/)** - 식별된 opportunities 및 pain points
- **[assumptions/](./assumptions/)** - `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc`의 assumption logs 및 test cards
- **[solutions/](./solutions/)** - `@frameworks/continuous-discovery-habits/generate-solutions.mdc`의 solution 탐색
- **[product-analytics/](./product-analytics/)** - 데이터 분석 및 metrics
- **[prd/](./prd/)** - `@guides/product/create-prd.mdc`를 사용한 Product Requirements Document
- **[tasks/](./tasks/)** - `@guides/product/generate-tasks.mdc`를 사용한 구현 tasks

## 🔗 빠른 링크
- [PRD](./prd/)
- [User Research 요약](./user-interviews/synthesis/)
- [우선순위 Opportunities](./opportunities/)
- [Assumptions & Tests](./assumptions/)
- [Solution 탐색](./solutions/)
- [구현 Tasks](./tasks/)

## 📝 노트
- 관련 코드: `when-front`, `round-server`의 서류 검토 관련 모듈
- Battlecard에서 언급된 "AI가 이력서 검토" 기능과 연계
- 경쟁사(그리팅, 나인하이어) 대비 차별화 포인트 강화

---
*Created: 2026.01.20 by Terry*
*Using initiatives template. Use `@initiatives/_templates/setup-new-initiative.mdc` for new initiatives.*
