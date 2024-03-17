import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToken } from '../../hooks/useToken';
import { GenericAddInput } from './GenericAddInput';
import { initialValues, addInvoiceSchema } from './InvoiceAddData';
import { useFormik } from 'formik';
import axios from 'axios';
import thrashIcon from '../../assets/icon-delete.svg';
import { useEmail } from '../../hooks/useEmail';

type AddInvoiceProps = {
	addInvoice: boolean;
	setAddInvoice: React.Dispatch<React.SetStateAction<boolean>>;
};

type InvoiceProduct = {
	itemName: string;
	quantity: number;
	price: number;
};

type InvoiceData = {
	address: string;
	city: string;
	postCode: string;
	country: string;
	userEmail: string;
	clientName: string;
	clientEmail: string;
	clientAdress: string;
	clientCity: string;
	clientPostCode: string;
	clientCountry: string;
	invoiceDate: string;
	paymentDate: string;
	invoiceTitle: string;
	products: InvoiceProduct[];
};

export const AddInvoice = ({ addInvoice, setAddInvoice }: AddInvoiceProps) => {
	const { theme } = useTheme();
	const { token } = useToken();
    const { email } = useEmail();

	const userEmail: string = email !== null ? email : '';

	const createInvoice = async () => {
		axios
			.post('http://localhost:4000/create-invoice', addInvoiceData, {
				headers: { Authorization: token },
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
                setAddInvoice(false)
			});
	};

	const formik = useFormik({
		initialValues,
		validationSchema: addInvoiceSchema,
		onSubmit: createInvoice,
		isInitialValid: false,
		enableReinitialize: false,
	});

	useEffect(() => {
		setaddInvoiceData((prevInvoiceData) => ({
			...prevInvoiceData,
			address: formik.values.streetAdress,
			city: formik.values.city,
			postCode: formik.values.postCode,
			country: formik.values.country,
			clientName: formik.values.clientName,
			clientEmail: formik.values.clientEmail,
			clientAdress: formik.values.clientStreetAdress,
			clientCity: formik.values.clientCity,
			clientPostCode: formik.values.clientPostCode,
			clientCountry: formik.values.clientCountry,
			invoiceDate: formik.values.invoiceDate,
			paymentDate: formik.values.paymentDate,
			invoiceTitle: formik.values.invoiceTitle,
			products: [
				{
					itemName: formik.values.itemName,
					quantity: formik.values.quantity,
					price: formik.values.price,
				},
			],
		}));
	}, [formik.values]);

	const [addInvoiceData, setaddInvoiceData] = useState<InvoiceData>({
		address: formik.values.streetAdress,
		city: formik.values.city,
		postCode: formik.values.postCode,
		country: formik.values.country,
		userEmail: userEmail,
		clientName: formik.values.clientName,
		clientEmail: formik.values.clientEmail,
		clientAdress: formik.values.clientStreetAdress,
		clientCity: formik.values.clientCity,
		clientPostCode: formik.values.clientPostCode,
		clientCountry: formik.values.clientCountry,
		invoiceDate: formik.values.invoiceDate,
		paymentDate: formik.values.paymentDate,
		invoiceTitle: formik.values.invoiceTitle,
		products: [
			{
				itemName: formik.values.itemName,
				quantity: formik.values.quantity,
				price: formik.values.price,
			},
		],
	});

	const handleSelectChange = (e: any) => {
		const selectedDays = parseInt(e.target.value); // Pobieramy wartość wybraną przez użytkownika
		const paymentDate = new Date(addInvoiceData.invoiceDate);
		paymentDate.setDate(paymentDate.getDate() + selectedDays); // Dodajemy wybraną liczbę dni

		const formattedPaymentDate = paymentDate.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});

		console.log(formattedPaymentDate);
		formik.setFieldValue('paymentDate', formattedPaymentDate);
		return formattedPaymentDate;
	};

	console.log(addInvoiceData);

	return (
		<>
			{addInvoice && (
				<div className='fixed top-0  w-full h-full bg-black bg-opacity-50 z-30 left-24'>
					<div className='flex justify-start h-full'>
						<form
							onSubmit={formik.handleSubmit}
							className={`flex w-1/2 rounded-tr-2xl rounded-br-2xl ${
								theme === 'light'
									? 'bg-light-whiteBackground'
									: 'bg-dark-background'
							}`}
						>
							<div className='w-full m-6'>
								<div className=''>
									<h3
										className={`text-[24px] font-semibold text-left ${
											theme === 'light'
												? 'text-light-textBlack'
												: 'text-dark-textWhite'
										}`}
									>
										New Invoice
									</h3>
								</div>
								<div className='flex flex-col items-start'>
									<p className='text-[15px] py-2 text-dark-buttonBackground font-semibold'>
										Bill From
									</p>
									<div className='w-full'>
										<p
											className={`text-[13px] font-semibold text-left ${
												theme === 'light'
													? 'text-light-lightPuprleFont'
													: 'text-dark-lightPuprleFont'
											}`}
										>
											Street Adress
										</p>
										<GenericAddInput
											type={'text'}
											name={'streetAdress'}
											error={
												!!(
													formik.errors.streetAdress &&
													formik.touched.streetAdress
												)
											}
											errorText={
												formik.errors.streetAdress
													? formik.errors.streetAdress
													: ''
											}
											value={formik.values.streetAdress}
											onChange={formik.handleChange}
											placeholder='19 Union Terrace'
										/>
									</div>
									<div className='w-full flex justify-between py-2'>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												City
											</p>
											<GenericAddInput
												type={'text'}
												name={'city'}
												error={!!(formik.errors.city && formik.touched.city)}
												errorText={formik.errors.city ? formik.errors.city : ''}
												value={formik.values.city}
												onChange={formik.handleChange}
												placeholder='London'
											/>
										</div>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Post Code
											</p>
											<GenericAddInput
												type={'text'}
												name={'postCode'}
												error={
													!!(formik.errors.postCode && formik.touched.postCode)
												}
												errorText={
													formik.errors.postCode ? formik.errors.postCode : ''
												}
												value={formik.values.postCode}
												onChange={formik.handleChange}
												placeholder='E1-3EZ'
											/>
										</div>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Country
											</p>
											<GenericAddInput
												type={'text'}
												name={'country'}
												error={
													!!(formik.errors.country && formik.touched.country)
												}
												errorText={
													formik.errors.country ? formik.errors.country : ''
												}
												value={formik.values.country}
												onChange={formik.handleChange}
												placeholder='United Kingdom'
											/>
										</div>
									</div>
								</div>
								<div className='flex flex-col items-start'>
									<p className='text-[15px] py-2 text-dark-buttonBackground font-semibold'>
										Bill To
									</p>
									<div className='w-full'>
										<p
											className={`text-[13px] font-semibold text-left ${
												theme === 'light'
													? 'text-light-lightPuprleFont'
													: 'text-dark-lightPuprleFont'
											}`}
										>
											Client’s Name
										</p>
										<GenericAddInput
											type={'text'}
											name={'clientName'}
											error={
												!!(
													formik.errors.clientName && formik.touched.clientName
												)
											}
											errorText={
												formik.errors.clientName ? formik.errors.clientName : ''
											}
											value={formik.values.clientName}
											onChange={formik.handleChange}
											placeholder='Alex Grim'
										/>
										<p
											className={`text-[13px] pt-4 font-semibold text-left ${
												theme === 'light'
													? 'text-light-lightPuprleFont'
													: 'text-dark-lightPuprleFont'
											}`}
										>
											Client’s Email
										</p>
										<GenericAddInput
											type={'email'}
											name={'clientEmail'}
											error={
												!!(
													formik.errors.clientEmail &&
													formik.touched.clientEmail
												)
											}
											errorText={
												formik.errors.clientEmail
													? formik.errors.clientEmail
													: ''
											}
											value={formik.values.clientEmail}
											onChange={formik.handleChange}
											placeholder='alexgrim@mail.com'
										/>
										<p
											className={`text-[13px] pt-4 font-semibold text-left ${
												theme === 'light'
													? 'text-light-lightPuprleFont'
													: 'text-dark-lightPuprleFont'
											}`}
										>
											Street Address
										</p>
										<GenericAddInput
											type={'text'}
											name={'clientStreetAdress'}
											error={
												!!(
													formik.errors.clientStreetAdress &&
													formik.touched.clientStreetAdress
												)
											}
											errorText={
												formik.errors.clientStreetAdress
													? formik.errors.clientStreetAdress
													: ''
											}
											value={formik.values.clientStreetAdress}
											onChange={formik.handleChange}
											placeholder='84 Church Way'
										/>
									</div>
									<div className='w-full flex justify-between pt-4'>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												City
											</p>
											<GenericAddInput
												type={'text'}
												name={'clientCity'}
												error={
													!!(
														formik.errors.clientCity &&
														formik.touched.clientCity
													)
												}
												errorText={
													formik.errors.clientCity
														? formik.errors.clientCity
														: ''
												}
												value={formik.values.clientCity}
												onChange={formik.handleChange}
												placeholder='Bradford'
											/>
										</div>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Post Code
											</p>
											<GenericAddInput
												type={'text'}
												name={'clientPostCode'}
												error={
													!!(
														formik.errors.clientPostCode &&
														formik.touched.clientPostCode
													)
												}
												errorText={
													formik.errors.clientPostCode
														? formik.errors.clientPostCode
														: ''
												}
												value={formik.values.clientPostCode}
												onChange={formik.handleChange}
												placeholder='BD1-9PB'
											/>
										</div>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Country
											</p>
											<GenericAddInput
												type={'text'}
												name={'clientCountry'}
												error={
													!!(
														formik.errors.clientCountry &&
														formik.touched.clientCountry
													)
												}
												errorText={
													formik.errors.clientCountry
														? formik.errors.clientCountry
														: ''
												}
												value={formik.values.clientCountry}
												onChange={formik.handleChange}
												placeholder='United Kingdom'
											/>
										</div>
									</div>
									<div className='w-full flex justify-between pt-4'>
										<div className='w-4.5/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Invoice Date
											</p>
											<GenericAddInput
												type={'date'}
												name={'invoiceDate'}
												error={
													!!(
														formik.errors.invoiceDate &&
														formik.touched.invoiceDate
													)
												}
												errorText={
													formik.errors.invoiceDate
														? formik.errors.invoiceDate
														: ''
												}
												value={formik.values.invoiceDate}
												onChange={formik.handleChange}
												placeholder='20/Aug/2021'
											/>
										</div>
										<div className='w-4.5/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Payment Terms
											</p>
											<select
												name='paymentDate'
												className={`w-full focus:outline-none p-2 border-2 bg-none border-[#F1F1F1] rounded-lg ${
													formik.errors.paymentDate &&
													formik.touched.paymentDate
														? ' border-red-600'
														: 'border-[#F1F1F1]'
												}`}
												value={30}
												onClick={handleSelectChange}
											>
												<option value={1}>Next 1 Day</option>
												<option value={7}>Next 7 Days</option>
												<option value={14}>Next 14 Days</option>
												<option value={30}>Next 30 Days</option>
											</select>
											{formik.errors.paymentDate
												? formik.errors.paymentDate
												: '' && (
														<p className='text-left text-dark-lightPuprleFont px-4'>
															{formik.errors.paymentDate
																? formik.errors.paymentDate
																: ''}
														</p>
												  )}
										</div>
									</div>
									<p
										className={`text-[13px] pt-4 font-semibold text-left ${
											theme === 'light'
												? 'text-light-lightPuprleFont'
												: 'text-dark-lightPuprleFont'
										}`}
									>
										Project Description
									</p>
									<GenericAddInput
										type={'text'}
										name={'invoiceTitle'}
										error={
											!!(
												formik.errors.invoiceTitle &&
												formik.touched.invoiceTitle
											)
										}
										errorText={
											formik.errors.invoiceTitle
												? formik.errors.invoiceTitle
												: ''
										}
										value={formik.values.invoiceTitle}
										onChange={formik.handleChange}
										placeholder='Graphic Design'
									/>
								</div>

								<div className='flex flex-col items-start'>
									<p className='text-[15px] py-2 text-dark-buttonBackground font-semibold'>
										Item List
									</p>
									<div className='w-full flex justify-between py-2'>
										<div className='w-3/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Item Name
											</p>
											<GenericAddInput
												type={'text'}
												name={'itemName'}
												error={
													!!(formik.errors.itemName && formik.touched.itemName)
												}
												errorText={
													formik.errors.itemName ? formik.errors.itemName : ''
												}
												value={formik.values.itemName}
												onChange={formik.handleChange}
												placeholder='Banner Design'
											/>
										</div>
										<div className='w-1/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Qty.
											</p>
											<GenericAddInput
												type={'number'}
												name={'quantity'}
												error={
													!!(formik.errors.quantity && formik.touched.quantity)
												}
												errorText={
													formik.errors.quantity ? formik.errors.quantity : ''
												}
												value={formik.values.quantity.toString()}
												onChange={formik.handleChange}
												placeholder='1'
											/>
										</div>
										<div className='w-2/10 flex flex-col'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Price
											</p>
											<GenericAddInput
												type={'number'}
												name={'price'}
												error={!!(formik.errors.price && formik.touched.price)}
												errorText={
													formik.errors.price ? formik.errors.price : ''
												}
												value={formik.values.price.toString()}
												onChange={formik.handleChange}
												placeholder='150'
											/>
										</div>
										<div className='w-2/10 flex flex-col justify-between'>
											<p
												className={`text-[13px] font-semibold text-left ${
													theme === 'light'
														? 'text-light-lightPuprleFont'
														: 'text-dark-lightPuprleFont'
												}`}
											>
												Total
											</p>
											<div className='w-full flex justify-between p-2'>
												<p>156.00</p>
												<img src={thrashIcon} alt='Delete' />
											</div>
										</div>
									</div>
								</div>
								<div className='w-full'>
									<p>Add new Item</p>
								</div>
								<div className='w-full'>
									<p>Discard</p>
									<p>Save as Draft</p>
									<button>
										<p>Save & Send</p>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
