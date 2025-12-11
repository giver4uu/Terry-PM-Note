import React from 'react';
import { useValidationStore } from '../stores/useValidationStore';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export const ValidationBadge: React.FC = () => {
    const { validationResult } = useValidationStore();

    if (!validationResult) {
        return null;
    }

    const { summary, isValid } = validationResult;

    if (isValid) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 text-xs font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>검증 통과</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 text-xs">
            {summary.errorCount > 0 && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">{summary.errorCount}</span>
                </div>
            )}
            {summary.warningCount > 0 && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="font-medium">{summary.warningCount}</span>
                </div>
            )}
        </div>
    );
};
