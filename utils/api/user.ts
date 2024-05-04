import { app } from "../http";

export const submitFeedback = async (message: string) => {
	try {
		const res = await app.post("/feedback", message);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
