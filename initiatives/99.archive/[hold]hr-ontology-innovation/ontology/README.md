# HR 온톨로지 (HR Ontology)

**버전:** v0.1.0
**최종 업데이트:** 2025-11-25
**소유자:** Terry
**상태:** 개발 중 (In Development)

---

## 📋 개요

이 온톨로지는 **채용(Recruiting) 도메인의 지식을 체계적으로 모델링**하여, 4개의 검증된 고객 문제를 해결합니다:

1. **Problem 01: 스킬/역량 표준화** - 팀마다 다르게 정의하는 "시니어", "스킬" 개념 통일
2. **Problem 02: 평가 기준 일관성** - 면접관마다 다른 평가 기준을 명확한 루브릭으로 표준화
3. **Problem 03: 지식 재사용** - 흩어진 면접 질문, JD를 맥락과 함께 재사용 가능하게
4. **Problem 04: 팀 간 노하우 공유** - 전문가의 암묵지를 명시적 지식으로 문서화

**핵심 가치:**
- 📊 **JD 작성 시간 75% 단축** (2시간 → 30분 목표)
- 🎯 **평가 일관성 향상** (면접관 간 신뢰도 개선)
- ♻️ **지식 재사용률 70% 달성** (0% → 70%)
- 🤝 **팀 간 중복 작업 30% 감소**

---

## 🚀 Quick Start

### 1. 처음 사용자 (Borry, 채용 담당자)

**5분 안에 시작하기:**

1. **JD 작성이 필요하다면:**
   ```
   ontology/03-implementation/examples/ 폴더로 이동
   → backend-engineer-senior.md 또는 frontend-engineer-mid.md 열기
   → 회사 상황에 맞게 수정
   → JD 초안 완성!
   ```

2. **면접 평가가 필요하다면:**
   ```
   ontology/02-conceptualization/concepts/evaluation-rubric.md 열기
   → Communication, Problem Solving 등의 5점 척도 루브릭 확인
   → 면접 중 참고하여 점수 매기기
   ```

3. **개념이 궁금하다면:**
   ```
   ontology/01-specification/glossary.md 열기
   → "Competency", "Proficiency Level", "Job Level" 등 용어 검색
   ```

### 2. 기여자 (온톨로지 개발자)

**새 개념 추가하기:**

1. `02-conceptualization/concepts/_template.md` 복사
2. 템플릿의 15개 섹션 채우기 (정의, 관계, 예시, CQ 등)
3. Borry에게 검토 요청
4. Validated 상태로 변경

**개념 수정하기:**

1. 해당 개념 문서 열기
2. "변경 이력" 섹션에 변경 사항 기록
3. "최종 수정일" 업데이트
4. `05-evolution/change-log.md`에 버전 업데이트

---

## 📁 폴더 구조

```
ontology/
├── README.md                          ← 지금 읽고 있는 문서
│
├── 01-specification/                  # Phase 1: 명세 (What to build)
│   ├── README.md                      # 명세 단계 설명
│   ├── scope-and-purpose.md          # 온톨로지의 범위와 목적
│   ├── competency-questions.md       # 온톨로지가 답해야 할 질문들 (15개 CQs)
│   └── glossary.md                   # 핵심 용어 사전
│
├── 02-conceptualization/              # Phase 2: 개념화 (How to model)
│   ├── README.md                      # 개념화 단계 설명
│   ├── concepts/                      # 개별 개념 정의
│   │   ├── _template.md              # 개념 문서 템플릿 (15개 섹션)
│   │   ├── job-family.md             # Job Family 개념
│   │   ├── job-function.md           # Job Function 개념 (Backend, Frontend, PM)
│   │   ├── position.md               # Position 개념
│   │   ├── competency.md             # Competency 개념 (핵심!)
│   │   ├── proficiency-level.md      # Proficiency Level 개념
│   │   ├── job-level.md              # Job Level 개념
│   │   └── evaluation-rubric.md      # Evaluation Rubric 개념
│   ├── relationships/                 # 개념 간 관계
│   │   ├── _template.md
│   │   ├── position-requires-competency.md
│   │   └── competency-assessed-by-rubric.md
│   └── design-patterns/               # 온톨로지 디자인 패턴
│       ├── README.md
│       ├── hierarchy-pattern.md       # 계층 구조 패턴 (스킬 분류)
│       ├── part-whole-pattern.md      # 부분-전체 패턴
│       └── descriptive-pattern.md     # 서술적 패턴 (루브릭)
│
├── 03-implementation/                 # Phase 3: 구현 (Concrete data)
│   ├── README.md                      # 구현 가이드
│   ├── standards/                     # 산업 표준 참조
│   │   ├── onet-mapping.md           # O*NET 직업 코드 매핑
│   │   ├── sfia-levels.md            # SFIA 레벨 체계
│   │   └── linkedin-skills.md        # LinkedIn 스킬 네이밍
│   ├── schemas/                       # JSON 스키마 (향후)
│   │   ├── competency-schema.json
│   │   └── position-schema.json
│   └── examples/                      # 실제 사용 예시 (3개 직무군)
│       ├── backend-engineer-senior.md
│       ├── frontend-engineer-mid.md
│       └── product-manager-senior.md
│
├── 04-validation/                     # Phase 4: 검증 (Testing)
│   ├── README.md                      # 검증 프레임워크
│   ├── cq-validation.md              # CQ 검증 결과
│   ├── usability-testing.md          # 사용성 테스트 계획
│   └── pilot-results/                # 파일럿 테스트 결과
│       └── pilot-01-usability-test.md
│
├── 05-evolution/                      # Phase 5: 진화 (Maintenance)
│   ├── README.md                      # 진화 전략
│   ├── change-log.md                 # 버전별 변경 이력
│   ├── versioning.md                 # 버전 관리 규칙
│   └── improvement-backlog.md        # 개선 백로그
│
└── mapping/                           # 문제-개념 매핑 (비즈니스 가치 연결)
    ├── README.md
    ├── problem-01-skill-standardization.md
    ├── problem-02-evaluation-consistency.md
    ├── problem-03-knowledge-reuse.md
    └── problem-04-cross-team-sharing.md
```

