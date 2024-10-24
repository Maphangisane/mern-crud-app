// import './App.css';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
// components
import Header from "./Components/Header";
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import PrivateRoutes from './Components/PrivateRoutes';
import NotFound from './Components/NotFound';
import { isLoggedIn } from './utils/auth';

function App() {
	// const { isAuthenticated } = useContext(AuthContext);
	const isAuthenticated = isLoggedIn();

	return (
		<>
			<AuthProvider>
				<SearchProvider>
					<ThemeProvider>
						<BrowserRouter>
							<Header />

							<Routes>
								{/* Public routes */}
								<Route
									path="/signin"
									element={
										isAuthenticated ? <Navigate to="/" /> : <SignInPage />
									}
								/>
								<Route
									path="/signup"
									element={
										isAuthenticated ? <Navigate to="/" /> : <SignUpPage />
									}
								/>

								{/* Protected routes */}
								<Route
									path="/"
									element={
										<PrivateRoutes>
											<HomePage />
										</PrivateRoutes>
									}
								/>
								<Route path="*" element={<NotFound />} />
							</Routes>

							<Footer />
						</BrowserRouter>
					</ThemeProvider>
				</SearchProvider>
			</AuthProvider>
		</>
	);
}

export default App;