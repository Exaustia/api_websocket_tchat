import prismaInstance from '../../utils/prisma';
import { disconnectUser } from './disconnect';
import { apiGatewayManagementApi } from '../../utils/awsApi';

const agm = apiGatewayManagementApi();
const prisma = prismaInstance();

interface sendMessageProps {
	connectionId: string;
	roomId: string;
	message: string;
}
export const sendMessage = async ({ connectionId, roomId, message }: sendMessageProps) => {
	try {
		const userConnectionId = connectionId;
		const userWhoSendTheMessage = await prisma.userSession.findUnique({
			where: {
				websocketId: userConnectionId,
			},
			include: {
				user: true,
			},
		});

		if (!userWhoSendTheMessage || !userWhoSendTheMessage.user || !userWhoSendTheMessage.user.id) {
			throw new Error('User not found');
		}

		if (userWhoSendTheMessage.user.isBanned) {
			throw new Error('User is banned');
		}

		const usersConnectedToTheRoom = await prisma.room.findUnique({
			where: {
				id: roomId,
			},
			include: {
				sessions: {
					where: {
						disconnectedAt: null,
						// NOT: {
						// 	websocketId: connectionId,
						// },
					},
				},
			},
		});

		if (!usersConnectedToTheRoom) {
			throw new Error('Room not found');
		}

		const prismaMessage = await prisma.message.create({
			data: {
				content: message,
				user: {
					connect: {
						id: userWhoSendTheMessage.user.id,
					},
				},
				room: {
					connect: {
						id: roomId,
					},
				},
			},
		});

		const promiseMsg = usersConnectedToTheRoom.sessions.map(async (u) => {
			try {
				if (!userWhoSendTheMessage.user) return;
				await agm
					.postToConnection({
						ConnectionId: u.websocketId,
						Data: Buffer.from(
							JSON.stringify({
								message: message,
								id: prismaMessage.id,
								userId: userWhoSendTheMessage.user.id,
								action: 'publicMessage',
								username: userWhoSendTheMessage.user.username,
								from: 'user',
								provider: userWhoSendTheMessage.user.defaultProvider,
								isSub: false,
								usernameColor: userWhoSendTheMessage?.user?.color,
							}),
						),
					})
					.promise();
			} catch (err: any) {
				if (err.statusCode === 410) {
					console.log('La connexion est inactive ou a expiré.');
					await disconnectUser(u.websocketId);
				} else {
					console.error("Erreur lors de l'envoi de la requête:", err);
				}
			}
		});

		return await Promise.all(promiseMsg);
	} catch (err) {
		console.log(err);
		throw new Error('Error on send message');
	}
};
