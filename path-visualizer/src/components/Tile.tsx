import { twMerge } from "tailwind-merge";
import {
  getTileStyle
} from "../utils/tileFunctions"

interface MouseFunction {
  (): void
}

export const Tile = ({
  row,
  col,
  isStart,
  isEnd,
  isTraversed,
  isWall,
  isPath,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  handleMouseDown: MouseFunction,
  handleMouseEnter: MouseFunction,
  handleMouseUp: MouseFunction
}) => {
  
  const tileStyle = getTileStyle({
    isStart,
    isEnd,
    isWall,
    isPath,
    isTraversed,
    animate: true
  })

  // const borderStyle =
  //   row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  // const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={twMerge(tileStyle)}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      onMouseUp={() => handleMouseUp()}
    />
  );
}