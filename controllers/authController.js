const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/constants');

// Register new user
exports.register = async (req, res) => {
	try {
		const { name, username, password } = req.body;

		if (!name || !username || !password) {
			return res.status(400).json({ error: 'name, username and password are required' });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: 'Username is already taken' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({ name, username, password: hashedPassword, user_role: 'user' });
		await user.save();

		res.status(201).json({ message: 'User signed up successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Server error: User failed to register' });
	}
};

// Login a user
exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			const access_token = jwt.sign(
				{ id: user._id, username: user.username },
				JWT_SECRET,
				{ expiresIn: '1h' }
			);

			// res.json({ access_token });
			res.status(200).json({ access_token, name: user.name });
		} else {
			res.status(401).json({ message: 'Invalid credentials' }); // json
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error: Failed to login' });
	}
};
