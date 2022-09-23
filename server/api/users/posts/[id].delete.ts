import { Posts, Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

export default defineEventHandler(async (e) => {
	//IF THE USER HAS EDIT OR ALL PERMISSIONS THEN THE USER CAN EDIT THE POSTS
	const postId = e.context.params.id;
	console.log(`DELETE /api/user/posts/${postId}`);

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
		console.log(post.user);
		if (post.user != userId) {
			e.res.statusCode = 401;
			return { msg: "User is not valid! Unauthorised" };
		}
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
		// console.log(matchedChannel);

		if (
			matchedChannel?.channelPermissions === "all" ||
			matchedChannel?.channelPermissions === "delete"
		) {
			post = await Posts.findByIdAndRemove(postId);

			return {
				code: "SUCCESS",
				message: "Post is removed",
			};
		} else {
			e.res.statusCode = 403;
			return { msg: "Deleting permissions not allowed, access denied" };
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
