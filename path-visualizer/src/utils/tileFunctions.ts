import { Grid, Tile } from "./types";
import { 
  MAX_ROWS, 
  MAX_COLS,
  START_TILE_STYLE,
  END_TILE_STYLE,
  WALL_TILE_STYLE,
  PATH_TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  TILE_STYLE 
} from "./constants";




// Check to see if the coordinates point to start or end tile
export const isStartOrEndTile = (row: number, col: number) => {
  return (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
}

// Check to see if 2 tiles share the same coordinates
export const isSameTile = (t1: Tile, t2: Tile) => {
  return (t1.row === t2.row) && (t1.col === t2.col);
}

// Get the style of the tile given its identity
export const getTileStyle = ({
  isStart=false,
  isEnd=false,
  isWall=false,
  isPath=false,
  isTraversed=false, 
  animate=false
}: {
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean,
  animate?: boolean
}) => {
  let tileStyle: string;
  if (isStart) {
    tileStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileStyle = animate ? WALL_TILE_STYLE + " animate-wall" : WALL_TILE_STYLE;
  } else if (isPath) {
    tileStyle = animate ? PATH_TILE_STYLE + " animate-path" : PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileStyle = animate ? TRAVERSED_TILE_STYLE + " animate-traversed" : TRAVERSED_TILE_STYLE;
  } else {
    tileStyle = TILE_STYLE;
  }
  return tileStyle;
}

// Change tile in grid. Assign 1 isX parameter to true only. 
// Distance and parent can only be plugged if a change is wanted.
export const setTileInGrid = ({
  grid,
  row,
  col,
  isStart=false,
  isEnd=false,
  isWall=false,
  isPath=false,
  isTraversed=false,
  distance, 
  parent
}: {
  grid: Grid,
  row: number,
  col: number,
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean,
  distance?: number,
  parent?: Tile | null
}) => {
  grid[row][col].isStart = isStart;
  grid[row][col].isEnd = isEnd;
  grid[row][col].isWall = isWall;
  grid[row][col].isPath = isPath;
  grid[row][col].isTraversed = isTraversed;
  if (distance) {
    grid[row][col].distance = distance;
  }
  if (parent) {
    grid[row][col].parent = parent;
  }

}

// Change tile style in DOM
export const setTileInDOM = ({
  row,
  col,
  isStart=false,
  isEnd=false,
  isWall=false,
  isPath=false,
  isTraversed=false,
  animate=false
}: {
  row: number,
  col: number,
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean,
  animate?: boolean
}) => {
  const tileStyle = getTileStyle({
    isStart, 
    isEnd, 
    isWall,
    isPath,
    isTraversed,
    animate
  });
  document.getElementById(`${row}-${col}`)!.className = tileStyle;
}

export const setAndStyleTile = ({
  grid, 
  row, 
  col,
  isStart=false,
  isEnd=false,
  isWall=false,
  isPath=false,
  isTraversed=false,
  animate=false,
  print=false,
}: {
  grid: Grid, 
  row: number, 
  col: number, 
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean,
  animate?: boolean,
  print?:boolean
}) => {
  if (print) {
    console.log(row, col);
  }
  setTileInGrid({
    grid,
    row,
    col, 
    isStart,
    isEnd,
    isWall,
    isPath,
    isTraversed
  })
  setTileInDOM({
    row, 
    col,
    isStart,
    isEnd,
    isWall,
    isPath,
    isTraversed,
    animate
  })
};

export const getUntraversedNeighbors = (grid: Grid, tile: Tile) => {
  const { row, col } = tile;
  const neighbors = [];

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < MAX_ROWS - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < MAX_COLS - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isTraversed);
};

export const isTileInQueue = (tile: Tile, queue: Tile[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isSameTile(tile, queue[i])) return true;
  }
  return false;
}

export const removeTileFromQueue = (tile: Tile, queue: Tile[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isSameTile(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
}

export const retrievePath = (grid: Grid, startTile: Tile, endTile: Tile) => {
  const path = []; // Initialize an array to store the path
  let tile = grid[endTile.row][endTile.col]; // Start from the end tile
  while (!isSameTile(tile, startTile)) {
    // Backtrack until the start tile
    tile.isPath = true; // Mark the tile as part of the path
    path.unshift(tile); // Add the tile to the path
    tile = tile.parent!; // Move to the parent tile
  }
  return path;
}