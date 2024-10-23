import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Notes from '../Components/Notes'
import { useTheme } from '../contexts/ThemeContext';

function HomePage() {
	// const navigate = useNavigate();
	const { theme } = useTheme(); // Access the theme

	const containerStyle = {
		backgroundColor: theme.palette.background,
		color: theme.palette.text,
		minHeight: '100vh',
		padding: '20px',
	}

	const userName = localStorage.getItem("userName");
	return (
		<div style={containerStyle}>
			<Container>
				<Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
					Welcome {userName}
					<Notes />
				</Typography>

			</Container>
		</div>
	)
}

export default HomePage