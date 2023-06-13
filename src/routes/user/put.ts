import * as express from 'express';
import { updateUsernameAndColorForUser } from '../../schema/User/update';
import { authentification } from '../../loaders/authentification';

export default async ({ app }: { app: express.Application }) => {
	app.put(
		'/user/update',
		authentification,
		async (req: express.Request, res: express.Response) => {
			try {
				await updateUsernameAndColorForUser(
					req.userId,
					req.body.username,
					req.body.description,
					req.body.color,
				);
				return res.status(200).json({
					success: true,
				});
			} catch (e: any) {
				const isMessageExists = Object.prototype.hasOwnProperty.call(e, 'message');
				const message = isMessageExists ? e.message : 'Error while confirming transaction';
				return res.status(200).json({
					success: false,
					error: message,
				});
			}
		},
	);
};
