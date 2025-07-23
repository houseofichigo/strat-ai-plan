import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SegmentCards from "@/components/SegmentCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <SegmentCards />
      <Footer />
    </div>
  );
};

export default Index;
