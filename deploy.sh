#!/bin/bash

# Production Deployment Script for Dashboard-Z
# This script handles the build and deployment process for production

# Exit on error
set -e

echo "🚀 Starting deployment process for Dashboard-Z..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "⚠️ .env.local file not found. Creating from example..."
  cp .env.local.example .env.local
  echo "⚠️ Please update .env.local with your production values before continuing."
  exit 1
fi

# Deployment method selection
echo "📋 Select deployment method:"
echo "1) Standard Node.js deployment"
echo "2) Docker deployment"
read -p "Enter your choice (1/2): " deployment_choice

case $deployment_choice in
  1)
    # Standard deployment
    echo "🔄 Selected standard Node.js deployment"
    
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
    ;;
    
  2)
    # Docker deployment
    echo "🐳 Selected Docker deployment"
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
      echo "❌ Docker is not installed. Please install Docker and try again."
      exit 1
    fi
    
    # Check if docker-compose is installed
    if ! command -v docker-compose &> /dev/null; then
      echo "❌ docker-compose is not installed. Please install docker-compose and try again."
      exit 1
    fi
    
    # Build and start Docker containers
    echo "🏗️ Building and starting Docker containers..."
    docker-compose up -d --build
    
    echo "🔍 Checking container health..."
    sleep 10
    if docker-compose ps | grep -q "Up"; then
      echo "✅ Containers are running."
    else
      echo "❌ Containers failed to start. Check logs with 'docker-compose logs'."
      exit 1
    fi
    ;;
    
  *)
    echo "❌ Invalid choice. Exiting."
    exit 1
    ;;
esac

echo "✅ Deployment completed successfully!"