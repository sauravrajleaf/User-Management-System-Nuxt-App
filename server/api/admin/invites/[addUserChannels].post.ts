// ADMIN  LINKS THE CHANNELS IDs TO USER DB

import { Users, Channels } from "../../../dbModels";

interface IRequestBody {
	channels: object[];
}
export default defineEventHandler(async (e) => {
	//INVITE A NEW USER
	// console.log(e.req.user);
	const userId = e.context.params.id;
	console.log(userId);
	console.log(`POST /api/admin/invites/${userId}`);
	const { channels } = await useBody<IRequestBody>(e);
	console.log(channels);

	const userFields = {
		channels,
	};

	userFields.channels = channels;
	console.log(userFields.channels);
	try {
		let user = await Users.findById(userId);
		console.log(user?.channels);
		if (!user) {
			e.res.statusCode = 409;
			return {
				code: "USER DOES NOT EXISTS",
				message: "User with given email does not exists.",
			};
		} else {
			console.log("Add users channels");
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
