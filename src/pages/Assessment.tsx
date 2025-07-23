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
  const { formData, updateAnswer, validateSection, isComplete } = useAssessmentForm();

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
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">AI Maturity Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Section {currentSection + 1} of {totalSections}
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Est. {currentSectionData.estimatedTime} remaining</span>
          </div>
        </div>

        {/* Current Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                {currentSection + 1}
              </span>
              {currentSectionData.title}
              <span className="text-sm font-normal text-muted-foreground ml-2">
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
        <div className="flex justify-between items-center sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {assessmentSections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
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
          >
            {currentSection === totalSections - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;