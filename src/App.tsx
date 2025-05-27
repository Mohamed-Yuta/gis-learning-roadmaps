import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Moon, Sun, Home, CheckCircle, Circle, Clock, ArrowLeft, Zap, Target, BookOpen, Users, TrendingUp, Eye } from 'lucide-react';
import './index.css';
// Types
interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
  resources: string[];
  estimatedTime: string;
  x: number;
  y: number;
}

interface RoadmapConnection {
  from: string;
  to: string;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  nodes: RoadmapNode[];
  connections: RoadmapConnection[];
}

type ProgressStatus = 'not-started' | 'learning' | 'completed' | 'skipped';

interface Progress {
  [nodeId: string]: ProgressStatus;
}

// Sample Data
const roadmapsData: Roadmap[] = [
  {
    id: 'remote-sensing',
    title: 'Remote Sensing',
    description: 'Master satellite imagery analysis, earth observation, and spatial data interpretation',
    icon: '🛰️',
    color: 'from-blue-500 to-cyan-500',
    nodes: [
      {
        id: 'rs-fundamentals',
        title: 'Fundamentals of Remote Sensing',
        description: 'Learn the basic principles, history, and applications of remote sensing technology',
        category: 'Foundation',
        difficulty: 'Beginner',
        resources: ['Introduction to Remote Sensing', 'Basic Concepts Guide'],
        estimatedTime: '2 weeks',
        x: 400,
        y: 100
      },
      {
        id: 'electromagnetic-spectrum',
        title: 'Electromagnetic Spectrum',
        description: 'Understand wavelengths, spectral bands, and their applications in earth observation',
        category: 'Theory',
        difficulty: 'Beginner',
        prerequisites: ['rs-fundamentals'],
        resources: ['Spectral Signatures Guide', 'EM Spectrum Tutorial'],
        estimatedTime: '1 week',
        x: 200,
        y: 200
      },
      {
        id: 'satellite-systems',
        title: 'Satellite Systems',
        description: 'Explore different satellite platforms, sensors, and their characteristics',
        category: 'Technology',
        difficulty: 'Intermediate',
        prerequisites: ['electromagnetic-spectrum'],
        resources: ['Satellite Database', 'Sensor Comparison Guide'],
        estimatedTime: '3 weeks',
        x: 600,
        y: 200
      },
      {
        id: 'image-processing',
        title: 'Image Processing',
        description: 'Master preprocessing, enhancement, and correction techniques',
        category: 'Technical',
        difficulty: 'Intermediate',
        prerequisites: ['satellite-systems'],
        resources: ['ERDAS Tutorial', 'ENVI Guide'],
        estimatedTime: '4 weeks',
        x: 400,
        y: 300
      },
      {
        id: 'classification',
        title: 'Classification Techniques',
        description: 'Learn supervised and unsupervised classification methods',
        category: 'Analysis',
        difficulty: 'Advanced',
        prerequisites: ['image-processing'],
        resources: ['Machine Learning in RS', 'Classification Algorithms'],
        estimatedTime: '5 weeks',
        x: 200,
        y: 400
      },
      {
        id: 'change-detection',
        title: 'Change Detection',
        description: 'Analyze temporal changes in land cover and land use',
        category: 'Analysis',
        difficulty: 'Advanced',
        prerequisites: ['classification'],
        resources: ['Change Detection Methods', 'Temporal Analysis Guide'],
        estimatedTime: '3 weeks',
        x: 600,
        y: 400
      },
      {
        id: 'applications',
        title: 'Applications',
        description: 'Apply remote sensing in agriculture, forestry, and urban planning',
        category: 'Application',
        difficulty: 'Advanced',
        prerequisites: ['change-detection'],
        resources: ['Case Studies', 'Industry Applications'],
        estimatedTime: '4 weeks',
        x: 400,
        y: 500
      }
    ],
    connections: [
      { from: 'rs-fundamentals', to: 'electromagnetic-spectrum' },
      { from: 'rs-fundamentals', to: 'satellite-systems' },
      { from: 'electromagnetic-spectrum', to: 'satellite-systems' },
      { from: 'satellite-systems', to: 'image-processing' },
      { from: 'image-processing', to: 'classification' },
      { from: 'image-processing', to: 'change-detection' },
      { from: 'classification', to: 'change-detection' },
      { from: 'classification', to: 'applications' },
      { from: 'change-detection', to: 'applications' }
    ]
  },
  {
    id: 'photogrammetry',
    title: 'Photogrammetry',
    description: 'Learn 3D reconstruction, point cloud processing, and aerial surveying techniques',
    icon: '📸',
    color: 'from-purple-500 to-pink-500',
    nodes: [
      {
        id: 'photo-principles',
        title: 'Photogrammetry Principles',
        description: 'Understand the mathematical foundations and geometric principles',
        category: 'Foundation',
        difficulty: 'Beginner',
        resources: ['Photogrammetry Handbook', 'Geometry Basics'],
        estimatedTime: '2 weeks',
        x: 400,
        y: 100
      },
      {
        id: 'camera-systems',
        title: 'Camera Systems',
        description: 'Learn about different camera types, calibration, and specifications',
        category: 'Technology',
        difficulty: 'Beginner',
        prerequisites: ['photo-principles'],
        resources: ['Camera Calibration Guide', 'Sensor Specifications'],
        estimatedTime: '2 weeks',
        x: 200,
        y: 200
      },
      {
        id: 'flight-planning',
        title: 'Flight Planning',
        description: 'Plan aerial missions, overlap calculations, and ground control',
        category: 'Planning',
        difficulty: 'Intermediate',
        prerequisites: ['camera-systems'],
        resources: ['Mission Planning Software', 'Flight Guidelines'],
        estimatedTime: '3 weeks',
        x: 600,
        y: 200
      },
      {
        id: 'image-acquisition',
        title: 'Image Acquisition',
        description: 'Execute aerial photography missions and quality control',
        category: 'Field Work',
        difficulty: 'Intermediate',
        prerequisites: ['flight-planning'],
        resources: ['Field Guide', 'Quality Assessment'],
        estimatedTime: '2 weeks',
        x: 400,
        y: 300
      },
      {
        id: 'bundle-adjustment',
        title: 'Bundle Adjustment',
        description: 'Optimize camera positions and orientations simultaneously',
        category: 'Processing',
        difficulty: 'Advanced',
        prerequisites: ['image-acquisition'],
        resources: ['Bundle Adjustment Theory', 'Software Tutorials'],
        estimatedTime: '4 weeks',
        x: 200,
        y: 400
      },
      {
        id: 'dense-matching',
        title: 'Dense Matching',
        description: 'Generate dense point clouds from stereo images',
        category: 'Processing',
        difficulty: 'Advanced',
        prerequisites: ['bundle-adjustment'],
        resources: ['Stereo Matching Algorithms', 'Point Cloud Generation'],
        estimatedTime: '3 weeks',
        x: 600,
        y: 400
      },
      {
        id: 'point-clouds',
        title: 'Point Cloud Processing',
        description: 'Clean, filter, and process 3D point cloud data',
        category: 'Analysis',
        difficulty: 'Advanced',
        prerequisites: ['dense-matching'],
        resources: ['CloudCompare Tutorial', 'Point Cloud Library'],
        estimatedTime: '3 weeks',
        x: 300,
        y: 500
      },
      {
        id: '3d-modeling',
        title: '3D Modeling',
        description: 'Create textured 3D models and orthomosaics',
        category: 'Output',
        difficulty: 'Advanced',
        prerequisites: ['point-clouds'],
        resources: ['3D Reconstruction Guide', 'Texturing Techniques'],
        estimatedTime: '4 weeks',
        x: 500,
        y: 500
      },
      {
        id: 'photo-applications',
        title: 'Applications',
        description: 'Apply photogrammetry in surveying, mapping, and documentation',
        category: 'Application',
        difficulty: 'Advanced',
        prerequisites: ['3d-modeling'],
        resources: ['Industry Case Studies', 'Professional Workflows'],
        estimatedTime: '3 weeks',
        x: 400,
        y: 600
      }
    ],
    connections: [
      { from: 'photo-principles', to: 'camera-systems' },
      { from: 'photo-principles', to: 'flight-planning' },
      { from: 'camera-systems', to: 'flight-planning' },
      { from: 'flight-planning', to: 'image-acquisition' },
      { from: 'image-acquisition', to: 'bundle-adjustment' },
      { from: 'image-acquisition', to: 'dense-matching' },
      { from: 'bundle-adjustment', to: 'dense-matching' },
      { from: 'bundle-adjustment', to: 'point-clouds' },
      { from: 'dense-matching', to: 'point-clouds' },
      { from: 'dense-matching', to: '3d-modeling' },
      { from: 'point-clouds', to: '3d-modeling' },
      { from: 'point-clouds', to: 'photo-applications' },
      { from: '3d-modeling', to: 'photo-applications' }
    ]
  }
];

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | string>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState<{ [roadmapId: string]: Progress }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

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

  // Home Page Component
  const HomePage: React.FC = () => {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 opacity-90"></div>
          <div className="relative px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Master GIS Technologies
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
                Interactive learning roadmaps for Geographic Information Systems, Remote Sensing, and Photogrammetry. 
                Track your progress and build expertise with structured, comprehensive curricula.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
                <button className="text-lg font-semibold leading-6 text-white hover:text-gray-200 transition-colors">
                  Learn more <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <BookOpen className="h-12 w-12 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-blue-500">50+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Learning Topics</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Target className="h-12 w-12 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-purple-500">3</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Specialized Tracks</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-cyan-500" />
                </div>
                <div className="text-3xl font-bold text-cyan-500">10K+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Learners</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-500">95%</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmaps Grid */}
        <div className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Learning Path</h2>
            <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Structured roadmaps to guide your GIS learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {roadmapsData.map((roadmap) => {
              const stats = getProgressStats(roadmap.id);
              return (
                <div 
                  key={roadmap.id}
                  className={`group relative rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-2xl'
                  }`}
                  onClick={() => setCurrentView(roadmap.id)}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${roadmap.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className="text-4xl mb-4">{roadmap.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{roadmap.title}</h3>
                    <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {roadmap.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{stats.percentage}%</span>
                      </div>
                      <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : ''}`}>
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`}
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{stats.completed} completed</span>
                        <span>{stats.total} total topics</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Coming Soon Cards */}
            <div className={`group relative rounded-2xl p-8 shadow-xl opacity-75 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="relative">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold mb-3">GIS Fundamentals</h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Core GIS concepts, spatial analysis, and cartography principles
                </p>
                <div className="text-sm text-yellow-500 font-medium">Coming Soon</div>
              </div>
            </div>

            <div className={`group relative rounded-2xl p-8 shadow-xl opacity-75 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="relative">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold mb-3">Web GIS</h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Online mapping, web services, and interactive GIS applications
                </p>
                <div className="text-sm text-yellow-500 font-medium">Coming Soon</div>
              </div>
            </div>

            <div className={`group relative rounded-2xl p-8 shadow-xl opacity-75 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="relative">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-3">Spatial Data Science</h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Python, R, machine learning, and advanced spatial analytics
                </p>
                <div className="text-sm text-yellow-500 font-medium">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Roadmap View Component
  const RoadmapView: React.FC<{ roadmapId: string }> = ({ roadmapId }) => {
    const roadmap = roadmapsData.find(r => r.id === roadmapId);
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
        {/* Header */}
        <div className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-2xl">{roadmap.icon}</span>
                    {roadmap.title} Roadmap
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {roadmap.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{stats.percentage}% Complete</div>
                  <div className="text-xs text-gray-500">{stats.completed}/{stats.total} topics</div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className={`px-3 py-1 text-xs rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Filter className="w-3 h-3 inline mr-1" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{stats.percentage}%</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : ''}`}>
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`}
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Roadmap Visualization */}
        <div className="flex-1 p-6">
          <div className="relative overflow-hidden rounded-lg border" style={{ height: '800px' }}>
            <svg
              ref={svgRef}
              className={`w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              viewBox={`${-panOffset.x} ${-panOffset.y} ${800 / zoomLevel} ${600 / zoomLevel}`}
            >
              {/* Connection lines */}
              {roadmap.connections.map((connection, index) => {
                const fromNode = roadmap.nodes.find(n => n.id === connection.from);
                const toNode = roadmap.nodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;

                return (
                  <line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={darkMode ? '#4B5563' : '#D1D5DB'}
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}

              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={darkMode ? '#4B5563' : '#D1D5DB'}
                  />
                </marker>
              </defs>

              {/* Nodes */}
              {(searchTerm ? filteredNodes : roadmap.nodes).map((node) => (
                <g key={node.id}>
                  <rect
                    x={node.x - 80}
                    y={node.y - 30}
                    width="160"
                    height="60"
                    rx="12"
                    className={`cursor-pointer transition-all duration-200 ${getNodeColor(node.id)} hover:shadow-lg`}
                    onClick={() => setSelectedNode(node)}
                  />
                  <text
                    x={node.x}
                    y={node.y - 5}
                    textAnchor="middle"
                    className="text-sm font-medium pointer-events-none"
                    fill={progress[roadmapId]?.[node.id] === 'not-started' ? (darkMode ? '#9CA3AF' : '#374151') : 'white'}
                  >
                    {node.title.length > 18 ? node.title.substring(0, 18) + '...' : node.title}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 10}
                    textAnchor="middle"
                    className="text-xs pointer-events-none"
                    fill={progress[roadmapId]?.[node.id] === 'not-started' ? (darkMode ? '#6B7280' : '#6B7280') : 'rgba(255,255,255,0.8)'}
                  >
                    {node.difficulty}
                  </text>
                  <g transform={`translate(${node.x - 75}, ${node.y - 25})`}>
                    {getNodeIcon(node.id)}
                  </g>
                </g>
              ))}
            </svg>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button
                onClick={() => setZoomLevel(Math.min(zoomLevel * 1.2, 3))}
                className={`p-2 rounded-lg shadow-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'
                }`}
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel(Math.max(zoomLevel / 1.2, 0.5))}
                className={`p-2 rounded-lg shadow-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'
                }`}
              >
                -
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className={`p-2 rounded-lg shadow-lg transition-colors text-xs ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'
                }`}
              >
                Reset
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4">
              <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h4 className="font-semibold mb-3 text-sm">Progress Legend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-yellow-500 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span>Learning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-gray-400 flex items-center justify-center">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                    <span>Skipped</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      <Circle className="w-3 h-3 text-gray-400" />
                    </div>
                    <span>Not Started</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Detail Modal */}
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedNode.title}</h2>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full ${
                        selectedNode.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        selectedNode.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedNode.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedNode.category}
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ⏱️ {selectedNode.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedNode.description}
                    </p>
                  </div>

                  {selectedNode.prerequisites && selectedNode.prerequisites.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Prerequisites</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.prerequisites.map((prereq) => {
                          const prereqNode = roadmap.nodes.find(n => n.id === prereq);
                          return (
                            <span
                              key={prereq}
                              className={`px-3 py-1 rounded-full text-sm ${
                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {prereqNode?.title || prereq}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2">Learning Resources</h3>
                    <ul className="space-y-1">
                      {selectedNode.resources.map((resource, index) => (
                        <li key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          • {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress Actions */}
                  <div>
                    <h3 className="font-semibold mb-3">Mark Progress</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateProgress(roadmapId, selectedNode.id, 'learning')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          progress[roadmapId]?.[selectedNode.id] === 'learning'
                            ? 'bg-yellow-500 text-white'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-yellow-500 hover:text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-yellow-500 hover:text-white'
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-1" />
                        Learning
                      </button>
                      <button
                        onClick={() => updateProgress(roadmapId, selectedNode.id, 'completed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          progress[roadmapId]?.[selectedNode.id] === 'completed'
                            ? 'bg-green-500 text-white'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Completed
                      </button>
                      <button
                        onClick={() => updateProgress(roadmapId, selectedNode.id, 'skipped')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          progress[roadmapId]?.[selectedNode.id] === 'skipped'
                            ? 'bg-gray-500 text-white'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-500 hover:text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-500 hover:text-white'
                        }`}
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Skip
                      </button>
                      <button
                        onClick={() => updateProgress(roadmapId, selectedNode.id, 'not-started')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          progress[roadmapId]?.[selectedNode.id] === 'not-started'
                            ? darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800'
                        }`}
                      >
                        <Circle className="w-4 h-4 inline mr-1" />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Main render
  return (
    <div className="App">
      {currentView === 'home' ? (
        <HomePage />
      ) : (
        <RoadmapView roadmapId={currentView} />
      )}
    </div>
  );
};

export default App;