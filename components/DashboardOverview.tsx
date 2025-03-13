import React from 'react';
import { 
  ClipboardDocumentListIcon, 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import ProjectCard from './dashboard/ProjectCard';
import TaskSummary from './dashboard/TaskSummary';
import UpcomingMeetings from './dashboard/UpcomingMeetings';
import StakeholderActivity from './dashboard/StakeholderActivity';

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Welcome to your Workflow Nexus dashboard
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClipboardDocumentListIcon className="h-6 w-6 text-[#003366]" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">Active Projects</dt>
                <dd>
                  <div className="text-lg font-medium text-neutral-800 dark:text-neutral-100">12</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-[#003366]" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">Pending Tasks</dt>
                <dd>
                  <div className="text-lg font-medium text-neutral-800 dark:text-neutral-100">24</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UsersIcon className="h-6 w-6 text-[#003366]" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">Key Stakeholders</dt>
                <dd>
                  <div className="text-lg font-medium text-neutral-800 dark:text-neutral-100">18</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-6 w-6 text-[#003366]" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">Upcoming Meetings</dt>
                <dd>
                  <div className="text-lg font-medium text-neutral-800 dark:text-neutral-100">5</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Project status */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Project Status</h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
              Overview of your active projects
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <ProjectCard 
                title="Website Redesign" 
                progress={75} 
                status="on-track" 
                dueDate="2025-04-15" 
              />
              <ProjectCard 
                title="Mobile App Development" 
                progress={45} 
                status="at-risk" 
                dueDate="2025-05-01" 
              />
              <ProjectCard 
                title="Content Strategy" 
                progress={90} 
                status="on-track" 
                dueDate="2025-03-30" 
              />
              <ProjectCard 
                title="Marketing Campaign" 
                progress={20} 
                status="delayed" 
                dueDate="2025-06-10" 
              />
            </div>
          </div>
        </div>

        {/* Task summary */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Task Summary</h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
              Your upcoming and priority tasks
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <TaskSummary />
          </div>
        </div>

        {/* Upcoming meetings */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Upcoming Meetings</h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
              Your scheduled meetings for the next 7 days
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <UpcomingMeetings />
          </div>
        </div>

        {/* Stakeholder activity */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Stakeholder Activity</h3>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
              Recent interactions with key stakeholders
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <StakeholderActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;