import { Users } from "../../dbModels";
import middlewareFunction from "../../utils/middlewareFunction";

export default defineEventHandler(async (e) => {
	//FIND A REGISTERED USER BY JWT TOKEN
	// const userId = e.context.params.id;
	// console.log(`GET /api/auth/${userId}`);

	try {
		console.log("Find user");
		const userId = await middlewareFunction(e);
		console.log(e.req.headers);

		const userData = await Users.findOne({
			_id: userId,
		});
		if (userData) {
			console.log("User found");
			return {
				id: userData._id,
				name: userData.name,
				email: userData.email,
				inviteStatus: userData.inviteStatus,
				channels: userData.channels,
				isAdmin: userData.isAdmin,
			};
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
