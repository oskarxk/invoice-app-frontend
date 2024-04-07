export const GenericAddInput = () => {
  return (
	<>
			{/* <Controller
				render={() => (
					<input
						className={`w-full focus:outline-none p-1 border-2 bg-none border-[#F1F1F1] rounded-lg ${
							errors ? 'border-red-600' : 'border-[#F1F1F1]'
						}`}
						type={type}
						placeholder={placeholder}
					/>
				)}
				name={name}
				control={control}
				{...(error && (
					<p className='text-left text-dark-lightPuprleFont px-4'>
						{error.message}
					</p>
				))}
			/> */}
		</>
  )
}

export default GenericAddInput
