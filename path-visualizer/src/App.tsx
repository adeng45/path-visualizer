import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedContextProvider } from "./context/SpeedContext"
import { TileContextProvider } from "./context/TileContext"
import { Grid } from "./components/Grid"
import { Nav } from "./components/Nav"
import { useRef } from "react"

function App() {

  const isVisualizationRunningRef = useRef<boolean>(false);

  return (
    <>
      <PathfindingProvider>
        <TileContextProvider>
          <SpeedContextProvider>
          <div className="h-screen w-screen overflow-auto bg-[#131416]">
            <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
            <Grid isVisualizationRunningRef={isVisualizationRunningRef}  />
          </div>
          </SpeedContextProvider>
        </TileContextProvider>
      </PathfindingProvider>
    </>
  )
}

export default App
