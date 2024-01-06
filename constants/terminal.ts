import { TOperatingSystem } from "@/types/terminal";

export const operatingSystems: {
	id: TOperatingSystem;
	name: string;
}[] = [
	{
		id: "linux",
		name: "Linux",
	},
	{
		id: "mac",
		name: "Mac",
	},
	{
		id: "windows",
		name: "Windows",
	},
];
