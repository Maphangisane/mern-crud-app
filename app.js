const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config(); // load environment variables
connectDB(); // database connection

const app = express();
app.use(cors()); // security
app.use(express.json()); // parsing

if (process.env.NODE_ENV === 'development') {
	const morgan = require('morgan');
	app.use(morgan('dev')); // Log HTTP requests
}

// Serve static files
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, './client/dist')));

	// React app routing
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
	});

	// const morgan = require('morgan');
	// app.use(morgan('combined'));
}

// routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware); // error handling

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});

