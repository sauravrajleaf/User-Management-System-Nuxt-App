// ADMIN SENDS INVITE TO THE USER VIA MAIL SUBSCRIPTION
// DATA ADDED IN USER MODEL AS FOLLOWS -
// 1. USER NAME
// 2. USER EMAIL
// 3. USER CHANNELS ACCESS ( A, B, C,...)
// 4. USER CHANNEL PERMISSIONS (EDIT OR DELETE OR BOTH)

import { Users } from "../../../dbModels";
interface IRequestBody {
	email: string;
	name: string;
	channelsAccess: string[];
	inviteStatus: string;
	channelPermissions: string;
}

export default defineEventHandler(async (e) => {
	//INVITE A NEW USER
	console.log("POST /api/admin/invites/invite");
	const { email, name, channelsAccess, inviteStatus, channelPermissions } =
		await useBody<IRequestBody>(e);
	console.log(channelsAccess, inviteStatus, channelPermissions);
	try {
		const userData = await Users.findOne({
			email,
		});
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
				channelsAccess,
				name,
				inviteStatus,
				channelPermissions,
			});
			return {
				id: newUserData._id,
				name: newUserData.name,
				channelsAccess: newUserData.channelsAccess,
				inviteStatus: newUserData.inviteStatus,
				channelPermissions: newUserData.channelPermissions,
			};
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
