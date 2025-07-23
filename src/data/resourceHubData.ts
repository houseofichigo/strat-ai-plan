import { 
  FileText, Building2, Code, Shield, HelpCircle, MessageCircle,
  Download, ExternalLink, Star, Calendar, Award, Users, TrendingUp
} from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  summary: string;
  category: string;
  type: 'playbook' | 'case-study' | 'integration' | 'compliance' | 'faq' | 'community';
  tags: string[];
  lastUpdated: string;
  rating: number;
  downloadable: boolean;
  complexity?: 'Easy' | 'Medium' | 'Hard';
  sector?: string;
  department?: string;
  companySize?: string;
  platform?: string;
  views?: number;
  downloads?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export interface CommunityQA {
  id: string;
  question: string;
  answer: string;
  upvotes: number;
  date: string;
  tags: string[];
  editorChoice: boolean;
}

export const resourceHubData = {
  categories: [
    {
      id: 'playbooks',
      name: 'Best Practice Playbooks & Templates',
      description: 'Step-by-step, actionable guides for deploying, scaling, and measuring AI/automation with downloadable templates.',
      icon: FileText
    },
    {
      id: 'case-studies',
      name: 'Case Studies & Success Stories',
      description: 'Real-world impact stories with before/after metrics and "how we did it" lessons from leading organizations.',
      icon: Building2
    },
    {
      id: 'integrations',
      name: 'Integration Guides & API Recipes',
      description: 'Visual, step-by-step instructions for connecting to leading apps with copy-paste scripts and troubleshooting tips.',
      icon: Code
    },
    {
      id: 'compliance',
      name: 'Regulatory & Compliance Updates',
      description: 'Curated summaries for GDPR, AI Act, CCPA, and industry-specific rules with actionable checklists.',
      icon: Shield
    },
    {
      id: 'faq',
      name: 'FAQ & Troubleshooting Guides',
      description: 'Comprehensive FAQ and self-service troubleshooting for platform, adoption, compliance, and technical issues.',
      icon: HelpCircle
    },
    {
      id: 'community',
      name: 'Community Q&A and Peer Tips',
      description: 'Curated user-submitted Q&A, practical field-tested tips, and "how I solved it" stories from the community.',
      icon: MessageCircle
    }
  ] as Category[],

  editorsPicks: [
    {
      id: 'ep-1',
      title: 'AI Implementation Playbook: From Strategy to Scale',
      summary: 'A comprehensive 50-page guide covering the complete AI implementation journey, from initial assessment to enterprise-wide scaling.',
      category: 'playbooks',
      type: 'playbook',
      tags: ['AI Strategy', 'Implementation', 'Scaling', 'ROI'],
      lastUpdated: '2 days ago',
      rating: 4.9,
      downloadable: true,
      complexity: 'Medium'
    },
    {
      id: 'ep-2',
      title: 'Fortune 500 Manufacturing: 40% Efficiency Gain',
      summary: 'How a global manufacturer achieved 40% efficiency improvement and $2.3M annual savings through intelligent automation.',
      category: 'case-studies',
      type: 'case-study',
      tags: ['Manufacturing', 'ROI', 'Automation', 'Fortune 500'],
      lastUpdated: '1 week ago',
      rating: 4.8,
      downloadable: false,
      sector: 'Manufacturing',
      companySize: 'Enterprise'
    },
    {
      id: 'ep-3',
      title: 'Salesforce + OpenAI Integration Recipe',
      summary: 'Complete integration guide with pre-built workflows, API scripts, and troubleshooting for Salesforce-OpenAI automation.',
      category: 'integrations',
      type: 'integration',
      tags: ['Salesforce', 'OpenAI', 'CRM', 'Automation'],
      lastUpdated: '3 days ago',
      rating: 4.7,
      downloadable: true,
      complexity: 'Easy',
      platform: 'Salesforce'
    }
  ] as Resource[],

  resources: [
    // Playbooks & Templates
    {
      id: 'pb-1',
      title: 'GDPR Compliance Checklist for AI Systems',
      summary: 'Essential checklist covering data processing, consent management, and privacy by design for AI implementations.',
      category: 'playbooks',
      type: 'playbook',
      tags: ['GDPR', 'Compliance', 'Privacy', 'Checklist'],
      lastUpdated: '1 week ago',
      rating: 4.6,
      downloadable: true,
      complexity: 'Medium'
    },
    {
      id: 'pb-2',
      title: 'ROI Measurement Framework for AI Projects',
      summary: 'Proven framework with templates to measure and report AI project ROI with clear KPIs and metrics.',
      category: 'playbooks',
      type: 'playbook',
      tags: ['ROI', 'KPIs', 'Measurement', 'Framework'],
      lastUpdated: '2 weeks ago',
      rating: 4.5,
      downloadable: true,
      complexity: 'Hard'
    },
    {
      id: 'pb-3',
      title: 'Change Management Guide for AI Adoption',
      summary: 'Step-by-step change management playbook to ensure smooth AI adoption across teams and departments.',
      category: 'playbooks',
      type: 'playbook',
      tags: ['Change Management', 'Adoption', 'Training', 'Culture'],
      lastUpdated: '5 days ago',
      rating: 4.7,
      downloadable: true,
      complexity: 'Medium'
    },

    // Case Studies
    {
      id: 'cs-1',
      title: 'Healthcare Provider: 60% Reduction in Administrative Tasks',
      summary: 'Regional healthcare network reduced administrative burden by 60% using AI-powered document processing and scheduling.',
      category: 'case-studies',
      type: 'case-study',
      tags: ['Healthcare', 'Document Processing', 'Scheduling', 'Efficiency'],
      lastUpdated: '3 days ago',
      rating: 4.8,
      downloadable: false,
      sector: 'Healthcare',
      companySize: 'Mid-market'
    },
    {
      id: 'cs-2',
      title: 'Financial Services: Fraud Detection Transformation',
      summary: 'How a regional bank improved fraud detection accuracy by 85% while reducing false positives by 70%.',
      category: 'case-studies',
      type: 'case-study',
      tags: ['Financial Services', 'Fraud Detection', 'Security', 'ML'],
      lastUpdated: '1 week ago',
      rating: 4.6,
      downloadable: false,
      sector: 'Financial Services',
      companySize: 'Mid-market'
    },
    {
      id: 'cs-3',
      title: 'Retail Chain: Personalized Customer Experience',
      summary: 'National retail chain increased conversion rates by 25% through AI-powered personalization and recommendation engines.',
      category: 'case-studies',
      type: 'case-study',
      tags: ['Retail', 'Personalization', 'Recommendations', 'Conversion'],
      lastUpdated: '4 days ago',
      rating: 4.7,
      downloadable: false,
      sector: 'Retail',
      companySize: 'Enterprise'
    },

    // Integrations
    {
      id: 'ig-1',
      title: 'Slack + ChatGPT Bot Setup Guide',
      summary: 'Complete guide to create an intelligent Slack bot using ChatGPT API with code samples and deployment instructions.',
      category: 'integrations',
      type: 'integration',
      tags: ['Slack', 'ChatGPT', 'Bot', 'API'],
      lastUpdated: '2 days ago',
      rating: 4.8,
      downloadable: true,
      complexity: 'Easy',
      platform: 'Slack'
    },
    {
      id: 'ig-2',
      title: 'Zapier AI Workflow Automation Recipes',
      summary: 'Pre-built Zapier workflows for common AI automation tasks including data processing and notifications.',
      category: 'integrations',
      type: 'integration',
      tags: ['Zapier', 'Workflows', 'Automation', 'No-code'],
      lastUpdated: '1 week ago',
      rating: 4.5,
      downloadable: true,
      complexity: 'Easy',
      platform: 'Zapier'
    },
    {
      id: 'ig-3',
      title: 'Power BI + Azure AI Services Integration',
      summary: 'Connect Power BI with Azure Cognitive Services for advanced analytics and AI-powered business intelligence.',
      category: 'integrations',
      type: 'integration',
      tags: ['Power BI', 'Azure AI', 'Analytics', 'Business Intelligence'],
      lastUpdated: '5 days ago',
      rating: 4.4,
      downloadable: true,
      complexity: 'Hard',
      platform: 'Microsoft'
    },

    // Compliance
    {
      id: 'cp-1',
      title: 'EU AI Act Compliance Guide 2024',
      summary: 'Updated guide covering the EU AI Act requirements, risk classifications, and compliance strategies for AI systems.',
      category: 'compliance',
      type: 'compliance',
      tags: ['EU AI Act', 'Compliance', 'Risk Assessment', 'Regulation'],
      lastUpdated: '1 day ago',
      rating: 4.9,
      downloadable: true,
      complexity: 'Hard'
    },
    {
      id: 'cp-2',
      title: 'CCPA Data Privacy for AI Applications',
      summary: 'California Consumer Privacy Act compliance checklist specifically tailored for AI and machine learning applications.',
      category: 'compliance',
      type: 'compliance',
      tags: ['CCPA', 'Privacy', 'California', 'Data Protection'],
      lastUpdated: '3 days ago',
      rating: 4.6,
      downloadable: true,
      complexity: 'Medium'
    },

    // FAQ
    {
      id: 'fq-1',
      title: 'Common AI Implementation Challenges & Solutions',
      summary: 'Frequently asked questions about AI implementation challenges with practical solutions and troubleshooting steps.',
      category: 'faq',
      type: 'faq',
      tags: ['Implementation', 'Troubleshooting', 'Common Issues', 'Solutions'],
      lastUpdated: '2 days ago',
      rating: 4.7,
      downloadable: false
    },
    {
      id: 'fq-2',
      title: 'Platform Technical FAQ & Troubleshooting',
      summary: 'Technical support guide covering common platform issues, error messages, and step-by-step resolution instructions.',
      category: 'faq',
      type: 'faq',
      tags: ['Platform', 'Technical Support', 'Errors', 'Troubleshooting'],
      lastUpdated: '1 day ago',
      rating: 4.5,
      downloadable: false
    }
  ] as Resource[],

  communityQA: [
    {
      id: 'qa-1',
      question: 'How do I measure ROI for AI automation projects in the first 90 days?',
      answer: 'Focus on quick wins and measurable metrics like time saved, error reduction, and process efficiency. Start with baseline measurements before implementation and track weekly progress. Key early indicators include task completion time, accuracy improvements, and user adoption rates.',
      upvotes: 47,
      date: '2 days ago',
      tags: ['ROI', 'Measurement', 'Quick Wins'],
      editorChoice: true
    },
    {
      id: 'qa-2',
      question: 'What are the best practices for training employees on new AI tools?',
      answer: 'Start with hands-on workshops focusing on real business scenarios. Create role-specific training paths, provide sandbox environments for practice, and establish AI champions in each department. Regular feedback sessions and continuous learning resources are essential.',
      upvotes: 32,
      date: '4 days ago',
      tags: ['Training', 'Change Management', 'Best Practices'],
      editorChoice: false
    },
    {
      id: 'qa-3',
      question: 'How can small businesses get started with AI without breaking the budget?',
      answer: 'Begin with free or low-cost AI tools for specific use cases like email automation, basic chatbots, or document processing. Many platforms offer free tiers perfect for testing. Focus on one process at a time and scale gradually as you see results.',
      upvotes: 28,
      date: '1 week ago',
      tags: ['Small Business', 'Budget', 'Getting Started'],
      editorChoice: true
    },
    {
      id: 'qa-4',
      question: 'What security considerations should I keep in mind when implementing AI?',
      answer: 'Data encryption, access controls, model security, and compliance with industry regulations are crucial. Implement zero-trust architecture, regular security audits, and ensure AI models are trained on clean, secure datasets. Always have incident response plans ready.',
      upvotes: 41,
      date: '3 days ago',
      tags: ['Security', 'Data Protection', 'Risk Management'],
      editorChoice: false
    }
  ] as CommunityQA[]
};