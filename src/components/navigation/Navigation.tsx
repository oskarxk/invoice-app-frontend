import React from 'react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';




export const Navigation = () => {
	return (
		<>
			<div className='hidden sm:block w-24 z-50'>
				<DesktopNav />
			</div>

			<div className='block sm:hidden w-full z-50'>
				<MobileNav />
			</div>
		</>
	);
};
