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
  SPEEDS, 
  DELAY_CONSTANT,
} 
from "./constants"


// Sleep for ns nanoseconds
export const sleep = (ns: number) => {
  return new Promise(resolve => setTimeout(resolve, ns));
}

// Determine ns to sleep given speed, row, and column
// Numbers come from trial and observation
export const delayAmount = (speed: Speed, row: number, col: number, offset: number=0) => {
  const delay = DELAY_CONSTANT * speed - 1;
  return delay * (col + (MAX_COLS / 3) * row) + offset;
}

interface delayInfo {
  speed: Speed,
  row: number,
  col: number,
  offset?: number,
}

// Executed the provided function after a delay that is directly proportional to row & col
export const delayedExecute = ({
  f,
  delayInfo,
  fixedAmount=0,
  print=false
} : {
  f: () => void, 
  delayInfo?: delayInfo,
  fixedAmount?: number,
  print?: boolean
}) => {
  let sleepTime: number;
  if (fixedAmount) {
    sleepTime = fixedAmount;
  }  
  else if (delayInfo) {
    const { speed, row, col, offset } = delayInfo;
    if (print) {
      console.log(row, col);
    }
    sleepTime = delayAmount(speed, row, col, offset); 
  }
  else {
    sleepTime = 0;
  }
  // if (print) {
  //   console.log(sleepTime);
  // }
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
