import React from 'react'
import { Logo } from './Logo'
import avatar from '../../assets/image-avatar.jpg'
import { ThemeSwitcher } from './ThemeSwitcher'

type Props = {
	currentTheme: string;
	setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const MobileNav = ({ currentTheme, setCurrentTheme }: Props) => {
	return (
		<nav className='flex sticky w-full h-24 bg-dark-menuBackground'>
			<div className='flex justify-center items-center w-2/10 bg-dark-buttonBackground rounded-r-2xl relative overflow-hidden'>
				<Logo />
				<div className='w-full absolute bg-[#9277FF] bottom-0 h-1/2 rounded-tl-2xl'></div>
			</div>
			<div className='w-6/10 flex justify-end items-center px-4'>
				<ThemeSwitcher
					currentTheme={currentTheme}
					setCurrentTheme={setCurrentTheme}
				/>
			</div>
			<div className='flex justify-center items-center w-2/10 border-l-1 border-[#494E6E]'>
				<img className='w-1/2 rounded-3xl' src={avatar} alt='Avatar' />
			</div>
		</nav>
	);
};
