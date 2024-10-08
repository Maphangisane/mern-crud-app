const Note = require('../models/note');

// create a note
exports.createNote = async (req, res) => {
	try {
		const { title, content } = req.body;
		if (!title || !content) {
			return res.status(400).json({ error: 'All fields are required' });
		}
		
		const note = new Note({ ...req.body, createdBy: req.user.id });
		await note.save();
		res.status(201).json(note);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating note', error });
	}
};

// get all notes
exports.getNotes = async (req, res) => {
	try {
		const notes = await Note.find({ createdBy: req.user.id });

		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching notes', error });
	}
};

// Get a single note
exports.getNote = async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);

		if (note && note.createdBy.equals(req.user.id)) {
			res.status(200).json(note);
		} else {
			res.status(404).json({ message: 'Note not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching note', error });
	}
};

// Update a note
exports.updateNote = async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);

		if (note && note.createdBy.equals(req.user.id)) {
			Object.assign(note, req.body);
			await note.save();
			res.status(200).json(note);
		} else {
			res.status(404).json({ message: 'Note not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating note', error });
	}
};

// Delete a note
exports.deleteNote = async (req, res) => {
	try {
		const note = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

		if (note) {
			res.status(200).json({ message: 'Note deleted successfully' });
		} else {
			res.status(404).json({ message: 'Note not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error deleting note', error });
	}
};
