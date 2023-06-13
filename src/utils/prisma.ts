import { PrismaClient } from '@prisma/client';
import { isNull } from 'lodash';

let prisma: PrismaClient | null = null;

export const prismaInstance = () => {
	if (process.env.NODE_ENV === 'production') {
		if (isNull(prisma)) {
			prisma = new PrismaClient();
		}
	} else if (isNull(prisma)) {
		prisma = new PrismaClient({
			log: ['error'],
		});
	}
	return prisma;
};

export default prismaInstance;
