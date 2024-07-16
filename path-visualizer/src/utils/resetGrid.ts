import {
  END_TILE_CONFIGURATION,
  MAX_COLS,
  MAX_ROWS,
  START_TILE_CONFIGURATION,
  TILE_STYLE,
} from "./constants";
import { isSameTile } from "./helpers";
import { Grid, Tile } from "./types";

export const resetGrid = (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
) => {
  const newGrid = grid.slice();

  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = newGrid[row][col];
      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
      tile.isWall = false;

      if (!isSameTile(startTile, tile) && !isSameTile(endTile, tile)) {
        const tileElement = document.getElementById(`${tile.row}-${tile.col}`);
        if (tileElement) {
          tileElement.className = TILE_STYLE;
        }
      }
    }
  }

  return newGrid;
};