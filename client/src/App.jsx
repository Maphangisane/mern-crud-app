import { useState } from 'react';
import axios from 'axios';

function App() {
	const [formData, setFormData] = useState({
		// name: '',
		username: '',
		password: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/auth/register',
				formData,
				// { withCredentials: true }
			);
			console.log('User registered:', res.data);
		} catch (err) {
			console.error('Error:', err.response.data);
		}
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
		<div className="App">
			<h1>Register</h1>
			<form onSubmit={handleRegister}>
				{/* <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /> */}
				{/* <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> */}
				<input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
				<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
				<button type="submit">Register</button>
			</form>

			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				{/* <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> */}
				<input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
				<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default App;
