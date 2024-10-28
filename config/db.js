const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log(colors.bold.green('MongoDB connected successfully.'));
	} catch (error) {
		console.error(colors.red('MongoDB connection failed:', error));
		process.exit(1);
	}
};

module.exports = connectDB;
