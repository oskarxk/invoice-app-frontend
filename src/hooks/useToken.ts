export const useToken = () => {
	const token = sessionStorage.getItem('token');
	const setToken = (token: string) => sessionStorage.setItem('token', token);

	return {
		token,
		setToken,
	};
};
