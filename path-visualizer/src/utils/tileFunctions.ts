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
  isStart,
  isEnd,
  isWall,
  isPath,
  isTraversed
}: {
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean
}) => {
  let tileStyle: string;
  if (isStart) {
    tileStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileStyle = TRAVERSED_TILE_STYLE;
  } else {
    tileStyle = TILE_STYLE;
  }
  return tileStyle;
}

// Change tile in grid
export const setTileInGrid = ({
  grid,
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isPath,
  isTraversed,
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
  // grid[col][row].isStart = false;
  // grid[col][row].isEnd = false;
  // grid[col][row].isWall = false;
  // grid[col][row].isPath = false;
  // grid[col][row].isTraversed = false;
  // Only 1 can be true!
  if (isStart) {
    grid[row][col].isStart = true;
  } else if (isEnd) {
    grid[row][col].isEnd = true;
  } else if (isWall) {
    grid[row][col].isWall = true;
  } else if (isPath) {
    grid[row][col].isPath = true;
  } else if (isTraversed) {
    grid[row][col].isTraversed = true;
  } 
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
  isStart,
  isEnd,
  isWall,
  isPath,
  isTraversed,
  extraStyles
}: {
  row: number,
  col: number,
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean,
  extraStyles?: string
}) => {
  const tileStyle = getTileStyle({
    isStart, 
    isEnd, 
    isWall,
    isPath,
    isTraversed
  });
  const moreStyles = extraStyles ? (" " + extraStyles) : ""
  const finalStyle = tileStyle + moreStyles;
  document.getElementById(`${row}-${col}`)!.className = finalStyle;
}

export const setAndStyleTile = ({
  grid, 
  row, 
  col,
  isStart,
  isEnd,
  isWall,
  isPath,
  isTraversed,
  extraStyles
}: {
  grid: Grid, 
  row: number, 
  col: number, 
  isStart?: boolean,
  isEnd?: boolean,
  isWall?: boolean,
  isPath?: boolean,
  isTraversed?: boolean,
  extraStyles?: string
}) => {
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
    extraStyles
  })
};
