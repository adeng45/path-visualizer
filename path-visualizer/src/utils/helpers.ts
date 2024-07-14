import { Grid, Tile } from "./types"
import { MAX_ROWS, MAX_COLS } from "./constants"

const createRow = (row: number, startTile: Tile, endTile: Tile) => {
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

export const createGrid = (startTile: Tile, endTile: Tile) => {
  const grid: Grid = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }
  return grid;
}

export const isStartOrEnd = (row: number, col: number) => {
  return (row === 0 && col === 0) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
}

export const changeTile = (grid: Grid, row: number, col: number) => {
  const newGrid = grid.slice();
  const oldTile = grid[row][col];
  newGrid[row][col] = {
    ...oldTile,
    isWall: !oldTile.isWall
  };
  return newGrid;
}