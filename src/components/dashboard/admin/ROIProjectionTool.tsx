import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Calculator,
  Download,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface ROIProjection {
  projectType: string;
  timeline: number;
  effort: string;
  timeSavings: number;
  costSavings: number;
  revenueIncrease: number;
  department: string;
  initialInvestment: number;
}

export function ROIProjectionTool() {
  const [projection, setProjection] = useState<ROIProjection>({
    projectType: '',
    timeline: 3,
    effort: 'medium',
    timeSavings: 0,
    costSavings: 0,
    revenueIncrease: 0,
    department: '',
    initialInvestment: 5000
  });

  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const annualBenefit = (projection.timeSavings * 50 * 52) + projection.costSavings + projection.revenueIncrease;
    const roi = ((annualBenefit - projection.initialInvestment) / projection.initialInvestment) * 100;
    const paybackMonths = (projection.initialInvestment / (annualBenefit / 12));
    
    return {
      annualBenefit,
      roi,
      paybackMonths,
      monthlyBenefit: annualBenefit / 12
    };
  };

  const runProjection = () => {
    setShowResults(true);
  };

  const resetProjection = () => {
    setProjection({
      projectType: '',
      timeline: 3,
      effort: 'medium',
      timeSavings: 0,
      costSavings: 0,
      revenueIncrease: 0,
      department: '',
      initialInvestment: 5000
    });
    setShowResults(false);
  };

  const results = showResults ? calculateROI() : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ROI Projection Tool</h2>
          <p className="text-muted-foreground">Calculate expected returns for AI/automation projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={resetProjection} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Project Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectType">Project Type</Label>
                <Select value={projection.projectType} onValueChange={(value) => 
                  setProjection({ ...projection, projectType: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer_support">Customer Support Automation</SelectItem>
                    <SelectItem value="invoice_processing">Invoice Processing</SelectItem>
                    <SelectItem value="lead_scoring">Lead Scoring AI</SelectItem>
                    <SelectItem value="content_generation">Content Generation</SelectItem>
                    <SelectItem value="data_analysis">Data Analysis Automation</SelectItem>
                    <SelectItem value="document_processing">Document Processing</SelectItem>
                    <SelectItem value="custom">Custom Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={projection.department} onValueChange={(value) => 
                  setProjection({ ...projection, department: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeline">Timeline (months)</Label>
                <Input
                  type="number"
                  value={projection.timeline}
                  onChange={(e) => setProjection({ ...projection, timeline: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="24"
                />
              </div>

              <div>
                <Label htmlFor="effort">Implementation Effort</Label>
                <Select value={projection.effort} onValueChange={(value) => 
                  setProjection({ ...projection, effort: value })
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (1-2 weeks)</SelectItem>
                    <SelectItem value="medium">Medium (1-2 months)</SelectItem>
                    <SelectItem value="high">High (3-6 months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="investment">Initial Investment ($)</Label>
              <Input
                type="number"
                value={projection.initialInvestment}
                onChange={(e) => setProjection({ ...projection, initialInvestment: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>

            <div className="space-y-3">
              <Label>Expected Benefits (Annual)</Label>
              
              <div>
                <Label htmlFor="timeSavings" className="text-sm text-muted-foreground">
                  Time Savings (hours/week)
                </Label>
                <Input
                  type="number"
                  value={projection.timeSavings}
                  onChange={(e) => setProjection({ ...projection, timeSavings: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="costSavings" className="text-sm text-muted-foreground">
                  Cost Savings ($)
                </Label>
                <Input
                  type="number"
                  value={projection.costSavings}
                  onChange={(e) => setProjection({ ...projection, costSavings: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="revenueIncrease" className="text-sm text-muted-foreground">
                  Revenue Increase ($)
                </Label>
                <Input
                  type="number"
                  value={projection.revenueIncrease}
                  onChange={(e) => setProjection({ ...projection, revenueIncrease: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
            </div>

            <Button onClick={runProjection} className="w-full" disabled={!projection.projectType}>
              Calculate ROI Projection
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              ROI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Configure your project parameters and click "Calculate ROI Projection" to see results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">ROI</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {results!.roi.toFixed(0)}%
                    </div>
                  </div>

                  <div className="bg-success/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">Annual Benefit</span>
                    </div>
                    <div className="text-2xl font-bold text-success">
                      ${results!.annualBenefit.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-warning/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">Payback Period</span>
                    </div>
                    <div className="text-2xl font-bold text-warning">
                      {results!.paybackMonths.toFixed(1)} months
                    </div>
                  </div>

                  <div className="bg-info/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PieChart className="w-4 h-4 text-info" />
                      <span className="text-sm font-medium">Monthly Benefit</span>
                    </div>
                    <div className="text-2xl font-bold text-info">
                      ${results!.monthlyBenefit.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Benefit Breakdown</h4>
                  
                  {projection.timeSavings > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Time Savings ({projection.timeSavings}h/week)</span>
                      <span className="font-medium">${(projection.timeSavings * 50 * 52).toLocaleString()}</span>
                    </div>
                  )}
                  
                  {projection.costSavings > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cost Savings</span>
                      <span className="font-medium">${projection.costSavings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {projection.revenueIncrease > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Increase</span>
                      <span className="font-medium">${projection.revenueIncrease.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Timeline Visualization */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Implementation Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Progress</span>
                      <span>{projection.timeline} months</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Month 1-2: Setup and initial implementation</div>
                    <div>• Month 3-{Math.ceil(projection.timeline/2)}: Testing and optimization</div>
                    <div>• Month {Math.ceil(projection.timeline/2)+1}-{projection.timeline}: Full deployment and monitoring</div>
                  </div>
                </div>

                {/* What-if Scenarios */}
                <div className="space-y-3">
                  <h4 className="font-semibold">What-if Scenarios</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted/50 rounded p-3">
                      <div className="font-medium text-success">Best Case (+25%)</div>
                      <div>${(results!.annualBenefit * 1.25).toLocaleString()} / year</div>
                    </div>
                    <div className="bg-muted/50 rounded p-3">
                      <div className="font-medium text-warning">Conservative (-25%)</div>
                      <div>${(results!.annualBenefit * 0.75).toLocaleString()} / year</div>
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="w-full justify-center py-2">
                  {results!.roi > 200 ? 'Excellent ROI' : results!.roi > 100 ? 'Good ROI' : 'Moderate ROI'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}