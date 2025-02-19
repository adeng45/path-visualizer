import { MazeSelect, SpeedSelect, AlgorithmSelect } from "./types";

export const MAX_ROWS = 39;
export const MAX_COLS = 49;
export const DELAY_CONSTANT = 8;
export const LONG_DELAY_CONSTANT = 30;

export const START_TILE_CONFIGURATION = {
  row: 1, 
  col: 1,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null
}

export const END_TILE_CONFIGURATION = {
  row: MAX_ROWS - 2, 
  col: MAX_COLS - 2,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null
}

export const TILE_STYLE =
  "lg:w-[17px] md:w-[15px] w-[7px] lg:h-[17px] md:h-[15px] h-[7px] border border-sky-200";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-500";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-500";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-600";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-200";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-600";

export const MAZES: MazeSelect[] = [
  { name: "No Maze", value: "NONE" },
  { name: "Binary Tree", value: "BINARY_TREE" },
  { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const ALGORITHMS: AlgorithmSelect[] = [
  { name: "Dijkstra", value: "DIJKSTRA" },
  { name: "Breadth First Search", value: "BFS" },
  { name: "Depth First Search", value: "DFS" },
  { name: "A* Estimation", value: "A*"}
]

export const SPEEDS: SpeedSelect[] = [
  { name: "Fast", value: 0.5 },
  { name: "Medium", value: 1 },
  { name: "Slow", value: 2 }
];
