import { NextApiHandler } from "next";
import { RESPONSE_MESSAGES } from "@/constants/enum";
import { db } from "@/db";
import { ApiRequest, ApiResponse } from "@/types/api";
import { authControllers } from "@/controllers";
import { validators } from "@/middleware";

const handler: NextApiHandler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await db.connect();
		const { method } = req;

		switch (method) {
			case "POST":
				return validators.email(
					validators.password(authControllers.register)
				)(req, res);
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
