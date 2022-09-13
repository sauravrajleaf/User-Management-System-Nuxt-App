import { Channels } from "../../../dbModels";

export default defineEventHandler(async (e) => {
	//GET DETAILS OF ALL CREATED CHANNELS

	try {
		console.log("Get all channels");
		console.log("GET /api/admin/channels");
		const allChannels = await Channels.find();
		// return usersData;
		return allChannels.map((channel) => ({
			id: channel._id,
			name: channel.name,
			channeldata: channel.channeldata,
			users: channel.users,
		}));
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
