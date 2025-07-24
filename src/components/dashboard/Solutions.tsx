import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { agentTemplatesData, agentCategories } from '@/data/agentTemplatesData';
import { workflowTemplatesData, workflowCategories } from '@/data/workflowTemplatesData';
import { SolutionHeroBanner } from './solutions/SolutionHeroBanner';
import { SolutionCategoryRow } from './solutions/SolutionCategoryRow';
import { SimilarSolutions } from './solutions/SimilarSolutions';
import { AgentTemplateModal } from './agents/AgentTemplateModal';
import { Search, Filter, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export type SolutionType = 'agent' | 'workflow' | 'hybrid';

export interface Solution {
  id: string;
  type: SolutionType;
  name: string;
  description: string;
  category: string[];
  department: string[];
  complexity: string;
  setupTime: string;
  roi: string;
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  data: any; // Original agent or workflow data
}

export interface SolutionFilterState {
  search: string;
  type: 'all' | SolutionType;
  department: string;
  complexity: string;
  roi: string;
  category: string;
}

interface SolutionCategory {
  id: string;
  name: string;
  filter: (solution: Solution) => boolean;
}

export function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Combine agents and workflows into unified solutions
  const allSolutions = useMemo(() => {
    const agents: Solution[] = agentTemplatesData.map(agent => ({
      id: `agent-${agent.id}`,
      type: 'agent' as SolutionType,
      name: agent.name,
      description: agent.shortDescription,
      category: agent.useCases,
      department: agent.department,
      complexity: agent.complexity,
      setupTime: agent.setupTime,
      roi: agent.estimatedROI,
      featured: agent.featured,
      trending: agent.trending,
      new: agent.newArrival,
      data: agent
    }));

    const workflows: Solution[] = workflowTemplatesData.map(workflow => ({
      id: `workflow-${workflow.id}`,
      type: 'workflow' as SolutionType,
      name: workflow.title,
      description: workflow.description,
      category: workflow.category,
      department: workflow.department,
      complexity: workflow.complexity,
      setupTime: workflow.setupTime,
      roi: workflow.roi,
      featured: workflow.featured,
      trending: workflow.trending,
      data: workflow
    }));

    return [...agents, ...workflows];
  }, []);

  // Define solution categories for Netflix-style rows
  const solutionCategories: SolutionCategory[] = [
    {
      id: 'editor-picks',
      name: '🎯 Editor\'s Picks',
      filter: (solution) => solution.featured === true
    },
    {
      id: 'trending',
      name: '🔥 Trending Now',
      filter: (solution) => solution.trending === true
    },
    {
      id: 'quick-wins',
      name: '⚡ Quick Wins for You',
      filter: (solution) => solution.complexity === 'Beginner' && solution.roi === 'High'
    },
    {
      id: 'high-roi',
      name: '💰 High ROI Solutions',
      filter: (solution) => solution.roi === 'Very High' || solution.roi === 'High'
    },
    {
      id: 'marketing-automation',
      name: '📈 Marketing Automation',
      filter: (solution) => solution.category.some(cat => cat.toLowerCase().includes('marketing')) ||
                            solution.department.includes('Marketing')
    },
    {
      id: 'sales-workflows',
      name: '💼 Sales Workflows',
      filter: (solution) => solution.department.includes('Sales')
    },
    {
      id: 'data-analytics',
      name: '📊 Data & Analytics',
      filter: (solution) => solution.category.some(cat => 
        cat.toLowerCase().includes('data') || 
        cat.toLowerCase().includes('analytics')
      )
    },
    {
      id: 'automation-workflows',
      name: '🤖 Automation Workflows',
      filter: (solution) => solution.type === 'workflow'
    },
    {
      id: 'ai-agents',
      name: '🧠 AI Agents',
      filter: (solution) => solution.type === 'agent'
    }
  ];

  // Get featured solutions for hero banner
  const featuredSolutions = useMemo(() => {
    return allSolutions.filter(solution => solution.featured).slice(0, 3);
  }, [allSolutions]);

  // Filter solutions based on search and category
  const filteredSolutions = useMemo(() => {
    let filtered = allSolutions;

    if (searchQuery) {
      filtered = filtered.filter(solution =>
        solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(solution => solution.type === selectedFilter);
    }

    return filtered;
  }, [allSolutions, searchQuery, selectedFilter]);

  // Get solutions for each category
  const categorizedSolutions = useMemo(() => {
    return solutionCategories.map(category => ({
      ...category,
      solutions: filteredSolutions.filter(category.filter).slice(0, 10) // Limit to 10 per row
    }));
  }, [filteredSolutions, solutionCategories]);

  // Find similar solutions
  const findSimilarSolutions = (currentSolution: Solution): Solution[] => {
    return allSolutions
      .filter(solution => solution.id !== currentSolution.id)
      .filter(solution => 
        solution.category.some(cat => currentSolution.category.includes(cat)) ||
        solution.department.some(dept => currentSolution.department.includes(dept)) ||
        solution.complexity === currentSolution.complexity
      )
      .slice(0, 3);
  };

  const handlePreview = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const handleCopy = (solution: Solution) => {
    toast.success(`${solution.type === 'agent' ? 'Agent' : 'Workflow'} added to roadmap!`);
  };

  const handleFavorite = (solution: Solution) => {
    toast.success(`${solution.name} added to favorites!`);
  };

  const handleDeploy = (solution: Solution) => {
    toast.success(`${solution.type === 'agent' ? 'Agent' : 'Workflow'} deployment started!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with Carousel */}
      {featuredSolutions.length > 0 && (
        <div className="px-6 pt-6">
          <SolutionHeroBanner 
            featuredSolutions={featuredSolutions} 
            onExplore={handlePreview}
          />
        </div>
      )}

      {/* Search and Quick Filters */}
      <div className="px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search agents, workflows, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Solutions</SelectItem>
                <SelectItem value="agent">AI Agents</SelectItem>
                <SelectItem value="workflow">Workflows</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden md:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              {allSolutions.length} Total Solutions
            </Badge>
          </div>
        </div>
      </div>

      {/* Netflix-style Category Rows */}
      <div className="px-6 space-y-8">
        {categorizedSolutions.map((category) => (
          <SolutionCategoryRow
            key={category.id}
            title={category.name}
            solutions={category.solutions}
            onPreview={handlePreview}
            onCopy={handleCopy}
            onFavorite={handleFavorite}
          />
        ))}

        {/* No Results State */}
        {filteredSolutions.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No solutions found</h3>
            <p className="text-muted-foreground mb-4">
              Try searching for different keywords or browse our categories above
            </p>
            <Button onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        )}
      </div>

      {/* Solution Modal */}
      {selectedSolution && (
        <>
          <AgentTemplateModal
            agent={selectedSolution.data}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onDeploy={() => handleDeploy(selectedSolution)}
            onCopy={() => handleCopy(selectedSolution)}
          />
          
          {/* Similar Solutions Component */}
          <div className="fixed bottom-4 right-4 w-80 z-50">
            <SimilarSolutions
              currentSolution={selectedSolution}
              similarSolutions={findSimilarSolutions(selectedSolution)}
              onPreview={handlePreview}
              onCopy={handleCopy}
            />
          </div>
        </>
      )}
    </div>
  );
}