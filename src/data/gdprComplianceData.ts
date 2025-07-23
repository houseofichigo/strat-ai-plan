export interface GDPRComplianceItem {
  id: string;
  title: string;
  type: 'Tool' | 'AI Use Case' | 'Workflow' | 'Agent';
  source: 'roadmap' | 'manual' | 'assessment';
  sourceId?: string;
  status: 'action-needed' | 'pending' | 'complete' | 'critical';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  primaryRisk: string;
  completionProgress: number; // 0-100
  
  // Required actions
  requiredActions: {
    id: string;
    title: string;
    description: string;
    required: boolean;
    completed: boolean;
    priority: 'low' | 'medium' | 'high' | 'critical';
    type: 'dpa' | 'privacy-policy' | 'ropa' | 'data-transfer' | 'security' | 'consent' | 'other';
  }[];
  
  // Documentation and resources
  documentation: {
    title: string;
    type: 'template' | 'vendor-doc' | 'policy' | 'guide';
    url?: string;
    description: string;
  }[];
  
  // Data processing details
  dataProcessing: {
    processesPersonalData: boolean;
    dataTypes: string[];
    legalBasis: string[];
    dataTransfers: {
      region: string;
      mechanism: string;
      status: 'compliant' | 'requires-action' | 'not-assessed';
    }[];
    retentionPeriod?: string;
    specialCategoryData: boolean;
  };
  
  // Assignment and tracking
  assignedTo?: string;
  reviewedBy?: string;
  lastReviewed?: Date;
  nextReview?: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GDPROverview {
  overallStatus: 'compliant' | 'needs-attention' | 'critical';
  completionPercentage: number;
  totalItems: number;
  actionNeededCount: number;
  criticalRisks: string[];
  recentActivity: {
    id: string;
    action: string;
    timestamp: Date;
    itemTitle: string;
  }[];
}

// Sample GDPR compliance data
export const sampleGDPRData: GDPRComplianceItem[] = [
  {
    id: 'gdpr-1',
    title: 'Google Analytics',
    type: 'Tool',
    source: 'assessment',
    status: 'action-needed',
    riskLevel: 'high',
    primaryRisk: 'US data transfer without adequate safeguards',
    completionProgress: 30,
    requiredActions: [
      {
        id: 'ga-dpa',
        title: 'Sign Data Processing Addendum',
        description: 'Execute Google Analytics DPA to ensure compliant data processing',
        required: true,
        completed: false,
        priority: 'high',
        type: 'dpa'
      },
      {
        id: 'ga-privacy',
        title: 'Update Privacy Policy',
        description: 'Include Google Analytics usage and data sharing in privacy policy',
        required: true,
        completed: true,
        priority: 'high',
        type: 'privacy-policy'
      },
      {
        id: 'ga-anonymization',
        title: 'Configure Data Anonymization',
        description: 'Enable IP anonymization and disable data sharing features',
        required: true,
        completed: false,
        priority: 'medium',
        type: 'security'
      },
      {
        id: 'ga-consent',
        title: 'Implement Consent Management',
        description: 'Ensure user consent before tracking with Google Analytics',
        required: true,
        completed: false,
        priority: 'critical',
        type: 'consent'
      }
    ],
    documentation: [
      {
        title: 'Google Analytics DPA Template',
        type: 'template',
        url: '#',
        description: 'Standard Data Processing Addendum for Google Analytics'
      },
      {
        title: 'Google Privacy & Terms',
        type: 'vendor-doc',
        url: 'https://policies.google.com/privacy',
        description: 'Google\'s privacy policy and compliance documentation'
      }
    ],
    dataProcessing: {
      processesPersonalData: true,
      dataTypes: ['IP addresses', 'device identifiers', 'usage patterns', 'location data'],
      legalBasis: ['legitimate interest', 'consent'],
      dataTransfers: [
        {
          region: 'United States',
          mechanism: 'Standard Contractual Clauses',
          status: 'requires-action'
        }
      ],
      retentionPeriod: '26 months',
      specialCategoryData: false
    },
    assignedTo: 'Compliance Team',
    notes: 'High priority due to recent regulatory changes',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'gdpr-2',
    title: 'Automated Invoice Processing',
    type: 'Workflow',
    source: 'roadmap',
    sourceId: 'roadmap-4',
    status: 'pending',
    riskLevel: 'medium',
    primaryRisk: 'Processing of financial data requires ROPA entry',
    completionProgress: 70,
    requiredActions: [
      {
        id: 'inv-ropa',
        title: 'Register in ROPA',
        description: 'Add invoice processing to Record of Processing Activities',
        required: true,
        completed: false,
        priority: 'high',
        type: 'ropa'
      },
      {
        id: 'inv-security',
        title: 'Document Security Measures',
        description: 'Document encryption and access controls for invoice data',
        required: true,
        completed: true,
        priority: 'medium',
        type: 'security'
      },
      {
        id: 'inv-retention',
        title: 'Set Data Retention Policy',
        description: 'Define how long invoice data will be retained',
        required: true,
        completed: true,
        priority: 'medium',
        type: 'other'
      }
    ],
    documentation: [
      {
        title: 'ROPA Template',
        type: 'template',
        description: 'Template for Record of Processing Activities entry'
      },
      {
        title: 'Invoice Processing Security Guide',
        type: 'guide',
        description: 'Best practices for securing financial document processing'
      }
    ],
    dataProcessing: {
      processesPersonalData: true,
      dataTypes: ['business contact information', 'financial data', 'vendor details'],
      legalBasis: ['contract', 'legitimate interest'],
      dataTransfers: [],
      retentionPeriod: '7 years (legal requirement)',
      specialCategoryData: false
    },
    assignedTo: 'Finance Team',
    reviewedBy: 'Legal Department',
    lastReviewed: new Date('2024-01-18'),
    notes: 'Vendor has confirmed GDPR compliance',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'gdpr-3',
    title: 'Customer Support Chatbot',
    type: 'Agent',
    source: 'roadmap',
    sourceId: 'roadmap-5',
    status: 'complete',
    riskLevel: 'low',
    primaryRisk: 'Fully compliant - regular monitoring required',
    completionProgress: 100,
    requiredActions: [
      {
        id: 'chat-dpa',
        title: 'DPA with Chatbot Provider',
        description: 'Signed and executed',
        required: true,
        completed: true,
        priority: 'high',
        type: 'dpa'
      },
      {
        id: 'chat-consent',
        title: 'Chat Consent Implementation',
        description: 'Users consent before chat interaction',
        required: true,
        completed: true,
        priority: 'high',
        type: 'consent'
      },
      {
        id: 'chat-ropa',
        title: 'ROPA Entry Complete',
        description: 'Chatbot processing registered in ROPA',
        required: true,
        completed: true,
        priority: 'medium',
        type: 'ropa'
      }
    ],
    documentation: [
      {
        title: 'Chatbot Privacy Assessment',
        type: 'policy',
        description: 'Complete privacy impact assessment for chatbot implementation'
      }
    ],
    dataProcessing: {
      processesPersonalData: true,
      dataTypes: ['chat messages', 'contact information', 'support tickets'],
      legalBasis: ['consent', 'legitimate interest'],
      dataTransfers: [
        {
          region: 'European Economic Area',
          mechanism: 'Within EEA',
          status: 'compliant'
        }
      ],
      retentionPeriod: '2 years',
      specialCategoryData: false
    },
    assignedTo: 'Customer Success',
    reviewedBy: 'Data Protection Officer',
    lastReviewed: new Date('2024-01-25'),
    nextReview: new Date('2024-07-25'),
    notes: 'Exemplary compliance implementation',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'gdpr-4',
    title: 'Employee Onboarding Agent',
    type: 'Agent',
    source: 'roadmap',
    sourceId: 'roadmap-3',
    status: 'critical',
    riskLevel: 'critical',
    primaryRisk: 'Processing employee personal data without proper consent framework',
    completionProgress: 10,
    requiredActions: [
      {
        id: 'emp-consent',
        title: 'Employee Consent Framework',
        description: 'Implement proper consent mechanism for employee data processing',
        required: true,
        completed: false,
        priority: 'critical',
        type: 'consent'
      },
      {
        id: 'emp-ropa',
        title: 'HR ROPA Entry',
        description: 'Register employee data processing in ROPA',
        required: true,
        completed: false,
        priority: 'high',
        type: 'ropa'
      },
      {
        id: 'emp-security',
        title: 'Enhanced Security Measures',
        description: 'Implement additional security for employee personal data',
        required: true,
        completed: false,
        priority: 'high',
        type: 'security'
      },
      {
        id: 'emp-rights',
        title: 'Employee Rights Procedure',
        description: 'Establish procedure for employee data subject rights',
        required: true,
        completed: false,
        priority: 'medium',
        type: 'other'
      }
    ],
    documentation: [
      {
        title: 'Employee Data Processing Policy Template',
        type: 'template',
        description: 'Template for employee data processing policies'
      },
      {
        title: 'HR GDPR Compliance Guide',
        type: 'guide',
        description: 'Comprehensive guide for HR data processing compliance'
      }
    ],
    dataProcessing: {
      processesPersonalData: true,
      dataTypes: ['employee personal data', 'identification documents', 'contact information', 'employment history'],
      legalBasis: ['contract', 'legal obligation'],
      dataTransfers: [],
      retentionPeriod: 'Duration of employment + 7 years',
      specialCategoryData: false
    },
    assignedTo: 'HR Team',
    notes: 'Urgent - cannot deploy without compliance framework',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-20')
  }
];

export const getGDPROverview = (items: GDPRComplianceItem[]): GDPROverview => {
  const totalItems = items.length;
  const actionNeededCount = items.filter(item => 
    item.status === 'action-needed' || item.status === 'critical'
  ).length;
  
  const avgCompletion = items.reduce((sum, item) => sum + item.completionProgress, 0) / totalItems;
  
  const criticalRisks = items
    .filter(item => item.riskLevel === 'critical')
    .map(item => item.primaryRisk);
  
  const overallStatus: 'compliant' | 'needs-attention' | 'critical' = 
    criticalRisks.length > 0 ? 'critical' :
    actionNeededCount > totalItems * 0.3 ? 'needs-attention' : 'compliant';
  
  const recentActivity = items
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5)
    .map(item => ({
      id: item.id,
      action: `Updated ${item.title}`,
      timestamp: item.updatedAt,
      itemTitle: item.title
    }));
  
  return {
    overallStatus,
    completionPercentage: Math.round(avgCompletion),
    totalItems,
    actionNeededCount,
    criticalRisks,
    recentActivity
  };
};

