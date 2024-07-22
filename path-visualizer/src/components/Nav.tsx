import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useSpeed } from "../hooks/useSpeed";
import { Select } from "./Select";
import { MAX_COLS, MAX_ROWS, MAZES, ALGORITHMS, SPEEDS } from "../utils/constants";
import { Algorithm, Maze, Speed, Tile } from "../utils/types";
import { useTile } from "../hooks/useTile";
import binaryTree from "../algorithms/maze/binaryTree";
import recursiveDivision from "../algorithms/maze/recursiveDivision";
import { resetGrid, animatePath } from "../utils/gridFunctions";
import BFS from "../algorithms/solvers/BFS";

export const Nav =({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) => {

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);
  const { grid, setGrid, maze, setMaze, algorithm, setAlgorithm } = usePathfinding();
  const { speed, setSpeed } = useSpeed();
  const { startTile, endTile } = useTile();

  const handleRunAlgorithm = async (algorithm: Algorithm) => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid(grid, startTile, endTile);
      setGrid(grid.slice());
      return;
    }

    // switch (algorithm) {
    //   case "DIJKSTRA": {
    //     break;
    //   }

    const { traversedTiles, path } = BFS(
      grid,
      startTile,
      endTile,
    );

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    }, 8 * (traversedTiles.length + 8 * 2) + 30 * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value);
  }

  const handleGenerateMaze = async (maze: Maze) => {
    setMaze(maze)
    setIsDisabled(true);

    switch (maze) {
      case "NONE": {
        resetGrid(grid, startTile, endTile);
        break;
      }
      case "BINARY_TREE": {
        await binaryTree(grid, startTile, endTile, speed);
        break;
      }
      case "RECURSIVE_DIVISION": {
        await recursiveDivision(grid, startTile, endTile, speed);
        break;
      }
    }
    
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
        <Select
          label="Algorithm"
          value={algorithm}
          options={ALGORITHMS}
          onChange={(e) => handleRunAlgorithm(e.target.value as Algorithm)}
          isDisabled={isDisabled}
        />
        <Select
          label="Speed"
          value={speed}
          options={SPEEDS}
          onChange={(e) => setSpeed(Number(e.target.value) as Speed)}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}