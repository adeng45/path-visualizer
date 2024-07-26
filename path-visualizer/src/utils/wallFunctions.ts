import { Grid, Speed, Tile } from "./types";
import { delayedExecute } from "./miscFunctions";
import { isStartOrEndTile, setAndStyleTile } from "./tileFunctions";
import { MAX_COLS, MAX_ROWS } from "./constants";

export const createInitialWalls = (
  grid: Grid,
  speed: Speed
) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      if (row % 2 === 0 || col % 2 === 0) {
        if (!isStartOrEndTile(row, col)) {
          delayedExecute({
            f: () => {
              setAndStyleTile({
                grid,
                row: row,
                col,
                isWall: true,
                animate: true
              })
            }, 
            delayInfo: {
              speed,
              row,
              col
            }
          })
        };
      }
    }
  }
}

export const destroyWall = (
  grid: Grid,
  row: number,
  col: number,
  isRight: number,
  speed: Speed
) => {
  // Destroy right wall
  if (isRight && grid[row][col + 1]) {
    delayedExecute({
      f: () => {
        setAndStyleTile({
          grid,
          row,
          col: col + 1,
          isWall: false
        })
      }, 
      delayInfo: {
        speed,
        row,
        col: col + 1
      }
    })
  }
  // Always a bottom wall to destroy
  else {
    delayedExecute({
      f: () => {
        setAndStyleTile({
          grid,
          row: row + 1,
          col,
          isWall: false
        })
      }, 
      delayInfo: {
        speed,
        row: row + 1,
        col,
      }
    })
  } 
};

export const constructBorder = (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
  timeAllowed: number,
  speed: number
) => {
  const shape = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
  ];

  let r = 0;
  let c = 0;
  let sleepTime = 0;
  const interval = timeAllowed / (2 * MAX_COLS + 2 * MAX_ROWS);


  for (let i = 0; i < 4; i++) {
    const direction = shape[i];

    while (
      r + direction.row >= 0 &&
      r + direction.row < MAX_ROWS &&
      c + direction.col >= 0 &&
      c + direction.col < MAX_COLS
    ) {
      r += direction.row;
      c += direction.col;

      // Need to copy row, col literal values
      let row = r;
      let col = c;

      if (
        !isStartOrEndTile(r, c)      
      ) {
        delayedExecute({
          f: () => {
            setAndStyleTile({
              grid, 
              row, 
              col, 
              isWall: true,
              animate: true
            })
          },
          fixedAmount: sleepTime,
        });
        sleepTime += interval;
      }
    }

    if (r < 0) r = 0;
    if (r >= MAX_ROWS) r = MAX_ROWS - 1;
    if (c < 0) c = 0;
    if (c >= MAX_COLS) c = MAX_COLS - 1;
  }

}