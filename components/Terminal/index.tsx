import React, { useState } from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { TOperatingSystem } from "@/types/terminal";
import { Typography } from "@/library";
import { operatingSystems } from "@/constants/terminal";
import { ArrowRight, Minus, X } from "react-feather";

interface ITerminalProps {
	viewState: "open" | "close" | "minimized";
	onClose: () => void;
	onMinimize: () => void;
}

const classes = stylesConfig(styles, "terminal");

const Terminal: React.FC<ITerminalProps> = ({
	viewState,
	onClose,
	onMinimize,
}) => {
	const [inputQuery, setInputQuery] = useState("");
	const [activeOperatingSystem] = useState<TOperatingSystem>("linux");

	return (
		<main
			className={classes("", {
				"--minimized": viewState === "minimized",
				"--close": viewState === "close",
			})}
			data-aos="fade-up"
			data-aos-duration="1000"
		>
			<div className={classes("-header")}>
				<Typography size="lg" className={classes("-header-system")}>
					{
						operatingSystems.find(
							(os) => os.id === activeOperatingSystem
						)?.name
					}
				</Typography>
				<Typography size="xl" className={classes("-header-title")}>
					Window 1
				</Typography>
				<div className={classes("-header-buttons")}>
					<button
						onClick={onMinimize}
						className={classes(
							"-header-button",
							"-header-button--minimize"
						)}
					>
						<Minus />
					</button>
					<button
						onClick={onClose}
						className={classes(
							"-header-button",
							"-header-button--close"
						)}
					>
						<X />
					</button>
				</div>
			</div>
			<section className={classes("-body")}>
				<form className={classes("-form")}>
					<div className={classes("-form-group")}>
						<ArrowRight />
						<input
							value={inputQuery}
							onChange={(e: any) => setInputQuery(e.target.query)}
						/>
					</div>
					<button className="dispn" type="submit" />
				</form>
			</section>
		</main>
	);
};

export default Terminal;
