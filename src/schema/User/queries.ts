import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const getUserById = async (id: string) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
};
