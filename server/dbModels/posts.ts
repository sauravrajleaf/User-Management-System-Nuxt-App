//USER SCHEMA MODEL

import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
	{
		channel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Channels",
		},
		channelData: [],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: true, strict: true, strictQuery: true }
);
export default mongoose.model("posts", PostSchema);
