import { Grid, Speed, Tile } from "./types";
import { MAX_ROWS, MAX_COLS, DELAY_CONSTANT, LONG_DELAY_CONSTANT } from "./constants";
import { isStartOrEndTile, isSameTile, setAndStyleTile } from "./tileFunctions";
import { delayedExecute, sleep } from "./miscFunctions";

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
export const resetGrid = ({
  grid, 
  startTile,
  endTile,
  keepWalls=false
}: {
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
  keepWalls?: boolean
}) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      grid[row][col].distance = Infinity;
      grid[row][col].parent = null;
      if (grid[row][col].isWall && keepWalls) {
        continue;
      }
      else if (isSameTile(grid[row][col], startTile)) {
        setAndStyleTile({
          grid,
          row, 
          col,
          isStart: true
        })
      }
      else if (isSameTile(grid[row][col], endTile)) {
        setAndStyleTile({
          grid,
          row, 
          col,
          isEnd: true
        })
      }
      else {
        setAndStyleTile({
          grid, 
          row, 
          col
        })
      }
    }
  }
};


export const animatePath = async (
  grid: Grid,
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
          setAndStyleTile({
            grid,
            row: tile.row,
            col: tile.col,
            isTraversed: true,
            animate: true
          })
        },
        fixedAmount: DELAY_CONSTANT * i * speed
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
              setAndStyleTile({
                grid, 
                row: tile.row, 
                col: tile.col,
                isPath: true,
                animate: true
              })
            }, 
            fixedAmount: LONG_DELAY_CONSTANT * i * speed
          })
        }
      }
    },
    fixedAmount: DELAY_CONSTANT * traversedTiles.length * speed
  });

  await sleep((DELAY_CONSTANT * traversedTiles.length * speed) + (LONG_DELAY_CONSTANT * path.length * speed));

}

