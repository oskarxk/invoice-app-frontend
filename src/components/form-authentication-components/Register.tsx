import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Input } from './Input';
import { initialValues, registerSchema } from './registerData';

type setLoginType = {
	setLogin: React.Dispatch<React.SetStateAction<string>>;
};

type RegisterType = {
	name: string;
	email: string;
	password: string;
};

export const Register = ({ setLogin }: setLoginType) => {
	const navigate = useNavigate();

	const handleRegister = async () => {};

	const formik = useFormik({
		initialValues,
		validationSchema: registerSchema,
		onSubmit: handleRegister,
		isInitialValid: false,
		enableReinitialize: false,
	});

	const [register, setRegister] = useState<RegisterType>({
		name: formik.values.name,
		email: formik.values.email,
		password: formik.values.password,
	});

	useEffect(() => {
		setRegister((prevRegisterInfo) => ({
			...prevRegisterInfo,
			name: formik.values.name,
			email: formik.values.email,
			password: formik.values.password,
		}));
	}, [formik.values]);

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='md:w-1/2 lg:1/4 xl:w-1/4 2xl:w-1/4 w-3/4 md:h-1/2 h-3/5 flex flex-col justify-center items-center bg-light-background rounded-xl'
		>
			<h3 className=' text-4xl font-bold mb-4 text-dark-buttonBackground'>Register</h3>
			<div className='flex flex-col md:w-3/5 w-3/4'>
				<Input
					name={'name'}
					error={!!(formik.errors.name && formik.touched.name)}
					errorText={formik.errors.name ? formik.errors.name : ''}
					value={formik.values.name}
					onChange={formik.handleChange}
					type={'text'}
					placeholder='Name'
				/>
				<Input
					name={'email'}
					error={!!(formik.errors.email && formik.touched.email)}
					errorText={formik.errors.email ? formik.errors.email : ''}
					value={formik.values.email}
					onChange={formik.handleChange}
					type={'text'}
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
						Sign up
					</button>
				</div>
				<div className='flex justify-between items-center w-full text-xs'>
					<p className='w-1-2 text-dark-lightPuprleFont'>
						Already have an account?
					</p>
					<p
						className='w-1-2 text-dark-lightPuprleFont underline cursor-pointer'
						onClick={() => setLogin('login')}
					>
						Sign in
					</p>
				</div>
			</div>
		</form>
	);
};
