import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Project } from './KanbanBoard';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project;
  isEdit?: boolean;
}

const defaultProject: Project = {
  id: 0,
  name: '',
  description: '',
  status: 'Planning',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  priority: 'Medium',
  owner: '',
  progress: 0,
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  isOpen,
  onClose,
  onSave,
  project = defaultProject,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<Project>(project);

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-[#041C2C] shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-neutral-800 dark:text-white"
            >
              {isEdit ? 'Edit Project' : 'Add New Project'}
            </Dialog.Title>
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="owner" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Project Owner
                </label>
                <input
                  type="text"
                  name="owner"
                  id="owner"
                  required
                  value={formData.owner}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Progress ({formData.progress}%)
                </label>
                <input
                  type="range"
                  name="progress"
                  id="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 border border-transparent rounded-md hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#003366] dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#003366] border border-transparent rounded-md hover:bg-[#002852] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#003366]"
              >
                {isEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ProjectForm;