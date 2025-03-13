import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
  project: string;
  subtasks?: Task[];
  completed?: boolean;
  tags?: string[];
}

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: number, newStatus: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  level?: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  level = 0,
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Get status details
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          icon: CheckCircleIcon,
          bgColor: 'bg-[#041C2C]', // Delta Dark Blue
          textColor: 'text-white',
          iconColor: 'text-[#7D9BC1]', // Delta Light Blue
        };
      case 'In Progress':
        return {
          icon: ClockIcon,
          bgColor: 'bg-[#7D9BC1]', // Delta Light Blue
          textColor: 'text-[#041C2C]', // Delta Dark Blue
          iconColor: 'text-[#003366]', // Delta Blue
        };
      case 'Not Started':
        return {
          icon: ExclamationCircleIcon,
          bgColor: 'bg-[#EAAA00]', // Delta Yellow
          textColor: 'text-[#041C2C]', // Delta Dark Blue
          iconColor: 'text-[#003366]', // Delta Blue
        };
      default:
        return {
          icon: ExclamationCircleIcon,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-500',
        };
    }
  };

  // Get priority color class
  const getPriorityColorClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-[#C01933] text-white'; // Delta Red
      case 'Medium':
        return 'bg-[#FF6900] text-white'; // Delta Orange
      case 'Low':
        return 'bg-[#7D9BC1] text-[#041C2C]'; // Delta Light Blue with Dark Blue text
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Check if task is overdue
  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return task.status !== 'Completed' && dueDate < today;
  };

  // Toggle task completion
  const toggleTaskCompletion = () => {
    const newStatus = task.status === 'Completed' ? 'Not Started' : 'Completed';
    onStatusChange(task.id, newStatus);
  };

  const statusDetails = getStatusDetails(task.status);
  const StatusIcon = statusDetails.icon;

  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-neutral-200 dark:border-neutral-700 pl-4' : ''}`}>
      <div className={`group p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150 ${
        task.status === 'Completed' ? 'opacity-70' : ''
      }`}>
        <div className="flex items-start">
          {/* Checkbox */}
          <button
            onClick={toggleTaskCompletion}
            className="flex-shrink-0 mt-0.5 mr-3 h-5 w-5 rounded-full focus:outline-none"
          >
            {task.status === 'Completed' ? (
              <CheckCircleSolidIcon className="h-5 w-5 text-[#003366]" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 hover:border-[#003366] dark:hover:border-[#7D9BC1]" />
            )}
          </button>
          
          {/* Task content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {task.subtasks && task.subtasks.length > 0 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mr-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    {expanded ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </button>
                )}
                <h3 className={`text-sm font-medium ${
                  task.status === 'Completed' 
                    ? 'text-neutral-500 dark:text-neutral-400 line-through' 
                    : 'text-neutral-800 dark:text-white'
                }`}>
                  {task.name}
                </h3>
              </div>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 rounded-full text-neutral-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {task.description && (
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              {/* Project tag */}
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
                <TagIcon className="mr-1 h-3 w-3" />
                {task.project}
              </div>
              
              {/* Due date */}
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${
                isOverdue() 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' 
                  : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
              }`}>
                <CalendarIcon className="mr-1 h-3 w-3" />
                {formatDueDate(task.dueDate)}
              </div>
              
              {/* Priority */}
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${getPriorityColorClass(task.priority)}`}>
                {task.priority}
              </div>
              
              {/* Assigned to */}
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
                <UserIcon className="mr-1 h-3 w-3" />
                {task.assignedTo}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtasks */}
      {expanded && task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-1">
          {task.subtasks.map(subtask => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;