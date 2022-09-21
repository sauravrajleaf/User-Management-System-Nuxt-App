import { Posts } from "../../../dbModels";
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
		if (!post) return { msg: "Post not found" };
		console.log(post.user);
		if (post.user != userId) {
			e.res.statusCode = 401;
			return { msg: "User is not valid! Unauthorised" };
		}

		post = await Posts.findByIdAndRemove(postId);

		return {
			code: "SUCCESS",
			message: "Channel is removed",
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
