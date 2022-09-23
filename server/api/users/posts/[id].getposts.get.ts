import { Posts } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

export default defineEventHandler(async (e) => {
	//GET ALL POSTS OF A USER OF A CHANNEL

	//CHECK CHANNEL ACCESS TO WHICH THE USER IS POSTING
	const channelId = e.context.params.id;
	console.log(`GET /api/users/posts/${channelId}`);

	try {
		const userId = await middlewareFunction(e);
		console.log(userId);

		if (e.req.headers.authentication == null) {
			e.res.statusCode = 401;
			return { msg: "No token, authorization denied" };
		}

		if (userId == false) {
			e.res.statusCode = 401;
			return { msg: "Token is not valid" };
		}
		const allPosts = await Posts.find();
		const channelPosts = allPosts.filter(
			(post) => post.channel == channelId && post.user == userId
		);
		return {
			channelPosts,
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
