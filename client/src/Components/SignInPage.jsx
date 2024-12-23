import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

function SignInPage() {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const validate = () => {
		let tempErrors = {};
		tempErrors.username = formData.username ? '' : 'Username is required';
		tempErrors.password = formData.password ? '' : 'Password is required';
		setErrors(tempErrors);
		return Object.values(tempErrors).every((x) => x === '');
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		try {
			// passing form data on login function from context
			await login(formData.username, formData.password);
			navigate('/');
		} catch (err) {
			if (err.response && err.response.data) {
				setErrors({ general: err.response.data.message || 'An error occurred during login.' });
			} else {
				setErrors({ general: 'An unexpected error occurred. Please try again to login' });
			}
		}
	};


	return (
		<Container maxWidth="sm">
			{/* Login */}
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Sign In
				</Typography>
				<form onSubmit={handleLogin}>
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

					{errors.general && (
						<Typography color="error">
							{errors.general}
						</Typography>
					)}

					<Button variant="contained" color="primary" type="submit">
						Sign In
					</Button>
				</form>
			</Box>
		</Container>
	);
}

export default SignInPage;
