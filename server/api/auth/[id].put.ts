import { Users } from "../../dbModels";
interface IRequestBody {
	password: string;
	inviteStatus: String;
}
export default defineEventHandler(async (e) => {
	//REGISTER A NEW USER
	const userId = e.context.params.id;
	console.log(`PUT /api/auth/${userId}`);
	const { password, inviteStatus } = await useBody<IRequestBody>(e);
	console.log(password, inviteStatus);
	const userFields = {
		password,
		inviteStatus,
	};

	userFields.password = password;
	userFields.inviteStatus = inviteStatus;

	try {
		let user = await Users.findById(userId);

		if (!user) {
			e.res.statusCode = 409;
			return {
				code: "USER DOES NOT EXISTS",
				message: "User with given email does not exists.",
			};
		} else {
			console.log("Set user password");
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
