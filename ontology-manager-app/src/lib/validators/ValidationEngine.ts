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
