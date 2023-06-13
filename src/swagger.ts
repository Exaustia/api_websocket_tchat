import * as express from 'express';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default async ({ app }: { app: express.Application }) => {
	const swaggerDefinition = {
		openapi: '3.0.0',
		info: {
			title: 'Express API for JSONPlaceholder',
			version: '1.0.0',
			description:
				'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
			license: {
				name: 'Licensed Under MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			contact: {
				name: 'JSONPlaceholder',
				url: 'https://jsonplaceholder.typicode.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:8080',
				description: 'Development server',
			},
		],
	};
	const options: swaggerJSDoc.Options = {
		swaggerDefinition,
		// Paths to files containing OpenAPI definitions
		apis: [`${__dirname}\\routes\\*.ts`, `${__dirname}\\routes\\template_route\\*.ts`],
	};
	const swaggerSpec = swaggerJSDoc(options);

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
