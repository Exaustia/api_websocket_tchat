import prismaInstance from '../../utils/prisma';

const prisma = prismaInstance();

export const getNbUserConnected = async (roomId: string) => {
	try {
		const nbUserConnected = await prisma.userSession.findMany({
			where: {
				disconnectedAt: null,
				roomId,
			},
			include: {
				user: {
					select: {
						defaultProvider: true,
						id: true,
					},
				},
			},
		});

		const eth = nbUserConnected
			.filter((user) => user.user?.defaultProvider === 'eth')
			.map((user) => user.user?.id)
			.filter((value, index, self) => self.indexOf(value) === index).length;

		const sol = nbUserConnected
			.filter((user) => user.user?.defaultProvider === 'sol')
			.map((user) => user.user?.id)
			.filter((value, index, self) => self.indexOf(value) === index).length;

		return {
			eth,
			sol,
			total: eth + sol,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};
