import * as express from 'express';
import prismaInstance from '../../utils/prisma';
import { getRoomByName } from '../../schema/Room/queries';
import { Room } from '@prisma/client';

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
						id: id,
					},
					isModerated: false,
					user: {
						isBanned: false,
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

			const messagesWithUser = messages.map((message) => {
				return {
					username: message.user.username,
					content: message.content,
					createdAt: message.createdAt,
					from: 'user',
					provider: message.user.defaultProvider,
					id: message.id,
					usernameColor: message.user.color,
					isSub: false,
					userId: message.user.id,
				};
			});

			return res.status(200).json(messagesWithUser.reverse());
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: 'Internal server error' });
		}
	});

	app.get('/room/:id', async (req, res) => {
		try {
			const room = (await getRoomByName(req.params.id)) as Room;
			return res.status(200).json({ room, error: null });
		} catch (err) {
			return res.status(500).json({ error: 'Cannot find the room' });
		}
	});
};
