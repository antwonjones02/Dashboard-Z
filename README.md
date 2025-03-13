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

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Chart.js with React-Chartjs-2
- **UI Components**: Headless UI

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

### Production Deployment

#### Option 1: Standard Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

#### Option 2: Using the Deployment Script

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

#### Option 3: Docker Deployment

1. Build and run using Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. To stop the containers:
   ```bash
   docker-compose down
   ```

## Environment Variables

The application uses the following environment variables:

- `NEXT_PUBLIC_APP_URL`: The URL where the application is hosted
- `NEXT_PUBLIC_API_URL`: The URL of the API (if applicable)
- `NEXT_PUBLIC_ENABLE_CSV_IMPORT`: Enable/disable CSV import functionality
- `NEXT_PUBLIC_ENABLE_DARK_MODE`: Enable/disable dark mode

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.