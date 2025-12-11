
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    Edge,
    Node,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';
import { OntologyNodeData, OntologyEdgeData, PropertyDefinition, LogicRule } from '../types/ontology';

interface OntologyState {
    nodes: Node<OntologyNodeData>[];
    edges: Edge<OntologyEdgeData>[];
    selectedNodeId: string | null;
    selectedEdgeId: string | null;

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;

    addNode: (node: Node<OntologyNodeData>) => void;
    removeNode: (id: string) => void;
    selectNode: (nodeId: string | null) => void;
    selectEdge: (edgeId: string | null) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
    updateNodeDescription: (nodeId: string, description: string) => void;

    // Property Actions
    addProperty: (nodeId: string, property: PropertyDefinition) => void;
    updateProperty: (nodeId: string, propertyId: string, updates: Partial<PropertyDefinition>) => void;
    removeProperty: (nodeId: string, propertyId: string) => void;

    // Rule Actions
    updateRule: (nodeId: string, ruleId: string, updates: Partial<LogicRule>) => void;
    removeRule: (nodeId: string, ruleId: string) => void;

    // View Mode
    viewMode: 'schema' | 'graph';
    setViewMode: (mode: 'schema' | 'graph') => void;
}

// Initial Data based on Use Case Catalog
const initialNodes: Node<OntologyNodeData>[] = [
    // Tier 1: Core Domain Objects
    {
        id: 'candidate',
        type: 'classNode',
        position: { x: 50, y: 300 },
        data: {
            label: 'Candidate',
            kind: 'class',
            description: '채용 지원자 개인 (The central entity of recruitment)',
            properties: [
                { id: 'c1', name: 'name', type: 'text', required: true, description: '지원자 이름' },
                { id: 'c2', name: 'email', type: 'text', required: true, description: '이메일 주소 (Unique ID)' },
                { id: 'c3', name: 'phone', type: 'text', required: false, description: '연락처' },
                { id: 'c4', name: 'response_pattern', type: 'text', required: false, description: '평균 응답 패턴 및 성향' },
                { id: 'c5', name: 'avg_response_time', type: 'number', required: false, description: '평균 응답 소요 시간 (시간)' },
                { id: 'c6', name: 'current_status', type: 'text', required: true, description: '현재 채용 상태 (예: active, rejected)' },
            ],
            rules: []
        }
    },
    {
        id: 'job_posting',
        type: 'classNode',
        position: { x: 450, y: 50 },
        data: {
            label: 'Job Posting',
            kind: 'class',
            description: '채용 공고 (Position opening)',
            properties: [
                { id: 'jp1', name: 'title', type: 'text', required: true, description: '공고 제목' },
                { id: 'jp2', name: 'department_id', type: 'text', required: true, description: '소속 부서 ID' },
                { id: 'jp3', name: 'status', type: 'text', required: true, description: '공고 상태 (Open, Closed)' },
                { id: 'jp4', name: 'salary_range', type: 'text', required: false, description: '급여 범위 예시' },
            ],
            rules: []
        }
    },
    {
        id: 'application',
        type: 'classNode',
        position: { x: 450, y: 300 },
        data: {
            label: 'Application',
            kind: 'class',
            description: '지원서 (Submission record)',
            properties: [
                { id: 'app1', name: 'applied_date', type: 'date', required: true, description: '지원 일자' },
                { id: 'app2', name: 'current_stage', type: 'text', required: true, description: '현재 진행 단계' },
                { id: 'app3', name: 'overall_status', type: 'text', required: true, description: '전체 진행 상태' },
                { id: 'app4', name: 'stage_entered_at', type: 'date', required: true, description: '현 단계 진입 일시' },
                { id: 'app5', name: 'rejection_reason', type: 'text', required: false, description: '탈락 사유 (있는 경우)' },
            ],
            rules: []
        }
    },
    {
        id: 'interview',
        type: 'classNode',
        position: { x: 850, y: 300 },
        data: {
            label: 'Interview',
            kind: 'class',
            description: '면접 (Interview session)',
            properties: [
                { id: 'int1', name: 'scheduled_date', type: 'date', required: true, description: '면접 예정 일시' },
                { id: 'int2', name: 'type', type: 'text', required: true, description: '면접 유형 (화상, 대면 등)' },
                { id: 'int3', name: 'status', type: 'text', required: true, description: '진행 상태 (Scheduled, Completed)' },
                { id: 'int4', name: 'actual_end_time', type: 'date', required: false, description: '실제 종료 시간' },
            ],
            rules: []
        }
    },
    {
        id: 'evaluation',
        type: 'classNode',
        position: { x: 1150, y: 300 },
        data: {
            label: 'Evaluation',
            kind: 'class',
            description: '평가 (Candidate assessment)',
            properties: [
                { id: 'ev1', name: 'score', type: 'number', required: true, description: '평가 점수 (1-5)' },
                { id: 'ev2', name: 'feedback_text', type: 'text', required: true, description: '상세 피드백 내용' },
                { id: 'ev3', name: 'recommendation', type: 'text', required: true, description: '합격 여부 추천' },
                { id: 'ev4', name: 'submitted_at', type: 'date', required: true, description: '평가 제출 일시' },
            ],
            rules: []
        }
    },

    // Tier 2: Process Management Objects
    {
        id: 'recruitment_stage',
        type: 'classNode',
        position: { x: 450, y: 600 },
        data: {
            label: 'Recruitment Stage',
            kind: 'class',
            description: '채용 단계 (Stage in the hiring funnel)',
            properties: [
                { id: 'rs1', name: 'stage_name', type: 'text', required: true, description: '단계 명칭' },
                { id: 'rs2', name: 'avg_duration', type: 'number', required: false, description: '평균 소요 기간 (일)' },
                { id: 'rs3', name: 'sequence_order', type: 'number', required: true, description: '단계 순서' },
                { id: 'rs4', name: 'benchmark', type: 'number', required: true, description: '목표 소요 기간 (Benchmark)' },
            ],
            rules: []
        }
    },
    {
        id: 'stage_transition',
        type: 'classNode',
        position: { x: 250, y: 450 },
        data: {
            label: 'Stage Transition',
            kind: 'class',
            description: '단계 이동 (Recorded movement between stages)',
            properties: [
                { id: 'st1', name: 'from_stage', type: 'text', required: true, description: '이전 단계' },
                { id: 'st2', name: 'to_stage', type: 'text', required: true, description: '이동한 단계' },
                { id: 'st3', name: 'timestamp', type: 'date', required: true, description: '이동 일시' },
                { id: 'st4', name: 'duration', type: 'number', required: true, description: '이전 단계 체류 시간' },
            ],
            rules: []
        }
    },
    {
        id: 'task',
        type: 'classNode',
        position: { x: 850, y: 550 },
        data: {
            label: 'Task',
            kind: 'class',
            description: '채용 관련 할 일 (To-Do items)',
            properties: [
                { id: 't1', name: 'type', type: 'text', required: true, description: '작업 유형' },
                { id: 't2', name: 'due_date', type: 'date', required: true, description: '마감 기한' },
                { id: 't3', name: 'priority', type: 'text', required: true, description: '우선순위' },
                { id: 't4', name: 'status', type: 'text', required: true, description: '완료 여부' },
            ],
            rules: []
        }
    },
    {
        id: 'communication',
        type: 'classNode',
        position: { x: 50, y: 550 },
        data: {
            label: 'Communication',
            kind: 'class',
            description: '커뮤니케이션 (Messaging record)',
            properties: [
                { id: 'cm1', name: 'channel', type: 'text', required: true, description: '소통 채널' },
                { id: 'cm2', name: 'timestamp', type: 'date', required: true, description: '발송 일시' },
                { id: 'cm3', name: 'response_time', type: 'number', required: false, description: '응답 소요 시간' },
                { id: 'cm4', name: 'sender', type: 'text', required: true, description: '발신자' },
            ],
            rules: []
        }
    },

    // Tier 3: People Objects
    {
        id: 'recruiter',
        type: 'classNode',
        position: { x: 250, y: 800 },
        data: {
            label: 'Recruiter',
            kind: 'class',
            description: '리크루팅 담당자 (HR professional)',
            properties: [
                { id: 'r1', name: 'name', type: 'text', required: true, description: '리크루터 이름' },
                { id: 'r2', name: 'assigned_positions', type: 'number', required: false, description: '담당 포지션 수' },
            ],
            rules: []
        }
    },
    {
        id: 'interviewer',
        type: 'classNode',
        position: { x: 1150, y: 550 },
        data: {
            label: 'Interviewer',
            kind: 'class',
            description: '면접관 (Hiring team member)',
            properties: [
                { id: 'i1', name: 'name', type: 'text', required: true, description: '면접관 이름' },
                { id: 'i2', name: 'email', type: 'text', required: true, description: '이메일' },
                { id: 'i3', name: 'avg_feedback_time', type: 'number', required: false, description: '평균 피드백 제출 시간' },
                { id: 'i4', name: 'monthly_count', type: 'number', required: false, description: '월간 면접 횟수' },
            ],
            rules: []
        }
    },

    // Tier 4: AI Objects
    {
        id: 'ai_recommendation',
        type: 'classNode',
        position: { x: 650, y: 800 },
        data: {
            label: 'AI Recommendation',
            kind: 'class',
            description: 'AI 제안 (AI-generated suggestions)',
            properties: [
                { id: 'ai1', name: 'type', type: 'text', required: true, description: '제안 유형 (Risk, Info)' },
                { id: 'ai2', name: 'confidence_score', type: 'number', required: true, description: 'AI 확신도 (0-1)' },
                { id: 'ai3', name: 'reasoning', type: 'text', required: true, description: '제안 근거 (Transparent reasoning)' },
                { id: 'ai4', name: 'suggested_action', type: 'text', required: true, description: '권장 행동' },
                { id: 'ai5', name: 'user_action', type: 'text', required: false, description: '사용자 반응 (Accepted/Ignored)' },
            ],
            rules: []
        }
    },

    // Tier 5: Extended Objects (Week 3)
    {
        id: 'offer',
        type: 'classNode',
        position: { x: 1450, y: 300 },
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
        position: { x: 450, y: -150 },
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
        position: { x: 750, y: -150 },
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
];

const initialEdges: Edge<OntologyEdgeData>[] = [
    // Core Flows
    { id: 'e_app_job', source: 'application', target: 'job_posting', label: 'FOR_POSITION', data: { label: 'FOR_POSITION', cardinality: 'N:1', description: '지원서가 특정 공고를 대상으로 함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_app_cand', source: 'application', target: 'candidate', label: 'CREATES', data: { label: 'CREATES', cardinality: '1:1', description: '지원서가 특정 지원자를 나타냄' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // Interview Process
    { id: 'e_int_app', source: 'interview', target: 'application', label: 'SCHEDULES', data: { label: 'SCHEDULES', cardinality: 'N:1', description: '면접이 특정 지원 건에 대해 잡힘' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_int_interviewer', source: 'interviewer', target: 'interview', label: 'PARTICIPATES_IN', data: { label: 'PARTICIPATES_IN', cardinality: 'N:M', description: '면접관이 면접에 참여함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // Evaluation
    { id: 'e_eval_int', source: 'evaluation', target: 'interview', label: 'RESULTS_FROM', data: { label: 'RESULTS_FROM', cardinality: '1:1', description: '평가는 특정 면접의 결과임' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_eval_cand', source: 'evaluation', target: 'candidate', label: 'EVALUATES', data: { label: 'EVALUATES', cardinality: 'N:1', description: '면접관이 후보자를 평가함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // Recruiter Management
    { id: 'e_rec_app', source: 'recruiter', target: 'application', label: 'ASSIGNS', data: { label: 'ASSIGNS', cardinality: '1:N', description: '리크루터가 지원 건을 담당함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_rec_comm', source: 'recruiter', target: 'communication', label: 'SENDS', data: { label: 'SENDS', cardinality: '1:N', description: '리크루터가 메시지를 보냄' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // Communication
    { id: 'e_comm_cand', source: 'communication', target: 'candidate', label: 'COMMUNICATES_WITH', data: { label: 'COMMUNICATES_WITH', cardinality: 'N:1', description: '메시지가 후보자와 관련됨' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // Recruitment Stages
    { id: 'e_stage_app', source: 'application', target: 'recruitment_stage', label: 'CURRENTLY_IN', data: { label: 'CURRENTLY_IN', cardinality: 'N:1', description: '지원서가 현재 특정 단계에 있음' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_trans_app', source: 'stage_transition', target: 'application', label: 'HAPPENS_TO', data: { label: 'HAPPENS_TO', cardinality: 'N:1', description: '단계 이동이 특정 지원 건에서 발생함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_trans_stage', source: 'stage_transition', target: 'recruitment_stage', label: 'PROGRESSES_TO', data: { label: 'PROGRESSES_TO', cardinality: 'N:1', description: '단계 이동으로 새로운 단계에 도달함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // AI
    { id: 'e_ai_app', source: 'ai_recommendation', target: 'application', label: 'RECOMMENDS_FOR', data: { label: 'RECOMMENDS_FOR', cardinality: 'N:1', description: 'AI가 특정 지원 건에 대해 제안함' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_ai_eval', source: 'ai_recommendation', target: 'evaluation', label: 'VALIDATED_BY', data: { label: 'VALIDATED_BY', cardinality: 'N:1', description: 'AI 제안이 실제 평가 결과로 검증됨' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

    // Extended Relationships (Week 3)
    { id: 'e_eval_offer', source: 'evaluation', target: 'offer', label: 'RESULTS_IN', data: { label: 'RESULTS_IN', cardinality: '1:1', description: '평가 결과로 제안서 생성' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_hm_job', source: 'hiring_manager', target: 'job_posting', label: 'REQUESTS', data: { label: 'REQUESTS', cardinality: '1:N', description: '부서장이 공고 요청' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e_dept_job', source: 'department', target: 'job_posting', label: 'OWNS', data: { label: 'OWNS', cardinality: '1:N', description: '부서가 공고 소유' }, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

interface OntologyState {
    nodes: Node<OntologyNodeData>[];
    edges: Edge<OntologyEdgeData>[];
    selectedNodeId: string | null;
    selectedEdgeId: string | null;

    // Actions
    selectNode: (id: string | null) => void;
    selectEdge: (id: string | null) => void;
    addNode: (node: Node<OntologyNodeData>) => void;
    updateNodeLabel: (id: string, label: string) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;

    // Node Properties
    addProperty: (nodeId: string, property: PropertyDefinition) => void;
    removeProperty: (nodeId: string, propertyId: string) => void;
    updateProperty: (nodeId: string, propertyId: string, updates: Partial<PropertyDefinition>) => void;

    // Node Rules
    addRule: (nodeId: string, rule: LogicRule) => void;
    removeRule: (nodeId: string, ruleId: string) => void;
    updateRule: (nodeId: string, ruleId: string, updates: Partial<LogicRule>) => void;

    // Edge Properties
    updateEdge: (id: string, data: Partial<OntologyEdgeData>) => void;
    removeEdge: (id: string) => void;
}

export const useOntologyStore = create<OntologyState>()(
    persist(
        (set, get) => ({
            nodes: initialNodes,
            edges: initialEdges,
            selectedNodeId: null,
            selectedEdgeId: null,

            selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
            selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),

            addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),

            removeNode: (id) =>
                set((state) => ({
                    nodes: state.nodes.filter((n) => n.id !== id),
                    edges: state.edges.filter((e) => e.source !== id && e.target !== id),
                    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
                })),

            updateNodeLabel: (id, label) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === id ? { ...node, data: { ...node.data, label } } : node
                    ),
                })),

            updateNodeDescription: (id, description) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === id ? { ...node, data: { ...node.data, description } } : node
                    ),
                })),

            onNodesChange: (changes) => {
                set({
                    nodes: applyNodeChanges(changes, get().nodes),
                });
            },

            onEdgesChange: (changes) => {
                set({
                    edges: applyEdgeChanges(changes, get().edges),
                });
            },

            onConnect: (connection) => {
                if (!connection.source || !connection.target) return;

                const edge: Edge<OntologyEdgeData> = {
                    source: connection.source,
                    target: connection.target,
                    sourceHandle: connection.sourceHandle,
                    targetHandle: connection.targetHandle,
                    id: `e_${Date.now()} `,
                    type: 'smoothstep',
                    label: 'RELATION',
                    data: {
                        label: 'RELATION',
                        cardinality: '1:1'
                    },
                    markerEnd: { type: MarkerType.ArrowClosed }
                };
                set({ edges: addEdge(edge, get().edges) });
            },

            addProperty: (nodeId, property) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? { ...node, data: { ...node.data, properties: [...node.data.properties, property] } }
                            : node
                    ),
                })),

            removeProperty: (nodeId, propertyId) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    properties: node.data.properties.filter((p) => p.id !== propertyId),
                                },
                            }
                            : node
                    ),
                })),

            updateProperty: (nodeId, propertyId, updates) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    properties: node.data.properties.map((p) =>
                                        p.id === propertyId ? { ...p, ...updates } : p
                                    ),
                                },
                            }
                            : node
                    ),
                })),

            addRule: (nodeId, rule) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? { ...node, data: { ...node.data, rules: [...node.data.rules, rule] } }
                            : node
                    ),
                })),

            removeRule: (nodeId, ruleId) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    rules: node.data.rules.filter((r) => r.id !== ruleId),
                                },
                            }
                            : node
                    ),
                })),

            updateRule: (nodeId, ruleId, updates) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    rules: node.data.rules.map((r) =>
                                        r.id === ruleId ? { ...r, ...updates } : r
                                    ),
                                },
                            }
                            : node
                    ),
                })),

            updateEdge: (id, data) =>
                set((state) => ({
                    edges: state.edges.map((edge) => {
                        if (edge.id !== id) return edge;

                        const newLabel = data.label !== undefined ? data.label : (typeof edge.label === 'string' ? edge.label : 'RELATION');
                        const newData: OntologyEdgeData = {
                            label: newLabel,
                            cardinality: data.cardinality || edge.data?.cardinality || '1:1',
                            description: data.description !== undefined ? data.description : edge.data?.description
                        };

                        return {
                            ...edge,
                            label: newLabel,
                            data: newData
                        };
                    }),
                })),

            removeEdge: (id) =>
                set((state) => ({
                    edges: state.edges.filter((edge) => edge.id !== id),
                    selectedEdgeId: state.selectedEdgeId === id ? null : state.selectedEdgeId,
                })),

            viewMode: 'schema',
            setViewMode: (mode) =>
                set((state) => {
                    // First, always get clean class-only nodes and edges
                    const classNodes = state.nodes.filter(n => n.data.kind !== 'property');
                    const classEdges = state.edges.filter(e => !e.data?.isPropertyEdge);

                    if (mode === 'schema') {
                        // Schema View: boxes with properties inside
                        return {
                            viewMode: mode,
                            nodes: classNodes.map(n => ({
                                ...n,
                                type: 'classNode'
                            })),
                            edges: classEdges
                        };
                    } else {
                        // Graph View: expand properties as connected nodes
                        const propertyNodes: Node<OntologyNodeData>[] = [];
                        const propertyEdges: Edge[] = [];

                        classNodes.forEach(classNode => {
                            classNode.data.properties.forEach((prop, index) => {
                                const propNodeId = `${classNode.id}_prop_${prop.id}`;
                                // Position properties in a circle around the class
                                const angle = (index / classNode.data.properties.length) * Math.PI * 2;
                                const radius = 120;

                                propertyNodes.push({
                                    id: propNodeId,
                                    type: 'graphNode',
                                    position: {
                                        x: classNode.position.x + Math.cos(angle) * radius,
                                        y: classNode.position.y + Math.sin(angle) * radius
                                    },
                                    data: {
                                        label: prop.name,
                                        kind: 'property' as const,
                                        description: prop.description,
                                        properties: [],
                                        rules: [],
                                        _metadata: {
                                            originalType: prop.type,
                                            originalRequired: prop.required,
                                            originalId: prop.id,
                                            parentClassId: classNode.id
                                        }
                                    }
                                });

                                propertyEdges.push({
                                    id: `e_prop_${classNode.id}_${prop.id}`,
                                    source: classNode.id,
                                    target: propNodeId,
                                    type: 'default',
                                    animated: false,
                                    style: { stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4' },
                                    data: { isPropertyEdge: true, label: '', cardinality: '1:1' as const }
                                });
                            });
                        });

                        const graphNodes = classNodes.map(n => ({
                            ...n,
                            type: 'graphNode'
                        }));

                        return {
                            viewMode: mode,
                            nodes: [...graphNodes, ...propertyNodes],
                            edges: [...classEdges, ...propertyEdges]
                        };
                    }
                }),

        }),
        {
            name: 'ontology-storage',
            storage: createJSONStorage(() => localStorage),
            // Only persist class nodes and non-property edges
            partialize: (state) => ({
                nodes: state.nodes.filter(n => n.data.kind !== 'property'),
                edges: state.edges.filter(e => !e.data?.isPropertyEdge)
            }),
            version: 1,
            migrate: (persistedState: any, version) => {
                if (version === 0) {
                    // Migration from v0 to v1: Backfill descriptions from initialNodes
                    const newNodes = persistedState.nodes.map((pNode: any) => {
                        const templateNode = initialNodes.find(iNode => iNode.id === pNode.id);
                        if (templateNode) {
                            return {
                                ...pNode,
                                data: {
                                    ...pNode.data,
                                    description: templateNode.data.description, // Backfill description
                                    properties: pNode.data.properties.map((pProp: any) => {
                                        const templateProp = templateNode.data.properties.find(tProp => tProp.id === pProp.id);
                                        return templateProp ? { ...pProp, description: templateProp.description } : pProp;
                                    })
                                }
                            };
                        }
                        return pNode;
                    });

                    const newEdges = persistedState.edges.map((pEdge: any) => {
                        const templateEdge = initialEdges.find(iEdge => iEdge.id === pEdge.id);
                        if (templateEdge) {
                            return {
                                ...pEdge,
                                data: {
                                    ...pEdge.data,
                                    description: templateEdge.data?.description
                                }
                            }
                        }
                        return pEdge;
                    });

                    return {
                        ...persistedState,
                        nodes: newNodes,
                        edges: newEdges
                    };
                }
                return persistedState;
            },
        }
    )
);

