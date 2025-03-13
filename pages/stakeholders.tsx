import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MagnifyingGlassIcon, FunnelIcon, PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import CSVActions from '../components/CSVActions';
import { csvTemplates } from '../utils/csvUtils';

// Define the Stakeholder type
interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  contact: {
    email: string;
    phone: string;
    linkedin?: string;
    slack?: string;
  };
  tags: string[];
  projects: {
    id: string;
    title: string;
    role: string;
  }[];
  influenceLevel: 'high' | 'medium' | 'low';
  interestLevel: 'high' | 'medium' | 'low';
  notes: string;
  lastContact: string;
  upcomingInteractions: {
    type: 'meeting' | 'call' | 'email';
    date: string;
    description: string;
  }[];
}

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
  ];
};

const Stakeholders = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInfluence, setFilterInfluence] = useState('All');
  const [filterInterest, setFilterInterest] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadStakeholders = async () => {
      try {
        const data = await fetchStakeholders();
        setStakeholders(data);
      } catch (error) {
        console.error('Error loading stakeholders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStakeholders();
  }, []);

  // Filter stakeholders based on search term and filters
  const filteredStakeholders = stakeholders.filter((stakeholder) => {
    const matchesSearch = stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stakeholder.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stakeholder.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInfluence = filterInfluence === 'All' || stakeholder.influenceLevel === filterInfluence.toLowerCase();
    const matchesInterest = filterInterest === 'All' || stakeholder.interestLevel === filterInterest.toLowerCase();
    
    return matchesSearch && matchesInfluence && matchesInterest;
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
      tags: [],
      projects: [],
      influenceLevel: (item['Influence Level']?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low',
      interestLevel: (item['Interest Level']?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low',
      notes: '',
      lastContact: new Date().toISOString().split('T')[0],
      upcomingInteractions: [],
    }));
    
    // Add imported stakeholders to existing stakeholders
    setStakeholders([...stakeholders, ...importedStakeholders]);
  };

  // Get influence level color class
  const getInfluenceLevelColorClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get interest level color class
  const getInterestLevelColorClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-purple-100 text-purple-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <SEO title="Stakeholder Nexus" description="Manage relationships with key stakeholders." />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Stakeholder Nexus</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Manage relationships with key stakeholders and track interactions.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
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
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search stakeholders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
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
            entityType="stakeholders"
            headers={csvTemplates.stakeholders}
            onImport={handleImportCSV}
          />
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="influence-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Influence Level
                </label>
                <select
                  id="influence-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterInfluence}
                  onChange={(e) => setFilterInfluence(e.target.value)}
                >
                  <option value="All">All Levels</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="interest-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Interest Level
                </label>
                <select
                  id="interest-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                >
                  <option value="All">All Levels</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mt-6 text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading stakeholders...</p>
          </div>
        )}

        {/* Stakeholders grid */}
        {!loading && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={stakeholder.avatar}
                      alt={stakeholder.name}
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{stakeholder.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stakeholder.role} at {stakeholder.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInfluenceLevelColorClass(
                        stakeholder.influenceLevel
                      )}`}
                    >
                      Influence: {stakeholder.influenceLevel.charAt(0).toUpperCase() + stakeholder.influenceLevel.slice(1)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInterestLevelColorClass(
                        stakeholder.interestLevel
                      )}`}
                    >
                      Interest: {stakeholder.interestLevel.charAt(0).toUpperCase() + stakeholder.interestLevel.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Contact Information</h4>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <p>Email: {stakeholder.contact.email}</p>
                      <p>Phone: {stakeholder.contact.phone}</p>
                      {stakeholder.contact.linkedin && <p>LinkedIn: {stakeholder.contact.linkedin}</p>}
                      {stakeholder.contact.slack && <p>Slack: {stakeholder.contact.slack}</p>}
                    </div>
                  </div>
                  
                  {stakeholder.projects.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Projects</h4>
                      <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {stakeholder.projects.map((project) => (
                          <li key={project.id}>
                            {project.title} - {project.role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {stakeholder.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Tags</h4>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {stakeholder.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Last Contact</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stakeholder.lastContact}</p>
                  </div>
                  
                  {stakeholder.upcomingInteractions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Upcoming Interactions</h4>
                      <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {stakeholder.upcomingInteractions.map((interaction, index) => (
                          <li key={index} className="mb-1">
                            <span className="font-medium">{interaction.date}</span>: {interaction.type} - {interaction.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-5 flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Log Interaction
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty state */}
        {!loading && filteredStakeholders.length === 0 && (
          <div className="mt-6 text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No stakeholders found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Stakeholders;