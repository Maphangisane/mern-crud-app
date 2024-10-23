import { useTheme } from '../contexts/ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<IconButton
			onClick={toggleTheme}
			color="inherit"
			aria-label="toggle theme"
		>
			{theme.palette.background === '#fff' ? (
				<Brightness4 /> // Sun icon for light mode
			) : (
				<Brightness7 /> // Moon icon for dark mode
			)}
		</IconButton>
	);
};

export default ThemeToggleButton;
