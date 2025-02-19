export type Algorithm = "DIJKSTRA" | "A*" | "BFS" | "DFS";

export type Maze = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export type Grid = Tile[][];

export type Tile = {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  isStart: boolean;
  isTraversed: boolean;
  parent: Tile | null;
}

export type Speed = 0.5 | 1 | 2;

export interface SpeedSelect {
  name: string, 
  value: Speed
}

export interface MazeSelect {
  name: string,
  value: Maze
}

export interface AlgorithmSelect {
  name: string, 
  value: Algorithm
}