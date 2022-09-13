import { Users } from "../../../dbModels";

//GET ALL SENT INVITES

export default defineEventHandler(async (e) => {
	console.log("GET /api/admin/invites");
	try {
		const allInvites = await Users.find();

		//return all users created by the admin
		return allInvites.map((invite) => ({
			name: invite.name,
			email: invite.email,
			inviteStatus: invite.inviteStatus,
			channelsAccess: invite.channelsAccess,
			channelPermission: invite.channelPermissions,
		}));
	} catch (err) {
		console.error(err);
		e.res.statusCode = 500;
		return {
			code: "Internal Server Error",
			message: "Something went wrong",
		};
	}
});
