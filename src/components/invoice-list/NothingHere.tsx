import React from 'react';
import noInvoiceIMG from '../../assets/illustration-empty.svg';
import { useTheme } from '../../context/ThemeContext';

export const NothingHere = () => {
	const { theme } = useTheme();
	return (
		<div className='flex flex-col justify-center items-center my-24'>
			<img className='w-1/4' src={noInvoiceIMG} alt='Brak faktur' />
			<div className='py-8'>
				<h3
					className={` text-3xl ${
						theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
					}`}
				>
					There is nothing here
				</h3>
				<p
					className={` ${
						theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
					}`}
				>
					Create an invoice by clicking the New Invoice button and get started
				</p>
			</div>
		</div>
	);
};
