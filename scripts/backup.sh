#!/bin/bash

# Backup Script for Dashboard-Z
# This script creates a backup of the application data

# Configuration
BACKUP_DIR="${1:-./backups}"
APP_DIR="$(pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILENAME="dashboard-z_backup_${TIMESTAMP}.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup of Dashboard-Z..."

# Files to include in the backup
BACKUP_FILES=(
  "data"
  ".env.local"
  "package.json"
  "package-lock.json"
  "next.config.js"
  "tailwind.config.js"
)

# Create a temporary directory for the backup
TEMP_DIR=$(mktemp -d)
mkdir -p "$TEMP_DIR/backup"

# Copy files to the temporary directory
for file in "${BACKUP_FILES[@]}"; do
  if [ -e "$APP_DIR/$file" ]; then
    echo "📄 Adding $file to backup..."
    cp -r "$APP_DIR/$file" "$TEMP_DIR/backup/"
  else
    echo "⚠️ Warning: $file not found, skipping..."
  fi
done

# Create the backup archive
echo "🔒 Creating backup archive..."
tar -czf "$BACKUP_DIR/$BACKUP_FILENAME" -C "$TEMP_DIR" backup

# Clean up the temporary directory
rm -rf "$TEMP_DIR"

# Check if the backup was successful
if [ -f "$BACKUP_DIR/$BACKUP_FILENAME" ]; then
  BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILENAME" | cut -f1)
  echo "✅ Backup completed successfully!"
  echo "📂 Backup saved to: $BACKUP_DIR/$BACKUP_FILENAME"
  echo "📊 Backup size: $BACKUP_SIZE"
else
  echo "❌ Backup failed!"
  exit 1
fi

# List recent backups
echo "📋 Recent backups:"
ls -lh "$BACKUP_DIR" | grep "dashboard-z_backup_" | sort -r | head -n 5

exit 0 