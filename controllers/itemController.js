const Item = require('../models/item');

// create an item
exports.createItem = async (req, res) => {
	const item = new Item({ ...req.body, createdBy: req.user.id });
	await item.save();
	res.status(201).json(item);
};

// get all items
exports.getItems = async (req, res) => {
	const items = await Item.find({ createdBy: req.user.id });
	res.json(items);
};

// Get a single item
exports.getItem = async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (item && item.createdBy.equals(req.user.id)) {
		res.json(item);
	} else {
		res.status(404).send('Item not found');
	}
};

// Update an item
exports.updateItem = async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (item && item.createdBy.equals(req.user.id)) {
		Object.assign(item, req.body);
		await item.save();
		res.json(item);
	} else {
		res.status(404).send('Item not found');
	}
};

// Delete an item
exports.deleteItem = async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (item && item.createdBy.equals(req.user.id)) {
		await item.remove();
		res.status(204).send();
	} else {
		res.status(404).send('Item not found');
	}
};
