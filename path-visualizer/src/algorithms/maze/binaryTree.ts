import { MAX_COLS, MAX_ROWS } from "../../utils/constants";
import { createWall } from "../../utils/createWall";
import { destroyWall } from "../../utils/destroyWall";
import { isStartOrEnd, sleep, coinflip } from "../../utils/helpers";
import { Grid, Speed, Tile } from "../../utils/types";

export const binaryTree = async (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
  setIsDisabled: (disabled: boolean) => void,
  speed: Speed
) => {
  createWall(speed); // Make initial wall setup
  await sleep(MAX_ROWS * MAX_COLS); // Wait for the wall setup to complete

  // for (const row of grid) {
  //   // Iterate through each row in the grid
  //   for (const node of row) {
  //     // Iterate through each node in the row
  //     if (node.row % 2 === 0 || node.col % 2 === 0) {
  //       // Check if the node is on an even row or column
  //       if (!isStartOrEnd(node.row, node.col)) {
  //         // Check if the node is not the start or end tile
  //         node.isWall = true; // Set the node as a wall
  //       }
  //     }
  //   }
  // }

  for (let r = 1; r < MAX_ROWS; r += 2) {
    // Iterate through odd rows starting from 1
    for (let c = 1; c < MAX_COLS; c += 2) {
      // Iterate through odd columns starting from 1
      if (r === MAX_ROWS - 2 && c === MAX_COLS - 2) {
        // Skip the bottom-right corner
        continue;
      } else if (r === MAX_ROWS - 2) {
        // If it's the last row, destroy a wall to the right
        await destroyWall(grid, r, c, 1, speed);
      } else if (c === MAX_COLS - 2) {
        // If it's the last column, destroy a wall below
        await destroyWall(grid, r, c, 0, speed);
      } else {
        // Otherwise, randomly destroy a wall to the right or below
        await destroyWall(grid, r, c, coinflip(), speed);
      }
    }
  }
  setIsDisabled(false); // Re-enable the UI
};