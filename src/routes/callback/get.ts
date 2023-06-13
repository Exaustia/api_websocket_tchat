import * as express from 'express';
import discordCallback from '../../services/callback/discord';
import twitterURL from '../../services/callback/twitterURL';
import { authentification } from '../../loaders/authentification';
import twitterCallback from '../../services/callback/twitter';

export default async ({ app }: { app: express.Application }) => {
	app.get('/callback/discord', async (req, res) => {
		try {
			const URL = process.env.FRONT_URL || 'http://localhost:8080';
			if (!req.query.code) return res.redirect(URL + '/profile?error=noCode');
			if (!req.query.state) return res.redirect(URL + '/profile?error=noUserId');
			const result = await discordCallback({
				code: req.query.code as string,
				userId: req.query.state as string,
			});
			return res.redirect(URL + '/profile');
		} catch (e: any) {
			const isMessageExists = Object.prototype.hasOwnProperty.call(e, 'message');
			const message = isMessageExists ? e.message : 'Error while confirming transaction';
			return res.redirect(URL + `/profile?error=${message}`);
		}
	});

	app.get('/callback/twitterUrl', authentification, async (req, res) => {
		try {
			const url = twitterURL(req.userId);
			return res.status(200).json({ url });
		} catch (error: any) {
			return res.status(500).json({ error: error.message || 'Internal server error' });
		}
	});
	app.get('/callback/twitter', async (req, res) => {
		try {
			const URL = process.env.FRONT_URL || 'http://localhost:8080';
			if (!req.query.code) return res.redirect(URL + '/profile?error=noCode');
			if (!req.query.state) return res.redirect(URL + '/profile?error=noUserId');
			await twitterCallback({
				code: req.query.code as string,
				userId: req.query.state as string,
			});
			return res.redirect(URL + '/profile');
		} catch (e: any) {
			const isMessageExists = Object.prototype.hasOwnProperty.call(e, 'message');
			const message = isMessageExists ? e.message : 'Error while confirming transaction';
			return res.redirect(URL + `/profile?error=${message}`);
		}
	});
};
