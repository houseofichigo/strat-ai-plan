export interface AgentTemplate {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  stack: string[];
  stackIcons: Record<string, string>; // app name to icon mapping
  category: string[];
  department: string[];
  setupTime: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedROI: string;
  views: number;
  usage: number;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  quickDeploy?: boolean;
  inputOutputFlow: {
    input: string;
    process: string;
    output: string;
  };
  implementationSteps: string[];
  useCases: string[];
  testimonials?: string[];
  docsLink?: string;
  templateUrl?: string;
  colorTheme: string;
}

export const agentTemplatesData: AgentTemplate[] = [
  {
    id: '1',
    name: 'Compress Binary Files to Zip',
    shortDescription: 'Automate file compression from any input to zip/gzip, then upload to cloud storage',
    detailedDescription: 'Streamline your file management workflow by automatically compressing binary files from HTTP requests or cloud storage into zip or gzip formats, then seamlessly uploading them to your preferred cloud storage solution.',
    stack: ['HTTP Request', 'Compression Node', 'Dropbox', 'Google Drive', 'Box'],
    stackIcons: {
      'HTTP Request': '🌐',
      'Compression Node': '🗜️',
      'Dropbox': '📦',
      'Google Drive': '💾',
      'Box': '📁'
    },
    category: ['Data & Storage', 'Automation'],
    department: ['IT', 'Operations'],
    setupTime: '5-10 mins',
    complexity: 'Beginner',
    estimatedROI: 'High',
    views: 1250,
    usage: 89,
    featured: true,
    trending: true,
    inputOutputFlow: {
      input: 'Binary files from HTTP/Storage',
      process: 'Compress to ZIP/GZIP format',
      output: 'Upload to cloud storage'
    },
    implementationSteps: [
      'Configure input source (HTTP endpoint or cloud storage)',
      'Set compression settings (ZIP or GZIP)',
      'Connect to target storage service',
      'Test with sample files',
      'Deploy and monitor'
    ],
    useCases: [
      'Backup automation',
      'File archiving workflows',
      'Storage optimization',
      'Batch processing pipelines'
    ],
    docsLink: 'https://docs.example.com/compression-agent',
    colorTheme: 'blue'
  },
  {
    id: '2',
    name: 'Add Contacts to SendGrid Automatically',
    shortDescription: 'Sync contacts from CRM or email service to SendGrid for automated campaigns',
    detailedDescription: 'Eliminate manual contact management by automatically syncing contacts from your CRM or email service to SendGrid, enabling seamless automated email campaigns and improved customer engagement.',
    stack: ['CRM Node', 'SendGrid', 'API Integration'],
    stackIcons: {
      'CRM Node': '👥',
      'SendGrid': '📧',
      'API Integration': '🔗'
    },
    category: ['Marketing', 'Communication'],
    department: ['Marketing', 'Sales'],
    setupTime: '10 mins',
    complexity: 'Beginner',
    estimatedROI: 'Very High',
    views: 2100,
    usage: 156,
    trending: true,
    quickDeploy: true,
    inputOutputFlow: {
      input: 'Contact data from CRM',
      process: 'Format and validate contacts',
      output: 'Add to SendGrid lists'
    },
    implementationSteps: [
      'Connect to your CRM system',
      'Configure SendGrid API credentials',
      'Map contact fields',
      'Set up sync frequency',
      'Test with sample contacts'
    ],
    useCases: [
      'Lead nurturing campaigns',
      'Customer onboarding',
      'Newsletter subscriptions',
      'Event marketing'
    ],
    testimonials: ['Increased our email engagement by 40%'],
    docsLink: 'https://docs.example.com/sendgrid-sync',
    colorTheme: 'green'
  },
  {
    id: '3',
    name: 'Add Datapoint to Beeminder on Strava Activity',
    shortDescription: 'Track fitness progress by automatically logging Strava activities to Beeminder',
    detailedDescription: 'Stay motivated and accountable with your fitness goals by automatically tracking new Strava activities in Beeminder, creating a seamless connection between your workouts and goal-tracking system.',
    stack: ['Strava', 'Beeminder', 'Webhook'],
    stackIcons: {
      'Strava': '🏃',
      'Beeminder': '📊',
      'Webhook': '🔔'
    },
    category: ['Productivity', 'Wellness', 'Analytics'],
    department: ['Personal', 'HR'],
    setupTime: '10 mins',
    complexity: 'Beginner',
    estimatedROI: 'Medium',
    views: 890,
    usage: 67,
    newArrival: true,
    inputOutputFlow: {
      input: 'New Strava activity',
      process: 'Extract relevant metrics',
      output: 'Log datapoint to Beeminder'
    },
    implementationSteps: [
      'Connect Strava account',
      'Set up Beeminder goal',
      'Configure metric mapping',
      'Test with recent activity',
      'Enable automatic sync'
    ],
    useCases: [
      'Fitness goal tracking',
      'Habit formation',
      'Personal accountability',
      'Wellness monitoring'
    ],
    docsLink: 'https://docs.example.com/strava-beeminder',
    colorTheme: 'orange'
  },
  {
    id: '4',
    name: 'Create New Member in Mailchimp from Airtable',
    shortDescription: 'Automate list-building by adding new Airtable entries as Mailchimp members',
    detailedDescription: 'Streamline your email marketing by automatically converting new Airtable records into Mailchimp subscribers, ensuring your mailing lists are always up-to-date with fresh leads.',
    stack: ['Airtable', 'Mailchimp', 'Zapier Integration'],
    stackIcons: {
      'Airtable': '📋',
      'Mailchimp': '🐵',
      'Zapier Integration': '⚡'
    },
    category: ['Marketing', 'Data & Storage'],
    department: ['Marketing', 'Sales'],
    setupTime: '5 mins',
    complexity: 'Beginner',
    estimatedROI: 'High',
    views: 1750,
    usage: 123,
    quickDeploy: true,
    featured: true,
    inputOutputFlow: {
      input: 'New Airtable record',
      process: 'Validate and format data',
      output: 'Create Mailchimp subscriber'
    },
    implementationSteps: [
      'Connect Airtable base',
      'Link Mailchimp account',
      'Map subscriber fields',
      'Set up trigger conditions',
      'Test with sample record'
    ],
    useCases: [
      'Lead generation workflows',
      'Event registration processing',
      'Customer database sync',
      'Newsletter growth automation'
    ],
    testimonials: ['Automated our entire lead nurturing process'],
    docsLink: 'https://docs.example.com/airtable-mailchimp',
    colorTheme: 'yellow'
  },
  {
    id: '5',
    name: 'Transfer Google Analytics Data to Airtable',
    shortDescription: 'Sync Google Analytics session data to Airtable for reporting and analysis',
    detailedDescription: 'Transform your analytics workflow by automatically transferring Google Analytics session data, including geographical breakdowns, to Airtable for enhanced reporting and business intelligence.',
    stack: ['Google Analytics', 'Airtable', 'Data Pipeline'],
    stackIcons: {
      'Google Analytics': '📈',
      'Airtable': '📋',
      'Data Pipeline': '🔄'
    },
    category: ['Analytics', 'Data & Storage'],
    department: ['Marketing', 'Analytics'],
    setupTime: '15 mins',
    complexity: 'Intermediate',
    estimatedROI: 'Very High',
    views: 3200,
    usage: 234,
    trending: true,
    inputOutputFlow: {
      input: 'Google Analytics data',
      process: 'Transform and aggregate metrics',
      output: 'Structured Airtable records'
    },
    implementationSteps: [
      'Set up Google Analytics API access',
      'Configure Airtable destination',
      'Define data mapping rules',
      'Schedule sync frequency',
      'Validate data accuracy'
    ],
    useCases: [
      'Custom reporting dashboards',
      'Performance tracking',
      'Client reporting automation',
      'Business intelligence workflows'
    ],
    testimonials: ['Cut our reporting time by 80%'],
    docsLink: 'https://docs.example.com/ga-airtable',
    colorTheme: 'blue'
  },
  {
    id: '6',
    name: 'Get Hacker News Data and Send via SMS',
    shortDescription: 'Fetch Hacker News updates and deliver via SMS or store in Airtable',
    detailedDescription: 'Stay updated with the latest tech trends by automatically fetching Hacker News updates and delivering them via SMS notifications or storing them in Airtable for analysis.',
    stack: ['Hacker News API', 'Airtable', 'Vonage SMS', 'Scheduler'],
    stackIcons: {
      'Hacker News API': '📰',
      'Airtable': '📋',
      'Vonage SMS': '📱',
      'Scheduler': '⏰'
    },
    category: ['Communication', 'Productivity'],
    department: ['Technology', 'Research'],
    setupTime: '10 mins',
    complexity: 'Intermediate',
    estimatedROI: 'Medium',
    views: 1100,
    usage: 78,
    newArrival: true,
    inputOutputFlow: {
      input: 'Hacker News API feed',
      process: 'Filter and format updates',
      output: 'SMS notification or Airtable record'
    },
    implementationSteps: [
      'Configure Hacker News API access',
      'Set up SMS service credentials',
      'Define filtering criteria',
      'Schedule update frequency',
      'Test notification delivery'
    ],
    useCases: [
      'Tech trend monitoring',
      'Research automation',
      'News aggregation',
      'Industry intelligence'
    ],
    docsLink: 'https://docs.example.com/hackernews-sms',
    colorTheme: 'red'
  },
  {
    id: '7',
    name: 'Store Phantom Output in Airtable',
    shortDescription: 'Fetch data from Phantombuster workflow and log into Airtable automatically',
    detailedDescription: 'Maximize your lead generation efficiency by automatically capturing data from Phantombuster workflows, such as LinkedIn scrapers, and organizing it in Airtable for follow-up actions.',
    stack: ['Phantombuster', 'Airtable', 'API Connector'],
    stackIcons: {
      'Phantombuster': '👻',
      'Airtable': '📋',
      'API Connector': '🔌'
    },
    category: ['Sales', 'Marketing', 'Data & Storage'],
    department: ['Sales', 'Marketing'],
    setupTime: '15 mins',
    complexity: 'Intermediate',
    estimatedROI: 'Very High',
    views: 2800,
    usage: 187,
    featured: true,
    inputOutputFlow: {
      input: 'Phantombuster workflow output',
      process: 'Clean and structure data',
      output: 'Organized Airtable records'
    },
    implementationSteps: [
      'Connect Phantombuster account',
      'Set up Airtable destination',
      'Configure data mapping',
      'Set up workflow triggers',
      'Test data flow'
    ],
    useCases: [
      'Lead generation automation',
      'Prospect research',
      'Contact list building',
      'Sales pipeline management'
    ],
    testimonials: ['Generated 500+ qualified leads in first month'],
    docsLink: 'https://docs.example.com/phantom-airtable',
    colorTheme: 'purple'
  },
  {
    id: '8',
    name: 'Track ISS Position Every Minute',
    shortDescription: 'Track and log International Space Station positions in real-time using public APIs',
    detailedDescription: 'Monitor the International Space Station\'s orbital position in real-time by automatically fetching location data every minute and optionally sending updates to your team via Slack.',
    stack: ['Cron', 'HTTP Request', 'Set Node', 'Slack', 'Mattermost'],
    stackIcons: {
      'Cron': '⏰',
      'HTTP Request': '🌐',
      'Set Node': '⚙️',
      'Slack': '💬',
      'Mattermost': '🗨️'
    },
    category: ['Data', 'APIs', 'Monitoring'],
    department: ['Research', 'Education'],
    setupTime: '10 mins',
    complexity: 'Beginner',
    estimatedROI: 'Low',
    views: 650,
    usage: 45,
    quickDeploy: true,
    inputOutputFlow: {
      input: 'ISS location API',
      process: 'Parse coordinates and timestamp',
      output: 'Log position data or send notification'
    },
    implementationSteps: [
      'Set up ISS API connection',
      'Configure cron scheduler',
      'Set up data storage',
      'Optional: Configure Slack notifications',
      'Test tracking accuracy'
    ],
    useCases: [
      'Educational demonstrations',
      'Space tracking projects',
      'API learning examples',
      'Real-time monitoring'
    ],
    docsLink: 'https://docs.example.com/iss-tracking',
    colorTheme: 'indigo'
  }
];

