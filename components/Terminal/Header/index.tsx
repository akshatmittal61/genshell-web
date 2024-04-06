import { operatingSystems } from "@/constants/terminal";
import { useOnClickOutside } from "@/hooks/mouse-events";
import useStore from "@/hooks/store";
import { getNewFileName, stylesConfig } from "@/utils/functions";
import React, { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Minus, Plus, Settings, X } from "react-feather";
import styles from "./styles.module.scss";

interface ITerminalHeaderProps {
	onClose: () => void;
	onMinimize: () => void;
	activeTab: string;
	setActiveTab: (_: string) => void;
}

interface ITerminalHeaderOSMenuProps {
	onClose: () => void;
	setActiveTab: (_: string) => void;
}

const classes = stylesConfig(styles, "terminal-header");

const TerminalHeaderOSMenu: React.FC<ITerminalHeaderOSMenuProps> = ({
	onClose,
	setActiveTab,
}) => {
	const { tabs, createTab } = useStore();
	const ref = useRef<any>(null);
	useOnClickOutside(ref, () => {
		onClose();
	});
	return (
		<menu className={classes("-os-selector")} ref={ref}>
			{operatingSystems.map((os) => (
				<button
					key={`os-${os.id}`}
					onClick={() => {
						const newTab = createTab(
							getNewFileName(
								os.name,
								tabs.map((tab) => tab.name)
							),
							os.shell
						);
						setActiveTab(newTab.id);
						onClose();
					}}
				>
					{os.name}
				</button>
			))}
		</menu>
	);
};

const TerminalHeader: React.FC<ITerminalHeaderProps> = ({
	onClose,
	onMinimize,
	activeTab,
	setActiveTab,
}) => {
	const { tabs, removeTab } = useStore();
	const [openOSMenu, setOpenOSMenu] = useState(false);
	const onMaximizeMinimize = () => {
		const element: any = document.getElementById("terminal");
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
	useEffect(() => {
		setOpenOSMenu(false);
	}, [tabs]);

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
			<div className={classes("-tabs")}>
				{tabs.map((tab, index) => (
					<button
						key={"tab-" + tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={classes("-tab", {
							"-tab--active": tab.id === activeTab,
						})}
					>
						<div className={classes("-tab-descriptor")}>
							{
								operatingSystems.find((os) => os.id === tab.os)
									?.icon
							}
							{tab.name}
						</div>
						{tabs.length > 1 && (
							<X
								onClick={() => {
									removeTab(tab.id);
									setActiveTab(
										index > 0
											? tabs[index - 1].id
											: tabs[1].id
									);
								}}
							/>
						)}
					</button>
				))}
				<button
					className={classes("-action")}
					onClick={() => setOpenOSMenu(true)}
				>
					<Plus />
					{openOSMenu ? (
						<TerminalHeaderOSMenu
							onClose={() => setOpenOSMenu(false)}
							setActiveTab={setActiveTab}
						/>
					) : null}
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
