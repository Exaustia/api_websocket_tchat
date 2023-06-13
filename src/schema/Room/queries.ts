import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const getRoomByName = (name: string) => {
	return prisma.room.findUnique({
		where: {
			name,
		},
	});
};
