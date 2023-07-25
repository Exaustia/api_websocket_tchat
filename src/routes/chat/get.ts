import * as express from 'express';

export default async ({ app }: { app: express.Application }) => {
	app.get('/chat', async (req, res) => {
		try {
			res.status(200).send({ message: 'Chat' });
		} catch (e: any) {
			res.status(200).send({ message: 'Chat' });
		}
	});
};
