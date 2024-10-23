import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoutes({ children }) {
	const { isAuthenticated } = useContext(AuthContext);
	console.log('loggedIn: ' + isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/signin" />;
	}

	return children;
}

export default PrivateRoutes;
