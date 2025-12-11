# 온톨로지 매니저 앱 개선 로드맵

**작성일:** 2025-12-11
**버전:** 1.0
**목적:** 실무 중심 온톨로지 구축/유지/관리 솔루션 개발

---

## Executive Summary

### 검토 개요

4명의 전문가가 다각도로 온톨로지 매니저 앱을 분석했습니다:

- **포리(Forry)** - 온톨로지 전문가: Palantir Foundry와 기술적 비교 (평가 3.3/5)
- **제리(Jerry)** - PM 전문가: 실무 사용자 가치 관점 재해석
- **보리(Borry)** - HR 전문가: 현장 채용 담당자 페인포인트 검증
- **메리(Merry)** - B2B 제품 디자이너: UI/UX 및 제품 전략 평가

### 핵심 합의사항

**만장일치 결론:**
1. ✅ **검증 엔진이 최우선** - 모든 전문가가 P0/Critical로 평가
2. ✅ **온보딩 경험 필수** - 메리의 UX 통찰
3. ✅ **MVP 범위 축소** - 4주 집중 릴리스
4. ⚠️ **Global Property Pool 연기** - 기술적 우아함 < 실무 가치

### 제품 포지셔닝

**"PM을 위한 도메인 모델링 도구"**
- 타겟: 스타트업~중소기업 PM/PO (비개발자)
- 가치: "Palantir 1% 가격으로 80% 기능"
- 차별점: 낮은 진입장벽 + 실무 중심 + 자동 문서 생성

---

## 통합 우선순위 (전문가 합의 기반)

| 순위 | 항목 | 포리 | 제리 | 보리 | 메리 | 작업량 | 비고 |
|-----|-----|-----|-----|-----|-----|-------|------|
| **1** | 검증 엔진 (5개 Validator) | Phase 3-1 | P0 | Critical | Week 1-2 | 2주 | 만장일치 |
| **2** | 핵심 엔티티 추가 | - | - | Critical | Week 3 | 3일 | 보리 발견 |
| **3** | 온보딩 튜토리얼 | - | - | - | Week 3 | 2일 | 메리 통찰 |
| **4** | 문서 생성 (Markdown) | Phase 3-2 | P0 | High | Week 4 | 3일 | MVP 축소 |
| **5** | 타입 안전성 | Phase 1 | P1 | - | - | 1주 | Phase 2 |
| **6** | Object Property | Phase 3 | P2 | High | - | 2주 | Phase 2 |
| **7** | Global Property Pool | Phase 2 | P3 | Low | - | 2주 | Phase 3 |

---

## Phase 1: MVP v1.0 (4주)

### 목표
"PM이 온톨로지를 만들고, 검증하고, 개발팀과 공유할 수 있는 최소 기능"

### Week 1-2: 검증 엔진 구축

**구현 범위:**

#### Validators (5개)
1. **DuplicateClassValidator** (2-3시간)
   - 중복 클래스명 감지
   - 대소문자 구분 없이 비교
   - 예: "Candidate"와 "candidate" 중복 경고

2. **CircularReferenceValidator** (4-5시간)
   - DFS 알고리즘으로 순환 참조 감지
   - 예: A → B → C → A

3. **RequiredPropertyValidator** (3-4시간)
   - 필수 프로퍼티 누락 검증
   - ATS 도메인 Best Practice 적용
   - 예: Candidate에 email 필수

4. **CardinalityConsistencyValidator** (4-5시간)
   - Edge Cardinality 일관성 검증
   - 예: 1:1인데 실제로는 1:N인 경우

5. **OrphanNodeValidator** (2-3시간)
   - 고립된 노드 감지
   - 예: Interview가 어떤 Application과도 연결 안 됨

**UI 컴포넌트:**

```typescript
// components/ValidationPanel.tsx
interface ValidationPanelProps {
  issues: ValidationIssue[];
  onIssueClick: (nodeId: string) => void;
}

// 우측 슬라이드 패널
// - 에러/경고/정보 분류
// - 이슈 클릭 시 해당 노드로 포커스
// - 실시간 업데이트 (debounce 1초)
```

