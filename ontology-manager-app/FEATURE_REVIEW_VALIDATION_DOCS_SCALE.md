# Ontology Manager - Phase 3 핵심 기능 개발 가이드

**작성일:** 2025-12-10
**작성자:** Forry (Ontology Design Specialist)
**대상:** 개발팀
**목적:** PM 페인포인트 3, 4, 5번 해결을 위한 구현 가이드

---

## Executive Summary

PM Jerry의 실무 사용에서 가장 큰 장애물인 3가지 페인포인트를 해결하는 기능 구현 가이드입니다.

### 타겟 페인포인트

| # | 페인포인트 | 영향도 | Phase | 예상 작업량 |
|---|-----------|--------|-------|------------|
| **3** | "이 온톨로지가 맞는지 확신이 없어요" | High | Phase 3 | 2주 |
| **4** | "개발팀이 JSON을 이해 못 해요" | High | Phase 3 | 2주 |
| **5** | "50개 클래스가 되면 관리가 힘들 것 같아요" | Medium | Phase 4 | 3주 |

### 구현 우선순위

```
Week 1-2:  Pain Point #3 - 온톨로지 검증 엔진
Week 3-4:  Pain Point #4 - 문서 자동 생성
Week 5-7:  Pain Point #5 - 스케일링 (네임스페이스, 검색, 필터링)
```

### 예상 ROI

- **Pain Point #3 해결:** PM의 온톨로지 검증 시간 **80% 감소** (1시간 → 12분)
- **Pain Point #4 해결:** 개발팀 커뮤니케이션 왕복 **60% 감소** (평균 5회 → 2회)
- **Pain Point #5 해결:** 50+ 클래스 관리 가능, 확장성 **10배 향상**

---

## Pain Point #3: 온톨로지 검증 ("이게 맞나요?")

### 문제 상황

**현재:**
```typescript
// src/stores/useOntologyStore.ts
// 검증 로직이 전혀 없음
addNode: (node) => set({ nodes: [...get().nodes, node] })  // 그냥 추가
addEdge: (edge) => set({ edges: [...get().edges, edge] })  // 그냥 추가
```

**PM의 실제 경험:**
```
Jerry: "Interview → Candidate 관계를 만들었는데..."
      "이게 논리적으로 맞는 건지 확신이 없네요"
      "혹시 반대 방향이어야 하나?"
      "아니면 Interview → Application → Candidate 순서?"

도구: (아무 피드백 없음) 😶

Jerry: "동료한테 물어봐야겠다" → 1일 대기
      또는
      "일단 진행하자" → 나중에 리팩토링 (기술 부채)
```

**측정 가능한 비용:**
- 검증을 위한 동료 리뷰: **평균 1-2일 대기**
- 잘못된 온톨로지로 인한 개발 재작업: **평균 3-5일**
- PM의 심리적 불안감: **의사결정 지연 20%**

---

### 해결 방안: 온톨로지 검증 엔진

#### 아키텍처 설계

```
┌─────────────────────────────────────────────┐
│          Validation Engine                   │
├─────────────────────────────────────────────┤
│  1. Structural Validators (구조적 검증)      │
│     - DuplicateClassValidator                │
│     - OrphanNodeValidator                    │
│     - CircularReferenceValidator             │
│     - SelfLoopValidator                      │
│                                               │
│  2. Semantic Validators (의미적 검증)        │
│     - CardinalityConsistencyValidator        │
│     - RequiredPropertyValidator              │
│     - TypeConsistencyValidator               │
│                                               │
│  3. Business Rule Validators (실무 규칙)     │
│     - NamingConventionValidator              │
│     - MetadataCompletenessValidator          │
│     - PropertyCountLimitValidator            │
│                                               │
│  4. AI-Powered Validators (선택적)           │
│     - RelationDirectionSuggester             │
│     - MissingRelationDetector                │
└─────────────────────────────────────────────┘
```

---

### 구현 상세

#### 1. 파일 구조

```
src/
├── lib/
│   ├── validation/
│   │   ├── index.ts                    # 진입점
│   │   ├── types.ts                    # 검증 결과 타입
│   │   ├── validators/
│   │   │   ├── structural/
│   │   │   │   ├── DuplicateClassValidator.ts
│   │   │   │   ├── OrphanNodeValidator.ts
│   │   │   │   ├── CircularReferenceValidator.ts
│   │   │   │   └── SelfLoopValidator.ts
│   │   │   ├── semantic/
│   │   │   │   ├── CardinalityConsistencyValidator.ts
│   │   │   │   ├── RequiredPropertyValidator.ts
│   │   │   │   └── TypeConsistencyValidator.ts
│   │   │   └── business/
│   │   │       ├── NamingConventionValidator.ts
│   │   │       ├── MetadataCompletenessValidator.ts
│   │   │       └── PropertyCountLimitValidator.ts
│   │   └── ValidationEngine.ts         # 메인 엔진
├── components/
│   ├── ValidationPanel.tsx             # 검증 결과 UI
│   └── ValidationBadge.tsx             # 상태 표시 배지
└── stores/
    └── useValidationStore.ts           # 검증 상태 관리
```

---

#### 2. 타입 정의 (`src/lib/validation/types.ts`)

```typescript
export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
    id: string;
    type: string;  // 'duplicate_class', 'circular_ref', etc.
    severity: ValidationSeverity;
    message: string;
    affectedNodes: string[];  // 노드 IDs
    affectedEdges?: string[];  // 엣지 IDs
    suggestion?: string;  // 수정 제안
    autoFixable?: boolean;  // 자동 수정 가능 여부
}

export interface ValidationResult {
    isValid: boolean;
    timestamp: Date;
    issues: ValidationIssue[];
    stats: {
        totalErrors: number;
        totalWarnings: number;
        totalInfos: number;
    };
}

export interface Validator {
    name: string;
    validate(nodes: Node[], edges: Edge[]): ValidationIssue[];
}
```

---

#### 3. Validator 구현 예시

**3.1 중복 클래스 검증**

```typescript
// src/lib/validation/validators/structural/DuplicateClassValidator.ts
import { Validator, ValidationIssue } from '../../types';
import { Node } from 'reactflow';

export class DuplicateClassValidator implements Validator {
    name = 'Duplicate Class Validator';

    validate(nodes: Node[]): ValidationIssue[] {
        const issues: ValidationIssue[] = [];
        const labelCounts = new Map<string, string[]>();

        // 클래스명별로 노드 ID 수집
        nodes.forEach(node => {
            const label = node.data.label.toLowerCase().trim();
            if (!labelCounts.has(label)) {
                labelCounts.set(label, []);
            }
            labelCounts.get(label)!.push(node.id);
        });

        // 중복 감지
        labelCounts.forEach((nodeIds, label) => {
            if (nodeIds.length > 1) {
                issues.push({
                    id: `dup_class_${label}`,
                    type: 'duplicate_class',
                    severity: 'error',
                    message: `클래스명 "${label}"이(가) ${nodeIds.length}번 중복되었습니다.`,
                    affectedNodes: nodeIds,
                    suggestion: '중복된 클래스를 병합하거나 고유한 이름으로 변경하세요.',
                    autoFixable: false
                });
            }
        });

        return issues;
    }
}
```

---

**3.2 순환 참조 검증**

