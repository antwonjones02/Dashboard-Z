#!/bin/bash

# Production Deployment Script for Dashboard-Z
# This script handles the build and deployment process for production

# Exit on error
set -e

echo "🚀 Starting deployment process for Dashboard-Z..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci

# 2. Run linting
echo "🔍 Running linter..."
npm run lint

# 3. Build the application
echo "🏗️ Building the application..."
npm run build

# 4. Run tests (if you have them)
# echo "🧪 Running tests..."
# npm test

# 5. Start the production server
echo "🌐 Starting the production server..."
npm run start

echo "✅ Deployment completed successfully!"