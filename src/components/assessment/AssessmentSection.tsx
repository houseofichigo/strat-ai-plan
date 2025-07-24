import React from 'react';
import { AssessmentSectionData, FormData } from '@/data/assessmentData';
import { QuestionRadio } from './QuestionRadio';
import { QuestionMultiSelect } from './QuestionMultiSelect';
import { QuestionText } from './QuestionText';
import { QuestionDropdown } from './QuestionDropdown';

interface AssessmentSectionProps {
  section: AssessmentSectionData;
  sectionIndex: number;
  formData: FormData;
  updateAnswer: (sectionId: string, questionId: string, value: string | string[]) => void;
}

export const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  section,
  sectionIndex,
  formData,
  updateAnswer
}) => {
  const sectionData = formData[section.id] || {};

  return (
    <div className="space-y-6">
      {section.questions.map((question, questionIndex) => {
        const value = sectionData[question.id] || (question.type === 'multiselect' ? [] : '');
        
        const commonProps = {
          question,
          value,
          onChange: (newValue: string | string[]) => updateAnswer(section.id, question.id, newValue),
          sectionId: section.id
        };

        switch (question.type) {
          case 'radio':
            return <QuestionRadio key={question.id} {...commonProps} value={value as string} />;
          case 'multiselect':
            return <QuestionMultiSelect key={question.id} {...commonProps} value={value as string[]} />;
          case 'dropdown':
            return <QuestionDropdown key={question.id} {...commonProps} value={value as string} />;
          case 'text':
          case 'textarea':
            return <QuestionText key={question.id} {...commonProps} value={value as string} />;
          default:
            return null;
        }
      })}
    </div>
  );
};