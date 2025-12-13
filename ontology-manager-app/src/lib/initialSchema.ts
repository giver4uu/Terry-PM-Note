/**
 * Initial Schema Data
 * 
 * Default ontology schema for ATS (Applicant Tracking System) domain.
 * This replaces the embedded initialNodes/initialEdges in useOntologyStore.
 */

import {
    OntologySchema,
    OntologyClass,
    OntologyProperty,
    ClassPropertyLink,
    OntologyRelation
} from '../types/schema';

// =============================================================================
// Classes
// =============================================================================

const classes: [string, OntologyClass][] = [
    // Tier 1: Core Domain Objects
    ['candidate', { id: 'candidate', name: 'Candidate', description: '채용 지원자 개인 (The central entity of recruitment)' }],
    ['job_posting', { id: 'job_posting', name: 'Job Posting', description: '채용 공고 (Position opening)' }],
    ['application', { id: 'application', name: 'Application', description: '지원서 (Submission record)' }],
    ['interview', { id: 'interview', name: 'Interview', description: '면접 (Interview session)' }],
    ['evaluation', { id: 'evaluation', name: 'Evaluation', description: '평가 (Candidate assessment)' }],

    // Tier 2: Process Management Objects
    ['recruitment_stage', { id: 'recruitment_stage', name: 'Recruitment Stage', description: '채용 단계 (Stage in the hiring funnel)' }],
    ['stage_transition', { id: 'stage_transition', name: 'Stage Transition', description: '단계 이동 (Recorded movement between stages)' }],
    ['task', { id: 'task', name: 'Task', description: '채용 관련 할 일 (To-Do items)' }],
    ['communication', { id: 'communication', name: 'Communication', description: '커뮤니케이션 (Messaging record)' }],

    // Tier 3: People Objects
    ['recruiter', { id: 'recruiter', name: 'Recruiter', description: '리크루팅 담당자 (HR professional)' }],
    ['interviewer', { id: 'interviewer', name: 'Interviewer', description: '면접관 (Hiring team member)' }],

    // Tier 4: AI Objects
    ['ai_recommendation', { id: 'ai_recommendation', name: 'AI Recommendation', description: 'AI 제안 (AI-generated suggestions)' }],

    // Tier 5: Extended Objects
    ['offer', { id: 'offer', name: 'Offer', description: '최종 합격 제안 (연봉 협상 및 수락/거절)' }],
    ['hiring_manager', { id: 'hiring_manager', name: 'Hiring Manager', description: '채용 의뢰 부서장 (실제 의사결정권자)' }],
    ['department', { id: 'department', name: 'Department', description: '조직 부서' }],
];

// =============================================================================
// Properties (Global Pool - Deduplicated)
// =============================================================================

