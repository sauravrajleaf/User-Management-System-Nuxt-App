import { Posts, Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

interface IRequestBody {
	channel: object;
	user: object;
	channelData: string[];
}

export default defineEventHandler(async (e) => {
	//CREATE A POST ON A CHANNEL
	// console.log(e.context);

	const channelId = e.context.params.id;
	console.log(`POST /api/users/posts/${channelId}`);

	const { channelData } = await useBody<IRequestBody>(e);
	// console.log(channelData);
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

		const userData = await Users.findById(userId);
		// console.log(userData);
		let allowedChannels = userData.channels.map((channel) => ({
			id: channel.channelId,
			channelPermissions: channel.channelPermissions,
		}));
		console.log(allowedChannels);
		const values = [];
		for (let item of allowedChannels) {
			values.push(item.id?.toString());
			values.push(item.channelPermissions?.toString());
		}
		console.log(values);
		const isAllowed = values.includes(channelId);

		if (!isAllowed) {
			e.res.statusCode = 401;
			return { msg: "Not authorized to this channel, access denied" };
		}
		console.log(isAllowed);
		const newPost = await Posts.create({
			channel: channelId,
			user: userId,
			channelData,
		});
		return {
			id: newPost._id,
			channel: newPost.channel,
			user: userId,
			channelData: newPost.channelData,
		};
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
