import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProgressData {
  id: string;
  user_id: string;
  module_type: 'assessment' | 'training' | 'workflow' | 'use_case';
  module_id: string;
  progress_percentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  last_accessed: string;
  completed_at?: string;
}

export const useProgress = (userId?: string) => {
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProgress = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('user_progress')
        .select('*');

      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        const user = await supabase.auth.getUser();
        if (user.data.user?.id) {
          query = query.eq('user_id', user.data.user.id);
        }
      }

      const { data, error } = await query.order('last_accessed', { ascending: false });

      if (error) throw error;
      setProgress((data || []) as ProgressData[]);
    } catch (error) {
      console.error('Error fetching progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to load progress data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    moduleType: string,
    moduleId: string,
    progressPercentage: number,
    status?: string
  ) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const updateData: any = {
        user_id: user.data.user.id,
        module_type: moduleType,
        module_id: moduleId,
        progress_percentage: progressPercentage,
        last_accessed: new Date().toISOString(),
      };

      if (status) {
        updateData.status = status;
        if (status === 'completed') {
          updateData.completed_at = new Date().toISOString();
        }
      }

      const { error } = await supabase
        .from('user_progress')
        .upsert(updateData, {
          onConflict: 'user_id,module_type,module_id'
        });

      if (error) throw error;
      
      // Refresh progress data
      await fetchProgress();
      
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to update progress',
        variant: 'destructive',
      });
    }
  };

  const getModuleProgress = (moduleType: string, moduleId: string) => {
    return progress.find(p => p.module_type === moduleType && p.module_id === moduleId);
  };

  const getOverallProgress = (moduleType?: string) => {
    const filteredProgress = moduleType 
      ? progress.filter(p => p.module_type === moduleType)
      : progress;
    
    if (filteredProgress.length === 0) return 0;
    
    const totalProgress = filteredProgress.reduce((sum, p) => sum + p.progress_percentage, 0);
    return Math.round(totalProgress / filteredProgress.length);
  };

  useEffect(() => {
    fetchProgress();
  }, [userId]);

  return {
    progress,
    loading,
    updateProgress,
    getModuleProgress,
    getOverallProgress,
    refreshProgress: fetchProgress,
  };
};