import http from "../http";
import { TOperatingSystem } from "@/types/terminal";

export const requestCommandForQuery = async (
	query: string,
	os: TOperatingSystem
) => {
	try {
		const res = await http.post("/generate", {
			input: query,
			os,
		});
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
