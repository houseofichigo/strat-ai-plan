import { Link } from "react-router-dom";
import { Mail, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl text-background">DataReady</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Empowering organizations to unlock their AI potential through comprehensive 
              readiness assessments and strategic insights.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <Mail className="w-5 h-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-background mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/how-it-works" className="text-background/70 hover:text-background transition-colors">How it Works</Link></li>
              <li><Link to="/use-cases" className="text-background/70 hover:text-background transition-colors">Use Cases</Link></li>
              <li><Link to="/start" className="text-background/70 hover:text-background transition-colors">Assessment</Link></li>
              <li><Link to="/pricing" className="text-background/70 hover:text-background transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-background mb-4">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/for-startups" className="text-background/70 hover:text-background transition-colors">For Startups</Link></li>
              <li><Link to="/for-companies" className="text-background/70 hover:text-background transition-colors">For Companies</Link></li>
              <li><Link to="/for-investors" className="text-background/70 hover:text-background transition-colors">For Investors</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-background mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="/docs" className="text-background/70 hover:text-background transition-colors">Documentation</Link></li>
              <li><Link to="/privacy" className="text-background/70 hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-background/70 hover:text-background transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/70 text-sm">
              © 2024 DataReady. All rights reserved.
            </p>
            <p className="text-background/70 text-sm mt-4 md:mt-0">
              Built with AI for the future of work.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;