```typescript
// src/lib/validation/validators/structural/CircularReferenceValidator.ts
import { Validator, ValidationIssue } from '../../types';
import { Node, Edge } from 'reactflow';

export class CircularReferenceValidator implements Validator {
    name = 'Circular Reference Validator';

    validate(nodes: Node[], edges: Edge[]): ValidationIssue[] {
        const issues: ValidationIssue[] = [];
        const graph = this.buildAdjacencyList(nodes, edges);

        // DFS로 순환 참조 감지
        const visited = new Set<string>();
        const recursionStack = new Set<string>();

        for (const nodeId of graph.keys()) {
            if (!visited.has(nodeId)) {
                const cycle = this.detectCycleDFS(
                    nodeId,
                    graph,
                    visited,
                    recursionStack,
                    []
                );

                if (cycle.length > 0) {
                    const cycleLabels = cycle.map(id =>
                        nodes.find(n => n.id === id)?.data.label || id
                    );

                    issues.push({
                        id: `circular_ref_${cycle.join('_')}`,
                        type: 'circular_reference',
                        severity: 'warning',
                        message: `순환 참조 감지: ${cycleLabels.join(' → ')} → ${cycleLabels[0]}`,
                        affectedNodes: cycle,
                        affectedEdges: this.findCycleEdges(cycle, edges),
                        suggestion: '순환 참조는 무한 루프를 유발할 수 있습니다. 관계 방향을 재검토하세요.',
                        autoFixable: false
                    });

                    // 하나의 순환 참조를 찾았으면 해당 경로는 스킵
                    cycle.forEach(id => visited.add(id));
                }
            }
        }

        return issues;
    }

    private buildAdjacencyList(nodes: Node[], edges: Edge[]): Map<string, string[]> {
        const graph = new Map<string, string[]>();

        nodes.forEach(node => {
            graph.set(node.id, []);
        });

        edges.forEach(edge => {
            graph.get(edge.source)?.push(edge.target);
        });

        return graph;
    }

    private detectCycleDFS(
        nodeId: string,
        graph: Map<string, string[]>,
        visited: Set<string>,
        recursionStack: Set<string>,
        path: string[]
    ): string[] {
        visited.add(nodeId);
        recursionStack.add(nodeId);
        path.push(nodeId);

        const neighbors = graph.get(nodeId) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                const cycle = this.detectCycleDFS(
                    neighbor,
                    graph,
                    visited,
                    recursionStack,
                    [...path]
                );
                if (cycle.length > 0) return cycle;
            } else if (recursionStack.has(neighbor)) {
                // 순환 감지: neighbor부터 현재까지의 경로 반환
                const cycleStartIndex = path.indexOf(neighbor);
                return path.slice(cycleStartIndex);
            }
        }

        recursionStack.delete(nodeId);
        return [];
    }

    private findCycleEdges(cycle: string[], edges: Edge[]): string[] {
        const cycleEdges: string[] = [];

        for (let i = 0; i < cycle.length; i++) {
            const source = cycle[i];
            const target = cycle[(i + 1) % cycle.length];

            const edge = edges.find(e => e.source === source && e.target === target);
            if (edge) {
                cycleEdges.push(edge.id);
            }
        }

        return cycleEdges;
    }
}
```

---

**3.3 필수 프로퍼티 검증**

```typescript
// src/lib/validation/validators/semantic/RequiredPropertyValidator.ts
import { Validator, ValidationIssue } from '../../types';
import { Node } from 'reactflow';

const RECOMMENDED_PROPERTIES: Record<string, string[]> = {
    'candidate': ['id', 'name', 'email'],
    'job_posting': ['id', 'title', 'status'],
    'application': ['id', 'candidate_id', 'job_id', 'status'],
    'interview': ['id', 'scheduled_date', 'status'],
    'evaluation': ['id', 'interviewer_id', 'score'],
};

export class RequiredPropertyValidator implements Validator {
    name = 'Required Property Validator';

    validate(nodes: Node[]): ValidationIssue[] {
        const issues: ValidationIssue[] = [];

        nodes.forEach(node => {
            const classLabel = node.data.label.toLowerCase().replace(/\s+/g, '_');
            const recommendedProps = RECOMMENDED_PROPERTIES[classLabel];

            if (!recommendedProps) {
                // 권장 프로퍼티가 정의되지 않은 클래스 (건너뜀)
                return;
            }

            const existingPropNames = node.data.properties.map(p =>
                p.name.toLowerCase()
            );

            const missingProps = recommendedProps.filter(prop =>
                !existingPropNames.includes(prop.toLowerCase())
            );

            if (missingProps.length > 0) {
                issues.push({
                    id: `missing_props_${node.id}`,
                    type: 'missing_required_property',
                    severity: 'warning',
                    message: `[${node.data.label}] 클래스에 권장 프로퍼티가 누락되었습니다: ${missingProps.join(', ')}`,
                    affectedNodes: [node.id],
                    suggestion: `다음 프로퍼티 추가를 권장합니다: ${missingProps.map(p => `"${p}"`).join(', ')}`,
                    autoFixable: true
                });
            }
        });

        return issues;
    }
}
```

---

**3.4 Cardinality 일관성 검증**

```typescript
// src/lib/validation/validators/semantic/CardinalityConsistencyValidator.ts
import { Validator, ValidationIssue } from '../../types';
import { Node, Edge } from 'reactflow';

type Cardinality = '1:1' | '1:N' | 'N:1' | 'N:M';

export class CardinalityConsistencyValidator implements Validator {
    name = 'Cardinality Consistency Validator';

    validate(nodes: Node[], edges: Edge[]): ValidationIssue[] {
        const issues: ValidationIssue[] = [];

        // A → B와 B → A가 모두 존재하는 경우 (양방향 관계)
        const bidirectionalPairs = this.findBidirectionalEdges(edges);

        bidirectionalPairs.forEach(([edgeAB, edgeBA]) => {
            const cardAB = edgeAB.data?.cardinality as Cardinality;
            const cardBA = edgeBA.data?.cardinality as Cardinality;

            if (!this.isConsistent(cardAB, cardBA)) {
                const nodeA = nodes.find(n => n.id === edgeAB.source);
                const nodeB = nodes.find(n => n.id === edgeAB.target);

                issues.push({
                    id: `cardinality_inconsistent_${edgeAB.id}_${edgeBA.id}`,
                    type: 'cardinality_inconsistency',
                    severity: 'warning',
                    message: `[${nodeA?.data.label}] ↔ [${nodeB?.data.label}] 관계의 Cardinality가 일치하지 않습니다. (${cardAB} vs ${cardBA})`,
                    affectedNodes: [edgeAB.source, edgeAB.target],
                    affectedEdges: [edgeAB.id, edgeBA.id],
                    suggestion: `양방향 관계의 Cardinality는 역관계여야 합니다. 예: 1:N ↔ N:1`,
                    autoFixable: false
                });
            }
        });

        return issues;
    }

    private findBidirectionalEdges(edges: Edge[]): Array<[Edge, Edge]> {
        const pairs: Array<[Edge, Edge]> = [];

        for (let i = 0; i < edges.length; i++) {
            for (let j = i + 1; j < edges.length; j++) {
                const edgeA = edges[i];
                const edgeB = edges[j];

                // A → B와 B → A 쌍 찾기
                if (edgeA.source === edgeB.target && edgeA.target === edgeB.source) {
                    pairs.push([edgeA, edgeB]);
                }
            }
        }

        return pairs;
    }

    private isConsistent(cardAB: Cardinality, cardBA: Cardinality): boolean {
        const consistentPairs: Record<Cardinality, Cardinality[]> = {
            '1:1': ['1:1'],
            '1:N': ['N:1'],
            'N:1': ['1:N'],
            'N:M': ['N:M']
        };

        return consistentPairs[cardAB]?.includes(cardBA) ?? false;
    }
}
```

---

**3.5 고아 노드 검증**

```typescript
// src/lib/validation/validators/structural/OrphanNodeValidator.ts
import { Validator, ValidationIssue } from '../../types';
import { Node, Edge } from 'reactflow';

export class OrphanNodeValidator implements Validator {
    name = 'Orphan Node Validator';

    validate(nodes: Node[], edges: Edge[]): ValidationIssue[] {
        const issues: ValidationIssue[] = [];

        const connectedNodeIds = new Set<string>();
        edges.forEach(edge => {
            connectedNodeIds.add(edge.source);
            connectedNodeIds.add(edge.target);
        });

        const orphanNodes = nodes.filter(node =>
            !connectedNodeIds.has(node.id)
        );

        if (orphanNodes.length > 0) {
            orphanNodes.forEach(node => {
                issues.push({
                    id: `orphan_node_${node.id}`,
                    type: 'orphan_node',
                    severity: 'info',
                    message: `[${node.data.label}] 클래스가 다른 클래스와 연결되지 않았습니다.`,
                    affectedNodes: [node.id],
                    suggestion: '온톨로지에서 고립된 클래스는 사용되지 않을 수 있습니다. 관계를 추가하거나 제거를 고려하세요.',
                    autoFixable: false
                });
            });
        }

        return issues;
    }
}
```

