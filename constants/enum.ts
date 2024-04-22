export type T_RESPONSE_MESSAGES =
	| "SUCCESS"
	| "FAILED"
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "INTERNAL_SERVER_ERROR";

export const RESPONSE_MESSAGES: Record<T_RESPONSE_MESSAGES, string> = {
	SUCCESS: "Success",
	FAILED: "Failed",
	BAD_REQUEST: "Bad Request",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	NOT_FOUND: "Not Found",
	INTERNAL_SERVER_ERROR: "Internal Server Error",
};
