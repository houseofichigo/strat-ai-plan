import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  Lightbulb
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

export function AdminPanel() {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h1 className="text-3xl font-bold">Impact & ROI Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Track the measurable value created by your AI initiatives
          </p>
        </div>
        <div className="flex items-center gap-2">
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
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