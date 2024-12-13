import Status from "../models/status.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createStatus = async (req, res) => {
	try {
		const { text } = req.body;
		let { img } = req.body;
		const userId = req.user._id.toString();

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if (!text && !img) {
			return res.status(400).json({ error: "Status must have text or image" });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newStatus = new Status({
			user: userId,
			text,
			img,
		});

		await newStatus.save();
		res.status(201).json(newStatus);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
		console.log("Error in createStatus controller: ", error);
	}
};

export const updateStatus = async (req, res) => {
	try {
		const { text, img } = req.body;
		const statusId = req.params.id;
		const userId = req.user._id.toString();

		const status = await Status.findById(statusId);
		if (!status) {
			return res.status(404).json({ error: "Status not found" });
		}

		if (status.user.toString() !== userId) {
			return res.status(401).json({ error: "You are not authorized to edit this status" });
		}

		if (text) {
			status.text = text;
		}
		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			status.img = uploadedResponse.secure_url;
		}

		await status.save();
		res.status(200).json(status);
	} catch (error) {
		console.log("Error in updateStatus controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteStatus = async (req, res) => {
	try {
		const status = await Status.findById(req.params.id);
		if (!status) {
			return res.status(404).json({ error: "Status not found" });
		}

		if (status.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "You are not authorized to delete this post" });
		}

		await Status.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Status deleted successfully" });
	} catch (error) {
		console.log("Error in deleteStatus controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllStatus = async (req, res) => {
	try {
		const status = await Status.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})

		if (status.length === 0) {
			return res.status(200).json([]);
		}

		res.status(200).json(status);
	} catch (error) {
		console.log("Error in getAllStatus controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUserStatus = async (req, res) => {
	try {
		const { username } = req.params;

		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ error: "User not found" });

		const status = await Status.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			});
			
		res.status(200).json(status);
	} catch (error) {
		console.log("Error in getUserStatus controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};