import { Channels, Users } from "../../../dbModels";

interface IRequestBody {
	name: string;
}

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("post /api/admin/channels/channel/:id");
	const channelId = e.context.params.id;
	console.log(`CHANNEL ID ${channelId}`);
	const { name } = await useBody<IRequestBody>(e);
	const channelFields = {
		name,
	};

	if (name) channelFields.name = name;

	try {
		let channel = await Channels.findById(channelId);
		if (!channel) return e.res.status(404).json({ msg: "Channel Not Found" });

		channel = await Channels.findByIdAndUpdate(
			channelId,
			{ $set: channelFields },
			{ new: true }
		);

		return channel;
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
