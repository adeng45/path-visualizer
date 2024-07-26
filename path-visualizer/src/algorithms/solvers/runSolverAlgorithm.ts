import { Grid, Tile, Algorithm, Speed } from "../../utils/types";
import { animatePath } from "../../utils/gridFunctions";
import BFS from "./BFS";
import DFS from "./DFS";
import dijkstra from "./dijkstra";
import aStar from "./aStar";

const runSolverAlgorithm = async (algorithm: Algorithm, grid: Grid, startTile: Tile, endTile: Tile, speed: Speed) => {
  let traversedTiles: Tile[];
  let path: Tile[];
  
  switch (algorithm) {
    case "DIJKSTRA": {
      (
        { traversedTiles, path } = dijkstra(grid, startTile, endTile)
      );
      break;
    }

    case "BFS": {
      (
        { traversedTiles, path } = BFS(grid, startTile, endTile)
      );
      break;
    }

    case "DFS": {
      (
        { traversedTiles, path } = DFS(grid, startTile, endTile)
      );
      break;
    }

    case "A*": {
      (
        { traversedTiles, path } = aStar(grid, startTile, endTile)
      );
      break;
    }
  }

  await animatePath(grid, traversedTiles, path, startTile, endTile, speed);

}


export default runSolverAlgorithm;