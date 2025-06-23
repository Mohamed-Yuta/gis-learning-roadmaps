// src/components/ResourceCard.tsx

import React from 'react';
import { Youtube, FileText, Book, Code, Sparkles, CheckSquare, ArrowUpRight } from 'lucide-react';
import type { Resource, ResourceType } from '../types';

interface ResourceCardProps {
  resource: Resource;
  darkMode: boolean;
}

// This object maps a resource type string to a specific icon component
const iconMap: Record<ResourceType, React.ReactNode> = {
  'Video': <Youtube className="w-5 h-5 text-red-500" />,
  'Article': <FileText className="w-5 h-5 text-blue-500" />,
  'Book': <Book className="w-5 h-5 text-yellow-600" />,
  'Official Docs': <Code className="w-5 h-5 text-green-500" />,
  'Interactive Tutorial': <Sparkles className="w-5 h-5 text-purple-500" />,
  'Project/Challenge': <CheckSquare className="w-5 h-5 text-indigo-500" />,
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, darkMode }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg border transition-all duration-200 group ${
        darkMode 
          ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-blue-500' 
          : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-blue-500 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {iconMap[resource.type]}
          <h4 className="font-semibold text-base">{resource.title}</h4>
        </div>
        <ArrowUpRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${darkMode ? 'group-hover:text-white' : 'group-hover:text-gray-900'}`} />
      </div>
      
      {resource.description && (
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {resource.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-3 text-xs">
        <span className={`px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
          {resource.author || resource.type}
        </span>
        <span className={`font-medium ${resource.isFree ? 'text-green-500' : 'text-yellow-500'}`}>
          {resource.isFree ? 'Free' : 'Paid'}
        </span>
      </div>
    </a>
  );
};