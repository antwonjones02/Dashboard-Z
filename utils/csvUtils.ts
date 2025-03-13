/**
 * CSV Utility functions for template download and data import
 */

// Function to generate a CSV template string based on the provided headers
export const generateCSVTemplate = (headers: string[]): string => {
  return headers.join(',') + '\n';
};

// Function to download a CSV file with the given filename and content
export const downloadCSV = (filename: string, csvContent: string): void => {
  // Create a blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  
  // Append the link to the body
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to parse CSV data into an array of objects
export const parseCSV = (csvContent: string, headers: string[]): Record<string, string>[] => {
  // Split the CSV content into lines
  const lines = csvContent.split('\n');
  
  // Remove empty lines
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  
  // Skip the header line if it exists
  const dataLines = nonEmptyLines[0].includes(headers[0]) ? nonEmptyLines.slice(1) : nonEmptyLines;
  
  // Parse each line into an object
  return dataLines.map(line => {
    const values = line.split(',');
    const obj: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim() : '';
    });
    
    return obj;
  });
};

// Templates for different entity types
export const csvTemplates = {
  projects: ['Project Name', 'Description', 'Status', 'Start Date', 'End Date', 'Priority', 'Owner'],
  tasks: ['Task Name', 'Description', 'Status', 'Due Date', 'Priority', 'Assigned To', 'Project'],
  stakeholders: ['Name', 'Role', 'Organization', 'Email', 'Phone', 'Influence Level', 'Interest Level'],
  meetings: ['Meeting Title', 'Date', 'Time', 'Location', 'Organizer', 'Attendees', 'Agenda', 'Notes']
};

// Function to validate CSV data against expected headers
export const validateCSVData = (
  data: Record<string, string>[],
  requiredHeaders: string[]
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check if data is empty
  if (data.length === 0) {
    errors.push('CSV file contains no data');
    return { valid: false, errors };
  }
  
  // Check for required fields in each row
  data.forEach((row, index) => {
    requiredHeaders.forEach(header => {
      if (!row[header] || row[header].trim() === '') {
        errors.push(`Row ${index + 1}: Missing required field "${header}"`);
      }
    });
  });
  
  return { valid: errors.length === 0, errors };
};