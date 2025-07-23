import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreCard } from '../components/ScoreCard';
import { RadarChart } from '../components/RadarChart';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">Executive Overview</h2>
        <p className="text-muted-foreground text-lg">
          A comprehensive view of your organization's AI and data readiness across all five critical pillars
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          title="Focus Areas" 
          value={1} 
          color="destructive" 
          description="Needs attention"
        />
        <ScoreCard 
          title="Key Recommendations" 
          value={12} 
          color="info" 
          description="Action items"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-primary mb-2">3.1/5.0</div>
              <div className="w-full bg-muted rounded-full h-4 mb-4">
                <div className="bg-primary h-4 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pillar Assessment Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pillar Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Data Foundation</h3>
              <p className="text-sm text-muted-foreground">Data architecture and governance</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">3.5/5</div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">AI Strategy</h3>
              <p className="text-sm text-muted-foreground">Strategic planning and vision</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-warning">2.8/5</div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Technology Stack</h3>
              <p className="text-sm text-muted-foreground">Infrastructure and tools</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">3.2/5</div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Talent & Culture</h3>
              <p className="text-sm text-muted-foreground">Skills and organizational readiness</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-warning">2.9/5</div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Governance & Ethics</h3>
              <p className="text-sm text-muted-foreground">Policies and compliance</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">3.1/5</div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}