---

## 🎯 핵심 설계 원칙

### 1. 증거 기반 (Evidence-Based)

모든 개념은 실제 인터뷰에서 발견된 문제에 기반합니다.

**예시:**
- "Competency" 개념 → `snapshot-borry-2025-11-16.md`에서 "같은 스킬을 다르게 부르는 문제" 발견
- "Evaluation Rubric" 개념 → `opportunity-02-evaluation-consistency.md`에서 "평가 기준 불일치" 문제 발견

**문서 추적성:**
```
인터뷰 Snapshot → Opportunity 문서 → 개념 정의 → 예시 작성
```

### 2. 문제 중심 (Problem-Driven)

기술이 아닌 고객 문제 해결에 집중합니다.

**올바른 접근:**
- ❌ "Skill 분류 체계를 5단계로 만들자" (기술 중심)
- ✅ "JD 작성 시 어떤 스킬이 필요한지 빠르게 찾을 수 있게 하자" (문제 중심)

**검증 방법:**
- 모든 개념은 `mapping/` 폴더의 문제 매핑 문서와 연결
- "이 개념이 없으면 어떤 문제를 해결할 수 없는가?" 질문에 답변 가능해야 함

### 3. Core 표준 + Shell 유연 (Balanced Approach)

**Core (표준화):**
- Competency 정의: "Communication"이 무엇인지 회사 전체 동일
- Proficiency Level 정의: "Advanced"가 무엇인지 명확한 기준
- Evaluation Rubric 구조: 5점 척도, 행동적 앵커 필수

**Shell (유연성):**
- Position별 Competency 선택: Payments팀 vs. Social팀은 다른 competencies 선택 가능
- Proficiency Level 요구사항: A팀 Advanced, B팀 Intermediate 허용
- Competency 가중치: 팀마다 우선순위 다르게 설정 가능

**실제 예시:**
```markdown
# Core (모든 팀 동일)
Competency: PostgreSQL Database Design
정의: 관계형 데이터베이스 PostgreSQL로 스키마 설계 및 최적화
Proficiency Levels:
  - Beginner: SELECT 쿼리 작성
  - Intermediate: 정규화된 스키마 설계
  - Advanced: 쿼리 성능 최적화
  - Expert: 페타바이트 스케일 처리

# Shell (팀별 다름)
Position: Senior Backend Engineer - Payments Team
  Required: PostgreSQL at **Advanced** (금융 데이터 중요)

Position: Senior Backend Engineer - Social Features Team
  Required: PostgreSQL at **Intermediate** (낮은 수준 허용)
```

### 4. 점진적 진화 (Iterative Evolution)

완벽한 온톨로지를 한 번에 만들지 않습니다.

**진화 사이클:**
```
v0.1.0: 폴더 구조 + 템플릿
↓
v0.2.0: 7개 핵심 개념 + 파일럿 피드백 반영
↓
v0.3.0: Problem 03, 04 개념 추가
↓
v1.0.0: Production-ready
```

**피드백 채널:**
- Borry와 주 1회 검토 세션
- 파일럿 테스트 (Week 6)
- `05-evolution/improvement-backlog.md`에 개선 아이템 기록

---

## 🤝 협업 가이드

### Borry (HR 전문가) 역할

