import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Target,
  Map,
  GraduationCap,
  FileText,
  Shield,
  MessageSquare,
  Crown,
  Headphones,
  Layers
} from 'lucide-react';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { LanguageSelector } from '@/components/language/LanguageSelector';

const menuItems = [
  { titleKey: 'nav.reports', url: '/dashboard/report', icon: BarChart3, tourId: 'reports' },
  { titleKey: 'nav.useCases', url: '/dashboard/use-cases', icon: Target },
  { titleKey: 'nav.solutions', url: '/dashboard/solutions', icon: Layers },
  { titleKey: 'nav.roadmap', url: '/dashboard/roadmap', icon: Map, tourId: 'roadmap' },
  { titleKey: 'nav.training', url: '/dashboard/training', icon: GraduationCap, tourId: 'training' },
  { titleKey: 'nav.resources', url: '/dashboard/resources', icon: FileText },
  { titleKey: 'nav.gdpr', url: '/dashboard/gdpr', icon: Shield },
  { titleKey: 'nav.playground', url: '/dashboard/playground', icon: MessageSquare },
  { titleKey: 'nav.services', url: '/dashboard/services', icon: Headphones },
  { titleKey: 'nav.admin', url: '/dashboard/admin', icon: Crown },
];

export function DashboardSidebar() {
  const { t } = useTranslation();
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
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-lg text-foreground transition-all ${collapsed ? 'text-center text-sm' : ''}`}>
              {collapsed ? 'AI' : 'AI Readiness Dashboard'}
            </h2>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <NotificationCenter />
                <LanguageSelector />
              </div>
            )}
          </div>
          {collapsed && (
            <div className="mt-2 flex justify-center">
              <NotificationCenter />
            </div>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${getNavCls({ isActive })}`}
                      data-tour={item.tourId}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{t(item.titleKey)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {collapsed && (
        <SidebarFooter className="p-2 border-t">
          <div className="flex justify-center">
            <LanguageSelector />
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}