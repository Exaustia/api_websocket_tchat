import * as express from 'express';
import { authentificationWS } from '../../loaders/authentification';
import { disconnectUser } from '../../services/websocket/disconnect';
import { enterRoom } from '../../services/websocket/enterRoom';
import { errorLog } from '../../utils/errorLog';
import { sendMessage } from '../../services/websocket/sendMessage';

export default async ({ app }: { app: express.Application }) => {
	app.post('/ws/connect', authentificationWS, async (_, res) => {
		try {
			res.status(200).json({ message: 'Message sent', action: 'confirmConnected' });
		} catch (err) {
			console.log(err);
			res.status(200).send({ message: 'Websocket' });
		}
	});

	app.post('/ws/disconnect', async (_, res) => {
		try {
			await disconnectUser(_.body.connectionId);
		} catch (err) {
			console.error(err);
		}

		res.status(200);
	});

	app.post('/ws/enter_room', authentificationWS, async (req, res) => {
		try {
			await enterRoom({
				connectionId: req.body.connectionId,
				userId: req.userId,
				roomId: req.body.body.roomId,
			});
			res.status(200).json({ message: 'Message sent', action: 'confirmEnterRoom' });
		} catch (err) {
			errorLog("error in '/ws/enter_room' route", err, 'error');
			res.status(200).send(err);
		}
	});

	app.post('/ws/send-message', async (req, res) => {
		try {
			if (!req.body.connectionId || !req.body.body.roomId || !req.body.body.message) {
				throw new Error('Missing parameters');
			}

			await sendMessage({
				connectionId: req.body.connectionId,
				roomId: req.body.body.roomId,
				message: req.body.body.message,
			});

			res.status(200).json({ message: 'Message sent', action: 'confirmMessageSend' });
		} catch (err) {
			console.log(err);
			res.status(200).send(err);
		}
	});
};
