import { Grid, Speed, Tile } from "./types";
import { delayedExecute, sleep, delayAmount } from "./helperFunctions";
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
                isWall: true
              })
            }, 
            speed,
            row,
            col
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
      speed,
      row,
      col: col + 1,
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
      speed,
      row: row + 1,
      col,
    })
  } 
};

export const constructBorder = async (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
  speed: Speed
) => {
  const shape = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
  ];

  let row = 0;
  let col = 0;
  let sleepTime = 0;

  for (let i = 0; i < 4; i++) {
    const direction = shape[i];

    while (
      row + direction.row >= 0 &&
      row + direction.row < MAX_ROWS &&
      col + direction.col >= 0 &&
      col + direction.col < MAX_COLS
    ) {
      row += direction.row;
      col += direction.col;

      if (
        !isStartOrEndTile(row, col)      
      ) {
        setAndStyleTile({
          grid, 
          row, 
          col, 
          isWall: true,
          extraStyles: "animate-wall"
        });
        await sleep(delayAmount(speed, 0, 0));
      }
      sleepTime += 100;
    }

    if (row < 0) row = 0;
    if (row >= MAX_ROWS) row = MAX_ROWS - 1;
    if (col < 0) col = 0;
    if (col >= MAX_COLS) col = MAX_COLS - 1;
  }
}