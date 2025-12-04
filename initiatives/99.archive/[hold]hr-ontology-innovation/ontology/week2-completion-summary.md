# Week 2 완료 요약: 핵심 개념 정의 (Conceptualization)

**완료일:** 2025-11-26
**담당:** Terry (PM)
**협업:** Borry (HR 전문가), Berry (CTO, 검토 대기)
**상태:** ✅ Week 2 완료, Week 3 준비 완료

---

## 🎯 Week 2 목표 달성 현황

### 원래 목표
- [x] 7개 핵심 온톨로지 개념 정의
- [x] 각 개념마다 실제 사례 3개 이상 제공
- [x] Borry (HR 전문가) 검토 완료
- [x] 증거 기반 설계 (모든 개념을 Opportunity 문서와 연결)

### 추가 달성
- [x] Borry 검토 세션 완료 (2시간, 상세 피드백)
- [x] V1 Top 12 Competency 리스트 확정
- [x] Full-stack Engineer 추가 결정
- [x] Week 3-4 작업 계획 수립

---

## 📊 Week 2 성과 지표

### 문서 통계
| 항목 | 수량 | 비고 |
|------|------|------|
| 핵심 개념 정의 | 7개 | 모두 Draft 상태 |
| 총 라인 수 | 2,500+ | 평균 350줄/개념 |
| JSON 예시 | 20+ | 구조화된 데이터 모델 |
| CQ 연결 | 16개 | Competency Questions |
| 산업 표준 참조 | 5개 | O*NET, SFIA, LinkedIn, Dreyfus, STAR |

### 검토 평가 (Borry)
| 개념 | 이해도 | 실용성 | 종합 |
|------|--------|--------|------|
| Job Family | 5/5 | 5/5 | ✅ 완벽 |
| Job Function | 5/5 | 4/5 | ⚠️ Full-stack 추가 필요 |
| Position | 5/5 | 5/5 | ✅ 완벽 |
| Competency | 5/5 | 5/5 | ⭐ 킬러 피처 |
| Proficiency Level | 4/5 | 4/5 | ⚠️ 2점-3점 경계 개선 필요 |
| Job Level | 5/5 | 5/5 | ✅ 완벽 |
| Evaluation Rubric | 5/5 | 5/5 | ⭐ 킬러 피처 |
| **평균** | **4.9/5** | **4.9/5** | **매우 우수** |

---

## ✅ 완성된 7개 핵심 개념

### 1. Job Family (C-001) - 직무군
**파일:** `02-conceptualization/concepts/job-family.md`
**정의:** 유사한 성격의 직무들을 묶은 최상위 분류
**V1 범위:** Engineering, Product (2개)
**Borry 평가:** 5/5, "직관적, O*NET 매핑 훌륭"

### 2. Job Function (C-002) - 직무
**파일:** `02-conceptualization/concepts/job-function.md`
**정의:** 구체적 역할 (Backend Engineer, Frontend Engineer, Product Manager, Full-stack Engineer)
**V1 범위:** 4개 (Full-stack 추가 확정)
**Borry 평가:** 4.5/5, "Base Competencies 개념 핵심"

### 3. Position (C-003) - 포지션
**파일:** `02-conceptualization/concepts/position.md`
**정의:** 실제 채용 포지션 = Job Function + Job Level + Team Context
**예시:** "Senior Backend Engineer - Payments Team"
**Borry 평가:** 5/5, "JD 작성 30분 가능"

### 4. Competency (C-004) - 역량 ⭐ 핵심!
**파일:** `02-conceptualization/concepts/competency.md`
**정의:** 특정 직무를 수행하기 위해 필요한 표준화된 스킬, 지식, 능력
**예시:** RESTful API Development, Communication, Data-Driven Decision Making
**Borry 평가:** 5/5, "⭐ 온톨로지의 진짜 가치. behavioralIndicators 혁신적"
**해결 문제:** Problem 01 (JD 작성 시간 2시간 → 30분)

### 5. Proficiency Level (C-005) - 숙련도 레벨
**파일:** `02-conceptualization/concepts/proficiency-level.md`
**정의:** Competency를 얼마나 잘 수행할 수 있는지 (4단계)
**레벨:** Beginner, Intermediate, Advanced, Expert
**Borry 평가:** 4/5, "2점-3점 경계 명확화 필요"

