import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { isLoggedIn } from '../utils/auth';

function PrivateRoutes({ children }) {
	const { isAuthenticated } = useContext(AuthContext);
	// const isAuthenticated = isLoggedIn();
	console.log('PrivateRoutes: Authenticated:', isAuthenticated);

	if (!isAuthenticated) {
		console.log('loggedIn: ' + isAuthenticated);
		return <Navigate to="/signin" />;
	}

	return children;
}

export default PrivateRoutes;
