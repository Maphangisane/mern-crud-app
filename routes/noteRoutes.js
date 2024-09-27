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
router.get('/note/:id', authenticateJWT, getNote);
router.put('/note/:id', authenticateJWT, updateNote);
router.delete('/note/:id', authenticateJWT, deleteNote);

module.exports = router;
