import { RESPONSE_MESSAGES } from "@/constants/enum";
import { feedbackService } from "@/services";
import { ApiRequest, ApiResponse } from "@/types/api";

export const createFeedback = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const userId = req.user?.id;
		console.log(req.user);
		if (!userId)
			return res.status(401).json({ message: "Login to give feedback" });
		const message = req.body;
		console.log(req.body);
		const createdFeedback = await feedbackService.create({
			message,
			user: userId,
		});
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: createdFeedback,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};
