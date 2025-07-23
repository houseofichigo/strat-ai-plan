import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about AI readiness for your business? We're here to help you 
            navigate your digital transformation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-gradient-card border-border/50 animate-slide-up">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Send us a message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your company name" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your AI readiness questions or challenges..."
                    rows={5}
                  />
                </div>
                
                <Button variant="gradient" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-muted-foreground">support@dataready.com</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mon-Fri 9AM-6PM EST
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Drive<br />
                    Tech Hub, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
            </Card>

            {/* FAQ Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Common Questions</h3>
              <div className="space-y-2">
                <a href="/how-it-works" className="block text-primary hover:underline text-sm">
                  How does the AI readiness assessment work?
                </a>
                <a href="/use-cases" className="block text-primary hover:underline text-sm">
                  What AI use cases are best for my business?
                </a>
                <a href="/start" className="block text-primary hover:underline text-sm">
                  How long does the assessment take?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;