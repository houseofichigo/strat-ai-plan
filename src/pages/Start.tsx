import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Rocket, TrendingUp, Clock, Award, BarChart3, Factory } from "lucide-react";
import Navigation from "@/components/Navigation";

const segments = [
  {
    id: "microenterprise",
    title: "Microenterprises (MIC)",
    description: "Very small companies with fewer than 10 employees",
    icon: Rocket,
    features: ["Simple solutions", "Controlled costs", "Quick deployment"],
    color: "border-accent hover:border-accent/60",
    bgColor: "hover:bg-accent/5"
  },
  {
    id: "sme", 
    title: "Small & Medium Enterprises (SME)",
    description: "Companies with 10 to 250 employees",
    icon: Building2,
    features: ["Process automation", "Scalable solutions", "Measured ROI"],
    color: "border-primary hover:border-primary/60",
    bgColor: "hover:bg-primary/5"
  },
  {
    id: "mid-market",
    title: "Mid-Market Companies (MMC)",
    description: "Companies with 250 to 5,000 employees",
    icon: TrendingUp,
    features: ["Digital transformation", "Advanced AI", "Strategic innovation"],
    color: "border-success hover:border-success/60",
    bgColor: "hover:bg-success/5"
  },
  {
    id: "enterprise",
    title: "Large Enterprises (LE)",
    description: "Companies with more than 5,000 employees",
    icon: Factory,
    features: ["AI at scale", "Complex ecosystems", "Operational excellence"],
    color: "border-warning hover:border-warning/60",
    bgColor: "hover:bg-warning/5"
  }
];

const Start = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Start Your AI Readiness
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Assessment
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get personalized insights about your organization's AI readiness in just 5 minutes. 
            Choose your company type to begin.
          </p>
        </div>

        {/* Assessment Preview */}
        <div className="mb-12 animate-slide-up">
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <Clock className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">5 Minutes</h3>
                <p className="text-sm text-muted-foreground">Quick assessment</p>
              </div>
              <div className="space-y-2">
                <Award className="w-8 h-8 text-accent mx-auto" />
                <h3 className="font-semibold text-foreground">Comprehensive</h3>
                <p className="text-sm text-muted-foreground">6 key dimensions</p>
              </div>
              <div className="space-y-2">
                <BarChart3 className="w-8 h-8 text-success mx-auto" />
                <h3 className="font-semibold text-foreground">Actionable</h3>
                <p className="text-sm text-muted-foreground">Instant insights</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Segment Selection */}
        <div className="space-y-6 animate-scale-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-2xl font-semibold text-center text-foreground mb-8">
            Choose Your Company Type
          </h2>
          
          <div className="grid gap-4">
            {segments.map((segment, index) => {
              const IconComponent = segment.icon;
              return (
                <Card
                  key={segment.id}
                  className={`p-6 cursor-pointer transition-all duration-300 ${segment.color} ${segment.bgColor} hover:shadow-medium group`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <Link to={`/diagnostic?segment=${segment.id}`} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-background rounded-lg border border-border/50">
                          <IconComponent className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {segment.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {segment.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            {segment.features.map((feature) => (
                              <span key={feature} className="text-sm text-muted-foreground/80">
                                • {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "800ms" }}>
          <div className="inline-flex items-center space-x-6 text-sm text-muted-foreground bg-muted/50 rounded-full px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Free assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>No registration required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;