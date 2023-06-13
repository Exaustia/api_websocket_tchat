export const getRandomNonceMessage = (address: string) => {
	// encrypt the nonce with the user's address
	return 'Please prove you control this wallet by signing this message: ' + address;
};
