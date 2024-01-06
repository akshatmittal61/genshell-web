import { IHistory } from "@/types/terminal";
import { createContext } from "react";

const GlobalContext = createContext({
	history: [],
	setHistory: (_: IHistory[]) => {},
	addToHistory: (_: IHistory) => {},
});

export default GlobalContext;
