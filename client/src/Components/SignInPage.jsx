import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function SignInPage() {
	const [formData, setFormData] = useState({
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
		tempErrors.username = formData.username ? '' : 'Username is required';
		tempErrors.password = formData.password ? '' : 'Password is required';
		setErrors(tempErrors);
		return Object.values(tempErrors).every((x) => x === '');
	};


	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/auth/login', {
				username: formData.username,
				password: formData.password
				// }, { withCredentials: true });
			})
			console.log(res.data);
		} catch (err) {
			console.error(err.response.data);
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
						Sign In
					</Button>
				</form>
			</Box>
		</Container>
	);
}

export default SignInPage;
