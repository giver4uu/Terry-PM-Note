import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';
import { Validator, ValidationIssue } from '../../types/validation';

export class CardinalityConsistencyValidator implements Validator {
    name = 'CardinalityConsistencyValidator';
    description = 'Edge Cardinality 일관성을 검증합니다';

    validate(
        _nodes: Node<OntologyNodeData>[],
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
