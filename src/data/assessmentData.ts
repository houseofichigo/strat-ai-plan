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
      }
    ]
  }
  // Additional sections would be added here following the same pattern
];