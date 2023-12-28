import React from "react";
import { useRouter } from "next/router";
import { Button, Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import styles from "@/styles/pages/Home.module.scss";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	const router = useRouter();
	return (
		<main className={classes("")}>
			<Typography size="head-1" as="h1" weight="semi-bold">
				GenShell - Your AI powered shell companion
			</Typography>
			<Typography size="lg" as="p">
				Unleash the power of AI in your own shell and master the CLI like never before.
			</Typography>
			<Button onClick={() => router.push("/500")} variant="filled">
				Check out Error Boundary
			</Button>
		</main>
	);
};

export default HomePage;