---

#### 4. 검증 엔진 통합

```typescript
// src/lib/validation/ValidationEngine.ts
import { Validator, ValidationResult, ValidationIssue } from './types';
import { Node, Edge } from 'reactflow';

// Validators
import { DuplicateClassValidator } from './validators/structural/DuplicateClassValidator';
import { OrphanNodeValidator } from './validators/structural/OrphanNodeValidator';
import { CircularReferenceValidator } from './validators/structural/CircularReferenceValidator';
import { RequiredPropertyValidator } from './validators/semantic/RequiredPropertyValidator';
import { CardinalityConsistencyValidator } from './validators/semantic/CardinalityConsistencyValidator';

export class ValidationEngine {
    private validators: Validator[] = [];

    constructor() {
        // 검증기 등록
        this.registerValidator(new DuplicateClassValidator());
        this.registerValidator(new OrphanNodeValidator());
        this.registerValidator(new CircularReferenceValidator());
        this.registerValidator(new RequiredPropertyValidator());
        this.registerValidator(new CardinalityConsistencyValidator());
    }

    registerValidator(validator: Validator): void {
        this.validators.push(validator);
    }

    async validate(nodes: Node[], edges: Edge[]): Promise<ValidationResult> {
        const allIssues: ValidationIssue[] = [];

        // 모든 검증기 실행
        for (const validator of this.validators) {
            try {
                const issues = validator.validate(nodes, edges);
                allIssues.push(...issues);
            } catch (error) {
                console.error(`Validator ${validator.name} failed:`, error);
            }
        }

        // 통계 계산
        const stats = {
            totalErrors: allIssues.filter(i => i.severity === 'error').length,
            totalWarnings: allIssues.filter(i => i.severity === 'warning').length,
            totalInfos: allIssues.filter(i => i.severity === 'info').length
        };

        return {
            isValid: stats.totalErrors === 0,
            timestamp: new Date(),
            issues: allIssues,
            stats
        };
    }

    // 특정 타입의 이슈만 필터링
    filterIssuesByType(issues: ValidationIssue[], type: string): ValidationIssue[] {
        return issues.filter(issue => issue.type === type);
    }

    // Severity별 그룹핑
    groupIssuesBySeverity(issues: ValidationIssue[]): Record<string, ValidationIssue[]> {
        return {
            error: issues.filter(i => i.severity === 'error'),
            warning: issues.filter(i => i.severity === 'warning'),
            info: issues.filter(i => i.severity === 'info')
        };
    }
}
```

---

#### 5. Zustand 스토어 통합

```typescript
// src/stores/useValidationStore.ts
import { create } from 'zustand';
import { ValidationResult } from '@/lib/validation/types';
import { ValidationEngine } from '@/lib/validation/ValidationEngine';

interface ValidationState {
    result: ValidationResult | null;
    isValidating: boolean;
    lastValidatedAt: Date | null;

    // Actions
    validate: (nodes: Node[], edges: Edge[]) => Promise<void>;
    clearValidation: () => void;
}

const engine = new ValidationEngine();

export const useValidationStore = create<ValidationState>((set, get) => ({
    result: null,
    isValidating: false,
    lastValidatedAt: null,

    validate: async (nodes, edges) => {
        set({ isValidating: true });

        try {
            const result = await engine.validate(nodes, edges);
            set({
                result,
                isValidating: false,
                lastValidatedAt: new Date()
            });
        } catch (error) {
            console.error('Validation failed:', error);
            set({ isValidating: false });
        }
    },

    clearValidation: () => {
        set({ result: null, lastValidatedAt: null });
    }
}));
```

---

#### 6. UI 컴포넌트

**6.1 검증 패널**

```typescript
// src/components/ValidationPanel.tsx
import React from 'react';
import { useValidationStore } from '@/stores/useValidationStore';
import { useOntologyStore } from '@/stores/useOntologyStore';
import { AlertCircle, AlertTriangle, Info, CheckCircle, RefreshCw } from 'lucide-react';

export const ValidationPanel: React.FC = () => {
    const { result, isValidating, validate } = useValidationStore();
    const { nodes, edges } = useOntologyStore();

    const handleValidate = () => {
        validate(nodes, edges);
    };

    const handleIssueClick = (nodeIds: string[]) => {
        // 해당 노드로 포커스 이동
        const firstNode = nodes.find(n => n.id === nodeIds[0]);
        if (firstNode) {
            // React Flow의 fitView 사용
            useOntologyStore.getState().setCenter(
                firstNode.position.x,
                firstNode.position.y,
                { zoom: 1.5, duration: 500 }
            );
        }
    };

    if (!result) {
        return (
            <div className="p-6 border rounded-lg bg-gray-50">
                <div className="text-center">
                    <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">온톨로지 검증</h3>
                    <p className="text-gray-600 mb-4">
                        온톨로지의 일관성과 정합성을 자동으로 검증합니다.
                    </p>
                    <button
                        onClick={handleValidate}
                        disabled={isValidating}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isValidating ? (
                            <>
                                <RefreshCw className="inline w-4 h-4 mr-2 animate-spin" />
                                검증 중...
                            </>
                        ) : (
                            '검증 시작'
                        )}
                    </button>
                </div>
            </div>
        );
    }

    const { isValid, stats, issues } = result;

    return (
        <div className="space-y-4">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {isValid ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className="text-lg font-semibold">
                        {isValid ? '검증 통과' : '검증 실패'}
                    </h3>
                </div>
                <button
                    onClick={handleValidate}
                    disabled={isValidating}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                >
                    재검증
                </button>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-red-50">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-gray-600">에러</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{stats.totalErrors}</div>
                </div>
                <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-gray-600">경고</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.totalWarnings}</div>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-600">정보</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{stats.totalInfos}</div>
                </div>
            </div>

            {/* 이슈 목록 */}
            <div className="space-y-2">
                {issues.map(issue => (
                    <div
                        key={issue.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                            issue.severity === 'error' ? 'bg-red-50 border-red-200' :
                            issue.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-blue-50 border-blue-200'
                        }`}
                        onClick={() => handleIssueClick(issue.affectedNodes)}
                    >
                        <div className="flex items-start gap-3">
                            {issue.severity === 'error' && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />}
                            {issue.severity === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                            {issue.severity === 'info' && <Info className="w-5 h-5 text-blue-600 mt-0.5" />}

                            <div className="flex-1">
                                <div className="font-medium mb-1">{issue.message}</div>
                                {issue.suggestion && (
                                    <div className="text-sm text-gray-600 mb-2">
                                        💡 {issue.suggestion}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>영향 받는 노드: {issue.affectedNodes.length}개</span>
                                    {issue.autoFixable && (
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">
                                            자동 수정 가능
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {issues.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-600" />
                    <p>모든 검증을 통과했습니다!</p>
                </div>
            )}
        </div>
    );
};
```

---

**6.2 상태 배지**

```typescript
// src/components/ValidationBadge.tsx
import React from 'react';
import { useValidationStore } from '@/stores/useValidationStore';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export const ValidationBadge: React.FC = () => {
    const { result } = useValidationStore();

    if (!result) {
        return null;
    }

    const { stats } = result;
    const hasErrors = stats.totalErrors > 0;
    const hasWarnings = stats.totalWarnings > 0;

    return (
        <div className="flex items-center gap-2">
            {hasErrors ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{stats.totalErrors} 에러</span>
                </div>
            ) : hasWarnings ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">{stats.totalWarnings} 경고</span>
                </div>
            ) : (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">검증 통과</span>
                </div>
            )}
        </div>
    );
};
```

---

#### 7. 메인 앱 통합

```typescript
// src/App.tsx 수정
import { ValidationPanel } from './components/ValidationPanel';
import { ValidationBadge } from './components/ValidationBadge';

