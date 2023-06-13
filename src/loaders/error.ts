// authentification function for the app with api key

import { Response } from 'express';

type Error = {
  status: number;
  message: string;
};
export const errorHandler = (err: Error, res: Response) => {
	const status = err.status || 500;
	const message = err.message || 'Something went wrong';
	res.status(status).json({
		status,
		message,
	});
};
