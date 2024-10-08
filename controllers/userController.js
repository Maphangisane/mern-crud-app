const User = require('../models/user');
const bcrypt = require('bcryptjs');

// get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error: Failed to get users' });
	}
};

// create a user eg admin
exports.createUser = async (req, res) => {
	try {
		const { name, username, password, user_role } = req.body;

		if (!name || !username || !password || !user_role) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: 'Username is already taken' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({ name, username, password: hashedPassword, user_role });
		await user.save();

		res.status(201).json({ message: 'User created successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error: Failed to create user' });
	}
};

// Get a single user
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error: Failed to get user' });
	}
};

// Update an user
exports.updateUser = async (req, res) => {
	try {
		const { name, username, password, user_role } = req.body;
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		if (username && username !== user.username) {
			const existingUser = await User.findOne({ username });
			if (existingUser) {
				return res.status(400).json({ error: 'Username is already taken' });
			}
		}

		if (password) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
		}

		user.name = name || user.name;
		user.username = username || user.username;
		user.user_role = user_role || user.user_role;

		await user.save();
		res.status(200).json({ message: 'User updated successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error: Failed to update user' });
	}
};

// Delete an user
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		await User.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'User deleted successfully' });
		// res.status(204).end(); // no content
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error: Failed to delete user' });
	}
};
