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
import { industries, departments, aiTypes, useCasesData } from '@/data/useCasesData';
import { getSearchSuggestions } from '@/utils/searchUtils';

export interface FilterState {
  search: string;
  industries: string[];
  departments: string[];
  aiTypes: string[];
  complexity: string;
  maturity: string;
  suitability: string;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function SearchFilters({ filters, onFiltersChange, onReset }: SearchFiltersProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load recent searches
    try {
      const stored = localStorage.getItem('recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load recent searches:', error);
    }
  }, []);

  useEffect(() => {
    if (filters.search) {
      const newSuggestions = getSearchSuggestions(filters.search, useCasesData);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [filters.search]);

  const updateFilter = (key: keyof FilterState, value: any) => {
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
      localStorage.setItem('recent_searches', JSON.stringify(newRecent));
    } catch (error) {
      console.warn('Failed to save recent search:', error);
    }
  };

  const clearSearch = () => {
    updateFilter('search', '');
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const toggleArrayFilter = (key: 'industries' | 'departments' | 'aiTypes', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.industries.length > 0 || 
    filters.departments.length > 0 || 
    filters.aiTypes.length > 0 || 
    filters.complexity || 
    filters.maturity || 
    filters.suitability;

  return (
    <div className="space-y-4">
      {/* Enhanced Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
        <Input
          ref={searchInputRef}
          placeholder="Search use cases, industries, or AI types..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(suggestions.length > 0 || recentSearches.length > 0)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSuggestions(false);
            } else if (e.key === 'Enter' && suggestions.length > 0) {
              handleSearchSelect(suggestions[0]);
            }
          }}
          className="pl-10 pr-10"
          aria-label="Search use cases"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
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
        {showSuggestions && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1 border shadow-lg">
            <Command>
              <CommandList className="max-h-48">
                {recentSearches.length > 0 && !filters.search && (
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
                )}
                
                {suggestions.length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        onSelect={() => handleSearchSelect(suggestion)}
                        className="cursor-pointer"
                      >
                        <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {filters.search && suggestions.length === 0 && (
                  <CommandEmpty>No suggestions found for "{filters.search}"</CommandEmpty>
                )}
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
                    filters.industries.length,
                    filters.departments.length,
                    filters.aiTypes.length,
                    filters.complexity ? 1 : 0,
                    filters.maturity ? 1 : 0,
                    filters.suitability ? 1 : 0
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
                {/* Industry Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <div className="flex flex-wrap gap-1">
                    {industries.map((industry) => (
                      <Badge
                        key={industry}
                        variant={filters.industries.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleArrayFilter('industries', industry)}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Department Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Department</label>
                  <div className="flex flex-wrap gap-1">
                    {departments.map((dept) => (
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

                {/* AI Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Technology</label>
                  <div className="flex flex-wrap gap-1">
                    {aiTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={filters.aiTypes.includes(type) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleArrayFilter('aiTypes', type)}
                      >
                        {type}
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
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Maturity</label>
                    <Select value={filters.maturity} onValueChange={(value) => updateFilter('maturity', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any maturity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any maturity</SelectItem>
                        <SelectItem value="Pilot">Pilot</SelectItem>
                        <SelectItem value="Scale">Scale</SelectItem>
                        <SelectItem value="Beta">Beta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Suitability</label>
                    <Select value={filters.suitability} onValueChange={(value) => updateFilter('suitability', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any size</SelectItem>
                        <SelectItem value="SME">SME</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        {/* Active Filter Tags */}
        {filters.industries.map((industry) => (
          <Badge key={industry} variant="secondary" className="text-xs">
            {industry}
            <X 
              className="w-3 h-3 ml-1 cursor-pointer" 
              onClick={() => toggleArrayFilter('industries', industry)}
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
        
        {filters.aiTypes.map((type) => (
          <Badge key={type} variant="secondary" className="text-xs">
            {type}
            <X 
              className="w-3 h-3 ml-1 cursor-pointer" 
              onClick={() => toggleArrayFilter('aiTypes', type)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}