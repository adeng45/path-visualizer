import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { Select } from "./Select";
import { MAZES } from "../utils/constants";
import { Maze } from "../utils/types";
import { resetGrid } from "../utils/resetGrid";
import { useTile } from "../hooks/useTile";
import { binaryTree } from "../algorithms/maze/binaryTree";


export const Nav =({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) => {

  const [isDisabled, setIsDisabled] = useState<boolean>();
  const { grid, setGrid, maze, setMaze } = usePathfinding();
  const { startTile, endTile } = useTile();

  const handleGenerateMaze = (maze: Maze) => {
    // Use switch block
    if (maze === "NONE") {
      setGrid(resetGrid(grid, startTile, endTile));
    }

    if (maze === "BINARY_TREE") {
      binaryTree(grid, startTile, endTile, setIsDisabled, 2);
    }
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
        />
      </div>
    </div>
  );
}