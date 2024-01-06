export type TShell = "bash" | "cmd" | "powershell" | "sh" | "zsh";

export type TOperatingSystem = "linux" | "mac" | "windows";

export interface IHistory {
	id: string;
	query: string;
	os: TOperatingSystem;
	state: "success" | "error" | "cancelled";
	output: string;
}
