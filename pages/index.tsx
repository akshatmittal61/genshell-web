import React, { useState } from "react";
import { Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import styles from "@/styles/pages/Home.module.scss";
import Terminal from "@/components/Terminal";
import useStore from "@/hooks/store";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	const [terminalViewState, setTerminalViewState] = useState<
		"open" | "close" | "minimized"
	>("open");

	const { setHistory } = useStore();

	return (
		<main className={classes("")}>
			<Typography size="head-3" as="h1" weight="semi-bold">
				GenShell - Your AI powered shell companion
			</Typography>
			<Terminal
				viewState={terminalViewState}
				onClose={() => {
					setTerminalViewState("close");
					setHistory([]);
				}}
				onMinimize={() => {
					setTerminalViewState("minimized");
				}}
			/>
		</main>
	);
};

export default HomePage;
