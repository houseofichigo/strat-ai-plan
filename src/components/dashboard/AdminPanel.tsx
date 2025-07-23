import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Crown, 
  TrendingUp, 
  Activity, 
  BarChart3, 
  Calendar, 
  Download, 
  Settings, 
  UserPlus, 
  UserMinus, 
  RefreshCw,
  Search,
  Filter,
  Mail,
  Clock,
  Target,
  Zap,
  Bot,
  Workflow,
  GraduationCap,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ExternalLink,
  FileText,
  PieChart,
  TrendingDown,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { 
  sampleLicense, 
  sampleUsers, 
  sampleActivityLog, 
  sampleDepartmentStats, 
  generateUsageTrends,
  getTopRecommendations,
  type UserData 
} from '@/data/adminSampleData';

interface License {
  id: string;
  plan: 'starter_3' | 'business_5' | 'enterprise_10';
  seats_total: number;
  seats_used: number;
  company_name: string;
  is_active: boolean;
}

interface LicenseUser {
  id: string;
  email: string;
  full_name: string | null;
  department: string | null;
  last_activity: string;
  created_at: string;
}

interface UsageStats {
  date: string;
  use_cases_explored: number;
  workflows_launched: number;
  agents_deployed: number;
  trainings_started: number;
  trainings_completed: number;
  time_on_platform: number;
  login_count: number;
}

interface ActivityLog {
  id: string;
  action_type: string;
  action_details: any;
  department: string | null;
  created_at: string;
  user_email: string;
  user_name: string | null;
}

interface DepartmentStats {
  department: string;
  users: number;
  use_cases: number;
  workflows: number;
  agents: number;
  adoption_score: number;
}

const planDisplayNames = {
  starter_3: 'Starter (3 licenses)',
  business_5: 'Business (5 licenses)', 
  enterprise_10: 'Enterprise (10 licenses)'
};

