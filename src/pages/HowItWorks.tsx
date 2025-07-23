import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Users, BarChart3, Zap, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "AI & Data Readiness Assessment",
    description: "Complete a comprehensive evaluation across 6 dimensions: technology stack, data maturity, AI fluency, use cases, compliance, and integration capabilities.",
    icon: Users,
    color: "text-primary"
  },
  {
    number: "02", 
    title: "Intelligent Analysis & Scoring",
    description: "Our AI engine analyzes your responses, benchmarks against industry standards, and generates a detailed readiness score with actionable insights.",
    icon: BarChart3,
    color: "text-accent"
  },
  {
    number: "03",
    title: "Use Cases & AI Agents Discovery",
    description: "Discover personalized AI use cases, automation workflows, and intelligent agents tailored to your business needs and readiness level.",
    icon: Zap,
    color: "text-success"
  },
  {
    number: "04",
    title: "Training & AI Playgrounds",
    description: "Access curated training modules, hands-on AI playgrounds, and practical workshops to build your team's AI capabilities step by step.",
    icon: CheckCircle,
    color: "text-warning"
  },
  {
    number: "05",
    title: "Automation Workflows",
    description: "Get ready-to-implement automation templates for Zapier, Make, and n8n that match your current tools and processes.",
    icon: CheckCircle,
    color: "text-primary"
  },
  {
    number: "06",
    title: "Personalized Roadmap",
    description: "Receive a visual, actionable roadmap with prioritized AI initiatives, timeline, and implementation support resources.",
    icon: CheckCircle,
    color: "text-accent"
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How DataReady
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Transforms Your Business
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our comprehensive assessment methodology helps SMEs understand their AI readiness 
            and provides actionable insights for digital transformation.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={step.number}
                className={`grid lg:grid-cols-2 gap-12 items-center animate-slide-up ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Content */}
                <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-muted-foreground/30">
                      {step.number}
                    </div>
                    <div className={`p-3 rounded-xl border border-border/50 bg-background`}>
                      <IconComponent className={`w-6 h-6 ${step.color}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Visual */}
                <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                  <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-medium transition-all duration-300">
                    <div className="text-center space-y-4">
                      <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-${step.color.replace('text-', '')}/20 to-${step.color.replace('text-', '')}/10 flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-primary rounded-full transition-all duration-1000`}
                            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Step {index + 1} of {steps.length}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-scale-in" style={{ animationDelay: "800ms" }}>
          <Card className="p-12 bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Ready to Start Your AI Journey?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get your comprehensive AI readiness assessment in just 5 minutes.
              </p>
              <Button variant="gradient" size="xl" asChild>
                <Link to="/assessment" className="group">
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;