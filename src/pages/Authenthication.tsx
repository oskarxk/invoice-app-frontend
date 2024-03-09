import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Login } from '../components/form-authentication-components/Login';
import { Register } from '../components/form-authentication-components/Register';
import { ToastTheme } from '../components/form-authentication-components/types';

export const Authenthication = () => {
	const [login, setLogin] = useState<string>('login');
	const [notifyTheme, setNotifyTheme] = useState<ToastTheme>();
	const [notifyMessage, setNotifyMessage] = useState<string>();

	useEffect(() => {
		if (notifyMessage) {
			toast(notifyMessage, { type: notifyTheme });
			setNotifyMessage(undefined);
			setNotifyTheme(undefined)
		}
	}, [notifyMessage, notifyTheme]);

	return (
		<div className='w-full h-screen flex justify-center items-center bg-dark-menuBackground'>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			{login === 'login' ? (
				<Login
					setLogin={setLogin}
					setNotifyMessage={setNotifyMessage}
					setNotifyTheme={setNotifyTheme}
				/>
			) : (
				<Register
					setLogin={setLogin}
					setNotifyMessage={setNotifyMessage}
					setNotifyTheme={setNotifyTheme}
				/>
			)}
		</div>
	);
};
