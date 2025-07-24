import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Solution } from '../Solutions';
import { Eye, Plus } from 'lucide-react';

interface SimilarSolutionsProps {
  currentSolution: Solution;
  similarSolutions: Solution[];
  onPreview: (solution: Solution) => void;
  onCopy: (solution: Solution) => void;
}

export function SimilarSolutions({ 
  currentSolution, 
  similarSolutions, 
  onPreview, 
  onCopy 
}: SimilarSolutionsProps) {
  if (similarSolutions.length === 0) return null;

  const getSolutionTypeColor = (type: string) => {
    switch (type) {
      case 'agent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'workflow': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hybrid': return 'bg-gradient-to-r from-blue-100 to-purple-100 text-primary border-primary/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Similar Solutions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {similarSolutions.slice(0, 3).map((solution) => (
          <div key={solution.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`text-xs ${getSolutionTypeColor(solution.type)}`}>
                  {solution.type === 'agent' ? 'Agent' : 'Workflow'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {solution.complexity}
                </Badge>
              </div>
              <h4 className="font-medium text-sm truncate">{solution.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{solution.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">Setup: {solution.setupTime}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">ROI: {solution.roi}</span>
              </div>
            </div>
            <div className="flex gap-1 ml-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onPreview(solution)}
                className="h-8 w-8 p-0"
              >
                <Eye className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onCopy(solution)}
                className="h-8 w-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}