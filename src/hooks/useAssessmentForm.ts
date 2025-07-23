import { useState } from 'react';
import { assessmentSections, FormData } from '@/data/assessmentData';

export const useAssessmentForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const updateAnswer = (sectionId: string, questionId: string, value: string | string[]) => {
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
  };

  const validateSection = (sectionIndex: number): boolean => {
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
  };

  const isComplete = (): boolean => {
    return assessmentSections.every((_, index) => validateSection(index));
  };

  const getError = (sectionId: string, questionId: string): string | undefined => {
    return errors[`${sectionId}.${questionId}`];
  };

  return {
    formData,
    updateAnswer,
    validateSection,
    isComplete,
    getError,
    errors
  };
};