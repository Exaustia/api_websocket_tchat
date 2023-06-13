import * as express from 'express';
import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export default async ({ app }: { app: express.Application }) => {
	/**
	 * @swagger
	 * /health:
	 *   get:
	 *     summary: health check
	 *
	 */
	app.get('/room/:id/lastMessages', async (req, res) => {
		try {
			const { id } = req.params;
			const messages = await prisma.message.findMany({
				where: {
					room: {
						name: id,
					},
				},
				take: 10,
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					user: true,
				},
			});

			type Message = {
				username: string;
				content: string;
				from: 'server' | 'user' | 'bot';
				provider: 'eth' | 'solana';
				isSub: boolean;
				usernameColor: string;
			};

			const messagesWithUser = messages.map((message) => {
				return {
					username: message.user.username,
					content: message.content,
					createdAt: message.createdAt,
					from: 'user',
					provider: 'eth',
					usernameColor: message.user.color,
					isSub: false,
				};
			});

			return res.status(200).json(messagesWithUser.reverse());
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: 'Internal server error' });
		}
	});
};
