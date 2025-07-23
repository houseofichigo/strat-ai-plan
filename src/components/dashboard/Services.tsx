import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Star,
  Calendar,
  User,
  MessageSquare,
  Clock,
  Award,
  TrendingUp,
  BarChart3,
  BookOpen,
  Code,
  Lightbulb,
  Phone,
  Video,
  FileText,
  Search,
  Filter,
  ExternalLink,
  Crown,
  CheckCircle,
  Radar,
  Target,
  Users
} from 'lucide-react';

const experts = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'AI Strategy Consultant',
    expertise: ['AI Strategy', 'Digital Transformation', 'ROI Optimization'],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 450,
    avatar: '/api/placeholder/64/64',
    bio: '15+ years helping Fortune 500 companies implement AI strategies with measurable ROI.'
  },
  {
    id: '2',
    name: 'Mike Chen',
    title: 'Automation Architect',
    expertise: ['Workflow Automation', 'Process Design', 'Integration'],
    rating: 4.8,
    reviews: 89,
    hourlyRate: 350,
    avatar: '/api/placeholder/64/64',
    bio: 'Former McKinsey consultant specializing in business process automation and optimization.'
  }
];

const benchmarkData = {
  yourScore: 75,
  industryAverage: 62,
  topPerformer: 95,
  categories: [
    { name: 'AI Adoption', yourScore: 80, average: 65 },
    { name: 'Automation Maturity', yourScore: 70, average: 60 },
    { name: 'Training Completion', yourScore: 85, average: 55 },
    { name: 'ROI Achievement', yourScore: 65, average: 70 }
  ]
};

export function Services() {
  const [selectedTab, setSelectedTab] = useState('benchmarking');
  const [bookingData, setBookingData] = useState({
    expert: '',
    topic: '',
    duration: '',
    date: '',
    description: ''
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Premium Services</h1>
          <p className="text-muted-foreground">
            Expert guidance, benchmarking, and custom development for your AI journey
          </p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">
          <Crown className="h-4 w-4 mr-1" />
          Premium Access
        </Badge>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
          <TabsTrigger value="experts">Expert Services</TabsTrigger>
          <TabsTrigger value="training">Training+</TabsTrigger>
          <TabsTrigger value="custom">Custom Dev</TabsTrigger>
        </TabsList>

        {/* Benchmarking & Best Practices */}
        <TabsContent value="benchmarking" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Maturity Benchmarking</h2>
            <p className="text-muted-foreground mb-6">
              Compare your AI adoption and maturity against industry peers
            </p>
          </div>

          {/* Overall Score */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radar className="h-5 w-5" />
                  Your AI Maturity Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{benchmarkData.yourScore}</div>
                  <div className="text-sm text-muted-foreground">Out of 100</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Industry Average</span>
                    <span>{benchmarkData.industryAverage}</span>
                  </div>
                  <Progress value={benchmarkData.industryAverage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Top Performer</span>
                    <span>{benchmarkData.topPerformer}</span>
                  </div>
                  <Progress value={benchmarkData.topPerformer} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benchmarkData.categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span>{category.yourScore} vs {category.average}</span>
                      </div>
                      <div className="flex gap-1">
                        <Progress value={category.yourScore} className="h-2 flex-1" />
                        <Progress value={category.average} className="h-2 flex-1 opacity-50" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Best Practice Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Best Practice Templates</CardTitle>
              <CardDescription>Industry-proven templates for your sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: 'AI Governance Framework', sector: 'Financial Services', downloads: 1250 },
                  { title: 'Automation ROI Calculator', sector: 'Manufacturing', downloads: 890 },
                  { title: 'Data Privacy Checklist', sector: 'Healthcare', downloads: 2100 }
                ].map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{template.title}</h4>
                      <Badge variant="outline" className="mb-2">{template.sector}</Badge>
                      <p className="text-sm text-muted-foreground mb-3">
                        {template.downloads} downloads
                      </p>
                      <Button size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expert Services */}
        <TabsContent value="experts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Expert On-Demand</h2>
            <p className="text-muted-foreground mb-6">
              Book 1:1 sessions with AI strategy experts and automation specialists
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {experts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{expert.name}</CardTitle>
                      <CardDescription>{expert.title}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{expert.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({expert.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{expert.bio}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {expert.expertise.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${expert.hourlyRate}/hour</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book Session with {expert.name}</DialogTitle>
                          <DialogDescription>
                            Schedule a 1:1 consultation session
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="strategy">AI Strategy Review</SelectItem>
                              <SelectItem value="implementation">Implementation Planning</SelectItem>
                              <SelectItem value="roi">ROI Optimization</SelectItem>
                              <SelectItem value="custom">Custom Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Session duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="90">90 minutes</SelectItem>
                            </SelectContent>
                          </Select>

                          <Textarea 
                            placeholder="Describe what you'd like to discuss..."
                            className="min-h-[100px]"
                          />

                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Confirm Booking</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Audit Request */}
          <Card>
            <CardHeader>
              <CardTitle>Request Custom Audit</CardTitle>
              <CardDescription>
                Get a comprehensive review of your AI strategy and implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Audit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strategy">AI Strategy Audit</SelectItem>
                      <SelectItem value="technical">Technical Implementation Review</SelectItem>
                      <SelectItem value="process">Process Automation Assessment</SelectItem>
                      <SelectItem value="compliance">Compliance & Security Review</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input placeholder="Team size" />
                  <Input placeholder="Timeline" />
                </div>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Describe your specific needs and goals..."
                    className="min-h-[120px]"
                  />
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request Audit Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training On-Demand */}
        <TabsContent value="training" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Training On-Demand</h2>
            <p className="text-muted-foreground mb-6">
              Custom live training sessions and advanced learning paths for your team
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Live Training Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'AI Strategy Workshop (Executive Level)',
                    'Hands-on Automation Building',
                    'Prompt Engineering Masterclass',
                    'ROI Measurement & Analytics'
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{session}</div>
                        <div className="text-sm text-muted-foreground">2-4 hours • Live instruction</div>
                      </div>
                      <Button variant="outline" size="sm">Book</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Team Progress Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-3">
                    Manager view of team skill development
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: 'AI Fundamentals', progress: 85, team: 8 },
                      { skill: 'Automation Tools', progress: 65, team: 6 },
                      { skill: 'Data Analysis', progress: 40, team: 4 }
                    ].map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.skill}</span>
                          <span>{skill.team} team members</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Custom Development */}
        <TabsContent value="custom" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Custom Development</h2>
            <p className="text-muted-foreground mb-6">
              Bespoke automation workflows, integrations, and AI solutions
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Request Custom Solution
              </CardTitle>
              <CardDescription>
                Describe your unique automation or integration needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Solution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workflow">Custom Workflow</SelectItem>
                      <SelectItem value="integration">API Integration</SelectItem>
                      <SelectItem value="agent">Custom AI Agent</SelectItem>
                      <SelectItem value="dashboard">Analytics Dashboard</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Rush (1-2 weeks)</SelectItem>
                      <SelectItem value="standard">Standard (3-4 weeks)</SelectItem>
                      <SelectItem value="flexible">Flexible (5+ weeks)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea 
                  placeholder="Describe your requirements in detail..."
                  className="min-h-[150px]"
                />

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Response within 24 hours • Free scoping call included
                  </div>
                  <Button>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Your Custom Projects</CardTitle>
              <CardDescription>Track progress of active development work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active custom projects</p>
                <p className="text-sm">Submit a request above to get started</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}