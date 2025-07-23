import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, TrendingUp, Shield, Zap, Users, CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Accelerate Growth",
    description: "Identify high-impact automation opportunities that can streamline operations and boost productivity by up to 40%."
  },
  {
    icon: Shield,
    title: "Risk Management", 
    description: "Understand compliance requirements and data security implications before implementing AI solutions."
  },
  {
    icon: Zap,
    title: "Quick Implementation",
    description: "Get practical, actionable recommendations that can be implemented with existing resources and budget."
  },
  {
    icon: Users,
    title: "Team Readiness",
    description: "Assess your team's AI fluency and get targeted training recommendations to build internal capabilities."
  }
];

const useCases = [
  "Customer service automation with AI chatbots",
  "Financial reporting and analytics automation", 
  "Inventory management and demand forecasting",
  "Marketing campaign optimization",
  "Document processing and data extraction",
  "Quality control and process monitoring"
];

const ForCompanies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6">
            <Building2 className="w-4 h-4" />
            <span>For Small & Medium Enterprises</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transform Your Business with
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              AI & Automation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how AI can streamline your operations, reduce costs, and accelerate growth. 
            Get a comprehensive assessment tailored for small and medium enterprises.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="gradient" size="xl" asChild>
              <Link to="/start" className="group">
                Start Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/use-cases">View Use Cases</Link>
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why SMEs Choose DataReady
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card 
                  key={benefit.title}
                  className="p-6 bg-gradient-card border-border/50 hover:shadow-medium transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/10 rounded-xl w-fit">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20 animate-slide-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Common AI Use Cases for SMEs
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From customer service to operations, AI can transform every aspect of your business. 
                Here are the most impactful applications for companies like yours.
              </p>
              <ul className="space-y-3">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="p-8 bg-gradient-card border-border/50">
              <div className="space-y-6">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Typical SME Results
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                    <span className="text-foreground font-medium">Productivity Increase</span>
                    <span className="text-success font-bold">25-40%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-foreground font-medium">Cost Reduction</span>
                    <span className="text-primary font-bold">15-30%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                    <span className="text-foreground font-medium">Time Savings</span>
                    <span className="text-accent font-bold">20+ hours/week</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-scale-in">
          <Card className="p-12 bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Ready to Assess Your AI Readiness?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get personalized insights and recommendations in just 5 minutes.
              </p>
              <Button variant="gradient" size="xl" asChild>
                <Link to="/start" className="group">
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                No registration required • Instant results • 100% free
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForCompanies;