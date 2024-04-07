import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import moment from 'moment';
import { Link } from 'react-router-dom';

type InvoiceDataProps = {
	_id: string;
	invoiceNumber: string;
	paymentDate: string;
	clientName: string;
	invoiceSum: number;
	status: string;
};

export const SingleInvoice = ({
	_id,
	invoiceNumber,
	paymentDate,
	clientName,
	invoiceSum,
	status,
}: InvoiceDataProps) => {
	const { theme } = useTheme();

	console.log('NUMBER', invoiceNumber);

	const formattedDate = moment(paymentDate).format('DD MMM YYYY');

	return (
		<div
			className={`flex justify-around items-center w-full my-4 py-6 rounded-xl shadow-md shadow-grey  ${
				theme === 'light' ? 'bg-light-invoiceBG' : 'bg-dark-invoiceBG'
			}`}
		>
			<div
				className={`w-1/6 text-center font-bold ${
					theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
				}`}
			>
				<p>{invoiceNumber}</p>
			</div>
			<div
				className={`w-1/6 text-center ${
					theme === 'light' ? 'text-light-inputFont' : 'text-dark-inputFont'
				}`}
			>
				<p>{`Due ${formattedDate}`}</p>
			</div>
			<div
				className={`w-1/6 text-center ${
					theme === 'light' ? 'text-[#858BB2]' : 'text-[#FFFFFF]'
				}`}
			>
				<p>{clientName}</p>
			</div>
			<div
				className={` w-1/10 text-right font-bold ${
					theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
				}`}
			>
				<p>${invoiceSum}</p>
			</div>
			<div
				className={`w-1/10 text-center font-bold bg-opacity-10 rounded-lg ${
					status === 'Paid'
						? 'text-[#33D69F] bg-[#33D69F]'
						: status === 'Pending'
						? 'text-[#FF8F00] bg-[#FF8F00]'
						: status === 'Draft'
						? 'text-[#373B53] bg-[#373B53]'
						: 'text-[#373B53] bg-[#373B53]'
				}
				${status === 'Draft' && theme === 'dark' ? 'text-[#DFE3FA]' : ''}
				`}
			>
				<p className='py-2'>• {status}</p>
			</div>
			<div
				className={` w-1/10 text-center ${
					theme === 'light' ? 'text-light-inputFont' : 'text-dark-inputFont'
				}`}
			>
				<Link to={`./${_id}`}>
					<button>
						<FaChevronRight />
					</button>
				</Link>
			</div>
		</div>
	);
};
