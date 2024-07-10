import { ReactNode, createContext, useState } from "react";
import { Speed } from "../utils/types"

export interface SpeedContextInterface {
	speed: Speed,
	setSpeed: (speed: Speed) => void;
}

export const SpeedContext = createContext<SpeedContextInterface | undefined>(undefined);

export const SpeedContextProvider = ({children}: {children: ReactNode}) => {
	const [speed, setSpeed] = useState<Speed>(1);

	return (
		<SpeedContext.Provider
			value={{
				speed,
				setSpeed
			}}
		>
			{children}
		</SpeedContext.Provider>
	)
}