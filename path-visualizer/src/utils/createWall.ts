import { Tile, Speed } from "./types"
import { MAX_COLS, MAX_ROWS, SPEEDS, WALL_TILE_STYLE } from "./constants"
import { isStartOrEnd } from "./helpers";

export const createWall = (
  speed: Speed
) => {
  const delay = 6 * SPEEDS.find(s => s.value === speed)!.value - 1;

  for (let row = 0; row < MAX_ROWS; row++) {
    setTimeout(() => {
      for (let col = 0; col < MAX_COLS; col++) {
        if (row % 2 === 0 || col % 2 === 0) {
          if (!isStartOrEnd(row, col)) {
            setTimeout(() => {
              document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`
            }, delay * col)
          }
        }
      }
    }, delay * (MAX_ROWS / 2) * row)
  }

}