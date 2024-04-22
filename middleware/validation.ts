import regex from "@/constants/regex";
import { ApiRequest, ApiResponse } from "@/types/api";
import { getNonEmptyString, safeParse } from "@/utils/safety";

export const email =
	(next: Function) => (req: ApiRequest, res: ApiResponse) => {
		try {
			const email = safeParse(getNonEmptyString, req.body.email);
			if (!email)
				return res.status(400).json({ message: "Email is required" });
			if (!regex.email.test(email))
				return res
					.status(400)
					.json({ message: "Invalid email provided" });
			next(req, res);
		} catch (error: any) {
			console.error(error);
			if (error.message.toLowerCase().startsWith("invalid input")) {
				return res
					.status(400)
					.json({ message: "Please provide a valid email" });
			}
			return res.status(500).json({ message: "Internal Server Error" });
		}
	};

export const password =
	(next: Function) => (req: ApiRequest, res: ApiResponse) => {
		try {
			const password = safeParse(getNonEmptyString, req.body.password);
			if (!password)
				return res
					.status(400)
					.json({ message: "Password is required" });
			if (password.length < 6)
				return res.status(400).json({
					message: "Password should be atleast 6 characters long",
				});
			next(req, res);
		} catch (error: any) {
			console.error(error);
			if (error.message.toLowerCase().startsWith("invalid input")) {
				return res
					.status(400)
					.json({ message: "Please provide a valid password" });
			}
			return res.status(500).json({ message: "Internal Server Error" });
		}
	};

export const phone =
	(next: Function) => (req: ApiRequest, res: ApiResponse) => {
		try {
			const phone = safeParse(getNonEmptyString, req.body.phone);
			if (!phone)
				return res.status(400).json({ message: "Phone is required" });
			if (!regex.phone.test(phone))
				return res
					.status(400)
					.json({ message: "Invalid phone provided" });
			next(req, res);
		} catch (error: any) {
			console.error(error);
			if (error.message.toLowerCase().startsWith("invalid input")) {
				return res
					.status(400)
					.json({ message: "Please provide a valid phone" });
			}
			return res.status(500).json({ message: "Internal Server Error" });
		}
	};
