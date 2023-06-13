import * as express from 'express';
import jwt from 'jsonwebtoken';
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { getRandomNonceMessage } from '../../utils/getRandomNonceMessage';
import { errorLog } from '../../utils/errorLog';
import prismaInstance from '../../utils/prisma';
import { verifyJWT } from '../../loaders/authentification';
import { User } from '@prisma/client';
import { loginSolana } from '../../services/login/loginSolana';

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

const prisma = prismaInstance();

export default async ({ app }: { app: express.Application }) => {
	app.post('/login/eth', async (req, res) => {
		// const JWT_SECRET = process.env.JWT_SECRET;
		// if (!JWT_SECRET) throw new Error('JWT_SECRET not set');
		const address = req.body.address.toLowerCase();
		const signature = req.body.signature;
		try {
			const signerAddress = recoverPersonalSignature({
				data: bufferToHex(Buffer.from(getRandomNonceMessage(address).toLocaleLowerCase(), 'utf8')),
				signature: signature,
			});

			if (address !== signerAddress.toLowerCase())
				return res.status(401).send({ message: 'Invalid Signature' });

			const user = await prisma.user.upsert({
				where: {
					ethWallet: address,
				},
				update: {},
				create: {
					ethWallet: address,
					username: address,
					color: getRandomColor(),
				},
			});

			const token = jwt.sign(
				{ wallet: address, provider: 'eth', userId: user.id, username: user.username },
				process.env.SECRET_JWT || '123456789',
				{
					expiresIn: 86400,
				},
			);

			return res.status(200).json({
				accessToken: token,
				provider: 'eth',
			});
		} catch (error: any) {
			errorLog('Error while verifying signature', error.message, address);
			return res.status(500).send({ message: error.message });
		}
	});

	app.post('/login/nonce', async (req, res) => {
		const address = req.body.address.toLowerCase();

		try {
			return res
				.status(200)
				.send({ message: getRandomNonceMessage(address).toLocaleLowerCase() });
		} catch (error: any) {
			return res.status(500).send({ message: error.message });
		}
	});

	app.post('/login/solana', async (req, res) => {
		try {
			const { signedMessage, publicKey } = req.body;

			const token = await loginSolana({ signedMessage, publicKey });
			return res.status(200).json({
				accessToken: token,
				provider: 'sol',
			});
		} catch (e: any) {
			return res.status(500).send({ message: e.message });
		}
	});

	app.post('/login/verifySession', async (req, res) => {
		const token = req.body.token;

		try {
			const { valid } = verifyJWT(token);
			if (!valid) return res.status(401).send({ valid: false });
			return res.status(200).send({ valid: true });
		} catch (error: any) {
			return res.status(500).send({ message: error.message });
		}
	});
};
