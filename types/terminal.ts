export type TShell = "bash" | "cmd" | "powershell" | "sh" | "zsh";

export type TOperatingSystem = "linux" | "mac" | "windows";

export interface ITab {
	id: string;
	name: string;
	os: TOperatingSystem;
	shell: TShell;
}

export interface IHistory {
	id: string;
	query: string;
	os: TOperatingSystem;
	state: "success" | "error" | "cancelled";
	output: string;
	tab: string;
}