const properties: [string, OntologyProperty][] = [
    // Common properties (shared across classes)
    ['name', { id: 'name', name: 'name', dataType: 'text', description: '이름' }],
    ['email', { id: 'email', name: 'email', dataType: 'text', description: '이메일 주소' }],
    ['phone', { id: 'phone', name: 'phone', dataType: 'text', description: '연락처' }],
    ['status', { id: 'status', name: 'status', dataType: 'text', description: '상태' }],
    ['type', { id: 'type', name: 'type', dataType: 'text', description: '유형' }],
    ['description', { id: 'description', name: 'description', dataType: 'text', description: '설명' }],

    // Candidate properties
    ['response_pattern', { id: 'response_pattern', name: 'response_pattern', dataType: 'text', description: '평균 응답 패턴 및 성향' }],
    ['avg_response_time', { id: 'avg_response_time', name: 'avg_response_time', dataType: 'number', description: '평균 응답 소요 시간 (시간)' }],
    ['current_status', { id: 'current_status', name: 'current_status', dataType: 'text', description: '현재 채용 상태' }],

    // Job Posting properties
    ['title', { id: 'title', name: 'title', dataType: 'text', description: '공고 제목' }],
    ['department_id', { id: 'department_id', name: 'department_id', dataType: 'text', description: '소속 부서 ID' }],
    ['salary_range', { id: 'salary_range', name: 'salary_range', dataType: 'text', description: '급여 범위' }],

    // Application properties
    ['applied_date', { id: 'applied_date', name: 'applied_date', dataType: 'date', description: '지원 일자' }],
    ['current_stage', { id: 'current_stage', name: 'current_stage', dataType: 'text', description: '현재 진행 단계' }],
    ['overall_status', { id: 'overall_status', name: 'overall_status', dataType: 'text', description: '전체 진행 상태' }],
    ['stage_entered_at', { id: 'stage_entered_at', name: 'stage_entered_at', dataType: 'date', description: '현 단계 진입 일시' }],
    ['rejection_reason', { id: 'rejection_reason', name: 'rejection_reason', dataType: 'text', description: '탈락 사유' }],

    // Interview properties
    ['scheduled_date', { id: 'scheduled_date', name: 'scheduled_date', dataType: 'date', description: '예정 일시' }],
    ['actual_end_time', { id: 'actual_end_time', name: 'actual_end_time', dataType: 'date', description: '실제 종료 시간' }],

    // Evaluation properties
    ['score', { id: 'score', name: 'score', dataType: 'number', description: '평가 점수' }],
    ['feedback_text', { id: 'feedback_text', name: 'feedback_text', dataType: 'text', description: '상세 피드백 내용' }],
    ['recommendation', { id: 'recommendation', name: 'recommendation', dataType: 'text', description: '합격 여부 추천' }],
    ['submitted_at', { id: 'submitted_at', name: 'submitted_at', dataType: 'date', description: '제출 일시' }],

    // Stage properties
    ['stage_name', { id: 'stage_name', name: 'stage_name', dataType: 'text', description: '단계 명칭' }],
    ['avg_duration', { id: 'avg_duration', name: 'avg_duration', dataType: 'number', description: '평균 소요 기간 (일)' }],
    ['sequence_order', { id: 'sequence_order', name: 'sequence_order', dataType: 'number', description: '단계 순서' }],
    ['benchmark', { id: 'benchmark', name: 'benchmark', dataType: 'number', description: '목표 소요 기간' }],

    // Transition properties
    ['from_stage', { id: 'from_stage', name: 'from_stage', dataType: 'text', description: '이전 단계' }],
    ['to_stage', { id: 'to_stage', name: 'to_stage', dataType: 'text', description: '이동한 단계' }],
    ['timestamp', { id: 'timestamp', name: 'timestamp', dataType: 'date', description: '일시' }],
    ['duration', { id: 'duration', name: 'duration', dataType: 'number', description: '소요 시간' }],

    // Task properties
    ['due_date', { id: 'due_date', name: 'due_date', dataType: 'date', description: '마감 기한' }],
    ['priority', { id: 'priority', name: 'priority', dataType: 'text', description: '우선순위' }],

    // Communication properties
    ['channel', { id: 'channel', name: 'channel', dataType: 'text', description: '소통 채널' }],
    ['response_time', { id: 'response_time', name: 'response_time', dataType: 'number', description: '응답 소요 시간' }],
    ['sender', { id: 'sender', name: 'sender', dataType: 'text', description: '발신자' }],

    // Recruiter/Interviewer properties
    ['assigned_positions', { id: 'assigned_positions', name: 'assigned_positions', dataType: 'number', description: '담당 포지션 수' }],
    ['avg_feedback_time', { id: 'avg_feedback_time', name: 'avg_feedback_time', dataType: 'number', description: '평균 피드백 제출 시간' }],
    ['monthly_count', { id: 'monthly_count', name: 'monthly_count', dataType: 'number', description: '월간 면접 횟수' }],

    // AI properties
    ['confidence_score', { id: 'confidence_score', name: 'confidence_score', dataType: 'number', description: 'AI 확신도 (0-1)' }],
    ['reasoning', { id: 'reasoning', name: 'reasoning', dataType: 'text', description: '제안 근거' }],
    ['suggested_action', { id: 'suggested_action', name: 'suggested_action', dataType: 'text', description: '권장 행동' }],
    ['user_action', { id: 'user_action', name: 'user_action', dataType: 'text', description: '사용자 반응' }],

    // Offer properties
    ['offer_amount', { id: 'offer_amount', name: 'offer_amount', dataType: 'number', description: '제안 연봉' }],
    ['equity_options', { id: 'equity_options', name: 'equity_options', dataType: 'text', description: '스톡옵션' }],
    ['start_date', { id: 'start_date', name: 'start_date', dataType: 'date', description: '입사 예정일' }],
    ['response_deadline', { id: 'response_deadline', name: 'response_deadline', dataType: 'date', description: '회신 기한' }],
    ['negotiation_rounds', { id: 'negotiation_rounds', name: 'negotiation_rounds', dataType: 'number', description: '협상 라운드 수' }],

    // Manager/Department properties
    ['approval_authority', { id: 'approval_authority', name: 'approval_authority', dataType: 'boolean', description: '예산 승인 권한' }],
    ['headcount_quota', { id: 'headcount_quota', name: 'headcount_quota', dataType: 'number', description: '연간 채용 가능 인원' }],
    ['headcount_budget', { id: 'headcount_budget', name: 'headcount_budget', dataType: 'number', description: '연간 채용 예산' }],
    ['avg_hire_duration', { id: 'avg_hire_duration', name: 'avg_hire_duration', dataType: 'number', description: '평균 채용 소요일' }],
    ['parent_department_id', { id: 'parent_department_id', name: 'parent_department_id', dataType: 'text', description: '상위 부서 ID' }],
];

