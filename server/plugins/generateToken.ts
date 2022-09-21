import jwt from "jsonwebtoken";

export default defineEventHandler((id) => {
	console.log(id);
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
});
