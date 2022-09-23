import { Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

//GET ALL SENT INVITES

export default defineEventHandler(async (e) => {
	console.log("GET /api/admin/invites");
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
			const allInvites = await Users.find();

			//return all users created by the admin
			return allInvites.map((invite) => ({
				name: invite.name,
				email: invite.email,
				inviteStatus: invite.inviteStatus,
				channels: invite.channels,
			}));
		} else {
			e.res.statusCode = 401;
			return { msg: "Unauthorized! Only admins allowed.Token is not valid" };
		}
	} catch (err) {
		console.error(err);
		e.res.statusCode = 500;
		return {
			code: "Internal Server Error",
			message: "Something went wrong",
		};
	}
});
