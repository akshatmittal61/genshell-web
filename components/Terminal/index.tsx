import React, { useRef, useState } from "react";
import Header from "./Header";
import {
	ArrowRight,
	Check,
	ChevronDown,
	ChevronUp,
	Copy,
	Maximize,
	Minimize,
	Minus,
	X,
} from "react-feather";
import toast from "react-hot-toast";
import { useOnClickOutside } from "@/hooks/mouse-events";
import useStore from "@/hooks/store";
import { Typography } from "@/library";
import { ITab, TOperatingSystem } from "@/types/terminal";
import { requestCommandForQuery } from "@/utils/api/terminal";
import { copyToClipboard, stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";

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
	const { history, addToHistory, tabs } = useStore();
	const osSelectorDropdownRef = useRef<any>(null);
	const [activeOperatingSystem, setActiveOperatingSystem] =
		useState<TOperatingSystem>("linux");
	const [openOsSelectorDropdown, setOpenOsSelectorDropdown] = useState(false);
	const [copyIcon, setCopyIcon] = useState({
		id: "",
		icon: <Copy />,
	});
	const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

	useOnClickOutside(osSelectorDropdownRef, () => {
		setOpenOsSelectorDropdown(false);
	});

	const [query, setQuery] = useState<IQuery>({
		input: "",
		state: null,
		output: "",
	});

	const copyResult = (id: string, text: string) => {
		copyToClipboard(text);
		setCopyIcon({
			id,
			icon: <Check />,
		});
		setTimeout(() => {
			setCopyIcon({
				id: "",
				icon: <Copy />,
			});
		}, 1000);
	};

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
			const res = await requestCommandForQuery(
				query.input,
				activeOperatingSystem
			);
			updateQuery({
				state: "success",
				input: "",
				output: "",
			});
			addToHistory({
				id: `${history.length}`,
				query: query.input,
				os: activeOperatingSystem,
				state: "success",
				output: res.data.toString(),
				tab: activeTab,
			});
		} catch (error: any) {
			toast.error(error.response.data.data.toString());
			updateQuery({
				state: "error",
				input: "",
				output: "",
			});
			addToHistory({
				id: `${history.length}`,
				query: query.input,
				os: activeOperatingSystem,
				state: "error",
				output: error.response.data.data.toString(),
				tab: activeTab,
			});
		}
	};

	return (
		<main
			className={classes("", {
				"--minimized": viewState === "minimized",
				"--close": viewState === "close",
			})}
			id="terminal"
		>
			<Header
				onClose={onClose}
				onMinimize={onMinimize}
				activeTab={activeTab}
				setActiveTab={(newTab) => {
					setActiveTab(() => newTab);
				}}
			/>
			<section className={classes("-body")}>
				{history
					.filter((item) => item.tab === activeTab)
					.map((item) => (
						<div className={classes("-history-item")} key={item.id}>
							<div className={classes("-history-item-input")}>
								<ArrowRight />
								<Typography size="md">{item.query}</Typography>
							</div>
							<div className={classes("-history-item-result")}>
								<Typography
									size="md"
									className={classes(
										`-history-item-result--${item.state}`
									)}
								>
									{item.output}
								</Typography>
								{item.state === "success" ? (
									<button
										className={classes(
											"-history-item-result-copy"
										)}
										onClick={() =>
											copyResult(item.id, item.output)
										}
									>
										{copyIcon.id === item.id ? (
											copyIcon.icon
										) : (
											<Copy />
										)}
									</button>
								) : null}
							</div>
						</div>
					))}
				<form className={classes("-form")} onSubmit={submitQuery}>
					<div className={classes("-form-group")}>
						<ArrowRight />
						<input
							value={query.input}
							autoFocus
							placeholder="Ask away..."
							name="query"
							onChange={(e: any) => {
								if (query.state)
									updateQuery({
										input: e.target.value,
										state: null,
									});
								else updateQuery({ input: e.target.value });
							}}
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
