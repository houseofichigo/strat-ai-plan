import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { HeroBanner } from './usecases/HeroBanner';
import { CategoryRow } from './usecases/CategoryRow';
import { SearchFilters, FilterState } from './usecases/SearchFilters';
import { UseCaseCard } from './usecases/UseCaseCard';
import { UseCaseModal } from './usecases/UseCaseModal';
import { HeroBannerSkeleton, CategoryRowSkeleton, UseCaseCardSkeleton } from './usecases/LoadingSkeletons';
import { useCasesData, categories, UseCase } from '@/data/useCasesData';
import { analytics } from '@/utils/analytics';
import { roadmapManager } from '@/data/roadmapData';

export function UseCases() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industries: [],
    departments: [],
    aiTypes: [],
    complexity: '',
    maturity: '',
    suitability: ''
  });

  // Simulate loading for demonstration
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredUseCases = useMemo(() => {
    return useCasesData.filter(useCase => {
      // Search filter
      if (filters.search && !useCase.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !useCase.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Industry filter
      if (filters.industries.length > 0 && !filters.industries.some(industry => useCase.industry.includes(industry))) {
        return false;
      }

      // Department filter
      if (filters.departments.length > 0 && !filters.departments.some(dept => useCase.department.includes(dept))) {
        return false;
      }

      // AI Type filter
      if (filters.aiTypes.length > 0 && !filters.aiTypes.some(type => useCase.aiType.includes(type))) {
        return false;
      }

      // Complexity filter
      if (filters.complexity && useCase.complexity !== filters.complexity) {
        return false;
      }

      // Maturity filter
      if (filters.maturity && useCase.maturity !== filters.maturity) {
        return false;
      }

      // Suitability filter
      if (filters.suitability && useCase.suitability !== filters.suitability) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const featuredUseCases = useCasesData.filter(uc => uc.featured);

  const handleViewDetails = (useCase: UseCase) => {
    analytics.track(useCase.id, 'view');
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
  };

  const handleAddToRoadmap = (useCase: UseCase) => {
    analytics.track(useCase.id, 'add_to_roadmap');
    
    // Add to roadmap
    const roadmapItem = roadmapManager.addItem({
      title: useCase.title,
      description: useCase.description,
      category: 'Use Case',
      type: useCase.industry[0] || 'General',
      source: 'use-cases',
      sourceId: useCase.id,
      status: 'To Plan',
      priority: useCase.complexity === 'Low' ? 'Medium' : 'High',
      estimatedEffort: useCase.timeline || '4-6 weeks',
      timeline: useCase.timeline || '4-6 weeks',
      owner: useCase.industry[0] + ' Team',
      assignees: [],
      prerequisites: useCase.dataRequirements || [],
      implementationSteps: useCase.implementationSteps || [],
      successMetrics: useCase.successMetrics || [],
      dependencies: [],
      notes: `Added from Use Cases: ${useCase.summaryValue}`,
      tags: [...useCase.industry, ...useCase.department, ...useCase.aiType],
      progress: 0,
      icon: '💡',
      colorTheme: 'blue'
    });
    
    toast.success(`"${useCase.title}" added to roadmap!`);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      industries: [],
      departments: [],
      aiTypes: [],
      complexity: '',
      maturity: '',
      suitability: ''
    });
  };

  const hasActiveFilters = filters.search || 
    filters.industries.length > 0 || 
    filters.departments.length > 0 || 
    filters.aiTypes.length > 0 || 
    filters.complexity || 
    filters.maturity || 
    filters.suitability;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-6 pt-6">
          <HeroBannerSkeleton />
        </div>
        <div className="px-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CategoryRowSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      {!hasActiveFilters && (
        <div className="px-6 pt-6">
          <HeroBanner 
            featuredUseCases={featuredUseCases} 
            onExplore={handleViewDetails}
          />
        </div>
      )}

      {/* Search and Filters */}
      <div className="px-6 mb-6">
        <SearchFilters 
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
                Search Results ({filteredUseCases.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUseCases.map((useCase) => (
                <UseCaseCard
                  key={useCase.id}
                  useCase={useCase}
                  onViewDetails={handleViewDetails}
                  onAddToRoadmap={handleAddToRoadmap}
                />
              ))}
            </div>

            {filteredUseCases.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No use cases found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          // Category Rows (Netflix-style)
          <div>
            {categories.map((category) => {
              const categoryUseCases = useCasesData.filter(category.filter);
              return (
                <CategoryRow
                  key={category.id}
                  title={category.name}
                  useCases={categoryUseCases}
                  onViewDetails={handleViewDetails}
                  onAddToRoadmap={handleAddToRoadmap}
                />
              );
            })}

            {/* All Use Cases Grid */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">All Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {useCasesData.map((useCase) => (
                  <UseCaseCard
                    key={useCase.id}
                    useCase={useCase}
                    onViewDetails={handleViewDetails}
                    onAddToRoadmap={handleAddToRoadmap}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <UseCaseModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToRoadmap={handleAddToRoadmap}
      />
    </div>
  );
}