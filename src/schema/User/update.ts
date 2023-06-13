import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const updateUsernameAndColorForUser = async (
	userId: string,
	username: string,
	color: string,
) => {
	console.log(userId, username, color);
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) throw new Error('User not found');

	return prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			username,
			color,
		},
	});
};
