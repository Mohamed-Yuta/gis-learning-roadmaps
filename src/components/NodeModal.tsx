// src/components/NodeModal.tsx

import React from 'react';
import { Clock, CheckCircle, Eye, Circle } from 'lucide-react';
import type { Roadmap, RoadmapNode, Progress, ProgressStatus } from '../types';

interface NodeModalProps {
  node: RoadmapNode;
  roadmap: Roadmap;
  progress: Progress;
  darkMode: boolean;
  onClose: () => void;
  onUpdateProgress: (roadmapId: string, nodeId: string, status: ProgressStatus) => void;
}

export const NodeModal: React.FC<NodeModalProps> = ({ node, roadmap, progress, darkMode, onClose, onUpdateProgress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{node.title}</h2>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`px-2 py-1 rounded-full ${node.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : node.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{node.difficulty}</span>
                <span className={`px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{node.category}</span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>⏱️ {node.estimatedTime}</span>
              </div>
            </div>
            <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>✕</button>
          </div>

          {/* Modal Content */}
          <div className="space-y-6">
            <div><h3 className="font-semibold mb-2">Description</h3><p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{node.description}</p></div>
            {node.prerequisites && node.prerequisites.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {node.prerequisites.map((prereq) => {
                    const prereqNode = roadmap.nodes.find(n => n.id === prereq);
                    return <span key={prereq} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{prereqNode?.title || prereq}</span>;
                  })}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-semibold mb-2">Learning Resources</h3>
              <ul className="space-y-1">{node.resources.map((resource, index) => <li key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>• {resource}</li>)}</ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Mark Progress</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'learning')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'learning' ? 'bg-yellow-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-yellow-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-yellow-500 hover:text-white'}`}><Clock className="w-4 h-4 inline mr-1" /> Learning</button>
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'completed')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'completed' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white'}`}><CheckCircle className="w-4 h-4 inline mr-1" /> Completed</button>
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'skipped')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'skipped' ? 'bg-gray-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-500 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-500 hover:text-white'}`}><Eye className="w-4 h-4 inline mr-1" /> Skip</button>
                <button onClick={() => onUpdateProgress(roadmap.id, node.id, 'not-started')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${progress[node.id] === 'not-started' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800') : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800'}`}><Circle className="w-4 h-4 inline mr-1" /> Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};