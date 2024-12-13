import mongoose from "mongoose";

const endpoint = 'mongodb+srv://aneja:Fateh_01@webdev.dvkzt.mongodb.net/?retryWrites=true&w=majority&appName=WebDev';

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