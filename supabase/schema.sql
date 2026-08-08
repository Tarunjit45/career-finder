-- Career Navigation MVP Database Schema
-- Supabase PostgreSQL Migration Script

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  education_stage TEXT CHECK (education_stage IN ('school', 'college', 'working', 'fresh_start')),
  user_intent TEXT CHECK (user_intent IN ('confused', 'explore', 'choose', 'fresh_start')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Assessment Questions Table
CREATE TABLE IF NOT EXISTS public.assessment_questions (
  id INT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  question_type TEXT DEFAULT 'single' CHECK (question_type IN ('single', 'multiple')),
  options JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Assessment Responses Table
CREATE TABLE IF NOT EXISTS public.assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  answers JSONB NOT NULL,
  dimension_scores JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Exploration Areas Table
CREATE TABLE IF NOT EXISTS public.exploration_areas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  emoji TEXT,
  tagline TEXT,
  description TEXT,
  primary_dimensions TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Directions Table
CREATE TABLE IF NOT EXISTS public.directions (
  id TEXT PRIMARY KEY,
  area_id TEXT REFERENCES public.exploration_areas(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  emoji TEXT,
  tagline TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Careers Table
CREATE TABLE IF NOT EXISTS public.careers (
  id TEXT PRIMARY KEY,
  direction_id TEXT REFERENCES public.directions(id) ON DELETE CASCADE,
  area_id TEXT REFERENCES public.exploration_areas(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  emoji TEXT,
  tagline TEXT,
  one_liner TEXT NOT NULL,
  what_they_do TEXT[] NOT NULL,
  you_may_enjoy_if TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Career Skills Table
CREATE TABLE IF NOT EXISTS public.career_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id TEXT REFERENCES public.careers(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  category TEXT DEFAULT 'core'
);

-- 8. Career Paths Table (Milestones)
CREATE TABLE IF NOT EXISTS public.career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id TEXT REFERENCES public.careers(id) ON DELETE CASCADE,
  stage_order INT NOT NULL,
  stage_name TEXT NOT NULL,
  description TEXT NOT NULL
);

-- 9. User Saved Careers Table
CREATE TABLE IF NOT EXISTS public.user_saved_careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_id TEXT REFERENCES public.careers(id) ON DELETE CASCADE,
  is_favorite BOOLEAN DEFAULT FALSE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, career_id)
);

-- 10. User Journeys Table (Active Journey & Next Step)
CREATE TABLE IF NOT EXISTS public.user_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  active_career_id TEXT REFERENCES public.careers(id) ON DELETE SET NULL,
  current_step_id TEXT,
  completed_step_ids TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Row Level Security (RLS) Setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_saved_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own responses" ON public.assessment_responses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage saved careers" ON public.user_saved_careers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage journey" ON public.user_journeys FOR ALL USING (auth.uid() = user_id);
