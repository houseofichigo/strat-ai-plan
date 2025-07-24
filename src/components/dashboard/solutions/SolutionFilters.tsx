import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SolutionFilterState } from '../Solutions';

interface SolutionFiltersProps {
  filters: SolutionFilterState;
  onFiltersChange: (filters: SolutionFilterState) => void;
}

const departments = [
  'Sales', 'Marketing', 'HR', 'Finance', 'IT', 'Operations', 
  'Customer Service', 'Legal', 'Analytics', 'Product'
];

const complexities = ['Beginner', 'Intermediate', 'Advanced'];

const roiLevels = ['High', 'Very High', 'Medium'];

const categories = [
  'Automation', 'Data Analysis', 'Customer Service', 'Content Creation',
  'Communication', 'Project Management', 'Security', 'Integration'
];

export function SolutionFilters({ filters, onFiltersChange }: SolutionFiltersProps) {
  const updateFilter = (key: keyof SolutionFilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-muted/30 rounded-lg">
      <Select value={filters.department} onValueChange={(value) => updateFilter('department', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.complexity} onValueChange={(value) => updateFilter('complexity', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Complexity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {complexities.map((complexity) => (
            <SelectItem key={complexity} value={complexity}>{complexity}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.roi} onValueChange={(value) => updateFilter('roi', value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="ROI" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All ROI</SelectItem>
          {roiLevels.map((roi) => (
            <SelectItem key={roi} value={roi}>{roi}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}