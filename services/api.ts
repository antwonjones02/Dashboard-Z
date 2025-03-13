// This is a mock API service that simulates fetching data from a backend
// In a real application, you would replace these with actual API calls

import projectsData from '../data/projects.json';
import tasksData from '../data/tasks.json';
import meetingsData from '../data/meetings.json';
import stakeholdersData from '../data/stakeholders.json';

// Add a delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Projects API
export const fetchProjects = async () => {
  await delay(500);
  return projectsData;
};

export const fetchProjectById = async (id: string) => {
  await delay(300);
  const project = projectsData.find(project => project.id === id);
  if (!project) throw new Error(`Project with id ${id} not found`);
  return project;
};

// Tasks API
export const fetchTasks = async () => {
  await delay(500);
  return tasksData;
};

export const fetchTasksByProject = async (projectId: string) => {
  await delay(300);
  return tasksData.filter(task => task.project.id === projectId);
};

export const fetchTaskById = async (id: string) => {
  await delay(300);
  const task = tasksData.find(task => task.id === id);
  if (!task) throw new Error(`Task with id ${id} not found`);
  return task;
};

// Meetings API
export const fetchMeetings = async () => {
  await delay(500);
  return meetingsData;
};

export const fetchUpcomingMeetings = async (days: number = 7) => {
  await delay(300);
  const now = new Date();
  const endDate = new Date();
  endDate.setDate(now.getDate() + days);
  
  return meetingsData.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= now && meetingDate <= endDate;
  });
};

export const fetchMeetingById = async (id: string) => {
  await delay(300);
  const meeting = meetingsData.find(meeting => meeting.id === id);
  if (!meeting) throw new Error(`Meeting with id ${id} not found`);
  return meeting;
};

// Stakeholders API
export const fetchStakeholders = async () => {
  await delay(500);
  return stakeholdersData;
};

export const fetchStakeholderById = async (id: string) => {
  await delay(300);
  const stakeholder = stakeholdersData.find(stakeholder => stakeholder.id === id);
  if (!stakeholder) throw new Error(`Stakeholder with id ${id} not found`);
  return stakeholder;
};

export const fetchStakeholdersByProject = async (projectId: string) => {
  await delay(300);
  return stakeholdersData.filter(stakeholder => 
    stakeholder.projects.some(project => project.id === projectId)
  );
};

// Dashboard summary data
export const fetchDashboardSummary = async () => {
  await delay(700);
  return {
    activeProjects: projectsData.length,
    pendingTasks: tasksData.filter(task => task.status !== 'completed').length,
    keyStakeholders: stakeholdersData.length,
    upcomingMeetings: meetingsData.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      const now = new Date();
      const weekLater = new Date();
      weekLater.setDate(now.getDate() + 7);
      return meetingDate >= now && meetingDate <= weekLater;
    }).length
  };
};

// Example of how to implement a create/update function
export const updateTask = async (taskId: string, updates: Partial<typeof tasksData[0]>) => {
  await delay(600);
  // In a real app, this would be an API call to update the task
  console.log(`Updating task ${taskId} with:`, updates);
  return { success: true, message: 'Task updated successfully' };
};

// Example of how to implement a search function
export const searchAcrossModules = async (query: string) => {
  await delay(800);
  const normalizedQuery = query.toLowerCase();
  
  const matchedProjects = projectsData.filter(project => 
    project.title.toLowerCase().includes(normalizedQuery) || 
    project.description.toLowerCase().includes(normalizedQuery)
  );
  
  const matchedTasks = tasksData.filter(task => 
    task.title.toLowerCase().includes(normalizedQuery) || 
    task.description.toLowerCase().includes(normalizedQuery)
  );
  
  const matchedMeetings = meetingsData.filter(meeting => 
    meeting.title.toLowerCase().includes(normalizedQuery) || 
    meeting.description.toLowerCase().includes(normalizedQuery)
  );
  
  const matchedStakeholders = stakeholdersData.filter(stakeholder => 
    stakeholder.name.toLowerCase().includes(normalizedQuery) || 
    stakeholder.role.toLowerCase().includes(normalizedQuery) ||
    stakeholder.company.toLowerCase().includes(normalizedQuery)
  );
  
  return {
    projects: matchedProjects,
    tasks: matchedTasks,
    meetings: matchedMeetings,
    stakeholders: matchedStakeholders
  };
};