import { IHistory, ITab, TShell } from "@/types/terminal";
import { User } from "@/types/user";
import { createContext } from "react";

const GlobalContext = createContext({
	history: [] as IHistory[],
	setHistory: (_: IHistory[]) => {},
	addToHistory: (_: IHistory) => {},
	tabs: [] as ITab[],
	setTabs: (_: ITab[]) => {},
	createTab: (_: string, __: TShell) => {
		return {} as ITab;
	},
	removeTab: (_: string) => {},
	user: null as User | null,
	setUser: (_: User) => {},
	logout: () => {},
});

export default GlobalContext;
