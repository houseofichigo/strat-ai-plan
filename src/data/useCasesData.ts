export interface UseCase {
  id: string;
  title: string;
  industry: string[];
  department: string[];
  aiType: string[];
  summaryValue: string;
  impactMetrics: {
    time?: string;
    cost?: string;
    accuracy?: string;
    satisfaction?: string;
  };
  maturity: 'Pilot' | 'Scale' | 'Beta';
  complexity: 'Low' | 'Medium' | 'High';
  suitability: 'SME' | 'Enterprise' | 'Both';
  thumbnail: string;
  description: string;
  businessChallenge: string;
  businessGoal: string;
  detailedOutcomes: string[];
  aiTasks: string[];
  dataRequirements: string[];
  implementationSteps: string[];
  timeline: string;
  requiredResources: string[];
  successMetrics: string[];
  risks: string[];
  caseStudies: string[];
  featured?: boolean;
  trending?: boolean;
  quickWin?: boolean;
  newArrival?: boolean;
  editorsPick?: boolean;
}

export const useCasesData: UseCase[] = [
  {
    id: '1',
    title: 'Contract Drafting Assistant',
    industry: ['Legal', 'Finance'],
    department: ['Legal', 'Compliance'],
    aiType: ['LLM', 'NLP'],
    summaryValue: '75% faster contract reviews',
    impactMetrics: {
      time: '-75% Time',
      accuracy: '<1% Error',
      satisfaction: '+40% CSAT'
    },
    maturity: 'Scale',
    complexity: 'Medium',
    suitability: 'Both',
    thumbnail: '⚖️',
    description: 'AI-powered contract drafting and review system that accelerates legal processes while ensuring compliance and reducing errors.',
    businessChallenge: 'Legal teams spend excessive time on repetitive contract review tasks, leading to bottlenecks and potential oversight errors.',
    businessGoal: 'Reduce contract review time by 75% while maintaining accuracy and ensuring regulatory compliance.',
    detailedOutcomes: [
      'Automated clause generation and validation',
      'Real-time compliance checking',
      'Reduced legal review cycles',
      'Standardized contract templates'
    ],
    aiTasks: ['Natural Language Processing', 'Pattern Recognition', 'Compliance Validation'],
    dataRequirements: ['Historical contracts', 'Legal templates', 'Compliance databases'],
    implementationSteps: [
      'Data collection and preparation',
      'Model training on legal documents',
      'Integration with legal systems',
      'User training and rollout'
    ],
    timeline: '4-6 months',
    requiredResources: ['Legal data scientist', 'IT integration team', 'Legal SMEs'],
    successMetrics: ['Review time reduction', 'Error rate', 'User satisfaction'],
    risks: ['Data privacy concerns', 'Regulatory compliance', 'User adoption'],
    caseStudies: ['TechCorp reduced contract review time by 80%'],
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'Delivery Accuracy Scoring',
    industry: ['Logistics', 'E-commerce'],
    department: ['Operations', 'Supply Chain'],
    aiType: ['ML', 'Geospatial Analytics'],
    summaryValue: '<5% failed deliveries',
    impactMetrics: {
      cost: '-30% Ops Cost',
      accuracy: '<5% Failed Rate',
      satisfaction: '+25% CSAT'
    },
    maturity: 'Pilot',
    complexity: 'Medium',
    suitability: 'Both',
    thumbnail: '📦',
    description: 'Machine learning system that predicts delivery success probability and optimizes routing for higher accuracy.',
    businessChallenge: 'High failed delivery rates impact customer satisfaction and increase operational costs.',
    businessGoal: 'Achieve <5% failed delivery rate while reducing operational costs.',
    detailedOutcomes: [
      'Predictive delivery scoring',
      'Optimized route planning',
      'Proactive issue resolution',
      'Enhanced customer experience'
    ],
    aiTasks: ['Predictive Modeling', 'Route Optimization', 'Risk Assessment'],
    dataRequirements: ['Delivery history', 'Geographic data', 'Weather patterns'],
    implementationSteps: [
      'Historical data analysis',
      'Model development and testing',
      'System integration',
      'Performance monitoring'
    ],
    timeline: '3-4 months',
    requiredResources: ['Data scientist', 'Operations analyst', 'IT support'],
    successMetrics: ['Failed delivery rate', 'Cost per delivery', 'Customer satisfaction'],
    risks: ['Data quality issues', 'External factors', 'Integration complexity'],
    caseStudies: ['LogiCorp improved delivery success by 40%'],
    quickWin: true
  },
  {
    id: '3',
    title: 'Enterprise Knowledge Search',
    industry: ['Technology', 'Consulting', 'Healthcare'],
    department: ['IT', 'HR', 'Operations'],
    aiType: ['RAG', 'Vector Search', 'NLP'],
    summaryValue: '30% faster problem resolution',
    impactMetrics: {
      time: '-30% Resolution Time',
      satisfaction: '+35% CSAT',
      cost: '-20% Support Cost'
    },
    maturity: 'Pilot',
    complexity: 'Medium',
    suitability: 'Both',
    thumbnail: '🔍',
    description: 'AI-powered knowledge base that provides instant, contextual answers from enterprise documentation.',
    businessChallenge: 'Employees struggle to find relevant information quickly, leading to inefficient problem-solving.',
    businessGoal: 'Enable instant access to relevant enterprise knowledge for faster decision-making.',
    detailedOutcomes: [
      'Semantic search capabilities',
      'Contextual answer generation',
      'Knowledge gap identification',
      'Continuous learning system'
    ],
    aiTasks: ['Retrieval Augmented Generation', 'Semantic Search', 'Knowledge Extraction'],
    dataRequirements: ['Documentation', 'FAQs', 'Process guides', 'Historical tickets'],
    implementationSteps: [
      'Knowledge base audit',
      'Vector database setup',
      'RAG system implementation',
      'User interface development'
    ],
    timeline: '2-3 months',
    requiredResources: ['AI engineer', 'Knowledge manager', 'UX designer'],
    successMetrics: ['Search success rate', 'Time to resolution', 'User engagement'],
    risks: ['Information accuracy', 'Data silos', 'User adoption'],
    caseStudies: ['TechGiant reduced support tickets by 50%'],
    newArrival: true,
    editorsPick: true
  },
  {
    id: '4',
    title: 'Visual Defect Detection',
    industry: ['Manufacturing', 'Automotive'],
    department: ['Quality Control', 'Production'],
    aiType: ['Computer Vision', 'Deep Learning'],
    summaryValue: '90% reduction in manual inspection',
    impactMetrics: {
      cost: '-90% Inspection Cost',
      accuracy: '+95% Detection Rate',
      time: '-80% Inspection Time'
    },
    maturity: 'Pilot',
    complexity: 'High',
    suitability: 'Enterprise',
    thumbnail: '👁️',
    description: 'Computer vision system for automated quality control that detects manufacturing defects with superhuman accuracy.',
    businessChallenge: 'Manual quality inspection is time-consuming, inconsistent, and prone to human error.',
    businessGoal: 'Achieve near-perfect defect detection while reducing inspection costs by 90%.',
    detailedOutcomes: [
      'Automated defect classification',
      'Real-time quality monitoring',
      'Reduced waste and rework',
      'Consistent quality standards'
    ],
    aiTasks: ['Image Classification', 'Anomaly Detection', 'Pattern Recognition'],
    dataRequirements: ['Product images', 'Defect examples', 'Quality standards'],
    implementationSteps: [
      'Image data collection',
      'Model training and validation',
      'Production line integration',
      'Performance optimization'
    ],
    timeline: '6-8 months',
    requiredResources: ['Computer vision engineer', 'Quality expert', 'Production manager'],
    successMetrics: ['Detection accuracy', 'False positive rate', 'Cost savings'],
    risks: ['Lighting conditions', 'Model bias', 'Hardware requirements'],
    caseStudies: ['AutoMaker achieved 99.5% defect detection'],
    featured: true
  },
  {
    id: '5',
    title: 'Customer Churn Predictor',
    industry: ['SaaS', 'Telecom', 'E-commerce'],
    department: ['Customer Success', 'Marketing'],
    aiType: ['Predictive ML', 'Classification'],
    summaryValue: '15% improvement in retention',
    impactMetrics: {
      cost: '+15% Retention',
      satisfaction: '+20% CSAT',
      time: '-50% Response Time'
    },
    maturity: 'Scale',
    complexity: 'Medium',
    suitability: 'Both',
    thumbnail: '📈',
    description: 'Predictive analytics system that identifies at-risk customers and enables proactive retention strategies.',
    businessChallenge: 'Customer churn is expensive and difficult to predict, leading to reactive rather than proactive retention efforts.',
    businessGoal: 'Increase customer retention by 15% through early churn prediction and intervention.',
    detailedOutcomes: [
      'Early churn warning system',
      'Personalized retention campaigns',
      'Customer health scoring',
      'Revenue protection'
    ],
    aiTasks: ['Predictive Modeling', 'Risk Scoring', 'Behavior Analysis'],
    dataRequirements: ['Customer behavior data', 'Transaction history', 'Support interactions'],
    implementationSteps: [
      'Customer data integration',
      'Churn model development',
      'Scoring system implementation',
      'Intervention workflow setup'
    ],
    timeline: '3-4 months',
    requiredResources: ['Data scientist', 'Customer success manager', 'Marketing analyst'],
    successMetrics: ['Churn rate', 'Retention cost', 'Customer lifetime value'],
    risks: ['Data privacy', 'Model drift', 'Customer experience'],
    caseStudies: ['SaasCorp improved retention by 22%'],
    trending: true,
    quickWin: true
  },
  {
    id: '6',
    title: 'Sales Email Generator',
    industry: ['Sales', 'Marketing', 'B2B Services'],
    department: ['Sales', 'Marketing'],
    aiType: ['LLM', 'GenAI'],
    summaryValue: '10x faster email creation',
    impactMetrics: {
      time: '-90% Creation Time',
      satisfaction: '+20% Open Rate',
      cost: '+300% Productivity'
    },
    maturity: 'Scale',
    complexity: 'Low',
    suitability: 'Both',
    thumbnail: '✉️',
    description: 'AI-powered sales email generator that creates personalized, high-converting outbound messages at scale.',
    businessChallenge: 'Sales teams spend too much time crafting personalized emails, limiting outreach volume and effectiveness.',
    businessGoal: 'Increase email productivity by 10x while improving open and response rates.',
    detailedOutcomes: [
      'Personalized email generation',
      'A/B testing automation',
      'Performance optimization',
      'Scalable outreach campaigns'
    ],
    aiTasks: ['Text Generation', 'Personalization', 'Performance Analysis'],
    dataRequirements: ['CRM data', 'Email templates', 'Performance metrics'],
    implementationSteps: [
      'CRM integration setup',
      'Template library creation',
      'AI model configuration',
      'Performance tracking implementation'
    ],
    timeline: '1-2 months',
    requiredResources: ['Sales operations', 'Marketing specialist', 'AI engineer'],
    successMetrics: ['Email volume', 'Open rates', 'Response rates'],
    risks: ['Email deliverability', 'Brand consistency', 'Spam filters'],
    caseStudies: ['SalesPro increased qualified leads by 150%'],
    quickWin: true,
    newArrival: true
  },
  {
    id: '7',
    title: 'Invoice Data Extraction',
    industry: ['Finance', 'Accounting', 'Manufacturing'],
    department: ['Finance', 'Accounts Payable'],
    aiType: ['Document AI', 'OCR', 'NLP'],
    summaryValue: '80% reduction in manual entry',
    impactMetrics: {
      time: '-80% Processing Time',
      accuracy: '+99% Accuracy',
      cost: '-60% Processing Cost'
    },
    maturity: 'Scale',
    complexity: 'Low',
    suitability: 'Both',
    thumbnail: '📄',
    description: 'Automated invoice processing system that extracts and validates data from various document formats.',
    businessChallenge: 'Manual invoice processing is time-consuming, error-prone, and creates payment delays.',
    businessGoal: 'Automate 80% of invoice processing while improving accuracy and reducing costs.',
    detailedOutcomes: [
      'Automated data extraction',
      'Validation and verification',
      'Exception handling',
      'Faster payment processing'
    ],
    aiTasks: ['Document Processing', 'Text Extraction', 'Data Validation'],
    dataRequirements: ['Invoice samples', 'Vendor formats', 'Validation rules'],
    implementationSteps: [
      'Document format analysis',
      'OCR system setup',
      'Validation rules configuration',
      'ERP system integration'
    ],
    timeline: '2-3 months',
    requiredResources: ['AI engineer', 'Finance analyst', 'IT integrator'],
    successMetrics: ['Processing time', 'Accuracy rate', 'Cost per invoice'],
    risks: ['Document quality', 'Format variations', 'Integration issues'],
    caseStudies: ['FinanceCorp processed 95% of invoices automatically'],
    editorsPick: true
  }
];

export const categories = [
  { id: 'popular', name: 'Popular Now', filter: (uc: UseCase) => uc.trending || uc.featured },
  { id: 'quick-wins', name: 'Quick Wins', filter: (uc: UseCase) => uc.quickWin },
  { id: 'new', name: 'New Arrivals', filter: (uc: UseCase) => uc.newArrival },
  { id: 'editors', name: "Editor's Picks", filter: (uc: UseCase) => uc.editorsPick },
  { id: 'featured', name: 'Featured This Week', filter: (uc: UseCase) => uc.featured }
];

export const industries = [
  'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Legal', 'Logistics', 
  'E-commerce', 'SaaS', 'Telecom', 'Consulting', 'Automotive', 'Marketing', 'Sales'
];

export const departments = [
  'IT', 'Operations', 'Sales', 'Marketing', 'Finance', 'HR', 'Legal', 
  'Customer Success', 'Quality Control', 'Supply Chain', 'Compliance'
];

export const aiTypes = [
  'LLM', 'NLP', 'Computer Vision', 'ML', 'Predictive ML', 'GenAI', 
  'RAG', 'Document AI', 'OCR', 'Deep Learning', 'Classification'
];