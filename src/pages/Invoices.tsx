import React from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { InvoiceList } from '../components/invoice-list/InvoiceList';

type Props = {
	currentTheme: string;
	setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const Invoices = ({ currentTheme, setCurrentTheme }: Props) => {

	return (
		<div
			className={`flex w-full h-screen ${
				currentTheme === 'light' ? 'bg-light-background' : 'bg-dark-background'
			}`}
		>
			<Navigation
				currentTheme={currentTheme}
				setCurrentTheme={setCurrentTheme}
			/>
			<InvoiceList currentTheme={currentTheme} />
		</div>
	);
};
