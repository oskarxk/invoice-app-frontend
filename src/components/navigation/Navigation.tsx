import React from 'react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

type Props = {
	currentTheme: string
	setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const Navigation = ({currentTheme,setCurrentTheme}: Props) => {
	return (
		<>
			<div className='hidden sm:block w-24 z-50'>
				<DesktopNav currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
			</div>

			<div className='block sm:hidden w-full z-50'>
				<MobileNav currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
			</div>
		</>
	);
};
