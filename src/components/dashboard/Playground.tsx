import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Search, 
  Workflow, 
  GraduationCap, 
  Settings, 
  Plus,
  Pin,
  Download,
  Copy,
  RefreshCw,
  User,
  Building,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Clock,
  BookOpen,
  Shield,
  ChevronDown,
  Wand2,
  FileText,
  Target,
  Zap
} from 'lucide-react';
import { useCasesData } from '@/data/useCasesData';
import { agentTemplatesData } from '@/data/agentTemplatesData';
import { workflowTemplatesData } from '@/data/workflowTemplatesData';
import { trainingCoursesData } from '@/data/trainingCoursesData';
import { roadmapManager } from '@/data/roadmapData';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: MessageAction[];
  cards?: RecommendationCard[];
}

interface MessageAction {
  id: string;
  label: string;
  type: 'roadmap' | 'preview' | 'launch' | 'export';
  data?: any;
}

interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  type: 'use-case' | 'agent' | 'workflow' | 'training';
  category: string;
  impact: string;
  effort: string;
  sourceData: any;
}

interface UserContext {
  department: string;
  industry: string;
  maturity: string;
  role: string;
  company_size: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
}

const specialtyAgents = [
  {
    id: 'enhancer',
    name: 'Prompt Enhancer',
    icon: Wand2,
    description: 'Refine and optimize prompts for any AI tool',
    command: '/enhance',
    color: 'text-purple-500'
  },
  {
    id: 'researcher',
    name: 'Research Agent',
    icon: Search,
    description: 'Market research, competitor analysis, and trend insights',
    command: '/research',
    color: 'text-blue-500'
  },
  {
    id: 'builder',
    name: 'Workflow Builder',
    icon: Workflow,
    description: 'Create custom automation workflows from descriptions',
    command: '/build',
    color: 'text-green-500'
  },
  {
    id: 'trainer',
    name: 'Training Coach',
    icon: GraduationCap,
    description: 'Personalized learning paths and skill development',
    command: '/learn',
    color: 'text-orange-500'
  }
];

const starterPrompts = [
  {
    category: 'Quick Wins',
    prompts: [
      "What's the fastest automation I can implement in Finance?",
      "Show me 3 quick AI wins for my sales team",
      "What workflows can save us time this week?"
    ]
  },
  {
    category: 'Strategic',
    prompts: [
      "Build a 6-month AI roadmap for my department",
      "What compliance steps do I need for GDPR?",
      "How do I prepare my team for AI transformation?"
    ]
  },
  {
    category: 'Technical',
    prompts: [
      "Help me enhance this prompt for data extraction",
      "Build a customer support automation workflow",
      "Research the best CRM integrations for AI agents"
    ]
  }
];

