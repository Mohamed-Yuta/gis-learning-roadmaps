// src/types.ts
export type ResourceType = 'Video' | 'Article' | 'Book' | 'Official Docs' | 'Interactive Tutorial' | 'Project/Challenge';

export interface Resource {
  type: ResourceType;
  title: string;
  url: string;
  description?: string;
  author?: string;
  isFree: boolean;
}
// ======================================================


// UPDATE THE RoadmapNode INTERFACE
export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
  resources: Resource[]; // This line should now use the new Resource type
  estimatedTime: string;
  x: number;
  y: number;
}


export interface RoadmapConnection {
  from: string;
  to: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  nodes: RoadmapNode[];
  connections: RoadmapConnection[];
}

export type ProgressStatus = 'not-started' | 'learning' | 'completed' | 'skipped';

export interface Progress {
  [nodeId: string]: ProgressStatus;
}