import { useState } from "react";
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

export const Nav = () => {

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);
  const { grid, setGrid, maze, setMaze, algorithm, setAlgorithm } = usePathfinding();
  const { speed, setSpeed } = useSpeed();
  const { startTile, endTile } = useTile();

  const handleRunAlgorithm = async (algorithm: Algorithm) => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid(grid, startTile, endTile);
    }

    setAlgorithm(algorithm);
    setIsDisabled(true);

    await runSolverAlgorithm(algorithm, grid, startTile, endTile, speed);

    setGrid(grid.slice());
    setIsDisabled(false);
    setIsGraphVisualized(true);

  }

  const handleGenerateMaze = async (maze: Maze) => {

    resetGrid(grid, startTile, endTile);

    setMaze(maze)
    setIsDisabled(true);

    await runMazeAlgorithm(maze, grid, startTile, endTile, speed);

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
          options={MAZES}
          onChange={(e) => handleGenerateMaze(e.target.value as Maze) }
          // onChange={(e) => console.log(e.target.value)} 
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
        <PlayButton isGraphVisualized={isGraphVisualized} handleRunAlgorithm={() => handleRunAlgorithm(algorithm)} isDisabled={isDisabled} />
      </div>
    </div>
  );
}