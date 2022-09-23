import { Channels, Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

interface IRequestBody {
	name: string;
}

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("POST /api/admin/channels/channel/:id");
	const channelId = e.context.params.id;
	console.log(`CHANNEL ID ${channelId}`);
	const { name } = await useBody<IRequestBody>(e);
	const channelFields = {
		name,
	};

	if (name) channelFields.name = name;

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

			channel = await Channels.findByIdAndUpdate(
				channelId,
				{ $set: channelFields },
				{ new: true }
			);

			return channel;
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
