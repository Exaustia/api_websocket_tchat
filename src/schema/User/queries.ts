import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const getUserById = async (id: string) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
};

export const getUserByDiscordId = async (discordId: string) => {
	return await prisma.user.findFirst({
		where: {
			discordId,
		},
	});
};

export const getUserByTwitterId = async (twitterId: string) => {
	return await prisma.user.findFirst({
		where: {
			twitterId,
		},
	});
};

export const getUserByUsername = async (username: string) => {
	return await prisma.user.findFirst({
		where: {
			username,
		},
	});
};
