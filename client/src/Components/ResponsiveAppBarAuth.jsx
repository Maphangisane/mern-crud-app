import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

// const navItems = ['Home', 'About', 'Contact'];
const authItems = ['SignIn', 'SignUp'];

// App bar with responsive menu
function ResponsiveAppBarAuth() {


	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					{/* Logo */}
					<Typography
						variant="h6"
						component={Link}
						to="/"
						sx={{ flexGrow: 0, textDecoration: 'none', color: 'inherit' }}
					>
						MERN
					</Typography>

					{/* Auth Navigation Items */}
					<Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
						{authItems.map((item) => (
							<Button key={item} sx={{ color: '#fff' }} component={Link} to={`/${item.toLowerCase()}`}>
								{item}
							</Button>
						))}
					</Box>
				</Toolbar>

			</AppBar>
			{/* Drawer Navigation */}


			{/* Main Content */}
			<Box component="main" sx={{ p: 3 }}>
				<Toolbar />
				{/* <Typography>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
					fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
					aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
					cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
					at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
					Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed

				</Typography> */}
			</Box>
		</Box >
	);
}

ResponsiveAppBarAuth.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};
export default ResponsiveAppBarAuth;
