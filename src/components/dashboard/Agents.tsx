import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { AgentHeroBanner } from './agents/AgentHeroBanner';
import { AgentCategoryRow } from './agents/AgentCategoryRow';
import { AgentSearchFilters, AgentFilterState } from './agents/AgentSearchFilters';
import { AgentTemplateCard } from './agents/AgentTemplateCard';
import { AgentTemplateModal } from './agents/AgentTemplateModal';
import { AgentLoadingSkeletons } from './agents/AgentLoadingSkeletons';
import { agentTemplatesData, agentCategories, AgentTemplate } from '@/data/agentTemplatesData';
import { analytics } from '@/utils/analytics';
import { roadmapManager } from '@/data/roadmapData';

export function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<AgentTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<AgentFilterState>({
    search: '',
    apps: [],
    categories: [],
    departments: [],
    complexity: '',
    roi: '',
    setupTime: ''
  });

  // Simulate loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAgents = useMemo(() => {
    return agentTemplatesData.filter(agent => {
      // Search filter
      if (filters.search && !agent.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !agent.shortDescription.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Apps filter
      if (filters.apps.length > 0 && !filters.apps.some(app => agent.stack.includes(app))) {
        return false;
      }

      // Categories filter
      if (filters.categories.length > 0 && !filters.categories.some(cat => agent.category.includes(cat))) {
        return false;
      }

      // Departments filter
      if (filters.departments.length > 0 && !filters.departments.some(dept => agent.department.includes(dept))) {
        return false;
      }

      // Complexity filter
      if (filters.complexity && agent.complexity !== filters.complexity) {
        return false;
      }

      // ROI filter
      if (filters.roi && agent.estimatedROI !== filters.roi) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const featuredAgents = agentTemplatesData.filter(agent => agent.featured);

  const handlePreview = (agent: AgentTemplate) => {
    analytics.track(agent.id, 'view');
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCopy = (agent: AgentTemplate) => {
    analytics.track(agent.id, 'add_to_roadmap');
    
    // Add to roadmap
    const roadmapItem = roadmapManager.addItem({
      title: agent.name,
      description: agent.shortDescription,
      category: 'Agent',
      type: agent.category[0] || 'General',
      source: 'agents',
      sourceId: agent.id,
      status: 'To Plan',
      priority: agent.complexity === 'Beginner' ? 'Medium' : 'High',
      estimatedEffort: agent.setupTime,
      timeline: agent.setupTime,
      owner: agent.department[0] + ' Team',
      assignees: [],
      prerequisites: agent.stack || [],
      implementationSteps: agent.implementationSteps || [],
      successMetrics: agent.useCases || [],
      dependencies: [],
      notes: `Added from Agent Templates: ${agent.shortDescription}`,
      tags: [...agent.category, ...agent.department, ...agent.stack],
      progress: 0,
      icon: '🤖',
      colorTheme: agent.colorTheme
    });
    
    toast.success(`"${agent.name}" template added to roadmap!`);
  };

  const handleFavorite = (agent: AgentTemplate) => {
    toast.success(`"${agent.name}" added to favorites!`);
  };

  const handleDeploy = (agent: AgentTemplate) => {
    analytics.track(agent.id, 'add_to_roadmap');
    toast.success(`Deploying "${agent.name}" template...`);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      apps: [],
      categories: [],
      departments: [],
      complexity: '',
      roi: '',
      setupTime: ''
    });
  };

  const hasActiveFilters = filters.search || 
    filters.apps.length > 0 || 
    filters.categories.length > 0 || 
    filters.departments.length > 0 || 
    filters.complexity || 
    filters.roi || 
    filters.setupTime;

  if (isLoading) {
    return <AgentLoadingSkeletons />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      {!hasActiveFilters && (
        <div className="px-6 pt-6">
          <AgentHeroBanner 
            featuredAgents={featuredAgents} 
            onExplore={handlePreview}
          />
        </div>
      )}

      {/* Search and Filters */}
      <div className="px-6 mb-6">
        <AgentSearchFilters 
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
        />
      </div>

      {/* Content */}
      <div className="px-6">
        {hasActiveFilters ? (
          // Filtered Results Grid
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Agent Templates ({filteredAgents.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map((agent) => (
                <AgentTemplateCard
                  key={agent.id}
                  agent={agent}
                  onPreview={handlePreview}
                  onCopy={handleCopy}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">No agent templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          // Category Rows (Netflix-style)
          <div>
            {agentCategories.map((category) => {
              const categoryAgents = agentTemplatesData.filter(category.filter);
              return (
                <AgentCategoryRow
                  key={category.id}
                  title={category.name}
                  agents={categoryAgents}
                  onPreview={handlePreview}
                  onCopy={handleCopy}
                  onFavorite={handleFavorite}
                />
              );
            })}

            {/* All Agent Templates Grid */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">All Agent Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {agentTemplatesData.map((agent) => (
                  <AgentTemplateCard
                    key={agent.id}
                    agent={agent}
                    onPreview={handlePreview}
                    onCopy={handleCopy}
                    onFavorite={handleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AgentTemplateModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeploy={handleDeploy}
        onCopy={handleCopy}
      />
    </div>
  );
}