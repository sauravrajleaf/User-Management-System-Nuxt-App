import { Channels } from "../../../dbModels";

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("DELETE /api/admin/channels/:id");
	const channelId = e.context.params.id;
	console.log(`CHANNEL ID ${channelId}`);
	try {
		let channel = await Channels.findById(channelId);
		if (!channel) return { msg: "Channel Not Found" };

		channel = await Channels.findByIdAndRemove(channelId);
		return {
			code: "SUCCESS",
			message: "Channel is removed",
		};

		// return channel;
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
