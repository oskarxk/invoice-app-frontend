import React, { useEffect } from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import { useEmail } from '../hooks/useEmail';

export const Invoices = () => {
	const { theme } = useTheme();
	const { token } = useToken();
	const { email } = useEmail();

	const data = {
		address: '123 Main St',
		invoiceAuthor: 'John Doe',
		userEmail: 'graibuczy@gmail.com',
		city: 'Anytown',
		postCode: '12345',
		country: 'USA',
		clientName: 'John Doe',
		clientEmail: 'john.doe@example.com',
		clientAdress: '456 Elm St',
		clientCity: 'Othertown',
		clientPostCode: '54321',
		clientCountry: 'USA',
		invoiceDate: '2022-01-01T00:00:00.000Z',
		paymentDate: '2022-01-31T00:00:00.000Z',
		invoiceTitle: 'Invoice for Services',
		products: [
			{
				itemName: 'Consultation',
				quantity: 2,
				price: 100,
			},
			{
				itemName: 'Web Development',
				quantity: 1,
				price: 500,
			},
		],
	};

	useEffect(() => {
		console.log(email, token);
		const getInvoices = async () => {
			axios
				.get('http://localhost:4000/get-invoices', {
					headers: { Authorization: token },
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		getInvoices();
	}, []);

	const createInvoice = async () => {
		axios
			.post('http://localhost:4000/create-invoice', data, {
				headers: { Authorization: token },
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div
			className={`flex w-full h-screen ${
				theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
			}`}
		>
			<Navigation />
			{/* <p>invoices</p> */}
			<button onClick={() => createInvoice()}>HIT ME</button>

			{/* <input type='text' /> */}

			{/* <div className='relative max-w-sm'>
				<div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
					<svg
						className='w-4 h-4 text-gray-500 dark:text-gray-400'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
					</svg>
					<input
						
						type='date'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Select date'
					></input>
				</div>
			</div> */}
		</div>
	);
};
