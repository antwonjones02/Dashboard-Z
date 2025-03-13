import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Define project type
export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  priority: string;
  owner: string;
  progress: number;
}

interface KanbanBoardProps {
  projects: Project[];
  onProjectUpdate: (updatedProject: Project) => void;
  onProjectDelete: (projectId: number) => void;
  onProjectAdd: (status: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projects,
  onProjectUpdate,
  onProjectDelete,
  onProjectAdd,
}) => {
  // Group projects by status
  const columns = {
    'Planning': projects.filter(project => project.status === 'Planning'),
    'In Progress': projects.filter(project => project.status === 'In Progress'),
    'On Hold': projects.filter(project => project.status === 'On Hold'),
    'Completed': projects.filter(project => project.status === 'Completed'),
  };

  // Handle drag end
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or if the item was dropped back in the same place
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the project that was dragged
    const projectId = parseInt(draggableId.split('-')[1]);
    const project = projects.find(p => p.id === projectId);

    if (project) {
      // Update the project status based on the destination column
      const updatedProject = {
        ...project,
        status: destination.droppableId,
      };
      
      onProjectUpdate(updatedProject);
    }
  };

  // Get status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'In Progress':
        return 'bg-[#7D9BC1] text-[#041C2C]';
      case 'Planning':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'On Hold':
        return 'bg-[#EAAA00] text-[#041C2C]';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Get priority color class
  const getPriorityColorClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-[#C01933] text-white';
      case 'Medium':
        return 'bg-[#FF6900] text-white';
      case 'Low':
        return 'bg-[#7D9BC1] text-[#041C2C]';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const due = new Date(endDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        {Object.entries(columns).map(([status, statusProjects]) => (
          <div key={status} className="flex-1 min-w-[300px]">
            <div className="bg-neutral-100 dark:bg-[#002852] rounded-lg shadow">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(status)}`}>
                    {status}
                  </span>
                  <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-300">
                    {statusProjects.length} projects
                  </span>
                </div>
                <button
                  onClick={() => onProjectAdd(status)}
                  className="p-1 rounded-full text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white focus:outline-none"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
              
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-2 min-h-[200px]"
                  >
                    {statusProjects.map((project, index) => (
                      <Draggable
                        key={`project-${project.id}`}
                        draggableId={`project-${project.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3 bg-white dark:bg-[#041C2C] rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-medium text-neutral-800 dark:text-white">{project.name}</h3>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => onProjectUpdate({...project})}
                                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => onProjectDelete(project.id)}
                                  className="p-1 rounded-full text-neutral-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="mt-3 flex items-center justify-between">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColorClass(project.priority)}`}>
                                {project.priority}
                              </span>
                              
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {getDaysRemaining(project.endDate) > 0 
                                  ? `${getDaysRemaining(project.endDate)} days left` 
                                  : 'Overdue'}
                              </span>
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex items-center">
                                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                  <div 
                                    className="bg-[#003366] h-2 rounded-full" 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-xs text-neutral-600 dark:text-neutral-400">
                                  {project.progress}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#003366] flex items-center justify-center">
                                  <span className="text-xs font-medium text-white">
                                    {project.owner.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="ml-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                                  {project.owner}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;