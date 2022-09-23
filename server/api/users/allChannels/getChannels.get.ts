import { Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

export default defineEventHandler(async (e) => {
	//GET ALL CHANNELS OF A USER
	// const userId = e.context.params.id;
	// console.log(`GET /api/auth/${userId}`);
	// console.log(userId);

	try {
		const userId = await middlewareFunction(e);
		console.log(userId);

		if (e.req.headers.authentication == null) {
			e.res.statusCode = 401;
			return { msg: "No token, authorization denied" };
		}

		if (userId == false) {
			e.res.statusCode = 401;
			return { msg: "Token is not valid" };
		}
		console.log("Find user");
		const userData = await Users.findOne({
			_id: userId,
		});
		if (userData) {
			console.log("User found");
			return {
				channels: userData.channels,
			};
			// return userData.channels.map((channel) => ({
			// 	channelId: channel.channelId,
			// }));
		} else {
			console.log("User not found");
			e.res.statusCode = 404;
			return {
				code: "USER_NOT_FOUND",
				message: `User with id  doesn't exists.`,
			};
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