// =============================================================================
// Property Links
// =============================================================================

const propertyLinks: ClassPropertyLink[] = [
    // Candidate
    { classId: 'candidate', propertyId: 'name', required: true },
    { classId: 'candidate', propertyId: 'email', required: true },
    { classId: 'candidate', propertyId: 'phone', required: false },
    { classId: 'candidate', propertyId: 'response_pattern', required: false },
    { classId: 'candidate', propertyId: 'avg_response_time', required: false },
    { classId: 'candidate', propertyId: 'current_status', required: true },

    // Job Posting
    { classId: 'job_posting', propertyId: 'title', required: true },
    { classId: 'job_posting', propertyId: 'department_id', required: true },
    { classId: 'job_posting', propertyId: 'status', required: true },
    { classId: 'job_posting', propertyId: 'salary_range', required: false },

    // Application
    { classId: 'application', propertyId: 'applied_date', required: true },
    { classId: 'application', propertyId: 'current_stage', required: true },
    { classId: 'application', propertyId: 'overall_status', required: true },
    { classId: 'application', propertyId: 'stage_entered_at', required: true },
    { classId: 'application', propertyId: 'rejection_reason', required: false },

    // Interview
    { classId: 'interview', propertyId: 'scheduled_date', required: true },
    { classId: 'interview', propertyId: 'type', required: true },
    { classId: 'interview', propertyId: 'status', required: true },
    { classId: 'interview', propertyId: 'actual_end_time', required: false },

    // Evaluation
    { classId: 'evaluation', propertyId: 'score', required: true },
    { classId: 'evaluation', propertyId: 'feedback_text', required: true },
    { classId: 'evaluation', propertyId: 'recommendation', required: true },
    { classId: 'evaluation', propertyId: 'submitted_at', required: true },

    // Recruitment Stage
    { classId: 'recruitment_stage', propertyId: 'stage_name', required: true },
    { classId: 'recruitment_stage', propertyId: 'avg_duration', required: false },
    { classId: 'recruitment_stage', propertyId: 'sequence_order', required: true },
    { classId: 'recruitment_stage', propertyId: 'benchmark', required: true },

    // Stage Transition
    { classId: 'stage_transition', propertyId: 'from_stage', required: true },
    { classId: 'stage_transition', propertyId: 'to_stage', required: true },
    { classId: 'stage_transition', propertyId: 'timestamp', required: true },
    { classId: 'stage_transition', propertyId: 'duration', required: true },

    // Task
    { classId: 'task', propertyId: 'type', required: true },
    { classId: 'task', propertyId: 'due_date', required: true },
    { classId: 'task', propertyId: 'priority', required: true },
    { classId: 'task', propertyId: 'status', required: true },

    // Communication
    { classId: 'communication', propertyId: 'channel', required: true },
    { classId: 'communication', propertyId: 'timestamp', required: true },
    { classId: 'communication', propertyId: 'response_time', required: false },
    { classId: 'communication', propertyId: 'sender', required: true },

    // Recruiter
    { classId: 'recruiter', propertyId: 'name', required: true },
    { classId: 'recruiter', propertyId: 'assigned_positions', required: false },

    // Interviewer
    { classId: 'interviewer', propertyId: 'name', required: true },
    { classId: 'interviewer', propertyId: 'email', required: true },
    { classId: 'interviewer', propertyId: 'avg_feedback_time', required: false },
    { classId: 'interviewer', propertyId: 'monthly_count', required: false },

    // AI Recommendation
    { classId: 'ai_recommendation', propertyId: 'type', required: true },
    { classId: 'ai_recommendation', propertyId: 'confidence_score', required: true },
    { classId: 'ai_recommendation', propertyId: 'reasoning', required: true },
    { classId: 'ai_recommendation', propertyId: 'suggested_action', required: true },
    { classId: 'ai_recommendation', propertyId: 'user_action', required: false },

    // Offer
    { classId: 'offer', propertyId: 'offer_amount', required: true },
    { classId: 'offer', propertyId: 'equity_options', required: false },
    { classId: 'offer', propertyId: 'start_date', required: true },
    { classId: 'offer', propertyId: 'response_deadline', required: true },
    { classId: 'offer', propertyId: 'status', required: true },
    { classId: 'offer', propertyId: 'negotiation_rounds', required: false },

    // Hiring Manager
    { classId: 'hiring_manager', propertyId: 'name', required: true },
    { classId: 'hiring_manager', propertyId: 'department_id', required: true },
    { classId: 'hiring_manager', propertyId: 'approval_authority', required: true },
    { classId: 'hiring_manager', propertyId: 'headcount_quota', required: false },

    // Department
    { classId: 'department', propertyId: 'name', required: true },
    { classId: 'department', propertyId: 'headcount_budget', required: false },
    { classId: 'department', propertyId: 'avg_hire_duration', required: false },
    { classId: 'department', propertyId: 'parent_department_id', required: false },
];

