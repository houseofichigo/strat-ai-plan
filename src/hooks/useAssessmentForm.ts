import { useState, useEffect, useCallback } from 'react';
import { assessmentSections, FormData } from '@/data/assessmentData';
import { useAssessmentStorage } from './useAssessmentStorage';

export const useAssessmentForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const {
    currentAssessmentId,
    createAssessment,
    saveResponse,
    saveFormData,
    loadAssessment,
    completeAssessment,
    setCurrentAssessmentId
  } = useAssessmentStorage();

  // Auto-save functionality (both local and Supabase)
  const saveToStorage = useCallback(async (data: FormData) => {
    try {
      // Save to localStorage as backup
      localStorage.setItem('assessment_progress', JSON.stringify({
        data,
        timestamp: Date.now(),
        version: '1.0',
        assessmentId: currentAssessmentId
      }));

      // Save to Supabase if we have an assessment ID
      if (currentAssessmentId) {
        await saveFormData(currentAssessmentId, data);
      }
    } catch (error) {
      console.warn('Failed to save assessment progress:', error);
    }
  }, [currentAssessmentId, saveFormData]);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('assessment_progress');
      if (saved) {
        const { data, timestamp } = JSON.parse(saved);
        // Only restore if saved within last 7 days
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setFormData(data);
        }
      }
    } catch (error) {
      console.warn('Failed to load assessment progress:', error);
    }
  }, []);

  // Auto-save with debouncing
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      setIsAutoSaving(true);
      const timer = setTimeout(() => {
        saveToStorage(formData);
        setIsAutoSaving(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formData, saveToStorage]);

  const updateAnswer = useCallback(async (sectionId: string, questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [questionId]: value
      }
    }));
    
    // Clear error when user provides answer
    const errorKey = `${sectionId}.${questionId}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }

    // Save individual response to Supabase
    if (currentAssessmentId) {
      await saveResponse(currentAssessmentId, sectionId, questionId, value);
    }
  }, [errors, currentAssessmentId, saveResponse]);

  const validateSection = useCallback((sectionIndex: number): boolean => {
    const section = assessmentSections[sectionIndex];
    const sectionData = formData[section.id] || {};
    const newErrors: {[key: string]: string} = {};
    
    let isValid = true;
    
    section.questions.forEach(question => {
      if (question.required) {
        const answer = sectionData[question.id];
        if (!answer || (Array.isArray(answer) && answer.length === 0) || answer === '') {
          newErrors[`${section.id}.${question.id}`] = 'This field is required';
          isValid = false;
        }
      }
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData]);

  const isComplete = useCallback((): boolean => {
    return assessmentSections.every((_, index) => validateSection(index));
  }, [validateSection]);

  const getError = useCallback((sectionId: string, questionId: string): string | undefined => {
    return errors[`${sectionId}.${questionId}`];
  }, [errors]);

  const clearProgress = useCallback(() => {
    setFormData({});
    setErrors({});
    localStorage.removeItem('assessment_progress');
    setCurrentAssessmentId(null);
  }, [setCurrentAssessmentId]);

  const getCompletionStats = useCallback(() => {
    const totalQuestions = assessmentSections.reduce((total, section) => 
      total + section.questions.filter(q => q.required).length, 0
    );
    
    const answeredQuestions = assessmentSections.reduce((answered, section) => {
      const sectionData = formData[section.id] || {};
      const sectionAnswered = section.questions.filter(q => {
        if (!q.required) return false;
        const answer = sectionData[q.id];
        return answer && (!Array.isArray(answer) || answer.length > 0) && answer !== '';
      });
      return answered + sectionAnswered.length;
    }, 0);

    return {
      totalQuestions,
      answeredQuestions,
      completionPercentage: Math.round((answeredQuestions / totalQuestions) * 100)
    };
  }, [formData]);

  // Initialize assessment (create new or load existing)
  const initializeAssessment = useCallback(async () => {
    if (!currentAssessmentId) {
      const newId = await createAssessment();
      if (newId) {
        setCurrentAssessmentId(newId);
      }
    }
  }, [currentAssessmentId, createAssessment, setCurrentAssessmentId]);

  // Submit completed assessment
  const submitAssessment = useCallback(async () => {
    if (!currentAssessmentId) return false;
    return await completeAssessment(currentAssessmentId, formData);
  }, [currentAssessmentId, completeAssessment, formData]);

  return {
    formData,
    updateAnswer,
    validateSection,
    isComplete,
    getError,
    errors,
    isAutoSaving,
    clearProgress,
    getCompletionStats,
    initializeAssessment,
    submitAssessment,
    currentAssessmentId,
    loadAssessment: async (id: string) => {
      const data = await loadAssessment(id);
      if (data) {
        setFormData(data);
        setCurrentAssessmentId(id);
      }
      return data;
    }
  };
};