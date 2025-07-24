import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Solution } from '../Solutions';
import { ArrowRight, Play, Zap } from 'lucide-react';

interface SolutionHeroBannerProps {
  featuredSolutions: Solution[];
  onExplore: (solution: Solution) => void;
}

export function SolutionHeroBanner({ featuredSolutions, onExplore }: SolutionHeroBannerProps) {
  const getSolutionTypeColor = (type: string) => {
    switch (type) {
      case 'agent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'workflow': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hybrid': return 'bg-gradient-to-r from-blue-100 to-purple-100 text-primary border-primary/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {featuredSolutions.map((solution) => (
            <CarouselItem key={solution.id}>
              <Card className="border-0 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row min-h-[400px]">
                    {/* Content Side */}
                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-accent text-accent-foreground">
                            Editor's Pick
                          </Badge>
                          <Badge className={getSolutionTypeColor(solution.type)}>
                            {solution.type === 'agent' ? 'AI Agent' : solution.type === 'workflow' ? 'Workflow' : 'Hybrid'}
                          </Badge>
                          <Badge variant="outline">
                            {solution.category[0]}
                          </Badge>
                          <Badge variant="outline">
                            {solution.complexity}
                          </Badge>
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          {solution.name}
                        </h1>
                        
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {solution.description}
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                          <div className="text-center p-3 bg-background/80 rounded-lg backdrop-blur-sm">
                            <div className="text-2xl font-bold text-primary">{solution.setupTime}</div>
                            <div className="text-sm text-muted-foreground">Setup Time</div>
                          </div>
                          <div className="text-center p-3 bg-background/80 rounded-lg backdrop-blur-sm">
                            <div className="text-2xl font-bold text-primary">
                              {solution.type === 'agent' ? solution.data.usage : solution.data.deployments}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {solution.type === 'agent' ? 'Usage' : 'Deployments'}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-background/80 rounded-lg backdrop-blur-sm">
                            <div className="text-2xl font-bold text-primary">{solution.roi}</div>
                            <div className="text-sm text-muted-foreground">ROI</div>
                          </div>
                        </div>
                        
                        {/* Technology Stack */}
                        <div className="mb-8">
                          <p className="text-sm text-muted-foreground mb-2">Technology Stack:</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            {solution.type === 'agent' 
                              ? solution.data.stackIcons && Object.entries(solution.data.stackIcons).slice(0, 5).map(([name, icon]) => (
                                  <div key={name} className="flex items-center gap-1 px-2 py-1 bg-background/60 rounded-md">
                                    <span className="text-lg">{String(icon)}</span>
                                    <span className="text-xs">{name}</span>
                                  </div>
                                ))
                              : solution.data.appIcons && Object.entries(solution.data.appIcons).slice(0, 5).map(([name, icon]) => (
                                  <div key={name} className="flex items-center gap-1 px-2 py-1 bg-background/60 rounded-md">
                                    <span className="text-lg">{String(icon)}</span>
                                    <span className="text-xs">{name}</span>
                                  </div>
                                ))
                            }
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button 
                            size="lg" 
                            onClick={() => onExplore(solution)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Explore {solution.type === 'agent' ? 'Agent' : 'Workflow'}
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                          <Button size="lg" variant="outline">
                            <Zap className="w-5 h-5 mr-2" />
                            Quick Deploy
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual Side */}
                    <div className="flex-1 relative flex items-center justify-center p-8 lg:p-12">
                      <div className="relative">
                        {/* Large icons background */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="grid grid-cols-3 gap-8 text-8xl">
                            {solution.type === 'agent' 
                              ? solution.data.stackIcons && Object.values(solution.data.stackIcons).slice(0, 6).map((icon, index) => (
                                  <div key={index} className="flex items-center justify-center">
                                    {String(icon)}
                                  </div>
                                ))
                              : solution.data.appIcons && Object.values(solution.data.appIcons).slice(0, 6).map((icon, index) => (
                                  <div key={index} className="flex items-center justify-center">
                                    {String(icon)}
                                  </div>
                                ))
                            }
                          </div>
                        </div>
                        
                        {/* Floating info cards */}
                        <div className="relative z-10 space-y-4">
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="text-xl font-bold text-primary">
                              {solution.type === 'agent' ? `${solution.data.views} views` : `${solution.data.rating} rating`}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {solution.type === 'agent' ? 'Template popularity' : 'User feedback'}
                            </div>
                          </div>
                          
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in ml-8" style={{ animationDelay: '0.4s' }}>
                            <div className="text-lg font-semibold">
                              {solution.type === 'agent' ? solution.data.inputOutputFlow.input : solution.data.painPoint}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {solution.type === 'agent' ? `→ ${solution.data.inputOutputFlow.output}` : 'Solves key challenge'}
                            </div>
                          </div>
                          
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <div className="text-lg font-semibold">Ready to Deploy</div>
                            <div className="text-sm text-muted-foreground">Pre-configured template</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}