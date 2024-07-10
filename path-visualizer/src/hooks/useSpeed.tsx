import { useContext } from "react"
import { SpeedContext } from "../context/SpeedContext"

export const useSpeed = () => {
  const speedInfo = useContext(SpeedContext);

  if (!speedInfo) {
    throw new Error("Cannot access speedInfo in this scope");
  }

  return speedInfo;
}