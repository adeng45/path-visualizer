import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useSpeed } from "../hooks/useSpeed";
import { Select } from "./Select";
import { MAZES, ALGORITHMS, SPEEDS } from "../utils/constants";
import { Algorithm, Maze, Speed } from "../utils/types";
import { useTile } from "../hooks/useTile";
import { resetGrid } from "../utils/gridFunctions";
import { PlayButton } from "./PlayButton";
import runSolverAlgorithm from "../algorithms/solvers/runSolverAlgorithm";
import runMazeAlgorithm from "../algorithms/maze/runMazeAlgorithm";

export const Nav = ({
  isVisualizationRunningRef
} : {
  isVisualizationRunningRef: MutableRefObject<boolean>
}) => {

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);
  const { grid, setGrid, maze, setMaze, algorithm, setAlgorithm } = usePathfinding();
  const { speed, setSpeed } = useSpeed();
  const { startTile, endTile } = useTile();

  const handleRunAlgorithm = async (algorithm: Algorithm) => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({
        grid, 
        startTile, 
        endTile,
        keepWalls: true
      });
    }

    setAlgorithm(algorithm);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    await runSolverAlgorithm(algorithm, grid, startTile, endTile, speed);

    setGrid(grid.slice());
    setIsDisabled(false);
    setIsGraphVisualized(true);
    isVisualizationRunningRef.current = false;

  }

  const handleGenerateMaze = async (maze: Maze) => {

    resetGrid({
      grid, 
      startTile, 
      endTile,
    });

    setMaze(maze)
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    await runMazeAlgorithm(maze, grid, startTile, endTile, speed);

    setGrid(grid.slice());
    setIsDisabled(false);
    setIsGraphVisualized(false);
    isVisualizationRunningRef.current = false;

  }

  return (
    <div className="flex items-center justify-center pt-2 min-h-[4.5rem] shadow-gray-600 sm:px-5 sm:mt-0">
      <div className="flex flex-col items-center w-full pb-1 sm:w-[52rem] sm:flex-row sm:justify-between sm:items-end">
        {/* <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1> */}
        <div className="flex sm:flex-row sm:items-end sm:justify-start sm:space-x-4 space-y-3 flex-col">
          <Select
            label="Maze"
            options={MAZES}
            onChange={(e) => handleGenerateMaze(e.target.value as Maze)}
            isDisabled={isDisabled}
          />
          <Select
            label="Algorithm"
            options={ALGORITHMS}
            onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
            isDisabled={isDisabled}
          />
          <Select
            label="Speed"
            options={SPEEDS}
            onChange={(e) => setSpeed(Number(e.target.value) as Speed)}
            isDisabled={isDisabled}
          />
        </div>
        <h1 className="flex py-5 justify-center w-[40%] text-2xl sm:py-0 sm:justify-end">
          <PlayButton 
            isGraphVisualized={isGraphVisualized} 
            handleRunAlgorithm={() => handleRunAlgorithm(algorithm)} 
            isDisabled={isDisabled}
          />
        </ h1>
      </div>
    </div>
  );
}