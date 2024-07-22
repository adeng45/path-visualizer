import { Grid, Speed, Tile } from "./types";
import { MAX_ROWS, MAX_COLS, PATH_TILE_STYLE, TRAVERSED_TILE_STYLE, SPEEDS } from "./constants";
import { isStartOrEndTile, setTileInGrid, setTileInDOM, isSameTile } from "./tileFunctions";

// Helper for grid (javascript object) initialization
const initRow = (row: number, startTile: Tile, endTile: Tile) => {
  const currentRow: Tile[] = [];
  for (let col = 0; col < MAX_COLS; col++) {
    currentRow.push({
      row, 
      col, 
      isEnd: row === endTile.row && col === endTile.col,
      isWall: false,
      isPath: false,
      distance: Infinity,
      isStart: row === startTile.row && col === startTile.col,
      isTraversed: false,
      parent: null
    });
  }
  return currentRow;
}

// Create grid (javascript object)
export const initGrid = (startTile: Tile, endTile: Tile) => {
  const grid: Grid = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(initRow(row, startTile, endTile));
  }
  return grid;
}

// Refreshes the grid to contain no walls
export const resetGrid = (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      // Sets to a blank tile
      setTileInGrid({
        grid, 
        row, 
        col
      })
      if (!isStartOrEndTile(row, col)) {
        // Sets to a blank tile style
        setTileInDOM({
          row, 
          col
        })
        
      }
    }
  }
};


export const animatePath = (
  traversedTiles: Tile[],
  path: Tile[],
  startTile: Tile,
  endTile: Tile,
  speed: Speed
) => {
  for (let i = 0; i < traversedTiles.length; i++) {
    setTimeout(() => {
      const tile = traversedTiles[i];
      if (!isSameTile(tile, startTile) && !isSameTile(tile, endTile)) {
        document.getElementById(
          `${tile.row}-${tile.col}`
        )!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
      }
    }, 8 * i * SPEEDS.find((s) => s.value === speed)!.value); // Calculate delay based on speed
  }

  setTimeout(() => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const tile = path[i];
        if (!isSameTile(tile, startTile) && !isSameTile(tile, endTile)) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${PATH_TILE_STYLE} animate-path`;
        }
      }, 30 * i * SPEEDS.find((s) => s.value === speed)!.value); // Calculate delay based on speed
    }
  }, 8 * traversedTiles.length * SPEEDS.find((s) => s.value === speed)!.value); // Calculate delay based on the total traversal time
};