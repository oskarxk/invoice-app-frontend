import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FaChevronRight, FaChevronUp, FaPlus } from 'react-icons/fa';

type InvoiceData = {
	_id: String;
	invoiceNumber: string;
	paymentDate: string;
	clientName: string;
	invoiceSum: number;
	status: string;
};

type NavigationListButtonsProps = {
	invoiceData?: InvoiceData[];
	setAddInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	setHandleFilter: React.Dispatch<React.SetStateAction<boolean>>;
	handleFilter: boolean;
};

export const InvoiceListNavigation = ({
	setAddInvoice,
	invoiceData,
	setHandleFilter,
	handleFilter,
}: NavigationListButtonsProps) => {
	const { theme } = useTheme();

	return (
		<div
			className={`w-full flex justify-center py-8 sticky top-0 z-10 ${
				theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
			}`}
		>
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
							<button
								onClick={() => setHandleFilter(!handleFilter)}
								className={`flex justify-center items-center text-xl p-2}`}
							>
								{!handleFilter ? (
									<FaChevronRight className='text-[#7C5DFA]' />
								) : (
									<FaChevronUp className='text-[#7C5DFA]' />
								)}
							</button>
						</div>
					</div>
					<div className='flex justify-end items-center w-2/10 h-full'>
						<button
							onClick={() => setAddInvoice(true)}
							className=' w-4/6 h-1/2 flex items-center justify-evenly rounded-3xl bg-dark-buttonBackground'
						>
							<div className=' p-1 rounded-3xl bg-[#FFFFFF] text-[#7C5DFA]'>
								<FaPlus />
							</div>
							<p className='text-[#FFFFFF] font-bold text-xs'>Nev invoice</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
