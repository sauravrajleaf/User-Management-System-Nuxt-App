import { Posts } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

interface IRequestBody {
	channelData: string;
}

export default defineEventHandler(async (e) => {
	//IF THE USER HAS EDIT OR ALL PERMISSIONS THEN THE USER CAN EDIT THE POSTS
	const postId = e.context.params.id;
	console.log(`PUT /api/user/posts/updatePost/${postId}`);
	console.log(e.request.user);
	try {
		const userId = await middlewareFunction(e);
		console.log(userId);

		if (e.req.headers.authentication == null) {
			e.res.statusCode = 401;
			return { msg: "No token, authorization denied" };
		}
		let post = await Posts.findById(postId);
		if (post.user != userId) {
			e.res.statusCode = 401;
			return { msg: "User is not valid! Unauthorised" };
		}

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
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
