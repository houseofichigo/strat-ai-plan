import React from 'react';
import { AssessmentQuestion } from '@/data/assessmentData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';

interface QuestionMultiSelectProps {
  question: AssessmentQuestion;
  value: string[];
  onChange: (value: string[]) => void;
  sectionId: string;
}

export const QuestionMultiSelect: React.FC<QuestionMultiSelectProps> = ({
  question,
  value,
  onChange,
  sectionId
}) => {
  const { getError } = useAssessmentForm();
  const error = getError(sectionId, question.id);

  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(v => v !== option));
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <Label className="text-base font-medium leading-relaxed">
              {question.text}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {question.description && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {question.description}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">Select all that apply</p>
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </div>
          {question.tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{question.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                id={`${question.id}-${index}`}
                checked={value.includes(option)}
                onCheckedChange={(checked) => handleChange(option, checked as boolean)}
              />
              <Label 
                htmlFor={`${question.id}-${index}`}
                className="flex-1 cursor-pointer leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};