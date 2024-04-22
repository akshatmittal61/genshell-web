import { appBackendBaseUrl, backendBaseUrl } from "@/constants/variables";
import axios from "axios";

const http = axios.create({
	baseURL: backendBaseUrl,
});

export const app = axios.create({
	baseURL: appBackendBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export default http;
