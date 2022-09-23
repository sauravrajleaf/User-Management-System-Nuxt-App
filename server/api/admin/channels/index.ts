import { Channels } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

export default defineEventHandler(async (e) => {
	//GET DETAILS OF ALL CREATED CHANNELS

	try {
		const userId = await middlewareFunction(e);
		// console.log(userId);

		if (e.req.headers.authentication == null) {
			e.res.statusCode = 401;
			return { msg: "No token, authorization denied" };
		}
		if (userId == false) {
			e.res.statusCode = 401;
			return { msg: "Token is not valid" };
		}

		if (await authRole(userId)) {
			console.log("Get all channels");
			console.log("GET /api/admin/channels");
			const allChannels = await Channels.find();
			// return usersData;
			return allChannels.map((channel) => ({
				id: channel._id,
				name: channel.name,
			}));
		} else {
			e.res.statusCode = 401;
			return { msg: "Unauthorized! Only admins allowed.Token is not valid" };
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
