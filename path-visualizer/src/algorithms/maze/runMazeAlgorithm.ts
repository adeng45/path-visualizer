import { Grid, Maze, Speed, Tile } from "../../utils/types";
import { resetGrid } from "../../utils/gridFunctions";
import binaryTree from "./binaryTree";
import recursiveDivision from "./recursiveDivision";

const runMazeAlgorithm = async (maze: Maze, grid: Grid, startTile: Tile, endTile: Tile, speed: Speed) => {

  switch (maze) {
    case "NONE": {
      resetGrid({
        grid, 
        startTile, 
        endTile
      });
      break;
    }
    case "BINARY_TREE": {
      await binaryTree(grid, speed);
      break;
    }
    case "RECURSIVE_DIVISION": {
      await recursiveDivision(grid, startTile, endTile, speed);
      break;
    }
  }
}

export default runMazeAlgorithm;