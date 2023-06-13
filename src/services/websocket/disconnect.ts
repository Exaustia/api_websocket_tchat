import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const disconnectUser = async (connectionId: string) => {
	try {
		const findUser = await prisma.userSession.findUnique({
			where: {
				websocketId: connectionId,
			},
		});

		if (findUser) {
			await prisma.userSession.update({
				where: {
					id: findUser.id,
				},
				data: {
					websocketId: undefined,
					disconnectedAt: new Date(),
				},
			});
		}
	} catch (err) {
		throw new Error('Error on disconnect');
	}
};
