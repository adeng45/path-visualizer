import { ReactNode, createContext, useState } from "react";
import { Tile } from "../utils/types"
import { START_TILE_CONFIGURATION, END_TILE_CONFIGURATION } from "../utils/constants";

export interface TileContextInterface {
  startTile: Tile,
  setStartTile: (startTile: Tile) => void,
  endTile: Tile,
  setEndTile: (startTile: Tile) => void,
}

export const TileContext = createContext<TileContextInterface | undefined>(undefined);

export const TileContextProvider = ({children}: {children: ReactNode}) => {
  const [startTile, setStartTile] = useState<Tile>(START_TILE_CONFIGURATION);
  const [endTile, setEndTile] = useState<Tile>(END_TILE_CONFIGURATION);

  return (
    <TileContext.Provider 
      value={{
        startTile,
        setStartTile,
        endTile,
        setEndTile
      }}
    >
      {children}
    </TileContext.Provider>
  )

}