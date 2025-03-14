#!/bin/bash

# Health Check Script for Dashboard-Z
# This script checks if the application is running correctly

# Configuration
APP_URL=${1:-"http://localhost:3000"}
TIMEOUT=10
MAX_RETRIES=3
SLEEP_BETWEEN_RETRIES=5

echo "🔍 Running health check for Dashboard-Z at $APP_URL"

# Function to check if the application is running
check_app() {
  echo "📡 Attempting to connect to $APP_URL..."
  
  # Try to connect to the application with a timeout
  response=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT $APP_URL)
  
  if [ "$response" -eq 200 ]; then
    echo "✅ Application is running! Response code: $response"
    return 0
  else
    echo "❌ Application is not responding correctly. Response code: $response"
    return 1
  fi
}

# Main health check logic with retries
retry_count=0
while [ $retry_count -lt $MAX_RETRIES ]; do
  if check_app; then
    exit 0
  else
    retry_count=$((retry_count + 1))
    
    if [ $retry_count -lt $MAX_RETRIES ]; then
      echo "🔄 Retrying in $SLEEP_BETWEEN_RETRIES seconds... (Attempt $retry_count of $MAX_RETRIES)"
      sleep $SLEEP_BETWEEN_RETRIES
    else
      echo "❌ Health check failed after $MAX_RETRIES attempts."
      exit 1
    fi
  fi
done 