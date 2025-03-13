import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  ChevronDownIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InboxIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import CSVActions from '../components/CSVActions';
import { csvTemplates } from '../utils/csvUtils';
import SEO from '../components/SEO';
import TaskItem, { Task } from '../components/tasks/TaskItem';
import TaskForm from '../components/tasks/TaskForm';

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
    tags: ['Design', 'UI/UX'],
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
    tags: ['Backend', 'Security'],
    subtasks: [
      {
        id: 21,
        name: 'Set up authentication API',
        description: 'Create API endpoints for user authentication',
        status: 'Completed',
        dueDate: '2023-03-05',
        priority: 'High',
        assignedTo: 'John Doe',
        project: 'Mobile App Development',
      },
      {
        id: 22,
        name: 'Implement JWT token handling',
        description: 'Add JWT token generation and validation',
        status: 'In Progress',
        dueDate: '2023-03-08',
        priority: 'Medium',
        assignedTo: 'John Doe',
        project: 'Mobile App Development',
      },
      {
        id: 23,
        name: 'Create user registration form',
        description: 'Design and implement user registration UI',
        status: 'Not Started',
        dueDate: '2023-03-10',
        priority: 'Medium',
        assignedTo: 'Jane Smith',
        project: 'Mobile App Development',
      },
    ],
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
    tags: ['Documentation', 'API'],
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
    tags: ['Testing', 'Payments'],
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
    tags: ['Content', 'Copywriting'],
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
    tags: ['Database', 'Performance'],
  },
];

