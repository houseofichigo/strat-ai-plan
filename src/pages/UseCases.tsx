import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Bot, BarChart3, Zap, Shield, Mail, MessageSquare, FileText, Users, ArrowRight, CheckCircle } from "lucide-react";

const categories = [
  {
    title: "Customer Service & Support",
    icon: MessageSquare,
    color: "text-primary",
    bgColor: "bg-primary/10",
    useCases: [
      {
        title: "AI Chatbot for Customer Support",
        description: "24/7 automated customer service handling common inquiries and routing complex issues to human agents.",
        impact: "Reduce response time by 80%",
        difficulty: "Easy"
      },
      {
        title: "Sentiment Analysis for Reviews",
        description: "Automatically analyze customer feedback and reviews to identify trends and improvement opportunities.",
        impact: "Improve satisfaction by 25%",
        difficulty: "Medium"
      }
    ]
  },
  {
    title: "Operations & Automation",
    icon: Zap,
    color: "text-accent",
    bgColor: "bg-accent/10",
    useCases: [
      {
        title: "Invoice Processing Automation",
        description: "Extract data from invoices and receipts automatically, reducing manual data entry by 90%.",
        impact: "Save 15 hours/week",
        difficulty: "Easy"
      },
      {
        title: "Inventory Demand Forecasting",
        description: "Predict inventory needs based on historical data, seasonality, and market trends.",
        impact: "Reduce stockouts by 40%",
        difficulty: "Medium"
      },
      {
        title: "Quality Control with Computer Vision",
        description: "Automated visual inspection of products to detect defects and maintain quality standards.",
        impact: "Improve quality by 30%",
        difficulty: "Advanced"
      }
    ]
  },
  {
    title: "Marketing & Sales",
    icon: BarChart3,
    color: "text-success",
    bgColor: "bg-success/10",
    useCases: [
      {
        title: "Lead Scoring & Qualification",
        description: "Automatically score and prioritize leads based on behavior, demographics, and engagement.",
        impact: "Increase conversion by 35%",
        difficulty: "Medium"
      },
      {
        title: "Personalized Email Campaigns",
        description: "Generate personalized email content and optimize send times for each customer segment.",
        impact: "Boost open rates by 50%",
        difficulty: "Easy"
      },
      {
        title: "Price Optimization",
        description: "Dynamic pricing based on demand, competition, and market conditions.",
        impact: "Increase revenue by 20%",
        difficulty: "Advanced"
      }
    ]
  },
  {
    title: "Finance & Analytics",
    icon: BarChart3,
    color: "text-warning",
    bgColor: "bg-warning/10",
    useCases: [
      {
        title: "Automated Financial Reporting",
        description: "Generate financial reports and dashboards automatically from multiple data sources.",
        impact: "Save 10 hours/month",
        difficulty: "Medium"
      },
      {
        title: "Expense Categorization",
        description: "Automatically categorize and track business expenses for better financial visibility.",
        impact: "Improve accuracy by 95%",
        difficulty: "Easy"
      },
      {
        title: "Fraud Detection",
        description: "Identify unusual patterns in transactions to prevent fraud and financial losses.",
        impact: "Reduce fraud by 85%",
        difficulty: "Advanced"
      }
    ]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-success text-success-foreground";
    case "Medium": return "bg-warning text-warning-foreground";
    case "Advanced": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Use Cases for
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Small & Medium Enterprises
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover practical AI applications that can transform your business operations, 
            reduce costs, and accelerate growth. Each use case includes implementation difficulty 
            and expected business impact.
          </p>
        </div>

        {/* Use Cases by Category */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title}
                className="animate-slide-up"
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`p-4 ${category.bgColor} rounded-xl`}>
                    <IconComponent className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
                </div>

                {/* Use Cases Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.useCases.map((useCase, index) => (
                    <Card 
                      key={useCase.title}
                      className="p-6 bg-gradient-card border-border/50 hover:shadow-medium transition-all duration-300 group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {useCase.title}
                          </h3>
                          <Badge className={getDifficultyColor(useCase.difficulty)}>
                            {useCase.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {useCase.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm font-medium text-success">
                              {useCase.impact}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-scale-in">
          <Card className="p-12 bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <div className="space-y-6">
              <Bot className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-3xl font-bold text-foreground">
                Ready to Implement AI in Your Business?
              </h2>
              <p className="text-lg text-muted-foreground">
                Start with our AI readiness assessment to discover which use cases 
                are perfect for your organization.
              </p>
              <Button variant="gradient" size="xl" asChild>
                <Link to="/assessment" className="group">
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations based on your current setup
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UseCases;