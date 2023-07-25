import * as express from 'express';
import { authentification } from '../../loaders/authentification';
import { removeMessage } from '../../services/chat/removeMessage';

export default async ({ app }: { app: express.Application }) => {
	app.post('/chat/remove_message', authentification, async (req, res) => {
		try {
			const { id } = req.body;
			if (!req.isModerator) {
				return res.status(403).send({ message: 'You are not moderator' });
			}
			if (!id) {
				return res.status(400).send({ message: 'Missing parameters' });
			}
			const { success } = await removeMessage(id);
			if (success) return res.status(200).send({ success: true });
			return res.status(400).send({ message: 'An error occured' });
		} catch (e: any) {
			console.error(e);
			res.status(200).send({ message: 'error' });
		}
	});
};
