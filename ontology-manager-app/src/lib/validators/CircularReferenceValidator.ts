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
                const nodeLabels = cycle.map(id => {
                    const n = nodes.find(node => node.id === id);
                    return n ? n.data.label : id;
                });
                issues.push({
                    id: `circular-${node.id}`,
                    level: 'error',
                    message: `순환 참조 발견: ${nodeLabels.join(' → ')}`,
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
