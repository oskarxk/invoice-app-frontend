import { z } from "zod";

const currentDate = new Date();
const minDate = new Date(
	currentDate.getFullYear(),
	currentDate.getMonth() - 1,
	currentDate.getDate()
);
const maxDate = new Date(
	currentDate.getFullYear(),
	currentDate.getMonth() + 1,
	currentDate.getDate()
);

export const invoiceSchema = z.object({
	streetAdress: z
		.string()
		.min(2, 'Street adress is required')
		.max(50, 'Too Long street adress!'),
	city: z.string().min(2, 'City is required').max(50, 'Too Long City!'),
	postCode: z
		.string()
		.min(5, { message: 'Postal code is required!' })
		.max(10, { message: 'Postal code is too long!' }),
	country: z
		.string()
		.min(2, 'Country is required')
		.max(50, 'Too Long Country!'),
	clientName: z
		.string()
		.min(2, 'Client name is required')
		.max(50, 'Too Long Client name!'),
	clientEmail: z
		.string()
		.email('Invalid email format!')
		.min(5, { message: 'Email address is required!' })
		.max(50, { message: 'Email address is too long!' }),
	clientStreetAdress: z
		.string()
		.min(2, 'Client street adress is required')
		.max(50, 'Too Long client street adress!'),
	clientCity: z
		.string()
		.min(2, 'Client city is required')
		.max(50, 'Too Long client city!'),
	clientPostCode: z
		.string()
		.min(5, { message: 'Client postal code is required!' })
		.max(10, { message: 'Client postal code is too long!' }),
	clientCountry: z
		.string()
		.min(2, 'Client country is required')
		.max(50, 'Too Long client country!'),
	invoiceDate: z
		.date()
		.min(minDate, { message: 'Date is too early!' })
		.max(maxDate, { message: 'Date is too far in the future!' }),
	paymentDate: z.enum([('1'), '7', '14', '30']),
	invoiceTitle: z
		.string()
		.min(2, 'Invoice title is required')
		.max(50, 'Too Long invoice title!'),
	products: z.array(
		z.object({
			itemName: z
				.string()
				.min(2, 'Too short item name!')
				.max(50, 'Too long item name!'),
			quantity: z.number().min(1, 'Quantity must be at least 1'),
			price: z.number().min(0.01, 'Price must be at least 0.01'),
			totalPrice: z.number()
		})
	),
});