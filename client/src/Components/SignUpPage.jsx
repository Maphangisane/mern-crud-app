import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';


function SignUpPage() {
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		password: ''
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// form data is validation
	const validate = () => {
		let tempErrors = {};
		tempErrors.name = formData.name ? '' : 'Name is required';
		tempErrors.username = formData.username ? '' : 'Username is required';
		tempErrors.password = formData.password ? '' : 'Password is required';
		setErrors(tempErrors);
		return Object.values(tempErrors).every((x) => x === '');
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/auth/register',
				formData,
				// { withCredentials: true }
			);
			console.log('User registered:', res.data);
			window.location.href = '/signin';
		} catch (err) {
			console.error('Error:', err.response.data);
		}
	};


	return (
		<Container maxWidth="sm">
			{/* Register */}
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Sign Up
				</Typography>
				<form onSubmit={handleRegister}>
					<TextField
						fullWidth
						margin="normal"
						label="Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
						required
					/>
					<TextField
						fullWidth
						margin="normal"
						label="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						error={!!errors.username}
						helperText={errors.username}
						required
					/>
					<TextField
						fullWidth
						margin="normal"
						label="Password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						error={!!errors.password}
						helperText={errors.password}
						required
					/>
					<Button variant="contained" color="primary" type="submit">
						Sign Up
					</Button>
				</form>
			</Box>

		</Container>
	);
}

export default SignUpPage;
