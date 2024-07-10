import { useContext } from "react";
import { PathfindingContext } from "../context/PathfindingContext";

// Strangely enough, we need to put "export" in the interface PathFindingInterface 
// to avoid compiler complaining.
export const usePathfinding = () => {
  const pathFindingInfo = useContext(PathfindingContext);

  if (!pathFindingInfo) {
    throw new Error("Cannot access pathFindingInfo in this scope");
  }

  return pathFindingInfo;
}