import { getUsersConnectedToTheRoom } from '../../schema/Room/queries';
import { apiGatewayManagementApi } from '../../utils/awsApi';
import prismaInstance from '../../utils/prisma';

const agm = apiGatewayManagementApi();

export const removeMessage = async (messageId: string) => {
	try {
		const prisma = prismaInstance();
		const message = await prisma.message.findUnique({
			where: {
				id: messageId,
			},
		});
		if (!message) {
			throw new Error('Message not found');
		}

		await prisma.message.update({
			where: {
				id: messageId,
			},
			data: {
				isModerated: true,
			},
		});
		const usersConnectedToTheRoom = await getUsersConnectedToTheRoom(message.roomId);
		if (!usersConnectedToTheRoom) {
			throw new Error('Room not found');
		}

		const promiseMsg = usersConnectedToTheRoom.sessions.map(async (u) => {
			try {
				await agm
					.postToConnection({
						ConnectionId: u.websocketId,
						Data: Buffer.from(
							JSON.stringify({
								id: message.id,
								action: 'removeMessage',
								isModerated: true,
							}),
						),
					})
					.promise();
			} catch (err: any) {
				if (err.statusCode === 410) {
					console.log('La connexion est inactive ou a expiré.');
				} else {
					console.error("Erreur lors de l'envoi de la requête:", err);
				}
			}
		});

		await Promise.all(promiseMsg);
		return { success: true };
	} catch (err) {
		console.log(err);
		return { success: false };
	}
};
