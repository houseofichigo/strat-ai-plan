import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Search, 
  Filter,
  ExternalLink,
  Download,
  User,
  Calendar,
  AlertCircle,
  Settings
} from 'lucide-react';
import { 
  GDPRComplianceItem, 
  GDPROverview, 
  gdprComplianceManager, 
  getGDPROverview 
} from '@/data/gdprComplianceData';

export function GDPRRegistry() {
  const [items, setItems] = useState<GDPRComplianceItem[]>([]);
  const [overview, setOverview] = useState<GDPROverview | null>(null);
  const [selectedItem, setSelectedItem] = useState<GDPRComplianceItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  useEffect(() => {
    const loadData = () => {
      const complianceItems = gdprComplianceManager.getItems();
      setItems(complianceItems);
      setOverview(getGDPROverview(complianceItems));
    };

    loadData();
    const unsubscribe = gdprComplianceManager.subscribe(loadData);
    return unsubscribe;
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.primaryRisk.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleActionToggle = (itemId: string, actionId: string, completed: boolean) => {
    gdprComplianceManager.updateAction(itemId, actionId, completed);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-success';
      case 'critical': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  if (!overview) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">GDPR Compliance Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage GDPR compliance across all your tools and workflows
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
            <Shield className={`h-4 w-4 ${getOverallStatusColor(overview.overallStatus)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getOverallStatusColor(overview.overallStatus)}`}>
              {overview.overallStatus === 'compliant' ? 'Compliant' : 
               overview.overallStatus === 'critical' ? 'Critical' : 'Attention Needed'}
            </div>
            <div className="mt-2">
              <Progress value={overview.completionPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {overview.completionPercentage}% Complete
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Tools & workflows tracked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Needed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{overview.actionNeededCount}</div>
            <p className="text-xs text-muted-foreground">
              Items requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overview.criticalRisks.length}</div>
            <p className="text-xs text-muted-foreground">
              Urgent compliance issues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Risks Alert */}
      {overview.criticalRisks.length > 0 && (
        <Alert className="border-destructive">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Critical compliance risks detected:</strong>
            <ul className="list-disc list-inside mt-1">
              {overview.criticalRisks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search compliance items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="action-needed">Action Needed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Compliance Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  item.riskLevel === 'critical' ? 'bg-destructive/10' :
                  item.riskLevel === 'high' ? 'bg-orange-100' :
                  item.riskLevel === 'medium' ? 'bg-warning/10' : 'bg-secondary'
                }`}>
                  {item.status === 'complete' ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : item.riskLevel === 'critical' ? (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className={`text-sm font-medium ${getRiskColor(item.riskLevel)}`}>
                  {item.primaryRisk}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{item.completionProgress}%</span>
                </div>
                <Progress value={item.completionProgress} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {item.assignedTo && (
                    <>
                      <User className="h-3 w-3" />
                      <span>{item.assignedTo}</span>
                    </>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {item.title}
                        <Badge className={`${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription>
                        {item.type} • Risk Level: <span className={getRiskColor(item.riskLevel)}>{item.riskLevel}</span>
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedItem && selectedItem.id === item.id && (
                      <Tabs defaultValue="actions" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="actions">Required Actions</TabsTrigger>
                          <TabsTrigger value="details">Processing Details</TabsTrigger>
                          <TabsTrigger value="docs">Documentation</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="actions" className="space-y-4">
                          <div className="space-y-3">
                            {selectedItem.requiredActions.map((action) => (
                              <div key={action.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                                <Checkbox
                                  checked={action.completed}
                                  onCheckedChange={(checked) => 
                                    handleActionToggle(selectedItem.id, action.id, checked as boolean)
                                  }
                                  className="mt-1"
                                />
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{action.title}</p>
                                    <Badge variant={action.priority === 'critical' ? 'destructive' : 'outline'} className="text-xs">
                                      {action.priority}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{action.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                              <h4 className="font-medium">Data Types Processed</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {selectedItem.dataProcessing.dataTypes.map((type, index) => (
                                  <li key={index}>• {type}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="font-medium">Legal Basis</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {selectedItem.dataProcessing.legalBasis.map((basis, index) => (
                                  <li key={index}>• {basis}</li>
                                ))}
                              </ul>
                            </div>
                            
                            {selectedItem.dataProcessing.dataTransfers.length > 0 && (
                              <div className="space-y-3 md:col-span-2">
                                <h4 className="font-medium">Data Transfers</h4>
                                {selectedItem.dataProcessing.dataTransfers.map((transfer, index) => (
                                  <div key={index} className="p-3 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{transfer.region}</span>
                                      <Badge className={
                                        transfer.status === 'compliant' ? 'bg-success text-success-foreground' :
                                        transfer.status === 'requires-action' ? 'bg-warning text-warning-foreground' :
                                        'bg-secondary text-secondary-foreground'
                                      }>
                                        {transfer.status.replace('-', ' ')}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{transfer.mechanism}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="docs" className="space-y-4">
                          <div className="space-y-3">
                            {selectedItem.documentation.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <p className="font-medium">{doc.title}</p>
                                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                                  <Badge variant="outline" className="mt-1 text-xs">
                                    {doc.type.replace('-', ' ')}
                                  </Badge>
                                </div>
                                {doc.url && (
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Open
                                  </Button>
                                )}
                              </div>
                            ))}
                            
                            {selectedItem.documentation.length === 0 && (
                              <p className="text-muted-foreground text-center py-8">
                                No documentation available
                              </p>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No compliance items found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' || riskFilter !== 'all'
              ? 'Try adjusting your filters or search terms.'
              : 'Add tools and workflows to your roadmap to start tracking compliance.'}
          </p>
        </div>
      )}
    </div>
  );
}