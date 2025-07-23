import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, BarChart3, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-info/50 backdrop-blur-sm border border-info-foreground/20 rounded-full px-4 py-2 text-sm font-medium text-info-foreground">
                <Zap className="w-4 h-4" />
                <span>AI & Data Readiness Assessment</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Unlock Your
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  AI Potential
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Get a comprehensive assessment of your organization's AI readiness. 
                Discover automation opportunities, receive strategic insights, and build 
                a personalized roadmap to digital transformation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/assessment" className="group">
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/how-it-works">How it Works</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>5-minute assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Actionable insights</span>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-6 animate-slide-up">
            <div className="grid gap-6">
              <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">AI Readiness Score</h3>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive evaluation across 6 key dimensions of AI maturity
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Strategic Insights</h3>
                    <p className="text-muted-foreground text-sm">
                      Personalized recommendations and automation opportunities
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Zap className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Implementation Roadmap</h3>
                    <p className="text-muted-foreground text-sm">
                      Step-by-step plan tailored to your organization's needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;