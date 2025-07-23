import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Rocket, TrendingUp, ArrowRight } from "lucide-react";

const segments = [
  {
    id: "sme",
    title: "Small Business",
    description: "Growing companies with 1-50 employees looking to leverage AI for competitive advantage.",
    icon: Rocket,
    features: ["Cost-effective solutions", "Quick implementation", "Growth acceleration"],
    link: "/for-companies",
    color: "bg-gradient-to-br from-accent/10 to-accent/5",
    iconColor: "text-accent"
  },
  {
    id: "enterprise",
    title: "Medium Enterprise",
    description: "Established businesses with 50-500 employees ready for digital transformation.",
    icon: Building2,
    features: ["Enterprise solutions", "Process optimization", "Scalable automation"],
    link: "/for-companies",
    color: "bg-gradient-to-br from-primary/10 to-primary/5",
    iconColor: "text-primary"
  },
  {
    id: "investor",
    title: "Investors",
    description: "Evaluate portfolio companies' AI maturity and identify transformation opportunities.",
    icon: TrendingUp,
    features: ["Portfolio assessment", "Due diligence support", "Growth insights"],
    link: "/for-investors",
    color: "bg-gradient-to-br from-success/10 to-success/5",
    iconColor: "text-success"
  }
];

const SegmentCards = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tailored for Your Business Size
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're a growing small business, established medium enterprise, or investor, 
            our platform provides insights specific to your needs and industry context.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {segments.map((segment, index) => {
            const IconComponent = segment.icon;
            return (
              <div
                key={segment.id}
                className={`${segment.color} border border-border/50 rounded-2xl p-8 hover:shadow-medium transition-all duration-300 group animate-scale-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 ${segment.color} rounded-xl border border-border/30`}>
                      <IconComponent className={`w-8 h-8 ${segment.iconColor}`} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {segment.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {segment.description}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {segment.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${segment.iconColor.replace('text-', 'bg-')} mr-3`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary" asChild>
                    <Link to={segment.link}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="gradient" size="xl" asChild>
            <Link to="/start" className="group">
              Start Your Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SegmentCards;