export function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeAgent, setActiveAgent] = useState('general');
  const [userContext, setUserContext] = useState<UserContext>({
    department: 'Sales',
    industry: 'SaaS',
    maturity: 'Intermediate',
    role: 'Manager',
    company_size: 'SMB'
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [showContextSelector, setShowContextSelector] = useState(false);
  const [showStarterPrompts, setShowStarterPrompts] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'assistant',
        content: `Hello! I'm your AI Assistant with access to our entire library of automation workflows, AI agents, use cases, and training modules. I'm here to help you find quick wins, build custom solutions, and accelerate your AI journey.

I can help you:
🚀 Find and recommend relevant use cases and workflows
🤖 Create custom AI agents and automation
📚 Suggest personalized training paths
🔍 Research market trends and best practices
✨ Enhance prompts and optimize AI interactions

What would you like to explore today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const generateResponse = async (userMessage: string): Promise<Message> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Handle specialty agent commands
    if (lowerMessage.startsWith('/enhance')) {
      return handlePromptEnhancement(userMessage);
    } else if (lowerMessage.startsWith('/research')) {
      return handleResearch(userMessage);
    } else if (lowerMessage.startsWith('/build')) {
      return handleWorkflowBuilder(userMessage);
    } else if (lowerMessage.startsWith('/learn')) {
      return handleTrainingRecommendations(userMessage);
    }
    
    // General AI assistant responses with recommendations
    if (lowerMessage.includes('automation') || lowerMessage.includes('workflow')) {
      return generateWorkflowRecommendations(userMessage);
    } else if (lowerMessage.includes('agent') || lowerMessage.includes('ai agent')) {
      return generateAgentRecommendations(userMessage);
    } else if (lowerMessage.includes('training') || lowerMessage.includes('learn')) {
      return generateTrainingRecommendations(userMessage);
    } else if (lowerMessage.includes('compliance') || lowerMessage.includes('gdpr')) {
      return generateComplianceResponse(userMessage);
    } else if (lowerMessage.includes('roadmap') || lowerMessage.includes('plan')) {
      return generateRoadmapResponse(userMessage);
    } else {
      return generateGeneralResponse(userMessage);
    }
  };

  const handlePromptEnhancement = (message: string): Message => {
    const prompt = message.replace('/enhance', '').trim();
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'll help you enhance that prompt. Here's an optimized version:

**Original:** ${prompt || "Please provide the prompt you'd like me to enhance."}

**Enhanced:** ${prompt ? `"${prompt}" → Consider making it more specific by adding context about your industry (${userContext.industry}), expected output format, and any constraints. For example, include your role as a ${userContext.role} and specify the level of detail needed.` : "Please share the prompt you'd like me to enhance."}

**Key improvements:**
- Added specific context for ${userContext.industry} industry
- Tailored for ${userContext.role} level responsibilities  
- Included output format specifications
- Added relevant constraints and examples`,
      timestamp: new Date(),
      actions: prompt ? [
        { id: 'copy', label: 'Copy Enhanced Prompt', type: 'export' },
        { id: 'test', label: 'Test in Playground', type: 'launch' }
      ] : []
    };
  };

  const handleResearch = (message: string): Message => {
    const topic = message.replace('/research', '').trim();
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Research Analysis for ${userContext.industry} industry:

**Topic:** ${topic || "Please specify what you'd like me to research"}

${topic ? `**Key Findings:**
- Market trend analysis for ${topic} in ${userContext.industry}
- Competitive landscape overview
- Implementation best practices for ${userContext.company_size} companies
- ROI benchmarks and success metrics

**Recommendations:**
Based on your ${userContext.maturity} maturity level, I suggest focusing on proven solutions with established vendor support.` : "**Available Research Areas:**\n- Market trends and competitive analysis\n- Technology benchmarking\n- Implementation best practices\n- ROI and success metrics"}`,
      timestamp: new Date(),
      actions: topic ? [
        { id: 'full-report', label: 'Generate Full Report', type: 'export' },
        { id: 'competitors', label: 'Competitor Analysis', type: 'launch' }
      ] : []
    };
  };

  const handleWorkflowBuilder = (message: string): Message => {
    const description = message.replace('/build', '').trim();
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Workflow Builder Assistant

**Goal:** ${description || "Please describe the workflow you'd like to build"}

${description ? `**Proposed Workflow Structure:**
1. **Trigger:** Based on your ${userContext.department} department needs
2. **Processing:** Automated steps tailored for ${userContext.industry}
3. **Actions:** Output and notifications
4. **Integration:** Compatible with common ${userContext.company_size} tools

**Estimated Setup Time:** 2-4 hours
**Complexity:** Medium (suitable for ${userContext.maturity} level)
**ROI:** High (typical 60-80% time savings)` : "**Available Workflow Types:**\n- Document processing automation\n- Communication workflows\n- Data synchronization\n- Approval processes\n- Customer interaction automation"}`,
      timestamp: new Date(),
      actions: description ? [
        { id: 'build-workflow', label: 'Start Building', type: 'launch' },
        { id: 'roadmap-workflow', label: 'Add to Roadmap', type: 'roadmap' }
      ] : []
    };
  };

  const handleTrainingRecommendations = (message: string): Message => {
    const relevantCourses = trainingCoursesData
      .filter(course => 
        course.targetAudience.includes(userContext.role) ||
        course.department.includes(userContext.department) ||
        course.level === userContext.maturity
      )
      .slice(0, 3);

    const cards: RecommendationCard[] = relevantCourses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      type: 'training',
      category: course.subject[0] || 'General',
      impact: course.outcomes[0] || 'Skill development',
      effort: course.duration,
      sourceData: course
    }));

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Training Recommendations for ${userContext.role} in ${userContext.department}

