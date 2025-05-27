export interface RoadmapNode {
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

export interface ProgressStats {
  total: number;
  completed: number;
  learning: number;
  percentage: number;
}