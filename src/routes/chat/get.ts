import * as express from 'express';
import { getNbUserConnected } from '../../services/chat/nbUserConnected';

export default async ({ app }: { app: express.Application }) => {
	app.get('/chat', async (req, res) => {
		try {
			res.status(200).send({ message: 'Chat' });
		} catch (e: any) {
			res.status(200).send({ message: 'Chat' });
		}
	});

	app.get('/chat/:id/nbUser', async (req, res) => {
		try {
			const { id } = req.params;
			if (!getNbUserConnected) {
				return res.status(400).send({ message: 'Missing parameters' });
			}
			return res.status(200).json(await getNbUserConnected(id));
		} catch (e: any) {
			res.status(200).send({ message: 'Chat' });
		}
	});
};
