import { getUsersConnectedToTheRoom } from '../../schema/Room/queries';
import { apiGatewayManagementApi } from '../../utils/awsApi';
import prismaInstance from '../../utils/prisma';

const agm = apiGatewayManagementApi();

export const banUser = async ({ id }: { id: string }) => {
	try {
		const prisma = prismaInstance();
		const message = await prisma.message.findUnique({
			where: {
				id: id,
			},
		});
		if (!message) {
			throw new Error('Message not found');
		}

		await prisma.user.update({
			where: {
				id: message.userId,
			},
			data: {
				isBanned: true,
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
								id: message.userId,
								action: 'userBanned',
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
