import React, { useState, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTranslation } from 'react-i18next';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Button } from '@/components/ui/button';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    target: '[data-tour="assessment"]',
    content: 'Start your AI readiness journey by taking our comprehensive assessment.',
    title: 'Take Your Assessment',
    placement: 'bottom',
  },
  {
    target: '[data-tour="dashboard"]',
    content: 'View your progress and access all platform features from your dashboard.',
    title: 'Your Dashboard',
    placement: 'bottom',
  },
  {
    target: '[data-tour="reports"]',
    content: 'Review detailed analysis of your AI readiness scores and recommendations.',
    title: 'View Your Results',
    placement: 'bottom',
  },
  {
    target: '[data-tour="roadmap"]',
    content: 'Build and track your personalized AI implementation roadmap.',
    title: 'Build Your Action Plan',
    placement: 'bottom',
  },
  {
    target: '[data-tour="training"]',
    content: 'Access training modules to improve your AI readiness capabilities.',
    title: 'Continue Learning',
    placement: 'bottom',
  },
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  steps = defaultSteps,
}) => {
  const { t } = useTranslation();
  const { completeOnboarding } = useUserPreferences();
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, action, index } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      completeOnboarding();
      onClose();
    } else if (action === 'next') {
      setStepIndex(index + 1);
    } else if (action === 'prev') {
      setStepIndex(index - 1);
    }
  }, [completeOnboarding, onClose]);

  const handleSkipTour = () => {
    completeOnboarding();
    onClose();
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={isOpen}
        continuous
        showProgress
        showSkipButton
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: 'hsl(var(--primary))',
            backgroundColor: 'hsl(var(--background))',
            textColor: 'hsl(var(--foreground))',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
          },
          tooltip: {
            borderRadius: 8,
            boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.3)',
            fontSize: 14,
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipTitle: {
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
          },
          tooltipContent: {
            padding: '12px 0',
          },
          buttonNext: {
            backgroundColor: 'hsl(var(--primary))',
            borderRadius: 6,
            border: 'none',
            color: 'hsl(var(--primary-foreground))',
            fontSize: 14,
            fontWeight: 500,
            padding: '8px 16px',
          },
          buttonBack: {
            color: 'hsl(var(--muted-foreground))',
            marginRight: 'auto',
          },
          buttonSkip: {
            color: 'hsl(var(--muted-foreground))',
          },
        }}
        locale={{
          back: t('onboarding.back'),
          close: t('common.cancel'),
          last: t('onboarding.finish'),
          next: t('onboarding.next'),
          skip: t('onboarding.skip'),
        }}
      />
      
      {/* Welcome overlay for initial step */}
      {isOpen && stepIndex === 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001]">
          <div className="bg-background border rounded-lg p-8 max-w-md mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {t('onboarding.welcome')}
            </h2>
            <p className="text-muted-foreground mb-6">
              Let us guide you through the key features of our platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={handleSkipTour}>
                {t('onboarding.skip')}
              </Button>
              <Button onClick={() => setStepIndex(1)}>
                {t('onboarding.next')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};