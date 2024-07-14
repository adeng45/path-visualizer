import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedContextProvider } from "./context/SpeedContext"
import { TileContextProvider } from "./context/TileContext"
import { Grid } from "./components/Grid"
import { useRef } from "react"

function App() {
  const isVisualizationRunningRef = useRef(false);

  return (
    <>
      <PathfindingProvider>
        <TileContextProvider>
          <SpeedContextProvider>
            <Grid isVisualizationRunningRef={isVisualizationRunningRef}/>
          </SpeedContextProvider>
        </TileContextProvider>
      </PathfindingProvider>
    </>
  )
}

export default App
