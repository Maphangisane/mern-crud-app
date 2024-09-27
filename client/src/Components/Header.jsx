import React from 'react'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { isLoggedIn } from '/src/utils/auth.js';
import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveAppBarAuth from './ResponsiveAppBarAuth';


function Header() {
	// Get login status
	const loggedIn = isLoggedIn();
	console.log('loggedIn: ' + loggedIn);

	return (
		<div>
			<Toolbar>
				{loggedIn ? <ResponsiveAppBar /> : <ResponsiveAppBarAuth />}
			</Toolbar>

		</div>
	)
}

export default Header