function App() {
    const [showValidation, setShowValidation] = useState(false);

    return (
        <div className="app">
            {/* 헤더에 검증 배지 추가 */}
            <header className="flex items-center justify-between p-4 border-b">
                <h1>온톨로지 매니저</h1>
                <div className="flex items-center gap-4">
                    <ValidationBadge />
                    <button onClick={() => setShowValidation(!showValidation)}>
                        검증 패널 {showValidation ? '닫기' : '열기'}
                    </button>
                </div>
            </header>

            {/* 메인 영역 */}
            <div className="flex h-screen">
                <div className="flex-1">
                    <OntologyCanvas />
                </div>

                {/* 검증 패널 (슬라이드) */}
                {showValidation && (
                    <div className="w-96 border-l p-4 overflow-y-auto">
                        <ValidationPanel />
                    </div>
                )}
            </div>
        </div>
    );
}
```

---

#### 8. 자동 검증 (Optional)

```typescript
// src/stores/useOntologyStore.ts
// 노드/엣지 변경 시 자동 검증

import { useValidationStore } from './useValidationStore';

// 노드 추가 시
addNode: (node) => {
    set({ nodes: [...get().nodes, node] });

    // 자동 검증 (디바운스 적용)
    const validate = debounce(() => {
        useValidationStore.getState().validate(get().nodes, get().edges);
    }, 1000);

    validate();
}
```

---

### 테스트 전략

#### Unit Tests

```typescript
// src/lib/validation/validators/structural/DuplicateClassValidator.test.ts
import { describe, test, expect } from 'vitest';
import { DuplicateClassValidator } from './DuplicateClassValidator';

describe('DuplicateClassValidator', () => {
    const validator = new DuplicateClassValidator();

    test('should detect duplicate class names', () => {
        const nodes = [
            { id: '1', data: { label: 'Candidate' } },
            { id: '2', data: { label: 'candidate' } },  // 대소문자 무시
            { id: '3', data: { label: 'Job' } }
        ];

        const issues = validator.validate(nodes);

        expect(issues).toHaveLength(1);
        expect(issues[0].type).toBe('duplicate_class');
        expect(issues[0].affectedNodes).toEqual(['1', '2']);
    });

    test('should return empty array for unique class names', () => {
        const nodes = [
            { id: '1', data: { label: 'Candidate' } },
            { id: '2', data: { label: 'Job' } }
        ];

        const issues = validator.validate(nodes);

        expect(issues).toHaveLength(0);
    });
});
```

---

### 성능 최적화

```typescript
// 대규모 온톨로지(50+ 클래스)에서 성능 유지

// 1. Web Worker로 검증 로직 분리
// src/workers/validation.worker.ts
self.addEventListener('message', (event) => {
    const { nodes, edges } = event.data;

    const engine = new ValidationEngine();
    const result = engine.validate(nodes, edges);

    self.postMessage(result);
});

// 2. 점진적 검증 (변경된 노드만)
class IncrementalValidator {
    private cache: Map<string, ValidationResult> = new Map();

    validate(nodes: Node[], edges: Edge[], changedNodeIds: string[]): ValidationResult {
        // 변경된 노드와 연결된 노드만 재검증
        const affectedNodes = this.getAffectedNodes(nodes, edges, changedNodeIds);
        // ... 검증 로직
    }
}
```

---

## Pain Point #4: 문서 자동 생성 ("개발팀이 JSON을 이해 못 해요")

### 문제 상황

**현재:**
```typescript
// src/App.tsx:26-48
const handleExport = () => {
    const data = { nodes, edges, metadata: { version: "1.0.0" } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    // ... JSON 다운로드
};
```

**PM의 실제 경험:**
```
Jerry: [Export JSON] 클릭 → 파일 다운로드
      Slack에 업로드
      "팀원 여러분, OfferLetter 클래스 추가했습니다. JSON 파일 참고해주세요."

개발자 A: "JSON 파일이 700줄이네요... 어디를 봐야 하나요?"
개발자 B: "equity_options 프로퍼티 타입이 뭔가요? text? object?"
개발자 C: "Application → OfferLetter 관계의 cardinality가요?"

Jerry: (30분 동안 일일이 설명) 😓
      → 다음부터는 직접 문서 작성 (추가 1시간)
```

**측정 가능한 비용:**
- PM의 수동 문서 작성: **평균 1-2시간**
- 개발팀의 질의응답: **평균 3-5회 왕복**
- JSON 해석 오류로 인한 잘못된 구현: **10% 발생률**

---

### 해결 방안: 다중 포맷 문서 자동 생성

#### 지원 포맷

```
1. Markdown (GitHub-ready)
2. HTML (정적 사이트)
3. TypeScript Interfaces
4. GraphQL Schema
5. JSON Schema
6. SQL DDL (선택적)
```

---

### 구현 상세

#### 1. 파일 구조

```
src/
├── lib/
│   ├── documentation/
│   │   ├── generators/
│   │   │   ├── MarkdownGenerator.ts
│   │   │   ├── TypeScriptGenerator.ts
│   │   │   ├── GraphQLGenerator.ts
│   │   │   ├── JSONSchemaGenerator.ts
│   │   │   └── HTMLGenerator.ts
│   │   ├── templates/
│   │   │   ├── markdown.template.ts
│   │   │   ├── html.template.ts
│   │   │   └── ts.template.ts
│   │   └── DocumentationEngine.ts
├── components/
│   └── DocumentationExporter.tsx
```

---

#### 2. Generator 인터페이스

```typescript
// src/lib/documentation/types.ts
export interface DocumentGenerator {
    name: string;
    extension: string;
    mimeType: string;
    generate(nodes: Node[], edges: Edge[], metadata: OntologyMetadata): string;
}

export interface OntologyMetadata {
    version: string;
    lastUpdatedAt: Date;
    lastUpdatedBy?: string;
    description?: string;
    changelog?: ChangelogEntry[];
}

export interface ChangelogEntry {
    version: string;
    date: Date;
    author: string;
    changes: string[];
}
```

---

#### 3. Markdown Generator

```typescript
// src/lib/documentation/generators/MarkdownGenerator.ts
import { DocumentGenerator } from '../types';
import { Node, Edge } from 'reactflow';

export class MarkdownGenerator implements DocumentGenerator {
    name = 'Markdown';
    extension = 'md';
    mimeType = 'text/markdown';

    generate(nodes: Node[], edges: Edge[], metadata: OntologyMetadata): string {
        const sections: string[] = [];

        // 헤더
        sections.push(this.generateHeader(metadata));

        // 목차
        sections.push(this.generateTOC(nodes));

        // Overview
        sections.push(this.generateOverview(nodes, edges, metadata));

        // 클래스 상세
        sections.push(this.generateClassDetails(nodes, edges));

        // 관계 다이어그램
        sections.push(this.generateRelationshipDiagram(edges));

        // Changelog
        if (metadata.changelog && metadata.changelog.length > 0) {
            sections.push(this.generateChangelog(metadata.changelog));
        }

        return sections.join('\n\n---\n\n');
    }

    private generateHeader(metadata: OntologyMetadata): string {
        return `# ATS Ontology Schema v${metadata.version}

**Last Updated:** ${metadata.lastUpdatedAt.toLocaleDateString('ko-KR')}
**Updated By:** ${metadata.lastUpdatedBy || 'Unknown'}

${metadata.description || 'ATS (Applicant Tracking System) domain ontology schema'}`;
    }

    private generateTOC(nodes: Node[]): string {
        const classLinks = nodes
            .map(node => `- [${node.data.label}](#${this.slugify(node.data.label)})`)
            .join('\n');

        return `## 목차 (Table of Contents)

${classLinks}`;
    }

    private generateOverview(nodes: Node[], edges: Edge[], metadata: OntologyMetadata): string {
        const totalClasses = nodes.length;
        const totalRelationships = edges.length;
        const totalProperties = nodes.reduce((sum, node) =>
            sum + (node.data.properties?.length || 0), 0
        );

        return `## Overview

- **Total Classes:** ${totalClasses}
- **Total Relationships:** ${totalRelationships}
- **Total Properties:** ${totalProperties}
- **Version:** ${metadata.version}`;
    }

    private generateClassDetails(nodes: Node[], edges: Edge[]): string {
        const classDetails = nodes.map(node => {
            const outgoingEdges = edges.filter(e => e.source === node.id);
            const incomingEdges = edges.filter(e => e.target === node.id);

            return `## ${node.data.label}

**Description:** ${node.data.description || '(설명 없음)'}

### Properties

${this.generatePropertiesTable(node.data.properties)}

### Relationships

**Outgoing (이 클래스가 참조하는):**
${this.generateRelationshipsList(outgoingEdges, nodes, 'outgoing')}

**Incoming (이 클래스를 참조하는):**
${this.generateRelationshipsList(incomingEdges, nodes, 'incoming')}

${node.data.rules && node.data.rules.length > 0 ? `### Rules

${this.generateRulesList(node.data.rules)}` : ''}`;
        }).join('\n\n---\n\n');

        return `## Classes\n\n${classDetails}`;
    }

    private generatePropertiesTable(properties: PropertyDefinition[]): string {
        if (!properties || properties.length === 0) {
            return '_(프로퍼티 없음)_';
        }

        const header = '| Name | Type | Required | Description |\n|------|------|----------|-------------|';
        const rows = properties.map(prop =>
            `| ${prop.name} | \`${prop.type}\` | ${prop.required ? '✅' : '❌'} | ${prop.description || '-'} |`
        ).join('\n');

        return `${header}\n${rows}`;
    }

    private generateRelationshipsList(edges: Edge[], nodes: Node[], direction: 'outgoing' | 'incoming'): string {
        if (edges.length === 0) {
            return '_(없음)_';
        }

        return edges.map(edge => {
            const targetNode = nodes.find(n =>
                n.id === (direction === 'outgoing' ? edge.target : edge.source)
            );
            const cardinality = edge.data?.cardinality || 'N/A';
            const label = edge.data?.label || 'RELATION';

            return `- **${label}** → [${targetNode?.data.label || 'Unknown'}](#${this.slugify(targetNode?.data.label || 'unknown')}) (\`${cardinality}\`)`;
        }).join('\n');
    }

    private generateRulesList(rules: LogicRule[]): string {
        return rules.map(rule =>
            `- **${rule.name}**: ${rule.condition}`
        ).join('\n');
    }

    private generateRelationshipDiagram(edges: Edge[]): string {
        // Mermaid 다이어그램 생성
        const mermaidLines = edges.map(edge =>
            `    ${edge.source}[${edge.source}] -->|${edge.data?.label || 'RELATION'}| ${edge.target}[${edge.target}]`
        ).join('\n');

        return `## Relationship Diagram

\`\`\`mermaid
graph LR
${mermaidLines}
\`\`\``;
    }

    private generateChangelog(changelog: ChangelogEntry[]): string {
        const entries = changelog
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5)  // 최근 5개만
            .map(entry => `### v${entry.version} (${entry.date.toLocaleDateString('ko-KR')})

**Author:** ${entry.author}

**Changes:**
${entry.changes.map(c => `- ${c}`).join('\n')}`)
            .join('\n\n');

        return `## Changelog\n\n${entries}`;
    }

    private slugify(text: string): string {
        return text.toLowerCase().replace(/\s+/g, '-');
    }
}
```

---

#### 4. TypeScript Interface Generator

```typescript
// src/lib/documentation/generators/TypeScriptGenerator.ts
import { DocumentGenerator } from '../types';
import { Node, Edge } from 'reactflow';

