const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config(); // load environment variables
connectDB(); // database connection

const app = express();
app.use(cors()); // allow all origins
app.use(express.json()); // parsing

// HTTP requests logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')); // Log HTTP requests in development mode
	console.log(colors.yellow.bold("Morgan enabled for development logging"));
} else if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined')); // Log HTTP requests in production mode
	console.log(colors.magenta.bold("Morgan enabled for production logging"));
}

// Serve static files
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, './client/dist')));

	// React app routing
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
	});
}

// routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware); // error handling

const PORT = process.env.PORT || 5000;
// Conditional host configuration for external and local access
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';

app.listen(PORT, HOST, () => {
	console.log(`Server running in ${process.env.NODE_ENV.green} mode on ${`http://${HOST}:${PORT}`.cyan}`);
});

