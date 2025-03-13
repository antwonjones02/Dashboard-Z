import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchMeetings } from '@/services/api';
import { VideoCameraIcon, UserGroupIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('upcoming');

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

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const formatDay = (dateString: string) => {
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return format(date, 'EEE, MMM d');
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
  };

  const now = new Date();
  const filteredMeetings = meetings.filter((meeting: any) => {
    const meetingDate = parseISO(meeting.date);
    
    if (timeFilter === 'upcoming') {
      return meetingDate >= now;
    } else if (timeFilter === 'today') {
      return isToday(meetingDate);
    } else if (timeFilter === 'week') {
      const oneWeekFromNow = addDays(now, 7);
      return meetingDate >= now && meetingDate <= oneWeekFromNow;
    } else if (timeFilter === 'past') {
      return meetingDate < now;
    }
    
    return true;
  });

  // Group meetings by date
  const groupedMeetings: Record<string, any[]> = {};
  filteredMeetings.forEach((meeting: any) => {
    const dateKey = format(parseISO(meeting.date), 'yyyy-MM-dd');
    if (!groupedMeetings[dateKey]) {
      groupedMeetings[dateKey] = [];
    }
    groupedMeetings[dateKey].push(meeting);
  });

  // Sort dates
  const sortedDates = Object.keys(groupedMeetings).sort((a, b) => {
    return parseISO(a).getTime() - parseISO(b).getTime();
  });

  return (
    <>
      <Head>
        <title>Meeting Intelligence Center | Workflow Nexus</title>
        <meta name="description" content="Manage and organize your meetings efficiently" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Meeting Intelligence Center</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Manage and organize your meetings efficiently
            </p>
          </div>

          {/* Meeting filters */}
          <div className="flex flex-wrap gap-2">
            <button 
              className={`btn ${timeFilter === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setTimeFilter('upcoming')}
            >
              All Upcoming
            </button>
            <button 
              className={`btn ${timeFilter === 'today' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setTimeFilter('today')}
            >
              Today
            </button>
            <button 
              className={`btn ${timeFilter === 'week' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setTimeFilter('week')}
            >
              This Week
            </button>
            <button 
              className={`btn ${timeFilter === 'past' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setTimeFilter('past')}
            >
              Past Meetings
            </button>
          </div>

          {/* Meetings list */}
          <div className="space-y-8">
            {loading ? (
              <p>Loading meetings...</p>
            ) : sortedDates.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="mx-auto h-12 w-12 text-neutral-400" />
                <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No meetings found</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  There are no meetings matching your current filter.
                </p>
              </div>
            ) : (
              sortedDates.map(dateKey => (
                <div key={dateKey} className="space-y-4">
                  <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {formatDay(dateKey)}
                  </h2>
                  <div className="space-y-4">
                    {groupedMeetings[dateKey].map((meeting: any) => (
                      <div 
                        key={meeting.id} 
                        className="card p-5 hover:shadow-card-hover transition-shadow duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{meeting.title}</h4>
                            <div className="mt-1 flex items-center space-x-4">
                              <div className="flex items-center text-neutral-500 dark:text-neutral-400">
                                <ClockIcon className="mr-1 h-4 w-4" />
                                <span className="text-xs">{formatTime(meeting.date)} ({formatDuration(meeting.duration)})</span>
                              </div>
                              <div className="flex items-center text-neutral-500 dark:text-neutral-400">
                                {meeting.location.type === 'virtual' ? (
                                  <VideoCameraIcon className="mr-1 h-4 w-4 text-primary-600 dark:text-primary-400" />
                                ) : (
                                  <UserGroupIcon className="mr-1 h-4 w-4" />
                                )}
                                <span className="text-xs">{meeting.location.type === 'virtual' ? 'Virtual' : 'In Person'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                              {meeting.organizer.name}
                            </span>
                          </div>
                        </div>
                        
                        {meeting.description && (
                          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                            {meeting.description}
                          </p>
                        )}
                        
                        <div className="mt-3">
                          <div className="flex items-center">
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 mr-2">Attendees:</span>
                            <div className="flex -space-x-1 overflow-hidden">
                              {meeting.attendees.slice(0, 3).map((attendee: any, index: number) => (
                                <div 
                                  key={index} 
                                  className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-white dark:border-neutral-800"
                                >
                                  {attendee.name.charAt(0)}
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
                        
                        {meeting.relatedProjects && meeting.relatedProjects.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {meeting.relatedProjects.map((project: any) => (
                              <span key={project.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                {project.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}