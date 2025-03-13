import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MagnifyingGlassIcon, FunnelIcon, PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import CSVActions from '../components/CSVActions';
import { csvTemplates } from '../utils/csvUtils';

// Define the Meeting type
interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  duration: number;
  location: {
    type: string;
    details: string;
  };
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  attendees: {
    id: string;
    name: string;
    avatar: string;
    status: 'confirmed' | 'pending' | 'declined';
  }[];
  agenda: string[];
  notes: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  recurring: {
    isRecurring: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
}

// Mock function to fetch meetings
const fetchMeetings = async (): Promise<Meeting[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: '1',
      title: 'Project Kickoff',
      description: 'Initial meeting to discuss project goals and timeline',
      date: '2023-03-15T10:00:00',
      endDate: '2023-03-15T11:00:00',
      duration: 60,
      location: {
        type: 'virtual',
        details: 'Zoom Meeting ID: 123-456-7890',
      },
      organizer: {
        id: '101',
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40',
      },
      attendees: [
        {
          id: '102',
          name: 'John Doe',
          avatar: 'https://via.placeholder.com/40',
          status: 'confirmed',
        },
        {
          id: '103',
          name: 'Mike Johnson',
          avatar: 'https://via.placeholder.com/40',
          status: 'pending',
        },
      ],
      agenda: [
        'Introduction',
        'Project Overview',
        'Timeline Discussion',
        'Q&A',
      ],
      notes: '',
      status: 'scheduled',
      recurring: {
        isRecurring: false,
      },
    },
    {
      id: '2',
      title: 'Weekly Status Update',
      description: 'Regular team meeting to discuss progress and blockers',
      date: '2023-03-17T14:00:00',
      endDate: '2023-03-17T15:00:00',
      duration: 60,
      location: {
        type: 'in-person',
        details: 'Conference Room A',
      },
      organizer: {
        id: '101',
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40',
      },
      attendees: [
        {
          id: '102',
          name: 'John Doe',
          avatar: 'https://via.placeholder.com/40',
          status: 'confirmed',
        },
        {
          id: '103',
          name: 'Mike Johnson',
          avatar: 'https://via.placeholder.com/40',
          status: 'confirmed',
        },
        {
          id: '104',
          name: 'Sarah Williams',
          avatar: 'https://via.placeholder.com/40',
          status: 'declined',
        },
      ],
      agenda: [
        'Progress Updates',
        'Blockers Discussion',
        'Next Steps',
      ],
      notes: '',
      status: 'scheduled',
      recurring: {
        isRecurring: true,
        frequency: 'weekly',
        endDate: '2023-06-30',
      },
    },
  ];
};

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const data = await fetchMeetings();
        setMeetings(data);
      } catch (error) {
        console.error('Error loading meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeetings();
  }, []);

  // Filter meetings based on search term and filters
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || meeting.status === filterStatus;
    const matchesType = filterType === 'All' || meeting.location.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle CSV import
  const handleImportCSV = (data: Record<string, string>[]) => {
    // Convert imported data to meeting format
    const importedMeetings: Meeting[] = data.map((item, index) => ({
      id: `imported-${Date.now()}-${index}`,
      title: item['Meeting Title'],
      description: item['Agenda'] || '',
      date: item['Date'] + 'T' + (item['Time'] || '09:00:00'),
      endDate: item['Date'] + 'T' + (item['Time'] ? 
        new Date(`${item['Date']}T${item['Time']}`).getHours() + 1 + ':' + 
        new Date(`${item['Date']}T${item['Time']}`).getMinutes() + ':00' : 
        '10:00:00'),
      duration: 60,
      location: {
        type: item['Location']?.includes('Zoom') || item['Location']?.includes('Teams') ? 'virtual' : 'in-person',
        details: item['Location'] || '',
      },
      organizer: {
        id: 'user-1',
        name: item['Organizer'] || 'Unknown',
        avatar: 'https://via.placeholder.com/40',
      },
      attendees: item['Attendees'] ? item['Attendees'].split(',').map((name, i) => ({
        id: `attendee-${i}`,
        name: name.trim(),
        avatar: 'https://via.placeholder.com/40',
        status: 'pending' as const,
      })) : [],
      agenda: item['Agenda'] ? item['Agenda'].split(',').map(item => item.trim()) : [],
      notes: item['Notes'] || '',
      status: 'scheduled' as const,
      recurring: {
        isRecurring: false,
      },
    }));
    
    // Add imported meetings to existing meetings
    setMeetings([...meetings, ...importedMeetings]);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <SEO title="Meeting Intelligence" description="Organize and track all your meetings in one place." />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Meeting Intelligence</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Organize and track all your meetings in one place.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Schedule Meeting
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
              placeholder="Search meetings..."
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
            entityType="meetings"
            headers={csvTemplates.meetings}
            onImport={handleImportCSV}
          />
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  id="status-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Meeting Type
                </label>
                <select
                  id="type-filter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="virtual">Virtual</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mt-6 text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading meetings...</p>
          </div>
        )}

        {/* Meetings list */}
        {!loading && (
          <div className="mt-6 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMeetings.map((meeting) => (
                <li key={meeting.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-primary-600 truncate">{meeting.title}</p>
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(
                            meeting.status
                          )}`}
                        >
                          {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                        </span>
                        {meeting.recurring.isRecurring && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Recurring
                          </span>
                        )}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            meeting.location.type === 'virtual'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {meeting.location.type === 'virtual' ? 'Virtual' : 'In-Person'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          {meeting.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <p>
                          {formatDate(meeting.date)} at {formatTime(meeting.date)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-gray-900 dark:text-white mr-1">Location:</span> {meeting.location.details}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <p>
                          <span className="font-medium text-gray-900 dark:text-white mr-1">Organizer:</span> {meeting.organizer.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Attendees:</p>
                      <div className="mt-1 flex -space-x-1 overflow-hidden">
                        {meeting.attendees.map((attendee) => (
                          <img
                            key={attendee.id}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                            src={attendee.avatar}
                            alt={attendee.name}
                            title={attendee.name}
                          />
                        ))}
                        {meeting.attendees.length > 0 && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Empty state */}
            {filteredMeetings.length === 0 && (
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No meetings found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Meetings;