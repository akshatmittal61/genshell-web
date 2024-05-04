import jwt from "jsonwebtoken";
import { jwtSecret } from "@/config";
import { ApiRequest, ApiResponse } from "@/types/api";

const authMiddleware =
	(next: Function) => (req: ApiRequest, res: ApiResponse) => {
		// get x-auth-token from header
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: "Login to continue" });
		}
		try {
			const decoded: any = jwt.verify(token, jwtSecret);
			req.user = decoded;
			return next(req, res);
		} catch (err) {
			return res.status(401).json({ message: "Login to continue" });
		}
	};

export default authMiddleware;
