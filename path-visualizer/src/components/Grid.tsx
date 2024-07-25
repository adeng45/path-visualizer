import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState, useRef } from "react"; 
import { isStartOrEndTile } from "../utils/tileFunctions";
import { setTileInGrid } from "../utils/tileFunctions";

export const Grid = () => {

  const { grid, setGrid } = usePathfinding();
  const isMouseDownRef = useRef<boolean>(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isStartOrEndTile(row, col)) {
      return;
    }
    isMouseDownRef.current = true;
    setTileInGrid({
      grid, 
      row, 
      col, 
      isWall: true
    })
    setGrid(grid.slice());
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (isStartOrEndTile(row, col) || !isMouseDownRef.current) {
      return;
    }
    setTileInGrid({
      grid, 
      row, 
      col, 
      isWall: true
    })
    setGrid(grid.slice());
  }

  const handleMouseUp = (row: number, col: number) => {
    if (isStartOrEndTile(row, col)) {
      return;
    }
    isMouseDownRef.current = false;
  }

  return (
    <div
      className={twMerge(
        // Base classes
        "flex items-center flex-col justify-center borderborder-sky-300 mt-10 mb-10",
        // Control grid height
        `lg:min-h-[${MAX_ROWS * 17}px]  md:min-h-[${
          MAX_ROWS * 15
        }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
        // Controlling grid width
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
          MAX_COLS * 8
        }px] w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((r, rowIndex) => (
        <div key={rowIndex} className="flex">
          {r.map((tile, tileIndex) => {
            const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
              tile;
            return (
              <Tile
                key={row * MAX_COLS + col}
                row={tile.row}
                col={tile.col}
                isEnd={isEnd}
                isStart={isStart}
                isPath={isPath}
                isTraversed={isTraversed}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(row, col)}
                handleMouseEnter={() => handleMouseEnter(row, col)}
                handleMouseUp={() => handleMouseUp(row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}