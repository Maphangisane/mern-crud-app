import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Notes from '../Components/Notes'

function HomePage() {
	// const navigate = useNavigate();
	const userName = localStorage.getItem("userName");
	return (
		<div>
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