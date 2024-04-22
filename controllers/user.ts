import { RESPONSE_MESSAGES } from "@/constants/enum";
import UserModel from "@/models/User";
import { ApiRequest, ApiResponse } from "@/types/api";

export const getAllUsers = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const allUsers = await UserModel.find()
			.select("-password")
			.sort({ createdAt: -1 });
		return res.status(200).json({ data: allUsers });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};
