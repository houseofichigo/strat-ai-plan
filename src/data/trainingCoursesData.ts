export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  shortValueProp: string;
  subject: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Executive';
  department: string[];
  industry: string[];
  duration: string;
  format: 'On-Demand' | 'Live' | 'Workshop' | 'Cohort' | 'Blended';
  outcomes: string[];
  prerequisites: string[];
  deliveryMode: string;
  trainers: {
    name: string;
    bio: string;
    avatar: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
    company: string;
    rating: number;
  }[];
  certification: boolean;
  quickROI: boolean;
  rating: number;
  enrollments: number;
  price: string;
  featured?: boolean;
  trending?: boolean;
  newRelease?: boolean;
  highlyRated?: boolean;
  categoryIcon: string;
  painPoint: string;
  targetAudience: string;
  modules: string[];
}

export const trainingCoursesData: TrainingCourse[] = [
  {
    id: '1',
    title: 'Data Readiness Fundamentals',
    description: 'Master the foundations of data preparation and structure for AI and automation initiatives',
    shortValueProp: 'Assess & structure your data in 2 hours',
    subject: ['Data', 'Foundations'],
    level: 'Beginner',
    department: ['IT', 'Operations', 'Analytics'],
    industry: ['Technology', 'Finance', 'Healthcare'],
    duration: '2h',
    format: 'On-Demand',
    outcomes: [
      'Assess current data quality and readiness',
      'Structure data for AI/ML applications',
      'Identify data governance requirements',
      'Create data preparation workflows'
    ],
    prerequisites: ['Basic understanding of business data'],
    deliveryMode: 'Self-paced video modules with hands-on exercises',
    trainers: [
      {
        name: 'Dr. Sarah Chen',
        bio: 'Data Strategy Consultant with 15+ years in enterprise data architecture',
        avatar: '👩‍💼'
      }
    ],
    testimonials: [
      {
        quote: 'This course helped us identify critical data gaps before our AI project',
        author: 'Mark Rodriguez',
        company: 'TechCorp',
        rating: 5
      }
    ],
    certification: true,
    quickROI: true,
    rating: 4.8,
    enrollments: 1250,
    price: '$149',
    featured: true,
    categoryIcon: '📊',
    painPoint: 'Companies struggle with poor data quality preventing AI adoption',
    targetAudience: 'Data teams, IT managers, and business analysts starting AI initiatives',
    modules: ['Data Assessment', 'Quality Frameworks', 'Governance Basics', 'AI Readiness']
  },
  {
    id: '2',
    title: 'Prompt Engineering Mastery',
    description: 'Unlock the full potential of LLMs with advanced prompt engineering techniques',
    shortValueProp: 'Master AI prompts for business results in 4 hours',
    subject: ['AI', 'LLM', 'Prompt Engineering'],
    level: 'Intermediate',
    department: ['Marketing', 'Sales', 'Operations'],
    industry: ['SaaS', 'Marketing', 'Consulting'],
    duration: '4h',
    format: 'Workshop',
    outcomes: [
      'Write effective prompts for business tasks',
      'Use advanced prompting techniques',
      'Build prompt libraries for teams',
      'Measure and optimize prompt performance'
    ],
    prerequisites: ['Basic familiarity with AI tools like ChatGPT'],
    deliveryMode: 'Interactive workshop with real-time practice',
    trainers: [
      {
        name: 'Alex Kim',
        bio: 'AI Product Manager at leading tech company, prompt engineering expert',
        avatar: '👨‍💻'
      }
    ],
    testimonials: [
      {
        quote: 'Increased our content creation efficiency by 300% using these techniques',
        author: 'Lisa Wang',
        company: 'Growth Agency',
        rating: 5
      }
    ],
    certification: true,
    quickROI: false,
    rating: 4.9,
    enrollments: 890,
    price: '$249',
    trending: true,
    categoryIcon: '🤖',
    painPoint: 'Teams waste time with ineffective AI prompts that produce poor results',
    targetAudience: 'Marketing teams, content creators, and knowledge workers using AI daily',
    modules: ['Prompt Fundamentals', 'Advanced Techniques', 'Business Applications', 'Team Frameworks']
  },
  {
    id: '3',
    title: 'AI Agent Design & Deployment',
    description: 'Build, test, and deploy AI agents to automate complex business workflows',
    shortValueProp: 'Deploy your first AI agent in 6 hours',
    subject: ['AI', 'Agents', 'Automation'],
    level: 'Advanced',
    department: ['IT', 'Engineering', 'Operations'],
    industry: ['Technology', 'Finance', 'Manufacturing'],
    duration: '6h',
    format: 'Cohort',
    outcomes: [
      'Design AI agents for specific use cases',
      'Implement agent workflows and decision trees',
      'Deploy and monitor agents in production',
      'Troubleshoot and optimize agent performance'
    ],
    prerequisites: ['Programming experience', 'Basic AI/ML knowledge'],
    deliveryMode: 'Cohort-based course with peer learning and mentorship',
    trainers: [
      {
        name: 'Michael Chen',
        bio: 'AI Engineering Lead with expertise in agent systems and automation',
        avatar: '👨‍🔬'
      }
    ],
    testimonials: [
      {
        quote: 'Our customer service agent reduced response time by 80%',
        author: 'Jennifer Brooks',
        company: 'ServicePro',
        rating: 5
      }
    ],
    certification: true,
    quickROI: false,
    rating: 4.7,
    enrollments: 456,
    price: '$499',
    categoryIcon: '🤖',
    painPoint: 'Complex workflows require manual intervention and oversight',
    targetAudience: 'Technical teams building advanced automation solutions',
    modules: ['Agent Architecture', 'Workflow Design', 'Testing & Validation', 'Production Deployment']
  },
  {
    id: '4',
    title: 'AI Strategy & Leadership for Executives',
    description: 'Lead your organization through successful AI transformation and adoption',
    shortValueProp: 'Build AI strategy in 1 day intensive',
    subject: ['Strategy', 'Leadership', 'Transformation'],
    level: 'Executive',
    department: ['Executive', 'Strategy'],
    industry: ['All Industries'],
    duration: '1 Day',
    format: 'Live',
    outcomes: [
      'Develop comprehensive AI strategy',
      'Build organizational AI capabilities',
      'Manage AI transformation risks',
      'Communicate AI vision to stakeholders'
    ],
    prerequisites: ['Senior leadership role'],
    deliveryMode: 'Executive workshop with case studies and peer discussions',
    trainers: [
      {
        name: 'Dr. Robert Taylor',
        bio: 'Former Chief AI Officer, strategic transformation consultant',
        avatar: '👨‍💼'
      }
    ],
    testimonials: [
      {
        quote: 'Transformed our AI approach from tactical to strategic',
        author: 'CEO',
        company: 'Fortune 500 Company',
        rating: 5
      }
    ],
    certification: false,
    quickROI: true,
    rating: 4.9,
    enrollments: 234,
    price: '$1,999',
    featured: true,
    categoryIcon: '🎯',
    painPoint: 'Leaders struggle to create coherent AI strategy and manage transformation',
    targetAudience: 'C-suite executives, VPs, and senior directors leading AI initiatives',
    modules: ['AI Strategy Framework', 'Organizational Change', 'Risk Management', 'ROI Measurement']
  },
  {
    id: '5',
    title: 'Automation Workflows in n8n/Zapier',
    description: 'Deploy practical automations for sales, operations, and finance workflows',
    shortValueProp: 'Automate 3 business processes in 3 hours',
    subject: ['Automation', 'Workflows', 'No-Code'],
    level: 'Beginner',
    department: ['Operations', 'Sales', 'Finance'],
    industry: ['SME', 'SaaS', 'Services'],
    duration: '3h',
    format: 'On-Demand',
    outcomes: [
      'Build automation workflows step-by-step',
      'Connect popular business applications',
      'Design error handling and monitoring',
      'Scale automations across teams'
    ],
    prerequisites: ['Familiarity with business applications'],
    deliveryMode: 'Hands-on tutorials with real business scenarios',
    trainers: [
      {
        name: 'Emma Johnson',
        bio: 'Automation consultant specializing in SME workflow optimization',
        avatar: '👩‍💻'
      }
    ],
    testimonials: [
      {
        quote: 'Saved 15 hours per week on manual data entry tasks',
        author: 'Operations Manager',
        company: 'GrowthCo',
        rating: 4
      }
    ],
    certification: true,
    quickROI: true,
    rating: 4.6,
    enrollments: 1890,
    price: '$99',
    newRelease: true,
    categoryIcon: '⚙️',
    painPoint: 'Manual processes consume valuable time that could be spent on strategy',
    targetAudience: 'Operations teams, sales ops, and finance professionals in growing companies',
    modules: ['Platform Overview', 'Common Workflows', 'Integration Setup', 'Monitoring & Optimization']
  },
  {
    id: '6',
    title: 'AI in HR: Talent Acquisition Automation',
    description: 'Transform recruitment with AI-powered screening, matching, and engagement',
    shortValueProp: 'Automate 50% of recruiting tasks',
    subject: ['AI', 'HR', 'Recruitment'],
    level: 'Intermediate',
    department: ['HR', 'Talent Acquisition'],
    industry: ['Technology', 'Services', 'Healthcare'],
    duration: '4h',
    format: 'Blended',
    outcomes: [
      'Implement AI resume screening',
      'Use AI for candidate matching',
      'Automate interview scheduling',
      'Measure recruitment AI ROI'
    ],
    prerequisites: ['HR/recruiting experience'],
    deliveryMode: 'Mix of online modules and live Q&A sessions',
    trainers: [
      {
        name: 'Rachel Green',
        bio: 'HR Tech specialist with 10+ years in talent acquisition automation',
        avatar: '👩‍💼'
      }
    ],
    testimonials: [
      {
        quote: 'Cut time-to-hire by 40% while improving candidate quality',
        author: 'HR Director',
        company: 'TechStartup',
        rating: 5
      }
    ],
    certification: true,
    quickROI: true,
    rating: 4.8,
    enrollments: 567,
    price: '$199',
    highlyRated: true,
    categoryIcon: '👥',
    painPoint: 'Manual recruiting processes are slow and miss qualified candidates',
    targetAudience: 'HR professionals, recruiters, and talent acquisition teams',
    modules: ['AI Screening Tools', 'Candidate Matching', 'Process Automation', 'Analytics & ROI']
  }
];

