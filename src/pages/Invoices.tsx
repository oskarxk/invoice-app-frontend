import React from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { useTheme } from '../context/ThemeContext';

export const Invoices = () => {
	const { theme } = useTheme();


	return (
		<div
			className={`flex w-full h-screen ${
				theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
			}`}
		>
			<Navigation />
			{/* <p>invoices</p> */}
		</div>
	);
};
