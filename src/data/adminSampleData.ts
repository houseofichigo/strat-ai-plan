// Sample data for admin dashboard demo purposes
// In production, this would come from your database

export interface LicenseData {
  id: string;
  plan: 'starter_3' | 'business_5' | 'enterprise_10';
  seats_total: number;
  seats_used: number;
  company_name: string;
  is_active: boolean;
}

export interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  department: string | null;
  last_activity: string;
  created_at: string;
  usage_stats: {
    use_cases_explored: number;
    workflows_launched: number;
    agents_deployed: number;
    trainings_completed: number;
    login_count: number;
    time_on_platform: number; // minutes
  };
}

export interface ActivityLogEntry {
  id: string;
  action_type: string;
  action_details: any;
  department: string | null;
  created_at: string;
  user_email: string;
  user_name: string | null;
}

export interface DepartmentStats {
  department: string;
  users: number;
  use_cases: number;
  workflows: number;
  agents: number;
  adoption_score: number;
  recommendations: string[];
}

export const sampleLicense: LicenseData = {
  id: 'lic_123',
  plan: 'business_5',
  seats_total: 5,
  seats_used: 3,
  company_name: 'Acme Corporation',
  is_active: true
};

export const sampleUsers: UserData[] = [
  {
    id: '1',
    email: 'sarah.chen@acme.com',
    full_name: 'Sarah Chen',
    department: 'Legal',
    last_activity: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    usage_stats: {
      use_cases_explored: 15,
      workflows_launched: 8,
      agents_deployed: 3,
      trainings_completed: 5,
      login_count: 45,
      time_on_platform: 2340 // 39 hours
    }
  },
  {
    id: '2',
    email: 'mike.rodriguez@acme.com',
    full_name: 'Mike Rodriguez',
    department: 'Finance',
    last_activity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
    usage_stats: {
      use_cases_explored: 12,
      workflows_launched: 15,
      agents_deployed: 2,
      trainings_completed: 8,
      login_count: 38,
      time_on_platform: 1890 // 31.5 hours
    }
  },
  {
    id: '3',
    email: 'emma.wilson@acme.com',
    full_name: 'Emma Wilson',
    department: 'Sales',
    last_activity: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
    usage_stats: {
      use_cases_explored: 18,
      workflows_launched: 12,
      agents_deployed: 5,
      trainings_completed: 3,
      login_count: 52,
      time_on_platform: 2760 // 46 hours
    }
  },
  {
    id: '4',
    email: 'alex.kim@acme.com',
    full_name: 'Alex Kim',
    department: 'IT',
    last_activity: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days ago
    usage_stats: {
      use_cases_explored: 25,
      workflows_launched: 20,
      agents_deployed: 8,
      trainings_completed: 12,
      login_count: 67,
      time_on_platform: 4200 // 70 hours
    }
  },
  {
    id: '5',
    email: 'jennifer.lopez@acme.com',
    full_name: 'Jennifer Lopez',
    department: 'HR',
    last_activity: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    usage_stats: {
      use_cases_explored: 8,
      workflows_launched: 6,
      agents_deployed: 2,
      trainings_completed: 7,
      login_count: 28,
      time_on_platform: 1320 // 22 hours
    }
  }
];