export class TypeScriptGenerator implements DocumentGenerator {
    name = 'TypeScript';
    extension = 'ts';
    mimeType = 'text/typescript';

    generate(nodes: Node[], edges: Edge[], metadata: OntologyMetadata): string {
        const sections: string[] = [];

        // 헤더 주석
        sections.push(this.generateHeader(metadata));

        // 각 클래스에 대한 인터페이스
        nodes.forEach(node => {
            sections.push(this.generateInterface(node, edges, nodes));
        });

        // Relations 인터페이스 (선택적)
        sections.push(this.generateRelationsInterfaces(nodes, edges));

        return sections.join('\n\n');
    }

    private generateHeader(metadata: OntologyMetadata): string {
        return `/**
 * ATS Ontology Schema - TypeScript Interfaces
 *
 * Auto-generated from Ontology Manager
 * Version: ${metadata.version}
 * Last Updated: ${metadata.lastUpdatedAt.toISOString()}
 *
 * DO NOT EDIT MANUALLY
 */`;
    }

    private generateInterface(node: Node, edges: Edge[], allNodes: Node[]): string {
        const className = this.pascalCase(node.data.label);
        const properties = node.data.properties || [];

        // 프로퍼티 정의
        const propLines = properties.map(prop => {
            const tsType = this.mapToTSType(prop.type);
            const optional = prop.required ? '' : '?';
            const comment = prop.description ? `  /** ${prop.description} */\n` : '';

            return `${comment}  ${prop.name}${optional}: ${tsType};`;
        }).join('\n');

        // Object Property (Edge 기반)
        const objectProps = this.generateObjectProperties(node, edges, allNodes);

        return `/**
 * ${node.data.description || className}
 */
export interface ${className} {
  id: string;
${propLines}
${objectProps ? '\n' + objectProps : ''}
}`;
    }

    private generateObjectProperties(node: Node, edges: Edge[], allNodes: Node[]): string {
        const outgoingEdges = edges.filter(e => e.source === node.id);

        if (outgoingEdges.length === 0) return '';

        const objectProps = outgoingEdges.map(edge => {
            const targetNode = allNodes.find(n => n.id === edge.target);
            if (!targetNode) return '';

            const targetClassName = this.pascalCase(targetNode.data.label);
            const propName = this.camelCase(edge.data?.label || 'relation');
            const cardinality = edge.data?.cardinality;

            // 1:N 또는 N:M이면 배열
            const isArray = cardinality === '1:N' || cardinality === 'N:M';
            const tsType = isArray ? `${targetClassName}[]` : targetClassName;

            return `  /** ${edge.data?.description || edge.data?.label || 'Related entity'} */\n  ${propName}?: ${tsType};`;
        }).filter(Boolean).join('\n');

        return objectProps;
    }

    private generateRelationsInterfaces(nodes: Node[], edges: Edge[]): string {
        const relationInterfaces = nodes.map(node => {
            const className = this.pascalCase(node.data.label);
            const outgoingEdges = edges.filter(e => e.source === node.id);

            if (outgoingEdges.length === 0) return '';

            const relProps = outgoingEdges.map(edge => {
                const targetNode = nodes.find(n => n.id === edge.target);
                if (!targetNode) return '';

                const targetClassName = this.pascalCase(targetNode.data.label);
                const propName = this.camelCase(edge.data?.label || 'relation');
                const cardinality = edge.data?.cardinality;
                const isArray = cardinality === '1:N' || cardinality === 'N:M';

                return `  ${propName}: ${isArray ? `${targetClassName}[]` : targetClassName};`;
            }).filter(Boolean).join('\n');

            if (!relProps) return '';

            return `export interface ${className}Relations {
${relProps}
}`;
        }).filter(Boolean).join('\n\n');

        return relationInterfaces ? `// Relationship Interfaces\n\n${relationInterfaces}` : '';
    }

    private mapToTSType(ontologyType: string): string {
        const typeMap: Record<string, string> = {
            'text': 'string',
            'number': 'number',
            'date': 'Date',
            'boolean': 'boolean'
        };

        return typeMap[ontologyType] || 'any';
    }

    private pascalCase(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
                  .replace(/\s+/g, '');
    }

    private camelCase(str: string): string {
        const pascal = this.pascalCase(str);
        return pascal.charAt(0).toLowerCase() + pascal.slice(1);
    }
}
```

---

#### 5. GraphQL Schema Generator

```typescript
// src/lib/documentation/generators/GraphQLGenerator.ts
import { DocumentGenerator } from '../types';
import { Node, Edge } from 'reactflow';

export class GraphQLGenerator implements DocumentGenerator {
    name = 'GraphQL';
    extension = 'graphql';
    mimeType = 'text/plain';

