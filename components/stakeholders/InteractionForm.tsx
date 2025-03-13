import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface Interaction {
  type: 'meeting' | 'call' | 'email';
  date: string;
  description: string;
}

interface InteractionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (interaction: Interaction) => void;
  stakeholderName: string;
}

const InteractionForm: React.FC<InteractionFormProps> = ({
  isOpen,
  onClose,
  onSave,
  stakeholderName,
}) => {
  const [formData, setFormData] = useState<Interaction>({
    type: 'meeting',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

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
    
    // Reset form
    setFormData({
      type: 'meeting',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
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
              Add Interaction with {stakeholderName}
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
                <label htmlFor="type" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Interaction Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                >
                  <option value="meeting">Meeting</option>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  value={formData.date}
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
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm dark:bg-[#002852] dark:border-neutral-700 dark:text-white"
                  placeholder={`e.g., ${
                    formData.type === 'meeting' ? 'Quarterly review meeting' :
                    formData.type === 'call' ? 'Follow-up call about project status' :
                    'Send project proposal email'
                  }`}
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
                Add Interaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default InteractionForm;