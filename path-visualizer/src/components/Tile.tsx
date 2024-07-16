import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  MAX_ROWS,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";

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
  let tileTyleStyle;

  if (isStart) {
    tileTyleStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileTyleStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileTyleStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileTyleStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileTyleStyle = TRAVERSED_TILE_STYLE;
  } else {
    tileTyleStyle = TILE_STYLE;
  }

  // const borderStyle =
  //   row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  // const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={twMerge(tileTyleStyle)}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      onMouseUp={() => handleMouseUp()}
    />
  );
}