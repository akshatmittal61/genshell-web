import React, { useState } from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { TOperatingSystem } from "@/types/terminal";
import { Typography } from "@/library";
import { operatingSystems } from "@/constants/terminal";
import { ArrowRight, Minus, X } from "react-feather";
import { requestCommandForQuery } from "@/utils/api/terminal";
import toast from "react-hot-toast";

interface ITerminalProps {
	viewState: "open" | "close" | "minimized";
	onClose: () => void;
	onMinimize: () => void;
}

interface IQuery {
	input: string;
	state: "success" | "pending" | "error" | null;
	output: string;
}

const classes = stylesConfig(styles, "terminal");

const Terminal: React.FC<ITerminalProps> = ({
	viewState,
	onClose,
	onMinimize,
}) => {
	const [activeOperatingSystem] = useState<TOperatingSystem>("linux");
	const [query, setQuery] = useState<IQuery>({
		input: "",
		state: null,
		output: "",
	});

	const updateQuery = (updatedQuery: Partial<IQuery>) => {
		setQuery((p) => ({
			...p,
			...updatedQuery,
		}));
	};

	const submitQuery = async (e: any) => {
		e.preventDefault();
		try {
			updateQuery({ state: "pending" });
			const res = await requestCommandForQuery(query.input);
			updateQuery({ state: "success", output: res.data.toString() });
		} catch (error: any) {
			toast.error(error.response.data.data.toString());
			updateQuery({
				state: "error",
				output: error.response.data.data.toString(),
			});
		}
	};

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
				<form className={classes("-form")} onSubmit={submitQuery}>
					<div className={classes("-form-group")}>
						<ArrowRight />
						<input
							value={query.input}
							autoFocus
							onChange={(e: any) =>
								updateQuery({ input: e.target.value })
							}
						/>
					</div>
					<button className="dispn" type="submit" />
				</form>
				{query.state ? (
					<div className={classes("-result")}>
						{query.state === "pending" ? (
							<span className={classes("-result--pending")} />
						) : (
							<Typography
								size="md"
								className={classes(`-result--${query.state}`)}
							>
								{query.output}
							</Typography>
						)}
					</div>
				) : null}
			</section>
		</main>
	);
};

export default Terminal;
