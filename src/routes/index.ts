import * as express from 'express';
import configs from '../configs';
import route from './template_route';

import login from './login';
import user from './user';
import room from './room';
import ws from './ws';

export default async ({ app }: { app: express.Express }) => {
	app.get('/', (_, res) => {
		res.status(200).send(configs.version);
	});

	await route({ app });
	await login({ app });
	await user({ app });
	await room({ app });
	await ws({ app });

	console.log('Express routes Intialized');
};
