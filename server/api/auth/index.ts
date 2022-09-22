import { Users } from "../../dbModels";
import middlewareFunction from "../../utils/middlewareFunction";
import authRole from "../../utils/authRole";

export default defineEventHandler(async (e) => {
	//GET LIST OF REGISTERED UESRS
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
			console.log("Find users");
			console.log("GET /api/auth");
			const usersData = await Users.find();
			// return usersData;
			return usersData.map((user) => ({
				id: user._id,
				name: user.name,
				email: user.email,
				channels: user.channels,
				inviteStatus: user.inviteStatus,
				isAdmin: user.isAdmin,
			}));
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
