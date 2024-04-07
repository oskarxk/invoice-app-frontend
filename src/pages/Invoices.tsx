import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import { InvoiceList } from '../components/invoice-list/InvoiceList';
import { ToastContainer, toast } from 'react-toastify';
import { ToastTheme } from '../components/form-authentication-components/types';
import { NavigationListButtons } from '../components/invoice-list/Buttons/NavigationListButtons';
import { NothingHere } from '../components/invoice-list/NothingHere';
import { Loading } from '../components/invoice-list/Loading';
import { AddInvoice } from '../components/add-invoice/AddInvoice';
import FilterPopUp from '../components/invoice-list/FilterPopUp';

type InvoiceProduct = {
	itemName: string;
	quantity: number;
	price: number;
};

type InvoiceData = {
	_id: string;
	invoiceNumber: string;
	address: string;
	invoiceAuthorEmail: string;
	invoiceAuthorId: any;
	userEmail: string;
	city: string;
	postCode: string;
	country: string;
	clientName: string;
	clientEmail: string;
	clientAdress: string;
	clientCity: string;
	clientPostCode: string;
	clientCountry: string;
	invoiceDate: string;
	paymentDate: string;
	invoiceTitle: string;
	invoiceSum: number;
	status: string; 
	products: InvoiceProduct[];
};

type InvoiceListData = Pick<
	InvoiceData,
	| '_id'
	| 'invoiceNumber'
	| 'paymentDate'
	| 'clientName'
	| 'invoiceSum'
	| 'status'
>;

export const Invoices = () => {
	const { theme } = useTheme();
	const { token } = useToken();

	const [invoiceData, setInvoiceData] = useState<InvoiceListData[]>();
	const [notifyTheme, setNotifyTheme] = useState<ToastTheme>();
	const [notifyMessage, setNotifyMessage] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [addInvoice, setAddInvoice] = useState<boolean>(false);
	const [handleFilter, setHandleFilter] = useState<boolean>(false);

	const [selectedStatus, setSelectedStatus] = useState<string>('all');

	const handleStatusChange = () => {
		let filteredInvoices = invoiceData;

		if (filteredInvoices !== undefined) {
			if (selectedStatus !== 'all') {
				filteredInvoices = filteredInvoices.filter(
					(invoice) => invoice.status === selectedStatus
				);
			}

			if (selectedStatus === 'Paid') {
				filteredInvoices = filteredInvoices.filter(
					(invoice) => invoice.status === 'Paid'
				);
			}

			if (selectedStatus === 'Draft') {
				filteredInvoices = filteredInvoices.filter(
					(invoice) => invoice.status === 'Draft'
				);
			}

			if (selectedStatus === 'Pending') {
				filteredInvoices = filteredInvoices.filter(
					(invoice) => invoice.status === 'Pending'
				);
			}
			return filteredInvoices;
		}
	};

	const filteredInvoices = handleStatusChange();

	useEffect(() => {
		const getInvoices = async () => {
			setIsLoading(true);
			axios
				.get('http://localhost:4000/get-invoices', {
					headers: { Authorization: token },
				})
				.then((response) => {
					console.log('RESPONSE', response);

					const mappedData: InvoiceListData[] = response.data.userInvoices.map(
						(invoice: InvoiceData) => {
							return {
								_id: invoice._id,
								invoiceNumber: invoice.invoiceNumber,
								paymentDate: invoice.paymentDate,
								clientName: invoice.clientName,
								invoiceSum: invoice.invoiceSum,
								status: invoice.status,
							};
						}
					);
					setInvoiceData(mappedData);
					setIsLoading(false);
					setNotifyMessage(response.data.message);
					setNotifyTheme(ToastTheme.SUCCESS);
				})
				.catch((error) => {
					setNotifyMessage(error.response.data.message);
					setNotifyTheme(ToastTheme.ERROR);
				});
		};
		getInvoices();
	}, []);

	useEffect(() => {
		if (notifyMessage) {
			toast(notifyMessage, { type: notifyTheme });
			setNotifyMessage(undefined);
			setNotifyTheme(undefined);
		}
	}, [notifyMessage, notifyTheme]);

	console.log(invoiceData);

	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	}

	return (
		<div
			className={`flex w-full ${
				theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
			}`}
		>
			<ToastContainer
				position='bottom-right'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			{handleFilter && (
				<FilterPopUp
					selectedStatus={selectedStatus}
					setSelectedStatus={setSelectedStatus}
					handleStatusChange={handleStatusChange}
				/>
			)}
			<Navigation />
			<AddInvoice
				addInvoice={addInvoice}
				setAddInvoice={setAddInvoice}
				setNotifyMessage={setNotifyMessage}
				setNotifyTheme={setNotifyTheme}
			/>
			<div className='w-full items-center flex flex-col'>
				<NavigationListButtons
					invoiceData={invoiceData}
					setAddInvoice={setAddInvoice}
					handleFilter={handleFilter}
					setHandleFilter={setHandleFilter}
				/>
				{filteredInvoices && filteredInvoices.length !== 0 ? (
					<InvoiceList filteredInvoices={filteredInvoices} />
				) : (
					<NothingHere />
				)}
			</div>
		</div>
	);
};
