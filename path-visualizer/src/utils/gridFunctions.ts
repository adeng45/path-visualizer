import { Grid, Tile } from "./types";
import { MAX_ROWS, MAX_COLS } from "./constants";
import { isStartOrEndTile, setTileInGrid, setTileInDOM } from "./tileFunctions";
import { TILE_STYLE } from "./constants";

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