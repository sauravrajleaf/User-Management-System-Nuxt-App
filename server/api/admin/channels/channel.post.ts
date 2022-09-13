import { Channels, Users } from "../../../dbModels";

interface IRequestBody {
	users: string[];
	name: string;
	channeldata: string[];
}

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("POST /api/admin/channels/channel");

	const { users, name, channeldata } = await useBody<IRequestBody>(e);

	console.log(name);
	try {
		console.log("create channel");
		const newChannel = await Channels.create({
			users,
			name,
			channeldata,
		});
		return {
			users: newChannel.users,
			name: newChannel.name,
			channeldata: newChannel.channeldata,
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
