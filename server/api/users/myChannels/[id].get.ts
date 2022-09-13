// GET ALL THE CHANNELS THE USER HAS ACCESS TO
// DASHBOARD PAGE

import { Users } from "../../../dbModels";

export default defineEventHandler(async (e) => {
	const userId = e.context.params.id;

	// console.log(`GET api/usdgdfgers/myChannels/${userId}`);

	try {
		console.log("Find user");
		const userData = await Users.findOne({
			_id: userId,
		});
		console.log(userData);
		return userData?.channelsAccess;
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
