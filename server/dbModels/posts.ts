//USER SCHEMA MODEL

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
	{
		channels: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "channels",
		},
		channelData: [],
	},
	{ timestamps: true, strict: true, strictQuery: true }
);
export default mongoose.model("posts", UserSchema);
