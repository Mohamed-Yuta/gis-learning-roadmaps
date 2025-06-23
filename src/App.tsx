// src/App.tsx

import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { RoadmapView } from './components/RoadmapView';
import { roadmapsData } from './data';
import type { Progress, ProgressStatus, RoadmapNode } from './types';
import './index.css';
import { Analytics } from '@vercel/analytics/react'; // <-- 1. IMPORT ANALYTICS

// Define a key for localStorage to avoid typos
const LOCAL_STORAGE_KEY = 'gisRoadmapProgress';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | string>('home');
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize state from a function to read from localStorage just once.
  const [progress, setProgress] = useState<{ [roadmapId: string]: Progress }>(() => {
    try {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    } catch (error) {
      console.error("Failed to parse progress from localStorage", error);
    }
    // Return empty object if nothing is saved or there's an error
    return {};
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // This effect runs only once on mount to initialize or sync progress.
  useEffect(() => {
    setProgress(currentProgress => {
      let needsUpdate = false;
      const newProgress = { ...currentProgress };

      roadmapsData.forEach(roadmap => {
        if (!newProgress[roadmap.id]) {
          needsUpdate = true;
          newProgress[roadmap.id] = {};
          roadmap.nodes.forEach(node => {
            newProgress[roadmap.id][node.id] = 'not-started';
          });
        }
      });

      return needsUpdate ? newProgress : currentProgress;
    });
  }, []);

  // This effect runs whenever the 'progress' state changes, saving it to localStorage.
  useEffect(() => {
    // Only save to localStorage if progress is not an empty object
    if (Object.keys(progress).length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    }
  }, [progress]);

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
    const total = roadmapsData.find(r => r.id === roadmapId)?.nodes.length || 0;
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
      
      <Analytics /> {/* <-- 2. ADD THE COMPONENT HERE */}
    </div>
  );
};

export default App;