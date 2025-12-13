/**
 * In-Memory Query Engine for Use Case Simulator
 * 
 * Executes queries against sample data to show realistic results
 * without needing a real database connection.
 */

import {
    sampleCandidates,
    sampleApplications,
    sampleStageTransitions,
    sampleRecruitmentStages,
    sampleInterviews,
    sampleEvaluations,
    sampleCommunications,
    sampleInterviewers,
    sampleAIRecommendations,
    getCandidateName
} from './sampleData';

// =============================================================================
// Query Result Types
// =============================================================================

export interface QueryResult {
    columns: string[];
    rows: Record<string, any>[];
    summary: string;
}

// =============================================================================
// Query Executors for Each Use Case
// =============================================================================

/**
 * UC-007: Process Bottleneck Diagnosis
 * Find stages where applications stay longer than benchmark
 */
export function queryBottlenecks(): QueryResult {
    // Calculate average duration per stage
    const stageDurations: Record<string, number[]> = {};

    sampleStageTransitions.forEach(t => {
        const stage = t.fromStage;
        if (!stageDurations[stage]) stageDurations[stage] = [];
        stageDurations[stage].push(t.durationDays);
    });

    // Also check current stage durations for active applications
    const today = new Date();
    sampleApplications.forEach(app => {
        if (app.overallStatus === 'active') {
            const enteredAt = new Date(app.stageEnteredAt);
            const daysInStage = Math.floor((today.getTime() - enteredAt.getTime()) / (1000 * 60 * 60 * 24));
            const stage = app.currentStage;
            if (!stageDurations[stage]) stageDurations[stage] = [];
            stageDurations[stage].push(daysInStage);
        }
    });

    // Calculate averages and compare to benchmarks
    const rows: Record<string, any>[] = [];

    Object.entries(stageDurations).forEach(([stage, durations]) => {
        const avgDays = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
        const benchmark = sampleRecruitmentStages.find(s =>
            s.name.toLowerCase().replace(' ', '_') === stage ||
            stage.includes(s.name.toLowerCase().split(' ')[0])
        )?.benchmarkDays || 5;

        const delay = avgDays - benchmark;

        if (delay > 0) {
            rows.push({
                '병목 단계': stage.replace('_', ' ').toUpperCase(),
                '평균 소요일': `${avgDays}일`,
                '목표': `${benchmark}일`,
                '지연': `+${delay}일`,
                '상태': delay > 3 ? '🔴 심각' : '🟡 주의'
            });
        }
    });

    // Sort by delay
    rows.sort((a, b) => parseInt(b['지연']) - parseInt(a['지연']));

    return {
        columns: ['병목 단계', '평균 소요일', '목표', '지연', '상태'],
        rows: rows.length > 0 ? rows : [{ '결과': '현재 병목 없음 ✅' }],
        summary: rows.length > 0
            ? `${rows.length}개 단계에서 병목 감지됨`
            : '모든 단계가 목표 시간 내 진행 중'
    };
}

/**
 * UC-011: Next Action Reminder
 * Find applications needing follow-up
 */
export function queryFollowUps(): QueryResult {
    const today = new Date();
    const rows: Record<string, any>[] = [];

    sampleApplications.forEach(app => {
        if (app.overallStatus !== 'active') return;

        const lastContact = new Date(app.lastContact);
        const daysSinceContact = Math.floor((today.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24));

        if (daysSinceContact >= 5) {
            rows.push({
                '후보자': getCandidateName(app.candidateId),
                '현재 단계': app.currentStage.replace('_', ' '),
                '마지막 연락': app.lastContact,
                '경과일': `${daysSinceContact}일`,
                '우선순위': daysSinceContact > 10 ? '🔴 긴급' : '🟡 보통',
                '권장 액션': 'Follow-up 필요'
            });
        }
    });

    rows.sort((a, b) => parseInt(b['경과일']) - parseInt(a['경과일']));

    return {
        columns: ['후보자', '현재 단계', '마지막 연락', '경과일', '우선순위', '권장 액션'],
        rows: rows.length > 0 ? rows : [{ '결과': 'Follow-up 필요한 후보자 없음 ✅' }],
        summary: rows.length > 0
            ? `${rows.length}명의 후보자에게 연락 필요`
            : '모든 후보자와 최근 연락함'
    };
}

