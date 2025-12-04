# 디브리프(상대평가) 기능

**Status:** Planning  
**Timeline:** 2024 Q1 - 2024 Q2  
**Owner:** Terry  
**Stakeholders:** 
- 채용팀 (핵심 사용자)
- 면접관들 (주요 사용자)
- HR 리더십 (결정권자)

## 🎯 Initiative Goal
라운드의 미션인 "적합한 사람을 채용한다"는 기조 하에, 제한된 후보자 풀에서 최적의 인재를 선택할 수 있도록 지원하는 디브리프 기능을 개발합니다.

**핵심 가치 제안:**
1. **평가 종합 기능**: 면접 종료 후 모든 면접관의 평가를 종합하여 투명하고 체계적인 의사결정 지원
2. **상대평가 기능**: 같은 공고의 동일 단계 지원자들과의 비교를 통한 최적의 인재 선별

**벤치마킹**: 아마존의 디브리프 프로세스 - 면접관들이 모여 각자의 평가를 공유하고, 지원자의 적합성을 종합적으로 논의하여 최종 결정을 내리는 과정

## 📊 Current Status
- [ ] User Research Complete
- [ ] Opportunities Identified  
- [ ] PRD Drafted
- [ ] Tasks Generated
- [ ] Development Started
- [ ] Analytics Setup Complete

## 🗂️ Folder Structure
- **[user-interviews/](./user-interviews/)** - Customer discovery and research
  - `snapshots/` - Individual interview insights using `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`
  - `synthesis/` - Cross-interview analysis and patterns
  - `transcripts/` - Raw interview recordings and notes
- **[opportunities/](./opportunities/)** - Identified opportunities and pain points
- **[assumptions/](./assumptions/)** - Assumption logs and test cards from `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc`
- **[solutions/](./solutions/)** - Solution explorations from `@frameworks/continuous-discovery-habits/generate-solutions.mdc`
- **[product-analytics/](./product-analytics/)** - Data analysis and metrics
- **[prd/](./prd/)** - Product Requirements Document using `@guides/product/create-prd.mdc`
- **[tasks/](./tasks/)** - Implementation tasks using `@guides/product/generate-tasks.mdc`

## 🔗 Quick Links
- [PRD](./prd/)
- [User Research Summary](./user-interviews/synthesis/)
- [Priority Opportunities](./opportunities/)
- [Assumptions & Tests](./assumptions/)
- [Solution Explorations](./solutions/)
- [Implementation Tasks](./tasks/)

## 📝 Notes

### 핵심 가정
- 채용은 무한정한 자원(인재풀)에서 적합한 사람을 찾는 것이 아니라, 제한된 자원(실제 지원자 또는 리쿠르터가 소싱한 후보자 풀) 안에서 적합한 사람을 검증하는 과정
- 적합한 사람을 채용한다는 것은 실제 면접을 본 인재들 중에서 가장 적합한 사람을 비교, 검증하여 정말 잘 맞는 사람인가를 적절한 판단 기준을 통해 선택하는 것

### 기능 요구사항
1. **평가 종합 기능**
   - 모든 면접관의 평가 내역 통합 보기
   - 이전 평가 내역과의 비교
   - 실시간 의견 교환 및 토론 지원
   - 최종 평가 도출 과정 지원

2. **상대평가 기능**
   - 같은 공고의 같은 단계 지원자들과의 비교
   - 비교 가능한 평가 기준 및 점수 체계
   - 직관적인 비교 UI/UX
   - 현재 조직에 가장 적합한 지원자 검증 지원

### 성공 지표
- 디브리프 회의 시간 단축
- 평가 일관성 향상
- 최종 채용 결정의 신뢰도 증가
- 면접관들의 만족도 향상

---
*Created using initiatives template. Use `@initiatives/_templates/setup-new-initiative.mdc` for new initiatives.*
