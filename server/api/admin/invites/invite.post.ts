// ADMIN SENDS INVITE TO THE USER VIA MAIL SUBSCRIPTION
// DATA ADDED IN USER MODEL AS FOLLOWS -
// 1. USER NAME
// 2. USER EMAIL
// 3. USER CHANNELS ACCESS ( A, B, C,...)
// 4. USER CHANNEL PERMISSIONS (EDIT OR DELETE OR BOTH)

import { Users, Channels } from "../../../dbModels";
import middlewareFunction from "../../../utils/middlewareFunction";
import authRole from "../../../utils/authRole";

interface IRequestBody {
	channels: object[];
	email: string;
	name: string;
	inviteStatus: string;
}

export default defineEventHandler(async (e) => {
	//INVITE A NEW USER
	// console.log(e.req.user);
	console.log("POST /api/admin/invites/invite");
	const { email, name, inviteStatus, channels } = await useBody<IRequestBody>(
		e
	);
	// console.log(inviteStatus);
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
		// const adminUserData = await Users.findById(userId);

		if (await authRole(userId)) {
			const userData = await Users.findOne({
				email,
			});
			// const channels = await Channels.find();
			// console.log(channels);
			if (userData) {
				console.log(`User with email ${email} already exists`);
				e.res.statusCode = 409;
				return {
					code: "USER_EXISTS",
					message: "User with given email already exists.",
				};
			} else {
				console.log("Invite User");
				const newUserData = await Users.create({
					email,
					name,
					inviteStatus,
					channels,
				});
				return {
					id: newUserData._id,
					name: newUserData.name,
					inviteStatus: newUserData.inviteStatus,
					channels: newUserData.channels,
				};
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