/**
 * UC-003: Re-applicant Context
 * Find candidates who have applied multiple times
 */
export function queryReApplicants(): QueryResult {
    // Group applications by candidate
    const appsByCandidate: Record<string, typeof sampleApplications> = {};

    sampleApplications.forEach(app => {
        if (!appsByCandidate[app.candidateId]) {
            appsByCandidate[app.candidateId] = [];
        }
        appsByCandidate[app.candidateId].push(app);
    });

    const rows: Record<string, any>[] = [];

    Object.entries(appsByCandidate).forEach(([candidateId, apps]) => {
        if (apps.length > 1) {
            apps.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());

            apps.forEach((app, idx) => {
                rows.push({
                    '후보자': getCandidateName(candidateId),
                    '지원 차수': idx === 0 ? '현재 (재지원)' : `${apps.length - idx}차 지원`,
                    '지원일': app.appliedDate,
                    '포지션': app.jobPostingId,
                    '결과': app.overallStatus === 'active' ? '진행중' : app.overallStatus
                });
            });
        }
    });

    return {
        columns: ['후보자', '지원 차수', '지원일', '포지션', '결과'],
        rows: rows.length > 0 ? rows : [{ '결과': '재지원자 없음' }],
        summary: rows.length > 0
            ? `재지원자 ${Object.keys(appsByCandidate).filter(k => appsByCandidate[k].length > 1).length}명 발견`
            : '재지원자 없음'
    };
}

/**
 * UC-008: Interviewer Feedback Delay
 * Find missing or late feedback
 */
export function queryMissingFeedback(): QueryResult {
    const rows: Record<string, any>[] = [];

    sampleInterviews.forEach(interview => {
        if (interview.status !== 'completed') return;

        interview.interviewerIds.forEach(interviewerId => {
            const evaluation = sampleEvaluations.find(
                e => e.interviewId === interview.id && e.interviewerId === interviewerId
            );

            if (!evaluation || !evaluation.submittedAt) {
                const interviewer = sampleInterviewers.find(i => i.id === interviewerId);
                rows.push({
                    '면접관': interviewer?.name || interviewerId,
                    '면접일': interview.scheduledDate,
                    '면접 유형': interview.type,
                    '상태': evaluation ? '🟡 미제출' : '🔴 평가 없음',
                    '평소 응답 시간': `${interviewer?.avgFeedbackTimeHours || '?'}시간`
                });
            }
        });
    });

    return {
        columns: ['면접관', '면접일', '면접 유형', '상태', '평소 응답 시간'],
        rows: rows.length > 0 ? rows : [{ '결과': '누락된 피드백 없음 ✅' }],
        summary: rows.length > 0
            ? `${rows.length}건의 피드백 누락/지연`
            : '모든 피드백 제출됨'
    };
}

/**
 * UC-025: Ghosting Alert
 * Find candidates who stopped responding
 */
export function queryGhosting(): QueryResult {
    const today = new Date();
    const rows: Record<string, any>[] = [];

    sampleCandidates.forEach(candidate => {
        // Get last communication
        const comms = sampleCommunications
            .filter(c => c.candidateId === candidate.id)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        if (comms.length === 0) return;

        const lastComm = comms[0];
        const lastContactDate = new Date(lastComm.timestamp);
        const daysSinceContact = Math.floor((today.getTime() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24));

        // Check if response time is 3x their average
        const typicalResponseHours = candidate.avgResponseTime;
        const typicalResponseDays = typicalResponseHours / 24;

        if (daysSinceContact > typicalResponseDays * 3 && daysSinceContact > 7) {
            rows.push({
                '후보자': candidate.name,
                '마지막 연락': lastComm.timestamp,
                '경과일': `${daysSinceContact}일`,
                '평소 응답': `${typicalResponseHours}시간`,
                '위험도': daysSinceContact > 20 ? '🔴 높음' : '🟡 주의',
                '권장': '다른 채널로 연락'
            });
        }
    });

    return {
        columns: ['후보자', '마지막 연락', '경과일', '평소 응답', '위험도', '권장'],
        rows: rows.length > 0 ? rows : [{ '결과': '잠수 위험 후보자 없음 ✅' }],
        summary: rows.length > 0
            ? `${rows.length}명 잠수 위험 감지`
            : '모든 후보자 정상 응답 중'
    };
}

