import { useState, useEffect } from "react"

export const useIsMouseDown = () => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("mouseup", () => {
      setIsMouseDown(false);
    }, { once: true });
  }, [isMouseDown]);

  return [isMouseDown, setIsMouseDown] as const;
}