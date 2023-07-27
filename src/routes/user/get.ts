import * as express from 'express';
import { authentification } from '../../loaders/authentification';
import { getUserById, getUserByUsername } from '../../schema/User/queries';

export default async ({ app }: { app: express.Application }) => {
	/**
	 * @swagger
	 * /health:
	 *   get:
	 *     summary: health check
	 *
	 */
	app.get('/user/me', authentification, async (req, res) => {
		try {
			const user = await getUserById(req.userId);
			res.status(200).json(user);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	});

	app.get('/user/profile/:username', async (req, res) => {
		try {
			const user = await getUserByUsername(req.params.username);
			res.status(200).json(user);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	});
};
