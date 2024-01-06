import http from "../http";

export const requestCommandForQuery = async (query: string) => {
	try {
		const res = await http.post("/generate-command", {
			prompt: query,
		});
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
