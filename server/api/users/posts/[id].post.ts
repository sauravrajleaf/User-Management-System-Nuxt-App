import { Users, Channels, Posts } from "../../../dbModels";

interface IRequestBody {
	channel: object;
	user: object;
	channelData: string[];
}

export default defineEventHandler(async (e) => {
	//CREATE A POST ON A CHANNEL
	const channelId = e.context.params.id;
	console.log(`POST /api/users/posts/createPosts/${channelId}`);
	const userData = await Users.findOne({
		_id: e.context.auth.id,
	});
	console.log(userData);

	const { channelData } = await useBody<IRequestBody>(e);
	console.log(channelData);
	try {
		const newPost = await Posts.create({
			channel: channelId,
			user: e.context.auth.id,
			channelData,
		});
		return {
			id: newPost._id,
			channel: newPost.channel,
			user: e.context.auth.id,
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
