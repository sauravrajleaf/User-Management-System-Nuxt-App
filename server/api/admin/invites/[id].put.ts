// Edit users channels access or permissions access(edit or delete);
import { Users } from "../../../dbModels";

interface IRequestBody {
	channelAccessIDs: string[];
	channelPermissions: string;
	channelAccessNames: string[];
}

export default defineEventHandler(async (e) => {
	const userId = e.context.params.id;
	console.log(`PUT api/admin/invites/${userId}`);

	const { channelAccessIDs, channelPermissions, channelAccessNames } =
		await useBody<IRequestBody>(e);

	console.log(channelAccessIDs, channelPermissions, channelAccessNames);

	const userFields = {
		channelAccessIDs,
		channelPermissions,
		channelAccessNames,
	};

	userFields.channelAccessIDs = channelAccessIDs;
	userFields.channelPermissions = channelPermissions;
	userFields.channelAccessNames = channelAccessNames;

	try {
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
