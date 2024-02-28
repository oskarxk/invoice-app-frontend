type InputType = {
	name: string;
	error: boolean;
	errorText: string;
	value: string;
	onChange: any;
	type: string;
	placeholder: string;
};

export const Input: React.FC<InputType> = ({
	name,
	error,
	errorText,
	value,
	onChange,
	type,
	placeholder,
}) => {
	return (
		<>
			<input
				className={`focus:outline-none p-4 border-b-2 bg-light-background ${
					error ? ' border-red-600' : 'border-[#F1F1F1]'
				}`}
				type={type}
				value={value}
				onChange={onChange}
				id={name}
				name={name}
				placeholder={placeholder}
			/>
			{error && <p className='text-left text-dark-lightPuprleFont px-4'>{errorText}</p>}
		</>
	);
};
