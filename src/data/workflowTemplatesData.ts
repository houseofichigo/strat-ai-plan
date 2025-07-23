export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  category: string[];
  department: string[];
  industry: string[];
  companySize: 'SME' | 'Enterprise' | 'Both';
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  timeSaved: string;
  roi: string;
  setupTime: string;
  apps: string[];
  appIcons: Record<string, string>;
  painPoint: string;
  steps: string[];
  prerequisites: string[];
  complianceInfo?: string;
  rating: number;
  deployments: number;
  featured?: boolean;
  trending?: boolean;
  quickWin?: boolean;
  recommended?: boolean;
}

export const workflowTemplatesData: WorkflowTemplate[] = [
  {
    id: '1',
    title: 'Automated Lead Nurture Sequence',
    description: 'Automatically nurture leads with personalized email sequences based on behavior and engagement',
    category: ['Sales', 'Marketing'],
    department: ['Sales', 'Marketing'],
    industry: ['SaaS', 'Technology', 'Services'],
    companySize: 'Both',
    complexity: 'Intermediate',
    timeSaved: '15h/week',
    roi: 'High',
    setupTime: '2-3 hours',
    apps: ['CRM', 'Email Platform', 'Analytics'],
    appIcons: {
      'CRM': '👥',
      'Email Platform': '📧',
      'Analytics': '📊'
    },
    painPoint: 'Sales teams struggle to follow up consistently with leads, missing opportunities',
    steps: [
      'Lead scoring based on behavior',
      'Trigger personalized email sequences',
      'Track engagement and responses',
      'Auto-assign to sales rep when ready'
    ],
    prerequisites: ['CRM integration', 'Email platform setup', 'Lead scoring rules'],
    rating: 4.8,
    deployments: 234,
    featured: true,
    quickWin: true
  },
  {
    id: '2',
    title: 'Employee Onboarding Automation',
    description: 'Streamline new hire onboarding with automated task assignments and IT provisioning',
    category: ['HR', 'IT'],
    department: ['HR', 'IT'],
    industry: ['Manufacturing', 'Healthcare', 'Finance'],
    companySize: 'Both',
    complexity: 'Intermediate',
    timeSaved: '8h/hire',
    roi: 'Very High',
    setupTime: '4-5 hours',
    apps: ['HRIS', 'IT Systems', 'Task Manager'],
    appIcons: {
      'HRIS': '👤',
      'IT Systems': '💻',
      'Task Manager': '✅'
    },
    painPoint: 'Manual onboarding creates delays and inconsistent experiences for new hires',
    steps: [
      'Trigger onboarding on hire date',
      'Create IT accounts and access',
      'Assign training modules',
      'Schedule check-ins with manager'
    ],
    prerequisites: ['HRIS integration', 'IT system access', 'Training platform'],
    complianceInfo: 'Ensures compliance with data protection and security policies',
    rating: 4.9,
    deployments: 189,
    trending: true,
    recommended: true
  },
  {
    id: '3',
    title: 'Invoice Processing & Approval',
    description: 'Automate invoice validation, routing, and approval workflows with exception handling',
    category: ['Finance', 'Accounting'],
    department: ['Finance', 'Accounting'],
    industry: ['Retail', 'Manufacturing', 'Services'],
    companySize: 'Both',
    complexity: 'Advanced',
    timeSaved: '20h/week',
    roi: 'Very High',
    setupTime: '6-8 hours',
    apps: ['ERP', 'OCR', 'Approval System'],
    appIcons: {
      'ERP': '🏢',
      'OCR': '📄',
      'Approval System': '✅'
    },
    painPoint: 'Manual invoice processing causes delays in payments and cash flow issues',
    steps: [
      'Extract data from invoices using OCR',
      'Validate against purchase orders',
      'Route for appropriate approvals',
      'Process payments automatically'
    ],
    prerequisites: ['ERP integration', 'OCR setup', 'Approval workflows'],
    complianceInfo: 'SOX compliant with full audit trail',
    rating: 4.7,
    deployments: 156,
    featured: true
  },
  {
    id: '4',
    title: 'Customer Support Ticket Routing',
    description: 'Intelligently route support tickets based on urgency, type, and agent expertise',
    category: ['Customer Service', 'Operations'],
    department: ['Customer Service', 'Operations'],
    industry: ['SaaS', 'E-commerce', 'Technology'],
    companySize: 'Both',
    complexity: 'Beginner',
    timeSaved: '5h/day',
    roi: 'High',
    setupTime: '1-2 hours',
    apps: ['Help Desk', 'CRM', 'Communication'],
    appIcons: {
      'Help Desk': '🎧',
      'CRM': '👥',
      'Communication': '💬'
    },
    painPoint: 'Tickets get misrouted or delayed, leading to poor customer experience',
    steps: [
      'Analyze ticket content and priority',
      'Match to agent skills and availability',
      'Route and notify assigned agent',
      'Escalate if SLA at risk'
    ],
    prerequisites: ['Help desk platform', 'Agent skill profiles', 'SLA definitions'],
    rating: 4.6,
    deployments: 298,
    quickWin: true,
    trending: true
  },
  {
    id: '5',
    title: 'Marketing Campaign Performance Tracking',
    description: 'Automatically track and report on marketing campaign performance across channels',
    category: ['Marketing', 'Analytics'],
    department: ['Marketing'],
    industry: ['E-commerce', 'SaaS', 'Retail'],
    companySize: 'Both',
    complexity: 'Intermediate',
    timeSaved: '10h/week',
    roi: 'High',
    setupTime: '3-4 hours',
    apps: ['Analytics', 'Ad Platforms', 'Reporting'],
    appIcons: {
      'Analytics': '📊',
      'Ad Platforms': '📱',
      'Reporting': '📈'
    },
    painPoint: 'Manual campaign reporting is time-consuming and error-prone',
    steps: [
      'Collect data from all channels',
      'Calculate performance metrics',
      'Generate automated reports',
      'Send alerts for underperforming campaigns'
    ],
    prerequisites: ['Analytics platform', 'Ad platform APIs', 'Reporting tools'],
    rating: 4.5,
    deployments: 167,
    recommended: true
  }
];

