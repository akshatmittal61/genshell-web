import Terminal from "@/components/Terminal";
import useStore from "@/hooks/store";
import { Typography } from "@/library";
import styles from "@/styles/pages/Home.module.scss";
import { User } from "@/types/user";
import { authApi } from "@/utils/api";
import { stylesConfig } from "@/utils/functions";
import React, { useEffect, useState } from "react";

interface HomePageProps {
	user: User | null;
}

const classes = stylesConfig(styles, "home");

const HomePage: React.FC<HomePageProps> = ({ user }) => {
	const [terminalViewState, setTerminalViewState] = useState<
		"open" | "close" | "minimized"
	>("open");

	const { setHistory, setUser } = useStore();

	useEffect(() => {
		if (user) setUser(user);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

export const getServerSideProps = async (
	context: any
): Promise<{ props: HomePageProps }> => {
	const { req } = context;
	const token = req.cookies.token;
	if (!token) {
		return {
			props: { user: null },
		};
	}
	try {
		const res = await authApi.verifyUserIfLoggedIn({
			cookie: req.headers.cookie,
		});
		return {
			props: {
				user: res.data,
			},
		};
	} catch (error: any) {
		return {
			props: { user: null },
		};
	}
};
