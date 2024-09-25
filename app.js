const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Error handling middleware (always last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

