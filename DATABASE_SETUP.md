# Database Setup for Dashboard-Z

This guide will help you set up the database for the Dashboard-Z application.

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

1. In your Dashboard-Z project, copy the `.env.local.example` file to `.env.local`
2. Update the Supabase environment variables with your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Set Up the Database Schema

1. In your Supabase project dashboard, go to the "SQL Editor" section
2. Click "New Query"
3. Run the following SQL files in order:
   - First, run the contents of `migrations/create_tables.sql`
   - Then, run the contents of `migrations/create_projects_table.sql`
   - Finally, run any other migration files in the `migrations` directory

## Step 5: Verify the Database Setup

1. In your Supabase project dashboard, go to the "Table Editor" section
2. Verify that the following tables have been created:
   - `profiles`
   - `user_settings`
   - `projects`

## Troubleshooting

### "relation 'public.projects' does not exist" Error

If you see this error, it means the projects table hasn't been created in your database. Follow these steps:

1. Go to the Supabase SQL Editor
2. Create a new query
3. Copy and paste the contents of `migrations/create_projects_table.sql`
4. Run the query

### Other Database Errors

If you encounter other database errors:

1. Check the Supabase logs in the "Database" > "Logs" section
2. Verify that all migration files have been run successfully
3. Make sure your environment variables are correctly set

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/installing)
- [Row Level Security](https://supabase.io/docs/guides/auth/row-level-security) 