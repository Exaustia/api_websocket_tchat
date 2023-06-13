import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const updateUsernameAndColorForUser = async (
	userId: string,
	username: string,
	description: string,
	color: string,
) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	let params: object = {};
	if (username !== user?.username) {
		params = {
			...params,
			username,
		};
	}
	if (description !== user?.description) {
		params = {
			...params,
			description,
		};
	}
	if (color !== user?.color) {
		params = {
			...params,
			color,
		};
	}

	if (Object.prototype.hasOwnProperty.call(params, 'username')) {
		const userWithUsername = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (userWithUsername) throw new Error('Username is already taken');
	}

	if (!user) throw new Error('User not found');

	return prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			...params,
		},
	});
};

export const removeDiscordDataByUserId = async (userId: string) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			discordId: null,
			discordName: null,
		},
	});
};

export const updateDiscordDataByDiscordId = async (
	userId: string,
	discordId: string,
	discordName: string,
) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			discordId,
			discordName,
		},
	});
};

export const removeTwitterDataByUserId = async (userId: string) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			twitterId: null,
			twitterName: null,
		},
	});
};

export const updateTwitterDataByTwitterId = async (
	userId: string,
	twitterId: string,
	twitterName: string,
) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			twitterId,
			twitterName,
		},
	});
};
