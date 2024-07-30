import { MAX_COLS, MAX_ROWS } from "../../utils/constants";
import { createInitialWalls, destroyWall } from "../../utils/wallFunctions";
import { sleep, coinflip, delayAmount } from "../../utils/miscFunctions";
import { Grid, Speed } from "../../utils/types";

const binaryTree = async (
  grid: Grid,
  speed: Speed
) => {
  createInitialWalls(grid, speed); // Make initial wall setup
  await sleep(delayAmount(speed, 2, 0)); // Give a headstart to walls being created

  // Iterate through odd rows and columns
  for (let row = 1; row < MAX_ROWS; row += 2) {
    for (let col = 1; col < MAX_COLS; col += 2) {
      if (row === MAX_ROWS - 2 && col === MAX_COLS - 2) {
        continue;
      } else if (row === MAX_ROWS - 2) {
        // If it's the last row, destroy a wall to the right
        destroyWall(grid, row, col, 1, speed);
      } else if (col === MAX_COLS - 2) {
        // If it's the last column, destroy a wall below
        destroyWall(grid, row, col, 0, speed);
      } else {
        // Otherwise, randomly destroy a wall to the right or below
        destroyWall(grid, row, col, coinflip(), speed);
      }
    }
  }

  await sleep(delayAmount(speed, MAX_ROWS, MAX_COLS)); // Wait for wall destruction to be complete
};

export default binaryTree;