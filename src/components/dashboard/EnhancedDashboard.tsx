import React, { useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useProgress } from '@/hooks/useProgress';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { OverallProgress } from '@/components/progress/ProgressIndicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export const EnhancedDashboard: React.FC = () => {
  const { preferences } = useUserPreferences();
  const { getOverallProgress } = useProgress();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show onboarding if user hasn't completed it
    if (preferences && !preferences.onboarding_completed) {
      setShowOnboarding(true);
    }
  }, [preferences]);

  const assessmentProgress = getOverallProgress('assessment');
  const trainingProgress = getOverallProgress('training');
  const workflowProgress = getOverallProgress('workflow');

  return (
    <div className="space-y-6">
      {/* Quick Start Tour Button */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your AI Readiness Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Track your progress and access personalized recommendations.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowOnboarding(true)}
              className="gap-2"
            >
              <PlayCircle className="h-4 w-4" />
              Take Platform Tour
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverallProgress
          assessmentProgress={assessmentProgress}
          trainingProgress={trainingProgress}
          workflowProgress={workflowProgress}
        />
      </div>

      {/* Onboarding Tour */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};