import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';


function HomePage() {
	const navigate = useNavigate();
	return (
		<div>
			<Container>
				<Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
					Welcome to MERN CRUD with Material-UI
				</Typography>

			</Container>
		</div>
	)
}

export default HomePage