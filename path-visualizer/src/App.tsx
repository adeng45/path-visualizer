import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedContextProvider } from "./context/SpeedContext"
import { TileContextProvider } from "./context/TileContext"
import { Grid } from "./components/Grid"
import { useRef } from "react"
import { Nav } from "./components/Nav"

function App() {

  return (
    <>
      <PathfindingProvider>
        <TileContextProvider>
          <SpeedContextProvider>
            <Nav />
            <Grid />
          </SpeedContextProvider>
        </TileContextProvider>
      </PathfindingProvider>
    </>
  )
}

export default App