// GDPR Compliance Manager
export class GDPRComplianceManager {
  private static instance: GDPRComplianceManager;
  private items: GDPRComplianceItem[] = [];
  private listeners: ((items: GDPRComplianceItem[]) => void)[] = [];

  static getInstance(): GDPRComplianceManager {
    if (!GDPRComplianceManager.instance) {
      GDPRComplianceManager.instance = new GDPRComplianceManager();
    }
    return GDPRComplianceManager.instance;
  }

  constructor() {
    try {
      const stored = localStorage.getItem('gdpr_compliance_items');
      if (stored) {
        this.items = JSON.parse(stored).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          lastReviewed: item.lastReviewed ? new Date(item.lastReviewed) : undefined,
          nextReview: item.nextReview ? new Date(item.nextReview) : undefined
        }));
      } else {
        this.items = [...sampleGDPRData];
        this.save();
      }
    } catch (error) {
      console.warn('Failed to load GDPR compliance data:', error);
      this.items = [...sampleGDPRData];
    }
  }

  getItems(): GDPRComplianceItem[] {
    return [...this.items];
  }

  updateAction(itemId: string, actionId: string, completed: boolean): void {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;

    const action = item.requiredActions.find(a => a.id === actionId);
    if (!action) return;

    action.completed = completed;
    item.updatedAt = new Date();
    
    // Recalculate completion progress
    const completedActions = item.requiredActions.filter(a => a.completed).length;
    item.completionProgress = Math.round((completedActions / item.requiredActions.length) * 100);
    
    // Update status based on completion
    if (item.completionProgress === 100) {
      item.status = 'complete';
    } else if (item.requiredActions.some(a => !a.completed && a.priority === 'critical')) {
      item.status = 'critical';
    } else if (item.completionProgress > 0) {
      item.status = 'pending';
    } else {
      item.status = 'action-needed';
    }
    
    this.save();
    this.notifyListeners();
  }

  addFromRoadmapItem(roadmapItem: any): GDPRComplianceItem | null {
    // Check if already exists
    const exists = this.items.find(item => 
      item.source === 'roadmap' && item.sourceId === roadmapItem.id
    );
    if (exists) return exists;

    // Create new GDPR compliance item based on roadmap item
    const newItem: GDPRComplianceItem = {
      id: `gdpr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: roadmapItem.title,
      type: roadmapItem.category,
      source: 'roadmap',
      sourceId: roadmapItem.id,
      status: 'action-needed',
      riskLevel: 'medium',
      primaryRisk: 'Compliance assessment required',
      completionProgress: 0,
      requiredActions: this.generateDefaultActions(roadmapItem.category),
      documentation: [],
      dataProcessing: {
        processesPersonalData: true,
        dataTypes: [],
        legalBasis: [],
        dataTransfers: [],
        specialCategoryData: false
      },
      notes: `Auto-generated from roadmap item: ${roadmapItem.title}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.items.push(newItem);
    this.save();
    this.notifyListeners();
    return newItem;
  }

  private generateDefaultActions(category: string): GDPRComplianceItem['requiredActions'] {
    const baseActions: GDPRComplianceItem['requiredActions'] = [
      {
        id: 'ropa-entry',
        title: 'Register in ROPA',
        description: 'Add to Record of Processing Activities',
        required: true,
        completed: false,
        priority: 'high',
        type: 'ropa'
      },
      {
        id: 'privacy-assessment',
        title: 'Privacy Impact Assessment',
        description: 'Conduct privacy impact assessment',
        required: true,
        completed: false,
        priority: 'medium',
        type: 'other'
      }
    ];

    if (category === 'Agent' || category === 'AI Use Case') {
      baseActions.push({
        id: 'ai-governance',
        title: 'AI Governance Review',
        description: 'Review AI system for compliance with AI governance requirements',
        required: true,
        completed: false,
        priority: 'high',
        type: 'other'
      });
    }

    return baseActions;
  }

  subscribe(listener: (items: GDPRComplianceItem[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private save(): void {
    try {
      localStorage.setItem('gdpr_compliance_items', JSON.stringify(this.items));
    } catch (error) {
      console.warn('Failed to save GDPR compliance data:', error);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.items]));
  }
}

export const gdprComplianceManager = GDPRComplianceManager.getInstance();