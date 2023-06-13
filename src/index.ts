import express from 'express';
import loaders from './loaders';

async function startServer() {
	const PORT = 8080;
	const app = express();

	await loaders({ expressApp: app });

	app.listen(PORT, () =>
		console.log(`
🚀 Server ready at: http://localhost:${PORT}`),
	);
}

startServer();
