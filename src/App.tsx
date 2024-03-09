import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Authenthication } from './pages/Authenthication';
import { Invoices } from './pages/Invoices';
import { AuthenticationPrivateRoutes } from './components/form-authentication-components/AuthenticationPrivateRoutes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
	return (
		<ThemeProvider>
			<div className='App'>
				<Routes>
					<Route element={<AuthenticationPrivateRoutes />}>
						<Route element={<Invoices />} path='/invoices' />
					</Route>
					<Route element={<Authenthication />} path='/' />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
