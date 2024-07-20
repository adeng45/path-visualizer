import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { Select } from "./Select";
import { MAX_COLS, MAX_ROWS, MAZES } from "../utils/constants";
import { Maze } from "../utils/types";
import { useTile } from "../hooks/useTile";
import binaryTree from "../algorithms/maze/binaryTree";
import recursiveDivision from "../algorithms/maze/recursiveDivision";
// import recursiveDivision from "../algorithms/maze/recursiveDivision"
import { resetGrid } from "../utils/gridFunctions";

export const Nav =({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) => {

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { grid, setGrid, maze, setMaze } = usePathfinding();
  const { startTile, endTile } = useTile();

  const handleGenerateMaze = async (maze: Maze) => {
    setMaze(maze)
    setIsDisabled(true);

    switch (maze) {
      case "NONE": {
        resetGrid(grid, startTile, endTile);
        break;
      }
      case "BINARY_TREE": {
        await binaryTree(grid, startTile, endTile, 0.5);
        console.log(grid);
        break;
      }
      case "RECURSIVE_DIVISION": {
        await recursiveDivision(grid, startTile, endTile, 0.5);
        break;
      }
    }
    
    console.log(grid);
    setGrid(grid.slice());
    setIsDisabled(false);

  }

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1>
        <Select
          label="Maze"
          value={maze}
          options={MAZES}
          onChange={(e) => handleGenerateMaze(e.target.value as Maze) }
          // onChange={(e) => console.log(e.target.value)} 
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}