**1. 개념 검증자**
- 각 개념이 HR 현실과 일치하는지 확인
- "이해 가능성" 체크: 설명 없이 이해할 수 있는가?
- "유용성" 체크: 실제 업무에 도움이 되는가?

**2. 사용성 검증자**
- 실제 JD 작성, 면접 평가에 온톨로지 사용
- Think-aloud 방식으로 피드백 제공
- 파일럿 테스트 참여 (Week 6, 2시간)

**3. 예시 제공자**
- 실제 JD, 평가표, 면접 질문 제공
- "이런 상황에서는 이렇게 사용한다" 구체적 시나리오 공유

**4. 우선순위 결정자**
- 어떤 개념을 먼저 개발할지 비즈니스 관점에서 판단
- 분기별 `improvement-backlog.md` 검토

**검토 프로세스:**

1. Terry가 새 개념 문서 작성 → Borry에게 `@borry-hr-advisor` 멘션
2. Borry가 개념 문서 하단 "Review Comments" 섹션에 피드백 작성
3. Terry가 피드백 반영 → Borry 재검토
4. Borry 승인 → 개념 상태를 "Validated"로 변경

**예시 피드백:**
```markdown
### Borry (HR Expert) - 2025-11-25

> "Proficiency Level" 개념은 명확하지만, "Expert" 정의가 너무 추상적입니다.
> "3년 경험 + 프로젝트 5개 리딩" 같은 구체적 기준이 필요합니다.

**Action Items:**
- [ ] Expert 레벨에 구체적 행동 예시 추가
- [ ] 각 레벨별로 "실제 사례" 섹션 보강
```

### Berry (CTO) 역할

**1. 기술 구현 가능성 검토**
- 온톨로지를 실제 시스템으로 구현 가능한지 검증
- JSON 스키마, API 설계 시 조언

**2. 확장성 검증**
- 팀 수 증가, 새 직무군 추가 시 확장 가능한지 확인

**3. 보안/컴플라이언스 검토**
- 개인정보보호, 법적 리스크 검토

### Jerry (PM) 역할

**1. 전략적 방향 설정**
- 온톨로지가 제품 전략과 일치하는지 확인
- OKR, 로드맵과 연결

**2. 우선순위 조정**
- 리소스 제약 고려한 현실적 계획 수립

---

## 📊 V1 범위 (Current Focus)

**V1에서 다루는 직무군:** Backend Engineer, Frontend Engineer, Product Manager (3개)

**V1에서 정의할 핵심 개념:** 7개
1. Job Family (C-001)
2. Job Function (C-002) - 3개: Backend, Frontend, PM
3. Position (C-003)
4. Competency (C-004) - Technical, Behavioral, Business
5. Proficiency Level (C-005) - 4단계: Beginner, Intermediate, Advanced, Expert
6. Job Level (C-006) - 4단계: Junior, Mid, Senior, Staff
7. Evaluation Rubric (C-007) - 5점 척도 with 행동적 앵커

**V1에서 해결할 문제:** Problem 01 (스킬 표준화), Problem 02 (평가 일관성)

**V1 목표:**
- Borry가 이 온톨로지로 JD 작성 가능 (30분 이내)
- Borry 사용성 지표: 이해도 ≥ 4/5, 유용성 ≥ 4/5, 사용 의향 = Yes

**V2 이후 확장:**
- Problem 03 (지식 재사용): Interview Question, Knowledge Tag 개념 추가
- Problem 04 (팀 간 공유): Best Practice, Expert Profile 개념 추가
- 추가 직무군: Designer, Data Analyst 등

---

## 🏭 산업 표준 참조

우리는 바퀴를 재발명하지 않습니다. 검증된 산업 표준을 참조합니다.

### O*NET (미국 노동부 직업 표준)
- **용도:** Job Function → O*NET occupation codes 매핑
- **이유:** 법적 방어력, 국제적 신뢰도
- **예시:** Backend Engineer → 15-1252.00 (Software Developers)
- **문서:** `03-implementation/standards/onet-mapping.md`

### SFIA (IT 업계 스킬 프레임워크)
- **용도:** Proficiency Level 정의 참조
- **이유:** IT 업계 검증된 7단계 레벨 체계
- **적용:** SFIA 7단계를 4단계로 간소화하여 사용
- **예시:** SFIA Level 4 (Enable) → Advanced
- **문서:** `03-implementation/standards/sfia-levels.md`

### LinkedIn Skills
- **용도:** Competency 이름 작성 시 검증
- **이유:** 시장에서 실제 사용하는 용어 반영
- **예시:** "Backend Development" (많이 사용) vs. "Server-side Programming" (덜 사용)
- **문서:** `03-implementation/standards/linkedin-skills.md`

