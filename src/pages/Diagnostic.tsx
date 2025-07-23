import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Diagnostic = () => {
  const [searchParams] = useSearchParams();
  const segment = searchParams.get('segment');

  const getSegmentTitle = (segment: string | null) => {
    switch (segment) {
      case 'microenterprise':
        return 'Microenterprises (MIC)';
      case 'sme':
        return 'Small & Medium Enterprises (SME)';
      case 'mid-market':
        return 'Mid-Market Companies (MMC)';
      case 'enterprise':
        return 'Large Enterprises (LE)';
      default:
        return 'Your Company';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="mb-8">
          <Link 
            to="/start" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to selection
          </Link>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI & Data Assessment
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              {getSegmentTitle(segment)}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Evaluate your organization's AI and data maturity across 6 key dimensions. 
            Estimated duration: 5-10 minutes.
          </p>
        </div>

        {/* Assessment Preview */}
        <Card className="p-8 mb-8 bg-gradient-card border-border/50">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Assessment Dimensions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Technology Stack",
              "Data Maturity", 
              "AI Fluency",
              "Use Cases",
              "Compliance",
              "Integration"
            ].map((dimension, index) => (
              <div key={dimension} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">{index + 1}</span>
                </div>
                <span className="text-foreground font-medium">{dimension}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="text-center">
          <Button variant="gradient" size="xl" asChild>
            <Link to="/assessment" className="group">
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;