export function AdminPanel() {
  const [license, setLicense] = useState<License | null>(null);
  const [licenseUsers, setLicenseUsers] = useState<LicenseUser[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, [selectedTimeframe, selectedDepartment]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load license info from Supabase
      const { data: user } = await supabase.auth.getUser();
      
      if (user.user) {
        const { data: licenseData, error: licenseError } = await supabase
          .from('licenses')
          .select('*')
          .eq('license_owner_id', user.user.id)
          .maybeSingle();

        if (licenseData) {
          setLicense(licenseData);
        } else {
          // Use sample data for demo
          console.log('No license found in database, using sample data');
          setLicense(sampleLicense);
        }
      } else {
        // Use sample data for demo
        setLicense(sampleLicense);
      }

      // Use sample data for the rest
      const usersData = sampleUsers.map(user => ({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        department: user.department,
        last_activity: user.last_activity,
        created_at: user.created_at
      }));
      
      setLicenseUsers(usersData);
      setUsageStats(generateUsageTrends(30));
      setActivityLog(sampleActivityLog);
      setDepartmentStats(sampleDepartmentStats);

    } catch (err) {
      console.error('Error loading admin data:', err);
      // Fallback to sample data on error
      setLicense(sampleLicense);
      setLicenseUsers(sampleUsers.map(user => ({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        department: user.department,
        last_activity: user.last_activity,
        created_at: user.created_at
      })));
      setUsageStats(generateUsageTrends(30));
      setActivityLog(sampleActivityLog);
      setDepartmentStats(sampleDepartmentStats);
    } finally {
      setLoading(false);
    }
  };


  const handleInviteUser = async () => {
    if (!inviteEmail || !license) return;

    try {
      // In a real implementation, you'd handle user invitation here
      // For now, just show success feedback
      setInviteEmail('');
      setShowInviteDialog(false);
      // You would typically send an invitation email and create a pending user record
    } catch (err) {
      console.error('Error inviting user:', err);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      // Remove user from license
      await supabase
        .from('license_assignments')
        .delete()
        .eq('user_id', userId)
        .eq('license_id', license?.id);
      
      // Reload data
      loadAdminData();
    } catch (err) {
      console.error('Error removing user:', err);
    }
  };

  const exportData = (type: 'csv' | 'pdf') => {
    // Implementation for data export
    console.log(`Exporting ${type} report`);
  };

  const getAdoptionScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getActivityIcon = (actionType: string) => {
    switch (actionType) {
      case 'use_case_added': return <Target className="h-4 w-4 text-blue-500" />;
      case 'workflow_deployed': return <Workflow className="h-4 w-4 text-green-500" />;
      case 'agent_created': return <Bot className="h-4 w-4 text-purple-500" />;
      case 'training_completed': return <GraduationCap className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredUsers = licenseUsers.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsageStats = usageStats.reduce((acc, stat) => ({
    use_cases_explored: acc.use_cases_explored + stat.use_cases_explored,
    workflows_launched: acc.workflows_launched + stat.workflows_launched,
    agents_deployed: acc.agents_deployed + stat.agents_deployed,
    trainings_completed: acc.trainings_completed + stat.trainings_completed,
    total_logins: acc.total_logins + stat.login_count
  }), { use_cases_explored: 0, workflows_launched: 0, agents_deployed: 0, trainings_completed: 0, total_logins: 0 });

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!license) {
    return (
      <div className="p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>No license found. Contact support to set up your admin access.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h1 className="text-3xl font-bold">License Owner Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your {planDisplayNames[license.plan]} • {license.company_name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportData('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">License Usage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {license.seats_used}/{license.seats_total}
            </div>
            <div className="mt-2">
              <Progress value={(license.seats_used / license.seats_total) * 100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {license.seats_total - license.seats_used} seats available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityLog.length}</div>
            <p className="text-xs text-muted-foreground">
              Actions this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows Launched</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsageStats.workflows_launched}</div>
            <p className="text-xs text-muted-foreground">
              Total deployments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsageStats.trainings_completed}</div>
            <p className="text-xs text-muted-foreground">
              Courses completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">License Users</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Platform Usage Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage Overview</CardTitle>
                <CardDescription>Key metrics across all users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Use Cases Explored</span>
                  </div>
                  <span className="font-bold">{totalUsageStats.use_cases_explored}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Workflows Launched</span>
                  </div>
                  <span className="font-bold">{totalUsageStats.workflows_launched}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">AI Agents Deployed</span>
                  </div>
                  <span className="font-bold">{totalUsageStats.agents_deployed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Training Completed</span>
                  </div>
                  <span className="font-bold">{totalUsageStats.trainings_completed}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions by your team</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {activityLog.slice(0, 10).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        {getActivityIcon(activity.action_type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">
                            {activity.user_name || activity.user_email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.action_type.replace('_', ' ')} • {activity.action_details?.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          {/* User Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">License Users</h3>
              <p className="text-sm text-muted-foreground">
                Manage users and their access to the platform
              </p>
            </div>
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your license
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleInviteUser}>Send Invitation</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.full_name || 'No name'}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.department || 'Unassigned'}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.last_activity).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Department Analytics</h3>
            <p className="text-sm text-muted-foreground">
              AI adoption and usage by department
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departmentStats.map((dept) => (
              <Card key={dept.department}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dept.department}</CardTitle>
                    <Badge className={`text-xs ${getAdoptionScoreColor(dept.adoption_score)}`}>
                      {dept.adoption_score}% adoption
                    </Badge>
                  </div>
                  <CardDescription>{dept.users} users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Use Cases</span>
                    <span className="font-medium">{dept.use_cases}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Workflows</span>
                    <span className="font-medium">{dept.workflows}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>AI Agents</span>
                    <span className="font-medium">{dept.agents}</span>
                  </div>
                  <div className="pt-2">
                    <Progress value={dept.adoption_score} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Usage Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Platform usage trends and insights
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Chart visualization would go here</p>
                    <p className="text-xs">Integration with chart library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
                <CardDescription>Most used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Feature adoption chart</p>
                    <p className="text-xs">Integration with chart library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Activity Feed</h3>
            <p className="text-sm text-muted-foreground">
              Real-time activity across your organization
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="p-4 space-y-4">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      {getActivityIcon(activity.action_type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{activity.user_name || activity.user_email}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.action_type.replace('_', ' ')} • {activity.action_details?.title}
                            </p>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <p>{new Date(activity.created_at).toLocaleDateString()}</p>
                            <p>{activity.department}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}