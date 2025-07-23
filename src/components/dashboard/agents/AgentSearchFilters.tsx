import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X, Clock } from 'lucide-react';
import { agentDepartments, agentComplexities, agentROIs, agentApps } from '@/data/agentTemplatesData';

export interface AgentFilterState {
  search: string;
  apps: string[];
  categories: string[];
  departments: string[];
  complexity: string;
  roi: string;
  setupTime: string;
}

interface AgentSearchFiltersProps {
  filters: AgentFilterState;
  onFiltersChange: (filters: AgentFilterState) => void;
  onReset: () => void;
}

const agentCategoriesList = [
  'Data & Storage', 'Marketing', 'Communication', 'Productivity', 'Wellness', 
  'Analytics', 'Sales', 'APIs', 'Monitoring', 'Automation'
];

export function AgentSearchFilters({ filters, onFiltersChange, onReset }: AgentSearchFiltersProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load recent searches
    try {
      const stored = localStorage.getItem('agent_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load recent searches:', error);
    }
  }, []);

  const updateFilter = (key: keyof AgentFilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSearchChange = (value: string) => {
    updateFilter('search', value);
  };

  const handleSearchSelect = (value: string) => {
    updateFilter('search', value);
    setShowSuggestions(false);
    
    // Add to recent searches
    const newRecent = [value, ...recentSearches.filter(s => s !== value)].slice(0, 5);
    setRecentSearches(newRecent);
    try {
      localStorage.setItem('agent_recent_searches', JSON.stringify(newRecent));
    } catch (error) {
      console.warn('Failed to save recent search:', error);
    }
  };

  const clearSearch = () => {
    updateFilter('search', '');
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const toggleArrayFilter = (key: 'apps' | 'categories' | 'departments', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.apps.length > 0 || 
    filters.categories.length > 0 || 
    filters.departments.length > 0 || 
    filters.complexity || 
    filters.roi || 
    filters.setupTime;

  return (
    <div className="space-y-4">
      {/* Enhanced Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
        <Input
          ref={searchInputRef}
          placeholder="Search agent templates, apps, or categories..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(recentSearches.length > 0)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSuggestions(false);
            }
          }}
          className="pl-10 pr-10"
          aria-label="Search agent templates"
        />
        {filters.search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground w-4 h-4"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search Suggestions Dropdown */}
        {showSuggestions && recentSearches.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1 border shadow-lg">
            <Command>
              <CommandList className="max-h-48">
                <CommandGroup heading="Recent Searches">
                  {recentSearches.map((search) => (
                    <CommandItem
                      key={search}
                      onSelect={() => handleSearchSelect(search)}
                      className="cursor-pointer"
                    >
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      {search}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </Card>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                  {[
                    filters.apps.length,
                    filters.categories.length,
                    filters.departments.length,
                    filters.complexity ? 1 : 0,
                    filters.roi ? 1 : 0,
                    filters.setupTime ? 1 : 0
                  ].reduce((a, b) => a + b, 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <Card className="border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={onReset}>
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Apps/Stack Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Apps & Stack</label>
                  <div className="flex flex-wrap gap-1">
                    {agentApps.map((app) => (
                      <Badge
                        key={app}
                        variant={filters.apps.includes(app) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleArrayFilter('apps', app)}
                      >
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categories</label>
                  <div className="flex flex-wrap gap-1">
                    {agentCategoriesList.map((category) => (
                      <Badge
                        key={category}
                        variant={filters.categories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleArrayFilter('categories', category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Department Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Department</label>
                  <div className="flex flex-wrap gap-1">
                    {agentDepartments.map((dept) => (
                      <Badge
                        key={dept}
                        variant={filters.departments.includes(dept) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleArrayFilter('departments', dept)}
                      >
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Dropdown Filters */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Complexity</label>
                    <Select value={filters.complexity} onValueChange={(value) => updateFilter('complexity', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any complexity</SelectItem>
                        {agentComplexities.map((complexity) => (
                          <SelectItem key={complexity} value={complexity}>
                            {complexity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">ROI</label>
                    <Select value={filters.roi} onValueChange={(value) => updateFilter('roi', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any ROI" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any ROI</SelectItem>
                        {agentROIs.map((roi) => (
                          <SelectItem key={roi} value={roi}>
                            {roi}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Setup Time</label>
                    <Select value={filters.setupTime} onValueChange={(value) => updateFilter('setupTime', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any time</SelectItem>
                        <SelectItem value="0-5">0-5 minutes</SelectItem>
                        <SelectItem value="5-10">5-10 minutes</SelectItem>
                        <SelectItem value="10-15">10-15 minutes</SelectItem>
                        <SelectItem value="15+">15+ minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        {/* Active Filter Tags */}
        {filters.apps.map((app) => (
          <Badge key={app} variant="secondary" className="text-xs">
            {app}
            <X 
              className="w-3 h-3 ml-1 cursor-pointer" 
              onClick={() => toggleArrayFilter('apps', app)}
            />
          </Badge>
        ))}
        
        {filters.categories.map((category) => (
          <Badge key={category} variant="secondary" className="text-xs">
            {category}
            <X 
              className="w-3 h-3 ml-1 cursor-pointer" 
              onClick={() => toggleArrayFilter('categories', category)}
            />
          </Badge>
        ))}
        
        {filters.departments.map((dept) => (
          <Badge key={dept} variant="secondary" className="text-xs">
            {dept}
            <X 
              className="w-3 h-3 ml-1 cursor-pointer" 
              onClick={() => toggleArrayFilter('departments', dept)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}