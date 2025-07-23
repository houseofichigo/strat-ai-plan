import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './report/OverviewTab';
import { PillarsTab } from './report/PillarsTab';
import { StrategicInsightsTab } from './report/StrategicInsightsTab';
import { OpportunityMapTab } from './report/OpportunityMapTab';

export function ReportDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI & Data Readiness Report</h1>
          <p className="text-muted-foreground mt-1">House of Ichigo • 23/07/2025</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pillars">Pillar Analysis</TabsTrigger>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunity Map</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="pillars" className="space-y-6">
          <PillarsTab />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <StrategicInsightsTab />
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <OpportunityMapTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}