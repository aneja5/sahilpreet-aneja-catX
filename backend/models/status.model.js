import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
		img: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

export default Status;