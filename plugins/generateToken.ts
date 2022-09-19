import jwt from "jsonwebtoken";

export default defineEventHandler((id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30m",
	});
});
