import * as express from 'express';
import * as dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

export default async ({ app }: { app: express.Application }) => {
	// app.enable('trust proxy');

	const isProd = process.env.NODE_ENV === 'production';

	dotenv.config();
	app.use(express.json());
	app.use(cors());
	app.use(bodyParser.json({ limit: '1mb' }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.raw());

	if (isProd) {
		app.use(compression());
		app.use(helmet());
	}

	// ...More middlewares

	// Return the express app
	console.log('Express middlewares Intialized');
	return app;
};
