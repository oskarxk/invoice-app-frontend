import React from 'react';
import { useTheme } from '../../context/ThemeContext';

type HandleStatusChange = (newStatus: string) => void;

type Props = {
	selectedStatus: string;
	setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
	handleStatusChange: HandleStatusChange;
};

export const FilterPopUp = ({
	handleStatusChange,
	selectedStatus,
	setSelectedStatus,
}: Props) => {
	const { theme } = useTheme();

	return (
		<div
			className={`fixed top-20 w-36 z-30 right-1/3 rounded-lg shadow-md shadow-grey  ${
				theme === 'light' ? 'bg-light-filterBG' : 'bg-dark-filterBG'
			}`}
		>
			<div className='flex flex-col items-start m-2'>
				<label
					className={` ${
						theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
					}`}
				>
					<input
						className='mr-4'
						type='radio'
						value='all'
						checked={selectedStatus === 'all'}
						onChange={() => {
							setSelectedStatus('all');
							handleStatusChange('all');
						}}
					/>
					All
				</label>
				<label
					className={` ${
						theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
					}`}
				>
					<input
						className='mr-4'
						type='radio'
						value='Paid'
						checked={selectedStatus === 'Paid'}
						onChange={() => {
							setSelectedStatus('Paid');
							handleStatusChange('Paid');
						}}
					/>
					Paid
				</label>
				<label
					className={` ${
						theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
					}`}
				>
					<input
						className='mr-4'
						type='radio'
						value='Draft'
						checked={selectedStatus === 'Draft'}
						onChange={() => {
							setSelectedStatus('Draft');
							handleStatusChange('Draft');
						}}
					/>
					Draft
				</label>
				<label
					className={` ${
						theme === 'light' ? 'text-light-textBlack' : 'text-dark-textWhite'
					}`}
				>
					<input
						className='mr-4'
						type='radio'
						value='Pending'
						checked={selectedStatus === 'Pending'}
						onChange={() => {
							setSelectedStatus('Pending');
							handleStatusChange('Pending');
						}}
					/>
					Pending
				</label>
			</div>
		</div>
	);
};