```typescript
// components/ValidationBadge.tsx
// 헤더에 상태 표시
// - 🔴 3 errors
// - 🟡 5 warnings
// - ✅ All clear
```

**자동 검증 로직:**

```typescript
// useOntologyStore.ts 수정
addNode: (node) => {
  set({ nodes: [...get().nodes, node] });

  // 1초 후 자동 검증 (debounce)
  clearTimeout(validationTimeout);
  validationTimeout = setTimeout(() => {
    runValidation();
  }, 1000);
}
```

**성공 기준:**
- [ ] 5개 Validator 모두 정상 작동
- [ ] ValidationPanel UI 완성 (우측 슬라이드)
- [ ] 이슈 클릭 시 노드 강조 표시 (<500ms)
- [ ] 테스트 커버리지 > 80%

---

### Week 3: 핵심 엔티티 추가 + 온보딩

#### 3.1 누락된 엔티티 추가 (3일)

**보리의 현장 피드백 기반:**

1. **Offer (합격 제안)**
```typescript
{
  id: 'offer',
  type: 'classNode',
  data: {
    label: 'Offer',
    kind: 'class',
    description: '최종 합격 제안',
    properties: [
      { id: 'o1', name: 'offer_amount', type: 'number', required: true },
      { id: 'o2', name: 'equity_options', type: 'text', required: false },
      { id: 'o3', name: 'start_date', type: 'date', required: true },
      { id: 'o4', name: 'response_deadline', type: 'date', required: true },
      { id: 'o5', name: 'status', type: 'text', required: true },
      { id: 'o6', name: 'negotiation_rounds', type: 'number', required: false }
    ],
    rules: []
  }
}
```

2. **Hiring Manager (채용 의뢰 부서장)**
```typescript
{
  id: 'hiring_manager',
  type: 'classNode',
  data: {
    label: 'Hiring Manager',
    kind: 'class',
    description: '채용 의뢰 부서장 (실제 의사결정권자)',
    properties: [
      { id: 'hm1', name: 'name', type: 'text', required: true },
      { id: 'hm2', name: 'department_id', type: 'text', required: true },
      { id: 'hm3', name: 'approval_authority', type: 'boolean', required: true },
      { id: 'hm4', name: 'headcount_quota', type: 'number', required: false }
    ],
    rules: []
  }
}
```

3. **Department (부서)**
```typescript
{
  id: 'department',
  type: 'classNode',
  data: {
    label: 'Department',
    kind: 'class',
    description: '조직 부서',
    properties: [
      { id: 'd1', name: 'name', type: 'text', required: true },
      { id: 'd2', name: 'headcount_budget', type: 'number', required: false },
      { id: 'd3', name: 'avg_hire_duration', type: 'number', required: false },
      { id: 'd4', name: 'parent_department_id', type: 'text', required: false }
    ],
    rules: []
  }
}
```

**관계 추가:**
```typescript
// Evaluation → Offer (1:1)
{ source: 'evaluation', target: 'offer', label: 'RESULTS_IN', data: { cardinality: '1:1' } }

// Hiring Manager → Job Posting (1:N)
{ source: 'hiring_manager', target: 'job_posting', label: 'REQUESTS', data: { cardinality: '1:N' } }

// Department → Job Posting (1:N)
{ source: 'department', target: 'job_posting', label: 'OWNS', data: { cardinality: '1:N' } }
```

#### 3.2 온보딩 튜토리얼 (2일)

**4단계 대화형 가이드 (5분):**

```typescript
// components/OnboardingTutorial.tsx

const onboardingSteps = [
  {
    step: 1,
    title: '🎯 ATS 온톨로지 예시',
    description: '12개 클래스가 이미 로드되었습니다. Candidate 클래스를 확인해보세요.',
    highlightNodeId: 'candidate',
    action: 'highlight'
  },
  {
    step: 2,
    title: '📋 Schema View',
    description: 'Candidate를 클릭하면 프로퍼티를 편집할 수 있습니다.',
    highlightNodeId: 'candidate',
    action: 'focus'
  },
  {
    step: 3,
    title: '🔗 Graph View',
    description: 'View Mode를 Graph로 전환하면 관계를 시각화할 수 있습니다.',
    highlightElement: '#view-mode-toggle',
    action: 'point'
  },
  {
    step: 4,
    title: '✅ 검증',
    description: '변경사항이 생기면 자동으로 검증됩니다. 우측 패널을 확인하세요.',
    highlightElement: '#validation-panel',
    action: 'open'
  }
];
```

