import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import { Navigation } from '../components/navigation/Navigation';
import { ToastContainer } from 'react-toastify';
import { FaChevronLeft } from 'react-icons/fa';
import moment from 'moment';
import { InvoiceData } from '../types/Invoice';

export const InvoiceInfo = () => {
	const { theme } = useTheme();
	const { token } = useToken();
	const { invoideId } = useParams();

	const [singleInvoiceData, setSingleInvoiceData] = useState<InvoiceData>();

	const formattedInvoiceDate = moment(singleInvoiceData?.invoiceDate).format(
		'DD MMM YYYY'
	);
	const formattedPaymentDate = moment(singleInvoiceData?.paymentDate).format(
		'DD MMM YYYY'
	);

	console.log(invoideId);

	useEffect(() => {
		const getInvoices = async () => {
			// setIsLoading(true);
			axios
				.get(`http://localhost:4000/get-single-invoice/${invoideId}`, {
					headers: { Authorization: token },
				})
				.then((response) => {
					// console.log('RESPONSE', response);
					setSingleInvoiceData(response.data.userSingleInvoice);

					// const mappedData: InvoiceListData[] = response.data.userInvoices.map(
					// 	(invoice: InvoiceData) => {
					// 		return {
					// 			_id: invoice._id,
					// 			invoiceNumber: invoice.invoiceNumber,
					// 			paymentDate: invoice.paymentDate,
					// 			clientName: invoice.clientName,
					// 			invoiceSum: invoice.invoiceSum,
					// 			status: invoice.status,
					// 		};
					// 	}
					// );
					// setInvoiceData(mappedData);
					// setIsLoading(false);
					// setNotifyMessage(response.data.message);
					// setNotifyTheme(ToastTheme.SUCCESS);
				})
				.catch((error) => {
					// setNotifyMessage(error.response.data.message);
					// setNotifyTheme(ToastTheme.ERROR);
					console.log(error);
				});
		};
		getInvoices();
	}, []);

	const navigate = useNavigate();

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
			<Navigation />
			{singleInvoiceData && (
				<div className='w-full flex justify-center '>
					<div className='w-1/2 flex items-center my-4 py-6 flex-col'>
						<div className='w-full flex items-start justify-start my-4'>
							<FaChevronLeft
								className='text-2xl text-[#7C5DFA] cursor-pointer'
								onClick={() => navigate(-1)}
							/>
							<p
								className={`px-4 text-lg font-bold ${
									theme === 'light'
										? 'text-light-textBlack'
										: ' text-dark-textWhite'
								}`}
							>
								Go Back
							</p>
						</div>
						<div
							className={`w-full shadow-md shadow-grey flex items-center justify-between my-4 py-4 rounded-lg ${
								theme === 'light' ? 'bg-light-invoiceBG' : 'bg-dark-invoiceBG'
							}`}
						>
							<div className=' w-2/10 flex items-center justify-between px-2'>
								<p
									className={`px-2 text-sm ${
										theme === 'light' ? 'text-[#858BB2]' : 'text-[#DFE3FA]'
									}`}
								>
									Status
								</p>
								<div
									className={` text-center font-bold bg-opacity-10 rounded-lg px-4 ${
										singleInvoiceData.status === 'Paid'
											? 'text-[#33D69F] bg-[#33D69F]'
											: singleInvoiceData.status === 'Pending'
											? 'text-[#FF8F00] bg-[#FF8F00]'
											: singleInvoiceData.status === 'Draft'
											? 'text-[#373B53] bg-[#373B53]'
											: 'text-[#373B53] bg-[#373B53]'
									}
				${
					singleInvoiceData.status === 'Draft' && theme === 'dark'
						? 'text-[#DFE3FA]'
						: ''
				}
				`}
								>
									<p className='py-2'>• {singleInvoiceData.status}</p>
								</div>
							</div>
							<div className=' w-1/3 flex justify-between font-bold px-2'>
								<button
									className={`px-4 py-2 rounded-3xl ${
										theme === 'light'
											? 'text-[#7E88C3] bg-[#F9FAFE]'
											: 'text-[#DFE3FA] bg-[#252945]'
									}`}
								>
									Edit
								</button>
								<button
									className={`px-4 py-2 rounded-3xl ${
										theme === 'light'
											? 'text-[#FFFFFF] bg-[#EC5757]'
											: 'text-[#FFFFFF] bg-[#EC5757]'
									}`}
								>
									Delete
								</button>

								<button
									className={`px-4 py-2 rounded-3xl ${
										theme === 'light'
											? 'text-[#FFFFFF] bg-[#7C5DFA]'
											: 'text-[#FFFFFF] bg-[#7C5DFA]'
									}`}
								>
									Mark as Paid
								</button>
							</div>
						</div>
						<div
							className={`w-full shadow-md shadow-grey flex flex-col items-center justify-between my-4 py-4 rounded-lg ${
								theme === 'light' ? 'bg-light-invoiceBG' : 'bg-dark-invoiceBG'
							}`}
						>
							<div className='w-full flex justify-between'>
								<div className='w-1/2 flex flex-col items-start px-10'>
									<p
										className={`px-1 font-bold ${
											theme === 'light'
												? ' text-light-textBlack'
												: 'text-light-whiteBackground'
										}`}
									>
										{singleInvoiceData.invoiceNumber}
									</p>
									<p
										className={`px-1 pt-1 ${
											theme === 'light'
												? 'text-light-inputFont'
												: 'text-dark-inputFont'
										}`}
									>
										{singleInvoiceData.invoiceTitle}
									</p>
								</div>
								<div className='w-1/2 flex flex-col items-end px-10'>
									<p
										className={`px-1 ${
											theme === 'light'
												? 'text-light-inputFont'
												: 'text-dark-inputFont'
										}`}
									>
										{singleInvoiceData.address}
									</p>
									<p
										className={`px-1 ${
											theme === 'light'
												? 'text-light-inputFont'
												: 'text-dark-inputFont'
										}`}
									>
										{singleInvoiceData.postCode}
									</p>
									<p
										className={`px-1 ${
											theme === 'light'
												? 'text-light-inputFont'
												: 'text-dark-inputFont'
										}`}
									>
										{singleInvoiceData.city}
									</p>
									<p
										className={`px-1 ${
											theme === 'light'
												? 'text-light-inputFont'
												: 'text-dark-inputFont'
										}`}
									>
										{singleInvoiceData.country}
									</p>
								</div>
							</div>
							<div className='w-full flex justify-between px-10'>
								<div className='w-3/10 flex flex-col items-start text-start'>
									<div className='pb-14'>
										<p
											className={`px-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											Invoice Date
										</p>
										<p
											className={`px-1 pt-1 font-bold ${
												theme === 'light'
													? ' text-light-textBlack'
													: 'text-light-whiteBackground'
											}`}
										>
											{formattedInvoiceDate}
										</p>
									</div>
									<div>
										<p
											className={`px-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											Payment Due
										</p>
										<p
											className={`px-1 pt-1 font-bold ${
												theme === 'light'
													? ' text-light-textBlack'
													: 'text-light-whiteBackground'
											}`}
										>
											{formattedPaymentDate}
										</p>
									</div>
								</div>
								<div className='w-3/10 flex flex-col items-start text-start'>
									<div>
										<p
											className={`px-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											Bill To
										</p>
										<p
											className={`px-1 pt-1 font-bold ${
												theme === 'light'
													? ' text-light-textBlack'
													: 'text-light-whiteBackground'
											}`}
										>
											{singleInvoiceData.clientName}
										</p>
										<p
											className={`px-1 pt-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											{singleInvoiceData.clientAdress}
										</p>
										<p
											className={`px-1 pt-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											{singleInvoiceData.clientCity}
										</p>
										<p
											className={`px-1 pt-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											{singleInvoiceData.clientPostCode}
										</p>
										<p
											className={`px-1 pt-1 ${
												theme === 'light'
													? 'text-light-inputFont'
													: 'text-dark-inputFont'
											}`}
										>
											{singleInvoiceData.clientCountry}
										</p>
									</div>
								</div>
								<div className='w-4/10 flex flex-col items-start text-start'>
									<p
										className={`px-1 ${
											theme === 'light'
												? 'text-light-inputFont'
												: 'text-dark-inputFont'
										}`}
									>
										Sent to
									</p>
									<p
										className={`px-1 pt-1 font-bold ${
											theme === 'light'
												? ' text-light-textBlack'
												: 'text-light-whiteBackground'
										}`}
									>
										{singleInvoiceData.clientEmail}
									</p>
								</div>
							</div>
							<div className='w-full flex justify-between px-10 py-10'>
								<div className='w-full px-4'>
									<div
										className={`w-full rounded-t-md px-6 py-6 ${
											theme === 'light' ? 'bg-[#F9FAFE]' : 'bg-[#252945]'
										}`}
									>
										<div className='w-full flex'>
											<p
												className={`px-1 w-4/10 text-left ${
													theme === 'light'
														? 'text-light-inputFont'
														: 'text-dark-inputFont'
												}`}
											>
												Item Name
											</p>
											<p
												className={`px-1 w-2/10 text-center ${
													theme === 'light'
														? 'text-light-inputFont'
														: 'text-dark-inputFont'
												}`}
											>
												QTY.
											</p>
											<p
												className={`px-1 w-2/10 text-right ${
													theme === 'light'
														? 'text-light-inputFont'
														: 'text-dark-inputFont'
												}`}
											>
												Price
											</p>
											<p
												className={`px-1 w-2/10 text-right ${
													theme === 'light'
														? 'text-light-inputFont'
														: 'text-dark-inputFont'
												}`}
											>
												Total
											</p>
										</div>
										{singleInvoiceData.products.map((product, index) => (
											<div className='w-full flex mt-8' key={index}>
												<p
													className={`px-1 w-4/10 text-left font-bold ${
														theme === 'light'
															? ' text-light-textBlack'
															: 'text-light-whiteBackground'
													}`}
												>
													{product.itemName}
												</p>
												<p
													className={`px-1 w-2/10 text-center ${
														theme === 'light'
															? 'text-light-inputFont'
															: 'text-dark-inputFont'
													}`}
												>
													{product.quantity}
												</p>
												<p
													className={`px-1 w-2/10 text-right ${
														theme === 'light'
															? 'text-light-inputFont'
															: 'text-dark-inputFont'
													}`}
												>
													{`$${product.price}`}
												</p>
												<p
													className={`px-1 w-2/10 text-right font-bold ${
														theme === 'light'
															? ' text-light-textBlack'
															: 'text-light-whiteBackground'
													}`}
												>
													{`$${product.totalPrice}`}
												</p>
											</div>
										))}
									</div>
									<div
										className={`w-full flex justify-between items-center rounded-b-md px-6 py-6 ${
											theme === 'light' ? 'bg-[#373B53]' : 'bg-[#0C0E16]'
										}`}
									>
										<div className='w-1/2'>
											<p
												className={`px-1 text-left ${
													theme === 'light'
														? 'text-[#FFFFFF]'
														: 'text-[#FFFFFF]'
												}`}
											>
												Amount Due
											</p>
										</div>
										<div className='w-1/2'>
											<p
												className={`px-1 text-right text-2xl ${
													theme === 'light'
														? 'text-[#FFFFFF]'
														: 'text-[#FFFFFF]'
												}`}
											>
												{`$${singleInvoiceData.invoiceSum}`}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

