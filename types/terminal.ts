export type TShell = "bash" | "cmd" | "powershell" | "sh" | "zsh";

export type TOperatingSystem = "linux" | "mac" | "windows";

export interface IHistory {
	query: string;
	os: TOperatingSystem;
	output: string;
}