**First-Run Checklist:**
```typescript
// 좌측 사이드바 체크리스트
interface OnboardingProgress {
  viewSchemaView: boolean;
  viewGraphView: boolean;
  runValidation: boolean;
  exportDocument: boolean;
}

// UI
✅ 온톨로지 매니저 시작 가이드
   ✅ 1. Schema View 확인하기
   ⭕ 2. Graph View 확인하기
   ⭕ 3. 검증 실행하기
   ⭕ 4. 문서 생성하기

   진행도: 25% ▯▯▯▯
```

**성공 기준:**
- [ ] 3개 엔티티 추가 완료
- [ ] 샘플 데이터 업데이트 (15개 클래스)
- [ ] 4단계 튜토리얼 구현
- [ ] 온보딩 완료율 > 70% (초기 테스터 기준)

---

### Week 4: 문서 생성 + 출시 준비

#### 4.1 Markdown 문서 생성 (3일)

**구현 범위 (축소):**

```typescript
// lib/generators/MarkdownGenerator.ts

export function generateMarkdown(ontology: OntologyState): string {
  const { nodes, edges } = ontology;

  let markdown = '# ATS 온톨로지 구조\n\n';

  // 1. 클래스 목록
  markdown += '## 클래스\n\n';
  nodes.filter(n => n.data.kind === 'class').forEach(node => {
    markdown += `### ${node.data.label}\n\n`;
    markdown += `${node.data.description}\n\n`;

    // 프로퍼티
    markdown += '**프로퍼티:**\n\n';
    node.data.properties.forEach(prop => {
      const required = prop.required ? '(필수)' : '(선택)';
      markdown += `- \`${prop.name}\` (${prop.type}) ${required}\n`;
    });
    markdown += '\n';
  });

  // 2. 관계
  markdown += '## 관계\n\n';
  edges.forEach(edge => {
    const source = nodes.find(n => n.id === edge.source)?.data.label;
    const target = nodes.find(n => n.id === edge.target)?.data.label;
    markdown += `- ${source} --[${edge.data?.label}]--> ${target} (${edge.data?.cardinality})\n`;
  });

  return markdown;
}
```

**UI:**
```typescript
// components/DocumentationExporter.tsx

<button onClick={() => {
  const markdown = generateMarkdown(useOntologyStore.getState());
  downloadFile(markdown, 'ontology.md', 'text/markdown');
}}>
  📄 Markdown 다운로드
</button>
```

**TypeScript/GraphQL Generator는 Phase 2로 연기**

#### 4.2 사용성 테스트 (2일)

**테스터: PM 3명**

**테스트 시나리오:**
1. 빈 캔버스에서 시작 → 5분 튜토리얼 완료
2. "소프트웨어 엔지니어 채용" 온톨로지 구축 (20분)
3. 검증 실행 → 이슈 수정
4. Markdown 문서 생성 → 개발팀 공유

**측정 지표:**
- 튜토리얼 완료율 (목표: > 70%)
- 검증 실행 성공률 (목표: 100%)
- 문서 다운로드 성공률 (목표: 100%)
- NPS 설문 (목표: > 40)

**피드백 수집:**
- "가장 헷갈렸던 부분은?"
- "검증 기능이 도움이 되었나?"
- "문서 품질이 개발팀에게 충분한가?"

#### 4.3 버그 수정 및 출시 (2일)

**필수 수정 사항:**
- [ ] 검증 에러 메시지 한글화
- [ ] ValidationPanel 모바일 반응성
- [ ] 성능 최적화 (50개 클래스 테스트)
- [ ] 다크 모드 확인

**출시 체크리스트:**
- [ ] README.md 업데이트
- [ ] 스크린샷 추가 (Schema/Graph View)
- [ ] 온보딩 영상 (5분, 선택사항)
- [ ] GitHub 릴리스 노트 작성

**v1.0 출시 (Week 4 종료)**

---

## Phase 2: 확장 기능 (5주, v1.1-v1.2)

### 목표
"초기 사용자 피드백 반영 + 고급 기능 추가"

### Week 5-6: 추가 문서 생성 + 타입 안전성

#### TypeScript Interface Generator (1주)
```typescript
// lib/generators/TypeScriptGenerator.ts