/**
 * UC-023: AI Learning Feedback Loop
 * Show AI recommendation accuracy
 */
export function queryAIAccuracy(): QueryResult {
    const byType: Record<string, { total: number; accepted: number; rejected: number; ignored: number; avgConfidence: number }> = {};

    sampleAIRecommendations.forEach(rec => {
        if (!byType[rec.type]) {
            byType[rec.type] = { total: 0, accepted: 0, rejected: 0, ignored: 0, avgConfidence: 0 };
        }

        byType[rec.type].total++;
        byType[rec.type].avgConfidence += rec.confidenceScore;

        if (rec.userAction === 'accepted') byType[rec.type].accepted++;
        else if (rec.userAction === 'rejected') byType[rec.type].rejected++;
        else byType[rec.type].ignored++;
    });

    const rows = Object.entries(byType).map(([type, stats]) => ({
        '추천 유형': type.replace('_', ' '),
        '총 건수': stats.total,
        '수락': stats.accepted,
        '거부': stats.rejected,
        '무시': stats.ignored,
        '평균 신뢰도': `${Math.round((stats.avgConfidence / stats.total) * 100)}%`,
        '수락률': `${Math.round((stats.accepted / stats.total) * 100)}%`
    }));

    return {
        columns: ['추천 유형', '총 건수', '수락', '거부', '무시', '평균 신뢰도', '수락률'],
        rows: rows.length > 0 ? rows : [{ '결과': 'AI 추천 데이터 없음' }],
        summary: rows.length > 0
            ? `${sampleAIRecommendations.length}건의 AI 추천 분석됨`
            : 'AI 추천 기록 없음'
    };
}

// =============================================================================
// Phase 2 Query Functions
// =============================================================================

/**
 * UC-001: Sourcing Priority Scoring
 */
export function querySourcingPriority(): QueryResult {
    const rows = sampleCandidates
        .filter(c => c.currentStatus === 'active')
        .map(c => {
            const comms = sampleCommunications.filter(comm => comm.candidateId === c.id);
            const responseRate = c.avgResponseTime < 24 ? 0.8 : c.avgResponseTime < 48 ? 0.5 : 0.2;
            const contactPenalty = comms.length > 3 ? 0.3 : 1.0;
            const priorityScore = Math.round(responseRate * contactPenalty * 100);

            return {
                '후보자': c.name,
                '응답 패턴': c.responsePattern,
                '연락 횟수': comms.length,
                '우선순위 점수': `${priorityScore}점`,
                '권장': priorityScore > 50 ? '🟢 연락 권장' : '🟡 대기'
            };
        })
        .sort((a, b) => parseInt(b['우선순위 점수']) - parseInt(a['우선순위 점수']));

    return {
        columns: ['후보자', '응답 패턴', '연락 횟수', '우선순위 점수', '권장'],
        rows: rows.length > 0 ? rows : [{ '결과': '활성 후보자 없음' }],
        summary: `${rows.length}명 후보자 우선순위 분석`
    };
}

/**
 * UC-006: Response Rate Analysis
 */
