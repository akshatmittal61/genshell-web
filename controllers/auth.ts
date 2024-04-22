import { RESPONSE_MESSAGES } from "@/constants/enum";
import { authService } from "@/services";
import { ApiRequest, ApiResponse } from "@/types/api";

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
			data: user,
		});
	} catch (error) {
		// console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};
