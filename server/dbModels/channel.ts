import mongoose from "mongoose";

const ChannelsSchema = new mongoose.Schema(
	{
		users: {
			type: Array,
		},

		name: { type: String, unique: true, required: true },
		channeldata: {
			type: [],
		},
	},
	{ timestamps: true, strict: true, strictQuery: true }
);
export default mongoose.model("Channels", ChannelsSchema);
