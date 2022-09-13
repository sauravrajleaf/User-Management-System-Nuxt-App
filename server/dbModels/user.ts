//USER SCHEMA MODEL

import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
const UserSchema = new mongoose.Schema(
	{
		name: { type: String },
		email: { type: String, unique: true },
		password: { type: String, bcrypt: true },
		channelsAccess: {
			type: Array,
			// required: true,
		},
		inviteStatus: {
			type: String,
			// required: true,
		},
		channelPermissions: {
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
