// Edit users channels access or permissions access(edit or delete);

import { Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

interface IRequestBody {
	channels: object[];
}

export default defineEventHandler(async (e) => {
	const editUserId = e.context.params.id;
	console.log(`PUT api/admin/invites/${editUserId}`);
	console.log(`UPDATE User ID ${editUserId}`);

	const { channels } = await useBody<IRequestBody>(e);

	console.log(channels);

	const userFields = {
		channels,
	};

	userFields.channels = channels;

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
			// console.log(userId);

			let user = await Users.findById(editUserId);

			if (!user) {
				e.res.statusCode = 409;
				return {
					code: "USER DOES NOT EXISTS",
					message: "User with given email does not exists.",
				};
			} else {
				console.log("Edit user permissions");
				const user = await Users.findByIdAndUpdate(
					editUserId,
					{ $set: userFields },
					{ new: true }
				);
				return user;
			}
		} else {
			e.res.statusCode = 401;
			return { msg: "Unauthorized! Only admins allowed.Token is not valid" };
		}
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something wrong.",
		};
	}
});
