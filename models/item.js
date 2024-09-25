const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Item', itemSchema);
