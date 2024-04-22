import React, { useState } from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import Header from "./Header";
import { ArrowRight, Check } from "react-feather";
import { Typography } from "@/library";
import Input from "@/library/Input";
import toast from "react-hot-toast";
import { authApi } from "@/utils/api";
import regex from "@/constants/regex";
import useStore from "@/hooks/store";

interface IAuthProps {
	viewState: "open" | "close" | "minimized";
	onClose: () => void;
	onMinimize: () => void;
}

const classes = stylesConfig(styles, "auth");

const Auth: React.FC<IAuthProps> = ({ viewState, onClose, onMinimize }) => {
	const { setUser } = useStore();
	const [formWindow, setFormWindow] = useState<"register" | "login">("login");
	const [loginCreds, setLoginCreds] = useState({
		email: "",
		password: "",
	});
	const [registerCreds, setRegisterCreds] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleRegister = async (e: any) => {
		e.preventDefault();
		try {
			const res = await authApi.register(registerCreds);
			setUser(res.data);
			toast.success("Registered sucessfuly!");
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			const res = await authApi.login(loginCreds);
			setUser(res.data);
			toast.success(`Welcome back ${res.data.name}!`);
		} catch (error: any) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	return (
		<section
			id="auth-terminal"
			className={classes("", {
				"--minimized": viewState === "minimized",
				"--close": viewState === "close",
			})}
		>
			<Header onClose={onClose} onMinimize={onMinimize} />
			{formWindow === "login" ? (
				<form className={classes("-body")} onSubmit={handleLogin}>
					<div className={classes("-item")}>
						<ArrowRight />
						<Typography>Welcome back to GenShell</Typography>
					</div>
					<div className={classes("-item")}>
						<ArrowRight />
						<Typography>Enter your email:</Typography>
						<Input
							type="email"
							placeholder="Email"
							value={loginCreds.email}
							onChange={(e: any) => {
								setLoginCreds((prev) => ({
									...prev,
									email: e.target.value,
								}));
							}}
						/>
					</div>
					{loginCreds.email && regex.email.test(loginCreds.email) ? (
						<div className={classes("-item")}>
							<ArrowRight />
							<Typography>Enter your password:</Typography>
							<Input
								type="password"
								placeholder="Password"
								value={loginCreds.password}
								onChange={(e: any) => {
									setLoginCreds((prev) => ({
										...prev,
										password: e.target.value,
									}));
								}}
							/>
						</div>
					) : null}
					{loginCreds.email &&
					loginCreds.password &&
					regex.email.test(loginCreds.email) &&
					regex.password.test(loginCreds.password) ? (
						<button className={classes("-btn")} type="submit">
							<Check /> OK
						</button>
					) : null}
				</form>
			) : (
				<form className={classes("-body")} onSubmit={handleRegister}>
					<div className={classes("-item")}>
						<ArrowRight />
						<Typography>Welcome to GenShell</Typography>
					</div>
					<div className={classes("-item")}>
						<ArrowRight />
						<Typography>What&apos; your name:</Typography>
						<Input
							type="text"
							placeholder="Full Name"
							value={registerCreds.name}
							onChange={(e: any) => {
								setRegisterCreds((prev) => ({
									...prev,
									name: e.target.value,
								}));
							}}
						/>
					</div>
					{registerCreds.name &&
					regex.name.test(registerCreds.name) ? (
						<div className={classes("-item")}>
							<ArrowRight />
							<Typography>Enter your email:</Typography>
							<Input
								type="email"
								placeholder="Email"
								value={registerCreds.email}
								onChange={(e: any) => {
									setRegisterCreds((prev) => ({
										...prev,
										email: e.target.value,
									}));
								}}
							/>
						</div>
					) : null}
					{registerCreds.name &&
					regex.name.test(registerCreds.name) &&
					registerCreds.email &&
					regex.email.test(registerCreds.email) ? (
						<div className={classes("-item")}>
							<ArrowRight />
							<Typography>Enter your password:</Typography>
							<Input
								type="password"
								placeholder="Password"
								value={registerCreds.password}
								onChange={(e: any) => {
									setRegisterCreds((prev) => ({
										...prev,
										password: e.target.value,
									}));
								}}
							/>
						</div>
					) : null}
					{registerCreds.name &&
					regex.name.test(registerCreds.name) &&
					registerCreds.email &&
					registerCreds.password &&
					regex.email.test(registerCreds.email) &&
					regex.password.test(registerCreds.password) ? (
						<button className={classes("-btn")} type="submit">
							<Check /> OK
						</button>
					) : null}
				</form>
			)}
			{
				<Typography
					as="span"
					size="sm"
					className={classes("-foot")}
					onClick={() => {
						if (formWindow === "login") {
							setFormWindow("register");
						} else {
							setFormWindow("login");
						}
					}}
				>
					{formWindow === "login"
						? "Don't have an account? Register Now."
						: "Already have an account? Login to proceed"}
				</Typography>
			}
		</section>
	);
};

export default Auth;
