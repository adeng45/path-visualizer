import { ReactNode, createContext, useState } from "react";
import { Algorithm, Maze, Grid } from "../utils/types"
import { initGrid } from "../utils/gridFunctions";
import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";

export interface PathfindingContextInterface {
  algorithm: Algorithm
  setAlgorithm: (algorithm: Algorithm) => void;
  maze: Maze;
  setMaze: (maze: Maze) => void;
  grid: Grid;
  setGrid: (grid: Grid) => void;
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void
}

export const PathfindingContext = createContext<PathfindingContextInterface | undefined>(undefined);

export const PathfindingProvider = ({children} : {children: ReactNode}) => {
  const [algorithm, setAlgorithm] = useState<Algorithm>("DIJKSTRA");
  const [maze, setMaze] = useState<Maze>("NONE");
  const [grid, setGrid] = useState<Grid>(initGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION));
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  return (
    <PathfindingContext.Provider 
      value={{
        algorithm,
        setAlgorithm,
        maze,
        setMaze,
        grid,
        setGrid,
        isGraphVisualized,
        setIsGraphVisualized
      }}  
    >
      {children}
    </PathfindingContext.Provider>
  )

}