import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const tasks = [
  {
    id: 1,
    title: 'Finalize design mockups',
    project: 'Website Redesign',
    priority: 'high',
    dueDate: '2025-03-20',
  },
  {
    id: 2,
    title: 'Review content strategy document',
    project: 'Content Strategy',
    priority: 'medium',
    dueDate: '2025-03-18',
  },
  {
    id: 3,
    title: 'Prepare stakeholder presentation',
    project: 'Marketing Campaign',
    priority: 'high',
    dueDate: '2025-03-15',
  },
  {
    id: 4,
    title: 'Test mobile app prototype',
    project: 'Mobile App Development',
    priority: 'medium',
    dueDate: '2025-03-25',
  },
  {
    id: 5,
    title: 'Update project timeline',
    project: 'Website Redesign',
    priority: 'low',
    dueDate: '2025-03-22',
  },
];

const TaskSummary: React.FC = () => {
  const priorityColors = {
    high: 'text-danger-600 dark:text-danger-400',
    medium: 'text-warning-600 dark:text-warning-400',
    low: 'text-success-600 dark:text-success-400',
  };

  const priorityIcons = {
    high: <ExclamationCircleIcon className="h-5 w-5 text-danger-600 dark:text-danger-400" />,
    medium: <ClockIcon className="h-5 w-5 text-warning-600 dark:text-warning-400" />,
    low: <CheckCircleIcon className="h-5 w-5 text-success-600 dark:text-success-400" />,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
            All
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
            Today
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
            Upcoming
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {priorityIcons[task.priority as keyof typeof priorityIcons]}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{task.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{task.project}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium ${isOverdue(task.dueDate) ? 'text-danger-600 dark:text-danger-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
          View all tasks
        </button>
      </div>
    </div>
  );
};

export default TaskSummary;