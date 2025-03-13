import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchStakeholders } from '@/services/api';
import { EnvelopeIcon, PhoneIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';

export default function Stakeholders() {
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const filteredStakeholders = stakeholders.filter((stakeholder: any) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'internal') return stakeholder.tags.includes('internal');
    if (activeFilter === 'external') return stakeholder.tags.includes('external');
    if (activeFilter === 'client') return stakeholder.tags.includes('client');
    return true;
  });

  return (
    <>
      <Head>
        <title>Stakeholder Nexus | Workflow Nexus</title>
        <meta name="description" content="Manage your relationships with key stakeholders" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Stakeholder Nexus</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Manage your relationships with key stakeholders
            </p>
          </div>

          {/* Stakeholder filters */}
          <div className="flex flex-wrap gap-2">
            <button 
              className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Stakeholders
            </button>
            <button 
              className={`btn ${activeFilter === 'internal' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('internal')}
            >
              Internal
            </button>
            <button 
              className={`btn ${activeFilter === 'external' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('external')}
            >
              External
            </button>
            <button 
              className={`btn ${activeFilter === 'client' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('client')}
            >
              Clients
            </button>
          </div>

          {/* Stakeholders grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p>Loading stakeholders...</p>
            ) : (
              filteredStakeholders.map((stakeholder: any) => (
                <div key={stakeholder.id} className="card overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 text-lg font-medium">
                          {stakeholder.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{stakeholder.name}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {stakeholder.role}, {stakeholder.company}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {stakeholder.tags.map((tag: string) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Contact Information</h4>
                      <div className="space-y-1">
                        {stakeholder.contact.email && (
                          <div className="flex items-center text-sm">
                            <EnvelopeIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400 mr-2" />
                            <span className="text-neutral-600 dark:text-neutral-400">{stakeholder.contact.email}</span>
                          </div>
                        )}
                        {stakeholder.contact.phone && (
                          <div className="flex items-center text-sm">
                            <PhoneIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400 mr-2" />
                            <span className="text-neutral-600 dark:text-neutral-400">{stakeholder.contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Projects</h4>
                      <div className="space-y-1">
                        {stakeholder.projects.map((project: any) => (
                          <div key={project.id} className="flex justify-between items-center text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">{project.title}</span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-500">{project.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {stakeholder.recentActivity && stakeholder.recentActivity.length > 0 && (
                      <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Recent Activity</h4>
                        <div className="space-y-2">
                          {stakeholder.recentActivity.slice(0, 2).map((activity: any) => (
                            <div key={activity.id} className="flex items-start space-x-2">
                              <div className="mt-0.5">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">{activity.description}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                  {formatDate(activity.date)} · {activity.project.title}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 text-right">
                      <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                        View Profile
                      </button>
                    </div>
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