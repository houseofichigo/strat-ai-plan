import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UseCaseCard } from './UseCaseCard';
import { UseCase } from '@/data/useCasesData';
import { ChevronRight } from 'lucide-react';

interface CategoryRowProps {
  title: string;
  useCases: UseCase[];
  onViewDetails: (useCase: UseCase) => void;
  onAddToRoadmap: (useCase: UseCase) => void;
  onViewAll?: () => void;
}

export function CategoryRow({ title, useCases, onViewDetails, onAddToRoadmap, onViewAll }: CategoryRowProps) {
  if (useCases.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {onViewAll && (
          <Button variant="ghost" onClick={onViewAll} className="text-primary hover:text-primary/80">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-background">
        {useCases.map((useCase) => (
          <div key={useCase.id} className="flex-none w-80">
            <UseCaseCard
              useCase={useCase}
              onViewDetails={onViewDetails}
              onAddToRoadmap={onAddToRoadmap}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}