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
