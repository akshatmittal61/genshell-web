import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const FeedbackModel =
	mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default FeedbackModel;
