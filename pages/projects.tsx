import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import KanbanBoard, { Project } from '../components/projects/KanbanBoard';
import ProjectForm from '../components/projects/ProjectForm';
import { useAuth } from '../utils/AuthContext';
import { getProjects, createProject, updateProject, deleteProject } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/Layout';
import Head from 'next/head';
import ProtectedRoute from '@/components/ProtectedRoute';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await getProjects(user.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data) {
        // Transform the data from database format to UI format
        const transformedProjects: Project[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          status: mapStatusFromDB(item.status),
          priority: capitalizeFirstLetter(item.priority) || 'Medium',
          startDate: item.start_date ? new Date(item.start_date).toISOString().split('T')[0] : '',
          endDate: item.end_date ? new Date(item.end_date).toISOString().split('T')[0] : '',
          owner: item.owner || '',
          progress: item.progress || 0,
        }));
        
        setProjects(transformedProjects);
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    } else {
      setProjects([]);
      setIsLoading(false);
    }
  }, [user, fetchProjects]);

  // Helper function to map database status to UI status
  const mapStatusFromDB = (dbStatus: string): string => {
    const statusMap: Record<string, string> = {
      'planning': 'Planning',
      'active': 'In Progress',
      'on_hold': 'On Hold',
      'completed': 'Completed'
    };
    
    return statusMap[dbStatus.toLowerCase()] || dbStatus;
  };
  
  // Helper function to map UI status to database status
  const mapStatusToDB = (uiStatus: string): string => {
    const statusMap: Record<string, string> = {
      'Planning': 'planning',
      'In Progress': 'active',
      'On Hold': 'on_hold',
      'Completed': 'completed'
    };
    
    return statusMap[uiStatus] || uiStatus.toLowerCase();
  };
  
  const capitalizeFirstLetter = (string: string): string => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleImportCSV = () => {
    // This would be implemented to handle CSV import
    console.log('CSV import functionality to be implemented');
  };

  const handleProjectUpdate = async (updatedProject: Project) => {
    if (!user) return;
    
    try {
      // Transform the project to database format
      const dbProject = {
        name: updatedProject.name,
        description: updatedProject.description,
        status: mapStatusToDB(updatedProject.status),
        priority: updatedProject.priority.toLowerCase(),
        start_date: updatedProject.startDate,
        end_date: updatedProject.endDate,
        owner: updatedProject.owner,
        progress: updatedProject.progress,
        user_id: user.id
      };
      
      const { error } = await updateProject(updatedProject.id.toString(), dbProject);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProjects(prev => 
        prev.map(p => p.id === updatedProject.id ? updatedProject : p)
      );
    } catch (err: any) {
      console.error('Error updating project:', err);
      setError(err.message);
    }
  };

  const handleProjectDelete = async (projectId: string | number) => {
    if (!user) return;
    
    try {
      const { error } = await deleteProject(projectId.toString());
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err: any) {
      console.error('Error deleting project:', err);
      setError(err.message);
    }
  };

  const handleProjectSave = async (project: Project) => {
    if (!user) return;
    
    try {
      if (currentProject) {
        // Update existing project
        await handleProjectUpdate(project);
      } else {
        // Create new project
        // Transform the project to database format
        const dbProject = {
          id: project.id,
          name: project.name,
          description: project.description,
          status: mapStatusToDB(project.status),
          priority: project.priority.toLowerCase(),
          start_date: project.startDate,
          end_date: project.endDate,
          owner: project.owner,
          progress: project.progress,
          user_id: user.id
        };
        
        const { data, error } = await createProject(dbProject);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          // Add the new project to the state
          setProjects(prev => [...prev, project]);
        }
      }
      
      setCurrentProject(undefined);
      setIsFormOpen(false);
    } catch (err: any) {
      console.error('Error saving project:', err);
      setError(err.message);
    }
  };

  const handleAddProject = () => {
    setCurrentProject(undefined);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsFormOpen(true);
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
        <PlusIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
        Get started by creating your first project to track your work and organize your tasks.
      </p>
      <button
        onClick={handleAddProject}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
        Create Project
      </button>
    </div>
  );

  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard-Z | Project Command Center</title>
        <meta name="description" content="Manage and track your projects with Dashboard-Z" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
            <div className="flex space-x-2">
              <button
                onClick={handleImportCSV}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Import CSV
              </button>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                Add Project
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            renderEmptyState()
          ) : (
            <KanbanBoard
              projects={projects}
              onProjectUpdate={handleProjectUpdate}
              onProjectDelete={handleProjectDelete}
              onProjectAdd={handleAddProject}
              onProjectEdit={handleEditProject}
            />
          )}

          {isFormOpen && (
            <ProjectForm
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              onSave={handleProjectSave}
              project={currentProject}
              isEdit={!!currentProject}
            />
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProjectsPage;