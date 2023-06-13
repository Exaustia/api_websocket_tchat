import { Connection, PublicKey } from '@solana/web3.js';
import naclUtils from 'tweetnacl-util';
import nacl from 'tweetnacl';

import configs from '../configs';
import { getRandomNonceMessage } from './getRandomNonceMessage';
import { sign } from 'crypto';

export const verifySignature = ({
	signedMessage,
	publicKey,
}: {
	signedMessage: string;
	publicKey: string;
}) => {
	const encodedMessage = new TextEncoder().encode(
		getRandomNonceMessage(publicKey).toLocaleLowerCase(),
	);

	const resultVerify = nacl.sign.detached.verify(
		encodedMessage,
		naclUtils.decodeBase64(signedMessage),
		new PublicKey(publicKey).toBytes(),
	);

	return resultVerify;
};

export const verifyTrx = async ({ trx, publicKey }: { trx: string; publicKey: string }) => {
	const connection = new Connection(configs.SOLANA_ENDPOINT, 'confirmed');
	const e = await connection.getParsedTransaction(trx);
	if (e?.transaction.message.accountKeys[0].pubkey.toBase58() === publicKey) {
		return true;
	}
};
