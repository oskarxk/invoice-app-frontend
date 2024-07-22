export type InvoiceProduct = {
	itemName: string;
	quantity: number;
	price: number;
    totalPrice: number;
};

export type InvoiceData = {
	_id: string;
	invoiceNumber: string;
	streetAdress: string;
	invoiceAuthorEmail: string;
	invoiceAuthorId: any;
	userEmail: string;
	city: string;
	postCode: string;
	country: string;
	clientName: string;
	clientEmail: string;
	clientStreetAdress: string;
	clientCity: string;
	clientPostCode: string;
	clientCountry: string;
	invoiceDate: string;
	paymentDate: string;
	invoiceTitle: string;
	invoiceSum: number;
	status: string;
	products: InvoiceProduct[];
};

export type InvoiceListData = Pick<
	InvoiceData,
	| '_id'
	| 'invoiceNumber'
	| 'paymentDate'
	| 'clientName'
	| 'invoiceSum'
	| 'status'
>;