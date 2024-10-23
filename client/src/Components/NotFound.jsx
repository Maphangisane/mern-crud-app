import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

function NotFound() {
	return (
		<Container style={{ textAlign: 'center', marginTop: '70px', minHeight: '70vh', }}>
			<Typography variant="h3" color="error" gutterBottom>
				404 - Page Not Found
			</Typography>
			<Typography variant="h6" gutterBottom>
				Sorry, the page you are looking for does not exist.
			</Typography>
			<Button variant="contained" color="primary" component={Link} to="/">
				Go Home
			</Button>
		</Container>
	);
}

export default NotFound;