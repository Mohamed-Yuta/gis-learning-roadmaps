// src/data.ts

import type { Roadmap } from './types';

export const roadmapsData: Roadmap[] = [
  // ====================================================================================
  // 1. GIS Fundamentals Roadmap
  // ====================================================================================
  {
    id: 'gis-fundamentals',
    title: 'GIS Fundamentals',
    description: 'Build a solid foundation in core GIS concepts, spatial analysis, and cartography.',
    icon: '🗺️',
    color: 'from-green-500 to-emerald-500',
    nodes: [
      { id: 'gis-intro', title: 'What is GIS?', description: 'Understand the core concepts, history, and applications of Geographic Information Systems.', category: 'Foundation', difficulty: 'Beginner', resources: [
        { type: 'Video', title: 'What is GIS? by Esri', url: 'https://www.youtube.com/watch?v=L9eI4Bv-y-c', author: 'Esri', isFree: true, description: 'A clear, concise, and professionally produced introduction.' },
        { type: 'Article', title: 'GIS Lounge: What is GIS?', url: 'https://www.gislounge.com/what-is-gis/', author: 'GIS Lounge', isFree: true, description: 'A detailed article covering the components of a GIS.' }
      ], estimatedTime: '1 week', x: 400, y: 100 },
      { id: 'map-projections', title: 'Map Projections & Datums', description: 'Learn why the Earth is hard to flatten and how projections and coordinate systems work.', category: 'Theory', difficulty: 'Beginner', prerequisites: ['gis-intro'], resources: [
        { type: 'Video', title: 'Map Projections Explained - A Deep Dive', url: 'https://www.youtube.com/watch?v=kIID5FDi2JQ', author: 'Vox', isFree: true, description: 'A famous video that explains the problem of map projections in an engaging way.' },
        { type: 'Interactive Tutorial', title: 'The True Size Of...', url: 'https://thetruesize.com/', isFree: true, description: 'An interactive tool to see how projections distort the size of countries.' }
      ], estimatedTime: '1 week', x: 200, y: 200 },
      { id: 'data-models', title: 'Vector vs. Raster Data', description: 'Understand the two primary models for representing spatial data: points, lines, polygons vs. grids.', category: 'Theory', difficulty: 'Beginner', prerequisites: ['gis-intro'], resources: [
        { type: 'Article', title: 'Vector vs. Raster: What\'s the Difference?', url: 'https://gisgeography.com/vector-vs-raster-data-gis/', author: 'GIS Geography', isFree: true, description: 'A fantastic visual guide explaining the two data models.' }
      ], estimatedTime: '1 week', x: 600, y: 200 },
      { id: 'data-acquisition', title: 'Data Acquisition', description: 'Explore how spatial data is created, from satellites and GPS to digitizing.', category: 'Technical', difficulty: 'Beginner', prerequisites: ['data-models'], resources: [
        { type: 'Official Docs', title: 'USGS EarthExplorer', url: 'https://earthexplorer.usgs.gov/', author: 'USGS', isFree: true, description: 'The primary source for free satellite imagery like Landsat. Practice finding and downloading data.' }
      ], estimatedTime: '2 weeks', x: 400, y: 300 },
      { id: 'geoprocessing', title: 'Intro to Geoprocessing', description: 'Learn to use fundamental analysis tools like Buffer, Clip, and Intersect.', category: 'Analysis', difficulty: 'Intermediate', prerequisites: ['data-acquisition'], resources: [
        { type: 'Interactive Tutorial', title: 'QGIS Training Manual: Vector Analysis', url: 'https://docs.qgis.org/3.28/en/docs/training_manual/vector_analysis/index.html', author: 'QGIS', isFree: true, description: 'Hands-on exercises for the most common vector analysis tools in QGIS.' }
      ], estimatedTime: '3 weeks', x: 200, y: 400 },
      { id: 'cartography', title: 'Principles of Cartography', description: 'Master the art and science of map-making, including symbology, layout, and visual hierarchy.', category: 'Design', difficulty: 'Intermediate', prerequisites: ['geoprocessing'], resources: [
        { type: 'Book', title: 'Making Maps: A Visual Guide to Map Design for GIS', url: 'https://www.amazon.com/Making-Maps-Visual-Guide-Design/dp/160918166X', author: 'John Krygier & Denis Wood', isFree: false, description: 'A classic and highly recommended book on map design principles.' },
        { type: 'Video', title: 'John Nelson\'s Map-Making Guides', url: 'https://www.youtube.com/c/JohnNelsonMaps', author: 'John Nelson', isFree: true, description: 'Inspirational and practical videos on creating beautiful maps.' }
      ], estimatedTime: '3 weeks', x: 600, y: 400 },
      { id: 'final-project', title: 'Capstone Project', description: 'Apply all your skills to find data, perform analysis, and create a high-quality map portfolio piece.', category: 'Application', difficulty: 'Intermediate', prerequisites: ['cartography'], resources: [
        { type: 'Project/Challenge', title: 'Create a Site Suitability Map', url: 'https://www.youtube.com/watch?v=example', isFree: true, description: 'A common GIS task: find the best location for a new park, store, or facility based on multiple criteria.' }
      ], estimatedTime: '4 weeks', x: 400, y: 500 }
    ],
    connections: [
      { from: 'gis-intro', to: 'map-projections' }, { from: 'gis-intro', to: 'data-models' }, { from: 'data-models', to: 'data-acquisition' }, { from: 'data-acquisition', to: 'geoprocessing' }, { from: 'geoprocessing', to: 'cartography' }, { from: 'map-projections', to: 'cartography' }, { from: 'cartography', to: 'final-project' }
    ]
  },
  // ====================================================================================
  // 2. Remote Sensing Roadmap (Revised)
  // ====================================================================================
  {
    id: 'remote-sensing',
    title: 'Remote Sensing',
    description: 'Master satellite imagery analysis, earth observation, and spatial data interpretation.',
    icon: '🛰️',
    color: 'from-blue-500 to-cyan-500',
    nodes: [
      { id: 'rs-fundamentals', title: 'RS Fundamentals', description: 'Learn basic principles, history, and applications of remote sensing technology.', category: 'Foundation', difficulty: 'Beginner', prerequisites: ['gis-fundamentals/gis-intro'], resources: [
        { type: 'Video', title: 'NASA\'s Tour of the Electromagnetic Spectrum', url: 'https://www.youtube.com/watch?v=lwf5bV_a_6o', author: 'NASA', isFree: true, description: 'A foundational video series explaining the different parts of the EM spectrum.' }
      ], estimatedTime: '2 weeks', x: 400, y: 100 },
      { id: 'platforms-sensors', title: 'Platforms & Sensors', description: 'Explore different satellite platforms (Landsat, Sentinel) and sensor types (optical, thermal, SAR).', category: 'Technology', difficulty: 'Beginner', prerequisites: ['rs-fundamentals'], resources: [
        { type: 'Article', title: 'Active vs. Passive Remote Sensing', url: 'https://gisgeography.com/active-vs-passive-remote-sensing/', author: 'GIS Geography', isFree: true, description: 'A clear explanation of the key difference between sensor types.' }
      ], estimatedTime: '2 weeks', x: 200, y: 200 },
      { id: 'image-preprocessing', title: 'Image Pre-processing', description: 'Learn essential radiometric and atmospheric correction techniques.', category: 'Technical', difficulty: 'Intermediate', prerequisites: ['platforms-sensors'], resources: [
        { type: 'Official Docs', title: 'SNAP Sentinel Toolboxes', url: 'https://step.esa.int/main/toolboxes/snap/', author: 'ESA', isFree: true, description: 'The official free software for processing Sentinel data, with extensive tutorials.' }
      ], estimatedTime: '3 weeks', x: 600, y: 200 },
      { id: 'spectral-indices', title: 'Spectral Indices', description: 'Calculate and interpret indices like NDVI (vegetation), NDWI (water), and NDBI (built-up).', category: 'Analysis', difficulty: 'Intermediate', prerequisites: ['image-preprocessing'], resources: [
        { type: 'Article', title: 'List of Sentinel-2 Spectral Indices', url: 'https://www.linkedin.com/pulse/complete-list-sentinel-2-spectral-indices-mcf-geospatial/', author: 'MCF Geospatial', isFree: true, description: 'A comprehensive cheat sheet of different indices and their formulas.' }
      ], estimatedTime: '2 weeks', x: 200, y: 300 },
      { id: 'image-classification', title: 'Image Classification', description: 'Learn supervised and unsupervised methods to create land cover maps.', category: 'Analysis', difficulty: 'Advanced', prerequisites: ['spectral-indices'], resources: [
        { type: 'Video', title: 'Supervised vs. Unsupervised Classification in QGIS', url: 'https://www.youtube.com/watch?v=tCeY3t6VoF4', author: 'Klas Karlsson', isFree: true, description: 'A practical, step-by-step tutorial using open-source software.' }
      ], estimatedTime: '4 weeks', x: 600, y: 300 },
      { id: 'change-detection', title: 'Change Detection', description: 'Analyze temporal changes in land cover, deforestation, or urban growth.', category: 'Analysis', difficulty: 'Advanced', prerequisites: ['image-classification'], resources: [
        { type: 'Interactive Tutorial', title: 'Change Detection with Google Earth Engine', url: 'https://developers.google.com/earth-engine/tutorials/tutorial_change_detection', author: 'Google', isFree: true, description: 'Use a powerful cloud platform for large-scale change analysis.' }
      ], estimatedTime: '3 weeks', x: 400, y: 400 },
      { id: 'rs-applications', title: 'Real-World Applications', description: 'Apply remote sensing in agriculture, forestry, disaster management, and urban planning.', category: 'Application', difficulty: 'Advanced', prerequisites: ['change-detection'], resources: [
        { type: 'Project/Challenge', title: 'Monitor a Wildfire or Flood Event', url: '#', isFree: true, description: 'Find pre- and post-event imagery and map the extent of the damage.' }
      ], estimatedTime: '4 weeks', x: 400, y: 500 }
    ],
    connections: [
      { from: 'rs-fundamentals', to: 'platforms-sensors' }, { from: 'platforms-sensors', to: 'image-preprocessing' }, { from: 'image-preprocessing', to: 'spectral-indices' }, { from: 'image-preprocessing', to: 'image-classification' }, { from: 'spectral-indices', to: 'change-detection' }, { from: 'image-classification', to: 'change-detection' }, { from: 'change-detection', to: 'rs-applications' }
    ]
  },
  // ====================================================================================
  // 3. Photogrammetry Roadmap (Revised)
  // ====================================================================================
  {
    id: 'photogrammetry',
    title: 'Photogrammetry',
    description: 'Learn 3D reconstruction from images, from drone flight planning to point cloud processing.',
    icon: '📸',
    color: 'from-purple-500 to-pink-500',
    nodes: [
      { id: 'photo-principles', title: 'Photogrammetry Principles', description: 'Understand the geometric principles of stereo vision and Structure from Motion (SfM).', category: 'Foundation', difficulty: 'Beginner', resources: [
        { type: 'Video', title: 'How Photogrammetry Works', url: 'https://www.youtube.com/watch?v=R0PDCp0QF1g', author: 'Deep Homography', isFree: true, description: 'A great visual breakdown of the core SfM workflow.' }
      ], estimatedTime: '2 weeks', x: 400, y: 100 },
      { id: 'flight-planning', title: 'Flight Planning & GCPs', description: 'Plan aerial drone missions, calculate overlap, and understand the role of Ground Control Points (GCPs).', category: 'Planning', difficulty: 'Beginner', prerequisites: ['photo-principles'], resources: [
        { type: 'Article', title: '5 Drone Flight Patterns for 3D Mapping', url: 'https://www.propelleraero.com/blog/5-drone-flight-patterns-for-3d-mapping/', author: 'Propeller Aero', isFree: true, description: 'A practical guide to planning effective data capture missions.' }
      ], estimatedTime: '2 weeks', x: 200, y: 200 },
      { id: 'image-processing-sfm', title: 'SfM Processing', description: 'Process images in software like Metashape or PIX4D to align cameras and generate a sparse point cloud.', category: 'Processing', difficulty: 'Intermediate', prerequisites: ['flight-planning'], resources: [
        { type: 'Video', title: 'Agisoft Metashape Basic Workflow', url: 'https://www.youtube.com/watch?v=3_121xO42_c', author: 'Agisoft', isFree: true, description: 'The official tutorial from one of the leading software vendors.' }
      ], estimatedTime: '3 weeks', x: 600, y: 200 },
      { id: 'dense-cloud', title: 'Dense Cloud Generation', description: 'Generate a dense, high-resolution point cloud from the aligned images.', category: 'Processing', difficulty: 'Intermediate', prerequisites: ['image-processing-sfm'], resources: [
        { type: 'Official Docs', title: 'OpenDroneMap Documentation', url: 'https://www.opendronemap.org/docs/', author: 'OpenDroneMap', isFree: true, description: 'Learn the leading open-source photogrammetry toolchain.' }
      ], estimatedTime: '2 weeks', x: 400, y: 300 },
      { id: 'point-cloud-cleanup', title: 'Point Cloud Processing', description: 'Clean, filter, and classify 3D point cloud data in software like CloudCompare.', category: 'Analysis', difficulty: 'Advanced', prerequisites: ['dense-cloud'], resources: [
        { type: 'Interactive Tutorial', title: 'CloudCompare Tutorials', url: 'https://www.cloudcompare.org/doc/wiki/index.php/Tutorials', author: 'CloudCompare', isFree: true, description: 'Master the essential open-source tool for point cloud editing.' }
      ], estimatedTime: '3 weeks', x: 200, y: 400 },
      { id: 'deliverables', title: 'Creating Deliverables', description: 'Generate final products like a 3D Mesh, Digital Elevation Model (DEM), and Orthomosaic.', category: 'Output', difficulty: 'Advanced', prerequisites: ['point-cloud-cleanup'], resources: [
        { type: 'Article', title: 'DSM vs DTM vs DEM: Digital Surface & Terrain Models', url: 'https://gisgeography.com/dem-dsm-dtm-differences/', author: 'GIS Geography', isFree: true, description: 'Understand the crucial differences between elevation model types.' }
      ], estimatedTime: '3 weeks', x: 600, y: 400 },
      { id: 'photo-applications', title: 'Real-World Applications', description: 'Apply photogrammetry in surveying, construction, cultural heritage, and visual effects.', category: 'Application', difficulty: 'Advanced', prerequisites: ['deliverables'], resources: [
        { type: 'Project/Challenge', title: 'Scan a Real-World Object', url: '#', isFree: true, description: 'Use your phone camera or a drone to capture and process a 3D model of a local statue or small building.' }
      ], estimatedTime: '4 weeks', x: 400, y: 500 }
    ],
    connections: [
      { from: 'photo-principles', to: 'flight-planning' }, { from: 'flight-planning', to: 'image-processing-sfm' }, { from: 'image-processing-sfm', to: 'dense-cloud' }, { from: 'dense-cloud', to: 'point-cloud-cleanup' }, { from: 'point-cloud-cleanup', to: 'deliverables' }, { from: 'image-processing-sfm', to: 'deliverables' }, { from: 'deliverables', to: 'photo-applications' }
    ]
  },
  // ====================================================================================
  // 4. Web GIS Roadmap (New)
  // ====================================================================================
  {
    id: 'web-gis',
    title: 'Web GIS',
    description: 'Learn to build interactive online mapping applications and deliver GIS data on the web.',
    icon: '🌍',
    color: 'from-orange-500 to-amber-500',
    nodes: [
      { id: 'web-dev-basics', title: 'Web Dev Fundamentals', description: 'Understand the basics of HTML, CSS, and JavaScript, the building blocks of the web.', category: 'Foundation', difficulty: 'Beginner', resources: [
        { type: 'Interactive Tutorial', title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', author: 'freeCodeCamp', isFree: true, description: 'The gold standard for learning the fundamentals of web development from scratch.' }
      ], estimatedTime: '4 weeks', x: 400, y: 100 },
      { id: 'web-map-concepts', title: 'Web Mapping Concepts', description: 'Learn about web services (WMS, WFS), map tiles, and web map architecture.', category: 'Theory', difficulty: 'Beginner', prerequisites: ['web-dev-basics'], resources: [
        { type: 'Article', title: 'Anatomy of a Web Map', url: 'https://macwright.com/2012/06/19/anatomy-of-a-web-map.html', author: 'Tom MacWright', isFree: true, description: 'A classic blog post explaining how web maps work under the hood.' }
      ], estimatedTime: '1 week', x: 400, y: 200 },
      { id: 'leaflet-js', title: 'Intro to Leaflet.js', description: 'Build your first interactive maps with the most popular open-source mapping library.', category: 'Frontend', difficulty: 'Intermediate', prerequisites: ['web-map-concepts'], resources: [
        { type: 'Official Docs', title: 'Leaflet Quick Start Guide', url: 'https://leafletjs.com/examples/quick-start/', author: 'Leaflet', isFree: true, description: 'The official tutorial. You can have a map running in 15 minutes.' }
      ], estimatedTime: '3 weeks', x: 200, y: 300 },
      { id: 'mapbox-gl', title: 'Vector Tiles with Mapbox GL', description: 'Explore modern vector tile technology for high-performance, stylish maps.', category: 'Frontend', difficulty: 'Intermediate', prerequisites: ['web-map-concepts'], resources: [
        { type: 'Official Docs', title: 'Mapbox GL JS Examples', url: 'https://docs.mapbox.com/mapbox-gl-js/example/', author: 'Mapbox', isFree: true, description: 'An extensive gallery of examples for creating advanced map interactions.' }
      ], estimatedTime: '3 weeks', x: 600, y: 300 },
      { id: 'gis-server', title: 'Publishing Data with a Server', description: 'Learn to use a GIS server like GeoServer to publish your own data as a web service.', category: 'Backend', difficulty: 'Advanced', prerequisites: ['leaflet-js'], resources: [
        { type: 'Interactive Tutorial', title: 'GeoServer Official Workshop', url: 'https://docs.geoserver.org/stable/en/user/services/wfs/index.html', author: 'GeoServer', isFree: true, description: 'Step-by-step guides for installing GeoServer and publishing layers.' }
      ], estimatedTime: '4 weeks', x: 200, y: 400 },
      { id: 'full-stack-app', title: 'Full-Stack Web App', description: 'Combine a frontend library with a backend server and a database (like PostGIS) to build a complete application.', category: 'Application', difficulty: 'Advanced', prerequisites: ['gis-server', 'mapbox-gl'], resources: [
        { type: 'Project/Challenge', title: 'Build a Store Locator App', url: '#', isFree: true, description: 'A classic full-stack project: display points on a map from a database and allow users to search for the nearest one.' }
      ], estimatedTime: '6 weeks', x: 400, y: 500 }
    ],
    connections: [
      { from: 'web-dev-basics', to: 'web-map-concepts' }, { from: 'web-map-concepts', to: 'leaflet-js' }, { from: 'web-map-concepts', to: 'mapbox-gl' }, { from: 'leaflet-js', to: 'gis-server' }, { from: 'gis-server', to: 'full-stack-app' }, { from: 'mapbox-gl', to: 'full-stack-app' }
    ]
  },
  // ====================================================================================
  // 5. Spatial Data Science Roadmap (New)
  // ====================================================================================
  {
    id: 'spatial-data-science',
    title: 'Spatial Data Science',
    description: 'Use Python and advanced statistical methods to extract deep insights from spatial data.',
    icon: '📊',
    color: 'from-red-500 to-rose-500',
    nodes: [
      { id: 'python-basics', title: 'Python for Data Science', description: 'Master Python fundamentals, including data structures, functions, and the NumPy/Pandas libraries.', category: 'Foundation', difficulty: 'Beginner', resources: [
        { type: 'Book', title: 'Python for Data Analysis by Wes McKinney', url: 'https://wesmckinney.com/book/', author: 'Wes McKinney', isFree: true, description: 'The essential book for learning Pandas, written by its creator. The full book is free online.' }
      ], estimatedTime: '4 weeks', x: 400, y: 100 },
      { id: 'geopandas', title: 'Geospatial Data with GeoPandas', description: 'Learn to use GeoPandas to read, write, manipulate, and analyze vector data in Python.', category: 'Programming', difficulty: 'Intermediate', prerequisites: ['python-basics'], resources: [
        { type: 'Official Docs', title: 'GeoPandas Documentation', url: 'https://geopandas.org/en/stable/docs/user_guide.html', author: 'GeoPandas Team', isFree: true, description: 'The official user guide is the best place to start.' }
      ], estimatedTime: '3 weeks', x: 200, y: 200 },
      { id: 'rasterio', title: 'Raster Data with Rasterio', description: 'Learn to use Rasterio and Xarray for efficient reading, writing, and processing of raster data.', category: 'Programming', difficulty: 'Intermediate', prerequisites: ['python-basics'], resources: [
        { type: 'Official Docs', title: 'Rasterio Documentation', url: 'https://rasterio.readthedocs.io/en/latest/', author: 'Rasterio Team', isFree: true, description: 'Learn the primary Python library for working with raster data.' }
      ], estimatedTime: '3 weeks', x: 600, y: 200 },
      { id: 'spatial-sql', title: 'Spatial SQL with PostGIS', description: 'Harness the power of a spatial database for complex queries and large-scale analysis.', category: 'Database', difficulty: 'Advanced', prerequisites: ['geopandas'], resources: [
        { type: 'Interactive Tutorial', title: 'Intro to PostGIS Workshop', url: 'https://postgis.net/workshops/postgis-intro/', author: 'PostGIS', isFree: true, description: 'An official, comprehensive workshop covering the basics and advanced features.' }
      ], estimatedTime: '4 weeks', x: 200, y: 300 },
      { id: 'spatial-stats', title: 'Spatial Statistics', description: 'Explore concepts like spatial autocorrelation (Moran\'s I) and point pattern analysis.', category: 'Statistics', difficulty: 'Advanced', prerequisites: ['rasterio'], resources: [
        { type: 'Book', title: 'Geographic Information Analysis by O\'Sullivan & Unwin', url: 'https://www.amazon.com/Geographic-Information-Analysis-David-OSullivan/dp/0470288574', isFree: false, description: 'A foundational textbook on the theory behind spatial statistics.' }
      ], estimatedTime: '5 weeks', x: 600, y: 300 },
      { id: 'spatial-ml', title: 'Spatial Machine Learning', description: 'Apply machine learning techniques to spatial problems, such as predicting values or classifying satellite imagery.', category: 'Machine Learning', difficulty: 'Advanced', prerequisites: ['spatial-stats'], resources: [
        { type: 'Article', title: 'A gentle introduction to using scikit-learn for spatial analysis', url: 'https://towardsdatascience.com/a-gentle-introduction-to-using-scikit-learn-for-spatial-analysis-1b8a531f26e4', author: 'Towards Data Science', isFree: true, description: 'A great starting point for integrating ML with your GIS workflows.' }
      ], estimatedTime: '6 weeks', x: 400, y: 400 },
      { id: 'final-sds-project', title: 'Capstone Project', description: 'Use Python to perform a full-scale analysis project, from data ingestion to final visualization and insight.', category: 'Application', difficulty: 'Advanced', prerequisites: ['spatial-ml'], resources: [
        { type: 'Project/Challenge', title: 'Predict Air Quality based on nearby features', url: '#', isFree: true, description: 'Use road networks, factory locations, and green spaces to build a model that predicts air pollution.' }
      ], estimatedTime: '5 weeks', x: 400, y: 500 }
    ],
    connections: [
      { from: 'python-basics', to: 'geopandas' }, { from: 'python-basics', to: 'rasterio' }, { from: 'geopandas', to: 'spatial-sql' }, { from: 'rasterio', to: 'spatial-stats' }, { from: 'spatial-sql', to: 'spatial-ml' }, { from: 'spatial-stats', to: 'spatial-ml' }, { from: 'spatial-ml', to: 'final-sds-project' }
    ]
  }
];