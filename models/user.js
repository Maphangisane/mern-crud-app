const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	user_role: { type: String, required: true, default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
