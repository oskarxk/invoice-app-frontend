import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useTheme } from '../../context/ThemeContext';

type Props = {
	isLoading: boolean;
};

export const Loading = ({ isLoading }: Props) => {
	const { theme } = useTheme();
	return (
		<div
			className={`flex flex-col justify-center items-center w-full h-screen ${
				theme === 'light' ? 'bg-light-background' : 'bg-dark-background'
			}`}
		>
			<ClipLoader
				color={`${theme === 'light' ? '#0C0E16' : '#FFFFFF'}`}
				loading={isLoading}
				size={100}
			/>
			<h3
				className={` text-2xl ${
					theme === 'light'
						? 'text-light-textBlack'
						: 'text-dark-textWhite my-4'
				}`}
			>
				Loading . . .
			</h3>
		</div>
	);
};
