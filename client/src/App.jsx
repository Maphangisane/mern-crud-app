// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from "./Components/Header";
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import PrivateRoutes from './Components/PrivateRoutes';
import NotFound from './Components/NotFound';

function App() {

	return (
		<>
			<ThemeProvider>
				<BrowserRouter>
					<Header />

					<Routes>
						{/* Public routes */}
						<Route path="/signin" element={<SignInPage />} />
						<Route path="/signup" element={<SignUpPage />} />

						{/* Protected routes*/}
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
		</>
	);
}

export default App;