export const agentCategories = [
  { id: 'popular', name: 'Popular Now', filter: (agent: AgentTemplate) => agent.trending || agent.views > 2000 },
  { id: 'quick-deploy', name: 'Quick Deploy', filter: (agent: AgentTemplate) => agent.quickDeploy },
  { id: 'new', name: 'New Arrivals', filter: (agent: AgentTemplate) => agent.newArrival },
  { id: 'featured', name: 'Featured Templates', filter: (agent: AgentTemplate) => agent.featured },
  { id: 'data-analytics', name: 'Data & Analytics', filter: (agent: AgentTemplate) => agent.category.includes('Data & Storage') || agent.category.includes('Analytics') },
  { id: 'communication', name: 'Communication', filter: (agent: AgentTemplate) => agent.category.includes('Communication') },
  { id: 'marketing', name: 'Marketing', filter: (agent: AgentTemplate) => agent.category.includes('Marketing') }
];

export const agentDepartments = [
  'Marketing', 'Sales', 'IT', 'Operations', 'Analytics', 'HR', 'Research', 'Education', 'Personal', 'Technology'
];

export const agentComplexities = ['Beginner', 'Intermediate', 'Advanced'];

export const agentROIs = ['Low', 'Medium', 'High', 'Very High'];

export const agentApps = [
  'Airtable', 'SendGrid', 'Mailchimp', 'Google Analytics', 'Strava', 'Beeminder', 
  'Phantombuster', 'Dropbox', 'Google Drive', 'Box', 'Slack', 'Mattermost', 'Vonage SMS'
];