    generate(nodes: Node[], edges: Edge[], metadata: OntologyMetadata): string {
        const sections: string[] = [];

        // 헤더
        sections.push(this.generateHeader(metadata));

        // 각 클래스에 대한 Type
        nodes.forEach(node => {
            sections.push(this.generateType(node, edges, nodes));
        });

        // Query Type
        sections.push(this.generateQueryType(nodes));

        // Mutation Type (선택적)
        sections.push(this.generateMutationType(nodes));

        return sections.join('\n\n');
    }

    private generateHeader(metadata: OntologyMetadata): string {
        return `# ATS Ontology Schema - GraphQL
# Auto-generated from Ontology Manager
# Version: ${metadata.version}
# Last Updated: ${metadata.lastUpdatedAt.toISOString()}`;
    }

    private generateType(node: Node, edges: Edge[], allNodes: Node[]): string {
        const typeName = this.pascalCase(node.data.label);
        const properties = node.data.properties || [];

        // Scalar fields
        const fields = properties.map(prop => {
            const gqlType = this.mapToGQLType(prop.type);
            const required = prop.required ? '!' : '';
            const comment = prop.description ? `  """${prop.description}"""\n` : '';

            return `${comment}  ${prop.name}: ${gqlType}${required}`;
        }).join('\n');

        // Object fields (relationships)
        const objectFields = this.generateObjectFields(node, edges, allNodes);

        const description = node.data.description
            ? `"""\n${node.data.description}\n"""\n`
            : '';

        return `${description}type ${typeName} {
  id: ID!
${fields}
${objectFields ? '\n' + objectFields : ''}
}`;
    }

    private generateObjectFields(node: Node, edges: Edge[], allNodes: Node[]): string {
        const outgoingEdges = edges.filter(e => e.source === node.id);

        if (outgoingEdges.length === 0) return '';

        const objFields = outgoingEdges.map(edge => {
            const targetNode = allNodes.find(n => n.id === edge.target);
            if (!targetNode) return '';

            const targetTypeName = this.pascalCase(targetNode.data.label);
            const fieldName = this.camelCase(edge.data?.label || 'relation');
            const cardinality = edge.data?.cardinality;

            // 1:N 또는 N:M이면 배열
            const isArray = cardinality === '1:N' || cardinality === 'N:M';
            const gqlType = isArray ? `[${targetTypeName}!]!` : targetTypeName;

            const comment = edge.data?.description
                ? `  """${edge.data.description}"""\n`
                : '';

            return `${comment}  ${fieldName}: ${gqlType}`;
        }).filter(Boolean).join('\n');

        return objFields;
    }

    private generateQueryType(nodes: Node[]): string {
        const queries = nodes.map(node => {
            const typeName = this.pascalCase(node.data.label);
            const queryName = this.camelCase(node.data.label);

            return `  ${queryName}(id: ID!): ${typeName}
  ${queryName}s(filter: ${typeName}Filter, limit: Int, offset: Int): [${typeName}!]!`;
        }).join('\n');

        return `type Query {
${queries}
}`;
    }

    private generateMutationType(nodes: Node[]): string {
        const mutations = nodes.map(node => {
            const typeName = this.pascalCase(node.data.label);
            const mutationName = this.camelCase(node.data.label);

            return `  create${typeName}(input: Create${typeName}Input!): ${typeName}!
  update${typeName}(id: ID!, input: Update${typeName}Input!): ${typeName}!
  delete${typeName}(id: ID!): Boolean!`;
        }).join('\n');

        return `type Mutation {
${mutations}
}`;
    }

    private mapToGQLType(ontologyType: string): string {
        const typeMap: Record<string, string> = {
            'text': 'String',
            'number': 'Float',
            'date': 'DateTime',
            'boolean': 'Boolean'
        };

        return typeMap[ontologyType] || 'String';
    }

    private pascalCase(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
                  .replace(/\s+/g, '');
    }

    private camelCase(str: string): string {
        const pascal = this.pascalCase(str);
        return pascal.charAt(0).toLowerCase() + pascal.slice(1);
    }
}
```

---

#### 6. Documentation Engine

```typescript
// src/lib/documentation/DocumentationEngine.ts
import { MarkdownGenerator } from './generators/MarkdownGenerator';
import { TypeScriptGenerator } from './generators/TypeScriptGenerator';
import { GraphQLGenerator } from './generators/GraphQLGenerator';
import { DocumentGenerator, OntologyMetadata } from './types';
import { Node, Edge } from 'reactflow';

export type DocumentFormat = 'markdown' | 'typescript' | 'graphql' | 'json-schema' | 'html';

export class DocumentationEngine {
    private generators: Map<DocumentFormat, DocumentGenerator> = new Map();

    constructor() {
        this.registerGenerator('markdown', new MarkdownGenerator());
        this.registerGenerator('typescript', new TypeScriptGenerator());
        this.registerGenerator('graphql', new GraphQLGenerator());
    }

    registerGenerator(format: DocumentFormat, generator: DocumentGenerator): void {
        this.generators.set(format, generator);
    }

    generate(
        format: DocumentFormat,
        nodes: Node[],
        edges: Edge[],
        metadata: OntologyMetadata
    ): string {
        const generator = this.generators.get(format);

        if (!generator) {
            throw new Error(`No generator registered for format: ${format}`);
        }

        return generator.generate(nodes, edges, metadata);
    }

    async generateMultiple(
        formats: DocumentFormat[],
        nodes: Node[],
        edges: Edge[],
        metadata: OntologyMetadata
    ): Promise<Map<DocumentFormat, string>> {
        const results = new Map<DocumentFormat, string>();

        for (const format of formats) {
            try {
                const content = this.generate(format, nodes, edges, metadata);
                results.set(format, content);
            } catch (error) {
                console.error(`Failed to generate ${format}:`, error);
            }
        }

        return results;
    }

