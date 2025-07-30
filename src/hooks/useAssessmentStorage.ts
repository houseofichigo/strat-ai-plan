import { useState, useCallback } from 'react';
import { FormData, assessmentSections } from '@/data/assessmentData';
import { useToast } from '@/hooks/use-toast';

export interface AssessmentSubmission {
  id: string;
  user_id: string;
  submission_date: string;
  completion_status: 'in_progress' | 'completed' | 'abandoned';
  completion_percentage: number;
  total_score?: number;
}

export const useAssessmentStorage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null);
  const { toast } = useToast();

  // Create a new assessment submission (using localStorage for now)
  const createAssessment = useCallback(async (): Promise<string | null> => {
    try {
      setIsLoading(true);
      
      // Generate a unique assessment ID
      const assessmentId = crypto.randomUUID();
      
      // Store assessment metadata in localStorage
      const assessmentMetadata = {
        id: assessmentId,
        started_at: new Date().toISOString(),
        status: 'in_progress',
        total_questions: 92
      };
      
      localStorage.setItem(`assessment_${assessmentId}`, JSON.stringify(assessmentMetadata));
      
      setCurrentAssessmentId(assessmentId);
      
      toast({
        title: "Assessment Started",
        description: "Your progress will be saved automatically.",
      });
      
      return assessmentId;
    } catch (error) {
      console.error('Error creating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to create assessment. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Save form data to localStorage
  const saveFormData = useCallback(async (
    assessmentId: string,
    formData: FormData
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Count answered questions for all 92 questions
      let totalQuestions = 0;
      let answeredQuestions = 0;

      assessmentSections.forEach((section) => {
        section.questions.forEach((question) => {
          totalQuestions++; // Count all questions, not just required ones for accurate tracking
          const sectionData = formData[section.id] || {};
          const answer = sectionData[question.id];
          if (answer && answer !== '' && (!Array.isArray(answer) || answer.length > 0)) {
            answeredQuestions++;
          }
        });
      });

      const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

      // Store assessment data
      const assessmentData = {
        assessment_id: assessmentId,
        form_data: formData,
        total_questions: totalQuestions,
        answered_questions: answeredQuestions,
        completion_percentage: completionPercentage,
        updated_at: new Date().toISOString()
      };

      localStorage.setItem(`assessment_data_${assessmentId}`, JSON.stringify(assessmentData));

      // Update metadata
      const metadata = JSON.parse(localStorage.getItem(`assessment_${assessmentId}`) || '{}');
      metadata.completion_percentage = completionPercentage;
      metadata.answered_questions = answeredQuestions;
      metadata.updated_at = new Date().toISOString();
      localStorage.setItem(`assessment_${assessmentId}`, JSON.stringify(metadata));

      return true;
    } catch (error) {
      console.error('Error saving form data:', error);
      toast({
        title: "Save Error",
        description: "Failed to save assessment progress. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Save individual question response
  const saveResponse = useCallback(async (
    assessmentId: string,
    sectionId: string,
    questionId: string,
    value: string | string[]
  ): Promise<boolean> => {
    try {
      // Load existing data
      const stored = localStorage.getItem(`assessment_data_${assessmentId}`);
      const assessmentData = stored ? JSON.parse(stored) : { form_data: {} };
      
      // Update specific response
      if (!assessmentData.form_data[sectionId]) {
        assessmentData.form_data[sectionId] = {};
      }
      assessmentData.form_data[sectionId][questionId] = value;
      
      // Save back to localStorage
      await saveFormData(assessmentId, assessmentData.form_data);
      
      return true;
    } catch (error) {
      console.error('Error saving individual response:', error);
      return false;
    }
  }, [saveFormData]);

  // Load existing assessment data
  const loadAssessment = useCallback(async (assessmentId: string): Promise<FormData | null> => {
    try {
      setIsLoading(true);
      
      const stored = localStorage.getItem(`assessment_data_${assessmentId}`);
      if (!stored) return null;
      
      const assessmentData = JSON.parse(stored);
      return assessmentData.form_data || {};
    } catch (error) {
      console.error('Error loading assessment:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get user's assessments
  const getUserAssessments = useCallback(async (): Promise<AssessmentSubmission[]> => {
    try {
      const assessments: AssessmentSubmission[] = [];
      
      // Search localStorage for assessment data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('assessment_') && !key.includes('assessment_data_')) {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          assessments.push({
            id: data.id,
            user_id: 'local', // Since we're using localStorage
            submission_date: data.started_at || data.updated_at,
            completion_status: data.status || 'in_progress',
            completion_percentage: data.completion_percentage || 0,
            total_score: data.total_score
          });
        }
      }
      
      return assessments.sort((a, b) => 
        new Date(b.submission_date).getTime() - new Date(a.submission_date).getTime()
      );
    } catch (error) {
      console.error('Error fetching assessments:', error);
      return [];
    }
  }, []);

  // Complete assessment and calculate scores
  const completeAssessment = useCallback(async (
    assessmentId: string,
    formData: FormData
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Save final form data
      const success = await saveFormData(assessmentId, formData);
      
      if (success) {
        // Update status to completed
        const metadata = JSON.parse(localStorage.getItem(`assessment_${assessmentId}`) || '{}');
        metadata.status = 'completed';
        metadata.completed_at = new Date().toISOString();
        localStorage.setItem(`assessment_${assessmentId}`, JSON.stringify(metadata));
        
        // Count all answered questions from the 92 total
        let totalAnswered = 0;
        assessmentSections.forEach((section) => {
          section.questions.forEach((question) => {
            const sectionData = formData[section.id] || {};
            const answer = sectionData[question.id];
            if (answer && answer !== '' && (!Array.isArray(answer) || answer.length > 0)) {
              totalAnswered++;
            }
          });
        });
        
        toast({
          title: "Assessment Completed!",
          description: `Your AI readiness assessment has been saved successfully. ${totalAnswered}/92 questions answered.`,
        });
      }

      return success;
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: "Completion Error", 
        description: "Failed to complete assessment. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [saveFormData, toast]);

  return {
    isLoading,
    currentAssessmentId,
    createAssessment,
    saveResponse,
    saveFormData,
    loadAssessment,
    getUserAssessments,
    completeAssessment,
    setCurrentAssessmentId
  };
};