export function generateTypeScript(ontology: OntologyState): string {
  let ts = '// Auto-generated from Ontology Manager\n\n';

  ontology.nodes
    .filter(n => n.data.kind === 'class')
    .forEach(node => {
      ts += `export interface ${node.data.label} {\n`;
      node.data.properties.forEach(prop => {
        const optional = prop.required ? '' : '?';
        const type = mapPropertyType(prop.type);
        ts += `  ${prop.name}${optional}: ${type};\n`;
      });
      ts += '}\n\n';
    });

  return ts;
}
```

#### 타입 안전성 강화 (1주)
```typescript
// types/ontology.ts 수정

type ClassNodeData = {
  kind: 'class';
  label: string;
  description?: string;
  properties: PropertyDefinition[];
  rules: LogicRule[];
};

type PropertyNodeData = {
  kind: 'property';
  label: string;
  dataType: PropertyType;
  required: boolean;
  // ❌ properties 배열 제거 (순환 참조 방지)
};

export type OntologyNodeData = ClassNodeData | PropertyNodeData;
```

### Week 7-8: 스케일링 기능

#### 검색 기능 (3일)
```typescript
// lib/search.ts
import Fuse from 'fuse.js';

export function searchOntology(query: string, nodes: Node[]): Node[] {
  const fuse = new Fuse(nodes, {
    keys: ['data.label', 'data.description', 'data.properties.name'],
    threshold: 0.3
  });

  return fuse.search(query).map(result => result.item);
}
```

**UI:** 헤더에 검색창 추가
```
🔍 [Search classes, properties...        ]
```

#### 필터링 UI (2일)
```typescript
// 클래스 타입별 필터
- 전체
- 핵심 도메인 (Candidate, Job, Application)
- 프로세스 (Stage, Transition)
- 사람 (Recruiter, Interviewer)
- AI/시스템 (AI Recommendation)
```

#### 클래스 복제 (1일)
```typescript
// useOntologyStore.ts
cloneNode: (nodeId: string) => {
  const original = get().nodes.find(n => n.id === nodeId);
  if (!original) return;

  const cloned = {
    ...original,
    id: `${original.id}_clone_${Date.now()}`,
    data: {
      ...original.data,
      label: `${original.data.label} (Copy)`
    }
  };

  set({ nodes: [...get().nodes, cloned] });
}
```

### Week 9: B2B 기초 기능

#### 변경 이력 (Undo/Redo) (3일)
```typescript
interface HistoryEntry {
  id: string;
  timestamp: Date;
  action: 'addNode' | 'updateNode' | 'removeNode';
  nodeId: string;
  before: any;
  after: any;
}

// Ctrl+Z: Undo
// Ctrl+Shift+Z: Redo
```

#### Import JSON (1일)
```typescript
// 현재는 Export만 있음
// Import 기능 추가로 저장/불러오기 가능

