import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScoreCardProps {
  title: string;
  value: number | string;
  color: 'success' | 'warning' | 'destructive' | 'info' | 'primary';
  description: string;
  trend?: 'up' | 'down';
}

export function ScoreCard({ title, value, color, description }: ScoreCardProps) {
  const colorClasses = {
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
    info: 'text-info',
    primary: 'text-primary',
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${colorClasses[color]} mb-1`}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}