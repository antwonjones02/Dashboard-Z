import React from 'react';
import { VideoCameraIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';

const meetings = [
  {
    id: 1,
    title: 'Weekly Team Sync',
    date: '2025-03-14T10:00:00',
    duration: 60,
    attendees: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'],
    isVirtual: true,
  },
  {
    id: 2,
    title: 'Project Kickoff: Marketing Campaign',
    date: '2025-03-15T14:30:00',
    duration: 90,
    attendees: ['John Doe', 'Sarah Williams', 'Michael Brown'],
    isVirtual: true,
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: '2025-03-16T11:00:00',
    duration: 120,
    attendees: ['John Doe', 'Emily Davis', 'David Wilson', 'Client Team'],
    isVirtual: false,
  },
  {
    id: 4,
    title: 'Design Review',
    date: '2025-03-17T15:00:00',
    duration: 60,
    attendees: ['John Doe', 'Jane Smith', 'Creative Team'],
    isVirtual: true,
  },
];

const UpcomingMeetings: React.FC = () => {
  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const formatDay = (dateString: string) => {
    const date = parseISO(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return format(date, 'EEE, MMM d');
    }
  };

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <div 
          key={meeting.id} 
          className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{meeting.title}</h4>
              <div className="mt-1 flex items-center space-x-4">
                <div className="flex items-center text-neutral-500 dark:text-neutral-400">
                  <ClockIcon className="mr-1 h-4 w-4" />
                  <span className="text-xs">{formatTime(meeting.date)} ({meeting.duration} min)</span>
                </div>
                <div className="flex items-center text-neutral-500 dark:text-neutral-400">
                  {meeting.isVirtual ? (
                    <VideoCameraIcon className="mr-1 h-4 w-4 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <UserGroupIcon className="mr-1 h-4 w-4" />
                  )}
                  <span className="text-xs">{meeting.isVirtual ? 'Virtual' : 'In Person'}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                {formatDay(meeting.date)}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mr-2">Attendees:</span>
              <div className="flex -space-x-1 overflow-hidden">
                {meeting.attendees.slice(0, 3).map((attendee, index) => (
                  <div 
                    key={index} 
                    className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-white dark:border-neutral-800"
                  >
                    {attendee.charAt(0)}
                  </div>
                ))}
                {meeting.attendees.length > 3 && (
                  <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-white dark:border-neutral-800">
                    +{meeting.attendees.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-4 text-center">
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
          View all meetings
        </button>
      </div>
    </div>
  );
};

export default UpcomingMeetings;