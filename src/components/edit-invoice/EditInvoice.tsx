import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToken } from '../../hooks/useToken';
import { invoiceSchema } from './InvoiceEditData';
import axios from 'axios';
import { useEmail } from '../../hooks/useEmail';
import {
	SubmitHandler,
	useForm,
	Controller,
	useFieldArray,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastTheme } from '../form-authentication-components/types';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { InvoiceData } from '../../types/Invoice';

type EditInvoiceProps = {
	editInvoice: boolean;
	setEditInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	singleInvoiceData?: InvoiceData
	// setNotifyMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
	// setNotifyTheme: React.Dispatch<React.SetStateAction<ToastTheme | undefined>>;
};

export const EditInvoice = ({
	editInvoice,
	setEditInvoice,
	// setNotifyMessage,
	// setNotifyTheme,
	singleInvoiceData
}: EditInvoiceProps) => {
	const { theme } = useTheme();
	const { token } = useToken();
	const { email } = useEmail();

	const userEmail: string = email !== null ? email : '';

	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<InvoiceData>({
		defaultValues: {
			products: [{ itemName: '', quantity: 0, price: 0 }],
		},
		resolver: zodResolver(invoiceSchema),
	});

	const { append, remove } = useFieldArray({
		control,
		name: 'products',
	});

	const watchFields = watch(['products']);

	useEffect(() => {
		const values = getValues();
		values.products?.forEach((product, index) => {
			const totalPrice = Number(product?.price) * Number(product?.quantity);
			if (!isNaN(totalPrice) && totalPrice !== product.totalPrice) {
				setValue(`products.${index}.totalPrice`, totalPrice);
			}
		});
	}, [getValues, setValue, watchFields]);

	const discardData = () => {
		setEditInvoice(false);
		setStatus('');
		reset();
	};

	useEffect(() => {
		if (singleInvoiceData) {
		  setValue('streetAdress', singleInvoiceData.streetAdress);
		  setValue('city', singleInvoiceData.city);
		  setValue('postCode', singleInvoiceData.postCode);
		  setValue('country', singleInvoiceData.country);
		  setValue('userEmail', singleInvoiceData.userEmail);
		  setValue('clientName', singleInvoiceData.clientName);
		  setValue('clientEmail', singleInvoiceData.clientEmail);
		  setValue('clientStreetAdress', singleInvoiceData.clientStreetAdress);
		  setValue('clientCity', singleInvoiceData.clientCity);
		  setValue('clientPostCode', singleInvoiceData.clientPostCode);
		  setValue('clientCountry', singleInvoiceData.clientCountry);
		  setValue('invoiceDate', singleInvoiceData.invoiceDate.toString().split('T')[0]);
		  setValue('paymentDate', singleInvoiceData.paymentDateDaysDelay);
		  setValue('invoiceTitle', singleInvoiceData.invoiceTitle);
	
		  singleInvoiceData.products.forEach((product, index) => {
			setValue(`products.${index}.itemName`, product.itemName);
			setValue(`products.${index}.quantity`, product.quantity);
			setValue(`products.${index}.price`, product.price);
			setValue(`products.${index}.totalPrice`, product.totalPrice);
		  });
		}
	  }, [singleInvoiceData, setValue]);

	const [status, setStatus] = useState<string>('');

	const onSubmit: SubmitHandler<InvoiceData> = (data) => {
		console.log(data);

		axios
			.post(
				'http://localhost:4000/create-invoice',
				{
					userEmail,
					address: data.streetAdress,
					city: data.city,
					postCode: data.postCode,
					country: data.country,
					clientName: data.clientName,
					clientEmail: data.clientEmail,
					clientAdress: data.clientStreetAdress,
					clientCity: data.clientCity,
					clientPostCode: data.clientPostCode,
					clientCountry: data.clientCountry,
					invoiceDate: data.invoiceDate,
					paymentDate: data.paymentDateDaysDelay,
					invoiceTitle: data.invoiceTitle,
					products: data.products,
					status: status,
				},
				{
					headers: { Authorization: token },
				}
			)
			.then((response) => {
				console.log(response);
				setEditInvoice(false);
				setStatus('');
				reset();
				// setNotifyMessage(response.data.message);
				// setNotifyTheme(ToastTheme.SUCCESS);
				navigate(0);
			})
			.catch((error) => {
				console.log(error);
				setEditInvoice(false);
				setStatus('');
				// setNotifyMessage(error.response.data.message);
				// setNotifyTheme(ToastTheme.ERROR);
			});
	};

	const navigate = useNavigate();

	return (
		<>
			{editInvoice && (
				<div className='fixed top-0  w-full h-full bg-black bg-opacity-50 z-30 left-24'>
					<div className='flex justify-start h-full'>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={`flex w-1/2 rounded-tr-2xl rounded-br-2xl overflow-auto ${
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
										Edit {singleInvoiceData?.invoiceNumber}
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
										<input
											className={`w-full focus:outline-none p-1 border-2 bg-none rounded-lg  ${
												errors.streetAdress ? ' border-red-600' : ''
											} ${
												theme === 'light'
													? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
													: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
											}`}
											{...register('streetAdress', { required: true })}
											type={'text'}
											placeholder='19 Union Terrace'
										/>
										{errors.streetAdress && (
											<p className='text-left text-dark-lightPuprleFont px-4'>
												{errors.streetAdress.message}
											</p>
										)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.city ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('city', { required: true })}
												type={'text'}
												placeholder='London'
											/>
											{errors.city && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.city.message}
												</p>
											)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.postCode ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('postCode', { required: true })}
												type={'text'}
												placeholder='E1-3EZ'
											/>
											{errors.postCode && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.postCode.message}
												</p>
											)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.country ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('country', { required: true })}
												type={'text'}
												placeholder='United Kingdom'
											/>
											{errors.country && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.country.message}
												</p>
											)}
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
										<input
											className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
												errors.clientName ? ' border-red-600' : ''
											} ${
												theme === 'light'
													? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
													: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
											}`}
											{...register('clientName', { required: true })}
											type={'text'}
											placeholder='Alex Grim'
										/>
										{errors.clientName && (
											<p className='text-left text-dark-lightPuprleFont px-4'>
												{errors.clientName.message}
											</p>
										)}
										<p
											className={`text-[13px] pt-4 font-semibold text-left ${
												theme === 'light'
													? 'text-light-lightPuprleFont'
													: 'text-dark-lightPuprleFont'
											}`}
										>
											Client’s Email
										</p>
										<input
											className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
												errors.clientEmail ? ' border-red-600' : ''
											} ${
												theme === 'light'
													? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
													: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
											}`}
											{...register('clientEmail', { required: true })}
											type={'text'}
											placeholder='alexgrim@gmail.com'
										/>
										{errors.clientEmail && (
											<p className='text-left text-dark-lightPuprleFont px-4'>
												{errors.clientEmail.message}
											</p>
										)}
										<p
											className={`text-[13px] pt-4 font-semibold text-left ${
												theme === 'light'
													? 'text-light-lightPuprleFont'
													: 'text-dark-lightPuprleFont'
											}`}
										>
											Street Address
										</p>
										<input
											className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
												errors.clientStreetAdress ? ' border-red-600' : ''
											} ${
												theme === 'light'
													? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
													: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
											}`}
											{...register('clientStreetAdress', { required: true })}
											type={'text'}
											placeholder='84 Church Way'
										/>
										{errors.clientStreetAdress && (
											<p className='text-left text-dark-lightPuprleFont px-4'>
												{errors.clientStreetAdress.message}
											</p>
										)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.clientCity ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('clientCity', { required: true })}
												type={'text'}
												placeholder='Bradford'
											/>
											{errors.clientCity && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.clientCity.message}
												</p>
											)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.clientPostCode ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('clientPostCode', { required: true })}
												type={'text'}
												placeholder='BD1-9PB'
											/>
											{errors.clientPostCode && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.clientPostCode.message}
												</p>
											)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.clientCountry ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('clientCountry', { required: true })}
												type={'text'}
												placeholder='19 Union Terrace'
											/>
											{errors.clientCountry && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.clientCountry.message}
												</p>
											)}
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
											<input
												className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
													errors.invoiceDate ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
												{...register('invoiceDate', {
													required: true,
													valueAsDate: true,
												})}
												type={'date'}
												placeholder='20/Aug/2021'
											/>
											{errors.invoiceDate && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.invoiceDate.message}
												</p>
											)}
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
												{...register('paymentDate', { required: true })}
												className={`w-full focus:outline-none p-2 border-2 bg-none  rounded-lg ${
													errors.paymentDate ? ' border-red-600' : ''
												} ${
													theme === 'light'
														? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
														: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
												}`}
											>
												<option value={1}>Next 1 Day</option>
												<option value={7}>Next 7 Days</option>
												<option value={14}>Next 14 Days</option>
												<option value={30}>Next 30 Days</option>
											</select>
											{errors.paymentDate && (
												<p className='text-left text-dark-lightPuprleFont px-4'>
													{errors.paymentDate.message}
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
									<input
										className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
											errors.invoiceTitle ? ' border-red-600' : ''
										} ${
											theme === 'light'
												? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
												: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
										}`}
										{...register('invoiceTitle', { required: true })}
										type={'text'}
										placeholder='Graphic Design'
									/>
									{errors.invoiceTitle && (
										<p className='text-left text-dark-lightPuprleFont px-4'>
											{errors.invoiceTitle.message}
										</p>
									)}
								</div>
								<div className='flex flex-col items-start'>
									<p className='text-[15px] py-2 text-dark-buttonBackground font-semibold'>
										Item List
									</p>
									<Controller
										name='products'
										control={control}
										defaultValue={[]}
										render={({ field }) => (
											<div className='w-full'>
												{field.value.map((item, index) => (
													<div
														key={index}
														className='w-full flex justify-between py-2'
													>
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
															<input
																{...register(
																	`products.${index}.itemName` as const
																)}
																className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
																	errors.products?.[index]?.itemName
																		? ' border-red-600'
																		: ''
																} ${
																	theme === 'light'
																		? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
																		: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
																}`}
																type={'text'}
																placeholder='Banner Design'
															/>
															{errors.products?.[index]?.itemName && (
																<p className='text-left text-dark-lightPuprleFont px-4'>
																	{errors.products?.[index]?.itemName?.message}
																</p>
															)}
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
															<input
																{...register(
																	`products.${index}.quantity` as const,
																	{ valueAsNumber: true }
																)}
																className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
																	errors.products?.[index]?.quantity
																		? ' border-red-600'
																		: ''
																} ${
																	theme === 'light'
																		? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
																		: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
																}`}
																type='number'
																placeholder='1'
															/>
															{errors.products?.[index]?.quantity && (
																<p className='text-left text-dark-lightPuprleFont px-4'>
																	{errors.products?.[index]?.quantity?.message}
																</p>
															)}
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
															<input
																{...register(
																	`products.${index}.price` as const,
																	{ valueAsNumber: true }
																)}
																className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
																	errors.products?.[index]?.price
																		? ' border-red-600'
																		: ''
																} ${
																	theme === 'light'
																		? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
																		: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
																}`}
																type='number'
																placeholder='150'
															/>
															{errors.products?.[index]?.price && (
																<p className='text-left text-dark-lightPuprleFont px-4'>
																	{errors.products?.[index]?.price?.message}
																</p>
															)}
														</div>
														<div className='w-2/10 flex flex-col'>
															<p
																className={`text-[13px] font-semibold text-left ${
																	theme === 'light'
																		? 'text-light-lightPuprleFont'
																		: 'text-dark-lightPuprleFont'
																}`}
															>
																Total
															</p>
															<div className='flex w-full items-center justify-between p-1'>
																<p
																	className={`${
																		theme === 'light'
																			? 'text-[#888EB0]'
																			: 'text-[#DFE3FA]'
																	}`}
																>
																	<input
																		{...register(
																			`products.${index}.totalPrice` as const,
																			{ valueAsNumber: true }
																		)}
																		className={`w-full focus:outline-none p-1 border-2 bg-none  rounded-lg ${
																			errors.products?.[index]?.price
																				? ' border-red-600'
																				: ''
																		} ${
																			theme === 'light'
																				? 'bg-light-invoiceBG text-light-textBlack placeholder:text-light-textBlack'
																				: 'bg-dark-invoiceBG text-dark-textWhite placeholder:text-dark-textWhite border-none'
																		}`}
																		type='number'
																		disabled
																	/>
																</p>
																<button
																	type='button'
																	onClick={() => remove(index)}
																	className='w-1/2 flex justify-end items-center'
																>
																	<FaTrash className='text-2xl text-[#888EB0] hover:text-[#EC5757] p-1' />
																</button>
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									/>
									<div className={`w-full my-2`}>
										<button
											type='button'
											className={`w-full py-2 rounded-lg ${
												theme === 'light'
													? ' bg-light-inputBG text-light-inputFont'
													: 'bg-dark-inputBG text-dark-inputFont'
											}`}
											onClick={() => {
												append({
													itemName: '',
													quantity: 0,
													price: 0,
													totalPrice: 0,
												});
											}}
										>
											+ Add New Item
										</button>
									</div>
								</div>
								<div className='w-full flex my-2 pb-8'>
									<div className='flex justify-start w-1/2'>
										<button
											className={`w-1/2 py-2 rounded-lg ${
												theme === 'light'
													? ' bg-light-inputBG text-light-inputFont'
													: 'bg-dark-inputBG text-dark-inputFont'
											}`}
											onClick={discardData}
										>
											Discard
										</button>
									</div>
									<div className='flex justify-between w-1/2'>
										<button
											className={`w-4.5/10 py-2 rounded-lg ${
												theme === 'light'
													? ' bg-[#373B53] text-light-textLightBoth'
													: 'bg-[#373B53] text-dark-inputFont'
											}`}
											disabled={isSubmitting}
											type='submit'
											onClick={() => setStatus('Draft')}
										>
											{isSubmitting ? 'Loading...' : 'Save as Draft'}
										</button>
										<button
											className={`w-4.5/10 py-2 rounded-lg ${
												theme === 'light'
													? ' bg-light-buttonBackground text-[#FFFFFF]'
													: 'bg-light-buttonBackground text-[#FFFFFF]'
											}`}
											disabled={isSubmitting}
											type='submit'
											onClick={() => setStatus('Pending')}
										>
											{isSubmitting ? 'Loading...' : 'Save & send'}
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
