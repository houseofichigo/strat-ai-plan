import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Zap,
  BarChart3,
  Download,
  Share,
  Mail,
  MessageSquare,
  Users,
  Workflow,
  Bot,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Award,
  Lightbulb,
  Settings,
  UserPlus,
  UserX,
  Eye,
  Shield,
  Building2,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface ROIMetric {
  id: string;
  title: string;
  type: 'workflow' | 'use-case' | 'agent';
  owner: string;
  department: string;
  timeSaved: number;
  costSaved: number;
  revenueGenerated: number;
  errorReduction: number;
  roi: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  deployedDate: string;
}

const sampleROIData: ROIMetric[] = [
  {
    id: '1',
    title: 'Invoice Processing Automation',
    type: 'workflow',
    owner: 'Mike Rodriguez',
    department: 'Finance',
    timeSaved: 20,
    costSaved: 8000,
    revenueGenerated: 0,
    errorReduction: 95,
    roi: 340,
    trend: 'up',
    trendValue: 15,
    deployedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Lead Qualification Bot',
    type: 'agent',
    owner: 'Emma Wilson',
    department: 'Sales',
    timeSaved: 15,
    costSaved: 6000,
    revenueGenerated: 25000,
    errorReduction: 70,
    roi: 520,
    trend: 'up',
    trendValue: 8,
    deployedDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'Contract Analysis AI',
    type: 'use-case',
    owner: 'Sarah Chen',
    department: 'Legal',
    timeSaved: 12,
    costSaved: 4800,
    revenueGenerated: 0,
    errorReduction: 85,
    roi: 280,
    trend: 'stable',
    trendValue: 2,
    deployedDate: '2024-02-01'
  }
];

// Sample comprehensive data
const licenseData = {
  plan: 'Enterprise 10',
  seatsTotal: 10,
  seatsUsed: 7,
  seatsAvailable: 3,
  companyName: 'Acme Corporation',
  planType: 'enterprise_10'
};

const platformMetrics = {
  totalUseCases: 45,
  totalWorkflows: 23,
  totalAgents: 12,
  totalTrainings: 67,
  monthlyGrowth: {
    useCases: 15,
    workflows: 8,
    agents: 4,
    trainings: 12
  }
};

const licenseUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@acme.com',
    department: 'Marketing',
    lastActivity: '2024-01-22',
    useCases: 8,
    workflows: 3,
    agents: 2,
    trainingsCompleted: 5,
    loginCount: 45,
    timeOnPlatform: 120,
    status: 'active'
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    email: 'mike.r@acme.com',
    department: 'Finance',
    lastActivity: '2024-01-23',
    useCases: 12,
    workflows: 7,
    agents: 1,
    trainingsCompleted: 8,
    loginCount: 67,
    timeOnPlatform: 200,
    status: 'active'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.w@acme.com',
    department: 'Sales',
    lastActivity: '2024-01-20',
    useCases: 15,
    workflows: 4,
    agents: 3,
    trainingsCompleted: 6,
    loginCount: 23,
    timeOnPlatform: 85,
    status: 'inactive'
  }
];

const departmentInsights = [
  {
    name: 'Marketing',
    users: 3,
    adoptionScore: 85,
    topUseCases: ['Content Generation', 'Campaign Automation', 'Lead Scoring'],
    recommendations: ['Implement Social Media AI', 'Advanced Analytics Workflow'],
    status: 'high'
  },
  {
    name: 'Finance',
    users: 2,
    adoptionScore: 92,
    topUseCases: ['Invoice Processing', 'Expense Automation', 'Financial Analysis'],
    recommendations: ['Compliance Automation', 'Risk Assessment AI'],
    status: 'high'
  },
  {
    name: 'Sales',
    users: 2,
    adoptionScore: 65,
    topUseCases: ['Lead Qualification', 'Proposal Generation'],
    recommendations: ['CRM Integration', 'Pipeline Automation', 'Customer Insights AI'],
    status: 'medium'
  }
];

