import React from 'react';
import { SingleInvoice } from './SingleInvoice';

type InvoiceData = {
	_id: String;
	invoiceNumber: string;
	paymentDate: string;
	clientName: string;
	invoiceSum: number;
	status: string;
};

type Props = {
	invoiceData?: InvoiceData[];
};

export const InvoiceList = ({ invoiceData }: Props) => {
	return (
		<div className='w-1/2 flex flex-col justify-center'>
			{invoiceData?.map((invoiceItem, index) => (
				<SingleInvoice
					key={index}
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
