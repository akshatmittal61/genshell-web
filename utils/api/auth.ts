import { User } from "@/types/user";
import { app } from "../http";

export const verifyUserIfLoggedIn = async (
	headers: any = {}
): Promise<{
	message: string;
	data: User;
}> => {
	try {
		const response = await app.get("/auth/verify", {
			headers: headers,
		});
		return Promise.resolve(response.data);
	} catch (error: any) {
		return Promise.reject(error.response.data);
	}
};
