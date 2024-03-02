import React from 'react';
import { SingleInvoice } from './SingleInvoice';
import { InvoiceAdd } from './Buttons/InvoiceAdd';
import { ChevronUpDown } from './Buttons/ChevronUpDown';

type Props = {
	currentTheme: string;
};

export const InvoiceList = ({ currentTheme }: Props) => {
	return (
		<div className='w-full flex justify-center'>
			<div className='flex flex-col w-1/2'>
				<div className='flex items-center w-full h-1/6'>
					<div className='flex flex-col w-2/10 h-1/2 text-left'>
						<p
							className={`font-extrabold text-[36px] ${
								currentTheme === 'light'
									? 'text-light-textBlack'
									: 'text-dark-textWhite'
							}`}
						>
							Invoices
						</p>
						<p
							className={`text-sm ${
								currentTheme === 'light'
									? 'text-light-textLightBoth'
									: 'text-dark-textLightBoth'
							}`}
						>
							There are x total invoices
						</p>
					</div>
					<div className='flex justify-end items-center w-6/10 h-1/2'>
						<div className='flex justify-between w-1/4'>
							<p
								className={`w-full h-1/2 text-[15px] my-2 font-bold ${
									currentTheme === 'light'
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
					<div className='flex justify-end items-center w-2/10 h-1/2'>
						<button className=' w-4/6 h-1/2 flex items-center justify-evenly rounded-3xl bg-dark-buttonBackground'>
							<div className=' p-2 rounded-3xl bg-[#FFFFFF]'>
								<InvoiceAdd />
							</div>
							<p className='text-[#FFFFFF] font-bold text-xs'>Nev invoice</p>
						</button>
					</div>
				</div>
				<div>
					<SingleInvoice />
				</div>
			</div>
		</div>
	);
};
