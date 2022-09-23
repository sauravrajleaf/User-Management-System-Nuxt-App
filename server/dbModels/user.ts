//USER SCHEMA MODEL

import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
const UserSchema = new mongoose.Schema(
	{
		channels: [
			{
				channelId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Channels",
				},
				channelPermissions: {
					type: String,
					// required: true,
				},
			},
		],
		name: { type: String },
		email: { type: String, unique: true },
		inviteStatus: {
			type: String,
			// required: true,
		},

		isAdmin: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	{ timestamps: true, strict: true, strictQuery: true }
);
UserSchema.plugin(bcrypt);
export default mongoose.model("user", UserSchema);
