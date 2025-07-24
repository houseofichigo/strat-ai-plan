export interface AssessmentQuestion {
  id: string;
  text: string;
  description?: string;
  type: 'radio' | 'multiselect' | 'dropdown' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
  tooltip?: string;
}

export interface AssessmentSectionData {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  weight: string;
  estimatedTime: string;
  questions: AssessmentQuestion[];
}

export interface FormData {
  [sectionId: string]: {
    [questionId: string]: string | string[];
  };
}

export const assessmentSections: AssessmentSectionData[] = [
  {
    id: 'business-strategy',
    title: 'Business Strategy & Use-Case Readiness',
    description: 'Evaluates how clearly your business sees the opportunity for AI, how well near-term use-cases are defined, and how these initiatives align with broader business goals.',
    detailedDescription: 'This section helps us understand where you are in your AI journey - from initial exploration to having concrete, prioritized use cases that align with your business objectives.',
    weight: '10%',
    estimatedTime: '5 minutes',
    questions: [
      {
        id: 'identified-problems',
        text: 'Have you identified concrete opportunities to apply AI?',
        description: 'This helps us understand how far along you are in identifying specific business problems that AI could solve.',
        type: 'radio',
        required: true,
        options: [
          'Still exploring – no clear ideas yet',
          'Ideas discussed but not formalized',
          '1–2 clear use-cases defined',
          'Multiple use-cases aligned to OKRs / growth strategy',
          'Visionary / long-term ideas identified but not near-term'
        ]
      },
      {
        id: 'roi-quantification',
        text: 'Have you estimated or modeled the potential benefits of AI?',
        description: 'Understanding ROI expectations helps us gauge your business case maturity.',
        type: 'radio',
        required: true,
        options: [
          'No estimates',
          'Rough top-line estimates',
          'Basic cost-benefit model',
          'Detailed projections tied to KPIs and metrics'
        ]
      },
      {
        id: 'strategic-alignment',
        text: 'How well are your AI initiatives aligned with your company\'s top business goals or OKRs?',
        description: 'Strategic alignment ensures AI investments support your broader business objectives.',
        type: 'radio',
        required: true,
        options: [
          'Not aligned at all',
          'Some alignment (linked to 1–2 teams or goals)',
          'Mostly aligned (clear connection to main KPIs/OKRs)',
          'Fully integrated (AI tied to all strategic objectives and regularly reviewed)',
          'Unsure / not discussed'
        ]
      },
      {
        id: 'use-case-prioritization',
        text: 'Have you prioritized your AI use-cases based on value and feasibility?',
        description: 'Prioritization frameworks help focus resources on the most impactful AI initiatives first.',
        type: 'radio',
        required: true,
        options: [
          'No prioritization yet',
          'Informal prioritization (team discussions only)',
          'Prioritized by estimated value or quick wins',
          'Prioritized using a structured framework (impact vs feasibility)',
          'Prioritized and sequenced with resources and timelines',
          'Not applicable / unsure'
        ]
      },
      {
        id: 'primary-objective',
        text: 'What\'s the main reason you\'re exploring AI?',
        description: 'Your primary motivation will help us tailor recommendations to your specific goals.',
        type: 'radio',
        required: true,
        options: [
          'Save time / increase productivity',
          'Reduce operating costs',
          'Increase revenue / conversion',
          'Improve customer experience / NPS',
          'Impress investors / strategic positioning'
        ]
      },
      {
        id: 'competitive-pressure',
        text: 'How critical is AI adoption for maintaining competitive advantage in your industry?',
        description: 'Competitive landscape analysis helps determine urgency and investment level needed.',
        type: 'radio',
        required: true,
        options: [
          'Not relevant yet - competitors aren\'t using AI',
          'Some competitors experimenting but not essential',
          'Early adopters gaining advantages we need to match',
          'Critical - we risk being left behind without AI',
          'AI capabilities are essential for our business model'
        ]
      },
      {
        id: 'decision-speed',
        text: 'How quickly can your organization typically move from idea to pilot implementation?',
        description: 'Decision-making speed affects how we recommend structuring your AI implementation roadmap.',
        type: 'radio',
        required: true,
        options: [
          'Very slow (6+ months) - extensive approvals needed',
          'Moderate (3-6 months) - structured planning process',
          'Fast (1-3 months) - streamlined decision-making',
          'Very fast (under 1 month) - can move quickly on opportunities'
        ]
      },
      {
        id: 'biggest-blocker',
        text: 'What\'s the main challenge preventing you from defining AI use-cases?',
        description: 'Share any specific obstacles you\'re facing. This helps us provide targeted recommendations.',
        type: 'textarea',
        required: false
      },
      {
        id: 'ai-strategy-owner',
        text: 'Who is directly responsible for leading and updating your AI strategy?',
        description: 'Clear ownership ensures AI initiatives have proper guidance, accountability, and strategic direction.',
        type: 'radio',
        required: true,
        options: [
          'No clear owner',
          'Executive sponsor (C-level/founder)',
          'Designated AI lead/team',
          'Cross-functional committee',
          'Outsourced/consultant'
        ]
      },
      {
        id: 'strategy-review-frequency',
        text: 'How often is your AI strategy formally reviewed and updated?',
        description: 'Regular strategy reviews ensure your AI initiatives remain aligned with business goals and market changes.',
        type: 'radio',
        required: true,
        options: [
          'Never',
          'Ad-hoc/as needed',
          'Annually',
          'Bi-annually',
          'Quarterly or more'
        ]
      }
    ]
  },
  {
    id: 'financial-readiness',
    title: 'Financial & Strategic Readiness',
    description: 'Assesses your current budget capacity, funding runway, investor alignment, and clarity on measuring AI ROI.',
    detailedDescription: 'Understanding your financial constraints and stakeholder support helps us recommend sustainable AI adoption strategies that fit your budget and timeline.',
    weight: '10%',
    estimatedTime: '5 minutes',
    questions: [
      {
        id: 'monthly-budget',
        text: 'What\'s your current or planned monthly budget for AI projects?',
        description: 'This helps us recommend solutions that fit your investment capacity and suggest appropriate pilot scales.',
        type: 'radio',
        required: true,
        options: [
          'Less than $100',
          '$100–300',
          '$300–1,000',
          '$1,000–3,000',
          'Over $3,000',
          'No budget, but willing to fund initial pilots',
          'Willing to increase if pilot results are positive',
          'Depends on ROI',
          'Not sure yet'
        ]
      },
      {
        id: 'annual-budget-share',
        text: 'How much of your annual tech budget is set aside for data & AI?',
        description: 'Understanding your strategic allocation helps gauge organizational commitment to AI transformation.',
        type: 'radio',
        required: true,
        options: [
          '0–5%',
          '6–15%',
          '16–30%',
          'Over 30%',
          'No dedicated budget',
          'Not sure'
        ]
      },
      {
        id: 'funding-runway',
        text: 'How long could you fund AI initiatives with current resources?',
        description: 'Your funding runway determines the scope and timeline we can recommend for your AI roadmap.',
        type: 'radio',
        required: true,
        options: [
          'Less than 3 months',
          '3–6 months',
          '6–12 months',
          'Over 12 months',
          'Not sure'
        ]
      },
      {
        id: 'investor-commitment',
        text: 'How supportive are your investors or board of AI efforts?',
        description: 'Stakeholder alignment affects implementation speed and the level of experimentation you can pursue.',
        type: 'radio',
        required: true,
        options: [
          'Yes – budget approved and allocated',
          'Approved in principle, awaiting results',
          'Discussions in progress',
          'Not yet, but open to it',
          'No, not supportive currently'
        ]
      },
      {
        id: 'investor-context',
        text: 'Share any additional details or concerns from your investors or board.',
        description: 'Optional context about stakeholder perspectives helps us tailor our recommendations.',
        type: 'textarea',
        required: false
      },
      {
        id: 'expected-timeline',
        text: 'When do you expect to realize real benefits from AI?',
        description: 'Your timeline expectations help us recommend the right balance of quick wins vs. strategic investments.',
        type: 'radio',
        required: true,
        options: [
          'Less than 1 month',
          '1–3 months',
          '3–6 months',
          '6–12 months',
          'Over 12 months'
        ]
      },
      {
        id: 'compliance-frameworks',
        text: 'Which regulatory frameworks apply to your business?',
        description: 'Compliance requirements affect AI solution design, data handling, and deployment approaches.',
        type: 'multiselect',
        required: true,
        options: [
          'GDPR',
          'HIPAA',
          'SOC 2',
          'PCI-DSS',
          'AI Act (EU)',
          'ISO/IEC 27001',
          'None',
          'Not sure / researching',
          'Other'
        ]
      },
      {
        id: 'success-metrics',
        text: 'Which metrics will you use to measure AI success?',
        description: 'Clear success metrics ensure we can track progress and demonstrate ROI from your AI initiatives.',
        type: 'multiselect',
        required: true,
        options: [
          'Time saved',
          'Cost reduction',
          'Revenue uplift',
          'Lead generation / conversion',
          'Customer satisfaction / NPS',
          'Operational reliability',
          'Employee engagement',
          'Model performance (accuracy, precision, etc.)',
          'Process improvement (cycle time, error reduction)',
          'We don\'t currently measure success',
          'Other'
        ]
      },
      {
        id: 'financial-tracking',
        text: 'How do you currently measure and track ROI from technology investments?',
        description: 'Your existing measurement sophistication helps us recommend appropriate tracking approaches for AI.',
        type: 'radio',
        required: true,
        options: [
          'No systematic tracking – assume success if no major issues',
          'Basic tracking of costs and obvious benefits',
          'Good measurement with clear metrics and regular reviews',
          'Sophisticated analytics with detailed ROI optimization'
        ]
      },
      {
        id: 'strategic-partnerships',
        text: 'Do you have partnerships or vendor support for your AI initiatives?',
        description: 'Existing partnerships can accelerate implementation or may need coordination in our recommendations.',
        type: 'radio',
        required: false,
        options: [
          'No',
          'Informal collaborations',
          'Formal partnerships (signed agreements)',
          'Multiple partnerships across R&D, vendors, and services'
        ]
      },
      {
        id: 'ai-budget-prioritization',
        text: 'How is AI prioritized relative to other technology investments in your budget planning?',
        description: 'Budget prioritization reflects organizational commitment and determines resource allocation for AI initiatives.',
        type: 'radio',
        required: true,
        options: [
          'Top priority, receives dedicated funding',
          'Equal priority to other tech investments',
          'Lower priority, funded only if surplus',
          'Not considered separately in budgeting'
        ]
      },
      {
        id: 'long-term-financial-plan',
        text: 'Do you have a long-term financial plan to sustain and scale AI investments?',
        description: 'Long-term financial planning ensures sustainable AI growth and prevents short-term budget constraints from limiting success.',
        type: 'radio',
        required: true,
        options: [
          'Yes, covers both short- and long-term',
          'Yes, but only for the next 12 months',
          'No, planning is ad hoc/project-based',
          'No plan in place'
        ]
      }
    ]
  },
  {
    id: 'data-maturity',
    title: 'Data Maturity & Governance',
    description: 'Assesses your data infrastructure, governance, privacy, and security controls to determine if your data foundation is ready for AI.',
    detailedDescription: 'Your data foundation is critical for AI success. This section evaluates how well-structured, governed, and secure your data is.',
    weight: '15%',
    estimatedTime: '5-6 minutes',
    questions: [
      {
        id: 'data-storage',
        text: 'Where do you keep your critical business data?',
        description: 'Understanding your data storage helps us assess integration complexity and recommend appropriate AI solutions.',
        type: 'multiselect',
        required: true,
        options: [
          'Google Sheets / Excel',
          'Airtable / Notion',
          'Internal database / data warehouse',
          'CRM (e.g., HubSpot, Salesforce)',
          'Cloud storage (e.g., Drive, Dropbox, S3)',
          'External SaaS tools / silos',
          'Not centralized yet',
          'Other'
        ]
      },
      {
        id: 'data-consistency',
        text: 'How standardized is your data structure and labeling across systems?',
        description: 'Consistent data structure is essential for reliable AI model performance and accurate insights.',
        type: 'radio',
        required: true,
        options: [
          'Not structured at all',
          'Partially structured in some tools',
          'Mostly structured and tagged with conventions',
          'Fully standardized, documented, and version-controlled'
        ]
      },
      {
        id: 'data-governance',
        text: 'Do you have a formal data governance policy?',
        description: 'Data governance ensures data quality, security, and compliance - critical for enterprise AI deployment.',
        type: 'radio',
        required: true,
        options: [
          'None in place',
          'Informal guidelines only',
          'Policy exists for critical data assets',
          'Formal policy applied across all teams with enforcement'
        ]
      },
      {
        id: 'data-ownership',
        text: 'Who is accountable for maintaining data quality and managing access?',
        description: 'Clear data ownership ensures accountability and proper maintenance of your AI data pipeline.',
        type: 'radio',
        required: true,
        options: [
          'No clear owner',
          'Tech / engineering team',
          'Department leads share responsibility',
          'Dedicated data steward / team'
        ]
      },
      {
        id: 'data-confidence',
        text: 'How confident are you in the quality and up-to-dateness of your data?',
        description: 'Data quality directly impacts AI model accuracy and business decision reliability.',
        type: 'radio',
        required: true,
        options: [
          'Low – frequent discrepancies',
          'Moderate – spot-checks only',
          'Good – basic validation rules in place',
          'High – automated tests and alerts'
        ]
      },
      {
        id: 'security-controls',
        text: 'What protective measures do you have in place for data?',
        description: 'Security controls are essential for protecting sensitive data used in AI systems.',
        type: 'multiselect',
        required: true,
        options: [
          'Encryption at rest',
          'Encryption in transit (TLS)',
          'Role-based access control',
          'Audit logs / access tracking',
          'Data-loss prevention tools',
          'Tokenization or anonymization',
          'None'
        ]
      },
      {
        id: 'pii-handling',
        text: 'Do you process personal or sensitive data, and if so, how do you manage it?',
        description: 'Proper PII handling is crucial for compliance and ethical AI deployment.',
        type: 'radio',
        required: true,
        options: [
          'No PII processed',
          'Yes, but no formal process',
          'Yes, with documented GDPR/CCPA compliance',
          'Not sure / reviewing'
        ]
      },
      {
        id: 'audit-readiness',
        text: 'Can you provide records of how AI systems use personal data in compliance with GDPR or AI Act?',
        description: 'Audit readiness ensures you can demonstrate compliance and explain AI decision-making processes.',
        type: 'radio',
        required: true,
        options: [
          'No tracking in place',
          'Partial logs or model usage documentation',
          'Logs available for critical use-cases',
          'Complete audit trail and explainability system in place'
        ]
      },
      {
        id: 'data-preprocessing-consistency',
        text: 'How consistently are your data sets pre-processed and cleaned to be AI-ready?',
        description: 'Consistent data preprocessing ensures reliable AI model performance and reduces time-to-deployment for new AI initiatives.',
        type: 'radio',
        required: true,
        options: [
          'Rarely pre-processed',
          'Sometimes, depending on project',
          'Mostly pre-processed and AI-ready',
          'Fully standardized and automated'
        ]
      },
      {
        id: 'analytics-tools-integration',
        text: 'How advanced and integrated are your analytics tools for AI-related data and projects?',
        description: 'Advanced, integrated analytics tools accelerate AI development and enable more sophisticated data science workflows.',
        type: 'radio',
        required: true,
        options: [
          'General purpose tools only, little AI capability',
          'Some AI-optimized tools, limited integration',
          'AI-optimized tools, moderate integration',
          'Fully integrated, advanced, and scalable for AI'
        ]
      },
      {
        id: 'data-lineage-tracking',
        text: 'Do you track the origin, transformation, and usage of your data (data lineage) for AI models?',
        description: 'Data lineage tracking ensures data quality, enables debugging of AI models, and supports regulatory compliance requirements.',
        type: 'radio',
        required: true,
        options: [
          'No tracking',
          'Some manual logs/project notes',
          'Automated tracking for critical projects only',
          'Comprehensive, automated lineage tracking'
        ]
      },
      {
        id: 'external-data-validation',
        text: 'How do you validate the quality and reliability of external data sources for AI?',
        description: 'External data validation prevents poor-quality data from compromising AI model accuracy and business decisions.',
        type: 'radio',
        required: true,
        options: [
          'No checks',
          'Basic manual checks',
          'Systematic, documented checks',
          'Peer review or third-party audit'
        ]
      },
      {
        id: 'data-anonymization',
        text: 'Are personal or sensitive data sets anonymized before being used in AI applications?',
        description: 'Data anonymization protects user privacy, ensures regulatory compliance, and reduces legal risks in AI deployments.',
        type: 'radio',
        required: true,
        options: [
          'Never',
          'Sometimes, depending on project',
          'Usually, but not always',
          'Always, as part of a formal policy'
        ]
      }
    ]
  },
  {
    id: 'technical-infrastructure',
    title: 'Technical Infrastructure',
    description: 'Assesses your technology stack, integration reliability, automation maturity, and readiness to scale AI-driven workflows.',
    detailedDescription: 'Your technical foundation determines how easily we can integrate AI solutions and scale them across your organization.',
    weight: '15%',
    estimatedTime: '5-6 minutes',
    questions: [
      {
        id: 'digital-platforms',
        text: 'Which digital tools and platforms does your team rely on?',
        description: 'Understanding your tech stack helps us recommend AI integrations that work seamlessly with your existing tools.',
        type: 'multiselect',
        required: true,
        options: [
          'Communication (Slack, Teams, Discord)',
          'Docs & Knowledge (Google Docs, Notion, Office 365)',
          'Project & Issue Tracking (Trello, Asana, ClickUp, Jira)',
          'CRM & Revenue (HubSpot, Salesforce, Pipedrive)',
          'Design / Creative (Figma, Canva, Adobe XD)',
          'Development & Repos (GitHub, GitLab, Replit)',
          'Analytics & BI (GA4, Looker, Mixpanel, Amplitude)',
          'Advertising (Meta Ads, Google Ads, LinkedIn Ads)',
          'Marketing Automation (Brevo, Mailchimp, ActiveCampaign)',
          'E-commerce (Shopify, WooCommerce, Prestashop)',
          'Finance & Billing (Stripe, QuickBooks, Pennylane)',
          'Automation (Zapier, Make, n8n)',
          'Other'
        ]
      },
      {
        id: 'tool-integration',
        text: 'How well are your tools and systems connected to each other?',
        description: 'Integration level affects how easily we can deploy AI solutions that work across your entire workflow.',
        type: 'radio',
        required: true,
        options: [
          'Fully integrated – seamless data flow',
          'Partially integrated – key systems only',
          'Mostly siloed – manual exports needed',
          'Not sure'
        ]
      },
      {
        id: 'integration-reliability',
        text: 'How stable are your data connections and automations?',
        description: 'System reliability determines the level of AI automation we can recommend and trust for critical processes.',
        type: 'radio',
        required: true,
        options: [
          'Frequently – weekly issues',
          'Occasionally – monthly issues',
          'Rarely – few problems per quarter',
          'Never – reliable'
        ]
      },
      {
        id: 'implementation-ownership',
        text: 'Who is responsible for implementing tools and integrations?',
        description: 'Understanding your technical resources helps us recommend the right level of AI solution complexity.',
        type: 'radio',
        required: true,
        options: [
          'Internal tech / engineering team',
          'Operations or product team',
          'External agency / contractor',
          'No dedicated owner'
        ]
      },
      {
        id: 'manual-transfers',
        text: 'Where do you still manually move or copy-paste data?',
        description: 'Manual data transfers are prime candidates for AI automation and efficiency improvements.',
        type: 'multiselect',
        required: true,
        options: [
          'CRM → spreadsheet',
          'Email → reports / docs',
          'Project tools → docs / slides',
          'Dashboard → dashboard consolidation',
          'Other'
        ]
      },
      {
        id: 'automation-comfort',
        text: 'How comfortable are you personally with building automations?',
        description: 'Your technical comfort level helps us recommend the right balance of self-service vs. managed AI solutions.',
        type: 'radio',
        required: true,
        options: [
          'Very comfortable – build from scratch',
          'Can follow guides',
          'Need support',
          'Not my role'
        ]
      },
      {
        id: 'automation-platforms',
        text: 'Which automation tools are you currently using?',
        description: 'Existing automation experience indicates readiness for more advanced AI-powered workflow optimization.',
        type: 'multiselect',
        required: true,
        options: [
          'Zapier',
          'Make (Integromat)',
          'n8n',
          'None yet',
          'Other'
        ]
      },
      {
        id: 'system-reliability',
        text: 'How often do your critical systems experience downtime or performance issues?',
        description: 'System reliability affects our AI deployment strategy and the level of redundancy we recommend.',
        type: 'radio',
        required: true,
        options: [
          'Frequent issues (weekly problems affecting productivity)',
          'Occasional issues (monthly disruptions)',
          'Rare issues (quarterly minor problems)',
          'Highly reliable (minimal downtime, strong monitoring)'
        ]
      },
      {
        id: 'gpu-compute-resources',
        text: 'Do you have access to dedicated GPU or high-performance compute resources for AI workloads?',
        description: 'High-performance computing resources are essential for training and running advanced AI models efficiently.',
        type: 'radio',
        required: true,
        options: [
          'None',
          'Experimental/sandbox only',
          'Sufficient for current projects',
          'Scalable and ready for future growth'
        ]
      },
      {
        id: 'resource-allocation-scaling',
        text: 'How are compute/network resources allocated and scaled for new AI workloads?',
        description: 'Resource allocation strategy affects how quickly you can deploy and scale AI solutions.',
        type: 'radio',
        required: true,
        options: [
          'Manual, ad hoc',
          'Automated for some workloads',
          'Mostly automated with some manual oversight',
          'Fully automated and demand-driven'
        ]
      },
      {
        id: 'high-throughput-systems',
        text: 'Are your IT/network systems designed for high-throughput, low-latency AI data operations?',
        description: 'Network and data infrastructure capabilities determine real-time AI application performance.',
        type: 'radio',
        required: true,
        options: [
          'Not at all',
          'Somewhat, only for pilot projects',
          'Designed for moderate scaling',
          'Fully designed for enterprise AI scale'
        ]
      },
      {
        id: 'ai-specific-security',
        text: 'Do you have security measures specific to AI and ML workloads (beyond general IT security)?',
        description: 'AI workloads require specialized security considerations for models, data, and inference pipelines.',
        type: 'radio',
        required: true,
        options: [
          'None',
          'Under review/consideration',
          'Some controls in place',
          'Comprehensive and regularly updated'
        ]
      },
      {
        id: 'power-energy-impact',
        text: 'Have you assessed and planned for the power/energy impact of scaling AI infrastructure?',
        description: 'AI infrastructure can significantly impact energy consumption and operational costs.',
        type: 'radio',
        required: true,
        options: [
          'Not considered',
          'Limited awareness',
          'Under assessment/planning',
          'Fully planned and optimized'
        ]
      }
    ]
  },
  {
    id: 'automation-ai-agents',
    title: 'Automation & AI Agents',
    description: 'Surfaces workflow bottlenecks, automation opportunities, team readiness, and preferences for deploying AI assistants.',
    detailedDescription: 'This section identifies the best opportunities for AI agents and automation to maximize your team\'s productivity and efficiency.',
    weight: '20%',
    estimatedTime: '6-8 minutes',
    questions: [
      {
        id: 'repetitive-tasks',
        text: 'Which tasks regularly consume staff time and could be improved or automated?',
        description: 'Identifying repetitive tasks helps us prioritize the highest-impact AI automation opportunities.',
        type: 'multiselect',
        required: true,
        options: [
          'Reporting / dashboard updates',
          'Scheduling meetings or reminders',
          'Email or Slack follow-ups',
          'Data entry / copy-paste',
          'Answering routine client questions / FAQs',
          'Internal status updates',
          'Ticket tagging or triage',
          'Other'
        ]
      },
      {
        id: 'manual-customer-journeys',
        text: 'Which customer-facing processes have excessive manual intervention?',
        description: 'Customer journey automation can significantly improve experience while reducing team workload.',
        type: 'multiselect',
        required: true,
        options: [
          'Onboarding',
          'Support request resolution',
          'Invoicing & payments',
          'FAQ handling',
          'Community moderation',
          'None / N.A.'
        ]
      },
      {
        id: 'automated-alerts',
        text: 'Have you set up automated alerts for your workflows?',
        description: 'Existing alert systems indicate automation maturity and readiness for more sophisticated AI monitoring.',
        type: 'radio',
        required: true,
        options: [
          'Yes – fully reliable',
          'Partially – only for critical events',
          'None – manual monitoring'
        ]
      },
      {
        id: 'top-automation-priority',
        text: 'Which process would you prioritize for automation?',
        description: 'Understanding your top priority helps us focus our AI recommendations on your most pressing needs.',
        type: 'textarea',
        required: false
      },
      {
        id: 'never-automate',
        text: 'Which processes must remain human-managed?',
        description: 'Identifying processes that should stay human ensures our AI recommendations respect your business values and requirements.',
        type: 'textarea',
        required: false
      },
      {
        id: 'ai-agent-tasks',
        text: 'Identify areas where an AI assistant could provide immediate value.',
        description: 'These represent the quickest wins for AI agent deployment in your organization.',
        type: 'multiselect',
        required: true,
        options: [
          'Customer support (chat / email)',
          'Report generation & insights',
          'Drafting emails or messages',
          'Lead qualification & scoring',
          'Summarizing meetings & action items',
          'Market / competitor research',
          'Onboarding flows & checklist enforcement',
          'Monitoring & alerts',
          'Other'
        ]
      },
      {
        id: 'agent-autonomy',
        text: 'How much control should you retain when using AI assistants?',
        description: 'Your comfort with AI autonomy determines the type of agents we recommend and how they\'re deployed.',
        type: 'radio',
        required: true,
        options: [
          'Fully autonomous – end-to-end execution',
          'Human-in-the-loop – requires approval before action',
          'Assistant only – suggests, no execution',
          'Not sure yet'
        ]
      },
      {
        id: 'agent-interface',
        text: 'How would you prefer to interact with an AI agent?',
        description: 'Interface preference affects user adoption and determines the best deployment approach for your team.',
        type: 'multiselect',
        required: true,
        options: [
          'Chatbot in Slack / Teams',
          'Embedded widget (in Notion, CRM, etc.)',
          'Stand-alone dashboard interface',
          'Email-based assistant',
          'Command-line / API',
          'Need guidance'
        ]
      },
      {
        id: 'deployment-blockers',
        text: 'What challenges could delay or complicate AI agent deployment?',
        description: 'Understanding potential blockers helps us design implementation strategies that address your specific constraints.',
        type: 'multiselect',
        required: true,
        options: [
          'Data not ready / too siloed',
          'Team not aligned on use-cases',
          'Lack of technical support',
          'Budget constraints',
          'Privacy or compliance concerns',
          'Unclear ROI',
          'Other'
        ]
      },
      {
        id: 'agent-data-access',
        text: 'Which data sources would an agent need access to?',
        description: 'Data access requirements help us design secure, effective AI agents that can provide meaningful assistance.',
        type: 'multiselect',
        required: true,
        options: [
          'Customer records / CRM',
          'Product usage events',
          'Financial / billing data',
          'Knowledge base / Docs / FAQs',
          'Operations / logistics tables',
          'None / unsure yet',
          'Other'
        ]
      },
      {
        id: 'process-documentation',
        text: 'How well documented are your current workflows and processes?',
        description: 'Process documentation quality affects how quickly we can deploy AI agents and how accurately they can assist your team.',
        type: 'radio',
        required: true,
        options: [
          'Mostly undocumented – knowledge in people\'s heads',
          'Basic documentation for some key processes',
          'Good documentation that\'s regularly updated',
          'Comprehensive, detailed process documentation with clear standards'
        ]
      },
      {
        id: 'automation-maturity',
        text: 'How successful have your previous automation efforts been?',
        description: 'Past automation experience indicates your team\'s readiness for more advanced AI-powered automation.',
        type: 'radio',
        required: true,
        options: [
          'No significant automation attempts yet',
          'Basic automation with mixed results and frequent maintenance needs',
          'Good automation success with reliable workflows for routine tasks',
          'Advanced automation with sophisticated workflows and monitoring',
          'Comprehensive automation strategy with continuous optimization'
        ]
      },
      {
        id: 'ai-agent-access-controls',
        text: 'How are permissions and access controls managed for AI agents interacting with sensitive data or systems?',
        description: 'Proper access controls ensure AI agents operate securely within appropriate boundaries.',
        type: 'radio',
        required: true,
        options: [
          'No specific controls',
          'Manual controls, project by project',
          'Automated access controls for critical systems',
          'Dynamic, real-time access control with auditing'
        ]
      }
    ]
  },
  {
    id: 'team-ai-literacy',
    title: 'Team AI Literacy & Development',
    description: 'Assesses team experience, skill levels, knowledge-sharing, upskilling, and responsibility for AI initiatives.',
    detailedDescription: 'Understanding your team\'s AI experience and learning culture helps us recommend the right training and support approaches.',
    weight: '15%',
    estimatedTime: '5-6 minutes',
    questions: [
      {
        id: 'current-ai-tools',
        text: 'Which AI-powered tools are already in use by your team?',
        description: 'Current AI tool usage indicates your team\'s comfort level and existing familiarity with AI workflows.',
        type: 'multiselect',
        required: true,
        options: [
          'ChatGPT (OpenAI)',
          'Claude (Anthropic)',
          'Custom GPTs / assistants',
          'Notion AI',
          'Canva AI / Copy.ai (content creation)',
          'GitHub Copilot / Replit / Ghostwriter (coding)',
          'None yet',
          'Other'
        ]
      },
      {
        id: 'ai-usage-frequency',
        text: 'How often do team members use AI tools in their tasks?',
        description: 'Usage frequency indicates adoption readiness and potential resistance to new AI implementations.',
        type: 'radio',
        required: true,
        options: [
          'Daily',
          'Weekly',
          'Occasionally',
          'Rarely',
          'Never'
        ]
      },
      {
        id: 'ai-use-cases',
        text: 'What do you currently use AI tools for?',
        description: 'Current use cases help us understand where your team sees value and where we can expand AI adoption.',
        type: 'multiselect',
        required: true,
        options: [
          'Content creation & copywriting',
          'Data analysis & insights',
          'Coding & code review',
          'Brainstorming / ideation',
          'Summarizing meetings / memos',
          'Customer support responses',
          'Reporting & slide generation',
          'Other'
        ]
      },
      {
        id: 'skill-exposure-level',
        text: 'Which best describes your team\'s combined familiarity and practice with AI tools?',
        description: 'Skill level determines the complexity of AI solutions we can recommend and the training support needed.',
        type: 'radio',
        required: true,
        options: [
          'Beginner – under 1 hour learning, basic usage',
          'Explorer – 1–5 hours, reuse & tweak prompts',
          'Practitioner – 6–20 hours, write structured prompts',
          'Power User – over 20 hours, builds prompt chains & workflows',
          'Highly varied across team'
        ]
      },
      {
        id: 'knowledge-sharing',
        text: 'How does your team share knowledge around AI usage?',
        description: 'Knowledge sharing culture affects how quickly new AI tools and techniques will be adopted across your team.',
        type: 'radio',
        required: true,
        options: [
          'Yes – regularly share tips, maintain a library',
          'Occasionally share tips',
          'Mostly siloed – minimal sharing',
          'Did not know this was possible / allowed'
        ]
      },
      {
        id: 'upskilling-approach',
        text: 'How is your team building skills around AI?',
        description: 'Your current upskilling approach helps us recommend appropriate training and support strategies.',
        type: 'radio',
        required: true,
        options: [
          'No formal upskilling approach yet',
          'Ad-hoc self-learning',
          'Dedicated training budget (courses, workshops)',
          'Cross-functional AI champions lead sessions',
          'Structured curriculum with certification roadmap'
        ]
      },
      {
        id: 'ai-ownership',
        text: 'How is responsibility for AI distributed in your organization?',
        description: 'AI ownership structure affects implementation speed and the level of coordination needed for success.',
        type: 'radio',
        required: true,
        options: [
          'No owner yet – looking for one',
          'Single champion (part-time)',
          '2–3 cross-functional leads',
          'Dedicated AI / data squad',
          'Outsourced to external advisors or consultants'
        ]
      },
      {
        id: 'learning-adaptability',
        text: 'How quickly does your team typically adapt to new tools and technologies?',
        description: 'Learning pace affects our rollout strategy and the timeline for realizing AI benefits.',
        type: 'radio',
        required: true,
        options: [
          'Slow adoption (several months to see regular usage)',
          'Moderate adoption (4–8 weeks with training support)',
          'Fast adoption (2–4 weeks with good onboarding)',
          'Very fast adoption (within 1–2 weeks, largely self-directed)'
        ]
      },
      {
        id: 'ai-accessibility',
        text: 'How does your organization ensure AI tools and workflows are accessible to differently abled employees?',
        description: 'Inclusive AI design ensures all team members can benefit from AI tools and workflows.',
        type: 'radio',
        required: true,
        options: [
          'Not considered',
          'Limited awareness, no action',
          'Ad-hoc adjustments as needed',
          'Proactively included in all adoption and training'
        ]
      },
      {
        id: 'ai-talent-strategy',
        text: 'What is your approach to attracting and retaining top AI talent?',
        description: 'Having the right AI talent is crucial for successful AI implementation and innovation.',
        type: 'radio',
        required: true,
        options: [
          'No specific strategy',
          'Rely on external partners',
          'Basic retention/hiring programs',
          'Comprehensive talent pipeline and retention plan'
        ]
      }
    ]
  },
  {
    id: 'ethics-experimentation',
    title: 'Ethics & Experimentation',
    description: 'Assesses how your organization manages AI risks, fairness, transparency, and experimentation practices.',
    detailedDescription: 'Responsible AI deployment requires proper risk management, ethics consideration, and systematic experimentation approaches.',
    weight: '10%',
    estimatedTime: '5 minutes',
    questions: [
      {
        id: 'ai-risk-management',
        text: 'How does your team handle risks, bias, and potential ethical concerns in AI systems?',
        description: 'Risk management approach determines the safeguards we need to build into your AI implementations.',
        type: 'radio',
        required: true,
        options: [
          'Reactive – fix issues as they appear',
          'Basic – pre-launch bias checks on models',
          'Regular – ethics reviews & audits each release cycle',
          'Integrated – formal risk framework and sign-off workflow'
        ]
      },
      {
        id: 'model-explainability',
        text: 'How transparent are your AI systems and outputs?',
        description: 'Explainability requirements affect the types of AI models and deployment approaches we can recommend.',
        type: 'radio',
        required: true,
        options: [
          'None – black-box models, no records kept',
          'Partial – logs only for major models',
          'Good – explanations available for critical models',
          'Comprehensive – explanations and audit logs for all models'
        ]
      },
      {
        id: 'experimentation-cadence',
        text: 'How often does your team experiment with new AI features or models?',
        description: 'Experimentation frequency indicates your organization\'s innovation culture and readiness for continuous AI improvement.',
        type: 'radio',
        required: true,
        options: [
          'Rare / ad-hoc',
          'Quarterly pilots',
          'Monthly experiments',
          'Continuous – weekly or faster iterations'
        ]
      },
      {
        id: 'failure-strategy',
        text: 'What happens when an AI model or feature doesn\'t work as expected?',
        description: 'Failure handling strategy affects the resilience and reliability of AI systems we can recommend.',
        type: 'radio',
        required: true,
        options: [
          'Manual fixes by the team',
          'Monitoring alerts + manual rollback',
          'Automated rollback to prior stable version',
          'Self-healing systems with automated rollback & logging'
        ]
      },
      {
        id: 'ethics-owner',
        text: 'Who is responsible for ensuring ethical AI practices in your company?',
        description: 'Ethics ownership ensures accountability and proper governance for your AI initiatives.',
        type: 'radio',
        required: true,
        options: [
          'No one yet',
          'Founder / C-level assumes role',
          'Dedicated ethics lead or committee',
          'External advisors / legal counsel'
        ]
      },
      {
        id: 'failure-tolerance',
        text: 'How does your organization handle failed experiments or unsuccessful pilots?',
        description: 'Failure tolerance affects the types of AI experiments we can recommend and the innovation pace we can achieve.',
        type: 'radio',
        required: true,
        options: [
          'Avoid failure – stick to proven approaches only',
          'Learn from failure but discourage risk-taking',
          'Encourage smart risks with systematic learning from failures',
          'Celebrate intelligent failures as essential for innovation'
        ]
      },
      {
        id: 'ai-bias-fairness',
        text: 'Do you regularly check for and address fairness and bias in your AI algorithms?',
        description: 'Regular bias monitoring ensures AI systems make fair decisions and avoid discriminatory outcomes.',
        type: 'radio',
        required: true,
        options: [
          'Never',
          'Occasionally, on a project basis',
          'Regularly, using automated tools or audits',
          'Continuously monitored and adjusted'
        ]
      },
      {
        id: 'cross-border-data-compliance',
        text: 'Do you have protocols for handling cross-border data transfers and compliance with data sovereignty laws?',
        description: 'International data compliance is crucial for global AI deployments and avoiding regulatory penalties.',
        type: 'radio',
        required: true,
        options: [
          'No protocols in place',
          'Limited awareness, ad hoc approach',
          'Formal protocols for key markets',
          'Comprehensive and regularly reviewed for all markets'
        ]
      }
    ]
  },
  {
    id: 'metadata-respondent-info',
    title: 'Metadata & Respondent Info',
    description: 'Used to personalize your report, segment results, and ensure relevant recommendations.',
    detailedDescription: 'This information helps us provide personalized insights and recommendations tailored to your specific context and industry.',
    weight: '5%',
    estimatedTime: '3-4 minutes',
    questions: [
      {
        id: 'email',
        text: 'Where should we send your personalized report?',
        description: 'Required for delivering your assessment results and insights.',
        type: 'text',
        required: true
      },
      {
        id: 'full-name',
        text: 'Full Name',
        description: 'Used for personalization and direct communication.',
        type: 'text',
        required: false
      },
      {
        id: 'role',
        text: 'Select the option that best describes your role:',
        description: 'Your role helps us tailor recommendations to your perspective and responsibilities.',
        type: 'dropdown',
        required: true,
        options: [
          'Founder',
          'C-level / Executive',
          'Operations',
          'Product',
          'Technical',
          'Other'
        ]
      },
      {
        id: 'company-name',
        text: 'Company Name',
        description: 'Optional field for report personalization.',
        type: 'text',
        required: false
      },
      {
        id: 'company-size',
        text: 'How many people work at your company?',
        description: 'Company size affects our recommendations for AI implementation scale and approach.',
        type: 'dropdown',
        required: true,
        options: [
          '1–5',
          '6–10',
          '11–20',
          '21–50',
          '51–100',
          '101–250',
          '251+'
        ]
      },
      {
        id: 'country',
        text: 'Country',
        description: 'Used for regional compliance and regulatory considerations.',
        type: 'dropdown',
        required: true,
        options: [
          'United States',
          'United Kingdom',
          'Germany',
          'France',
          'Canada',
          'Australia',
          'Netherlands',
          'Spain',
          'Italy',
          'Sweden',
          'Norway',
          'Denmark',
          'Finland',
          'Switzerland',
          'Austria',
          'Belgium',
          'Ireland',
          'Portugal',
          'Poland',
          'Japan',
          'South Korea',
          'Singapore',
          'Hong Kong',
          'New Zealand',
          'Brazil',
          'Mexico',
          'India',
          'South Africa',
          'Israel',
          'Other'
        ]
      },
      {
        id: 'sector-industry',
        text: 'Sector / Industry',
        description: 'Industry context helps us provide sector-specific AI recommendations.',
        type: 'dropdown',
        required: true,
        options: [
          'Technology & Software',
          'Healthcare & Life Sciences',
          'Financial Services & Insurance',
          'Manufacturing & Industrial',
          'Retail & E-commerce',
          'Professional Services',
          'Education & Training',
          'Media & Entertainment',
          'Real Estate & Construction',
          'Transportation & Logistics',
          'Energy & Utilities',
          'Agriculture & Food',
          'Telecommunications',
          'Government & Public Sector',
          'Non-profit & NGO',
          'Automotive',
          'Aerospace & Defense',
          'Pharmaceuticals & Biotech',
          'Legal Services',
          'Marketing & Advertising',
          'Hospitality & Tourism',
          'Other'
        ]
      },
      {
        id: 'annual-revenue',
        text: 'What is your company\'s approximate annual revenue?',
        description: 'Revenue range helps us recommend AI solutions appropriate for your scale and budget.',
        type: 'dropdown',
        required: true,
        options: [
          'Less than €250k',
          '€250k–1M',
          '€1M–5M',
          '€5M–20M',
          'More than €20M'
        ]
      },
      {
        id: 'regulated-industry',
        text: 'Does your business operate in a regulated industry (e.g., healthcare, finance, etc.)?',
        description: 'Regulatory status affects compliance requirements for AI implementations.',
        type: 'radio',
        required: true,
        options: [
          'Yes',
          'No',
          'Not sure'
        ]
      },
      {
        id: 'website',
        text: 'Website',
        description: 'Optional field for additional context.',
        type: 'text',
        required: false
      },
      {
        id: 'personal-ai-maturity',
        text: 'How would you rate your personal familiarity with AI tools?',
        description: 'Your personal AI experience helps us calibrate recommendations to your knowledge level.',
        type: 'radio',
        required: true,
        options: [
          '1 (Beginner)',
          '2',
          '3',
          '4',
          '5 (Expert)'
        ]
      },
      {
        id: 'team-ai-maturity',
        text: 'How would you rate your team\'s overall AI familiarity and usage?',
        description: 'Team AI maturity affects implementation complexity and training requirements.',
        type: 'radio',
        required: true,
        options: [
          '1 (None)',
          '2',
          '3',
          '4',
          '5 (Fully integrated)'
        ]
      },
      {
        id: 'priority-timeframe',
        text: 'What timeframe best reflects your current AI priorities?',
        description: 'Priority timeframe helps us recommend the right balance of quick wins vs. strategic investments.',
        type: 'radio',
        required: true,
        options: [
          'Quick Wins (0–1 month)',
          'Mid-Term ROI (1–3 months)',
          'Long-Term Strategy (3–6 months)'
        ]
      }
    ]
  }
];