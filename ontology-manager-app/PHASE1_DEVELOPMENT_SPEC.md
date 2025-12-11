# Phase 1 개발 명세서 (MVP v1.0)

**프로젝트:** 온톨로지 매니저 앱 개선
**기간:** 4주 (2025-12-11 ~ 2026-01-08)
**목표:** PM이 온톨로지를 구축/검증/공유할 수 있는 최소 기능 구현

---

## 📋 목차

1. [개발 환경 설정](#1-개발-환경-설정)
2. [Week 1-2: 검증 엔진](#2-week-1-2-검증-엔진)
3. [Week 3: 핵심 엔티티 + 온보딩](#3-week-3-핵심-엔티티--온보딩)
4. [Week 4: 문서 생성 + 출시](#4-week-4-문서-생성--출시)
5. [테스트 요구사항](#5-테스트-요구사항)
6. [수락 기준](#6-수락-기준)

---

## 1. 개발 환경 설정

### 현재 기술 스택 확인

```json
// package.json 주요 의존성
{
  "react": "^19.2.0",
  "zustand": "^5.0.9",
  "reactflow": "^11.11.4",
  "tailwindcss": "^4.1.17",
  "i18next": "^25.7.2"
}
```

### 필요한 새 의존성 설치

```bash
# Phase 1 필수 의존성
npm install fuse.js          # 검색 기능 (Week 3)
npm install --save-dev @types/fuse.js

# Phase 2 선택사항 (나중에 추가)
# npm install react-markdown   # Markdown 프리뷰 (선택)
```

### 디렉토리 구조 (신규 추가)

```
src/
├── lib/
│   ├── validators/          # 신규: 검증 엔진
│   │   ├── ValidationEngine.ts
│   │   ├── DuplicateClassValidator.ts
│   │   ├── CircularReferenceValidator.ts
│   │   ├── RequiredPropertyValidator.ts
│   │   ├── CardinalityConsistencyValidator.ts
│   │   └── OrphanNodeValidator.ts
│   ├── generators/          # 신규: 문서 생성
│   │   └── MarkdownGenerator.ts
│   └── onboarding/          # 신규: 온보딩
│       └── tutorialSteps.ts
├── components/
│   ├── ValidationPanel.tsx  # 신규
│   ├── ValidationBadge.tsx  # 신규
│   └── OnboardingTutorial.tsx  # 신규
├── stores/
│   └── useValidationStore.ts  # 신규
└── types/
    └── validation.ts        # 신규
```

---

## 2. Week 1-2: 검증 엔진

### 목표
- 5개 Validator 구현
- ValidationPanel UI
- Zustand 스토어 통합
- 자동 검증 (debounce 1초)

### 작업 1: 타입 정의 (30분)

**파일:** `src/types/validation.ts` (신규 작성)

```typescript
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from './ontology';

export type ValidationLevel = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  id: string;
  level: ValidationLevel;
  message: string;
  description?: string;
  nodeId?: string;  // 관련 노드 ID (포커스용)
  edgeId?: string;  // 관련 엣지 ID
  validatorName: string;  // 어떤 Validator가 발견했는지
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  summary: {
    errorCount: number;
    warningCount: number;
    infoCount: number;
  };
}

export interface Validator {
  name: string;
  description: string;
  validate(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): ValidationIssue[];
}
```

---

### 작업 2: ValidationEngine 구현 (2시간)

**파일:** `src/lib/validators/ValidationEngine.ts` (신규 작성)

```typescript
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';
import { Validator, ValidationResult, ValidationIssue } from '../../types/validation';

export class ValidationEngine {
  private validators: Validator[] = [];

  constructor(validators: Validator[]) {
    this.validators = validators;
  }

  validate(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): ValidationResult {
    const allIssues: ValidationIssue[] = [];

    // 모든 Validator 실행
    this.validators.forEach((validator) => {
      const issues = validator.validate(nodes, edges);
      allIssues.push(...issues);
    });

    // 요약 집계
    const summary = {
      errorCount: allIssues.filter(i => i.level === 'error').length,
      warningCount: allIssues.filter(i => i.level === 'warning').length,
      infoCount: allIssues.filter(i => i.level === 'info').length,
    };

    return {
      isValid: summary.errorCount === 0,
      issues: allIssues,
      summary,
    };
  }

  getValidators(): Validator[] {
    return this.validators;
  }
}
```

---

### 작업 3: Validator 구현 (15-20시간)

#### 3.1 DuplicateClassValidator (2-3시간)

**파일:** `src/lib/validators/DuplicateClassValidator.ts` (신규 작성)

```typescript
import { Node } from 'reactflow';
import { OntologyNodeData } from '../../types/ontology';
import { Validator, ValidationIssue } from '../../types/validation';

export class DuplicateClassValidator implements Validator {
  name = 'DuplicateClassValidator';
  description = '중복된 클래스명을 감지합니다';

  validate(nodes: Node<OntologyNodeData>[]): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const classNodes = nodes.filter(n => n.data.kind === 'class');
    const labelMap = new Map<string, Node<OntologyNodeData>[]>();

    // 대소문자 구분 없이 그룹화
    classNodes.forEach((node) => {
      const normalizedLabel = node.data.label.toLowerCase().trim();
      if (!labelMap.has(normalizedLabel)) {
        labelMap.set(normalizedLabel, []);
      }
      labelMap.get(normalizedLabel)!.push(node);
    });

    // 중복 발견
    labelMap.forEach((duplicates, label) => {
      if (duplicates.length > 1) {
        duplicates.forEach((node) => {
          issues.push({
            id: `duplicate-${node.id}`,
            level: 'error',
            message: `중복된 클래스명: "${node.data.label}"`,
            description: `${duplicates.length}개의 클래스가 같은 이름을 사용합니다. 클래스명은 고유해야 합니다.`,
            nodeId: node.id,
            validatorName: this.name,
          });
        });
      }
    });

    return issues;
  }
}
```

**테스트 시나리오:**
```typescript
// 테스트 케이스 1: 중복 없음
nodes = [
  { id: '1', data: { label: 'Candidate', kind: 'class' } },
  { id: '2', data: { label: 'Recruiter', kind: 'class' } }
]
// 예상: issues.length === 0

// 테스트 케이스 2: 대소문자 다른 중복
nodes = [
  { id: '1', data: { label: 'Candidate', kind: 'class' } },
  { id: '2', data: { label: 'candidate', kind: 'class' } }
]
// 예상: issues.length === 2 (both flagged)
```

---

#### 3.2 CircularReferenceValidator (4-5시간)

**파일:** `src/lib/validators/CircularReferenceValidator.ts` (신규 작성)

```typescript
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';
import { Validator, ValidationIssue } from '../../types/validation';

export class CircularReferenceValidator implements Validator {
  name = 'CircularReferenceValidator';
  description = '순환 참조를 감지합니다 (A → B → C → A)';

  validate(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const adjacencyList = this.buildAdjacencyList(nodes, edges);

    // DFS로 모든 노드에서 순환 검사
    nodes.forEach((node) => {
      const visited = new Set<string>();
      const stack = new Set<string>();
      const cycle = this.detectCycle(node.id, adjacencyList, visited, stack);

      if (cycle) {
        issues.push({
          id: `circular-${node.id}`,
          level: 'error',
          message: `순환 참조 발견: ${cycle.join(' → ')}`,
          description: '순환 참조는 온톨로지 일관성을 해칩니다. 관계를 재구성하세요.',
          nodeId: node.id,
          validatorName: this.name,
        });
      }
    });

    // 중복 제거 (같은 순환을 여러 노드에서 발견 가능)
    return this.deduplicateIssues(issues);
  }

  private buildAdjacencyList(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): Map<string, string[]> {
    const adjList = new Map<string, string[]>();

    nodes.forEach((node) => {
      adjList.set(node.id, []);
    });

    edges.forEach((edge) => {
      if (adjList.has(edge.source)) {
        adjList.get(edge.source)!.push(edge.target);
      }
    });

    return adjList;
  }

  private detectCycle(
    nodeId: string,
    adjacencyList: Map<string, string[]>,
    visited: Set<string>,
    stack: Set<string>,
    path: string[] = []
  ): string[] | null {
    if (stack.has(nodeId)) {
      // 순환 발견! 경로 반환
      const cycleStart = path.indexOf(nodeId);
      return path.slice(cycleStart).concat(nodeId);
    }

    if (visited.has(nodeId)) {
      return null;  // 이미 방문한 노드, 순환 없음
    }

    visited.add(nodeId);
    stack.add(nodeId);
    path.push(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      const cycle = this.detectCycle(neighbor, adjacencyList, visited, stack, [...path]);
      if (cycle) {
        return cycle;
      }
    }

    stack.delete(nodeId);
    return null;
  }

  private deduplicateIssues(issues: ValidationIssue[]): ValidationIssue[] {
    const seen = new Set<string>();
    return issues.filter((issue) => {
      // 순환 메시지를 정규화 (노드 순서 무관)
      const normalized = issue.message.split(' → ').sort().join('');
      if (seen.has(normalized)) {
        return false;
      }
      seen.add(normalized);
      return true;
    });
  }
}
```

**테스트 시나리오:**
```typescript
// 테스트 케이스: A → B → C → A
nodes = [
  { id: 'a', data: { label: 'A', kind: 'class' } },
  { id: 'b', data: { label: 'B', kind: 'class' } },
  { id: 'c', data: { label: 'C', kind: 'class' } }
]
edges = [
  { source: 'a', target: 'b' },
  { source: 'b', target: 'c' },
  { source: 'c', target: 'a' }
]
// 예상: issues.length === 1, message 포함 "A → B → C → A"
```

---

#### 3.3 RequiredPropertyValidator (3-4시간)

**파일:** `src/lib/validators/RequiredPropertyValidator.ts` (신규 작성)

```typescript
import { Node } from 'reactflow';
import { OntologyNodeData } from '../../types/ontology';
import { Validator, ValidationIssue } from '../../types/validation';

// ATS 도메인 Best Practice
const RECOMMENDED_PROPERTIES: Record<string, string[]> = {
  'Candidate': ['name', 'email'],
  'Job Posting': ['title', 'department_id'],
  'Application': ['applied_date', 'current_stage'],
  'Interview': ['scheduled_date', 'interview_type'],
  'Evaluation': ['overall_rating', 'evaluation_date'],
  'Recruiter': ['name', 'email'],
  'Interviewer': ['name', 'email'],
};

export class RequiredPropertyValidator implements Validator {
  name = 'RequiredPropertyValidator';
  description = 'ATS 도메인 Best Practice에 따라 필수 프로퍼티를 검증합니다';

  validate(nodes: Node<OntologyNodeData>[]): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const classNodes = nodes.filter(n => n.data.kind === 'class');

    classNodes.forEach((node) => {
      const className = node.data.label;
      const recommendedProps = RECOMMENDED_PROPERTIES[className];

      if (!recommendedProps) {
        // Best Practice에 없는 클래스는 스킵
        return;
      }

      const existingPropNames = node.data.properties.map(p => p.name);

      recommendedProps.forEach((requiredProp) => {
        if (!existingPropNames.includes(requiredProp)) {
          issues.push({
            id: `missing-prop-${node.id}-${requiredProp}`,
            level: 'warning',  // 경고 (필수는 아니지만 권장)
            message: `권장 프로퍼티 누락: "${requiredProp}"`,
            description: `${className} 클래스에 "${requiredProp}" 프로퍼티를 추가하는 것이 권장됩니다.`,
            nodeId: node.id,
            validatorName: this.name,
          });
        }
      });
    });

    return issues;
  }
}
```

---

#### 3.4 CardinalityConsistencyValidator (4-5시간)

**파일:** `src/lib/validators/CardinalityConsistencyValidator.ts` (신규 작성)

```typescript
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';
import { Validator, ValidationIssue } from '../../types/validation';

export class CardinalityConsistencyValidator implements Validator {
  name = 'CardinalityConsistencyValidator';
  description = 'Edge Cardinality 일관성을 검증합니다';

  validate(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // 1:1 또는 N:1 관계 검증
    edges.forEach((edge) => {
      const cardinality = edge.data?.cardinality;

      if (cardinality === '1:1' || cardinality === 'N:1') {
        // target 노드로 가는 다른 엣지가 있는지 확인
        const duplicateEdges = edges.filter(
          (e) => e.target === edge.target && e.source === edge.source && e.id !== edge.id
        );

        if (duplicateEdges.length > 0) {
          issues.push({
            id: `cardinality-violation-${edge.id}`,
            level: 'error',
            message: `Cardinality 위반: ${cardinality} 관계가 중복됩니다`,
            description: `${edge.data?.label} 관계는 ${cardinality}로 정의되었지만, 중복된 엣지가 존재합니다.`,
            edgeId: edge.id,
            validatorName: this.name,
          });
        }
      }
    });

    return issues;
  }
}
```

**참고:** 실제 데이터 기반 검증은 Phase 2에서 추가 (현재는 온톨로지 구조만 검증)

---

#### 3.5 OrphanNodeValidator (2-3시간)

**파일:** `src/lib/validators/OrphanNodeValidator.ts` (신규 작성)

```typescript
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';
import { Validator, ValidationIssue } from '../../types/validation';

export class OrphanNodeValidator implements Validator {
  name = 'OrphanNodeValidator';
  description = '고립된 노드 (관계 없는 클래스)를 감지합니다';

  validate(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const classNodes = nodes.filter(n => n.data.kind === 'class');

    // 엣지에 연결된 노드 ID 수집
    const connectedNodeIds = new Set<string>();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    // 연결되지 않은 노드 찾기
    classNodes.forEach((node) => {
      if (!connectedNodeIds.has(node.id)) {
        issues.push({
          id: `orphan-${node.id}`,
          level: 'warning',
          message: `고립된 클래스: "${node.data.label}"`,
          description: '이 클래스는 어떤 관계도 없습니다. 다른 클래스와 연결하거나 삭제하세요.',
          nodeId: node.id,
          validatorName: this.name,
        });
      }
    });

    return issues;
  }
}
```

---

### 작업 4: Zustand 스토어 (2시간)

**파일:** `src/stores/useValidationStore.ts` (신규 작성)

```typescript
import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../types/ontology';
import { ValidationResult, ValidationIssue } from '../types/validation';
import { ValidationEngine } from '../lib/validators/ValidationEngine';
import { DuplicateClassValidator } from '../lib/validators/DuplicateClassValidator';
import { CircularReferenceValidator } from '../lib/validators/CircularReferenceValidator';
import { RequiredPropertyValidator } from '../lib/validators/RequiredPropertyValidator';
import { CardinalityConsistencyValidator } from '../lib/validators/CardinalityConsistencyValidator';
import { OrphanNodeValidator } from '../lib/validators/OrphanNodeValidator';

interface ValidationState {
  validationResult: ValidationResult | null;
  isValidating: boolean;
  autoValidate: boolean;

  // Actions
  validate: (
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ) => void;
  clearValidation: () => void;
  setAutoValidate: (enabled: boolean) => void;
}

// ValidationEngine 초기화 (싱글톤)
const validationEngine = new ValidationEngine([
  new DuplicateClassValidator(),
  new CircularReferenceValidator(),
  new RequiredPropertyValidator(),
  new CardinalityConsistencyValidator(),
  new OrphanNodeValidator(),
]);

export const useValidationStore = create<ValidationState>((set) => ({
  validationResult: null,
  isValidating: false,
  autoValidate: true,  // 기본값: 자동 검증 활성화

  validate: (nodes, edges) => {
    set({ isValidating: true });

    // 비동기 검증 (UI 블로킹 방지)
    setTimeout(() => {
      const result = validationEngine.validate(nodes, edges);
      set({ validationResult: result, isValidating: false });
    }, 0);
  },

  clearValidation: () => set({ validationResult: null }),

  setAutoValidate: (enabled) => set({ autoValidate: enabled }),
}));
```

---

### 작업 5: ValidationPanel UI (10시간)

**파일:** `src/components/ValidationPanel.tsx` (신규 작성)

```typescript
import React from 'react';
import { useValidationStore } from '../stores/useValidationStore';
import { useOntologyStore } from '../stores/useOntologyStore';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { useReactFlow } from 'reactflow';

export const ValidationPanel: React.FC = () => {
  const { validationResult, isValidating } = useValidationStore();
  const { nodes } = useOntologyStore();
  const { fitView } = useReactFlow();

  if (!validationResult) {
    return (
      <div className="h-full w-96 bg-card border-l border-border p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">검증</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          검증 결과가 없습니다
        </div>
      </div>
    );
  }

  const { issues, summary } = validationResult;

  const handleIssueClick = (nodeId?: string) => {
    if (!nodeId) return;

    // 해당 노드로 포커스
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      fitView({
        nodes: [node],
        duration: 500,
        padding: 0.5,
      });

      // 노드 선택
      useOntologyStore.getState().selectNode(nodeId);
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-96 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground mb-3">검증 결과</h2>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
            <div className="text-xs text-muted-foreground">에러</div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {summary.errorCount}
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-2">
            <div className="text-xs text-muted-foreground">경고</div>
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {summary.warningCount}
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2">
            <div className="text-xs text-muted-foreground">정보</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {summary.infoCount}
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className="mt-3 flex items-center gap-2">
          {validationResult.isValid ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                검증 통과
              </span>
            </>
          ) : (
            <>
              <X className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                {summary.errorCount}개 에러 수정 필요
              </span>
            </>
          )}
        </div>
      </div>

      {/* Issue List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {issues.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            이슈가 없습니다 ✨
          </div>
        ) : (
          issues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => handleIssueClick(issue.nodeId)}
              className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
            >
              <div className="flex items-start gap-2">
                {getLevelIcon(issue.level)}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground group-hover:text-primary">
                    {issue.message}
                  </div>
                  {issue.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {issue.description}
                    </div>
                  )}
                  <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                    {issue.validatorName}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Loading State */}
      {isValidating && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-muted-foreground">검증 중...</span>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

### 작업 6: ValidationBadge (1시간)

**파일:** `src/components/ValidationBadge.tsx` (신규 작성)

```typescript
import React from 'react';
import { useValidationStore } from '../stores/useValidationStore';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export const ValidationBadge: React.FC = () => {
  const { validationResult } = useValidationStore();

  if (!validationResult) {
    return null;
  }

  const { summary, isValid } = validationResult;

  if (isValid) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 text-xs font-medium">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>검증 통과</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      {summary.errorCount > 0 && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="font-medium">{summary.errorCount}</span>
        </div>
      )}
      {summary.warningCount > 0 && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="font-medium">{summary.warningCount}</span>
        </div>
      )}
    </div>
  );
};
```

---

### 작업 7: App.tsx 통합 (2시간)

**파일:** `src/App.tsx` (수정)

```typescript
// 기존 import에 추가
import { ValidationPanel } from './components/ValidationPanel';
import { ValidationBadge } from './components/ValidationBadge';
import { useValidationStore } from './stores/useValidationStore';
import { useEffect, useRef } from 'react';

function App() {
  const { nodes, edges } = useOntologyStore();
  const { validate, autoValidate } = useValidationStore();
  const validationTimeoutRef = useRef<NodeJS.Timeout>();

  // 우측 패널 상태 (properties vs validation)
  const [rightPanel, setRightPanel] = useState<'properties' | 'validation'>('properties');

  // 자동 검증 (debounce 1초)
  useEffect(() => {
    if (!autoValidate) return;

    clearTimeout(validationTimeoutRef.current);
    validationTimeoutRef.current = setTimeout(() => {
      validate(nodes, edges);
    }, 1000);

    return () => clearTimeout(validationTimeoutRef.current);
  }, [nodes, edges, autoValidate, validate]);

  // ... 기존 코드 ...

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="h-14 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6">
        {/* 기존 헤더 내용 */}

        <div className="flex items-center gap-3">
          {/* 검증 배지 추가 */}
          <ValidationBadge />

          <div className="h-6 w-px bg-border mx-1"></div>

          {/* 기존 버튼들 */}
          {/* ... */}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 relative">
          <OntologyCanvas />
          {/* 기존 Floating Info */}
        </main>

        {/* 우측 패널 (토글) */}
        <aside className="z-10 h-full border-l border-border bg-card">
          {rightPanel === 'properties' && <PropertyEditor />}
          {rightPanel === 'validation' && <ValidationPanel />}
        </aside>

        {/* 패널 전환 버튼 */}
        <div className="fixed right-4 top-20 flex flex-col gap-2">
          <button
            onClick={() => setRightPanel('properties')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              rightPanel === 'properties'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-accent'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setRightPanel('validation')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              rightPanel === 'validation'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-accent'
            }`}
          >
            Validation
          </button>
        </div>
      </div>

      {/* 기존 Simulator */}
    </div>
  );
}
```

---

### Week 1-2 수락 기준 (Acceptance Criteria)

- [ ] 5개 Validator 모두 정상 작동 (단위 테스트 통과)
- [ ] ValidationPanel이 우측 슬라이드로 표시됨
- [ ] 이슈 클릭 시 해당 노드로 포커스 (<500ms)
- [ ] 노드/엣지 변경 시 1초 후 자동 검증 (debounce)
- [ ] ValidationBadge가 헤더에 표시 (에러/경고 개수)
- [ ] 테스트 커버리지 > 80% (각 Validator)

---

## 3. Week 3: 핵심 엔티티 + 온보딩

### 작업 8: 누락 엔티티 추가 (3일)

**파일:** `src/stores/useOntologyStore.ts` (수정)

initialNodes 배열에 다음 3개 클래스 추가:

```typescript
{
  id: 'offer',
  type: 'classNode',
  position: { x: 850, y: 400 },
  data: {
    label: 'Offer',
    kind: 'class',
    description: '최종 합격 제안 (연봉 협상 및 수락/거절)',
    properties: [
      { id: 'o1', name: 'offer_amount', type: 'number', required: true, description: '제안 연봉' },
      { id: 'o2', name: 'equity_options', type: 'text', required: false, description: '스톡옵션' },
      { id: 'o3', name: 'start_date', type: 'date', required: true, description: '입사 예정일' },
      { id: 'o4', name: 'response_deadline', type: 'date', required: true, description: '회신 기한' },
      { id: 'o5', name: 'status', type: 'text', required: true, description: 'Pending, Accepted, Declined, Negotiating' },
      { id: 'o6', name: 'negotiation_rounds', type: 'number', required: false, description: '협상 라운드 수' }
    ],
    rules: []
  }
},
{
  id: 'hiring_manager',
  type: 'classNode',
  position: { x: 450, y: -100 },
  data: {
    label: 'Hiring Manager',
    kind: 'class',
    description: '채용 의뢰 부서장 (실제 의사결정권자)',
    properties: [
      { id: 'hm1', name: 'name', type: 'text', required: true, description: '이름' },
      { id: 'hm2', name: 'department_id', type: 'text', required: true, description: '소속 부서 ID' },
      { id: 'hm3', name: 'approval_authority', type: 'boolean', required: true, description: '예산 승인 권한' },
      { id: 'hm4', name: 'headcount_quota', type: 'number', required: false, description: '연간 채용 가능 인원' }
    ],
    rules: []
  }
},
{
  id: 'department',
  type: 'classNode',
  position: { x: 750, y: -100 },
  data: {
    label: 'Department',
    kind: 'class',
    description: '조직 부서',
    properties: [
      { id: 'd1', name: 'name', type: 'text', required: true, description: '부서명' },
      { id: 'd2', name: 'headcount_budget', type: 'number', required: false, description: '연간 채용 예산' },
      { id: 'd3', name: 'avg_hire_duration', type: 'number', required: false, description: '평균 채용 소요일' },
      { id: 'd4', name: 'parent_department_id', type: 'text', required: false, description: '상위 부서 ID (계층)' }
    ],
    rules: []
  }
}
```

initialEdges 배열에 추가:

```typescript
// Evaluation → Offer
{ id: 'e-eval-offer', source: 'evaluation', target: 'offer', type: 'default',
  markerEnd: { type: MarkerType.ArrowClosed },
  data: { label: 'RESULTS_IN', cardinality: '1:1', description: '평가 결과로 제안서 생성' }
},

// Hiring Manager → Job Posting
{ id: 'e-hm-job', source: 'hiring_manager', target: 'job_posting', type: 'default',
  markerEnd: { type: MarkerType.ArrowClosed },
  data: { label: 'REQUESTS', cardinality: '1:N', description: '부서장이 공고 요청' }
},

// Department → Job Posting
{ id: 'e-dept-job', source: 'department', target: 'job_posting', type: 'default',
  markerEnd: { type: MarkerType.ArrowClosed },
  data: { label: 'OWNS', cardinality: '1:N', description: '부서가 공고 소유' }
}
```

---

### 작업 9: 온보딩 튜토리얼 (2일)

#### 9.1 튜토리얼 단계 정의

**파일:** `src/lib/onboarding/tutorialSteps.ts` (신규 작성)

```typescript
export interface TutorialStep {
  step: number;
  title: string;
  description: string;
  highlightNodeId?: string;
  highlightElement?: string;
  action: 'highlight' | 'focus' | 'point' | 'open';
}

export const tutorialSteps: TutorialStep[] = [
  {
    step: 1,
    title: '🎯 ATS 온톨로지 예시',
    description: '15개 클래스가 이미 로드되었습니다. Candidate 클래스를 확인해보세요.',
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
    description: '변경사항이 생기면 자동으로 검증됩니다. 우측 Validation 패널을 확인하세요.',
    highlightElement: '#validation-panel-btn',
    action: 'open'
  }
];
```

#### 9.2 OnboardingTutorial 컴포넌트

**파일:** `src/components/OnboardingTutorial.tsx` (신규 작성)

```typescript
import React, { useState } from 'react';
import { tutorialSteps, TutorialStep } from '../lib/onboarding/tutorialSteps';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReactFlow } from 'reactflow';
import { useOntologyStore } from '../stores/useOntologyStore';

interface OnboardingTutorialProps {
  onClose: () => void;
}

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { fitView } = useReactFlow();
  const { nodes, selectNode } = useOntologyStore();

  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      executeStepAction(tutorialSteps[currentStep + 1]);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      executeStepAction(tutorialSteps[currentStep - 1]);
    }
  };

  const executeStepAction = (step: TutorialStep) => {
    if (step.highlightNodeId) {
      const node = nodes.find(n => n.id === step.highlightNodeId);
      if (node) {
        if (step.action === 'highlight' || step.action === 'focus') {
          fitView({ nodes: [node], duration: 500, padding: 0.5 });
        }
        if (step.action === 'focus') {
          selectNode(node.id);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-[480px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm text-muted-foreground mb-6">{step.description}</p>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded ${
                index === currentStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            이전
          </button>

          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {tutorialSteps.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            {currentStep === tutorialSteps.length - 1 ? '완료' : '다음'}
            {currentStep < tutorialSteps.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
```

#### 9.3 App.tsx 통합

```typescript
// App.tsx에 추가
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { useEffect, useState } from 'react';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // 첫 방문 확인
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  return (
    <div>
      {/* 기존 UI */}

      {showOnboarding && <OnboardingTutorial onClose={handleOnboardingClose} />}
    </div>
  );
}
```

---

### Week 3 수락 기준

- [ ] Offer, Hiring Manager, Department 클래스 추가 완료
- [ ] 관계 3개 추가 완료
- [ ] 샘플 데이터 업데이트 (15개 클래스)
- [ ] 4단계 튜토리얼 구현 완료
- [ ] 첫 방문 시 튜토리얼 자동 표시
- [ ] localStorage에 완료 상태 저장
- [ ] 테스터 3명 온보딩 완료율 > 70%

---

## 4. Week 4: 문서 생성 + 출시

### 작업 10: Markdown Generator (3일)

**파일:** `src/lib/generators/MarkdownGenerator.ts` (신규 작성)

```typescript
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';

export class MarkdownGenerator {
  generate(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
  ): string {
    let markdown = '# ATS 온톨로지 구조\n\n';
    markdown += `생성일: ${new Date().toLocaleDateString('ko-KR')}\n\n`;
    markdown += '---\n\n';

    // 1. 개요
    markdown += '## 개요\n\n';
    markdown += `이 문서는 ATS (채용관리시스템) 온톨로지 구조를 설명합니다.\n\n`;
    markdown += `- **클래스 수:** ${nodes.filter(n => n.data.kind === 'class').length}\n`;
    markdown += `- **관계 수:** ${edges.length}\n\n`;
    markdown += '---\n\n';

    // 2. 클래스 목록
    markdown += '## 클래스\n\n';
    const classNodes = nodes.filter(n => n.data.kind === 'class');

    classNodes.forEach((node) => {
      markdown += `### ${node.data.label}\n\n`;
      if (node.data.description) {
        markdown += `${node.data.description}\n\n`;
      }

      // 프로퍼티 테이블
      if (node.data.properties.length > 0) {
        markdown += '**프로퍼티:**\n\n';
        markdown += '| 이름 | 타입 | 필수 | 설명 |\n';
        markdown += '|------|------|------|------|\n';

        node.data.properties.forEach((prop) => {
          const required = prop.required ? '✅' : '❌';
          const description = prop.description || '-';
          markdown += `| \`${prop.name}\` | ${prop.type} | ${required} | ${description} |\n`;
        });
        markdown += '\n';
      }
    });

    markdown += '---\n\n';

    // 3. 관계
    markdown += '## 관계\n\n';
    markdown += '| 출발 | 관계 | 도착 | Cardinality | 설명 |\n';
    markdown += '|------|------|------|-------------|------|\n';

    edges.forEach((edge) => {
      const source = nodes.find(n => n.id === edge.source)?.data.label || edge.source;
      const target = nodes.find(n => n.id === edge.target)?.data.label || edge.target;
      const label = edge.data?.label || '-';
      const cardinality = edge.data?.cardinality || '-';
      const description = edge.data?.description || '-';

      markdown += `| ${source} | ${label} | ${target} | ${cardinality} | ${description} |\n`;
    });

    markdown += '\n---\n\n';

    // 4. 메타데이터
    markdown += '## 메타데이터\n\n';
    markdown += `- **버전:** 1.0.0\n`;
    markdown += `- **생성 도구:** 온톨로지 매니저 v1.0\n`;
    markdown += `- **라이선스:** -\n\n`;

    return markdown;
  }
}
```

**파일:** `src/App.tsx` (수정)

```typescript
// handleExport 함수 아래에 추가
import { MarkdownGenerator } from './lib/generators/MarkdownGenerator';