export const sampleActivityLog: ActivityLogEntry[] = [
  {
    id: '1',
    action_type: 'use_case_added',
    action_details: { title: 'Contract Drafting Assistant', category: 'Legal' },
    department: 'Legal',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user_email: 'sarah.chen@acme.com',
    user_name: 'Sarah Chen'
  },
  {
    id: '2',
    action_type: 'workflow_deployed',
    action_details: { title: 'Invoice Processing Automation', category: 'Finance' },
    department: 'Finance',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user_email: 'mike.rodriguez@acme.com',
    user_name: 'Mike Rodriguez'
  },
  {
    id: '3',
    action_type: 'agent_created',
    action_details: { title: 'Lead Qualification Bot', category: 'Sales' },
    department: 'Sales',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    user_email: 'emma.wilson@acme.com',
    user_name: 'Emma Wilson'
  },
  {
    id: '4',
    action_type: 'training_completed',
    action_details: { title: 'AI Fundamentals for Business', category: 'General' },
    department: 'HR',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    user_email: 'jennifer.lopez@acme.com',
    user_name: 'Jennifer Lopez'
  },
  {
    id: '5',
    action_type: 'use_case_added',
    action_details: { title: 'Network Security Monitor', category: 'IT' },
    department: 'IT',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    user_email: 'alex.kim@acme.com',
    user_name: 'Alex Kim'
  },
  {
    id: '6',
    action_type: 'workflow_deployed',
    action_details: { title: 'Customer Onboarding Sequence', category: 'Sales' },
    department: 'Sales',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    user_email: 'emma.wilson@acme.com',
    user_name: 'Emma Wilson'
  },
  {
    id: '7',
    action_type: 'agent_created',
    action_details: { title: 'Expense Report Assistant', category: 'Finance' },
    department: 'Finance',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    user_email: 'mike.rodriguez@acme.com',
    user_name: 'Mike Rodriguez'
  },
  {
    id: '8',
    action_type: 'training_started',
    action_details: { title: 'Advanced Prompt Engineering', category: 'Technical' },
    department: 'IT',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    user_email: 'alex.kim@acme.com',
    user_name: 'Alex Kim'
  }
];

export const sampleDepartmentStats: DepartmentStats[] = [
  {
    department: 'Sales',
    users: 1,
    use_cases: 18,
    workflows: 12,
    agents: 5,
    adoption_score: 88,
    recommendations: [
      'Deploy CRM Lead Scoring Agent',
      'Implement Sales Forecasting Workflow',
      'Add Customer Sentiment Analysis'
    ]
  },
  {
    department: 'Finance',
    users: 1,
    use_cases: 12,
    workflows: 15,
    agents: 2,
    adoption_score: 92,
    recommendations: [
      'Automate Budget Approval Process',
      'Deploy Invoice Matching AI',
      'Implement Expense Categorization'
    ]
  },
  {
    department: 'Legal',
    users: 1,
    use_cases: 15,
    workflows: 8,
    agents: 3,
    adoption_score: 75,
    recommendations: [
      'Deploy Contract Analysis AI',
      'Automate Compliance Monitoring',
      'Implement Document Classification'
    ]
  },
  {
    department: 'IT',
    users: 1,
    use_cases: 25,
    workflows: 20,
    agents: 8,
    adoption_score: 95,
    recommendations: [
      'Advanced Security Monitoring',
      'Automated Infrastructure Scaling',
      'AI-Powered Incident Response'
    ]
  },
  {
    department: 'HR',
    users: 1,
    use_cases: 8,
    workflows: 6,
    agents: 2,
    adoption_score: 65,
    recommendations: [
      'Deploy Resume Screening AI',
      'Automate Onboarding Workflow',
      'Implement Performance Analytics'
    ]
  }
];

// Generate usage trends data
export const generateUsageTrends = (days: number = 30) => {
  const trends = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    trends.push({
      date: date.toISOString().split('T')[0],
      use_cases_explored: Math.floor(Math.random() * 15) + 5,
      workflows_launched: Math.floor(Math.random() * 12) + 3,
      agents_deployed: Math.floor(Math.random() * 8) + 1,
      trainings_started: Math.floor(Math.random() * 20) + 5,
      trainings_completed: Math.floor(Math.random() * 12) + 2,
      time_on_platform: Math.floor(Math.random() * 180) + 60,
      login_count: Math.floor(Math.random() * 25) + 10
    });
  }
  
  return trends;
};

export const getTopRecommendations = () => [
  {
    title: 'Deploy AI-Powered Customer Support',
    description: 'Based on high support ticket volume, implement chatbot for 24/7 assistance',
    department: 'Customer Service',
    priority: 'high',
    estimated_impact: '40% reduction in response time'
  },
  {
    title: 'Automate Invoice Processing',
    description: 'Finance team spending 15h/week on manual invoice processing',
    department: 'Finance',
    priority: 'high',
    estimated_impact: '80% time savings'
  },
  {
    title: 'Implement Lead Scoring AI',
    description: 'Sales team needs better lead qualification to improve conversion rates',
    department: 'Sales',
    priority: 'medium',
    estimated_impact: '25% increase in conversion'
  },
  {
    title: 'HR Document Classification',
    description: 'Automate resume screening and candidate evaluation process',
    department: 'HR',
    priority: 'medium',
    estimated_impact: '60% faster hiring process'
  }
];