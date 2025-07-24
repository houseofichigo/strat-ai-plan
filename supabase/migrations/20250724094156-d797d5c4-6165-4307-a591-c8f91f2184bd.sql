-- Create user preferences table for multi-language and settings
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  notifications_enabled BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create progress tracking table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_type TEXT NOT NULL, -- 'assessment', 'training', 'workflow', 'use_case'
  module_id TEXT NOT NULL,
  progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  status TEXT NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_type, module_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  category TEXT NOT NULL DEFAULT 'general', -- 'compliance', 'resources', 'completion', 'general'
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  action_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
ON public.user_preferences 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_progress
CREATE POLICY "Users can view their own progress" 
ON public.user_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "License owners can view progress of their users" 
ON public.user_progress 
FOR SELECT 
USING (
  is_license_owner(auth.uid()) AND EXISTS (
    SELECT 1 FROM license_assignments la 
    JOIN licenses l ON la.license_id = l.id 
    WHERE l.license_owner_id = auth.uid() AND la.user_id = user_progress.user_id
  )
);

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_module ON public.user_progress(module_type, module_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read);
CREATE INDEX idx_notifications_expires ON public.notifications(expires_at);