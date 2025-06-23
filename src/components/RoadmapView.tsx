// src/components/RoadmapView.tsx

import React, { useRef } from 'react';
import { Search, Filter, Moon, Sun, ArrowLeft, CheckCircle, Circle, Clock, Eye } from 'lucide-react';
import type { Roadmap, RoadmapNode, Progress, ProgressStatus } from '../types';
import { roadmapsData } from '../data'; // Use direct data import or pass as prop
import { NodeModal } from './NodeModal';

interface RoadmapViewProps {
  roadmapId: string;
  progress: { [roadmapId: string]: Progress };
  darkMode: boolean;
  searchTerm: string;
  selectedNode: RoadmapNode | null;
  zoomLevel: number;
  panOffset: { x: number, y: number };
  onGoHome: () => void;
  onSetDarkMode: (value: boolean) => void;
  onSetSearchTerm: (term: string) => void;
  onSetSelectedNode: (node: RoadmapNode | null) => void;
  onSetZoomLevel: (level: number) => void;
  onSetPanOffset: (offset: { x: number, y: number }) => void;
  onUpdateProgress: (roadmapId: string, nodeId: string, status: ProgressStatus) => void;
  getProgressStats: (roadmapId: string) => { total: number; completed: number; learning: number; percentage: number };
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmapId, progress, darkMode, searchTerm, selectedNode, zoomLevel, panOffset,
  onGoHome, onSetDarkMode, onSetSearchTerm, onSetSelectedNode, onSetZoomLevel,
  onSetPanOffset, onUpdateProgress, getProgressStats
}) => {
  const roadmap = roadmapsData.find(r => r.id === roadmapId);
  const svgRef = useRef<SVGSVGElement>(null);

  if (!roadmap) return <div>Roadmap not found</div>;

  const stats = getProgressStats(roadmapId);
  const filteredNodes = roadmap.nodes.filter(node =>
    node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getNodeColor = (nodeId: string) => {
    const status = progress[roadmapId]?.[nodeId] || 'not-started';
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-600';
      case 'learning': return 'bg-yellow-500 border-yellow-600';
      case 'skipped': return 'bg-gray-400 border-gray-500';
      default: return darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300';
    }
  };

  const getNodeIcon = (nodeId: string) => {
    const status = progress[roadmapId]?.[nodeId] || 'not-started';
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-white" />;
      case 'learning': return <Clock className="w-4 h-4 text-white" />;
      case 'skipped': return <Eye className="w-4 h-4 text-white" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className={`sticky top-0 z-20 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onGoHome} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><ArrowLeft className="w-5 h-5" /></button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2"><span className="text-2xl">{roadmap.icon}</span>{roadmap.title} Roadmap</h1>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{roadmap.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right"><div className="text-sm font-medium">{stats.percentage}% Complete</div><div className="text-xs text-gray-500">{stats.completed}/{stats.total} topics</div></div>
                    <button onClick={() => onSetDarkMode(!darkMode)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                </div>
            </div>
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search topics..." value={searchTerm} onChange={(e) => onSetSearchTerm(e.target.value)} className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`} /></div></div>
                    <div className="flex items-center space-x-2"><button className={`px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}><Filter className="w-3 h-3 inline mr-1" />Filter</button></div>
                </div>
            </div>
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="px-6 py-3"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Overall Progress</span><span className="text-sm font-medium">{stats.percentage}%</span></div><div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : ''}`}><div className={`h-2 rounded-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`} style={{ width: `${stats.percentage}%` }}></div></div></div>
            </div>
        </div>

        <div className="flex-1 p-6">
            <div className="relative overflow-hidden rounded-lg border" style={{ height: 'calc(100vh - 250px)' }}>
                <svg ref={svgRef} className={`w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`} viewBox={`${-panOffset.x} ${-panOffset.y} ${1200 / zoomLevel} ${800 / zoomLevel}`}>
                    <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={darkMode ? '#4B5563' : '#D1D5DB'} /></marker></defs>
                    {roadmap.connections.map((connection, index) => {
                        const fromNode = roadmap.nodes.find(n => n.id === connection.from);
                        const toNode = roadmap.nodes.find(n => n.id === connection.to);
                        if (!fromNode || !toNode) return null;
                        return <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke={darkMode ? '#4B5563' : '#D1D5DB'} strokeWidth="2" markerEnd="url(#arrowhead)" />;
                    })}
                    {(searchTerm ? filteredNodes : roadmap.nodes).map((node) => (
                        <g key={node.id} onClick={() => onSetSelectedNode(node)}>
                            <rect x={node.x - 80} y={node.y - 30} width="160" height="60" rx="12" className={`cursor-pointer transition-all duration-200 ${getNodeColor(node.id)} hover:shadow-lg`} />
                            <text x={node.x} y={node.y - 5} textAnchor="middle" className="text-sm font-medium pointer-events-none" fill={progress[roadmapId]?.[node.id] === 'not-started' ? (darkMode ? '#9CA3AF' : '#374151') : 'white'}>{node.title.length > 18 ? node.title.substring(0, 18) + '...' : node.title}</text>
                            <text x={node.x} y={node.y + 10} textAnchor="middle" className="text-xs pointer-events-none" fill={progress[roadmapId]?.[node.id] === 'not-started' ? (darkMode ? '#6B7280' : '#6B7280') : 'rgba(255,255,255,0.8)'}>{node.difficulty}</text>
                            <g transform={`translate(${node.x - 75}, ${node.y - 25})`}>{getNodeIcon(node.id)}</g>
                        </g>
                    ))}
                </svg>

                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button onClick={() => onSetZoomLevel(Math.min(zoomLevel * 1.2, 3))} className={`p-2 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'}`}>+</button>
                    <button onClick={() => onSetZoomLevel(Math.max(zoomLevel / 1.2, 0.5))} className={`p-2 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'}`}>-</button>
                    <button onClick={() => { onSetZoomLevel(1); onSetPanOffset({ x: 0, y: 0 }); }} className={`p-2 rounded-lg shadow-lg transition-colors text-xs ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'}`}>Reset</button>
                </div>

                <div className="absolute bottom-4 left-4"><div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}><h4 className="font-semibold mb-3 text-sm">Progress Legend</h4><div className="space-y-2 text-xs"><div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-white" /></div><span>Completed</span></div><div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-yellow-500 flex items-center justify-center"><Clock className="w-3 h-3 text-white" /></div><span>Learning</span></div><div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-gray-400 flex items-center justify-center"><Eye className="w-3 h-3 text-white" /></div><span>Skipped</span></div><div className="flex items-center space-x-2"><div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}><Circle className="w-3 h-3 text-gray-400" /></div><span>Not Started</span></div></div></div></div>
            </div>
        </div>

        {selectedNode && (
            <NodeModal
                node={selectedNode}
                roadmap={roadmap}
                progress={progress[roadmapId]}
                darkMode={darkMode}
                onClose={() => onSetSelectedNode(null)}
                onUpdateProgress={onUpdateProgress}
            />
        )}
    </div>
  );
};