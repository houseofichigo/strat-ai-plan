import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PillarDetailModal } from './PillarDetailModal';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  Database,
  Cpu,
  Shield,
  Users,
  Target
} from 'lucide-react';

// Sample pillar data with detailed assessment information
const pillarsData = [
  {
    id: 'data-foundation',
    title: 'Data Foundation',
    icon: Database,
    score: 3.5,
    status: 'strong' as const,
    description: 'Strong data infrastructure with well-organized storage systems and good data quality practices. Some opportunities for advanced governance implementation.',
    dimensions: [
      {
        id: 'data-quality',
        name: 'Data Quality',
        description: 'Accuracy, completeness, and consistency of data',
        score: 3.8,
        questions: [
          {
            id: 'dq1',
            text: 'How confident are you in the quality and up-to-dateness of your data?',
            answer: 'Good – basic validation rules in place',
            impact: 'Strong data validation enables reliable AI model training and accurate business insights.'
          },
          {
            id: 'dq2',
            text: 'How standardized is your data structure and labeling across systems?',
            answer: 'Mostly structured and tagged with conventions',
            impact: 'Consistent data structure reduces preprocessing time and improves model performance.'
          }
        ]
      },
      {
        id: 'data-governance',
        name: 'Data Governance',
        description: 'Policies and processes for data management',
        score: 3.2,
        questions: [
          {
            id: 'dg1',
            text: 'Do you have a formal data governance policy?',
            answer: 'Policy exists for critical data assets',
            impact: 'Formal governance ensures compliance and enables confident AI deployment.'
          }
        ]
      }
    ],
    recommendations: [
      {
        id: 'df1',
        title: 'Implement Advanced Data Lineage Tracking',
        description: 'Deploy automated data lineage tools to track data flow from source to AI models',
        impact: 'High',
        effort: 'Medium',
        priority: 'medium',
        owner: 'Data Team',
        timeline: '6 weeks'
      },
      {
        id: 'df2',
        title: 'Establish Data Quality Monitoring',
        description: 'Set up automated monitoring for data quality metrics and anomaly detection',
        impact: 'High',
        effort: 'Low',
        priority: 'high'
      }
    ]
  },
  {
    id: 'technology-stack',
    title: 'Technology Stack',
    icon: Cpu,
    score: 3.2,
    status: 'good' as const,
    description: 'Modern infrastructure with good integration capabilities. Some gaps in automation and AI-specific tooling need to be addressed.',
    dimensions: [
      {
        id: 'integration',
        name: 'System Integration',
        description: 'Connectivity between different systems and tools',
        score: 3.4,
        questions: [
          {
            id: 'si1',
            text: 'How well are your tools and systems connected to each other?',
            answer: 'Most systems connected with APIs or integrations',
            impact: 'Good integration enables seamless AI workflow deployment across systems.'
          }
        ]
      },
      {
        id: 'automation',
        name: 'Automation Maturity',
        description: 'Current level of process automation',
        score: 3.0,
        questions: [
          {
            id: 'am1',
            text: 'What level of automation do you currently have?',
            answer: 'Some automated workflows for key processes',
            impact: 'Existing automation foundation facilitates AI integration and scaling.'
          }
        ]
      }
    ],
    recommendations: [
      {
        id: 'ts1',
        title: 'Deploy API Management Platform',
        description: 'Implement centralized API management for better integration control',
        impact: 'Medium',
        effort: 'Medium',
        priority: 'medium'
      },
      {
        id: 'ts2',
        title: 'Upgrade Automation Infrastructure',
        description: 'Enhance current automation tools to support AI/ML workflows',
        impact: 'High',
        effort: 'High',
        priority: 'high'
      }
    ]
  },
  {
    id: 'governance-ethics',
    title: 'Governance & Ethics',
    icon: Shield,
    score: 3.1,
    status: 'good' as const,
    description: 'Solid foundation with established policies. Enforcement mechanisms and AI-specific governance frameworks need strengthening.',
    dimensions: [
      {
        id: 'ai-governance',
        name: 'AI Governance',
        description: 'Policies specifically for AI development and deployment',
        score: 2.8,
        questions: [
          {
            id: 'ag1',
            text: 'Do you have AI-specific governance policies?',
            answer: 'Basic guidelines exist, not comprehensive',
            impact: 'AI governance ensures responsible and compliant AI deployment.'
          }
        ]
      },
      {
        id: 'compliance',
        name: 'Regulatory Compliance',
        description: 'Adherence to relevant regulations and standards',
        score: 3.4,
        questions: [
          {
            id: 'rc1',
            text: 'Which regulatory frameworks apply to your business?',
            answer: 'GDPR, SOC 2',
            impact: 'Strong compliance foundation enables confident AI deployment in regulated environments.'
          }
        ]
      }
    ],
    recommendations: [
      {
        id: 'ge1',
        title: 'Develop AI Ethics Framework',
        description: 'Create comprehensive AI ethics guidelines and review processes',
        impact: 'High',
        effort: 'Medium',
        priority: 'high'
      },
      {
        id: 'ge2',
        title: 'Implement AI Audit Trail System',
        description: 'Deploy systems to track AI decision-making for compliance',
        impact: 'Medium',
        effort: 'Medium',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'talent-culture',
    title: 'Talent & Culture',
    icon: Users,
    score: 2.9,
    status: 'developing' as const,
    description: 'Growing AI awareness with some training initiatives. Significant opportunities to build AI literacy and change management capabilities.',
    dimensions: [
      {
        id: 'ai-literacy',
        name: 'AI Literacy',
        description: 'Team understanding of AI capabilities and limitations',
        score: 2.7,
        questions: [
          {
            id: 'al1',
            text: 'What is your team\'s current AI knowledge level?',
            answer: 'Basic understanding, some have used AI tools',
            impact: 'AI literacy determines adoption success and effective tool utilization.'
          }
        ]
      },
      {
        id: 'change-readiness',
        name: 'Change Management',
        description: 'Organizational readiness for AI transformation',
        score: 3.1,
        questions: [
          {
            id: 'cr1',
            text: 'How does your team typically respond to new technology?',
            answer: 'Generally positive with proper training and support',
            impact: 'Change readiness determines speed and success of AI adoption initiatives.'
          }
        ]
      }
    ],
    recommendations: [
      {
        id: 'tc1',
        title: 'Launch AI Literacy Program',
        description: 'Comprehensive training program covering AI fundamentals and practical applications',
        impact: 'High',
        effort: 'Medium',
        priority: 'critical'
      },
      {
        id: 'tc2',
        title: 'Establish AI Champions Network',
        description: 'Identify and train AI champions in each department to drive adoption',
        impact: 'Medium',
        effort: 'Low',
        priority: 'high'
      }
    ]
  },
  {
    id: 'ai-strategy',
    title: 'AI Strategy',
    icon: Target,
    score: 2.8,
    status: 'developing' as const,
    description: 'Early strategic thinking with some identified opportunities. Needs clearer vision, prioritized use cases, and structured implementation roadmap.',
    dimensions: [
      {
        id: 'use-case-definition',
        name: 'Use Case Definition',
        description: 'Clarity and prioritization of AI applications',
        score: 2.6,
        questions: [
          {
            id: 'ucd1',
            text: 'Have you identified concrete opportunities to apply AI?',
            answer: '1–2 clear use-cases defined',
            impact: 'Well-defined use cases ensure focused and successful AI implementations.'
          }
        ]
      },
      {
        id: 'strategic-alignment',
        name: 'Strategic Alignment',
        description: 'AI initiatives alignment with business objectives',
        score: 3.0,
        questions: [
          {
            id: 'sa1',
            text: 'How well are your AI initiatives aligned with company goals?',
            answer: 'Some alignment (linked to 1–2 teams or goals)',
            impact: 'Strategic alignment ensures AI investments support broader business objectives.'
          }
        ]
      }
    ],
    recommendations: [
      {
        id: 'as1',
        title: 'Develop Comprehensive AI Strategy',
        description: 'Create detailed AI strategy with prioritized use cases and implementation roadmap',
        impact: 'High',
        effort: 'High',
        priority: 'critical'
      },
      {
        id: 'as2',
        title: 'Implement AI ROI Framework',
        description: 'Establish clear metrics and measurement framework for AI initiatives',
        impact: 'Medium',
        effort: 'Medium',
        priority: 'high'
      }
    ]
  }
];

export function DetailedPillarAssessment() {
  const [selectedPillar, setSelectedPillar] = useState<typeof pillarsData[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'text-success';
      case 'good': return 'text-primary';
      case 'developing': return 'text-warning';
      case 'needs_focus': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'strong': return CheckCircle;
      case 'good': return TrendingUp;
      case 'developing': return AlertTriangle;
      case 'needs_focus': return TrendingDown;
      default: return AlertTriangle;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'strong': return 'default';
      case 'good': return 'outline';
      case 'developing': return 'secondary';
      case 'needs_focus': return 'destructive';
      default: return 'outline';
    }
  };

  const handlePillarClick = (pillar: typeof pillarsData[0]) => {
    setSelectedPillar(pillar);
    setModalOpen(true);
  };

  const statusCounts = pillarsData.reduce((acc, pillar) => {
    acc[pillar.status] = (acc[pillar.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Detailed Pillar Assessment</CardTitle>
              <p className="text-muted-foreground mt-1">
                Click any pillar to explore detailed analysis, underlying questions, and actionable recommendations
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                {statusCounts.strong || 0} Strong
              </Badge>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {statusCounts.good || 0} Good
              </Badge>
              <Badge variant="outline" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {statusCounts.developing || 0} Developing
              </Badge>
              <Badge variant="outline" className="gap-1">
                <TrendingDown className="w-3 h-3" />
                {statusCounts.needs_focus || 0} Need Focus
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pillarsData.map((pillar) => {
              const StatusIcon = getStatusIcon(pillar.status);
              const IconComponent = pillar.icon;
              
              return (
                <div
                  key={pillar.id}
                  className="group cursor-pointer border rounded-lg p-4 hover:bg-accent/50 hover:border-primary/50 transition-all duration-200"
                  onClick={() => handlePillarClick(pillar)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {pillar.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(pillar.status)}`} />
                          <span className={`text-lg font-bold ${getStatusColor(pillar.status)}`}>
                            {pillar.score.toFixed(1)}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {pillar.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={getStatusBadgeVariant(pillar.status)} 
                      className="text-xs capitalize"
                    >
                      {pillar.status.replace('_', ' ')}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {pillar.dimensions.length} dimensions • {pillar.recommendations.length} actions
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Summary Footer */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Overall AI Readiness: <span className="font-semibold text-foreground">3.1/5.0</span> (Developing Stage)
              </div>
              <Button variant="outline" size="sm">
                View Full Report
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PillarDetailModal
        pillar={selectedPillar}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}