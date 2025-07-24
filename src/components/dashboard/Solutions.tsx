import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { agentTemplatesData, agentCategories, agentComplexities, agentROIs, agentDepartments } from '@/data/agentTemplatesData';
import { workflowTemplatesData, workflowCategories } from '@/data/workflowTemplatesData';
import { AgentTemplateCard } from './agents/AgentTemplateCard';
import { WorkflowSolutionCard } from './solutions/WorkflowSolutionCard';
import { AgentTemplateModal } from './agents/AgentTemplateModal';
import { SolutionFilters } from './solutions/SolutionFilters';
import { SolutionStats } from './solutions/SolutionStats';
import { Search, Filter, Grid, List } from 'lucide-react';
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

export function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SolutionFilterState>({
    search: '',
    type: 'all',
    department: '',
    complexity: '',
    roi: '',
    category: ''
  });

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

  // Filter solutions
  const filteredSolutions = useMemo(() => {
    return allSolutions.filter(solution => {
      const matchesSearch = solution.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           solution.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesType = filters.type === 'all' || solution.type === filters.type;
      
      const matchesDepartment = !filters.department || 
                               solution.department.some(dept => dept.toLowerCase().includes(filters.department.toLowerCase()));
      
      const matchesComplexity = !filters.complexity || solution.complexity === filters.complexity;
      
      const matchesROI = !filters.roi || solution.roi === filters.roi;
      
      const matchesCategory = !filters.category || 
                             solution.category.some(cat => cat.toLowerCase().includes(filters.category.toLowerCase()));

      return matchesSearch && matchesType && matchesDepartment && matchesComplexity && matchesROI && matchesCategory;
    });
  }, [allSolutions, filters]);

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

  const resetFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      department: '',
      complexity: '',
      roi: '',
      category: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 'all');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-6 pt-6 mb-8">
        <Card className="border-0 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                All-in-One Solutions Hub
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                AI Agents & Automation Workflows
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover the perfect solution for your needs. From intelligent AI agents to powerful automation workflows, 
                find everything you need to transform your business processes.
              </p>
              
              <SolutionStats solutions={allSolutions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="px-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex flex-1 gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search solutions..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>
            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value as any }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="agent">AI Agents</SelectItem>
                <SelectItem value="workflow">Workflows</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters} className="text-sm">
                Clear Filters
              </Button>
            )}
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <SolutionFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Results */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filteredSolutions.length} Solutions Found
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredSolutions.map((solution) => {
            if (solution.type === 'agent') {
              return (
                <AgentTemplateCard
                  key={solution.id}
                  agent={solution.data}
                  onPreview={() => handlePreview(solution)}
                  onCopy={() => handleCopy(solution)}
                  onFavorite={() => handleFavorite(solution)}
                  className={viewMode === 'list' ? 'flex-row' : ''}
                />
              );
            } else {
              return (
                <WorkflowSolutionCard
                  key={solution.id}
                  workflow={solution.data}
                  onPreview={() => handlePreview(solution)}
                  onCopy={() => handleCopy(solution)}
                  onFavorite={() => handleFavorite(solution)}
                  className={viewMode === 'list' ? 'flex-row' : ''}
                />
              );
            }
          })}
        </div>

        {filteredSolutions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No solutions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={resetFilters}>Clear all filters</Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedSolution && (
        <AgentTemplateModal
          agent={selectedSolution.data}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDeploy={() => handleDeploy(selectedSolution)}
          onCopy={() => handleCopy(selectedSolution)}
        />
      )}
    </div>
  );
}