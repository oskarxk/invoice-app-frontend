import React from 'react';
import { useTheme } from '../../context/ThemeContext';

type InvoiceDataProps = {
	invoiceNumber: string;
	paymentDate: string;
	clientName: string;
	invoiceSum: number;
	status: string;
};

export const SingleInvoice = ({
	invoiceNumber,
	paymentDate,
	clientName,
	invoiceSum,
	status,
}: InvoiceDataProps) => {
	const { theme } = useTheme();
	return (
		<div
			className={`flex justify-around items-center w-full my-4 py-6 rounded-xl ${
				theme === 'light' ? 'bg-light-invoiceBG' : 'bg-dark-invoiceBG'
			}`}
		>
			<p>{invoiceNumber}</p>
			<p>{paymentDate}</p>
			<p>{clientName}</p>
			<p>${invoiceSum}</p>
			<p>{status}</p>
			<button>Edit</button>
		</div>
	);
};
