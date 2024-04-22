import { jwtSecret } from "@/config";
import { User } from "@/types/user";
import jwt from "jsonwebtoken";
import { userService } from ".";

export const authenticate = async (token: string): Promise<User | null> => {
	try {
		const decoded: any = jwt.verify(token, jwtSecret);
		const foundUser = await userService.find({ id: decoded.id });
		if (!foundUser) {
			return null;
		}
		return foundUser as User;
	} catch (error) {
		console.error(error);
		return null;
	}
};
