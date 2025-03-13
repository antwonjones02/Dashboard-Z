import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  LinkIcon, 
  ChatBubbleLeftIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  contact: {
    email: string;
    phone: string;
    linkedin?: string;
    slack?: string;
  };
  tags: string[];
  projects: {
    id: string;
    title: string;
    role: string;
  }[];
  influenceLevel: 'high' | 'medium' | 'low';
  interestLevel: 'high' | 'medium' | 'low';
  notes: string;
  lastContact: string;
  upcomingInteractions: {
    type: 'meeting' | 'call' | 'email';
    date: string;
    description: string;
  }[];
}

interface StakeholderCardProps {
  stakeholder: Stakeholder;
  onEdit: (stakeholder: Stakeholder) => void;
  onDelete: (stakeholderId: string) => void;
  onAddInteraction: (stakeholderId: string) => void;
}

const StakeholderCard: React.FC<StakeholderCardProps> = ({
  stakeholder,
  onEdit,
  onDelete,
  onAddInteraction,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Get influence level color class
  const getInfluenceLevelColorClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-[#C01933] text-white';
      case 'medium':
        return 'bg-[#FF6900] text-white';
      case 'low':
        return 'bg-[#7D9BC1] text-[#041C2C]';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
    }
  };

  // Get interest level color class
  const getInterestLevelColorClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-[#003366] text-white';
      case 'medium':
        return 'bg-[#7D9BC1] text-[#041C2C]';
      case 'low':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get interaction icon
  const getInteractionIcon = (type: 'meeting' | 'call' | 'email') => {
    switch (type) {
      case 'meeting':
        return CalendarIcon;
      case 'call':
        return PhoneIcon;
      case 'email':
        return EnvelopeIcon;
      default:
        return DocumentTextIcon;
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
              {stakeholder.avatar ? (
                <Image 
                  src={stakeholder.avatar} 
                  alt={stakeholder.name} 
                  width={48} 
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-[#003366] text-white text-lg font-medium">
                  {stakeholder.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-neutral-800 dark:text-white">{stakeholder.name}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{stakeholder.role} at {stakeholder.company}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(stakeholder)}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(stakeholder.id)}
              className="p-1 rounded-full text-neutral-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <EnvelopeIcon className="mr-2 h-4 w-4" />
              <a href={`mailto:${stakeholder.contact.email}`} className="hover:text-[#003366] dark:hover:text-[#7D9BC1]">
                {stakeholder.contact.email}
              </a>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <PhoneIcon className="mr-2 h-4 w-4" />
              <a href={`tel:${stakeholder.contact.phone}`} className="hover:text-[#003366] dark:hover:text-[#7D9BC1]">
                {stakeholder.contact.phone}
              </a>
            </div>
          </div>
          {stakeholder.contact.linkedin && (
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <LinkIcon className="mr-2 h-4 w-4" />
                <a href={`https://${stakeholder.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#003366] dark:hover:text-[#7D9BC1]">
                  LinkedIn
                </a>
              </div>
            </div>
          )}
          {stakeholder.contact.slack && (
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
                <span>{stakeholder.contact.slack}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInfluenceLevelColorClass(stakeholder.influenceLevel)}`}>
            Influence: {stakeholder.influenceLevel.charAt(0).toUpperCase() + stakeholder.influenceLevel.slice(1)}
          </div>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInterestLevelColorClass(stakeholder.interestLevel)}`}>
            Interest: {stakeholder.interestLevel.charAt(0).toUpperCase() + stakeholder.interestLevel.slice(1)}
          </div>
          {stakeholder.tags.map(tag => (
            <div key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
              {tag}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <span>Last contact: {formatDate(stakeholder.lastContact)}</span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white text-sm font-medium flex items-center"
          >
            {expanded ? (
              <>
                <span>Show less</span>
                <ChevronUpIcon className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-neutral-200 dark:border-neutral-700 p-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-neutral-800 dark:text-white mb-2">Notes</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {stakeholder.notes || 'No notes available.'}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-neutral-800 dark:text-white">Projects</h4>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {stakeholder.projects.length} {stakeholder.projects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>
            {stakeholder.projects.length > 0 ? (
              <ul className="space-y-2">
                {stakeholder.projects.map(project => (
                  <li key={project.id} className="text-sm">
                    <div className="flex items-start">
                      <UserGroupIcon className="h-4 w-4 mt-0.5 text-neutral-500 dark:text-neutral-400" />
                      <div className="ml-2">
                        <div className="text-neutral-800 dark:text-white">{project.title}</div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-xs">Role: {project.role}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">No projects assigned.</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-neutral-800 dark:text-white">Upcoming Interactions</h4>
              <button
                onClick={() => onAddInteraction(stakeholder.id)}
                className="text-xs text-[#003366] hover:text-[#002852] dark:text-[#7D9BC1] dark:hover:text-white font-medium"
              >
                + Add interaction
              </button>
            </div>
            {stakeholder.upcomingInteractions.length > 0 ? (
              <ul className="space-y-2">
                {stakeholder.upcomingInteractions.map((interaction, index) => {
                  const InteractionIcon = getInteractionIcon(interaction.type);
                  return (
                    <li key={index} className="text-sm">
                      <div className="flex items-start">
                        <InteractionIcon className="h-4 w-4 mt-0.5 text-neutral-500 dark:text-neutral-400" />
                        <div className="ml-2">
                          <div className="text-neutral-800 dark:text-white">{interaction.description}</div>
                          <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                            {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)} on {formatDate(interaction.date)}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">No upcoming interactions.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StakeholderCard;