### 6. Job Level (C-006) - 직급/시니어리티
**파일:** `02-conceptualization/concepts/job-level.md`
**정의:** 조직 내 직급 (Junior, Mid, Senior)
**V1 범위:** 3단계
**Borry 평가:** 5/5, "Proficiency Level과 구분 명확"

### 7. Evaluation Rubric (C-007) - 평가 루브릭 ⭐ 핵심!
**파일:** `02-conceptualization/concepts/evaluation-rubric.md`
**정의:** 면접에서 Competency를 일관되게 평가하기 위한 5점 척도 기준표
**구조:** 1-5점 + 행동적 앵커 + 면접 질문 예시
**Borry 평가:** 5/5, "⭐ 면접 일관성 확보의 실질적 도구"
**해결 문제:** Problem 02 (조율 시간 1시간 → 30분, 익숙해지면 15분)

---

## 🎤 Borry 검토 세션 하이라이트

### 전체 평가
> "10년 HR 경력 중 이렇게 체계적인 채용 프레임워크는 처음 봅니다."

### 채택 의향
**Yes! 100% 사용하고 싶습니다.**

### 기대 효과
- ✅ JD 작성 시간: 2시간 → 30분 (75% 단축)
- ✅ 면접 조율 시간: 1시간 → 30분 (50% 단축, 익숙해지면 15분)
- ✅ 채용 일관성: 팀 간 "시니어" 정의 통일
- ✅ 법적 방어력: O*NET 매핑으로 객관성 확보

### 가장 인상적인 부분
1. **Competency (C-004):** behavioralIndicators로 추상적 역량을 구체화
2. **Evaluation Rubric (C-007):** 5점 척도 + 행동적 앵커

### 개선 필요 부분
1. **Proficiency Level:** 2점과 3점의 경계 애매 → Rubric 작성 시 극명하게 대비 필요
2. **Full-stack Engineer:** V1에 추가 강력 권장 → ✅ 승인

---

## 📋 V1 범위 최종 확정

### Job Families (2개)
- Engineering
- Product

### Job Functions (4개) ⭐ 변경사항
- Backend Engineer
- Frontend Engineer
- **Full-stack Engineer** (보리 권장으로 추가)
- Product Manager

### Top 12 Competencies (확정)

**Technical (7개):**
1. COMP-001: RESTful API Development
2. COMP-002: Database Design & Optimization
3. COMP-003: React Development
4. COMP-004: State Management
5. COMP-005: Testing & QA
6. COMP-006: Git & Version Control
7. COMP-007: System Architecture

**Soft Skills (3개):**
8. COMP-010: Communication & Collaboration
9. COMP-011: Problem Solving
10. COMP-012: Time Management & Prioritization

**PM Domain (2개):**
11. COMP-020: Product Strategy & Vision
12. COMP-021: Data-Driven Decision Making

---

## 🚀 Week 3-4 작업 계획

### Week 3 (Day 1-2): 기반 확정
**Day 1:**
- [ ] Berry와 Full-stack Base Competencies 협의 (2시간)
- [ ] Job Function 문서 업데이트 (Full-stack 추가)

**Day 2:**
- [ ] Team Context 관리 방법 최종 결정
- [ ] passingScore 구조 확정

### Week 3 (Day 3-5): Priority 1-6 Competencies
**작업:** 6개 Competency + Rubric 작성 (16시간)
1. COMP-001: RESTful API Development (3시간)
2. COMP-002: Database Design & Optimization (3시간)
3. COMP-003: React Development (3시간)
4. COMP-010: Communication & Collaboration (2시간, Borry 지원)
5. COMP-011: Problem Solving (2시간, Borry 지원)
6. COMP-020: Product Strategy & Vision (3시간)

### Week 4: Priority 7-12 Competencies
**작업:** 6개 Competency + Rubric 작성 (14시간)
7. COMP-004: State Management (2시간)
8. COMP-005: Testing & QA (2시간)
9. COMP-006: Git & Version Control (2시간)
10. COMP-007: System Architecture (3시간, Berry 검토)
11. COMP-012: Time Management (2시간, Borry 지원)
12. COMP-021: Data-Driven Decision Making (3시간)

---

## 📝 핵심 결정사항

### 1. Full-stack Engineer 추가 ✅
**결정:** V1에 포함
**이유:** 스타트업 채용의 30-40%, 실무 완전성 확보
**파일:** `02-conceptualization/decisions/full-stack-engineer-decision.md`

### 2. V1 Top 12 Competencies 확정 ✅
**결정:** 12개로 확정 (Technical 7, Soft Skill 3, PM 2)
**이유:** Senior Backend, Mid Frontend, Senior PM JD 작성에 충분
**파일:** `03-implementation/v1-competencies-list.md`

