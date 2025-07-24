import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ReportDashboard } from '@/components/dashboard/ReportDashboard';
import { UseCases } from '@/components/dashboard/UseCases';
import { Solutions } from '@/components/dashboard/Solutions';
import { RoadmapBuilder } from '@/components/dashboard/RoadmapBuilder';
import { TrainingCenter } from '@/components/dashboard/TrainingCenter';
import { ResourceHub } from '@/components/dashboard/ResourceHub';
import { GDPRRegistry } from '@/components/dashboard/GDPRRegistry';
import { Playground } from '@/components/dashboard/Playground';
import { AdminPanel } from '@/components/dashboard/AdminPanel';
import { Services } from '@/components/dashboard/Services';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/report" element={<ReportDashboard />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/agents" element={<Solutions />} />
            <Route path="/workflows" element={<Solutions />} />
            <Route path="/roadmap" element={<RoadmapBuilder />} />
            <Route path="/training" element={<TrainingCenter />} />
            <Route path="/resources" element={<ResourceHub />} />
            <Route path="/gdpr" element={<GDPRRegistry />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/" element={<ReportDashboard />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}