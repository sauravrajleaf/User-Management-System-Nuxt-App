import mongoose, { mongo } from "mongoose";

const InvitesSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	channelsAccess: {
		type: Array,
		required: true,
	},
	inviteStatus: {
		type: String,
		required: true,
	},
	channelPermissions: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Invites", InvitesSchema);
