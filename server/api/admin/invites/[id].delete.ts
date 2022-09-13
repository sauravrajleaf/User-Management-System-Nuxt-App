//Delete a user from the database
import { Users } from "../../../dbModels";

export default defineEventHandler(async (e) => {
	//CREATE A CHANNEL
	console.log("DELETE /api/admin/invites/:id");
	const userId = e.context.params.id;
	console.log(`CHANNEL ID ${userId}`);
	try {
		let user = await Users.findById(userId);
		if (!user) return { msg: "Channel Not Found" };

		user = await Users.findByIdAndRemove(userId);
		return {
			code: "SUCCESS",
			message: `User ${userId} is removed`,
		};

		// return channel;
	} catch (err) {
		console.dir(err);
		e.res.statusCode = 500;
		return {
			code: "ERROR",
			message: "Something went wrong.",
		};
	}
});
