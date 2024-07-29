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

  return (
    <div
      className={tileStyle}
      id={`${row}-${col}`}
      onMouseDown={(e) => {
        // To prevent drag-event from firing
        e.preventDefault();
        handleMouseDown();
      }}
      onMouseEnter={() => handleMouseEnter()}
      onMouseUp={() => handleMouseUp()}
    />
  );
}