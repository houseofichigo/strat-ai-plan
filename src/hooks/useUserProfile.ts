import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface UserProfileData {
  role: string;
  department: string;
  industry: string;
  company_size: string;
  experience_level: string;
  primary_goals: string[];
}

export const useUserProfile = () => {
  const [profile, setProfile] = useLocalStorage<UserProfileData | null>('userProfile', null);
  const [loading, setLoading] = useState(false);

  // Simulate user profile from assessment or user input
  const updateProfile = (updates: Partial<UserProfileData>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    } else {
      setProfile({
        role: 'Manager',
        department: 'Sales',
        industry: 'Technology',
        company_size: 'Medium',
        experience_level: 'Intermediate',
        primary_goals: ['Increase efficiency', 'Reduce costs'],
        ...updates
      });
    }
  };

  // Initialize with default profile if none exists
  useEffect(() => {
    if (!profile) {
      setProfile({
        role: 'Manager',
        department: 'Sales',
        industry: 'Technology', 
        company_size: 'Medium',
        experience_level: 'Intermediate',
        primary_goals: ['Increase efficiency', 'Reduce costs']
      });
    }
  }, [profile, setProfile]);

  return {
    profile,
    loading,
    updateProfile,
    refreshProfile: () => {},
  };
};