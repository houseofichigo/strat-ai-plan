import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { UseCase } from '@/data/useCasesData';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface HeroBannerProps {
  featuredUseCases: UseCase[];
  onExplore: (useCase: UseCase) => void;
}

export function HeroBanner({ featuredUseCases, onExplore }: HeroBannerProps) {
  return (
    <div className="relative mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {featuredUseCases.map((useCase) => (
            <CarouselItem key={useCase.id}>
              <Card className="border-0 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row min-h-[400px]">
                    {/* Content Side */}
                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-accent text-accent-foreground">
                            Featured This Week
                          </Badge>
                          <Badge variant="outline">
                            {useCase.industry[0]}
                          </Badge>
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          {useCase.title}
                        </h1>
                        
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {useCase.description}
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                          {Object.entries(useCase.impactMetrics).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-background/80 rounded-lg backdrop-blur-sm">
                              <div className="text-2xl font-bold text-primary">{value}</div>
                              <div className="text-sm text-muted-foreground capitalize">{key} Improvement</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button 
                            size="lg" 
                            onClick={() => onExplore(useCase)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Explore Use Case
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                          <Button size="lg" variant="outline">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            View Impact Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual Side */}
                    <div className="flex-1 relative flex items-center justify-center p-8 lg:p-12">
                      <div className="relative">
                        {/* Large emoji/icon */}
                        <div className="text-[200px] lg:text-[300px] opacity-20 absolute inset-0 flex items-center justify-center">
                          {useCase.thumbnail}
                        </div>
                        
                        {/* Floating cards with metrics */}
                        <div className="relative z-10 space-y-4">
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="text-2xl font-bold text-primary">{useCase.summaryValue}</div>
                            <div className="text-sm text-muted-foreground">Primary Benefit</div>
                          </div>
                          
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in ml-8" style={{ animationDelay: '0.4s' }}>
                            <div className="text-lg font-semibold">{useCase.complexity} Complexity</div>
                            <div className="text-sm text-muted-foreground">{useCase.timeline}</div>
                          </div>
                          
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <div className="text-lg font-semibold">{useCase.maturity} Ready</div>
                            <div className="text-sm text-muted-foreground">Implementation Status</div>
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