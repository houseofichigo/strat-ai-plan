import React, { memo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Calendar,
  Activity
} from 'lucide-react';
import { ChartSkeleton, TableSkeleton } from '@/components/ui/loading-skeleton';
import { generateUsageTrends, sampleActivityLog } from '@/data/adminSampleData';

// Lazy load chart components for better performance
const AreaChart = React.lazy(() => 
  import('recharts').then(module => ({ default: module.AreaChart }))
);

const PlatformOverview = memo(() => {
  const usageTrends = generateUsageTrends(30);
  
  const totalUseCases = 47;
  const totalWorkflows = 12;
  const totalAgents = 8;
  const activeUsers = 15;

  const recentActivities = sampleActivityLog.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Use Cases</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUseCases}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Usage Trends (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ChartSkeleton />}>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Chart visualization would go here
              </div>
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action_type.replace('_', ' ')}</p>
                      <p className="text-xs text-muted-foreground">{activity.user_email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="adoption" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adoption">Adoption</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="roi">ROI Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adoption" className="space-y-4">
              <Suspense fallback={<TableSkeleton rows={5} columns={4} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['IT', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'].map((dept) => (
                    <Card key={dept}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{dept}</span>
                          <Badge variant="outline">
                            {Math.floor(Math.random() * 40) + 60}%
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 10) + 5} use cases
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Suspense>
            </TabsContent>
            
            <TabsContent value="engagement">
              <div className="text-center py-8 text-muted-foreground">
                Engagement analytics coming soon
              </div>
            </TabsContent>
            
            <TabsContent value="roi">
              <div className="text-center py-8 text-muted-foreground">
                ROI impact metrics coming soon
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});

PlatformOverview.displayName = 'PlatformOverview';

export { PlatformOverview };