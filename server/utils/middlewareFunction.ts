import jwt from "jsonwebtoken";

export default defineEventHandler(async (e) => {
	if (!e.req.headers.authentication) {
		e.res.statusCode = 401;
		return { msg: "No token, authorization denied" };
	}

	try {
		e.context.auth = {
			id: await jwt.verify(e.req.headers.authentication, process.env.JWT_SECRET)
				.id,
		};
		return e.context.auth.id;
	} catch (err) {
		e.res.statusCode = 401;
		return { msg: "Token is not valid" };
	}
});
