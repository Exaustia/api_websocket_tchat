import * as express from 'express';
import { authentificationModerator } from '../../loaders/authentification';
import { removeMessage } from '../../services/chat/removeMessage';
import { banUser } from '../../services/chat/banUser';

export default async ({ app }: { app: express.Application }) => {
	app.post('/chat/remove_message', authentificationModerator, async (req, res) => {
		try {
			const { id } = req.body;
			if (!req.isModerator) {
				return res.status(403).send({ message: 'You are not moderator' });
			}
			if (!id) {
				return res.status(400).send({ message: 'Missing parameters' });
			}
			removeMessage(id);

			return res.status(200).send({ success: true });
		} catch (e: any) {
			console.error(e);
			res.status(200).send({ message: 'error' });
		}
	});
	app.post('/chat/ban', authentificationModerator, async (req, res) => {
		try {
			const { id } = req.body;
			if (!req.isModerator) {
				return res.status(403).send({ message: 'You are not moderator' });
			}
			if (!id) {
				return res.status(400).send({ message: 'Missing parameters' });
			}
			banUser({ id });
			return res.status(200).send({ success: true });
		} catch (e: any) {
			console.error(e);
			res.status(200).send({ message: 'error' });
		}
	});
};
