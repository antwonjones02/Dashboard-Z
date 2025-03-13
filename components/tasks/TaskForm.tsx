import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Task } from './TaskItem';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
  isEdit?: boolean;
  projects: string[];
}

const defaultTask: Task = {
  id: 0,
  name: '',
  description: '',
  status: 'Not Started',
  dueDate: new Date().toISOString().split('T')[0],
  priority: 'Medium',
  assignedTo: '',
  project: '',
  tags: [],
};

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSave,
  task = defaultTask,
  isEdit = false,
  projects,
}) => {
  const [formData, setFormData] = useState<Task>(task);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
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
              {isEdit ? 'Edit Task' : 'Add New Task'}
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
                  Task Name
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
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
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

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  id="assignedTo"
                  required
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Project
                </label>
                <select
                  name="project"
                  id="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Tags
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-neutral-300 focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-neutral-300 rounded-r-md bg-neutral-50 text-neutral-500 sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-neutral-300"
                  >
                    Add
                  </button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003366] text-white"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-white hover:bg-[#002852]"
                        >
                          <span className="sr-only">Remove tag</span>
                          <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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

export default TaskForm;