// =============================================================================
// Relations
// =============================================================================

const relations: OntologyRelation[] = [
    // Core Flows
    { id: 'e_app_job', sourceClassId: 'application', targetClassId: 'job_posting', name: 'FOR_POSITION', cardinality: 'N:1', description: '지원서가 특정 공고를 대상으로 함' },
    { id: 'e_app_cand', sourceClassId: 'application', targetClassId: 'candidate', name: 'CREATES', cardinality: '1:1', description: '지원서가 특정 지원자를 나타냄' },

    // Interview Process
    { id: 'e_int_app', sourceClassId: 'interview', targetClassId: 'application', name: 'SCHEDULES', cardinality: 'N:1', description: '면접이 특정 지원 건에 대해 잡힘' },
    { id: 'e_int_interviewer', sourceClassId: 'interviewer', targetClassId: 'interview', name: 'PARTICIPATES_IN', cardinality: 'N:M', description: '면접관이 면접에 참여함' },

    // Evaluation
    { id: 'e_eval_int', sourceClassId: 'evaluation', targetClassId: 'interview', name: 'RESULTS_FROM', cardinality: '1:1', description: '평가는 특정 면접의 결과임' },
    { id: 'e_eval_cand', sourceClassId: 'evaluation', targetClassId: 'candidate', name: 'EVALUATES', cardinality: 'N:1', description: '면접관이 후보자를 평가함' },

    // Recruiter Management
    { id: 'e_rec_app', sourceClassId: 'recruiter', targetClassId: 'application', name: 'ASSIGNS', cardinality: '1:N', description: '리크루터가 지원 건을 담당함' },
    { id: 'e_rec_comm', sourceClassId: 'recruiter', targetClassId: 'communication', name: 'SENDS', cardinality: '1:N', description: '리크루터가 메시지를 보냄' },

    // Communication
    { id: 'e_comm_cand', sourceClassId: 'communication', targetClassId: 'candidate', name: 'COMMUNICATES_WITH', cardinality: 'N:1', description: '메시지가 후보자와 관련됨' },

    // Recruitment Stages
    { id: 'e_stage_app', sourceClassId: 'application', targetClassId: 'recruitment_stage', name: 'CURRENTLY_IN', cardinality: 'N:1', description: '지원서가 현재 특정 단계에 있음' },
    { id: 'e_trans_app', sourceClassId: 'stage_transition', targetClassId: 'application', name: 'HAPPENS_TO', cardinality: 'N:1', description: '단계 이동이 특정 지원 건에서 발생함' },
    { id: 'e_trans_stage', sourceClassId: 'stage_transition', targetClassId: 'recruitment_stage', name: 'PROGRESSES_TO', cardinality: 'N:1', description: '단계 이동으로 새로운 단계에 도달함' },

    // AI
    { id: 'e_ai_app', sourceClassId: 'ai_recommendation', targetClassId: 'application', name: 'RECOMMENDS_FOR', cardinality: 'N:1', description: 'AI가 특정 지원 건에 대해 제안함' },
    { id: 'e_ai_eval', sourceClassId: 'ai_recommendation', targetClassId: 'evaluation', name: 'VALIDATED_BY', cardinality: 'N:1', description: 'AI 제안이 실제 평가 결과로 검증됨' },

    // Extended Relationships
    { id: 'e_eval_offer', sourceClassId: 'evaluation', targetClassId: 'offer', name: 'RESULTS_IN', cardinality: '1:1', description: '평가 결과로 제안서 생성' },
    { id: 'e_hm_job', sourceClassId: 'hiring_manager', targetClassId: 'job_posting', name: 'REQUESTS', cardinality: '1:N', description: '부서장이 공고 요청' },
    { id: 'e_dept_job', sourceClassId: 'department', targetClassId: 'job_posting', name: 'OWNS', cardinality: '1:N', description: '부서가 공고 소유' },
];

// =============================================================================
// Export Initial Schema
// =============================================================================

export const initialSchema: OntologySchema = {
    classes: new Map(classes),
    properties: new Map(properties),
    propertyLinks,
    relations,
    version: 1,
    lastModified: new Date().toISOString()
};

/**
 * Default positions for initial classes (for React Flow visualization).
 */
export const initialPositions: Map<string, { x: number; y: number }> = new Map([
    ['candidate', { x: 50, y: 300 }],
    ['job_posting', { x: 450, y: 50 }],
    ['application', { x: 450, y: 300 }],
    ['interview', { x: 850, y: 300 }],
    ['evaluation', { x: 1150, y: 300 }],
    ['recruitment_stage', { x: 450, y: 600 }],
    ['stage_transition', { x: 250, y: 450 }],
    ['task', { x: 850, y: 550 }],
    ['communication', { x: 50, y: 550 }],
    ['recruiter', { x: 250, y: 800 }],
    ['interviewer', { x: 1150, y: 550 }],
    ['ai_recommendation', { x: 650, y: 800 }],
    ['offer', { x: 1450, y: 300 }],
    ['hiring_manager', { x: 450, y: -150 }],
    ['department', { x: 750, y: -150 }],
]);
