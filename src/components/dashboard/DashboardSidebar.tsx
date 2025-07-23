import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Target,
  Bot,
  Workflow,
  Map,
  GraduationCap,
  Shield,
  MessageSquare,
  Settings,
  Crown,
  Headphones
} from 'lucide-react';

const menuItems = [
  { title: 'Report', url: '/dashboard/report', icon: BarChart3 },
  { title: 'Use Cases', url: '/dashboard/use-cases', icon: Target },
  { title: 'Agents', url: '/dashboard/agents', icon: Bot },
  { title: 'Workflows', url: '/dashboard/workflows', icon: Workflow },
  { title: 'Roadmap', url: '/dashboard/roadmap', icon: Map },
  { title: 'Training', url: '/dashboard/training', icon: GraduationCap },
  { title: 'GDPR', url: '/dashboard/gdpr', icon: Shield },
  { title: 'Playground', url: '/dashboard/playground', icon: MessageSquare },
  { title: 'Services', url: '/dashboard/services', icon: Headphones },
  { title: 'Admin', url: '/dashboard/admin', icon: Crown },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground';

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'}>
      <SidebarContent className="bg-card border-r">
        <div className="p-4 border-b">
          <h2 className={`font-bold text-lg text-foreground transition-all ${collapsed ? 'text-center text-sm' : ''}`}>
            {collapsed ? 'AI' : 'AI Readiness Dashboard'}
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}