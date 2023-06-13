import * as express from 'express';
import { updateUsernameAndColorForUser } from '../../schema/User/update';
import { authentification } from '../../loaders/authentification';

export default async ({ app }: { app: express.Application }) => {
	app.put(
		'/user/update',
		authentification,
		async (req: express.Request, res: express.Response) => {
			try {
				await updateUsernameAndColorForUser(req.userId, req.body.username, req.body.color);
				res.status(200).send('User updated');
			} catch (err) {
				console.log(err);
				res.status(500).send('Error updating user');
			}
		},
	);
};
