import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UseCase, useCasesData } from '@/data/useCasesData';
import { UseCaseCard } from './UseCaseCard';
import { Plus, Share2, Clock, Users, Target, AlertTriangle, CheckCircle, Database, Cog, TrendingUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSimilarUseCases } from '@/utils/searchUtils';
import { analytics } from '@/utils/analytics';

interface UseCaseModalProps {
  useCase: UseCase | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToRoadmap: (useCase: UseCase) => void;
}

export function UseCaseModal({ useCase, isOpen, onClose, onAddToRoadmap }: UseCaseModalProps) {
  if (!useCase) return null;

  // Track analytics when modal opens
  React.useEffect(() => {
    if (isOpen && useCase) {
      analytics.track(useCase.id, 'view');
    }
  }, [isOpen, useCase]);

  const similarUseCases = React.useMemo(() => {
    return getSimilarUseCases(useCase, useCasesData, 4);
  }, [useCase]);

  const handleAddToRoadmap = () => {
    analytics.track(useCase.id, 'add_to_roadmap');
    onAddToRoadmap(useCase);
  };

  const handleShare = () => {
    analytics.track(useCase.id, 'share');
    if (navigator.share) {
      navigator.share({ 
        title: useCase.title, 
        text: useCase.description 
      });
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'Scale': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pilot': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Beta': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="usecase-description">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{useCase.thumbnail}</div>
              <div>
                <DialogTitle className="text-2xl mb-2">{useCase.title}</DialogTitle>
                <div id="usecase-description" className="text-muted-foreground">{useCase.description}</div>
                <div className="flex gap-2">
                  <Badge className={cn("text-xs", getComplexityColor(useCase.complexity))}>
                    {useCase.complexity} Complexity
                  </Badge>
                  <Badge className={cn("text-xs", getMaturityColor(useCase.maturity))}>
                    {useCase.maturity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {useCase.suitability}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button
                size="sm"
                onClick={handleAddToRoadmap}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add to Roadmap
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary and Impact Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.industry.map((industry) => (
                    <Badge key={industry} variant="secondary">
                      {industry}
                    </Badge>
                  ))}
                  {useCase.department.map((dept) => (
                    <Badge key={dept} variant="outline">
                      {dept}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(useCase.impactMetrics).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-secondary/50 rounded-md">
                    <div className="text-lg font-bold text-primary">{value}</div>
                    <div className="text-sm text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Business Challenge & Goal */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Business Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.businessChallenge}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Business Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.businessGoal}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Detailed Outcomes & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {useCase.detailedOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tasks and Data Requirements */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cog className="w-5 h-5" />
                  AI Tasks & Techniques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.aiTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{task}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-3" />
                <div className="flex flex-wrap gap-1">
                  {useCase.aiType.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.dataRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Implementation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Implementation Steps</h4>
                  <div className="space-y-3">
                    {useCase.implementationSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Timeline</h4>
                    <p className="text-muted-foreground">{useCase.timeline}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Required Resources</h4>
                    <div className="space-y-1">
                      {useCase.requiredResources.map((resource, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics and Risks */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Metrics & KPIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.successMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risks & Limitations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.risks.map((risk, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Studies */}
          {useCase.caseStudies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Case Studies & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.caseStudies.map((study, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{study}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Similar Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">You Might Also Like</CardTitle>
            </CardHeader>
            <CardContent>
              {similarUseCases.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {similarUseCases.map((similarUseCase) => (
                    <div key={similarUseCase.id} className="scale-75 origin-top-left">
                      <UseCaseCard
                        useCase={similarUseCase}
                        onViewDetails={() => {
                          onClose();
                          setTimeout(() => {
                            // This would need to be handled by parent component
                            if (process.env.NODE_ENV === 'development') {
                              console.log('Navigate to similar use case:', similarUseCase.id);
                            }
                          }, 100);
                        }}
                        onAddToRoadmap={onAddToRoadmap}
                        className="h-auto"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  No similar use cases found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}