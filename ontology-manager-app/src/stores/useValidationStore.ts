import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../types/ontology';
import { ValidationResult } from '../types/validation';
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