// Define view types
type ViewType = 'all' | 'today' | 'upcoming' | 'completed' | 'project' | 'tag';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterProject, setFilterProject] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('all');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  // Get unique project names for filter - Fixed type error by using Array.from
  const projectOptions = ['All', ...Array.from(new Set(tasks.map(task => task.project)))];
  
  // Get all unique tags
  const allTags = Array.from(new Set(tasks.flatMap(task => task.tags || [])));

  // Filter tasks based on search term, filters, and current view
  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
                         task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status, priority, project filters
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesProject = filterProject === 'All' || task.project === filterProject;
    
    // View filters
    let matchesView = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    switch (currentView) {
      case 'today':
        matchesView = taskDate.getTime() === today.getTime();
        break;
      case 'upcoming':
        matchesView = taskDate >= today && taskDate <= nextWeek;
        break;
      case 'completed':
        matchesView = task.status === 'Completed';
        break;
      case 'project':
        matchesView = task.project === selectedProject;
        break;
      case 'tag':
        matchesView = (task.tags || []).includes(selectedTag);
        break;
      default:
        matchesView = true;
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesView;
  });

  // Handle CSV import
  const handleImportCSV = (data: Record<string, string>[]) => {
    // Convert imported data to task format
    const importedTasks: Task[] = data.map((item, index) => ({
      id: Math.max(...tasks.map(t => t.id)) + index + 1,
      name: item['Task Name'] || '',
      description: item['Description'] || '',
      status: item['Status'] || 'Not Started',
      dueDate: item['Due Date'] || new Date().toISOString().split('T')[0],
      priority: item['Priority'] || 'Medium',
      assignedTo: item['Assigned To'] || '',
      project: item['Project'] || '',
      tags: item['Tags'] ? item['Tags'].split(',').map(tag => tag.trim()) : [],
    }));
    
    // Add imported tasks to existing tasks
    setTasks([...tasks, ...importedTasks]);
  };

  // Handle task status change
  const handleTaskStatusChange = (taskId: number, newStatus: string) => {
    const updateTaskStatus = (taskList: Task[]): Task[] => {
      return taskList.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        if (task.subtasks) {
          return { ...task, subtasks: updateTaskStatus(task.subtasks) };
        }
        return task;
      });
    };
    
    setTasks(updateTaskStatus(tasks));
  };

  // Handle task edit
  const handleTaskEdit = (task: Task) => {
    setCurrentTask(task);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle task delete
  const handleTaskDelete = (taskId: number) => {
    const deleteTask = (taskList: Task[]): Task[] => {
      return taskList.filter(task => {
        if (task.id === taskId) {
          return false;
        }
        if (task.subtasks) {
          task.subtasks = deleteTask(task.subtasks);
        }
        return true;
      });
    };
    
    setTasks(deleteTask(tasks));
  };

  // Handle add new task
  const handleAddTask = () => {
    setCurrentTask({
      id: Math.max(...tasks.map(t => t.id)) + 1,
      name: '',
      description: '',
      status: 'Not Started',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      assignedTo: '',
      project: currentView === 'project' ? selectedProject : '',
      tags: currentView === 'tag' ? [selectedTag] : [],
    });
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Handle save task
  const handleSaveTask = (task: Task) => {
    if (isEditMode) {
      // Update existing task
      const updateTask = (taskList: Task[]): Task[] => {
        return taskList.map(t => {
          if (t.id === task.id) {
            return task;
          }
          if (t.subtasks) {
            return { ...t, subtasks: updateTask(t.subtasks) };
          }
          return t;
        });
      };
      
      setTasks(updateTask(tasks));
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
  };

  // Change view
  const changeView = (view: ViewType, projectName?: string, tagName?: string) => {
    setCurrentView(view);
    if (view === 'project' && projectName) {
      setSelectedProject(projectName);
    } else if (view === 'tag' && tagName) {
      setSelectedTag(tagName);
    }
  };

  return (
    <Layout>
      <SEO title="Task Flow Manager" description="Manage and organize your tasks across different projects." />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Task Flow Manager</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Manage and organize all your tasks across different projects.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAddTask}
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
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-neutral-300 pl-10 focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-neutral-400" aria-hidden="true" />
              Filters
              <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-neutral-400" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* CSV Import/Export */}
        <div className="mt-4">
          <CSVActions
            entityType="tasks"
            headers={csvTemplates.tasks}
            onImport={handleImportCSV}
          />
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-md shadow">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Status
                </label>
                <select
                  id="status-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
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
                <label htmlFor="priority-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Priority
                </label>
                <select
                  id="priority-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
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
                <label htmlFor="project-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Project
                </label>
                <select
                  id="project-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                >
                  {projectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-medium text-neutral-800 dark:text-white">Views</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => changeView('all')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        currentView === 'all'
                          ? 'bg-[#7D9BC1] text-[#003366] dark:bg-[#003366] dark:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <InboxIcon className="mr-3 h-5 w-5" />
                      All Tasks
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeView('today')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        currentView === 'today'
                          ? 'bg-[#7D9BC1] text-[#003366] dark:bg-[#003366] dark:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5" />
                      Today
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeView('upcoming')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        currentView === 'upcoming'
                          ? 'bg-[#7D9BC1] text-[#003366] dark:bg-[#003366] dark:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <ClockIcon className="mr-3 h-5 w-5" />
                      Upcoming
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeView('completed')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        currentView === 'completed'
                          ? 'bg-[#7D9BC1] text-[#003366] dark:bg-[#003366] dark:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <CheckCircleIcon className="mr-3 h-5 w-5" />
                      Completed
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Projects section */}
              <div className="p-4 border-t border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-medium text-neutral-800 dark:text-white">Projects</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {projectOptions.filter(p => p !== 'All').map((project) => (
                    <li key={project}>
                      <button
                        onClick={() => changeView('project', project)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          currentView === 'project' && selectedProject === project
                            ? 'bg-[#7D9BC1] text-[#003366] dark:bg-[#003366] dark:text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                        }`}
                      >
                        <ExclamationCircleIcon className="mr-3 h-5 w-5" />
                        {project}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Tags section */}
              {allTags.length > 0 && (
                <>
                  <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium text-neutral-800 dark:text-white">Tags</h2>
                  </div>
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {allTags.map((tag) => (
                        <li key={tag}>
                          <button
                            onClick={() => changeView('tag', undefined, tag)}
                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                              currentView === 'tag' && selectedTag === tag
                                ? 'bg-[#7D9BC1] text-[#003366] dark:bg-[#003366] dark:text-white'
                                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                            }`}
                          >
                            <TagIcon className="mr-3 h-5 w-5" />
                            {tag}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </>
              )}
            </div>
          </div>

          {/* Task list */}
          <div className="flex-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-medium text-neutral-800 dark:text-white">
                  {currentView === 'all' && 'All Tasks'}
                  {currentView === 'today' && 'Today\'s Tasks'}
                  {currentView === 'upcoming' && 'Upcoming Tasks'}
                  {currentView === 'completed' && 'Completed Tasks'}
                  {currentView === 'project' && `${selectedProject} Tasks`}
                  {currentView === 'tag' && `Tasks Tagged with "${selectedTag}"`}
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={handleTaskStatusChange}
                      onEdit={handleTaskEdit}
                      onDelete={handleTaskDelete}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-neutral-500 dark:text-neutral-400">No tasks found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTask}
        task={currentTask}
        isEdit={isEditMode}
        projects={projectOptions.filter(p => p !== 'All')}
      />
    </Layout>
  );
};

export default Tasks;