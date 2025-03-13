# Dashboard-Z Data Templates

This directory contains template JSON files that define the data structure needed for each module of the Workflow Nexus dashboard. These templates can be used to understand the required data format and to create mock data for development and testing.

## Files Overview

- **projects.json**: Data structure for the Project Command Center module
- **tasks.json**: Data structure for the Task Flow Manager module
- **meetings.json**: Data structure for the Meeting Intelligence Center module
- **stakeholders.json**: Data structure for the Stakeholder Nexus module

## How to Use These Templates

### For Development

1. You can use these JSON files directly for development by importing them in your components:

```javascript
import projectsData from '@/data/projects.json';
import tasksData from '@/data/tasks.json';
import meetingsData from '@/data/meetings.json';
import stakeholdersData from '@/data/stakeholders.json';
```

2. For a more realistic development experience, you can create a mock API service that returns this data:

```javascript
// services/api.js
import projectsData from '@/data/projects.json';
import tasksData from '@/data/tasks.json';
import meetingsData from '@/data/meetings.json';
import stakeholdersData from '@/data/stakeholders.json';

export const fetchProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(projectsData), 500);
  });
};

export const fetchTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tasksData), 500);
  });
};

// Add similar functions for other data types
```

### For Integration with Real Data Sources

When integrating with real data sources (APIs, databases, etc.), ensure that your data is transformed to match these structures. Here's a basic example:

```javascript
// Example of transforming API data to match our template structure
const transformProjectData = (apiProject) => {
  return {
    id: apiProject.id,
    title: apiProject.name,
    description: apiProject.description,
    progress: calculateProgress(apiProject),
    status: mapStatus(apiProject.status),
    dueDate: apiProject.endDate,
    startDate: apiProject.startDate,
    // ... transform other fields
  };
};

// Fetch and transform data from your API
const fetchProjectsFromAPI = async () => {
  const response = await fetch('https://your-api.com/projects');
  const data = await response.json();
  return data.map(transformProjectData);
};
```

## Data Structure Details

### Projects

Each project includes:
- Basic information (id, title, description)
- Progress and status tracking
- Budget information
- Team members
- Milestones
- Risk assessment

### Tasks

Each task includes:
- Basic information (id, title, description)
- Project association
- Assignee
- Status and priority
- Due dates
- Comments
- Subtasks
- Dependencies

### Meetings

Each meeting includes:
- Basic information (id, title, description)
- Date, time, and duration
- Location (virtual or in-person)
- Organizer and attendees
- Agenda
- Related projects and documents
- Recurring meeting settings

### Stakeholders

Each stakeholder includes:
- Basic information (id, name, role, company)
- Contact details
- Project associations
- Communication preferences
- Relationship health metrics
- Recent activity history
- Upcoming interactions

## Extending the Templates

Feel free to extend these templates with additional fields as needed for your specific implementation. Just ensure that any components consuming this data are updated to handle the new fields.