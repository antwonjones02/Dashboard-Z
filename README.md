# Dashboard-Z: Workflow Nexus

A comprehensive dashboard application for managing projects, tasks, stakeholders, and meetings.

## Features

- **Dashboard Overview**: Get a quick snapshot of your workflow
- **Project Command Center**: Manage all your projects in one place with Kanban board functionality
- **Task Flow Manager**: Organize and track tasks across projects with priority management
- **Stakeholder Nexus**: Manage relationships with key stakeholders and track interactions
- **Meeting Intelligence**: Schedule and track meetings
- **Settings**: Customize your experience
- **CSV Import/Export**: Import and export data using CSV files
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons, React Icons
- **Charts**: Chart.js with React-Chartjs-2
- **UI Components**: Headless UI
- **Drag and Drop**: React Beautiful DnD
- **Backend**: Supabase (PostgreSQL database and authentication)

## Setup

### Prerequisites

- Node.js 16+ and npm
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/antwonjones02/Dashboard-Z.git
   cd Dashboard-Z
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up the database:
   - Create a new Supabase project
   - Run the SQL migrations in the `migrations` folder to create the necessary tables and policies
   - First run `migrations/create_tables.sql` in the Supabase SQL editor
   - Then run `migrations/create_projects_table.sql` to create the projects table
   - For more detailed instructions, see the [Database Setup Guide](DATABASE_SETUP.md)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following tables:

- `profiles`: User profile information
- `user_settings`: User preferences for theme, notifications, etc.
- `projects`: Project information with status, priority, etc.
- `tasks`: Task information with status, priority, assignee, etc.
- `stakeholders`: Stakeholder information with contact details, influence level, etc.
- `meetings`: Meeting information with date, attendees, agenda, etc.

### Common Database Issues

If you see the error "relation 'public.projects' does not exist" when accessing the Project Command Center, it means the projects table hasn't been created in your Supabase database. Follow these steps to fix it:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `migrations/create_projects_table.sql`
5. Run the query
6. Refresh your application

## Authentication

The application uses Supabase Authentication for user management. Users can:

- Sign up with email and password
- Sign in with email and password
- Reset password
- Update profile information

## Deployment

The application can be deployed to Netlify or Vercel:

### Netlify

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `.next`
5. Add the environment variables in the Netlify dashboard

### Vercel

1. Push your code to GitHub
2. Import your GitHub repository in Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

## Environment Variables

The application uses the following environment variables:

- `NEXT_PUBLIC_APP_URL`: The URL where the application is hosted
- `NEXT_PUBLIC_API_URL`: The URL of the API (if applicable)
- `NEXT_PUBLIC_ENABLE_CSV_IMPORT`: Enable/disable CSV import functionality
- `NEXT_PUBLIC_ENABLE_DARK_MODE`: Enable/disable dark mode
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Maintenance and Updates

To keep your production deployment up-to-date:

1. Pull the latest changes:
   ```bash
   git pull origin main
   ```

2. Install any new dependencies:
   ```bash
   npm ci
   ```

3. Rebuild the application:
   ```bash
   npm run build
   ```

4. Restart the server or redeploy using your chosen method

## Troubleshooting

- **Build Errors**: Check for missing dependencies or environment variables
- **Runtime Errors**: Check server logs and browser console
- **Performance Issues**: Consider optimizing images, using code splitting, and enabling caching
- **Database Errors**: See the [Database Setup Guide](DATABASE_SETUP.md) for common database issues and solutions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.