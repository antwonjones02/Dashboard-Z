import React, { useState, useRef } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { downloadCSV, generateCSVTemplate, parseCSV, validateCSVData } from '../utils/csvUtils';

interface CSVActionsProps {
  entityType: 'projects' | 'tasks' | 'stakeholders' | 'meetings';
  headers: string[];
  onImport: (data: Record<string, string>[]) => void;
  className?: string;
}

const CSVActions: React.FC<CSVActionsProps> = ({ 
  entityType, 
  headers, 
  onImport,
  className = ''
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle template download
  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate(headers);
    downloadCSV(`${entityType}_template.csv`, template);
  };

  // Handle file selection for import
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = parseCSV(content, headers);
        
        // Validate the data
        const validation = validateCSVData(data, headers);
        
        if (!validation.valid) {
          setImportError(validation.errors.join('\n'));
          setIsImporting(false);
          return;
        }
        
        // Call the onImport callback with the parsed data
        onImport(data);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        setImportError('Failed to parse CSV file. Please check the format and try again.');
      } finally {
        setIsImporting(false);
      }
    };
    
    reader.onerror = () => {
      setImportError('Error reading file');
      setIsImporting(false);
    };
    
    reader.readAsText(file);
  };

  // Trigger file input click
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#003366] hover:bg-[#041C2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7D9BC1]"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Download Template
        </button>
        
        <button
          type="button"
          onClick={handleImportClick}
          disabled={isImporting}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#003366] hover:bg-[#041C2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7D9BC1] disabled:opacity-50"
        >
          <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
          {isImporting ? 'Importing...' : 'Import CSV'}
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
        />
      </div>
      
      {importError && (
        <div className="text-sm text-[#C01933] bg-red-50 p-2 rounded-md">
          <p className="font-medium">Import Error:</p>
          <pre className="whitespace-pre-wrap text-xs mt-1">{importError}</pre>
        </div>
      )}
    </div>
  );
};

export default CSVActions;