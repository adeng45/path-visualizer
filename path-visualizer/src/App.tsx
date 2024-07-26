import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedContextProvider } from "./context/SpeedContext"
import { TileContextProvider } from "./context/TileContext"
import { Grid } from "./components/Grid"
import { Nav } from "./components/Nav"

function App() {

  return (
    <>
      <PathfindingProvider>
        <TileContextProvider>
          <SpeedContextProvider>
          <div className="h-screen w-screen">
            <Nav />
            <Grid />
          </div>
          </SpeedContextProvider>
        </TileContextProvider>
      </PathfindingProvider>
    </>
  )
}

export default App
