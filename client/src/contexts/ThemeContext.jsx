import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState({
		palette: {
			primary: '#1976d2',
			secondary: '#dc004e',
			background: '#fff',
			text: '#000',
		},
	});

	const toggleTheme = () => {
		setTheme((prevTheme) => ({
			...prevTheme,
			palette: {
				// creates new theme
				// primary: prevTheme.palette.secondary,
				// secondary: prevTheme.palette.primary,
				// background: prevTheme.palette.text,
				// text: prevTheme.palette.background,

				// toggles between a light and dark mode
				...prevTheme.palette,
				background: prevTheme.palette.background === '#fff' ? '#333' : '#fff',
				text: prevTheme.palette.text === '#000' ? '#fff' : '#000',
			},
		}));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	return useContext(ThemeContext);
};
