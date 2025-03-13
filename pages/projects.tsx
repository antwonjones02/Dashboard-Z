import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchProjects } from '@/services/api';
import ProjectCard from '@/components/dashboard/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      <Head>
        <title>Project Command Center | Workflow Nexus</title>
        <meta name="description" content="Manage and track all your projects in one place" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Project Command Center</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Manage and track all your projects in one place
            </p>
          </div>

          {/* Project filters */}
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary">All Projects</button>
            <button className="btn btn-outline">On Track</button>
            <button className="btn btn-outline">At Risk</button>
            <button className="btn btn-outline">Delayed</button>
          </div>

          {/* Projects list */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              projects.map((project: any) => (
                <div key={project.id} className="card p-6">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">{project.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{project.description}</p>
                  <ProjectCard
                    title={project.title}
                    progress={project.progress}
                    status={project.status}
                    dueDate={project.dueDate}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.team && project.team.slice(0, 3).map((member: any, index: number) => (
                        <div
                          key={index}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-white dark:border-neutral-800"
                        >
                          {member.name.charAt(0)}
                        </div>
                      ))}
                      {project.team && project.team.length > 3 && (
                        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-white dark:border-neutral-800">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                      View Details
                    </button>
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