#!/bin/bash

# Netlify Build Script for Dashboard-Z
# This script handles the build process specifically for Netlify deployment

echo "🚀 Starting Netlify build process for Dashboard-Z..."

# Install the Netlify Next.js plugin if not already installed
if ! npm list @netlify/plugin-nextjs --depth=0 >/dev/null 2>&1; then
  echo "📦 Installing @netlify/plugin-nextjs..."
  npm install -D @netlify/plugin-nextjs
fi

# Check if required environment variables are set
echo "🔍 Checking environment variables..."
REQUIRED_VARS=("NEXT_PUBLIC_APP_URL" "NEXT_PUBLIC_API_URL")
MISSING_VARS=0

for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "⚠️ Missing environment variable: $VAR"
    MISSING_VARS=$((MISSING_VARS+1))
  fi
done

if [ $MISSING_VARS -gt 0 ]; then
  echo "⚠️ Some environment variables are missing. Using default values for build."
fi

# Run linting
echo "🔍 Running linter..."
npm run lint || { echo "⚠️ Linting failed but continuing with build..."; }

# Build the application
echo "🏗️ Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build completed successfully!"
  
  # Create a _redirects file for Netlify if it doesn't exist
  if [ ! -f ".next/static/_redirects" ]; then
    echo "📝 Creating Netlify _redirects file..."
    mkdir -p .next/static
    echo "/* /index.html 200" > .next/static/_redirects
  fi
  
  echo "🎉 Dashboard-Z is ready for Netlify deployment!"
else
  echo "❌ Build failed. Check the logs for errors."
  exit 1
fi