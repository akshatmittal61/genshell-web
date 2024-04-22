import { RESPONSE_MESSAGES } from "@/constants/enum";
import { authService, userService } from "@/services";
import { ApiRequest, ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { omitKeys } from "@/utils/functions";
import bcrypt from "bcrypt";

export const verify = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res
				.status(401)
				.json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
		}
		const user = await authService.authenticate(token);
		if (!user) {
			return res
				.status(401)
				.json({ message: RESPONSE_MESSAGES.UNAUTHORIZED });
		}
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: omitKeys(user, ["password"]),
		});
	} catch (error) {
		// console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};
export const register = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { name, email, password } = req.body;
		let user = await userService.findOne({ email });
		if (user)
			return res.status(400).json({ message: "Email already in use" });
		const userBody: Omit<User, "id"> = {
			name,
			email,
			password: await bcrypt.hash(password, 10),
		};
		const createdUser = await userService.create(userBody);
		const token = authService.generateToken(`${createdUser.id}`);
		res.setHeader(
			"Set-Cookie",
			`token=${token}; HttpOnly; Path=/; Max-Age=${
				30 * 24 * 60 * 60 * 1000
			}; SameSite=None; Secure=true`
		);
		return res.status(201).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: omitKeys(createdUser, ["password"]),
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};

export const login = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { email, password } = req.body;
		let user = await userService.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ message: "Please register to continue" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });
		const token = authService.generateToken(`${user.id}`);
		res.setHeader(
			"Set-Cookie",
			`token=${token}; HttpOnly; Path=/; Max-Age=${
				30 * 24 * 60 * 60 * 1000
			}; SameSite=None; Secure=true`
		);
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: user,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};
