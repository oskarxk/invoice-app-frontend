import * as Yup from 'yup';

export const addInvoiceSchema = Yup.object().shape({
	streetAdress: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper street adress'),
	city: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper city'),
	postCode: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper post-code'),
	country: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper country'),
	clientName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper client name'),
	clientEmail: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper client email'),
	clientStreetAdress: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper client street adress'),
	clientCity: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper client city'),
	clientPostCode: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper client post-code'),
	clientCountry: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper client country'),
	invoiceDate: Yup.date()
		.required('Please provide an invoice date')
		.min(
			new Date(Date.now() - 30 * 86400000),
			'Invoice date must be within the last 30 days'
		)
		.max(
			new Date(Date.now() + 30 * 86400000),
			'Invoice date cannot be more than 30 days in the future'
		),
	paymentDate: Yup.date().required('Please provide an payment date'),
	invoiceTitle: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper invoice tittle'),
	itemName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper item tittle'),
	quantity: Yup.number()
		.positive('Quantity must be a positive number')
		.integer('Quantity must be an integer')
		.min(1, 'Quantity must be at least 1')
		.required('Please provide quantity'),
	price: Yup.number()
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be at least 0.01')
    .required('Please provide price'),
});

export const initialValues = {
	streetAdress: '',
	city: '',
	postCode: '',
	country: '',
	clientName: '',
	clientEmail: '',
	clientStreetAdress: '',
	clientCity: '',
	clientPostCode: '',
	clientCountry: '',
	invoiceDate: '',
	paymentDate: '',
	invoiceTitle: '',
    itemName: '',
    quantity: 1,
    price: 0.01,
};
