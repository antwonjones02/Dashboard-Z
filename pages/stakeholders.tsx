import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MagnifyingGlassIcon, FunnelIcon, PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import CSVActions from '../components/CSVActions';
import { csvTemplates } from '../utils/csvUtils';
import StakeholderCard, { Stakeholder } from '../components/stakeholders/StakeholderCard';
import StakeholderForm from '../components/stakeholders/StakeholderForm';
import InteractionForm, { Interaction } from '../components/stakeholders/InteractionForm';

// Mock function to fetch stakeholders
const fetchStakeholders = async (): Promise<Stakeholder[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: '1',
      name: 'John Smith',
      role: 'CEO',
      company: 'Acme Corporation',
      avatar: 'https://via.placeholder.com/150',
      contact: {
        email: 'john.smith@acme.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/johnsmith',
      },
      tags: ['Executive', 'Decision Maker', 'Key Client'],
      projects: [
        {
          id: '101',
          title: 'Website Redesign',
          role: 'Project Sponsor',
        },
      ],
      influenceLevel: 'high',
      interestLevel: 'medium',
      notes: 'Prefers email communication. Interested in ROI metrics.',
      lastContact: '2023-02-15',
      upcomingInteractions: [
        {
          type: 'meeting',
          date: '2023-03-20',
          description: 'Quarterly review meeting',
        },
      ],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'Acme Corporation',
      avatar: 'https://via.placeholder.com/150',
      contact: {
        email: 'sarah.johnson@acme.com',
        phone: '+1 (555) 987-6543',
        slack: '@sarahj',
      },
      tags: ['Marketing', 'Decision Influencer'],
      projects: [
        {
          id: '101',
          title: 'Website Redesign',
          role: 'Project Manager',
        },
        {
          id: '102',
          title: 'Brand Refresh',
          role: 'Team Lead',
        },
      ],
      influenceLevel: 'medium',
      interestLevel: 'high',
      notes: 'Very responsive. Prefers Slack for quick communications.',
      lastContact: '2023-03-01',
      upcomingInteractions: [
        {
          type: 'call',
          date: '2023-03-10',
          description: 'Discuss marketing campaign integration',
        },
      ],
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'IT Director',
      company: 'Tech Solutions Inc.',
      avatar: 'https://via.placeholder.com/150',
      contact: {
        email: 'michael.chen@techsolutions.com',
        phone: '+1 (555) 456-7890',
        linkedin: 'linkedin.com/in/michaelchen',
      },
      tags: ['Technical', 'Decision Maker', 'Partner'],
      projects: [
        {
          id: '103',
          title: 'System Integration',
          role: 'Technical Lead',
        },
      ],
      influenceLevel: 'high',
      interestLevel: 'high',
      notes: 'Very technical. Prefers detailed documentation.',
      lastContact: '2023-02-28',
      upcomingInteractions: [
        {
          type: 'email',
          date: '2023-03-08',
          description: 'Send technical specifications document',
        },
        {
          type: 'meeting',
          date: '2023-03-15',
          description: 'Technical review meeting',
        },
      ],
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'Innovate Solutions',
      avatar: 'https://via.placeholder.com/150',
      contact: {
        email: 'emily.rodriguez@innovate.com',
        phone: '+1 (555) 789-0123',
        slack: '@emilyr',
      },
      tags: ['Product', 'Decision Influencer', 'UX Advocate'],
      projects: [
        {
          id: '104',
          title: 'Mobile App Development',
          role: 'Product Owner',
        },
      ],
      influenceLevel: 'medium',
      interestLevel: 'high',
      notes: 'Detail-oriented and focused on user experience. Prefers visual presentations.',
      lastContact: '2023-03-05',
      upcomingInteractions: [
        {
          type: 'meeting',
          date: '2023-03-12',
          description: 'Product roadmap planning session',
        },
      ],
    },
    {
      id: '5',
      name: 'David Wilson',
      role: 'CFO',
      company: 'Global Enterprises',
      avatar: 'https://via.placeholder.com/150',
      contact: {
        email: 'david.wilson@global.com',
        phone: '+1 (555) 234-5678',
        linkedin: 'linkedin.com/in/davidwilson',
      },
      tags: ['Executive', 'Financial', 'Decision Maker'],
      projects: [
        {
          id: '105',
          title: 'Financial System Upgrade',
          role: 'Executive Sponsor',
        },
      ],
      influenceLevel: 'high',
      interestLevel: 'medium',
      notes: 'Very focused on ROI and cost efficiency. Prefers concise communications.',
      lastContact: '2023-02-20',
      upcomingInteractions: [
        {
          type: 'call',
          date: '2023-03-18',
          description: 'Budget review call',
        },
      ],
    },
  ];
};