Based on your ${userContext.maturity} level, I've selected personalized training modules that will deliver the highest impact for your role and department.`,
      timestamp: new Date(),
      cards,
      actions: [
        { id: 'learning-path', label: 'Create Learning Path', type: 'roadmap' },
        { id: 'schedule', label: 'Schedule Training', type: 'launch' }
      ]
    };
  };

  const generateWorkflowRecommendations = (message: string): Message => {
    const relevantWorkflows = workflowTemplatesData
      .filter(workflow => 
        workflow.department.includes(userContext.department) ||
        workflow.industry.includes(userContext.industry) ||
        workflow.complexity === userContext.maturity
      )
      .slice(0, 3);

    const cards: RecommendationCard[] = relevantWorkflows.map(workflow => ({
      id: workflow.id,
      title: workflow.title,
      description: workflow.description,
      type: 'workflow',
      category: workflow.category[0] || 'General',
      impact: workflow.roi,
      effort: workflow.setupTime,
      sourceData: workflow
    }));

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Here are the top automation workflows for ${userContext.department} teams in ${userContext.industry}:

These workflows are specifically chosen based on your ${userContext.maturity} maturity level and typical ${userContext.company_size} company needs. Each can be implemented quickly and provides immediate ROI.`,
      timestamp: new Date(),
      cards,
      actions: [
        { id: 'compare', label: 'Compare Workflows', type: 'preview' },
        { id: 'roadmap-all', label: 'Add All to Roadmap', type: 'roadmap' }
      ]
    };
  };

  const generateAgentRecommendations = (message: string): Message => {
    const relevantAgents = agentTemplatesData
      .filter(agent => 
        agent.department.includes(userContext.department)
      )
      .slice(0, 3);

    const cards: RecommendationCard[] = relevantAgents.map(agent => ({
      id: agent.id,
      title: agent.name,
      description: agent.shortDescription,
      type: 'agent',
      category: agent.category[0] || 'General',
      impact: agent.estimatedROI,
      effort: agent.setupTime,
      sourceData: agent
    }));

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Recommended AI Agents for ${userContext.department}:

These agents are curated for your ${userContext.maturity} level and can integrate with typical ${userContext.company_size} tech stacks. Each provides measurable value within the first month of deployment.`,
      timestamp: new Date(),
      cards,
      actions: [
        { id: 'demo', label: 'See Demo', type: 'preview' },
        { id: 'deploy', label: 'Deploy Agent', type: 'launch' }
      ]
    };
  };

  const generateTrainingRecommendations = (message: string): Message => {
    return handleTrainingRecommendations(message);
  };

  const generateComplianceResponse = (message: string): Message => {
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `GDPR Compliance Guidance for ${userContext.industry}

Based on your current tools and workflows, here are the key compliance requirements:

**Immediate Actions:**
- Review data processing agreements with all vendors
- Update privacy policies for AI tool usage
- Implement data minimization practices
- Set up user consent mechanisms

**For ${userContext.department} Department:**
- Specific data handling protocols
- Role-based access controls
- Regular compliance audits

**Risk Assessment:**
Your ${userContext.maturity} maturity level indicates you should focus on foundational compliance before advanced AI implementations.`,
      timestamp: new Date(),
      actions: [
        { id: 'compliance-audit', label: 'Start Compliance Audit', type: 'launch' },
        { id: 'gdpr-roadmap', label: 'Add to GDPR Roadmap', type: 'roadmap' }
      ]
    };
  };

  const generateRoadmapResponse = (message: string): Message => {
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `AI Implementation Roadmap for ${userContext.department}

**Phase 1 (Month 1-2): Foundation**
- Team training and AI literacy
- Tool evaluation and selection
- Basic automation workflows

**Phase 2 (Month 3-4): Implementation**
- Deploy high-impact use cases
- Integrate AI agents
- Establish success metrics

**Phase 3 (Month 5-6): Optimization**
- Advanced automations
- Cross-department integration
- Performance optimization

**Tailored for:**
- ${userContext.industry} industry requirements
- ${userContext.company_size} company resources
- ${userContext.maturity} maturity level`,
      timestamp: new Date(),
      actions: [
        { id: 'detailed-roadmap', label: 'Create Detailed Roadmap', type: 'roadmap' },
        { id: 'timeline', label: 'Download Timeline', type: 'export' }
      ]
    };
  };

  const generateGeneralResponse = (message: string): Message => {
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I understand you're asking about "${message}". 

Based on your profile as a ${userContext.role} in ${userContext.department} (${userContext.industry}), I can help you with:

🚀 **Quick Wins:** Fast-impact automation and AI solutions
🤖 **AI Agents:** Custom assistants for your specific needs  
📊 **Workflows:** Process automation tailored to ${userContext.industry}
📚 **Training:** Skill development for your ${userContext.maturity} level
🛡️ **Compliance:** GDPR and security guidance
🗺️ **Roadmaps:** Strategic planning for AI adoption

Could you be more specific about what you'd like to explore? Or try one of our specialty agents:
- \`/enhance [prompt]\` - Improve AI prompts
- \`/research [topic]\` - Market research
- \`/build [description]\` - Create workflows
- \`/learn [topic]\` - Training recommendations`,
      timestamp: new Date()
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowStarterPrompts(false);

    try {
      const assistantMessage = await generateResponse(input);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating response:', error);
      }
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterPrompt = (prompt: string) => {
    setInput(prompt);
    setShowStarterPrompts(false);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleAction = (action: MessageAction) => {
    switch (action.type) {
      case 'roadmap':
        // Add to roadmap logic
        if (process.env.NODE_ENV === 'development') {
          console.log('Adding to roadmap:', action.data);
        }
        break;
      case 'preview':
        // Preview logic
        if (process.env.NODE_ENV === 'development') {
          console.log('Previewing:', action.data);
        }
        break;
      case 'launch':
        // Launch logic
        if (process.env.NODE_ENV === 'development') {
          console.log('Launching:', action.data);
        }
        break;
      case 'export':
        // Export logic
        if (process.env.NODE_ENV === 'development') {
          console.log('Exporting:', action.data);
        }
        break;
    }
  };

  const handleCardAction = (card: RecommendationCard, actionType: 'roadmap' | 'preview') => {
    if (actionType === 'roadmap') {
      // Add to roadmap using the roadmap manager
      roadmapManager.addItem({
        title: card.title,
        description: card.description,
        category: card.type === 'use-case' ? 'Use Case' : 
                 card.type === 'agent' ? 'Agent' : 
                 card.type === 'workflow' ? 'Workflow' : 'Training',
        type: card.category,
        source: card.type === 'use-case' ? 'use-cases' :
               card.type === 'agent' ? 'agents' :
               card.type === 'workflow' ? 'workflows' : 'training',
        sourceId: card.sourceData.id,
        status: 'To Plan',
        priority: 'Medium',
        estimatedEffort: card.effort,
        timeline: card.effort,
        assignees: [],
        prerequisites: card.sourceData.prerequisites || [],
        implementationSteps: card.sourceData.implementationSteps || [],
        successMetrics: card.sourceData.successMetrics || [card.impact],
        dependencies: [],
        notes: `Added from AI Assistant recommendation`,
        tags: [card.category],
        progress: 0,
        icon: card.type === 'agent' ? '🤖' : card.type === 'workflow' ? '⚡' : '📚',
        colorTheme: 'blue'
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-card/50 flex flex-col">
        {/* Context Selector */}
        <div className="p-4 border-b">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setShowContextSelector(!showContextSelector)}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{userContext.role} • {userContext.department}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showContextSelector && (
            <Card className="mt-2 p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Select value={userContext.department} onValueChange={(value) => 
                  setUserContext(prev => ({ ...prev, department: value }))
                }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={userContext.industry} onValueChange={(value) => 
                  setUserContext(prev => ({ ...prev, industry: value }))
                }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SaaS">SaaS</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Select value={userContext.maturity} onValueChange={(value) => 
                setUserContext(prev => ({ ...prev, maturity: value }))
              }>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          )}
        </div>

        {/* Specialty Agents */}
        <div className="p-4 border-b">
          <h3 className="font-medium mb-3 text-sm text-muted-foreground">Specialty Agents</h3>
          <div className="space-y-2">
            {specialtyAgents.map(agent => (
              <Button
                key={agent.id}
                variant={activeAgent === agent.id ? "default" : "ghost"}
                className="w-full justify-start gap-2 h-auto p-3"
                onClick={() => setActiveAgent(agent.id)}
              >
                <agent.icon className={`h-4 w-4 ${agent.color}`} />
                <div className="text-left">
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.command}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Conversation History */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-muted-foreground">Conversations</h3>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <ScrollArea className="space-y-2">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className="p-2 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{conv.title}</span>
                  {conv.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                </div>
                <div className="text-xs text-muted-foreground">
                  {conv.updatedAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  Superpower assistant for {userContext.industry} • {userContext.department}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Starter Prompts */}
            {showStarterPrompts && messages.length <= 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-muted-foreground">Suggested prompts for you:</h3>
                {starterPrompts.map(category => (
                  <div key={category.category} className="space-y-2">
                    <h4 className="text-sm font-medium">{category.category}</h4>
                    <div className="grid gap-2">
                      {category.prompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto p-3 text-left"
                          onClick={() => handleStarterPrompt(prompt)}
                        >
                          <Sparkles className="h-4 w-4 mr-2 text-primary" />
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-3xl space-y-3 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-12' 
                      : 'bg-card border'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  
                  {/* Recommendation Cards */}
                  {message.cards && message.cards.length > 0 && (
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {message.cards.map(card => (
                        <Card key={card.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-base">{card.title}</CardTitle>
                                <Badge variant="outline" className="text-xs">
                                  {card.category}
                                </Badge>
                              </div>
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                {card.type === 'agent' && <Bot className="h-3 w-3 text-primary" />}
                                {card.type === 'workflow' && <Workflow className="h-3 w-3 text-primary" />}
                                {card.type === 'training' && <GraduationCap className="h-3 w-3 text-primary" />}
                                {card.type === 'use-case' && <Target className="h-3 w-3 text-primary" />}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {card.description}
                            </p>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Impact: {card.impact}</span>
                              <span>Effort: {card.effort}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleCardAction(card, 'preview')}
                              >
                                Preview
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => handleCardAction(card, 'roadmap')}
                              >
                                Add to Roadmap
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* Message Actions */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {message.actions.map(action => (
                        <Button
                          key={action.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(action)}
                          className="text-xs"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about AI, automation, workflows, training, or compliance..."
                  className="min-h-[60px] resize-none pr-12"
                  disabled={isLoading}
                />
                <div className="absolute right-3 bottom-3 text-xs text-muted-foreground">
                  {input.startsWith('/') && (
                    <span className="text-primary">
                      {specialtyAgents.find(a => input.startsWith(a.command))?.name || 'Command'}
                    </span>
                  )}
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="h-[60px] px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Try commands: /enhance, /research, /build, /learn</span>
              </div>
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}