export const trainingCategories = [
  { id: 'quick-wins', name: 'Quick Wins', filter: (course: TrainingCourse) => course.quickROI },
  { id: 'for-your-level', name: 'For Your Maturity Level', filter: (course: TrainingCourse) => course.level === 'Beginner' },
  { id: 'strategic', name: 'Strategic Essentials', filter: (course: TrainingCourse) => course.subject.includes('Strategy') || course.level === 'Executive' },
  { id: 'technical', name: 'Technical Deep Dives', filter: (course: TrainingCourse) => course.level === 'Advanced' },
  { id: 'featured', name: 'Featured Courses', filter: (course: TrainingCourse) => course.featured },
  { id: 'trending', name: 'Trending Now', filter: (course: TrainingCourse) => course.trending },
  { id: 'new', name: 'New Releases', filter: (course: TrainingCourse) => course.newRelease },
  { id: 'highly-rated', name: 'Highly Rated', filter: (course: TrainingCourse) => course.rating >= 4.8 }
];

export const subjects = ['AI', 'Data', 'Automation', 'Strategy', 'Leadership', 'LLM', 'Agents', 'Workflows'];
export const levels = ['Beginner', 'Intermediate', 'Advanced', 'Executive'];
export const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Analytics', 'Executive'];
export const formats = ['On-Demand', 'Live', 'Workshop', 'Cohort', 'Blended'];

