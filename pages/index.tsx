import React, { useState } from "react";
import { Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import styles from "@/styles/pages/Home.module.scss";
import Terminal from "@/components/Terminal";
import useStore from "@/hooks/store";
import Image from "next/image";
import Link from "next/link";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	const [terminalViewState, setTerminalViewState] = useState<
		"open" | "close" | "minimized"
	>("open");

	const { setHistory } = useStore();

	return (
		<main className={classes("")}>
			<header className={classes("-header")}>
				<Link href="/" className={classes("-header-logo")}>
					<Image
						src="/favicon.png"
						alt="GenShell"
						width={500}
						height={500}
					/>
				</Link>
				<div className={classes("-header-actions")}>
					<Link href="/feedback">Feedback</Link>
					<button className={classes("-header-burger")}>
						<span
							className={classes(
								"-header-burger-line",
								"-header-burger-line--1"
							)}
						/>
						<span
							className={classes(
								"-header-burger-line",
								"-header-burger-line--2"
							)}
						/>
					</button>
				</div>
			</header>
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
