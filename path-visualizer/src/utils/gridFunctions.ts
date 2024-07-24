import { Grid, Speed, Tile } from "./types";
import { MAX_ROWS, MAX_COLS, SPEEDS } from "./constants";
import { isStartOrEndTile, setTileInGrid, setTileInDOM } from "./tileFunctions";
import { delayedExecute } from "./miscFunctions";

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
    const tile = traversedTiles[i];
    if (!isStartOrEndTile(tile.row, tile.col)) {
      delayedExecute({
        f: () => {
          setTileInDOM({
            row: tile.row,
            col: tile.col,
            isTraversed: true,
            animate: true
          })
        },
        fixedAmount: 8 * i * SPEEDS.find((s) => s.value === speed)!.value 
      });
    }
  }

  delayedExecute({
    f: () => {
      for (let i = 0; i < path.length; i++) {
        const tile = path[i];
        if (!isStartOrEndTile(tile.row, tile.col)) {
          delayedExecute({
            f: () => {
              setTileInDOM({
                row: tile.row, 
                col: tile.col,
                isPath: true,
                animate: true
              })
            }, 
            fixedAmount: 30 * i * SPEEDS.find((s) => s.value === speed)!.value
          })
        }
      }
    },
    fixedAmount: 8 * traversedTiles.length * SPEEDS.find((s) => s.value === speed)!.value
  });

}