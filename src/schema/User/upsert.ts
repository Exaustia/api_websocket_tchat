import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const upsertUser = async (publicKey: string) => {
	const start = publicKey.slice(0, 5);
	const end = publicKey.slice(-5);
	const randomName = `${start}...${end}`;

	return prisma.user.upsert({
		where: {
			solanaWallet: publicKey,
		},
		update: {},
		create: {
			solanaWallet: publicKey,
			username: randomName,
		},
	});
};
