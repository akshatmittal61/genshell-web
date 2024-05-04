import { RESPONSE_MESSAGES } from "@/constants/enum";
import { feedbackControllers } from "@/controllers";
import authMiddleware from "@/middleware/auth";
import { ApiRequest, ApiResponse } from "@/types/api";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { method } = req;

		switch (method) {
			case "POST":
				return authMiddleware(feedbackControllers.createFeedback)(
					req,
					res
				);
			default:
				res.setHeader("Allow", ["POST"]);
				return res
					.status(405)
					.json({ message: "Method " + method + " Not Allowed" });
		}
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({
			message: error.message || RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};

export default handler;
