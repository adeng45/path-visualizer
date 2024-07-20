import { Grid, Speed, Tile } from "./types"
import { 
  START_TILE_STYLE, 
  END_TILE_STYLE, 
  WALL_TILE_STYLE,
  PATH_TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  TILE_STYLE,
  MAX_ROWS, 
  MAX_COLS, 
  SPEEDS } 
from "./constants"


// Sleep for ns nanoseconds
export const sleep = (ns: number) => {
  return new Promise(resolve => setTimeout(resolve, ns));
}

// Determine ns to sleep given speed, row, and column
// Numbers come from trial and observation
export const delayAmount = (speed: Speed, row: number, col: number, offset: number=0) => {
  const delay = 8 * SPEEDS.find(s => s.value === speed)!.value - 1;
  return delay * (col + (MAX_ROWS / 2) * row) + offset;
}

// Executed the provided function after a delay that is directly proportional to row & col
export const delayedExecute = ({
  f, 
  speed, 
  row, 
  col,
  offset=0,
  fixedAmount=0
} : {
  f: () => void, 
  speed: Speed,
  row: number,
  col: number,
  offset?: number,
  fixedAmount?: number
}) => {
  let sleepTime: number;
  if (fixedAmount) {
    sleepTime = fixedAmount;
  }
  else {
    sleepTime = delayAmount(speed, row, col, offset); 
  }
  return setTimeout(() => {
    f();
  }, sleepTime);
}

// Returns integer 1 or 0 at random
export const coinflip = () => {
  return Math.round(Math.random());
}

// Get a random integer between [min, max)
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


