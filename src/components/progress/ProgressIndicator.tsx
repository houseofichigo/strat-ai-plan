import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProgressIndicatorProps {
  title?: string;
  progress: number;
  status?: 'not_started' | 'in_progress' | 'completed';
  showDetails?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'card';
}

const statusConfig = {
  not_started: {
    icon: PlayCircle,
    color: 'bg-muted text-muted-foreground',
    text: 'progress.notStarted',
  },
  in_progress: {
    icon: Clock,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    text: 'progress.inProgress',
  },
  completed: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    text: 'progress.completed',
  },
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  title,
  progress,
  status = 'not_started',
  showDetails = false,
  className,
  variant = 'default',
}) => {
  const { t } = useTranslation();
  const config = statusConfig[status];
  const Icon = config.icon;

  const progressContent = (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          {showDetails && (
            <Badge variant="secondary" className={cn('text-xs', config.color)}>
              <Icon className="w-3 h-3 mr-1" />
              {t(config.text)}
            </Badge>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress}% {t('progress.completed').toLowerCase()}</span>
          {showDetails && status === 'in_progress' && (
            <span className="animate-pulse">●</span>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === 'card') {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {progressContent}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Icon className={cn('w-4 h-4', {
          'text-muted-foreground': status === 'not_started',
          'text-blue-600': status === 'in_progress',
          'text-green-600': status === 'completed',
        })} />
        <div className="flex-1">
          <Progress value={progress} className="h-1.5" />
        </div>
        <span className="text-xs text-muted-foreground min-w-[3rem]">
          {progress}%
        </span>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {progressContent}
    </div>
  );
};

export interface OverallProgressProps {
  assessmentProgress?: number;
  trainingProgress?: number;
  workflowProgress?: number;
  className?: string;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  assessmentProgress = 0,
  trainingProgress = 0,
  workflowProgress = 0,
  className,
}) => {
  const { t } = useTranslation();
  const overallProgress = Math.round((assessmentProgress + trainingProgress + workflowProgress) / 3);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          {t('progress.overall')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProgressIndicator
          progress={overallProgress}
          status={overallProgress === 100 ? 'completed' : overallProgress > 0 ? 'in_progress' : 'not_started'}
          showDetails
        />
        
        <div className="space-y-3">
          <ProgressIndicator
            title={t('progress.assessment')}
            progress={assessmentProgress}
            status={assessmentProgress === 100 ? 'completed' : assessmentProgress > 0 ? 'in_progress' : 'not_started'}
            variant="compact"
          />
          <ProgressIndicator
            title={t('progress.training')}
            progress={trainingProgress}
            status={trainingProgress === 100 ? 'completed' : trainingProgress > 0 ? 'in_progress' : 'not_started'}
            variant="compact"
          />
          <ProgressIndicator
            title={t('progress.workflows')}
            progress={workflowProgress}
            status={workflowProgress === 100 ? 'completed' : workflowProgress > 0 ? 'in_progress' : 'not_started'}
            variant="compact"
          />
        </div>
      </CardContent>
    </Card>
  );
};