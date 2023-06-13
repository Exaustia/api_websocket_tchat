import * as express from 'express';
import expressLoader from './express';
import middlewares from './middlewares';
import apiLoader from '../routes';
import swagger from '../swagger';

export default async ({ expressApp }: { expressApp: express.Express }) => {
	await expressLoader({ app: expressApp });
	await middlewares({ app: expressApp });
	await swagger({ app: expressApp });
	await apiLoader({ app: expressApp });
	console.log('Express Intialized');
};