const handleExportMarkdown = () => {
  const generator = new MarkdownGenerator();
  const markdown = generator.generate(nodes, edges);

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ontology-${new Date().getTime()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// 헤더에 버튼 추가
<button
  onClick={handleExportMarkdown}
  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card hover:bg-accent border border-border text-xs font-medium transition-colors"
>
  <Download className="w-3.5 h-3.5" />
  Markdown 다운로드
</button>
```

---

### 작업 11: 사용성 테스트 (2일)

**테스터:** PM 3명

**테스트 시나리오 (각 30분):**

1. **빈 캔버스에서 시작**
   - 튜토리얼 완료 (5분)
   - 새 클래스 추가 ("Employee" 클래스)
   - 프로퍼티 2개 추가
   - 검증 실행

2. **"소프트웨어 엔지니어 채용" 온톨로지 구축**
   - Job Posting 클래스 수정 (title, department_id, salary_range)
   - Candidate → Application 관계 추가
   - 검증 실행 → 이슈 수정

3. **Markdown 문서 생성**
   - "Markdown 다운로드" 클릭
   - 생성된 파일 확인 (GitHub Markdown 형식)
   - 개발팀에게 Slack 공유 (시뮬레이션)

**측정 지표:**
- 튜토리얼 완료율 (목표: > 70%)
- 검증 실행 성공률 (목표: 100%)
- 문서 다운로드 성공률 (목표: 100%)
- NPS 설문 (목표: > 40)

**피드백 양식:**
```markdown
# 온톨로지 매니저 v1.0 사용성 테스트

## 기본 정보
- 이름:
- 역할:
- 테스트 일시:

## 질문
1. 튜토리얼이 도움이 되었나요? (1-5점)
2. 가장 헷갈렸던 부분은?
3. 검증 기능이 온톨로지 품질에 도움이 되었나요?
4. Markdown 문서가 개발팀과 공유하기에 충분한가요?
5. 다른 PM에게 추천하겠나요? (NPS)

## 개선 제안
-
```

---

### 작업 12: 버그 수정 + 출시 (2일)

**필수 수정 사항:**

1. **검증 에러 메시지 한글화**
   - 모든 Validator의 message와 description을 한글로 변경
   - i18next 통합 (선택사항)

2. **ValidationPanel 모바일 반응성**
   - 화면 너비 < 768px일 때 하단 시트로 변경
   - Tailwind breakpoint: `md:w-96`

3. **성능 최적화**
   - 50개 클래스 테스트
   - 검증 시간 < 2초 확인
   - 필요 시 Web Worker 검토 (Phase 2로 연기 가능)

4. **다크 모드 확인**
   - ValidationPanel 색상 확인
   - ValidationBadge 색상 확인

**출시 체크리스트:**

- [ ] README.md 업데이트
  - 스크린샷 추가 (Schema View, Graph View, ValidationPanel)
  - 설치 방법
  - 사용 방법

- [ ] GitHub 릴리스 노트
  ```markdown
  # v1.0.0 - 첫 출시

  ## 🎉 주요 기능
  - ✅ 온톨로지 검증 엔진 (5개 Validator)
  - ✅ 실시간 검증 (자동, debounce 1초)
  - ✅ ValidationPanel UI (이슈 목록, 노드 포커스)
  - ✅ 온보딩 튜토리얼 (4단계)
  - ✅ Markdown 문서 자동 생성
  - ✅ 핵심 엔티티 추가 (Offer, Hiring Manager, Department)

  ## 📊 통계
  - 15개 ATS 클래스
  - 10+ 관계
  - 5개 Validator

  ## 🙏 감사
  - 포리 (온톨로지 전문가)
  - 제리 (PM 전문가)
  - 보리 (HR 전문가)
  - 메리 (B2B 디자이너)
  ```

---

### Week 4 수락 기준

- [ ] Markdown Generator 구현 완료
- [ ] "Markdown 다운로드" 버튼 추가
- [ ] 사용성 테스트 3명 완료
- [ ] 피드백 수집 및 우선순위 분류
- [ ] 필수 버그 수정 완료
- [ ] README.md + 릴리스 노트 작성
- [ ] v1.0 출시

---

## 5. 테스트 요구사항

### 단위 테스트 (Jest + React Testing Library)

**파일 구조:**
```
src/
├── lib/
│   └── validators/
│       ├── __tests__/
│       │   ├── DuplicateClassValidator.test.ts
│       │   ├── CircularReferenceValidator.test.ts
│       │   ├── RequiredPropertyValidator.test.ts
│       │   ├── CardinalityConsistencyValidator.test.ts
│       │   └── OrphanNodeValidator.test.ts
│       └── ...
```

**예시: DuplicateClassValidator.test.ts**

```typescript
import { describe, it, expect } from '@jest/globals';
import { DuplicateClassValidator } from '../DuplicateClassValidator';
import { Node } from 'reactflow';
import { OntologyNodeData } from '../../../types/ontology';

describe('DuplicateClassValidator', () => {
  const validator = new DuplicateClassValidator();

  it('should not report issues for unique class names', () => {
    const nodes: Node<OntologyNodeData>[] = [
      {
        id: '1',
        type: 'classNode',
        position: { x: 0, y: 0 },
        data: { label: 'Candidate', kind: 'class', properties: [], rules: [] }
      },
      {
        id: '2',
        type: 'classNode',
        position: { x: 0, y: 0 },
        data: { label: 'Recruiter', kind: 'class', properties: [], rules: [] }
      }
    ];

    const issues = validator.validate(nodes);
    expect(issues).toHaveLength(0);
  });

  it('should report issues for duplicate class names (case insensitive)', () => {
    const nodes: Node<OntologyNodeData>[] = [
      {
        id: '1',
        type: 'classNode',
        position: { x: 0, y: 0 },
        data: { label: 'Candidate', kind: 'class', properties: [], rules: [] }
      },
      {
        id: '2',
        type: 'classNode',
        position: { x: 0, y: 0 },
        data: { label: 'candidate', kind: 'class', properties: [], rules: [] }
      }
    ];

    const issues = validator.validate(nodes);
    expect(issues).toHaveLength(2);
    expect(issues[0].level).toBe('error');
    expect(issues[0].message).toContain('중복된 클래스명');
  });
});
```

**테스트 실행:**
```bash
npm test                  # 전체 테스트
npm test -- --coverage    # 커버리지 확인 (목표: > 80%)
```

---

### 통합 테스트 (Cypress 또는 Playwright - 선택사항)

**시나리오:**
1. 튜토리얼 완료 플로우
2. 클래스 추가 → 검증 → 이슈 수정
3. Markdown 다운로드

**Phase 2로 연기 가능** (수동 테스트로 대체)

---

## 6. 수락 기준 (Definition of Done)

### Phase 1 전체 수락 기준

- [ ] **기능 완성도**
  - [ ] 5개 Validator 모두 구현 및 테스트
  - [ ] ValidationPanel UI 완성
  - [ ] ValidationBadge 헤더 표시
  - [ ] 자동 검증 (debounce 1초)
  - [ ] 온보딩 튜토리얼 4단계
  - [ ] Markdown Generator
  - [ ] 3개 엔티티 추가

- [ ] **품질**
  - [ ] 테스트 커버리지 > 80%
  - [ ] 성능: 50개 클래스 검증 < 2초
  - [ ] 모바일 반응성 (768px 이하)
  - [ ] 다크 모드 정상 작동

- [ ] **문서화**
  - [ ] README.md 업데이트
  - [ ] 스크린샷 추가
  - [ ] 릴리스 노트 작성

- [ ] **사용자 검증**
  - [ ] 3명 PM 사용성 테스트 완료
  - [ ] 온보딩 완료율 > 70%
  - [ ] NPS > 40

---

## 7. 참고 자료

### 관련 문서
- [IMPROVEMENT_ROADMAP.md](./IMPROVEMENT_ROADMAP.md) - 전체 개선 로드맵
- [ONTOLOGY_REVIEW.md](./ONTOLOGY_REVIEW.md) - 포리의 기술 분석
- [FEATURE_REVIEW_VALIDATION_DOCS_SCALE.md](./FEATURE_REVIEW_VALIDATION_DOCS_SCALE.md) - 포리의 Phase 3 상세 계획

### 기술 문서
- [React Flow Documentation](https://reactflow.dev/)
- [Zustand Documentation](https://zustand.surge.sh/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 8. 질문 및 블로커

### 개발 시작 전 확인 필요
- [ ] **포리 기술 리뷰**: CircularReferenceValidator DFS 알고리즘 검토
- [ ] **ValidationPanel 위치**: 우측 슬라이드 확정 (vs. 하단 패널)
- [ ] **TypeScript/GraphQL Generator**: Phase 2로 연기 확정

### 주간 체크포인트
- **Week 2 Checkpoint**: Validator 2개 이상 완성 → 계속 진행
- **Week 3 Checkpoint**: 온보딩 미완성 시 → Phase 2로 연기 가능
- **Week 4 Checkpoint**: 사용성 테스트 피드백 → 우선순위 재조정

---

**작성일:** 2025-12-11
**작성자:** Terry (PM)
**검토자:** 포리, 제리, 보리, 메리
**다음 리뷰:** 2025-12-18 (Week 1 진행 상황 확인)
