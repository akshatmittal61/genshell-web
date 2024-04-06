import React from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

interface IHeaderProps {}

const classes = stylesConfig(styles, "header");

const Header: React.FC<IHeaderProps> = () => {
	return (
		<header className={classes("")}>
			<Link href="/" className={classes("-logo")}>
				<Image
					src="/favicon.png"
					alt="GenShell"
					width={500}
					height={500}
				/>
			</Link>
			<div className={classes("-actions")}>
				<Link href="/feedback">Feedback</Link>
				<button className={classes("-burger")}>
					<span
						className={classes("-burger-line", "-burger-line--1")}
					/>
					<span
						className={classes("-burger-line", "-burger-line--2")}
					/>
				</button>
			</div>
		</header>
	);
};

export default Header;
