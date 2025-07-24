import React, { useEffect, useState } from 'react';
import { FormData } from '@/data/assessmentData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  ArrowRight, 
  Target, 
  Zap, 
  BookOpen, 
  Users, 
  Lightbulb,
  Rocket,
  MessageCircle,
  Star,
  TrendingUp,
  Shield,
  Play
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

interface AssessmentResultsProps {
  formData: FormData;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ formData }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReport = () => {
    // Implementation for downloading PDF report
    toast({
      title: "Report Downloaded!",
      description: "Your AI Readiness Report has been saved to your downloads.",
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Downloading report...', formData);
    }
    // TODO: Implement PDF generation
  };

  const handleEmailReport = () => {
    // Implementation for emailing report
    toast({
      title: "Report Sent!",
      description: "Your personalized report is on its way to your inbox.",
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Emailing report...', formData);
    }
    // TODO: Implement email service
  };

  const handleExploreReport = () => {
    window.location.href = '/dashboard?tab=report';
  };

  const handleDiscoverUseCases = () => {
    window.location.href = '/dashboard?tab=use-cases';
  };

  const handleExploreAgents = () => {
    window.location.href = '/dashboard?tab=agents';
  };

  const handleTrainingCenter = () => {
    window.location.href = '/dashboard?tab=training';
  };

  const handlePlayground = () => {
    window.location.href = '/dashboard?tab=playground';
  };

  const handleRoadmapBuilder = () => {
    window.location.href = '/dashboard?tab=roadmap';
  };

  const handleContactExperts = () => {
    window.location.href = '/contact';
  };

  const nextStepCards = [
    {
      id: 'explore-report',
      title: 'Explore Your Interactive Report',
      description: 'Dive deep into your AI readiness scores, discover your strengths, and get actionable recommendations.',
      icon: TrendingUp,
      gradient: 'from-primary to-primary/80',
      action: handleExploreReport,
      badge: 'Start Here',
      time: '5 min'
    },
    {
      id: 'discover-use-cases',
      title: 'Discover Custom AI Use Cases',
      description: 'Explore AI solutions tailored to your industry and business challenges.',
      icon: Target,
      gradient: 'from-blue-500 to-blue-600',
      action: handleDiscoverUseCases,
      badge: 'Personalized',
      time: '10 min'
    },
    {
      id: 'explore-agents',
      title: 'Browse AI Agent Templates',
      description: 'Ready-to-deploy AI agents for automation, customer service, and workflows.',
      icon: Zap,
      gradient: 'from-purple-500 to-purple-600',
      action: handleExploreAgents,
      badge: 'Deploy Ready',
      time: '15 min'
    },
    {
      id: 'training-center',
      title: 'Access Training Resources',
      description: 'Build AI literacy across your team with courses matched to your skill level.',
      icon: BookOpen,
      gradient: 'from-green-500 to-green-600',
      action: handleTrainingCenter,
      badge: 'Learn & Grow',
      time: '30 min'
    },
    {
      id: 'playground',
      title: 'Try AI in Our Playground',
      description: 'Experiment with AI tools and see them in action before you deploy.',
      icon: Play,
      gradient: 'from-orange-500 to-orange-600',
      action: handlePlayground,
      badge: 'Hands-on',
      time: '10 min'
    },
    {
      id: 'roadmap-builder',
      title: 'Build Your AI Roadmap',
      description: 'Turn your assessment insights into a concrete implementation plan.',
      icon: Rocket,
      gradient: 'from-teal-500 to-teal-600',
      action: handleRoadmapBuilder,
      badge: 'Strategic',
      time: '20 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Star className="w-4 h-4 text-primary fill-current opacity-70" />
            </div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 animate-scale-in" />
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-4">
            🎉 Assessment Complete!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            Congratulations! You've just taken the first major step toward AI transformation.
          </p>
          
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
            Your personalized AI readiness insights are ready, along with custom recommendations, 
            practical resources, and everything you need to turn AI from possibility into reality.
          </p>
        </div>

        {/* Quick Highlights */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Your AI Journey Just Got Personal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Assessment Complete</h3>
                <p className="text-sm text-muted-foreground">7 comprehensive areas evaluated with detailed scoring</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Custom Recommendations</h3>
                <p className="text-sm text-muted-foreground">Tailored action plan based on your specific readiness</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Ready to Deploy</h3>
                <p className="text-sm text-muted-foreground">Immediate access to tools, templates, and training</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary CTA */}
        <div className="text-center mb-12">
          <Button 
            onClick={handleExploreReport}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Explore Your Interactive Report
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Start with your personalized insights and recommendations
          </p>
        </div>

        {/* Next Steps Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What's Next? Your AI Toolkit Awaits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextStepCards.map((card, index) => (
              <Card 
                key={card.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={card.action}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${card.gradient} text-white`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {card.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{card.time}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Secondary Actions */}
        <Card className="mb-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-center">Take Your Report With You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleEmailReport} variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Report
              </Button>
              
              <Button onClick={handleDownloadReport} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Access your complete assessment results anytime, anywhere
            </p>
          </CardContent>
        </Card>

        {/* Support & Trust Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="w-5 h-5 text-primary" />
                Need Expert Guidance?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI specialists are ready to help you interpret your results and plan your next steps.
              </p>
              <Button onClick={handleContactExperts} variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Talk to Our Experts
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-green-500" />
                Your Data is Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your assessment data is encrypted and stored securely. We use it only to provide personalized 
                recommendations and will never share it without your consent.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Ready to Transform Your Business with AI?</h3>
          <p className="text-muted-foreground mb-4">
            You're now equipped with insights, tools, and resources to make AI work for you. 
            The future is intelligent—and it starts today.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Enterprise-grade security</span>
            <span>•</span>
            <span>Expert support</span>
            <span>•</span>
            <span>Continuous updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};