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
        labelMap.forEach((duplicates) => {
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
