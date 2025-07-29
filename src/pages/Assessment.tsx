import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentSection } from '@/components/assessment/AssessmentSection';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { assessmentSections } from '@/data/assessmentData';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { formData, updateAnswer, validateSection, isComplete, isAutoSaving, getCompletionStats } = useAssessmentForm();
  const stats = getCompletionStats();

  const totalSections = assessmentSections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleNext = () => {
    if (validateSection(currentSection)) {
      if (currentSection < totalSections - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (showResults) {
    return <AssessmentResults formData={formData} />;
  }

  const currentSectionData = assessmentSections[currentSection];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">AI Maturity Assessment</h1>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Section {currentSection + 1} of {totalSections}
            </span>
          </div>
          
          <Progress value={progress} className="h-2 mb-2" />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Progress: {Math.round(progress)}%</span>
              {isAutoSaving && <span className="text-primary">• Saving...</span>}
            </div>
            <span className="hidden sm:inline">Est. {currentSectionData.estimatedTime} remaining</span>
          </div>
        </div>

        {/* Current Section */}
        <Card className="mb-6 md:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {currentSection + 1}
                </span>
                <span className="text-lg md:text-xl">{currentSectionData.title}</span>
              </div>
              <span className="text-sm font-normal text-muted-foreground">
                ({currentSectionData.weight})
              </span>
            </CardTitle>
            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground">
                {currentSectionData.description}
              </p>
              {currentSectionData.detailedDescription && (
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border">
                  💡 {currentSectionData.detailedDescription}
                </p>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <AssessmentSection
              section={currentSectionData}
              sectionIndex={currentSection}
              formData={formData}
              updateAnswer={updateAnswer}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="sticky bottom-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg border shadow-lg">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="flex items-center gap-2"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            {/* Mobile-optimized progress dots */}
            <div className="flex gap-1 md:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
              {assessmentSections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    index === currentSection
                      ? 'bg-primary'
                      : index < currentSection
                      ? 'bg-primary/60'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
              size="sm"
            >
              <span className="hidden sm:inline">
                {currentSection === totalSections - 1 ? 'Complete Assessment' : 'Next'}
              </span>
              <span className="sm:hidden">
                {currentSection === totalSections - 1 ? 'Complete' : 'Next'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;