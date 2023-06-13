import aws from 'aws-sdk';
import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

const agm = new aws.ApiGatewayManagementApi({
	endpoint: '7b71b72exg.execute-api.us-east-1.amazonaws.com/dev',
	region: 'us-east-1',
});

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
		throw new Error('Error on enter room');
	}
};
