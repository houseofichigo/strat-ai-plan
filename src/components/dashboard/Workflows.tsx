import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { workflowTemplatesData, workflowCategories, sampleUserProfiles, getPersonalizedWorkflows, getPersonalizedRecommendation } from '@/data/workflowTemplatesData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Play, Plus, Clock, TrendingUp, Zap } from 'lucide-react';

export function Workflows() {
  // Using sample user profile for demonstration
  const currentUser = sampleUserProfiles[0]; // Sales Manager in SaaS
  const personalizedWorkflows = useMemo(() => getPersonalizedWorkflows(currentUser), [currentUser]);

  return (
    <div className="min-h-screen bg-background">
      {/* Personalized Hero Banner */}
      <div className="px-6 pt-6 mb-8">
        <Card className="border-0 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Personalized for {currentUser.role} in {currentUser.industry}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Automation Workflows Built for You
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover workflows tailored to your role, industry, and automation maturity level. 
                Start with quick wins and scale your automation journey.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-background/80 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{personalizedWorkflows.length}</div>
                  <div className="text-sm text-muted-foreground">Workflows for You</div>
                </div>
                <div className="text-center p-4 bg-background/80 rounded-lg">
                  <div className="text-2xl font-bold text-primary">25h</div>
                  <div className="text-sm text-muted-foreground">Avg. Time Saved/Week</div>
                </div>
                <div className="text-center p-4 bg-background/80 rounded-lg">
                  <div className="text-2xl font-bold text-primary">ROI 400%</div>
                  <div className="text-sm text-muted-foreground">Average Return</div>
                </div>
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Play className="w-5 h-5 mr-2" />
                Explore Your Workflows
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Category Rows */}
      <div className="px-6">
        {workflowCategories.map((category) => {
          const categoryWorkflows = personalizedWorkflows.filter(category.filter);
          if (categoryWorkflows.length === 0) return null;

          return (
            <div key={category.id} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Button variant="ghost" className="text-primary">View All</Button>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4">
                {categoryWorkflows.map((workflow) => (
                  <div key={workflow.id} className="flex-none w-80">
                    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border cursor-pointer h-full">
                      <CardContent className="p-0">
                        {/* Header */}
                        <div className="relative h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center p-4">
                          <div className="flex items-center gap-2">
                            {Object.values(workflow.appIcons).slice(0, 3).map((icon, index) => (
                              <div key={index} className="text-2xl">{icon}</div>
                            ))}
                          </div>
                          
                          {workflow.quickWin && (
                            <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs">
                              Quick Win
                            </Badge>
                          )}

                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <Play className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{workflow.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{workflow.description}</p>

                          {/* Personalization Reason */}
                          <div className="mb-3 p-2 bg-accent/10 rounded-md">
                            <p className="text-xs text-accent-foreground">
                              ✨ {getPersonalizedRecommendation(currentUser, workflow)}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {workflow.category.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-center p-2 bg-secondary/50 rounded-md">
                              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                                <Clock className="w-3 h-3" />
                                {workflow.timeSaved}
                              </div>
                              <div className="text-xs text-muted-foreground">Saved</div>
                            </div>
                            <div className="text-center p-2 bg-secondary/50 rounded-md">
                              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                                <TrendingUp className="w-3 h-3" />
                                {workflow.roi}
                              </div>
                              <div className="text-xs text-muted-foreground">ROI</div>
                            </div>
                          </div>

                          {/* Bottom */}
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {workflow.complexity}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                                <Heart className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Setup Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Automating?</h2>
          <p className="text-muted-foreground mb-6">
            Based on your profile, we recommend starting with these quick wins
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Zap className="w-5 h-5 mr-2" />
            Build My First Workflow
          </Button>
        </div>
      </div>
    </div>
  );
}