    downloadDocument(content: string, filename: string, mimeType: string): void {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}
```

---

#### 7. UI 컴포넌트

```typescript
// src/components/DocumentationExporter.tsx
import React, { useState } from 'react';
import { useOntologyStore } from '@/stores/useOntologyStore';
import { DocumentationEngine, DocumentFormat } from '@/lib/documentation/DocumentationEngine';
import { FileText, Code, Database, Download, CheckSquare } from 'lucide-react';

const engine = new DocumentationEngine();

export const DocumentationExporter: React.FC = () => {
    const { nodes, edges } = useOntologyStore();
    const [selectedFormats, setSelectedFormats] = useState<DocumentFormat[]>(['markdown']);
    const [isGenerating, setIsGenerating] = useState(false);

    const formats: Array<{ key: DocumentFormat; label: string; icon: React.ReactNode; description: string }> = [
        {
            key: 'markdown',
            label: 'Markdown',
            icon: <FileText className="w-5 h-5" />,
            description: 'GitHub-ready 문서 (개발팀 공유용)'
        },
        {
            key: 'typescript',
            label: 'TypeScript',
            icon: <Code className="w-5 h-5" />,
            description: 'TypeScript 인터페이스 (프론트엔드)'
        },
        {
            key: 'graphql',
            label: 'GraphQL',
            icon: <Database className="w-5 h-5" />,
            description: 'GraphQL 스키마 (API 팀)'
        }
    ];

    const handleFormatToggle = (format: DocumentFormat) => {
        setSelectedFormats(prev =>
            prev.includes(format)
                ? prev.filter(f => f !== format)
                : [...prev, format]
        );
    };

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            const metadata = {
                version: '1.0.0',
                lastUpdatedAt: new Date(),
                lastUpdatedBy: 'PM Team',
                description: 'ATS (Applicant Tracking System) domain ontology'
            };

            const results = await engine.generateMultiple(
                selectedFormats,
                nodes,
                edges,
                metadata
            );

            // 각 포맷별로 다운로드
            results.forEach((content, format) => {
                const generator = (engine as any).generators.get(format);
                const filename = `ontology-schema-${Date.now()}.${generator.extension}`;
                engine.downloadDocument(content, filename, generator.mimeType);
            });

            alert(`${results.size}개 파일이 생성되었습니다!`);
        } catch (error) {
            console.error('Documentation generation failed:', error);
            alert('문서 생성 중 오류가 발생했습니다.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">문서 자동 생성</h3>
                <p className="text-sm text-gray-600">
                    온톨로지를 다양한 형식의 문서로 변환하여 팀과 공유하세요.
                </p>
            </div>

            {/* 포맷 선택 */}
            <div className="space-y-3">
                <label className="text-sm font-medium">생성할 문서 형식</label>
                {formats.map(format => (
                    <div
                        key={format.key}
                        onClick={() => handleFormatToggle(format.key)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedFormats.includes(format.key)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                {selectedFormats.includes(format.key) ? (
                                    <CheckSquare className="w-5 h-5 text-blue-600" />
                                ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {format.icon}
                                    <span className="font-medium">{format.label}</span>
                                </div>
                                <p className="text-sm text-gray-600">{format.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 미리보기 (선택적) */}
            {selectedFormats.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                        <strong>{selectedFormats.length}개</strong> 파일이 생성됩니다:
                        <ul className="mt-2 space-y-1">
                            {selectedFormats.map(format => {
                                const formatInfo = formats.find(f => f.key === format);
                                return (
                                    <li key={format} className="flex items-center gap-2">
                                        {formatInfo?.icon}
                                        <span>ontology-schema.{format === 'typescript' ? 'ts' : format === 'graphql' ? 'graphql' : 'md'}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}

            {/* 생성 버튼 */}
            <button
                onClick={handleGenerate}
                disabled={selectedFormats.length === 0 || isGenerating}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <Download className="w-5 h-5" />
                {isGenerating ? '생성 중...' : '문서 생성 및 다운로드'}
            </button>
        </div>
    );
};
```

---

### 테스트 전략

```typescript
// src/lib/documentation/generators/MarkdownGenerator.test.ts
import { describe, test, expect } from 'vitest';
import { MarkdownGenerator } from './MarkdownGenerator';

describe('MarkdownGenerator', () => {
    const generator = new MarkdownGenerator();

    test('should generate valid markdown', () => {
        const nodes = [
            {
                id: '1',
                data: {
                    label: 'Candidate',
                    description: '채용 지원자',
                    properties: [
                        { id: 'p1', name: 'name', type: 'text', required: true },
                        { id: 'p2', name: 'email', type: 'text', required: true }
                    ]
                }
            }
        ];

        const edges = [];

        const metadata = {
            version: '1.0.0',
            lastUpdatedAt: new Date(),
            description: 'Test ontology'
        };

        const markdown = generator.generate(nodes, edges, metadata);

        expect(markdown).toContain('# ATS Ontology Schema v1.0.0');
        expect(markdown).toContain('## Candidate');
        expect(markdown).toContain('| name | `text` | ✅ |');
    });
});
```

---

## Pain Point #5: 스케일링 ("50개 클래스가 되면...")

### 문제 상황

**현재:**
```
- 12개 클래스: ✅ 관리 가능
- 30개 클래스: ⚠️ 복잡해지기 시작
- 50개 클래스: ❌ 캔버스에 다 안 보임, 관계 파악 어려움
```

**PM의 실제 경험:**
```
Jerry: (50개 클래스 온톨로지를 열었을 때)
      "와... 너무 많아서 어디서부터 봐야 할지 모르겠네"
      "Candidate 클래스가 어디 있지?" (5분 동안 스크롤)
      "'Email'이라는 프로퍼티를 사용하는 클래스가 뭐가 있지?" (일일이 확인)
      "Core 도메인만 보고 싶은데..." (필터링 불가)
```

---

### 해결 방안: 네임스페이스 + 검색 + 필터링

#### 아키텍처

```
┌─────────────────────────────────────────────┐
│          Scalability Features                │
├─────────────────────────────────────────────┤
│  1. Namespace/Grouping                       │
│     - Core, Process, People, Integration     │
│     - Collapsible groups                     │
│                                               │
│  2. Search                                    │
│     - Class name search                       │
│     - Property name search                    │
│     - Fuzzy search                            │
│                                               │
│  3. Filtering                                 │
│     - By namespace                            │
│     - By relationship type                    │
│     - By property type                        │
│                                               │
│  4. Focus Mode                                │
│     - Selected node + 1-hop neighbors         │
│     - Path highlighting                       │
└─────────────────────────────────────────────┘
```

---

### 구현 상세

#### 1. Namespace 타입 정의

```typescript
// src/types/ontology.ts 확장
export type Namespace = 'core' | 'process' | 'people' | 'integration' | 'uncategorized';

export interface ClassNodeData extends BaseNodeData {
    kind: 'class';
    properties: PropertyDefinition[];
    rules: LogicRule[];

    // 추가
    namespace?: Namespace;
    tags?: string[];
}

export interface NamespaceConfig {
    id: Namespace;
    label: string;
    color: string;
    description: string;
    collapsed: boolean;
}
```

---

#### 2. Namespace 관리 스토어

```typescript
// src/stores/useNamespaceStore.ts
import { create } from 'zustand';
import { Namespace, NamespaceConfig } from '@/types/ontology';

interface NamespaceState {
    namespaces: NamespaceConfig[];
    activeNamespaces: Set<Namespace>;

    // Actions
    toggleNamespace: (namespace: Namespace) => void;
    collapseNamespace: (namespace: Namespace) => void;
    expandNamespace: (namespace: Namespace) => void;
    setNodeNamespace: (nodeId: string, namespace: Namespace) => void;
}

export const useNamespaceStore = create<NamespaceState>((set, get) => ({
    namespaces: [
        {
            id: 'core',
            label: 'Core',
            color: '#3B82F6',
            description: '핵심 도메인 엔티티',
            collapsed: false
        },
        {
            id: 'process',
            label: 'Process',
            color: '#10B981',
            description: '프로세스 및 워크플로우',
            collapsed: false
        },
        {
            id: 'people',
            label: 'People',
            color: '#F59E0B',
            description: '사용자 및 조직',
            collapsed: false
        },
        {
            id: 'integration',
            label: 'Integration',
            color: '#8B5CF6',
            description: '외부 연동 및 AI',
            collapsed: false
        }
    ],
    activeNamespaces: new Set(['core', 'process', 'people', 'integration']),

    toggleNamespace: (namespace) => {
        set(state => {
            const newActive = new Set(state.activeNamespaces);
            if (newActive.has(namespace)) {
                newActive.delete(namespace);
            } else {
                newActive.add(namespace);
            }
            return { activeNamespaces: newActive };
        });
    },

    collapseNamespace: (namespace) => {
        set(state => ({
            namespaces: state.namespaces.map(ns =>
                ns.id === namespace ? { ...ns, collapsed: true } : ns
            )
        }));
    },

    expandNamespace: (namespace) => {
        set(state => ({
            namespaces: state.namespaces.map(ns =>
                ns.id === namespace ? { ...ns, collapsed: false } : ns
            )
        }));
    },

    setNodeNamespace: (nodeId, namespace) => {
        useOntologyStore.getState().updateNode(nodeId, {
            namespace
        });
    }
}));
```

---

#### 3. 검색 기능

```typescript
// src/lib/search/SearchEngine.ts
import Fuse from 'fuse.js';
import { Node } from 'reactflow';

export interface SearchResult {
    node: Node;
    matches: Array<{
        key: string;  // 'label', 'properties.name', etc.
        value: string;
        indices: number[][];
    }>;
    score: number;
}

export class SearchEngine {
    private fuse: Fuse<Node> | null = null;

    initialize(nodes: Node[]): void {
        this.fuse = new Fuse(nodes, {
            keys: [
                { name: 'data.label', weight: 2 },  // 클래스명 가중치 높음
                { name: 'data.description', weight: 1 },
                { name: 'data.properties.name', weight: 1.5 },
                { name: 'data.properties.description', weight: 0.5 }
            ],
            includeScore: true,
            includeMatches: true,
            threshold: 0.4,  // 퍼지 매칭 정도
            minMatchCharLength: 2
        });
    }

    search(query: string): SearchResult[] {
        if (!this.fuse || !query.trim()) {
            return [];
        }

        const results = this.fuse.search(query);

        return results.map(result => ({
            node: result.item,
            matches: result.matches?.map(match => ({
                key: match.key || '',
                value: match.value || '',
                indices: match.indices || []
            })) || [],
            score: result.score || 0
        }));
    }

    searchByProperty(propertyName: string): Node[] {
        if (!this.fuse) return [];

        // 특정 프로퍼티를 가진 모든 노드 찾기
        const allNodes = this.fuse.getIndex().docs as Node[];

        return allNodes.filter(node =>
            node.data.properties?.some(prop =>
                prop.name.toLowerCase().includes(propertyName.toLowerCase())
            )
        );
    }
}
```

---

#### 4. 필터링 UI

```typescript
// src/components/FilterPanel.tsx
import React, { useState } from 'react';
import { useNamespaceStore } from '@/stores/useNamespaceStore';
import { useOntologyStore } from '@/stores/useOntologyStore';
import { Filter, Search, X } from 'lucide-react';

export const FilterPanel: React.FC = () => {
    const { namespaces, activeNamespaces, toggleNamespace } = useNamespaceStore();
    const { nodes } = useOntologyStore();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNodes = nodes.filter(node => {
        // Namespace 필터
        const namespace = node.data.namespace || 'uncategorized';
        if (!activeNamespaces.has(namespace)) {
            return false;
        }

        // 검색 쿼리 필터
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesLabel = node.data.label.toLowerCase().includes(query);
            const matchesProperty = node.data.properties?.some(prop =>
                prop.name.toLowerCase().includes(query)
            );
            return matchesLabel || matchesProperty;
        }

        return true;
    });

    return (
        <div className="w-80 border-r bg-gray-50 p-4 space-y-6">
            {/* 검색 */}
            <div>
                <label className="text-sm font-medium mb-2 block">검색</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="클래스 또는 프로퍼티 검색..."
                        className="w-full pl-10 pr-10 py-2 border rounded-lg"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    {filteredNodes.length} / {nodes.length} 클래스 표시 중
                </div>
            </div>

            {/* Namespace 필터 */}
            <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Namespace
                </label>
                <div className="space-y-2">
                    {namespaces.map(ns => {
                        const isActive = activeNamespaces.has(ns.id);
                        const nodeCount = nodes.filter(n => n.data.namespace === ns.id).length;

                        return (
                            <div
                                key={ns.id}
                                onClick={() => toggleNamespace(ns.id)}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                    isActive
                                        ? 'border-blue-500 bg-white'
                                        : 'border-gray-200 bg-gray-100 opacity-60'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: ns.color }}
                                        />
                                        <span className="font-medium text-sm">{ns.label}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{nodeCount}</span>
                                </div>
                                <div className="text-xs text-gray-600 mt-1">{ns.description}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
```

---

#### 5. Focus Mode

```typescript
// src/stores/useOntologyStore.ts에 추가
interface OntologyState {
    // ...existing state
    focusedNodeId: string | null;

    // Actions
    setFocusNode: (nodeId: string | null) => void;
    getNeighborNodes: (nodeId: string) => Node[];
}

export const useOntologyStore = create<OntologyState>((set, get) => ({
    // ... existing state
    focusedNodeId: null,

    setFocusNode: (nodeId) => {
        set({ focusedNodeId: nodeId });
    },

    getNeighborNodes: (nodeId) => {
        const { nodes, edges } = get();

        // 1-hop 이웃 찾기
        const connectedEdges = edges.filter(
            e => e.source === nodeId || e.target === nodeId
        );

        const neighborIds = new Set<string>();
        connectedEdges.forEach(edge => {
            if (edge.source === nodeId) {
                neighborIds.add(edge.target);
            } else {
                neighborIds.add(edge.source);
            }
        });

        return nodes.filter(n => neighborIds.has(n.id));
    }
}));

// 사용 예시
const FocusMode: React.FC = () => {
    const { focusedNodeId, nodes, edges, getNeighborNodes } = useOntologyStore();

    const visibleNodes = focusedNodeId
        ? [
              nodes.find(n => n.id === focusedNodeId)!,
              ...getNeighborNodes(focusedNodeId)
          ]
        : nodes;

    const visibleEdges = focusedNodeId
        ? edges.filter(e => e.source === focusedNodeId || e.target === focusedNodeId)
        : edges;

    return (
        <ReactFlow
            nodes={visibleNodes}
            edges={visibleEdges}
            // ...
        />
    );
};
```

---

### 성능 최적화

```typescript
// 1. 가상 스크롤 (노드가 많을 때)
import { useVirtual } from 'react-virtual';

// 2. 레이지 로딩 (네임스페이스별)
const LazyNamespace: React.FC<{ namespace: Namespace }> = ({ namespace }) => {
    const nodes = useOntologyStore(state =>
        state.nodes.filter(n => n.data.namespace === namespace)
    );

    return <Suspense fallback={<div>Loading...</div>}>{/* render nodes */}</Suspense>;
};

// 3. Memoization
const ClassNode = React.memo(({ data }) => {
    // 렌더링 로직
}, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
});
```

---

## 통합 개발 계획

### Week 1-2: Pain Point #3 (온톨로지 검증)
- [ ] Day 1-2: 타입 정의 및 Validator 인터페이스
- [ ] Day 3-5: 5개 Validator 구현
- [ ] Day 6-7: ValidationEngine 및 UI 통합
- [ ] Day 8-9: 테스트 작성
- [ ] Day 10: 문서 작성 및 리뷰

### Week 3-4: Pain Point #4 (문서 자동 생성)
- [ ] Day 1-3: Markdown, TypeScript Generator
- [ ] Day 4-5: GraphQL Generator
- [ ] Day 6-7: DocumentationEngine 및 UI
- [ ] Day 8-9: 테스트 작성
- [ ] Day 10: 문서 작성 및 리뷰

### Week 5-7: Pain Point #5 (스케일링)
- [ ] Day 1-3: Namespace 시스템
- [ ] Day 4-6: 검색 기능 (Fuse.js)
- [ ] Day 7-10: 필터링 UI
- [ ] Day 11-14: Focus Mode
- [ ] Day 15-17: 성능 최적화
- [ ] Day 18-21: 테스트 및 문서

---

## 예상 임팩트

### Pain Point #3 해결 후
- PM의 온톨로지 검증 시간: **1시간 → 12분 (80% 감소)**
- 논리적 오류 감지율: **60% → 95% (58% 향상)**
- 동료 리뷰 대기 시간: **1일 → 즉시**

### Pain Point #4 해결 후
- 개발팀 커뮤니케이션 왕복: **평균 5회 → 2회 (60% 감소)**
- PM의 문서 작성 시간: **1-2시간 → 2분 (98% 감소)**
- JSON 해석 오류: **10% → 1% (90% 감소)**

### Pain Point #5 해결 후
- 관리 가능한 클래스 개수: **12개 → 50+ (4배 증가)**
- 특정 클래스 찾는 시간: **5분 → 10초 (97% 감소)**
- 캔버스 혼잡도: **높음 → 낮음 (Namespace 분리)**

---

## 의존성 설치

```bash
# 검증 엔진 (Optional)
npm install --save-dev @typescript-eslint/eslint-plugin

# 문서 생성
# (기본 라이브러리만 사용, 추가 설치 불필요)

# 검색 (Fuse.js)
npm install fuse.js
npm install --save-dev @types/fuse.js

# 가상 스크롤 (선택적)
npm install react-virtual
```

---

## 마무리 체크리스트

### Phase 3 완료 기준
- [ ] 모든 Validator 구현 및 테스트 통과
- [ ] 3가지 포맷 문서 생성 가능 (Markdown, TS, GraphQL)
- [ ] Namespace 시스템 작동
- [ ] 검색 기능 구현 (퍼지 매칭)
- [ ] 필터링 UI 완성
- [ ] 50개 클래스에서 성능 테스트 통과
- [ ] PM 사용성 테스트 3명 완료
- [ ] 개발자 문서 작성

---

**문서 끝**
