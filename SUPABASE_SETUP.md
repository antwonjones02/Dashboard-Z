# Supabase Setup for Dashboard-Z

This guide will help you set up Supabase for authentication and data storage in the Dashboard-Z application.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com) if you don't have one)
- Dashboard-Z codebase cloned to your local machine

## Step 1: Create a Supabase Project

1. Log in to your Supabase account
2. Click "New Project"
3. Enter a name for your project (e.g., "dashboard-z")
4. Set a secure database password
5. Choose a region closest to your users
6. Click "Create new project"

## Step 2: Get Your Supabase Credentials

1. Once your project is created, go to the project dashboard
2. Click on "Settings" in the sidebar
3. Click on "API" in the submenu
4. You'll find your:
   - **Project URL**: Copy this to use as your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public** key: Copy this to use as your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Configure Environment Variables

1. In your Dashboard-Z project, open the `.env.local` file
2. Update the Supabase environment variables with your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Set Up the Database Schema

1. In your Supabase project dashboard, go to the "SQL Editor" section
2. Click "New Query"
3. Copy the contents of the `supabase-schema.sql` file from the Dashboard-Z project
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL and create all the necessary tables and security policies

## Step 5: Configure Authentication

1. In your Supabase project dashboard, go to the "Authentication" section
2. Under "Settings", configure your authentication providers:
   - For email/password authentication (default), ensure "Email Auth" is enabled
   - Configure the Site URL to match your application URL (e.g., `http://localhost:3000` for development)
   - Optionally, customize email templates for confirmation, magic links, etc.

## Step 6: Test Your Setup

1. Start your Dashboard-Z application locally:
   ```
   npm run dev
   ```
2. Navigate to the login page
3. Create a new account using the signup form
4. Verify that you can log in and access protected routes
5. Check your Supabase dashboard to confirm that user data is being stored correctly

## Database Structure

The Dashboard-Z application uses the following tables:

- **profiles**: User profile information
- **projects**: Project data
- **tasks**: Task data
- **stakeholders**: Stakeholder information
- **meetings**: Meeting data
- **project_stakeholders**: Junction table for project-stakeholder relationships
- **meeting_stakeholders**: Junction table for meeting-stakeholder relationships

Each table has Row Level Security (RLS) policies to ensure users can only access their own data.

## Troubleshooting

- **Authentication Issues**: Check that your environment variables are correctly set and that the Site URL in Supabase authentication settings matches your application URL.
- **Database Errors**: Verify that the SQL schema was executed successfully by checking the tables in the "Table Editor" section of your Supabase dashboard.
- **CORS Errors**: Ensure your application's URL is added to the allowed origins in the Supabase API settings.

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/installing)
- [Row Level Security](https://supabase.io/docs/guides/auth/row-level-security)