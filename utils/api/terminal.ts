import http, { app } from "../http";
import { TOperatingSystem } from "@/types/terminal";

export const requestCommandForQuery = async (
	query: string,
	os: TOperatingSystem
) => {
	try {
		if (query === "\\help") {
			return Promise.resolve({
				data: "\\logout: Logout of your profile\n\\profile: View your profile",
			});
		} else if (query === "\\logout") {
			await app.post("/auth/logout");
			return Promise.resolve({
				data: "Logged out succesfuly",
			});
		} else if (query === "\\profile") {
			const res = await app.get("/auth/profile");
			return Promise.resolve({
				data: JSON.stringify(res.data.data, null, 2),
			});
		}
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
