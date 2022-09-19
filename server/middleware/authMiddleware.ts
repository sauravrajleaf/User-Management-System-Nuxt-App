import jwt from "jsonwebtoken";
import { Users } from "../dbModels";

// export default defineEventHandler = async (req, res, next) => {
// 	let token;
// 	console.log(req.headers.authorization);
// 	next();
// };

export default defineEventHandler(async (e) => {
	if (e.req.headers.authentication) {
		e.context.auth = {
			id: await jwt.verify(e.req.headers.authentication, process.env.JWT_SECRET)
				.id,
		};
	}
});