export function queryResponseRates(): QueryResult {
    const channelStats: Record<string, { total: number; responded: number }> = {};

    sampleCommunications.forEach(comm => {
        if (!channelStats[comm.channel]) {
            channelStats[comm.channel] = { total: 0, responded: 0 };
        }
        channelStats[comm.channel].total++;
        if (comm.responseTimeHours !== null) {
            channelStats[comm.channel].responded++;
        }
    });

    const rows = Object.entries(channelStats).map(([channel, stats]) => ({
        '채널': channel.toUpperCase(),
        '총 연락': stats.total,
        '응답': stats.responded,
        '응답률': `${Math.round((stats.responded / stats.total) * 100)}%`,
        '상태': stats.responded / stats.total > 0.5 ? '🟢 양호' : '🔴 개선 필요'
    }));

    return {
        columns: ['채널', '총 연락', '응답', '응답률', '상태'],
        rows: rows.length > 0 ? rows : [{ '결과': '연락 기록 없음' }],
        summary: `${Object.keys(channelStats).length}개 채널 응답률 분석`
    };
}

/**
 * UC-009: Interviewer Calibration
 */
export function queryInterviewerCalibration(): QueryResult {
    const interviewerStats: Record<string, { scores: number[]; name: string }> = {};

    sampleEvaluations.forEach(e => {
        if (!interviewerStats[e.interviewerId]) {
            const interviewer = sampleInterviewers.find(i => i.id === e.interviewerId);
            interviewerStats[e.interviewerId] = {
                scores: [],
                name: interviewer?.name || e.interviewerId
            };
        }
        interviewerStats[e.interviewerId].scores.push(e.score);
    });

    const rows = Object.values(interviewerStats).map(stat => {
        const avg = stat.scores.reduce((a, b) => a + b, 0) / stat.scores.length;
        const variance = stat.scores.length > 1
            ? Math.sqrt(stat.scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / stat.scores.length)
            : 0;

        return {
            '면접관': stat.name,
            '평가 수': stat.scores.length,
            '평균 점수': avg.toFixed(1),
            '점수 편차': variance.toFixed(2),
            '일관성': variance < 0.5 ? '🟢 일관' : variance < 1.0 ? '🟡 보통' : '🔴 편차 큼'
        };
    });

    return {
        columns: ['면접관', '평가 수', '평균 점수', '점수 편차', '일관성'],
        rows: rows.length > 0 ? rows : [{ '결과': '평가 데이터 없음' }],
        summary: `${rows.length}명 면접관 캘리브레이션 분석`
    };
}

/**
 * UC-010: Similar Candidates (placeholder - needs skill data)
 */
export function querySimilarCandidates(): QueryResult {
    // Simplified: compare by response pattern similarity
    const rows = [
        { '후보자 1': '김철수', '후보자 2': '정수현', '공통점': '응답 패턴 유사', '유사도': '75%' },
        { '후보자 1': '이영희', '후보자 2': '박민수', '공통점': '경력 유사', '유사도': '60%' }
    ];

    return {
        columns: ['후보자 1', '후보자 2', '공통점', '유사도'],
        rows,
        summary: '유사 후보자 2쌍 발견'
    };
}

/**
 * UC-012: Risk Signals (placeholder - needs reference data)
 */
export function queryRiskSignals(): QueryResult {
    // Check evaluations for low scores or concerns
    const riskyEvals = sampleEvaluations.filter(e => e.score <= 2 || e.recommendation === 'no_hire');

    const rows = riskyEvals.map(e => {
        const interview = sampleInterviews.find(i => i.id === e.interviewId);
        const app = sampleApplications.find(a => a.id === interview?.applicationId);

        return {
            '후보자': app ? getCandidateName(app.candidateId) : 'Unknown',
            '위험 유형': e.score <= 2 ? '낮은 평가' : '부정적 추천',
            '점수': e.score,
            '상태': '🔴 검토 필요'
        };
    });

    return {
        columns: ['후보자', '위험 유형', '점수', '상태'],
        rows: rows.length > 0 ? rows : [{ '결과': '위험 시그널 없음 ✅' }],
        summary: rows.length > 0 ? `${rows.length}건 위험 시그널 감지` : '위험 시그널 없음'
    };
}

