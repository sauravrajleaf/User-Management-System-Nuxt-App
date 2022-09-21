// Edit users channels access or permissions access(edit or delete);
import { Users } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";

interface IRequestBody {
	channels: object[];
}

export default defineEventHandler(async (e) => {
	const userId = e.context.params.id;
	console.log(`PUT api/admin/invites/${userId}`);

	const { channels } = await useBody<IRequestBody>(e);

	console.log(channels);

	const userFields = {
		channels,
	};

	userFields.channels = channels;

	try {
		const userId = await middlewareFunction(e);
		// console.log(userId);

		let user = await Users.findById(userId);

		if (!user) {
			e.res.statusCode = 409;
			return {
				code: "USER DOES NOT EXISTS",
				message: "User with given email does not exists.",
			};
		} else {
			console.log("Edit user permissions");
			const user = await Users.findByIdAndUpdate(
				userId,
				{ $set: userFields },
				{ new: true }
			);
			return user;
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
