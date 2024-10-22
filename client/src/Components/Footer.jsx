import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
	return (
		<Box
			sx={{
				backgroundColor: '#f8f8f8',
				padding: '20px 0',
				position: 'relative',
				bottom: 0,
				width: '100%',
				marginTop: 'auto',
			}}
		>
			<Container maxWidth="lg">
				<Typography variant="body2" color="text.secondary" align="center">
					{'Copyright © '}
					{/* <Link color="inherit" href="https://portfolio.maphangisane.tech/">
						Maphangisane
					</Link>{' '} */}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Container>
		</Box>
	);
}

export default Footer