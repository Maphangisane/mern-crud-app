import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Notes from '../Components/Notes'
import { useTheme } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

function HomePage() {
	const { theme } = useTheme();
	const { userName } = useContext(AuthContext);

	const containerStyle = {
		backgroundColor: theme.palette.background,
		color: theme.palette.text,
		minHeight: '100vh',
		padding: '20px',
	}

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