import { operatingSystems } from "@/constants/terminal";
import { IHistory, ITab, TShell } from "@/types/terminal";
import { useState } from "react";

const useContextData = () => {
	const [history, setHistory] = useState<IHistory[]>([]);
	const [tabs, setTabs] = useState<ITab[]>([
		{
			id: "0",
			name: "Terminal",
			shell: "bash",
			os: "linux",
		},
	]);

	const handleHistory = (data: IHistory[]) => {
		setHistory(data);
	};

	const addToHistory = (data: IHistory) => {
		setHistory((prev) => [...prev, data]);
	};

	const handleTabs = (data: ITab[]) => {
		setTabs(data);
	};

	const createTab = (name: string, shell: TShell): ITab => {
		const newTab: ITab = {
			id: `${tabs.length}`,
			name,
			shell,
			os:
				operatingSystems.find((os) => os.shell === shell)?.id ||
				"linux",
		};
		setTabs((prev) => [...prev, newTab]);
		return newTab;
	};

	const removeTab = (id: string) => {
		setTabs((prev) => prev.filter((tab) => tab.id !== id));
		setHistory((prev) => prev.filter((item) => item.tab !== id));
	};

	return {
		history,
		setHistory: handleHistory,
		addToHistory,
		tabs,
		setTabs: handleTabs,
		createTab,
		removeTab,
	};
};

export default useContextData;
