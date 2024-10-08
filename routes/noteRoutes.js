const express = require('express');

const {
	createNote,
	getNotes,
	getNote,
	updateNote,
	deleteNote,
} = require('../controllers/noteController');

const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateJWT, createNote);
router.get('/', authenticateJWT, getNotes);
router.get('/:id', authenticateJWT, getNote);
router.put('/:id', authenticateJWT, updateNote);
router.delete('/:id', authenticateJWT, deleteNote);

module.exports = router;