// Mock function to fetch projects
const fetchProjects = async (): Promise<{ id: string; title: string }[]> => {
  // In a real app, this would be an API call
  return [
    { id: '101', title: 'Website Redesign' },
    { id: '102', title: 'Brand Refresh' },
    { id: '103', title: 'System Integration' },
    { id: '104', title: 'Mobile App Development' },
    { id: '105', title: 'Financial System Upgrade' },
    { id: '106', title: 'Data Migration' },
    { id: '107', title: 'E-commerce Platform' },
  ];
};

const Stakeholders = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInfluence, setFilterInfluence] = useState('All');
  const [filterInterest, setFilterInterest] = useState('All');
  const [filterTag, setFilterTag] = useState('All');
  const [filterCompany, setFilterCompany] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isStakeholderFormOpen, setIsStakeholderFormOpen] = useState(false);
  const [isInteractionFormOpen, setIsInteractionFormOpen] = useState(false);
  const [currentStakeholder, setCurrentStakeholder] = useState<Stakeholder | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stakeholdersData, projectsData] = await Promise.all([
          fetchStakeholders(),
          fetchProjects(),
        ]);
        setStakeholders(stakeholdersData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get unique tags and companies for filters
  const allTags = Array.from(new Set(stakeholders.flatMap(s => s.tags)));
  const allCompanies = Array.from(new Set(stakeholders.map(s => s.company)));

  // Filter stakeholders based on search term and filters
  const filteredStakeholders = stakeholders.filter((stakeholder) => {
    const matchesSearch = searchTerm === '' || 
                         stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stakeholder.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stakeholder.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInfluence = filterInfluence === 'All' || stakeholder.influenceLevel === filterInfluence.toLowerCase();
    const matchesInterest = filterInterest === 'All' || stakeholder.interestLevel === filterInterest.toLowerCase();
    const matchesTag = filterTag === 'All' || stakeholder.tags.includes(filterTag);
    const matchesCompany = filterCompany === 'All' || stakeholder.company === filterCompany;
    
    return matchesSearch && matchesInfluence && matchesInterest && matchesTag && matchesCompany;
  });

  // Handle CSV import
  const handleImportCSV = (data: Record<string, string>[]) => {
    // Convert imported data to stakeholder format
    const importedStakeholders: Stakeholder[] = data.map((item, index) => ({
      id: `imported-${Date.now()}-${index}`,
      name: item['Name'] || '',
      role: item['Role'] || '',
      company: item['Organization'] || '',
      avatar: 'https://via.placeholder.com/150',
      contact: {
        email: item['Email'] || '',
        phone: item['Phone'] || '',
      },
      tags: item['Tags'] ? item['Tags'].split(',').map(tag => tag.trim()) : [],
      projects: [],
      influenceLevel: (item['Influence Level']?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low',
      interestLevel: (item['Interest Level']?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low',
      notes: item['Notes'] || '',
      lastContact: item['Last Contact'] || new Date().toISOString().split('T')[0],
      upcomingInteractions: [],
    }));
    
    // Add imported stakeholders to existing stakeholders
    setStakeholders([...stakeholders, ...importedStakeholders]);
  };

  // Handle stakeholder edit
  const handleStakeholderEdit = (stakeholder: Stakeholder) => {
    setCurrentStakeholder(stakeholder);
    setIsEditMode(true);
    setIsStakeholderFormOpen(true);
  };

  // Handle stakeholder delete
  const handleStakeholderDelete = (stakeholderId: string) => {
    setStakeholders(stakeholders.filter(s => s.id !== stakeholderId));
  };

  // Handle add new stakeholder
  const handleAddStakeholder = () => {
    setCurrentStakeholder(undefined);
    setIsEditMode(false);
    setIsStakeholderFormOpen(true);
  };

  // Handle save stakeholder
  const handleSaveStakeholder = (stakeholder: Stakeholder) => {
    if (isEditMode) {
      // Update existing stakeholder
      setStakeholders(stakeholders.map(s => s.id === stakeholder.id ? stakeholder : s));
    } else {
      // Add new stakeholder
      setStakeholders([...stakeholders, stakeholder]);
    }
  };

  // Handle add interaction
  const handleAddInteraction = (stakeholderId: string) => {
    const stakeholder = stakeholders.find(s => s.id === stakeholderId);
    if (stakeholder) {
      setCurrentStakeholder(stakeholder);
      setIsInteractionFormOpen(true);
    }
  };

  // Handle save interaction
  const handleSaveInteraction = (interaction: Interaction) => {
    if (currentStakeholder) {
      const updatedStakeholder = {
        ...currentStakeholder,
        upcomingInteractions: [...currentStakeholder.upcomingInteractions, interaction],
      };
      setStakeholders(stakeholders.map(s => s.id === currentStakeholder.id ? updatedStakeholder : s));
    }
  };

  return (
    <Layout>
      <SEO title="Stakeholder Nexus" description="Manage relationships with key stakeholders." />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Stakeholder Nexus</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Manage relationships with key stakeholders and track interactions.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAddStakeholder}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#003366] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#041C2C] focus:outline-none focus:ring-2 focus:ring-[#7D9BC1] focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Stakeholder
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
              placeholder="Search stakeholders..."
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
            entityType="stakeholders"
            headers={csvTemplates.stakeholders}
            onImport={handleImportCSV}
          />
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-md shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="influence-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Influence Level
                </label>
                <select
                  id="influence-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  value={filterInfluence}
                  onChange={(e) => setFilterInfluence(e.target.value)}
                >
                  <option value="All">All Influence Levels</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="interest-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Interest Level
                </label>
                <select
                  id="interest-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                >
                  <option value="All">All Interest Levels</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tag-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Tag
                </label>
                <select
                  id="tag-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  <option value="All">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="company-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Company
                </label>
                <select
                  id="company-filter"
                  className="mt-1 block w-full rounded-md border-neutral-300 py-2 pl-3 pr-10 text-base focus:border-[#003366] focus:outline-none focus:ring-[#003366] sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  <option value="All">All Companies</option>
                  {allCompanies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stakeholder grid */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003366]"></div>
            </div>
          ) : filteredStakeholders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStakeholders.map((stakeholder) => (
                <StakeholderCard
                  key={stakeholder.id}
                  stakeholder={stakeholder}
                  onEdit={handleStakeholderEdit}
                  onDelete={handleStakeholderDelete}
                  onAddInteraction={handleAddInteraction}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">No stakeholders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Stakeholder Form Modal */}
      <StakeholderForm
        isOpen={isStakeholderFormOpen}
        onClose={() => setIsStakeholderFormOpen(false)}
        onSave={handleSaveStakeholder}
        stakeholder={currentStakeholder}
        isEdit={isEditMode}
        projects={projects}
      />

      {/* Interaction Form Modal */}
      {currentStakeholder && (
        <InteractionForm
          isOpen={isInteractionFormOpen}
          onClose={() => setIsInteractionFormOpen(false)}
          onSave={handleSaveInteraction}
          stakeholderName={currentStakeholder.name}
        />
      )}
    </Layout>
  );
};

export default Stakeholders;