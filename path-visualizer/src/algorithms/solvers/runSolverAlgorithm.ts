import { Grid, Tile, Algorithm, Speed } from "../../utils/types";
import { animatePath } from "../../utils/gridFunctions";
import { sleep } from "../../utils/miscFunctions";
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

  animatePath(traversedTiles, path, startTile, endTile, speed);

  // Wait for animations to conclude
  // await sleep(8 * (traversedTiles.length + 8 * 2) + 30 * (path.length + 60) * speed);
  await sleep((8 * traversedTiles.length * speed) + (30 * path.length * speed));
}


export default runSolverAlgorithm;