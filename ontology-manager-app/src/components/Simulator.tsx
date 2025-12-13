import { useState } from 'react';
import { useOntologyStore } from '../stores/useOntologyStore';
import { useTranslation } from 'react-i18next';
import { X, Play, CheckCircle, XCircle, AlertTriangle, Database, MessageSquare, Lightbulb, Table, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { executeQuery, QueryResult } from '../lib/queryEngine';

// Enhanced Query Patterns with Weighted Keywords
// primaryKeywords: 3 points each (specific to this use case)
// secondaryKeywords: 1 point each (general terms that need context)
const QUERY_PATTERNS = [
    {
        id: 'UC-007',
        name: '프로세스 병목 진단',
        primaryKeywords: ['병목', 'bottleneck', '지연되', '오래 걸', 'taking long', 'taking so long', 'slow process'],
        secondaryKeywords: ['단계', 'stage', 'process', '프로세스', 'delay', 'slow', '오래'],
        requiredNodes: ['Application', 'Recruitment Stage', 'Stage Transition'],
        requiredProperties: ['current_stage', 'timestamp', 'benchmark'],
        requiredEdges: ['PROGRESSES_TO'],
        description: 'Process Bottleneck Diagnosis',
        cypher: `MATCH (a:Application)-[:PROGRESSES_TO]->(s:Recruitment_Stage)
WITH s, avg(a.stage_duration) as avg_time
WHERE avg_time > s.benchmark
RETURN s.name AS bottleneck_stage,
       avg_time AS avg_days,
       s.benchmark AS target_days,
       avg_time - s.benchmark AS delay_days
ORDER BY delay_days DESC`,
        exampleQuestions: [
            '채용 프로세스에서 병목이 어디야?',
            'Why is hiring taking so long?',
            '어느 단계에서 지연되는지 알려줘'
        ]
    },
    {
        id: 'UC-011',
        name: '다음 액션 리마인더',
        primaryKeywords: ['팔로업', 'follow up', 'followup', '할 일', '해야 할', 'todo', 'to-do', '리마인더', 'reminder'],
        secondaryKeywords: ['연락', 'contact', 'action', 'next', 'schedule', '일정', 'task'],
        requiredNodes: ['Application', 'Task', 'Recruiter', 'Communication'],
        requiredProperties: ['last_contact', 'due_date', 'assigned_recruiter'],
        requiredEdges: ['ASSIGNS', 'COMMUNICATES_WITH'],
        description: 'Next Action Reminder',
        cypher: `MATCH (r:Recruiter)-[:ASSIGNS]->(a:Application)
OPTIONAL MATCH (r)-[:COMMUNICATES_WITH]->(c:Candidate)
WHERE date(a.last_contact) < date() - duration('P5D')
RETURN r.name AS recruiter,
       a.candidate_name AS candidate,
       a.last_contact AS last_contacted,
       "Follow-up Required" AS action_type
ORDER BY a.last_contact ASC
LIMIT 10`,
        exampleQuestions: [
            '오늘 해야 할 일이 뭐야?',
            'Who do I need to follow up with?',
            '연락 안 한 후보자 알려줘'
        ]
    },
    {
        id: 'UC-003',
        name: '재지원자 맥락 제공',
        primaryKeywords: ['재지원', 're-applicant', 'reapplicant', '다시 지원', '또 지원', 'applied before', 'previous application'],
        secondaryKeywords: ['이력', 'history', '과거', 'previous', 'again', 'duplicate', '전에'],
        requiredNodes: ['Candidate', 'Application'],
        requiredProperties: ['email', 'applied_date', 'current_stage'],
        requiredEdges: ['CREATES'],
        description: 'Re-applicant Context Provider',
        cypher: `MATCH (c:Candidate)<-[:CREATES]-(a:Application)
WITH c, collect(a) AS applications
WHERE size(applications) > 1
UNWIND applications AS app
RETURN c.name AS candidate,
       c.email AS email,
       app.applied_date AS applied,
       app.final_status AS outcome,
       app.rejection_reason AS reason
ORDER BY app.applied_date DESC`,
        exampleQuestions: [
            '이 사람 전에도 지원했나?',
            'Has this candidate applied before?',
            '재지원자 목록 보여줘'
        ]
    },
    {
        id: 'UC-008',
        name: '면접관 피드백 지연 알림',
        primaryKeywords: ['피드백 안', '피드백 지연', 'feedback missing', 'feedback late', '평가 안', '안 줘', '안 줬', "hasn't submitted"],
        secondaryKeywords: ['피드백', 'feedback', '면접관', 'interviewer', '평가', 'evaluation', 'submit', 'missing'],
        requiredNodes: ['Interview', 'Evaluation', 'Interviewer'],
        requiredProperties: ['scheduled_date', 'score', 'feedback_text'],
        requiredEdges: ['EVALUATES', 'PARTICIPATES_IN'],
        description: 'Interviewer Feedback Delay Alert',
        cypher: `MATCH (i:Interview)-[:PARTICIPATES_IN]-(intr:Interviewer)
WHERE i.status = 'Completed'
  AND NOT EXISTS {
    MATCH (intr)-[:EVALUATES]->(e:Evaluation)
    WHERE e.interview_id = i.id
  }
  AND i.scheduled_date < datetime() - duration('P1D')
RETURN intr.name AS interviewer,
       i.scheduled_date AS interview_date,
       datetime() - i.scheduled_date AS overdue_hours,
       "Feedback Missing" AS alert_type`,
        exampleQuestions: [
            '피드백 안 준 면접관 누구야?',
            'Who hasn\'t submitted their feedback?',
            '면접 평가 지연된 거 있어?'
        ]
    },
    {
        id: 'UC-023',
        name: 'AI 학습 피드백 루프',
        primaryKeywords: ['ai 정확', 'ai accuracy', 'ai 추천', 'ai recommendation', 'ai 성능', 'ai learning', '추천 정확'],
        secondaryKeywords: ['ai', '학습', 'accuracy', '정확도', 'recommendation', '추천', 'learn', 'improve', '개선'],
        requiredNodes: ['AI Recommendation', 'Application', 'Evaluation'],
        requiredProperties: ['confidence_score', 'type', 'score'],
        requiredEdges: ['RECOMMENDS_FOR', 'VALIDATED_BY'],
        description: 'AI Learning Feedback Loop',
        cypher: `MATCH (ai:AI_Recommendation)-[:RECOMMENDS_FOR]->(a:Application)
OPTIONAL MATCH (ai)-[:VALIDATED_BY]->(e:Evaluation)
RETURN ai.type AS recommendation_type,
       avg(ai.confidence_score) AS avg_confidence,
       count(CASE WHEN e IS NOT NULL THEN 1 END) AS validated_count,
       count(ai) AS total_count`,
        exampleQuestions: [
            'AI 추천 정확도가 어때?',
            'How well is the AI learning?',
            'AI가 잘 맞추고 있어?'
        ]
    },
    {
        id: 'UC-025',
        name: '후보자 연락 블랙홀 알림',
        primaryKeywords: ['잠수', 'ghosting', 'ghost', '연락두절', '응답 없', 'no response', '연락 안 돼', '안 받'],
        secondaryKeywords: ['응답', 'response', 'silent', 'disappeared', 'contact', '노쇼'],
        requiredNodes: ['Candidate', 'Communication'],
        requiredProperties: ['avg_response_time', 'response_pattern', 'channel'],
        requiredEdges: ['COMMUNICATES_WITH'],
        description: 'Candidate Ghosting Alert',
        cypher: `MATCH (c:Candidate)<-[:COMMUNICATES_WITH]-(comm:Communication)
WITH c, max(comm.timestamp) AS last_contact, c.avg_response_time AS avg_response
WHERE datetime() - last_contact > avg_response * 3
RETURN c.name AS candidate,
       c.email AS email,
       last_contact AS last_contacted,
       avg_response AS typical_response_hours,
       "Ghosting Risk" AS alert_type`,
        exampleQuestions: [
            '연락 안 되는 후보자 있어?',
            'Who might be ghosting us?',
            '응답 없는 후보자 찾아줘'
        ]
    },
    // ===================== Phase 2 Use Cases =====================
    {
        id: 'UC-001',
        name: '소싱 우선순위 스코어링',
        primaryKeywords: ['소싱', 'sourcing', '우선순위', 'priority', '탤런트풀', 'talent pool', '후보자 찾기'],
        secondaryKeywords: ['후보자', 'candidate', '연락', 'contact', 'score', '점수'],
        requiredNodes: ['Candidate', 'Communication', 'Application'],
        requiredProperties: ['response_rate', 'last_contact', 'skills'],
        requiredEdges: ['COMMUNICATES_WITH', 'CREATES'],
        description: 'Sourcing Priority Scoring',
        cypher: `MATCH (c:Candidate)
OPTIONAL MATCH (c)<-[:COMMUNICATES_WITH]-(comm:Communication)
WITH c, count(comm) as contact_count, c.response_rate as response_rate
RETURN c.name AS candidate,
       c.skills AS skills,
       response_rate AS response_rate,
       contact_count AS contacts,
       response_rate * 0.5 + (1.0 / (contact_count + 1)) * 0.5 AS priority_score
ORDER BY priority_score DESC
LIMIT 20`,
        exampleQuestions: [
            '누구한테 먼저 연락해야 해?',
            'Which candidates should I contact first?',
            '소싱 우선순위 보여줘'
        ]
    },
    {
        id: 'UC-006',
        name: '후보자 응답률 분석',
        primaryKeywords: ['응답률', 'response rate', '응답 분석', '회신율', '연락 성공'],
        secondaryKeywords: ['응답', 'response', '연락', 'contact', '분석', 'analysis'],
        requiredNodes: ['Candidate', 'Communication'],
        requiredProperties: ['response_rate', 'channel', 'timestamp'],
        requiredEdges: ['COMMUNICATES_WITH'],
        description: 'Candidate Response Rate Analysis',
        cypher: `MATCH (c:Candidate)<-[:COMMUNICATES_WITH]-(comm:Communication)
WITH c, comm.channel AS channel, 
     count(CASE WHEN comm.response_time IS NOT NULL THEN 1 END) AS responses,
     count(comm) AS total
RETURN channel,
       count(DISTINCT c) AS candidates,
       avg(toFloat(responses) / total) * 100 AS response_rate
ORDER BY response_rate DESC`,
        exampleQuestions: [
            '채널별 응답률이 어때?',
            'What are the response rates by channel?',
            '어느 채널이 응답률 높아?'
        ]
    },
    {
        id: 'UC-009',
        name: '면접관 캘리브레이션',
        primaryKeywords: ['캘리브레이션', 'calibration', '면접관 평가', '평가 일관성', '점수 차이'],
        secondaryKeywords: ['면접관', 'interviewer', '평가', 'evaluation', '점수', 'score'],
        requiredNodes: ['Interviewer', 'Evaluation', 'Interview'],
        requiredProperties: ['score', 'recommendation'],
        requiredEdges: ['EVALUATES', 'PARTICIPATES_IN'],
        description: 'Interviewer Calibration Analysis',
        cypher: `MATCH (intr:Interviewer)-[:EVALUATES]->(e:Evaluation)
WITH intr, avg(e.score) AS avg_score, stdev(e.score) AS score_stdev, count(e) AS eval_count
RETURN intr.name AS interviewer,
       eval_count AS evaluations,
       round(avg_score, 2) AS avg_score,
       round(score_stdev, 2) AS score_variance,
       CASE WHEN score_stdev > 1.5 THEN 'High Variance' ELSE 'Consistent' END AS status
ORDER BY score_stdev DESC`,
        exampleQuestions: [
            '면접관별 점수 편차가 어때?',
            'Which interviewers need calibration?',
            '평가 일관성 분석해줘'
        ]
    },
    {
        id: 'UC-010',
        name: '유사 후보자 분석',
        primaryKeywords: ['유사 후보자', 'similar candidate', '비슷한 후보자', '후보자 비교'],
        secondaryKeywords: ['비교', 'compare', '유사', 'similar', '스킬', 'skill'],
        requiredNodes: ['Candidate', 'Application', 'Skill'],
        requiredProperties: ['skills', 'experience_years'],
        requiredEdges: ['HAS_SKILL', 'CREATES'],
        description: 'Similar Candidate Analysis',
        cypher: `MATCH (c1:Candidate)-[:HAS_SKILL]->(s:Skill)<-[:HAS_SKILL]-(c2:Candidate)
WHERE c1 <> c2
WITH c1, c2, count(s) AS shared_skills
WHERE shared_skills >= 3
RETURN c1.name AS candidate1,
       c2.name AS candidate2,
       shared_skills,
       c1.experience_years AS exp1,
       c2.experience_years AS exp2
ORDER BY shared_skills DESC
LIMIT 10`,
        exampleQuestions: [
            '비슷한 후보자 있어?',
            'Find similar candidates',
            '유사 프로필 분석해줘'
        ]
    },
    {
        id: 'UC-012',
        name: '위험 시그널 알림',
        primaryKeywords: ['위험 시그널', 'risk signal', 'red flag', '주의 필요', 'bad hire'],
        secondaryKeywords: ['위험', 'risk', '경고', 'warning', 'alert'],
        requiredNodes: ['Candidate', 'Application', 'Evaluation', 'Reference Check'],
        requiredProperties: ['score', 'recommendation', 'red_flags'],
        requiredEdges: ['EVALUATES', 'REFERENCES'],
        description: 'Risk Signal Alert',
        cypher: `MATCH (c:Candidate)<-[:EVALUATES]-(e:Evaluation)
WHERE e.recommendation IN ['no_hire', 'concern']
OPTIONAL MATCH (c)<-[:REFERENCES]-(ref:Reference_Check)
WHERE ref.red_flags IS NOT NULL
RETURN c.name AS candidate,
       collect(DISTINCT e.recommendation) AS eval_flags,
       collect(DISTINCT ref.red_flags) AS ref_flags,
       'Review Required' AS status`,
        exampleQuestions: [
            '위험 시그널 있는 후보자 있어?',
            'Any candidates with red flags?',
            '주의 필요한 후보자 알려줘'
        ]
    },
    {
        id: 'UC-013',
        name: '오퍼 거절 사유 패턴',
        primaryKeywords: ['오퍼 거절', 'offer reject', '거절 사유', '왜 거절', 'rejection reason'],
        secondaryKeywords: ['거절', 'reject', '오퍼', 'offer', '사유', 'reason'],
        requiredNodes: ['Application', 'Offer'],
        requiredProperties: ['offer_status', 'rejection_reason'],
        requiredEdges: ['RECEIVES_OFFER'],
        description: 'Offer Rejection Pattern Analysis',
        cypher: `MATCH (a:Application)-[:RECEIVES_OFFER]->(o:Offer)
WHERE o.status = 'rejected'
RETURN o.rejection_reason AS reason,
       count(*) AS count,
       round(count(*) * 100.0 / sum(count(*)) OVER (), 1) AS percentage
ORDER BY count DESC`,
        exampleQuestions: [
            '오퍼 거절 이유가 뭐야?',
            'Why are candidates rejecting offers?',
            '거절 사유 분석해줘'
        ]
    },
    {
        id: 'UC-014',
        name: '오퍼 리스크 예측',
        primaryKeywords: ['오퍼 리스크', 'offer risk', '수락 확률', 'acceptance probability'],
        secondaryKeywords: ['오퍼', 'offer', '예측', 'predict', '확률', 'probability'],
        requiredNodes: ['Application', 'Candidate', 'Offer'],
        requiredProperties: ['competing_offers', 'expected_salary', 'offer_amount'],
        requiredEdges: ['RECEIVES_OFFER'],
        description: 'Offer Risk Prediction',
        cypher: `MATCH (a:Application)-[:RECEIVES_OFFER]->(o:Offer)
MATCH (a)<-[:CREATES]-(c:Candidate)
RETURN c.name AS candidate,
       o.amount AS offer,
       c.expected_salary AS expected,
       c.competing_offers AS competing,
       CASE WHEN o.amount >= c.expected_salary AND c.competing_offers = 0 THEN 'High'
            WHEN o.amount >= c.expected_salary THEN 'Medium'
            ELSE 'Low' END AS acceptance_likelihood`,
        exampleQuestions: [
            '오퍼 수락 확률이 어때?',
            'What are our offer acceptance risks?',
            '오퍼 리스크 분석해줘'
        ]
    },
    {
        id: 'UC-017',
        name: '중복 지원자 감지',
        primaryKeywords: ['중복 지원', 'duplicate', '같은 사람', '동일 후보자'],
        secondaryKeywords: ['중복', 'duplicate', '지원자', 'applicant'],
        requiredNodes: ['Candidate', 'Application'],
        requiredProperties: ['email', 'phone', 'applied_date'],
        requiredEdges: ['CREATES'],
        description: 'Duplicate Applicant Detection',
        cypher: `MATCH (c:Candidate)<-[:CREATES]-(a:Application)
WITH c.email AS email, collect(a) AS applications
WHERE size(applications) > 1
RETURN email,
       size(applications) AS application_count,
       [app IN applications | app.job_posting_id] AS positions`,
        exampleQuestions: [
            '중복 지원자 있어?',
            'Any duplicate applications?',
            '같은 사람이 여러 번 지원했나?'
        ]
    },
    {
        id: 'UC-027',
        name: '공고 퍼널 이상 경고',
        primaryKeywords: ['퍼널 이상', 'funnel anomaly', '공고 문제', '지원자 적음', '조회수 낮음'],
        secondaryKeywords: ['퍼널', 'funnel', '공고', 'posting', '지원', 'application'],
        requiredNodes: ['Job Posting', 'Application'],
        requiredProperties: ['view_count', 'application_count', 'posted_date'],
        requiredEdges: ['FOR_POSITION'],
        description: 'Job Posting Funnel Anomaly',
        cypher: `MATCH (jp:Job_Posting)
OPTIONAL MATCH (a:Application)-[:FOR_POSITION]->(jp)
WITH jp, count(a) AS apps, jp.view_count AS views
WHERE views > 100 AND toFloat(apps) / views < 0.01
RETURN jp.title AS posting,
       views AS views,
       apps AS applications,
       round(toFloat(apps) / views * 100, 2) AS conversion_rate,
       'Low Conversion' AS alert`,
        exampleQuestions: [
            '공고 중 문제 있는 거 있어?',
            'Any job postings with funnel issues?',
            '지원자가 안 오는 공고 있어?'
        ]
    },
    {
        id: 'UC-029',
        name: '오퍼 협상 시뮬레이션',
        primaryKeywords: ['협상', 'negotiation', '시뮬레이션', 'simulation', '역제안', 'counter offer'],
        secondaryKeywords: ['오퍼', 'offer', '연봉', 'salary', '협상'],
        requiredNodes: ['Application', 'Offer', 'Negotiation'],
        requiredProperties: ['initial_offer', 'counter_offer', 'final_offer'],
        requiredEdges: ['RECEIVES_OFFER', 'NEGOTIATES'],
        description: 'Offer Negotiation Simulation',
        cypher: `MATCH (a:Application)-[:RECEIVES_OFFER]->(o:Offer)
OPTIONAL MATCH (o)<-[:NEGOTIATES]-(n:Negotiation)
WITH o.initial_amount AS initial, n.counter_amount AS counter, o.final_amount AS final, o.status AS status
RETURN initial,
       counter,
       final,
       round((final - initial) / initial * 100, 1) AS increase_pct,
       status`,
        exampleQuestions: [
            '협상하면 얼마나 올려줘야 해?',
            'What counter offers work best?',
            '협상 패턴 분석해줘'
        ]
    }
];

// Calculate match score for a pattern against question
function calculateMatchScore(question: string, pattern: typeof QUERY_PATTERNS[0]): number {
    const lowerQ = question.toLowerCase();
    let score = 0;

    // Primary keywords: 3 points each
    pattern.primaryKeywords.forEach(keyword => {
        if (lowerQ.includes(keyword.toLowerCase())) {
            score += 3;
        }
    });

    // Secondary keywords: 1 point each
    pattern.secondaryKeywords.forEach(keyword => {
        if (lowerQ.includes(keyword.toLowerCase())) {
            score += 1;
        }
    });

    return score;
}

// Example questions for quick test
const EXAMPLE_QUESTIONS = [
    { text: '채용 프로세스에서 병목이 어디야?', useCase: 'UC-007' },
    { text: '오늘 해야 할 팔로업 알려줘', useCase: 'UC-011' },
    { text: '이 후보자 전에 지원한 적 있어?', useCase: 'UC-003' },
    { text: '피드백 안 준 면접관 누구야?', useCase: 'UC-008' },
    { text: '연락 안 되는 후보자 있어?', useCase: 'UC-025' }
];

export const Simulator = ({ onClose }: { onClose: () => void }) => {
    const { t } = useTranslation();
    const { nodes, edges, addNode } = useOntologyStore();
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState<any>(null);
    const [queryResult, setQueryResult] = useState<QueryResult | null>(null);

    // Helper to create a new class node
    const handleAddClass = (className: string) => {
        // Convert to proper label format (e.g., "Reference Check" -> "Reference_Check")
        const formattedLabel = className
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('_');

        const newId = formattedLabel.toLowerCase().replace(/_/g, '-');

        // Check if already exists
        if (nodes.some(n => n.id === newId || n.data.label.toLowerCase() === formattedLabel.toLowerCase())) {
            // Already exists, just re-analyze
            analyzeQuestion();
            return;
        }

        // Find a good position (stagger new nodes)
        const existingCount = nodes.length;
        const row = Math.floor(existingCount / 4);
        const col = existingCount % 4;

        addNode({
            id: newId,
            type: 'classNode',
            position: { x: 50 + col * 400, y: 50 + row * 250 },
            data: {
                label: formattedLabel,
                kind: 'class',
                description: `Auto-generated for Use Case: ${result?.matchedPattern?.name || 'Unknown'}`,
                properties: [],
                rules: []
            }
        });

        // Re-analyze after adding
        setTimeout(() => analyzeQuestion(), 100);
    };

    // Helper to add a property to an existing node
    const handleAddProperty = (propName: string) => {
        // Find the first node that might need this property
        if (nodes.length > 0) {
            alert(`To add property "${propName}", please select a class in the editor and add it manually.`);
        }
    };

    const analyzeQuestion = () => {
        const existingLabels = new Set(nodes.map(n => n.data.label));
        const existingProperties = new Set(
            nodes.flatMap(n => n.data.properties.map(p => p.name))
        );
        const existingEdgeLabels = new Set(edges.map(e => e.data?.label || ''));

        // 1. Find best matching Use Case Pattern using scoring
        type PatternType = typeof QUERY_PATTERNS[number];

        const scoredPatterns = QUERY_PATTERNS.map(pattern => ({
            pattern,
            score: calculateMatchScore(question, pattern)
        }));

        const bestMatch = scoredPatterns.reduce<{ pattern: PatternType; score: number } | null>(
            (best, current) => (!best || current.score > best.score) ? current : best,
            null
        );

        // Require minimum score of 2 to match
        const matchedPattern = bestMatch && bestMatch.score >= 2 ? bestMatch.pattern : null;

        if (!matchedPattern) {
            setResult({
                status: 'fail',
                feedbackMsg: '질문을 이해하지 못했습니다. 다른 표현으로 시도해보세요.',
                errorDetails: null,
                matchedPattern: null,
                generatedQuery: '// 쿼리 생성 불가'
            });
            return;
        }

        // 2. Check Schema Support
        const missingNodes = matchedPattern.requiredNodes.filter(req =>
            !Array.from(existingLabels).some(l =>
                l.toLowerCase().includes(req.toLowerCase().split(' ')[0])
            )
        );

        const missingEdges = matchedPattern.requiredEdges?.filter(req =>
            !Array.from(existingEdgeLabels).some(l => l.includes(req))
        ) || [];

        const missingProperties = matchedPattern.requiredProperties?.filter(req =>
            !Array.from(existingProperties).some(p => p.includes(req))
        ) || [];

        // 3. Determine Result Status
        let status: 'success' | 'partial' | 'fail';
        let feedbackMsg: string;
        let errorDetails: any = null;

        if (missingNodes.length === 0 && missingEdges.length === 0) {
            status = 'success';
            feedbackMsg = `✅ "${matchedPattern.name}" 쿼리 생성 가능!`;
        } else if (missingNodes.length > 0) {
            status = 'fail';
            feedbackMsg = `❌ 이 질문을 처리하려면 스키마에 누락된 클래스가 있습니다.`;
            errorDetails = {
                type: 'missing_nodes',
                title: '누락된 클래스 (Nodes)',
                items: missingNodes,
                suggestion: `다음 클래스를 스키마에 추가하세요: ${missingNodes.join(', ')}`
            };
        } else if (missingEdges.length > 0) {
            status = 'partial';
            feedbackMsg = `⚠️ 부분적 지원: 관계(Relationship)가 누락되었습니다.`;
            errorDetails = {
                type: 'missing_edges',
                title: '누락된 관계 (Relationships)',
                items: missingEdges,
                suggestion: `다음 관계를 추가하세요: ${missingEdges.join(', ')}`
            };
        } else {
            status = 'partial';
            feedbackMsg = `⚠️ 부분적 지원: 일부 프로퍼티가 누락되었습니다.`;
            errorDetails = {
                type: 'missing_properties',
                title: '권장 프로퍼티',
                items: missingProperties,
                suggestion: `더 정확한 결과를 위해 다음 프로퍼티 추가를 권장: ${missingProperties.join(', ')}`
            };
        }

        setResult({
            status,
            feedbackMsg,
            errorDetails,
            matchedPattern,
            generatedQuery: status !== 'fail' ? matchedPattern.cypher : '// 스키마가 이 쿼리를 지원하지 않습니다'
        });

        // Execute query against sample data if schema supports it
        if (status === 'success' || status === 'partial') {
            const qResult = executeQuery(matchedPattern.id);
            setQueryResult(qResult);
        } else {
            setQueryResult(null);
        }
    };

    const handleExampleClick = (q: string) => {
        setQuestion(q);
        setResult(null);
        setQueryResult(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                        <Play className="w-5 h-5 text-blue-600" />
                        Use Case Simulator
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 bg-white dark:bg-slate-900">
                    {/* Example Questions */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <Lightbulb className="w-3.5 h-3.5" />
                            예시 질문 (클릭하여 테스트)
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {EXAMPLE_QUESTIONS.map((eq, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleExampleClick(eq.text)}
                                    className="text-xs px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                    {eq.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('simulator_question_label') || "자연어로 질문하세요:"}
                        </label>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100"
                                placeholder={t('simulator_placeholder') || "예: 채용 프로세스에서 병목이 어디야?"}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && analyzeQuestion()}
                            />
                            <button
                                onClick={analyzeQuestion}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                {t('simulate') || "변환"}
                            </button>
                        </div>
                    </div>

                    {result && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Status Banner */}
                            <div className={cn(
                                "flex items-start gap-3 p-4 rounded-lg border transition-colors",
                                result.status === 'success' ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" :
                                    result.status === 'partial' ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800" :
                                        "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                            )}>
                                {result.status === 'success' ? <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" /> :
                                    result.status === 'partial' ? <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" /> :
                                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />}

                                <div className="flex-1">
                                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                        {result.matchedPattern?.name || '알 수 없는 패턴'}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        {result.feedbackMsg}
                                    </p>
                                </div>
                            </div>

                            {/* Error Details with Add Buttons */}
                            {result.errorDetails && (
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                                    <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        {result.errorDetails.title}
                                    </h4>

                                    {/* Missing items with add buttons */}
                                    <div className="space-y-2 mb-3">
                                        {result.errorDetails.items.map((item: string, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 p-2 rounded border border-amber-200 dark:border-amber-700">
                                                <span className="text-sm font-mono text-amber-800 dark:text-amber-200">
                                                    {item}
                                                </span>
                                                {result.errorDetails.type === 'missing_nodes' && (
                                                    <button
                                                        onClick={() => handleAddClass(item)}
                                                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                        스키마에 추가
                                                    </button>
                                                )}
                                                {result.errorDetails.type === 'missing_properties' && (
                                                    <button
                                                        onClick={() => handleAddProperty(item)}
                                                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                        프로퍼티 추가
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add All button for nodes */}
                                    {result.errorDetails.type === 'missing_nodes' && result.errorDetails.items.length > 1 && (
                                        <button
                                            onClick={() => {
                                                result.errorDetails.items.forEach((item: string) => handleAddClass(item));
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-3"
                                        >
                                            <Plus className="w-4 h-4" />
                                            모두 스키마에 추가 ({result.errorDetails.items.length}개)
                                        </button>
                                    )}

                                    <p className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                        <span>{result.errorDetails.suggestion}</span>
                                    </p>
                                </div>
                            )}

                            {/* Query Results Table */}
                            {queryResult && queryResult.rows.length > 0 && (
                                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Table className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">샘플 데이터 시뮬레이션 결과</span>
                                        </div>
                                        <span className="text-xs text-blue-600 dark:text-blue-400">{queryResult.summary}</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                            <thead className="bg-slate-100 dark:bg-slate-800">
                                                <tr>
                                                    {queryResult.columns.map((col, idx) => (
                                                        <th key={idx} className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                                                            {col}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                                {queryResult.rows.map((row, rowIdx) => (
                                                    <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                        {queryResult.columns.map((col, colIdx) => (
                                                            <td key={colIdx} className="px-3 py-2 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                                                {row[col] ?? '-'}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Generated Query */}
                            <div className="relative">
                                <div className="absolute top-0 right-0 p-2">
                                    <Database className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">생성된 Cypher 쿼리</div>
                                <pre className="bg-slate-900 text-slate-200 p-4 rounded-md text-xs font-mono overflow-x-auto border border-slate-700">
                                    <code>{result.generatedQuery}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

