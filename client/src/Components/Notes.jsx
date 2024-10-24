import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
	Card,
	CardContent,
	IconButton,
	Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '../contexts/ThemeContext';
import { SearchContext } from '../contexts/SearchContext';
import { AuthContext } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import { BASE_URL } from '../utils/constants';


const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [editNoteId, setEditNoteId] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const { theme, toggleTheme } = useTheme();
	const { authToken } = useContext(AuthContext);
	const { searchQuery } = useContext(SearchContext);

	// const apiUrl = '${BASE_URL}/api/notes';
	const token = authToken;

	// Get all notes
	const fetchNotes = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/api/notes`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setNotes(response.data);
		} catch (error) {
			console.error('Error fetching notes', error);
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	// create new note
	const createNote = async () => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/notes`,
				{ title, content },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setNotes([...notes, response.data]);
			setTitle('');
			setContent('');
			setShowForm(false);
		} catch (error) {
			console.error('Error creating note', error);
		}
	};

	// update note
	const updateNote = async () => {
		try {
			const response = await axios.put(
				`${BASE_URL}/api/notes/${editNoteId}`,
				{ title, content },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setNotes(notes.map(note => (note._id === editNoteId ? response.data : note)));
			// clear input fields
			setTitle('');
			setContent('');
			setIsEditing(false);
			setEditNoteId(null);
			setShowForm(false);
		} catch (error) {
			console.error('Error updating note', error);
		}
	};

	// delete note
	const deleteNote = async (id) => {
		try {
			await axios.delete(`${BASE_URL}/api/notes/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setNotes(notes.filter(note => note._id !== id));
		} catch (error) {
			console.error('Error deleting note', error);
		}
	};

	// Handle edit note
	const handleEdit = (note) => {
		setTitle(note.title);
		setContent(note.content);
		setIsEditing(true);
		setEditNoteId(note._id);
		setShowForm(true);
	};

	// Filter notes based on search query
	const filteredNotes = Array.isArray(notes)
		? notes.filter(note => {
			// Fallback to an empty string if title or content is null
			const title = note.title?.toLowerCase() || '';
			const content = note.content?.toLowerCase() || '';

			return title.includes(searchQuery.toLowerCase()) || content.includes(searchQuery.toLowerCase());
		})
		: []; // Fallback to an empty array

	return (
		<Container maxWidth="sm">
			<Box mt={5}>
				<Typography variant="h4" gutterBottom style={{ color: theme.palette.text }}>
					Notes
				</Typography>

				{/* Add the SearchBar component */}
				<SearchBar />

				{!showForm && (
					<Button
						variant="contained"
						color="primary"
						onClick={() => setShowForm(true)}
						fullWidth
					>
						Add Note
					</Button>
				)}

				{showForm && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							isEditing ? updateNote() : createNote();
						}}
					>
						<TextField
							label="Title"
							variant="outlined"
							fullWidth
							margin="normal"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<TextField
							label="Content"
							variant="outlined"
							fullWidth
							multiline
							rows={4}
							margin="normal"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							fullWidth
							sx={{ mt: 2 }}
						>
							{isEditing ? 'Update Note' : 'Add Note'}
						</Button>
						<Button
							variant="text"
							color="secondary"
							onClick={() => {
								setShowForm(false);
								setIsEditing(false);
								setTitle('');
								setContent('');
							}}
							fullWidth
							sx={{ mt: 1 }}
						>
							Cancel
						</Button>
					</form>
				)}
			</Box>

			<Grid container spacing={2} mt={4}>
				{filteredNotes.map((note) => (
					// {notes.map((note) => (
					<Grid item xs={12} key={note._id}>
						<Card style={{ background: theme.palette.background }}>
							<CardContent>
								<Typography variant="h5" style={{ color: theme.palette.text }}>{note.title}</Typography>
								<Typography variant="body2" color="textSecondary">
									{note.content}
								</Typography>
								<Typography variant="caption" color="textSecondary" mt={1}>
									Created on: {new Date(note.createdAt).toLocaleDateString()}
								</Typography>
								<Box mt={2}>
									<IconButton
										aria-label="edit"
										onClick={() => handleEdit(note)}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										aria-label="delete"
										onClick={() => deleteNote(note._id)}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Notes;
