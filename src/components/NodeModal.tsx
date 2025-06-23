// src/components/NodeModal.tsx

import React from 'react';
import { Clock, CheckCircle, Eye, Circle } from 'lucide-react';
// This import will now work because you've updated types.ts
import type { Roadmap, RoadmapNode, Progress, ProgressStatus, Resource, ResourceType } from '../types';
// This import will now work because you've created ResourceCard.tsx
import { ResourceCard } from './ResourceCard';
// This import is needed to search for prerequisites across all roadmaps
import { roadmapsData } from '../data';

interface NodeModalProps {
  node: RoadmapNode;
  roadmap: Roadmap;
  progress: Progress;
  darkMode: boolean;
  onClose: () => void;
  onUpdateProgress: (roadmapId: string, nodeId: string, status: ProgressStatus) => void;
}

export const NodeModal: React.FC<NodeModalProps> = ({ node, roadmap, progress, darkMode, onClose, onUpdateProgress }) => {

  // Logic to group resources by their type
  const groupedResources = node.resources.reduce((acc, resource) => {
    (acc[resource.type] = acc[resource.type] || []).push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  // Defines the order in which resource groups should appear
  const groupOrder: ResourceType[] = ['Project/Challenge', 'Interactive Tutorial', 'Video', 'Article', 'Book', 'Official Docs'];

  // Helper function to find a prerequisite node, even if it's in another roadmap
  const findPrerequisiteNode = (prereqId: string): RoadmapNode | undefined => {
    if (prereqId.includes('/')) {
      const [roadmapId, nodeId] = prereqId.split('/');
      const targetRoadmap = roadmapsData.find(r => r.id === roadmapId);
      return targetRoadmap?.nodes.find(n => n.id === nodeId);
    }
    return roadmap.nodes.find(n => n.id === prereqId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} scrollbar-thin ${darkMode ? 'scrollbar-thumb-gray-600 scrollbar-track-gray-800' : 'scrollbar-thumb-gray-100'}`}>
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{node.title}</h2>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${node.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : node.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{node.difficulty}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{node.category}</span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>⏱️ {node.estimatedTime}</span>
              </div>
            </div>
            <button onClick={onClose} className={`p-2 rounded-full -mt-2 -mr-2 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>✕</button>
          </div>

          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2 text-base">Description</h3>
              <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{node.description}</p>
            </div>

            {/* Prerequisites */}
            {node.prerequisites && node.prerequisites.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-base">Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {node.prerequisites.map((prereqId) => {
                    const prereqNode = findPrerequisiteNode(prereqId);
                    return (
                      <span key={prereqId} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
                        {prereqNode?.title || prereqId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Learning Resources (The major update) */}
            <div>
              <h3 className="font-semibold mb-4 text-base">Learning Resources</h3>
              {node.resources.length > 0 ? (
                <div className="space-y-6">
                  {groupOrder.map(groupName => {
                    if (groupedResources[groupName]) {
                      return (
                        <div key={groupName}>
                          <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {groupName}s
                          </h4>
                          <div className="space-y-3">
                            {groupedResources[groupName].map((resource, index) => (
                              <ResourceCard key={index} resource={resource} darkMode={darkMode} />
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                <div className={`text-center p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No resources have been added for this topic yet.
                    </p>
                </div>
              )}
            </div>

            {/* Progress Actions */}
            <div>
              <h3 className="font-semibold mb-3 text-base">Mark Progress</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'learning')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'learning' ? 'bg-yellow-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-yellow-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-yellow-500 hover:text-white'}`}><Clock className="w-4 h-4 inline -mt-0.5 mr-2" />Learning</button>
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'completed')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'completed' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white'}`}><CheckCircle className="w-4 h-4 inline -mt-0.5 mr-2" />Completed</button>
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'skipped')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'skipped' ? 'bg-gray-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-500 hover:text-white'}`}><Eye className="w-4 h-4 inline -mt-0.5 mr-2" />Skip</button>
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'not-started')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'not-started' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800') : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800'}`}><Circle className="w-4 h-4 inline -mt-0.5 mr-2" />Reset</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};