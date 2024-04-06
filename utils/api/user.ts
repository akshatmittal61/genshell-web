import http from "../http";

export const submitFeedback = async (message: string) => {
	try {
		const res = await http.post("/feedback", { message });
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