---

## ✅ 성공 지표

### Phase 1 (Week 1-4): 기초 구축
- [ ] 7개 핵심 개념 정의 완료 (Validated 상태)
- [ ] 15개 High priority CQ 모두 답변 가능
- [ ] Borry가 개념 설명 없이 이해 가능 (이해도 ≥ 4/5)
- [ ] 3개 직무군 예시 완성

### Phase 2 (Week 5-6): 파일럿 검증
- [ ] 파일럿 테스트 완료 (Borry와 2시간 세션)
- [ ] 사용성 지표 달성:
  - 이해도 ≥ 4/5
  - 유용성 ≥ 4/5
  - 사용 의향 = Yes
- [ ] 최소 5개 구체적 개선 제안 수집

### Phase 3 (Week 7-8): 피드백 반영
- [ ] 파일럿 피드백 반영 완료
- [ ] v0.2.0 릴리즈
- [ ] Borry 2차 검토 통과
- [ ] 다음 확장 계획 수립 (Problem 03, 04)

---

## 🔄 버전 관리

**현재 버전:** v0.1.0 (2025-11-25)

**버전 체계:** Semantic Versioning (MAJOR.MINOR.PATCH)
- **MAJOR:** 기존 개념 삭제, 호환성 깨지는 변경
- **MINOR:** 새 개념/관계 추가, 기존 구조 유지
- **PATCH:** 정의 명확화, 예시 추가, 오타 수정

**변경 이력:** `05-evolution/change-log.md` 참조

**버전별 목표:**
- v0.1.0 (현재): 폴더 구조 + 템플릿
- v0.2.0 (Week 7): 7개 핵심 개념 + 파일럿 피드백 반영
- v0.3.0 (Week 12): Problem 03, 04 개념 추가
- v1.0.0 (3개월 후): Production-ready, 3개 팀 사용

---

## 📚 주요 문서

### 필수 읽기 (Must Read)
1. **`01-specification/competency-questions.md`** - 온톨로지가 답해야 할 15개 질문
2. **`02-conceptualization/concepts/_template.md`** - 개념 문서 작성 템플릿
3. **`mapping/problem-01-skill-standardization.md`** - 가장 우선순위 높은 문제 매핑

### 참고 문서 (Reference)
- **`01-specification/glossary.md`** - 핵심 용어 사전
- **`04-validation/usability-testing.md`** - 사용성 테스트 계획
- **`05-evolution/versioning.md`** - 버전 관리 규칙

---

## 🚧 현재 상태 및 다음 단계

**현재 상태 (2025-11-25):**
- ✅ 폴더 구조 생성 완료
- ✅ README.md (이 문서) 작성 완료
- 🔄 5개 Critical Files 작성 중
  - ⏳ competency-questions.md
  - ⏳ _template.md
  - ⏳ problem-01-skill-standardization.md
  - ⏳ change-log.md

**다음 단계 (Week 1):**
1. Competency Questions 15개 작성
2. 개념 템플릿 확정
3. Borry와 킥오프 미팅 (온톨로지 소개)

**다음 단계 (Week 2-3):**
1. 7개 핵심 개념 정의 (Job Family, Job Function, Position, Competency, Proficiency Level, Job Level, Evaluation Rubric)
2. Borry와 주 1회 검토 세션

---

## 💬 문의 및 피드백

**온톨로지 소유자:** Terry
**HR 전문가:** Borry (`@borry-hr-advisor`)
**기술 검토:** Berry (CTO)

**피드백 채널:**
- 개념 검토 요청: 해당 개념 문서 하단 "Review Comments" 섹션
- 버그/개선 제안: `05-evolution/improvement-backlog.md`에 추가
- 일반 질문: Terry에게 직접 문의

---

## 📖 참고 자료

### 내부 문서
- [HR Ontology Initiative README](../README.md)
- [Opportunity 01: Skill Standardization](../opportunities/01-skill-standardization.md)
- [Opportunity 02: Evaluation Consistency](../opportunities/02-evaluation-consistency.md)
- [Interview Snapshot: Borry 2025-11-16](../user-interviews/snapshots/snapshot-borry-2025-11-16.md)

### 외부 표준
- [O*NET Online](https://www.onetonline.org/)
- [SFIA Framework](https://sfia-online.org/en)
- [LinkedIn Skills](https://www.linkedin.com/skills/)

### 방법론
- [METHONTOLOGY](https://oa.upm.es/5484/1/METHONTOLOGY_.pdf)
- [Ontology Development 101](https://protege.stanford.edu/publications/ontology_development/ontology101.pdf)

---

*이 온톨로지는 살아있는 문서입니다. 증거 기반으로 진화하며, Borry의 피드백으로 개선됩니다.*
