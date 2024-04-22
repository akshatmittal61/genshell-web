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

export const register = async ({
	name,
	email,
	password,
}: {
	name: string;
	email: string;
	password: string;
}): Promise<{
	message: string;
	data: User;
}> => {
	try {
		const response = await app.post("/auth/register", {
			email,
			password,
			name,
		});
		return Promise.resolve(response.data);
	} catch (error: any) {
		return Promise.reject(error.response.data);
	}
};

export const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<{
	message: string;
	data: User;
}> => {
	try {
		const response = await app.post("/auth/login", {
			email,
			password,
		});
		return Promise.resolve(response.data);
	} catch (error: any) {
		return Promise.reject(error.response.data);
	}
};
