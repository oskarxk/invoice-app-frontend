export const useEmail = () => {
	const email = sessionStorage.getItem('email');
	const setEmail = (email: string) => sessionStorage.setItem('email', email);

	return {
		email,
		setEmail,
	};
};
