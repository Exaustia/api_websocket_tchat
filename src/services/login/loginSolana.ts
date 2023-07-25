import { verifySignature } from '../../utils/verifySignature';
import jwt from 'jsonwebtoken';
import { upsertUser } from '../../schema/User/upsert';
import { isNull } from 'lodash';

export const loginSolana = async ({
	signedMessage,
	publicKey,
}: {
	signedMessage: string;
	publicKey: string;
}) => {
	try {
		// const resultVerify = true;
		const resultVerify = verifySignature({ signedMessage: signedMessage, publicKey: publicKey });
		if (resultVerify) {
			// create user if not exist
			const user = await upsertUser(publicKey, 'sol');
			if (isNull(user)) {
				throw new Error('User not found');
			}
			const token = jwt.sign(
				{
					wallet: publicKey,
					provider: 'SOL',
					userId: user.id,
					username: user.username,
				},
				process.env.SECRET_JWT || '123456789',
				{
					expiresIn: 86400,
				},
			);
			return token;
		} else {
			throw new Error('Signature not valid');
		}
	} catch (e: any) {
		throw new Error(e);
	}
};
