import { IHistory } from "@/types/terminal";
import { createContext } from "react";

const GlobalContext = createContext({
	history: [] as IHistory[],
	setHistory: (_: IHistory[]) => {},
	addToHistory: (_: IHistory) => {},
});

export default GlobalContext;
