import React, { useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Minus, X } from "react-feather";
import toast from "react-hot-toast";
import { operatingSystems } from "@/constants/terminal";
import { useOnClickOutside } from "@/hooks/mouse-events";
import useStore from "@/hooks/store";
import { Typography } from "@/library";
import { TOperatingSystem } from "@/types/terminal";
import { requestCommandForQuery } from "@/utils/api/terminal";
import { stylesConfig } from "@/utils/functions";
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
	const { history, addToHistory } = useStore();
	const osSelectorDropdownRef = useRef<any>(null);
	const [activeOperatingSystem, setActiveOperatingSystem] =
		useState<TOperatingSystem>("linux");
	const [openOsSelectorDropdown, setOpenOsSelectorDropdown] = useState(false);
	useOnClickOutside(osSelectorDropdownRef, () => {
		setOpenOsSelectorDropdown(false);
	});
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
			});
		}
	};

	return (
		<main
			className={classes("", {
				"--minimized": viewState === "minimized",
				"--close": viewState === "close",
			})}
		>
			<div className={classes("-header")}>
				<div className={classes("-header-os")}>
					<button
						className={classes("-header-os-button")}
						onClick={() => setOpenOsSelectorDropdown((p) => !p)}
					>
						<Typography
							size="md"
							className={classes("-header-system")}
						>
							{
								operatingSystems.find(
									(os) => os.id === activeOperatingSystem
								)?.name
							}
						</Typography>
						<ChevronDown />
					</button>
					<div
						className={classes("-header-os-dropdown", {
							"-header-os-dropdown--open": openOsSelectorDropdown,
						})}
						ref={osSelectorDropdownRef}
					>
						{operatingSystems.map((os) => (
							<button
								key={os.id}
								className={classes("-header-os-dropdown-item", {
									"-header-os-dropdown-item--active":
										activeOperatingSystem === os.id,
								})}
								onClick={() => {
									setActiveOperatingSystem(os.id);
									setOpenOsSelectorDropdown(false);
								}}
							>
								<Typography size="md">{os.name}</Typography>
							</button>
						))}
					</div>
				</div>
				<Typography size="xl" className={classes("-header-title")}>
					{activeOperatingSystem === "linux"
						? "Bash"
						: activeOperatingSystem === "windows"
							? "Powershell"
							: "Zsh"}
				</Typography>
				<div className={classes("-header-buttons")}>
					<button
						onClick={onMinimize}
						className={classes(
							"-header-button",
							"-header-button--minimize"
						)}
					>
						{viewState === "minimized" ? <ChevronUp /> : <Minus />}
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
				{history.map((item) => (
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
