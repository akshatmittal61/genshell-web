import { IHistory } from "@/types/terminal";
import { useState } from "react";

const useContextData = () => {
	const [history, setHistory] = useState<IHistory[]>([]);

	const handleHistory = (data: IHistory[]) => {
		setHistory(data);
	};

	const addToHistory = (data: IHistory) => {
		setHistory((prev) => [...prev, data]);
	};

	return {
		history,
		setHistory: handleHistory,
		addToHistory,
	};
};

export default useContextData;
