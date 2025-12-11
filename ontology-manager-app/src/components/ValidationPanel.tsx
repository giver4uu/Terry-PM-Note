import React from 'react';
import { useValidationStore } from '../stores/useValidationStore';
import { useOntologyStore } from '../stores/useOntologyStore';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { useReactFlow } from 'reactflow';
import { ValidationLevel } from '../types/validation';

export const ValidationPanel: React.FC = () => {
    const { validationResult, isValidating } = useValidationStore();
    const { nodes, selectNode } = useOntologyStore();
    const { fitView } = useReactFlow();

    if (!validationResult) {
        return (
            <div className="h-full w-80 bg-card border-l border-border p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">검증</h2>
                </div>
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                    검증 결과가 없습니다
                </div>
            </div>
        );
    }

    const { issues, summary } = validationResult;

    const handleIssueClick = (nodeId?: string) => {
        if (!nodeId) return;

        // 해당 노드로 포커스
        const node = nodes.find((n) => n.id === nodeId);
        if (node) {
            fitView({
                nodes: [node],
                duration: 500,
                padding: 0.5,
            });

            // 노드 선택
            selectNode(nodeId);
        }
    };

    const getLevelIcon = (level: ValidationLevel) => {
        switch (level) {
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case 'info':
                return <Info className="w-4 h-4 text-blue-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="h-full w-80 bg-card border-l border-border flex flex-col relative">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground mb-3">검증 결과</h2>

                {/* Summary */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
                        <div className="text-xs text-muted-foreground">에러</div>
                        <div className="text-lg font-bold text-red-600 dark:text-red-400">
                            {summary.errorCount}
                        </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-2">
                        <div className="text-xs text-muted-foreground">경고</div>
                        <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                            {summary.warningCount}
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2">
                        <div className="text-xs text-muted-foreground">정보</div>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {summary.infoCount}
                        </div>
                    </div>
                </div>

                {/* Overall Status */}
                <div className="mt-3 flex items-center gap-2">
                    {validationResult.isValid ? (
                        <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                검증 통과
                            </span>
                        </>
                    ) : (
                        <>
                            <X className="w-4 h-4 text-red-500" />
                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                                {summary.errorCount}개 에러 수정 필요
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Issue List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {issues.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-8">
                        이슈가 없습니다 ✨
                    </div>
                ) : (
                    issues.map((issue) => (
                        <button
                            key={issue.id}
                            onClick={() => handleIssueClick(issue.nodeId)}
                            className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                        >
                            <div className="flex items-start gap-2">
                                {getLevelIcon(issue.level)}
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium text-foreground group-hover:text-primary">
                                        {issue.message}
                                    </div>
                                    {issue.description && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {issue.description}
                                        </div>
                                    )}
                                    <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                                        {issue.validatorName}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Loading State */}
            {isValidating && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-muted-foreground">검증 중...</span>
                    </div>
                </div>
            )}
        </div>
    );
};
