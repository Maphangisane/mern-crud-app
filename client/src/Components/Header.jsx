import React, { useContext } from 'react';
import { Toolbar, TextField, Typography, Button } from '@mui/material';
import { isLoggedIn } from '/src/utils/auth.js';
import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveAppBarAuth from './ResponsiveAppBarAuth';
import ThemeToggleButton from './ThemeToggleButton';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
	// Get login status from the auth context
	const { isAuthenticated } = useContext(AuthContext);
	console.log('Header: Authenticated:', isAuthenticated);

	return (
		<div>
			<Toolbar>
				{isAuthenticated ? <ResponsiveAppBar /> : <ResponsiveAppBarAuth />}
				<ThemeToggleButton />
			</Toolbar>

		</div>
	)
}

export default Header