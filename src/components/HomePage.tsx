// src/components/HomePage.tsx

import React from 'react';
import { BookOpen, Target, Users, TrendingUp } from 'lucide-react';
import type { Roadmap } from '../types';

interface HomePageProps {
  darkMode: boolean;
  roadmaps: Roadmap[];
  onSelectRoadmap: (id: string) => void;
  getProgressStats: (roadmapId: string) => { total: number; completed: number; percentage: number };
}

export const HomePage: React.FC<HomePageProps> = ({ darkMode, roadmaps, onSelectRoadmap, getProgressStats }) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 opacity-90"></div>
        <div className="relative px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Master GIS Technologies</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
              Interactive learning roadmaps for Geographic Information Systems, Remote Sensing, and Photogrammetry. Track your progress and build expertise with structured, comprehensive curricula.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">Get Started</button>
              <button className="text-lg font-semibold leading-6 text-white hover:text-gray-200 transition-colors">Learn more <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center"><div className="flex justify-center mb-4"><BookOpen className="h-12 w-12 text-blue-500" /></div><div className="text-3xl font-bold text-blue-500">50+</div><div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Learning Topics</div></div>
            <div className="text-center"><div className="flex justify-center mb-4"><Target className="h-12 w-12 text-purple-500" /></div><div className="text-3xl font-bold text-purple-500">3</div><div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Specialized Tracks</div></div>
            <div className="text-center"><div className="flex justify-center mb-4"><Users className="h-12 w-12 text-cyan-500" /></div><div className="text-3xl font-bold text-cyan-500">10K+</div><div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Learners</div></div>
            <div className="text-center"><div className="flex justify-center mb-4"><TrendingUp className="h-12 w-12 text-green-500" /></div><div className="text-3xl font-bold text-green-500">95%</div><div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success Rate</div></div>
          </div>
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Learning Path</h2>
          <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Structured roadmaps to guide your GIS learning journey</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => {
            const stats = getProgressStats(roadmap.id);
            return (
              <div key={roadmap.id} className={`group relative rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-2xl'}`} onClick={() => onSelectRoadmap(roadmap.id)}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${roadmap.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{roadmap.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{roadmap.title}</h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{roadmap.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-sm font-medium">Progress</span><span className="text-sm font-medium">{stats.percentage}%</span></div>
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : ''}`}><div className={`h-2 rounded-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`} style={{ width: `${stats.percentage}%` }}></div></div>
                    <div className="flex justify-between text-xs text-gray-500"><span>{stats.completed} completed</span><span>{stats.total} total topics</span></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Coming Soon Cards */}
          <div className={`group relative rounded-2xl p-8 shadow-xl opacity-75 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}><div className="relative"><div className="text-4xl mb-4">🗺️</div><h3 className="text-2xl font-bold mb-3">GIS Fundamentals</h3><p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Core GIS concepts, spatial analysis, and cartography principles</p><div className="text-sm text-yellow-500 font-medium">Coming Soon</div></div></div>
          <div className={`group relative rounded-2xl p-8 shadow-xl opacity-75 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}><div className="relative"><div className="text-4xl mb-4">🌍</div><h3 className="text-2xl font-bold mb-3">Web GIS</h3><p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Online mapping, web services, and interactive GIS applications</p><div className="text-sm text-yellow-500 font-medium">Coming Soon</div></div></div>
          <div className={`group relative rounded-2xl p-8 shadow-xl opacity-75 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}><div className="relative"><div className="text-4xl mb-4">📊</div><h3 className="text-2xl font-bold mb-3">Spatial Data Science</h3><p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Python, R, machine learning, and advanced spatial analytics</p><div className="text-sm text-yellow-500 font-medium">Coming Soon</div></div></div>
        </div>
      </div>
    </div>
  );
};