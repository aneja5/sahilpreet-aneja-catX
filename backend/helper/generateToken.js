import jwt from "jsonwebtoken";

const JWT_SECRET = "tinggtongg";

export const generateToken = (userId, res) => {
	const token = jwt.sign({ userId }, JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
	});
};