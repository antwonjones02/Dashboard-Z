import React from 'react';
import { 
  ClipboardDocumentListIcon, 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import ProjectCard from './dashboard/ProjectCard';
import TaskSummary from './dashboard/TaskSummary';
import UpcomingMeetings from './dashboard/UpcomingMeetings';
import StakeholderActivity from './dashboard/StakeholderActivity';
import Link from 'next/link';

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
        <Link href="/projects" className="card p-5 transition-all hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800">
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
        </Link>

        <Link href="/tasks" className="card p-5 transition-all hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800">
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
        </Link>

        <Link href="/stakeholders" className="card p-5 transition-all hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800">
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
        </Link>

        <Link href="/meetings" className="card p-5 transition-all hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800">
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
        </Link>
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Project status */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Project Status</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                Overview of your active projects
              </p>
            </div>
            <Link href="/projects" className="text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white flex items-center text-sm font-medium">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <Link href="/projects">
                <ProjectCard 
                  title="Website Redesign" 
                  progress={75} 
                  status="on-track" 
                  dueDate="2025-04-15" 
                />
              </Link>
              <Link href="/projects">
                <ProjectCard 
                  title="Mobile App Development" 
                  progress={45} 
                  status="at-risk" 
                  dueDate="2025-05-01" 
                />
              </Link>
              <Link href="/projects">
                <ProjectCard 
                  title="Content Strategy" 
                  progress={90} 
                  status="on-track" 
                  dueDate="2025-03-30" 
                />
              </Link>
              <Link href="/projects">
                <ProjectCard 
                  title="Marketing Campaign" 
                  progress={20} 
                  status="delayed" 
                  dueDate="2025-06-10" 
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Task summary */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Task Summary</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                Your upcoming and priority tasks
              </p>
            </div>
            <Link href="/tasks" className="text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white flex items-center text-sm font-medium">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Link href="/tasks">
              <TaskSummary />
            </Link>
          </div>
        </div>

        {/* Upcoming meetings */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Upcoming Meetings</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                Your scheduled meetings for the next 7 days
              </p>
            </div>
            <Link href="/meetings" className="text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white flex items-center text-sm font-medium">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Link href="/meetings">
              <UpcomingMeetings />
            </Link>
          </div>
        </div>

        {/* Stakeholder activity */}
        <div className="card overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-neutral-300 dark:border-neutral-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-neutral-800 dark:text-neutral-100">Stakeholder Activity</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                Recent interactions with key stakeholders
              </p>
            </div>
            <Link href="/stakeholders" className="text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white flex items-center text-sm font-medium">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <Link href="/stakeholders">
              <StakeholderActivity />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;