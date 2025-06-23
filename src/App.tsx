// src/App.tsx

import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { RoadmapView } from './components/RoadmapView';
import { roadmapsData } from './data';
import type { Progress, ProgressStatus, RoadmapNode } from './types';
import './index.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | string>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState<{ [roadmapId: string]: Progress }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize progress for all roadmaps
    const initialProgress: { [roadmapId: string]: Progress } = {};
    roadmapsData.forEach(roadmap => {
      initialProgress[roadmap.id] = {};
      roadmap.nodes.forEach(node => {
        initialProgress[roadmap.id][node.id] = 'not-started';
      });
    });
    setProgress(initialProgress);
  }, []);

  const updateProgress = (roadmapId: string, nodeId: string, status: ProgressStatus) => {
    setProgress(prev => ({
      ...prev,
      [roadmapId]: {
        ...prev[roadmapId],
        [nodeId]: status
      }
    }));
  };

  const getProgressStats = (roadmapId: string) => {
    const roadmapProgress = progress[roadmapId] || {};
    const total = Object.keys(roadmapProgress).length;
    const completed = Object.values(roadmapProgress).filter(status => status === 'completed').length;
    const learning = Object.values(roadmapProgress).filter(status => status === 'learning').length;
    return { total, completed, learning, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  return (
    <div className="App">
      {currentView === 'home' ? (
        <HomePage
          darkMode={darkMode}
          roadmaps={roadmapsData}
          onSelectRoadmap={setCurrentView}
          getProgressStats={getProgressStats}
        />
      ) : (
        <RoadmapView
          roadmapId={currentView}
          progress={progress}
          darkMode={darkMode}
          searchTerm={searchTerm}
          selectedNode={selectedNode}
          zoomLevel={zoomLevel}
          panOffset={panOffset}
          onGoHome={() => setCurrentView('home')}
          onSetDarkMode={setDarkMode}
          onSetSearchTerm={setSearchTerm}
          onSetSelectedNode={setSelectedNode}
          onSetZoomLevel={setZoomLevel}
          onSetPanOffset={setPanOffset}
          onUpdateProgress={updateProgress}
          getProgressStats={getProgressStats}
        />
      )}
    </div>
  );
};

export default App;