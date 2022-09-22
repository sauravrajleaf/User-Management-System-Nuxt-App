import { Channels } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("DELETE /api/admin/channels/:id");
	const channelId = e.context.params.id;
	console.log(`CHANNEL ID ${channelId}`);
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
			let channel = await Channels.findById(channelId);
			if (!channel) {
				e.res.statusCode = 404;
				return { msg: "Channel Not Found" };
			}

			channel = await Channels.findByIdAndRemove(channelId);
			return {
				code: "SUCCESS",
				message: "Channel is removed",
			};
		} else {
			e.res.statusCode = 401;
			return { msg: "Unauthorized! Only admins allowed.Token is not valid" };
		}

		// return channel;
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
