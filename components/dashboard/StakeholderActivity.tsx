import React from 'react';
import { EnvelopeIcon, PhoneIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';

const activities = [
  {
    id: 1,
    stakeholder: {
      name: 'Sarah Williams',
      role: 'Marketing Director',
      company: 'Acme Inc.',
      avatar: '/avatars/sarah.jpg',
    },
    type: 'email',
    description: 'Sent campaign proposal',
    date: '2025-03-12T14:30:00',
    project: 'Marketing Campaign',
  },
  {
    id: 2,
    stakeholder: {
      name: 'David Wilson',
      role: 'CEO',
      company: 'Client Co.',
      avatar: '/avatars/david.jpg',
    },
    type: 'meeting',
    description: 'Quarterly review meeting',
    date: '2025-03-11T10:00:00',
    project: 'Website Redesign',
  },
  {
    id: 3,
    stakeholder: {
      name: 'Emily Davis',
      role: 'Product Manager',
      company: 'Acme Inc.',
      avatar: '/avatars/emily.jpg',
    },
    type: 'document',
    description: 'Shared product roadmap',
    date: '2025-03-10T16:45:00',
    project: 'Mobile App Development',
  },
  {
    id: 4,
    stakeholder: {
      name: 'Michael Brown',
      role: 'Creative Director',
      company: 'Design Studio',
      avatar: '/avatars/michael.jpg',
    },
    type: 'call',
    description: 'Discussed design revisions',
    date: '2025-03-09T11:30:00',
    project: 'Website Redesign',
  },
];

const StakeholderActivity: React.FC = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <EnvelopeIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />;
      case 'call':
        return <PhoneIcon className="h-5 w-5 text-success-600 dark:text-success-400" />;
      case 'meeting':
        return <CalendarIcon className="h-5 w-5 text-warning-600 dark:text-warning-400" />;
      case 'document':
        return <DocumentTextIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return format(date, 'EEEE');
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                {activity.stakeholder.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{activity.stakeholder.name}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {activity.stakeholder.role}, {activity.stakeholder.company}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {formatDate(activity.date)}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{activity.description}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Project: {activity.project}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-4 text-center">
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default StakeholderActivity;