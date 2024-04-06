import { TOperatingSystem, TShell } from "@/types/terminal";

export const operatingSystems: {
	id: TOperatingSystem;
	name: string;
	shell: TShell;
}[] = [
	{
		id: "linux",
		name: "Linux",
		shell: "bash",
	},
	{
		id: "mac",
		name: "Mac",
		shell: "bash",
	},
	{
		id: "windows",
		name: "Windows",
		shell: "cmd",
	},
];
