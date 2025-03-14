# Dashboard-Z: Workflow Nexus

A comprehensive dashboard application for managing projects, tasks, stakeholders, and meetings.

## Features

- **Dashboard Overview**: Get a quick snapshot of your workflow
- **Project Command Center**: Manage all your projects in one place
- **Task Flow Manager**: Organize and track tasks across projects
- **Stakeholder Nexus**: Manage relationships with key stakeholders
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

## Getting Started

### Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/antwonjones02/Dashboard-Z.git
   cd Dashboard-Z
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

### Prerequisites

Before deploying to production, ensure you have:

1. Updated all environment variables in `.env.local` for production
2. Tested the application thoroughly
3. Optimized images and assets
4. Reviewed security settings

### Option 1: Standard Node.js Deployment

1. Install production dependencies:
   ```bash
   npm ci
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm run start
   ```

4. For a proper production setup, consider using a process manager like PM2:
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start the application with PM2
   pm2 start npm --name "dashboard-z" -- start
   
   # Set up PM2 to start on system boot
   pm2 startup
   pm2 save
   ```

### Option 2: Using the Deployment Script

Our enhanced deployment script provides an interactive way to deploy:

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script and follow the prompts:
   ```bash
   ./deploy.sh
   ```

### Option 3: Docker Deployment

For containerized deployment:

1. Ensure Docker and Docker Compose are installed on your server
2. Update environment variables in `.env.local` or pass them directly to docker-compose
3. Build and run using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. To stop the containers:
   ```bash
   docker-compose down
   ```

5. To view logs:
   ```bash
   docker-compose logs -f
   ```

### Option 4: Netlify Deployment (Recommended)

For easy cloud deployment with continuous integration:

1. Ensure your repository includes the `netlify.toml` file (already created)

2. Connect your GitHub repository to Netlify:
   - Sign up/login to [Netlify](https://netlify.com)
   - Click "New site from Git" and select your GitHub repository
   - Netlify will automatically detect the build settings from `netlify.toml`

3. Configure environment variables in the Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add all variables from your `.env.local` file

4. For detailed instructions, see the [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) guide

5. For local Netlify development and testing:
   ```bash
   npm install -g netlify-cli
   netlify login
   npm run netlify-dev
   ```

## Environment Variables

The application uses the following environment variables:

- `NEXT_PUBLIC_APP_URL`: The URL where the application is hosted
- `NEXT_PUBLIC_API_URL`: The URL of the API (if applicable)
- `NEXT_PUBLIC_ENABLE_CSV_IMPORT`: Enable/disable CSV import functionality
- `NEXT_PUBLIC_ENABLE_DARK_MODE`: Enable/disable dark mode

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
- **Deployment Issues**: See the specific deployment guide for your chosen method

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.