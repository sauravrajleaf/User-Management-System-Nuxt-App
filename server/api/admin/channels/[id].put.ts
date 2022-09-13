import { Channels, Users } from "../../../dbModels";

interface IRequestBody {
	users: [];
	name: string;
	channeldata: [];
}

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("post /api/admin/channels/channel/:id");
	const channelId = e.context.params.id;
	console.log(`CHANNEL ID ${channelId}`);
	const { users, name, channeldata } = await useBody<IRequestBody>(e);
	const channelFields = {
		users,
		name,
		channeldata,
	};

	if (users) channelFields.users = users;
	if (name) channelFields.name = name;
	if (channeldata) channelFields.channeldata = channeldata;

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
