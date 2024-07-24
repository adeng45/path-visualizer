import { isSameTile, getUntraversedNeighbors, isTileInQueue, retrievePath } from "../../utils/tileFunctions";
import { Grid, Tile } from "../../utils/types";

const DFS = (grid: Grid, startTile: Tile, endTile: Tile) => {
  const traversedTiles: Tile[] = []; // Initialize an array to store traversed tiles
  const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
  base.distance = 0; // Set the distance of the start tile to 0
  base.isTraversed = true; // Mark the start tile as traversed
  const unTraversed = [base]; // Initialize the queue with the start tile

  while (unTraversed.length) {
    // Continue while there are untraversed tiles
    const tile = unTraversed.pop() as Tile; // Get the LAST!! (DFS) tile from the queue
    if (tile.isWall) continue; // Skip if the tile is a wall
    tile.isTraversed = true; // Mark the tile as traversed
    traversedTiles.push(tile); // Add the tile to the traversed tiles array
    if (isSameTile(tile, endTile)) break; // Break if the tile is the end tile

    const neighbors = getUntraversedNeighbors(grid, tile); // Get untraversed neighbors of the tile
    for (let i = 0; i < neighbors.length; i += 1) {
      // Iterate through each neighbor
      if (!isTileInQueue(neighbors[i], unTraversed)) {
        // Check if the neighbor is not in the queue
        const nei = neighbors[i]; // Get the neighbor tile
        nei.distance = tile.distance + 1; // Update the neighbor's distance
        nei.parent = tile; // Set the neighbor's parent to the current tile
        unTraversed.push(nei); // Add the neighbor to the queue
      }
    }
  }

  const path = retrievePath(grid, startTile, endTile);
  return { traversedTiles, path }; // Return the traversed tiles and the path
};

export default DFS;