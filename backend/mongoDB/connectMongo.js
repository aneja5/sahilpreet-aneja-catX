import mongoose from "mongoose";

const endpoint = process.env.MONGODB_URI;

const connectMongo = async () => {
	try {
		const conn = await mongoose.connect(endpoint);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error connection to mongoDB: ${error.message}`);
		process.exit(1);
	}
};

export default connectMongo;