import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authenticateRoute from "./routes/authenticate.route.js";
import userRoute from "./routes/user.route.js";
import statusRoute from "./routes/status.route.js";

import connectMongo from "./mongoDB/connectMongo.js";

dotenv.config();

cloudinary.config({
	cloud_name: "dxazbajp9",
	api_key: "366728229941518",
	api_secret: "3wayYTl60M1R_op2sn9Y7zejc1M",
});

const app = express();
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/authenticate", authenticateRoute);
app.use("/api/users", userRoute);
app.use("/api/status", statusRoute);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5001; // Change to an available port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
	connectMongo();
});
