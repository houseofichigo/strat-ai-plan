import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function StrategicInsightsTab() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">Strategic Recommendations</h2>
        <p className="text-muted-foreground text-lg">
          Phased approach to AI and data transformation with clear timelines and priorities
        </p>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="bg-success/5 border-success/20">
          <CardContent className="text-center p-6">
            <div className="text-success mb-2">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🎯</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-success mb-1">30 Days</h3>
            <p className="text-sm text-success/80 mb-2">Quick Wins</p>
            <div className="text-2xl font-bold text-success">3</div>
            <p className="text-xs text-success/60">Recommendations</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="text-center p-6">
            <div className="text-primary mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📈</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-1">90 Days</h3>
            <p className="text-sm text-primary/80 mb-2">Foundation</p>
            <div className="text-2xl font-bold text-primary">4</div>
            <p className="text-xs text-primary/60">Recommendations</p>
          </CardContent>
        </Card>

        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="text-center p-6">
            <div className="text-accent-foreground mb-2">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🚀</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-accent-foreground mb-1">180 Days</h3>
            <p className="text-sm text-muted-foreground mb-2">Transformation</p>
            <div className="text-2xl font-bold text-accent-foreground">3</div>
            <p className="text-xs text-muted-foreground">Recommendations</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <Card className="border-success/20">
          <CardHeader className="bg-success/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center text-sm font-bold">
                🎯
              </div>
              <div>
                <CardTitle className="text-success">30 Days - Quick Wins</CardTitle>
                <p className="text-sm text-success/80">Focus areas for immediate impact and foundation building</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Data Quality Assessment</h3>
                <div className="flex gap-2">
                  <Badge variant="destructive">High Priority</Badge>
                  <Badge variant="secondary">Medium Effort</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Conduct comprehensive audit of existing data sources and implement immediate quality improvements.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">AI Skills Training Program</h3>
                <div className="flex gap-2">
                  <Badge variant="destructive">High Priority</Badge>
                  <Badge variant="outline">Low Effort</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Launch foundational AI literacy program for key stakeholders and technical teams.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Quick Win Use Cases</h3>
                <div className="flex gap-2">
                  <Badge className="bg-warning text-warning-foreground">Medium Priority</Badge>
                  <Badge variant="secondary">Medium Effort</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Identify and prioritize 2-3 low-risk, high-impact AI use cases for immediate implementation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}