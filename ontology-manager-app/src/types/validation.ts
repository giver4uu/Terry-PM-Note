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
