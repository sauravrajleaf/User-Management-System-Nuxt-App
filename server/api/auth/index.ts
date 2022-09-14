import { Users } from "../../dbModels";
export default defineEventHandler(async (e) => {
	//GET LIST OF REGISTERED UESRS
	try {
		console.log("Find users");
		console.log("GET /api/auth");
		const usersData = await Users.find();
		// return usersData;
		return usersData.map((user) => ({
			id: user._id,
			name: user.name,
			email: user.email,
			channelAccessIDs: user.channelAccessIDs,
			channelAccessNames: user.channelAccessNames,
			channelPermissions: user.channelPermissions,
			inviteStatus: user.inviteStatus,
			isAdmin: user.isAdmin,
		}));
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
