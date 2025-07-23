export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: 'Use Case' | 'Agent' | 'Workflow' | 'Training';
  type: string; // Original category like 'Sales', 'Marketing', etc.
  source: 'use-cases' | 'agents' | 'workflows' | 'training';
  sourceId: string; // ID from original source
  status: 'To Plan' | 'Ready' | 'In Progress' | 'Testing' | 'Completed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedEffort: string;
  timeline: string;
  owner?: string;
  assignees: string[];
  prerequisites: string[];
  implementationSteps: string[];
  successMetrics: string[];
  dependencies: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  progress: number; // 0-100
  dueDate?: Date;
  icon: string;
  colorTheme: string;
}

export interface RoadmapColumn {
  id: string;
  title: string;
  color: string;
  items: RoadmapItem[];
}

// Sample roadmap data
export const sampleRoadmapData: RoadmapItem[] = [
  {
    id: 'roadmap-1',
    title: 'Contract Drafting Assistant',
    description: 'AI-powered contract drafting and review system',
    category: 'Use Case',
    type: 'Legal',
    source: 'use-cases',
    sourceId: '1',
    status: 'Ready',
    priority: 'High',
    estimatedEffort: '6-8 weeks',
    timeline: '2 months',
    owner: 'Legal Team',
    assignees: ['Sarah Chen', 'Mike Johnson'],
    prerequisites: [
      'Legal template library setup',
      'Compliance framework review',
      'AI model integration approval'
    ],
    implementationSteps: [
      'Gather legal templates and documents',
      'Configure AI model for legal language',
      'Build review workflow interface',
      'Implement approval processes',
      'Conduct legal team training',
      'Pilot with sample contracts'
    ],
    successMetrics: [
      '75% reduction in contract review time',
      'Less than 1% error rate',
      '40% increase in client satisfaction'
    ],
    dependencies: ['IT security approval', 'Legal team training'],
    notes: 'High priority project with significant ROI potential',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    tags: ['AI', 'Legal', 'Automation'],
    progress: 25,
    dueDate: new Date('2024-03-15'),
    icon: '⚖️',
    colorTheme: 'blue'
  },
  {
    id: 'roadmap-2',
    title: 'Lead Nurture Automation',
    description: 'Automated email sequences based on lead behavior',
    category: 'Workflow',
    type: 'Sales',
    source: 'workflows',
    sourceId: '1',
    status: 'In Progress',
    priority: 'High',
    estimatedEffort: '3-4 weeks',
    timeline: '1 month',
    owner: 'Sales Team',
    assignees: ['Alex Kim', 'Lisa Wang'],
    prerequisites: [
      'CRM integration setup',
      'Email platform configuration',
      'Lead scoring rules defined'
    ],
    implementationSteps: [
      'Map lead journey stages',
      'Create email templates',
      'Set up automation triggers',
      'Configure lead scoring',
      'Test with sample leads',
      'Train sales team'
    ],
    successMetrics: [
      '15 hours saved per week',
      '30% increase in lead conversion',
      '50% faster follow-up time'
    ],
    dependencies: ['CRM data cleanup', 'Email compliance review'],
    notes: 'Currently in development phase, on track for deadline',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-22'),
    tags: ['Automation', 'Sales', 'Marketing'],
    progress: 60,
    dueDate: new Date('2024-02-28'),
    icon: '📧',
    colorTheme: 'green'
  },
  {
    id: 'roadmap-3',
    title: 'Employee Onboarding Agent',
    description: 'AI agent for automated new hire onboarding',
    category: 'Agent',
    type: 'HR',
    source: 'agents',
    sourceId: '2',
    status: 'To Plan',
    priority: 'Medium',
    estimatedEffort: '4-6 weeks',
    timeline: '1.5 months',
    owner: 'HR Team',
    assignees: ['Emma Johnson'],
    prerequisites: [
      'HRIS system integration',
      'Onboarding process documentation',
      'IT system access protocols'
    ],
    implementationSteps: [
      'Map current onboarding process',
      'Design AI agent workflow',
      'Integrate with HRIS and IT systems',
      'Create onboarding templates',
      'Build progress tracking',
      'Pilot with new hires'
    ],
    successMetrics: [
      '8 hours saved per new hire',
      '95% onboarding completion rate',
      '90% new hire satisfaction'
    ],
    dependencies: ['IT security review', 'HRIS upgrade'],
    notes: 'Waiting for HRIS system upgrade completion',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    tags: ['AI Agent', 'HR', 'Automation'],
    progress: 5,
    dueDate: new Date('2024-04-01'),
    icon: '👤',
    colorTheme: 'purple'
  },
  {
    id: 'roadmap-4',
    title: 'Invoice Processing Automation',
    description: 'Automated invoice validation and approval workflow',
    category: 'Workflow',
    type: 'Finance',
    source: 'workflows',
    sourceId: '3',
    status: 'Testing',
    priority: 'Critical',
    estimatedEffort: '8-10 weeks',
    timeline: '2.5 months',
    owner: 'Finance Team',
    assignees: ['Jennifer Brooks', 'Mark Rodriguez'],
    prerequisites: [
      'ERP system integration',
      'OCR setup complete',
      'Approval workflow mapping'
    ],
    implementationSteps: [
      'Configure OCR for invoice scanning',
      'Map approval workflows',
      'Integrate with ERP system',
      'Set up validation rules',
      'Create exception handling',
      'Train finance team'
    ],
    successMetrics: [
      '20 hours saved per week',
      '90% automation rate',
      '50% faster payment processing'
    ],
    dependencies: ['ERP system update', 'Vendor onboarding'],
    notes: 'Currently in UAT phase, minor issues being resolved',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-25'),
    tags: ['Automation', 'Finance', 'OCR'],
    progress: 85,
    dueDate: new Date('2024-02-15'),
    icon: '📄',
    colorTheme: 'orange'
  },
  {
    id: 'roadmap-5',
    title: 'Customer Support Chatbot',
    description: 'AI chatbot for automated customer support',
    category: 'Agent',
    type: 'Customer Service',
    source: 'agents',
    sourceId: '4',
    status: 'Completed',
    priority: 'High',
    estimatedEffort: '6-8 weeks',
    timeline: '2 months',
    owner: 'Customer Success',
    assignees: ['Rachel Green', 'David Park'],
    prerequisites: [
      'Knowledge base setup',
      'Chat platform integration',
      'Customer service workflows mapped'
    ],
    implementationSteps: [
      'Build knowledge base',
      'Train AI model on support data',
      'Integrate with chat platform',
      'Create escalation workflows',
      'Test with customer scenarios',
      'Deploy and monitor'
    ],
    successMetrics: [
      '60% reduction in support tickets',
      '24/7 availability',
      '85% customer satisfaction'
    ],
    dependencies: ['Knowledge base migration', 'Staff training'],
    notes: 'Successfully deployed and meeting all KPIs',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-30'),
    tags: ['AI Agent', 'Customer Service', 'Chatbot'],
    progress: 100,
    dueDate: new Date('2024-01-30'),
    icon: '🤖',
    colorTheme: 'green'
  }
];

