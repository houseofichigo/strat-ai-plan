-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'license_owner', 'user');

-- Create enum for license plans
CREATE TYPE public.license_plan AS ENUM ('starter_3', 'business_5', 'enterprise_10');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  department TEXT,
  company_name TEXT,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create licenses table
CREATE TABLE public.licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan license_plan NOT NULL,
  seats_total INTEGER NOT NULL,
  seats_used INTEGER DEFAULT 0,
  company_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on licenses
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

-- Create license assignments table
CREATE TABLE public.license_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES public.licenses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_by UUID REFERENCES auth.users(id) NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (license_id, user_id)
);

-- Enable RLS on license_assignments
ALTER TABLE public.license_assignments ENABLE ROW LEVEL SECURITY;

-- Create activity log table
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  license_id UUID REFERENCES public.licenses(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'use_case_added', 'workflow_deployed', 'agent_created', 'training_started', etc.
  action_details JSONB,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on activity_log
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create platform usage stats table
CREATE TABLE public.usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  license_id UUID REFERENCES public.licenses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  use_cases_explored INTEGER DEFAULT 0,
  workflows_launched INTEGER DEFAULT 0,
  agents_deployed INTEGER DEFAULT 0,
  trainings_started INTEGER DEFAULT 0,
  trainings_completed INTEGER DEFAULT 0,
  time_on_platform INTEGER DEFAULT 0, -- in minutes
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Enable RLS on usage_stats
ALTER TABLE public.usage_stats ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is license owner
CREATE OR REPLACE FUNCTION public.is_license_owner(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.licenses
    WHERE license_owner_id = _user_id
      AND is_active = true
  )
$$;

-- Function to get user's license
CREATE OR REPLACE FUNCTION public.get_user_license(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT l.id
  FROM public.licenses l
  JOIN public.license_assignments la ON l.id = la.license_id
  WHERE la.user_id = _user_id
    AND l.is_active = true
  LIMIT 1
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "License owners can view all profiles in their license" ON public.profiles
  FOR SELECT USING (
    public.is_license_owner(auth.uid()) AND
    EXISTS (
      SELECT 1 FROM public.license_assignments la
      JOIN public.licenses l ON la.license_id = l.id
      WHERE l.license_owner_id = auth.uid()
        AND la.user_id = profiles.user_id
    )
  );

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "License owners can view roles of their license users" ON public.user_roles
  FOR SELECT USING (
    public.is_license_owner(auth.uid()) AND
    EXISTS (
      SELECT 1 FROM public.license_assignments la
      JOIN public.licenses l ON la.license_id = l.id
      WHERE l.license_owner_id = auth.uid()
        AND la.user_id = user_roles.user_id
    )
  );

-- RLS Policies for licenses
CREATE POLICY "License owners can view their licenses" ON public.licenses
  FOR SELECT USING (auth.uid() = license_owner_id);

CREATE POLICY "License owners can update their licenses" ON public.licenses
  FOR UPDATE USING (auth.uid() = license_owner_id);

-- RLS Policies for license_assignments
CREATE POLICY "License owners can manage their license assignments" ON public.license_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.licenses l
      WHERE l.id = license_assignments.license_id
        AND l.license_owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own license assignment" ON public.license_assignments
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for activity_log
CREATE POLICY "Users can view their own activity" ON public.activity_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "License owners can view all activity in their license" ON public.activity_log
  FOR SELECT USING (
    public.is_license_owner(auth.uid()) AND
    EXISTS (
      SELECT 1 FROM public.license_assignments la
      JOIN public.licenses l ON la.license_id = l.id
      WHERE l.license_owner_id = auth.uid()
        AND la.user_id = activity_log.user_id
    )
  );

-- RLS Policies for usage_stats
CREATE POLICY "Users can view their own usage stats" ON public.usage_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "License owners can view all usage stats in their license" ON public.usage_stats
  FOR SELECT USING (
    public.is_license_owner(auth.uid()) AND
    EXISTS (
      SELECT 1 FROM public.license_assignments la
      JOIN public.licenses l ON la.license_id = l.id
      WHERE l.license_owner_id = auth.uid()
        AND la.user_id = usage_stats.user_id
    )
  );

-- Function to update profile updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at
  BEFORE UPDATE ON public.licenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();