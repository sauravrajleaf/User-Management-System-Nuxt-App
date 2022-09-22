//DELETE A USER FROM THE DATABASE

import { Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

export default defineEventHandler(async (e) => {
	console.log("DELETE /api/admin/invites/:id");
	const editUserId = e.context.params.id;
	console.log(`DELETE User ID ${editUserId}`);
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
			let user = await Users.findById(editUserId);
			if (!user) return { msg: "User Not Found" };

			user = await Users.findByIdAndRemove(editUserId);
			return {
				code: "SUCCESS",
				message: `User ${editUserId} is removed`,
			};
		} else {
			e.res.statusCode = 401;
			return { msg: "Unauthorized! Only admins allowed.Token is not valid" };
		}
		// return User;
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
