import { Speed, Grid, Tile } from "./types"
import { 
  MAX_ROWS,
  MAX_COLS, 
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

const retrieveHeuristicCost = (currentTile: Tile, endTile: Tile) => {
  const manhattanDistance = 1; // Define the constant multiplier for Manhattan distance
  const r = Math.abs(currentTile.row - endTile.row); // Calculate the absolute difference in rows between the current tile and the end tile
  const c = Math.abs(currentTile.col - endTile.col); // Calculate the absolute difference in columns between the current tile and the end tile
  return manhattanDistance * (r + c); // Return the Manhattan distance (sum of row and column differences)
};

export const initHeuristicCost = (grid: Grid, endTile: Tile) => {
  const heuristicCost = []; // Initialize an empty array to store heuristic costs
  for (let i = 0; i < MAX_ROWS; i += 1) {
    // Loop through each row in the grid
    const row = []; // Initialize an empty array to store heuristic costs for the current row
    for (let j = 0; j < MAX_COLS; j += 1) {
      // Loop through each column in the current row
      row.push(retrieveHeuristicCost(grid[i][j], endTile)); // Calculate and add the heuristic cost for the current tile
    }
    heuristicCost.push(row); // Add the row of heuristic costs to the heuristicCost array
  }
  return heuristicCost; // Return the 2D array of heuristic costs
};

export const initFunctionCost = () => {
  const functionCost = []; // Initialize an empty array to store function costs
  for (let i = 0; i < MAX_ROWS; i += 1) {
    // Loop through each row in the grid
    const row = []; // Initialize an empty array to store function costs for the current row
    for (let j = 0; j < MAX_COLS; j += 1) {
      // Loop through each column in the current row
      row.push(Infinity); // Set the initial function cost for each tile to Infinity
    }
    functionCost.push(row); // Add the row of function costs to the functionCost array
  }
  return functionCost; // Return the 2D array of function costs
};