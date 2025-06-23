// src/data.ts

// src/data.ts
import type { Roadmap } from './types';

export const roadmapsData: Roadmap[] = [
  {
    id: 'remote-sensing',
    title: 'Remote Sensing',
    description: 'Master satellite imagery analysis, earth observation, and spatial data interpretation',
    icon: '🛰️',
    color: 'from-blue-500 to-cyan-500',
    nodes: [
      { id: 'rs-fundamentals', title: 'Fundamentals of Remote Sensing', description: 'Learn the basic principles, history, and applications of remote sensing technology', category: 'Foundation', difficulty: 'Beginner', resources: ['Introduction to Remote Sensing', 'Basic Concepts Guide'], estimatedTime: '2 weeks', x: 400, y: 100 },
      { id: 'electromagnetic-spectrum', title: 'Electromagnetic Spectrum', description: 'Understand wavelengths, spectral bands, and their applications in earth observation', category: 'Theory', difficulty: 'Beginner', prerequisites: ['rs-fundamentals'], resources: ['Spectral Signatures Guide', 'EM Spectrum Tutorial'], estimatedTime: '1 week', x: 200, y: 200 },
      { id: 'satellite-systems', title: 'Satellite Systems', description: 'Explore different satellite platforms, sensors, and their characteristics', category: 'Technology', difficulty: 'Intermediate', prerequisites: ['electromagnetic-spectrum'], resources: ['Satellite Database', 'Sensor Comparison Guide'], estimatedTime: '3 weeks', x: 600, y: 200 },
      { id: 'image-processing', title: 'Image Processing', description: 'Master preprocessing, enhancement, and correction techniques', category: 'Technical', difficulty: 'Intermediate', prerequisites: ['satellite-systems'], resources: ['ERDAS Tutorial', 'ENVI Guide'], estimatedTime: '4 weeks', x: 400, y: 300 },
      { id: 'classification', title: 'Classification Techniques', description: 'Learn supervised and unsupervised classification methods', category: 'Analysis', difficulty: 'Advanced', prerequisites: ['image-processing'], resources: ['Machine Learning in RS', 'Classification Algorithms'], estimatedTime: '5 weeks', x: 200, y: 400 },
      { id: 'change-detection', title: 'Change Detection', description: 'Analyze temporal changes in land cover and land use', category: 'Analysis', difficulty: 'Advanced', prerequisites: ['classification'], resources: ['Change Detection Methods', 'Temporal Analysis Guide'], estimatedTime: '3 weeks', x: 600, y: 400 },
      { id: 'applications', title: 'Applications', description: 'Apply remote sensing in agriculture, forestry, and urban planning', category: 'Application', difficulty: 'Advanced', prerequisites: ['change-detection'], resources: ['Case Studies', 'Industry Applications'], estimatedTime: '4 weeks', x: 400, y: 500 }
    ],
    connections: [
      { from: 'rs-fundamentals', to: 'electromagnetic-spectrum' }, { from: 'rs-fundamentals', to: 'satellite-systems' }, { from: 'electromagnetic-spectrum', to: 'satellite-systems' }, { from: 'satellite-systems', to: 'image-processing' }, { from: 'image-processing', to: 'classification' }, { from: 'image-processing', to: 'change-detection' }, { from: 'classification', to: 'change-detection' }, { from: 'classification', to: 'applications' }, { from: 'change-detection', to: 'applications' }
    ]
  },
  {
    id: 'photogrammetry',
    title: 'Photogrammetry',
    description: 'Learn 3D reconstruction, point cloud processing, and aerial surveying techniques',
    icon: '📸',
    color: 'from-purple-500 to-pink-500',
    nodes: [
      { id: 'photo-principles', title: 'Photogrammetry Principles', description: 'Understand the mathematical foundations and geometric principles', category: 'Foundation', difficulty: 'Beginner', resources: ['Photogrammetry Handbook', 'Geometry Basics'], estimatedTime: '2 weeks', x: 400, y: 100 },
      { id: 'camera-systems', title: 'Camera Systems', description: 'Learn about different camera types, calibration, and specifications', category: 'Technology', difficulty: 'Beginner', prerequisites: ['photo-principles'], resources: ['Camera Calibration Guide', 'Sensor Specifications'], estimatedTime: '2 weeks', x: 200, y: 200 },
      { id: 'flight-planning', title: 'Flight Planning', description: 'Plan aerial missions, overlap calculations, and ground control', category: 'Planning', difficulty: 'Intermediate', prerequisites: ['camera-systems'], resources: ['Mission Planning Software', 'Flight Guidelines'], estimatedTime: '3 weeks', x: 600, y: 200 },
      { id: 'image-acquisition', title: 'Image Acquisition', description: 'Execute aerial photography missions and quality control', category: 'Field Work', difficulty: 'Intermediate', prerequisites: ['flight-planning'], resources: ['Field Guide', 'Quality Assessment'], estimatedTime: '2 weeks', x: 400, y: 300 },
      { id: 'bundle-adjustment', title: 'Bundle Adjustment', description: 'Optimize camera positions and orientations simultaneously', category: 'Processing', difficulty: 'Advanced', prerequisites: ['image-acquisition'], resources: ['Bundle Adjustment Theory', 'Software Tutorials'], estimatedTime: '4 weeks', x: 200, y: 400 },
      { id: 'dense-matching', title: 'Dense Matching', description: 'Generate dense point clouds from stereo images', category: 'Processing', difficulty: 'Advanced', prerequisites: ['bundle-adjustment'], resources: ['Stereo Matching Algorithms', 'Point Cloud Generation'], estimatedTime: '3 weeks', x: 600, y: 400 },
      { id: 'point-clouds', title: 'Point Cloud Processing', description: 'Clean, filter, and process 3D point cloud data', category: 'Analysis', difficulty: 'Advanced', prerequisites: ['dense-matching'], resources: ['CloudCompare Tutorial', 'Point Cloud Library'], estimatedTime: '3 weeks', x: 300, y: 500 },
      { id: '3d-modeling', title: '3D Modeling', description: 'Create textured 3D models and orthomosaics', category: 'Output', difficulty: 'Advanced', prerequisites: ['point-clouds'], resources: ['3D Reconstruction Guide', 'Texturing Techniques'], estimatedTime: '4 weeks', x: 500, y: 500 },
      { id: 'photo-applications', title: 'Applications', description: 'Apply photogrammetry in surveying, mapping, and documentation', category: 'Application', difficulty: 'Advanced', prerequisites: ['3d-modeling'], resources: ['Industry Case Studies', 'Professional Workflows'], estimatedTime: '3 weeks', x: 400, y: 600 }
    ],
    connections: [
      { from: 'photo-principles', to: 'camera-systems' }, { from: 'photo-principles', to: 'flight-planning' }, { from: 'camera-systems', to: 'flight-planning' }, { from: 'flight-planning', to: 'image-acquisition' }, { from: 'image-acquisition', to: 'bundle-adjustment' }, { from: 'image-acquisition', to: 'dense-matching' }, { from: 'bundle-adjustment', to: 'dense-matching' }, { from: 'bundle-adjustment', to: 'point-clouds' }, { from: 'dense-matching', to: 'point-clouds' }, { from: 'dense-matching', to: '3d-modeling' }, { from: 'point-clouds', to: '3d-modeling' }, { from: 'point-clouds', to: 'photo-applications' }, { from: '3d-modeling', to: 'photo-applications' }
    ]
  }
];