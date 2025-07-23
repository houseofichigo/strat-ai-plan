import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { DashboardSkeleton } from '@/components/ui/loading-skeleton';
import { PlatformOverview } from './admin/PlatformOverview';
import { LicenseManagement } from './admin/LicenseManagement';
import { UserAnalytics } from './admin/UserAnalytics';
import { ROIProjectionTool } from './admin/ROIProjectionTool';

export function AdminPanel() {
  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-1">License Management & Analytics Dashboard</p>
          </div>
        </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">License Management</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="roi">ROI Projection</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <PlatformOverview />
            </Suspense>
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <LicenseManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <UserAnalytics />
            </Suspense>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <ROIProjectionTool />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-8 text-muted-foreground">
              Advanced analytics dashboard coming soon
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
}