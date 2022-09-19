import generateToken from "../../../plugins/generateToken";
import { Users } from "../../dbModels";

interface IRequestBody {
	email: string;
	password: string;
}
export default defineEventHandler(async (e) => {
	console.log("POST /api/auth/signin");
	const { email, password } = await useBody<IRequestBody>(e); // Check if email is passed.
	if (!email) {
		e.res.statusCode = 400;
		return {
			code: "EMAIL_REQUIRED",
			message: "Body malformed: email is required.",
		};
	} // Check if password is passed.
	if (!password) {
		e.res.statusCode = 400;
		return {
			code: "PASSWORD_REQUIRED",
			message: "Body malformed: password is required.",
		};
	}
	try {
		console.log("Find user");
		const userData = await Users.findOne({
			email: email.toLowerCase(),
		});
		if (userData) {
			console.log("User found");
			const isPasswordValid = await userData.verifyPasswordSync(password);
			if (isPasswordValid) {
				// Generate token or create session here
				return {
					id: userData._id,
					name: userData.name,
					token: generateToken(userData._id),
				};
			} else {
				console.log("Password is not valid");
				e.res.statusCode = 404;
				return {
					code: "USER_NOT_FOUND",
					message: "User with given email and password doesn't exists.",
				};
			}
		} else {
			console.log("User not found");
			e.res.statusCode = 404;
			return {
				code: "USER_NOT_FOUND",
				message: "User with given email and password doesn't exists.",
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
