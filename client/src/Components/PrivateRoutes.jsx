import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '/src/utils/auth.js';

function PrivateRoutes({ children }) {
	const authenticated = isLoggedIn();

	if (!authenticated) {
		return <Navigate to="/signin" />;
	}

	return children;
}

export default PrivateRoutes;
