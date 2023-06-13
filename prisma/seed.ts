import prismaInstance from '../src/utils/prisma';

const prisma = prismaInstance();

const main = async () => {
	await prisma.room.create({
		data: {
			name: 'live',
		},
	});
};

main();
