import { stylesConfig } from "@/utils/functions";
import React from "react";
import { Maximize, Minimize, Minus, Settings, X } from "react-feather";
import styles from "./styles.module.scss";

interface ITerminalHeaderProps {
	onClose: () => void;
	onMinimize: () => void;
}

const classes = stylesConfig(styles, "terminal-header");

const TerminalHeader: React.FC<ITerminalHeaderProps> = ({
	onClose,
	onMinimize,
}) => {
	const onMaximizeMinimize = () => {
		const element: any = document.getElementById("auth-terminal");
		if (element) {
			// check if the element is already full screen
			if (
				document?.fullscreenElement === element ||
				(document as any)?.webkitFullscreenElement === element ||
				(document as any)?.msFullscreenElement === element
			) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if ((document as any).webkitExitFullscreen) {
					(document as any).webkitExitFullscreen();
				} else if ((document as any).msExitFullscreen) {
					(document as any).msExitFullscreen();
				}
			} else if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}
	};

	return (
		<header className={classes("")}>
			<div className={classes("-buttons")}>
				<button onClick={onClose}>
					<X />
				</button>
				<button onClick={onMinimize}>
					<Minus />
				</button>
				<button onClick={onMaximizeMinimize}>
					{(
						typeof document !== "undefined" &&
						(document?.getElementById("terminal") as any)
					)?.fullscreenElement ? (
						<Minimize />
					) : (
						<Maximize />
					)}
				</button>
			</div>
			<div className={classes("-actions")}>
				<button className={classes("-action")}>
					<Settings />
				</button>
			</div>
		</header>
	);
};

export default TerminalHeader;
