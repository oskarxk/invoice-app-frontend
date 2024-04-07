import React from 'react';
import { SingleInvoice } from './SingleInvoice';

type InvoiceData = {
	_id: string;
	invoiceNumber: string;
	paymentDate: string;
	clientName: string;
	invoiceSum: number;
	status: string;
};

type Props = {
	filteredInvoices?: InvoiceData[];
};

export const InvoiceList = ({ filteredInvoices }: Props) => {
	return (
		<div className='w-1/2 flex flex-col justify-center'>
			{filteredInvoices?.map((invoiceItem, index) => (
				<SingleInvoice
					key={index}
					_id={invoiceItem._id}
					invoiceNumber={invoiceItem.invoiceNumber}
					paymentDate={invoiceItem.paymentDate}
					clientName={invoiceItem.clientName}
					invoiceSum={invoiceItem.invoiceSum}
					status={invoiceItem.status}
				/>
			))}
		</div>
	);
};
