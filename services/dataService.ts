import { supabase } from '../utils/supabase';

// Project-related operations
export const getProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
  
  return { data, error };
};

export const createProject = async (projectData: any) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData]);
  
  return { data, error };
};

export const updateProject = async (projectId: string, projectData: any) => {
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', projectId);
  
  return { data, error };
};

export const deleteProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);
  
  return { data, error };
};

// Task-related operations
export const getTasks = async (userId: string, projectId?: string) => {
  let query = supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);
  
  if (projectId) {
    query = query.eq('project_id', projectId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  return { data, error };
};

export const getTask = async (taskId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .single();
  
  return { data, error };
};

export const createTask = async (taskData: any) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData]);
  
  return { data, error };
};

export const updateTask = async (taskId: string, taskData: any) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(taskData)
    .eq('id', taskId);
  
  return { data, error };
};

export const deleteTask = async (taskId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);
  
  return { data, error };
};

// Stakeholder-related operations
export const getStakeholders = async (userId: string) => {
  const { data, error } = await supabase
    .from('stakeholders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getStakeholder = async (stakeholderId: string) => {
  const { data, error } = await supabase
    .from('stakeholders')
    .select('*')
    .eq('id', stakeholderId)
    .single();
  
  return { data, error };
};

export const createStakeholder = async (stakeholderData: any) => {
  const { data, error } = await supabase
    .from('stakeholders')
    .insert([stakeholderData]);
  
  return { data, error };
};

export const updateStakeholder = async (stakeholderId: string, stakeholderData: any) => {
  const { data, error } = await supabase
    .from('stakeholders')
    .update(stakeholderData)
    .eq('id', stakeholderId);
  
  return { data, error };
};

export const deleteStakeholder = async (stakeholderId: string) => {
  const { data, error } = await supabase
    .from('stakeholders')
    .delete()
    .eq('id', stakeholderId);
  
  return { data, error };
};

// Meeting-related operations
export const getMeetings = async (userId: string) => {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('user_id', userId)
    .order('scheduled_date', { ascending: true });
  
  return { data, error };
};

export const getMeeting = async (meetingId: string) => {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('id', meetingId)
    .single();
  
  return { data, error };
};

export const createMeeting = async (meetingData: any) => {
  const { data, error } = await supabase
    .from('meetings')
    .insert([meetingData]);
  
  return { data, error };
};

export const updateMeeting = async (meetingId: string, meetingData: any) => {
  const { data, error } = await supabase
    .from('meetings')
    .update(meetingData)
    .eq('id', meetingId);
  
  return { data, error };
};

export const deleteMeeting = async (meetingId: string) => {
  const { data, error } = await supabase
    .from('meetings')
    .delete()
    .eq('id', meetingId);
  
  return { data, error };
}; 