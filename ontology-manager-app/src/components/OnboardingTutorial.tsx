import React, { useState } from 'react';
import { tutorialSteps } from '../lib/onboarding/tutorialSteps';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingTutorialProps {
    onClose: () => void;
}

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const step = tutorialSteps[currentStep];

    const handleNext = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg shadow-2xl w-[480px] p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-accent rounded transition-colors"
                    >
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground mb-6">{step.description}</p>

                {/* Progress */}
                <div className="flex gap-1 mb-6">
                    {tutorialSteps.map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 h-1 rounded ${index <= currentStep ? 'bg-primary' : 'bg-border'
                                }`}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        이전
                    </button>

                    <span className="text-xs text-muted-foreground">
                        {currentStep + 1} / {tutorialSteps.length}
                    </span>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                        {currentStep === tutorialSteps.length - 1 ? '완료' : '다음'}
                        {currentStep < tutorialSteps.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
