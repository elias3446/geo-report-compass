import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Status {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface StatusContextType {
  statuses: Status[];
  getStatusById: (id: string) => Status | undefined;
  getStatusColor: (id: string) => string;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

const initialStatuses: Status[] = [
  { 
    id: "Open", 
    name: "Open", 
    description: "Report is created and pending attention",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  { 
    id: "In Progress", 
    name: "In Progress", 
    description: "Report is currently being worked on",
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  { 
    id: "Resolved", 
    name: "Resolved", 
    description: "The reported issue has been resolved",
    color: "bg-green-100 text-green-800 border-green-200"
  }
];

export const StatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [statuses] = useState<Status[]>(initialStatuses);

  const getStatusById = (id: string) => {
    return statuses.find(status => status.id === id);
  };

  const getStatusColor = (id: string) => {
    const status = getStatusById(id);
    return status?.color || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <StatusContext.Provider
      value={{
        statuses,
        getStatusById,
        getStatusColor
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatuses = () => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatuses must be used within a StatusProvider');
  }
  return context;
}; 