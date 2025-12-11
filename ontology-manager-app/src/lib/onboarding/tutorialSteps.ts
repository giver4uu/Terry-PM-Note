export interface TutorialStep {
    step: number;
    title: string;
    description: string;
    highlightNodeId?: string;
    highlightElement?: string;
    action: 'highlight' | 'focus' | 'point' | 'open';
}

export const tutorialSteps: TutorialStep[] = [
    {
        step: 1,
        title: '🎯 ATS 온톨로지 예시',
        description: '15개 클래스가 이미 로드되었습니다. Candidate 클래스를 확인해보세요.',
        highlightNodeId: 'candidate',
        action: 'highlight'
    },
    {
        step: 2,
        title: '📋 Schema View',
        description: 'Candidate를 클릭하면 프로퍼티를 편집할 수 있습니다.',
        highlightNodeId: 'candidate',
        action: 'focus'
    },
    {
        step: 3,
        title: '🔗 관계 편집',
        description: '엣지를 클릭하면 관계 정보를 편집할 수 있습니다.',
        highlightElement: '#canvas-area',
        action: 'point'
    },
    {
        step: 4,
        title: '✅ 검증',
        description: '변경사항이 생기면 자동으로 검증됩니다. 우측 Validation 패널을 확인하세요.',
        highlightElement: '#validation-panel-btn',
        action: 'open'
    }
];
