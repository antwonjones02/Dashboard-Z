import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Stakeholder } from './StakeholderCard';

interface StakeholderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stakeholder: Stakeholder) => void;
  stakeholder?: Stakeholder;
  isEdit?: boolean;
  projects: { id: string; title: string }[];
}

const defaultStakeholder: Stakeholder = {
  id: '',
  name: '',
  role: '',
  company: '',
  avatar: 'https://via.placeholder.com/150',
  contact: {
    email: '',
    phone: '',
  },
  tags: [],
  projects: [],
  influenceLevel: 'medium',
  interestLevel: 'medium',
  notes: '',
  lastContact: new Date().toISOString().split('T')[0],
  upcomingInteractions: [],
};

const StakeholderForm: React.FC<StakeholderFormProps> = ({
  isOpen,
  onClose,
  onSave,
  stakeholder = defaultStakeholder,
  isEdit = false,
  projects,
}) => {
  const [formData, setFormData] = useState<Stakeholder>(stakeholder);
  const [tagInput, setTagInput] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedProjectRole, setSelectedProjectRole] = useState('');

  useEffect(() => {
    if (stakeholder) {
      setFormData(stakeholder);
    }
  }, [stakeholder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || `stakeholder-${Date.now()}`,
    });
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const addProject = () => {
    if (selectedProject && selectedProjectRole) {
      const project = projects.find(p => p.id === selectedProject);
      if (project && !formData.projects.some(p => p.id === selectedProject)) {
        setFormData(prev => ({
          ...prev,
          projects: [
            ...prev.projects,
            {
              id: selectedProject,
              title: project.title,
              role: selectedProjectRole,
            },
          ],
        }));
        setSelectedProject('');
        setSelectedProjectRole('');
      }
    }
  };

  const removeProject = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId),
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

        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-[#041C2C] shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-neutral-800 dark:text-white"
            >
              {isEdit ? 'Edit Stakeholder' : 'Add New Stakeholder'}
            </Dialog.Title>
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-md font-medium text-neutral-800 dark:text-white">Basic Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Name
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
                    <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="influenceLevel" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Influence Level
                    </label>
                    <select
                      name="influenceLevel"
                      id="influenceLevel"
                      value={formData.influenceLevel}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="interestLevel" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Interest Level
                    </label>
                    <select
                      name="interestLevel"
                      id="interestLevel"
                      value={formData.interestLevel}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium text-neutral-800 dark:text-white">Contact Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact.email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="contact.email"
                      id="contact.email"
                      required
                      value={formData.contact.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact.phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="contact.phone"
                      id="contact.phone"
                      required
                      value={formData.contact.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact.linkedin" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      LinkedIn (optional)
                    </label>
                    <input
                      type="text"
                      name="contact.linkedin"
                      id="contact.linkedin"
                      value={formData.contact.linkedin || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact.slack" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Slack (optional)
                    </label>
                    <input
                      type="text"
                      name="contact.slack"
                      id="contact.slack"
                      value={formData.contact.slack || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium text-neutral-800 dark:text-white">Additional Information</h4>
                
                <div>
                  <label htmlFor="lastContact" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Last Contact Date
                  </label>
                  <input
                    type="date"
                    name="lastContact"
                    id="lastContact"
                    value={formData.lastContact}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  />
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
                  {formData.tags.length > 0 && (
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
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Projects
                  </label>
                  <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                    >
                      <option value="">Select a project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={selectedProjectRole}
                        onChange={(e) => setSelectedProjectRole(e.target.value)}
                        placeholder="Role in project"
                        className="flex-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={addProject}
                        disabled={!selectedProject || !selectedProjectRole}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#003366] hover:bg-[#002852] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] disabled:opacity-50"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {formData.projects.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.projects.map(project => (
                        <div key={project.id} className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-700 rounded-md">
                          <div>
                            <div className="text-sm font-medium text-neutral-800 dark:text-white">{project.title}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">Role: {project.role}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeProject(project.id)}
                            className="text-neutral-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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

export default StakeholderForm;