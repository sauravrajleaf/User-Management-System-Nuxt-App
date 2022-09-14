import { Channels, Users } from "../../../dbModels";

interface IRequestBody {
	name: string;
}

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("POST /api/admin/channels/channel");

	const { name } = await useBody<IRequestBody>(e);

	console.log(name);
	try {
		console.log("create channel");
		const newChannel = await Channels.create({
			name,
		});
		return {
			name: newChannel.name,
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
