import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Diagnostic = () => {
  const [searchParams] = useSearchParams();
  const segment = searchParams.get('segment');

  const getSegmentTitle = (segment: string | null) => {
    switch (segment) {
      case 'microenterprise':
        return 'Microentreprises (MIC)';
      case 'pme':
        return 'Petites et Moyennes Entreprises (PME)';
      case 'eti':
        return 'Entreprises de Taille Intermédiaire (ETI)';
      case 'ge':
        return 'Grandes Entreprises (GE)';
      default:
        return 'Votre Entreprise';
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
            Retour à la sélection
          </Link>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Évaluation IA & Data
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              {getSegmentTitle(segment)}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Évaluez la maturité IA et Data de votre organisation en 6 dimensions clés. 
            Durée estimée : 5-10 minutes.
          </p>
        </div>

        {/* Assessment Preview */}
        <Card className="p-8 mb-8 bg-gradient-card border-border/50">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Dimensions d'évaluation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Stack Technologique",
              "Maturité Data", 
              "Fluence IA",
              "Cas d'usage",
              "Conformité",
              "Intégration"
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
          <Button variant="gradient" size="xl" className="group">
            Commencer l'évaluation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;