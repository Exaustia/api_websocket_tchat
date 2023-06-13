import * as express from 'express';

export default async ({ app }: { app: express.Application }) => {
	/**
	 * @swagger
	 * /health:
	 *   get:
	 *     summary: health check
	 *
	 */
	app.get('/health', (_, res) => {
		res.status(200).send('v1.0.0_default');
	});
};