// User learning profile
export interface LearningProfile {
  id: string;
  role: string;
  department: string;
  industry: string;
  maturityLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  learningGoals: string[];
  timeAvailable: string;
  preferredFormat: string[];
}

export const sampleLearningProfiles: LearningProfile[] = [
  {
    id: '1',
    role: 'Data Manager',
    department: 'IT',
    industry: 'Finance',
    maturityLevel: 'Intermediate',
    learningGoals: ['Data Strategy', 'AI Implementation', 'Team Leadership'],
    timeAvailable: '4-6 hours/week',
    preferredFormat: ['On-Demand', 'Workshop']
  },
  {
    id: '2',
    role: 'VP of Sales',
    department: 'Sales',
    industry: 'SaaS',
    maturityLevel: 'Beginner',
    learningGoals: ['AI Strategy', 'Sales Automation', 'Quick Wins'],
    timeAvailable: '2-3 hours/week',
    preferredFormat: ['Live', 'Executive']
  }
];

export function getPersonalizedTraining(profile: LearningProfile): TrainingCourse[] {
  return trainingCoursesData.filter(course => 
    course.department.includes(profile.department) ||
    course.level === profile.maturityLevel ||
    course.industry.includes(profile.industry) ||
    profile.preferredFormat.includes(course.format)
  );
}

export function getTrainingRecommendation(profile: LearningProfile, course: TrainingCourse): string {
  const reasons = [];
  
  if (course.department.includes(profile.department)) {
    reasons.push(`Perfect for ${profile.department} professionals`);
  }
  
  if (course.level === profile.maturityLevel) {
    reasons.push(`Matches your ${profile.maturityLevel} level`);
  }
  
  if (course.quickROI && profile.learningGoals.includes('Quick Wins')) {
    reasons.push('Delivers quick ROI for immediate impact');
  }
  
  if (profile.preferredFormat.includes(course.format)) {
    reasons.push(`Available in your preferred ${course.format} format`);
  }
  
  return reasons.join(' • ') || 'Recommended based on your profile';
}