/**
 * UC-013: Offer Rejection Patterns (placeholder)
 */
export function queryOfferRejections(): QueryResult {
    // Sample rejection reasons
    const rows = [
        { '거절 사유': '연봉 불만족', '건수': 3, '비율': '50%' },
        { '거절 사유': '경쟁 오퍼 수락', '건수': 2, '비율': '33%' },
        { '거절 사유': '업무 불일치', '건수': 1, '비율': '17%' }
    ];

    return {
        columns: ['거절 사유', '건수', '비율'],
        rows,
        summary: '총 6건 오퍼 거절 분석'
    };
}

/**
 * UC-014: Offer Risk Prediction (placeholder)
 */
export function queryOfferRisk(): QueryResult {
    const activeApps = sampleApplications.filter(a => a.currentStage === 'offer');

    const rows = activeApps.map(app => ({
        '후보자': getCandidateName(app.candidateId),
        '현재 단계': '오퍼',
        '경쟁 오퍼': '있음',
        '수락 예측': '65%',
        '리스크': '🟡 중간'
    }));

    return {
        columns: ['후보자', '현재 단계', '경쟁 오퍼', '수락 예측', '리스크'],
        rows: rows.length > 0 ? rows : [{ '결과': '오퍼 단계 후보자 없음' }],
        summary: `${rows.length}건 오퍼 리스크 분석`
    };
}

/**
 * UC-017: Duplicate Detection (reuses reapplicant logic)
 */
export function queryDuplicates(): QueryResult {
    return queryReApplicants(); // Same logic
}

/**
 * UC-027: Funnel Anomaly
 */
export function queryFunnelAnomaly(): QueryResult {
    // Mock job posting data
    const rows = [
        { '공고': 'Backend Developer', '조회수': 500, '지원수': 3, '전환율': '0.6%', '상태': '🔴 전환율 낮음' },
        { '공고': 'Frontend Developer', '조회수': 300, '지원수': 15, '전환율': '5.0%', '상태': '🟢 정상' }
    ];

    return {
        columns: ['공고', '조회수', '지원수', '전환율', '상태'],
        rows,
        summary: '1개 공고 퍼널 이상 감지'
    };
}

/**
 * UC-029: Negotiation Simulation
 */
export function queryNegotiationPatterns(): QueryResult {
    const rows = [
        { '초기 오퍼': '5,000만원', '역제안': '5,500만원', '최종': '5,300만원', '인상률': '+6%', '결과': '수락' },
        { '초기 오퍼': '4,500만원', '역제안': '5,000만원', '최종': '4,700만원', '인상률': '+4%', '결과': '수락' },
        { '초기 오퍼': '6,000만원', '역제안': '7,500만원', '최종': '-', '인상률': '-', '결과': '거절' }
    ];

    return {
        columns: ['초기 오퍼', '역제안', '최종', '인상률', '결과'],
        rows,
        summary: '5-7% 인상 시 수락률 높음'
    };
}

// =============================================================================
// Main Query Router
// =============================================================================

export function executeQuery(useCaseId: string): QueryResult | null {
    switch (useCaseId) {
        // MVP Use Cases
        case 'UC-007': return queryBottlenecks();
        case 'UC-011': return queryFollowUps();
        case 'UC-003': return queryReApplicants();
        case 'UC-008': return queryMissingFeedback();
        case 'UC-025': return queryGhosting();
        case 'UC-023': return queryAIAccuracy();
        // Phase 2 Use Cases
        case 'UC-001': return querySourcingPriority();
        case 'UC-006': return queryResponseRates();
        case 'UC-009': return queryInterviewerCalibration();
        case 'UC-010': return querySimilarCandidates();
        case 'UC-012': return queryRiskSignals();
        case 'UC-013': return queryOfferRejections();
        case 'UC-014': return queryOfferRisk();
        case 'UC-017': return queryDuplicates();
        case 'UC-027': return queryFunnelAnomaly();
        case 'UC-029': return queryNegotiationPatterns();
        default: return null;
    }
}
