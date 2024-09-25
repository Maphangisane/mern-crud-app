const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/constants');

// Register new user
exports.register = async (req, res) => {
	const { username, password } = req.body;

	// Validate request body
	if (!username || !password) {
		return res.status(400).json({ error: 'Username and password are required' });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const user = new User({ username, password: hashedPassword });

	await user.save();
	res.status(201).send('User registered');
};

// Login a user
exports.login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
		res.json({ token });
	} else {
		res.status(401).send('Invalid credentials');
	}
};
