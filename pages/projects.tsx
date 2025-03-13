import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  ChevronDownIcon,
  ViewColumnsIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import CSVActions from '../components/CSVActions';
import { csvTemplates } from '../utils/csvUtils';
import KanbanBoard, { Project } from '../components/projects/KanbanBoard';
import ProjectForm from '../components/projects/ProjectForm';
import SEO from '../components/SEO';

// Sample project data
const initialProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign the company website with modern UI/UX',
    status: 'In Progress',
    startDate: '2023-01-15',
    endDate: '2023-04-30',
    priority: 'High',
    owner: 'Jane Smith',
    progress: 65,
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Develop a mobile app for iOS and Android',
    status: 'Planning',
    startDate: '2023-03-01',
    endDate: '2023-08-15',
    priority: 'Medium',
    owner: 'John Doe',
    progress: 25,
  },
  {
    id: 3,
    name: 'Data Migration',
    description: 'Migrate data from legacy systems to new platform',
    status: 'Completed',
    startDate: '2023-02-10',
    endDate: '2023-03-15',
    priority: 'High',
    owner: 'Mike Johnson',
    progress: 100,
  },
  {
    id: 4,
    name: 'CRM Implementation',
    description: 'Implement new CRM system across departments',
    status: 'On Hold',
    startDate: '2023-04-01',
    endDate: '2023-07-30',
    priority: 'Low',
    owner: 'Sarah Williams',
    progress: 10,
  },
  {
    id: 5,
    name: 'Marketing Campaign',
    description: 'Launch Q2 marketing campaign across digital channels',
    status: 'Planning',
    startDate: '2023-04-15',
    endDate: '2023-06-30',
    priority: 'Medium',
    owner: 'Alex Johnson',
    progress: 15,
  },
  {
    id: 6,
    name: 'Product Launch',
    description: 'Coordinate launch of new product line',
    status: 'In Progress',
    startDate: '2023-02-01',
    endDate: '2023-05-15',
    priority: 'High',
    owner: 'Lisa Chen',
    progress: 50,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  // Filter projects based on search term and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Handle CSV import
  const handleImportCSV = (data: Record<string, string>[]) => {
    // Convert imported data to project format
    const importedProjects = data.map((item, index) => ({
      id: projects.length + index + 1,
      name: item['Project Name'] || '',
      description: item['Description'] || '',
      status: item['Status'] || 'Planning',
      startDate: item['Start Date'] || new Date().toISOString().split('T')[0],
      endDate: item['End Date'] || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: item['Priority'] || 'Medium',
      owner: item['Owner'] || '',
      progress: item['Status'] === 'Completed' ? 100 : 
               item['Status'] === 'In Progress' ? 50 : 
               item['Status'] === 'Planning' ? 10 : 0,
    }));
    
    // Add imported projects to existing projects
    setProjects([...projects, ...importedProjects]);
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

  // Handle project update
  const handleProjectUpdate = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  // Handle project delete
  const handleProjectDelete = (projectId: number) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  // Handle project add
  const handleProjectAdd = (status: string = 'Planning') => {
    setCurrentProject({
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      name: '',
      description: '',
      status,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'Medium',
      owner: '',
      progress: 0,
    });
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Handle project edit
  const handleProjectEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle project save
  const handleProjectSave = (project: Project) => {
    if (isEditMode) {
      handleProjectUpdate(project);
    } else {
      setProjects([...projects, project]);
    }
  };

  return (
    <Layout>
      <SEO title="Project Command Center" description="Manage and organize your projects with a Trello-like interface." />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Project Command Center</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              A comprehensive view of all your projects, their status, and progress.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => handleProjectAdd()}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#003366] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#041C2C] focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Project
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
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-l-md border ${
                  viewMode === 'kanban'
                    ? 'bg-[#003366] text-white border-[#003366]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-700'
                }`}
              >
                <ViewColumnsIcon className="-ml-0.5 mr-2 h-4 w-4" />
                Kanban
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-r-md border ${
                  viewMode === 'list'
                    ? 'bg-[#003366] text-white border-[#003366]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-700'
                }`}
              >
                <TableCellsIcon className="-ml-0.5 mr-2 h-4 w-4" />
                List
              </button>
            </div>
            
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
            entityType="projects"
            headers={csvTemplates.projects}
            onImport={handleImportCSV}
          />
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-md shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
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
            </div>
          </div>
        )}

        {/* Project views */}
        <div className="mt-6">
          {viewMode === 'kanban' ? (
            <KanbanBoard 
              projects={filteredProjects} 
              onProjectUpdate={handleProjectUpdate}
              onProjectDelete={handleProjectDelete}
              onProjectAdd={handleProjectAdd}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Owner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-neutral-900 dark:text-white">
                              {project.name}
                            </div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColorClass(project.priority)}`}>
                          {project.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                        {project.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                        <div>{project.startDate}</div>
                        <div>to {project.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                            <div 
                              className="bg-[#003366] h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleProjectEdit(project)}
                          className="text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleProjectDelete(project.id)}
                          className="text-[#C01933] hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Project Form Modal */}
      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleProjectSave}
        project={currentProject}
        isEdit={isEditMode}
      />
    </Layout>
  );
};

export default Projects;