import { NextApiHandler } from "next";
import { RESPONSE_MESSAGES } from "@/constants/enum";
import { ApiRequest, ApiResponse } from "@/types/api";

const handler: NextApiHandler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		const { method } = req;

		switch (method) {
			case "POST":
				return res
					.status(200)
					.json({ message: "Feedback submitted successfully" });
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
