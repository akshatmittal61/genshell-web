import { TOperatingSystem, TShell } from "@/types/terminal";
import { AiOutlineWindows } from "react-icons/ai";
import { TfiApple } from "react-icons/tfi";
import { VscTerminalLinux } from "react-icons/vsc";

export const operatingSystems: {
	id: TOperatingSystem;
	icon: any;
	name: string;
	shell: TShell;
}[] = [
	{
		id: "linux",
		icon: <VscTerminalLinux />,
		name: "Linux",
		shell: "bash",
	},
	{
		id: "mac",
		icon: <TfiApple />,
		name: "Mac",
		shell: "zsh",
	},
	{
		id: "windows",
		icon: <AiOutlineWindows />,
		name: "Windows",
		shell: "cmd",
	},
];
