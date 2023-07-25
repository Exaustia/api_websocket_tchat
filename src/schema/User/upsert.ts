import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();
const colors = [
	'#000000',
	'#FFFFFF',
	'#FF0000',
	'#00FF00',
	'#0000FF',
	'#FFFF00',
	'#00FFFF',
	'#FF00FF',
];

const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};

export const upsertUser = async (publicKey: string, provider: string) => {
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
			defaultProvider: provider,
			color: getRandomColor(),
		},
	});
};
