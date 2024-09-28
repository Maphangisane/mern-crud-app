// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import HomePage from './Components/HomePage';

function App() {

	return (
		<>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