const recentActivity = [
  {
    id: '1',
    user: 'Sarah Johnson',
    action: 'deployed new workflow',
    target: 'Content Approval Process',
    timestamp: '2 hours ago',
    type: 'workflow'
  },
  {
    id: '2',
    user: 'Mike Rodriguez',
    action: 'completed training',
    target: 'Advanced Prompt Engineering',
    timestamp: '4 hours ago',
    type: 'training'
  },
  {
    id: '3',
    user: 'Emma Wilson',
    action: 'added use case',
    target: 'Customer Support Chatbot',
    timestamp: '1 day ago',
    type: 'usecase'
  }
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredData = sampleROIData.filter(item => {
    const matchesDepartment = departmentFilter === 'all' || item.department === departmentFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesDepartment && matchesType;
  });

  const totalMetrics = filteredData.reduce((acc, item) => ({
    timeSaved: acc.timeSaved + item.timeSaved,
    costSaved: acc.costSaved + item.costSaved,
    revenueGenerated: acc.revenueGenerated + item.revenueGenerated,
    avgROI: acc.avgROI + item.roi
  }), { timeSaved: 0, costSaved: 0, revenueGenerated: 0, avgROI: 0 });

  totalMetrics.avgROI = Math.round(totalMetrics.avgROI / filteredData.length) || 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workflow': return <Workflow className="h-4 w-4" />;
      case 'agent': return <Bot className="h-4 w-4" />;
      case 'use-case': return <Target className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4 rounded-full bg-gray-400"></div>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            License management, analytics, and platform insights for {licenseData.companyName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-800">
            {licenseData.plan} License
          </Badge>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* License Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Seats</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenseData.seatsUsed}/{licenseData.seatsTotal}</div>
                <Progress value={(licenseData.seatsUsed / licenseData.seatsTotal) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {licenseData.seatsAvailable} seats available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenseUsers.filter(u => u.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((licenseUsers.filter(u => u.status === 'active').length / licenseUsers.length) * 100)}% engagement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Use Cases</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformMetrics.totalUseCases}</div>
                <p className="text-xs text-muted-foreground">
                  +{platformMetrics.monthlyGrowth.useCases} this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workflows</CardTitle>
                <Workflow className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformMetrics.totalWorkflows}</div>
                <p className="text-xs text-muted-foreground">
                  +{platformMetrics.monthlyGrowth.workflows} this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{activity.user}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.action} "{activity.target}"
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* License Management Tab */}
        <TabsContent value="licenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>License Management</CardTitle>
              <CardDescription>Manage seats and user access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plan Type</label>
                  <div className="text-lg font-bold">{licenseData.plan}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <div className="text-lg font-bold">{licenseData.companyName}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Seat Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {licenseData.seatsUsed} of {licenseData.seatsTotal} seats used
                  </span>
                </div>
                <Progress value={(licenseData.seatsUsed / licenseData.seatsTotal) * 100} className="h-3" />
              </div>

              <div className="flex gap-2">
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Plan
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Usage Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>License Users</CardTitle>
              <CardDescription>Manage individual user access and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenseUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Last: {user.lastActivity}</div>
                          <div className="text-muted-foreground">{user.loginCount} logins</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{user.useCases} use cases</div>
                          <div>{user.workflows} workflows</div>
                          <div>{user.trainingsCompleted} trainings</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <UserX className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-6">
            {departmentInsights.map((dept) => (
              <Card key={dept.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {dept.name}
                      </CardTitle>
                      <CardDescription>{dept.users} users</CardDescription>
                    </div>
                    <Badge className={getStatusColor(dept.status)}>
                      {dept.adoptionScore}% adoption
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Adoption Score</label>
                    <Progress value={dept.adoptionScore} className="mt-2" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Top Use Cases</label>
                    <div className="flex flex-wrap gap-1">
                      {dept.topUseCases.map((useCase) => (
                        <Badge key={useCase} variant="outline">{useCase}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Recommendations</label>
                    <div className="space-y-2">
                      {dept.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">

          {/* ROI & Impact Analytics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMetrics.timeSaved}h/week</div>
                <p className="text-xs text-muted-foreground">
                  Across all deployments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Saved</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalMetrics.costSaved.toLocaleString()}/mo</div>
                <p className="text-xs text-muted-foreground">
                  Monthly savings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalMetrics.revenueGenerated.toLocaleString()}/mo</div>
                <p className="text-xs text-muted-foreground">
                  Additional revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMetrics.avgROI}%</div>
                <p className="text-xs text-muted-foreground">
                  Return on investment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Customer Service">Customer Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workflow">Workflows</SelectItem>
                <SelectItem value="agent">AI Agents</SelectItem>
                <SelectItem value="use-case">Use Cases</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Impact Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Impact by Initiative</h3>
            <div className="grid gap-4">
              {filteredData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription>
                            {item.owner} • {item.department} • Deployed {new Date(item.deployedDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(item.trend)}
                        <Badge className="bg-green-100 text-green-800">
                          {item.roi}% ROI
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold">{item.timeSaved}h</div>
                        <div className="text-xs text-muted-foreground">Time saved/week</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${item.costSaved.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Cost saved/month</div>
                      </div>
                      {item.revenueGenerated > 0 && (
                        <div>
                          <div className="text-2xl font-bold">${item.revenueGenerated.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Revenue/month</div>
                        </div>
                      )}
                      <div>
                        <div className="text-2xl font-bold">{item.errorReduction}%</div>
                        <div className="text-xs text-muted-foreground">Error reduction</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share to Slack
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Audit Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Compliance Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ROI Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            ROI Projection Tool
          </CardTitle>
          <CardDescription>
            Estimate the potential impact of new AI initiatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Interactive ROI calculator would be implemented here</p>
            <p className="text-sm">Input project parameters to estimate time/cost savings and ROI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}