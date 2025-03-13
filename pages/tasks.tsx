import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import CSVActions from '../components/CSVActions';
import { csvTemplates } from '../utils/csvUtils';
import SEO from '../components/SEO';

// Define Task type
interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
  project: string;
}

// Sample task data
const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Create wireframes for homepage',
    description: 'Design wireframes for the new homepage layout',
    status: 'Completed',
    dueDate: '2023-02-15',
    priority: 'High',
    assignedTo: 'Jane Smith',
    project: 'Website Redesign',
  },
  {
    id: 2,
    name: 'Develop user authentication',
    description: 'Implement user login and registration functionality',
    status: 'In Progress',
    dueDate: '2023-03-10',
    priority: 'High',
    assignedTo: 'John Doe',
    project: 'Mobile App Development',
  },
  {
    id: 3,
    name: 'Write API documentation',
    description: 'Document all API endpoints and parameters',
    status: 'Not Started',
    dueDate: '2023-03-25',
    priority: 'Medium',
    assignedTo: 'Mike Johnson',
    project: 'Mobile App Development',
  },
  {
    id: 4,
    name: 'Test payment gateway integration',
    description: 'Verify payment processing works correctly',
    status: 'In Progress',
    dueDate: '2023-03-05',
    priority: 'High',
    assignedTo: 'Sarah Williams',
    project: 'E-commerce Platform',
  },
  {
    id: 5,
    name: 'Create content for about page',
    description: 'Write copy for the about us section',
    status: 'Not Started',
    dueDate: '2023-03-20',
    priority: 'Low',
    assignedTo: 'Jane Smith',
    project: 'Website Redesign',
  },
  {
    id: 6,
    name: 'Optimize database queries',
    description: 'Improve performance of slow database operations',
    status: 'In Progress',
    dueDate: '2023-03-15',
    priority: 'Medium',
    assignedTo: 'John Doe',
    project: 'Data Migration',
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterProject, setFilterProject] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique project names for filter - Fixed type error by using Array.from
  const projectOptions = ['All', ...Array.from(new Set(tasks.map(task => task.project)))];

  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesProject = filterProject === 'All' || task.project === filterProject;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  // Handle CSV import
  const handleImportCSV = (data: Record<string, string>[]) => {
    // Convert imported data to task format
    const importedTasks: Task[] = data.map((item, index) => ({
      id: tasks.length + index + 1,
      name: item['Task Name'],
      description: item['Description'],
      status: item['Status'],
      dueDate: item['Due Date'],
      priority: item['Priority'],
      assignedTo: item['Assigned To'],
      project: item['Project'],
    }));
    
    // Add imported tasks to existing tasks
    setTasks([...tasks, ...importedTasks]);
  };

  // Get status icon and color
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

  return (
    <Layout>
      <SEO title="Task Flow Manager" description="Manage and organize your tasks across different projects." />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-[#003366] dark:text-white">Task Flow Manager</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Manage and organize all your tasks across different projects.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#003366] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#041C2C] focus:outline-none focus:ring-2 focus:ring-[#7D9BC1] focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Task
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Filters
              <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* CSV Import/Export */}
        <div className="mt-4">
          <CSVActions
            entityType="tasks"
            headers={csvTemplates.tasks}
            onImport={handleImportCSV}
            className="text-[#003366]"
          />
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  id="status-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <select
                  id="priority-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="project-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project
                </label>
                <select
                  id="project-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                >
                  {projectOptions.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tasks list */}
        <div className="mt-6 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.map((task) => {
              const statusDetails = getStatusDetails(task.status);
              const StatusIcon = statusDetails.icon;
              
              return (
                <li key={task.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <StatusIcon className={`h-5 w-5 ${statusDetails.iconColor} mr-2`} aria-hidden="true" />
                        <p className="text-sm font-medium text-[#003366] dark:text-[#7D9BC1] truncate">{task.name}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColorClass(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          {task.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <p>Due on {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-gray-900 dark:text-white mr-1">Project:</span> {task.project}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <p>
                          <span className="font-medium text-gray-900 dark:text-white mr-1">Assigned to:</span> {task.assignedTo}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#003366] hover:bg-[#041C2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366]"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                      >
                        Edit
                      </button>
                      {task.status !== 'Completed' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#C01933] hover:bg-[#991933] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C01933]"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          
          {/* Empty state */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;