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
