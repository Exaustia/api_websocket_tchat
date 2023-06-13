import * as express from 'express';
import { getRandomNonceMessage } from '../../utils/getRandomNonceMessage';

export default async ({ app }: { app: express.Application }) => {
	app.get('/login/nonce/eth', async (req, res) => {
		res.send({ message: getRandomNonceMessage(req.body.address) });
	});
};
