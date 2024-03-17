import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { ChevronUpDown } from './ChevronUpDown';
import { InvoiceAdd } from './InvoiceAdd';

type InvoiceData = {
	_id: String;
	invoiceNumber: string;
	paymentDate: string;
	clientName: string;
	invoiceSum: number;
	status: string;
};

type NavigationListButtonsProps = {
	invoiceData?: InvoiceData[]
	setAddInvoice: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavigationListButtons = ({setAddInvoice,invoiceData}: NavigationListButtonsProps) => {
	const { theme } = useTheme();

	return (
		<div className='w-full flex justify-center py-8'>
			<div className='flex flex-col w-1/2'>
				<div className='flex items-center w-full'>
					<div className='flex flex-col w-2/10  text-left'>
						<p
							className={`font-extrabold text-[36px] ${
								theme === 'light'
									? 'text-light-textBlack'
									: 'text-dark-textWhite'
							}`}
						>
							Invoices
						</p>
						<p
							className={`text-sm ${
								theme === 'light'
									? 'text-light-textLightBoth'
									: 'text-dark-textLightBoth'
							}`}
						>
							There are {invoiceData?.length} total invoices
						</p>
					</div>
					<div className='flex justify-end items-center w-6/10 h-1/2'>
						<div className='flex justify-between w-1/4'>
							<p
								className={`w-full h-1/2 text-[15px] my-2 font-bold ${
									theme === 'light'
										? 'text-light-textBlack'
										: 'text-dark-textWhite'
								}`}
							>
								Filter by status
							</p>
							<button className='flex justify-center items-center'>
								<ChevronUpDown />
							</button>
						</div>
					</div>
					<div className='flex justify-end items-center w-2/10 h-full'>
						<button onClick={() => setAddInvoice(true)} className=' w-4/6 h-1/2 flex items-center justify-evenly rounded-3xl bg-dark-buttonBackground'>
							<div className=' p-2 rounded-3xl bg-[#FFFFFF]'>
								<InvoiceAdd />
							</div>
							<p className='text-[#FFFFFF] font-bold text-xs'>Nev invoice</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
