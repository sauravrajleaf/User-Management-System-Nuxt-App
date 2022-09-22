import { Users, Channels } from "../dbModels";

export default defineEventHandler(async (userId) => {
	// console.log(userId);
	const adminUserData = await Users.findById(userId);
	if (!adminUserData?.isAdmin) {
		return false;
	} else return true;
});
