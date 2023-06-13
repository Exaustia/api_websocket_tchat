import * as express from 'express';
import configs from '../configs';

export default async ({ app }: { app: express.Application }) => {
	app.get('/status', (_, res) => {
		res.status(200).send(configs.version);
	});
	app.head('/status', (_, res) => {
		res.status(200).end();
	});
	app.enable('trust proxy');

	// ...More middlewares

	// Return the express app
	return app;
};
