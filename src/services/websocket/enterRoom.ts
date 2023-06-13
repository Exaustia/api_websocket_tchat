import prismaInstance from '../../utils/prisma';
import { apiGatewayManagementApi } from '../../utils/awsApi';

const prisma = prismaInstance();

const agm = apiGatewayManagementApi();

export const enterRoom = async ({
	userId,
	roomId,
	connectionId,
}: {
	userId?: string;
	roomId: string;
	connectionId: string;
}) => {
	try {
		console.log('icii');
		if (userId) {
			await prisma.userSession.create({
				data: {
					websocketId: connectionId,
					user: {
						connect: {
							id: userId,
						},
					},
					room: {
						connect: {
							id: roomId,
						},
					},
				},
			});
		} else {
			await prisma.userSession.create({
				data: {
					websocketId: connectionId,
					room: {
						connect: {
							id: roomId,
						},
					},
				},
			});
		}

		await agm
			.postToConnection({
				ConnectionId: connectionId,
				Data: Buffer.from(
					JSON.stringify({
						message: 'Welcome to the room!',
						action: 'publicMessage',
						username: 'bot',
						from: 'bot',
						provider: 'eth',
						isSub: false,
						usernameColor: '#FFFFFF',
					}),
				),
			})
			.promise();

		return true;
	} catch (err) {
		console.log(err);
		throw new Error('Error on enter room');
	}
};
