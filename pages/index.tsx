import Terminal from "@/components/Terminal";
import useStore from "@/hooks/store";
import { Typography } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
import { stylesConfig } from "@/utils/functions";
import React, { useState } from "react";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	const [terminalViewState, setTerminalViewState] = useState<
		"open" | "close" | "minimized"
	>("open");

	const { setHistory } = useStore();

	return (
		<main className={classes("")}>
			<section className={classes("-main")}>
				<Typography size="head-2" weight="bold" as="h1">
					Generate. Refine. Build
				</Typography>
				<Typography size="sm" as="span">
					Unleash the power of AI in your own shell and master the CLI
					like never before.
				</Typography>
				<Terminal
					viewState={terminalViewState}
					onClose={() => {
						if (terminalViewState === "close") return;
						setTerminalViewState("close");
						setHistory([]);
					}}
					onMinimize={() => {
						if (terminalViewState === "minimized")
							setTerminalViewState("open");
						else setTerminalViewState("minimized");
					}}
				/>
			</section>
		</main>
	);
};

export default HomePage;