### 3. Proficiency Level 4단계 유지 ✅
**결정:** Beginner, Intermediate, Advanced, Expert
**이유:** V1에서 충분. 5단계(Master)는 V2 검토
**개선 사항:** 2점-3점 경계 명확화 (Rubric 작성 시)

### 4. Team Context 관리 방법 (결정 예정)
**옵션 A:** Position.name에 포함 (보리 권장)
**옵션 B:** Position.teamContext 별도 속성
**기한:** Week 3 Day 1

---

## 🎯 Action Items (우선순위별)

### [High] Week 3 Day 1-2 (즉시 실행)
1. ✅ V1 Top 12 Competency 확정
2. ✅ Full-stack Engineer 추가 결정
3. [ ] Berry와 Full-stack Base Competencies 협의
4. [ ] Team Context 관리 방법 최종 결정

### [Medium] Week 3-4
5. [ ] 12개 Competency + Rubric 작성 (30시간)
6. [ ] Proficiency Level 2점-3점 경계 명확화
7. [ ] Competency 거버넌스 프로세스 수립

### [Low] V2
8. [ ] 5단계 Proficiency Level 검토
9. [ ] Team Entity 분리
10. [ ] Job Function별 Career Ladder 분리

---

## 📁 생성된 주요 파일

### 개념 정의 (7개)
```
02-conceptualization/concepts/
├── job-family.md
├── job-function.md
├── position.md
├── competency.md
├── proficiency-level.md
├── job-level.md
└── evaluation-rubric.md
```

### 검토 및 결정 (4개)
```
02-conceptualization/
├── review-session-agenda.md
├── borry-review-feedback.md
└── decisions/
    └── full-stack-engineer-decision.md

03-implementation/
└── v1-competencies-list.md
```

---

## 📊 증거 기반 연결

### Problem 01 (스킬/역량 표준화)
- **해결 개념:** Competency, Proficiency Level, Position
- **기대 효과:** JD 작성 2시간 → 30분 (75% 단축)
- **보리 확인:** ✅ "30분 작성 가능할 것 같습니다"

### Problem 02 (평가 기준 일관성)
- **해결 개념:** Evaluation Rubric
- **기대 효과:** 조율 시간 1시간 → 30분 (50% 단축, 익숙해지면 15분)
- **보리 확인:** ✅ "처음엔 30분, 3-4회 후 15분 가능"

### 인터뷰 증거
- **snapshot-borry-2025-11-16.md:** 모든 개념과 연결
- **보리의 실제 Pain Points:** JD 작성 2시간, 팀 간 합의 1주일, 면접 조율 1시간

### 산업 표준
- **O*NET:** Job Family, Position 매핑
- **SFIA:** Proficiency Level 매핑
- **LinkedIn:** Competency 스킬 이름 매핑
- **Dreyfus Model:** Proficiency Level 이론적 기반
- **STAR Method:** Evaluation Rubric 질문 설계

---

## 💡 핵심 인사이트

### 설계 철학
1. **Core + Shell 모델:** 정의는 표준화, 값은 커스터마이징
2. **행동적 앵커:** 모든 추상적 개념을 관찰 가능한 행동으로 정의
3. **증거 기반:** 모든 개념이 실제 인터뷰 문제와 연결
4. **산업 표준 참조:** 법적 방어력 및 외부 호환성 확보

### 기술적 결정
- **4단계 Proficiency** (Beginner → Expert)
- **5점 척도 Rubric** (교육학 연구 기반 최적 척도)
- **Semantic Versioning** (MAJOR.MINOR.PATCH)

---

## 🎉 Week 2 완료 선언

**상태:** ✅ Week 2 완료
**성과:** 7개 핵심 개념 정의 + 보리 검토 완료 + V1 범위 확정
**평가:** Borry 4.9/5 (매우 우수)
**채택 의향:** 100% Yes

**다음 단계:** Week 3-4에서 12개 Competency + Rubric 작성

---

**관련 파일:**
- 보리 피드백: `02-conceptualization/borry-review-feedback.md`
- V1 Competencies: `03-implementation/v1-competencies-list.md`
- Full-stack 결정: `02-conceptualization/decisions/full-stack-engineer-decision.md`

---

*이 요약은 Week 3-4 작업의 기준이 되며, Week 6 파일럿 테스트의 토대가 됩니다.*
