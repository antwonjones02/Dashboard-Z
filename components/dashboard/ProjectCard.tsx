import React from 'react';
import { format } from 'date-fns';

interface ProjectCardProps {
  title: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, progress, status, dueDate }) => {
  const statusColors = {
    'on-track': 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100',
    'at-risk': 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100',
    'delayed': 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-100',
  };

  const statusLabels = {
    'on-track': 'On Track',
    'at-risk': 'At Risk',
    'delayed': 'Delayed',
  };

  const progressBarColors = {
    'on-track': 'bg-success-500',
    'at-risk': 'bg-warning-500',
    'delayed': 'bg-danger-500',
  };

  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{title}</h4>
          <div className="mt-1 flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Due {formattedDate}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{progress}%</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
          <div
            className={`${progressBarColors[status]} h-2 rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;