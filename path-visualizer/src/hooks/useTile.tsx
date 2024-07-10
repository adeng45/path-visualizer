import { useContext } from "react"
import { TileContext} from "../context/TileContext"

export const useTile = () => {
  const tileInfo = useContext(TileContext);

  if (!tileInfo) {
    throw new Error("Cannot access tileInfo in this scope");
  }

  return tileInfo;
}