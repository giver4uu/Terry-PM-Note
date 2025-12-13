/**
 * Sample Data for Use Case Simulator
 * 
 * Realistic ATS data to demonstrate query results without a real database.
 */

// =============================================================================
// Types
// =============================================================================

export interface SampleCandidate {
    id: string;
    name: string;
    email: string;
    phone: string;
    currentStatus: string;
    avgResponseTime: number; // hours
    responsePattern: string;
}

export interface SampleApplication {
    id: string;
    candidateId: string;
    jobPostingId: string;
    appliedDate: string;
    currentStage: string;
    overallStatus: string;
    stageEnteredAt: string;
    lastContact: string;
    assignedRecruiterId: string;
}

export interface SampleJobPosting {
    id: string;
    title: string;
    departmentId: string;
    status: string;
}

export interface SampleInterview {
    id: string;
    applicationId: string;
    scheduledDate: string;
    type: string;
    status: string;
    interviewerIds: string[];
}

export interface SampleEvaluation {
    id: string;
    interviewId: string;
    interviewerId: string;
    score: number;
    recommendation: string;
    submittedAt: string | null;
}

export interface SampleStageTransition {
    id: string;
    applicationId: string;
    fromStage: string;
    toStage: string;
    timestamp: string;
    durationDays: number;
}

export interface SampleRecruitmentStage {
    id: string;
    name: string;
    sequenceOrder: number;
    benchmarkDays: number;
}

export interface SampleRecruiter {
    id: string;
    name: string;
    assignedPositions: number;
}

export interface SampleInterviewer {
    id: string;
    name: string;
    avgFeedbackTimeHours: number;
}

export interface SampleCommunication {
    id: string;
    candidateId: string;
    recruiterId: string;
    channel: string;
    timestamp: string;
    responseTimeHours: number | null;
}

export interface SampleAIRecommendation {
    id: string;
    type: string;
    targetId: string;
    confidenceScore: number;
    reasoning: string;
    suggestedAction: string;
    userAction: string | null;
}

// =============================================================================
// Sample Data
// =============================================================================

export const sampleCandidates: SampleCandidate[] = [
    { id: 'c1', name: '김철수', email: 'kim@email.com', phone: '010-1234-5678', currentStatus: 'active', avgResponseTime: 4, responsePattern: 'quick' },
    { id: 'c2', name: '이영희', email: 'lee@email.com', phone: '010-2345-6789', currentStatus: 'active', avgResponseTime: 24, responsePattern: 'slow' },
    { id: 'c3', name: '박민수', email: 'park@email.com', phone: '010-3456-7890', currentStatus: 'active', avgResponseTime: 72, responsePattern: 'unresponsive' },
    { id: 'c4', name: '최지연', email: 'choi@email.com', phone: '010-4567-8901', currentStatus: 'rejected', avgResponseTime: 8, responsePattern: 'normal' },
    { id: 'c5', name: '정수현', email: 'jung@email.com', phone: '010-5678-9012', currentStatus: 'active', avgResponseTime: 12, responsePattern: 'normal' },
];

export const sampleJobPostings: SampleJobPosting[] = [
    { id: 'jp1', title: 'Backend Developer', departmentId: 'd1', status: 'open' },
    { id: 'jp2', title: 'Frontend Developer', departmentId: 'd1', status: 'open' },
    { id: 'jp3', title: 'Product Manager', departmentId: 'd2', status: 'open' },
];

export const sampleApplications: SampleApplication[] = [
    { id: 'app1', candidateId: 'c1', jobPostingId: 'jp1', appliedDate: '2025-11-15', currentStage: 'technical_interview', overallStatus: 'active', stageEnteredAt: '2025-11-28', lastContact: '2025-12-10', assignedRecruiterId: 'r1' },
    { id: 'app2', candidateId: 'c2', jobPostingId: 'jp1', appliedDate: '2025-11-20', currentStage: 'offer', overallStatus: 'active', stageEnteredAt: '2025-12-05', lastContact: '2025-12-01', assignedRecruiterId: 'r1' },
    { id: 'app3', candidateId: 'c3', jobPostingId: 'jp2', appliedDate: '2025-11-10', currentStage: 'screening', overallStatus: 'active', stageEnteredAt: '2025-11-10', lastContact: '2025-11-20', assignedRecruiterId: 'r2' },
    { id: 'app4', candidateId: 'c4', jobPostingId: 'jp1', appliedDate: '2025-10-01', currentStage: 'rejected', overallStatus: 'rejected', stageEnteredAt: '2025-10-15', lastContact: '2025-10-20', assignedRecruiterId: 'r1' },
    { id: 'app5', candidateId: 'c4', jobPostingId: 'jp3', appliedDate: '2025-12-01', currentStage: 'phone_screen', overallStatus: 'active', stageEnteredAt: '2025-12-03', lastContact: '2025-12-08', assignedRecruiterId: 'r2' },
    { id: 'app6', candidateId: 'c5', jobPostingId: 'jp2', appliedDate: '2025-12-05', currentStage: 'technical_interview', overallStatus: 'active', stageEnteredAt: '2025-12-10', lastContact: '2025-12-11', assignedRecruiterId: 'r1' },
];

