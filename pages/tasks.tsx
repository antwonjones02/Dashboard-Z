import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchTasks } from '@/services/api';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const priorityColors = {
    high: 'text-danger-600 dark:text-danger-400',
    medium: 'text-warning-600 dark:text-warning-400',
    low: 'text-success-600 dark:text-success-400',
  };

  const priorityIcons = {
    high: <ExclamationCircleIcon className="h-5 w-5 text-danger-600 dark:text-danger-400" />,
    medium: <ClockIcon className="h-5 w-5 text-warning-600 dark:text-warning-400" />,
    low: <CheckCircleIcon className="h-5 w-5 text-success-600 dark:text-success-400" />,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  const filteredTasks = tasks.filter((task: any) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return task.status === 'completed';
    if (activeFilter === 'in-progress') return task.status === 'in-progress';
    if (activeFilter === 'to-do') return task.status === 'to-do';
    return true;
  });

  return (
    <>
      <Head>
        <title>Task Flow Manager | Workflow Nexus</title>
        <meta name="description" content="Manage and organize your tasks efficiently" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Task Flow Manager</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Manage and organize your tasks efficiently
            </p>
          </div>

          {/* Task filters */}
          <div className="flex flex-wrap gap-2">
            <button 
              className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={`btn ${activeFilter === 'to-do' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('to-do')}
            >
              To Do
            </button>
            <button 
              className={`btn ${activeFilter === 'in-progress' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`btn ${activeFilter === 'completed' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
          </div>

          {/* Tasks list */}
          <div className="space-y-4">
            {loading ? (
              <p>Loading tasks...</p>
            ) : (
              filteredTasks.map((task: any) => (
                <div 
                  key={task.id} 
                  className="card p-4 hover:shadow-card-hover transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {priorityIcons[task.priority as keyof typeof priorityIcons]}
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{task.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">{task.project.title}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                            {task.status}
                          </span>
                          <span className={`text-xs font-medium ${isOverdue(task.dueDate) ? 'text-danger-600 dark:text-danger-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                            Due {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {task.assignee && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-white dark:border-neutral-800">
                          {task.assignee.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                      {task.description}
                    </p>
                  )}
                  
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Subtasks</h5>
                      <div className="space-y-1">
                        {task.subtasks.map((subtask: any) => (
                          <div key={subtask.id} className="flex items-center">
                            <div className={`h-4 w-4 rounded-full mr-2 ${subtask.completed ? 'bg-success-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}></div>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{subtask.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}