// GET ALL THE CHANNELS THE USER HAS ACCESS TO
// DASHBOARD PAGE

import { Users } from "../../../dbModels";

export default defineEventHandler(async (e) => {
	const userId = e.context.params.id;

	console.log(`GET api/myChannels/${userId}`);

	try {
		console.log("Find user");
		const userData = await Users.findOne({
			_id: userId,
		});
		if (userData) {
			console.log("User found");
			return {
				channelAccessNames: userData.channelAccessNames,
				channelAccessIDs: userData.channelAccessIDs,
				channelPermissions: userData.channelPermissions,
			};
		} else {
			console.log("User not found");
			e.res.statusCode = 404;
			return {
				code: "USER_NOT_FOUND",
				message: `User with id ${userId} doesn't exists.`,
			};
		}
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});