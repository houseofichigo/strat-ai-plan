import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Filter, Download, Bookmark, Share2, Star, 
  Calendar, Award, Users, Building2, Code, FileText,
  Shield, HelpCircle, MessageCircle, ThumbsUp, ExternalLink,
  TrendingUp, Clock, CheckCircle, Plus, Heart, Eye
} from 'lucide-react';
import { resourceHubData } from '@/data/resourceHubData';

export function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedModal, setSelectedModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedResources, setSavedResources] = useState(new Set());
  const [userQuestion, setUserQuestion] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleSaveResource = (resourceId) => {
    const newSaved = new Set(savedResources);
    if (newSaved.has(resourceId)) {
      newSaved.delete(resourceId);
      toast.success('Resource removed from saved items');
    } else {
      newSaved.add(resourceId);
      toast.success('Resource saved to your profile');
    }
    setSavedResources(newSaved);
  };

  const handleDownload = (resource) => {
    toast.success(`Downloading "${resource.title}"...`);
  };

  const handleShare = (resource) => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Resource link copied to clipboard');
  };

  const handleViewResource = (resource) => {
    setSelectedModal(resource);
    setIsModalOpen(true);
  };

  const handleSubmitQuestion = () => {
    if (userQuestion.trim()) {
      toast.success('Your question has been submitted to the community!');
      setUserQuestion('');
      setIsSubmitModalOpen(false);
    }
  };

  const filteredResources = useMemo(() => {
    return resourceHubData.resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  const groupedResources = useMemo(() => {
    const groups = {};
    resourceHubData.categories.forEach(category => {
      groups[category.id] = filteredResources.filter(resource => resource.category === category.id);
    });
    return groups;
  }, [filteredResources]);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'playbook': return FileText;
      case 'case-study': return Building2;
      case 'integration': return Code;
      case 'compliance': return Shield;
      case 'faq': return HelpCircle;
      case 'community': return MessageCircle;
      default: return FileText;
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-6 pt-6 mb-8">
        <Card className="border-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Award className="w-3 h-3 mr-1" />
                World-Class Resources
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Resource Hub
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Actionable content to help you execute, learn, connect, and scale. 
                Always relevant, always up-to-date, community-driven.
              </p>
              
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search resources, guides, case studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {resourceHubData.categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="playbook">Playbooks</SelectItem>
                    <SelectItem value="case-study">Case Studies</SelectItem>
                    <SelectItem value="integration">Integrations</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editor's Picks */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-500" />
          <h2 className="text-2xl font-bold">Editor's Picks</h2>
          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceHubData.editorsPicks.map((resource) => {
            const IconComponent = getResourceIcon(resource.type);
            return (
              <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Editor's Choice
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleSaveResource(resource.id)}
                      >
                        <Bookmark className={`w-4 h-4 ${savedResources.has(resource.id) ? 'fill-current text-primary' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleShare(resource)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {resource.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {resource.lastUpdated}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      {resource.rating}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleViewResource(resource)}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    {resource.downloadable && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload(resource)}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="px-6">
        {resourceHubData.categories.map((category) => {
          const categoryResources = groupedResources[category.id];
          if (!categoryResources || categoryResources.length === 0) return null;

          return (
            <div key={category.id} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <category.icon className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">{category.name}</h2>
                  <Badge variant="outline">{categoryResources.length} resources</Badge>
                </div>
                <Button variant="ghost" className="text-primary">
                  View All
                </Button>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-3xl">
                {category.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryResources.slice(0, 6).map((resource) => {
                  const IconComponent = getResourceIcon(resource.type);
                  return (
                    <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-primary" />
                            <Badge variant="outline" className="text-xs">
                              {resource.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0"
                              onClick={() => handleSaveResource(resource.id)}
                            >
                              <Bookmark className={`w-3 h-3 ${savedResources.has(resource.id) ? 'fill-current text-primary' : ''}`} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0"
                              onClick={() => handleShare(resource)}
                            >
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {resource.summary}
                        </p>
                        
                        {resource.complexity && (
                          <Badge className={`text-xs mb-3 ${getComplexityColor(resource.complexity)}`}>
                            {resource.complexity}
                          </Badge>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {resource.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {resource.lastUpdated}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            {resource.rating}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleViewResource(resource)}
                            className="flex-1"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          {resource.downloadable && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownload(resource)}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Q&A Section */}
      <div className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Community Q&A</h2>
            </div>
            <Button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-primary text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </div>
          
          <div className="space-y-4">
            {resourceHubData.communityQA.map((qa) => (
              <Card key={qa.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg mb-2">{qa.question}</h3>
                  {qa.editorChoice && (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Award className="w-3 h-3 mr-1" />
                      Editor's Choice
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{qa.answer}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {qa.upvotes}
                    </div>
                    <span>{qa.date}</span>
                    <div className="flex gap-1">
                      {qa.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Read More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedModal && (
            <>
              <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {React.createElement(getResourceIcon(selectedModal.type), { className: "w-6 h-6 text-primary" })}
                    <div>
                      <DialogTitle className="text-2xl mb-2">{selectedModal.title}</DialogTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline">{selectedModal.type.replace('-', ' ')}</Badge>
                        {selectedModal.complexity && (
                          <Badge className={getComplexityColor(selectedModal.complexity)}>
                            {selectedModal.complexity}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSaveResource(selectedModal.id)}
                    >
                      <Bookmark className={`w-4 h-4 mr-1 ${savedResources.has(selectedModal.id) ? 'fill-current' : ''}`} />
                      {savedResources.has(selectedModal.id) ? 'Saved' : 'Save'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleShare(selectedModal)}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground">{selectedModal.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedModal.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold">{selectedModal.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{selectedModal.views || '1.2k'}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{selectedModal.downloads || '340'}</div>
                    <div className="text-xs text-muted-foreground">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{selectedModal.lastUpdated}</div>
                    <div className="text-xs text-muted-foreground">Updated</div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    size="lg" 
                    onClick={() => handleViewResource(selectedModal)}
                    className="flex-1"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Open Resource
                  </Button>
                  {selectedModal.downloadable && (
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => handleDownload(selectedModal)}
                      className="flex-1"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Submit Question Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ask the Community</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Question</label>
              <Textarea
                placeholder="What would you like to know about AI implementation, best practices, or troubleshooting?"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitQuestion} className="flex-1">
                Submit Question
              </Button>
              <Button variant="outline" onClick={() => setIsSubmitModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}