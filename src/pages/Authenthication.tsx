import React, { useState } from 'react';
import { Login } from '../components/form-authentication-components/Login';
import { Register } from '../components/form-authentication-components/Register';

export const Authenthication = () => {
	const [login, setLogin] = useState<string>('login');

	return (
		<div className='w-full h-screen flex justify-center items-center bg-dark-menuBackground'>
			{login === 'login' ? (
				<Login setLogin={setLogin} />
			) : (
				<Register setLogin={setLogin} />
			)}
		</div>
	);
};
