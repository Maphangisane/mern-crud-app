import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { BASE_URL } from '../utils/constants';

function SignUpPage() {
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Validate form data
	const validate = () => {
		let tempErrors = {};
		tempErrors.name = formData.name ? '' : 'Name is required';
		tempErrors.username = formData.username ? '' : 'Username is required';
		tempErrors.password = formData.password ? '' : 'Password is required';
		tempErrors.confirmPassword = formData.confirmPassword
			? formData.password === formData.confirmPassword
				? ''
				: 'Passwords do not match'
			: 'Confirm password is required';
		setErrors(tempErrors);
		return Object.values(tempErrors).every((x) => x === '');
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		try {
			const res = await axios.post(`${BASE_URL}/api/auth/register`,
				formData,
			);
			// Redirect to sign-in page after successful registration
			// window.location.href = '/signin';
			navigate('/signin');
		} catch (err) {
			if (err.response && err.response.data) {
				setErrors({ general: err.response.data.message || 'An error occurred during registration.' });
			} else {
				setErrors({ general: 'An unexpected error occurred. Please try again.' });
			}
		}
	};

	return (
		<Container maxWidth="sm">
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
					// required
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
					// required
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
					// required
					/>
					<TextField
						fullWidth
						margin="normal"
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword}
					// required
					/>
					{errors.general && (
						<Typography color="error">{errors.general}</Typography>
					)}
					<Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
						Sign Up
					</Button>
				</form>
			</Box>
		</Container>
	);
}

export default SignUpPage;
