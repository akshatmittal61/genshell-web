import { IHistory } from "@/types/terminal";
import { useState } from "react";

const useContextData = () => {
	const [history, setHistory] = useState<IHistory[]>([]);

	const handleHistory = (data: IHistory[]) => {
		setHistory(data);
	};

	return {
		history,
		setHistory: handleHistory,
	};
};

export default useContextData;