export const roadmapColumns: RoadmapColumn[] = [
  {
    id: 'to-plan',
    title: 'To Plan',
    color: 'bg-gray-100 border-gray-300',
    items: []
  },
  {
    id: 'ready',
    title: 'Ready',
    color: 'bg-blue-100 border-blue-300',
    items: []
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-yellow-100 border-yellow-300',
    items: []
  },
  {
    id: 'testing',
    title: 'Testing',
    color: 'bg-purple-100 border-purple-300',
    items: []
  },
  {
    id: 'completed',
    title: 'Completed',
    color: 'bg-green-100 border-green-300',
    items: []
  }
];

// Initialize columns with sample data
export function getInitializedColumns(): RoadmapColumn[] {
  const columns = [...roadmapColumns];
  
  sampleRoadmapData.forEach(item => {
    const columnIndex = columns.findIndex(col => 
      col.id === item.status.toLowerCase().replace(' ', '-')
    );
    if (columnIndex !== -1) {
      columns[columnIndex].items.push(item);
    }
  });
  
  return columns;
}

// Roadmap management functions
export class RoadmapManager {
  private static instance: RoadmapManager;
  private items: RoadmapItem[] = [];
  private listeners: ((items: RoadmapItem[]) => void)[] = [];

  static getInstance(): RoadmapManager {
    if (!RoadmapManager.instance) {
      RoadmapManager.instance = new RoadmapManager();
    }
    return RoadmapManager.instance;
  }

  constructor() {
    // Load from localStorage if available
    try {
      const stored = localStorage.getItem('roadmap_items');
      if (stored) {
        this.items = JSON.parse(stored).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          dueDate: item.dueDate ? new Date(item.dueDate) : undefined
        }));
      } else {
        this.items = [...sampleRoadmapData];
        this.save();
      }
    } catch (error) {
      console.warn('Failed to load roadmap data:', error);
      this.items = [...sampleRoadmapData];
    }
  }

  addItem(item: Omit<RoadmapItem, 'id' | 'createdAt' | 'updatedAt'>): RoadmapItem {
    const newItem: RoadmapItem = {
      ...item,
      id: `roadmap-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.items.push(newItem);
    this.save();
    this.notifyListeners();
    return newItem;
  }

  updateItem(id: string, updates: Partial<RoadmapItem>): RoadmapItem | null {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;

    this.items[index] = {
      ...this.items[index],
      ...updates,
      updatedAt: new Date()
    };
    
    this.save();
    this.notifyListeners();
    return this.items[index];
  }

  removeItem(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    this.save();
    this.notifyListeners();
    return true;
  }

  getItems(): RoadmapItem[] {
    return [...this.items];
  }

  getItemsByStatus(status: string): RoadmapItem[] {
    return this.items.filter(item => item.status === status);
  }

  subscribe(listener: (items: RoadmapItem[]) => void): () => void {
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
      localStorage.setItem('roadmap_items', JSON.stringify(this.items));
    } catch (error) {
      console.warn('Failed to save roadmap data:', error);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.items]));
  }
}

export const roadmapManager = RoadmapManager.getInstance();