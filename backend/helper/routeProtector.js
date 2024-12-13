import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const JWT_SECRET = "tinggtongg";

export const routeProtector = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

		const decode = jwt.verify(token, JWT_SECRET);

		if (!decode) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}

		const user = await User.findById(decode.userId).select("-password");

		req.user = user;
		next();
	} catch (err) {
		console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};