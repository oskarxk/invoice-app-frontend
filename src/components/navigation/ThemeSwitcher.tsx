import React from 'react';
import moon from '../../assets/icon-moon.svg';
import sun from '../../assets/icon-sun.svg';

type Props = {
	currentTheme: string;
	setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeSwitcher = ({ currentTheme, setCurrentTheme }: Props) => {

	const handleToggleTheme = () => {
		if (currentTheme === 'light') {
			localStorage.setItem('theme', 'dark');
			setCurrentTheme('dark');
		} else {
			localStorage.setItem('theme', 'light');
			setCurrentTheme('light');
		}
	};

	return (
		<div onClick={handleToggleTheme} className='cursor-pointer p-2'>
			{currentTheme === 'light' ? (
				<div>
					<img src={moon} alt='Moon' />
				</div>
			) : (
				<div>
					<img src={sun} alt='Sun' />
				</div>
			)}
		</div>
	);
};
