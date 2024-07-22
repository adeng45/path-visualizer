import { Grid, Tile, Speed } from "../../utils/types"
import { delayAmount, getRandomInt, sleep } from "../../utils/helperFunctions";
import { isStartOrEndTile, setAndStyleTile } from "../../utils/tileFunctions";
import { MAX_COLS, MAX_ROWS } from "../../utils/constants";
import { constructBorder } from "../../utils/wallFunctions";

const recursiveDivision = async (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
  speed: Speed
) => {
  constructBorder(
    grid, 
    startTile,
    endTile,
    speed
  )
  recurse({
    grid, 
    startTile,
    endTile,
    row: 1,
    col: 1,
    height: Math.floor((MAX_ROWS - 1) / 2),
    width: Math.floor((MAX_COLS - 1) / 2),
    speed
  });
  await sleep(speed * 0.9 * 6000);
}

const recurse = ({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  speed,
}: {
  grid: Grid;
  startTile: Tile;
  endTile: Tile;
  row: number;
  col: number;
  height: number;
  width: number;
  speed: Speed;
}) => {
  if (height <= 1 || width <= 1) {
    return; // Base case: if the section is too small, stop recursion
  }

  if (height > width) {
    horizontalDivision({
      // Divide horizontally if height is greater than width
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      speed,
    });
  } else {
    verticalDivision({
      // Divide vertically if width is greater than or equal to height
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      speed,
    });
  }
}

const verticalDivision = async ({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  speed,
}: {
  grid: Grid;
  startTile: Tile;
  endTile: Tile;
  row: number;
  col: number;
  height: number;
  width: number;
  speed: Speed;
}) => {
  const makeWallAt = col + getRandomInt(0, width - 1) * 2 + 1; // Determine the column to place the wall
  const makePassageAt = row + getRandomInt(0, height) * 2; // Determine the row to leave a passage

  for (let i = 0; i < 2 * height - 1; i += 1) {
    // Create the vertical wall
    if (makePassageAt !== row + i) {
      if (
        !isStartOrEndTile(row + i, makeWallAt) // Check if the current tile is not the start/end tile
      ) {
        setAndStyleTile({
          grid, 
          row: row + i,
          col: makeWallAt,
          isWall: true,
          animate: true
        })
        await sleep(speed * 15); // Wait for animation
      }
    }
  }

  // Recursively divide the sections to the left and right of the wall
  recurse({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width: (makeWallAt - col + 1) / 2,
    speed,
  });
  recurse({
    grid,
    startTile,
    endTile,
    row,
    col: makeWallAt + 1,
    height,
    width: width - (makeWallAt - col + 1) / 2,
    speed,
  });
}

const horizontalDivision = async ({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  speed,
}: {
  grid: Grid;
  startTile: Tile;
  endTile: Tile;
  row: number;
  col: number;
  height: number;
  width: number;
  speed: Speed;
}) => {
  const makeWallAt = row + getRandomInt(0, height - 1) * 2 + 1; // Determine the row to place the wall
  const makePassageAt = col + getRandomInt(0, width) * 2; // Determine the column to leave a passage

  for (let i = 0; i < 2 * width - 1; i += 1) {
    // Create the horizontal wall
    if (makePassageAt !== col + i) {
      if (
        !isStartOrEndTile(makeWallAt, col + i) // Check if the current tile is not the start tile
      ) {
        setAndStyleTile({
          grid,
          row: makeWallAt,
          col: col + i,
          isWall: true,
          animate: true
        })
        await sleep(speed * 15); // Wait for animation
      }
    }
  }

  // Recursively divide the sections above and below the wall
  recurse({
    grid,
    startTile,
    endTile,
    row,
    col,
    height: (makeWallAt - row + 1) / 2,
    width,
    speed,
  });
  recurse({
    grid,
    startTile,
    endTile,
    row: makeWallAt + 1,
    col,
    height: height - (makeWallAt - row + 1) / 2,
    width,
    speed,
  });
}

export default recursiveDivision;