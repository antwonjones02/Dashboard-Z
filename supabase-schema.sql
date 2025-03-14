-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  job_title TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  priority TEXT NOT NULL DEFAULT 'medium',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create stakeholders table
CREATE TABLE IF NOT EXISTS stakeholders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  organization TEXT,
  email TEXT,
  phone TEXT,
  influence TEXT,
  interest TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER, -- in minutes
  location TEXT,
  meeting_link TEXT,
  attendees TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create project_stakeholders junction table
CREATE TABLE IF NOT EXISTS project_stakeholders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  stakeholder_id UUID REFERENCES stakeholders(id) ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, stakeholder_id)
);

-- Create meeting_stakeholders junction table
CREATE TABLE IF NOT EXISTS meeting_stakeholders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE,
  stakeholder_id UUID REFERENCES stakeholders(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(meeting_id, stakeholder_id)
);

-- Set up Row Level Security (RLS) policies
-- Profiles: Users can only view and update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Projects: Users can only CRUD their own projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects" 
  ON projects FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" 
  ON projects FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
  ON projects FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
  ON projects FOR DELETE 
  USING (auth.uid() = user_id);

-- Tasks: Users can only CRUD their own tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tasks" 
  ON tasks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" 
  ON tasks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" 
  ON tasks FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" 
  ON tasks FOR DELETE 
  USING (auth.uid() = user_id);

-- Stakeholders: Users can only CRUD their own stakeholders
ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stakeholders" 
  ON stakeholders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stakeholders" 
  ON stakeholders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stakeholders" 
  ON stakeholders FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stakeholders" 
  ON stakeholders FOR DELETE 
  USING (auth.uid() = user_id);

-- Meetings: Users can only CRUD their own meetings
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own meetings" 
  ON meetings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meetings" 
  ON meetings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meetings" 
  ON meetings FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meetings" 
  ON meetings FOR DELETE 
  USING (auth.uid() = user_id);

-- Junction tables: Users can only CRUD entries related to their own projects/meetings/stakeholders
ALTER TABLE project_stakeholders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own project stakeholders" 
  ON project_stakeholders FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_stakeholders.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own project stakeholders" 
  ON project_stakeholders FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_stakeholders.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own project stakeholders" 
  ON project_stakeholders FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_stakeholders.project_id 
      AND projects.user_id = auth.uid()
    )
  );

ALTER TABLE meeting_stakeholders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own meeting stakeholders" 
  ON meeting_stakeholders FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_stakeholders.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own meeting stakeholders" 
  ON meeting_stakeholders FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_stakeholders.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own meeting stakeholders" 
  ON meeting_stakeholders FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_stakeholders.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

-- Create a trigger to automatically create a profile entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 