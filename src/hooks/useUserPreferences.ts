import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import i18n from '@/i18n';

export interface UserPreferencesData {
  id: string;
  user_id: string;
  language: string;
  timezone: string;
  notifications_enabled: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferencesData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.data.user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setPreferences(data);
        // Update i18n language
        i18n.changeLanguage(data.language);
      } else {
        // Create default preferences
        await createDefaultPreferences();
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user preferences',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createDefaultPreferences = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const defaultPrefs = {
        user_id: user.data.user.id,
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        notifications_enabled: true,
        onboarding_completed: false,
      };

      const { data, error } = await supabase
        .from('user_preferences')
        .insert(defaultPrefs)
        .select()
        .single();

      if (error) throw error;
      setPreferences(data);
    } catch (error) {
      console.error('Error creating default preferences:', error);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferencesData>) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user || !preferences) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.data.user.id)
        .select()
        .single();

      if (error) throw error;
      
      setPreferences(data);
      
      // Update i18n language if changed
      if (updates.language) {
        i18n.changeLanguage(updates.language);
      }

      toast({
        title: 'Success',
        description: 'Preferences updated successfully',
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update preferences',
        variant: 'destructive',
      });
    }
  };

  const completeOnboarding = async () => {
    await updatePreferences({ onboarding_completed: true });
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return {
    preferences,
    loading,
    updatePreferences,
    completeOnboarding,
    refreshPreferences: fetchPreferences,
  };
};