// routes/itemRoutes.js
const express = require('express');

const {
	createItem,
	getItems,
	getItem,
	updateItem,
	deleteItem,
} = require('../controllers/itemController');

const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateJWT, createItem);
router.get('/', authenticateJWT, getItems);
router.get('/:id', authenticateJWT, getItem);
router.put('/:id', authenticateJWT, updateItem);
router.delete('/:id', authenticateJWT, deleteItem);

module.exports = router;
