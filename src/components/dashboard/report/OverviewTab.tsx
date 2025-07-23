import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScoreCard } from '../components/ScoreCard';
import { RadarChart } from '../components/RadarChart';
import { DetailedPillarAssessment } from './DetailedPillarAssessment';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

export function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Assessment Complete</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI & Data Readiness Report</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive assessment across all dimensions of AI and data transformation readiness
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ScoreCard 
          title="Overall Score" 
          value="3.1/5.0" 
          color="primary" 
          description="62% AI Ready"
          trend="up"
        />
        <ScoreCard 
          title="Strong Areas" 
          value={2} 
          color="success" 
          description="Areas of excellence"
        />
        <ScoreCard 
          title="Developing Areas" 
          value={2} 
          color="warning" 
          description="Progressing well"
        />
        <ScoreCard 
          title="Priority Actions" 
          value={12} 
          color="destructive" 
          description="Immediate focus needed"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Readiness Score - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Overall AI Readiness</CardTitle>
                <Badge variant="secondary">Updated Today</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Score Display */}
                <div className="text-center space-y-4">
                  <div className="relative inline-flex items-center justify-center w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="8"/>
                      <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                              strokeLinecap="round" strokeDasharray={`${62 * 3.14} ${100 * 3.14}`}/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">3.1</div>
                        <div className="text-sm text-muted-foreground">out of 5.0</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Developing Stage</h3>
                    <p className="text-sm text-muted-foreground">
                      Good foundation with clear opportunities for improvement
                    </p>
                  </div>
                </div>

                {/* Progress Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Score Breakdown</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Data Foundation</span>
                        <span className="font-medium">3.5/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AI Strategy</span>
                        <span className="font-medium text-warning">2.8/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '56%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Technology</span>
                        <span className="font-medium">3.2/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Team Readiness</span>
                        <span className="font-medium text-warning">2.9/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Radar Chart */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capability Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart />
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left hover:bg-accent rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <div>
                    <div className="font-medium text-sm">View Opportunities</div>
                    <div className="text-xs text-muted-foreground">Impact vs Effort analysis</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left hover:bg-accent rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <div>
                    <div className="font-medium text-sm">Priority Actions</div>
                    <div className="text-xs text-muted-foreground">12 recommendations</div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Pillar Assessment */}
      <DetailedPillarAssessment />
    </div>
  );
}