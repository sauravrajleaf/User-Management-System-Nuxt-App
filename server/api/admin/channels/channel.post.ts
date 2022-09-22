import { Channels, Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

interface IRequestBody {
	name: string;
}

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("POST /api/admin/channels/channel");

	const { name } = await useBody<IRequestBody>(e);

	console.log(name);
	try {
		const userId = await middlewareFunction(e);
		// console.log(userId);

		if (e.req.headers.authentication == null) {
			e.res.statusCode = 401;
			return { msg: "No token, authorization denied" };
		}
		if (userId == false) {
			e.res.statusCode = 401;
			return { msg: "Token is not valid" };
		}

		if (await authRole(userId)) {
			console.log("create channel");
			const newChannel = await Channels.create({
				name,
			});
			return {
				name: newChannel.name,
			};
		} else {
			e.res.statusCode = 401;
			return { msg: "Unauthorized! Only admins allowed.Token is not valid" };
		}
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
