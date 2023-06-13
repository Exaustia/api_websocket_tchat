import * as express from 'express';
import put from './put';
import get from './get';
import post from './post';

export default async ({ app }: { app: express.Express }) => {
	await put({ app });
	await get({ app });
	await post({ app });
};
