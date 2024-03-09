import React from 'react';
import moon from '../../assets/icon-moon.svg';
import sun from '../../assets/icon-sun.svg';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	const handleToggleTheme = () => {
		if (theme === 'light') {
			localStorage.setItem('theme', 'dark');
			toggleTheme();
		} else {
			localStorage.setItem('theme', 'light');
			toggleTheme();
		}
	};

	return (
		<div onClick={handleToggleTheme} className='cursor-pointer p-2'>
			{theme === 'light' ? (
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
