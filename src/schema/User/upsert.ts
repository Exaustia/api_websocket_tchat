import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const upsertUser = async (publicKey: string) => {
	return prisma.user.upsert({
		where: {
			solanaWallet: publicKey,
		},
		update: {},
		create: {
			solanaWallet: publicKey,
			username: 'randomGuys',
		},
	});
};
