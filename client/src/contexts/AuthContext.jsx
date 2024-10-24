import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
	const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
	const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

	useEffect(() => {
		if (authToken) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
		}
	}, [authToken]);

	const login = async (username, password) => {
		const requestBody = { username, password };

		const res = await axios.post('http://localhost:5000/api/auth/login', requestBody, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const { access_token, name } = res.data;

		if (access_token) {
			setAuthToken(access_token);
			setUserName(name);
			setIsAuthenticated(true);
			axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
			localStorage.setItem("authToken", access_token);
			localStorage.setItem("userName", name);
		} else {
			throw new Error('Invalid username or password');
		}
	};

	const logout = () => {
		setAuthToken(null);
		setUserName(null);
		setIsAuthenticated(false);
		localStorage.removeItem("authToken");
		localStorage.removeItem("userName");
		delete axios.defaults.headers.common['Authorization'];
		window.location.href = '/signin';
	};


	return (
		<AuthContext.Provider value={{ isAuthenticated, userName, authToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