export const sampleRecruitmentStages: SampleRecruitmentStage[] = [
    { id: 's1', name: 'Screening', sequenceOrder: 1, benchmarkDays: 3 },
    { id: 's2', name: 'Phone Screen', sequenceOrder: 2, benchmarkDays: 5 },
    { id: 's3', name: 'Technical Interview', sequenceOrder: 3, benchmarkDays: 7 },
    { id: 's4', name: 'Final Interview', sequenceOrder: 4, benchmarkDays: 5 },
    { id: 's5', name: 'Offer', sequenceOrder: 5, benchmarkDays: 3 },
];

export const sampleStageTransitions: SampleStageTransition[] = [
    { id: 'st1', applicationId: 'app1', fromStage: 'screening', toStage: 'phone_screen', timestamp: '2025-11-18', durationDays: 3 },
    { id: 'st2', applicationId: 'app1', fromStage: 'phone_screen', toStage: 'technical_interview', timestamp: '2025-11-28', durationDays: 10 },
    { id: 'st3', applicationId: 'app2', fromStage: 'screening', toStage: 'phone_screen', timestamp: '2025-11-22', durationDays: 2 },
    { id: 'st4', applicationId: 'app2', fromStage: 'phone_screen', toStage: 'technical_interview', timestamp: '2025-11-28', durationDays: 6 },
    { id: 'st5', applicationId: 'app2', fromStage: 'technical_interview', toStage: 'final_interview', timestamp: '2025-12-02', durationDays: 4 },
    { id: 'st6', applicationId: 'app2', fromStage: 'final_interview', toStage: 'offer', timestamp: '2025-12-05', durationDays: 3 },
];

export const sampleInterviews: SampleInterview[] = [
    { id: 'i1', applicationId: 'app1', scheduledDate: '2025-11-25', type: 'phone', status: 'completed', interviewerIds: ['int1'] },
    { id: 'i2', applicationId: 'app1', scheduledDate: '2025-12-05', type: 'technical', status: 'completed', interviewerIds: ['int2', 'int3'] },
    { id: 'i3', applicationId: 'app2', scheduledDate: '2025-12-01', type: 'technical', status: 'completed', interviewerIds: ['int2'] },
    { id: 'i4', applicationId: 'app6', scheduledDate: '2025-12-12', type: 'technical', status: 'scheduled', interviewerIds: ['int3'] },
];

export const sampleInterviewers: SampleInterviewer[] = [
    { id: 'int1', name: '박팀장', avgFeedbackTimeHours: 4 },
    { id: 'int2', name: '김시니어', avgFeedbackTimeHours: 24 },
    { id: 'int3', name: '이주니어', avgFeedbackTimeHours: 48 },
];

export const sampleEvaluations: SampleEvaluation[] = [
    { id: 'e1', interviewId: 'i1', interviewerId: 'int1', score: 4, recommendation: 'proceed', submittedAt: '2025-11-25' },
    { id: 'e2', interviewId: 'i2', interviewerId: 'int2', score: 5, recommendation: 'strong_hire', submittedAt: '2025-12-06' },
    { id: 'e3', interviewId: 'i2', interviewerId: 'int3', score: 4, recommendation: 'proceed', submittedAt: null }, // Missing feedback!
    { id: 'e4', interviewId: 'i3', interviewerId: 'int2', score: 5, recommendation: 'strong_hire', submittedAt: '2025-12-02' },
];

export const sampleRecruiters: SampleRecruiter[] = [
    { id: 'r1', name: '채용담당 A', assignedPositions: 3 },
    { id: 'r2', name: '채용담당 B', assignedPositions: 2 },
];

export const sampleCommunications: SampleCommunication[] = [
    { id: 'comm1', candidateId: 'c1', recruiterId: 'r1', channel: 'email', timestamp: '2025-12-10', responseTimeHours: 2 },
    { id: 'comm2', candidateId: 'c2', recruiterId: 'r1', channel: 'email', timestamp: '2025-12-01', responseTimeHours: 48 },
    { id: 'comm3', candidateId: 'c3', recruiterId: 'r2', channel: 'email', timestamp: '2025-11-20', responseTimeHours: null }, // No response
    { id: 'comm4', candidateId: 'c3', recruiterId: 'r2', channel: 'phone', timestamp: '2025-11-25', responseTimeHours: null }, // No response
];

export const sampleAIRecommendations: SampleAIRecommendation[] = [
    { id: 'ai1', type: 'bottleneck_alert', targetId: 'app3', confidenceScore: 0.85, reasoning: 'Screening 단계 30일 초과', suggestedAction: 'Follow-up 권장', userAction: null },
    { id: 'ai2', type: 'ghosting_risk', targetId: 'c3', confidenceScore: 0.92, reasoning: '23일간 응답 없음', suggestedAction: '다른 채널로 연락 시도', userAction: 'accepted' },
    { id: 'ai3', type: 'similar_candidate', targetId: 'c1', confidenceScore: 0.78, reasoning: '유사 프로필 합격률 높음', suggestedAction: '적극 검토 권장', userAction: 'rejected' },
];

// =============================================================================
// Helper: Get candidate name by ID
// =============================================================================

export function getCandidateName(candidateId: string): string {
    return sampleCandidates.find(c => c.id === candidateId)?.name || 'Unknown';
}

export function getRecruiterName(recruiterId: string): string {
    return sampleRecruiters.find(r => r.id === recruiterId)?.name || 'Unknown';
}

export function getInterviewerName(interviewerId: string): string {
    return sampleInterviewers.find(i => i.id === interviewerId)?.name || 'Unknown';
}
