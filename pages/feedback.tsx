import React, { useState } from "react";
import styles from "@/styles/pages/Feedback.module.scss";
import { stylesConfig } from "@/utils/functions";
import { Button } from "@/library";
import toast from "react-hot-toast";
import { submitFeedback } from "@/utils/api/user";

const classes = stylesConfig(styles, "feedback");

const FeedbackPage: React.FC = () => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await submitFeedback(message);
			toast.success(res.message);
		} catch (error) {
			console.error(error);
			toast.error("Failed to submit feedback");
		} finally {
			setLoading(false);
		}
	};
	return (
		<main className={classes("")}>
			<form className={classes("-form")} onSubmit={handleSubmit}>
				<textarea
					name="message"
					id="message"
					cols={30}
					rows={10}
					value={message}
					placeholder="Enter your feedback here..."
					onChange={(e) => setMessage(e.target.value)}
				></textarea>
				<Button loading={loading} type="submit">
					Submit
				</Button>
			</form>
		</main>
	);
};

export default FeedbackPage;
