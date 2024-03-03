import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { initialValues, loginSchema } from './loginData';
import { Input } from './Input';

type setLoginType = {
	setLogin: React.Dispatch<React.SetStateAction<string>>;
};

type Logintype = {
	email: string;
	password: string;
};

export const Login = ({ setLogin }: setLoginType) => {
	const handleLogin = async () => {};

	const formik = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: handleLogin,
		isInitialValid: false,
		enableReinitialize: false,
	});

	const [login, setLoginInfo] = useState<Logintype>({
		email: formik.values.email,
		password: formik.values.password,
	});

	useEffect(() => {
		setLoginInfo((prevLoginInfo) => ({
			...prevLoginInfo,
			email: formik.values.email,
			password: formik.values.password,
		}));
	}, [formik.values]);

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='md:w-1/2 lg:1/4 xl:w-1/4 2xl:w-1/4 w-3/4 md:h-1/2 h-3/5 flex flex-col justify-center items-center bg-light-background rounded-xl'
		>
			<h3 className=' text-4xl font-bold mb-4 text-dark-buttonBackground'>Log-in</h3>
			<div className='flex flex-col md:w-3/5 w-3/4'>
				<Input
					type={'email'}
					name={'email'}
					error={!!(formik.errors.email && formik.touched.email)}
					errorText={formik.errors.email ? formik.errors.email : ''}
					value={formik.values.email}
					onChange={formik.handleChange}
					placeholder='Email'
				/>
				<Input
					name={'password'}
					error={!!(formik.errors.password && formik.touched.password)}
					errorText={formik.errors.password ? formik.errors.password : ''}
					value={formik.values.password}
					onChange={formik.handleChange}
					type={'password'}
					placeholder='Password'
				/>
				<div className='flex justify-between items-center w-full my-4'>
					<button className='w-full bg-dark-buttonBackground text-light-background p-2 rounded-2xl'>
						Sign in
					</button>
				</div>
				<div className='flex justify-between items-center w-full text-xs'>
					<p className='w-1-2 text-dark-lightPuprleFont'>Forgot Password? </p>
					<p
						className='w-1-2 text-dark-lightPuprleFont underline cursor-pointer'
						onClick={() => setLogin('register')}
					>
						Create an account
					</p>
				</div>
			</div>
		</form>
	);
};
