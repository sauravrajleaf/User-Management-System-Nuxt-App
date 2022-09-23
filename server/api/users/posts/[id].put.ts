import { Posts, Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

interface IRequestBody {
	channelData: string;
}

export default defineEventHandler(async (e) => {
	//IF THE USER HAS EDIT OR ALL PERMISSIONS TO THIS CHANNEL THEN THE USER CAN EDIT ITS POSTS
	const postId = e.context.params.id;
	console.log(`PUT /api/user/posts/updatePost/${postId}`);
	try {
		const userId = await middlewareFunction(e);
		console.log(userId);

		if (e.req.headers.authentication == null) {
			e.res.statusCode = 401;
			return { msg: "No token, authorization denied" };
		}
		let post = await Posts.findById(postId);
		if (!post) {
			e.res.statusCode = 404;
			return { msg: "Post not found" };
		}
		if (post?.user != userId) {
			e.res.statusCode = 401;
			return { msg: "User is not valid! Unauthorised" };
		}
		//post.channel
		console.log(post?.channel);

		//Find the channel in users id
		const userData = await Users.findById(userId);

		let allowedChannels = userData?.channels.map((channel) => ({
			id: channel.channelId,
			channelPermissions: channel.channelPermissions,
		}));
		// console.log(allowedChannels);

		let matchedChannel;

		for (const i in allowedChannels) {
			if (allowedChannels[i].id?.toString() == post?.channel?.toString()) {
				// console.log(allowedChannels[i]);
				// console.log("hi");
				matchedChannel = allowedChannels[i];
			}
			// console.log(allowedChannels[i].id, post?.channel);
		}
		console.log(matchedChannel);

		if (
			matchedChannel?.channelPermissions === "all" ||
			matchedChannel?.channelPermissions === "edit"
		) {
			const { channelData } = await useBody<IRequestBody>(e);
			const postField = {
				channelData,
			};
			if (channelData) postField.channelData = channelData;

			post = await Posts.findByIdAndUpdate(
				postId,
				{ $set: postField },
				{ new: true }
			);
			return post;
		} else {
			e.res.statusCode = 401;
			return { msg: "Editing permissions not allowed, access denied" };
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