export const workflowCategories = [
  { id: 'quick-wins', name: 'Quick Wins for You', filter: (wf: WorkflowTemplate) => wf.quickWin },
  { id: 'recommended', name: 'Recommended for You', filter: (wf: WorkflowTemplate) => wf.recommended },
  { id: 'popular', name: 'Popular in Your Industry', filter: (wf: WorkflowTemplate) => wf.trending },
  { id: 'featured', name: 'Featured Workflows', filter: (wf: WorkflowTemplate) => wf.featured },
  { id: 'sales', name: 'Sales Automation', filter: (wf: WorkflowTemplate) => wf.department.includes('Sales') },
  { id: 'hr', name: 'HR Workflows', filter: (wf: WorkflowTemplate) => wf.department.includes('HR') },
  { id: 'finance', name: 'Finance & Accounting', filter: (wf: WorkflowTemplate) => wf.department.includes('Finance') }
];

// Sample user profiles for personalization
export interface UserProfile {
  id: string;
  department: string;
  industry: string;
  companySize: 'SME' | 'Enterprise';
  role: string;
  maturityLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  painPoints: string[];
}

export const sampleUserProfiles: UserProfile[] = [
  {
    id: '1',
    department: 'Sales',
    industry: 'SaaS',
    companySize: 'SME',
    role: 'Sales Manager',
    maturityLevel: 'Intermediate',
    painPoints: ['Lead follow-up', 'Manual data entry', 'Pipeline visibility']
  },
  {
    id: '2',
    department: 'HR',
    industry: 'Manufacturing',
    companySize: 'Enterprise',
    role: 'HR Director',
    maturityLevel: 'Beginner',
    painPoints: ['Onboarding consistency', 'Compliance tracking', 'Employee data management']
  },
  {
    id: '3',
    department: 'Finance',
    industry: 'Retail',
    companySize: 'SME',
    role: 'Finance Manager',
    maturityLevel: 'Advanced',
    painPoints: ['Invoice processing', 'Approval delays', 'Cash flow visibility']
  }
];

export function getPersonalizedWorkflows(userProfile: UserProfile): WorkflowTemplate[] {
  return workflowTemplatesData.filter(workflow => 
    workflow.department.includes(userProfile.department) ||
    workflow.industry.includes(userProfile.industry) ||
    workflow.companySize === userProfile.companySize ||
    workflow.companySize === 'Both'
  );
}

export function getPersonalizedRecommendation(userProfile: UserProfile, workflow: WorkflowTemplate): string {
  const reasons = [];
  
  if (workflow.department.includes(userProfile.department)) {
    reasons.push(`Perfect for ${userProfile.department} teams`);
  }
  
  if (workflow.industry.includes(userProfile.industry)) {
    reasons.push(`Proven success in ${userProfile.industry}`);
  }
  
  if (workflow.complexity === userProfile.maturityLevel) {
    reasons.push(`Matches your ${userProfile.maturityLevel} automation maturity`);
  }
  
  return reasons.join(' • ');
}