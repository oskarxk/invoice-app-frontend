export enum ToastTheme {
	'SUCCESS' = 'success',
	'ERROR' = 'error',
	'INFO' = 'info'
}

export type Logintype = {
	email: string;
	password: string;
};

export type RegisterType = {
	name: string;
	email: string;
	password: string;
};

export type setLoginType = {
	setLogin: React.Dispatch<React.SetStateAction<string>>;
	setNotifyMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
	setNotifyTheme: React.Dispatch<React.SetStateAction<ToastTheme | undefined>>;
};