<input type="file" accept=".json" onChange={handleImport} />
```

#### 주석 및 태그 (1일)
```typescript
// 노드에 메타데이터 추가
notes?: string;  // "TODO: Email validation 추가"
tags?: string[];  // ['core', 'has_validation']
```

---

## Phase 3: 장기 계획 (6개월+)

### 팀 협업 기능 (v2.0)
- 멀티 유저 지원
- 실시간 협업 (선택적, WebSocket)
- 권한 관리 (Viewer/Editor/Admin)
- 댓글 및 리뷰

### 고급 온톨로지 기능 (v2.1)
- Object Property 지원 (포리 Phase 3)
- 계층 구조/상속 (포리 Phase 4)
- Global Property Pool (포리 Phase 2) - **조건부**

### 통합 및 확장 (v2.2)
- ATS 시스템 연동 (Greenhouse, Lever)
- GraphQL Schema Generator
- SQL DDL Generator
- 산업별 템플릿 마켓플레이스

---

## 성공 지표

### v1.0 출시 후 30일

| 지표 | 목표 | 측정 방법 |
|------|------|---------|
| **신규 사용자** | 10명 | 가입 통계 |
| **온보딩 완료율** | > 70% | 튜토리얼 4단계 완료 |
| **검증 기능 사용률** | > 80% | "검증 버튼 클릭" 이벤트 |
| **문서 생성** | > 50% | "Markdown 다운로드" 이벤트 |
| **NPS** | > 40 | 사용자 설문 |
| **월간 활성 사용자 (MAU)** | > 7명 | 로그인 통계 |
| **이탈율** | < 30% | 30일 후 활동 여부 |

### 정성적 피드백 (필수)

**3명 PM 인터뷰 질문:**
1. "검증 엔진이 당신의 불안감을 해소했는가?"
2. "문서 자동 생성이 개발팀과 소통을 쉽게 했는가?"
3. "사용 중 가장 답답했던 부분은?"
4. "다른 PM에게 추천하겠는가?"

---

## 리스크 관리

### 주요 리스크

| 리스크 | 확률 | 영향도 | 완화 전략 |
|--------|------|--------|---------|
| **Validator 버그** | 40% | 높음 | 포리 코드 리뷰, 단위 테스트 |
| **ValidationPanel UX 불편** | 30% | 중간 | 초기 사용자 테스트 (3명) |
| **온보딩 튜토리얼 번역 부족** | 20% | 낮음 | 한글/영어만 지원 |
| **성능 문제 (50+ 클래스)** | 15% | 높음 | Web Worker 검증 (Phase 2) |
| **일정 지연 (Validator 복잡도)** | 35% | 중간 | Week 2 중간 리뷰, 최소 2개만 완성 |

### 일정 지연 대응

**Week 2 Checkpoint:**
- Validator 2개 완성 → 계속 진행
- Validator 0-1개 완성 → 우선순위 재조정 (CircularReference 연기)

**Week 3 Checkpoint:**
- 온보딩 미완성 시 → Phase 2로 연기 가능
- 엔티티 추가는 필수 (보리의 Critical 피드백)

---

## 즉시 실행 항목 (이번 주)

### 의사결정 필요
- [ ] **MVP 범위 확정**: 4주 계획 승인 (Terry 결정)
- [ ] **ValidationPanel 위치**: 우측 슬라이드 패널 확정
- [ ] **개발팀 할당**: 누가 Validator 구현?
- [ ] **초기 테스터 섭외**: PM 3명 (Jerry + 2명)

### 준비 작업
- [ ] **기술 리뷰 일정**: 포리와 Validator 아키텍처 검토 (Week 1 시작 전)
- [ ] **디자인 목업**: 메리가 ValidationPanel Figma 프로토타입 (30분)
- [ ] **온보딩 스크립트**: 4단계 튜토리얼 대본 작성
- [ ] **GitHub 이슈 생성**: Phase 1 작업을 Issue로 분해

### 개발 환경 설정
- [ ] **의존성 설치 확인**: Zustand persist, Fuse.js (검색)
- [ ] **테스트 프레임워크**: Jest + React Testing Library 설정
- [ ] **CI/CD**: GitHub Actions 설정 (선택사항)

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|---------|--------|
| 1.0 | 2025-12-11 | 초안 작성 (4인 전문가 검토 통합) | Terry + 전문가팀 |

---

## 참고 문서

- `ONTOLOGY_REVIEW.md` - 포리의 기술적 분석
- `FEATURE_REVIEW_VALIDATION_DOCS_SCALE.md` - 포리의 Phase 3 상세 계획
- 제리 분석 (Agent 312adea2)
- 보리 분석 (Agent 18ece743)
- 메리 분석 (Agent df01d85b)

---

**다음 리뷰 일정:** 2025-12-18 (Week 1 진행 상황 확인)
