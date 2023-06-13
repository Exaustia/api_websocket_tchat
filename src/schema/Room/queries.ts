import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const getRoomByName = (name: string) => {
	return prisma.room.findUnique({
		where: {
			name,
		},
	});
};

export const getUsersConnectedToTheRoom = async (roomId: string) => {
	const usersConnectedToTheRoom = prisma.room.findUnique({
		where: {
			id: roomId,
		},
		include: {
			sessions: {
				where: {
					disconnectedAt: null,
				},
			},
		},
	});

	return usersConnectedToTheRoom;
};
